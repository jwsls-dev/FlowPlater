/**!

 @license FlowPlater v1.4.19 | (c) 2024 FlowPlater | https://flowplater.io
 Created by J.WSLS | https://jwsls.io

Libraries used:
-   Handlebars.js v4.7.8+ | Copyright (C) 2011-2019 by Yehuda Katz | https://handlebarsjs.com
-   htmx v1.9.9+ | (c) 2020 by Big Sky Software LLC | https://htmx.org

This software and associated documentation (collectively, the "Software") are proprietary to
FlowPlater. Use of the Software is governed by the terms of this license agreement ("Agreement").
By installing, copying, or otherwise using the Software, you agree to be bound by the terms 
of this Agreement.

1.  Grant of License: Subject to the terms of this Agreement, FlowPlater grants you a non-exclusive, 
    non-transferable license to use the Software for personal or commercial purposes. You may not 
    redistribute, sublicense, or resell the Software without prior written consent from FlowPlater.

2.  Restrictions: You may not modify, reverse engineer, decompile, or disassemble the Software, 
    except to the extent that such activity is expressly permitted by applicable law notwithstanding 
    this limitation.

3.  Open Source Libraries: The Software includes open-source libraries Handlebars.js v4.7.8+ (MIT 
    License) and htmx v1.9.9+ (BSD License), which are used under the terms of their respective 
    licenses. These libraries are sublicensed to you under the terms of their original licenses, 
    and not under the terms of this Agreement.

4.  No Warranty: The Software is provided "as is" without any warranty of any kind, either expressed 
    or implied, including but not limited to any implied warranties of merchantability, fitness for 
    a particular purpose, or non-infringement.

5.  Limitation of Liability: In no event shall FlowPlater or its licensors be liable for any damages 
    (including, without limitation, lost profits, business interruption, or lost information) arising 
    out of the use of or inability to use the Software, even if FlowPlater has been advised of the 
    possibility of such damages.

6.  Termination: This Agreement shall terminate automatically if you fail to comply with its terms 
    and conditions. Upon termination, you must destroy all copies of the Software.

7.  General: This Agreement constitutes the entire agreement between you and FlowPlater concerning 
    the Software and supersedes any prior or contemporaneous communications.

BY USING THE SOFTWARE, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT, UNDERSTAND IT, AND AGREE 
TO BE BOUND BY ITS TERMS AND CONDITIONS.

// Handlebars and htmx are included below. Flowplater is located at the bottom of the file.

*/

if (typeof Handlebars != "undefined") {
  console.warn(
    "It looks like you already have Handlebars loaded. Flowplater has Handlebars included. Please remove the other version of Handlebars to prevent conflicts.",
  );
}
if (typeof htmx != "undefined") {
  console.warn(
    "It looks like you already have htmx loaded. Flowplater has htmx included. Please remove the other version of htmx to prevent conflicts.",
  );
}

/**!

 @license
 handlebars v4.7.8

Copyright (C) 2011-2019 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Handlebars"] = factory();
	else
		root["Handlebars"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _handlebarsRuntime = __webpack_require__(2);

	var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);

	// Compiler imports

	var _handlebarsCompilerAst = __webpack_require__(84);

	var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);

	var _handlebarsCompilerBase = __webpack_require__(85);

	var _handlebarsCompilerCompiler = __webpack_require__(90);

	var _handlebarsCompilerJavascriptCompiler = __webpack_require__(91);

	var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);

	var _handlebarsCompilerVisitor = __webpack_require__(88);

	var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);

	var _handlebarsNoConflict = __webpack_require__(83);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	var _create = _handlebarsRuntime2['default'].create;
	function create() {
	  var hb = _create();

	  hb.compile = function (input, options) {
	    return _handlebarsCompilerCompiler.compile(input, options, hb);
	  };
	  hb.precompile = function (input, options) {
	    return _handlebarsCompilerCompiler.precompile(input, options, hb);
	  };

	  hb.AST = _handlebarsCompilerAst2['default'];
	  hb.Compiler = _handlebarsCompilerCompiler.Compiler;
	  hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
	  hb.Parser = _handlebarsCompilerBase.parser;
	  hb.parse = _handlebarsCompilerBase.parse;
	  hb.parseWithoutProcessing = _handlebarsCompilerBase.parseWithoutProcessing;

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst.Visitor = _handlebarsCompilerVisitor2['default'];

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(3)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _handlebarsBase = __webpack_require__(4);

	var base = _interopRequireWildcard(_handlebarsBase);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _handlebarsSafeString = __webpack_require__(77);

	var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

	var _handlebarsException = __webpack_require__(6);

	var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

	var _handlebarsUtils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_handlebarsUtils);

	var _handlebarsRuntime = __webpack_require__(78);

	var runtime = _interopRequireWildcard(_handlebarsRuntime);

	var _handlebarsNoConflict = __webpack_require__(83);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _handlebarsSafeString2['default'];
	  hb.Exception = _handlebarsException2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj["default"] = obj;
	    return newObj;
	  }
	};

	exports.__esModule = true;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;

	var _utils = __webpack_require__(5);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _helpers = __webpack_require__(10);

	var _decorators = __webpack_require__(70);

	var _logger = __webpack_require__(72);

	var _logger2 = _interopRequireDefault(_logger);

	var _internalProtoAccess = __webpack_require__(73);

	var VERSION = '4.7.8';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 8;
	exports.COMPILER_REVISION = COMPILER_REVISION;
	var LAST_COMPATIBLE_COMPILER_REVISION = 7;

	exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1',
	  7: '>= 4.0.0 <4.3.0',
	  8: '>= 4.3.0'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};

	  _helpers.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: _logger2['default'],
	  log: _logger2['default'].log,

	  registerHelper: function registerHelper(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple helpers');
	      }
	      _utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (_utils.toString.call(name) === objectType) {
	      _utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  },

	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple decorators');
	      }
	      _utils.extend(this.decorators, name);
	    } else {
	      this.decorators[name] = fn;
	    }
	  },
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];
	  },
	  /**
	   * Reset the memory of illegal property accesses that have already been logged.
	   * @deprecated should only be used in handlebars test-cases
	   */
	  resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
	    _internalProtoAccess.resetLoggedProperties();
	  }
	};

	var log = _logger2['default'].log;

	exports.log = log;
	exports.createFrame = _utils.createFrame;
	exports.logger = _logger2['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.createFrame = createFrame;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '=': '&#x3D;'
	};

	var badChars = /[&<>"'`=]/g,
	    possible = /[&<>"'`=]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/* eslint-disable func-style */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	exports.isFunction = isFunction;

	/* eslint-enable func-style */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};

	exports.isArray = isArray;
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(7)['default'];

	exports.__esModule = true;
	var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      endLineNumber = undefined,
	      column = undefined,
	      endColumn = undefined;

	  if (loc) {
	    line = loc.start.line;
	    endLineNumber = loc.end.line;
	    column = loc.start.column;
	    endColumn = loc.end.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  /* istanbul ignore else */
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  try {
	    if (loc) {
	      this.lineNumber = line;
	      this.endLineNumber = endLineNumber;

	      // Work around issue under safari where we can't directly set the column value
	      /* istanbul ignore next */
	      if (_Object$defineProperty) {
	        Object.defineProperty(this, 'column', {
	          value: column,
	          enumerable: true
	        });
	        Object.defineProperty(this, 'endColumn', {
	          value: endColumn,
	          enumerable: true
	        });
	      } else {
	        this.column = column;
	        this.endColumn = endColumn;
	      }
	    }
	  } catch (nop) {
	    /* Ignore if the browser is very particular */
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(9);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.registerDefaultHelpers = registerDefaultHelpers;
	exports.moveHelperToHooks = moveHelperToHooks;

	var _helpersBlockHelperMissing = __webpack_require__(11);

	var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

	var _helpersEach = __webpack_require__(12);

	var _helpersEach2 = _interopRequireDefault(_helpersEach);

	var _helpersHelperMissing = __webpack_require__(65);

	var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

	var _helpersIf = __webpack_require__(66);

	var _helpersIf2 = _interopRequireDefault(_helpersIf);

	var _helpersLog = __webpack_require__(67);

	var _helpersLog2 = _interopRequireDefault(_helpersLog);

	var _helpersLookup = __webpack_require__(68);

	var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

	var _helpersWith = __webpack_require__(69);

	var _helpersWith2 = _interopRequireDefault(_helpersWith);

	function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2['default'](instance);
	  _helpersEach2['default'](instance);
	  _helpersHelperMissing2['default'](instance);
	  _helpersIf2['default'](instance);
	  _helpersLog2['default'](instance);
	  _helpersLookup2['default'](instance);
	  _helpersWith2['default'](instance);
	}

	function moveHelperToHooks(instance, helperName, keepHelper) {
	  if (instance.helpers[helperName]) {
	    instance.hooks[helperName] = instance.helpers[helperName];
	    if (!keepHelper) {
	      delete instance.helpers[helperName];
	    }
	  }
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (_utils.isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(13)['default'];

	var _Symbol$iterator = __webpack_require__(43)['default'];

	var _getIterator = __webpack_require__(55)['default'];

	var _Object$keys = __webpack_require__(60)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = _utils.createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (_utils.isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          if (i in context) {
	            execIteration(i, i, i === context.length - 1);
	          }
	        }
	      } else if (typeof _Symbol === 'function' && context[_Symbol$iterator]) {
	        var newContext = [];
	        var iterator = _getIterator(context);
	        for (var it = iterator.next(); !it.done; it = iterator.next()) {
	          newContext.push(it.value);
	        }
	        context = newContext;
	        for (var j = context.length; i < j; i++) {
	          execIteration(i, i, i === context.length - 1);
	        }
	      } else {
	        (function () {
	          var priorKey = undefined;

	          _Object$keys(context).forEach(function (key) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey !== undefined) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          });
	          if (priorKey !== undefined) {
	            execIteration(priorKey, i - 1, true);
	          }
	        })();
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(14), __esModule: true };

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(15);
	__webpack_require__(42);
	module.exports = __webpack_require__(21).Symbol;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(9)
	  , global         = __webpack_require__(16)
	  , has            = __webpack_require__(17)
	  , DESCRIPTORS    = __webpack_require__(18)
	  , $export        = __webpack_require__(20)
	  , redefine       = __webpack_require__(24)
	  , $fails         = __webpack_require__(19)
	  , shared         = __webpack_require__(27)
	  , setToStringTag = __webpack_require__(28)
	  , uid            = __webpack_require__(30)
	  , wks            = __webpack_require__(29)
	  , keyOf          = __webpack_require__(31)
	  , $names         = __webpack_require__(36)
	  , enumKeys       = __webpack_require__(37)
	  , isArray        = __webpack_require__(38)
	  , anObject       = __webpack_require__(39)
	  , toIObject      = __webpack_require__(32)
	  , createDesc     = __webpack_require__(26)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(41)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(19)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(16)
	  , core      = __webpack_require__(21)
	  , ctx       = __webpack_require__(22)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(23);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(9)
	  , createDesc = __webpack_require__(26);
	module.exports = __webpack_require__(18) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(16)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(9).setDesc
	  , has = __webpack_require__(17)
	  , TAG = __webpack_require__(29)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(27)('wks')
	  , uid    = __webpack_require__(30)
	  , Symbol = __webpack_require__(16).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(9)
	  , toIObject = __webpack_require__(32);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(33)
	  , defined = __webpack_require__(35);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(34);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(32)
	  , getNames  = __webpack_require__(9).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(9);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(34);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(40);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	module.exports = true;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(45);
	__webpack_require__(51);
	module.exports = __webpack_require__(29)('iterator');

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(46)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(48)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(47)
	  , defined   = __webpack_require__(35);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(41)
	  , $export        = __webpack_require__(20)
	  , redefine       = __webpack_require__(24)
	  , hide           = __webpack_require__(25)
	  , has            = __webpack_require__(17)
	  , Iterators      = __webpack_require__(49)
	  , $iterCreate    = __webpack_require__(50)
	  , setToStringTag = __webpack_require__(28)
	  , getProto       = __webpack_require__(9).getProto
	  , ITERATOR       = __webpack_require__(29)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	module.exports = {};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(9)
	  , descriptor     = __webpack_require__(26)
	  , setToStringTag = __webpack_require__(28)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(25)(IteratorPrototype, __webpack_require__(29)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(52);
	var Iterators = __webpack_require__(49);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(53)
	  , step             = __webpack_require__(54)
	  , Iterators        = __webpack_require__(49)
	  , toIObject        = __webpack_require__(32);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(48)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	__webpack_require__(45);
	module.exports = __webpack_require__(57);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(39)
	  , get      = __webpack_require__(58);
	module.exports = __webpack_require__(21).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(59)
	  , ITERATOR  = __webpack_require__(29)('iterator')
	  , Iterators = __webpack_require__(49);
	module.exports = __webpack_require__(21).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(34)
	  , TAG = __webpack_require__(29)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	module.exports = __webpack_require__(21).Object.keys;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(63);

	__webpack_require__(64)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(35);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(20)
	  , core    = __webpack_require__(21)
	  , fails   = __webpack_require__(19);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('helperMissing', function () /* [args, ]options */{
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} construct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('if', function (conditional, options) {
	    if (arguments.length != 2) {
	      throw new _exception2['default']('#if requires exactly one argument');
	    }
	    if (_utils.isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    if (arguments.length != 2) {
	      throw new _exception2['default']('#unless requires exactly one argument');
	    }
	    return instance.helpers['if'].call(this, conditional, {
	      fn: options.inverse,
	      inverse: options.fn,
	      hash: options.hash
	    });
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 67 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('log', function () /* message, options */{
	    var args = [undefined],
	        options = arguments[arguments.length - 1];
	    for (var i = 0; i < arguments.length - 1; i++) {
	      args.push(arguments[i]);
	    }

	    var level = 1;
	    if (options.hash.level != null) {
	      level = options.hash.level;
	    } else if (options.data && options.data.level != null) {
	      level = options.data.level;
	    }
	    args[0] = level;

	    instance.log.apply(instance, args);
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 68 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('lookup', function (obj, field, options) {
	    if (!obj) {
	      // Note for 5.0: Change to "obj == null" in 5.0
	      return obj;
	    }
	    return options.lookupProperty(obj, field);
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('with', function (context, options) {
	    if (arguments.length != 2) {
	      throw new _exception2['default']('#with requires exactly one argument');
	    }
	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!_utils.isEmpty(context)) {
	      var data = options.data;
	      if (options.data && options.ids) {
	        data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
	      }

	      return fn(context, {
	        data: data,
	        blockParams: _utils.blockParams([context], [data && data.contextPath])
	      });
	    } else {
	      return options.inverse(this);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.registerDefaultDecorators = registerDefaultDecorators;

	var _decoratorsInline = __webpack_require__(71);

	var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

	function registerDefaultDecorators(instance) {
	  _decoratorsInline2['default'](instance);
	}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerDecorator('inline', function (fn, props, container, options) {
	    var ret = fn;
	    if (!props.partials) {
	      props.partials = {};
	      ret = function (context, options) {
	        // Create a new partials stack frame prior to exec.
	        var original = container.partials;
	        container.partials = _utils.extend({}, original, props.partials);
	        var ret = fn(context, options);
	        container.partials = original;
	        return ret;
	      };
	    }

	    props.partials[options.args[0]] = options.fn;

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var logger = {
	  methodMap: ['debug', 'info', 'warn', 'error'],
	  level: 'info',

	  // Maps a given level value to the `methodMap` indexes above.
	  lookupLevel: function lookupLevel(level) {
	    if (typeof level === 'string') {
	      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
	      if (levelMap >= 0) {
	        level = levelMap;
	      } else {
	        level = parseInt(level, 10);
	      }
	    }

	    return level;
	  },

	  // Can be overridden in the host environment
	  log: function log(level) {
	    level = logger.lookupLevel(level);

	    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
	      var method = logger.methodMap[level];
	      // eslint-disable-next-line no-console
	      if (!console[method]) {
	        method = 'log';
	      }

	      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        message[_key - 1] = arguments[_key];
	      }

	      console[method].apply(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports['default'] = logger;
	module.exports = exports['default'];

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$create = __webpack_require__(74)['default'];

	var _Object$keys = __webpack_require__(60)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.createProtoAccessControl = createProtoAccessControl;
	exports.resultIsAllowed = resultIsAllowed;
	exports.resetLoggedProperties = resetLoggedProperties;

	var _createNewLookupObject = __webpack_require__(76);

	var _logger = __webpack_require__(72);

	var _logger2 = _interopRequireDefault(_logger);

	var loggedProperties = _Object$create(null);

	function createProtoAccessControl(runtimeOptions) {
	  var defaultMethodWhiteList = _Object$create(null);
	  defaultMethodWhiteList['constructor'] = false;
	  defaultMethodWhiteList['__defineGetter__'] = false;
	  defaultMethodWhiteList['__defineSetter__'] = false;
	  defaultMethodWhiteList['__lookupGetter__'] = false;

	  var defaultPropertyWhiteList = _Object$create(null);
	  // eslint-disable-next-line no-proto
	  defaultPropertyWhiteList['__proto__'] = false;

	  return {
	    properties: {
	      whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
	      defaultValue: runtimeOptions.allowProtoPropertiesByDefault
	    },
	    methods: {
	      whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
	      defaultValue: runtimeOptions.allowProtoMethodsByDefault
	    }
	  };
	}

	function resultIsAllowed(result, protoAccessControl, propertyName) {
	  if (typeof result === 'function') {
	    return checkWhiteList(protoAccessControl.methods, propertyName);
	  } else {
	    return checkWhiteList(protoAccessControl.properties, propertyName);
	  }
	}

	function checkWhiteList(protoAccessControlForType, propertyName) {
	  if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
	    return protoAccessControlForType.whitelist[propertyName] === true;
	  }
	  if (protoAccessControlForType.defaultValue !== undefined) {
	    return protoAccessControlForType.defaultValue;
	  }
	  logUnexpecedPropertyAccessOnce(propertyName);
	  return false;
	}

	function logUnexpecedPropertyAccessOnce(propertyName) {
	  if (loggedProperties[propertyName] !== true) {
	    loggedProperties[propertyName] = true;
	    _logger2['default'].log('error', 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
	  }
	}

	function resetLoggedProperties() {
	  _Object$keys(loggedProperties).forEach(function (propertyName) {
	    delete loggedProperties[propertyName];
	  });
	}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(9);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$create = __webpack_require__(74)['default'];

	exports.__esModule = true;
	exports.createNewLookupObject = createNewLookupObject;

	var _utils = __webpack_require__(5);

	/**
	 * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
	 * The resulting object can be used with "object[property]" to check if a property exists
	 * @param {...object} sources a varargs parameter of source objects that will be merged
	 * @returns {object}
	 */

	function createNewLookupObject() {
	  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
	    sources[_key] = arguments[_key];
	  }

	  return _utils.extend.apply(undefined, [_Object$create(null)].concat(sources));
	}

/***/ }),
/* 77 */
/***/ (function(module, exports) {

	// Build out our basic SafeString type
	'use strict';

	exports.__esModule = true;
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$seal = __webpack_require__(79)['default'];

	var _Object$keys = __webpack_require__(60)['default'];

	var _interopRequireWildcard = __webpack_require__(3)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.checkRevision = checkRevision;
	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;

	var _utils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_utils);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _base = __webpack_require__(4);

	var _helpers = __webpack_require__(10);

	var _internalWrapHelper = __webpack_require__(82);

	var _internalProtoAccess = __webpack_require__(73);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _base.COMPILER_REVISION;

	  if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
	    return;
	  }

	  if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
	    var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
	        compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	    throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	  } else {
	    // Use the embedded version info since the runtime doesn't know about this revision yet
	    throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  templateSpec.main.decorator = templateSpec.main_d;

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as pseudo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
	  var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;
	      }
	    }
	    partial = env.VM.resolvePartial.call(this, partial, context, options);

	    var extendedOptions = Utils.extend({}, options, {
	      hooks: this.hooks,
	      protoAccessControl: this.protoAccessControl
	    });

	    var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, extendedOptions);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name, loc) {
	      if (!obj || !(name in obj)) {
	        throw new _exception2['default']('"' + name + '" not defined in ' + obj, {
	          loc: loc
	        });
	      }
	      return container.lookupProperty(obj, name);
	    },
	    lookupProperty: function lookupProperty(parent, propertyName) {
	      var result = parent[propertyName];
	      if (result == null) {
	        return result;
	      }
	      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
	        return result;
	      }

	      if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
	        return result;
	      }
	      return undefined;
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        var result = depths[i] && container.lookupProperty(depths[i], name);
	        if (result != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      var ret = templateSpec[i];
	      ret.decorator = templateSpec[i + '_d'];
	      return ret;
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    mergeIfNeeded: function mergeIfNeeded(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },
	    // An empty object to use as replacement for null-contexts
	    nullContext: _Object$seal({}),

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
	      } else {
	        depths = [context];
	      }
	    }

	    function main(context /*, options*/) {
	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
	    }

	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);
	  }

	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
	      wrapHelpersToPassLookupProperty(mergedHelpers, container);
	      container.helpers = mergedHelpers;

	      if (templateSpec.usePartial) {
	        // Use mergeIfNeeded here to prevent compiling global partials multiple times
	        container.partials = container.mergeIfNeeded(options.partials, env.partials);
	      }
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = Utils.extend({}, env.decorators, options.decorators);
	      }

	      container.hooks = {};
	      container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);

	      var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
	      _helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
	      _helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
	    } else {
	      container.protoAccessControl = options.protoAccessControl; // internal option
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;
	      container.hooks = options.hooks;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var currentDepths = depths;
	    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
	      currentDepths = [context].concat(depths);
	    }

	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
	  }

	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	/**
	 * This is currently part of the official API, therefore implementation details should not be changed.
	 */

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      partial = options.data['partial-block'];
	    } else {
	      partial = options.partials[options.name];
	    }
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  // Use the current closure context to save the partial-block if this partial
	  var currentPartialBlock = options.data && options.data['partial-block'];
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;
	  }

	  var partialBlock = undefined;
	  if (options.fn && options.fn !== noop) {
	    (function () {
	      options.data = _base.createFrame(options.data);
	      // Wrapper function to get access to currentPartialBlock from the closure
	      var fn = options.fn;
	      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        // Restore the partial-block from the closure for the execution of the block
	        // i.e. the part inside the block of the partial call.
	        options.data = _base.createFrame(options.data);
	        options.data['partial-block'] = currentPartialBlock;
	        return fn(context, options);
	      };
	      if (fn.partials) {
	        options.partials = Utils.extend({}, options.partials, fn.partials);
	      }
	    })();
	  }

	  if (partial === undefined && partialBlock) {
	    partial = partialBlock;
	  }

	  if (partial === undefined) {
	    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

	function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    var props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);
	  }
	  return prog;
	}

	function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
	  _Object$keys(mergedHelpers).forEach(function (helperName) {
	    var helper = mergedHelpers[helperName];
	    mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
	  });
	}

	function passLookupPropertyOption(helper, container) {
	  var lookupProperty = container.lookupProperty;
	  return _internalWrapHelper.wrapHelper(helper, function (options) {
	    return Utils.extend({ lookupProperty: lookupProperty }, options);
	  });
	}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(81);
	module.exports = __webpack_require__(21).Object.seal;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(40);

	__webpack_require__(64)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(it) : it;
	  };
	});

/***/ }),
/* 82 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.wrapHelper = wrapHelper;

	function wrapHelper(helper, transformOptionsFn) {
	  if (typeof helper !== 'function') {
	    // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
	    // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
	    return helper;
	  }
	  var wrapper = function wrapper() /* dynamic arguments */{
	    var options = arguments[arguments.length - 1];
	    arguments[arguments.length - 1] = transformOptionsFn(options);
	    return helper.apply(this, arguments);
	  };
	  return wrapper;
	}

/***/ }),
/* 83 */
/***/ (function(module, exports) {

	/* global globalThis */
	'use strict';

	exports.__esModule = true;

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  // https://mathiasbynens.be/notes/globalthis
	  (function () {
	    if (typeof globalThis === 'object') return;
	    Object.prototype.__defineGetter__('__magic__', function () {
	      return this;
	    });
	    __magic__.globalThis = __magic__; // eslint-disable-line no-undef
	    delete Object.prototype.__magic__;
	  })();

	  var $Handlebars = globalThis.Handlebars;

	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (globalThis.Handlebars === Handlebars) {
	      globalThis.Handlebars = $Handlebars;
	    }
	    return Handlebars;
	  };
	};

	module.exports = exports['default'];

