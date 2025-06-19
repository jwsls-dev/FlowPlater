import { Debug } from "../core/Debug";
import { ConfigManager } from "../core/ConfigManager";
import { _state } from "../core/State";

/**
 * Centralized template cache management utility
 * Handles all template caching operations with size limits and eviction policies
 */
export class TemplateCache {
  /**
   * Add a template to the cache with automatic size management
   * @param templateId - The ID of the template
   * @param template - The compiled template
   * @returns The template that was added
   */
  static set(templateId: string, template: any): any {
    const cacheSize = ConfigManager.getConfig().templates?.cacheSize || 100;
    const cache = _state.templateCache;

    // If cache is at limit, remove oldest entry (FIFO eviction)
    if (Object.keys(cache).length >= cacheSize) {
      const oldestKey = Object.keys(cache)[0];
      delete cache[oldestKey];
      Debug.info(`Cache limit reached. Removed template: ${oldestKey}`);
    }

    // Add new template to cache
    cache[templateId] = template;
    return template;
  }

  /**
   * Get a template from the cache
   * @param templateId - The ID of the template to get, or undefined to get all templates
   * @returns The template object or all templates if no ID is provided
   */
  static get(templateId?: string): any {
    if (templateId) {
      return _state.templateCache[templateId];
    }
    return _state.templateCache;
  }

  /**
   * Check if a template is cached
   * @param templateId - The ID of the template to check
   * @returns True if the template is cached, false otherwise
   */
  static isCached(templateId: string): boolean {
    return !!_state.templateCache[templateId];
  }

  /**
   * Clear a template from the cache
   * @param templateId - The ID of the template to clear, or undefined to clear all
   */
  static clear(templateId?: string): void {
    if (templateId) {
      delete _state.templateCache[templateId];
      Debug.info(`Cleared template cache for: ${templateId}`);
    } else {
      _state.templateCache = {};
      Debug.info("Cleared entire template cache");
    }
  }

  /**
   * Get the size of the template cache
   * @returns The number of templates in the cache
   */
  static size(): number {
    return Object.keys(_state.templateCache).length;
  }

  /**
   * Check if cache is at capacity
   * @returns True if cache is at or over capacity
   */
  static isAtCapacity(): boolean {
    const cacheSize = ConfigManager.getConfig().templates?.cacheSize || 100;
    return Object.keys(_state.templateCache).length >= cacheSize;
  }
} 