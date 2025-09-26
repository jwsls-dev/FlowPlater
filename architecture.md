# Flowplater architecture

Flowplater is a vanilla js library that can be loaded in a script tag. It uses htmx and handlebars under the hood. It is initialized automatically when the DOM is ready and is fully run in the browser.

## Initialization

Flowplater is initialized automatically when the DOM is ready. It does a full scan of the DOM for any elements with the `fp-template` attribute and initializes them. It also sets up event listeners for any htmx requests and processes them.

## Flowplater instance

A Flowplater instance is created for each `fp-template` element found in the DOM. The properties can be found in the `types.ts` file.

## Flowplater group

A Flowplater group is created for each unique `fp-group` attribute value found in the DOM. The properties can be found in the `types.ts` file.
A Flowplater instance can be part of a group if it has the `fp-group` attribute. The group data is shared among all instances in the group.

## Flowplater plugin

A Flowplater plugin is a piece of code that can be registered to extend Flowplater's functionality. The properties can be found in the `types.ts` file.

## Templating

Flowplater uses handlebars for templating. The template content is transformed to support custom syntax.
Custom syntax looks like this:

```html
<each fp="users">
  <div class="user-card">
    <h3>{{name}}</h3>
    <p><strong>Email:</strong> {{email}}</p>
    <p><strong>Role:</strong> {{role}}</p>
    <if fp="isAdmin">
      <p class="admin-badge">Administrator</p>
    </if>
  </div>
</each>
```

The template is then compiled and rendered using handlebars. The compiled template is cached for performance.

## Template helpers

Flowplater provides a set of custom handlebars helpers to support the custom syntax. These can be found in the `helpers` folder.

## Data flow

Data can be set on a Flowplater instance or group. When data is set, it is transformed by any registered transformers and then rendered into the template.
Flowplater uses JS proxies to track changes to the data. When a change is detected, the template is re-rendered. This is done using a debounce timer to avoid multiple re-renders in a short period of time. DOM changes are applied using a virtual DOM diffing algorithm, found in the `VirtualDom.ts` file and `UpdateDom.ts` file.

## Performance System

Flowplater includes a performance monitoring system that tracks timing for template compilation, rendering, and other operations. This helps with debugging and optimization.

## State Management

Global state is managed through a centralized state system that coordinates between instances, groups, and plugins.

## Debug System

A built-in debug system provides development-time logging and error reporting to help with troubleshooting.

## Build System

Flowplater is built using Rollup and TypeScript, with automated version management and plugin building capabilities. It is built to an `iife` format and is fully self-contained. The current build depends on handlebars, htmx, idb, morphdom, and numbro (for currency formatting in the cart plugin). These are included in the build and do not need to be loaded separately.