/***/ }),
/* 84 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var AST = {
	  // Public API used to evaluate derived attributes regarding AST nodes
	  helpers: {
	    // a mustache is definitely a helper if:
	    // * it is an eligible helper, and
	    // * it has at least one parameter or hash segment
	    helperExpression: function helperExpression(node) {
	      return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
	    },

	    scopedId: function scopedId(path) {
	      return (/^\.|this\b/.test(path.original)
	      );
	    },

	    // an ID is simple if it only has one part, and that part is not
	    // `..` or `this`.
	    simpleId: function simpleId(path) {
	      return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
	    }
	  }
	};

	// Must be exported as an object rather than the root of the module as the jison lexer
	// must modify the object to operate properly.
	exports['default'] = AST;
	module.exports = exports['default'];

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	var _interopRequireWildcard = __webpack_require__(3)['default'];

	exports.__esModule = true;
	exports.parseWithoutProcessing = parseWithoutProcessing;
	exports.parse = parse;

	var _parser = __webpack_require__(86);

	var _parser2 = _interopRequireDefault(_parser);

	var _whitespaceControl = __webpack_require__(87);

	var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);

	var _helpers = __webpack_require__(89);

	var Helpers = _interopRequireWildcard(_helpers);

	var _utils = __webpack_require__(5);

	exports.parser = _parser2['default'];

	var yy = {};
	_utils.extend(yy, Helpers);

	function parseWithoutProcessing(input, options) {
	  // Just return if an already-compiled AST was passed in.
	  if (input.type === 'Program') {
	    return input;
	  }

	  _parser2['default'].yy = yy;

	  // Altering the shared object here, but this is ok as parser is a sync operation
	  yy.locInfo = function (locInfo) {
	    return new yy.SourceLocation(options && options.srcName, locInfo);
	  };

	  var ast = _parser2['default'].parse(input);

	  return ast;
	}

	function parse(input, options) {
	  var ast = parseWithoutProcessing(input, options);
	  var strip = new _whitespaceControl2['default'](options);

	  return strip.accept(ast);
	}

/***/ }),
/* 86 */
/***/ (function(module, exports) {

	// File ignored in coverage tests via setting in .istanbul.yml
	/* Jison generated parser */
	"use strict";

	exports.__esModule = true;
	var handlebars = (function () {
	    var parser = { trace: function trace() {},
	        yy: {},
	        symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
	        terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
	        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
	        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {

	            var $0 = $$.length - 1;
	            switch (yystate) {
	                case 1:
	                    return $$[$0 - 1];
	                    break;
	                case 2:
	                    this.$ = yy.prepareProgram($$[$0]);
	                    break;
	                case 3:
	                    this.$ = $$[$0];
	                    break;
	                case 4:
	                    this.$ = $$[$0];
	                    break;
	                case 5:
	                    this.$ = $$[$0];
	                    break;
	                case 6:
	                    this.$ = $$[$0];
	                    break;
	                case 7:
	                    this.$ = $$[$0];
	                    break;
	                case 8:
	                    this.$ = $$[$0];
	                    break;
	                case 9:
	                    this.$ = {
	                        type: 'CommentStatement',
	                        value: yy.stripComment($$[$0]),
	                        strip: yy.stripFlags($$[$0], $$[$0]),
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 10:
	                    this.$ = {
	                        type: 'ContentStatement',
	                        original: $$[$0],
	                        value: $$[$0],
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 11:
	                    this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
	                    break;
	                case 12:
	                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
	                    break;
	                case 13:
	                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
	                    break;
	                case 14:
	                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
	                    break;
	                case 15:
	                    this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 16:
	                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 17:
	                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 18:
	                    this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
	                    break;
	                case 19:
	                    var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
	                        program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
	                    program.chained = true;

	                    this.$ = { strip: $$[$0 - 2].strip, program: program, chain: true };

	                    break;
	                case 20:
	                    this.$ = $$[$0];
	                    break;
	                case 21:
	                    this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
	                    break;
	                case 22:
	                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
	                    break;
	                case 23:
	                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
	                    break;
	                case 24:
	                    this.$ = {
	                        type: 'PartialStatement',
	                        name: $$[$0 - 3],
	                        params: $$[$0 - 2],
	                        hash: $$[$0 - 1],
	                        indent: '',
	                        strip: yy.stripFlags($$[$0 - 4], $$[$0]),
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 25:
	                    this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
	                    break;
	                case 26:
	                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
	                    break;
	                case 27:
	                    this.$ = $$[$0];
	                    break;
	                case 28:
	                    this.$ = $$[$0];
	                    break;
	                case 29:
	                    this.$ = {
	                        type: 'SubExpression',
	                        path: $$[$0 - 3],
	                        params: $$[$0 - 2],
	                        hash: $$[$0 - 1],
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 30:
	                    this.$ = { type: 'Hash', pairs: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 31:
	                    this.$ = { type: 'HashPair', key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 32:
	                    this.$ = yy.id($$[$0 - 1]);
	                    break;
	                case 33:
	                    this.$ = $$[$0];
	                    break;
	                case 34:
	                    this.$ = $$[$0];
	                    break;
	                case 35:
	                    this.$ = { type: 'StringLiteral', value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 36:
	                    this.$ = { type: 'NumberLiteral', value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
	                    break;
	                case 37:
	                    this.$ = { type: 'BooleanLiteral', value: $$[$0] === 'true', original: $$[$0] === 'true', loc: yy.locInfo(this._$) };
	                    break;
	                case 38:
	                    this.$ = { type: 'UndefinedLiteral', original: undefined, value: undefined, loc: yy.locInfo(this._$) };
	                    break;
	                case 39:
	                    this.$ = { type: 'NullLiteral', original: null, value: null, loc: yy.locInfo(this._$) };
	                    break;
	                case 40:
	                    this.$ = $$[$0];
	                    break;
	                case 41:
	                    this.$ = $$[$0];
	                    break;
	                case 42:
	                    this.$ = yy.preparePath(true, $$[$0], this._$);
	                    break;
	                case 43:
	                    this.$ = yy.preparePath(false, $$[$0], this._$);
	                    break;
	                case 44:
	                    $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });this.$ = $$[$0 - 2];
	                    break;
	                case 45:
	                    this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
	                    break;
	                case 46:
	                    this.$ = [];
	                    break;
	                case 47:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 48:
	                    this.$ = [];
	                    break;
	                case 49:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 50:
	                    this.$ = [];
	                    break;
	                case 51:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 58:
	                    this.$ = [];
	                    break;
	                case 59:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 64:
	                    this.$ = [];
	                    break;
	                case 65:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 70:
	                    this.$ = [];
	                    break;
	                case 71:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 78:
	                    this.$ = [];
	                    break;
	                case 79:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 82:
	                    this.$ = [];
	                    break;
	                case 83:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 86:
	                    this.$ = [];
	                    break;
	                case 87:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 90:
	                    this.$ = [];
	                    break;
	                case 91:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 94:
	                    this.$ = [];
	                    break;
	                case 95:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 98:
	                    this.$ = [$$[$0]];
	                    break;
	                case 99:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 100:
	                    this.$ = [$$[$0]];
	                    break;
	                case 101:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	            }
	        },
	        table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
	        defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
	        parseError: function parseError(str, hash) {
	            throw new Error(str);
	        },
	        parse: function parse(input) {
	            var self = this,
	                stack = [0],
	                vstack = [null],
	                lstack = [],
	                table = this.table,
	                yytext = "",
	                yylineno = 0,
	                yyleng = 0,
	                recovering = 0,
	                TERROR = 2,
	                EOF = 1;
	            this.lexer.setInput(input);
	            this.lexer.yy = this.yy;
	            this.yy.lexer = this.lexer;
	            this.yy.parser = this;
	            if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
	            var yyloc = this.lexer.yylloc;
	            lstack.push(yyloc);
	            var ranges = this.lexer.options && this.lexer.options.ranges;
	            if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
	            function popStack(n) {
	                stack.length = stack.length - 2 * n;
	                vstack.length = vstack.length - n;
	                lstack.length = lstack.length - n;
	            }
	            function lex() {
	                var token;
	                token = self.lexer.lex() || 1;
	                if (typeof token !== "number") {
	                    token = self.symbols_[token] || token;
	                }
	                return token;
	            }
	            var symbol,
	                preErrorSymbol,
	                state,
	                action,
	                a,
	                r,
	                yyval = {},
	                p,
	                len,
	                newState,
	                expected;
	            while (true) {
	                state = stack[stack.length - 1];
	                if (this.defaultActions[state]) {
	                    action = this.defaultActions[state];
	                } else {
	                    if (symbol === null || typeof symbol == "undefined") {
	                        symbol = lex();
	                    }
	                    action = table[state] && table[state][symbol];
	                }
	                if (typeof action === "undefined" || !action.length || !action[0]) {
	                    var errStr = "";
	                    if (!recovering) {
	                        expected = [];
	                        for (p in table[state]) if (this.terminals_[p] && p > 2) {
	                            expected.push("'" + this.terminals_[p] + "'");
	                        }
	                        if (this.lexer.showPosition) {
	                            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
	                        } else {
	                            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
	                        }
	                        this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
	                    }
	                }
	                if (action[0] instanceof Array && action.length > 1) {
	                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
	                }
	                switch (action[0]) {
	                    case 1:
	                        stack.push(symbol);
	                        vstack.push(this.lexer.yytext);
	                        lstack.push(this.lexer.yylloc);
	                        stack.push(action[1]);
	                        symbol = null;
	                        if (!preErrorSymbol) {
	                            yyleng = this.lexer.yyleng;
	                            yytext = this.lexer.yytext;
	                            yylineno = this.lexer.yylineno;
	                            yyloc = this.lexer.yylloc;
	                            if (recovering > 0) recovering--;
	                        } else {
	                            symbol = preErrorSymbol;
	                            preErrorSymbol = null;
	                        }
	                        break;
	                    case 2:
	                        len = this.productions_[action[1]][1];
	                        yyval.$ = vstack[vstack.length - len];
	                        yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
	                        if (ranges) {
	                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
	                        }
	                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
	                        if (typeof r !== "undefined") {
	                            return r;
	                        }
	                        if (len) {
	                            stack = stack.slice(0, -1 * len * 2);
	                            vstack = vstack.slice(0, -1 * len);
	                            lstack = lstack.slice(0, -1 * len);
	                        }
	                        stack.push(this.productions_[action[1]][0]);
	                        vstack.push(yyval.$);
	                        lstack.push(yyval._$);
	                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
	                        stack.push(newState);
	                        break;
	                    case 3:
	                        return true;
	                }
	            }
	            return true;
	        }
	    };
	    /* Jison generated lexer */
	    var lexer = (function () {
	        var lexer = { EOF: 1,
	            parseError: function parseError(str, hash) {
	                if (this.yy.parser) {
	                    this.yy.parser.parseError(str, hash);
	                } else {
	                    throw new Error(str);
	                }
	            },
	            setInput: function setInput(input) {
	                this._input = input;
	                this._more = this._less = this.done = false;
	                this.yylineno = this.yyleng = 0;
	                this.yytext = this.matched = this.match = '';
	                this.conditionStack = ['INITIAL'];
	                this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
	                if (this.options.ranges) this.yylloc.range = [0, 0];
	                this.offset = 0;
	                return this;
	            },
	            input: function input() {
	                var ch = this._input[0];
	                this.yytext += ch;
	                this.yyleng++;
	                this.offset++;
	                this.match += ch;
	                this.matched += ch;
	                var lines = ch.match(/(?:\r\n?|\n).*/g);
	                if (lines) {
	                    this.yylineno++;
	                    this.yylloc.last_line++;
	                } else {
	                    this.yylloc.last_column++;
	                }
	                if (this.options.ranges) this.yylloc.range[1]++;

	                this._input = this._input.slice(1);
	                return ch;
	            },
	            unput: function unput(ch) {
	                var len = ch.length;
	                var lines = ch.split(/(?:\r\n?|\n)/g);

	                this._input = ch + this._input;
	                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
	                //this.yyleng -= len;
	                this.offset -= len;
	                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
	                this.match = this.match.substr(0, this.match.length - 1);
	                this.matched = this.matched.substr(0, this.matched.length - 1);

	                if (lines.length - 1) this.yylineno -= lines.length - 1;
	                var r = this.yylloc.range;

	                this.yylloc = { first_line: this.yylloc.first_line,
	                    last_line: this.yylineno + 1,
	                    first_column: this.yylloc.first_column,
	                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
	                };

	                if (this.options.ranges) {
	                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
	                }
	                return this;
	            },
	            more: function more() {
	                this._more = true;
	                return this;
	            },
	            less: function less(n) {
	                this.unput(this.match.slice(n));
	            },
	            pastInput: function pastInput() {
	                var past = this.matched.substr(0, this.matched.length - this.match.length);
	                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
	            },
	            upcomingInput: function upcomingInput() {
	                var next = this.match;
	                if (next.length < 20) {
	                    next += this._input.substr(0, 20 - next.length);
	                }
	                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
	            },
	            showPosition: function showPosition() {
	                var pre = this.pastInput();
	                var c = new Array(pre.length + 1).join("-");
	                return pre + this.upcomingInput() + "\n" + c + "^";
	            },
	            next: function next() {
	                if (this.done) {
	                    return this.EOF;
	                }
	                if (!this._input) this.done = true;

	                var token, match, tempMatch, index, col, lines;
	                if (!this._more) {
	                    this.yytext = '';
	                    this.match = '';
	                }
	                var rules = this._currentRules();
	                for (var i = 0; i < rules.length; i++) {
	                    tempMatch = this._input.match(this.rules[rules[i]]);
	                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
	                        match = tempMatch;
	                        index = i;
	                        if (!this.options.flex) break;
	                    }
	                }
	                if (match) {
	                    lines = match[0].match(/(?:\r\n?|\n).*/g);
	                    if (lines) this.yylineno += lines.length;
	                    this.yylloc = { first_line: this.yylloc.last_line,
	                        last_line: this.yylineno + 1,
	                        first_column: this.yylloc.last_column,
	                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
	                    this.yytext += match[0];
	                    this.match += match[0];
	                    this.matches = match;
	                    this.yyleng = this.yytext.length;
	                    if (this.options.ranges) {
	                        this.yylloc.range = [this.offset, this.offset += this.yyleng];
	                    }
	                    this._more = false;
	                    this._input = this._input.slice(match[0].length);
	                    this.matched += match[0];
	                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
	                    if (this.done && this._input) this.done = false;
	                    if (token) return token;else return;
	                }
	                if (this._input === "") {
	                    return this.EOF;
	                } else {
	                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
	                }
	            },
	            lex: function lex() {
	                var r = this.next();
	                if (typeof r !== 'undefined') {
	                    return r;
	                } else {
	                    return this.lex();
	                }
	            },
	            begin: function begin(condition) {
	                this.conditionStack.push(condition);
	            },
	            popState: function popState() {
	                return this.conditionStack.pop();
	            },
	            _currentRules: function _currentRules() {
	                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
	            },
	            topState: function topState() {
	                return this.conditionStack[this.conditionStack.length - 2];
	            },
	            pushState: function begin(condition) {
	                this.begin(condition);
	            } };
	        lexer.options = {};
	        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

	            function strip(start, end) {
	                return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
	            }

	            var YYSTATE = YY_START;
	            switch ($avoiding_name_collisions) {
	                case 0:
	                    if (yy_.yytext.slice(-2) === "\\\\") {
	                        strip(0, 1);
	                        this.begin("mu");
	                    } else if (yy_.yytext.slice(-1) === "\\") {
	                        strip(0, 1);
	                        this.begin("emu");
	                    } else {
	                        this.begin("mu");
	                    }
	                    if (yy_.yytext) return 15;

	                    break;
	                case 1:
	                    return 15;
	                    break;
	                case 2:
	                    this.popState();
	                    return 15;

	                    break;
	                case 3:
	                    this.begin('raw');return 15;
	                    break;
	                case 4:
	                    this.popState();
	                    // Should be using `this.topState()` below, but it currently
	                    // returns the second top instead of the first top. Opened an
	                    // issue about it at https://github.com/zaach/jison/issues/291
	                    if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
	                        return 15;
	                    } else {
	                        strip(5, 9);
	                        return 'END_RAW_BLOCK';
	                    }

	                    break;
	                case 5:
	                    return 15;
	                    break;
	                case 6:
	                    this.popState();
	                    return 14;

	                    break;
	                case 7:
	                    return 65;
	                    break;
	                case 8:
	                    return 68;
	                    break;
	                case 9:
	                    return 19;
	                    break;
	                case 10:
	                    this.popState();
	                    this.begin('raw');
	                    return 23;

	                    break;
	                case 11:
	                    return 55;
	                    break;
	                case 12:
	                    return 60;
	                    break;
	                case 13:
	                    return 29;
	                    break;
	                case 14:
	                    return 47;
	                    break;
	                case 15:
	                    this.popState();return 44;
	                    break;
	                case 16:
	                    this.popState();return 44;
	                    break;
	                case 17:
	                    return 34;
	                    break;
	                case 18:
	                    return 39;
	                    break;
	                case 19:
	                    return 51;
	                    break;
	                case 20:
	                    return 48;
	                    break;
	                case 21:
	                    this.unput(yy_.yytext);
	                    this.popState();
	                    this.begin('com');

	                    break;
	                case 22:
	                    this.popState();
	                    return 14;

	                    break;
	                case 23:
	                    return 48;
	                    break;
	                case 24:
	                    return 73;
	                    break;
	                case 25:
	                    return 72;
	                    break;
	                case 26:
	                    return 72;
	                    break;
	                case 27:
	                    return 87;
	                    break;
	                case 28:
	                    // ignore whitespace
	                    break;
	                case 29:
	                    this.popState();return 54;
	                    break;
	                case 30:
	                    this.popState();return 33;
	                    break;
	                case 31:
	                    yy_.yytext = strip(1, 2).replace(/\\"/g, '"');return 80;
	                    break;
	                case 32:
	                    yy_.yytext = strip(1, 2).replace(/\\'/g, "'");return 80;
	                    break;
	                case 33:
	                    return 85;
	                    break;
	                case 34:
	                    return 82;
	                    break;
	                case 35:
	                    return 82;
	                    break;
	                case 36:
	                    return 83;
	                    break;
	                case 37:
	                    return 84;
	                    break;
	                case 38:
	                    return 81;
	                    break;
	                case 39:
	                    return 75;
	                    break;
	                case 40:
	                    return 77;
	                    break;
	                case 41:
	                    return 72;
	                    break;
	                case 42:
	                    yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');return 72;
	                    break;
	                case 43:
	                    return 'INVALID';
	                    break;
	                case 44:
	                    return 5;
	                    break;
	            }
	        };
	        lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
	        lexer.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
	        return lexer;
	    })();
	    parser.lexer = lexer;
	    function Parser() {
	        this.yy = {};
	    }Parser.prototype = parser;parser.Parser = Parser;
	    return new Parser();
	})();exports["default"] = handlebars;
	module.exports = exports["default"];

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _visitor = __webpack_require__(88);

	var _visitor2 = _interopRequireDefault(_visitor);

	function WhitespaceControl() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  this.options = options;
	}
	WhitespaceControl.prototype = new _visitor2['default']();

	WhitespaceControl.prototype.Program = function (program) {
	  var doStandalone = !this.options.ignoreStandalone;

	  var isRoot = !this.isRootSeen;
	  this.isRootSeen = true;

	  var body = program.body;
	  for (var i = 0, l = body.length; i < l; i++) {
	    var current = body[i],
	        strip = this.accept(current);

	    if (!strip) {
	      continue;
	    }

	    var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
	        _isNextWhitespace = isNextWhitespace(body, i, isRoot),
	        openStandalone = strip.openStandalone && _isPrevWhitespace,
	        closeStandalone = strip.closeStandalone && _isNextWhitespace,
	        inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

	    if (strip.close) {
	      omitRight(body, i, true);
	    }
	    if (strip.open) {
	      omitLeft(body, i, true);
	    }

	    if (doStandalone && inlineStandalone) {
	      omitRight(body, i);

	      if (omitLeft(body, i)) {
	        // If we are on a standalone node, save the indent info for partials
	        if (current.type === 'PartialStatement') {
	          // Pull out the whitespace from the final line
	          current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
	        }
	      }
	    }
	    if (doStandalone && openStandalone) {
	      omitRight((current.program || current.inverse).body);

	      // Strip out the previous content node if it's whitespace only
	      omitLeft(body, i);
	    }
	    if (doStandalone && closeStandalone) {
	      // Always strip the next node
	      omitRight(body, i);

	      omitLeft((current.inverse || current.program).body);
	    }
	  }

	  return program;
	};

	WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
	  this.accept(block.program);
	  this.accept(block.inverse);

	  // Find the inverse program that is involed with whitespace stripping.
	  var program = block.program || block.inverse,
	      inverse = block.program && block.inverse,
	      firstInverse = inverse,
	      lastInverse = inverse;

	  if (inverse && inverse.chained) {
	    firstInverse = inverse.body[0].program;

	    // Walk the inverse chain to find the last inverse that is actually in the chain.
	    while (lastInverse.chained) {
	      lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
	    }
	  }

	  var strip = {
	    open: block.openStrip.open,
	    close: block.closeStrip.close,

	    // Determine the standalone candiacy. Basically flag our content as being possibly standalone
	    // so our parent can determine if we actually are standalone
	    openStandalone: isNextWhitespace(program.body),
	    closeStandalone: isPrevWhitespace((firstInverse || program).body)
	  };

	  if (block.openStrip.close) {
	    omitRight(program.body, null, true);
	  }

	  if (inverse) {
	    var inverseStrip = block.inverseStrip;

	    if (inverseStrip.open) {
	      omitLeft(program.body, null, true);
	    }

	    if (inverseStrip.close) {
	      omitRight(firstInverse.body, null, true);
	    }
	    if (block.closeStrip.open) {
	      omitLeft(lastInverse.body, null, true);
	    }

	    // Find standalone else statments
	    if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
	      omitLeft(program.body);
	      omitRight(firstInverse.body);
	    }
	  } else if (block.closeStrip.open) {
	    omitLeft(program.body, null, true);
	  }

	  return strip;
	};

	WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
	  return mustache.strip;
	};

	WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
	  /* istanbul ignore next */
	  var strip = node.strip || {};
	  return {
	    inlineStandalone: true,
	    open: strip.open,
	    close: strip.close
	  };
	};

	function isPrevWhitespace(body, i, isRoot) {
	  if (i === undefined) {
	    i = body.length;
	  }

	  // Nodes that end with newlines are considered whitespace (but are special
	  // cased for strip operations)
	  var prev = body[i - 1],
	      sibling = body[i - 2];
	  if (!prev) {
	    return isRoot;
	  }

	  if (prev.type === 'ContentStatement') {
	    return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
	  }
	}
	function isNextWhitespace(body, i, isRoot) {
	  if (i === undefined) {
	    i = -1;
	  }

	  var next = body[i + 1],
	      sibling = body[i + 2];
	  if (!next) {
	    return isRoot;
	  }

	  if (next.type === 'ContentStatement') {
	    return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
	  }
	}

	// Marks the node to the right of the position as omitted.
	// I.e. {{foo}}' ' will mark the ' ' node as omitted.
	//
	// If i is undefined, then the first child will be marked as such.
	//
	// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	// content is met.
	function omitRight(body, i, multiple) {
	  var current = body[i == null ? 0 : i + 1];
	  if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
	    return;
	  }

	  var original = current.value;
	  current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
	  current.rightStripped = current.value !== original;
	}

	// Marks the node to the left of the position as omitted.
	// I.e. ' '{{foo}} will mark the ' ' node as omitted.
	//
	// If i is undefined then the last child will be marked as such.
	//
	// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	// content is met.
	function omitLeft(body, i, multiple) {
	  var current = body[i == null ? body.length - 1 : i - 1];
	  if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
	    return;
	  }

	  // We omit the last node if it's whitespace only and not preceded by a non-content node.
	  var original = current.value;
	  current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
	  current.leftStripped = current.value !== original;
	  return current.leftStripped;
	}

	exports['default'] = WhitespaceControl;
	module.exports = exports['default'];

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	function Visitor() {
	  this.parents = [];
	}

	Visitor.prototype = {
	  constructor: Visitor,
	  mutating: false,

	  // Visits a given value. If mutating, will replace the value if necessary.
	  acceptKey: function acceptKey(node, name) {
	    var value = this.accept(node[name]);
	    if (this.mutating) {
	      // Hacky sanity check: This may have a few false positives for type for the helper
	      // methods but will generally do the right thing without a lot of overhead.
	      if (value && !Visitor.prototype[value.type]) {
	        throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
	      }
	      node[name] = value;
	    }
	  },

	  // Performs an accept operation with added sanity check to ensure
	  // required keys are not removed.
	  acceptRequired: function acceptRequired(node, name) {
	    this.acceptKey(node, name);

	    if (!node[name]) {
	      throw new _exception2['default'](node.type + ' requires ' + name);
	    }
	  },

	  // Traverses a given array. If mutating, empty respnses will be removed
	  // for child elements.
	  acceptArray: function acceptArray(array) {
	    for (var i = 0, l = array.length; i < l; i++) {
	      this.acceptKey(array, i);

	      if (!array[i]) {
	        array.splice(i, 1);
	        i--;
	        l--;
	      }
	    }
	  },

	  accept: function accept(object) {
	    if (!object) {
	      return;
	    }

	    /* istanbul ignore next: Sanity code */
	    if (!this[object.type]) {
	      throw new _exception2['default']('Unknown type: ' + object.type, object);
	    }

	    if (this.current) {
	      this.parents.unshift(this.current);
	    }
	    this.current = object;

	    var ret = this[object.type](object);

	    this.current = this.parents.shift();

	    if (!this.mutating || ret) {
	      return ret;
	    } else if (ret !== false) {
	      return object;
	    }
	  },

	  Program: function Program(program) {
	    this.acceptArray(program.body);
	  },

	  MustacheStatement: visitSubExpression,
	  Decorator: visitSubExpression,

	  BlockStatement: visitBlock,
	  DecoratorBlock: visitBlock,

	  PartialStatement: visitPartial,
	  PartialBlockStatement: function PartialBlockStatement(partial) {
	    visitPartial.call(this, partial);

	    this.acceptKey(partial, 'program');
	  },

	  ContentStatement: function ContentStatement() /* content */{},
	  CommentStatement: function CommentStatement() /* comment */{},

	  SubExpression: visitSubExpression,

	  PathExpression: function PathExpression() /* path */{},

	  StringLiteral: function StringLiteral() /* string */{},
	  NumberLiteral: function NumberLiteral() /* number */{},
	  BooleanLiteral: function BooleanLiteral() /* bool */{},
	  UndefinedLiteral: function UndefinedLiteral() /* literal */{},
	  NullLiteral: function NullLiteral() /* literal */{},

	  Hash: function Hash(hash) {
	    this.acceptArray(hash.pairs);
	  },
	  HashPair: function HashPair(pair) {
	    this.acceptRequired(pair, 'value');
	  }
	};

	function visitSubExpression(mustache) {
	  this.acceptRequired(mustache, 'path');
	  this.acceptArray(mustache.params);
	  this.acceptKey(mustache, 'hash');
	}
	function visitBlock(block) {
	  visitSubExpression.call(this, block);

	  this.acceptKey(block, 'program');
	  this.acceptKey(block, 'inverse');
	}
	function visitPartial(partial) {
	  this.acceptRequired(partial, 'name');
	  this.acceptArray(partial.params);
	  this.acceptKey(partial, 'hash');
	}

	exports['default'] = Visitor;
	module.exports = exports['default'];

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.SourceLocation = SourceLocation;
	exports.id = id;
	exports.stripFlags = stripFlags;
	exports.stripComment = stripComment;
	exports.preparePath = preparePath;
	exports.prepareMustache = prepareMustache;
	exports.prepareRawBlock = prepareRawBlock;
	exports.prepareBlock = prepareBlock;
	exports.prepareProgram = prepareProgram;
	exports.preparePartialBlock = preparePartialBlock;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	function validateClose(open, close) {
	  close = close.path ? close.path.original : close;

	  if (open.path.original !== close) {
	    var errorNode = { loc: open.path.loc };

	    throw new _exception2['default'](open.path.original + " doesn't match " + close, errorNode);
	  }
	}

	function SourceLocation(source, locInfo) {
	  this.source = source;
	  this.start = {
	    line: locInfo.first_line,
	    column: locInfo.first_column
	  };
	  this.end = {
	    line: locInfo.last_line,
	    column: locInfo.last_column
	  };
	}

	function id(token) {
	  if (/^\[.*\]$/.test(token)) {
	    return token.substring(1, token.length - 1);
	  } else {
	    return token;
	  }
	}

	function stripFlags(open, close) {
	  return {
	    open: open.charAt(2) === '~',
	    close: close.charAt(close.length - 3) === '~'
	  };
	}

	function stripComment(comment) {
	  return comment.replace(/^\{\{~?!-?-?/, '').replace(/-?-?~?\}\}$/, '');
	}

	function preparePath(data, parts, loc) {
	  loc = this.locInfo(loc);

	  var original = data ? '@' : '',
	      dig = [],
	      depth = 0;

	  for (var i = 0, l = parts.length; i < l; i++) {
	    var part = parts[i].part,

	    // If we have [] syntax then we do not treat path references as operators,
	    // i.e. foo.[this] resolves to approximately context.foo['this']
	    isLiteral = parts[i].original !== part;
	    original += (parts[i].separator || '') + part;

	    if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
	      if (dig.length > 0) {
	        throw new _exception2['default']('Invalid path: ' + original, { loc: loc });
	      } else if (part === '..') {
	        depth++;
	      }
	    } else {
	      dig.push(part);
	    }
	  }

	  return {
	    type: 'PathExpression',
	    data: data,
	    depth: depth,
	    parts: dig,
	    original: original,
	    loc: loc
	  };
	}

	function prepareMustache(path, params, hash, open, strip, locInfo) {
	  // Must use charAt to support IE pre-10
	  var escapeFlag = open.charAt(3) || open.charAt(2),
	      escaped = escapeFlag !== '{' && escapeFlag !== '&';

	  var decorator = /\*/.test(open);
	  return {
	    type: decorator ? 'Decorator' : 'MustacheStatement',
	    path: path,
	    params: params,
	    hash: hash,
	    escaped: escaped,
	    strip: strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareRawBlock(openRawBlock, contents, close, locInfo) {
	  validateClose(openRawBlock, close);

	  locInfo = this.locInfo(locInfo);
	  var program = {
	    type: 'Program',
	    body: contents,
	    strip: {},
	    loc: locInfo
	  };

	  return {
	    type: 'BlockStatement',
	    path: openRawBlock.path,
	    params: openRawBlock.params,
	    hash: openRawBlock.hash,
	    program: program,
	    openStrip: {},
	    inverseStrip: {},
	    closeStrip: {},
	    loc: locInfo
	  };
	}

	function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
	  if (close && close.path) {
	    validateClose(openBlock, close);
	  }

	  var decorator = /\*/.test(openBlock.open);

	  program.blockParams = openBlock.blockParams;

	  var inverse = undefined,
	      inverseStrip = undefined;

	  if (inverseAndProgram) {
	    if (decorator) {
	      throw new _exception2['default']('Unexpected inverse block on decorator', inverseAndProgram);
	    }

	    if (inverseAndProgram.chain) {
	      inverseAndProgram.program.body[0].closeStrip = close.strip;
	    }

	    inverseStrip = inverseAndProgram.strip;
	    inverse = inverseAndProgram.program;
	  }

	  if (inverted) {
	    inverted = inverse;
	    inverse = program;
	    program = inverted;
	  }

	  return {
	    type: decorator ? 'DecoratorBlock' : 'BlockStatement',
	    path: openBlock.path,
	    params: openBlock.params,
	    hash: openBlock.hash,
	    program: program,
	    inverse: inverse,
	    openStrip: openBlock.strip,
	    inverseStrip: inverseStrip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareProgram(statements, loc) {
	  if (!loc && statements.length) {
	    var firstLoc = statements[0].loc,
	        lastLoc = statements[statements.length - 1].loc;

	    /* istanbul ignore else */
	    if (firstLoc && lastLoc) {
	      loc = {
	        source: firstLoc.source,
	        start: {
	          line: firstLoc.start.line,
	          column: firstLoc.start.column
	        },
	        end: {
	          line: lastLoc.end.line,
	          column: lastLoc.end.column
	        }
	      };
	    }
	  }

	  return {
	    type: 'Program',
	    body: statements,
	    strip: {},
	    loc: loc
	  };
	}

	function preparePartialBlock(open, program, close, locInfo) {
	  validateClose(open, close);

	  return {
	    type: 'PartialBlockStatement',
	    name: open.path,
	    params: open.params,
	    hash: open.hash,
	    program: program,
	    openStrip: open.strip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	/* eslint-disable new-cap */

	'use strict';

	var _Object$create = __webpack_require__(74)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.Compiler = Compiler;
	exports.precompile = precompile;
	exports.compile = compile;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _utils = __webpack_require__(5);

	var _ast = __webpack_require__(84);

	var _ast2 = _interopRequireDefault(_ast);

	var slice = [].slice;

	function Compiler() {}

	// the foundHelper register will disambiguate helper lookup from finding a
	// function in a context. This is necessary for mustache compatibility, which
	// requires that context functions in blocks are evaluated by blockHelperMissing,
	// and then proceed as if the resulting value was provided to blockHelperMissing.

	Compiler.prototype = {
	  compiler: Compiler,

	  equals: function equals(other) {
	    var len = this.opcodes.length;
	    if (other.opcodes.length !== len) {
	      return false;
	    }

	    for (var i = 0; i < len; i++) {
	      var opcode = this.opcodes[i],
	          otherOpcode = other.opcodes[i];
	      if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
	        return false;
	      }
	    }

	    // We know that length is the same between the two arrays because they are directly tied
	    // to the opcode behavior above.
	    len = this.children.length;
	    for (var i = 0; i < len; i++) {
	      if (!this.children[i].equals(other.children[i])) {
	        return false;
	      }
	    }

	    return true;
	  },

	  guid: 0,

	  compile: function compile(program, options) {
	    this.sourceNode = [];
	    this.opcodes = [];
	    this.children = [];
	    this.options = options;
	    this.stringParams = options.stringParams;
	    this.trackIds = options.trackIds;

	    options.blockParams = options.blockParams || [];

	    options.knownHelpers = _utils.extend(_Object$create(null), {
	      helperMissing: true,
	      blockHelperMissing: true,
	      each: true,
	      'if': true,
	      unless: true,
	      'with': true,
	      log: true,
	      lookup: true
	    }, options.knownHelpers);

	    return this.accept(program);
	  },

	  compileProgram: function compileProgram(program) {
	    var childCompiler = new this.compiler(),
	        // eslint-disable-line new-cap
	    result = childCompiler.compile(program, this.options),
	        guid = this.guid++;

	    this.usePartial = this.usePartial || result.usePartial;

	    this.children[guid] = result;
	    this.useDepths = this.useDepths || result.useDepths;

	    return guid;
	  },

	  accept: function accept(node) {
	    /* istanbul ignore next: Sanity code */
	    if (!this[node.type]) {
	      throw new _exception2['default']('Unknown type: ' + node.type, node);
	    }

	    this.sourceNode.unshift(node);
	    var ret = this[node.type](node);
	    this.sourceNode.shift();
	    return ret;
	  },

	  Program: function Program(program) {
	    this.options.blockParams.unshift(program.blockParams);

	    var body = program.body,
	        bodyLength = body.length;
	    for (var i = 0; i < bodyLength; i++) {
	      this.accept(body[i]);
	    }

	    this.options.blockParams.shift();

	    this.isSimple = bodyLength === 1;
	    this.blockParams = program.blockParams ? program.blockParams.length : 0;

	    return this;
	  },

	  BlockStatement: function BlockStatement(block) {
	    transformLiteralToPath(block);

	    var program = block.program,
	        inverse = block.inverse;

	    program = program && this.compileProgram(program);
	    inverse = inverse && this.compileProgram(inverse);

	    var type = this.classifySexpr(block);

	    if (type === 'helper') {
	      this.helperSexpr(block, program, inverse);
	    } else if (type === 'simple') {
	      this.simpleSexpr(block);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('blockValue', block.path.original);
	    } else {
	      this.ambiguousSexpr(block, program, inverse);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('ambiguousBlockValue');
	    }

	    this.opcode('append');
	  },

	  DecoratorBlock: function DecoratorBlock(decorator) {
	    var program = decorator.program && this.compileProgram(decorator.program);
	    var params = this.setupFullMustacheParams(decorator, program, undefined),
	        path = decorator.path;

	    this.useDecorators = true;
	    this.opcode('registerDecorator', params.length, path.original);
	  },

	  PartialStatement: function PartialStatement(partial) {
	    this.usePartial = true;

	    var program = partial.program;
	    if (program) {
	      program = this.compileProgram(partial.program);
	    }

	    var params = partial.params;
	    if (params.length > 1) {
	      throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
	    } else if (!params.length) {
	      if (this.options.explicitPartialContext) {
	        this.opcode('pushLiteral', 'undefined');
	      } else {
	        params.push({ type: 'PathExpression', parts: [], depth: 0 });
	      }
	    }

	    var partialName = partial.name.original,
	        isDynamic = partial.name.type === 'SubExpression';
	    if (isDynamic) {
	      this.accept(partial.name);
	    }

	    this.setupFullMustacheParams(partial, program, undefined, true);

	    var indent = partial.indent || '';
	    if (this.options.preventIndent && indent) {
	      this.opcode('appendContent', indent);
	      indent = '';
	    }

	    this.opcode('invokePartial', isDynamic, partialName, indent);
	    this.opcode('append');
	  },
	  PartialBlockStatement: function PartialBlockStatement(partialBlock) {
	    this.PartialStatement(partialBlock);
	  },

	  MustacheStatement: function MustacheStatement(mustache) {
	    this.SubExpression(mustache);

	    if (mustache.escaped && !this.options.noEscape) {
	      this.opcode('appendEscaped');
	    } else {
	      this.opcode('append');
	    }
	  },
	  Decorator: function Decorator(decorator) {
	    this.DecoratorBlock(decorator);
	  },

	  ContentStatement: function ContentStatement(content) {
	    if (content.value) {
	      this.opcode('appendContent', content.value);
	    }
	  },

	  CommentStatement: function CommentStatement() {},

	  SubExpression: function SubExpression(sexpr) {
	    transformLiteralToPath(sexpr);
	    var type = this.classifySexpr(sexpr);

	    if (type === 'simple') {
	      this.simpleSexpr(sexpr);
	    } else if (type === 'helper') {
	      this.helperSexpr(sexpr);
	    } else {
	      this.ambiguousSexpr(sexpr);
	    }
	  },
	  ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
	    var path = sexpr.path,
	        name = path.parts[0],
	        isBlock = program != null || inverse != null;

	    this.opcode('getContext', path.depth);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    path.strict = true;
	    this.accept(path);

	    this.opcode('invokeAmbiguous', name, isBlock);
	  },

	  simpleSexpr: function simpleSexpr(sexpr) {
	    var path = sexpr.path;
	    path.strict = true;
	    this.accept(path);
	    this.opcode('resolvePossibleLambda');
	  },

	  helperSexpr: function helperSexpr(sexpr, program, inverse) {
	    var params = this.setupFullMustacheParams(sexpr, program, inverse),
	        path = sexpr.path,
	        name = path.parts[0];

	    if (this.options.knownHelpers[name]) {
	      this.opcode('invokeKnownHelper', params.length, name);
	    } else if (this.options.knownHelpersOnly) {
	      throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
	    } else {
	      path.strict = true;
	      path.falsy = true;

	      this.accept(path);
	      this.opcode('invokeHelper', params.length, path.original, _ast2['default'].helpers.simpleId(path));
	    }
	  },

	  PathExpression: function PathExpression(path) {
	    this.addDepth(path.depth);
	    this.opcode('getContext', path.depth);

	    var name = path.parts[0],
	        scoped = _ast2['default'].helpers.scopedId(path),
	        blockParamId = !path.depth && !scoped && this.blockParamIndex(name);

	    if (blockParamId) {
	      this.opcode('lookupBlockParam', blockParamId, path.parts);
	    } else if (!name) {
	      // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
	      this.opcode('pushContext');
	    } else if (path.data) {
	      this.options.data = true;
	      this.opcode('lookupData', path.depth, path.parts, path.strict);
	    } else {
	      this.opcode('lookupOnContext', path.parts, path.falsy, path.strict, scoped);
	    }
	  },

	  StringLiteral: function StringLiteral(string) {
	    this.opcode('pushString', string.value);
	  },

	  NumberLiteral: function NumberLiteral(number) {
	    this.opcode('pushLiteral', number.value);
	  },

	  BooleanLiteral: function BooleanLiteral(bool) {
	    this.opcode('pushLiteral', bool.value);
	  },

	  UndefinedLiteral: function UndefinedLiteral() {
	    this.opcode('pushLiteral', 'undefined');
	  },

	  NullLiteral: function NullLiteral() {
	    this.opcode('pushLiteral', 'null');
	  },

	  Hash: function Hash(hash) {
	    var pairs = hash.pairs,
	        i = 0,
	        l = pairs.length;

	    this.opcode('pushHash');

	    for (; i < l; i++) {
	      this.pushParam(pairs[i].value);
	    }
	    while (i--) {
	      this.opcode('assignToHash', pairs[i].key);
	    }
	    this.opcode('popHash');
	  },

	  // HELPERS
	  opcode: function opcode(name) {
	    this.opcodes.push({
	      opcode: name,
	      args: slice.call(arguments, 1),
	      loc: this.sourceNode[0].loc
	    });
	  },

	  addDepth: function addDepth(depth) {
	    if (!depth) {
	      return;
	    }

	    this.useDepths = true;
	  },

	  classifySexpr: function classifySexpr(sexpr) {
	    var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);

	    var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);

	    // a mustache is an eligible helper if:
	    // * its id is simple (a single part, not `this` or `..`)
	    var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr);

	    // if a mustache is an eligible helper but not a definite
	    // helper, it is ambiguous, and will be resolved in a later
	    // pass or at runtime.
	    var isEligible = !isBlockParam && (isHelper || isSimple);

	    // if ambiguous, we can possibly resolve the ambiguity now
	    // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
	    if (isEligible && !isHelper) {
	      var _name = sexpr.path.parts[0],
	          options = this.options;
	      if (options.knownHelpers[_name]) {
	        isHelper = true;
	      } else if (options.knownHelpersOnly) {
	        isEligible = false;
	      }
	    }

	    if (isHelper) {
	      return 'helper';
	    } else if (isEligible) {
	      return 'ambiguous';
	    } else {
	      return 'simple';
	    }
	  },

	  pushParams: function pushParams(params) {
	    for (var i = 0, l = params.length; i < l; i++) {
	      this.pushParam(params[i]);
	    }
	  },

	  pushParam: function pushParam(val) {
	    var value = val.value != null ? val.value : val.original || '';

	    if (this.stringParams) {
	      if (value.replace) {
	        value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
	      }

	      if (val.depth) {
	        this.addDepth(val.depth);
	      }
	      this.opcode('getContext', val.depth || 0);
	      this.opcode('pushStringParam', value, val.type);

	      if (val.type === 'SubExpression') {
	        // SubExpressions get evaluated and passed in
	        // in string params mode.
	        this.accept(val);
	      }
	    } else {
	      if (this.trackIds) {
	        var blockParamIndex = undefined;
	        if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
	          blockParamIndex = this.blockParamIndex(val.parts[0]);
	        }
	        if (blockParamIndex) {
	          var blockParamChild = val.parts.slice(1).join('.');
	          this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
	        } else {
	          value = val.original || value;
	          if (value.replace) {
	            value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
	          }

	          this.opcode('pushId', val.type, value);
	        }
	      }
	      this.accept(val);
	    }
	  },

	  setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
	    var params = sexpr.params;
	    this.pushParams(params);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    if (sexpr.hash) {
	      this.accept(sexpr.hash);
	    } else {
	      this.opcode('emptyHash', omitEmpty);
	    }

	    return params;
	  },

	  blockParamIndex: function blockParamIndex(name) {
	    for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
	      var blockParams = this.options.blockParams[depth],
	          param = blockParams && _utils.indexOf(blockParams, name);
	      if (blockParams && param >= 0) {
	        return [depth, param];
	      }
	    }
	  }
	};

	function precompile(input, options, env) {
	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
	  }

	  options = options || {};
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var ast = env.parse(input, options),
	      environment = new env.Compiler().compile(ast, options);
	  return new env.JavaScriptCompiler().compile(environment, options);
	}

	function compile(input, options, env) {
	  if (options === undefined) options = {};

	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
	  }

	  options = _utils.extend({}, options);
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var compiled = undefined;

	  function compileInput() {
	    var ast = env.parse(input, options),
	        environment = new env.Compiler().compile(ast, options),
	        templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
	    return env.template(templateSpec);
	  }

	  // Template is only compiled on first use and cached after that point.
	  function ret(context, execOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled.call(this, context, execOptions);
	  }
	  ret._setup = function (setupOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._setup(setupOptions);
	  };
	  ret._child = function (i, data, blockParams, depths) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._child(i, data, blockParams, depths);
	  };
	  return ret;
	}

	function argEquals(a, b) {
	  if (a === b) {
	    return true;
	  }

	  if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
	    for (var i = 0; i < a.length; i++) {
	      if (!argEquals(a[i], b[i])) {
	        return false;
	      }
	    }
	    return true;
	  }
	}

	function transformLiteralToPath(sexpr) {
	  if (!sexpr.path.parts) {
	    var literal = sexpr.path;
	    // Casting to string here to make false and 0 literal values play nicely with the rest
	    // of the system.
	    sexpr.path = {
	      type: 'PathExpression',
	      data: false,
	      depth: 0,
	      parts: [literal.original + ''],
	      original: literal.original + '',
	      loc: literal.loc
	    };
	  }
	}

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$keys = __webpack_require__(60)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _base = __webpack_require__(4);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _utils = __webpack_require__(5);

	var _codeGen = __webpack_require__(92);

	var _codeGen2 = _interopRequireDefault(_codeGen);

	function Literal(value) {
	  this.value = value;
	}

	function JavaScriptCompiler() {}

	JavaScriptCompiler.prototype = {
	  // PUBLIC API: You can override these methods in a subclass to provide
	  // alternative compiled forms for name lookup and buffering semantics
	  nameLookup: function nameLookup(parent, name /*,  type */) {
	    return this.internalNameLookup(parent, name);
	  },
	  depthedLookup: function depthedLookup(name) {
	    return [this.aliasable('container.lookup'), '(depths, ', JSON.stringify(name), ')'];
	  },

	  compilerInfo: function compilerInfo() {
	    var revision = _base.COMPILER_REVISION,
	        versions = _base.REVISION_CHANGES[revision];
	    return [revision, versions];
	  },

	  appendToBuffer: function appendToBuffer(source, location, explicit) {
	    // Force a source as this simplifies the merge logic.
	    if (!_utils.isArray(source)) {
	      source = [source];
	    }
	    source = this.source.wrap(source, location);

	    if (this.environment.isSimple) {
	      return ['return ', source, ';'];
	    } else if (explicit) {
	      // This is a case where the buffer operation occurs as a child of another
	      // construct, generally braces. We have to explicitly output these buffer
	      // operations to ensure that the emitted code goes in the correct location.
	      return ['buffer += ', source, ';'];
	    } else {
	      source.appendToBuffer = true;
	      return source;
	    }
	  },

	  initializeBuffer: function initializeBuffer() {
	    return this.quotedString('');
	  },
	  // END PUBLIC API
	  internalNameLookup: function internalNameLookup(parent, name) {
	    this.lookupPropertyFunctionIsUsed = true;
	    return ['lookupProperty(', parent, ',', JSON.stringify(name), ')'];
	  },

	  lookupPropertyFunctionIsUsed: false,

	  compile: function compile(environment, options, context, asObject) {
	    this.environment = environment;
	    this.options = options;
	    this.stringParams = this.options.stringParams;
	    this.trackIds = this.options.trackIds;
	    this.precompile = !asObject;

	    this.name = this.environment.name;
	    this.isChild = !!context;
	    this.context = context || {
	      decorators: [],
	      programs: [],
	      environments: []
	    };

	    this.preamble();

	    this.stackSlot = 0;
	    this.stackVars = [];
	    this.aliases = {};
	    this.registers = { list: [] };
	    this.hashes = [];
	    this.compileStack = [];
	    this.inlineStack = [];
	    this.blockParams = [];

	    this.compileChildren(environment, options);

	    this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
	    this.useBlockParams = this.useBlockParams || environment.useBlockParams;

	    var opcodes = environment.opcodes,
	        opcode = undefined,
	        firstLoc = undefined,
	        i = undefined,
	        l = undefined;

	    for (i = 0, l = opcodes.length; i < l; i++) {
	      opcode = opcodes[i];

	      this.source.currentLocation = opcode.loc;
	      firstLoc = firstLoc || opcode.loc;
	      this[opcode.opcode].apply(this, opcode.args);
	    }

	    // Flush any trailing content that might be pending.
	    this.source.currentLocation = firstLoc;
	    this.pushSource('');

	    /* istanbul ignore next */
	    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
	      throw new _exception2['default']('Compile completed with content left on stack');
	    }

	    if (!this.decorators.isEmpty()) {
	      this.useDecorators = true;

	      this.decorators.prepend(['var decorators = container.decorators, ', this.lookupPropertyFunctionVarDeclaration(), ';\n']);
	      this.decorators.push('return fn;');

	      if (asObject) {
	        this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
	      } else {
	        this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
	        this.decorators.push('}\n');
	        this.decorators = this.decorators.merge();
	      }
	    } else {
	      this.decorators = undefined;
	    }

	    var fn = this.createFunctionContext(asObject);
	    if (!this.isChild) {
	      var ret = {
	        compiler: this.compilerInfo(),
	        main: fn
	      };

	      if (this.decorators) {
	        ret.main_d = this.decorators; // eslint-disable-line camelcase
	        ret.useDecorators = true;
	      }

	      var _context = this.context;
	      var programs = _context.programs;
	      var decorators = _context.decorators;

	      for (i = 0, l = programs.length; i < l; i++) {
	        if (programs[i]) {
	          ret[i] = programs[i];
	          if (decorators[i]) {
	            ret[i + '_d'] = decorators[i];
	            ret.useDecorators = true;
	          }
	        }
	      }

	      if (this.environment.usePartial) {
	        ret.usePartial = true;
	      }
	      if (this.options.data) {
	        ret.useData = true;
	      }
	      if (this.useDepths) {
	        ret.useDepths = true;
	      }
	      if (this.useBlockParams) {
	        ret.useBlockParams = true;
	      }
	      if (this.options.compat) {
	        ret.compat = true;
	      }

	      if (!asObject) {
	        ret.compiler = JSON.stringify(ret.compiler);

	        this.source.currentLocation = { start: { line: 1, column: 0 } };
	        ret = this.objectLiteral(ret);

	        if (options.srcName) {
	          ret = ret.toStringWithSourceMap({ file: options.destName });
	          ret.map = ret.map && ret.map.toString();
	        } else {
	          ret = ret.toString();
	        }
	      } else {
	        ret.compilerOptions = this.options;
	      }

	      return ret;
	    } else {
	      return fn;
	    }
	  },

	  preamble: function preamble() {
	    // track the last context pushed into place to allow skipping the
	    // getContext opcode when it would be a noop
	    this.lastContext = 0;
	    this.source = new _codeGen2['default'](this.options.srcName);
	    this.decorators = new _codeGen2['default'](this.options.srcName);
	  },

	  createFunctionContext: function createFunctionContext(asObject) {
	    // istanbul ignore next

	    var _this = this;

	    var varDeclarations = '';

	    var locals = this.stackVars.concat(this.registers.list);
	    if (locals.length > 0) {
	      varDeclarations += ', ' + locals.join(', ');
	    }

	    // Generate minimizer alias mappings
	    //
	    // When using true SourceNodes, this will update all references to the given alias
	    // as the source nodes are reused in situ. For the non-source node compilation mode,
	    // aliases will not be used, but this case is already being run on the client and
	    // we aren't concern about minimizing the template size.
	    var aliasCount = 0;
	    _Object$keys(this.aliases).forEach(function (alias) {
	      var node = _this.aliases[alias];
	      if (node.children && node.referenceCount > 1) {
	        varDeclarations += ', alias' + ++aliasCount + '=' + alias;
	        node.children[0] = 'alias' + aliasCount;
	      }
	    });

	    if (this.lookupPropertyFunctionIsUsed) {
	      varDeclarations += ', ' + this.lookupPropertyFunctionVarDeclaration();
	    }

	    var params = ['container', 'depth0', 'helpers', 'partials', 'data'];

	    if (this.useBlockParams || this.useDepths) {
	      params.push('blockParams');
	    }
	    if (this.useDepths) {
	      params.push('depths');
	    }

	    // Perform a second pass over the output to merge content when possible
	    var source = this.mergeSource(varDeclarations);

	    if (asObject) {
	      params.push(source);

	      return Function.apply(this, params);
	    } else {
	      return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
	    }
	  },
	  mergeSource: function mergeSource(varDeclarations) {
	    var isSimple = this.environment.isSimple,
	        appendOnly = !this.forceBuffer,
	        appendFirst = undefined,
	        sourceSeen = undefined,
	        bufferStart = undefined,
	        bufferEnd = undefined;
	    this.source.each(function (line) {
	      if (line.appendToBuffer) {
	        if (bufferStart) {
	          line.prepend('  + ');
	        } else {
	          bufferStart = line;
	        }
	        bufferEnd = line;
	      } else {
	        if (bufferStart) {
	          if (!sourceSeen) {
	            appendFirst = true;
	          } else {
	            bufferStart.prepend('buffer += ');
	          }
	          bufferEnd.add(';');
	          bufferStart = bufferEnd = undefined;
	        }

	        sourceSeen = true;
	        if (!isSimple) {
	          appendOnly = false;
	        }
	      }
	    });

	    if (appendOnly) {
	      if (bufferStart) {
	        bufferStart.prepend('return ');
	        bufferEnd.add(';');
	      } else if (!sourceSeen) {
	        this.source.push('return "";');
	      }
	    } else {
	      varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());

	      if (bufferStart) {
	        bufferStart.prepend('return buffer + ');
	        bufferEnd.add(';');
	      } else {
	        this.source.push('return buffer;');
	      }
	    }

	    if (varDeclarations) {
	      this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
	    }

	    return this.source.merge();
	  },

	  lookupPropertyFunctionVarDeclaration: function lookupPropertyFunctionVarDeclaration() {
	    return '\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    '.trim();
	  },

	  // [blockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // On stack, after: return value of blockHelperMissing
	  //
	  // The purpose of this opcode is to take a block of the form
	  // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
	  // replace it on the stack with the result of properly
	  // invoking blockHelperMissing.
	  blockValue: function blockValue(name) {
	    var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
	        params = [this.contextName(0)];
	    this.setupHelperArgs(name, 0, params);

	    var blockName = this.popStack();
	    params.splice(1, 0, blockName);

	    this.push(this.source.functionCall(blockHelperMissing, 'call', params));
	  },

	  // [ambiguousBlockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // Compiler value, before: lastHelper=value of last found helper, if any
	  // On stack, after, if no lastHelper: same as [blockValue]
	  // On stack, after, if lastHelper: value
	  ambiguousBlockValue: function ambiguousBlockValue() {
	    // We're being a bit cheeky and reusing the options value from the prior exec
	    var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
	        params = [this.contextName(0)];
	    this.setupHelperArgs('', 0, params, true);

	    this.flushInline();

	    var current = this.topStack();
	    params.splice(1, 0, current);

	    this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
	  },

	  // [appendContent]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  //
	  // Appends the string value of `content` to the current buffer
	  appendContent: function appendContent(content) {
	    if (this.pendingContent) {
	      content = this.pendingContent + content;
	    } else {
	      this.pendingLocation = this.source.currentLocation;
	    }

	    this.pendingContent = content;
	  },

	  // [append]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Coerces `value` to a String and appends it to the current buffer.
	  //
	  // If `value` is truthy, or 0, it is coerced into a string and appended
	  // Otherwise, the empty string is appended
	  append: function append() {
	    if (this.isInline()) {
	      this.replaceStack(function (current) {
	        return [' != null ? ', current, ' : ""'];
	      });

	      this.pushSource(this.appendToBuffer(this.popStack()));
	    } else {
	      var local = this.popStack();
	      this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
	      if (this.environment.isSimple) {
	        this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
	      }
	    }
	  },

	  // [appendEscaped]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Escape `value` and append it to the buffer
	  appendEscaped: function appendEscaped() {
	    this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
	  },

	  // [getContext]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  // Compiler value, after: lastContext=depth
	  //
	  // Set the value of the `lastContext` compiler value to the depth
	  getContext: function getContext(depth) {
	    this.lastContext = depth;
	  },

	  // [pushContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext, ...
	  //
	  // Pushes the value of the current context onto the stack.
	  pushContext: function pushContext() {
	    this.pushStackLiteral(this.contextName(this.lastContext));
	  },

	  // [lookupOnContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext[name], ...
	  //
	  // Looks up the value of `name` on the current context and pushes
	  // it onto the stack.
	  lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
	    var i = 0;

	    if (!scoped && this.options.compat && !this.lastContext) {
	      // The depthed query is expected to handle the undefined logic for the root level that
	      // is implemented below, so we evaluate that directly in compat mode
	      this.push(this.depthedLookup(parts[i++]));
	    } else {
	      this.pushContext();
	    }

	    this.resolvePath('context', parts, i, falsy, strict);
	  },

	  // [lookupBlockParam]
	  //
	  // On stack, before: ...
	  // On stack, after: blockParam[name], ...
	  //
	  // Looks up the value of `parts` on the given block param and pushes
	  // it onto the stack.
	  lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
	    this.useBlockParams = true;

	    this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
	    this.resolvePath('context', parts, 1);
	  },

	  // [lookupData]
	  //
	  // On stack, before: ...
	  // On stack, after: data, ...
	  //
	  // Push the data lookup operator
	  lookupData: function lookupData(depth, parts, strict) {
	    if (!depth) {
	      this.pushStackLiteral('data');
	    } else {
	      this.pushStackLiteral('container.data(data, ' + depth + ')');
	    }

	    this.resolvePath('data', parts, 0, true, strict);
	  },

	  resolvePath: function resolvePath(type, parts, i, falsy, strict) {
	    // istanbul ignore next

	    var _this2 = this;

	    if (this.options.strict || this.options.assumeObjects) {
	      this.push(strictLookup(this.options.strict && strict, this, parts, i, type));
	      return;
	    }

	    var len = parts.length;
	    for (; i < len; i++) {
	      /* eslint-disable no-loop-func */
	      this.replaceStack(function (current) {
	        var lookup = _this2.nameLookup(current, parts[i], type);
	        // We want to ensure that zero and false are handled properly if the context (falsy flag)
	        // needs to have the special handling for these values.
	        if (!falsy) {
	          return [' != null ? ', lookup, ' : ', current];
	        } else {
	          // Otherwise we can use generic falsy handling
	          return [' && ', lookup];
	        }
	      });
	      /* eslint-enable no-loop-func */
	    }
	  },

	  // [resolvePossibleLambda]
	  //
	  // On stack, before: value, ...
	  // On stack, after: resolved value, ...
	  //
	  // If the `value` is a lambda, replace it on the stack by
	  // the return value of the lambda
	  resolvePossibleLambda: function resolvePossibleLambda() {
	    this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
	  },

	  // [pushStringParam]
	  //
	  // On stack, before: ...
	  // On stack, after: string, currentContext, ...
	  //
	  // This opcode is designed for use in string mode, which
	  // provides the string value of a parameter along with its
	  // depth rather than resolving it immediately.
	  pushStringParam: function pushStringParam(string, type) {
	    this.pushContext();
	    this.pushString(type);

	    // If it's a subexpression, the string result
	    // will be pushed after this opcode.
	    if (type !== 'SubExpression') {
	      if (typeof string === 'string') {
	        this.pushString(string);
	      } else {
	        this.pushStackLiteral(string);
	      }
	    }
	  },

	  emptyHash: function emptyHash(omitEmpty) {
	    if (this.trackIds) {
	      this.push('{}'); // hashIds
	    }
	    if (this.stringParams) {
	      this.push('{}'); // hashContexts
	      this.push('{}'); // hashTypes
	    }
	    this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
	  },
	  pushHash: function pushHash() {
	    if (this.hash) {
	      this.hashes.push(this.hash);
	    }
	    this.hash = { values: {}, types: [], contexts: [], ids: [] };
	  },
	  popHash: function popHash() {
	    var hash = this.hash;
	    this.hash = this.hashes.pop();

	    if (this.trackIds) {
	      this.push(this.objectLiteral(hash.ids));
	    }
	    if (this.stringParams) {
	      this.push(this.objectLiteral(hash.contexts));
	      this.push(this.objectLiteral(hash.types));
	    }

	    this.push(this.objectLiteral(hash.values));
	  },

	  // [pushString]
	  //
	  // On stack, before: ...
	  // On stack, after: quotedString(string), ...
	  //
	  // Push a quoted version of `string` onto the stack
	  pushString: function pushString(string) {
	    this.pushStackLiteral(this.quotedString(string));
	  },

	  // [pushLiteral]
	  //
	  // On stack, before: ...
	  // On stack, after: value, ...
	  //
	  // Pushes a value onto the stack. This operation prevents
	  // the compiler from creating a temporary variable to hold
	  // it.
	  pushLiteral: function pushLiteral(value) {
	    this.pushStackLiteral(value);
	  },

	  // [pushProgram]
	  //
	  // On stack, before: ...
	  // On stack, after: program(guid), ...
	  //
	  // Push a program expression onto the stack. This takes
	  // a compile-time guid and converts it into a runtime-accessible
	  // expression.
	  pushProgram: function pushProgram(guid) {
	    if (guid != null) {
	      this.pushStackLiteral(this.programExpression(guid));
	    } else {
	      this.pushStackLiteral(null);
	    }
	  },

	  // [registerDecorator]
	  //
	  // On stack, before: hash, program, params..., ...
	  // On stack, after: ...
	  //
	  // Pops off the decorator's parameters, invokes the decorator,
	  // and inserts the decorator into the decorators list.
	  registerDecorator: function registerDecorator(paramSize, name) {
	    var foundDecorator = this.nameLookup('decorators', name, 'decorator'),
	        options = this.setupHelperArgs(name, paramSize);

	    this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
	  },

	  // [invokeHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // Pops off the helper's parameters, invokes the helper,
	  // and pushes the helper's return value onto the stack.
	  //
	  // If the helper is not found, `helperMissing` is called.
	  invokeHelper: function invokeHelper(paramSize, name, isSimple) {
	    var nonHelper = this.popStack(),
	        helper = this.setupHelper(paramSize, name);

	    var possibleFunctionCalls = [];

	    if (isSimple) {
	      // direct call to helper
	      possibleFunctionCalls.push(helper.name);
	    }
	    // call a function from the input object
	    possibleFunctionCalls.push(nonHelper);
	    if (!this.options.strict) {
	      possibleFunctionCalls.push(this.aliasable('container.hooks.helperMissing'));
	    }

	    var functionLookupCode = ['(', this.itemsSeparatedBy(possibleFunctionCalls, '||'), ')'];
	    var functionCall = this.source.functionCall(functionLookupCode, 'call', helper.callParams);
	    this.push(functionCall);
	  },

	  itemsSeparatedBy: function itemsSeparatedBy(items, separator) {
	    var result = [];
	    result.push(items[0]);
	    for (var i = 1; i < items.length; i++) {
	      result.push(separator, items[i]);
	    }
	    return result;
	  },
	  // [invokeKnownHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // This operation is used when the helper is known to exist,
	  // so a `helperMissing` fallback is not required.
	  invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
	    var helper = this.setupHelper(paramSize, name);
	    this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
	  },

	  // [invokeAmbiguous]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of disambiguation
	  //
	  // This operation is used when an expression like `{{foo}}`
	  // is provided, but we don't know at compile-time whether it
	  // is a helper or a path.
	  //
	  // This operation emits more code than the other options,
	  // and can be avoided by passing the `knownHelpers` and
	  // `knownHelpersOnly` flags at compile-time.
	  invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
	    this.useRegister('helper');

	    var nonHelper = this.popStack();

	    this.emptyHash();
	    var helper = this.setupHelper(0, name, helperCall);

	    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

	    var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
	    if (!this.options.strict) {
	      lookup[0] = '(helper = ';
	      lookup.push(' != null ? helper : ', this.aliasable('container.hooks.helperMissing'));
	    }

	    this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
	  },

	  // [invokePartial]
	  //
	  // On stack, before: context, ...
	  // On stack after: result of partial invocation
	  //
	  // This operation pops off a context, invokes a partial with that context,
	  // and pushes the result of the invocation back.
	  invokePartial: function invokePartial(isDynamic, name, indent) {
	    var params = [],
	        options = this.setupParams(name, 1, params);

	    if (isDynamic) {
	      name = this.popStack();
	      delete options.name;
	    }

	    if (indent) {
	      options.indent = JSON.stringify(indent);
	    }
	    options.helpers = 'helpers';
	    options.partials = 'partials';
	    options.decorators = 'container.decorators';

	    if (!isDynamic) {
	      params.unshift(this.nameLookup('partials', name, 'partial'));
	    } else {
	      params.unshift(name);
	    }

	    if (this.options.compat) {
	      options.depths = 'depths';
	    }
	    options = this.objectLiteral(options);
	    params.push(options);

	    this.push(this.source.functionCall('container.invokePartial', '', params));
	  },

	  // [assignToHash]
	  //
	  // On stack, before: value, ..., hash, ...
	  // On stack, after: ..., hash, ...
	  //
	  // Pops a value off the stack and assigns it to the current hash
	  assignToHash: function assignToHash(key) {
	    var value = this.popStack(),
	        context = undefined,
	        type = undefined,
	        id = undefined;

	    if (this.trackIds) {
	      id = this.popStack();
	    }
	    if (this.stringParams) {
	      type = this.popStack();
	      context = this.popStack();
	    }

	    var hash = this.hash;
	    if (context) {
	      hash.contexts[key] = context;
	    }
	    if (type) {
	      hash.types[key] = type;
	    }
	    if (id) {
	      hash.ids[key] = id;
	    }
	    hash.values[key] = value;
	  },

	  pushId: function pushId(type, name, child) {
	    if (type === 'BlockParam') {
	      this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
	    } else if (type === 'PathExpression') {
	      this.pushString(name);
	    } else if (type === 'SubExpression') {
	      this.pushStackLiteral('true');
	    } else {
	      this.pushStackLiteral('null');
	    }
	  },

	  // HELPERS

	  compiler: JavaScriptCompiler,

	  compileChildren: function compileChildren(environment, options) {
	    var children = environment.children,
	        child = undefined,
	        compiler = undefined;

	    for (var i = 0, l = children.length; i < l; i++) {
	      child = children[i];
	      compiler = new this.compiler(); // eslint-disable-line new-cap

	      var existing = this.matchExistingProgram(child);

	      if (existing == null) {
	        this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
	        var index = this.context.programs.length;
	        child.index = index;
	        child.name = 'program' + index;
	        this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
	        this.context.decorators[index] = compiler.decorators;
	        this.context.environments[index] = child;

	        this.useDepths = this.useDepths || compiler.useDepths;
	        this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
	        child.useDepths = this.useDepths;
	        child.useBlockParams = this.useBlockParams;
	      } else {
	        child.index = existing.index;
	        child.name = 'program' + existing.index;

	        this.useDepths = this.useDepths || existing.useDepths;
	        this.useBlockParams = this.useBlockParams || existing.useBlockParams;
	      }
	    }
	  },
	  matchExistingProgram: function matchExistingProgram(child) {
	    for (var i = 0, len = this.context.environments.length; i < len; i++) {
	      var environment = this.context.environments[i];
	      if (environment && environment.equals(child)) {
	        return environment;
	      }
	    }
	  },

	  programExpression: function programExpression(guid) {
	    var child = this.environment.children[guid],
	        programParams = [child.index, 'data', child.blockParams];

	    if (this.useBlockParams || this.useDepths) {
	      programParams.push('blockParams');
	    }
	    if (this.useDepths) {
	      programParams.push('depths');
	    }

	    return 'container.program(' + programParams.join(', ') + ')';
	  },

	  useRegister: function useRegister(name) {
	    if (!this.registers[name]) {
	      this.registers[name] = true;
	      this.registers.list.push(name);
	    }
	  },

	  push: function push(expr) {
	    if (!(expr instanceof Literal)) {
	      expr = this.source.wrap(expr);
	    }

	    this.inlineStack.push(expr);
	    return expr;
	  },

	  pushStackLiteral: function pushStackLiteral(item) {
	    this.push(new Literal(item));
	  },

	  pushSource: function pushSource(source) {
	    if (this.pendingContent) {
	      this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
	      this.pendingContent = undefined;
	    }

	    if (source) {
	      this.source.push(source);
	    }
	  },

	  replaceStack: function replaceStack(callback) {
	    var prefix = ['('],
	        stack = undefined,
	        createdStack = undefined,
	        usedLiteral = undefined;

	    /* istanbul ignore next */
	    if (!this.isInline()) {
	      throw new _exception2['default']('replaceStack on non-inline');
	    }

	    // We want to merge the inline statement into the replacement statement via ','
	    var top = this.popStack(true);

	    if (top instanceof Literal) {
	      // Literals do not need to be inlined
	      stack = [top.value];
	      prefix = ['(', stack];
	      usedLiteral = true;
	    } else {
	      // Get or create the current stack name for use by the inline
	      createdStack = true;
	      var _name = this.incrStack();

	      prefix = ['((', this.push(_name), ' = ', top, ')'];
	      stack = this.topStack();
	    }

	    var item = callback.call(this, stack);

	    if (!usedLiteral) {
	      this.popStack();
	    }
	    if (createdStack) {
	      this.stackSlot--;
	    }
	    this.push(prefix.concat(item, ')'));
	  },

	  incrStack: function incrStack() {
	    this.stackSlot++;
	    if (this.stackSlot > this.stackVars.length) {
	      this.stackVars.push('stack' + this.stackSlot);
	    }
	    return this.topStackName();
	  },
	  topStackName: function topStackName() {
	    return 'stack' + this.stackSlot;
	  },
	  flushInline: function flushInline() {
	    var inlineStack = this.inlineStack;
	    this.inlineStack = [];
	    for (var i = 0, len = inlineStack.length; i < len; i++) {
	      var entry = inlineStack[i];
	      /* istanbul ignore if */
	      if (entry instanceof Literal) {
	        this.compileStack.push(entry);
	      } else {
	        var stack = this.incrStack();
	        this.pushSource([stack, ' = ', entry, ';']);
	        this.compileStack.push(stack);
	      }
	    }
	  },
	  isInline: function isInline() {
	    return this.inlineStack.length;
	  },

	  popStack: function popStack(wrapped) {
	    var inline = this.isInline(),
	        item = (inline ? this.inlineStack : this.compileStack).pop();

	    if (!wrapped && item instanceof Literal) {
	      return item.value;
	    } else {
	      if (!inline) {
	        /* istanbul ignore next */
	        if (!this.stackSlot) {
	          throw new _exception2['default']('Invalid stack pop');
	        }
	        this.stackSlot--;
	      }
	      return item;
	    }
	  },

	  topStack: function topStack() {
	    var stack = this.isInline() ? this.inlineStack : this.compileStack,
	        item = stack[stack.length - 1];

	    /* istanbul ignore if */
	    if (item instanceof Literal) {
	      return item.value;
	    } else {
	      return item;
	    }
	  },

	  contextName: function contextName(context) {
	    if (this.useDepths && context) {
	      return 'depths[' + context + ']';
	    } else {
	      return 'depth' + context;
	    }
	  },

	  quotedString: function quotedString(str) {
	    return this.source.quotedString(str);
	  },

	  objectLiteral: function objectLiteral(obj) {
	    return this.source.objectLiteral(obj);
	  },

	  aliasable: function aliasable(name) {
	    var ret = this.aliases[name];
	    if (ret) {
	      ret.referenceCount++;
	      return ret;
	    }

	    ret = this.aliases[name] = this.source.wrap(name);
	    ret.aliasable = true;
	    ret.referenceCount = 1;

	    return ret;
	  },

	  setupHelper: function setupHelper(paramSize, name, blockHelper) {
	    var params = [],
	        paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
	    var foundHelper = this.nameLookup('helpers', name, 'helper'),
	        callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : (container.nullContext || {})');

	    return {
	      params: params,
	      paramsInit: paramsInit,
	      name: foundHelper,
	      callParams: [callContext].concat(params)
	    };
	  },

	  setupParams: function setupParams(helper, paramSize, params) {
	    var options = {},
	        contexts = [],
	        types = [],
	        ids = [],
	        objectArgs = !params,
	        param = undefined;

	    if (objectArgs) {
	      params = [];
	    }

	    options.name = this.quotedString(helper);
	    options.hash = this.popStack();

	    if (this.trackIds) {
	      options.hashIds = this.popStack();
	    }
	    if (this.stringParams) {
	      options.hashTypes = this.popStack();
	      options.hashContexts = this.popStack();
	    }

	    var inverse = this.popStack(),
	        program = this.popStack();

	    // Avoid setting fn and inverse if neither are set. This allows
	    // helpers to do a check for `if (options.fn)`
	    if (program || inverse) {
	      options.fn = program || 'container.noop';
	      options.inverse = inverse || 'container.noop';
	    }

	    // The parameters go on to the stack in order (making sure that they are evaluated in order)
	    // so we need to pop them off the stack in reverse order
	    var i = paramSize;
	    while (i--) {
	      param = this.popStack();
	      params[i] = param;

	      if (this.trackIds) {
	        ids[i] = this.popStack();
	      }
	      if (this.stringParams) {
	        types[i] = this.popStack();
	        contexts[i] = this.popStack();
	      }
	    }

	    if (objectArgs) {
	      options.args = this.source.generateArray(params);
	    }

	    if (this.trackIds) {
	      options.ids = this.source.generateArray(ids);
	    }
	    if (this.stringParams) {
	      options.types = this.source.generateArray(types);
	      options.contexts = this.source.generateArray(contexts);
	    }

	    if (this.options.data) {
	      options.data = 'data';
	    }
	    if (this.useBlockParams) {
	      options.blockParams = 'blockParams';
	    }
	    return options;
	  },

	  setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
	    var options = this.setupParams(helper, paramSize, params);
	    options.loc = JSON.stringify(this.source.currentLocation);
	    options = this.objectLiteral(options);
	    if (useRegister) {
	      this.useRegister('options');
	      params.push('options');
	      return ['options=', options];
	    } else if (params) {
	      params.push(options);
	      return '';
	    } else {
	      return options;
	    }
	  }
	};

	(function () {
	  var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');

	  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

	  for (var i = 0, l = reservedWords.length; i < l; i++) {
	    compilerWords[reservedWords[i]] = true;
	  }
	})();

	/**
	 * @deprecated May be removed in the next major version
	 */
	JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
	  return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
	};

	function strictLookup(requireTerminal, compiler, parts, i, type) {
	  var stack = compiler.popStack(),
	      len = parts.length;
	  if (requireTerminal) {
	    len--;
	  }

	  for (; i < len; i++) {
	    stack = compiler.nameLookup(stack, parts[i], type);
	  }

	  if (requireTerminal) {
	    return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ', ', JSON.stringify(compiler.source.currentLocation), ' )'];
	  } else {
	    return stack;
	  }
	}

	exports['default'] = JavaScriptCompiler;
	module.exports = exports['default'];

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	/* global define, require */
	'use strict';

	var _Object$keys = __webpack_require__(60)['default'];

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var SourceNode = undefined;

	try {
	  /* istanbul ignore next */
	  if (false) {
	    // We don't support this in AMD environments. For these environments, we assume that
	    // they are running on the browser and thus have no need for the source-map library.
	    var SourceMap = require('source-map');
	    SourceNode = SourceMap.SourceNode;
	  }
	} catch (err) {}
	/* NOP */

	/* istanbul ignore if: tested but not covered in istanbul due to dist build  */
	if (!SourceNode) {
	  SourceNode = function (line, column, srcFile, chunks) {
	    this.src = '';
	    if (chunks) {
	      this.add(chunks);
	    }
	  };
	  /* istanbul ignore next */
	  SourceNode.prototype = {
	    add: function add(chunks) {
	      if (_utils.isArray(chunks)) {
	        chunks = chunks.join('');
	      }
	      this.src += chunks;
	    },
	    prepend: function prepend(chunks) {
	      if (_utils.isArray(chunks)) {
	        chunks = chunks.join('');
	      }
	      this.src = chunks + this.src;
	    },
	    toStringWithSourceMap: function toStringWithSourceMap() {
	      return { code: this.toString() };
	    },
	    toString: function toString() {
	      return this.src;
	    }
	  };
	}

	function castChunk(chunk, codeGen, loc) {
	  if (_utils.isArray(chunk)) {
	    var ret = [];

	    for (var i = 0, len = chunk.length; i < len; i++) {
	      ret.push(codeGen.wrap(chunk[i], loc));
	    }
	    return ret;
	  } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
	    // Handle primitives that the SourceNode will throw up on
	    return chunk + '';
	  }
	  return chunk;
	}

	function CodeGen(srcFile) {
	  this.srcFile = srcFile;
	  this.source = [];
	}

	CodeGen.prototype = {
	  isEmpty: function isEmpty() {
	    return !this.source.length;
	  },
	  prepend: function prepend(source, loc) {
	    this.source.unshift(this.wrap(source, loc));
	  },
	  push: function push(source, loc) {
	    this.source.push(this.wrap(source, loc));
	  },

	  merge: function merge() {
	    var source = this.empty();
	    this.each(function (line) {
	      source.add(['  ', line, '\n']);
	    });
	    return source;
	  },

	  each: function each(iter) {
	    for (var i = 0, len = this.source.length; i < len; i++) {
	      iter(this.source[i]);
	    }
	  },

	  empty: function empty() {
	    var loc = this.currentLocation || { start: {} };
	    return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
	  },
	  wrap: function wrap(chunk) {
	    var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];

	    if (chunk instanceof SourceNode) {
	      return chunk;
	    }

	    chunk = castChunk(chunk, this, loc);

	    return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
	  },

	  functionCall: function functionCall(fn, type, params) {
	    params = this.generateList(params);
	    return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
	  },

	  quotedString: function quotedString(str) {
	    return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
	    .replace(/\u2029/g, '\\u2029') + '"';
	  },

	  objectLiteral: function objectLiteral(obj) {
	    // istanbul ignore next

	    var _this = this;

	    var pairs = [];

	    _Object$keys(obj).forEach(function (key) {
	      var value = castChunk(obj[key], _this);
	      if (value !== 'undefined') {
	        pairs.push([_this.quotedString(key), ':', value]);
	      }
	    });

	    var ret = this.generateList(pairs);
	    ret.prepend('{');
	    ret.add('}');
	    return ret;
	  },

	  generateList: function generateList(entries) {
	    var ret = this.empty();

	    for (var i = 0, len = entries.length; i < len; i++) {
	      if (i) {
	        ret.add(',');
	      }

	      ret.add(castChunk(entries[i], this));
	    }

	    return ret;
	  },

	  generateArray: function generateArray(entries) {
	    var ret = this.generateList(entries);
	    ret.prepend('[');
	    ret.add(']');

	    return ret;
	  }
	};

	exports['default'] = CodeGen;
	module.exports = exports['default'];

