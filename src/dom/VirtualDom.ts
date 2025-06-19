import { Performance } from "../utils/Performance";
import { FormStateManager } from "../forms/FormStateManager";
import { Debug } from "../core/Debug";

interface VNode {
  tag: string;
  attrs: Record<string, string>;
  children: (VNode | string)[];
  key?: string;
  element?: HTMLElement; // Reference to actual DOM element
  events?: Record<string, string>; // Event handler attributes (onclick, onchange, etc.)
  listeners?: Map<string, EventListener>; // Actual event listener functions
  isSVG?: boolean; // Whether this is an SVG element
  isFormElement?: boolean; // Whether this is a form input element
}

interface PatchOperation {
  type: 'CREATE' | 'REMOVE' | 'REPLACE' | 'UPDATE_ATTRS' | 'MOVE' | 'UPDATE_EVENTS' | 'UPDATE_WEBFLOW_STATE';
  target?: HTMLElement;
  vnode?: VNode | string;
  attrs?: Record<string, string>;
  events?: { add?: Record<string, string>; remove?: string[] };
  oldIndex?: number;
  newIndex?: number;
  textNodeIndex?: number; // For tracking text node positions
}

/**
 * Virtual DOM implementation for efficient DOM diffing and batched updates
 */
class VirtualDOM {
  private static readonly VOID_ELEMENTS = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'
  ]);

  private static readonly SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  private static readonly SVG_ELEMENTS = new Set([
    'svg', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'rect', 'path',
    'g', 'text', 'tspan', 'defs', 'use', 'symbol', 'marker', 'clipPath',
    'mask', 'pattern', 'image', 'foreignObject'
  ]);

  // Track elements with event listeners for cleanup
  private static elementEventMap = new WeakMap<HTMLElement, Set<string>>();

  /**
   * Parse HTML string into virtual DOM tree
   */
  static parseHTML(html: string): VNode[] {
    Performance.start('VirtualDOM.parseHTML');
    
    const container = document.createElement('div');
    // Don't trim the HTML - preserve original spacing
    container.innerHTML = html;
    
    const vnodes = Array.from(container.childNodes).map(node => 
      this.nodeToVNode(node)
    ).filter(Boolean) as VNode[];
    
    Performance.end('VirtualDOM.parseHTML');
    return vnodes;
  }

  /**
   * Convert DOM node to virtual node
   */
  private static nodeToVNode(node: Node): VNode | string | null {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      // Skip empty text nodes
      if (text === null || text === undefined || text === '') {
        return null;
      }
      
      // For whitespace-only text nodes, be more selective about preservation
      if (text.trim() === '') {
        // Check if this whitespace might be meaningful (between inline elements)
        const parent = node.parentElement;
        const hasPrevSibling = !!node.previousSibling;
        const hasNextSibling = !!node.nextSibling;
        
        // Elements that typically contain inline content where whitespace matters
        const inlineContainerTags = new Set([
          'p', 'div', 'li', 'td', 'th', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'span', 'label', 'a', 'strong', 'em', 'b', 'i', 'small', 'mark'
        ]);
        
        const isInInlineContainer = parent && inlineContainerTags.has(parent.tagName.toLowerCase());
        const isBetweenElements = hasPrevSibling && hasNextSibling;
        
        if (isInInlineContainer && isBetweenElements) {
          // Preserve whitespace that might be meaningful between inline elements
          return text;
        } else {
          // Skip formatting whitespace
          return null;
        }
      }
      
      // Preserve the original text content for meaningful text
      return text;
    }

    if (node.nodeType === Node.COMMENT_NODE) {
      return null; // Skip comments
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tag = element.tagName.toLowerCase();
      const isSVG = this.SVG_ELEMENTS.has(tag) || element.namespaceURI === this.SVG_NAMESPACE;
      

      
      // Extract attributes and event handlers
      const attrs: Record<string, string> = {};
      const events: Record<string, string> = {};
      const specialElements = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'];
      const isFormElement = specialElements.includes(tag.toUpperCase());
      
      Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith('on')) {
          // Capture event handler attributes
          events[attr.name] = attr.value;
        } else {
          attrs[attr.name] = attr.value;
        }
      });

      // Extract children (skip void elements)
      let children: (VNode | string)[] = [];
      if (!this.VOID_ELEMENTS.has(tag)) {
        children = Array.from(element.childNodes)
          .map(child => this.nodeToVNode(child))
          .filter(Boolean) as (VNode | string)[];
      }

      return {
        tag,
        attrs,
        children,
        events: Object.keys(events).length > 0 ? events : undefined,
        key: attrs['data-key'],
        element,
        isSVG,
        isFormElement
      };
    }

    return null;
  }

  /**
   * Convert existing DOM element to virtual DOM tree
   */
  static domToVNodes(element: HTMLElement): VNode[] {
    Performance.start('VirtualDOM.domToVNodes');
    
    const vnodes = Array.from(element.childNodes)
      .map(node => this.nodeToVNode(node))
      .filter(Boolean) as VNode[];
    
    Performance.end('VirtualDOM.domToVNodes');
    return vnodes;
  }

  /**
   * Check if two VNode trees are structurally identical
   */
  private static areVNodeTreesEqual(oldVNodes: (VNode | string)[], newVNodes: (VNode | string)[]): boolean {
    if (oldVNodes.length !== newVNodes.length) {
      return false;
    }

    for (let i = 0; i < oldVNodes.length; i++) {
      if (!this.areVNodesEqual(oldVNodes[i], newVNodes[i])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if two VNodes are equal
   */
  private static areVNodesEqual(oldVNode: VNode | string, newVNode: VNode | string): boolean {
    // Handle text nodes
    if (typeof oldVNode === 'string' && typeof newVNode === 'string') {
      // Special handling for whitespace-only text nodes
      const oldIsWhitespace = oldVNode.trim() === '';
      const newIsWhitespace = newVNode.trim() === '';
      
      if (oldIsWhitespace && newIsWhitespace) {
        // Consider all whitespace-only text nodes equal to each other
        return true;
      }
      
      // For non-whitespace text, use exact equality
      return oldVNode === newVNode;
    }

    // Handle mixed types
    if (typeof oldVNode !== typeof newVNode) {
      return false;
    }

    // Handle element nodes
    if (typeof oldVNode === 'object' && typeof newVNode === 'object') {
      // Check tag
      if (oldVNode.tag !== newVNode.tag) {
        return false;
      }

      // Check attributes (shallow comparison)
      const oldAttrs = oldVNode.attrs || {};
      const newAttrs = newVNode.attrs || {};
      const oldKeys = Object.keys(oldAttrs).sort();
      const newKeys = Object.keys(newAttrs).sort();
      
      if (oldKeys.length !== newKeys.length) {
        return false;
      }
      
      for (let i = 0; i < oldKeys.length; i++) {
        if (oldKeys[i] !== newKeys[i] || oldAttrs[oldKeys[i]] !== newAttrs[newKeys[i]]) {
          return false;
        }
      }

      // Check events (shallow comparison)
      const oldEvents = oldVNode.events || {};
      const newEvents = newVNode.events || {};
      const oldEventKeys = Object.keys(oldEvents).sort();
      const newEventKeys = Object.keys(newEvents).sort();
      
      if (oldEventKeys.length !== newEventKeys.length) {
        return false;
      }
      
      for (let i = 0; i < oldEventKeys.length; i++) {
        if (oldEventKeys[i] !== newEventKeys[i] || oldEvents[oldEventKeys[i]] !== newEvents[newEventKeys[i]]) {
          return false;
        }
      }

      // Check children recursively
      return this.areVNodeTreesEqual(oldVNode.children, newVNode.children);
    }

    return false;
  }

  /**
   * Diff two virtual DOM trees and generate patch operations
   */
  static diff(oldVNodes: VNode[], newVNodes: VNode[]): PatchOperation[] {
    Performance.start('VirtualDOM.diff');
    
    // Add null/undefined checks
    if (!oldVNodes || !Array.isArray(oldVNodes)) {
      Performance.end('VirtualDOM.diff');
      return [];
    }
    
    if (!newVNodes || !Array.isArray(newVNodes)) {
      Performance.end('VirtualDOM.diff');
      return [];
    }
    
    // Quick check: if the trees are structurally identical, skip diffing
    if (this.areVNodeTreesEqual(oldVNodes, newVNodes)) {
      Performance.end('VirtualDOM.diff');
      return [];
    }
    
    const patches: PatchOperation[] = [];
    
    // Create keyed element maps for efficient lookup
    const oldKeyed = new Map<string, { vnode: VNode; index: number }>();
    const newKeyed = new Map<string, { vnode: VNode; index: number }>();
    
    oldVNodes.forEach((vnode, index) => {
      if (typeof vnode === 'object' && vnode.key) {
        oldKeyed.set(vnode.key, { vnode, index });
      }
    });
    
    newVNodes.forEach((vnode, index) => {
      if (typeof vnode === 'object' && vnode.key) {
        newKeyed.set(vnode.key, { vnode, index });
      }
    });

    // Track processed indices
    const processedOld = new Set<number>();
    const processedNew = new Set<number>();

    // First pass: Handle keyed elements
    newKeyed.forEach(({ vnode: newVNode, index: newIndex }, key) => {
      const oldEntry = oldKeyed.get(key);
      if (oldEntry) {
        const { vnode: oldVNode, index: oldIndex } = oldEntry;
        
        // Mark as processed
        processedOld.add(oldIndex);
        processedNew.add(newIndex);
        
        // Check if element needs to move
        if (oldIndex !== newIndex) {
          patches.push({
            type: 'MOVE',
            target: oldVNode.element,
            oldIndex,
            newIndex
          });
        }
        
        // Check for attribute/content changes
        const subPatches = this.diffVNode(oldVNode, newVNode);
        patches.push(...subPatches);
      }
    });

    // Second pass: Handle non-keyed elements with improved matching
    const unprocessedOld = oldVNodes.filter((_, i) => !processedOld.has(i));
    const unprocessedNew = newVNodes.filter((_, i) => !processedNew.has(i));
    const usedOldIndices = new Set<number>();
    
    // Try to match remaining new elements with remaining old elements
    unprocessedNew.forEach((newVNode) => {
      const actualNewIndex = newVNodes.findIndex(vn => vn === newVNode);
      
      const bestMatchIndex = this.findBestMatch(newVNode, unprocessedOld, usedOldIndices);
      
      if (bestMatchIndex !== -1) {
        // Found a good match
        const oldVNode = unprocessedOld[bestMatchIndex];
        usedOldIndices.add(bestMatchIndex);
        
        // Calculate actual old index
        let actualOldIndex = -1;
        let relativeIndex = 0;
        for (let i = 0; i < oldVNodes.length; i++) {
          if (!processedOld.has(i)) {
            if (relativeIndex === bestMatchIndex) {
              actualOldIndex = i;
              break;
            }
            relativeIndex++;
          }
        }

        if (actualOldIndex !== actualNewIndex) {
          // Element needs to move
          patches.push({
            type: 'MOVE',
            target: typeof oldVNode === 'object' ? oldVNode.element : undefined,
            oldIndex: actualOldIndex,
            newIndex: actualNewIndex
          });
        }

        // Diff the matched elements
        const subPatches = this.diffVNode(oldVNode, newVNode);
        patches.push(...subPatches);
      } else {
        // No good match found, create new element at the correct position
        patches.push({
          type: 'CREATE',
          vnode: newVNode,
          newIndex: actualNewIndex
        });
      }
    });

    // Remove any unmatched old elements
    unprocessedOld.forEach((oldVNode, oldRelativeIndex) => {
      if (!usedOldIndices.has(oldRelativeIndex)) {
        // Calculate the actual index in the original oldVNodes array
        let actualOldIndex = -1;
        let relativeIndex = 0;
        for (let i = 0; i < oldVNodes.length; i++) {
          if (!processedOld.has(i)) {
            if (relativeIndex === oldRelativeIndex) {
              actualOldIndex = i;
              break;
            }
            relativeIndex++;
          }
        }
        
        const removeTarget = typeof oldVNode === 'object' ? oldVNode.element : undefined;
        
        patches.push({
          type: 'REMOVE',
          target: removeTarget,
          textNodeIndex: typeof oldVNode === 'string' ? actualOldIndex : undefined,
          // Add elementIndex for elements without direct references
          oldIndex: typeof oldVNode === 'object' && !oldVNode.element ? actualOldIndex : undefined
        });
      }
    });
    
    Performance.end('VirtualDOM.diff');
    return patches;
  }

  /**
   * Diff two individual virtual nodes
   */
  private static diffVNode(oldVNode: VNode | string, newVNode: VNode | string): PatchOperation[] {
    // Handle text nodes - text changes should be handled by remove/create operations
    if (typeof oldVNode === 'string' || typeof newVNode === 'string') {
      // Text node changes are handled at the parent level by removing old and creating new
      // Don't generate patches here - let the parent handle this via REMOVE/CREATE
      return [];
    }

    // Handle different element types
    if (oldVNode.tag !== newVNode.tag) {
      return [{
        type: 'REPLACE',
        target: oldVNode.element,
        vnode: newVNode
      }];
    }

    // Skip comparison for Webflow-specific elements to preserve their state
    if (this.isWebflowElement(oldVNode) || this.isWebflowElement(newVNode)) {
      return []; // Skip updates for Webflow elements to preserve their state
    }

    // Special handling for form elements - preserve their state
    if (oldVNode.isFormElement || newVNode.isFormElement) {
      return this.diffFormElement(oldVNode, newVNode);
    }

    const patches: PatchOperation[] = [];

    // Check if content has changed significantly - if so, replace the entire element
    if (this.hasSignificantContentChange(oldVNode, newVNode)) {
      return [{
        type: 'REPLACE',
        target: oldVNode.element,
        vnode: newVNode
      }];
    }

    // Check attributes
    const attrPatches = this.diffAttributes(oldVNode.attrs, newVNode.attrs);
    if (attrPatches) {
      patches.push({
        type: 'UPDATE_ATTRS',
        target: oldVNode.element,
        attrs: attrPatches
      });
    }

    // Check events
    const eventPatches = this.diffEvents(oldVNode.events || {}, newVNode.events || {});
    if (eventPatches) {
      patches.push({
        type: 'UPDATE_EVENTS',
        target: oldVNode.element,
        events: eventPatches
      });
    }

    // Only recursively diff children if we're not replacing the whole element
    const childPatches = this.diff(
      oldVNode.children as VNode[],
      newVNode.children as VNode[]
    );
    patches.push(...childPatches);

    return patches;
  }

  /**
   * Check if two vnodes have significant content changes that warrant replacement
   */
  private static hasSignificantContentChange(oldVNode: VNode, newVNode: VNode): boolean {
    // For course cards and similar complex elements, be more aggressive about replacement
    if (oldVNode.attrs.class && oldVNode.attrs.class.includes('course-card')) {
      // Always replace course cards - they have complex nested structure
      return true;
    }

    // If the structure is different, replace
    if (Math.abs(oldVNode.children.length - newVNode.children.length) > 1) {
      return true;
    }

    // If most of the text content is different, replace
    const oldText = this.extractTextContent(oldVNode);
    const newText = this.extractTextContent(newVNode);
    
    if (oldText.length > 0 && newText.length > 0) {
      const similarity = this.calculateTextSimilarity(oldText, newText);
      if (similarity < 0.5) { // Less than 50% similar
        return true;
      }
    }

    // If text content lengths are very different, replace
    if (oldText.length > 0 && newText.length > 0) {
      const lengthRatio = Math.min(oldText.length, newText.length) / Math.max(oldText.length, newText.length);
      if (lengthRatio < 0.5) {
        return true;
      }
    }

    return false;
  }

  /**
   * Extract all text content from a vnode
   */
  private static extractTextContent(vnode: VNode): string {
    let text = '';
    for (const child of vnode.children) {
      if (typeof child === 'string') {
        text += child;
      } else {
        text += this.extractTextContent(child);
      }
    }
    // Only trim for comparison purposes, but preserve original spacing in actual content
    return text.trim();
  }

  /**
   * Calculate text similarity between two strings
   */
  private static calculateTextSimilarity(text1: string, text2: string): number {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const commonWords = words1.filter(word => words2.includes(word));
    const totalWords = Math.max(words1.length, words2.length);
    
    return totalWords > 0 ? commonWords.length / totalWords : 0;
  }

  /**
   * Check if a virtual node represents a Webflow element that should be handled specially
   */
  private static isWebflowElement(vnode: VNode): boolean {
    const className = vnode.attrs.class || vnode.attrs.className || '';
    
    // Check for Webflow classes
    if (typeof className === 'string' && className.includes('w-')) {
      return true;
    }
    
    // Check for Webflow-specific attributes
    const hasWebflowAttrs = Object.keys(vnode.attrs).some(attr => attr.startsWith('w-'));
    if (hasWebflowAttrs) {
      return true;
    }
    
    // Check for Webflow form wrapper patterns
    const webflowFormClasses = [
      'w-checkbox', 'w-radio', 'w-checkbox-input', 'w-radio-input',
      'w-form', 'w-input', 'w-select', 'w-textarea'
    ];
    
    if (typeof className === 'string') {
      const classes = className.split(' ');
      if (classes.some(cls => webflowFormClasses.includes(cls))) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Special diffing for form elements to preserve their state and handle Webflow patterns
   */
  private static diffFormElement(oldVNode: VNode, newVNode: VNode): PatchOperation[] {
    const patches: PatchOperation[] = [];

    // For form elements, exclude value/state attributes AND Webflow-specific attributes
    const excludedAttrs = new Set(['value', 'checked', 'selected']);
    const filteredNewAttrs: Record<string, string> = {};
    
    Object.entries(newVNode.attrs).forEach(([key, value]) => {
      // Skip form state attributes and Webflow-specific attributes (w-*)
      if (!excludedAttrs.has(key) && !key.startsWith('w-')) {
        filteredNewAttrs[key] = value;
      }
    });

    const attrPatches = this.diffAttributes(oldVNode.attrs, filteredNewAttrs);
    if (attrPatches) {
      patches.push({
        type: 'UPDATE_ATTRS',
        target: oldVNode.element,
        attrs: attrPatches
      });
    }

    // Still check events for form elements
    const eventPatches = this.diffEvents(oldVNode.events || {}, newVNode.events || {});
    if (eventPatches) {
      patches.push({
        type: 'UPDATE_EVENTS',
        target: oldVNode.element,
        events: eventPatches
      });
    }

    // CRITICAL: Always sync Webflow visual state for form elements
    // This ensures that even if the template changes, the visual state matches the actual DOM state
    if (oldVNode.element && (oldVNode.tag === 'input' || oldVNode.tag === 'select' || oldVNode.tag === 'textarea')) {
      patches.push({
        type: 'UPDATE_WEBFLOW_STATE',
        target: oldVNode.element
      });
    }

    // Don't diff children for form inputs (they typically don't have meaningful children)
    if (oldVNode.tag !== 'input' && oldVNode.tag !== 'textarea') {
      const childPatches = this.diff(
        oldVNode.children as VNode[],
        newVNode.children as VNode[]
      );
      patches.push(...childPatches);
    }

    return patches;
  }

  /**
   * Find best match for non-keyed element using similarity scoring
   */
  private static findBestMatch(targetVNode: VNode | string, candidates: (VNode | string)[], processedIndices: Set<number>): number {
    if (typeof targetVNode === 'string') {
      // For text nodes, find exact or similar text
      for (let i = 0; i < candidates.length; i++) {
        if (processedIndices.has(i)) continue;
        if (typeof candidates[i] === 'string' && candidates[i] === targetVNode) {
          return i;
        }
      }
      return -1;
    }

    let bestMatch = -1;
    let bestScore = 0;

    for (let i = 0; i < candidates.length; i++) {
      if (processedIndices.has(i)) continue;
      
      const candidate = candidates[i];
      if (typeof candidate === 'string') continue;

      let score = 0;
      
      // Same tag type (highest priority)
      if (candidate.tag === targetVNode.tag) score += 10;
      
      // Same ID (high priority)
      if (candidate.attrs.id && targetVNode.attrs.id && candidate.attrs.id === targetVNode.attrs.id) score += 8;
      
      // Similar class names (medium priority)
      const candidateClasses = (candidate.attrs.class || '').split(' ');
      const targetClasses = (targetVNode.attrs.class || '').split(' ');
      const commonClasses = candidateClasses.filter(c => targetClasses.includes(c));
      score += commonClasses.length * 2;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = i;
      }
    }

    // Only return match if it's a reasonably good match
    // Require more than just tag matching - need additional attributes or content similarity
    return bestScore > 10 ? bestMatch : -1;
  }

  /**
   * Diff attributes between old and new virtual nodes with Webflow-aware handling
   */
  private static diffAttributes(oldAttrs: Record<string, string>, newAttrs: Record<string, string>): Record<string, string> | null {
    const changes: Record<string, string> = {};
    let hasChanges = false;

    // Check for changed/new attributes
    for (const [key, value] of Object.entries(newAttrs)) {
      if (oldAttrs[key] !== value) {
        changes[key] = value;
        hasChanges = true;
      }
    }

    // Check for removed attributes, but preserve Webflow-specific attributes
    for (const key of Object.keys(oldAttrs)) {
      if (!(key in newAttrs)) {
        // Don't remove Webflow-specific attributes or classes that might include Webflow state
        if (!key.startsWith('w-') && key !== 'class') {
          changes[key] = ''; // Empty string indicates removal
          hasChanges = true;
        } else if (key === 'class') {
          // For class attribute, we need to be more careful with Webflow classes
          const oldClasses = (oldAttrs[key] || '').split(' ').filter(Boolean);
          const newClasses = (newAttrs[key] || '').split(' ').filter(Boolean);
          
          // Preserve Webflow classes (w-*) and only remove non-Webflow classes
          const preservedWebflowClasses = oldClasses.filter(cls => cls.startsWith('w-'));
          const finalClasses = [...new Set([...newClasses, ...preservedWebflowClasses])];
          
          if (finalClasses.join(' ') !== oldAttrs[key]) {
            changes[key] = finalClasses.join(' ');
            hasChanges = true;
          }
        }
      }
    }

    return hasChanges ? changes : null;
  }

  /**
   * Diff event handlers between old and new virtual nodes
   */
  private static diffEvents(oldEvents: Record<string, string>, newEvents: Record<string, string>): { add?: Record<string, string>; remove?: string[] } | null {
    const toAdd: Record<string, string> = {};
    const toRemove: string[] = [];
    let hasChanges = false;

    // Check for new/changed events
    for (const [eventType, handler] of Object.entries(newEvents)) {
      if (oldEvents[eventType] !== handler) {
        toAdd[eventType] = handler;
        hasChanges = true;
      }
    }

    // Check for removed events
    for (const eventType of Object.keys(oldEvents)) {
      if (!(eventType in newEvents)) {
        toRemove.push(eventType);
        hasChanges = true;
      }
    }

    if (!hasChanges) return null;

    return {
      ...(Object.keys(toAdd).length > 0 && { add: toAdd }),
      ...(toRemove.length > 0 && { remove: toRemove })
    };
  }

  /**
   * Apply patch operations to the DOM
   */
  static patch(container: HTMLElement, patches: PatchOperation[], expectedVNodes?: VNode[], capturedFormStates?: Record<string, Record<string, any>>): void {
    Performance.start('VirtualDOM.patch');
    
    // Group patches by type for optimal batching
    const patchGroups = {
      replaces: [] as PatchOperation[],
      moves: [] as PatchOperation[],
      removes: [] as PatchOperation[],
      creates: [] as PatchOperation[],
      updates: [] as PatchOperation[]
    };

    patches.forEach((patch) => {
      switch (patch.type) {
        case 'REPLACE':
          patchGroups.replaces.push(patch);
          break;
        case 'MOVE':
          patchGroups.moves.push(patch);
          break;
        case 'REMOVE':
          patchGroups.removes.push(patch);
          break;
        case 'CREATE':
          patchGroups.creates.push(patch);
          break;
        default:
          patchGroups.updates.push(patch);
      }
    });
    
    // Apply patches in optimal order: replaces first, then removes, then creates, then moves, then updates
    this.applyReplaces(patchGroups.replaces);
    this.applyRemoves(container, patchGroups.removes);
    this.applyCreates(container, patchGroups.creates);
    this.applyMoves(container, patchGroups.moves);
    this.applyUpdates(patchGroups.updates);
    
    // Perform post-update verification if expected state is provided and enabled
    if (expectedVNodes && expectedVNodes.length > 0) {
      try {
        this.verifyDOMIntegrity(container, expectedVNodes, capturedFormStates);
      } catch (error) {
        Debug.error('VirtualDOM: Error during integrity check:', error);
      }
    }
    
    Performance.end('VirtualDOM.patch');
  }

    /**
   * Verify that the actual DOM matches the expected HTML
   * If there's a mismatch, force update the DOM to match the expected state
   */
  private static verifyDOMIntegrity(container: HTMLElement, expectedVNodes: VNode[], capturedFormStates?: Record<string, Record<string, any>>): void {
    Performance.start('VirtualDOM.verifyDOMIntegrity');
    
    // Convert expected VNodes back to HTML string
    const expectedHTML = this.vNodesToHTML(expectedVNodes);
    
    // Get current DOM as HTML string
    const currentHTML = container.innerHTML;
    
    // Normalize both for comparison (remove extra whitespace, line breaks)
    const normalize = (html: string) => html.replace(/\s+/g, ' ').trim();
    
    if (normalize(expectedHTML) !== normalize(currentHTML)) {
      Debug.warn(`VirtualDOM: DOM integrity check failed - forcing innerHTML update`);
      
      // Force update with expected HTML
      container.innerHTML = expectedHTML;
      
      // Only restore form values if we have captured states and verification failed
      if (capturedFormStates && Object.keys(capturedFormStates).length > 0) {
        Debug.debug(`VirtualDOM: Restoring form states after integrity fix`);
        FormStateManager.restoreFormStates(container, 'VirtualDOM.verifyDOMIntegrity');
      }
      
      Debug.debug(`VirtualDOM: DOM integrity restored via innerHTML`);
    } else {
      Debug.debug(`VirtualDOM: DOM integrity check passed`);
    }
    
    Performance.end('VirtualDOM.verifyDOMIntegrity');
  }

  /**
   * Convert VNodes back to HTML string
   */
  private static vNodesToHTML(vnodes: (VNode | string)[]): string {
    return vnodes.map(vnode => {
      if (typeof vnode === 'string') {
        return vnode;
      }
      
      const attrs = Object.entries(vnode.attrs || {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      
      const attrsStr = attrs ? ` ${attrs}` : '';
      const childrenHTML = this.vNodesToHTML(vnode.children);
      
      if (this.VOID_ELEMENTS.has(vnode.tag)) {
        return `<${vnode.tag}${attrsStr}>`;
      }
      
      return `<${vnode.tag}${attrsStr}>${childrenHTML}</${vnode.tag}>`;
    }).join('');
  }



  private static applyReplaces(replaces: PatchOperation[]): void {
    replaces.forEach(patch => {
      if (patch.target && patch.vnode && patch.target.parentNode) {
        const newElement = this.createElementFromVNode(patch.vnode);
        this.cleanupElement(patch.target);
        patch.target.parentNode.replaceChild(newElement, patch.target);
      }
    });
  }

  private static applyMoves(container: HTMLElement, moves: PatchOperation[]): void {
    moves.forEach(patch => {
      if (patch.target && patch.newIndex !== undefined) {
        const children = Array.from(container.childNodes);
        const referenceNode = children[patch.newIndex] || null;
        container.insertBefore(patch.target, referenceNode);
      }
    });
  }

  private static applyUpdates(updates: PatchOperation[]): void {
    updates.forEach(patch => {
      switch (patch.type) {
        case 'UPDATE_ATTRS':
          if (patch.target && patch.attrs) {
            this.updateElementAttributes(patch.target, patch.attrs);
          }
          break;
        case 'UPDATE_EVENTS':
          if (patch.target && patch.events) {
            this.updateElementEvents(patch.target, patch.events);
          }
          break;
        case 'UPDATE_WEBFLOW_STATE':
          if (patch.target) {
            this.updateWebflowFormVisualState(patch.target);
          }
          break;
      }
    });
  }

  private static applyCreates(container: HTMLElement, creates: PatchOperation[]): void {
    // Sort creates by newIndex to maintain proper order
    const sortedCreates = creates.sort((a, b) => (a.newIndex ?? 0) - (b.newIndex ?? 0));
    
    sortedCreates.forEach(patch => {
      if (patch.vnode) {
        const element = this.createElementFromVNode(patch.vnode);
        
        if (patch.newIndex !== undefined) {
          // Insert at specific position
          const children = Array.from(container.childNodes);
          const referenceNode = children[patch.newIndex] || null;
          container.insertBefore(element, referenceNode);
        } else {
          // Fallback to append if no position specified
          container.appendChild(element);
        }
      }
    });
  }

  private static applyRemoves(container: HTMLElement, removes: PatchOperation[]): void {
    // Separate different types of removes
    const elementRemoves = removes.filter(patch => patch.target && patch.target.parentNode);
    const textNodeRemoves = removes.filter(patch => patch.textNodeIndex !== undefined);
    const indexRemoves = removes.filter(patch => !patch.target && patch.oldIndex !== undefined);
    
    // Combine all index-based removals (both elements and text nodes) and sort by index descending
    // This prevents index shifting issues
    const allIndexRemoves = [
      ...textNodeRemoves.map(patch => ({ ...patch, isTextNode: true })),
      ...indexRemoves.map(patch => ({ ...patch, isTextNode: false }))
    ].sort((a, b) => {
      const aIndex = a.textNodeIndex ?? a.oldIndex ?? -1;
      const bIndex = b.textNodeIndex ?? b.oldIndex ?? -1;
      return bIndex - aIndex; // Descending order
    });
    
    // Remove elements with direct references first
    elementRemoves.forEach((patch) => {
      if (patch.target && patch.target.parentNode) {
        this.cleanupElement(patch.target);
        patch.target.parentNode.removeChild(patch.target);
      }
    });
    
    // Remove by index (both elements and text nodes) in descending order
    allIndexRemoves.forEach((patch) => {
      const childNodes = Array.from(container.childNodes);
      const indexToRemove = patch.textNodeIndex ?? patch.oldIndex!;
      const nodeToRemove = childNodes[indexToRemove];
      
      if (nodeToRemove) {
        if (patch.isTextNode && nodeToRemove.nodeType === Node.TEXT_NODE) {
          container.removeChild(nodeToRemove);
        } else if (!patch.isTextNode && nodeToRemove.nodeType === Node.ELEMENT_NODE) {
          this.cleanupElement(nodeToRemove as HTMLElement);
          container.removeChild(nodeToRemove);
        }
      }
    });
  }

  /**
   * Create DOM element from virtual node
   */
  private static createElementFromVNode(vnode: VNode | string): HTMLElement | Text {
    if (typeof vnode === 'string') {
      return document.createTextNode(vnode);
    }

    // Create element with proper namespace support
    const element = vnode.isSVG 
      ? document.createElementNS(this.SVG_NAMESPACE, vnode.tag)
      : document.createElement(vnode.tag);
    
    // Set attributes with namespace support
    this.updateElementAttributes(element as HTMLElement, vnode.attrs);

    // Set up event handlers
    if (vnode.events) {
      this.updateElementEvents(element as HTMLElement, { add: vnode.events });
    }

    // Add children
    vnode.children.forEach(child => {
      const childElement = this.createElementFromVNode(child);
      element.appendChild(childElement);
    });

    // Handle Webflow form visual state if this is a form element
    if (vnode.isFormElement) {
      this.updateWebflowFormVisualState(element as HTMLElement);
    }

    // Store reference for future diffing
    vnode.element = element as HTMLElement;

    return element as HTMLElement;
  }

  /**
   * Update element attributes with SVG namespace support and Webflow form handling
   */
  private static updateElementAttributes(element: HTMLElement, attrs: Record<string, string>): void {
    const isSVG = element.namespaceURI === this.SVG_NAMESPACE;
    let shouldUpdateWebflowState = false;
    
    Object.entries(attrs).forEach(([key, value]) => {
      if (value === '') {
        element.removeAttribute(key);
      } else if (isSVG) {
        // SVG attributes may need special handling
        element.setAttributeNS(null, key, value);
      } else {
        element.setAttribute(key, value);
      }
      
      // Check if we need to update Webflow visual state
      if (key === 'checked' && element instanceof HTMLInputElement) {
        shouldUpdateWebflowState = true;
      }
    });
    
    // Update Webflow visual state if needed
    if (shouldUpdateWebflowState) {
      this.updateWebflowFormVisualState(element);
    }
  }

  /**
   * Update element event handlers with proper cleanup
   */
  private static updateElementEvents(element: HTMLElement, events: { add?: Record<string, string>; remove?: string[] }): void {
    // Get current event listeners for this element
    let currentEvents = this.elementEventMap.get(element);
    if (!currentEvents) {
      currentEvents = new Set<string>();
      this.elementEventMap.set(element, currentEvents);
    }

    // Remove old event handlers (set to null to remove)
    if (events.remove) {
      events.remove.forEach(eventType => {
        if (currentEvents!.has(eventType)) {
          // Remove the event handler attribute
          element.removeAttribute(eventType);
          currentEvents!.delete(eventType);
        }
      });
    }

    // Add new event handlers as attributes
    if (events.add) {
      Object.entries(events.add).forEach(([eventType, handler]) => {
        element.setAttribute(eventType, handler);
        currentEvents!.add(eventType);
      });
    }
  }

  /**
   * Update Webflow custom visual state for form elements
   * This ensures the visual state matches the actual DOM state, regardless of template changes
   */
  private static updateWebflowFormVisualState(element: HTMLElement): void {
    if (!(element instanceof HTMLInputElement)) return;
    
    // Only handle checkbox and radio inputs
    if (element.type !== 'checkbox' && element.type !== 'radio') return;
    
    // Find the Webflow wrapper
    const wrapper = element.closest(
      element.type === 'checkbox' ? '.w-checkbox' : '.w-radio'
    );
    
    if (!wrapper) return;
    
    // Find the custom visual input element
    const customInput = wrapper.querySelector(`.w-${element.type}-input`);
    if (customInput) {
      // CRITICAL: Always sync based on the ACTUAL DOM element's current state
      // This preserves user interactions even when templates change
      const isCurrentlyChecked = element.checked;
      
      Debug.debug(`VirtualDOM: Syncing Webflow visual state for ${element.type} - checked: ${isCurrentlyChecked}`);
      
      // Update the visual state class based on the actual input's current checked state
      if (isCurrentlyChecked) {
        customInput.classList.add('w--redirected-checked');
      } else {
        customInput.classList.remove('w--redirected-checked');
      }
    }
  }

  /**
   * Clean up all event listeners for an element (for memory management)
   */
  private static cleanupElement(element: HTMLElement): void {
    const events = this.elementEventMap.get(element);
    if (events) {
      // Remove all event handler attributes tracked for this element
      events.forEach(eventType => {
        element.removeAttribute(eventType);
      });
      this.elementEventMap.delete(element);
    }
    
    // Also clean up any child elements recursively
    const childElements = element.querySelectorAll('*');
    childElements.forEach(child => {
      const childEvents = this.elementEventMap.get(child as HTMLElement);
      if (childEvents) {
        childEvents.forEach(eventType => {
          (child as HTMLElement).removeAttribute(eventType);
        });
        this.elementEventMap.delete(child as HTMLElement);
      }
    });
  }
}

export { VirtualDOM, VNode, PatchOperation }; 