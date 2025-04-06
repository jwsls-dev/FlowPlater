import { Debug } from "./Debug";

/**
 * @deprecated This functionality has been moved to the ProxyPlugin.
 * Please use the ProxyPlugin instead.
 *
 * To use the proxy functionality:
 * 1. Include the ProxyPlugin.js file in your HTML
 * 2. Register the plugin with FlowPlater.registerPlugin(ProxyPlugin)
 * 3. Add the fp-proxy attribute to elements that need proxying
 *
 * See the plugins/README.md file for more information.
 */
export function setupProxy(element) {
  Debug.warn("setupProxy is deprecated. Please use the ProxyPlugin instead.");

  // Return the element without modification
  return element;
}