/***/ })
/******/ ])
});
;
/**!

BSD 2-Clause License

@license htmx - https://htmx.org
Copyright (c) 2020, Big Sky Software
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

// UMD insanity
// This code sets up support for (in order) AMD, ES6 modules, and globals.
(function (root, factory) {
    //@ts-ignore
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        //@ts-ignore
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals
        root.htmx = root.htmx || factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
return (function () {
        'use strict';

        // Public API
        //** @type {import("./htmx").HtmxApi} */
        // TODO: list all methods in public API
        var htmx = {
            onLoad: onLoadHelper,
            process: processNode,
            on: addEventListenerImpl,
            off: removeEventListenerImpl,
            trigger : triggerEvent,
            ajax : ajaxHelper,
            find : find,
            findAll : findAll,
            closest : closest,
            values : function(elt, type){
                var inputValues = getInputValues(elt, type || "post");
                return inputValues.values;
            },
            remove : removeElement,
            addClass : addClassToElement,
            removeClass : removeClassFromElement,
            toggleClass : toggleClassOnElement,
            takeClass : takeClassForElement,
            defineExtension : defineExtension,
            removeExtension : removeExtension,
            logAll : logAll,
            logNone : logNone,
            logger : null,
            config : {
                historyEnabled:true,
                historyCacheSize:10,
                refreshOnHistoryMiss:false,
                defaultSwapStyle:'innerHTML',
                defaultSwapDelay:0,
                defaultSettleDelay:20,
                includeIndicatorStyles:true,
                indicatorClass:'htmx-indicator',
                requestClass:'htmx-request',
                addedClass:'htmx-added',
                settlingClass:'htmx-settling',
                swappingClass:'htmx-swapping',
                allowEval:true,
                allowScriptTags:true,
                inlineScriptNonce:'',
                attributesToSettle:["class", "style", "width", "height"],
                withCredentials:false,
                timeout:0,
                wsReconnectDelay: 'full-jitter',
                wsBinaryType: 'blob',
                disableSelector: "[hx-disable], [data-hx-disable]",
                useTemplateFragments: false,
                scrollBehavior: 'smooth',
                defaultFocusScroll: false,
                getCacheBusterParam: false,
                globalViewTransitions: false,
                methodsThatUseUrlParams: ["get"],
                selfRequestsOnly: false,
                ignoreTitle: false,
                scrollIntoViewOnBoost: true,
                triggerSpecsCache: null,
            },
            parseInterval:parseInterval,
            _:internalEval,
            createEventSource: function(url){
                return new EventSource(url, {withCredentials:true})
            },
            createWebSocket: function(url){
                var sock = new WebSocket(url, []);
                sock.binaryType = htmx.config.wsBinaryType;
                return sock;
            },
            version: "1.9.12"
        };

        /** @type {import("./htmx").HtmxInternalApi} */
        var internalAPI = {
            addTriggerHandler: addTriggerHandler,
            bodyContains: bodyContains,
            canAccessLocalStorage: canAccessLocalStorage,
            findThisElement: findThisElement,
            filterValues: filterValues,
            hasAttribute: hasAttribute,
            getAttributeValue: getAttributeValue,
            getClosestAttributeValue: getClosestAttributeValue,
            getClosestMatch: getClosestMatch,
            getExpressionVars: getExpressionVars,
            getHeaders: getHeaders,
            getInputValues: getInputValues,
            getInternalData: getInternalData,
            getSwapSpecification: getSwapSpecification,
            getTriggerSpecs: getTriggerSpecs,
            getTarget: getTarget,
            makeFragment: makeFragment,
            mergeObjects: mergeObjects,
            makeSettleInfo: makeSettleInfo,
            oobSwap: oobSwap,
            querySelectorExt: querySelectorExt,
            selectAndSwap: selectAndSwap,
            settleImmediately: settleImmediately,
            shouldCancel: shouldCancel,
            triggerEvent: triggerEvent,
            triggerErrorEvent: triggerErrorEvent,
            withExtensions: withExtensions,
        }

        var VERBS = ['get', 'post', 'put', 'delete', 'patch'];
        var VERB_SELECTOR = VERBS.map(function(verb){
            return "[hx-" + verb + "], [data-hx-" + verb + "]"
        }).join(", ");

        var HEAD_TAG_REGEX = makeTagRegEx('head'),
            TITLE_TAG_REGEX = makeTagRegEx('title'),
            SVG_TAGS_REGEX = makeTagRegEx('svg', true);

        //====================================================================
        // Utilities
        //====================================================================

        /**
         * @param {string} tag
         * @param {boolean} [global]
         * @returns {RegExp}
         */
        function makeTagRegEx(tag, global) {
          return new RegExp('<' + tag + '(\\s[^>]*>|>)([\\s\\S]*?)<\\/' + tag + '>',
            !!global ? 'gim' : 'im')
        }

        function parseInterval(str) {
            if (str == undefined)  {
                return undefined;
            }

            let interval = NaN;
            if (str.slice(-2) == "ms") {
                interval = parseFloat(str.slice(0, -2));
            } else if (str.slice(-1) == "s") {
                interval = parseFloat(str.slice(0, -1)) * 1000;
            } else if (str.slice(-1) == "m") {
                interval = parseFloat(str.slice(0, -1)) * 1000 * 60;
            } else {
                interval = parseFloat(str);
            }
            return isNaN(interval) ? undefined : interval;
        }

        /**
         * @param {HTMLElement} elt
         * @param {string} name
         * @returns {(string | null)}
         */
        function getRawAttribute(elt, name) {
            return elt.getAttribute && elt.getAttribute(name);
        }

        // resolve with both hx and data-hx prefixes
        function hasAttribute(elt, qualifiedName) {
            return elt.hasAttribute && (elt.hasAttribute(qualifiedName) ||
                elt.hasAttribute("data-" + qualifiedName));
        }

        /**
         *
         * @param {HTMLElement} elt
         * @param {string} qualifiedName
         * @returns {(string | null)}
         */
        function getAttributeValue(elt, qualifiedName) {
            return getRawAttribute(elt, qualifiedName) || getRawAttribute(elt, "data-" + qualifiedName);
        }

        /**
         * @param {HTMLElement} elt
         * @returns {HTMLElement | null}
         */
        function parentElt(elt) {
            return elt.parentElement;
        }

        /**
         * @returns {Document}
         */
        function getDocument() {
            return document;
        }

        /**
         * @param {HTMLElement} elt
         * @param {(e:HTMLElement) => boolean} condition
         * @returns {HTMLElement | null}
         */
        function getClosestMatch(elt, condition) {
            while (elt && !condition(elt)) {
                elt = parentElt(elt);
            }

            return elt ? elt : null;
        }

        function getAttributeValueWithDisinheritance(initialElement, ancestor, attributeName){
            var attributeValue = getAttributeValue(ancestor, attributeName);
            var disinherit = getAttributeValue(ancestor, "hx-disinherit");
            if (initialElement !== ancestor && disinherit && (disinherit === "*" || disinherit.split(" ").indexOf(attributeName) >= 0)) {
                return "unset";
            } else {
                return attributeValue
            }
        }

        /**
         * @param {HTMLElement} elt
         * @param {string} attributeName
         * @returns {string | null}
         */
        function getClosestAttributeValue(elt, attributeName) {
            var closestAttr = null;
            getClosestMatch(elt, function (e) {
                return closestAttr = getAttributeValueWithDisinheritance(elt, e, attributeName);
            });
            if (closestAttr !== "unset") {
                return closestAttr;
            }
        }

        /**
         * @param {HTMLElement} elt
         * @param {string} selector
         * @returns {boolean}
         */
        function matches(elt, selector) {
            // @ts-ignore: non-standard properties for browser compatibility
            // noinspection JSUnresolvedVariable
            var matchesFunction = elt.matches || elt.matchesSelector || elt.msMatchesSelector || elt.mozMatchesSelector || elt.webkitMatchesSelector || elt.oMatchesSelector;
            return matchesFunction && matchesFunction.call(elt, selector);
        }

        /**
         * @param {string} str
         * @returns {string}
         */
        function getStartTag(str) {
            var tagMatcher = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
            var match = tagMatcher.exec( str );
            if (match) {
                return match[1].toLowerCase();
            } else {
                return "";
            }
        }

        /**
         *
         * @param {string} resp
         * @param {number} depth
         * @returns {Element}
         */
        function parseHTML(resp, depth) {
            var parser = new DOMParser();
            var responseDoc = parser.parseFromString(resp, "text/html");

            /** @type {Element} */
            var responseNode = responseDoc.body;
            while (depth > 0) {
                depth--;
                // @ts-ignore
                responseNode = responseNode.firstChild;
            }
            if (responseNode == null) {
                // @ts-ignore
                responseNode = getDocument().createDocumentFragment();
            }
            return responseNode;
        }

        function aFullPageResponse(resp) {
            return /<body/.test(resp)
        }

        /**
         *
         * @param {string} response
         * @returns {Element}
         */
        function makeFragment(response) {
            var partialResponse = !aFullPageResponse(response);
            var startTag = getStartTag(response);
            var content = response;
            if (startTag === 'head') {
                content = content.replace(HEAD_TAG_REGEX, '');
            }
            if (htmx.config.useTemplateFragments && partialResponse) {
                var fragment = parseHTML("<body><template>" + content + "</template></body>", 0);
                // @ts-ignore type mismatch between DocumentFragment and Element.
                // TODO: Are these close enough for htmx to use interchangeably?
                var fragmentContent = fragment.querySelector('template').content;
                if (htmx.config.allowScriptTags) {
                    // if there is a nonce set up, set it on the new script tags
                    forEach(fragmentContent.querySelectorAll("script"), function (script) {
                        if (htmx.config.inlineScriptNonce) {
                            script.nonce = htmx.config.inlineScriptNonce;
                        }
                        // mark as executed due to template insertion semantics on all browsers except firefox fml
                        script.htmxExecuted = navigator.userAgent.indexOf("Firefox") === -1;
                    })
                } else {
                    forEach(fragmentContent.querySelectorAll("script"), function (script) {
                        // remove all script tags if scripts are disabled
                        removeElement(script);
                    })
                }
                return fragmentContent;
            }
            switch (startTag) {
                case "thead":
                case "tbody":
                case "tfoot":
                case "colgroup":
                case "caption":
                    return parseHTML("<table>" + content + "</table>", 1);
                case "col":
                    return parseHTML("<table><colgroup>" + content + "</colgroup></table>", 2);
                case "tr":
                    return parseHTML("<table><tbody>" + content + "</tbody></table>", 2);
                case "td":
                case "th":
                    return parseHTML("<table><tbody><tr>" + content + "</tr></tbody></table>", 3);
                case "script":
                case "style":
                    return parseHTML("<div>" + content + "</div>", 1);
                default:
                    return parseHTML(content, 0);
            }
        }

        /**
         * @param {Function} func
         */
        function maybeCall(func){
            if(func) {
                func();
            }
        }

        /**
         * @param {any} o
         * @param {string} type
         * @returns
         */
        function isType(o, type) {
            return Object.prototype.toString.call(o) === "[object " + type + "]";
        }

        /**
         * @param {*} o
         * @returns {o is Function}
         */
        function isFunction(o) {
            return isType(o, "Function");
        }

        /**
         * @param {*} o
         * @returns {o is Object}
         */
        function isRawObject(o) {
            return isType(o, "Object");
        }

        /**
         * getInternalData retrieves "private" data stored by htmx within an element
         * @param {HTMLElement} elt
         * @returns {*}
         */
        function getInternalData(elt) {
            var dataProp = 'htmx-internal-data';
            var data = elt[dataProp];
            if (!data) {
                data = elt[dataProp] = {};
            }
            return data;
        }

        /**
         * toArray converts an ArrayLike object into a real array.
         * @param {ArrayLike} arr
         * @returns {any[]}
         */
        function toArray(arr) {
            var returnArr = [];
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    returnArr.push(arr[i]);
                }
            }
            return returnArr
        }

        function forEach(arr, func) {
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    func(arr[i]);
                }
            }
        }

        function isScrolledIntoView(el) {
            var rect = el.getBoundingClientRect();
            var elemTop = rect.top;
            var elemBottom = rect.bottom;
            return elemTop < window.innerHeight && elemBottom >= 0;
        }

        function bodyContains(elt) {
            // IE Fix
            if (elt.getRootNode && elt.getRootNode() instanceof window.ShadowRoot) {
                return getDocument().body.contains(elt.getRootNode().host);
            } else {
                return getDocument().body.contains(elt);
            }
        }

        function splitOnWhitespace(trigger) {
            return trigger.trim().split(/\s+/);
        }

        /**
         * mergeObjects takes all of the keys from
         * obj2 and duplicates them into obj1
         * @param {Object} obj1
         * @param {Object} obj2
         * @returns {Object}
         */
        function mergeObjects(obj1, obj2) {
            for (var key in obj2) {
                if (obj2.hasOwnProperty(key)) {
                    obj1[key] = obj2[key];
                }
            }
            return obj1;
        }

        function parseJSON(jString) {
            try {
                return JSON.parse(jString);
            } catch(error) {
                logError(error);
                return null;
            }
        }

        function canAccessLocalStorage() {
            var test = 'htmx:localStorageTest';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch(e) {
                return false;
            }
        }

        function normalizePath(path) {
            try {
                var url = new URL(path);
                if (url) {
                    path = url.pathname + url.search;
                }
                // remove trailing slash, unless index page
                if (!(/^\/$/.test(path))) {
                    path = path.replace(/\/+$/, '');
                }
                return path;
            } catch (e) {
                // be kind to IE11, which doesn't support URL()
                return path;
            }
        }

        //==========================================================================================
        // public API
        //==========================================================================================

        function internalEval(str){
            return maybeEval(getDocument().body, function () {
                return eval(str);
            });
        }

        function onLoadHelper(callback) {
            var value = htmx.on("htmx:load", function(evt) {
                callback(evt.detail.elt);
            });
            return value;
        }

        function logAll(){
            htmx.logger = function(elt, event, data) {
                if(console) {
                    console.log(event, elt, data);
                }
            }
        }

        function logNone() {
            htmx.logger = null
        }

        function find(eltOrSelector, selector) {
            if (selector) {
                return eltOrSelector.querySelector(selector);
            } else {
                return find(getDocument(), eltOrSelector);
            }
        }

        function findAll(eltOrSelector, selector) {
            if (selector) {
                return eltOrSelector.querySelectorAll(selector);
            } else {
                return findAll(getDocument(), eltOrSelector);
            }
        }

        function removeElement(elt, delay) {
            elt = resolveTarget(elt);
            if (delay) {
                setTimeout(function(){
                    removeElement(elt);
                    elt = null;
                }, delay);
            } else {
                elt.parentElement.removeChild(elt);
            }
        }

        function addClassToElement(elt, clazz, delay) {
            elt = resolveTarget(elt);
            if (delay) {
                setTimeout(function(){
                    addClassToElement(elt, clazz);
                    elt = null;
                }, delay);
            } else {
                elt.classList && elt.classList.add(clazz);
            }
        }

        function removeClassFromElement(elt, clazz, delay) {
            elt = resolveTarget(elt);
            if (delay) {
                setTimeout(function(){
                    removeClassFromElement(elt, clazz);
                    elt = null;
                }, delay);
            } else {
                if (elt.classList) {
                    elt.classList.remove(clazz);
                    // if there are no classes left, remove the class attribute
                    if (elt.classList.length === 0) {
                        elt.removeAttribute("class");
                    }
                }
            }
        }

        function toggleClassOnElement(elt, clazz) {
            elt = resolveTarget(elt);
            elt.classList.toggle(clazz);
        }

        function takeClassForElement(elt, clazz) {
            elt = resolveTarget(elt);
            forEach(elt.parentElement.children, function(child){
                removeClassFromElement(child, clazz);
            })
            addClassToElement(elt, clazz);
        }

        function closest(elt, selector) {
            elt = resolveTarget(elt);
            if (elt.closest) {
                return elt.closest(selector);
            } else {
                // TODO remove when IE goes away
                do{
                    if (elt == null || matches(elt, selector)){
                        return elt;
                    }
                }
                while (elt = elt && parentElt(elt));
                return null;
            }
        }

        function startsWith(str, prefix) {
            return str.substring(0, prefix.length) === prefix
        }

        function endsWith(str, suffix) {
            return str.substring(str.length - suffix.length) === suffix
        }

        function normalizeSelector(selector) {
            var trimmedSelector = selector.trim();
            if (startsWith(trimmedSelector, "<") && endsWith(trimmedSelector, "/>")) {
                return trimmedSelector.substring(1, trimmedSelector.length - 2);
            } else {
                return trimmedSelector;
            }
        }

        function querySelectorAllExt(elt, selector) {
            if (selector.indexOf("closest ") === 0) {
                return [closest(elt, normalizeSelector(selector.substr(8)))];
            } else if (selector.indexOf("find ") === 0) {
                return [find(elt, normalizeSelector(selector.substr(5)))];
            } else if (selector === "next") {
                return [elt.nextElementSibling]
            } else if (selector.indexOf("next ") === 0) {
                return [scanForwardQuery(elt, normalizeSelector(selector.substr(5)))];
            } else if (selector === "previous") {
                return [elt.previousElementSibling]
            } else if (selector.indexOf("previous ") === 0) {
                return [scanBackwardsQuery(elt, normalizeSelector(selector.substr(9)))];
            } else if (selector === 'document') {
                return [document];
            } else if (selector === 'window') {
                return [window];
            } else if (selector === 'body') {
                return [document.body];
            } else {
                return getDocument().querySelectorAll(normalizeSelector(selector));
            }
        }

        var scanForwardQuery = function(start, match) {
            var results = getDocument().querySelectorAll(match);
            for (var i = 0; i < results.length; i++) {
                var elt = results[i];
                if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_PRECEDING) {
                    return elt;
                }
            }
        }

        var scanBackwardsQuery = function(start, match) {
            var results = getDocument().querySelectorAll(match);
            for (var i = results.length - 1; i >= 0; i--) {
                var elt = results[i];
                if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_FOLLOWING) {
                    return elt;
                }
            }
        }

        function querySelectorExt(eltOrSelector, selector) {
            if (selector) {
                return querySelectorAllExt(eltOrSelector, selector)[0];
            } else {
                return querySelectorAllExt(getDocument().body, eltOrSelector)[0];
            }
        }

        function resolveTarget(arg2) {
            if (isType(arg2, 'String')) {
                return find(arg2);
            } else {
                return arg2;
            }
        }

        function processEventArgs(arg1, arg2, arg3) {
            if (isFunction(arg2)) {
                return {
                    target: getDocument().body,
                    event: arg1,
                    listener: arg2
                }
            } else {
                return {
                    target: resolveTarget(arg1),
                    event: arg2,
                    listener: arg3
                }
            }

        }

        function addEventListenerImpl(arg1, arg2, arg3) {
            ready(function(){
                var eventArgs = processEventArgs(arg1, arg2, arg3);
                eventArgs.target.addEventListener(eventArgs.event, eventArgs.listener);
            })
            var b = isFunction(arg2);
            return b ? arg2 : arg3;
        }

        function removeEventListenerImpl(arg1, arg2, arg3) {
            ready(function(){
                var eventArgs = processEventArgs(arg1, arg2, arg3);
                eventArgs.target.removeEventListener(eventArgs.event, eventArgs.listener);
            })
            return isFunction(arg2) ? arg2 : arg3;
        }

        //====================================================================
        // Node processing
        //====================================================================

        var DUMMY_ELT = getDocument().createElement("output"); // dummy element for bad selectors
        function findAttributeTargets(elt, attrName) {
            var attrTarget = getClosestAttributeValue(elt, attrName);
            if (attrTarget) {
                if (attrTarget === "this") {
                    return [findThisElement(elt, attrName)];
                } else {
                    var result = querySelectorAllExt(elt, attrTarget);
                    if (result.length === 0) {
                        logError('The selector "' + attrTarget + '" on ' + attrName + " returned no matches!");
                        return [DUMMY_ELT]
                    } else {
                        return result;
                    }
                }
            }
        }

        function findThisElement(elt, attribute){
            return getClosestMatch(elt, function (elt) {
                return getAttributeValue(elt, attribute) != null;
            })
        }

        function getTarget(elt) {
            var targetStr = getClosestAttributeValue(elt, "hx-target");
            if (targetStr) {
                if (targetStr === "this") {
                    return findThisElement(elt,'hx-target');
                } else {
                    return querySelectorExt(elt, targetStr)
                }
            } else {
                var data = getInternalData(elt);
                if (data.boosted) {
                    return getDocument().body;
                } else {
                    return elt;
                }
            }
        }

        function shouldSettleAttribute(name) {
            var attributesToSettle = htmx.config.attributesToSettle;
            for (var i = 0; i < attributesToSettle.length; i++) {
                if (name === attributesToSettle[i]) {
                    return true;
                }
            }
            return false;
        }

        function cloneAttributes(mergeTo, mergeFrom) {
            forEach(mergeTo.attributes, function (attr) {
                if (!mergeFrom.hasAttribute(attr.name) && shouldSettleAttribute(attr.name)) {
                    mergeTo.removeAttribute(attr.name)
                }
            });
            forEach(mergeFrom.attributes, function (attr) {
                if (shouldSettleAttribute(attr.name)) {
                    mergeTo.setAttribute(attr.name, attr.value);
                }
            });
        }

        function isInlineSwap(swapStyle, target) {
            var extensions = getExtensions(target);
            for (var i = 0; i < extensions.length; i++) {
                var extension = extensions[i];
                try {
                    if (extension.isInlineSwap(swapStyle)) {
                        return true;
                    }
                } catch(e) {
                    logError(e);
                }
            }
            return swapStyle === "outerHTML";
        }

        /**
         *
         * @param {string} oobValue
         * @param {HTMLElement} oobElement
         * @param {*} settleInfo
         * @returns
         */
        function oobSwap(oobValue, oobElement, settleInfo) {
            var selector = "#" + getRawAttribute(oobElement, "id");
            var swapStyle = "outerHTML";
            if (oobValue === "true") {
                // do nothing
            } else if (oobValue.indexOf(":") > 0) {
                swapStyle = oobValue.substr(0, oobValue.indexOf(":"));
                selector  = oobValue.substr(oobValue.indexOf(":") + 1, oobValue.length);
            } else {
                swapStyle = oobValue;
            }

            var targets = getDocument().querySelectorAll(selector);
            if (targets) {
                forEach(
                    targets,
                    function (target) {
                        var fragment;
                        var oobElementClone = oobElement.cloneNode(true);
                        fragment = getDocument().createDocumentFragment();
                        fragment.appendChild(oobElementClone);
                        if (!isInlineSwap(swapStyle, target)) {
                            fragment = oobElementClone; // if this is not an inline swap, we use the content of the node, not the node itself
                        }

                        var beforeSwapDetails = {shouldSwap: true, target: target, fragment:fragment };
                        if (!triggerEvent(target, 'htmx:oobBeforeSwap', beforeSwapDetails)) return;

                        target = beforeSwapDetails.target; // allow re-targeting
                        if (beforeSwapDetails['shouldSwap']){
                            swap(swapStyle, target, target, fragment, settleInfo);
                        }
                        forEach(settleInfo.elts, function (elt) {
                            triggerEvent(elt, 'htmx:oobAfterSwap', beforeSwapDetails);
                        });
                    }
                );
                oobElement.parentNode.removeChild(oobElement);
            } else {
                oobElement.parentNode.removeChild(oobElement);
                triggerErrorEvent(getDocument().body, "htmx:oobErrorNoTarget", {content: oobElement});
            }
            return oobValue;
        }

        function handleOutOfBandSwaps(elt, fragment, settleInfo) {
            var oobSelects = getClosestAttributeValue(elt, "hx-select-oob");
            if (oobSelects) {
                var oobSelectValues = oobSelects.split(",");
                for (var i = 0; i < oobSelectValues.length; i++) {
                    var oobSelectValue = oobSelectValues[i].split(":", 2);
                    var id = oobSelectValue[0].trim();
                    if (id.indexOf("#") === 0) {
                        id = id.substring(1);
                    }
                    var oobValue = oobSelectValue[1] || "true";
                    var oobElement = fragment.querySelector("#" + id);
                    if (oobElement) {
                        oobSwap(oobValue, oobElement, settleInfo);
                    }
                }
            }
            forEach(findAll(fragment, '[hx-swap-oob], [data-hx-swap-oob]'), function (oobElement) {
                var oobValue = getAttributeValue(oobElement, "hx-swap-oob");
                if (oobValue != null) {
                    oobSwap(oobValue, oobElement, settleInfo);
                }
            });
        }

        function handlePreservedElements(fragment) {
            forEach(findAll(fragment, '[hx-preserve], [data-hx-preserve]'), function (preservedElt) {
                var id = getAttributeValue(preservedElt, "id");
                var oldElt = getDocument().getElementById(id);
                if (oldElt != null) {
                    preservedElt.parentNode.replaceChild(oldElt, preservedElt);
                }
            });
        }

        function handleAttributes(parentNode, fragment, settleInfo) {
            forEach(fragment.querySelectorAll("[id]"), function (newNode) {
                var id = getRawAttribute(newNode, "id")
                if (id && id.length > 0) {
                    var normalizedId = id.replace("'", "\\'");
                    var normalizedTag = newNode.tagName.replace(':', '\\:');
                    var oldNode = parentNode.querySelector(normalizedTag + "[id='" + normalizedId + "']");
                    if (oldNode && oldNode !== parentNode) {
                        var newAttributes = newNode.cloneNode();
                        cloneAttributes(newNode, oldNode);
                        settleInfo.tasks.push(function () {
                            cloneAttributes(newNode, newAttributes);
                        });
                    }
                }
            });
        }

        function makeAjaxLoadTask(child) {
            return function () {
                removeClassFromElement(child, htmx.config.addedClass);
                processNode(child);
                processScripts(child);
                processFocus(child)
                triggerEvent(child, 'htmx:load');
            };
        }

        function processFocus(child) {
            var autofocus = "[autofocus]";
            var autoFocusedElt = matches(child, autofocus) ? child : child.querySelector(autofocus)
            if (autoFocusedElt != null) {
                autoFocusedElt.focus();
            }
        }

        function insertNodesBefore(parentNode, insertBefore, fragment, settleInfo) {
            handleAttributes(parentNode, fragment, settleInfo);
            while(fragment.childNodes.length > 0){
                var child = fragment.firstChild;
                addClassToElement(child, htmx.config.addedClass);
                parentNode.insertBefore(child, insertBefore);
                if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
                    settleInfo.tasks.push(makeAjaxLoadTask(child));
                }
            }
        }

        // based on https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0,
        // derived from Java's string hashcode implementation
        function stringHash(string, hash) {
            var char = 0;
            while (char < string.length){
                hash = (hash << 5) - hash + string.charCodeAt(char++) | 0; // bitwise or ensures we have a 32-bit int
            }
            return hash;
        }

        function attributeHash(elt) {
            var hash = 0;
            // IE fix
            if (elt.attributes) {
                for (var i = 0; i < elt.attributes.length; i++) {
                    var attribute = elt.attributes[i];
                    if(attribute.value){ // only include attributes w/ actual values (empty is same as non-existent)
                        hash = stringHash(attribute.name, hash);
                        hash = stringHash(attribute.value, hash);
                    }
                }
            }
            return hash;
        }

        function deInitOnHandlers(elt) {
            var internalData = getInternalData(elt);
            if (internalData.onHandlers) {
                for (var i = 0; i < internalData.onHandlers.length; i++) {
                    const handlerInfo = internalData.onHandlers[i];
                    elt.removeEventListener(handlerInfo.event, handlerInfo.listener);
                }
                delete internalData.onHandlers
            }
        }

        function deInitNode(element) {
            var internalData = getInternalData(element);
            if (internalData.timeout) {
                clearTimeout(internalData.timeout);
            }
            if (internalData.webSocket) {
                internalData.webSocket.close();
            }
            if (internalData.sseEventSource) {
                internalData.sseEventSource.close();
            }
            if (internalData.listenerInfos) {
                forEach(internalData.listenerInfos, function (info) {
                    if (info.on) {
                        info.on.removeEventListener(info.trigger, info.listener);
                    }
                });
            }
            deInitOnHandlers(element);
            forEach(Object.keys(internalData), function(key) { delete internalData[key] });
        }

        function cleanUpElement(element) {
            triggerEvent(element, "htmx:beforeCleanupElement")
            deInitNode(element);
            if (element.children) { // IE
                forEach(element.children, function(child) { cleanUpElement(child) });
            }
        }

        function swapOuterHTML(target, fragment, settleInfo) {
            if (target.tagName === "BODY") {
                return swapInnerHTML(target, fragment, settleInfo);
            } else {
                // @type {HTMLElement}
                var newElt
                var eltBeforeNewContent = target.previousSibling;
                insertNodesBefore(parentElt(target), target, fragment, settleInfo);
                if (eltBeforeNewContent == null) {
                    newElt = parentElt(target).firstChild;
                } else {
                    newElt = eltBeforeNewContent.nextSibling;
                }
                settleInfo.elts = settleInfo.elts.filter(function(e) { return e != target });
                while(newElt && newElt !== target) {
                    if (newElt.nodeType === Node.ELEMENT_NODE) {
                        settleInfo.elts.push(newElt);
                    }
                    newElt = newElt.nextElementSibling;
                }
                cleanUpElement(target);
                parentElt(target).removeChild(target);
            }
        }

        function swapAfterBegin(target, fragment, settleInfo) {
            return insertNodesBefore(target, target.firstChild, fragment, settleInfo);
        }

        function swapBeforeBegin(target, fragment, settleInfo) {
            return insertNodesBefore(parentElt(target), target, fragment, settleInfo);
        }

        function swapBeforeEnd(target, fragment, settleInfo) {
            return insertNodesBefore(target, null, fragment, settleInfo);
        }

        function swapAfterEnd(target, fragment, settleInfo) {
            return insertNodesBefore(parentElt(target), target.nextSibling, fragment, settleInfo);
        }
        function swapDelete(target, fragment, settleInfo) {
            cleanUpElement(target);
            return parentElt(target).removeChild(target);
        }

        function swapInnerHTML(target, fragment, settleInfo) {
            var firstChild = target.firstChild;
            insertNodesBefore(target, firstChild, fragment, settleInfo);
            if (firstChild) {
                while (firstChild.nextSibling) {
                    cleanUpElement(firstChild.nextSibling)
                    target.removeChild(firstChild.nextSibling);
                }
                cleanUpElement(firstChild)
                target.removeChild(firstChild);
            }
        }

        function maybeSelectFromResponse(elt, fragment, selectOverride) {
            var selector = selectOverride || getClosestAttributeValue(elt, "hx-select");
            if (selector) {
                var newFragment = getDocument().createDocumentFragment();
                forEach(fragment.querySelectorAll(selector), function (node) {
                    newFragment.appendChild(node);
                });
                fragment = newFragment;
            }
            return fragment;
        }

        function swap(swapStyle, elt, target, fragment, settleInfo) {
            switch (swapStyle) {
                case "none":
                    return;
                case "outerHTML":
                    swapOuterHTML(target, fragment, settleInfo);
                    return;
                case "afterbegin":
                    swapAfterBegin(target, fragment, settleInfo);
                    return;
                case "beforebegin":
                    swapBeforeBegin(target, fragment, settleInfo);
                    return;
                case "beforeend":
                    swapBeforeEnd(target, fragment, settleInfo);
                    return;
                case "afterend":
                    swapAfterEnd(target, fragment, settleInfo);
                    return;
                case "delete":
                    swapDelete(target, fragment, settleInfo);
                    return;
                default:
                    var extensions = getExtensions(elt);
                    for (var i = 0; i < extensions.length; i++) {
                        var ext = extensions[i];
                        try {
                            var newElements = ext.handleSwap(swapStyle, target, fragment, settleInfo);
                            if (newElements) {
                                if (typeof newElements.length !== 'undefined') {
                                    // if handleSwap returns an array (like) of elements, we handle them
                                    for (var j = 0; j < newElements.length; j++) {
                                        var child = newElements[j];
                                        if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
                                            settleInfo.tasks.push(makeAjaxLoadTask(child));
                                        }
                                    }
                                }
                                return;
                            }
                        } catch (e) {
                            logError(e);
                        }
                    }
                    if (swapStyle === "innerHTML") {
                        swapInnerHTML(target, fragment, settleInfo);
                    } else {
                        swap(htmx.config.defaultSwapStyle, elt, target, fragment, settleInfo);
                    }
            }
        }

        function findTitle(content) {
            if (content.indexOf('<title') > -1) {
                var contentWithSvgsRemoved = content.replace(SVG_TAGS_REGEX, '');
                var result = contentWithSvgsRemoved.match(TITLE_TAG_REGEX);
                if (result) {
                    return result[2];
                }
            }
        }

        function selectAndSwap(swapStyle, target, elt, responseText, settleInfo, selectOverride) {
            settleInfo.title = findTitle(responseText);
            var fragment = makeFragment(responseText);
            if (fragment) {
                handleOutOfBandSwaps(elt, fragment, settleInfo);
                fragment = maybeSelectFromResponse(elt, fragment, selectOverride);
                handlePreservedElements(fragment);
                return swap(swapStyle, elt, target, fragment, settleInfo);
            }
        }

        function handleTrigger(xhr, header, elt) {
            var triggerBody = xhr.getResponseHeader(header);
            if (triggerBody.indexOf("{") === 0) {
                var triggers = parseJSON(triggerBody);
                for (var eventName in triggers) {
                    if (triggers.hasOwnProperty(eventName)) {
                        var detail = triggers[eventName];
                        if (!isRawObject(detail)) {
                            detail = {"value": detail}
                        }
                        triggerEvent(elt, eventName, detail);
                    }
                }
            } else {
                var eventNames = triggerBody.split(",")
                for (var i = 0; i < eventNames.length; i++) {
                    triggerEvent(elt, eventNames[i].trim(), []);
                }
            }
        }

        var WHITESPACE = /\s/;
        var WHITESPACE_OR_COMMA = /[\s,]/;
        var SYMBOL_START = /[_$a-zA-Z]/;
        var SYMBOL_CONT = /[_$a-zA-Z0-9]/;
        var STRINGISH_START = ['"', "'", "/"];
        var NOT_WHITESPACE = /[^\s]/;
        var COMBINED_SELECTOR_START = /[{(]/;
        var COMBINED_SELECTOR_END = /[})]/;
        function tokenizeString(str) {
            var tokens = [];
            var position = 0;
            while (position < str.length) {
                if(SYMBOL_START.exec(str.charAt(position))) {
                    var startPosition = position;
                    while (SYMBOL_CONT.exec(str.charAt(position + 1))) {
                        position++;
                    }
                    tokens.push(str.substr(startPosition, position - startPosition + 1));
                } else if (STRINGISH_START.indexOf(str.charAt(position)) !== -1) {
                    var startChar = str.charAt(position);
                    var startPosition = position;
                    position++;
                    while (position < str.length && str.charAt(position) !== startChar ) {
                        if (str.charAt(position) === "\\") {
                            position++;
                        }
                        position++;
                    }
                    tokens.push(str.substr(startPosition, position - startPosition + 1));
                } else {
                    var symbol = str.charAt(position);
                    tokens.push(symbol);
                }
                position++;
            }
            return tokens;
        }

        function isPossibleRelativeReference(token, last, paramName) {
            return SYMBOL_START.exec(token.charAt(0)) &&
                token !== "true" &&
                token !== "false" &&
                token !== "this" &&
                token !== paramName &&
                last !== ".";
        }

        function maybeGenerateConditional(elt, tokens, paramName) {
            if (tokens[0] === '[') {
                tokens.shift();
                var bracketCount = 1;
                var conditionalSource = " return (function(" + paramName + "){ return (";
                var last = null;
                while (tokens.length > 0) {
                    var token = tokens[0];
                    if (token === "]") {
                        bracketCount--;
                        if (bracketCount === 0) {
                            if (last === null) {
                                conditionalSource = conditionalSource + "true";
                            }
                            tokens.shift();
                            conditionalSource += ")})";
                            try {
                                var conditionFunction = maybeEval(elt,function () {
                                    return Function(conditionalSource)();
                                    },
                                    function(){return true})
                                conditionFunction.source = conditionalSource;
                                return conditionFunction;
                            } catch (e) {
                                triggerErrorEvent(getDocument().body, "htmx:syntax:error", {error:e, source:conditionalSource})
                                return null;
                            }
                        }
                    } else if (token === "[") {
                        bracketCount++;
                    }
                    if (isPossibleRelativeReference(token, last, paramName)) {
                            conditionalSource += "((" + paramName + "." + token + ") ? (" + paramName + "." + token + ") : (window." + token + "))";
                    } else {
                        conditionalSource = conditionalSource + token;
                    }
                    last = tokens.shift();
                }
            }
        }

        function consumeUntil(tokens, match) {
            var result = "";
            while (tokens.length > 0 && !match.test(tokens[0])) {
                result += tokens.shift();
            }
            return result;
        }

        function consumeCSSSelector(tokens) {
            var result;
            if (tokens.length > 0 && COMBINED_SELECTOR_START.test(tokens[0])) {
                tokens.shift();
                result = consumeUntil(tokens, COMBINED_SELECTOR_END).trim();
                tokens.shift();
            } else {
                result = consumeUntil(tokens, WHITESPACE_OR_COMMA);
            }
            return result;
        }

        var INPUT_SELECTOR = 'input, textarea, select';

        /**
         * @param {HTMLElement} elt
         * @param {string} explicitTrigger
         * @param {cache} cache for trigger specs
         * @returns {import("./htmx").HtmxTriggerSpecification[]}
         */
        function parseAndCacheTrigger(elt, explicitTrigger, cache) {
            var triggerSpecs = [];
            var tokens = tokenizeString(explicitTrigger);
            do {
                consumeUntil(tokens, NOT_WHITESPACE);
                var initialLength = tokens.length;
                var trigger = consumeUntil(tokens, /[,\[\s]/);
                if (trigger !== "") {
                    if (trigger === "every") {
                        var every = {trigger: 'every'};
                        consumeUntil(tokens, NOT_WHITESPACE);
                        every.pollInterval = parseInterval(consumeUntil(tokens, /[,\[\s]/));
                        consumeUntil(tokens, NOT_WHITESPACE);
                        var eventFilter = maybeGenerateConditional(elt, tokens, "event");
                        if (eventFilter) {
                            every.eventFilter = eventFilter;
                        }
                        triggerSpecs.push(every);
                    } else if (trigger.indexOf("sse:") === 0) {
                        triggerSpecs.push({trigger: 'sse', sseEvent: trigger.substr(4)});
                    } else {
                        var triggerSpec = {trigger: trigger};
                        var eventFilter = maybeGenerateConditional(elt, tokens, "event");
                        if (eventFilter) {
                            triggerSpec.eventFilter = eventFilter;
                        }
                        while (tokens.length > 0 && tokens[0] !== ",") {
                            consumeUntil(tokens, NOT_WHITESPACE)
                            var token = tokens.shift();
                            if (token === "changed") {
                                triggerSpec.changed = true;
                            } else if (token === "once") {
                                triggerSpec.once = true;
                            } else if (token === "consume") {
                                triggerSpec.consume = true;
                            } else if (token === "delay" && tokens[0] === ":") {
                                tokens.shift();
                                triggerSpec.delay = parseInterval(consumeUntil(tokens, WHITESPACE_OR_COMMA));
                            } else if (token === "from" && tokens[0] === ":") {
                                tokens.shift();
                                if (COMBINED_SELECTOR_START.test(tokens[0])) {
                                    var from_arg = consumeCSSSelector(tokens);
                                } else {
                                    var from_arg = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                                    if (from_arg === "closest" || from_arg === "find" || from_arg === "next" || from_arg === "previous") {
                                        tokens.shift();
                                        var selector = consumeCSSSelector(tokens);
                                        // `next` and `previous` allow a selector-less syntax
                                        if (selector.length > 0) {
                                            from_arg += " " + selector;
                                        }
                                    }
                                }
                                triggerSpec.from = from_arg;
                            } else if (token === "target" && tokens[0] === ":") {
                                tokens.shift();
                                triggerSpec.target = consumeCSSSelector(tokens);
                            } else if (token === "throttle" && tokens[0] === ":") {
                                tokens.shift();
                                triggerSpec.throttle = parseInterval(consumeUntil(tokens, WHITESPACE_OR_COMMA));
                            } else if (token === "queue" && tokens[0] === ":") {
                                tokens.shift();
                                triggerSpec.queue = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                            } else if (token === "root" && tokens[0] === ":") {
                                tokens.shift();
                                triggerSpec[token] = consumeCSSSelector(tokens);
                            } else if (token === "threshold" && tokens[0] === ":") {
                                tokens.shift();
                                triggerSpec[token] = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                            } else {
                                triggerErrorEvent(elt, "htmx:syntax:error", {token:tokens.shift()});
                            }
                        }
                        triggerSpecs.push(triggerSpec);
                    }
                }
                if (tokens.length === initialLength) {
                    triggerErrorEvent(elt, "htmx:syntax:error", {token:tokens.shift()});
                }
                consumeUntil(tokens, NOT_WHITESPACE);
            } while (tokens[0] === "," && tokens.shift())
            if (cache) {
                cache[explicitTrigger] = triggerSpecs
            }
            return triggerSpecs
        }

        /**
         * @param {HTMLElement} elt
         * @returns {import("./htmx").HtmxTriggerSpecification[]}
         */
        function getTriggerSpecs(elt) {
            var explicitTrigger = getAttributeValue(elt, 'hx-trigger');
            var triggerSpecs = [];
            if (explicitTrigger) {
                var cache = htmx.config.triggerSpecsCache
                triggerSpecs = (cache && cache[explicitTrigger]) || parseAndCacheTrigger(elt, explicitTrigger, cache)
            }

            if (triggerSpecs.length > 0) {
                return triggerSpecs;
            } else if (matches(elt, 'form')) {
                return [{trigger: 'submit'}];
            } else if (matches(elt, 'input[type="button"], input[type="submit"]')){
                return [{trigger: 'click'}];
            } else if (matches(elt, INPUT_SELECTOR)) {
                return [{trigger: 'change'}];
            } else {
                return [{trigger: 'click'}];
            }
        }

        function cancelPolling(elt) {
            getInternalData(elt).cancelled = true;
        }

        function processPolling(elt, handler, spec) {
            var nodeData = getInternalData(elt);
            nodeData.timeout = setTimeout(function () {
                if (bodyContains(elt) && nodeData.cancelled !== true) {
                    if (!maybeFilterEvent(spec, elt, makeEvent('hx:poll:trigger', {
                        triggerSpec: spec,
                        target: elt
                    }))) {
                        handler(elt);
                    }
                    processPolling(elt, handler, spec);
                }
            }, spec.pollInterval);
        }

        function isLocalLink(elt) {
            return location.hostname === elt.hostname &&
                getRawAttribute(elt,'href') &&
                getRawAttribute(elt,'href').indexOf("#") !== 0;
        }

        function boostElement(elt, nodeData, triggerSpecs) {
            if ((elt.tagName === "A" && isLocalLink(elt) && (elt.target === "" || elt.target === "_self")) || elt.tagName === "FORM") {
                nodeData.boosted = true;
                var verb, path;
                if (elt.tagName === "A") {
                    verb = "get";
                    path = getRawAttribute(elt, 'href')
                } else {
                    var rawAttribute = getRawAttribute(elt, "method");
                    verb = rawAttribute ? rawAttribute.toLowerCase() : "get";
                    if (verb === "get") {
                    }
                    path = getRawAttribute(elt, 'action');
                }
                triggerSpecs.forEach(function(triggerSpec) {
                    addEventListener(elt, function(elt, evt) {
                        if (closest(elt, htmx.config.disableSelector)) {
                            cleanUpElement(elt)
                            return
                        }
                        issueAjaxRequest(verb, path, elt, evt)
                    }, nodeData, triggerSpec, true);
                });
            }
        }

        /**
         *
         * @param {Event} evt
         * @param {HTMLElement} elt
         * @returns
         */
        function shouldCancel(evt, elt) {
            if (evt.type === "submit" || evt.type === "click") {
                if (elt.tagName === "FORM") {
                    return true;
                }
                if (matches(elt, 'input[type="submit"], button') && closest(elt, 'form') !== null) {
                    return true;
                }
                if (elt.tagName === "A" && elt.href &&
                    (elt.getAttribute('href') === '#' || elt.getAttribute('href').indexOf("#") !== 0)) {
                    return true;
                }
            }
            return false;
        }

        function ignoreBoostedAnchorCtrlClick(elt, evt) {
            return getInternalData(elt).boosted && elt.tagName === "A" && evt.type === "click" && (evt.ctrlKey || evt.metaKey);
        }

        function maybeFilterEvent(triggerSpec, elt, evt) {
            var eventFilter = triggerSpec.eventFilter;
            if(eventFilter){
                try {
                    return eventFilter.call(elt, evt) !== true;
                } catch(e) {
                    triggerErrorEvent(getDocument().body, "htmx:eventFilter:error", {error: e, source:eventFilter.source});
                    return true;
                }
            }
            return false;
        }

        function addEventListener(elt, handler, nodeData, triggerSpec, explicitCancel) {
            var elementData = getInternalData(elt);
            var eltsToListenOn;
            if (triggerSpec.from) {
                eltsToListenOn = querySelectorAllExt(elt, triggerSpec.from);
            } else {
                eltsToListenOn = [elt];
            }
            // store the initial values of the elements, so we can tell if they change
            if (triggerSpec.changed) {
                eltsToListenOn.forEach(function (eltToListenOn) {
                    var eltToListenOnData = getInternalData(eltToListenOn);
                    eltToListenOnData.lastValue = eltToListenOn.value;
                })
            }
            forEach(eltsToListenOn, function (eltToListenOn) {
                var eventListener = function (evt) {
                    if (!bodyContains(elt)) {
                        eltToListenOn.removeEventListener(triggerSpec.trigger, eventListener);
                        return;
                    }
                    if (ignoreBoostedAnchorCtrlClick(elt, evt)) {
                        return;
                    }
                    if (explicitCancel || shouldCancel(evt, elt)) {
                        evt.preventDefault();
                    }
                    if (maybeFilterEvent(triggerSpec, elt, evt)) {
                        return;
                    }
                    var eventData = getInternalData(evt);
                    eventData.triggerSpec = triggerSpec;
                    if (eventData.handledFor == null) {
                        eventData.handledFor = [];
                    }
                    if (eventData.handledFor.indexOf(elt) < 0) {
                        eventData.handledFor.push(elt);
                        if (triggerSpec.consume) {
                            evt.stopPropagation();
                        }
                        if (triggerSpec.target && evt.target) {
                            if (!matches(evt.target, triggerSpec.target)) {
                                return;
                            }
                        }
                        if (triggerSpec.once) {
                            if (elementData.triggeredOnce) {
                                return;
                            } else {
                                elementData.triggeredOnce = true;
                            }
                        }
                        if (triggerSpec.changed) {
                            var eltToListenOnData = getInternalData(eltToListenOn)
                            if (eltToListenOnData.lastValue === eltToListenOn.value) {
                                return;
                            }
                            eltToListenOnData.lastValue = eltToListenOn.value
                        }
                        if (elementData.delayed) {
                            clearTimeout(elementData.delayed);
                        }
                        if (elementData.throttle) {
                            return;
                        }

                        if (triggerSpec.throttle > 0) {
                            if (!elementData.throttle) {
                                handler(elt, evt);
                                elementData.throttle = setTimeout(function () {
                                    elementData.throttle = null;
                                }, triggerSpec.throttle);
                            }
                        } else if (triggerSpec.delay > 0) {
                            elementData.delayed = setTimeout(function() { handler(elt, evt) }, triggerSpec.delay);
                        } else {
                            triggerEvent(elt, 'htmx:trigger')
                            handler(elt, evt);
                        }
                    }
                };
                if (nodeData.listenerInfos == null) {
                    nodeData.listenerInfos = [];
                }
                nodeData.listenerInfos.push({
                    trigger: triggerSpec.trigger,
                    listener: eventListener,
                    on: eltToListenOn
                })
                eltToListenOn.addEventListener(triggerSpec.trigger, eventListener);
            });
        }

        var windowIsScrolling = false // used by initScrollHandler
        var scrollHandler = null;
        function initScrollHandler() {
            if (!scrollHandler) {
                scrollHandler = function() {
                    windowIsScrolling = true
                };
                window.addEventListener("scroll", scrollHandler)
                setInterval(function() {
                    if (windowIsScrolling) {
                        windowIsScrolling = false;
                        forEach(getDocument().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"), function (elt) {
                            maybeReveal(elt);
                        })
                    }
                }, 200);
            }
        }

        function maybeReveal(elt) {
            if (!hasAttribute(elt,'data-hx-revealed') && isScrolledIntoView(elt)) {
                elt.setAttribute('data-hx-revealed', 'true');
                var nodeData = getInternalData(elt);
                if (nodeData.initHash) {
                    triggerEvent(elt, 'revealed');
                } else {
                    // if the node isn't initialized, wait for it before triggering the request
                    elt.addEventListener("htmx:afterProcessNode", function(evt) { triggerEvent(elt, 'revealed') }, {once: true});
                }
            }
        }

        //====================================================================
        // Web Sockets
        //====================================================================

        function processWebSocketInfo(elt, nodeData, info) {
            var values = splitOnWhitespace(info);
            for (var i = 0; i < values.length; i++) {
                var value = values[i].split(/:(.+)/);
                if (value[0] === "connect") {
                    ensureWebSocket(elt, value[1], 0);
                }
                if (value[0] === "send") {
                    processWebSocketSend(elt);
                }
            }
        }

        function ensureWebSocket(elt, wssSource, retryCount) {
            if (!bodyContains(elt)) {
                return;  // stop ensuring websocket connection when socket bearing element ceases to exist
            }

            if (wssSource.indexOf("/") == 0) {  // complete absolute paths only
                var base_part = location.hostname + (location.port ? ':'+location.port: '');
                if (location.protocol == 'https:') {
                    wssSource = "wss://" + base_part + wssSource;
                } else if (location.protocol == 'http:') {
                    wssSource = "ws://" + base_part + wssSource;
                }
            }
            var socket = htmx.createWebSocket(wssSource);
            socket.onerror = function (e) {
                triggerErrorEvent(elt, "htmx:wsError", {error:e, socket:socket});
                maybeCloseWebSocketSource(elt);
            };

            socket.onclose = function (e) {
                if ([1006, 1012, 1013].indexOf(e.code) >= 0) {  // Abnormal Closure/Service Restart/Try Again Later
                    var delay = getWebSocketReconnectDelay(retryCount);
                    setTimeout(function() {
                        ensureWebSocket(elt, wssSource, retryCount+1);  // creates a websocket with a new timeout
                    }, delay);
                }
            };
            socket.onopen = function (e) {
                retryCount = 0;
            }

            getInternalData(elt).webSocket = socket;
            socket.addEventListener('message', function (event) {
                if (maybeCloseWebSocketSource(elt)) {
                    return;
                }

                var response = event.data;
                withExtensions(elt, function(extension){
                    response = extension.transformResponse(response, null, elt);
                });

                var settleInfo = makeSettleInfo(elt);
                var fragment = makeFragment(response);
                var children = toArray(fragment.children);
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    oobSwap(getAttributeValue(child, "hx-swap-oob") || "true", child, settleInfo);
                }

                settleImmediately(settleInfo.tasks);
            });
        }

        function maybeCloseWebSocketSource(elt) {
            if (!bodyContains(elt)) {
                getInternalData(elt).webSocket.close();
                return true;
            }
        }

        function processWebSocketSend(elt) {
            var webSocketSourceElt = getClosestMatch(elt, function (parent) {
                return getInternalData(parent).webSocket != null;
            });
            if (webSocketSourceElt) {
                elt.addEventListener(getTriggerSpecs(elt)[0].trigger, function (evt) {
                    var webSocket = getInternalData(webSocketSourceElt).webSocket;
                    var headers = getHeaders(elt, webSocketSourceElt);
                    var results = getInputValues(elt, 'post');
                    var errors = results.errors;
                    var rawParameters = results.values;
                    var expressionVars = getExpressionVars(elt);
                    var allParameters = mergeObjects(rawParameters, expressionVars);
                    var filteredParameters = filterValues(allParameters, elt);
                    filteredParameters['HEADERS'] = headers;
                    if (errors && errors.length > 0) {
                        triggerEvent(elt, 'htmx:validation:halted', errors);
                        return;
                    }
                    webSocket.send(JSON.stringify(filteredParameters));
                    if(shouldCancel(evt, elt)){
                        evt.preventDefault();
                    }
                });
            } else {
                triggerErrorEvent(elt, "htmx:noWebSocketSourceError");
            }
        }

        function getWebSocketReconnectDelay(retryCount) {
            var delay = htmx.config.wsReconnectDelay;
            if (typeof delay === 'function') {
                // @ts-ignore
                return delay(retryCount);
            }
            if (delay === 'full-jitter') {
                var exp = Math.min(retryCount, 6);
                var maxDelay = 1000 * Math.pow(2, exp);
                return maxDelay * Math.random();
            }
            logError('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"');
        }

        //====================================================================
        // Server Sent Events
        //====================================================================

        function processSSEInfo(elt, nodeData, info) {
            var values = splitOnWhitespace(info);
            for (var i = 0; i < values.length; i++) {
                var value = values[i].split(/:(.+)/);
                if (value[0] === "connect") {
                    processSSESource(elt, value[1]);
                }

                if ((value[0] === "swap")) {
                    processSSESwap(elt, value[1])
                }
            }
        }

        function processSSESource(elt, sseSrc) {
            var source = htmx.createEventSource(sseSrc);
            source.onerror = function (e) {
                triggerErrorEvent(elt, "htmx:sseError", {error:e, source:source});
                maybeCloseSSESource(elt);
            };
            getInternalData(elt).sseEventSource = source;
        }

        function processSSESwap(elt, sseEventName) {
            var sseSourceElt = getClosestMatch(elt, hasEventSource);
            if (sseSourceElt) {
                var sseEventSource = getInternalData(sseSourceElt).sseEventSource;
                var sseListener = function (event) {
                    if (maybeCloseSSESource(sseSourceElt)) {
                        return;
                    }
                    if (!bodyContains(elt)) {
                        sseEventSource.removeEventListener(sseEventName, sseListener);
                        return;
                    }

                    ///////////////////////////
                    // TODO: merge this code with AJAX and WebSockets code in the future.

                    var response = event.data;
                    withExtensions(elt, function(extension){
                        response = extension.transformResponse(response, null, elt);
                    });

                    var swapSpec = getSwapSpecification(elt)
                    var target = getTarget(elt)
                    var settleInfo = makeSettleInfo(elt);

                    selectAndSwap(swapSpec.swapStyle, target, elt, response, settleInfo)
                    settleImmediately(settleInfo.tasks)
                    triggerEvent(elt, "htmx:sseMessage", event)
                };

                getInternalData(elt).sseListener = sseListener;
                sseEventSource.addEventListener(sseEventName, sseListener);
            } else {
                triggerErrorEvent(elt, "htmx:noSSESourceError");
            }
        }

        function processSSETrigger(elt, handler, sseEventName) {
            var sseSourceElt = getClosestMatch(elt, hasEventSource);
            if (sseSourceElt) {
                var sseEventSource = getInternalData(sseSourceElt).sseEventSource;
                var sseListener = function () {
                    if (!maybeCloseSSESource(sseSourceElt)) {
                        if (bodyContains(elt)) {
                            handler(elt);
                        } else {
                            sseEventSource.removeEventListener(sseEventName, sseListener);
                        }
                    }
                };
                getInternalData(elt).sseListener = sseListener;
                sseEventSource.addEventListener(sseEventName, sseListener);
            } else {
                triggerErrorEvent(elt, "htmx:noSSESourceError");
            }
        }

        function maybeCloseSSESource(elt) {
            if (!bodyContains(elt)) {
                getInternalData(elt).sseEventSource.close();
                return true;
            }
        }

        function hasEventSource(node) {
            return getInternalData(node).sseEventSource != null;
        }

        //====================================================================

        function loadImmediately(elt, handler, nodeData, delay) {
            var load = function(){
                if (!nodeData.loaded) {
                    nodeData.loaded = true;
                    handler(elt);
                }
            }
            if (delay > 0) {
                setTimeout(load, delay);
            } else {
                load();
            }
        }

        function processVerbs(elt, nodeData, triggerSpecs) {
            var explicitAction = false;
            forEach(VERBS, function (verb) {
                if (hasAttribute(elt,'hx-' + verb)) {
                    var path = getAttributeValue(elt, 'hx-' + verb);
                    explicitAction = true;
                    nodeData.path = path;
                    nodeData.verb = verb;
                    triggerSpecs.forEach(function(triggerSpec) {
                        addTriggerHandler(elt, triggerSpec, nodeData, function (elt, evt) {
                            if (closest(elt, htmx.config.disableSelector)) {
                                cleanUpElement(elt)
                                return
                            }
                            issueAjaxRequest(verb, path, elt, evt)
                        })
                    });
                }
            });
            return explicitAction;
        }

        function addTriggerHandler(elt, triggerSpec, nodeData, handler) {
            if (triggerSpec.sseEvent) {
                processSSETrigger(elt, handler, triggerSpec.sseEvent);
            } else if (triggerSpec.trigger === "revealed") {
                initScrollHandler();
                addEventListener(elt, handler, nodeData, triggerSpec);
                maybeReveal(elt);
            } else if (triggerSpec.trigger === "intersect") {
                var observerOptions = {};
                if (triggerSpec.root) {
                    observerOptions.root = querySelectorExt(elt, triggerSpec.root)
                }
                if (triggerSpec.threshold) {
                    observerOptions.threshold = parseFloat(triggerSpec.threshold);
                }
                var observer = new IntersectionObserver(function (entries) {
                    for (var i = 0; i < entries.length; i++) {
                        var entry = entries[i];
                        if (entry.isIntersecting) {
                            triggerEvent(elt, "intersect");
                            break;
                        }
                    }
                }, observerOptions);
                observer.observe(elt);
                addEventListener(elt, handler, nodeData, triggerSpec);
            } else if (triggerSpec.trigger === "load") {
                if (!maybeFilterEvent(triggerSpec, elt, makeEvent("load", {elt: elt}))) {
                                loadImmediately(elt, handler, nodeData, triggerSpec.delay);
                            }
            } else if (triggerSpec.pollInterval > 0) {
                nodeData.polling = true;
                processPolling(elt, handler, triggerSpec);
            } else {
                addEventListener(elt, handler, nodeData, triggerSpec);
            }
        }

        function evalScript(script) {
            if (!script.htmxExecuted && htmx.config.allowScriptTags &&
                (script.type === "text/javascript" || script.type === "module" || script.type === "") ) {
                var newScript = getDocument().createElement("script");
                forEach(script.attributes, function (attr) {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.textContent = script.textContent;
                newScript.async = false;
                if (htmx.config.inlineScriptNonce) {
                    newScript.nonce = htmx.config.inlineScriptNonce;
                }
                var parent = script.parentElement;

                try {
                    parent.insertBefore(newScript, script);
                } catch (e) {
                    logError(e);
                } finally {
                    // remove old script element, but only if it is still in DOM
                    if (script.parentElement) {
                        script.parentElement.removeChild(script);
                    }
                }
            }
        }

        function processScripts(elt) {
            if (matches(elt, "script")) {
                evalScript(elt);
            }
            forEach(findAll(elt, "script"), function (script) {
                evalScript(script);
            });
        }

        function shouldProcessHxOn(elt) {
            var attributes = elt.attributes
            if (!attributes) {
                return false
            }
            for (var j = 0; j < attributes.length; j++) {
                var attrName = attributes[j].name
                if (startsWith(attrName, "hx-on:") || startsWith(attrName, "data-hx-on:") ||
                    startsWith(attrName, "hx-on-") || startsWith(attrName, "data-hx-on-")) {
                    return true
                }
            }
            return false
        }

        function findHxOnWildcardElements(elt) {
            var node = null
            var elements = []

            if (shouldProcessHxOn(elt)) {
                elements.push(elt)
            }

            if (document.evaluate) {
                var iter = document.evaluate('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or' +
                                                                           ' starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]', elt)
                while (node = iter.iterateNext()) elements.push(node)
            } else if (typeof elt.getElementsByTagName === "function") {
                var allElements = elt.getElementsByTagName("*")
                for (var i = 0; i < allElements.length; i++) {
                  if (shouldProcessHxOn(allElements[i])) {
                      elements.push(allElements[i])
                    }
                }
            }

            return elements
        }

        function findElementsToProcess(elt) {
            if (elt.querySelectorAll) {
                var boostedSelector = ", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]";
                var results = elt.querySelectorAll(VERB_SELECTOR + boostedSelector + ", form, [type='submit'], [hx-sse], [data-hx-sse], [hx-ws]," +
                    " [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]");
                return results;
            } else {
                return [];
            }
        }

        // Handle submit buttons/inputs that have the form attribute set
        // see https://developer.mozilla.org/docs/Web/HTML/Element/button
         function maybeSetLastButtonClicked(evt) {
            var elt = closest(evt.target, "button, input[type='submit']");
            var internalData = getRelatedFormData(evt)
            if (internalData) {
              internalData.lastButtonClicked = elt;
            }
        };
        function maybeUnsetLastButtonClicked(evt){
            var internalData = getRelatedFormData(evt)
            if (internalData) {
              internalData.lastButtonClicked = null;
            }
        }
        function getRelatedFormData(evt) {
           var elt = closest(evt.target, "button, input[type='submit']");
           if (!elt) {
             return;
           }
           var form = resolveTarget('#' + getRawAttribute(elt, 'form')) || closest(elt, 'form');
           if (!form) {
             return;
           }
           return getInternalData(form);
        }
        function initButtonTracking(elt) {
            // need to handle both click and focus in:
            //   focusin - in case someone tabs in to a button and hits the space bar
            //   click - on OSX buttons do not focus on click see https://bugs.webkit.org/show_bug.cgi?id=13724
            elt.addEventListener('click', maybeSetLastButtonClicked)
            elt.addEventListener('focusin', maybeSetLastButtonClicked)
            elt.addEventListener('focusout', maybeUnsetLastButtonClicked)
        }

        function countCurlies(line) {
            var tokens = tokenizeString(line);
            var netCurlies = 0;
            for (var i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                if (token === "{") {
                    netCurlies++;
                } else if (token === "}") {
                    netCurlies--;
                }
            }
            return netCurlies;
        }

        function addHxOnEventHandler(elt, eventName, code) {
            var nodeData = getInternalData(elt);
            if (!Array.isArray(nodeData.onHandlers)) {
                nodeData.onHandlers = [];
            }
            var func;
            var listener = function (e) {
                return maybeEval(elt, function() {
                    if (!func) {
                        func = new Function("event", code);
                    }
                    func.call(elt, e);
                });
            };
            elt.addEventListener(eventName, listener);
            nodeData.onHandlers.push({event:eventName, listener:listener});
        }

        function processHxOn(elt) {
            var hxOnValue = getAttributeValue(elt, 'hx-on');
            if (hxOnValue) {
                var handlers = {}
                var lines = hxOnValue.split("\n");
                var currentEvent = null;
                var curlyCount = 0;
                while (lines.length > 0) {
                    var line = lines.shift();
                    var match = line.match(/^\s*([a-zA-Z:\-\.]+:)(.*)/);
                    if (curlyCount === 0 && match) {
                        line.split(":")
                        currentEvent = match[1].slice(0, -1); // strip last colon
                        handlers[currentEvent] = match[2];
                    } else {
                        handlers[currentEvent] += line;
                    }
                    curlyCount += countCurlies(line);
                }

                for (var eventName in handlers) {
                    addHxOnEventHandler(elt, eventName, handlers[eventName]);
                }
            }
        }

        function processHxOnWildcard(elt) {
            // wipe any previous on handlers so that this function takes precedence
            deInitOnHandlers(elt)

            for (var i = 0; i < elt.attributes.length; i++) {
                var name = elt.attributes[i].name
                var value = elt.attributes[i].value
                if (startsWith(name, "hx-on") || startsWith(name, "data-hx-on")) {
                    var afterOnPosition = name.indexOf("-on") + 3;
                    var nextChar = name.slice(afterOnPosition, afterOnPosition + 1);
                    if (nextChar === "-" || nextChar === ":") {
                        var eventName = name.slice(afterOnPosition + 1);
                        // if the eventName starts with a colon or dash, prepend "htmx" for shorthand support
                        if (startsWith(eventName, ":")) {
                            eventName = "htmx" + eventName
                        } else if (startsWith(eventName, "-")) {
                            eventName = "htmx:" + eventName.slice(1);
                        } else if (startsWith(eventName, "htmx-")) {
                            eventName = "htmx:" + eventName.slice(5);
                        }

                        addHxOnEventHandler(elt, eventName, value)
                    }
                }
            }
        }

        function initNode(elt) {
            if (closest(elt, htmx.config.disableSelector)) {
                cleanUpElement(elt)
                return;
            }
            var nodeData = getInternalData(elt);
            if (nodeData.initHash !== attributeHash(elt)) {
                // clean up any previously processed info
                deInitNode(elt);

                nodeData.initHash = attributeHash(elt);

                processHxOn(elt);

                triggerEvent(elt, "htmx:beforeProcessNode")

                if (elt.value) {
                    nodeData.lastValue = elt.value;
                }

                var triggerSpecs = getTriggerSpecs(elt);
                var hasExplicitHttpAction = processVerbs(elt, nodeData, triggerSpecs);

                if (!hasExplicitHttpAction) {
                    if (getClosestAttributeValue(elt, "hx-boost") === "true") {
                        boostElement(elt, nodeData, triggerSpecs);
                    } else if (hasAttribute(elt, 'hx-trigger')) {
                        triggerSpecs.forEach(function (triggerSpec) {
                            // For "naked" triggers, don't do anything at all
                            addTriggerHandler(elt, triggerSpec, nodeData, function () {
                            })
                        })
                    }
                }

                // Handle submit buttons/inputs that have the form attribute set
                // see https://developer.mozilla.org/docs/Web/HTML/Element/button
                if (elt.tagName === "FORM" || (getRawAttribute(elt, "type") === "submit" && hasAttribute(elt, "form"))) {
                    initButtonTracking(elt)
                }

                var sseInfo = getAttributeValue(elt, 'hx-sse');
                if (sseInfo) {
                    processSSEInfo(elt, nodeData, sseInfo);
                }

                var wsInfo = getAttributeValue(elt, 'hx-ws');
                if (wsInfo) {
                    processWebSocketInfo(elt, nodeData, wsInfo);
                }
                triggerEvent(elt, "htmx:afterProcessNode");
            }
        }

        function processNode(elt) {
            elt = resolveTarget(elt);
            if (closest(elt, htmx.config.disableSelector)) {
                cleanUpElement(elt)
                return;
            }
            initNode(elt);
            forEach(findElementsToProcess(elt), function(child) { initNode(child) });
            // Because it happens second, the new way of adding onHandlers superseeds the old one
            // i.e. if there are any hx-on:eventName attributes, the hx-on attribute will be ignored
            forEach(findHxOnWildcardElements(elt), processHxOnWildcard);
        }

        //====================================================================
        // Event/Log Support
        //====================================================================

        function kebabEventName(str) {
            return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        }

        function makeEvent(eventName, detail) {
            var evt;
            if (window.CustomEvent && typeof window.CustomEvent === 'function') {
                evt = new CustomEvent(eventName, {bubbles: true, cancelable: true, detail: detail});
            } else {
                evt = getDocument().createEvent('CustomEvent');
                evt.initCustomEvent(eventName, true, true, detail);
            }
            return evt;
        }

        function triggerErrorEvent(elt, eventName, detail) {
            triggerEvent(elt, eventName, mergeObjects({error:eventName}, detail));
        }

        function ignoreEventForLogging(eventName) {
            return eventName === "htmx:afterProcessNode"
        }

        /**
         * `withExtensions` locates all active extensions for a provided element, then
         * executes the provided function using each of the active extensions.  It should
         * be called internally at every extendable execution point in htmx.
         *
         * @param {HTMLElement} elt
         * @param {(extension:import("./htmx").HtmxExtension) => void} toDo
         * @returns void
         */
        function withExtensions(elt, toDo) {
            forEach(getExtensions(elt), function(extension){
                try {
                    toDo(extension);
                } catch (e) {
                    logError(e);
                }
            });
        }

        function logError(msg) {
            if(console.error) {
                console.error(msg);
            } else if (console.log) {
                console.log("ERROR: ", msg);
            }
        }

        function triggerEvent(elt, eventName, detail) {
            elt = resolveTarget(elt);
            if (detail == null) {
                detail = {};
            }
            detail["elt"] = elt;
            var event = makeEvent(eventName, detail);
            if (htmx.logger && !ignoreEventForLogging(eventName)) {
                htmx.logger(elt, eventName, detail);
            }
            if (detail.error) {
                logError(detail.error);
                triggerEvent(elt, "htmx:error", {errorInfo:detail})
            }
            var eventResult = elt.dispatchEvent(event);
            var kebabName = kebabEventName(eventName);
            if (eventResult && kebabName !== eventName) {
                var kebabedEvent = makeEvent(kebabName, event.detail);
                eventResult = eventResult && elt.dispatchEvent(kebabedEvent)
            }
            withExtensions(elt, function (extension) {
                eventResult = eventResult && (extension.onEvent(eventName, event) !== false && !event.defaultPrevented)
            });
            return eventResult;
        }

        //====================================================================
        // History Support
        //====================================================================
        var currentPathForHistory = location.pathname+location.search;

        function getHistoryElement() {
            var historyElt = getDocument().querySelector('[hx-history-elt],[data-hx-history-elt]');
            return historyElt || getDocument().body;
        }

        function saveToHistoryCache(url, content, title, scroll) {
            if (!canAccessLocalStorage()) {
                return;
            }

            if (htmx.config.historyCacheSize <= 0) {
                // make sure that an eventually already existing cache is purged
                localStorage.removeItem("htmx-history-cache");
                return;
            }

            url = normalizePath(url);

            var historyCache = parseJSON(localStorage.getItem("htmx-history-cache")) || [];
            for (var i = 0; i < historyCache.length; i++) {
                if (historyCache[i].url === url) {
                    historyCache.splice(i, 1);
                    break;
                }
            }
            var newHistoryItem = {url:url, content: content, title:title, scroll:scroll};
            triggerEvent(getDocument().body, "htmx:historyItemCreated", {item:newHistoryItem, cache: historyCache})
            historyCache.push(newHistoryItem)
            while (historyCache.length > htmx.config.historyCacheSize) {
                historyCache.shift();
            }
            while(historyCache.length > 0){
                try {
                    localStorage.setItem("htmx-history-cache", JSON.stringify(historyCache));
                    break;
                } catch (e) {
                    triggerErrorEvent(getDocument().body, "htmx:historyCacheError", {cause:e, cache: historyCache})
                    historyCache.shift(); // shrink the cache and retry
                }
            }
        }

        function getCachedHistory(url) {
            if (!canAccessLocalStorage()) {
                return null;
            }

            url = normalizePath(url);

            var historyCache = parseJSON(localStorage.getItem("htmx-history-cache")) || [];
            for (var i = 0; i < historyCache.length; i++) {
                if (historyCache[i].url === url) {
                    return historyCache[i];
                }
            }
            return null;
        }

        function cleanInnerHtmlForHistory(elt) {
            var className = htmx.config.requestClass;
            var clone = elt.cloneNode(true);
            forEach(findAll(clone, "." + className), function(child){
                removeClassFromElement(child, className);
            });
            return clone.innerHTML;
        }

        function saveCurrentPageToHistory() {
            var elt = getHistoryElement();
            var path = currentPathForHistory || location.pathname+location.search;

            // Allow history snapshot feature to be disabled where hx-history="false"
            // is present *anywhere* in the current document we're about to save,
            // so we can prevent privileged data entering the cache.
            // The page will still be reachable as a history entry, but htmx will fetch it
            // live from the server onpopstate rather than look in the localStorage cache
            var disableHistoryCache
            try {
                disableHistoryCache = getDocument().querySelector('[hx-history="false" i],[data-hx-history="false" i]')
            } catch (e) {
                // IE11: insensitive modifier not supported so fallback to case sensitive selector
                disableHistoryCache = getDocument().querySelector('[hx-history="false"],[data-hx-history="false"]')
            }
            if (!disableHistoryCache) {
                triggerEvent(getDocument().body, "htmx:beforeHistorySave", {path: path, historyElt: elt});
                saveToHistoryCache(path, cleanInnerHtmlForHistory(elt), getDocument().title, window.scrollY);
            }

            if (htmx.config.historyEnabled) history.replaceState({htmx: true}, getDocument().title, window.location.href);
        }

        function pushUrlIntoHistory(path) {
            // remove the cache buster parameter, if any
            if (htmx.config.getCacheBusterParam) {
                path = path.replace(/org\.htmx\.cache-buster=[^&]*&?/, '')
                if (endsWith(path, '&') || endsWith(path, "?")) {
                    path = path.slice(0, -1);
                }
            }
            if(htmx.config.historyEnabled) {
                history.pushState({htmx:true}, "", path);
            }
            currentPathForHistory = path;
        }

        function replaceUrlInHistory(path) {
            if(htmx.config.historyEnabled)  history.replaceState({htmx:true}, "", path);
            currentPathForHistory = path;
        }

        function settleImmediately(tasks) {
            forEach(tasks, function (task) {
                task.call();
            });
        }

        function loadHistoryFromServer(path) {
            var request = new XMLHttpRequest();
            var details = {path: path, xhr:request};
            triggerEvent(getDocument().body, "htmx:historyCacheMiss", details);
            request.open('GET', path, true);
            request.setRequestHeader("HX-Request", "true");
            request.setRequestHeader("HX-History-Restore-Request", "true");
            request.setRequestHeader("HX-Current-URL", getDocument().location.href);
            request.onload = function () {
                if (this.status >= 200 && this.status < 400) {
                    triggerEvent(getDocument().body, "htmx:historyCacheMissLoad", details);
                    var fragment = makeFragment(this.response);
                    // @ts-ignore
                    fragment = fragment.querySelector('[hx-history-elt],[data-hx-history-elt]') || fragment;
                    var historyElement = getHistoryElement();
                    var settleInfo = makeSettleInfo(historyElement);
                    var title = findTitle(this.response);
                    if (title) {
                        var titleElt = find("title");
                        if (titleElt) {
                            titleElt.innerHTML = title;
                        } else {
                            window.document.title = title;
                        }
                    }
                    // @ts-ignore
                    swapInnerHTML(historyElement, fragment, settleInfo)
                    settleImmediately(settleInfo.tasks);
                    currentPathForHistory = path;
                    triggerEvent(getDocument().body, "htmx:historyRestore", {path: path, cacheMiss:true, serverResponse:this.response});
                } else {
                    triggerErrorEvent(getDocument().body, "htmx:historyCacheMissLoadError", details);
                }
            };
            request.send();
        }

        function restoreHistory(path) {
            saveCurrentPageToHistory();
            path = path || location.pathname+location.search;
            var cached = getCachedHistory(path);
            if (cached) {
                var fragment = makeFragment(cached.content);
                var historyElement = getHistoryElement();
                var settleInfo = makeSettleInfo(historyElement);
                swapInnerHTML(historyElement, fragment, settleInfo)
                settleImmediately(settleInfo.tasks);
                document.title = cached.title;
                setTimeout(function () {
                    window.scrollTo(0, cached.scroll);
                }, 0); // next 'tick', so browser has time to render layout
                currentPathForHistory = path;
                triggerEvent(getDocument().body, "htmx:historyRestore", {path:path, item:cached});
            } else {
                if (htmx.config.refreshOnHistoryMiss) {

                    // @ts-ignore: optional parameter in reload() function throws error
                    window.location.reload(true);
                } else {
                    loadHistoryFromServer(path);
                }
            }
        }

        function addRequestIndicatorClasses(elt) {
            var indicators = findAttributeTargets(elt, 'hx-indicator');
            if (indicators == null) {
                indicators = [elt];
            }
            forEach(indicators, function (ic) {
                var internalData = getInternalData(ic);
                internalData.requestCount = (internalData.requestCount || 0) + 1;
                ic.classList["add"].call(ic.classList, htmx.config.requestClass);
            });
            return indicators;
        }

        function disableElements(elt) {
            var disabledElts = findAttributeTargets(elt, 'hx-disabled-elt');
            if (disabledElts == null) {
                disabledElts = [];
            }
            forEach(disabledElts, function (disabledElement) {
                var internalData = getInternalData(disabledElement);
                internalData.requestCount = (internalData.requestCount || 0) + 1;
                disabledElement.setAttribute("disabled", "");
            });
            return disabledElts;
        }

        function removeRequestIndicators(indicators, disabled) {
            forEach(indicators, function (ic) {
                var internalData = getInternalData(ic);
                internalData.requestCount = (internalData.requestCount || 0) - 1;
                if (internalData.requestCount === 0) {
                    ic.classList["remove"].call(ic.classList, htmx.config.requestClass);
                }
            });
            forEach(disabled, function (disabledElement) {
                var internalData = getInternalData(disabledElement);
                internalData.requestCount = (internalData.requestCount || 0) - 1;
                if (internalData.requestCount === 0) {
                    disabledElement.removeAttribute('disabled');
                }
            });
        }

        //====================================================================
        // Input Value Processing
        //====================================================================

        function haveSeenNode(processed, elt) {
            for (var i = 0; i < processed.length; i++) {
                var node = processed[i];
                if (node.isSameNode(elt)) {
                    return true;
                }
            }
            return false;
        }

        function shouldInclude(elt) {
            if(elt.name === "" || elt.name == null || elt.disabled || closest(elt, "fieldset[disabled]")) {
                return false;
            }
            // ignore "submitter" types (see jQuery src/serialize.js)
            if (elt.type === "button" || elt.type === "submit" || elt.tagName === "image" || elt.tagName === "reset" || elt.tagName === "file" ) {
                return false;
            }
            if (elt.type === "checkbox" || elt.type === "radio" ) {
                return elt.checked;
            }
            return true;
        }

        function addValueToValues(name, value, values) {
            // This is a little ugly because both the current value of the named value in the form
            // and the new value could be arrays, so we have to handle all four cases :/
            if (name != null && value != null) {
                var current = values[name];
                if (current === undefined) {
                    values[name] = value;
                } else if (Array.isArray(current)) {
                    if (Array.isArray(value)) {
                        values[name] = current.concat(value);
                    } else {
                        current.push(value);
                    }
                } else {
                    if (Array.isArray(value)) {
                        values[name] = [current].concat(value);
                    } else {
                        values[name] = [current, value];
                    }
                }
            }
        }

        function processInputValue(processed, values, errors, elt, validate) {
            if (elt == null || haveSeenNode(processed, elt)) {
                return;
            } else {
                processed.push(elt);
            }
            if (shouldInclude(elt)) {
                var name = getRawAttribute(elt,"name");
                var value = elt.value;
                if (elt.multiple && elt.tagName === "SELECT") {
                    value = toArray(elt.querySelectorAll("option:checked")).map(function (e) { return e.value });
                }
                // include file inputs
                if (elt.files) {
                    value = toArray(elt.files);
                }
                addValueToValues(name, value, values);
                if (validate) {
                    validateElement(elt, errors);
                }
            }
            if (matches(elt, 'form')) {
                var inputs = elt.elements;
                forEach(inputs, function(input) {
                    processInputValue(processed, values, errors, input, validate);
                });
            }
        }

        function validateElement(element, errors) {
            if (element.willValidate) {
                triggerEvent(element, "htmx:validation:validate")
                if (!element.checkValidity()) {
                    errors.push({elt: element, message:element.validationMessage, validity:element.validity});
                    triggerEvent(element, "htmx:validation:failed", {message:element.validationMessage, validity:element.validity})
                }
            }
        }

        /**
         * @param {HTMLElement} elt
         * @param {string} verb
         */
        function getInputValues(elt, verb) {
            var processed = [];
            var values = {};
            var formValues = {};
            var errors = [];
            var internalData = getInternalData(elt);
            if (internalData.lastButtonClicked && !bodyContains(internalData.lastButtonClicked)) {
                internalData.lastButtonClicked = null
            }

            // only validate when form is directly submitted and novalidate or formnovalidate are not set
            // or if the element has an explicit hx-validate="true" on it
            var validate = (matches(elt, 'form') && elt.noValidate !== true) || getAttributeValue(elt, "hx-validate") === "true";
            if (internalData.lastButtonClicked) {
                validate = validate && internalData.lastButtonClicked.formNoValidate !== true;
            }

            // for a non-GET include the closest form
            if (verb !== 'get') {
                processInputValue(processed, formValues, errors, closest(elt, 'form'), validate);
            }

            // include the element itself
            processInputValue(processed, values, errors, elt, validate);

            // if a button or submit was clicked last, include its value
            if (internalData.lastButtonClicked || elt.tagName === "BUTTON" ||
                (elt.tagName === "INPUT" && getRawAttribute(elt, "type") === "submit")) {
                var button = internalData.lastButtonClicked || elt
                var name = getRawAttribute(button, "name")
                addValueToValues(name, button.value, formValues)
            }

            // include any explicit includes
            var includes = findAttributeTargets(elt, "hx-include");
            forEach(includes, function(node) {
                processInputValue(processed, values, errors, node, validate);
                // if a non-form is included, include any input values within it
                if (!matches(node, 'form')) {
                    forEach(node.querySelectorAll(INPUT_SELECTOR), function (descendant) {
                        processInputValue(processed, values, errors, descendant, validate);
                    })
                }
            });

            // form values take precedence, overriding the regular values
            values = mergeObjects(values, formValues);

            return {errors:errors, values:values};
        }

        function appendParam(returnStr, name, realValue) {
            if (returnStr !== "") {
                returnStr += "&";
            }
            if (String(realValue) === "[object Object]") {
                realValue = JSON.stringify(realValue);
            }
            var s = encodeURIComponent(realValue);
            returnStr += encodeURIComponent(name) + "=" + s;
            return returnStr;
        }

        function urlEncode(values) {
            var returnStr = "";
            for (var name in values) {
                if (values.hasOwnProperty(name)) {
                    var value = values[name];
                    if (Array.isArray(value)) {
                        forEach(value, function(v) {
                            returnStr = appendParam(returnStr, name, v);
                        });
                    } else {
                        returnStr = appendParam(returnStr, name, value);
                    }
                }
            }
            return returnStr;
        }

        function makeFormData(values) {
            var formData = new FormData();
            for (var name in values) {
                if (values.hasOwnProperty(name)) {
                    var value = values[name];
                    if (Array.isArray(value)) {
                        forEach(value, function(v) {
                            formData.append(name, v);
                        });
                    } else {
                        formData.append(name, value);
                    }
                }
            }
            return formData;
        }

        //====================================================================
        // Ajax
        //====================================================================

        /**
         * @param {HTMLElement} elt
         * @param {HTMLElement} target
         * @param {string} prompt
         * @returns {Object} // TODO: Define/Improve HtmxHeaderSpecification
         */
        function getHeaders(elt, target, prompt) {
            var headers = {
                "HX-Request" : "true",
                "HX-Trigger" : getRawAttribute(elt, "id"),
                "HX-Trigger-Name" : getRawAttribute(elt, "name"),
                "HX-Target" : getAttributeValue(target, "id"),
                "HX-Current-URL" : getDocument().location.href,
            }
            getValuesForElement(elt, "hx-headers", false, headers)
            if (prompt !== undefined) {
                headers["HX-Prompt"] = prompt;
            }
            if (getInternalData(elt).boosted) {
                headers["HX-Boosted"] = "true";
            }
            return headers;
        }

        /**
         * filterValues takes an object containing form input values
         * and returns a new object that only contains keys that are
         * specified by the closest "hx-params" attribute
         * @param {Object} inputValues
         * @param {HTMLElement} elt
         * @returns {Object}
         */
        function filterValues(inputValues, elt) {
            var paramsValue = getClosestAttributeValue(elt, "hx-params");
            if (paramsValue) {
                if (paramsValue === "none") {
                    return {};
                } else if (paramsValue === "*") {
                    return inputValues;
                } else if(paramsValue.indexOf("not ") === 0) {
                    forEach(paramsValue.substr(4).split(","), function (name) {
                        name = name.trim();
                        delete inputValues[name];
                    });
                    return inputValues;
                } else {
                    var newValues = {}
                    forEach(paramsValue.split(","), function (name) {
                        name = name.trim();
                        newValues[name] = inputValues[name];
                    });
                    return newValues;
                }
            } else {
                return inputValues;
            }
        }

        function isAnchorLink(elt) {
          return getRawAttribute(elt, 'href') && getRawAttribute(elt, 'href').indexOf("#") >=0
        }

        /**
         *
         * @param {HTMLElement} elt
         * @param {string} swapInfoOverride
         * @returns {import("./htmx").HtmxSwapSpecification}
         */
        function getSwapSpecification(elt, swapInfoOverride) {
            var swapInfo = swapInfoOverride ? swapInfoOverride : getClosestAttributeValue(elt, "hx-swap");
            var swapSpec = {
                "swapStyle" : getInternalData(elt).boosted ? 'innerHTML' : htmx.config.defaultSwapStyle,
                "swapDelay" : htmx.config.defaultSwapDelay,
                "settleDelay" : htmx.config.defaultSettleDelay
            }
            if (htmx.config.scrollIntoViewOnBoost && getInternalData(elt).boosted && !isAnchorLink(elt)) {
              swapSpec["show"] = "top"
            }
            if (swapInfo) {
                var split = splitOnWhitespace(swapInfo);
                if (split.length > 0) {
                    for (var i = 0; i < split.length; i++) {
                        var value = split[i];
                        if (value.indexOf("swap:") === 0) {
                            swapSpec["swapDelay"] = parseInterval(value.substr(5));
                        } else if (value.indexOf("settle:") === 0) {
                            swapSpec["settleDelay"] = parseInterval(value.substr(7));
                        } else if (value.indexOf("transition:") === 0) {
                            swapSpec["transition"] = value.substr(11) === "true";
                        } else if (value.indexOf("ignoreTitle:") === 0) {
                            swapSpec["ignoreTitle"] = value.substr(12) === "true";
                        } else if (value.indexOf("scroll:") === 0) {
                            var scrollSpec = value.substr(7);
                            var splitSpec = scrollSpec.split(":");
                            var scrollVal = splitSpec.pop();
                            var selectorVal = splitSpec.length > 0 ? splitSpec.join(":") : null;
                            swapSpec["scroll"] = scrollVal;
                            swapSpec["scrollTarget"] = selectorVal;
                        } else if (value.indexOf("show:") === 0) {
                            var showSpec = value.substr(5);
                            var splitSpec = showSpec.split(":");
                            var showVal = splitSpec.pop();
                            var selectorVal = splitSpec.length > 0 ? splitSpec.join(":") : null;
                            swapSpec["show"] = showVal;
                            swapSpec["showTarget"] = selectorVal;
                        } else if (value.indexOf("focus-scroll:") === 0) {
                            var focusScrollVal = value.substr("focus-scroll:".length);
                            swapSpec["focusScroll"] = focusScrollVal == "true";
                        } else if (i == 0) {
                            swapSpec["swapStyle"] = value;
                        } else {
                            logError('Unknown modifier in hx-swap: ' + value);
                        }
                    }
                }
            }
            return swapSpec;
        }

        function usesFormData(elt) {
            return getClosestAttributeValue(elt, "hx-encoding") === "multipart/form-data" ||
                (matches(elt, "form") && getRawAttribute(elt, 'enctype') === "multipart/form-data");
        }

        function encodeParamsForBody(xhr, elt, filteredParameters) {
            var encodedParameters = null;
            withExtensions(elt, function (extension) {
                if (encodedParameters == null) {
                    encodedParameters = extension.encodeParameters(xhr, filteredParameters, elt);
                }
            });
            if (encodedParameters != null) {
                return encodedParameters;
            } else {
                if (usesFormData(elt)) {
                    return makeFormData(filteredParameters);
                } else {
                    return urlEncode(filteredParameters);
                }
            }
        }

        /**
         *
         * @param {Element} target
         * @returns {import("./htmx").HtmxSettleInfo}
         */
        function makeSettleInfo(target) {
            return {tasks: [], elts: [target]};
        }

        function updateScrollState(content, swapSpec) {
            var first = content[0];
            var last = content[content.length - 1];
            if (swapSpec.scroll) {
                var target = null;
                if (swapSpec.scrollTarget) {
                    target = querySelectorExt(first, swapSpec.scrollTarget);
                }
                if (swapSpec.scroll === "top" && (first || target)) {
                    target = target || first;
                    target.scrollTop = 0;
                }
                if (swapSpec.scroll === "bottom" && (last || target)) {
                    target = target || last;
                    target.scrollTop = target.scrollHeight;
                }
            }
            if (swapSpec.show) {
                var target = null;
                if (swapSpec.showTarget) {
                    var targetStr = swapSpec.showTarget;
                    if (swapSpec.showTarget === "window") {
                        targetStr = "body";
                    }
                    target = querySelectorExt(first, targetStr);
                }
                if (swapSpec.show === "top" && (first || target)) {
                    target = target || first;
                    target.scrollIntoView({block:'start', behavior: htmx.config.scrollBehavior});
                }
                if (swapSpec.show === "bottom" && (last || target)) {
                    target = target || last;
                    target.scrollIntoView({block:'end', behavior: htmx.config.scrollBehavior});
                }
            }
        }

        /**
         * @param {HTMLElement} elt
         * @param {string} attr
         * @param {boolean=} evalAsDefault
         * @param {Object=} values
         * @returns {Object}
         */
        function getValuesForElement(elt, attr, evalAsDefault, values) {
            if (values == null) {
                values = {};
            }
            if (elt == null) {
                return values;
            }
            var attributeValue = getAttributeValue(elt, attr);
            if (attributeValue) {
                var str = attributeValue.trim();
                var evaluateValue = evalAsDefault;
                if (str === "unset") {
                    return null;
                }
                if (str.indexOf("javascript:") === 0) {
                    str = str.substr(11);
                    evaluateValue = true;
                } else if (str.indexOf("js:") === 0) {
                    str = str.substr(3);
                    evaluateValue = true;
                }
                if (str.indexOf('{') !== 0) {
                    str = "{" + str + "}";
                }
                var varsValues;
                if (evaluateValue) {
                    varsValues = maybeEval(elt,function () {return Function("return (" + str + ")")();}, {});
                } else {
                    varsValues = parseJSON(str);
                }
                for (var key in varsValues) {
                    if (varsValues.hasOwnProperty(key)) {
                        if (values[key] == null) {
                            values[key] = varsValues[key];
                        }
                    }
                }
            }
            return getValuesForElement(parentElt(elt), attr, evalAsDefault, values);
        }

        function maybeEval(elt, toEval, defaultVal) {
            if (htmx.config.allowEval) {
                return toEval();
            } else {
                triggerErrorEvent(elt, 'htmx:evalDisallowedError');
                return defaultVal;
            }
        }

        /**
         * @param {HTMLElement} elt
         * @param {*} expressionVars
         * @returns
         */
        function getHXVarsForElement(elt, expressionVars) {
            return getValuesForElement(elt, "hx-vars", true, expressionVars);
        }

        /**
         * @param {HTMLElement} elt
         * @param {*} expressionVars
         * @returns
         */
        function getHXValsForElement(elt, expressionVars) {
            return getValuesForElement(elt, "hx-vals", false, expressionVars);
        }

        /**
         * @param {HTMLElement} elt
         * @returns {Object}
         */
        function getExpressionVars(elt) {
            return mergeObjects(getHXVarsForElement(elt), getHXValsForElement(elt));
        }

        function safelySetHeaderValue(xhr, header, headerValue) {
            if (headerValue !== null) {
                try {
                    xhr.setRequestHeader(header, headerValue);
                } catch (e) {
                    // On an exception, try to set the header URI encoded instead
                    xhr.setRequestHeader(header, encodeURIComponent(headerValue));
                    xhr.setRequestHeader(header + "-URI-AutoEncoded", "true");
                }
            }
        }

        function getPathFromResponse(xhr) {
            // NB: IE11 does not support this stuff
            if (xhr.responseURL && typeof(URL) !== "undefined") {
                try {
                    var url = new URL(xhr.responseURL);
                    return url.pathname + url.search;
                } catch (e) {
                    triggerErrorEvent(getDocument().body, "htmx:badResponseUrl", {url: xhr.responseURL});
                }
            }
        }

        function hasHeader(xhr, regexp) {
            return regexp.test(xhr.getAllResponseHeaders())
        }

        function ajaxHelper(verb, path, context) {
            verb = verb.toLowerCase();
            if (context) {
                if (context instanceof Element || isType(context, 'String')) {
                    return issueAjaxRequest(verb, path, null, null, {
                        targetOverride: resolveTarget(context),
                        returnPromise: true
                    });
                } else {
                    return issueAjaxRequest(verb, path, resolveTarget(context.source), context.event,
                        {
                            handler : context.handler,
                            headers : context.headers,
                            values : context.values,
                            targetOverride: resolveTarget(context.target),
                            swapOverride: context.swap,
                            select: context.select,
                            returnPromise: true
                        });
                }
            } else {
                return issueAjaxRequest(verb, path, null, null, {
                        returnPromise: true
                });
            }
        }

        function hierarchyForElt(elt) {
            var arr = [];
            while (elt) {
                arr.push(elt);
                elt = elt.parentElement;
            }
            return arr;
        }

        function verifyPath(elt, path, requestConfig) {
            var sameHost
            var url
            if (typeof URL === "function") {
                url = new URL(path, document.location.href);
                var origin = document.location.origin;
                sameHost = origin === url.origin;
            } else {
                // IE11 doesn't support URL
                url = path
                sameHost = startsWith(path, document.location.origin)
            }

            if (htmx.config.selfRequestsOnly) {
                if (!sameHost) {
                    return false;
                }
            }
            return triggerEvent(elt, "htmx:validateUrl", mergeObjects({url: url, sameHost: sameHost}, requestConfig));
        }

        function issueAjaxRequest(verb, path, elt, event, etc, confirmed) {
            var resolve = null;
            var reject = null;
            etc = etc != null ? etc : {};
            if(etc.returnPromise && typeof Promise !== "undefined"){
                var promise = new Promise(function (_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
            }
            if(elt == null) {
                elt = getDocument().body;
            }
            var responseHandler = etc.handler || handleAjaxResponse;
            var select = etc.select || null;

            if (!bodyContains(elt)) {
                // do not issue requests for elements removed from the DOM
                maybeCall(resolve);
                return promise;
            }
            var target = etc.targetOverride || getTarget(elt);
            if (target == null || target == DUMMY_ELT) {
                triggerErrorEvent(elt, 'htmx:targetError', {target: getAttributeValue(elt, "hx-target")});
                maybeCall(reject);
                return promise;
            }

            var eltData = getInternalData(elt);
            var submitter = eltData.lastButtonClicked;

            if (submitter) {
                var buttonPath = getRawAttribute(submitter, "formaction");
                if (buttonPath != null) {
                    path = buttonPath;
                }

                var buttonVerb = getRawAttribute(submitter, "formmethod")
                if (buttonVerb != null) {
                    // ignore buttons with formmethod="dialog"
                    if (buttonVerb.toLowerCase() !== "dialog") {
                        verb = buttonVerb;
                    }
                }
            }

            var confirmQuestion = getClosestAttributeValue(elt, "hx-confirm");
            // allow event-based confirmation w/ a callback
            if (confirmed === undefined) {
                var issueRequest = function(skipConfirmation) {
                    return issueAjaxRequest(verb, path, elt, event, etc, !!skipConfirmation);
                }
                var confirmDetails = {target: target, elt: elt, path: path, verb: verb, triggeringEvent: event, etc: etc, issueRequest: issueRequest, question: confirmQuestion};
                if (triggerEvent(elt, 'htmx:confirm', confirmDetails) === false) {
                    maybeCall(resolve);
                    return promise;
                }
            }

            var syncElt = elt;
            var syncStrategy = getClosestAttributeValue(elt, "hx-sync");
            var queueStrategy = null;
            var abortable = false;
            if (syncStrategy) {
                var syncStrings = syncStrategy.split(":");
                var selector = syncStrings[0].trim();
                if (selector === "this") {
                    syncElt = findThisElement(elt, 'hx-sync');
                } else {
                    syncElt = querySelectorExt(elt, selector);
                }
                // default to the drop strategy
                syncStrategy = (syncStrings[1] || 'drop').trim();
                eltData = getInternalData(syncElt);
                if (syncStrategy === "drop" && eltData.xhr && eltData.abortable !== true) {
                    maybeCall(resolve);
                    return promise;
                } else if (syncStrategy === "abort") {
                    if (eltData.xhr) {
                        maybeCall(resolve);
                        return promise;
                    } else {
                        abortable = true;
                    }
                } else if (syncStrategy === "replace") {
                    triggerEvent(syncElt, 'htmx:abort'); // abort the current request and continue
                } else if (syncStrategy.indexOf("queue") === 0) {
                    var queueStrArray = syncStrategy.split(" ");
                    queueStrategy = (queueStrArray[1] || "last").trim();
                }
            }

            if (eltData.xhr) {
                if (eltData.abortable) {
                    triggerEvent(syncElt, 'htmx:abort'); // abort the current request and continue
                } else {
                    if(queueStrategy == null){
                        if (event) {
                            var eventData = getInternalData(event);
                            if (eventData && eventData.triggerSpec && eventData.triggerSpec.queue) {
                                queueStrategy = eventData.triggerSpec.queue;
                            }
                        }
                        if (queueStrategy == null) {
                            queueStrategy = "last";
                        }
                    }
                    if (eltData.queuedRequests == null) {
                        eltData.queuedRequests = [];
                    }
                    if (queueStrategy === "first" && eltData.queuedRequests.length === 0) {
                        eltData.queuedRequests.push(function () {
                            issueAjaxRequest(verb, path, elt, event, etc)
                        });
                    } else if (queueStrategy === "all") {
                        eltData.queuedRequests.push(function () {
                            issueAjaxRequest(verb, path, elt, event, etc)
                        });
                    } else if (queueStrategy === "last") {
                        eltData.queuedRequests = []; // dump existing queue
                        eltData.queuedRequests.push(function () {
                            issueAjaxRequest(verb, path, elt, event, etc)
                        });
                    }
                    maybeCall(resolve);
                    return promise;
                }
            }

            var xhr = new XMLHttpRequest();
            eltData.xhr = xhr;
            eltData.abortable = abortable;
            var endRequestLock = function(){
                eltData.xhr = null;
                eltData.abortable = false;
                if (eltData.queuedRequests != null &&
                    eltData.queuedRequests.length > 0) {
                    var queuedRequest = eltData.queuedRequests.shift();
                    queuedRequest();
                }
            }
            var promptQuestion = getClosestAttributeValue(elt, "hx-prompt");
            if (promptQuestion) {
                var promptResponse = prompt(promptQuestion);
                // prompt returns null if cancelled and empty string if accepted with no entry
                if (promptResponse === null ||
                    !triggerEvent(elt, 'htmx:prompt', {prompt: promptResponse, target:target})) {
                    maybeCall(resolve);
                    endRequestLock();
                    return promise;
                }
            }

            if (confirmQuestion && !confirmed) {
                if(!confirm(confirmQuestion)) {
                    maybeCall(resolve);
                    endRequestLock()
                    return promise;
                }
            }


            var headers = getHeaders(elt, target, promptResponse);

            if (verb !== 'get' && !usesFormData(elt)) {
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }

            if (etc.headers) {
                headers = mergeObjects(headers, etc.headers);
            }
            var results = getInputValues(elt, verb);
            var errors = results.errors;
            var rawParameters = results.values;
            if (etc.values) {
                rawParameters = mergeObjects(rawParameters, etc.values);
            }
            var expressionVars = getExpressionVars(elt);
            var allParameters = mergeObjects(rawParameters, expressionVars);
            var filteredParameters = filterValues(allParameters, elt);

            if (htmx.config.getCacheBusterParam && verb === 'get') {
                filteredParameters['org.htmx.cache-buster'] = getRawAttribute(target, "id") || "true";
            }

            // behavior of anchors w/ empty href is to use the current URL
            if (path == null || path === "") {
                path = getDocument().location.href;
            }


            var requestAttrValues = getValuesForElement(elt, 'hx-request');

            var eltIsBoosted = getInternalData(elt).boosted;

            var useUrlParams = htmx.config.methodsThatUseUrlParams.indexOf(verb) >= 0

            var requestConfig = {
                boosted: eltIsBoosted,
                useUrlParams: useUrlParams,
                parameters: filteredParameters,
                unfilteredParameters: allParameters,
                headers:headers,
                target:target,
                verb:verb,
                errors:errors,
                withCredentials: etc.credentials || requestAttrValues.credentials || htmx.config.withCredentials,
                timeout:  etc.timeout || requestAttrValues.timeout || htmx.config.timeout,
                path:path,
                triggeringEvent:event
            };

            if(!triggerEvent(elt, 'htmx:configRequest', requestConfig)){
                maybeCall(resolve);
                endRequestLock();
                return promise;
            }

            // copy out in case the object was overwritten
            path = requestConfig.path;
            verb = requestConfig.verb;
            headers = requestConfig.headers;
            filteredParameters = requestConfig.parameters;
            errors = requestConfig.errors;
            useUrlParams = requestConfig.useUrlParams;

            if(errors && errors.length > 0){
                triggerEvent(elt, 'htmx:validation:halted', requestConfig)
                maybeCall(resolve);
                endRequestLock();
                return promise;
            }

            var splitPath = path.split("#");
            var pathNoAnchor = splitPath[0];
            var anchor = splitPath[1];

            var finalPath = path
            if (useUrlParams) {
                finalPath = pathNoAnchor;
                var values = Object.keys(filteredParameters).length !== 0;
                if (values) {
                    if (finalPath.indexOf("?") < 0) {
                        finalPath += "?";
                    } else {
                        finalPath += "&";
                    }
                    finalPath += urlEncode(filteredParameters);
                    if (anchor) {
                        finalPath += "#" + anchor;
                    }
                }
            }

            if (!verifyPath(elt, finalPath, requestConfig)) {
                triggerErrorEvent(elt, 'htmx:invalidPath', requestConfig)
                maybeCall(reject);
                return promise;
            };

            xhr.open(verb.toUpperCase(), finalPath, true);
            xhr.overrideMimeType("text/html");
            xhr.withCredentials = requestConfig.withCredentials;
            xhr.timeout = requestConfig.timeout;

            // request headers
            if (requestAttrValues.noHeaders) {
                // ignore all headers
            } else {
                for (var header in headers) {
                    if (headers.hasOwnProperty(header)) {
                        var headerValue = headers[header];
                        safelySetHeaderValue(xhr, header, headerValue);
                    }
                }
            }

            var responseInfo = {
                xhr: xhr, target: target, requestConfig: requestConfig, etc: etc, boosted: eltIsBoosted, select: select,
                pathInfo: {
                    requestPath: path,
                    finalRequestPath: finalPath,
                    anchor: anchor
                }
            };

            xhr.onload = function () {
                try {
                    var hierarchy = hierarchyForElt(elt);
                    responseInfo.pathInfo.responsePath = getPathFromResponse(xhr);
                    responseHandler(elt, responseInfo);
                    removeRequestIndicators(indicators, disableElts);
                    triggerEvent(elt, 'htmx:afterRequest', responseInfo);
                    triggerEvent(elt, 'htmx:afterOnLoad', responseInfo);
                    // if the body no longer contains the element, trigger the event on the closest parent
                    // remaining in the DOM
                    if (!bodyContains(elt)) {
                        var secondaryTriggerElt = null;
                        while (hierarchy.length > 0 && secondaryTriggerElt == null) {
                            var parentEltInHierarchy = hierarchy.shift();
                            if (bodyContains(parentEltInHierarchy)) {
                                secondaryTriggerElt = parentEltInHierarchy;
                            }
                        }
                        if (secondaryTriggerElt) {
                            triggerEvent(secondaryTriggerElt, 'htmx:afterRequest', responseInfo);
                            triggerEvent(secondaryTriggerElt, 'htmx:afterOnLoad', responseInfo);
                        }
                    }
                    maybeCall(resolve);
                    endRequestLock();
                } catch (e) {
                    triggerErrorEvent(elt, 'htmx:onLoadError', mergeObjects({error:e}, responseInfo));
                    throw e;
                }
            }
            xhr.onerror = function () {
                removeRequestIndicators(indicators, disableElts);
                triggerErrorEvent(elt, 'htmx:afterRequest', responseInfo);
                triggerErrorEvent(elt, 'htmx:sendError', responseInfo);
                maybeCall(reject);
                endRequestLock();
            }
            xhr.onabort = function() {
                removeRequestIndicators(indicators, disableElts);
                triggerErrorEvent(elt, 'htmx:afterRequest', responseInfo);
                triggerErrorEvent(elt, 'htmx:sendAbort', responseInfo);
                maybeCall(reject);
                endRequestLock();
            }
            xhr.ontimeout = function() {
                removeRequestIndicators(indicators, disableElts);
                triggerErrorEvent(elt, 'htmx:afterRequest', responseInfo);
                triggerErrorEvent(elt, 'htmx:timeout', responseInfo);
                maybeCall(reject);
                endRequestLock();
            }
            if(!triggerEvent(elt, 'htmx:beforeRequest', responseInfo)){
                maybeCall(resolve);
                endRequestLock()
                return promise
            }
            var indicators = addRequestIndicatorClasses(elt);
            var disableElts = disableElements(elt);

            forEach(['loadstart', 'loadend', 'progress', 'abort'], function(eventName) {
                forEach([xhr, xhr.upload], function (target) {
                    target.addEventListener(eventName, function(event){
                        triggerEvent(elt, "htmx:xhr:" + eventName, {
                            lengthComputable:event.lengthComputable,
                            loaded:event.loaded,
                            total:event.total
                        });
                    })
                });
            });
            triggerEvent(elt, 'htmx:beforeSend', responseInfo);
            var params = useUrlParams ? null : encodeParamsForBody(xhr, elt, filteredParameters)
            xhr.send(params);
            return promise;
        }

        function determineHistoryUpdates(elt, responseInfo) {

            var xhr = responseInfo.xhr;

            //===========================================
            // First consult response headers
            //===========================================
            var pathFromHeaders = null;
            var typeFromHeaders = null;
            if (hasHeader(xhr,/HX-Push:/i)) {
                pathFromHeaders = xhr.getResponseHeader("HX-Push");
                typeFromHeaders = "push";
            } else if (hasHeader(xhr,/HX-Push-Url:/i)) {
                pathFromHeaders = xhr.getResponseHeader("HX-Push-Url");
                typeFromHeaders = "push";
            } else if (hasHeader(xhr,/HX-Replace-Url:/i)) {
                pathFromHeaders = xhr.getResponseHeader("HX-Replace-Url");
                typeFromHeaders = "replace";
            }

            // if there was a response header, that has priority
            if (pathFromHeaders) {
                if (pathFromHeaders === "false") {
                    return {}
                } else {
                    return {
                        type: typeFromHeaders,
                        path : pathFromHeaders
                    }
                }
            }

            //===========================================
            // Next resolve via DOM values
            //===========================================
            var requestPath =  responseInfo.pathInfo.finalRequestPath;
            var responsePath =  responseInfo.pathInfo.responsePath;

            var pushUrl = getClosestAttributeValue(elt, "hx-push-url");
            var replaceUrl = getClosestAttributeValue(elt, "hx-replace-url");
            var elementIsBoosted = getInternalData(elt).boosted;

            var saveType = null;
            var path = null;

            if (pushUrl) {
                saveType = "push";
                path = pushUrl;
            } else if (replaceUrl) {
                saveType = "replace";
                path = replaceUrl;
            } else if (elementIsBoosted) {
                saveType = "push";
                path = responsePath || requestPath; // if there is no response path, go with the original request path
            }

            if (path) {
                // false indicates no push, return empty object
                if (path === "false") {
                    return {};
                }

                // true indicates we want to follow wherever the server ended up sending us
                if (path === "true") {
                    path = responsePath || requestPath; // if there is no response path, go with the original request path
                }

                // restore any anchor associated with the request
                if (responseInfo.pathInfo.anchor &&
                    path.indexOf("#") === -1) {
                    path = path + "#" + responseInfo.pathInfo.anchor;
                }

                return {
                    type:saveType,
                    path: path
                }
            } else {
                return {};
            }
        }

        function handleAjaxResponse(elt, responseInfo) {
            var xhr = responseInfo.xhr;
            var target = responseInfo.target;
            var etc = responseInfo.etc;
            var requestConfig = responseInfo.requestConfig;
            var select = responseInfo.select;

            if (!triggerEvent(elt, 'htmx:beforeOnLoad', responseInfo)) return;

            if (hasHeader(xhr, /HX-Trigger:/i)) {
                handleTrigger(xhr, "HX-Trigger", elt);
            }

            if (hasHeader(xhr, /HX-Location:/i)) {
                saveCurrentPageToHistory();
                var redirectPath = xhr.getResponseHeader("HX-Location");
                var swapSpec;
                if (redirectPath.indexOf("{") === 0) {
                    swapSpec = parseJSON(redirectPath);
                    // what's the best way to throw an error if the user didn't include this
                    redirectPath = swapSpec['path'];
                    delete swapSpec['path'];
                }
                ajaxHelper('GET', redirectPath, swapSpec).then(function(){
                    pushUrlIntoHistory(redirectPath);
                });
                return;
            }

            var shouldRefresh = hasHeader(xhr, /HX-Refresh:/i) && "true" === xhr.getResponseHeader("HX-Refresh");

            if (hasHeader(xhr, /HX-Redirect:/i)) {
                location.href = xhr.getResponseHeader("HX-Redirect");
                shouldRefresh && location.reload();
                return;
            }

            if (shouldRefresh) {
                location.reload();
                return;
            }

            if (hasHeader(xhr,/HX-Retarget:/i)) {
                if (xhr.getResponseHeader("HX-Retarget") === "this") {
                    responseInfo.target = elt;
                } else {
                    responseInfo.target = querySelectorExt(elt, xhr.getResponseHeader("HX-Retarget"));
                }
            }

            var historyUpdate = determineHistoryUpdates(elt, responseInfo);

            // by default htmx only swaps on 200 return codes and does not swap
            // on 204 'No Content'
            // this can be ovverriden by responding to the htmx:beforeSwap event and
            // overriding the detail.shouldSwap property
            var shouldSwap = xhr.status >= 200 && xhr.status < 400 && xhr.status !== 204;
            var serverResponse = xhr.response;
            var isError = xhr.status >= 400;
            var ignoreTitle = htmx.config.ignoreTitle
            var beforeSwapDetails = mergeObjects({shouldSwap: shouldSwap, serverResponse:serverResponse, isError:isError, ignoreTitle:ignoreTitle }, responseInfo);
            if (!triggerEvent(target, 'htmx:beforeSwap', beforeSwapDetails)) return;

            target = beforeSwapDetails.target; // allow re-targeting
            serverResponse = beforeSwapDetails.serverResponse; // allow updating content
            isError = beforeSwapDetails.isError; // allow updating error
            ignoreTitle = beforeSwapDetails.ignoreTitle; // allow updating ignoring title

            responseInfo.target = target; // Make updated target available to response events
            responseInfo.failed = isError; // Make failed property available to response events
            responseInfo.successful = !isError; // Make successful property available to response events

            if (beforeSwapDetails.shouldSwap) {
                if (xhr.status === 286) {
                    cancelPolling(elt);
                }

                withExtensions(elt, function (extension) {
                    serverResponse = extension.transformResponse(serverResponse, xhr, elt);
                });

                // Save current page if there will be a history update
                if (historyUpdate.type) {
                    saveCurrentPageToHistory();
                }

                var swapOverride = etc.swapOverride;
                if (hasHeader(xhr,/HX-Reswap:/i)) {
                    swapOverride = xhr.getResponseHeader("HX-Reswap");
                }
                var swapSpec = getSwapSpecification(elt, swapOverride);

                if (swapSpec.hasOwnProperty('ignoreTitle')) {
                    ignoreTitle = swapSpec.ignoreTitle;
                }

                target.classList.add(htmx.config.swappingClass);

                // optional transition API promise callbacks
                var settleResolve = null;
                var settleReject = null;

                var doSwap = function () {
                    try {
                        var activeElt = document.activeElement;
                        var selectionInfo = {};
                        try {
                            selectionInfo = {
                                elt: activeElt,
                                // @ts-ignore
                                start: activeElt ? activeElt.selectionStart : null,
                                // @ts-ignore
                                end: activeElt ? activeElt.selectionEnd : null
                            };
                        } catch (e) {
                            // safari issue - see https://github.com/microsoft/playwright/issues/5894
                        }

                        var selectOverride;
                        if (select) {
                            selectOverride = select;
                        }

                        if (hasHeader(xhr, /HX-Reselect:/i)) {
                            selectOverride = xhr.getResponseHeader("HX-Reselect");
                        }

                        // if we need to save history, do so, before swapping so that relative resources have the correct base URL
                        if (historyUpdate.type) {
                            triggerEvent(getDocument().body, 'htmx:beforeHistoryUpdate', mergeObjects({ history: historyUpdate }, responseInfo));
                            if (historyUpdate.type === "push") {
                                pushUrlIntoHistory(historyUpdate.path);
                                triggerEvent(getDocument().body, 'htmx:pushedIntoHistory', {path: historyUpdate.path});
                            } else {
                                replaceUrlInHistory(historyUpdate.path);
                                triggerEvent(getDocument().body, 'htmx:replacedInHistory', {path: historyUpdate.path});
                            }
                        }

                        var settleInfo = makeSettleInfo(target);
                        selectAndSwap(swapSpec.swapStyle, target, elt, serverResponse, settleInfo, selectOverride);

                        if (selectionInfo.elt &&
                            !bodyContains(selectionInfo.elt) &&
                            getRawAttribute(selectionInfo.elt, "id")) {
                            var newActiveElt = document.getElementById(getRawAttribute(selectionInfo.elt, "id"));
                            var focusOptions = { preventScroll: swapSpec.focusScroll !== undefined ? !swapSpec.focusScroll : !htmx.config.defaultFocusScroll };
                            if (newActiveElt) {
                                // @ts-ignore
                                if (selectionInfo.start && newActiveElt.setSelectionRange) {
                                    // @ts-ignore
                                    try {
                                        newActiveElt.setSelectionRange(selectionInfo.start, selectionInfo.end);
                                    } catch (e) {
                                        // the setSelectionRange method is present on fields that don't support it, so just let this fail
                                    }
                                }
                                newActiveElt.focus(focusOptions);
                            }
                        }

                        target.classList.remove(htmx.config.swappingClass);
                        forEach(settleInfo.elts, function (elt) {
                            if (elt.classList) {
                                elt.classList.add(htmx.config.settlingClass);
                            }
                            triggerEvent(elt, 'htmx:afterSwap', responseInfo);
                        });

                        if (hasHeader(xhr, /HX-Trigger-After-Swap:/i)) {
                            var finalElt = elt;
                            if (!bodyContains(elt)) {
                                finalElt = getDocument().body;
                            }
                            handleTrigger(xhr, "HX-Trigger-After-Swap", finalElt);
                        }

                        var doSettle = function () {
                            forEach(settleInfo.tasks, function (task) {
                                task.call();
                            });
                            forEach(settleInfo.elts, function (elt) {
                                if (elt.classList) {
                                    elt.classList.remove(htmx.config.settlingClass);
                                }
                                triggerEvent(elt, 'htmx:afterSettle', responseInfo);
                            });

                            if (responseInfo.pathInfo.anchor) {
                                var anchorTarget = getDocument().getElementById(responseInfo.pathInfo.anchor);
                                if(anchorTarget) {
                                    anchorTarget.scrollIntoView({block:'start', behavior: "auto"});
                                }
                            }

                            if(settleInfo.title && !ignoreTitle) {
                                var titleElt = find("title");
                                if(titleElt) {
                                    titleElt.innerHTML = settleInfo.title;
                                } else {
                                    window.document.title = settleInfo.title;
                                }
                            }

                            updateScrollState(settleInfo.elts, swapSpec);

                            if (hasHeader(xhr, /HX-Trigger-After-Settle:/i)) {
                                var finalElt = elt;
                                if (!bodyContains(elt)) {
                                    finalElt = getDocument().body;
                                }
                                handleTrigger(xhr, "HX-Trigger-After-Settle", finalElt);
                            }
                            maybeCall(settleResolve);
                        }

                        if (swapSpec.settleDelay > 0) {
                            setTimeout(doSettle, swapSpec.settleDelay)
                        } else {
                            doSettle();
                        }
                    } catch (e) {
                        triggerErrorEvent(elt, 'htmx:swapError', responseInfo);
                        maybeCall(settleReject);
                        throw e;
                    }
                };

                var shouldTransition = htmx.config.globalViewTransitions
                if(swapSpec.hasOwnProperty('transition')){
                    shouldTransition = swapSpec.transition;
                }

                if(shouldTransition &&
                    triggerEvent(elt, 'htmx:beforeTransition', responseInfo) &&
                    typeof Promise !== "undefined" && document.startViewTransition){
                    var settlePromise = new Promise(function (_resolve, _reject) {
                        settleResolve = _resolve;
                        settleReject = _reject;
                    });
                    // wrap the original doSwap() in a call to startViewTransition()
                    var innerDoSwap = doSwap;
                    doSwap = function() {
                        document.startViewTransition(function () {
                            innerDoSwap();
                            return settlePromise;
                        });
                    }
                }


                if (swapSpec.swapDelay > 0) {
                    setTimeout(doSwap, swapSpec.swapDelay)
                } else {
                    doSwap();
                }
            }
            if (isError) {
                triggerErrorEvent(elt, 'htmx:responseError', mergeObjects({error: "Response Status Error Code " + xhr.status + " from " + responseInfo.pathInfo.requestPath}, responseInfo));
            }
        }

        //====================================================================
        // Extensions API
        //====================================================================

        /** @type {Object<string, import("./htmx").HtmxExtension>} */
        var extensions = {};

        /**
         * extensionBase defines the default functions for all extensions.
         * @returns {import("./htmx").HtmxExtension}
         */
        function extensionBase() {
            return {
                init: function(api) {return null;},
                onEvent : function(name, evt) {return true;},
                transformResponse : function(text, xhr, elt) {return text;},
                isInlineSwap : function(swapStyle) {return false;},
                handleSwap : function(swapStyle, target, fragment, settleInfo) {return false;},
                encodeParameters : function(xhr, parameters, elt) {return null;}
            }
        }

        /**
         * defineExtension initializes the extension and adds it to the htmx registry
         *
         * @param {string} name
         * @param {import("./htmx").HtmxExtension} extension
         */
        function defineExtension(name, extension) {
            if(extension.init) {
                extension.init(internalAPI)
            }
            extensions[name] = mergeObjects(extensionBase(), extension);
        }

        /**
         * removeExtension removes an extension from the htmx registry
         *
         * @param {string} name
         */
        function removeExtension(name) {
            delete extensions[name];
        }

        /**
         * getExtensions searches up the DOM tree to return all extensions that can be applied to a given element
         *
         * @param {HTMLElement} elt
         * @param {import("./htmx").HtmxExtension[]=} extensionsToReturn
         * @param {import("./htmx").HtmxExtension[]=} extensionsToIgnore
         */
         function getExtensions(elt, extensionsToReturn, extensionsToIgnore) {

            if (elt == undefined) {
                return extensionsToReturn;
            }
            if (extensionsToReturn == undefined) {
                extensionsToReturn = [];
            }
            if (extensionsToIgnore == undefined) {
                extensionsToIgnore = [];
            }
            var extensionsForElement = getAttributeValue(elt, "hx-ext");
            if (extensionsForElement) {
                forEach(extensionsForElement.split(","), function(extensionName){
                    extensionName = extensionName.replace(/ /g, '');
                    if (extensionName.slice(0, 7) == "ignore:") {
                        extensionsToIgnore.push(extensionName.slice(7));
                        return;
                    }
                    if (extensionsToIgnore.indexOf(extensionName) < 0) {
                        var extension = extensions[extensionName];
                        if (extension && extensionsToReturn.indexOf(extension) < 0) {
                            extensionsToReturn.push(extension);
                        }
                    }
                });
            }
            return getExtensions(parentElt(elt), extensionsToReturn, extensionsToIgnore);
        }

        //====================================================================
        // Initialization
        //====================================================================
        var isReady = false
        getDocument().addEventListener('DOMContentLoaded', function() {
            isReady = true
        })

        /**
         * Execute a function now if DOMContentLoaded has fired, otherwise listen for it.
         *
         * This function uses isReady because there is no realiable way to ask the browswer whether
         * the DOMContentLoaded event has already been fired; there's a gap between DOMContentLoaded
         * firing and readystate=complete.
         */
        function ready(fn) {
            // Checking readyState here is a failsafe in case the htmx script tag entered the DOM by
            // some means other than the initial page load.
            if (isReady || getDocument().readyState === 'complete') {
                fn();
            } else {
                getDocument().addEventListener('DOMContentLoaded', fn);
            }
        }

        function insertIndicatorStyles() {
            if (htmx.config.includeIndicatorStyles !== false) {
                getDocument().head.insertAdjacentHTML("beforeend",
                    "<style>\
                      ." + htmx.config.indicatorClass + "{opacity:0}\
                      ." + htmx.config.requestClass + " ." + htmx.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}\
                      ." + htmx.config.requestClass + "." + htmx.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}\
                    </style>");
            }
        }

        function getMetaConfig() {
            var element = getDocument().querySelector('meta[name="htmx-config"]');
            if (element) {
                // @ts-ignore
                return parseJSON(element.content);
            } else {
                return null;
            }
        }

        function mergeMetaConfig() {
            var metaConfig = getMetaConfig();
            if (metaConfig) {
                htmx.config = mergeObjects(htmx.config , metaConfig)
            }
        }

        // initialize the document
        ready(function () {
            mergeMetaConfig();
            insertIndicatorStyles();
            var body = getDocument().body;
            processNode(body);
            var restoredElts = getDocument().querySelectorAll(
                "[hx-trigger='restored'],[data-hx-trigger='restored']"
            );
            body.addEventListener("htmx:abort", function (evt) {
                var target = evt.target;
                var internalData = getInternalData(target);
                if (internalData && internalData.xhr) {
                    internalData.xhr.abort();
                }
            });
            /** @type {(ev: PopStateEvent) => any} */
            const originalPopstate = window.onpopstate ? window.onpopstate.bind(window) : null;
            /** @type {(ev: PopStateEvent) => any} */
            window.onpopstate = function (event) {
                if (event.state && event.state.htmx) {
                    restoreHistory();
                    forEach(restoredElts, function(elt){
                        triggerEvent(elt, 'htmx:restored', {
                            'document': getDocument(),
                            'triggerEvent': triggerEvent
                        });
                    });
                } else {
                    if (originalPopstate) {
                        originalPopstate(event);
                    }
                }
            };
            setTimeout(function () {
                triggerEvent(body, 'htmx:load', {}); // give ready handlers a chance to load up before firing this event
                body = null; // kill reference for gc
            }, 0);
        })

        return htmx;
    }
)()
}));

