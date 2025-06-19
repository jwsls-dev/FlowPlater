import { Debug } from "../core/Debug";
import { Performance } from "../utils/Performance";
import { ConfigManager } from "../core/ConfigManager";

interface DomOperation {
  id: string;
  type: 'read' | 'write';
  operation: () => any;
  resolve: (value: any) => void;
  reject: (error: any) => void;
}

/**
 * DOM Batcher to reduce layout thrashing by batching DOM reads and writes
 * Uses requestAnimationFrame to schedule operations at optimal times
 */
class DomBatcher {
  private readQueue: DomOperation[] = [];
  private writeQueue: DomOperation[] = [];
  private isScheduled = false;
  private frameId: number | null = null;

  /**
   * Schedule a DOM read operation
   */
  read<T>(operation: () => T, id?: string): Promise<T> {
    // If batching is disabled, execute immediately
    if (!ConfigManager.getConfig().performance?.batchDomUpdates) {
      return Promise.resolve(operation());
    }

    return new Promise((resolve, reject) => {
      this.readQueue.push({
        id: id || `read-${Date.now()}-${Math.random()}`,
        type: 'read',
        operation,
        resolve,
        reject
      });
      this.scheduleFlush();
    });
  }

  /**
   * Schedule a DOM write operation
   */
  write<T>(operation: () => T, id?: string): Promise<T> {
    // If batching is disabled, execute immediately
    if (!ConfigManager.getConfig().performance?.batchDomUpdates) {
      return Promise.resolve(operation());
    }

    return new Promise((resolve, reject) => {
      this.writeQueue.push({
        id: id || `write-${Date.now()}-${Math.random()}`,
        type: 'write',
        operation,
        resolve,
        reject
      });
      this.scheduleFlush();
    });
  }

  /**
   * Schedule multiple operations to be batched together
   */
  batch(operations: Array<{ type: 'read' | 'write', operation: () => any, id?: string }>): Promise<any[]> {
    const promises = operations.map(op => {
      if (op.type === 'read') {
        return this.read(op.operation, op.id);
      } else {
        return this.write(op.operation, op.id);
      }
    });
    return Promise.all(promises);
  }

  /**
   * Execute a batch of DOM operations immediately (synchronously)
   * Useful for operations that must be completed before the next frame
   */
  flush(): void {
    this.conditionalFrameCancel();
    this.isScheduled = false;
    this.executeOperations();
  }

  /**
   * Clear all pending operations
   */
  clear(): void {
    this.conditionalFrameCancel();
    this.isScheduled = false;
    
    // Reject all pending operations
    [...this.readQueue, ...this.writeQueue].forEach(op => {
      op.reject(new Error('DOM operation cancelled'));
    });
    
    this.readQueue = [];
    this.writeQueue = [];
  }

  /**
   * Helper function to schedule execution based on configuration
   */
  private conditionalFrameSchedule(callback: () => void): void {
    const config = ConfigManager.getConfig();
    const batchingDelay = config.performance?.batchingDelay ?? 0;
    
    if (batchingDelay > 0) {
      // Use setTimeout with specified delay
      this.frameId = setTimeout(callback, batchingDelay) as any;
    } else {
      // Use requestAnimationFrame for optimal timing
      this.frameId = requestAnimationFrame(callback);
    }
  }

  /**
   * Helper function to cancel scheduled execution based on configuration
   */
  private conditionalFrameCancel(): void {
    if (!this.frameId) return;
    
    const config = ConfigManager.getConfig();
    const batchingDelay = config.performance?.batchingDelay ?? 0;
    
    if (batchingDelay > 0) {
      clearTimeout(this.frameId as any);
    } else {
      cancelAnimationFrame(this.frameId);
    }
    this.frameId = null;
  }

  private scheduleFlush(): void {
    if (this.isScheduled) return;
    
    this.isScheduled = true;
    this.conditionalFrameSchedule(() => {
      this.isScheduled = false;
      this.frameId = null;
      this.executeOperations();
    });
  }

  private executeOperations(): void {
    Performance.start('DomBatcher.executeOperations');
    
    try {
      // First, execute all read operations
      // This prevents layout thrashing by batching all reads together
      const readResults: any[] = [];
      while (this.readQueue.length > 0) {
        const operation = this.readQueue.shift()!;
        try {
          const result = operation.operation();
          operation.resolve(result);
          readResults.push(result);
        } catch (error) {
          operation.reject(error);
          Debug.error('DOM read operation failed:', error);
        }
      }

      // Then, execute all write operations
      // This prevents layout thrashing by batching all writes together
      const writeResults: any[] = [];
      while (this.writeQueue.length > 0) {
        const operation = this.writeQueue.shift()!;
        try {
          const result = operation.operation();
          operation.resolve(result);
          writeResults.push(result);
        } catch (error) {
          operation.reject(error);
          Debug.error('DOM write operation failed:', error);
        }
      }

      Debug.debug(`DOM Batcher executed ${readResults.length} reads and ${writeResults.length} writes`);
    } catch (error) {
      Debug.error('Error in DOM batcher execution:', error);
    } finally {
      Performance.end('DomBatcher.executeOperations');
    }
  }
}

// Export a singleton instance
export const domBatcher = new DomBatcher();
export { DomBatcher }; 