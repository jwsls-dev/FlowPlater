## FlowPlater Helpers Guide

This guide documents FlowPlater’s helpers and their HTML-tag equivalents, with examples and notes on behavior relative to Handlebars.

Notes
- All examples assume Handlebars templates. Where applicable, FlowPlater’s HTML-like tag form is shown alongside.
- Arguments in `fp` support quoted strings and entities (e.g., `&quot;` → ").
- Built-ins like `with`, `unless`, `log`, and `lookup` are available via Handlebars; FlowPlater also provides HTML tags that map to them where noted.
 - In FP tag form, pass all helper arguments (including option-like hashes) inside the single `fp` attribute string.

## Comparison helpers

### If (expression-aware)
Purpose
- Enhanced `if` that accepts string expressions. Compatible with truthy checks; supports `==`, `!=`, `<`, `>`, `<=`, `>=`, `&&`, `||`, `this`, and dotted paths.

Syntax
- Handlebars: `{{#if "<expression>"}}...{{/if}}`
- FP Tag: `<if fp="<expression>">... </if>`

Examples
```handlebars
{{!-- Truthy check --}}
{{#if "user"}}Hello {{user.name}}{{/if}}

{{!-- Equality and numeric comparisons --}}
{{#if "status == 'active'"}}Active{{/if}}
{{#if "cart.total > 100"}}Big Spender{{/if}}

{{!-- Logical operators and this-paths --}}
{{#if "(this.isAdmin) || (user.role == 'owner')"}}Access Granted{{/if}}
{{#if "this.profile.age >= 18"}}Adult{{/if}}
```
```html
<if fp="status == 'active'">Active</if>
<if fp="cart.total > 100">Big Spender</if>
```

### Unless (expression-aware)
Purpose
- Matches `if` semantics but inverts the result. Accepts the same expression grammar.

Syntax
- Handlebars: `{{#unless "<expression>"}}...{{/unless}}`
- FP Tag: `<unless fp="<expression>">... </unless>`

Examples
```handlebars
{{#unless "user"}}No user{{/unless}}
{{#unless "status == 'active'"}}Inactive{{/unless}}
{{#unless "cart.total > 100"}}Budget Shopper{{/unless}}
```
```html
<unless fp="user">No user</unless>
<unless fp="status == 'active'">Inactive</unless>
```

## Iteration

### Each (overridden)
Purpose
- Superset of Handlebars’ `each`. Works with arrays, objects, and `Map`. Supports sorting and limiting via hash options.

Hash options
- `limit`: number of items
- `startAt`: start index (default from config)
- `sortBy`: key or property name
- `descending`: boolean
- `sortBeforeLimit`: boolean (default true)

Syntax
- Handlebars: `{{#each items limit=10 sortBy="price" descending=true}}...{{/each}}`
- FP Tag: `<each fp="items limit=10 sortBy='price' descending=true">... </each>`

Examples
```handlebars
{{!-- Array iteration with indices --}}
{{#each products limit=3}}
  {{@index}}. {{this.name}} - ${{this.price}}
{{/each}}

{{!-- Object iteration with keys --}}
{{#each settings}}
  {{@key}} = {{this}}
{{/each}}

{{!-- Sorted slice --}}
{{#each products sortBy="price" descending=true startAt=2 limit=5}}
  {{this.name}} - ${{this.price}}
{{/each}}
```
```html
<each fp="products limit=3">
  {{@index}}. {{this.name}} - ${{this.price}}
</each>

<each fp="settings">
  {{@key}} = {{this}}
</each>

<each fp="products sortBy='price' descending=true startAt=2 limit=5">
  {{this.name}} - ${{this.price}}
</each>
```

## Math and aggregation

### Sum
Purpose
- Sums numbers and arrays; can mix numbers and arrays.

Examples
```handlebars
{{sum 1 2 3}}              {{!-- 6 --}}
{{sum prices}}             {{!-- sum of array --}}
{{sum 10 prices 5}}        {{!-- number + array + number --}}
```

### Math (plugin helper)
Notes
- Requires MathPlugin to be registered. Evaluates expressions with variables and functions (e.g., `min`, `max`, `sqrt`, `abs`, `log`, `ln`, `sin`, `cos`, `tan`).
- Inline helper (no inner content).

Examples
```handlebars
{{math "2 + 3 * 4"}}                {{!-- 14 --}}
{{math "sqrt(16) + 2"}}             {{!-- 6 --}}
{{math "max(price, 10)"}}           {{!-- uses context price --}}
{{math "@{forced.variable} + 5"}}   {{!-- forced resolution with @{...} --}}
```
```html
<math fp="2 + 3 * 4"></math>
<math fp="max(price, 10)"></math>
```

## Utilities

### Execute
Purpose
- Calls a user-registered function with arguments. Secured by an allowlist; disabled unless permitted by config.

Registering a function (JavaScript)
```js
import { registerExecutableFunction } from "../helpers/utility/execute";

registerExecutableFunction("greet", function(name) {
  return `Hello, ${name}!`;
});
```

Template usage
```handlebars
{{execute "greet" user.name}}  {{!-- Hello, Alice! --}}
```
```html
<execute fp="greet user.name"></execute>
```

### Set
Purpose
- Sets a variable on the root data context during rendering.

Examples
```handlebars
{{set "greeting" "Hello"}}
{{greeting}}, {{user.name}}!
```
```html
<set fp="greeting &quot;Hello&quot;"></set>
{{greeting}}, {{user.name}}!
```

### Default
Purpose
- Returns the first argument if truthy, otherwise the fallback.

Examples
```handlebars
{{default user.nickname "Anonymous"}}
{{default total 0}}
```

### Bunny
Purpose
- Renders an animated ASCII bunny. Returns a SafeString; intended for playful/demonstration use.

Example
```handlebars
{{bunny}}
```

## Built-ins and tag mappings

### With
Mapping
- Handlebars: `{{#with person}}...{{/with}}`
- FP Tag: `<with fp="person">... </with>`

### Log
Behavior
- If `fp` is provided, logs those arguments.
- If `fp` is absent, logs the element’s inner HTML as a single string.

Examples
```html
<log fp="user"></log>
<log>Rendered section start</log>
```

### Lookup
Mapping
- Handlebars: `{{lookup obj key}}`
- FP Tag: `<lookup fp="obj key"></lookup>`

### Else
Behavior
- In tag form, `<else>` maps to `{{else}}` within the nearest block.

Example
```html
<if fp="user">
  Hello {{user.name}}
  <else>
  Please log in
</if>
```

## Argument parsing in fp

Guidelines
- Use quotes for string literals with spaces: `<if fp="status == &quot;very active&quot;"></if>`
- Entities like `&quot;`, `&apos;`, `&amp;`, `&lt;`, and `&gt;` are decoded before evaluation.
- Dotted paths and `this`/`this.path` are supported in `if`/`unless` expressions.