/**!
@preserve FlowPlater starts here 
*/
// Export the EventSystem module
const EventSystem = (function () {
  const subscribers = new Map();

  return {
    subscribe(event, callback, context = null) {
      if (!subscribers.has(event)) {
        subscribers.set(event, []);
      }
      subscribers.get(event).push({ callback, context });
      return () => this.unsubscribe(event, callback);
    },

    unsubscribe(event, callback) {
      if (!subscribers.has(event)) return;
      const subs = subscribers.get(event);
      subscribers.set(
        event,
        subs.filter((sub) => sub.callback !== callback),
      );
    },

    unsubscribeAll() {
      subscribers.clear();
    },

    publish(event, data) {
      if (!subscribers.has(event)) return;

      // Call subscribers for this specific event
      subscribers.get(event).forEach(({ callback, context }) => {
        callback.call(context, data);
      });

      // If data contains instanceName, also trigger instance-specific event
      if (data && data.instanceName) {
        const instanceEvent = `${data.instanceName}:${event}`;
        if (subscribers.has(instanceEvent)) {
          subscribers.get(instanceEvent).forEach(({ callback, context }) => {
            callback.call(context, data);
          });
        }
      }
    },
  };
})();

const Debug = (function () {
  return {
    level: 3,
    levels: {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3,
    },
    debugMode: true,

    log: function (level, ...args) {
      if (!this.debugMode) return;
      if (level <= this.level) {
        const prefix = ["ERROR", "WARN", "INFO", "DEBUG"][level];
        console.log(`FlowPlater [${prefix}]:`, ...args);
      }
    },
  };
})();

