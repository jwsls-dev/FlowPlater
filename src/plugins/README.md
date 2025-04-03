# FlowPlater Plugins

This directory contains plugins for extending FlowPlater's functionality. Each plugin can provide transformers, hooks, and other functionality to enhance FlowPlater's capabilities.

## Available Plugins

### ProxyPlugin

The ProxyPlugin provides CORS proxy functionality for HTMX requests. It uses the transformer pattern to modify request paths before they are issued.

#### Installation

Include the ProxyPlugin in your HTML:

```html
<script src="path/to/ProxyPlugin.js"></script>
```

#### Registration

Register the plugin with FlowPlater:

```javascript
FlowPlater.registerPlugin(ProxyPlugin);
```

#### Usage

Add the `fp-proxy` attribute to elements that need proxying:

```html
<!-- Use default proxy -->
<button hx-get="/api/data" fp-proxy>Load Data</button>

<!-- Use custom proxy -->
<button hx-get="/api/data" fp-proxy fp-proxy-url="https://my-proxy.com/?url=">Load Data</button>

<!-- Disable proxy -->
<button hx-get="/api/data" fp-proxy="false">Load Data</button>
```

#### How It Works

The ProxyPlugin uses the transformer pattern to modify request paths during the `htmx:confirm` event. Here's how it works:

1. When an HTMX request is triggered, the `htmx:confirm` event is fired
2. The ProxyPlugin's `confirmRequest` transformer intercepts this event
3. If the element has the `fp-proxy` attribute:
   - Gets the proxy URL (from `fp-proxy-url` attribute or default setting)
   - Modifies the request path to prepend the proxy URL
   - Returns the modified event
4. HTMX then issues the request with the modified path

This approach is more efficient than the previous event listener approach because:

- It integrates directly with FlowPlater's plugin architecture
- It modifies the request path before it's issued
- It doesn't require preventing and re-issuing requests
- It works seamlessly with other plugins and transformers

#### Configuration

You can modify the plugin's settings when registering it:

```javascript
FlowPlater.registerPlugin(ProxyPlugin, {
  defaultProxyUrl: "https://my-proxy.com/?url=",
  debug: true
});
```

### Example Plugin

The ExamplePlugin serves as a template for creating new plugins. It demonstrates the basic structure and capabilities of a FlowPlater plugin.

## Creating Custom Plugins

To create a custom plugin:

1. Create a new file in the plugins directory
2. Export a function that returns a plugin object with the following properties:
   - `config`: Plugin configuration (name, enabled, priority, version, settings)
   - `state`: Plugin state data
   - `transformers`: Functions that transform data at various points
   - `hooks`: Functions that execute at specific points in the FlowPlater lifecycle

Example plugin structure:

```javascript
const MyPlugin = () => {
  return {
    config: {
      name: "my-plugin",
      enabled: true,
      priority: 100,
      version: "1.0.0",
      settings: {
        // Plugin settings
      }
    },
    state: {
      // Plugin state
    },
    transformers: {
      // Transform functions
    },
    hooks: {
      // Hook functions
    }
  };
};

export default MyPlugin;
```