// Helper functions
function log(...args) {
  Debug.log(Debug.levels.INFO, ...args);
}

function errorLog$1(...args) {
  Debug.log(Debug.levels.ERROR, ...args);
}

class FlowPlaterError extends Error {
  constructor(message) {
    super(message);
    this.name = "FlowPlaterError";
  }
}

let TemplateError$1 = class TemplateError extends FlowPlaterError {
  constructor(message) {
    super(message);
    this.name = "TemplateError";
  }
};

const _state = {
  templateCache: {},
  instances: {},
  length: 0,
  defaults: {
    animation: false,
    debug: false,
  },
};

// Helper functions for state management
function getInstance(instanceName) {
  return _state.instances[instanceName];
}

function getInstances() {
  return _state.instances;
}

const Performance = {
  marks: {},

  start: function (label) {
    this.marks[label] = performance.now();
  },

  end: function (label) {
    if (!this.marks[label]) return;
    const duration = performance.now() - this.marks[label];
    delete this.marks[label];
    Debug.log(Debug.levels.DEBUG, `${label} took ${duration.toFixed(2)}ms`);
    return duration;
  },
};

class Memoized {
  constructor(fn) {
    this.cache = new Map();
    this.original = fn;
  }

  apply(...args) {
    const key = JSON.stringify(args);
    if (this.cache.has(key)) {
      Debug.log(Debug.levels.DEBUG, "Cache hit:", key);
      return this.cache.get(key);
    }
    Debug.log(Debug.levels.DEBUG, "Cache miss:", key);
    const result = this.original.apply(this, args);
    this.cache.set(key, result);
    return result;
  }
}

function memoize(fn) {
  const memoized = new Memoized(fn);
  const wrapper = (...args) => memoized.apply(...args);
  wrapper.original = memoized.original;
  wrapper.cache = memoized.cache;
  return wrapper;
}

/**
 * Creates a virtual DOM node from an HTML string
 * @param {string} html
 * @returns {DocumentFragment}
 */
function createVirtualNode(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();

  // Handle SVG elements
  const svgElements = template.content.querySelectorAll("svg");
  svgElements.forEach((svg) => {
    Array.from(svg.attributes).forEach((attr) => {
      // Ensure correct namespace for SVG attributes
      if (attr.name.startsWith("xlink:")) {
        svg.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          attr.name,
          attr.value,
        );
      }
    });
  });

  return template.content;
}

/**
 * Updates only the necessary parts of the DOM by comparing the new HTML with the existing content
 * @param {HTMLElement} element - The target DOM element to update
 * @param {string} newHTML - The new HTML content
 */
function updateDOM(element, newHTML) {
  Performance.start("updateDOM");

  const trimmedNewHTML = newHTML.trim();

  // Quick equality check to avoid unnecessary updates
  if (element.innerHTML.trim() === trimmedNewHTML) {
    Performance.end("updateDOM");
    return;
  }

  try {
    if (!element || !(element instanceof HTMLElement)) {
      throw new Error("Invalid target element");
    }

    if (typeof newHTML !== "string") {
      throw new Error("newHTML must be a string");
    }

    Debug.log(
      Debug.levels.INFO,
      `Updating DOM for element:`,
      element,
      `with new HTML length: ${trimmedNewHTML.length}`,
    );

    const virtualFragment = createVirtualNode(trimmedNewHTML);
    diffNodes(element, virtualFragment);
  } catch (error) {
    Debug.log(Debug.levels.ERROR, "Error in updateDOM:", error);
    throw error;
  } finally {
    Performance.end("updateDOM");
  }
}

function diffNodes(currentNode, newNode) {
  // Handle null cases first
  if (!currentNode || !newNode) return;

  // Quick equality check for identical nodes
  if (currentNode.isEqualNode(newNode)) {
    return;
  }

  // Compare children
  const currentChildren = Array.from(currentNode.childNodes);
  const newChildren = Array.from(newNode.childNodes);

  // Track processed nodes to handle moves and additions efficiently
  const processed = new Set();

  // First pass: update existing nodes and mark matches
  currentChildren.forEach((currentChild, i) => {
    const newChild = newChildren[i];

    // Skip if nodes are identical
    if (currentChild && newChild && currentChild.isEqualNode(newChild)) {
      processed.add(i);
      return;
    }

    // Look for matching node in new children
    const matchIndex = newChildren.findIndex(
      (node, index) =>
        !processed.has(index) &&
        node.nodeType === currentChild.nodeType &&
        node.nodeName === currentChild.nodeName,
    );

    if (matchIndex !== -1) {
      // Update matching node
      processed.add(matchIndex);
      updateNode(currentChild, newChildren[matchIndex]);
    } else if (!newChildren[i]) {
      // Remove if no new node exists at this position
      currentChild.remove();
    }
  });

  // Second pass: add new nodes that weren't processed
  newChildren.forEach((newChild, i) => {
    if (!processed.has(i)) {
      currentNode.appendChild(newChild.cloneNode(true));
    }
  });
}

function updateNode(currentNode, newNode) {
  if (!currentNode || !newNode) return;

  // Handle text nodes
  if (currentNode.nodeType === Node.TEXT_NODE) {
    if (currentNode.textContent !== newNode.textContent) {
      currentNode.textContent = newNode.textContent;
    }
    return;
  }

  // Handle element nodes
  if (currentNode.nodeType === Node.ELEMENT_NODE) {
    // Update attributes
    updateAttributes(currentNode, newNode);

    // Special element handling
    if (
      currentNode instanceof HTMLInputElement ||
      currentNode instanceof HTMLTextAreaElement
    ) {
      if (currentNode.value !== newNode.value) {
        currentNode.value = newNode.value;
      }
      return;
    }

    if (currentNode instanceof HTMLSelectElement) {
      if (currentNode.value !== newNode.value) {
        currentNode.value = newNode.value;
        Array.from(currentNode.options).forEach((option, index) => {
          option.selected = newNode.options[index]?.selected ?? false;
        });
      }
      return;
    }

    // Handle custom elements
    if (isCustomElement(currentNode)) {
      updateCustomElement(currentNode, newNode);
      return;
    }

    // Recursively update children
    diffNodes(currentNode, newNode);
  }
}

/**
 * Updates attributes of the current node based on the new node
 * @param {Element} currentNode
 * @param {Element} newNode
 */
function updateAttributes(currentNode, newNode) {
  const currentAttrs = new Set(
    Array.from(currentNode.attributes || []).map((a) => a.name),
  );
  const newAttrs = Array.from(newNode.attributes || []);

  // Remove old attributes in one pass
  currentAttrs.forEach((name) => {
    if (!newNode.hasAttribute(name)) {
      if (name === "style") currentNode.style.cssText = "";
      else if (name.startsWith("on")) {
        const handler = currentNode[name];
        typeof handler === "function" &&
          currentNode.removeEventListener(name.slice(2).toLowerCase(), handler);
      } else currentNode.removeAttribute(name);
    }
  });

  // Update new attributes in one pass
  newAttrs.forEach((attr) => {
    const { name, value } = attr;
    if (name === "style") updateStyles(currentNode, newNode);
    else if (name.startsWith("--")) currentNode.style.setProperty(name, value);
    else if (name.startsWith("on")) {
      const eventName = name.slice(2).toLowerCase();
      const oldHandler = currentNode[name];
      const newHandler = newNode[name];

      if (oldHandler !== newHandler) {
        typeof oldHandler === "function" &&
          currentNode.removeEventListener(eventName, oldHandler);
        typeof newHandler === "function" &&
          currentNode.addEventListener(eventName, newHandler);
      }
    } else if (currentNode.getAttribute(name) !== value) {
      currentNode.setAttribute(name, value);
    }
  });
}

/**
 * Updates inline styles of the current node based on the new node
 * @param {Element} currentNode
 * @param {Element} newNode
 */
function updateStyles(currentNode, newNode) {
  const currentStyle = currentNode.style;
  const newStyles = newNode.getAttribute("style")?.split(";") || [];

  // Clear existing styles
  currentStyle.cssText = "";

  // Apply new styles in one operation
  if (newStyles.length) {
    const styleMap = new Map(
      newStyles
        .map((s) => s.split(":").map((x) => x.trim()))
        .filter(([p, v]) => p && v),
    );
    currentStyle.cssText = Array.from(styleMap)
      .map(([p, v]) => `${p}:${v}`)
      .join(";");
  }
}

/**
 * Checks if a node is a custom element
 * @param {Element} node
 * @returns {boolean}
 */
function isCustomElement(node) {
  return node.tagName && node.tagName.includes("-");
}

/**
 * Updates a custom element's properties and attributes
 * @param {HTMLElement} currentElement
 * @param {HTMLElement} newElement
 */
function updateCustomElement(currentElement, newElement) {
  updateAttributes(currentElement, newElement);

  // Update properties in one pass
  Object.getOwnPropertyNames(newElement)
    .filter(
      (prop) =>
        !["attributes", "children", "innerHTML"].includes(prop) &&
        typeof newElement[prop] !== "function" &&
        currentElement[prop] !== newElement[prop],
    )
    .forEach((prop) => (currentElement[prop] = newElement[prop]));

  // Update children if no shadowRoot
  if (!currentElement.shadowRoot) {
    const currentChildren = Array.from(currentElement.childNodes);
    const newChildren = Array.from(newElement.childNodes);
    const maxLength = Math.max(currentChildren.length, newChildren.length);

    for (let i = 0; i < maxLength; i++) {
      diffNodes(currentChildren[i], newChildren[i]);
    }
  }
}

function instanceMethods(instanceName) {
  // Helper function to resolve a path within the data
  function _resolvePath(path) {
    const pathParts = path.split(/[\.\[\]'"]/);
    let current = this.data;
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      if (part === "") continue;
      if (
        current === undefined ||
        current === null ||
        !current.hasOwnProperty(part)
      ) {
        return undefined;
      }
      current = current[part];
    }
    return current;
  }

  return {
    _updateDOM: function () {
      const instance = _state.instances[instanceName];
      if (!instance) {
        errorLog$1("Instance not found: " + instanceName);
        return this;
      }

      instance.elements.forEach(function (element) {
        try {
          updateDOM(element, instance.template(instance.proxy));
        } catch (error) {
          element.innerHTML = `<div class="fp-error">Error refreshing template: ${error.message}</div>`;
          Debug.log(
            Debug.levels.ERROR,
            `Failed to refresh template: ${error.message}`,
          );
        }
      });

      return this;
    },

    update: function (newData) {
      const instance = _state.instances[instanceName];
      if (!instance) {
        errorLog$1("Instance not found: " + instanceName);
        return this;
      }
      Object.assign(instance.data, newData);
      Object.assign(instance.proxy, newData);
      return this._updateDOM();
    },

    remove: function () {
      const instance = _state.instances[instanceName];
      if (!instance) {
        throw new Error("Instance not found: " + instanceName);
      }

      EventSystem.publish("beforeRemove", {
        instanceName,
        elements: instance.elements,
      });

      try {
        // Clear elements and remove from DOM
        instance.elements.forEach(function (element) {
          try {
            element.innerHTML = "";
          } catch (error) {
            errorLog$1("Error removing instance: " + error.message);
          }
        });

        // Clear the elements array
        instance.elements = [];

        // Remove from state
        delete _state.instances[instanceName];
        delete _state.templateCache[instance.templateId];

        EventSystem.publish("afterRemove", {
          instanceName,
          elements: [],
        });

        log("Removed instance: " + instanceName);
        return true;
      } catch (error) {
        throw error;
      }
    },

    refresh: async function (options = { remote: true, recompile: false }) {
      const instance = _state.instances[instanceName];
      if (!instance) {
        errorLog$1("Instance not found: " + instanceName);
        return Promise.reject(new Error("Instance not found: " + instanceName));
      }

      // If recompile is true, recompile the template
      const compiledTemplate = instance.template(instance.data);
      const shouldRecompile =
        options.recompile || (!compiledTemplate && instance.data);

      if (shouldRecompile) {
        instance.template = compileTemplate(instance.templateId, true);
      }

      Debug.log(Debug.levels.DEBUG, "Refresh - Template check:", {
        templateId: instance.templateId,
        templateElement: document.querySelector(instance.templateId),
        compiledTemplate: instance.template(instance.data),
      });

      const promises = [];

      instance.elements.forEach(function (element) {
        try {
          if (options.remote) {
            const htmxMethods = ["get", "post", "put", "patch", "delete"];
            const hasHtmxMethod = htmxMethods.some((method) =>
              element.getAttribute(`hx-${method}`),
            );

            if (hasHtmxMethod) {
              const method = htmxMethods.find((method) =>
                element.getAttribute(`hx-${method}`),
              );
              const url = element.getAttribute(`hx-${method}`);
              const promise = fetch(url, { method: method.toUpperCase() })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  return response.json();
                })
                .then((data) => {
                  Object.assign(instance.data, data);
                  Object.assign(instance.proxy, data);
                  const rendered = instance.template(instance.proxy);
                  Debug.log(Debug.levels.DEBUG, "Refresh - Template render:", {
                    data: instance.data,
                    rendered,
                  });
                  updateDOM(element, rendered);
                  return data;
                });
              promises.push(promise);
            }
          } else {
            updateDOM(element, instance.template(instance.proxy));
          }
        } catch (error) {
          element.innerHTML = `<div class="fp-error">Error refreshing template: ${error.message}</div>`;
          Debug.log(
            Debug.levels.ERROR,
            `Failed to refresh template: ${error.message}`,
          );
          promises.push(Promise.reject(error));
        }
      });

      await Promise.all(promises);
      return this;
    },

    getData: function () {
      return _state.instances[instanceName].data;
    },

    getProxy: function () {
      return _state.instances[instanceName].proxy;
    },

    getElements: function () {
      return _state.instances[instanceName].elements;
    },

    merge: function (path, value) {
      const instance = _state.instances[instanceName];
      if (!instance) {
        errorLog$1("Instance not found: " + instanceName);
        return this;
      }

      let newData = value !== undefined ? value : path;

      try {
        // Deep merge function
        function deepMerge(target, source) {
          for (const key in source) {
            if (source.hasOwnProperty(key)) {
              if (Array.isArray(source[key]) && Array.isArray(target[key])) {
                const targetMap = new Map(
                  target[key].map((item) => [item.id, item]),
                );
                source[key].forEach((sourceItem) => {
                  if (sourceItem.id && targetMap.has(sourceItem.id)) {
                    deepMerge(targetMap.get(sourceItem.id), sourceItem);
                  } else {
                    target[key].push(sourceItem);
                  }
                });
              } else if (
                source[key] &&
                typeof source[key] === "object" &&
                !Array.isArray(source[key])
              ) {
                target[key] = target[key] || {};
                deepMerge(target[key], source[key]);
              } else {
                target[key] = source[key];
              }
            }
          }
          return target;
        }

        if (path && value !== undefined) {
          let target = this.getData();
          const pathParts = path.split(/[\.\[\]'"]/);
          for (let i = 0; i < pathParts.length - 1; i++) {
            const part = pathParts[i];
            if (part === "") continue;
            if (!target[part]) target[part] = {};
            target = target[part];
          }
          const lastPart = pathParts[pathParts.length - 1];
          if (lastPart !== "") {
            if (!target[lastPart]) {
              target[lastPart] = Array.isArray(value) ? [] : {};
            }
            if (Array.isArray(value)) {
              if (!Array.isArray(target[lastPart])) {
                target[lastPart] = [];
              }
              const targetArray = target[lastPart];
              value.forEach((item) => {
                if (item.id) {
                  const existingIndex = targetArray.findIndex(
                    (existing) => existing.id === item.id,
                  );
                  if (existingIndex >= 0) {
                    deepMerge(targetArray[existingIndex], item);
                  } else {
                    targetArray.push(item);
                  }
                } else {
                  targetArray.push(item);
                }
              });
            } else if (typeof value === "object") {
              deepMerge(target[lastPart], value);
            } else {
              target[lastPart] = value;
            }
          }
        } else {
          deepMerge(this.getData(), newData);
        }

        return this._updateDOM();
      } catch (error) {
        errorLog$1(error.message);
        return this;
      }
    },

    set: function (path, value) {
      const instance = _state.instances[instanceName];
      if (!instance) {
        errorLog$1("Instance not found: " + instanceName);
        return this;
      }

      try {
        const parts = path.split(/[\.\[\]'"]/g).filter(Boolean);
        const last = parts.pop();
        const target = parts.reduce((acc, part) => {
          if (!acc[part]) acc[part] = {};
          return acc[part];
        }, instance.data);

        target[last] = value;
        Object.assign(instance.proxy, instance.data);
        return this._updateDOM();
      } catch (error) {
        errorLog$1(error.message);
        return this;
      }
    },

    updateWhere: function (arrayPath, criteria, updates) {
      let array = _resolvePath.call(this, arrayPath);
      if (!Array.isArray(array)) {
        errorLog$1("Target at path is not an array: " + arrayPath);
        return this;
      }

      try {
        array.forEach((item) => {
          const matches = Object.entries(criteria).every(
            ([key, value]) => item[key] === value,
          );
          if (matches) {
            Object.assign(item, updates);
          }
        });

        return this._updateDOM();
      } catch (error) {
        errorLog$1(error.message);
        return this;
      }
    },

    get: function (path) {
      return !path ? this.getData() : _resolvePath.call(this, path);
    },
  };
}

// Default customTags - can be overridden via meta config in init()
const customTagList = [{ tag: "fpselect", replaceWith: "select" }];
let currentCustomTags = customTagList; // Use default list initially - override in init()

function setCustomTags(tags) {
  currentCustomTags = tags;
}

function replaceCustomTags(element) {
  // Replace all custom tags
  currentCustomTags.forEach((tag) => {
    const elements = Array.from(element.getElementsByTagName(tag.tag));
    for (let i = 0; i < elements.length; i++) {
      const customElement = elements[i];
      const newElement = document.createElement(tag.replaceWith);
      newElement.innerHTML = customElement.innerHTML;

      // Copy all attributes from the custom element to the new element
      for (let attr of customElement.attributes) {
        newElement.setAttribute(attr.name, attr.value);
      }

      // Replace the custom element with the new element
      customElement.parentNode.replaceChild(newElement, customElement);
    }
  });
  return element;
}

function compileTemplate(templateId, recompile = false) {
  if (!recompile) {
    return memoizedCompile(templateId);
  }

  // For recompile=true:
  // 1. Clear template cache
  delete _state.templateCache[templateId];
  // 2. Compile without memoization
  const compiledTemplate = memoizedCompile.original(templateId);
  // 3. Update the memoized cache with the new template
  memoizedCompile.cache.set(JSON.stringify([templateId]), compiledTemplate);

  return compiledTemplate;
}

const memoizedCompile = memoize(function (templateId) {
  Performance.start("compile:" + templateId);
  var templateElement = document.querySelector(templateId);

  log("Trying to compile template: " + templateId);

  if (!templateElement) {
    errorLog$1("Template not found: " + templateId);
    Performance.end("compile:" + templateId);
    return null;
  }

  // Check if template needs compilation
  if (
    !_state.templateCache[templateId] ||
    (templateElement.hasAttribute("fp-dynamic") &&
      templateElement.getAttribute("fp-dynamic") !== "false")
  ) {
    log("compiling template: " + templateId);

    // Function to construct tag with attributes
    function constructTagWithAttributes(element) {
      let tagName = element.tagName.toLowerCase();
      // Replace all custom tags
      currentCustomTags.forEach((tag) => {
        if (tagName === tag.tag) {
          tagName = tag.replaceWith;
        }
      });
      let attributes = "";
      for (let attr of element.attributes) {
        attributes += ` ${attr.name}="${attr.value}"`;
      }
      return `<${tagName}${attributes}>`;
    }

    function processNode(node) {
      let result = "";

      // Loop through each child node
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          result += child.textContent;
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.hasAttribute("fp")) {
            // Process as a Handlebars helper
            const helperName = child.tagName.toLowerCase();
            const args = child
              .getAttribute("fp")
              .split(" ")
              .map((arg) => arg.replace(/&quot;/g, '"'))
              .join(" ");

            const innerContent = processNode(child);

            if (
              helperName === "log" ||
              helperName === "lookup" ||
              helperName === "execute"
            ) {
              if (innerContent) {
                result += `{{${helperName} ${innerContent} ${args}}}`;
              } else {
                result += `{{${helperName} ${args}}}`;
              }
            } else if (helperName === "comment") {
              result += `{{!-- ${args} --}}`;
            } else if (helperName === "if") {
              const escapedArgs = args.replace(/"/g, '\\"');
              result += `{{#${helperName} "${escapedArgs}"}}${innerContent}{{/${helperName}}}`;
            } else if (helperName === "else") {
              result += `{{${helperName}}}${innerContent}`;
            } else if (helperName === "math") {
              if (innerContent) {
                console.warn(
                  `FlowPlater: The <${helperName}> helper does not accept inner content.`,
                );
              }
              result += `{{#${helperName} "${args}"}}`;
            } else {
              result += `{{#${helperName} ${args}}}${innerContent}{{/${helperName}}}`;
            }
          } else if (child.tagName === "else") {
            const innerContent = processNode(child);
            result += `{{${child.tagName.toLowerCase()}}}${innerContent}`;
          } else if (
            child.tagName === "template" ||
            child.tagName === "fptemplate" ||
            child.hasAttribute("fp-template")
          ) {
            result += child.outerHTML;
          } else {
            const childContent = processNode(child);
            const startTag = constructTagWithAttributes(child);
            let endTagName = child.tagName.toLowerCase();
            currentCustomTags.forEach((tag) => {
              if (endTagName === tag.tag) {
                endTagName = tag.replaceWith;
              }
            });
            const endTag = `</${endTagName}>`;
            result += `${startTag}${childContent}${endTag}`;
          }
        }
      });
      return result;
    }

    const handlebarsTemplate = processNode(templateElement);
    log("Compiling Handlebars template: " + handlebarsTemplate);

    try {
      const compiledTemplate = Handlebars.compile(handlebarsTemplate);

      // Check cache size limit before adding new template
      const cacheSize = _state.config?.templates?.cacheSize || 100; // Default to 100 if not configured
      if (Object.keys(_state.templateCache).length >= cacheSize) {
        // Remove oldest template
        const oldestKey = Object.keys(_state.templateCache)[0];
        delete _state.templateCache[oldestKey];
        log(`Cache limit reached. Removed template: ${oldestKey}`);
      }

      // Add new template to cache
      _state.templateCache[templateId] = compiledTemplate;
      Performance.end("compile:" + templateId);
      return compiledTemplate;
    } catch (e) {
      errorLog$1(
        "Template not valid: " + handlebarsTemplate + " | Error: " + e.message,
      );
      Performance.end("compile:" + templateId);
      return null;
    }
  }
  Performance.end("compile:" + templateId);
  return _state.templateCache[templateId];
});

function render({
  template,
  data,
  target,
  returnHtml = false,
  instanceName,
  animate = _state.defaults.animation,
  recompile = false,
}) {
  Performance.start("render:" + (instanceName || "anonymous"));

  EventSystem.publish("beforeRender", {
    instanceName,
    template,
    data,
    target,
    returnHtml,
    recompile,
  });

  /* -------------------------------------------------------------------------- */
  /*                                initial setup                               */
  /* -------------------------------------------------------------------------- */

  var elements;

  // Get the target elements
  if (typeof target === "string") {
    elements = document.querySelectorAll(target);
  } else if (typeof target === "object" && target.jquery) {
    elements = target.toArray();
  } else if (typeof target === "object") {
    elements = target;
  } else {
    errorLog$1("Invalid target type: " + typeof target);
    return;
  }

  if (elements.length === undefined) {
    elements = [elements];
  }

  // Get the instance name
  if (instanceName) {
    instanceName = instanceName;
  } else if (elements[0].hasAttribute("fp-instance")) {
    instanceName = elements[0].getAttribute("fp-instance");
  } else if (elements[0].id) {
    instanceName = elements[0].id;
  } else {
    instanceName = _state.length;
  }

  log("Rendering instance: " + instanceName, template, data, target);

  /* -------------------------------------------------------------------------- */
  /*                              Compile template                              */
  /* -------------------------------------------------------------------------- */

  var compiledTemplate = compileTemplate(template, recompile);
  _state.length++;

  if (!compiledTemplate) {
    errorLog$1("Template not found: " + template);
    return;
  }

  if (elements.length === 0) {
    errorLog$1("Target not found: " + target);
    return;
  }

  /* -------------------------------------------------------------------------- */
  /*                               Proxy creation                               */
  /* -------------------------------------------------------------------------- */

  if (
    !_state.instances[instanceName] ||
    _state.instances[instanceName].data !== data
  ) {
    var proxy = new Proxy(data, {
      set: function (target, prop, value) {
        target[prop] = value;
        elements.forEach(function (element) {
          updateDOM(element, compiledTemplate(target));
        });
        return true;
      },
    });

    // Store the proxy and elements in instances for future reference
    _state.instances[instanceName] = {
      elements: elements,
      template: compiledTemplate,
      templateId: elements[0].getAttribute("fp-template") || template, // Use first element's fp-template attribute
      proxy: proxy,
      data: data,
      ...instanceMethods(instanceName),
    };
  }

  const instance = _state.instances[instanceName];
  log("Proxy created: ", instance.proxy);

  /* -------------------------------------------------------------------------- */
  /*                               Render template                              */
  /* -------------------------------------------------------------------------- */

  try {
    if (returnHtml) {
      var html = instance.template(instance.proxy);
      return html;
    }

    elements.forEach(function (element) {
      try {
        updateDOM(element, instance.template(instance.proxy));
      } catch (error) {
        element.innerHTML = `<div class="fp-error">Error rendering template: ${error.message}</div>`;
        Debug.log(
          Debug.levels.ERROR,
          `Failed to render template: ${error.message}`,
        );
      }
    });

    return instance;
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Failed to render template: ${error.message}`,
    );
    throw error;
  } finally {
    EventSystem.publish("afterRender", {
      instanceName,
      template,
      data,
      target,
      elements,
      returnHtml,
    });
    log("Rendered instance: " + instanceName, template, data, target);
    Performance.end("render:" + (instanceName || "anonymous"));
  }
}

function compare(left, operator, right) {
  // Convert string numbers to actual numbers for comparison
  if (!isNaN(left)) left = Number(left);
  if (!isNaN(right)) right = Number(right);

  function isNullOrUndefined(value) {
    return value === null || value === undefined;
  }

  // Handle null/undefined comparisons
  if (isNullOrUndefined(left) || isNullOrUndefined(right)) {
    switch (operator) {
      case "==":
        return left == right;
      case "!=":
        return left != right;
      case "&&":
        return Boolean(left) && Boolean(right);
      case "||":
        return Boolean(left) || Boolean(right);
      default:
        return false;
    }
  }

  // String comparisons
  if (typeof left === "string" && typeof right === "string") {
    switch (operator) {
      case "==":
        return left.localeCompare(right) === 0;
      case "!=":
        return left.localeCompare(right) !== 0;
      case "<":
        return left.localeCompare(right) < 0;
      case ">":
        return left.localeCompare(right) > 0;
      case "<=":
        return left.localeCompare(right) <= 0;
      case ">=":
        return left.localeCompare(right) >= 0;
      default:
        throw new TemplateError$1(
          "Unsupported operator for strings: " + operator,
        );
    }
  }

  // Numeric and boolean comparisons
  switch (operator) {
    case "==":
      return left == right;
    case "!=":
      return left != right;
    case "<":
      return left < right;
    case ">":
      return left > right;
    case "<=":
      return left <= right;
    case ">=":
      return left >= right;
    case "&&":
      return Boolean(left) && Boolean(right);
    case "||":
      return Boolean(left) || Boolean(right);
    case "regex":
      return new RegExp(right).test(left);
    default:
      throw new TemplateError$1("Unsupported operator: " + operator);
  }
}

function ifHelper() {
  Handlebars.registerHelper("if", function (expressionString, options) {
    function resolveValue(token, dataContext, currentContext) {
      // Handle string literals
      if (
        (token.startsWith('"') && token.endsWith('"')) ||
        (token.startsWith("'") && token.endsWith("'"))
      ) {
        return token.slice(1, -1);
      }

      // Handle numeric literals
      if (!isNaN(token)) {
        return parseFloat(token);
      }

      // Handle 'this' references
      if (token === "this") {
        return currentContext;
      }

      if (token.startsWith("this.")) {
        const path = token.split(".").slice(1);
        let value = currentContext;
        for (const part of path) {
          if (value && typeof value === "object" && part in value) {
            value = value[part];
          } else {
            return undefined;
          }
        }
        return value;
      }

      // Handle nested object paths
      const path = token.split(".");
      let value = dataContext;

      for (const part of path) {
        if (value && typeof value === "object" && part in value) {
          value = value[part];
        } else {
          return undefined;
        }
      }

      return value;
    }

    try {
      // Parse expression
      const expression = expressionString.trim();
      const [leftToken, operator, rightToken] = expression.split(
        /\s*(==|!=|<=|>=|<|>|\|\||&&)\s*/,
      );

      if (!leftToken || !operator || !rightToken) {
        throw new TemplateError(`Invalid expression format: ${expression}`);
      }

      // Resolve values
      const leftValue = resolveValue(leftToken, options.data.root, this);
      const rightValue = resolveValue(rightToken, options.data.root, this);

      // Log resolved values for debugging
      Debug.log(Debug.levels.INFO, "Evaluating expression:", {
        raw: expression,
        leftValue,
        operator,
        rightValue,
      });

      // Evaluate the condition first
      const result = compare(leftValue, operator, rightValue);

      // Now execute the appropriate branch, letting any errors propagate up
      if (result) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    } catch (error) {
      // Only catch and handle errors related to the condition evaluation itself
      if (error instanceof TemplateError) {
        Debug.log(Debug.levels.ERROR, "Error evaluating if condition:", error);
        throw error; // Re-throw to maintain error state
      }
      Debug.log(Debug.levels.ERROR, "Error in if helper:", error);
      throw error; // Re-throw other errors to maintain error state
    }
  });
}

function sumHelper() {
  Handlebars.registerHelper("sum", function () {
    // Accepts multiple arguments, can be either numbers or arrays of numbers
    // Returns the sum of all arguments
    // Example: {{sum 1 2 3 4 5 (array 6 7 8 9 10)}} returns 55
    var sum = 0;
    for (var i = 0; i < arguments.length - 1; i++) {
      var arg = arguments[i];
      if (Array.isArray(arg)) {
        arg.forEach(function (item) {
          sum += item;
        });
      } else {
        sum += arg;
      }
    }
    return sum;
  });
}

function evaluate(left, operator, right) {
  function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  // Convert strings to numbers if applicable
  if (isNumeric(left)) left = parseFloat(left);
  if (isNumeric(right)) right = parseFloat(right);

  // check if left and right are numbers
  if (typeof left !== "number" || typeof right !== "number") {
    throw new Error("Invalid operands");
  }
  if (right === 0 && operator === "/") {
    throw new Error(
      "Division by zero. Please do not attempt to create a black hole.",
    );
  }

  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    case "^":
      return Math.pow(left, right);
    case "%":
      return left % right;
    case "min":
      return Math.min(left, right);
    case "max":
      return Math.max(left, right);
    case "abs":
      return Math.abs(left);
    default:
      throw new Error("Invalid operator");
  }
}

function mathHelper() {
  Handlebars.registerHelper("math", function (expression, options) {
    // Accepts a math expression and evaluates it
    // Returns the result
    // Example: {{math "1 + 2 * 3"}} returns 7
    // Define operator precedence
    const precedence = {
      "^": 1,
      "*": 2,
      "/": 2,
      "%": 2,
      "+": 3,
      "-": 3,
      min: 4,
      max: 4,
      abs: 4,
    };

    // Tokenize the expression
    const tokens = expression
      .trim()
      .match(/(?!.*\.\.\/)(?:\(|\)|\^|\*|\/|\+|-|min|max|abs|%|\b\S+\b)/g)
      .map((token) => {
        // Resolve context paths like 'this.data' or 'object.sum'
        if (/^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)+$/.test(token)) {
          return token
            .split(".")
            .reduce((acc, part) => acc[part], options.data.root);
        }
        return token;
      });

    // Convert infix to postfix and evaluate
    const outputQueue = [];
    const operatorStack = [];

    tokens.forEach((token) => {
      if (token in precedence) {
        while (
          operatorStack.length > 0 &&
          precedence[operatorStack[operatorStack.length - 1]] <=
            precedence[token]
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token === "(") {
        operatorStack.push(token);
      } else if (token === ")") {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== "("
        ) {
          outputQueue.push(operatorStack.pop());
        }
        if (operatorStack.pop() !== "(") {
          throw new TemplateError$1("Mismatched parentheses"); //!error
        }
      } else {
        outputQueue.push(token);
      }
    });

    while (operatorStack.length > 0) {
      if (["(", ")"].includes(operatorStack[operatorStack.length - 1])) {
        throw new TemplateError$1("Mismatched parentheses"); //!error
      }
      outputQueue.push(operatorStack.pop());
    }

    // Evaluate the postfix expression
    const stack = [];
    outputQueue.forEach((token) => {
      if (token in precedence) {
        const right = stack.pop();
        const left = stack.pop();
        if (left === undefined || right === undefined) {
          throw new TemplateError$1(
            `Missing operand! Error in expression: ${left} ${token} ${right}`,
          ); //!error
        }
        stack.push(evaluate(left, token, right));
      } else {
        stack.push(parseFloat(token));
      }
    });

    if (stack.length !== 1) {
      throw new TemplateError$1("Invalid expression"); //!error
    }

    return stack.pop();
  });
}

function sortFunction(key, descending) {
  return function (a, b) {
    let left = key ? a[key] : a;
    let right = key ? b[key] : b;

    // Handle null/undefined values
    if (left === null || left === undefined) return descending ? -1 : 1;
    if (right === null || right === undefined) return descending ? 1 : -1;

    // String comparison
    if (typeof left === "string" && typeof right === "string") {
      return descending ? right.localeCompare(left) : left.localeCompare(right);
    }

    // Numeric comparison
    if (left < right) return descending ? 1 : -1;
    if (left > right) return descending ? -1 : 1;
    return 0;
  };
}

function eachHelper() {
  Handlebars.registerHelper("each", function (context, options) {
    // Accepts an array or object and iterates through it
    // Returns the value of the current iteration
    // Example: {{#each myArray}} returns the current item in the array

    // Allows for optional arguments, e.g. {{#each myArray limit=10 startAt=5}}
    // limit: limit the number of iterations. Leave blank for no limit
    // startAt: start at a specific index
    // sortBy: sort by a key
    // descending: sort descending
    // sortBeforeLimit: sort before limiting (default: true)

    var result = "";
    var limit = options.hash.limit;
    var startAt = options.hash.startAt || 0;
    var key = options.hash.sortBy;
    var descending = options.hash.descending;
    var sortBeforeLimit = options.hash.sortBeforeLimit;
    var inverse = options.inverse;
    var fn = options.fn;
    var data;
    var contextPath;

    sortBeforeLimit =
      typeof sortBeforeLimit === "boolean" ? sortBeforeLimit : true;

    if (options.data && options.ids) {
      contextPath =
        Handlebars.Utils.appendContextPath(
          options.data.contextPath,
          options.ids[0],
        ) + ".";
    }

    if (Handlebars.Utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = Handlebars.createFrame(options.data);
    }

    if (!Array.isArray(context) && typeof context !== "object") {
      return inverse(this);
    }

    var processedArray = Array.isArray(context)
      ? context.slice()
      : Object.entries(context);

    if (limit === undefined) {
      limit = processedArray.length;
    }

    // Apply sorting and limiting logic
    if (sortBeforeLimit) {
      processedArray.sort(sortFunction(key, descending));
      processedArray = processedArray.slice(startAt, limit + startAt);
    } else {
      processedArray = processedArray.slice(startAt, limit + startAt);
      processedArray.sort(sortFunction(key, descending));
    }

    for (var i = 0; i < processedArray.length; i++) {
      var value = Array.isArray(context)
        ? processedArray[i]
        : processedArray[i][1];
      data.key = Array.isArray(context) ? i : processedArray[i][0];
      data.index = i;
      data.first = i === 0;
      data.last = i === processedArray.length - 1;

      if (contextPath) {
        data.contextPath = contextPath + data.key;
      }

      result += fn(value, {
        data: data,
        blockParams: Handlebars.Utils.blockParams(
          [value, data.key],
          [contextPath + data.key, null],
        ),
      });
    }

    if (i === 0) {
      result = inverse(this);
    }

    return result;
  });
}

function executeHelper() {
  Handlebars.registerHelper("execute", function (fn, ...args) {
    // Accepts a function name and arguments
    // Executes the function with the arguments
    // Example: {{execute myFunction arg1 arg2 arg3}} returns myFunction(arg1, arg2, arg3)
    args.pop();

    const fnName = String(fn);
    const functionToExecute = this[fnName] || window[fnName];

    // Execute the function if it exists
    if (typeof functionToExecute === "function") {
      return functionToExecute(...args);
    } else {
      // Log an error if the function is not found
      errorLog$1("Function not found or is not a function: " + fn);
    }
  });
}

function bunnyHelper() {
  Handlebars.registerHelper("bunny", function () {
    // Returns a cute bunny
    // It gives out hearts! <3
    // Example: {{bunny}}

    var bunny = `
        &nbsp;&nbsp;&nbsp;&nbsp;/)  /)<br>
        ପ(˶•-•˶)ଓ ♡<br>
        &nbsp;&nbsp;&nbsp;/づ  づ
      `;

    var bunnyFlipped = `
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(\\  (\\<br>
        &nbsp;&nbsp;ପ(˶•-•˶)ଓ<br>
        &nbsp;&nbsp;♡じ  じ\\
      `;

    // Create wrapper with unique class for animation targeting
    var wrapper = `<span class="fp-bunny" data-bunny-state="normal">${bunny}</span>`;

    // Add animation script if not already present
    if (!window.bunnyAnimation) {
      window.bunnyAnimation = function () {
        if (window.bunnyAnimationIntervalId) {
          clearInterval(window.bunnyAnimationIntervalId);
        }
        window.bunnyAnimationIntervalId = setInterval(function () {
          document.querySelectorAll(".fp-bunny").forEach(function (element) {
            const currentState = element.getAttribute("data-bunny-state");
            if (currentState === "normal") {
              element.innerHTML = bunnyFlipped;
              element.setAttribute("data-bunny-state", "flipped");
            } else {
              element.innerHTML = bunny;
              element.setAttribute("data-bunny-state", "normal");
            }
          });
        }, 1000);
      };

      // Start animation immediately
      window.bunnyAnimation();
    }

    return new Handlebars.SafeString(wrapper);
  });
}

function registerHelpers() {
  ifHelper();
  sumHelper();
  mathHelper();
  eachHelper();
  executeHelper();
  bunnyHelper();
}

const RequestHandler = {
  processingElements: new Map(),
  currentRequestId: 0,

  generateRequestId() {
    return `fp-${Date.now()}-${this.currentRequestId++}`;
  },

  handleRequest(target, requestId, action) {
    if (!target || !target.hasAttribute("fp-template")) return;

    const currentInfo = this.processingElements.get(target);
    requestId = requestId || this.generateRequestId();

    switch (action) {
      case "start":
        if (!currentInfo || currentInfo.requestId !== requestId) {
          this.processingElements.set(target, {
            requestId: requestId,
            timestamp: Date.now(),
            processed: false,
          });
          Debug.log(
            Debug.levels.DEBUG,
            "Added element to processing set",
            target,
            requestId,
          );
        }
        break;

      case "process":
        if (
          currentInfo &&
          currentInfo.requestId === requestId &&
          !currentInfo.processed
        ) {
          currentInfo.processed = true;
          this.processingElements.set(target, currentInfo);
          return true;
        }
        return false;

      case "cleanup":
        if (currentInfo && currentInfo.requestId === requestId) {
          this.processingElements.delete(target);
          Debug.log(
            Debug.levels.DEBUG,
            "Cleaned up after request",
            target,
            requestId,
          );
        }
        break;
    }
  },

  cleanupStale() {
    const now = Date.now();
    const staleTimeout = 10000; // 10 seconds

    for (const [target, info] of this.processingElements.entries()) {
      if (now - info.timestamp > staleTimeout) {
        this.processingElements.delete(target);
        Debug.log(
          Debug.levels.DEBUG,
          "Cleaned up stale processing entry",
          target,
          info.requestId,
        );
      }
    }
  },

  setupEventListeners() {
    document.body.addEventListener("htmx:configRequest", (event) => {
      // event.detail.headers = "";
      event.detail.headers["Content-Type"] =
        "application/x-www-form-urlencoded; charset=UTF-8";
    });

    // Add consolidated event listeners
    document.body.addEventListener("htmx:beforeRequest", (event) => {
      const target = event.detail.elt;
      const requestId = event.detail.requestId || this.generateRequestId();
      event.detail.requestId = requestId; // Ensure requestId is set
      this.handleRequest(target, requestId, "start");

      var element = event.detail.elt;
      if (element.hasAttribute("fp-instance")) {
        var instanceName = element.getAttribute("fp-instance");
        EventSystem.publish("request-start", {
          instanceName,
          ...event.detail,
        });
      }
    });

    document.body.addEventListener("htmx:afterRequest", (event) => {
      var element = event.detail.elt;
      if (element.hasAttribute("fp-instance")) {
        var instanceName = element.getAttribute("fp-instance");
        EventSystem.publish("request-end", { instanceName, ...event.detail });
      }
    });

    document.body.addEventListener("htmx:beforeSwap", (event) => {
      const target = event.detail.elt;
      const requestId = event.detail.requestId;
      const info = this.processingElements.get(target);

      if (!info || info.requestId !== requestId) {
        event.preventDefault();
        Debug.log(Debug.levels.DEBUG, "Prevented swap - request ID mismatch");
      }
    });

    // Cleanup handlers
    document.body.addEventListener("htmx:responseError", (event) => {
      this.handleRequest(event.detail.elt, event.detail.requestId, "cleanup");
    });

    // Set up stale cleanup interval
    setInterval(() => this.cleanupStale(), 10000);

    // Clear all on unload
    window.addEventListener("unload", () => {
      this.processingElements.clear();
    });
  },
};

function parseXmlToJson(xmlString) {
  function xmlToJson(node) {
    var obj = {};

    // Include attributes with prefix '_'
    if (node.attributes) {
      for (var j = 0; j < node.attributes.length; j++) {
        var attribute = node.attributes.item(j);
        obj["_" + attribute.nodeName] = attribute.nodeValue;
      }
    }

    // Process child elements
    var children = node.childNodes;
    if (children.length === 1 && children[0].nodeType === 3) {
      // Single text node
      return children[0].nodeValue.trim();
    } else {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];

        // Element nodes
        if (child.nodeType === 1) {
          var json = xmlToJson(child);
          if (obj[child.nodeName]) {
            // For multiple children with the same tag, create an array
            if (!Array.isArray(obj[child.nodeName])) {
              obj[child.nodeName] = [obj[child.nodeName]];
            }
            obj[child.nodeName].push(json);
          } else {
            obj[child.nodeName] = json;
          }
        }
      }
    }

    return obj;
  }

  var parser = new DOMParser();
  var xml = parser.parseFromString(xmlString, "text/xml"); // Parse the XML string to a DOM
  return xmlToJson(xml.documentElement);
}

function defineHtmxExtension() {
  htmx.defineExtension("flowplater", {
    transformResponse: function (text, xhr, elt) {
      // Get request ID from either xhr or processing elements
      const requestId = xhr.requestId;
      const currentInfo = RequestHandler.processingElements.get(elt);

      Debug.log(
        Debug.levels.DEBUG,
        "Transform response for request",
        requestId,
        "current info:",
        currentInfo,
      );

      // Skip if element is not in processing set
      if (!currentInfo || currentInfo.requestId !== requestId) {
        Debug.log(
          Debug.levels.DEBUG,
          "Skipping transformation - request ID mismatch",
          { current: currentInfo?.requestId, received: requestId },
        );
        return text;
      }

      // Only process if fp-template is present
      if (!elt.hasAttribute("fp-template")) {
        return text;
      }

      // Parse response data
      let data;
      try {
        if (xhr.getResponseHeader("Content-Type")?.startsWith("text/xml")) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(text, "text/xml");
          data = parseXmlToJson(doc);
        } else {
          data = JSON.parse(text);
        }
      } catch (e) {
        Debug.log(Debug.levels.ERROR, "Failed to parse response:", e);
        return text;
      }

      var templateId = elt.getAttribute("fp-template");
      Debug.log(
        Debug.levels.INFO,
        "Response received for request " + requestId + ": " + text,
      );

      // Render template
      try {
        let rendered;
        if (templateId) {
          Debug.log(
            Debug.levels.INFO,
            "Rendering html to " + templateId + " based on htmx response",
          );
          rendered = render({
            template: templateId,
            data: data,
            target: elt,
            returnHtml: true,
          });
        } else {
          if (!elt.id) {
            Debug.log(
              Debug.levels.ERROR,
              "No template found. If the current element is a template, it must have an id.",
            );
            return text;
          }
          Debug.log(
            Debug.levels.INFO,
            "Rendering html to current element based on htmx response",
          );
          var elementTemplateId = "#" + elt.id;
          rendered = render({
            template: elementTemplateId,
            data: data,
            target: elt,
            returnHtml: true,
          });
        }

        if (rendered) {
          Debug.log(
            Debug.levels.DEBUG,
            "Template rendered successfully for request",
            requestId,
          );
          return rendered;
        }
        return text;
      } catch (error) {
        Debug.log(Debug.levels.ERROR, "Error rendering template:", error);
        return text;
      }
    },

    onEvent: function (name, evt) {
      if (evt.detail.handled) return;

      const target = evt.detail.elt;
      const requestId =
        evt.detail.requestId || RequestHandler.generateRequestId();

      switch (name) {
        case "htmx:beforeRequest":
          evt.detail.requestId = requestId;
          evt.detail.xhr.requestId = requestId;
          RequestHandler.handleRequest(target, requestId, "start");
          break;

        case "htmx:beforeSwap":
          const info = RequestHandler.processingElements.get(target);
          if (!info || info.requestId !== requestId) {
            evt.preventDefault();
            Debug.log(
              Debug.levels.DEBUG,
              "Prevented swap - request ID mismatch",
            );
            return;
          }
          break;

        case "htmx:afterSwap":
          RequestHandler.handleRequest(target, requestId, "cleanup");
          break;
      }
    },
  });
}

// * For each element with an fp-proxy attribute, use a proxy for the url
//use const url = 'https://corsproxy.io/?' + encodeURIComponent([hx-get/post/put/patch/delete] attribute value)]);
function setupProxy(element) {
  try {
    // Skip if already processed or if fp-proxy is false/not present
    if (
      element.hasAttribute("data-fp-proxy-processed") ||
      !element.hasAttribute("fp-proxy") ||
      element.getAttribute("fp-proxy") === "false"
    ) {
      return element;
    }

    // Get proxy URL
    const proxyUrl = element.getAttribute("fp-proxy").startsWith("http")
      ? element.getAttribute("fp-proxy")
      : "https://corsproxy.io/?";

    // Process htmx methods
    const methods = ["get", "post", "put", "patch", "delete"];
    methods.forEach(function (method) {
      if (element.hasAttribute("hx-" + method)) {
        const url = element.getAttribute("hx-" + method);
        element.setAttribute(
          "hx-" + method,
          proxyUrl + encodeURIComponent(url),
        );
      }
    });

    // Mark as processed
    element.setAttribute("data-fp-proxy-processed", "true");
    return element;
  } catch (error) {
    Debug.log(Debug.levels.ERROR, `Error in setupProxy: ${error.message}`);
    return element;
  }
}

function preloadUrl(url) {
  if (!url) {
    errorLog("No URL provided for preloading");
    return;
  }

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = url;
  link.as = "fetch";
  link.crossOrigin = "anonymous";

  const cleanup = () => {
    if (link.parentNode) {
      link.remove();
    }
  };

  link.onerror = (e) => {
    errorLog(`Failed to preload URL: ${url}`, e);
    cleanup();
  };

  const timeoutId = setTimeout(cleanup, 3000);
  document.head.appendChild(link);

  return { cleanup, timeoutId };
}

function addPreloadListener(element) {
  const preloadEvent = element.getAttribute("fp-preload") || "mouseover";

  if (preloadEvent === "mouseover") {
    let mouseOver = true;
    let timeoutId;
    let preloadInstance;

    const handleMouseOver = () => {
      mouseOver = true;
      timeoutId = setTimeout(() => {
        if (mouseOver) {
          const url =
            element.getAttribute("href") ||
            element.getAttribute("hx-get") ||
            element.getAttribute("fp-get");
          preloadInstance = preloadUrl(url);
        }
      }, 100);
    };

    const handleMouseOut = () => {
      mouseOver = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (preloadInstance) {
        clearTimeout(preloadInstance.timeoutId);
        preloadInstance.cleanup();
      }
    };

    element.addEventListener("mouseover", handleMouseOver);
    element.addEventListener("mouseout", handleMouseOut);

    // Store cleanup function on element for potential removal
    element._preloadCleanup = () => {
      element.removeEventListener("mouseover", handleMouseOver);
      element.removeEventListener("mouseout", handleMouseOut);
      handleMouseOut();
    };
  } else {
    const handler = () => {
      const url =
        element.getAttribute("href") ||
        element.getAttribute("hx-get") ||
        element.getAttribute("fp-get");
      preloadUrl(url);
    };
    element.addEventListener(preloadEvent, handler);

    // Store cleanup function
    element._preloadCleanup = () => {
      element.removeEventListener(preloadEvent, handler);
    };
  }
}

function processPreload(element) {
  try {
    if (element.hasAttribute("data-fp-preload-processed")) {
      return element;
    }

    if (element.hasAttribute("fp-preload")) {
      addPreloadListener(element);
      element.setAttribute("data-fp-preload-processed", "true");
    }

    return element;
  } catch (error) {
    Debug.log(Debug.levels.ERROR, `Error in processPreload: ${error.message}`);
    return element;
  }
}

// prettier-ignore
const htmxAttributes = ["boost", "get", "post", "on", "push-url", "select", "select-oob",
        "swap", "swap-oob", "target", "trigger", "vals", "confirm", "delete", "disable", 
        "disabled-elt", "disinherit", "encoding", "ext", "headers", "history", "history-elt", 
        "include", "indicator", "params", "patch", "preserve", "prompt", "put", "replace-url", 
        "request", "sync", "validate", "vars",
    ];

// * For every element with an fp-[htmxAttribute] attribute, translate to hx-[htmxAttribute]
function translateCustomHTMXAttributes(element) {
  try {
    const customPrefix = "fp-";
    const htmxPrefix = "hx-";

    htmxAttributes.forEach((attr) => {
      const customAttr = customPrefix + attr;
      if (element.hasAttribute(customAttr)) {
        const attrValue = element.getAttribute(customAttr);
        element.setAttribute(htmxPrefix + attr, attrValue);
        element.removeAttribute(customAttr);
      }
    });
    return element;
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error in translateCustomHTMXAttributes: ${error.message}`,
    );
    return element;
  }
}

function processUrlAffixes(element) {
  try {
    const methods = ["get", "post", "put", "patch", "delete"];

    function findAttributeInParents(el, attributeName) {
      while (el) {
        if (el.hasAttribute(attributeName)) {
          return el.getAttribute(attributeName);
        }
        el = el.parentElement;
      }
      return null;
    }

    function processElement(el) {
      methods.forEach(function (method) {
        var attr = "hx-" + method;
        if (el.hasAttribute(attr)) {
          var originalUrl = el.getAttribute(attr);
          log("Original URL: " + originalUrl);

          var prepend = findAttributeInParents(el, "fp-prepend");
          var append = findAttributeInParents(el, "fp-append");

          var modifiedUrl = originalUrl;
          if (prepend) {
            modifiedUrl = prepend + modifiedUrl;
          }
          if (append) {
            modifiedUrl += append;
          }

          el.setAttribute(attr, modifiedUrl);
          log("Modified URL: " + modifiedUrl);

          if (modifiedUrl !== originalUrl) {
            log("Modification successful for", method, "on element", el);
          } else {
            errorLog$1("Modification failed for", method, "on element", el);
          }
        }
      });
    }

    // Process the passed element
    if (
      element.hasAttribute("fp-prepend") ||
      element.hasAttribute("fp-append") ||
      methods.some((method) => element.hasAttribute("hx-" + method))
    ) {
      processElement(element);
    }
    return element;
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error in processUrlAffixes: ${error.message}`,
    );
    return element;
  }
}

// * For each element with an fp-animation attribute set to true, or if defaults.animation is true, get the hx-swap attribute.
// if the value is empty, set it to innerHTML transition:true
// if the value is not empty, append transition:true
// if the value is set to false, do nothing
function setupAnimation(element) {
  try {
    var shouldAnimate =
      element.getAttribute("fp-animation") || _state.defaults.animation;
    if (shouldAnimate === "true") {
      var swap = element.getAttribute("hx-swap");
      if (!swap) {
        element.setAttribute("hx-swap", "innerHTML transition:true");
      } else {
        element.setAttribute("hx-swap", swap + " transition:true");
      }
    }
    return element;
  } catch (error) {
    Debug.log(Debug.levels.ERROR, `Error in setupAnimation: ${error.message}`);
    return element;
  }
}

// Add hx-ext="flowplater" attribute to elements that need the extension
function addHtmxExtensionAttribute(element) {
  try {
    // Check if the element already has the flowplater extension
    var currentExt = element.getAttribute("hx-ext") || "";
    if (!currentExt.includes("flowplater")) {
      // Add flowplater to hx-ext
      var newExt = currentExt ? currentExt + ", flowplater" : "flowplater";
      element.setAttribute("hx-ext", newExt);
      Debug.log(Debug.levels.INFO, "Added hx-ext attribute to " + element.id);
    }
    return element;
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error in addHtmxExtensionAttribute: ${error.message}`,
    );
    return element;
  }
}

var FlowPlater = (function () {

  const VERSION = "1.4.19";
  const AUTHOR = "JWSLS";
  const LICENSE = "Flowplater standard licence";

  // Default configuration
  const defaultConfig = {
    debug: {
      level: 3,
      enabled: true,
    },
    selectors: {
      fp: "[fp-template], [fp-get], [fp-post], [fp-put], [fp-delete], [fp-patch]",
    },
    templates: {
      cacheSize: 100,
      precompile: true,
    },
    animation: {
      enabled: true,
      duration: 300,
    },
    htmx: {
      timeout: 10000,
      swapStyle: "innerHTML",
    },
    customTags: customTagList,
  };

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                      Errors and dependencies                        */
  /* -------------------------------------------------------------------------- */

  if (typeof Handlebars === "undefined") {
    throw new FlowPlaterError(
      "FlowPlater requires Handlebars. Get it at https://handlebarsjs.com/",
    );
  }
  if (typeof htmx === "undefined") {
    throw new FlowPlaterError(
      "FlowPlater requires htmx. Get it at https://htmx.org/",
    );
  }

  // Initialize state with default config
  _state.config = JSON.parse(JSON.stringify(defaultConfig));

  // Initialize request handling
  RequestHandler.setupEventListeners();
  defineHtmxExtension();

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                    setupAnimation(element)                          */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                 process(element = document)                         */
  /* -------------------------------------------------------------------------- */

  const ProcessingChain = {
    processors: [
      {
        name: "customTags",
        process: replaceCustomTags,
      },
      {
        name: "htmxAttributes",
        process: translateCustomHTMXAttributes,
      },
      {
        name: "htmxExtensionAttribute",
        process: addHtmxExtensionAttribute,
      },
      {
        name: "urlAffixes",
        process: processUrlAffixes,
      },
      {
        name: "animation",
        process: setupAnimation,
      },
      {
        name: "proxy",
        process: setupProxy,
      },
      {
        name: "preload",
        process: processPreload,
      },
      {
        name: "htmxProcess",
        process: (element) => {
          htmx.process(element);
          return element;
        },
      },
    ],

    FP_SELECTOR:
      "[fp-template], [fp-get], [fp-post], [fp-put], [fp-delete], [fp-patch]",

    processElement: function (element) {
      // Clean up any existing preload listeners
      if (element._preloadCleanup) {
        element._preloadCleanup();
      }
      let processingResults = {
        success: true,
        errors: [],
        warnings: [],
        finalElement: element,
      };

      // Run through all processors
      processingResults.finalElement = this.processors.reduce(
        (currentElement, processor, index) => {
          if (!currentElement) {
            processingResults.errors.push({
              phase: processor.name,
              error: `Element became undefined at processor index ${index}`,
              processor: this.processors[index - 1],
            });
            processingResults.success = false;
            return element; // Return original element to allow chain to continue
          }

          try {
            const result = processor.process(currentElement);
            return result;
          } catch (error) {
            processingResults.errors.push({
              phase: processor.name,
              error: error.message,
              stack: error.stack,
            });

            // Log the error
            Debug.log(
              Debug.levels.ERROR,
              `Error in processor ${processor.name}: ${error.message}`,
              error,
            );

            // Attempt recovery based on error type
            if (error instanceof TemplateError$1) {
              // Template errors might need special handling
              processingResults.warnings.push({
                phase: processor.name,
                message: "Falling back to original template",
              });
              return currentElement;
            }

            // For other errors, return the current element state
            return currentElement;
          }
        },
        element,
      );

      // Emit events based on processing results
      if (processingResults.errors.length > 0) {
        EventSystem.publish("processingChain:error", processingResults);
      }
      if (processingResults.warnings.length > 0) {
        EventSystem.publish("processingChain:warning", processingResults);
      }

      return processingResults.finalElement;
    },
  };

  function process(element = document) {
    // If processing document or non-matching element, find and process all matching children
    if (element === document || !element.matches(ProcessingChain.FP_SELECTOR)) {
      const fpElements = element.querySelectorAll(ProcessingChain.FP_SELECTOR);
      fpElements.forEach((el) => ProcessingChain.processElement(el));
      return;
    }

    // Process single matching element
    ProcessingChain.processElement(element);
  }

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                      Handlebars integration                         */
  /* -------------------------------------------------------------------------- */

  // * Unrister default each/if helpers
  Handlebars.unregisterHelper("each");
  Handlebars.unregisterHelper("if");

  registerHelpers(Handlebars);

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                          Public API                                 */
  /* -------------------------------------------------------------------------- */

  // Create the base FlowPlater object
  const FlowPlaterObj = {
    compileTemplate,
    render,
    getInstance,
    getInstances,

    on: (...args) => EventSystem.subscribe(...args),
    off: (...args) => EventSystem.unsubscribe(...args),
    emit: (...args) => EventSystem.publish(...args),

    debug: function (level) {
      Debug.level = level;
      return this;
    },

    templateCache: {
      set: function (templateId, template) {
        const cacheSize = _state.config.templates.cacheSize;
        const cache = _state.templateCache;

        // If cache is at limit, remove oldest entry
        if (Object.keys(cache).length >= cacheSize) {
          const oldestKey = Object.keys(cache)[0];
          delete cache[oldestKey];
          Debug.log(
            Debug.levels.INFO,
            `Cache limit reached. Removed template: ${oldestKey}`,
          );
        }

        // Add new template to cache
        cache[templateId] = template;
        return template;
      },
      get: function (templateId) {
        if (templateId) {
          return _state.templateCache[templateId];
        }
        return _state.templateCache;
      },
      isCached: function (templateId) {
        return !!_state.templateCache[templateId];
      },
      clear: function (templateId) {
        if (templateId) {
          delete _state.templateCache[templateId];
          Debug.log(
            Debug.levels.INFO,
            `Cleared template cache for: ${templateId}`,
          );
        } else {
          _state.templateCache = {};
          Debug.log(Debug.levels.INFO, "Cleared entire template cache");
        }
      },
      size: function () {
        return Object.keys(_state.templateCache).length;
      },
    },

    init: function (element = document, options = { render: true }) {
      Performance.start("init");
      Debug.log(Debug.levels.INFO, "Initializing FlowPlater...");

      // Process any templates on the page
      const templates = document.querySelectorAll("[fp-template]");
      templates.forEach((template) => {
        const templateId = template.getAttribute("fp-template");
        if (templateId) {
          // Compile the template using the templateId from the attribute
          compileTemplate(templateId, true);
          // Only render if options.render is true
          if (options.render) {
            render({
              template: templateId,
              data: {},
              target: template,
            });
          }
        }
      });

      // Load configuration from meta tag if present
      const metaConfig = document.querySelector('meta[name="fp-config"]');
      if (metaConfig) {
        try {
          const config = JSON.parse(metaConfig.content);
          FlowPlater.configure(config);
        } catch (e) {
          console.error("Error parsing fp-config meta tag:", e);
        }
      }

      // Re-run process to apply potentially updated FP_SELECTOR
      process(element);
      Debug.log(Debug.levels.INFO, "FlowPlater initialized successfully");
      Performance.end("init");
      return this;
    },

    cleanup: function (instanceName) {
      if (instanceName) {
        const instance = _state.instances[instanceName];
        if (instance) {
          // Clean up preload listeners
          instance.elements.forEach((element) => {
            if (element._preloadCleanup) {
              element._preloadCleanup();
            }
          });

          // Remove instance
          delete _state.instances[instanceName];
          log(`Cleaned up instance: ${instanceName}`);
        }
      } else {
        // Clean up all instances
        Object.keys(_state.instances).forEach((name) => {
          this.cleanup(name);
        });
        log("Cleaned up all instances");
      }
      return this;
    },

    // Public version info
    version: VERSION,
    author: AUTHOR,
    license: LICENSE,

    // Add method to modify custom tags
    setCustomTags: setCustomTags,

    config: function (newConfig = {}) {
      // Deep merge configuration
      function deepMerge(target, source) {
        for (const key in source) {
          if (source[key] instanceof Object && key in target) {
            deepMerge(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        }
        return target;
      }

      // Merge with current config in state
      _state.config = deepMerge(
        JSON.parse(JSON.stringify(_state.config)),
        newConfig,
      );

      // Apply configuration
      Debug.level = _state.config.debug.level;
      Debug.debugMode = _state.config.debug.enabled;
      ProcessingChain.FP_SELECTOR = _state.config.selectors.fp;

      // Configure HTMX defaults if needed
      if (typeof htmx !== "undefined") {
        htmx.config.timeout = _state.config.htmx.timeout;
        htmx.config.defaultSwapStyle = _state.config.htmx.swapStyle;
      }

      // Set custom tags
      if (newConfig.customTags) {
        setCustomTags(newConfig.customTags);
      }

      Debug.log(
        Debug.levels.INFO,
        "FlowPlater configured with:",
        _state.config,
      );

      return this;
    },

    getConfig: function () {
      return JSON.parse(JSON.stringify(_state.config));
    },

    destroy: function () {
      // Clean up all instances
      Object.keys(_state.instances).forEach((name) => {
        this.cleanup(name);
      });

      // Clean up template cache
      _state.templateCache = {};
      _state.instances = {};

      // Clean up event listeners
      EventSystem.unsubscribeAll();

      log("Cleaned up all instances");
    },

    create: function (instanceName, options = { refresh: true }) {
      Performance.start(`createInstance:${instanceName}`);
      Debug.log(
        Debug.levels.INFO,
        `Creating FlowPlater instance: ${instanceName}`,
      );

      // Find the element
      let element;
      if (instanceName.startsWith("#")) {
        element = document.getElementById(instanceName.slice(1));
      } else {
        element = document.querySelector(`[fp-instance="${instanceName}"]`);
      }

      if (!element) {
        throw new FlowPlaterError(
          `Could not find element for instance: ${instanceName}`,
        );
      }

      // Clear any existing template cache for this instance
      const templateId = element.getAttribute("fp-template");
      if (templateId) {
        this.templateCache.clear(templateId);
      }

      // Use init() to process the element, but skip initial render
      this.init(element);

      // Get the instance from state
      const instance = getInstance(instanceName);
      if (!instance) {
        throw new FlowPlaterError(`Failed to create instance: ${instanceName}`);
      }

      if (options.refresh) {
        instance.refresh();
      }

      Debug.log(
        Debug.levels.INFO,
        `Instance created successfully: ${instanceName}`,
      );
      Performance.end(`createInstance:${instanceName}`);

      return instance;
    },
  };

  // Initialize with default configuration
  FlowPlaterObj.config();

  return FlowPlaterObj;
})();

if (document.readyState === "complete" || document.readyState !== "loading") {
  setTimeout(() => {
    try {
      FlowPlater.init();
    } catch (error) {
      console.error("FlowPlater initialization failed:", error);
    }
  }, 1);
} else {
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
      try {
        FlowPlater.init();
      } catch (error) {
        console.error("FlowPlater initialization failed:", error);
      }
    }, 1);
  });
}
