/**!

 @license FlowPlater v1.4.26 | (c) 2024 FlowPlater | https://flowplater.io
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

var htmx = (function() {
  'use strict'

  // Public API
  const htmx = {
    // Tsc madness here, assigning the functions directly results in an invalid TypeScript output, but reassigning is fine
    /* Event processing */
    /** @type {typeof onLoadHelper} */
    onLoad: null,
    /** @type {typeof processNode} */
    process: null,
    /** @type {typeof addEventListenerImpl} */
    on: null,
    /** @type {typeof removeEventListenerImpl} */
    off: null,
    /** @type {typeof triggerEvent} */
    trigger: null,
    /** @type {typeof ajaxHelper} */
    ajax: null,
    /* DOM querying helpers */
    /** @type {typeof find} */
    find: null,
    /** @type {typeof findAll} */
    findAll: null,
    /** @type {typeof closest} */
    closest: null,
    /**
     * Returns the input values that would resolve for a given element via the htmx value resolution mechanism
     *
     * @see https://htmx.org/api/#values
     *
     * @param {Element} elt the element to resolve values on
     * @param {HttpVerb} type the request type (e.g. **get** or **post**) non-GET's will include the enclosing form of the element. Defaults to **post**
     * @returns {Object}
     */
    values: function(elt, type) {
      const inputValues = getInputValues(elt, type || 'post')
      return inputValues.values
    },
    /* DOM manipulation helpers */
    /** @type {typeof removeElement} */
    remove: null,
    /** @type {typeof addClassToElement} */
    addClass: null,
    /** @type {typeof removeClassFromElement} */
    removeClass: null,
    /** @type {typeof toggleClassOnElement} */
    toggleClass: null,
    /** @type {typeof takeClassForElement} */
    takeClass: null,
    /** @type {typeof swap} */
    swap: null,
    /* Extension entrypoints */
    /** @type {typeof defineExtension} */
    defineExtension: null,
    /** @type {typeof removeExtension} */
    removeExtension: null,
    /* Debugging */
    /** @type {typeof logAll} */
    logAll: null,
    /** @type {typeof logNone} */
    logNone: null,
    /* Debugging */
    /**
     * The logger htmx uses to log with
     *
     * @see https://htmx.org/api/#logger
     */
    logger: null,
    /**
     * A property holding the configuration htmx uses at runtime.
     *
     * Note that using a [meta tag](https://htmx.org/docs/#config) is the preferred mechanism for setting these properties.
     *
     * @see https://htmx.org/api/#config
     */
    config: {
      /**
       * Whether to use history.
       * @type boolean
       * @default true
       */
      historyEnabled: true,
      /**
       * The number of pages to keep in **localStorage** for history support.
       * @type number
       * @default 10
       */
      historyCacheSize: 10,
      /**
       * @type boolean
       * @default false
       */
      refreshOnHistoryMiss: false,
      /**
       * The default swap style to use if **[hx-swap](https://htmx.org/attributes/hx-swap)** is omitted.
       * @type HtmxSwapStyle
       * @default 'innerHTML'
       */
      defaultSwapStyle: 'innerHTML',
      /**
       * The default delay between receiving a response from the server and doing the swap.
       * @type number
       * @default 0
       */
      defaultSwapDelay: 0,
      /**
       * The default delay between completing the content swap and settling attributes.
       * @type number
       * @default 20
       */
      defaultSettleDelay: 20,
      /**
       * If true, htmx will inject a small amount of CSS into the page to make indicators invisible unless the **htmx-indicator** class is present.
       * @type boolean
       * @default true
       */
      includeIndicatorStyles: true,
      /**
       * The class to place on indicators when a request is in flight.
       * @type string
       * @default 'htmx-indicator'
       */
      indicatorClass: 'htmx-indicator',
      /**
       * The class to place on triggering elements when a request is in flight.
       * @type string
       * @default 'htmx-request'
       */
      requestClass: 'htmx-request',
      /**
       * The class to temporarily place on elements that htmx has added to the DOM.
       * @type string
       * @default 'htmx-added'
       */
      addedClass: 'htmx-added',
      /**
       * The class to place on target elements when htmx is in the settling phase.
       * @type string
       * @default 'htmx-settling'
       */
      settlingClass: 'htmx-settling',
      /**
       * The class to place on target elements when htmx is in the swapping phase.
       * @type string
       * @default 'htmx-swapping'
       */
      swappingClass: 'htmx-swapping',
      /**
       * Allows the use of eval-like functionality in htmx, to enable **hx-vars**, trigger conditions & script tag evaluation. Can be set to **false** for CSP compatibility.
       * @type boolean
       * @default true
       */
      allowEval: true,
      /**
       * If set to false, disables the interpretation of script tags.
       * @type boolean
       * @default true
       */
      allowScriptTags: true,
      /**
       * If set, the nonce will be added to inline scripts.
       * @type string
       * @default ''
       */
      inlineScriptNonce: '',
      /**
       * If set, the nonce will be added to inline styles.
       * @type string
       * @default ''
       */
      inlineStyleNonce: '',
      /**
       * The attributes to settle during the settling phase.
       * @type string[]
       * @default ['class', 'style', 'width', 'height']
       */
      attributesToSettle: ['class', 'style', 'width', 'height'],
      /**
       * Allow cross-site Access-Control requests using credentials such as cookies, authorization headers or TLS client certificates.
       * @type boolean
       * @default false
       */
      withCredentials: false,
      /**
       * @type number
       * @default 0
       */
      timeout: 0,
      /**
       * The default implementation of **getWebSocketReconnectDelay** for reconnecting after unexpected connection loss by the event code **Abnormal Closure**, **Service Restart** or **Try Again Later**.
       * @type {'full-jitter' | ((retryCount:number) => number)}
       * @default "full-jitter"
       */
      wsReconnectDelay: 'full-jitter',
      /**
       * The type of binary data being received over the WebSocket connection
       * @type BinaryType
       * @default 'blob'
       */
      wsBinaryType: 'blob',
      /**
       * @type string
       * @default '[hx-disable], [data-hx-disable]'
       */
      disableSelector: '[hx-disable], [data-hx-disable]',
      /**
       * @type {'auto' | 'instant' | 'smooth'}
       * @default 'instant'
       */
      scrollBehavior: 'instant',
      /**
       * If the focused element should be scrolled into view.
       * @type boolean
       * @default false
       */
      defaultFocusScroll: false,
      /**
       * If set to true htmx will include a cache-busting parameter in GET requests to avoid caching partial responses by the browser
       * @type boolean
       * @default false
       */
      getCacheBusterParam: false,
      /**
       * If set to true, htmx will use the View Transition API when swapping in new content.
       * @type boolean
       * @default false
       */
      globalViewTransitions: false,
      /**
       * htmx will format requests with these methods by encoding their parameters in the URL, not the request body
       * @type {(HttpVerb)[]}
       * @default ['get', 'delete']
       */
      methodsThatUseUrlParams: ['get', 'delete'],
      /**
       * If set to true, disables htmx-based requests to non-origin hosts.
       * @type boolean
       * @default false
       */
      selfRequestsOnly: true,
      /**
       * If set to true htmx will not update the title of the document when a title tag is found in new content
       * @type boolean
       * @default false
       */
      ignoreTitle: false,
      /**
       * Whether the target of a boosted element is scrolled into the viewport.
       * @type boolean
       * @default true
       */
      scrollIntoViewOnBoost: true,
      /**
       * The cache to store evaluated trigger specifications into.
       * You may define a simple object to use a never-clearing cache, or implement your own system using a [proxy object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
       * @type {Object|null}
       * @default null
       */
      triggerSpecsCache: null,
      /** @type boolean */
      disableInheritance: false,
      /** @type HtmxResponseHandlingConfig[] */
      responseHandling: [
        { code: '204', swap: false },
        { code: '[23]..', swap: true },
        { code: '[45]..', swap: false, error: true }
      ],
      /**
       * Whether to process OOB swaps on elements that are nested within the main response element.
       * @type boolean
       * @default true
       */
      allowNestedOobSwaps: true
    },
    /** @type {typeof parseInterval} */
    parseInterval: null,
    /** @type {typeof internalEval} */
    _: null,
    version: '2.0.4'
  }
  // Tsc madness part 2
  htmx.onLoad = onLoadHelper
  htmx.process = processNode
  htmx.on = addEventListenerImpl
  htmx.off = removeEventListenerImpl
  htmx.trigger = triggerEvent
  htmx.ajax = ajaxHelper
  htmx.find = find
  htmx.findAll = findAll
  htmx.closest = closest
  htmx.remove = removeElement
  htmx.addClass = addClassToElement
  htmx.removeClass = removeClassFromElement
  htmx.toggleClass = toggleClassOnElement
  htmx.takeClass = takeClassForElement
  htmx.swap = swap
  htmx.defineExtension = defineExtension
  htmx.removeExtension = removeExtension
  htmx.logAll = logAll
  htmx.logNone = logNone
  htmx.parseInterval = parseInterval
  htmx._ = internalEval

  const internalAPI = {
    addTriggerHandler,
    bodyContains,
    canAccessLocalStorage,
    findThisElement,
    filterValues,
    swap,
    hasAttribute,
    getAttributeValue,
    getClosestAttributeValue,
    getClosestMatch,
    getExpressionVars,
    getHeaders,
    getInputValues,
    getInternalData,
    getSwapSpecification,
    getTriggerSpecs,
    getTarget,
    makeFragment,
    mergeObjects,
    makeSettleInfo,
    oobSwap,
    querySelectorExt,
    settleImmediately,
    shouldCancel,
    triggerEvent,
    triggerErrorEvent,
    withExtensions
  }

  const VERBS = ['get', 'post', 'put', 'delete', 'patch']
  const VERB_SELECTOR = VERBS.map(function(verb) {
    return '[hx-' + verb + '], [data-hx-' + verb + ']'
  }).join(', ')

  //= ===================================================================
  // Utilities
  //= ===================================================================

  /**
   * Parses an interval string consistent with the way htmx does. Useful for plugins that have timing-related attributes.
   *
   * Caution: Accepts an int followed by either **s** or **ms**. All other values use **parseFloat**
   *
   * @see https://htmx.org/api/#parseInterval
   *
   * @param {string} str timing string
   * @returns {number|undefined}
   */
  function parseInterval(str) {
    if (str == undefined) {
      return undefined
    }

    let interval = NaN
    if (str.slice(-2) == 'ms') {
      interval = parseFloat(str.slice(0, -2))
    } else if (str.slice(-1) == 's') {
      interval = parseFloat(str.slice(0, -1)) * 1000
    } else if (str.slice(-1) == 'm') {
      interval = parseFloat(str.slice(0, -1)) * 1000 * 60
    } else {
      interval = parseFloat(str)
    }
    return isNaN(interval) ? undefined : interval
  }

  /**
   * @param {Node} elt
   * @param {string} name
   * @returns {(string | null)}
   */
  function getRawAttribute(elt, name) {
    return elt instanceof Element && elt.getAttribute(name)
  }

  /**
   * @param {Element} elt
   * @param {string} qualifiedName
   * @returns {boolean}
   */
  // resolve with both hx and data-hx prefixes
  function hasAttribute(elt, qualifiedName) {
    return !!elt.hasAttribute && (elt.hasAttribute(qualifiedName) ||
      elt.hasAttribute('data-' + qualifiedName))
  }

  /**
   *
   * @param {Node} elt
   * @param {string} qualifiedName
   * @returns {(string | null)}
   */
  function getAttributeValue(elt, qualifiedName) {
    return getRawAttribute(elt, qualifiedName) || getRawAttribute(elt, 'data-' + qualifiedName)
  }

  /**
   * @param {Node} elt
   * @returns {Node | null}
   */
  function parentElt(elt) {
    const parent = elt.parentElement
    if (!parent && elt.parentNode instanceof ShadowRoot) return elt.parentNode
    return parent
  }

  /**
   * @returns {Document}
   */
  function getDocument() {
    return document
  }

  /**
   * @param {Node} elt
   * @param {boolean} global
   * @returns {Node|Document}
   */
  function getRootNode(elt, global) {
    return elt.getRootNode ? elt.getRootNode({ composed: global }) : getDocument()
  }

  /**
   * @param {Node} elt
   * @param {(e:Node) => boolean} condition
   * @returns {Node | null}
   */
  function getClosestMatch(elt, condition) {
    while (elt && !condition(elt)) {
      elt = parentElt(elt)
    }

    return elt || null
  }

  /**
   * @param {Element} initialElement
   * @param {Element} ancestor
   * @param {string} attributeName
   * @returns {string|null}
   */
  function getAttributeValueWithDisinheritance(initialElement, ancestor, attributeName) {
    const attributeValue = getAttributeValue(ancestor, attributeName)
    const disinherit = getAttributeValue(ancestor, 'hx-disinherit')
    var inherit = getAttributeValue(ancestor, 'hx-inherit')
    if (initialElement !== ancestor) {
      if (htmx.config.disableInheritance) {
        if (inherit && (inherit === '*' || inherit.split(' ').indexOf(attributeName) >= 0)) {
          return attributeValue
        } else {
          return null
        }
      }
      if (disinherit && (disinherit === '*' || disinherit.split(' ').indexOf(attributeName) >= 0)) {
        return 'unset'
      }
    }
    return attributeValue
  }

  /**
   * @param {Element} elt
   * @param {string} attributeName
   * @returns {string | null}
   */
  function getClosestAttributeValue(elt, attributeName) {
    let closestAttr = null
    getClosestMatch(elt, function(e) {
      return !!(closestAttr = getAttributeValueWithDisinheritance(elt, asElement(e), attributeName))
    })
    if (closestAttr !== 'unset') {
      return closestAttr
    }
  }

  /**
   * @param {Node} elt
   * @param {string} selector
   * @returns {boolean}
   */
  function matches(elt, selector) {
    // @ts-ignore: non-standard properties for browser compatibility
    // noinspection JSUnresolvedVariable
    const matchesFunction = elt instanceof Element && (elt.matches || elt.matchesSelector || elt.msMatchesSelector || elt.mozMatchesSelector || elt.webkitMatchesSelector || elt.oMatchesSelector)
    return !!matchesFunction && matchesFunction.call(elt, selector)
  }

  /**
   * @param {string} str
   * @returns {string}
   */
  function getStartTag(str) {
    const tagMatcher = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
    const match = tagMatcher.exec(str)
    if (match) {
      return match[1].toLowerCase()
    } else {
      return ''
    }
  }

  /**
   * @param {string} resp
   * @returns {Document}
   */
  function parseHTML(resp) {
    const parser = new DOMParser()
    return parser.parseFromString(resp, 'text/html')
  }

  /**
   * @param {DocumentFragment} fragment
   * @param {Node} elt
   */
  function takeChildrenFor(fragment, elt) {
    while (elt.childNodes.length > 0) {
      fragment.append(elt.childNodes[0])
    }
  }

  /**
   * @param {HTMLScriptElement} script
   * @returns {HTMLScriptElement}
   */
  function duplicateScript(script) {
    const newScript = getDocument().createElement('script')
    forEach(script.attributes, function(attr) {
      newScript.setAttribute(attr.name, attr.value)
    })
    newScript.textContent = script.textContent
    newScript.async = false
    if (htmx.config.inlineScriptNonce) {
      newScript.nonce = htmx.config.inlineScriptNonce
    }
    return newScript
  }

  /**
   * @param {HTMLScriptElement} script
   * @returns {boolean}
   */
  function isJavaScriptScriptNode(script) {
    return script.matches('script') && (script.type === 'text/javascript' || script.type === 'module' || script.type === '')
  }

  /**
   * we have to make new copies of script tags that we are going to insert because
   * SOME browsers (not saying who, but it involves an element and an animal) don't
   * execute scripts created in <template> tags when they are inserted into the DOM
   * and all the others do lmao
   * @param {DocumentFragment} fragment
   */
  function normalizeScriptTags(fragment) {
    Array.from(fragment.querySelectorAll('script')).forEach(/** @param {HTMLScriptElement} script */ (script) => {
      if (isJavaScriptScriptNode(script)) {
        const newScript = duplicateScript(script)
        const parent = script.parentNode
        try {
          parent.insertBefore(newScript, script)
        } catch (e) {
          logError(e)
        } finally {
          script.remove()
        }
      }
    })
  }

  /**
   * @typedef {DocumentFragment & {title?: string}} DocumentFragmentWithTitle
   * @description  a document fragment representing the response HTML, including
   * a `title` property for any title information found
   */

  /**
   * @param {string} response HTML
   * @returns {DocumentFragmentWithTitle}
   */
  function makeFragment(response) {
    // strip head tag to determine shape of response we are dealing with
    const responseWithNoHead = response.replace(/<head(\s[^>]*)?>[\s\S]*?<\/head>/i, '')
    const startTag = getStartTag(responseWithNoHead)
    /** @type DocumentFragmentWithTitle */
    let fragment
    if (startTag === 'html') {
      // if it is a full document, parse it and return the body
      fragment = /** @type DocumentFragmentWithTitle */ (new DocumentFragment())
      const doc = parseHTML(response)
      takeChildrenFor(fragment, doc.body)
      fragment.title = doc.title
    } else if (startTag === 'body') {
      // parse body w/o wrapping in template
      fragment = /** @type DocumentFragmentWithTitle */ (new DocumentFragment())
      const doc = parseHTML(responseWithNoHead)
      takeChildrenFor(fragment, doc.body)
      fragment.title = doc.title
    } else {
      // otherwise we have non-body partial HTML content, so wrap it in a template to maximize parsing flexibility
      const doc = parseHTML('<body><template class="internal-htmx-wrapper">' + responseWithNoHead + '</template></body>')
      fragment = /** @type DocumentFragmentWithTitle */ (doc.querySelector('template').content)
      // extract title into fragment for later processing
      fragment.title = doc.title

      // for legacy reasons we support a title tag at the root level of non-body responses, so we need to handle it
      var titleElement = fragment.querySelector('title')
      if (titleElement && titleElement.parentNode === fragment) {
        titleElement.remove()
        fragment.title = titleElement.innerText
      }
    }
    if (fragment) {
      if (htmx.config.allowScriptTags) {
        normalizeScriptTags(fragment)
      } else {
        // remove all script tags if scripts are disabled
        fragment.querySelectorAll('script').forEach((script) => script.remove())
      }
    }
    return fragment
  }

  /**
   * @param {Function} func
   */
  function maybeCall(func) {
    if (func) {
      func()
    }
  }

  /**
   * @param {any} o
   * @param {string} type
   * @returns
   */
  function isType(o, type) {
    return Object.prototype.toString.call(o) === '[object ' + type + ']'
  }

  /**
   * @param {*} o
   * @returns {o is Function}
   */
  function isFunction(o) {
    return typeof o === 'function'
  }

  /**
   * @param {*} o
   * @returns {o is Object}
   */
  function isRawObject(o) {
    return isType(o, 'Object')
  }

  /**
   * @typedef {Object} OnHandler
   * @property {(keyof HTMLElementEventMap)|string} event
   * @property {EventListener} listener
   */

  /**
   * @typedef {Object} ListenerInfo
   * @property {string} trigger
   * @property {EventListener} listener
   * @property {EventTarget} on
   */

  /**
   * @typedef {Object} HtmxNodeInternalData
   * Element data
   * @property {number} [initHash]
   * @property {boolean} [boosted]
   * @property {OnHandler[]} [onHandlers]
   * @property {number} [timeout]
   * @property {ListenerInfo[]} [listenerInfos]
   * @property {boolean} [cancelled]
   * @property {boolean} [triggeredOnce]
   * @property {number} [delayed]
   * @property {number|null} [throttle]
   * @property {WeakMap<HtmxTriggerSpecification,WeakMap<EventTarget,string>>} [lastValue]
   * @property {boolean} [loaded]
   * @property {string} [path]
   * @property {string} [verb]
   * @property {boolean} [polling]
   * @property {HTMLButtonElement|HTMLInputElement|null} [lastButtonClicked]
   * @property {number} [requestCount]
   * @property {XMLHttpRequest} [xhr]
   * @property {(() => void)[]} [queuedRequests]
   * @property {boolean} [abortable]
   * @property {boolean} [firstInitCompleted]
   *
   * Event data
   * @property {HtmxTriggerSpecification} [triggerSpec]
   * @property {EventTarget[]} [handledFor]
   */

  /**
   * getInternalData retrieves "private" data stored by htmx within an element
   * @param {EventTarget|Event} elt
   * @returns {HtmxNodeInternalData}
   */
  function getInternalData(elt) {
    const dataProp = 'htmx-internal-data'
    let data = elt[dataProp]
    if (!data) {
      data = elt[dataProp] = {}
    }
    return data
  }

  /**
   * toArray converts an ArrayLike object into a real array.
   * @template T
   * @param {ArrayLike<T>} arr
   * @returns {T[]}
   */
  function toArray(arr) {
    const returnArr = []
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        returnArr.push(arr[i])
      }
    }
    return returnArr
  }

  /**
   * @template T
   * @param {T[]|NamedNodeMap|HTMLCollection|HTMLFormControlsCollection|ArrayLike<T>} arr
   * @param {(T) => void} func
   */
  function forEach(arr, func) {
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        func(arr[i])
      }
    }
  }

  /**
   * @param {Element} el
   * @returns {boolean}
   */
  function isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect()
    const elemTop = rect.top
    const elemBottom = rect.bottom
    return elemTop < window.innerHeight && elemBottom >= 0
  }

  /**
   * Checks whether the element is in the document (includes shadow roots).
   * This function this is a slight misnomer; it will return true even for elements in the head.
   *
   * @param {Node} elt
   * @returns {boolean}
   */
  function bodyContains(elt) {
    return elt.getRootNode({ composed: true }) === document
  }

  /**
   * @param {string} trigger
   * @returns {string[]}
   */
  function splitOnWhitespace(trigger) {
    return trigger.trim().split(/\s+/)
  }

  /**
   * mergeObjects takes all the keys from
   * obj2 and duplicates them into obj1
   * @template T1
   * @template T2
   * @param {T1} obj1
   * @param {T2} obj2
   * @returns {T1 & T2}
   */
  function mergeObjects(obj1, obj2) {
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        // @ts-ignore tsc doesn't seem to properly handle types merging
        obj1[key] = obj2[key]
      }
    }
    // @ts-ignore tsc doesn't seem to properly handle types merging
    return obj1
  }

  /**
   * @param {string} jString
   * @returns {any|null}
   */
  function parseJSON(jString) {
    try {
      return JSON.parse(jString)
    } catch (error) {
      logError(error)
      return null
    }
  }

  /**
   * @returns {boolean}
   */
  function canAccessLocalStorage() {
    const test = 'htmx:localStorageTest'
    try {
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * @param {string} path
   * @returns {string}
   */
  function normalizePath(path) {
    try {
      const url = new URL(path)
      if (url) {
        path = url.pathname + url.search
      }
      // remove trailing slash, unless index page
      if (!(/^\/$/.test(path))) {
        path = path.replace(/\/+$/, '')
      }
      return path
    } catch (e) {
      // be kind to IE11, which doesn't support URL()
      return path
    }
  }

  //= =========================================================================================
  // public API
  //= =========================================================================================

  /**
   * @param {string} str
   * @returns {any}
   */
  function internalEval(str) {
    return maybeEval(getDocument().body, function() {
      return eval(str)
    })
  }

  /**
   * Adds a callback for the **htmx:load** event. This can be used to process new content, for example initializing the content with a javascript library
   *
   * @see https://htmx.org/api/#onLoad
   *
   * @param {(elt: Node) => void} callback the callback to call on newly loaded content
   * @returns {EventListener}
   */
  function onLoadHelper(callback) {
    const value = htmx.on('htmx:load', /** @param {CustomEvent} evt */ function(evt) {
      callback(evt.detail.elt)
    })
    return value
  }

  /**
   * Log all htmx events, useful for debugging.
   *
   * @see https://htmx.org/api/#logAll
   */
  function logAll() {
    htmx.logger = function(elt, event, data) {
      if (console) {
        console.log(event, elt, data)
      }
    }
  }

  function logNone() {
    htmx.logger = null
  }

  /**
   * Finds an element matching the selector
   *
   * @see https://htmx.org/api/#find
   *
   * @param {ParentNode|string} eltOrSelector  the root element to find the matching element in, inclusive | the selector to match
   * @param {string} [selector] the selector to match
   * @returns {Element|null}
   */
  function find(eltOrSelector, selector) {
    if (typeof eltOrSelector !== 'string') {
      return eltOrSelector.querySelector(selector)
    } else {
      return find(getDocument(), eltOrSelector)
    }
  }

  /**
   * Finds all elements matching the selector
   *
   * @see https://htmx.org/api/#findAll
   *
   * @param {ParentNode|string} eltOrSelector the root element to find the matching elements in, inclusive | the selector to match
   * @param {string} [selector] the selector to match
   * @returns {NodeListOf<Element>}
   */
  function findAll(eltOrSelector, selector) {
    if (typeof eltOrSelector !== 'string') {
      return eltOrSelector.querySelectorAll(selector)
    } else {
      return findAll(getDocument(), eltOrSelector)
    }
  }

  /**
   * @returns Window
   */
  function getWindow() {
    return window
  }

  /**
   * Removes an element from the DOM
   *
   * @see https://htmx.org/api/#remove
   *
   * @param {Node} elt
   * @param {number} [delay]
   */
  function removeElement(elt, delay) {
    elt = resolveTarget(elt)
    if (delay) {
      getWindow().setTimeout(function() {
        removeElement(elt)
        elt = null
      }, delay)
    } else {
      parentElt(elt).removeChild(elt)
    }
  }

  /**
   * @param {any} elt
   * @return {Element|null}
   */
  function asElement(elt) {
    return elt instanceof Element ? elt : null
  }

  /**
   * @param {any} elt
   * @return {HTMLElement|null}
   */
  function asHtmlElement(elt) {
    return elt instanceof HTMLElement ? elt : null
  }

  /**
   * @param {any} value
   * @return {string|null}
   */
  function asString(value) {
    return typeof value === 'string' ? value : null
  }

  /**
   * @param {EventTarget} elt
   * @return {ParentNode|null}
   */
  function asParentNode(elt) {
    return elt instanceof Element || elt instanceof Document || elt instanceof DocumentFragment ? elt : null
  }

  /**
   * This method adds a class to the given element.
   *
   * @see https://htmx.org/api/#addClass
   *
   * @param {Element|string} elt the element to add the class to
   * @param {string} clazz the class to add
   * @param {number} [delay] the delay (in milliseconds) before class is added
   */
  function addClassToElement(elt, clazz, delay) {
    elt = asElement(resolveTarget(elt))
    if (!elt) {
      return
    }
    if (delay) {
      getWindow().setTimeout(function() {
        addClassToElement(elt, clazz)
        elt = null
      }, delay)
    } else {
      elt.classList && elt.classList.add(clazz)
    }
  }

  /**
   * Removes a class from the given element
   *
   * @see https://htmx.org/api/#removeClass
   *
   * @param {Node|string} node element to remove the class from
   * @param {string} clazz the class to remove
   * @param {number} [delay] the delay (in milliseconds before class is removed)
   */
  function removeClassFromElement(node, clazz, delay) {
    let elt = asElement(resolveTarget(node))
    if (!elt) {
      return
    }
    if (delay) {
      getWindow().setTimeout(function() {
        removeClassFromElement(elt, clazz)
        elt = null
      }, delay)
    } else {
      if (elt.classList) {
        elt.classList.remove(clazz)
        // if there are no classes left, remove the class attribute
        if (elt.classList.length === 0) {
          elt.removeAttribute('class')
        }
      }
    }
  }

  /**
   * Toggles the given class on an element
   *
   * @see https://htmx.org/api/#toggleClass
   *
   * @param {Element|string} elt the element to toggle the class on
   * @param {string} clazz the class to toggle
   */
  function toggleClassOnElement(elt, clazz) {
    elt = resolveTarget(elt)
    elt.classList.toggle(clazz)
  }

  /**
   * Takes the given class from its siblings, so that among its siblings, only the given element will have the class.
   *
   * @see https://htmx.org/api/#takeClass
   *
   * @param {Node|string} elt the element that will take the class
   * @param {string} clazz the class to take
   */
  function takeClassForElement(elt, clazz) {
    elt = resolveTarget(elt)
    forEach(elt.parentElement.children, function(child) {
      removeClassFromElement(child, clazz)
    })
    addClassToElement(asElement(elt), clazz)
  }

  /**
   * Finds the closest matching element in the given elements parentage, inclusive of the element
   *
   * @see https://htmx.org/api/#closest
   *
   * @param {Element|string} elt the element to find the selector from
   * @param {string} selector the selector to find
   * @returns {Element|null}
   */
  function closest(elt, selector) {
    elt = asElement(resolveTarget(elt))
    if (elt && elt.closest) {
      return elt.closest(selector)
    } else {
      // TODO remove when IE goes away
      do {
        if (elt == null || matches(elt, selector)) {
          return elt
        }
      }
      while (elt = elt && asElement(parentElt(elt)))
      return null
    }
  }

  /**
   * @param {string} str
   * @param {string} prefix
   * @returns {boolean}
   */
  function startsWith(str, prefix) {
    return str.substring(0, prefix.length) === prefix
  }

  /**
   * @param {string} str
   * @param {string} suffix
   * @returns {boolean}
   */
  function endsWith(str, suffix) {
    return str.substring(str.length - suffix.length) === suffix
  }

  /**
   * @param {string} selector
   * @returns {string}
   */
  function normalizeSelector(selector) {
    const trimmedSelector = selector.trim()
    if (startsWith(trimmedSelector, '<') && endsWith(trimmedSelector, '/>')) {
      return trimmedSelector.substring(1, trimmedSelector.length - 2)
    } else {
      return trimmedSelector
    }
  }

  /**
   * @param {Node|Element|Document|string} elt
   * @param {string} selector
   * @param {boolean=} global
   * @returns {(Node|Window)[]}
   */
  function querySelectorAllExt(elt, selector, global) {
    if (selector.indexOf('global ') === 0) {
      return querySelectorAllExt(elt, selector.slice(7), true)
    }

    elt = resolveTarget(elt)

    const parts = []
    {
      let chevronsCount = 0
      let offset = 0
      for (let i = 0; i < selector.length; i++) {
        const char = selector[i]
        if (char === ',' && chevronsCount === 0) {
          parts.push(selector.substring(offset, i))
          offset = i + 1
          continue
        }
        if (char === '<') {
          chevronsCount++
        } else if (char === '/' && i < selector.length - 1 && selector[i + 1] === '>') {
          chevronsCount--
        }
      }
      if (offset < selector.length) {
        parts.push(selector.substring(offset))
      }
    }

    const result = []
    const unprocessedParts = []
    while (parts.length > 0) {
      const selector = normalizeSelector(parts.shift())
      let item
      if (selector.indexOf('closest ') === 0) {
        item = closest(asElement(elt), normalizeSelector(selector.substr(8)))
      } else if (selector.indexOf('find ') === 0) {
        item = find(asParentNode(elt), normalizeSelector(selector.substr(5)))
      } else if (selector === 'next' || selector === 'nextElementSibling') {
        item = asElement(elt).nextElementSibling
      } else if (selector.indexOf('next ') === 0) {
        item = scanForwardQuery(elt, normalizeSelector(selector.substr(5)), !!global)
      } else if (selector === 'previous' || selector === 'previousElementSibling') {
        item = asElement(elt).previousElementSibling
      } else if (selector.indexOf('previous ') === 0) {
        item = scanBackwardsQuery(elt, normalizeSelector(selector.substr(9)), !!global)
      } else if (selector === 'document') {
        item = document
      } else if (selector === 'window') {
        item = window
      } else if (selector === 'body') {
        item = document.body
      } else if (selector === 'root') {
        item = getRootNode(elt, !!global)
      } else if (selector === 'host') {
        item = (/** @type ShadowRoot */(elt.getRootNode())).host
      } else {
        unprocessedParts.push(selector)
      }

      if (item) {
        result.push(item)
      }
    }

    if (unprocessedParts.length > 0) {
      const standardSelector = unprocessedParts.join(',')
      const rootNode = asParentNode(getRootNode(elt, !!global))
      result.push(...toArray(rootNode.querySelectorAll(standardSelector)))
    }

    return result
  }

  /**
   * @param {Node} start
   * @param {string} match
   * @param {boolean} global
   * @returns {Element}
   */
  var scanForwardQuery = function(start, match, global) {
    const results = asParentNode(getRootNode(start, global)).querySelectorAll(match)
    for (let i = 0; i < results.length; i++) {
      const elt = results[i]
      if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_PRECEDING) {
        return elt
      }
    }
  }

  /**
   * @param {Node} start
   * @param {string} match
   * @param {boolean} global
   * @returns {Element}
   */
  var scanBackwardsQuery = function(start, match, global) {
    const results = asParentNode(getRootNode(start, global)).querySelectorAll(match)
    for (let i = results.length - 1; i >= 0; i--) {
      const elt = results[i]
      if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_FOLLOWING) {
        return elt
      }
    }
  }

  /**
   * @param {Node|string} eltOrSelector
   * @param {string=} selector
   * @returns {Node|Window}
   */
  function querySelectorExt(eltOrSelector, selector) {
    if (typeof eltOrSelector !== 'string') {
      return querySelectorAllExt(eltOrSelector, selector)[0]
    } else {
      return querySelectorAllExt(getDocument().body, eltOrSelector)[0]
    }
  }

  /**
   * @template {EventTarget} T
   * @param {T|string} eltOrSelector
   * @param {T} [context]
   * @returns {Element|T|null}
   */
  function resolveTarget(eltOrSelector, context) {
    if (typeof eltOrSelector === 'string') {
      return find(asParentNode(context) || document, eltOrSelector)
    } else {
      return eltOrSelector
    }
  }

  /**
   * @typedef {keyof HTMLElementEventMap|string} AnyEventName
   */

  /**
   * @typedef {Object} EventArgs
   * @property {EventTarget} target
   * @property {AnyEventName} event
   * @property {EventListener} listener
   * @property {Object|boolean} options
   */

  /**
   * @param {EventTarget|AnyEventName} arg1
   * @param {AnyEventName|EventListener} arg2
   * @param {EventListener|Object|boolean} [arg3]
   * @param {Object|boolean} [arg4]
   * @returns {EventArgs}
   */
  function processEventArgs(arg1, arg2, arg3, arg4) {
    if (isFunction(arg2)) {
      return {
        target: getDocument().body,
        event: asString(arg1),
        listener: arg2,
        options: arg3
      }
    } else {
      return {
        target: resolveTarget(arg1),
        event: asString(arg2),
        listener: arg3,
        options: arg4
      }
    }
  }

  /**
   * Adds an event listener to an element
   *
   * @see https://htmx.org/api/#on
   *
   * @param {EventTarget|string} arg1 the element to add the listener to | the event name to add the listener for
   * @param {string|EventListener} arg2 the event name to add the listener for | the listener to add
   * @param {EventListener|Object|boolean} [arg3] the listener to add | options to add
   * @param {Object|boolean} [arg4] options to add
   * @returns {EventListener}
   */
  function addEventListenerImpl(arg1, arg2, arg3, arg4) {
    ready(function() {
      const eventArgs = processEventArgs(arg1, arg2, arg3, arg4)
      eventArgs.target.addEventListener(eventArgs.event, eventArgs.listener, eventArgs.options)
    })
    const b = isFunction(arg2)
    return b ? arg2 : arg3
  }

  /**
   * Removes an event listener from an element
   *
   * @see https://htmx.org/api/#off
   *
   * @param {EventTarget|string} arg1 the element to remove the listener from | the event name to remove the listener from
   * @param {string|EventListener} arg2 the event name to remove the listener from | the listener to remove
   * @param {EventListener} [arg3] the listener to remove
   * @returns {EventListener}
   */
  function removeEventListenerImpl(arg1, arg2, arg3) {
    ready(function() {
      const eventArgs = processEventArgs(arg1, arg2, arg3)
      eventArgs.target.removeEventListener(eventArgs.event, eventArgs.listener)
    })
    return isFunction(arg2) ? arg2 : arg3
  }

  //= ===================================================================
  // Node processing
  //= ===================================================================

  const DUMMY_ELT = getDocument().createElement('output') // dummy element for bad selectors
  /**
   * @param {Element} elt
   * @param {string} attrName
   * @returns {(Node|Window)[]}
   */
  function findAttributeTargets(elt, attrName) {
    const attrTarget = getClosestAttributeValue(elt, attrName)
    if (attrTarget) {
      if (attrTarget === 'this') {
        return [findThisElement(elt, attrName)]
      } else {
        const result = querySelectorAllExt(elt, attrTarget)
        if (result.length === 0) {
          logError('The selector "' + attrTarget + '" on ' + attrName + ' returned no matches!')
          return [DUMMY_ELT]
        } else {
          return result
        }
      }
    }
  }

  /**
   * @param {Element} elt
   * @param {string} attribute
   * @returns {Element|null}
   */
  function findThisElement(elt, attribute) {
    return asElement(getClosestMatch(elt, function(elt) {
      return getAttributeValue(asElement(elt), attribute) != null
    }))
  }

  /**
   * @param {Element} elt
   * @returns {Node|Window|null}
   */
  function getTarget(elt) {
    const targetStr = getClosestAttributeValue(elt, 'hx-target')
    if (targetStr) {
      if (targetStr === 'this') {
        return findThisElement(elt, 'hx-target')
      } else {
        return querySelectorExt(elt, targetStr)
      }
    } else {
      const data = getInternalData(elt)
      if (data.boosted) {
        return getDocument().body
      } else {
        return elt
      }
    }
  }

  /**
   * @param {string} name
   * @returns {boolean}
   */
  function shouldSettleAttribute(name) {
    const attributesToSettle = htmx.config.attributesToSettle
    for (let i = 0; i < attributesToSettle.length; i++) {
      if (name === attributesToSettle[i]) {
        return true
      }
    }
    return false
  }

  /**
   * @param {Element} mergeTo
   * @param {Element} mergeFrom
   */
  function cloneAttributes(mergeTo, mergeFrom) {
    forEach(mergeTo.attributes, function(attr) {
      if (!mergeFrom.hasAttribute(attr.name) && shouldSettleAttribute(attr.name)) {
        mergeTo.removeAttribute(attr.name)
      }
    })
    forEach(mergeFrom.attributes, function(attr) {
      if (shouldSettleAttribute(attr.name)) {
        mergeTo.setAttribute(attr.name, attr.value)
      }
    })
  }

  /**
   * @param {HtmxSwapStyle} swapStyle
   * @param {Element} target
   * @returns {boolean}
   */
  function isInlineSwap(swapStyle, target) {
    const extensions = getExtensions(target)
    for (let i = 0; i < extensions.length; i++) {
      const extension = extensions[i]
      try {
        if (extension.isInlineSwap(swapStyle)) {
          return true
        }
      } catch (e) {
        logError(e)
      }
    }
    return swapStyle === 'outerHTML'
  }

  /**
   * @param {string} oobValue
   * @param {Element} oobElement
   * @param {HtmxSettleInfo} settleInfo
   * @param {Node|Document} [rootNode]
   * @returns
   */
  function oobSwap(oobValue, oobElement, settleInfo, rootNode) {
    rootNode = rootNode || getDocument()
    let selector = '#' + getRawAttribute(oobElement, 'id')
    /** @type HtmxSwapStyle */
    let swapStyle = 'outerHTML'
    if (oobValue === 'true') {
      // do nothing
    } else if (oobValue.indexOf(':') > 0) {
      swapStyle = oobValue.substring(0, oobValue.indexOf(':'))
      selector = oobValue.substring(oobValue.indexOf(':') + 1)
    } else {
      swapStyle = oobValue
    }
    oobElement.removeAttribute('hx-swap-oob')
    oobElement.removeAttribute('data-hx-swap-oob')

    const targets = querySelectorAllExt(rootNode, selector, false)
    if (targets) {
      forEach(
        targets,
        function(target) {
          let fragment
          const oobElementClone = oobElement.cloneNode(true)
          fragment = getDocument().createDocumentFragment()
          fragment.appendChild(oobElementClone)
          if (!isInlineSwap(swapStyle, target)) {
            fragment = asParentNode(oobElementClone) // if this is not an inline swap, we use the content of the node, not the node itself
          }

          const beforeSwapDetails = { shouldSwap: true, target, fragment }
          if (!triggerEvent(target, 'htmx:oobBeforeSwap', beforeSwapDetails)) return

          target = beforeSwapDetails.target // allow re-targeting
          if (beforeSwapDetails.shouldSwap) {
            handlePreservedElements(fragment)
            swapWithStyle(swapStyle, target, target, fragment, settleInfo)
            restorePreservedElements()
          }
          forEach(settleInfo.elts, function(elt) {
            triggerEvent(elt, 'htmx:oobAfterSwap', beforeSwapDetails)
          })
        }
      )
      oobElement.parentNode.removeChild(oobElement)
    } else {
      oobElement.parentNode.removeChild(oobElement)
      triggerErrorEvent(getDocument().body, 'htmx:oobErrorNoTarget', { content: oobElement })
    }
    return oobValue
  }

  function restorePreservedElements() {
    const pantry = find('#--htmx-preserve-pantry--')
    if (pantry) {
      for (const preservedElt of [...pantry.children]) {
        const existingElement = find('#' + preservedElt.id)
        // @ts-ignore - use proposed moveBefore feature
        existingElement.parentNode.moveBefore(preservedElt, existingElement)
        existingElement.remove()
      }
      pantry.remove()
    }
  }

  /**
   * @param {DocumentFragment|ParentNode} fragment
   */
  function handlePreservedElements(fragment) {
    forEach(findAll(fragment, '[hx-preserve], [data-hx-preserve]'), function(preservedElt) {
      const id = getAttributeValue(preservedElt, 'id')
      const existingElement = getDocument().getElementById(id)
      if (existingElement != null) {
        if (preservedElt.moveBefore) { // if the moveBefore API exists, use it
          // get or create a storage spot for stuff
          let pantry = find('#--htmx-preserve-pantry--')
          if (pantry == null) {
            getDocument().body.insertAdjacentHTML('afterend', "<div id='--htmx-preserve-pantry--'></div>")
            pantry = find('#--htmx-preserve-pantry--')
          }
          // @ts-ignore - use proposed moveBefore feature
          pantry.moveBefore(existingElement, null)
        } else {
          preservedElt.parentNode.replaceChild(existingElement, preservedElt)
        }
      }
    })
  }

  /**
   * @param {Node} parentNode
   * @param {ParentNode} fragment
   * @param {HtmxSettleInfo} settleInfo
   */
  function handleAttributes(parentNode, fragment, settleInfo) {
    forEach(fragment.querySelectorAll('[id]'), function(newNode) {
      const id = getRawAttribute(newNode, 'id')
      if (id && id.length > 0) {
        const normalizedId = id.replace("'", "\\'")
        const normalizedTag = newNode.tagName.replace(':', '\\:')
        const parentElt = asParentNode(parentNode)
        const oldNode = parentElt && parentElt.querySelector(normalizedTag + "[id='" + normalizedId + "']")
        if (oldNode && oldNode !== parentElt) {
          const newAttributes = newNode.cloneNode()
          cloneAttributes(newNode, oldNode)
          settleInfo.tasks.push(function() {
            cloneAttributes(newNode, newAttributes)
          })
        }
      }
    })
  }

  /**
   * @param {Node} child
   * @returns {HtmxSettleTask}
   */
  function makeAjaxLoadTask(child) {
    return function() {
      removeClassFromElement(child, htmx.config.addedClass)
      processNode(asElement(child))
      processFocus(asParentNode(child))
      triggerEvent(child, 'htmx:load')
    }
  }

  /**
   * @param {ParentNode} child
   */
  function processFocus(child) {
    const autofocus = '[autofocus]'
    const autoFocusedElt = asHtmlElement(matches(child, autofocus) ? child : child.querySelector(autofocus))
    if (autoFocusedElt != null) {
      autoFocusedElt.focus()
    }
  }

  /**
   * @param {Node} parentNode
   * @param {Node} insertBefore
   * @param {ParentNode} fragment
   * @param {HtmxSettleInfo} settleInfo
   */
  function insertNodesBefore(parentNode, insertBefore, fragment, settleInfo) {
    handleAttributes(parentNode, fragment, settleInfo)
    while (fragment.childNodes.length > 0) {
      const child = fragment.firstChild
      addClassToElement(asElement(child), htmx.config.addedClass)
      parentNode.insertBefore(child, insertBefore)
      if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
        settleInfo.tasks.push(makeAjaxLoadTask(child))
      }
    }
  }

  /**
   * based on https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0,
   * derived from Java's string hashcode implementation
   * @param {string} string
   * @param {number} hash
   * @returns {number}
   */
  function stringHash(string, hash) {
    let char = 0
    while (char < string.length) {
      hash = (hash << 5) - hash + string.charCodeAt(char++) | 0 // bitwise or ensures we have a 32-bit int
    }
    return hash
  }

  /**
   * @param {Element} elt
   * @returns {number}
   */
  function attributeHash(elt) {
    let hash = 0
    // IE fix
    if (elt.attributes) {
      for (let i = 0; i < elt.attributes.length; i++) {
        const attribute = elt.attributes[i]
        if (attribute.value) { // only include attributes w/ actual values (empty is same as non-existent)
          hash = stringHash(attribute.name, hash)
          hash = stringHash(attribute.value, hash)
        }
      }
    }
    return hash
  }

  /**
   * @param {EventTarget} elt
   */
  function deInitOnHandlers(elt) {
    const internalData = getInternalData(elt)
    if (internalData.onHandlers) {
      for (let i = 0; i < internalData.onHandlers.length; i++) {
        const handlerInfo = internalData.onHandlers[i]
        removeEventListenerImpl(elt, handlerInfo.event, handlerInfo.listener)
      }
      delete internalData.onHandlers
    }
  }

  /**
   * @param {Node} element
   */
  function deInitNode(element) {
    const internalData = getInternalData(element)
    if (internalData.timeout) {
      clearTimeout(internalData.timeout)
    }
    if (internalData.listenerInfos) {
      forEach(internalData.listenerInfos, function(info) {
        if (info.on) {
          removeEventListenerImpl(info.on, info.trigger, info.listener)
        }
      })
    }
    deInitOnHandlers(element)
    forEach(Object.keys(internalData), function(key) { if (key !== 'firstInitCompleted') delete internalData[key] })
  }

  /**
   * @param {Node} element
   */
  function cleanUpElement(element) {
    triggerEvent(element, 'htmx:beforeCleanupElement')
    deInitNode(element)
    // @ts-ignore IE11 code
    // noinspection JSUnresolvedReference
    if (element.children) { // IE
      // @ts-ignore
      forEach(element.children, function(child) { cleanUpElement(child) })
    }
  }

  /**
   * @param {Node} target
   * @param {ParentNode} fragment
   * @param {HtmxSettleInfo} settleInfo
   */
  function swapOuterHTML(target, fragment, settleInfo) {
    if (target instanceof Element && target.tagName === 'BODY') { // special case the body to innerHTML because DocumentFragments can't contain a body elt unfortunately
      return swapInnerHTML(target, fragment, settleInfo)
    }
    /** @type {Node} */
    let newElt
    const eltBeforeNewContent = target.previousSibling
    const parentNode = parentElt(target)
    if (!parentNode) { // when parent node disappears, we can't do anything
      return
    }
    insertNodesBefore(parentNode, target, fragment, settleInfo)
    if (eltBeforeNewContent == null) {
      newElt = parentNode.firstChild
    } else {
      newElt = eltBeforeNewContent.nextSibling
    }
    settleInfo.elts = settleInfo.elts.filter(function(e) { return e !== target })
    // scan through all newly added content and add all elements to the settle info so we trigger
    // events properly on them
    while (newElt && newElt !== target) {
      if (newElt instanceof Element) {
        settleInfo.elts.push(newElt)
      }
      newElt = newElt.nextSibling
    }
    cleanUpElement(target)
    if (target instanceof Element) {
      target.remove()
    } else {
      target.parentNode.removeChild(target)
    }
  }

  /**
   * @param {Node} target
   * @param {ParentNode} fragment
   * @param {HtmxSettleInfo} settleInfo
   */
  function swapAfterBegin(target, fragment, settleInfo) {
    return insertNodesBefore(target, target.firstChild, fragment, settleInfo)
  }

  /**
   * @param {Node} target
   * @param {ParentNode} fragment
   * @param {HtmxSettleInfo} settleInfo
   */
  function swapBeforeBegin(target, fragment, settleInfo) {
    return insertNodesBefore(parentElt(target), target, fragment, settleInfo)
  }

  /**
   * @param {Node} target
   * @param {ParentNode} fragment
   * @param {HtmxSettleInfo} settleInfo
   */
  function swapBeforeEnd(target, fragment, settleInfo) {
    return insertNodesBefore(target, null, fragment, settleInfo)
  }

  /**
   * @param {Node} target
   * @param {ParentNode} fragment
   * @param {HtmxSettleInfo} settleInfo
   */
  function swapAfterEnd(target, fragment, settleInfo) {
    return insertNodesBefore(parentElt(target), target.nextSibling, fragment, settleInfo)
  }

  /**
   * @param {Node} target
   */
  function swapDelete(target) {
    cleanUpElement(target)
    const parent = parentElt(target)
    if (parent) {
      return parent.removeChild(target)
    }
  }

  /**
   * @param {Node} target
   * @param {ParentNode} fragment
   * @param {HtmxSettleInfo} settleInfo
   */
  function swapInnerHTML(target, fragment, settleInfo) {
    const firstChild = target.firstChild
    insertNodesBefore(target, firstChild, fragment, settleInfo)
    if (firstChild) {
      while (firstChild.nextSibling) {
        cleanUpElement(firstChild.nextSibling)
        target.removeChild(firstChild.nextSibling)
      }
      cleanUpElement(firstChild)
      target.removeChild(firstChild)
    }
  }

  /**
   * @param {HtmxSwapStyle} swapStyle
   * @param {Element} elt
   * @param {Node} target
   * @param {ParentNode} fragment
   * @param {HtmxSettleInfo} settleInfo
   */
  function swapWithStyle(swapStyle, elt, target, fragment, settleInfo) {
    switch (swapStyle) {
      case 'none':
        return
      case 'outerHTML':
        swapOuterHTML(target, fragment, settleInfo)
        return
      case 'afterbegin':
        swapAfterBegin(target, fragment, settleInfo)
        return
      case 'beforebegin':
        swapBeforeBegin(target, fragment, settleInfo)
        return
      case 'beforeend':
        swapBeforeEnd(target, fragment, settleInfo)
        return
      case 'afterend':
        swapAfterEnd(target, fragment, settleInfo)
        return
      case 'delete':
        swapDelete(target)
        return
      default:
        var extensions = getExtensions(elt)
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i]
          try {
            const newElements = ext.handleSwap(swapStyle, target, fragment, settleInfo)
            if (newElements) {
              if (Array.isArray(newElements)) {
                // if handleSwap returns an array (like) of elements, we handle them
                for (let j = 0; j < newElements.length; j++) {
                  const child = newElements[j]
                  if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
                    settleInfo.tasks.push(makeAjaxLoadTask(child))
                  }
                }
              }
              return
            }
          } catch (e) {
            logError(e)
          }
        }
        if (swapStyle === 'innerHTML') {
          swapInnerHTML(target, fragment, settleInfo)
        } else {
          swapWithStyle(htmx.config.defaultSwapStyle, elt, target, fragment, settleInfo)
        }
    }
  }

  /**
   * @param {DocumentFragment} fragment
   * @param {HtmxSettleInfo} settleInfo
   * @param {Node|Document} [rootNode]
   */
  function findAndSwapOobElements(fragment, settleInfo, rootNode) {
    var oobElts = findAll(fragment, '[hx-swap-oob], [data-hx-swap-oob]')
    forEach(oobElts, function(oobElement) {
      if (htmx.config.allowNestedOobSwaps || oobElement.parentElement === null) {
        const oobValue = getAttributeValue(oobElement, 'hx-swap-oob')
        if (oobValue != null) {
          oobSwap(oobValue, oobElement, settleInfo, rootNode)
        }
      } else {
        oobElement.removeAttribute('hx-swap-oob')
        oobElement.removeAttribute('data-hx-swap-oob')
      }
    })
    return oobElts.length > 0
  }

  /**
   * Implements complete swapping pipeline, including: focus and selection preservation,
   * title updates, scroll, OOB swapping, normal swapping and settling
   * @param {string|Element} target
   * @param {string} content
   * @param {HtmxSwapSpecification} swapSpec
   * @param {SwapOptions} [swapOptions]
   */
  function swap(target, content, swapSpec, swapOptions) {
    if (!swapOptions) {
      swapOptions = {}
    }

    target = resolveTarget(target)
    const rootNode = swapOptions.contextElement ? getRootNode(swapOptions.contextElement, false) : getDocument()

    // preserve focus and selection
    const activeElt = document.activeElement
    let selectionInfo = {}
    try {
      selectionInfo = {
        elt: activeElt,
        // @ts-ignore
        start: activeElt ? activeElt.selectionStart : null,
        // @ts-ignore
        end: activeElt ? activeElt.selectionEnd : null
      }
    } catch (e) {
      // safari issue - see https://github.com/microsoft/playwright/issues/5894
    }
    const settleInfo = makeSettleInfo(target)

    // For text content swaps, don't parse the response as HTML, just insert it
    if (swapSpec.swapStyle === 'textContent') {
      target.textContent = content
    // Otherwise, make the fragment and process it
    } else {
      let fragment = makeFragment(content)

      settleInfo.title = fragment.title

      // select-oob swaps
      if (swapOptions.selectOOB) {
        const oobSelectValues = swapOptions.selectOOB.split(',')
        for (let i = 0; i < oobSelectValues.length; i++) {
          const oobSelectValue = oobSelectValues[i].split(':', 2)
          let id = oobSelectValue[0].trim()
          if (id.indexOf('#') === 0) {
            id = id.substring(1)
          }
          const oobValue = oobSelectValue[1] || 'true'
          const oobElement = fragment.querySelector('#' + id)
          if (oobElement) {
            oobSwap(oobValue, oobElement, settleInfo, rootNode)
          }
        }
      }
      // oob swaps
      findAndSwapOobElements(fragment, settleInfo, rootNode)
      forEach(findAll(fragment, 'template'), /** @param {HTMLTemplateElement} template */function(template) {
        if (template.content && findAndSwapOobElements(template.content, settleInfo, rootNode)) {
          // Avoid polluting the DOM with empty templates that were only used to encapsulate oob swap
          template.remove()
        }
      })

      // normal swap
      if (swapOptions.select) {
        const newFragment = getDocument().createDocumentFragment()
        forEach(fragment.querySelectorAll(swapOptions.select), function(node) {
          newFragment.appendChild(node)
        })
        fragment = newFragment
      }
      handlePreservedElements(fragment)
      swapWithStyle(swapSpec.swapStyle, swapOptions.contextElement, target, fragment, settleInfo)
      restorePreservedElements()
    }

    // apply saved focus and selection information to swapped content
    if (selectionInfo.elt &&
      !bodyContains(selectionInfo.elt) &&
      getRawAttribute(selectionInfo.elt, 'id')) {
      const newActiveElt = document.getElementById(getRawAttribute(selectionInfo.elt, 'id'))
      const focusOptions = { preventScroll: swapSpec.focusScroll !== undefined ? !swapSpec.focusScroll : !htmx.config.defaultFocusScroll }
      if (newActiveElt) {
        // @ts-ignore
        if (selectionInfo.start && newActiveElt.setSelectionRange) {
          try {
            // @ts-ignore
            newActiveElt.setSelectionRange(selectionInfo.start, selectionInfo.end)
          } catch (e) {
            // the setSelectionRange method is present on fields that don't support it, so just let this fail
          }
        }
        newActiveElt.focus(focusOptions)
      }
    }

    target.classList.remove(htmx.config.swappingClass)
    forEach(settleInfo.elts, function(elt) {
      if (elt.classList) {
        elt.classList.add(htmx.config.settlingClass)
      }
      triggerEvent(elt, 'htmx:afterSwap', swapOptions.eventInfo)
    })
    if (swapOptions.afterSwapCallback) {
      swapOptions.afterSwapCallback()
    }

    // merge in new title after swap but before settle
    if (!swapSpec.ignoreTitle) {
      handleTitle(settleInfo.title)
    }

    // settle
    const doSettle = function() {
      forEach(settleInfo.tasks, function(task) {
        task.call()
      })
      forEach(settleInfo.elts, function(elt) {
        if (elt.classList) {
          elt.classList.remove(htmx.config.settlingClass)
        }
        triggerEvent(elt, 'htmx:afterSettle', swapOptions.eventInfo)
      })

      if (swapOptions.anchor) {
        const anchorTarget = asElement(resolveTarget('#' + swapOptions.anchor))
        if (anchorTarget) {
          anchorTarget.scrollIntoView({ block: 'start', behavior: 'auto' })
        }
      }

      updateScrollState(settleInfo.elts, swapSpec)
      if (swapOptions.afterSettleCallback) {
        swapOptions.afterSettleCallback()
      }
    }

    if (swapSpec.settleDelay > 0) {
      getWindow().setTimeout(doSettle, swapSpec.settleDelay)
    } else {
      doSettle()
    }
  }

  /**
   * @param {XMLHttpRequest} xhr
   * @param {string} header
   * @param {EventTarget} elt
   */
  function handleTriggerHeader(xhr, header, elt) {
    const triggerBody = xhr.getResponseHeader(header)
    if (triggerBody.indexOf('{') === 0) {
      const triggers = parseJSON(triggerBody)
      for (const eventName in triggers) {
        if (triggers.hasOwnProperty(eventName)) {
          let detail = triggers[eventName]
          if (isRawObject(detail)) {
            // @ts-ignore
            elt = detail.target !== undefined ? detail.target : elt
          } else {
            detail = { value: detail }
          }
          triggerEvent(elt, eventName, detail)
        }
      }
    } else {
      const eventNames = triggerBody.split(',')
      for (let i = 0; i < eventNames.length; i++) {
        triggerEvent(elt, eventNames[i].trim(), [])
      }
    }
  }

  const WHITESPACE = /\s/
  const WHITESPACE_OR_COMMA = /[\s,]/
  const SYMBOL_START = /[_$a-zA-Z]/
  const SYMBOL_CONT = /[_$a-zA-Z0-9]/
  const STRINGISH_START = ['"', "'", '/']
  const NOT_WHITESPACE = /[^\s]/
  const COMBINED_SELECTOR_START = /[{(]/
  const COMBINED_SELECTOR_END = /[})]/

  /**
   * @param {string} str
   * @returns {string[]}
   */
  function tokenizeString(str) {
    /** @type string[] */
    const tokens = []
    let position = 0
    while (position < str.length) {
      if (SYMBOL_START.exec(str.charAt(position))) {
        var startPosition = position
        while (SYMBOL_CONT.exec(str.charAt(position + 1))) {
          position++
        }
        tokens.push(str.substring(startPosition, position + 1))
      } else if (STRINGISH_START.indexOf(str.charAt(position)) !== -1) {
        const startChar = str.charAt(position)
        var startPosition = position
        position++
        while (position < str.length && str.charAt(position) !== startChar) {
          if (str.charAt(position) === '\\') {
            position++
          }
          position++
        }
        tokens.push(str.substring(startPosition, position + 1))
      } else {
        const symbol = str.charAt(position)
        tokens.push(symbol)
      }
      position++
    }
    return tokens
  }

  /**
   * @param {string} token
   * @param {string|null} last
   * @param {string} paramName
   * @returns {boolean}
   */
  function isPossibleRelativeReference(token, last, paramName) {
    return SYMBOL_START.exec(token.charAt(0)) &&
      token !== 'true' &&
      token !== 'false' &&
      token !== 'this' &&
      token !== paramName &&
      last !== '.'
  }

  /**
   * @param {EventTarget|string} elt
   * @param {string[]} tokens
   * @param {string} paramName
   * @returns {ConditionalFunction|null}
   */
  function maybeGenerateConditional(elt, tokens, paramName) {
    if (tokens[0] === '[') {
      tokens.shift()
      let bracketCount = 1
      let conditionalSource = ' return (function(' + paramName + '){ return ('
      let last = null
      while (tokens.length > 0) {
        const token = tokens[0]
        // @ts-ignore For some reason tsc doesn't understand the shift call, and thinks we're comparing the same value here, i.e. '[' vs ']'
        if (token === ']') {
          bracketCount--
          if (bracketCount === 0) {
            if (last === null) {
              conditionalSource = conditionalSource + 'true'
            }
            tokens.shift()
            conditionalSource += ')})'
            try {
              const conditionFunction = maybeEval(elt, function() {
                return Function(conditionalSource)()
              },
              function() { return true })
              conditionFunction.source = conditionalSource
              return conditionFunction
            } catch (e) {
              triggerErrorEvent(getDocument().body, 'htmx:syntax:error', { error: e, source: conditionalSource })
              return null
            }
          }
        } else if (token === '[') {
          bracketCount++
        }
        if (isPossibleRelativeReference(token, last, paramName)) {
          conditionalSource += '((' + paramName + '.' + token + ') ? (' + paramName + '.' + token + ') : (window.' + token + '))'
        } else {
          conditionalSource = conditionalSource + token
        }
        last = tokens.shift()
      }
    }
  }

  /**
   * @param {string[]} tokens
   * @param {RegExp} match
   * @returns {string}
   */
  function consumeUntil(tokens, match) {
    let result = ''
    while (tokens.length > 0 && !match.test(tokens[0])) {
      result += tokens.shift()
    }
    return result
  }

  /**
   * @param {string[]} tokens
   * @returns {string}
   */
  function consumeCSSSelector(tokens) {
    let result
    if (tokens.length > 0 && COMBINED_SELECTOR_START.test(tokens[0])) {
      tokens.shift()
      result = consumeUntil(tokens, COMBINED_SELECTOR_END).trim()
      tokens.shift()
    } else {
      result = consumeUntil(tokens, WHITESPACE_OR_COMMA)
    }
    return result
  }

  const INPUT_SELECTOR = 'input, textarea, select'

  /**
   * @param {Element} elt
   * @param {string} explicitTrigger
   * @param {Object} cache for trigger specs
   * @returns {HtmxTriggerSpecification[]}
   */
  function parseAndCacheTrigger(elt, explicitTrigger, cache) {
    /** @type HtmxTriggerSpecification[] */
    const triggerSpecs = []
    const tokens = tokenizeString(explicitTrigger)
    do {
      consumeUntil(tokens, NOT_WHITESPACE)
      const initialLength = tokens.length
      const trigger = consumeUntil(tokens, /[,\[\s]/)
      if (trigger !== '') {
        if (trigger === 'every') {
          /** @type HtmxTriggerSpecification */
          const every = { trigger: 'every' }
          consumeUntil(tokens, NOT_WHITESPACE)
          every.pollInterval = parseInterval(consumeUntil(tokens, /[,\[\s]/))
          consumeUntil(tokens, NOT_WHITESPACE)
          var eventFilter = maybeGenerateConditional(elt, tokens, 'event')
          if (eventFilter) {
            every.eventFilter = eventFilter
          }
          triggerSpecs.push(every)
        } else {
          /** @type HtmxTriggerSpecification */
          const triggerSpec = { trigger }
          var eventFilter = maybeGenerateConditional(elt, tokens, 'event')
          if (eventFilter) {
            triggerSpec.eventFilter = eventFilter
          }
          consumeUntil(tokens, NOT_WHITESPACE)
          while (tokens.length > 0 && tokens[0] !== ',') {
            const token = tokens.shift()
            if (token === 'changed') {
              triggerSpec.changed = true
            } else if (token === 'once') {
              triggerSpec.once = true
            } else if (token === 'consume') {
              triggerSpec.consume = true
            } else if (token === 'delay' && tokens[0] === ':') {
              tokens.shift()
              triggerSpec.delay = parseInterval(consumeUntil(tokens, WHITESPACE_OR_COMMA))
            } else if (token === 'from' && tokens[0] === ':') {
              tokens.shift()
              if (COMBINED_SELECTOR_START.test(tokens[0])) {
                var from_arg = consumeCSSSelector(tokens)
              } else {
                var from_arg = consumeUntil(tokens, WHITESPACE_OR_COMMA)
                if (from_arg === 'closest' || from_arg === 'find' || from_arg === 'next' || from_arg === 'previous') {
                  tokens.shift()
                  const selector = consumeCSSSelector(tokens)
                  // `next` and `previous` allow a selector-less syntax
                  if (selector.length > 0) {
                    from_arg += ' ' + selector
                  }
                }
              }
              triggerSpec.from = from_arg
            } else if (token === 'target' && tokens[0] === ':') {
              tokens.shift()
              triggerSpec.target = consumeCSSSelector(tokens)
            } else if (token === 'throttle' && tokens[0] === ':') {
              tokens.shift()
              triggerSpec.throttle = parseInterval(consumeUntil(tokens, WHITESPACE_OR_COMMA))
            } else if (token === 'queue' && tokens[0] === ':') {
              tokens.shift()
              triggerSpec.queue = consumeUntil(tokens, WHITESPACE_OR_COMMA)
            } else if (token === 'root' && tokens[0] === ':') {
              tokens.shift()
              triggerSpec[token] = consumeCSSSelector(tokens)
            } else if (token === 'threshold' && tokens[0] === ':') {
              tokens.shift()
              triggerSpec[token] = consumeUntil(tokens, WHITESPACE_OR_COMMA)
            } else {
              triggerErrorEvent(elt, 'htmx:syntax:error', { token: tokens.shift() })
            }
            consumeUntil(tokens, NOT_WHITESPACE)
          }
          triggerSpecs.push(triggerSpec)
        }
      }
      if (tokens.length === initialLength) {
        triggerErrorEvent(elt, 'htmx:syntax:error', { token: tokens.shift() })
      }
      consumeUntil(tokens, NOT_WHITESPACE)
    } while (tokens[0] === ',' && tokens.shift())
    if (cache) {
      cache[explicitTrigger] = triggerSpecs
    }
    return triggerSpecs
  }

  /**
   * @param {Element} elt
   * @returns {HtmxTriggerSpecification[]}
   */
  function getTriggerSpecs(elt) {
    const explicitTrigger = getAttributeValue(elt, 'hx-trigger')
    let triggerSpecs = []
    if (explicitTrigger) {
      const cache = htmx.config.triggerSpecsCache
      triggerSpecs = (cache && cache[explicitTrigger]) || parseAndCacheTrigger(elt, explicitTrigger, cache)
    }

    if (triggerSpecs.length > 0) {
      return triggerSpecs
    } else if (matches(elt, 'form')) {
      return [{ trigger: 'submit' }]
    } else if (matches(elt, 'input[type="button"], input[type="submit"]')) {
      return [{ trigger: 'click' }]
    } else if (matches(elt, INPUT_SELECTOR)) {
      return [{ trigger: 'change' }]
    } else {
      return [{ trigger: 'click' }]
    }
  }

  /**
   * @param {Element} elt
   */
  function cancelPolling(elt) {
    getInternalData(elt).cancelled = true
  }

  /**
   * @param {Element} elt
   * @param {TriggerHandler} handler
   * @param {HtmxTriggerSpecification} spec
   */
  function processPolling(elt, handler, spec) {
    const nodeData = getInternalData(elt)
    nodeData.timeout = getWindow().setTimeout(function() {
      if (bodyContains(elt) && nodeData.cancelled !== true) {
        if (!maybeFilterEvent(spec, elt, makeEvent('hx:poll:trigger', {
          triggerSpec: spec,
          target: elt
        }))) {
          handler(elt)
        }
        processPolling(elt, handler, spec)
      }
    }, spec.pollInterval)
  }

  /**
   * @param {HTMLAnchorElement} elt
   * @returns {boolean}
   */
  function isLocalLink(elt) {
    return location.hostname === elt.hostname &&
      getRawAttribute(elt, 'href') &&
      getRawAttribute(elt, 'href').indexOf('#') !== 0
  }

  /**
   * @param {Element} elt
   */
  function eltIsDisabled(elt) {
    return closest(elt, htmx.config.disableSelector)
  }

  /**
   * @param {Element} elt
   * @param {HtmxNodeInternalData} nodeData
   * @param {HtmxTriggerSpecification[]} triggerSpecs
   */
  function boostElement(elt, nodeData, triggerSpecs) {
    if ((elt instanceof HTMLAnchorElement && isLocalLink(elt) && (elt.target === '' || elt.target === '_self')) || (elt.tagName === 'FORM' && String(getRawAttribute(elt, 'method')).toLowerCase() !== 'dialog')) {
      nodeData.boosted = true
      let verb, path
      if (elt.tagName === 'A') {
        verb = (/** @type HttpVerb */('get'))
        path = getRawAttribute(elt, 'href')
      } else {
        const rawAttribute = getRawAttribute(elt, 'method')
        verb = (/** @type HttpVerb */(rawAttribute ? rawAttribute.toLowerCase() : 'get'))
        path = getRawAttribute(elt, 'action')
        if (path == null || path === '') {
          // if there is no action attribute on the form set path to current href before the
          // following logic to properly clear parameters on a GET (not on a POST!)
          path = getDocument().location.href
        }
        if (verb === 'get' && path.includes('?')) {
          path = path.replace(/\?[^#]+/, '')
        }
      }
      triggerSpecs.forEach(function(triggerSpec) {
        addEventListener(elt, function(node, evt) {
          const elt = asElement(node)
          if (eltIsDisabled(elt)) {
            cleanUpElement(elt)
            return
          }
          issueAjaxRequest(verb, path, elt, evt)
        }, nodeData, triggerSpec, true)
      })
    }
  }

  /**
   * @param {Event} evt
   * @param {Node} node
   * @returns {boolean}
   */
  function shouldCancel(evt, node) {
    const elt = asElement(node)
    if (!elt) {
      return false
    }
    if (evt.type === 'submit' || evt.type === 'click') {
      if (elt.tagName === 'FORM') {
        return true
      }
      if (matches(elt, 'input[type="submit"], button') &&
        (matches(elt, '[form]') || closest(elt, 'form') !== null)) {
        return true
      }
      if (elt instanceof HTMLAnchorElement && elt.href &&
        (elt.getAttribute('href') === '#' || elt.getAttribute('href').indexOf('#') !== 0)) {
        return true
      }
    }
    return false
  }

  /**
   * @param {Node} elt
   * @param {Event|MouseEvent|KeyboardEvent|TouchEvent} evt
   * @returns {boolean}
   */
  function ignoreBoostedAnchorCtrlClick(elt, evt) {
    return getInternalData(elt).boosted && elt instanceof HTMLAnchorElement && evt.type === 'click' &&
      // @ts-ignore this will resolve to undefined for events that don't define those properties, which is fine
      (evt.ctrlKey || evt.metaKey)
  }

  /**
   * @param {HtmxTriggerSpecification} triggerSpec
   * @param {Node} elt
   * @param {Event} evt
   * @returns {boolean}
   */
  function maybeFilterEvent(triggerSpec, elt, evt) {
    const eventFilter = triggerSpec.eventFilter
    if (eventFilter) {
      try {
        return eventFilter.call(elt, evt) !== true
      } catch (e) {
        const source = eventFilter.source
        triggerErrorEvent(getDocument().body, 'htmx:eventFilter:error', { error: e, source })
        return true
      }
    }
    return false
  }

  /**
   * @param {Node} elt
   * @param {TriggerHandler} handler
   * @param {HtmxNodeInternalData} nodeData
   * @param {HtmxTriggerSpecification} triggerSpec
   * @param {boolean} [explicitCancel]
   */
  function addEventListener(elt, handler, nodeData, triggerSpec, explicitCancel) {
    const elementData = getInternalData(elt)
    /** @type {(Node|Window)[]} */
    let eltsToListenOn
    if (triggerSpec.from) {
      eltsToListenOn = querySelectorAllExt(elt, triggerSpec.from)
    } else {
      eltsToListenOn = [elt]
    }
    // store the initial values of the elements, so we can tell if they change
    if (triggerSpec.changed) {
      if (!('lastValue' in elementData)) {
        elementData.lastValue = new WeakMap()
      }
      eltsToListenOn.forEach(function(eltToListenOn) {
        if (!elementData.lastValue.has(triggerSpec)) {
          elementData.lastValue.set(triggerSpec, new WeakMap())
        }
        // @ts-ignore value will be undefined for non-input elements, which is fine
        elementData.lastValue.get(triggerSpec).set(eltToListenOn, eltToListenOn.value)
      })
    }
    forEach(eltsToListenOn, function(eltToListenOn) {
      /** @type EventListener */
      const eventListener = function(evt) {
        if (!bodyContains(elt)) {
          eltToListenOn.removeEventListener(triggerSpec.trigger, eventListener)
          return
        }
        if (ignoreBoostedAnchorCtrlClick(elt, evt)) {
          return
        }
        if (explicitCancel || shouldCancel(evt, elt)) {
          evt.preventDefault()
        }
        if (maybeFilterEvent(triggerSpec, elt, evt)) {
          return
        }
        const eventData = getInternalData(evt)
        eventData.triggerSpec = triggerSpec
        if (eventData.handledFor == null) {
          eventData.handledFor = []
        }
        if (eventData.handledFor.indexOf(elt) < 0) {
          eventData.handledFor.push(elt)
          if (triggerSpec.consume) {
            evt.stopPropagation()
          }
          if (triggerSpec.target && evt.target) {
            if (!matches(asElement(evt.target), triggerSpec.target)) {
              return
            }
          }
          if (triggerSpec.once) {
            if (elementData.triggeredOnce) {
              return
            } else {
              elementData.triggeredOnce = true
            }
          }
          if (triggerSpec.changed) {
            const node = event.target
            // @ts-ignore value will be undefined for non-input elements, which is fine
            const value = node.value
            const lastValue = elementData.lastValue.get(triggerSpec)
            if (lastValue.has(node) && lastValue.get(node) === value) {
              return
            }
            lastValue.set(node, value)
          }
          if (elementData.delayed) {
            clearTimeout(elementData.delayed)
          }
          if (elementData.throttle) {
            return
          }

          if (triggerSpec.throttle > 0) {
            if (!elementData.throttle) {
              triggerEvent(elt, 'htmx:trigger')
              handler(elt, evt)
              elementData.throttle = getWindow().setTimeout(function() {
                elementData.throttle = null
              }, triggerSpec.throttle)
            }
          } else if (triggerSpec.delay > 0) {
            elementData.delayed = getWindow().setTimeout(function() {
              triggerEvent(elt, 'htmx:trigger')
              handler(elt, evt)
            }, triggerSpec.delay)
          } else {
            triggerEvent(elt, 'htmx:trigger')
            handler(elt, evt)
          }
        }
      }
      if (nodeData.listenerInfos == null) {
        nodeData.listenerInfos = []
      }
      nodeData.listenerInfos.push({
        trigger: triggerSpec.trigger,
        listener: eventListener,
        on: eltToListenOn
      })
      eltToListenOn.addEventListener(triggerSpec.trigger, eventListener)
    })
  }

  let windowIsScrolling = false // used by initScrollHandler
  let scrollHandler = null
  function initScrollHandler() {
    if (!scrollHandler) {
      scrollHandler = function() {
        windowIsScrolling = true
      }
      window.addEventListener('scroll', scrollHandler)
      window.addEventListener('resize', scrollHandler)
      setInterval(function() {
        if (windowIsScrolling) {
          windowIsScrolling = false
          forEach(getDocument().querySelectorAll("[hx-trigger*='revealed'],[data-hx-trigger*='revealed']"), function(elt) {
            maybeReveal(elt)
          })
        }
      }, 200)
    }
  }

  /**
   * @param {Element} elt
   */
  function maybeReveal(elt) {
    if (!hasAttribute(elt, 'data-hx-revealed') && isScrolledIntoView(elt)) {
      elt.setAttribute('data-hx-revealed', 'true')
      const nodeData = getInternalData(elt)
      if (nodeData.initHash) {
        triggerEvent(elt, 'revealed')
      } else {
        // if the node isn't initialized, wait for it before triggering the request
        elt.addEventListener('htmx:afterProcessNode', function() { triggerEvent(elt, 'revealed') }, { once: true })
      }
    }
  }

  //= ===================================================================

  /**
   * @param {Element} elt
   * @param {TriggerHandler} handler
   * @param {HtmxNodeInternalData} nodeData
   * @param {number} delay
   */
  function loadImmediately(elt, handler, nodeData, delay) {
    const load = function() {
      if (!nodeData.loaded) {
        nodeData.loaded = true
        triggerEvent(elt, 'htmx:trigger')
        handler(elt)
      }
    }
    if (delay > 0) {
      getWindow().setTimeout(load, delay)
    } else {
      load()
    }
  }

  /**
   * @param {Element} elt
   * @param {HtmxNodeInternalData} nodeData
   * @param {HtmxTriggerSpecification[]} triggerSpecs
   * @returns {boolean}
   */
  function processVerbs(elt, nodeData, triggerSpecs) {
    let explicitAction = false
    forEach(VERBS, function(verb) {
      if (hasAttribute(elt, 'hx-' + verb)) {
        const path = getAttributeValue(elt, 'hx-' + verb)
        explicitAction = true
        nodeData.path = path
        nodeData.verb = verb
        triggerSpecs.forEach(function(triggerSpec) {
          addTriggerHandler(elt, triggerSpec, nodeData, function(node, evt) {
            const elt = asElement(node)
            if (closest(elt, htmx.config.disableSelector)) {
              cleanUpElement(elt)
              return
            }
            issueAjaxRequest(verb, path, elt, evt)
          })
        })
      }
    })
    return explicitAction
  }

  /**
   * @callback TriggerHandler
   * @param {Node} elt
   * @param {Event} [evt]
   */

  /**
   * @param {Node} elt
   * @param {HtmxTriggerSpecification} triggerSpec
   * @param {HtmxNodeInternalData} nodeData
   * @param {TriggerHandler} handler
   */
  function addTriggerHandler(elt, triggerSpec, nodeData, handler) {
    if (triggerSpec.trigger === 'revealed') {
      initScrollHandler()
      addEventListener(elt, handler, nodeData, triggerSpec)
      maybeReveal(asElement(elt))
    } else if (triggerSpec.trigger === 'intersect') {
      const observerOptions = {}
      if (triggerSpec.root) {
        observerOptions.root = querySelectorExt(elt, triggerSpec.root)
      }
      if (triggerSpec.threshold) {
        observerOptions.threshold = parseFloat(triggerSpec.threshold)
      }
      const observer = new IntersectionObserver(function(entries) {
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i]
          if (entry.isIntersecting) {
            triggerEvent(elt, 'intersect')
            break
          }
        }
      }, observerOptions)
      observer.observe(asElement(elt))
      addEventListener(asElement(elt), handler, nodeData, triggerSpec)
    } else if (!nodeData.firstInitCompleted && triggerSpec.trigger === 'load') {
      if (!maybeFilterEvent(triggerSpec, elt, makeEvent('load', { elt }))) {
        loadImmediately(asElement(elt), handler, nodeData, triggerSpec.delay)
      }
    } else if (triggerSpec.pollInterval > 0) {
      nodeData.polling = true
      processPolling(asElement(elt), handler, triggerSpec)
    } else {
      addEventListener(elt, handler, nodeData, triggerSpec)
    }
  }

  /**
   * @param {Node} node
   * @returns {boolean}
   */
  function shouldProcessHxOn(node) {
    const elt = asElement(node)
    if (!elt) {
      return false
    }
    const attributes = elt.attributes
    for (let j = 0; j < attributes.length; j++) {
      const attrName = attributes[j].name
      if (startsWith(attrName, 'hx-on:') || startsWith(attrName, 'data-hx-on:') ||
        startsWith(attrName, 'hx-on-') || startsWith(attrName, 'data-hx-on-')) {
        return true
      }
    }
    return false
  }

  /**
   * @param {Node} elt
   * @returns {Element[]}
   */
  const HX_ON_QUERY = new XPathEvaluator()
    .createExpression('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or' +
      ' starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]')

  function processHXOnRoot(elt, elements) {
    if (shouldProcessHxOn(elt)) {
      elements.push(asElement(elt))
    }
    const iter = HX_ON_QUERY.evaluate(elt)
    let node = null
    while (node = iter.iterateNext()) elements.push(asElement(node))
  }

  function findHxOnWildcardElements(elt) {
    /** @type {Element[]} */
    const elements = []
    if (elt instanceof DocumentFragment) {
      for (const child of elt.childNodes) {
        processHXOnRoot(child, elements)
      }
    } else {
      processHXOnRoot(elt, elements)
    }
    return elements
  }

  /**
   * @param {Element} elt
   * @returns {NodeListOf<Element>|[]}
   */
  function findElementsToProcess(elt) {
    if (elt.querySelectorAll) {
      const boostedSelector = ', [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]'

      const extensionSelectors = []
      for (const e in extensions) {
        const extension = extensions[e]
        if (extension.getSelectors) {
          var selectors = extension.getSelectors()
          if (selectors) {
            extensionSelectors.push(selectors)
          }
        }
      }

      const results = elt.querySelectorAll(VERB_SELECTOR + boostedSelector + ", form, [type='submit']," +
        ' [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger]' + extensionSelectors.flat().map(s => ', ' + s).join(''))

      return results
    } else {
      return []
    }
  }

  /**
   * Handle submit buttons/inputs that have the form attribute set
   * see https://developer.mozilla.org/docs/Web/HTML/Element/button
   * @param {Event} evt
   */
  function maybeSetLastButtonClicked(evt) {
    const elt = /** @type {HTMLButtonElement|HTMLInputElement} */ (closest(asElement(evt.target), "button, input[type='submit']"))
    const internalData = getRelatedFormData(evt)
    if (internalData) {
      internalData.lastButtonClicked = elt
    }
  }

  /**
   * @param {Event} evt
   */
  function maybeUnsetLastButtonClicked(evt) {
    const internalData = getRelatedFormData(evt)
    if (internalData) {
      internalData.lastButtonClicked = null
    }
  }

  /**
   * @param {Event} evt
   * @returns {HtmxNodeInternalData|undefined}
   */
  function getRelatedFormData(evt) {
    const elt = closest(asElement(evt.target), "button, input[type='submit']")
    if (!elt) {
      return
    }
    const form = resolveTarget('#' + getRawAttribute(elt, 'form'), elt.getRootNode()) || closest(elt, 'form')
    if (!form) {
      return
    }
    return getInternalData(form)
  }

  /**
   * @param {EventTarget} elt
   */
  function initButtonTracking(elt) {
    // need to handle both click and focus in:
    //   focusin - in case someone tabs in to a button and hits the space bar
    //   click - on OSX buttons do not focus on click see https://bugs.webkit.org/show_bug.cgi?id=13724
    elt.addEventListener('click', maybeSetLastButtonClicked)
    elt.addEventListener('focusin', maybeSetLastButtonClicked)
    elt.addEventListener('focusout', maybeUnsetLastButtonClicked)
  }

  /**
   * @param {Element} elt
   * @param {string} eventName
   * @param {string} code
   */
  function addHxOnEventHandler(elt, eventName, code) {
    const nodeData = getInternalData(elt)
    if (!Array.isArray(nodeData.onHandlers)) {
      nodeData.onHandlers = []
    }
    let func
    /** @type EventListener */
    const listener = function(e) {
      maybeEval(elt, function() {
        if (eltIsDisabled(elt)) {
          return
        }
        if (!func) {
          func = new Function('event', code)
        }
        func.call(elt, e)
      })
    }
    elt.addEventListener(eventName, listener)
    nodeData.onHandlers.push({ event: eventName, listener })
  }

  /**
   * @param {Element} elt
   */
  function processHxOnWildcard(elt) {
    // wipe any previous on handlers so that this function takes precedence
    deInitOnHandlers(elt)

    for (let i = 0; i < elt.attributes.length; i++) {
      const name = elt.attributes[i].name
      const value = elt.attributes[i].value
      if (startsWith(name, 'hx-on') || startsWith(name, 'data-hx-on')) {
        const afterOnPosition = name.indexOf('-on') + 3
        const nextChar = name.slice(afterOnPosition, afterOnPosition + 1)
        if (nextChar === '-' || nextChar === ':') {
          let eventName = name.slice(afterOnPosition + 1)
          // if the eventName starts with a colon or dash, prepend "htmx" for shorthand support
          if (startsWith(eventName, ':')) {
            eventName = 'htmx' + eventName
          } else if (startsWith(eventName, '-')) {
            eventName = 'htmx:' + eventName.slice(1)
          } else if (startsWith(eventName, 'htmx-')) {
            eventName = 'htmx:' + eventName.slice(5)
          }

          addHxOnEventHandler(elt, eventName, value)
        }
      }
    }
  }

  /**
   * @param {Element|HTMLInputElement} elt
   */
  function initNode(elt) {
    if (closest(elt, htmx.config.disableSelector)) {
      cleanUpElement(elt)
      return
    }
    const nodeData = getInternalData(elt)
    const attrHash = attributeHash(elt)
    if (nodeData.initHash !== attrHash) {
      // clean up any previously processed info
      deInitNode(elt)

      nodeData.initHash = attrHash

      triggerEvent(elt, 'htmx:beforeProcessNode')

      const triggerSpecs = getTriggerSpecs(elt)
      const hasExplicitHttpAction = processVerbs(elt, nodeData, triggerSpecs)

      if (!hasExplicitHttpAction) {
        if (getClosestAttributeValue(elt, 'hx-boost') === 'true') {
          boostElement(elt, nodeData, triggerSpecs)
        } else if (hasAttribute(elt, 'hx-trigger')) {
          triggerSpecs.forEach(function(triggerSpec) {
            // For "naked" triggers, don't do anything at all
            addTriggerHandler(elt, triggerSpec, nodeData, function() {
            })
          })
        }
      }

      // Handle submit buttons/inputs that have the form attribute set
      // see https://developer.mozilla.org/docs/Web/HTML/Element/button
      if (elt.tagName === 'FORM' || (getRawAttribute(elt, 'type') === 'submit' && hasAttribute(elt, 'form'))) {
        initButtonTracking(elt)
      }

      nodeData.firstInitCompleted = true
      triggerEvent(elt, 'htmx:afterProcessNode')
    }
  }

  /**
   * Processes new content, enabling htmx behavior. This can be useful if you have content that is added to the DOM outside of the normal htmx request cycle but still want htmx attributes to work.
   *
   * @see https://htmx.org/api/#process
   *
   * @param {Element|string} elt element to process
   */
  function processNode(elt) {
    elt = resolveTarget(elt)
    if (closest(elt, htmx.config.disableSelector)) {
      cleanUpElement(elt)
      return
    }
    initNode(elt)
    forEach(findElementsToProcess(elt), function(child) { initNode(child) })
    forEach(findHxOnWildcardElements(elt), processHxOnWildcard)
  }

  //= ===================================================================
  // Event/Log Support
  //= ===================================================================

  /**
   * @param {string} str
   * @returns {string}
   */
  function kebabEventName(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  }

  /**
   * @param {string} eventName
   * @param {any} detail
   * @returns {CustomEvent}
   */
  function makeEvent(eventName, detail) {
    let evt
    if (window.CustomEvent && typeof window.CustomEvent === 'function') {
      // TODO: `composed: true` here is a hack to make global event handlers work with events in shadow DOM
      // This breaks expected encapsulation but needs to be here until decided otherwise by core devs
      evt = new CustomEvent(eventName, { bubbles: true, cancelable: true, composed: true, detail })
    } else {
      evt = getDocument().createEvent('CustomEvent')
      evt.initCustomEvent(eventName, true, true, detail)
    }
    return evt
  }

  /**
   * @param {EventTarget|string} elt
   * @param {string} eventName
   * @param {any=} detail
   */
  function triggerErrorEvent(elt, eventName, detail) {
    triggerEvent(elt, eventName, mergeObjects({ error: eventName }, detail))
  }

  /**
   * @param {string} eventName
   * @returns {boolean}
   */
  function ignoreEventForLogging(eventName) {
    return eventName === 'htmx:afterProcessNode'
  }

  /**
   * `withExtensions` locates all active extensions for a provided element, then
   * executes the provided function using each of the active extensions.  It should
   * be called internally at every extendable execution point in htmx.
   *
   * @param {Element} elt
   * @param {(extension:HtmxExtension) => void} toDo
   * @returns void
   */
  function withExtensions(elt, toDo) {
    forEach(getExtensions(elt), function(extension) {
      try {
        toDo(extension)
      } catch (e) {
        logError(e)
      }
    })
  }

  function logError(msg) {
    if (console.error) {
      console.error(msg)
    } else if (console.log) {
      console.log('ERROR: ', msg)
    }
  }

  /**
   * Triggers a given event on an element
   *
   * @see https://htmx.org/api/#trigger
   *
   * @param {EventTarget|string} elt the element to trigger the event on
   * @param {string} eventName the name of the event to trigger
   * @param {any=} detail details for the event
   * @returns {boolean}
   */
  function triggerEvent(elt, eventName, detail) {
    elt = resolveTarget(elt)
    if (detail == null) {
      detail = {}
    }
    detail.elt = elt
    const event = makeEvent(eventName, detail)
    if (htmx.logger && !ignoreEventForLogging(eventName)) {
      htmx.logger(elt, eventName, detail)
    }
    if (detail.error) {
      logError(detail.error)
      triggerEvent(elt, 'htmx:error', { errorInfo: detail })
    }
    let eventResult = elt.dispatchEvent(event)
    const kebabName = kebabEventName(eventName)
    if (eventResult && kebabName !== eventName) {
      const kebabedEvent = makeEvent(kebabName, event.detail)
      eventResult = eventResult && elt.dispatchEvent(kebabedEvent)
    }
    withExtensions(asElement(elt), function(extension) {
      eventResult = eventResult && (extension.onEvent(eventName, event) !== false && !event.defaultPrevented)
    })
    return eventResult
  }

  //= ===================================================================
  // History Support
  //= ===================================================================
  let currentPathForHistory = location.pathname + location.search

  /**
   * @returns {Element}
   */
  function getHistoryElement() {
    const historyElt = getDocument().querySelector('[hx-history-elt],[data-hx-history-elt]')
    return historyElt || getDocument().body
  }

  /**
   * @param {string} url
   * @param {Element} rootElt
   */
  function saveToHistoryCache(url, rootElt) {
    if (!canAccessLocalStorage()) {
      return
    }

    // get state to save
    const innerHTML = cleanInnerHtmlForHistory(rootElt)
    const title = getDocument().title
    const scroll = window.scrollY

    if (htmx.config.historyCacheSize <= 0) {
      // make sure that an eventually already existing cache is purged
      localStorage.removeItem('htmx-history-cache')
      return
    }

    url = normalizePath(url)

    const historyCache = parseJSON(localStorage.getItem('htmx-history-cache')) || []
    for (let i = 0; i < historyCache.length; i++) {
      if (historyCache[i].url === url) {
        historyCache.splice(i, 1)
        break
      }
    }

    /** @type HtmxHistoryItem */
    const newHistoryItem = { url, content: innerHTML, title, scroll }

    triggerEvent(getDocument().body, 'htmx:historyItemCreated', { item: newHistoryItem, cache: historyCache })

    historyCache.push(newHistoryItem)
    while (historyCache.length > htmx.config.historyCacheSize) {
      historyCache.shift()
    }

    // keep trying to save the cache until it succeeds or is empty
    while (historyCache.length > 0) {
      try {
        localStorage.setItem('htmx-history-cache', JSON.stringify(historyCache))
        break
      } catch (e) {
        triggerErrorEvent(getDocument().body, 'htmx:historyCacheError', { cause: e, cache: historyCache })
        historyCache.shift() // shrink the cache and retry
      }
    }
  }

  /**
   * @typedef {Object} HtmxHistoryItem
   * @property {string} url
   * @property {string} content
   * @property {string} title
   * @property {number} scroll
   */

  /**
   * @param {string} url
   * @returns {HtmxHistoryItem|null}
   */
  function getCachedHistory(url) {
    if (!canAccessLocalStorage()) {
      return null
    }

    url = normalizePath(url)

    const historyCache = parseJSON(localStorage.getItem('htmx-history-cache')) || []
    for (let i = 0; i < historyCache.length; i++) {
      if (historyCache[i].url === url) {
        return historyCache[i]
      }
    }
    return null
  }

  /**
   * @param {Element} elt
   * @returns {string}
   */
  function cleanInnerHtmlForHistory(elt) {
    const className = htmx.config.requestClass
    const clone = /** @type Element */ (elt.cloneNode(true))
    forEach(findAll(clone, '.' + className), function(child) {
      removeClassFromElement(child, className)
    })
    // remove the disabled attribute for any element disabled due to an htmx request
    forEach(findAll(clone, '[data-disabled-by-htmx]'), function(child) {
      child.removeAttribute('disabled')
    })
    return clone.innerHTML
  }

  function saveCurrentPageToHistory() {
    const elt = getHistoryElement()
    const path = currentPathForHistory || location.pathname + location.search

    // Allow history snapshot feature to be disabled where hx-history="false"
    // is present *anywhere* in the current document we're about to save,
    // so we can prevent privileged data entering the cache.
    // The page will still be reachable as a history entry, but htmx will fetch it
    // live from the server onpopstate rather than look in the localStorage cache
    let disableHistoryCache
    try {
      disableHistoryCache = getDocument().querySelector('[hx-history="false" i],[data-hx-history="false" i]')
    } catch (e) {
    // IE11: insensitive modifier not supported so fallback to case sensitive selector
      disableHistoryCache = getDocument().querySelector('[hx-history="false"],[data-hx-history="false"]')
    }
    if (!disableHistoryCache) {
      triggerEvent(getDocument().body, 'htmx:beforeHistorySave', { path, historyElt: elt })
      saveToHistoryCache(path, elt)
    }

    if (htmx.config.historyEnabled) history.replaceState({ htmx: true }, getDocument().title, window.location.href)
  }

  /**
   * @param {string} path
   */
  function pushUrlIntoHistory(path) {
  // remove the cache buster parameter, if any
    if (htmx.config.getCacheBusterParam) {
      path = path.replace(/org\.htmx\.cache-buster=[^&]*&?/, '')
      if (endsWith(path, '&') || endsWith(path, '?')) {
        path = path.slice(0, -1)
      }
    }
    if (htmx.config.historyEnabled) {
      history.pushState({ htmx: true }, '', path)
    }
    currentPathForHistory = path
  }

  /**
   * @param {string} path
   */
  function replaceUrlInHistory(path) {
    if (htmx.config.historyEnabled) history.replaceState({ htmx: true }, '', path)
    currentPathForHistory = path
  }

  /**
   * @param {HtmxSettleTask[]} tasks
   */
  function settleImmediately(tasks) {
    forEach(tasks, function(task) {
      task.call(undefined)
    })
  }

  /**
   * @param {string} path
   */
  function loadHistoryFromServer(path) {
    const request = new XMLHttpRequest()
    const details = { path, xhr: request }
    triggerEvent(getDocument().body, 'htmx:historyCacheMiss', details)
    request.open('GET', path, true)
    request.setRequestHeader('HX-Request', 'true')
    request.setRequestHeader('HX-History-Restore-Request', 'true')
    request.setRequestHeader('HX-Current-URL', getDocument().location.href)
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        triggerEvent(getDocument().body, 'htmx:historyCacheMissLoad', details)
        const fragment = makeFragment(this.response)
        /** @type ParentNode */
        const content = fragment.querySelector('[hx-history-elt],[data-hx-history-elt]') || fragment
        const historyElement = getHistoryElement()
        const settleInfo = makeSettleInfo(historyElement)
        handleTitle(fragment.title)

        handlePreservedElements(fragment)
        swapInnerHTML(historyElement, content, settleInfo)
        restorePreservedElements()
        settleImmediately(settleInfo.tasks)
        currentPathForHistory = path
        triggerEvent(getDocument().body, 'htmx:historyRestore', { path, cacheMiss: true, serverResponse: this.response })
      } else {
        triggerErrorEvent(getDocument().body, 'htmx:historyCacheMissLoadError', details)
      }
    }
    request.send()
  }

  /**
   * @param {string} [path]
   */
  function restoreHistory(path) {
    saveCurrentPageToHistory()
    path = path || location.pathname + location.search
    const cached = getCachedHistory(path)
    if (cached) {
      const fragment = makeFragment(cached.content)
      const historyElement = getHistoryElement()
      const settleInfo = makeSettleInfo(historyElement)
      handleTitle(cached.title)
      handlePreservedElements(fragment)
      swapInnerHTML(historyElement, fragment, settleInfo)
      restorePreservedElements()
      settleImmediately(settleInfo.tasks)
      getWindow().setTimeout(function() {
        window.scrollTo(0, cached.scroll)
      }, 0) // next 'tick', so browser has time to render layout
      currentPathForHistory = path
      triggerEvent(getDocument().body, 'htmx:historyRestore', { path, item: cached })
    } else {
      if (htmx.config.refreshOnHistoryMiss) {
        // @ts-ignore: optional parameter in reload() function throws error
        // noinspection JSUnresolvedReference
        window.location.reload(true)
      } else {
        loadHistoryFromServer(path)
      }
    }
  }

  /**
   * @param {Element} elt
   * @returns {Element[]}
   */
  function addRequestIndicatorClasses(elt) {
    let indicators = /** @type Element[] */ (findAttributeTargets(elt, 'hx-indicator'))
    if (indicators == null) {
      indicators = [elt]
    }
    forEach(indicators, function(ic) {
      const internalData = getInternalData(ic)
      internalData.requestCount = (internalData.requestCount || 0) + 1
      ic.classList.add.call(ic.classList, htmx.config.requestClass)
    })
    return indicators
  }

  /**
   * @param {Element} elt
   * @returns {Element[]}
   */
  function disableElements(elt) {
    let disabledElts = /** @type Element[] */ (findAttributeTargets(elt, 'hx-disabled-elt'))
    if (disabledElts == null) {
      disabledElts = []
    }
    forEach(disabledElts, function(disabledElement) {
      const internalData = getInternalData(disabledElement)
      internalData.requestCount = (internalData.requestCount || 0) + 1
      disabledElement.setAttribute('disabled', '')
      disabledElement.setAttribute('data-disabled-by-htmx', '')
    })
    return disabledElts
  }

  /**
   * @param {Element[]} indicators
   * @param {Element[]} disabled
   */
  function removeRequestIndicators(indicators, disabled) {
    forEach(indicators.concat(disabled), function(ele) {
      const internalData = getInternalData(ele)
      internalData.requestCount = (internalData.requestCount || 1) - 1
    })
    forEach(indicators, function(ic) {
      const internalData = getInternalData(ic)
      if (internalData.requestCount === 0) {
        ic.classList.remove.call(ic.classList, htmx.config.requestClass)
      }
    })
    forEach(disabled, function(disabledElement) {
      const internalData = getInternalData(disabledElement)
      if (internalData.requestCount === 0) {
        disabledElement.removeAttribute('disabled')
        disabledElement.removeAttribute('data-disabled-by-htmx')
      }
    })
  }

  //= ===================================================================
  // Input Value Processing
  //= ===================================================================

  /**
   * @param {Element[]} processed
   * @param {Element} elt
   * @returns {boolean}
   */
  function haveSeenNode(processed, elt) {
    for (let i = 0; i < processed.length; i++) {
      const node = processed[i]
      if (node.isSameNode(elt)) {
        return true
      }
    }
    return false
  }

  /**
   * @param {Element} element
   * @return {boolean}
   */
  function shouldInclude(element) {
    // Cast to trick tsc, undefined values will work fine here
    const elt = /** @type {HTMLInputElement} */ (element)
    if (elt.name === '' || elt.name == null || elt.disabled || closest(elt, 'fieldset[disabled]')) {
      return false
    }
    // ignore "submitter" types (see jQuery src/serialize.js)
    if (elt.type === 'button' || elt.type === 'submit' || elt.tagName === 'image' || elt.tagName === 'reset' || elt.tagName === 'file') {
      return false
    }
    if (elt.type === 'checkbox' || elt.type === 'radio') {
      return elt.checked
    }
    return true
  }

  /** @param {string} name
   * @param {string|Array|FormDataEntryValue} value
   * @param {FormData} formData */
  function addValueToFormData(name, value, formData) {
    if (name != null && value != null) {
      if (Array.isArray(value)) {
        value.forEach(function(v) { formData.append(name, v) })
      } else {
        formData.append(name, value)
      }
    }
  }

  /** @param {string} name
   * @param {string|Array} value
   * @param {FormData} formData */
  function removeValueFromFormData(name, value, formData) {
    if (name != null && value != null) {
      let values = formData.getAll(name)
      if (Array.isArray(value)) {
        values = values.filter(v => value.indexOf(v) < 0)
      } else {
        values = values.filter(v => v !== value)
      }
      formData.delete(name)
      forEach(values, v => formData.append(name, v))
    }
  }

  /**
   * @param {Element[]} processed
   * @param {FormData} formData
   * @param {HtmxElementValidationError[]} errors
   * @param {Element|HTMLInputElement|HTMLSelectElement|HTMLFormElement} elt
   * @param {boolean} validate
   */
  function processInputValue(processed, formData, errors, elt, validate) {
    if (elt == null || haveSeenNode(processed, elt)) {
      return
    } else {
      processed.push(elt)
    }
    if (shouldInclude(elt)) {
      const name = getRawAttribute(elt, 'name')
      // @ts-ignore value will be undefined for non-input elements, which is fine
      let value = elt.value
      if (elt instanceof HTMLSelectElement && elt.multiple) {
        value = toArray(elt.querySelectorAll('option:checked')).map(function(e) { return (/** @type HTMLOptionElement */(e)).value })
      }
      // include file inputs
      if (elt instanceof HTMLInputElement && elt.files) {
        value = toArray(elt.files)
      }
      addValueToFormData(name, value, formData)
      if (validate) {
        validateElement(elt, errors)
      }
    }
    if (elt instanceof HTMLFormElement) {
      forEach(elt.elements, function(input) {
        if (processed.indexOf(input) >= 0) {
          // The input has already been processed and added to the values, but the FormData that will be
          //  constructed right after on the form, will include it once again. So remove that input's value
          //  now to avoid duplicates
          removeValueFromFormData(input.name, input.value, formData)
        } else {
          processed.push(input)
        }
        if (validate) {
          validateElement(input, errors)
        }
      })
      new FormData(elt).forEach(function(value, name) {
        if (value instanceof File && value.name === '') {
          return // ignore no-name files
        }
        addValueToFormData(name, value, formData)
      })
    }
  }

  /**
   *
   * @param {Element} elt
   * @param {HtmxElementValidationError[]} errors
   */
  function validateElement(elt, errors) {
    const element = /** @type {HTMLElement & ElementInternals} */ (elt)
    if (element.willValidate) {
      triggerEvent(element, 'htmx:validation:validate')
      if (!element.checkValidity()) {
        errors.push({ elt: element, message: element.validationMessage, validity: element.validity })
        triggerEvent(element, 'htmx:validation:failed', { message: element.validationMessage, validity: element.validity })
      }
    }
  }

  /**
   * Override values in the one FormData with those from another.
   * @param {FormData} receiver the formdata that will be mutated
   * @param {FormData} donor the formdata that will provide the overriding values
   * @returns {FormData} the {@linkcode receiver}
   */
  function overrideFormData(receiver, donor) {
    for (const key of donor.keys()) {
      receiver.delete(key)
    }
    donor.forEach(function(value, key) {
      receiver.append(key, value)
    })
    return receiver
  }

  /**
 * @param {Element|HTMLFormElement} elt
 * @param {HttpVerb} verb
 * @returns {{errors: HtmxElementValidationError[], formData: FormData, values: Object}}
 */
  function getInputValues(elt, verb) {
    /** @type Element[] */
    const processed = []
    const formData = new FormData()
    const priorityFormData = new FormData()
    /** @type HtmxElementValidationError[] */
    const errors = []
    const internalData = getInternalData(elt)
    if (internalData.lastButtonClicked && !bodyContains(internalData.lastButtonClicked)) {
      internalData.lastButtonClicked = null
    }

    // only validate when form is directly submitted and novalidate or formnovalidate are not set
    // or if the element has an explicit hx-validate="true" on it
    let validate = (elt instanceof HTMLFormElement && elt.noValidate !== true) || getAttributeValue(elt, 'hx-validate') === 'true'
    if (internalData.lastButtonClicked) {
      validate = validate && internalData.lastButtonClicked.formNoValidate !== true
    }

    // for a non-GET include the closest form
    if (verb !== 'get') {
      processInputValue(processed, priorityFormData, errors, closest(elt, 'form'), validate)
    }

    // include the element itself
    processInputValue(processed, formData, errors, elt, validate)

    // if a button or submit was clicked last, include its value
    if (internalData.lastButtonClicked || elt.tagName === 'BUTTON' ||
    (elt.tagName === 'INPUT' && getRawAttribute(elt, 'type') === 'submit')) {
      const button = internalData.lastButtonClicked || (/** @type HTMLInputElement|HTMLButtonElement */(elt))
      const name = getRawAttribute(button, 'name')
      addValueToFormData(name, button.value, priorityFormData)
    }

    // include any explicit includes
    const includes = findAttributeTargets(elt, 'hx-include')
    forEach(includes, function(node) {
      processInputValue(processed, formData, errors, asElement(node), validate)
      // if a non-form is included, include any input values within it
      if (!matches(node, 'form')) {
        forEach(asParentNode(node).querySelectorAll(INPUT_SELECTOR), function(descendant) {
          processInputValue(processed, formData, errors, descendant, validate)
        })
      }
    })

    // values from a <form> take precedence, overriding the regular values
    overrideFormData(formData, priorityFormData)

    return { errors, formData, values: formDataProxy(formData) }
  }

  /**
   * @param {string} returnStr
   * @param {string} name
   * @param {any} realValue
   * @returns {string}
   */
  function appendParam(returnStr, name, realValue) {
    if (returnStr !== '') {
      returnStr += '&'
    }
    if (String(realValue) === '[object Object]') {
      realValue = JSON.stringify(realValue)
    }
    const s = encodeURIComponent(realValue)
    returnStr += encodeURIComponent(name) + '=' + s
    return returnStr
  }

  /**
   * @param {FormData|Object} values
   * @returns string
   */
  function urlEncode(values) {
    values = formDataFromObject(values)
    let returnStr = ''
    values.forEach(function(value, key) {
      returnStr = appendParam(returnStr, key, value)
    })
    return returnStr
  }

  //= ===================================================================
  // Ajax
  //= ===================================================================

  /**
 * @param {Element} elt
 * @param {Element} target
 * @param {string} prompt
 * @returns {HtmxHeaderSpecification}
 */
  function getHeaders(elt, target, prompt) {
    /** @type HtmxHeaderSpecification */
    const headers = {
      'HX-Request': 'true',
      'HX-Trigger': getRawAttribute(elt, 'id'),
      'HX-Trigger-Name': getRawAttribute(elt, 'name'),
      'HX-Target': getAttributeValue(target, 'id'),
      'HX-Current-URL': getDocument().location.href
    }
    getValuesForElement(elt, 'hx-headers', false, headers)
    if (prompt !== undefined) {
      headers['HX-Prompt'] = prompt
    }
    if (getInternalData(elt).boosted) {
      headers['HX-Boosted'] = 'true'
    }
    return headers
  }

  /**
 * filterValues takes an object containing form input values
 * and returns a new object that only contains keys that are
 * specified by the closest "hx-params" attribute
 * @param {FormData} inputValues
 * @param {Element} elt
 * @returns {FormData}
 */
  function filterValues(inputValues, elt) {
    const paramsValue = getClosestAttributeValue(elt, 'hx-params')
    if (paramsValue) {
      if (paramsValue === 'none') {
        return new FormData()
      } else if (paramsValue === '*') {
        return inputValues
      } else if (paramsValue.indexOf('not ') === 0) {
        forEach(paramsValue.slice(4).split(','), function(name) {
          name = name.trim()
          inputValues.delete(name)
        })
        return inputValues
      } else {
        const newValues = new FormData()
        forEach(paramsValue.split(','), function(name) {
          name = name.trim()
          if (inputValues.has(name)) {
            inputValues.getAll(name).forEach(function(value) { newValues.append(name, value) })
          }
        })
        return newValues
      }
    } else {
      return inputValues
    }
  }

  /**
   * @param {Element} elt
   * @return {boolean}
   */
  function isAnchorLink(elt) {
    return !!getRawAttribute(elt, 'href') && getRawAttribute(elt, 'href').indexOf('#') >= 0
  }

  /**
 * @param {Element} elt
 * @param {HtmxSwapStyle} [swapInfoOverride]
 * @returns {HtmxSwapSpecification}
 */
  function getSwapSpecification(elt, swapInfoOverride) {
    const swapInfo = swapInfoOverride || getClosestAttributeValue(elt, 'hx-swap')
    /** @type HtmxSwapSpecification */
    const swapSpec = {
      swapStyle: getInternalData(elt).boosted ? 'innerHTML' : htmx.config.defaultSwapStyle,
      swapDelay: htmx.config.defaultSwapDelay,
      settleDelay: htmx.config.defaultSettleDelay
    }
    if (htmx.config.scrollIntoViewOnBoost && getInternalData(elt).boosted && !isAnchorLink(elt)) {
      swapSpec.show = 'top'
    }
    if (swapInfo) {
      const split = splitOnWhitespace(swapInfo)
      if (split.length > 0) {
        for (let i = 0; i < split.length; i++) {
          const value = split[i]
          if (value.indexOf('swap:') === 0) {
            swapSpec.swapDelay = parseInterval(value.slice(5))
          } else if (value.indexOf('settle:') === 0) {
            swapSpec.settleDelay = parseInterval(value.slice(7))
          } else if (value.indexOf('transition:') === 0) {
            swapSpec.transition = value.slice(11) === 'true'
          } else if (value.indexOf('ignoreTitle:') === 0) {
            swapSpec.ignoreTitle = value.slice(12) === 'true'
          } else if (value.indexOf('scroll:') === 0) {
            const scrollSpec = value.slice(7)
            var splitSpec = scrollSpec.split(':')
            const scrollVal = splitSpec.pop()
            var selectorVal = splitSpec.length > 0 ? splitSpec.join(':') : null
            // @ts-ignore
            swapSpec.scroll = scrollVal
            swapSpec.scrollTarget = selectorVal
          } else if (value.indexOf('show:') === 0) {
            const showSpec = value.slice(5)
            var splitSpec = showSpec.split(':')
            const showVal = splitSpec.pop()
            var selectorVal = splitSpec.length > 0 ? splitSpec.join(':') : null
            swapSpec.show = showVal
            swapSpec.showTarget = selectorVal
          } else if (value.indexOf('focus-scroll:') === 0) {
            const focusScrollVal = value.slice('focus-scroll:'.length)
            swapSpec.focusScroll = focusScrollVal == 'true'
          } else if (i == 0) {
            swapSpec.swapStyle = value
          } else {
            logError('Unknown modifier in hx-swap: ' + value)
          }
        }
      }
    }
    return swapSpec
  }

  /**
   * @param {Element} elt
   * @return {boolean}
   */
  function usesFormData(elt) {
    return getClosestAttributeValue(elt, 'hx-encoding') === 'multipart/form-data' ||
    (matches(elt, 'form') && getRawAttribute(elt, 'enctype') === 'multipart/form-data')
  }

  /**
   * @param {XMLHttpRequest} xhr
   * @param {Element} elt
   * @param {FormData} filteredParameters
   * @returns {*|string|null}
   */
  function encodeParamsForBody(xhr, elt, filteredParameters) {
    let encodedParameters = null
    withExtensions(elt, function(extension) {
      if (encodedParameters == null) {
        encodedParameters = extension.encodeParameters(xhr, filteredParameters, elt)
      }
    })
    if (encodedParameters != null) {
      return encodedParameters
    } else {
      if (usesFormData(elt)) {
        // Force conversion to an actual FormData object in case filteredParameters is a formDataProxy
        // See https://github.com/bigskysoftware/htmx/issues/2317
        return overrideFormData(new FormData(), formDataFromObject(filteredParameters))
      } else {
        return urlEncode(filteredParameters)
      }
    }
  }

  /**
 *
 * @param {Element} target
 * @returns {HtmxSettleInfo}
 */
  function makeSettleInfo(target) {
    return { tasks: [], elts: [target] }
  }

  /**
   * @param {Element[]} content
   * @param {HtmxSwapSpecification} swapSpec
   */
  function updateScrollState(content, swapSpec) {
    const first = content[0]
    const last = content[content.length - 1]
    if (swapSpec.scroll) {
      var target = null
      if (swapSpec.scrollTarget) {
        target = asElement(querySelectorExt(first, swapSpec.scrollTarget))
      }
      if (swapSpec.scroll === 'top' && (first || target)) {
        target = target || first
        target.scrollTop = 0
      }
      if (swapSpec.scroll === 'bottom' && (last || target)) {
        target = target || last
        target.scrollTop = target.scrollHeight
      }
    }
    if (swapSpec.show) {
      var target = null
      if (swapSpec.showTarget) {
        let targetStr = swapSpec.showTarget
        if (swapSpec.showTarget === 'window') {
          targetStr = 'body'
        }
        target = asElement(querySelectorExt(first, targetStr))
      }
      if (swapSpec.show === 'top' && (first || target)) {
        target = target || first
        // @ts-ignore For some reason tsc doesn't recognize "instant" as a valid option for now
        target.scrollIntoView({ block: 'start', behavior: htmx.config.scrollBehavior })
      }
      if (swapSpec.show === 'bottom' && (last || target)) {
        target = target || last
        // @ts-ignore For some reason tsc doesn't recognize "instant" as a valid option for now
        target.scrollIntoView({ block: 'end', behavior: htmx.config.scrollBehavior })
      }
    }
  }

  /**
 * @param {Element} elt
 * @param {string} attr
 * @param {boolean=} evalAsDefault
 * @param {Object=} values
 * @returns {Object}
 */
  function getValuesForElement(elt, attr, evalAsDefault, values) {
    if (values == null) {
      values = {}
    }
    if (elt == null) {
      return values
    }
    const attributeValue = getAttributeValue(elt, attr)
    if (attributeValue) {
      let str = attributeValue.trim()
      let evaluateValue = evalAsDefault
      if (str === 'unset') {
        return null
      }
      if (str.indexOf('javascript:') === 0) {
        str = str.slice(11)
        evaluateValue = true
      } else if (str.indexOf('js:') === 0) {
        str = str.slice(3)
        evaluateValue = true
      }
      if (str.indexOf('{') !== 0) {
        str = '{' + str + '}'
      }
      let varsValues
      if (evaluateValue) {
        varsValues = maybeEval(elt, function() { return Function('return (' + str + ')')() }, {})
      } else {
        varsValues = parseJSON(str)
      }
      for (const key in varsValues) {
        if (varsValues.hasOwnProperty(key)) {
          if (values[key] == null) {
            values[key] = varsValues[key]
          }
        }
      }
    }
    return getValuesForElement(asElement(parentElt(elt)), attr, evalAsDefault, values)
  }

  /**
   * @param {EventTarget|string} elt
   * @param {() => any} toEval
   * @param {any=} defaultVal
   * @returns {any}
   */
  function maybeEval(elt, toEval, defaultVal) {
    if (htmx.config.allowEval) {
      return toEval()
    } else {
      triggerErrorEvent(elt, 'htmx:evalDisallowedError')
      return defaultVal
    }
  }

  /**
 * @param {Element} elt
 * @param {*?} expressionVars
 * @returns
 */
  function getHXVarsForElement(elt, expressionVars) {
    return getValuesForElement(elt, 'hx-vars', true, expressionVars)
  }

  /**
 * @param {Element} elt
 * @param {*?} expressionVars
 * @returns
 */
  function getHXValsForElement(elt, expressionVars) {
    return getValuesForElement(elt, 'hx-vals', false, expressionVars)
  }

  /**
 * @param {Element} elt
 * @returns {FormData}
 */
  function getExpressionVars(elt) {
    return mergeObjects(getHXVarsForElement(elt), getHXValsForElement(elt))
  }

  /**
   * @param {XMLHttpRequest} xhr
   * @param {string} header
   * @param {string|null} headerValue
   */
  function safelySetHeaderValue(xhr, header, headerValue) {
    if (headerValue !== null) {
      try {
        xhr.setRequestHeader(header, headerValue)
      } catch (e) {
      // On an exception, try to set the header URI encoded instead
        xhr.setRequestHeader(header, encodeURIComponent(headerValue))
        xhr.setRequestHeader(header + '-URI-AutoEncoded', 'true')
      }
    }
  }

  /**
   * @param {XMLHttpRequest} xhr
   * @return {string}
   */
  function getPathFromResponse(xhr) {
  // NB: IE11 does not support this stuff
    if (xhr.responseURL && typeof (URL) !== 'undefined') {
      try {
        const url = new URL(xhr.responseURL)
        return url.pathname + url.search
      } catch (e) {
        triggerErrorEvent(getDocument().body, 'htmx:badResponseUrl', { url: xhr.responseURL })
      }
    }
  }

  /**
   * @param {XMLHttpRequest} xhr
   * @param {RegExp} regexp
   * @return {boolean}
   */
  function hasHeader(xhr, regexp) {
    return regexp.test(xhr.getAllResponseHeaders())
  }

  /**
   * Issues an htmx-style AJAX request
   *
   * @see https://htmx.org/api/#ajax
   *
   * @param {HttpVerb} verb
   * @param {string} path the URL path to make the AJAX
   * @param {Element|string|HtmxAjaxHelperContext} context the element to target (defaults to the **body**) | a selector for the target | a context object that contains any of the following
   * @return {Promise<void>} Promise that resolves immediately if no request is sent, or when the request is complete
   */
  function ajaxHelper(verb, path, context) {
    verb = (/** @type HttpVerb */(verb.toLowerCase()))
    if (context) {
      if (context instanceof Element || typeof context === 'string') {
        return issueAjaxRequest(verb, path, null, null, {
          targetOverride: resolveTarget(context) || DUMMY_ELT,
          returnPromise: true
        })
      } else {
        let resolvedTarget = resolveTarget(context.target)
        // If target is supplied but can't resolve OR source is supplied but both target and source can't be resolved
        // then use DUMMY_ELT to abort the request with htmx:targetError to avoid it replacing body by mistake
        if ((context.target && !resolvedTarget) || (context.source && !resolvedTarget && !resolveTarget(context.source))) {
          resolvedTarget = DUMMY_ELT
        }
        return issueAjaxRequest(verb, path, resolveTarget(context.source), context.event,
          {
            handler: context.handler,
            headers: context.headers,
            values: context.values,
            targetOverride: resolvedTarget,
            swapOverride: context.swap,
            select: context.select,
            returnPromise: true
          })
      }
    } else {
      return issueAjaxRequest(verb, path, null, null, {
        returnPromise: true
      })
    }
  }

  /**
   * @param {Element} elt
   * @return {Element[]}
   */
  function hierarchyForElt(elt) {
    const arr = []
    while (elt) {
      arr.push(elt)
      elt = elt.parentElement
    }
    return arr
  }

  /**
   * @param {Element} elt
   * @param {string} path
   * @param {HtmxRequestConfig} requestConfig
   * @return {boolean}
   */
  function verifyPath(elt, path, requestConfig) {
    let sameHost
    let url
    if (typeof URL === 'function') {
      url = new URL(path, document.location.href)
      const origin = document.location.origin
      sameHost = origin === url.origin
    } else {
    // IE11 doesn't support URL
      url = path
      sameHost = startsWith(path, document.location.origin)
    }

    if (htmx.config.selfRequestsOnly) {
      if (!sameHost) {
        return false
      }
    }
    return triggerEvent(elt, 'htmx:validateUrl', mergeObjects({ url, sameHost }, requestConfig))
  }

  /**
   * @param {Object|FormData} obj
   * @return {FormData}
   */
  function formDataFromObject(obj) {
    if (obj instanceof FormData) return obj
    const formData = new FormData()
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key].forEach === 'function') {
          obj[key].forEach(function(v) { formData.append(key, v) })
        } else if (typeof obj[key] === 'object' && !(obj[key] instanceof Blob)) {
          formData.append(key, JSON.stringify(obj[key]))
        } else {
          formData.append(key, obj[key])
        }
      }
    }
    return formData
  }

  /**
   * @param {FormData} formData
   * @param {string} name
   * @param {Array} array
   * @returns {Array}
   */
  function formDataArrayProxy(formData, name, array) {
    // mutating the array should mutate the underlying form data
    return new Proxy(array, {
      get: function(target, key) {
        if (typeof key === 'number') return target[key]
        if (key === 'length') return target.length
        if (key === 'push') {
          return function(value) {
            target.push(value)
            formData.append(name, value)
          }
        }
        if (typeof target[key] === 'function') {
          return function() {
            target[key].apply(target, arguments)
            formData.delete(name)
            target.forEach(function(v) { formData.append(name, v) })
          }
        }

        if (target[key] && target[key].length === 1) {
          return target[key][0]
        } else {
          return target[key]
        }
      },
      set: function(target, index, value) {
        target[index] = value
        formData.delete(name)
        target.forEach(function(v) { formData.append(name, v) })
        return true
      }
    })
  }

  /**
   * @param {FormData} formData
   * @returns {Object}
   */
  function formDataProxy(formData) {
    return new Proxy(formData, {
      get: function(target, name) {
        if (typeof name === 'symbol') {
          // Forward symbol calls to the FormData itself directly
          const result = Reflect.get(target, name)
          // Wrap in function with apply to correctly bind the FormData context, as a direct call would result in an illegal invocation error
          if (typeof result === 'function') {
            return function() {
              return result.apply(formData, arguments)
            }
          } else {
            return result
          }
        }
        if (name === 'toJSON') {
          // Support JSON.stringify call on proxy
          return () => Object.fromEntries(formData)
        }
        if (name in target) {
          // Wrap in function with apply to correctly bind the FormData context, as a direct call would result in an illegal invocation error
          if (typeof target[name] === 'function') {
            return function() {
              return formData[name].apply(formData, arguments)
            }
          } else {
            return target[name]
          }
        }
        const array = formData.getAll(name)
        // Those 2 undefined & single value returns are for retro-compatibility as we weren't using FormData before
        if (array.length === 0) {
          return undefined
        } else if (array.length === 1) {
          return array[0]
        } else {
          return formDataArrayProxy(target, name, array)
        }
      },
      set: function(target, name, value) {
        if (typeof name !== 'string') {
          return false
        }
        target.delete(name)
        if (value && typeof value.forEach === 'function') {
          value.forEach(function(v) { target.append(name, v) })
        } else if (typeof value === 'object' && !(value instanceof Blob)) {
          target.append(name, JSON.stringify(value))
        } else {
          target.append(name, value)
        }
        return true
      },
      deleteProperty: function(target, name) {
        if (typeof name === 'string') {
          target.delete(name)
        }
        return true
      },
      // Support Object.assign call from proxy
      ownKeys: function(target) {
        return Reflect.ownKeys(Object.fromEntries(target))
      },
      getOwnPropertyDescriptor: function(target, prop) {
        return Reflect.getOwnPropertyDescriptor(Object.fromEntries(target), prop)
      }
    })
  }

  /**
   * @param {HttpVerb} verb
   * @param {string} path
   * @param {Element} elt
   * @param {Event} event
   * @param {HtmxAjaxEtc} [etc]
   * @param {boolean} [confirmed]
   * @return {Promise<void>}
   */
  function issueAjaxRequest(verb, path, elt, event, etc, confirmed) {
    let resolve = null
    let reject = null
    etc = etc != null ? etc : {}
    if (etc.returnPromise && typeof Promise !== 'undefined') {
      var promise = new Promise(function(_resolve, _reject) {
        resolve = _resolve
        reject = _reject
      })
    }
    if (elt == null) {
      elt = getDocument().body
    }
    const responseHandler = etc.handler || handleAjaxResponse
    const select = etc.select || null

    if (!bodyContains(elt)) {
    // do not issue requests for elements removed from the DOM
      maybeCall(resolve)
      return promise
    }
    const target = etc.targetOverride || asElement(getTarget(elt))
    if (target == null || target == DUMMY_ELT) {
      triggerErrorEvent(elt, 'htmx:targetError', { target: getAttributeValue(elt, 'hx-target') })
      maybeCall(reject)
      return promise
    }

    let eltData = getInternalData(elt)
    const submitter = eltData.lastButtonClicked

    if (submitter) {
      const buttonPath = getRawAttribute(submitter, 'formaction')
      if (buttonPath != null) {
        path = buttonPath
      }

      const buttonVerb = getRawAttribute(submitter, 'formmethod')
      if (buttonVerb != null) {
      // ignore buttons with formmethod="dialog"
        if (buttonVerb.toLowerCase() !== 'dialog') {
          verb = (/** @type HttpVerb */(buttonVerb))
        }
      }
    }

    const confirmQuestion = getClosestAttributeValue(elt, 'hx-confirm')
    // allow event-based confirmation w/ a callback
    if (confirmed === undefined) {
      const issueRequest = function(skipConfirmation) {
        return issueAjaxRequest(verb, path, elt, event, etc, !!skipConfirmation)
      }
      const confirmDetails = { target, elt, path, verb, triggeringEvent: event, etc, issueRequest, question: confirmQuestion }
      if (triggerEvent(elt, 'htmx:confirm', confirmDetails) === false) {
        maybeCall(resolve)
        return promise
      }
    }

    let syncElt = elt
    let syncStrategy = getClosestAttributeValue(elt, 'hx-sync')
    let queueStrategy = null
    let abortable = false
    if (syncStrategy) {
      const syncStrings = syncStrategy.split(':')
      const selector = syncStrings[0].trim()
      if (selector === 'this') {
        syncElt = findThisElement(elt, 'hx-sync')
      } else {
        syncElt = asElement(querySelectorExt(elt, selector))
      }
      // default to the drop strategy
      syncStrategy = (syncStrings[1] || 'drop').trim()
      eltData = getInternalData(syncElt)
      if (syncStrategy === 'drop' && eltData.xhr && eltData.abortable !== true) {
        maybeCall(resolve)
        return promise
      } else if (syncStrategy === 'abort') {
        if (eltData.xhr) {
          maybeCall(resolve)
          return promise
        } else {
          abortable = true
        }
      } else if (syncStrategy === 'replace') {
        triggerEvent(syncElt, 'htmx:abort') // abort the current request and continue
      } else if (syncStrategy.indexOf('queue') === 0) {
        const queueStrArray = syncStrategy.split(' ')
        queueStrategy = (queueStrArray[1] || 'last').trim()
      }
    }

    if (eltData.xhr) {
      if (eltData.abortable) {
        triggerEvent(syncElt, 'htmx:abort') // abort the current request and continue
      } else {
        if (queueStrategy == null) {
          if (event) {
            const eventData = getInternalData(event)
            if (eventData && eventData.triggerSpec && eventData.triggerSpec.queue) {
              queueStrategy = eventData.triggerSpec.queue
            }
          }
          if (queueStrategy == null) {
            queueStrategy = 'last'
          }
        }
        if (eltData.queuedRequests == null) {
          eltData.queuedRequests = []
        }
        if (queueStrategy === 'first' && eltData.queuedRequests.length === 0) {
          eltData.queuedRequests.push(function() {
            issueAjaxRequest(verb, path, elt, event, etc)
          })
        } else if (queueStrategy === 'all') {
          eltData.queuedRequests.push(function() {
            issueAjaxRequest(verb, path, elt, event, etc)
          })
        } else if (queueStrategy === 'last') {
          eltData.queuedRequests = [] // dump existing queue
          eltData.queuedRequests.push(function() {
            issueAjaxRequest(verb, path, elt, event, etc)
          })
        }
        maybeCall(resolve)
        return promise
      }
    }

    const xhr = new XMLHttpRequest()
    eltData.xhr = xhr
    eltData.abortable = abortable
    const endRequestLock = function() {
      eltData.xhr = null
      eltData.abortable = false
      if (eltData.queuedRequests != null &&
      eltData.queuedRequests.length > 0) {
        const queuedRequest = eltData.queuedRequests.shift()
        queuedRequest()
      }
    }
    const promptQuestion = getClosestAttributeValue(elt, 'hx-prompt')
    if (promptQuestion) {
      var promptResponse = prompt(promptQuestion)
      // prompt returns null if cancelled and empty string if accepted with no entry
      if (promptResponse === null ||
      !triggerEvent(elt, 'htmx:prompt', { prompt: promptResponse, target })) {
        maybeCall(resolve)
        endRequestLock()
        return promise
      }
    }

    if (confirmQuestion && !confirmed) {
      if (!confirm(confirmQuestion)) {
        maybeCall(resolve)
        endRequestLock()
        return promise
      }
    }

    let headers = getHeaders(elt, target, promptResponse)

    if (verb !== 'get' && !usesFormData(elt)) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (etc.headers) {
      headers = mergeObjects(headers, etc.headers)
    }
    const results = getInputValues(elt, verb)
    let errors = results.errors
    const rawFormData = results.formData
    if (etc.values) {
      overrideFormData(rawFormData, formDataFromObject(etc.values))
    }
    const expressionVars = formDataFromObject(getExpressionVars(elt))
    const allFormData = overrideFormData(rawFormData, expressionVars)
    let filteredFormData = filterValues(allFormData, elt)

    if (htmx.config.getCacheBusterParam && verb === 'get') {
      filteredFormData.set('org.htmx.cache-buster', getRawAttribute(target, 'id') || 'true')
    }

    // behavior of anchors w/ empty href is to use the current URL
    if (path == null || path === '') {
      path = getDocument().location.href
    }

    /**
     * @type {Object}
     * @property {boolean} [credentials]
     * @property {number} [timeout]
     * @property {boolean} [noHeaders]
     */
    const requestAttrValues = getValuesForElement(elt, 'hx-request')

    const eltIsBoosted = getInternalData(elt).boosted

    let useUrlParams = htmx.config.methodsThatUseUrlParams.indexOf(verb) >= 0

    /** @type HtmxRequestConfig */
    const requestConfig = {
      boosted: eltIsBoosted,
      useUrlParams,
      formData: filteredFormData,
      parameters: formDataProxy(filteredFormData),
      unfilteredFormData: allFormData,
      unfilteredParameters: formDataProxy(allFormData),
      headers,
      target,
      verb,
      errors,
      withCredentials: etc.credentials || requestAttrValues.credentials || htmx.config.withCredentials,
      timeout: etc.timeout || requestAttrValues.timeout || htmx.config.timeout,
      path,
      triggeringEvent: event
    }

    if (!triggerEvent(elt, 'htmx:configRequest', requestConfig)) {
      maybeCall(resolve)
      endRequestLock()
      return promise
    }

    // copy out in case the object was overwritten
    path = requestConfig.path
    verb = requestConfig.verb
    headers = requestConfig.headers
    filteredFormData = formDataFromObject(requestConfig.parameters)
    errors = requestConfig.errors
    useUrlParams = requestConfig.useUrlParams

    if (errors && errors.length > 0) {
      triggerEvent(elt, 'htmx:validation:halted', requestConfig)
      maybeCall(resolve)
      endRequestLock()
      return promise
    }

    const splitPath = path.split('#')
    const pathNoAnchor = splitPath[0]
    const anchor = splitPath[1]

    let finalPath = path
    if (useUrlParams) {
      finalPath = pathNoAnchor
      const hasValues = !filteredFormData.keys().next().done
      if (hasValues) {
        if (finalPath.indexOf('?') < 0) {
          finalPath += '?'
        } else {
          finalPath += '&'
        }
        finalPath += urlEncode(filteredFormData)
        if (anchor) {
          finalPath += '#' + anchor
        }
      }
    }

    if (!verifyPath(elt, finalPath, requestConfig)) {
      triggerErrorEvent(elt, 'htmx:invalidPath', requestConfig)
      maybeCall(reject)
      return promise
    }

    xhr.open(verb.toUpperCase(), finalPath, true)
    xhr.overrideMimeType('text/html')
    xhr.withCredentials = requestConfig.withCredentials
    xhr.timeout = requestConfig.timeout

    // request headers
    if (requestAttrValues.noHeaders) {
    // ignore all headers
    } else {
      for (const header in headers) {
        if (headers.hasOwnProperty(header)) {
          const headerValue = headers[header]
          safelySetHeaderValue(xhr, header, headerValue)
        }
      }
    }

    /** @type {HtmxResponseInfo} */
    const responseInfo = {
      xhr,
      target,
      requestConfig,
      etc,
      boosted: eltIsBoosted,
      select,
      pathInfo: {
        requestPath: path,
        finalRequestPath: finalPath,
        responsePath: null,
        anchor
      }
    }

    xhr.onload = function() {
      try {
        const hierarchy = hierarchyForElt(elt)
        responseInfo.pathInfo.responsePath = getPathFromResponse(xhr)
        responseHandler(elt, responseInfo)
        if (responseInfo.keepIndicators !== true) {
          removeRequestIndicators(indicators, disableElts)
        }
        triggerEvent(elt, 'htmx:afterRequest', responseInfo)
        triggerEvent(elt, 'htmx:afterOnLoad', responseInfo)
        // if the body no longer contains the element, trigger the event on the closest parent
        // remaining in the DOM
        if (!bodyContains(elt)) {
          let secondaryTriggerElt = null
          while (hierarchy.length > 0 && secondaryTriggerElt == null) {
            const parentEltInHierarchy = hierarchy.shift()
            if (bodyContains(parentEltInHierarchy)) {
              secondaryTriggerElt = parentEltInHierarchy
            }
          }
          if (secondaryTriggerElt) {
            triggerEvent(secondaryTriggerElt, 'htmx:afterRequest', responseInfo)
            triggerEvent(secondaryTriggerElt, 'htmx:afterOnLoad', responseInfo)
          }
        }
        maybeCall(resolve)
        endRequestLock()
      } catch (e) {
        triggerErrorEvent(elt, 'htmx:onLoadError', mergeObjects({ error: e }, responseInfo))
        throw e
      }
    }
    xhr.onerror = function() {
      removeRequestIndicators(indicators, disableElts)
      triggerErrorEvent(elt, 'htmx:afterRequest', responseInfo)
      triggerErrorEvent(elt, 'htmx:sendError', responseInfo)
      maybeCall(reject)
      endRequestLock()
    }
    xhr.onabort = function() {
      removeRequestIndicators(indicators, disableElts)
      triggerErrorEvent(elt, 'htmx:afterRequest', responseInfo)
      triggerErrorEvent(elt, 'htmx:sendAbort', responseInfo)
      maybeCall(reject)
      endRequestLock()
    }
    xhr.ontimeout = function() {
      removeRequestIndicators(indicators, disableElts)
      triggerErrorEvent(elt, 'htmx:afterRequest', responseInfo)
      triggerErrorEvent(elt, 'htmx:timeout', responseInfo)
      maybeCall(reject)
      endRequestLock()
    }
    if (!triggerEvent(elt, 'htmx:beforeRequest', responseInfo)) {
      maybeCall(resolve)
      endRequestLock()
      return promise
    }
    var indicators = addRequestIndicatorClasses(elt)
    var disableElts = disableElements(elt)

    forEach(['loadstart', 'loadend', 'progress', 'abort'], function(eventName) {
      forEach([xhr, xhr.upload], function(target) {
        target.addEventListener(eventName, function(event) {
          triggerEvent(elt, 'htmx:xhr:' + eventName, {
            lengthComputable: event.lengthComputable,
            loaded: event.loaded,
            total: event.total
          })
        })
      })
    })
    triggerEvent(elt, 'htmx:beforeSend', responseInfo)
    const params = useUrlParams ? null : encodeParamsForBody(xhr, elt, filteredFormData)
    xhr.send(params)
    return promise
  }

  /**
   * @typedef {Object} HtmxHistoryUpdate
   * @property {string|null} [type]
   * @property {string|null} [path]
   */

  /**
   * @param {Element} elt
   * @param {HtmxResponseInfo} responseInfo
   * @return {HtmxHistoryUpdate}
   */
  function determineHistoryUpdates(elt, responseInfo) {
    const xhr = responseInfo.xhr

    //= ==========================================
    // First consult response headers
    //= ==========================================
    let pathFromHeaders = null
    let typeFromHeaders = null
    if (hasHeader(xhr, /HX-Push:/i)) {
      pathFromHeaders = xhr.getResponseHeader('HX-Push')
      typeFromHeaders = 'push'
    } else if (hasHeader(xhr, /HX-Push-Url:/i)) {
      pathFromHeaders = xhr.getResponseHeader('HX-Push-Url')
      typeFromHeaders = 'push'
    } else if (hasHeader(xhr, /HX-Replace-Url:/i)) {
      pathFromHeaders = xhr.getResponseHeader('HX-Replace-Url')
      typeFromHeaders = 'replace'
    }

    // if there was a response header, that has priority
    if (pathFromHeaders) {
      if (pathFromHeaders === 'false') {
        return {}
      } else {
        return {
          type: typeFromHeaders,
          path: pathFromHeaders
        }
      }
    }

    //= ==========================================
    // Next resolve via DOM values
    //= ==========================================
    const requestPath = responseInfo.pathInfo.finalRequestPath
    const responsePath = responseInfo.pathInfo.responsePath

    const pushUrl = getClosestAttributeValue(elt, 'hx-push-url')
    const replaceUrl = getClosestAttributeValue(elt, 'hx-replace-url')
    const elementIsBoosted = getInternalData(elt).boosted

    let saveType = null
    let path = null

    if (pushUrl) {
      saveType = 'push'
      path = pushUrl
    } else if (replaceUrl) {
      saveType = 'replace'
      path = replaceUrl
    } else if (elementIsBoosted) {
      saveType = 'push'
      path = responsePath || requestPath // if there is no response path, go with the original request path
    }

    if (path) {
    // false indicates no push, return empty object
      if (path === 'false') {
        return {}
      }

      // true indicates we want to follow wherever the server ended up sending us
      if (path === 'true') {
        path = responsePath || requestPath // if there is no response path, go with the original request path
      }

      // restore any anchor associated with the request
      if (responseInfo.pathInfo.anchor && path.indexOf('#') === -1) {
        path = path + '#' + responseInfo.pathInfo.anchor
      }

      return {
        type: saveType,
        path
      }
    } else {
      return {}
    }
  }

  /**
   * @param {HtmxResponseHandlingConfig} responseHandlingConfig
   * @param {number} status
   * @return {boolean}
   */
  function codeMatches(responseHandlingConfig, status) {
    var regExp = new RegExp(responseHandlingConfig.code)
    return regExp.test(status.toString(10))
  }

  /**
   * @param {XMLHttpRequest} xhr
   * @return {HtmxResponseHandlingConfig}
   */
  function resolveResponseHandling(xhr) {
    for (var i = 0; i < htmx.config.responseHandling.length; i++) {
      /** @type HtmxResponseHandlingConfig */
      var responseHandlingElement = htmx.config.responseHandling[i]
      if (codeMatches(responseHandlingElement, xhr.status)) {
        return responseHandlingElement
      }
    }
    // no matches, return no swap
    return {
      swap: false
    }
  }

  /**
   * @param {string} title
   */
  function handleTitle(title) {
    if (title) {
      const titleElt = find('title')
      if (titleElt) {
        titleElt.innerHTML = title
      } else {
        window.document.title = title
      }
    }
  }

  /**
   * @param {Element} elt
   * @param {HtmxResponseInfo} responseInfo
   */
  function handleAjaxResponse(elt, responseInfo) {
    const xhr = responseInfo.xhr
    let target = responseInfo.target
    const etc = responseInfo.etc
    const responseInfoSelect = responseInfo.select

    if (!triggerEvent(elt, 'htmx:beforeOnLoad', responseInfo)) return

    if (hasHeader(xhr, /HX-Trigger:/i)) {
      handleTriggerHeader(xhr, 'HX-Trigger', elt)
    }

    if (hasHeader(xhr, /HX-Location:/i)) {
      saveCurrentPageToHistory()
      let redirectPath = xhr.getResponseHeader('HX-Location')
      /** @type {HtmxAjaxHelperContext&{path:string}} */
      var redirectSwapSpec
      if (redirectPath.indexOf('{') === 0) {
        redirectSwapSpec = parseJSON(redirectPath)
        // what's the best way to throw an error if the user didn't include this
        redirectPath = redirectSwapSpec.path
        delete redirectSwapSpec.path
      }
      ajaxHelper('get', redirectPath, redirectSwapSpec).then(function() {
        pushUrlIntoHistory(redirectPath)
      })
      return
    }

    const shouldRefresh = hasHeader(xhr, /HX-Refresh:/i) && xhr.getResponseHeader('HX-Refresh') === 'true'

    if (hasHeader(xhr, /HX-Redirect:/i)) {
      responseInfo.keepIndicators = true
      location.href = xhr.getResponseHeader('HX-Redirect')
      shouldRefresh && location.reload()
      return
    }

    if (shouldRefresh) {
      responseInfo.keepIndicators = true
      location.reload()
      return
    }

    if (hasHeader(xhr, /HX-Retarget:/i)) {
      if (xhr.getResponseHeader('HX-Retarget') === 'this') {
        responseInfo.target = elt
      } else {
        responseInfo.target = asElement(querySelectorExt(elt, xhr.getResponseHeader('HX-Retarget')))
      }
    }

    const historyUpdate = determineHistoryUpdates(elt, responseInfo)

    const responseHandling = resolveResponseHandling(xhr)
    const shouldSwap = responseHandling.swap
    let isError = !!responseHandling.error
    let ignoreTitle = htmx.config.ignoreTitle || responseHandling.ignoreTitle
    let selectOverride = responseHandling.select
    if (responseHandling.target) {
      responseInfo.target = asElement(querySelectorExt(elt, responseHandling.target))
    }
    var swapOverride = etc.swapOverride
    if (swapOverride == null && responseHandling.swapOverride) {
      swapOverride = responseHandling.swapOverride
    }

    // response headers override response handling config
    if (hasHeader(xhr, /HX-Retarget:/i)) {
      if (xhr.getResponseHeader('HX-Retarget') === 'this') {
        responseInfo.target = elt
      } else {
        responseInfo.target = asElement(querySelectorExt(elt, xhr.getResponseHeader('HX-Retarget')))
      }
    }
    if (hasHeader(xhr, /HX-Reswap:/i)) {
      swapOverride = xhr.getResponseHeader('HX-Reswap')
    }

    var serverResponse = xhr.response
    /** @type HtmxBeforeSwapDetails */
    var beforeSwapDetails = mergeObjects({
      shouldSwap,
      serverResponse,
      isError,
      ignoreTitle,
      selectOverride,
      swapOverride
    }, responseInfo)

    if (responseHandling.event && !triggerEvent(target, responseHandling.event, beforeSwapDetails)) return

    if (!triggerEvent(target, 'htmx:beforeSwap', beforeSwapDetails)) return

    target = beforeSwapDetails.target // allow re-targeting
    serverResponse = beforeSwapDetails.serverResponse // allow updating content
    isError = beforeSwapDetails.isError // allow updating error
    ignoreTitle = beforeSwapDetails.ignoreTitle // allow updating ignoring title
    selectOverride = beforeSwapDetails.selectOverride // allow updating select override
    swapOverride = beforeSwapDetails.swapOverride // allow updating swap override

    responseInfo.target = target // Make updated target available to response events
    responseInfo.failed = isError // Make failed property available to response events
    responseInfo.successful = !isError // Make successful property available to response events

    if (beforeSwapDetails.shouldSwap) {
      if (xhr.status === 286) {
        cancelPolling(elt)
      }

      withExtensions(elt, function(extension) {
        serverResponse = extension.transformResponse(serverResponse, xhr, elt)
      })

      // Save current page if there will be a history update
      if (historyUpdate.type) {
        saveCurrentPageToHistory()
      }

      var swapSpec = getSwapSpecification(elt, swapOverride)

      if (!swapSpec.hasOwnProperty('ignoreTitle')) {
        swapSpec.ignoreTitle = ignoreTitle
      }

      target.classList.add(htmx.config.swappingClass)

      // optional transition API promise callbacks
      let settleResolve = null
      let settleReject = null

      if (responseInfoSelect) {
        selectOverride = responseInfoSelect
      }

      if (hasHeader(xhr, /HX-Reselect:/i)) {
        selectOverride = xhr.getResponseHeader('HX-Reselect')
      }

      const selectOOB = getClosestAttributeValue(elt, 'hx-select-oob')
      const select = getClosestAttributeValue(elt, 'hx-select')

      let doSwap = function() {
        try {
          // if we need to save history, do so, before swapping so that relative resources have the correct base URL
          if (historyUpdate.type) {
            triggerEvent(getDocument().body, 'htmx:beforeHistoryUpdate', mergeObjects({ history: historyUpdate }, responseInfo))
            if (historyUpdate.type === 'push') {
              pushUrlIntoHistory(historyUpdate.path)
              triggerEvent(getDocument().body, 'htmx:pushedIntoHistory', { path: historyUpdate.path })
            } else {
              replaceUrlInHistory(historyUpdate.path)
              triggerEvent(getDocument().body, 'htmx:replacedInHistory', { path: historyUpdate.path })
            }
          }

          swap(target, serverResponse, swapSpec, {
            select: selectOverride || select,
            selectOOB,
            eventInfo: responseInfo,
            anchor: responseInfo.pathInfo.anchor,
            contextElement: elt,
            afterSwapCallback: function() {
              if (hasHeader(xhr, /HX-Trigger-After-Swap:/i)) {
                let finalElt = elt
                if (!bodyContains(elt)) {
                  finalElt = getDocument().body
                }
                handleTriggerHeader(xhr, 'HX-Trigger-After-Swap', finalElt)
              }
            },
            afterSettleCallback: function() {
              if (hasHeader(xhr, /HX-Trigger-After-Settle:/i)) {
                let finalElt = elt
                if (!bodyContains(elt)) {
                  finalElt = getDocument().body
                }
                handleTriggerHeader(xhr, 'HX-Trigger-After-Settle', finalElt)
              }
              maybeCall(settleResolve)
            }
          })
        } catch (e) {
          triggerErrorEvent(elt, 'htmx:swapError', responseInfo)
          maybeCall(settleReject)
          throw e
        }
      }

      let shouldTransition = htmx.config.globalViewTransitions
      if (swapSpec.hasOwnProperty('transition')) {
        shouldTransition = swapSpec.transition
      }

      if (shouldTransition &&
              triggerEvent(elt, 'htmx:beforeTransition', responseInfo) &&
              typeof Promise !== 'undefined' &&
              // @ts-ignore experimental feature atm
              document.startViewTransition) {
        const settlePromise = new Promise(function(_resolve, _reject) {
          settleResolve = _resolve
          settleReject = _reject
        })
        // wrap the original doSwap() in a call to startViewTransition()
        const innerDoSwap = doSwap
        doSwap = function() {
          // @ts-ignore experimental feature atm
          document.startViewTransition(function() {
            innerDoSwap()
            return settlePromise
          })
        }
      }

      if (swapSpec.swapDelay > 0) {
        getWindow().setTimeout(doSwap, swapSpec.swapDelay)
      } else {
        doSwap()
      }
    }
    if (isError) {
      triggerErrorEvent(elt, 'htmx:responseError', mergeObjects({ error: 'Response Status Error Code ' + xhr.status + ' from ' + responseInfo.pathInfo.requestPath }, responseInfo))
    }
  }

  //= ===================================================================
  // Extensions API
  //= ===================================================================

  /** @type {Object<string, HtmxExtension>} */
  const extensions = {}

  /**
   * extensionBase defines the default functions for all extensions.
   * @returns {HtmxExtension}
   */
  function extensionBase() {
    return {
      init: function(api) { return null },
      getSelectors: function() { return null },
      onEvent: function(name, evt) { return true },
      transformResponse: function(text, xhr, elt) { return text },
      isInlineSwap: function(swapStyle) { return false },
      handleSwap: function(swapStyle, target, fragment, settleInfo) { return false },
      encodeParameters: function(xhr, parameters, elt) { return null }
    }
  }

  /**
   * defineExtension initializes the extension and adds it to the htmx registry
   *
   * @see https://htmx.org/api/#defineExtension
   *
   * @param {string} name the extension name
   * @param {Partial<HtmxExtension>} extension the extension definition
   */
  function defineExtension(name, extension) {
    if (extension.init) {
      extension.init(internalAPI)
    }
    extensions[name] = mergeObjects(extensionBase(), extension)
  }

  /**
   * removeExtension removes an extension from the htmx registry
   *
   * @see https://htmx.org/api/#removeExtension
   *
   * @param {string} name
   */
  function removeExtension(name) {
    delete extensions[name]
  }

  /**
   * getExtensions searches up the DOM tree to return all extensions that can be applied to a given element
   *
   * @param {Element} elt
   * @param {HtmxExtension[]=} extensionsToReturn
   * @param {string[]=} extensionsToIgnore
   * @returns {HtmxExtension[]}
   */
  function getExtensions(elt, extensionsToReturn, extensionsToIgnore) {
    if (extensionsToReturn == undefined) {
      extensionsToReturn = []
    }
    if (elt == undefined) {
      return extensionsToReturn
    }
    if (extensionsToIgnore == undefined) {
      extensionsToIgnore = []
    }
    const extensionsForElement = getAttributeValue(elt, 'hx-ext')
    if (extensionsForElement) {
      forEach(extensionsForElement.split(','), function(extensionName) {
        extensionName = extensionName.replace(/ /g, '')
        if (extensionName.slice(0, 7) == 'ignore:') {
          extensionsToIgnore.push(extensionName.slice(7))
          return
        }
        if (extensionsToIgnore.indexOf(extensionName) < 0) {
          const extension = extensions[extensionName]
          if (extension && extensionsToReturn.indexOf(extension) < 0) {
            extensionsToReturn.push(extension)
          }
        }
      })
    }
    return getExtensions(asElement(parentElt(elt)), extensionsToReturn, extensionsToIgnore)
  }

  //= ===================================================================
  // Initialization
  //= ===================================================================
  var isReady = false
  getDocument().addEventListener('DOMContentLoaded', function() {
    isReady = true
  })

  /**
   * Execute a function now if DOMContentLoaded has fired, otherwise listen for it.
   *
   * This function uses isReady because there is no reliable way to ask the browser whether
   * the DOMContentLoaded event has already been fired; there's a gap between DOMContentLoaded
   * firing and readystate=complete.
   */
  function ready(fn) {
    // Checking readyState here is a failsafe in case the htmx script tag entered the DOM by
    // some means other than the initial page load.
    if (isReady || getDocument().readyState === 'complete') {
      fn()
    } else {
      getDocument().addEventListener('DOMContentLoaded', fn)
    }
  }

  function insertIndicatorStyles() {
    if (htmx.config.includeIndicatorStyles !== false) {
      const nonceAttribute = htmx.config.inlineStyleNonce ? ` nonce="${htmx.config.inlineStyleNonce}"` : ''
      getDocument().head.insertAdjacentHTML('beforeend',
        '<style' + nonceAttribute + '>\
      .' + htmx.config.indicatorClass + '{opacity:0}\
      .' + htmx.config.requestClass + ' .' + htmx.config.indicatorClass + '{opacity:1; transition: opacity 200ms ease-in;}\
      .' + htmx.config.requestClass + '.' + htmx.config.indicatorClass + '{opacity:1; transition: opacity 200ms ease-in;}\
      </style>')
    }
  }

  function getMetaConfig() {
    /** @type HTMLMetaElement */
    const element = getDocument().querySelector('meta[name="htmx-config"]')
    if (element) {
      return parseJSON(element.content)
    } else {
      return null
    }
  }

  function mergeMetaConfig() {
    const metaConfig = getMetaConfig()
    if (metaConfig) {
      htmx.config = mergeObjects(htmx.config, metaConfig)
    }
  }

  // initialize the document
  ready(function() {
    mergeMetaConfig()
    insertIndicatorStyles()
    let body = getDocument().body
    processNode(body)
    const restoredElts = getDocument().querySelectorAll(
      "[hx-trigger='restored'],[data-hx-trigger='restored']"
    )
    body.addEventListener('htmx:abort', function(evt) {
      const target = evt.target
      const internalData = getInternalData(target)
      if (internalData && internalData.xhr) {
        internalData.xhr.abort()
      }
    })
    /** @type {(ev: PopStateEvent) => any} */
    const originalPopstate = window.onpopstate ? window.onpopstate.bind(window) : null
    /** @type {(ev: PopStateEvent) => any} */
    window.onpopstate = function(event) {
      if (event.state && event.state.htmx) {
        restoreHistory()
        forEach(restoredElts, function(elt) {
          triggerEvent(elt, 'htmx:restored', {
            document: getDocument(),
            triggerEvent
          })
        })
      } else {
        if (originalPopstate) {
          originalPopstate(event)
        }
      }
    }
    getWindow().setTimeout(function() {
      triggerEvent(body, 'htmx:load', {}) // give ready handlers a chance to load up before firing this event
      body = null // kill reference for gc
    }, 0)
  })

  return htmx
})()

/** @typedef {'get'|'head'|'post'|'put'|'delete'|'connect'|'options'|'trace'|'patch'} HttpVerb */

/**
 * @typedef {Object} SwapOptions
 * @property {string} [select]
 * @property {string} [selectOOB]
 * @property {*} [eventInfo]
 * @property {string} [anchor]
 * @property {Element} [contextElement]
 * @property {swapCallback} [afterSwapCallback]
 * @property {swapCallback} [afterSettleCallback]
 */

/**
 * @callback swapCallback
 */

/**
 * @typedef {'innerHTML' | 'outerHTML' | 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend' | 'delete' | 'none' | string} HtmxSwapStyle
 */

/**
 * @typedef HtmxSwapSpecification
 * @property {HtmxSwapStyle} swapStyle
 * @property {number} swapDelay
 * @property {number} settleDelay
 * @property {boolean} [transition]
 * @property {boolean} [ignoreTitle]
 * @property {string} [head]
 * @property {'top' | 'bottom'} [scroll]
 * @property {string} [scrollTarget]
 * @property {string} [show]
 * @property {string} [showTarget]
 * @property {boolean} [focusScroll]
 */

/**
 * @typedef {((this:Node, evt:Event) => boolean) & {source: string}} ConditionalFunction
 */

/**
 * @typedef {Object} HtmxTriggerSpecification
 * @property {string} trigger
 * @property {number} [pollInterval]
 * @property {ConditionalFunction} [eventFilter]
 * @property {boolean} [changed]
 * @property {boolean} [once]
 * @property {boolean} [consume]
 * @property {number} [delay]
 * @property {string} [from]
 * @property {string} [target]
 * @property {number} [throttle]
 * @property {string} [queue]
 * @property {string} [root]
 * @property {string} [threshold]
 */

/**
 * @typedef {{elt: Element, message: string, validity: ValidityState}} HtmxElementValidationError
 */

/**
 * @typedef {Record<string, string>} HtmxHeaderSpecification
 * @property {'true'} HX-Request
 * @property {string|null} HX-Trigger
 * @property {string|null} HX-Trigger-Name
 * @property {string|null} HX-Target
 * @property {string} HX-Current-URL
 * @property {string} [HX-Prompt]
 * @property {'true'} [HX-Boosted]
 * @property {string} [Content-Type]
 * @property {'true'} [HX-History-Restore-Request]
 */

/** @typedef HtmxAjaxHelperContext
 * @property {Element|string} [source]
 * @property {Event} [event]
 * @property {HtmxAjaxHandler} [handler]
 * @property {Element|string} [target]
 * @property {HtmxSwapStyle} [swap]
 * @property {Object|FormData} [values]
 * @property {Record<string,string>} [headers]
 * @property {string} [select]
 */

/**
 * @typedef {Object} HtmxRequestConfig
 * @property {boolean} boosted
 * @property {boolean} useUrlParams
 * @property {FormData} formData
 * @property {Object} parameters formData proxy
 * @property {FormData} unfilteredFormData
 * @property {Object} unfilteredParameters unfilteredFormData proxy
 * @property {HtmxHeaderSpecification} headers
 * @property {Element} target
 * @property {HttpVerb} verb
 * @property {HtmxElementValidationError[]} errors
 * @property {boolean} withCredentials
 * @property {number} timeout
 * @property {string} path
 * @property {Event} triggeringEvent
 */

/**
 * @typedef {Object} HtmxResponseInfo
 * @property {XMLHttpRequest} xhr
 * @property {Element} target
 * @property {HtmxRequestConfig} requestConfig
 * @property {HtmxAjaxEtc} etc
 * @property {boolean} boosted
 * @property {string} select
 * @property {{requestPath: string, finalRequestPath: string, responsePath: string|null, anchor: string}} pathInfo
 * @property {boolean} [failed]
 * @property {boolean} [successful]
 * @property {boolean} [keepIndicators]
 */

/**
 * @typedef {Object} HtmxAjaxEtc
 * @property {boolean} [returnPromise]
 * @property {HtmxAjaxHandler} [handler]
 * @property {string} [select]
 * @property {Element} [targetOverride]
 * @property {HtmxSwapStyle} [swapOverride]
 * @property {Record<string,string>} [headers]
 * @property {Object|FormData} [values]
 * @property {boolean} [credentials]
 * @property {number} [timeout]
 */

/**
 * @typedef {Object} HtmxResponseHandlingConfig
 * @property {string} [code]
 * @property {boolean} swap
 * @property {boolean} [error]
 * @property {boolean} [ignoreTitle]
 * @property {string} [select]
 * @property {string} [target]
 * @property {string} [swapOverride]
 * @property {string} [event]
 */

/**
 * @typedef {HtmxResponseInfo & {shouldSwap: boolean, serverResponse: any, isError: boolean, ignoreTitle: boolean, selectOverride:string, swapOverride:string}} HtmxBeforeSwapDetails
 */

/**
 * @callback HtmxAjaxHandler
 * @param {Element} elt
 * @param {HtmxResponseInfo} responseInfo
 */

/**
 * @typedef {(() => void)} HtmxSettleTask
 */

/**
 * @typedef {Object} HtmxSettleInfo
 * @property {HtmxSettleTask[]} tasks
 * @property {Element[]} elts
 * @property {string} [title]
 */

/**
 * @see https://github.com/bigskysoftware/htmx-extensions/blob/main/README.md
 * @typedef {Object} HtmxExtension
 * @property {(api: any) => void} init
 * @property {(name: string, event: Event|CustomEvent) => boolean} onEvent
 * @property {(text: string, xhr: XMLHttpRequest, elt: Element) => string} transformResponse
 * @property {(swapStyle: HtmxSwapStyle) => boolean} isInlineSwap
 * @property {(swapStyle: HtmxSwapStyle, target: Node, fragment: Node, settleInfo: HtmxSettleInfo) => boolean|Node[]} handleSwap
 * @property {(xhr: XMLHttpRequest, parameters: FormData, elt: Node) => *|string|null} encodeParameters
 * @property {() => string[]|null} getSelectors
 */

/**!
@preserve FlowPlater starts here 
*/
var FlowPlater = (function () {
  'use strict';

  const Debug = (function () {
    return {
      level: 1,
      levels: {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3,
      },

      log: function (level, ...args) {
        if (level <= this.level) {
          const prefix = ["ERROR", "WARN", "INFO", "DEBUG"][level];
          switch (prefix) {
            case "ERROR":
              console.error(`FlowPlater [${prefix}]:`, ...args);
              break;
            case "WARN":
              console.warn(`FlowPlater [${prefix}]:`, ...args);
              break;
            case "DEBUG":
              console.debug(`FlowPlater [${prefix}]:`, ...args);
              break;
            default:
              console.log(`FlowPlater [${prefix}]:`, ...args);
          }
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
    constructor(message, stack) {
      super(message);
      this.name = "FlowPlaterError";
      this.stack = stack;
    }
  }

  class TemplateError extends FlowPlaterError {
    constructor(message, stack) {
      super(message);
      this.name = "TemplateError";
      this.stack = stack;
    }
  }

  /**
   * @module EventSystem
   * @description A pub/sub event system that supports both global and instance-specific events
   */
  const EventSystem = (function () {
    /** @type {Map<string, Array<{callback: Function, context: any}>>} */
    const subscribers = new Map();

    return {
      /**
       * Subscribe to an event
       * @param {string} event - The event name to subscribe to
       * @param {Function} callback - The callback function to execute when the event is published
       * @param {any} [context=null] - The context (this) to use when executing the callback
       * @returns {Function} Unsubscribe function
       * @throws {Error} If event name is empty or callback is not a function
       */
      subscribe(event, callback, context = null) {
        // Validate event name
        if (!event || typeof event !== "string") {
          FlowPlaterError(
            "Invalid event name. Event name must be a non-empty string.",
          );
        }

        // Validate callback
        if (!callback || typeof callback !== "function") {
          FlowPlaterError(
            `Invalid callback for event "${event}". Callback must be a function.`,
          );
        }

        if (!subscribers.has(event)) {
          subscribers.set(event, []);
        }
        subscribers.get(event).push({ callback, context });
        Debug.log(Debug.levels.DEBUG, `Subscribed to event: ${event}`);
        return () => this.unsubscribe(event, callback);
      },

      /**
       * Unsubscribe from an event
       * @param {string} event - The event name to unsubscribe from
       * @param {Function} callback - The callback function to remove
       */
      unsubscribe(event, callback) {
        if (!event || typeof event !== "string") {
          FlowPlaterError(
            "Invalid event name. Event name must be a non-empty string. If you are trying to unsubscribe from all events, use unsubscribeAll() instead.",
          );
        }

        if (!subscribers.has(event)) return;

        const subs = subscribers.get(event);
        subscribers.set(
          event,
          subs.filter((sub) => sub.callback !== callback),
        );
      },

      /**
       * Remove all event subscribers
       */
      unsubscribeAll() {
        subscribers.clear();

        Debug.log(Debug.levels.INFO, "Cleared all event subscribers");
      },

      /**
       * Publish an event with data
       * @param {string} event - The event name to publish
       * @param {Object} [data] - Data to pass to subscribers
       */
      publish(event, data) {
        if (!subscribers.has(event)) return;

        // Call subscribers for this specific event
        subscribers.get(event).forEach(({ callback, context }) => {
          try {
            callback.call(context, data);
          } catch (error) {
            errorLog$1(`Error in event subscriber for ${event}:`, error);
          }
        });

        // If data contains instanceName, also trigger instance-specific event
        if (data && data.instanceName) {
          const instanceEvent = `${data.instanceName}:${event}`;
          if (subscribers.has(instanceEvent)) {
            subscribers.get(instanceEvent).forEach(({ callback, context }) => {
              try {
                callback.call(context, data);
              } catch (error) {
                errorLog$1(
                  `Error in instance event subscriber for ${instanceEvent}:`,
                  error,
                );
              }
            });
          }
        }
      },
    };
  })();

  const _state = {
    templateCache: {},
    instances: {},
    length: 0,
    initialized: false,
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

  // Version management utilities
  const VersionManager = {
    parseVersion(version) {
      return version.split(".").map(Number);
    },

    compareVersions(v1, v2) {
      const v1Parts = this.parseVersion(v1);
      const v2Parts = this.parseVersion(v2);

      for (let i = 0; i < 3; i++) {
        if (v1Parts[i] > v2Parts[i]) return 1;
        if (v1Parts[i] < v2Parts[i]) return -1;
      }
      return 0;
    },

    satisfiesVersion(required, actual) {
      if (!required || !actual) return false;

      // Handle @ syntax (e.g., "plugin@2.1")
      const [pluginName, version] = required.split("@");
      if (!version) return true; // No version requirement

      return this.compareVersions(actual, version) >= 0;
    },
  };

  const PluginManager = {
    plugins: new Map(),
    globalMethods: new Map(),
    instanceMethods: new Map(),

    registerPlugin(plugin) {
      if (typeof plugin === "string") {
        plugin = window[plugin];
      }

      if (!plugin) {
        throw new FlowPlaterError(`Plugin not found: ${plugin}`);
      }

      if (typeof plugin !== "function") {
        throw new FlowPlaterError("Plugin must be a valid function");
      }

      const pluginInstance = plugin();

      // Validate required config fields
      const requiredFields = ["name", "enabled", "priority", "version"];
      for (const field of requiredFields) {
        if (!(field in pluginInstance.config)) {
          throw new FlowPlaterError(`Plugin config must contain '${field}'`);
        }
      }

      // Validate version format
      if (!/^\d+\.\d+\.\d+$/.test(pluginInstance.config.version)) {
        throw new FlowPlaterError(
          `Plugin version must be in format 'x.y.z' (got ${pluginInstance.config.version})`,
        );
      }

      if (this.plugins.has(pluginInstance.config.name)) {
        throw new FlowPlaterError(
          `Plugin ${pluginInstance.config.name} already registered`,
        );
      }

      // Check dependencies
      if (pluginInstance.config.dependencies) {
        for (const dep of pluginInstance.config.dependencies) {
          const [depName, depVersion] = dep.split("@");
          const depPlugin = this.getPlugin(depName);

          if (!depPlugin) {
            throw new FlowPlaterError(
              `Required dependency '${depName}' not found for plugin ${pluginInstance.config.name}`,
            );
          }

          if (!VersionManager.satisfiesVersion(dep, depPlugin.config.version)) {
            throw new FlowPlaterError(
              `Plugin ${pluginInstance.config.name} requires ${depName} version ${
              depVersion || "any"
            }, but found version ${depPlugin.config.version}`,
            );
          }
        }
      }

      // Check optional dependencies
      if (pluginInstance.config.optionalDependencies) {
        for (const dep of pluginInstance.config.optionalDependencies) {
          const [depName, depVersion] = dep.split("@");
          const depPlugin = this.getPlugin(depName);

          if (
            depPlugin &&
            !VersionManager.satisfiesVersion(dep, depPlugin.config.version)
          ) {
            Debug.log(
              Debug.levels.WARN,
              `Optional dependency '${depName}' version mismatch for plugin ${
              pluginInstance.config.name
            }. Required: ${depVersion || "any"}, Found: ${
              depPlugin.config.version
            }`,
            );
          }
        }
      }

      // Validate hooks are functions
      for (const hook in pluginInstance.hooks) {
        if (typeof pluginInstance.hooks[hook] !== "function") {
          throw new FlowPlaterError(`Hook ${hook} must be a function`);
        }
      }

      // Register global methods if any
      if (pluginInstance.globalMethods) {
        for (const [methodName, method] of Object.entries(
          pluginInstance.globalMethods,
        )) {
          if (typeof method !== "function") {
            throw new FlowPlaterError(
              `Global method ${methodName} must be a function`,
            );
          }

          // Check for method name collisions
          if (this.globalMethods.has(methodName)) {
            const existing = this.globalMethods.get(methodName);
            throw new FlowPlaterError(
              `Global method ${methodName} already registered by plugin ${existing.plugin}`,
            );
          }

          this.globalMethods.set(methodName, {
            method,
            plugin: pluginInstance.config.name,
          });
          // Add method to FlowPlater object
          if (typeof window !== "undefined" && window.FlowPlater) {
            window.FlowPlater[methodName] = (...args) =>
              this.executeGlobalMethod(methodName, ...args);
          }
        }
      }

      // Register instance methods if any
      if (pluginInstance.instanceMethods) {
        for (const [methodName, method] of Object.entries(
          pluginInstance.instanceMethods,
        )) {
          if (typeof method !== "function") {
            throw new FlowPlaterError(
              `Instance method ${methodName} must be a function`,
            );
          }

          // Check for method name collisions
          if (this.instanceMethods.has(methodName)) {
            const existing = this.instanceMethods.get(methodName);
            throw new FlowPlaterError(
              `Instance method ${methodName} already registered by plugin ${existing.plugin}`,
            );
          }

          this.instanceMethods.set(methodName, {
            method,
            plugin: pluginInstance.config.name,
          });
        }
      }

      // Register custom helpers if any
      if (pluginInstance.helpers && typeof pluginInstance.helpers === "object") {
        for (const [helperName, helper] of Object.entries(
          pluginInstance.helpers,
        )) {
          if (typeof helper !== "function") {
            Debug.log(
              Debug.levels.WARN,
              `Plugin ${pluginInstance.config.name} contains invalid helper ${helperName}:`,
              helper,
            );
            continue;
          }
          try {
            // Register the helper with Handlebars using the lowercase name for webflow compatibility
            Handlebars.registerHelper(helperName.toLowerCase(), helper);
          } catch (error) {
            Debug.log(
              Debug.levels.ERROR,
              `Plugin ${pluginInstance.config.name} failed registering helper ${helperName}:`,
              error,
            );
          }
        }
      }

      // Initialize the plugin only if it's enabled
      if (
        pluginInstance.config?.enabled &&
        typeof pluginInstance.init === "function"
      ) {
        pluginInstance.init();
      }

      // Store the plugin instance
      this.plugins.set(pluginInstance.config.name, pluginInstance);

      // Update existing instances with new plugin methods
      this.updateExistingInstances();

      // If FlowPlater is already initialized, call the initComplete hook
      if (_state.initialized && pluginInstance.hooks?.initComplete) {
        try {
          pluginInstance.hooks.initComplete(
            window.FlowPlater,
            Object.values(_state.instances),
          );
        } catch (error) {
          Debug.log(
            Debug.levels.ERROR,
            `Plugin ${pluginInstance.config.name} failed executing initComplete:`,
            error,
          );
        }
      }

      return pluginInstance;
    },

    updateExistingInstances() {
      // Get all instances
      const instances = Object.values(_state.instances);

      // For each instance, add any missing plugin methods
      instances.forEach((instance) => {
        for (const [methodName, methodInfo] of this.instanceMethods.entries()) {
          if (!instance[methodName]) {
            instance[methodName] = (...args) =>
              this.executeInstanceMethod(methodName, instance, ...args);
          }
        }
      });
    },

    getPlugin(name) {
      return this.plugins.get(name);
    },

    getAllPlugins() {
      return Array.from(this.plugins.values());
    },

    getEnabledPlugins() {
      return this.getAllPlugins().filter((plugin) => plugin.config?.enabled);
    },

    removePlugin(name) {
      const plugin = this.getPlugin(name);
      if (!plugin) return false;

      // Store methods to remove before deleting from maps
      const methodsToRemove = new Set();
      for (const [methodName, methodInfo] of this.instanceMethods.entries()) {
        if (methodInfo.plugin === name) {
          methodsToRemove.add(methodName);
        }
      }

      // Remove global methods
      for (const [methodName, methodInfo] of this.globalMethods.entries()) {
        if (methodInfo.plugin === name) {
          this.globalMethods.delete(methodName);
          // Remove method from FlowPlater object
          if (typeof window !== "undefined" && window.FlowPlater) {
            delete window.FlowPlater[methodName];
          }
        }
      }

      // Remove instance methods from the manager
      for (const [methodName, methodInfo] of this.instanceMethods.entries()) {
        if (methodInfo.plugin === name) {
          this.instanceMethods.delete(methodName);
        }
      }

      // Remove instance methods from all instances
      const instances = Object.values(_state.instances);
      instances.forEach((instance) => {
        methodsToRemove.forEach((methodName) => {
          delete instance[methodName];
        });
      });

      return this.plugins.delete(name);
    },

    disablePlugin(name) {
      const plugin = this.getPlugin(name);
      if (!plugin) return false;
      plugin.config.enabled = false;
      return true;
    },

    enablePlugin(name) {
      const plugin = this.getPlugin(name);
      if (!plugin) return false;
      plugin.config.enabled = true;
      // Initialize if not already initialized
      if (typeof plugin.init === "function" && !plugin.state.initialized) {
        plugin.init();
        plugin.state.initialized = true;
      }
      return true;
    },

    pluginConfig(name) {
      const plugin = this.getPlugin(name);
      if (!plugin) return null;
      return plugin.config;
    },

    // Helper method to sort plugins by priority
    getSortedPlugins() {
      return this.getEnabledPlugins().sort((a, b) => {
        const priorityA = a.config?.priority || 0;
        const priorityB = b.config?.priority || 0;
        return priorityB - priorityA; // Higher priority first
      });
    },

    // Helper function to determine if data is JSON or HTML
    _determineDataType(data) {
      // If it's already an object, it's JSON
      if (typeof data === "object" && data !== null) {
        return "json";
      }

      // If it's a string, try to parse it as JSON
      if (typeof data === "string") {
        try {
          JSON.parse(data);
          return "json";
        } catch (e) {
          // If it's not parseable as JSON, assume it's HTML
          return "html";
        }
      }

      // For any other type, assume it's JSON
      return "json";
    },

    // Apply transformations from all enabled plugins in priority order
    applyTransformations(instance, data, transformationType, dataType = "json") {
      // Get plugins in priority order
      const plugins = this.getSortedPlugins();

      // Apply each plugin's transformation if it exists
      return plugins.reduce((transformedData, plugin) => {
        // Check if plugin has transformers and the specific transformation type
        if (
          plugin.transformers &&
          typeof plugin.transformers[transformationType] === "function"
        ) {
          try {
            // Apply the transformation
            const result = plugin.transformers[transformationType](
              instance,
              transformedData,
              dataType,
            );

            // If the result is undefined or null, return the original data
            if (result === undefined || result === null) {
              Debug.log(
                Debug.levels.WARN,
                `Plugin ${plugin.config.name} returned undefined/null for ${transformationType}, using original data`,
              );
              return transformedData;
            }

            // For event transformations, ensure we preserve the event object structure
            if (transformedData instanceof Event && result instanceof Event) {
              // For events, we want to preserve the event object but update its properties
              Object.assign(transformedData.detail, result.detail);
              return transformedData;
            }

            return result;
          } catch (error) {
            Debug.log(
              Debug.levels.ERROR,
              `Plugin ${plugin.config.name} failed executing ${transformationType} transformation:`,
              error,
            );
            return transformedData; // Return unmodified data if transformation fails
          }
        }
        return transformedData;
      }, data);
    },

    executeHook(hookName, ...args) {
      Debug.log(Debug.levels.DEBUG, "[PLUGIN] Executing hook:", hookName, args);

      const plugins = this.getSortedPlugins();
      let result = args[0]; // Store initial value

      for (const plugin of plugins) {
        if (plugin.hooks?.[hookName]) {
          try {
            const hookResult = plugin.hooks[hookName](...args);
            // Allow hooks to modify the value
            if (hookResult !== undefined) {
              result = hookResult;
              args[0] = result; // Update for next plugin
            } else {
              // If hook returns undefined, use the previous result
              Debug.log(
                Debug.levels.WARN,
                `Plugin ${plugin.config.name} returned undefined for ${hookName}`,
                args[0],
              );
              result = args[0];
            }
          } catch (error) {
            Debug.log(
              Debug.levels.ERROR,
              `Plugin ${plugin.config.name} failed executing ${hookName}:`,
              error,
            );
            // Continue with other plugins
          }
        }
      }

      return result;
    },

    // Execute a global method
    executeGlobalMethod(methodName, ...args) {
      const methodInfo = this.globalMethods.get(methodName);
      if (!methodInfo) {
        throw new FlowPlaterError(`Global method ${methodName} not found`);
      }

      const plugin = this.getPlugin(methodInfo.plugin);
      if (!plugin || !plugin.config?.enabled) {
        throw new FlowPlaterError(`Plugin ${methodInfo.plugin} is not enabled`);
      }

      return methodInfo.method(plugin, ...args);
    },

    // Execute an instance method
    executeInstanceMethod(methodName, instance, ...args) {
      const methodInfo = this.instanceMethods.get(methodName);
      if (!methodInfo) {
        throw new FlowPlaterError(`Instance method ${methodName} not found`);
      }

      const plugin = this.getPlugin(methodInfo.plugin);
      if (!plugin || !plugin.config?.enabled) {
        throw new FlowPlaterError(`Plugin ${methodInfo.plugin} is not enabled`);
      }

      return methodInfo.method(instance, ...args);
    },

    async destroyPlugin(name) {
      const plugin = this.getPlugin(name);
      if (!plugin) return false;

      if (typeof plugin.destroy === "function") {
        await plugin.destroy();
      }
      return this.removePlugin(name);
    },

    async destroyAll() {
      const plugins = this.getAllPlugins();
      await Promise.all(
        plugins.map((plugin) =>
          typeof plugin.destroy === "function" ? plugin.destroy() : null,
        ),
      );
      this.plugins.clear();
      this.globalMethods.clear();
      this.instanceMethods.clear();
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

  // Default customTags - can be overridden via meta config in init()
  const customTagList = [{ tag: "fpselect", replaceWith: "select" }];
  let currentCustomTags = customTagList; // Use default list initially - override in init()

  function setCustomTags(tags) {
    currentCustomTags = tags;
  }

  function replaceCustomTags(element) {
    let replaced = false;

    // Replace all custom tags in a single pass
    for (const tag of currentCustomTags) {
      const elements = element.getElementsByTagName(tag.tag);
      if (elements.length > 0) {
        replaced = true;

        // Convert to array since the live HTMLCollection will change as we replace elements
        const elementsArray = Array.from(elements);
        for (const customElement of elementsArray) {
          const newElement = document.createElement(tag.replaceWith);
          newElement.innerHTML = customElement.innerHTML;

          // Copy all attributes from the custom element to the new element
          for (const attr of customElement.attributes) {
            newElement.setAttribute(attr.name, attr.value);
          }

          // Replace the custom element with the new element
          customElement.parentNode.replaceChild(newElement, customElement);
        }
      }
    }

    if (replaced) {
      log("replaced custom tags", element);
    }

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
    // if templateId is empty or "self", use the current element
    Performance.start("compile:" + templateId);

    const helpers = Handlebars.helpers;

    // Add # prefix if templateId doesn't start with it
    const selector = templateId.startsWith("#") ? templateId : "#" + templateId;
    var templateElement = document.querySelector(selector);

    Debug.log(Debug.levels.DEBUG, "Trying to compile template: " + templateId);

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
      Debug.log(Debug.levels.DEBUG, "compiling template: " + templateId);

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
            let childTagName = child.tagName.toLowerCase();
            if (child.hasAttribute("fp") || childTagName in helpers) {
              // Process as a Handlebars helper
              const helperName = childTagName;
              const args = child.getAttribute("fp")
                ? child
                    .getAttribute("fp")
                    .split(" ")
                    .map((arg) => arg.replace(/&quot;/g, '"'))
                    .join(" ")
                : "";

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
                  Debug.log(
                    Debug.levels.WARN,
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
      Debug.log(
        Debug.levels.DEBUG,
        "Compiling Handlebars template: " + handlebarsTemplate,
      );

      try {
        const compiledTemplate = Handlebars.compile(handlebarsTemplate);

        // Check cache size limit before adding new template
        const cacheSize = _state.config?.templates?.cacheSize || 100; // Default to 100 if not configured
        if (Object.keys(_state.templateCache).length >= cacheSize) {
          // Remove oldest template
          const oldestKey = Object.keys(_state.templateCache)[0];
          delete _state.templateCache[oldestKey];
          Debug.log(
            Debug.levels.INFO,
            "Cache limit reached. Removed template: " + oldestKey,
          );
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

  function saveToLocalStorage(key, data, prefix = "") {
    Debug.log(Debug.levels.DEBUG, `Storage config:`, _state.config?.storage);
    if (!_state.config?.storage?.enabled) {
      Debug.log(Debug.levels.DEBUG, `Storage is disabled, skipping save`);
      return false;
    }

    try {
      const storageKey = prefix ? `fp_${prefix}_${key}` : `fp_${key}`;

      // Always serialize/deserialize to ensure we have raw, deep-cloned data (removes Proxies)
      let rawData;
      try {
        // This effectively deep clones the target data, removing any proxy wrappers
        rawData = JSON.parse(JSON.stringify(data));
      } catch (e) {
        errorLog$1(`Failed to serialize data for localStorage: ${e.message}`);
        // Fallback or decide how to handle non-serializable data
        rawData = {}; // Save empty object as fallback?
      }

      const storageData = {
        data: rawData,
        expiry: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
      };

      Debug.log(Debug.levels.DEBUG, `Saving to localStorage:`, {
        key: storageKey,
        data: storageData,
      });

      localStorage.setItem(storageKey, JSON.stringify(storageData));
      return true;
    } catch (error) {
      errorLog$1(`Failed to save to localStorage: ${error.message}`);
      return false;
    }
  }

  function loadFromLocalStorage(key, prefix = "") {
    Debug.log(Debug.levels.DEBUG, `Storage config:`, _state.config?.storage);
    if (!_state.config?.storage?.enabled) {
      Debug.log(Debug.levels.DEBUG, `Storage is disabled, skipping load`);
      return null;
    }

    try {
      const storageKey = prefix ? `fp_${prefix}_${key}` : `fp_${key}`;
      const storedItem = localStorage.getItem(storageKey);
      if (!storedItem) {
        Debug.log(Debug.levels.DEBUG, `No stored item found for: ${storageKey}`);
        return null;
      }

      const storageData = JSON.parse(storedItem);

      // Check if data has expired
      if (storageData.expiry && storageData.expiry < Date.now()) {
        Debug.log(Debug.levels.DEBUG, `Stored item has expired: ${storageKey}`);
        localStorage.removeItem(storageKey);
        return null;
      }

      Debug.log(Debug.levels.DEBUG, `Loaded from localStorage:`, {
        key: storageKey,
        data: storageData,
      });

      // Return just the data portion, not the wrapper object
      return storageData.data;
    } catch (error) {
      errorLog$1(`Failed to load from localStorage: ${error.message}`);
      return null;
    }
  }

  /**
   * @module FormStateManager
   * @description Manages form state restoration and persistence
   */
  const FormStateManager = {
    /** @type {boolean} Flag to prevent multiple form state restorations */
    isRestoringFormStates: false,

    /**
     * Restores form states within an element
     * @param {HTMLElement} element - The container element
     * @param {string} [source] - The source of the call to restoreFormStates
     */
    restoreFormStates(element, source) {
      try {
        // Skip if already restoring
        if (this.isRestoringFormStates) {
          Debug.log(
            Debug.levels.DEBUG,
            "Already restoring form states, skipping",
          );
          return;
        }

        this.isRestoringFormStates = true;
        const forms = element.getElementsByTagName("form");
        Array.from(forms).forEach((form) =>
          this.restoreSingleFormState(form, source),
        );
      } catch (error) {
        Debug.log(
          Debug.levels.ERROR,
          `Error restoring form states: ${error.message}`,
        );
      } finally {
        this.isRestoringFormStates = false;
      }
    },

    /**
     * Restores the state of a single form from storage
     * @param {HTMLFormElement} form - The form to restore state for
     * @param {string} [source] - The source of the call to restoreSingleFormState
     * @returns {boolean} - Whether state was restored
     */
    restoreSingleFormState(form, source) {
      if (!form.id) return false;

      // Try to get state from storage
      const formState = this.handleFormStorage(form, null, "load");
      if (!formState) {
        Debug.log(
          Debug.levels.DEBUG,
          `No stored state found for form: ${form.id}`,
        );
        return false;
      }

      const debugInfo = this.collectDebugInfo(form, "restore", {
        restoredElements: [],
        customVisualUpdates: [],
        skippedElements: [],
        storageType: this.shouldUseLocalStorage(form)
          ? "localStorage"
          : "sessionStorage",
      });

      // Restore state directly for this form
      this.processFormElements(form, (input) => {
        if (!(input.name in formState)) return;

        debugInfo.restoredElements.push({
          name: input.name,
          value: formState[input.name],
        });

        this.restoreElementValue(input, formState[input.name]);
      });

      // Single debug log with all information
      Debug.log(
        Debug.levels.DEBUG,
        `Form state restoration summary for ${form.id}`,
        {
          storageType: debugInfo.storageType,
          source: source || "unknown",
          restoredElements: debugInfo.restoredElements.map((el) => ({
            name: el.name,
            value: el.value,
          })),
          updatedCustomVisualStates: debugInfo.customVisualUpdates,
          skippedElements: debugInfo.skippedElements,
        },
      );

      // Emit event after restoration
      EventSystem.publish("formState:afterRestore", {
        formId: form.id,
        formElement: form,
        state: formState,
        source: source || "unknown",
      });

      return true;
    },

    /**
     * Clears stored form state
     * @param {string} formId - ID of the form to clear
     */
    clearFormState(formId) {
      try {
        const form = document.getElementById(formId);
        if (!form) return;

        this.handleFormStorage(form, null, "clear");

        EventSystem.publish("formState:clear", {
          formId,
          formElement: form,
        });
      } catch (error) {
        Debug.log(
          Debug.levels.ERROR,
          `Error clearing form state: ${error.message}`,
        );
      }
    },

    /**
     * Helper function to collect debug information consistently
     */
    collectDebugInfo(form, type, details = {}) {
      return {
        formId: form.id,
        type,
        persistenceEnabled: this.isPersistenceEnabledForElement(form),
        ...details,
      };
    },

    /**
     * Helper function to handle storage operations
     */
    handleFormStorage(form, state, operation = "save") {
      const useLocal = this.shouldUseLocalStorage(form);
      const key = `fp_form_${form.id}`;

      if (operation === "save") {
        if (useLocal) {
          saveToLocalStorage(form.id, state, "form");
        } else {
          sessionStorage.setItem(key, JSON.stringify(state));
        }
      } else if (operation === "load") {
        return useLocal
          ? loadFromLocalStorage(form.id, "form")
          : JSON.parse(sessionStorage.getItem(key));
      } else if (operation === "clear") {
        if (useLocal) localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      }
    },

    /**
     * Helper function to process form elements consistently
     */
    processFormElements(form, callback) {
      Array.from(form.elements).forEach((element) => {
        if (!element.name || element.type === "file") return;
        if (!this.isPersistenceEnabledForElement(element)) return;

        callback(element);
      });
    },

    /**
     * Helper function to restore element values
     */
    restoreElementValue(element, value) {
      if (element.type === "checkbox" || element.type === "radio") {
        element.checked = value;
        this.updateCustomVisualState(element);
      } else if (element instanceof HTMLSelectElement && element.multiple) {
        Array.from(element.options).forEach((option) => {
          option.selected = value.includes(option.value);
        });
      } else {
        element.value = value;
      }
    },

    /**
     * Helper function to update custom visual state
     */
    updateCustomVisualState(element) {
      const wrapper = element.closest(
        element.type === "checkbox" ? ".w-checkbox" : ".w-radio",
      );
      if (!wrapper) return;

      const customInput = wrapper.querySelector(`.w-${element.type}-input`);
      if (customInput) {
        customInput.checked = element.checked;
      }
    },

    /**
     * Checks if persistence is enabled for an element
     * @param {HTMLElement} element - The element to check
     * @returns {boolean} - Whether persistence is enabled
     */
    isPersistenceEnabledForElement(element) {
      // Check if element has explicit persistence setting
      if (element.hasAttribute("fp-persist")) {
        return element.getAttribute("fp-persist") !== "false";
      }

      // Check if element is inside a form with persistence setting
      const form = element.closest("form");
      if (form && form.hasAttribute("fp-persist")) {
        return form.getAttribute("fp-persist") !== "false";
      }

      // Check if element is inside a container with persistence setting
      const container = element.closest("[fp-persist]");
      if (container) {
        return container.getAttribute("fp-persist") !== "false";
      }

      // Default to global setting
      return _state.config?.persistForm !== false;
    },

    /**
     * Determines if localStorage should be used for a form
     * @param {HTMLElement} element - The form element
     * @returns {boolean} - Whether to use localStorage
     */
    shouldUseLocalStorage(element) {
      return (
        element.hasAttribute("fp-persist-local") ||
        _state.config?.storage?.enabled === true
      );
    },

    /**
     * Checks if form restoration should be performed for a form or its elements
     * @param {HTMLElement} element - The form or container element to check
     * @returns {boolean} - Whether form restoration should be performed
     */
    shouldRestoreForm(element) {
      // First check if there are any explicitly persistent elements
      // These override any parent fp-persist="false" settings
      const explicitlyPersistentInputs = element.querySelectorAll(
        '[fp-persist="true"]',
      );
      if (explicitlyPersistentInputs.length > 0) {
        return true;
      }

      // Check if element itself is a form with explicit persistence setting
      if (element.tagName === "FORM" && element.hasAttribute("fp-persist")) {
        return element.getAttribute("fp-persist") !== "false";
      }

      // Check parent form if exists
      const parentForm = element.closest("form");
      if (parentForm) {
        // If parent form explicitly disables persistence, skip it
        if (parentForm.getAttribute("fp-persist") === "false") {
          return false;
        }

        // Check all form elements in parent form
        const formElements = parentForm.elements;
        for (const input of formElements) {
          // Skip elements without name or file inputs
          if (!input.name || input.type === "file") continue;

          // Check if input is inside an element with fp-persist="false"
          const persistFalseParent = input.closest('[fp-persist="false"]');
          if (persistFalseParent) {
            continue;
          }

          // If input has a name and isn't a file input, and isn't inside a fp-persist="false" element,
          // it should be persisted by default when persistForm is true
          return true;
        }
      }

      // For forms or elements containing forms, check each form
      const forms = element.getElementsByTagName("form");
      for (const form of forms) {
        if (this.shouldRestoreForm(form)) {
          return true;
        }
      }

      return false;
    },
  };

  /**
   * Helper function to collect debug information consistently
   */
  function collectDebugInfo(form, type, details = {}) {
    return {
      formId: form.id,
      type,
      persistenceEnabled: isPersistenceEnabledForElement(form),
      ...details,
    };
  }

  /**
   * Helper function to handle storage operations
   */
  function handleFormStorage(form, state, operation = "save") {
    const useLocal = shouldUseLocalStorage(form);
    const key = `fp_form_${form.id}`;

    if (operation === "save") {
      if (useLocal) {
        saveToLocalStorage(form.id, state, "form");
      } else {
        sessionStorage.setItem(key, JSON.stringify(state));
      }
    } else if (operation === "load") {
      return useLocal
        ? loadFromLocalStorage(form.id, "form")
        : JSON.parse(sessionStorage.getItem(key));
    } else if (operation === "clear") {
      if (useLocal) localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    }
  }

  /**
   * Helper function to process form elements consistently
   */
  function processFormElements(form, callback) {
    Array.from(form.elements).forEach((element) => {
      if (!element.name || element.type === "file") return;
      if (!isPersistenceEnabledForElement(element)) return;

      callback(element);
    });
  }

  /**
   * Helper function to manage event listeners
   */
  function manageEventListener(element, eventType, handler, operation = "add") {
    const events =
      eventType === "change"
        ? [
            "change",
            element.type !== "checkbox" && element.type !== "radio"
              ? "input"
              : null,
          ]
        : [eventType];

    events.filter(Boolean).forEach((event) => {
      element[`${operation}EventListener`](event, handler);
    });
  }

  /**
   * Helper function to restore element values
   */
  function restoreElementValue(element, value) {
    if (element.type === "checkbox" || element.type === "radio") {
      element.checked = value;
      updateCustomVisualState(element);
    } else if (element instanceof HTMLSelectElement && element.multiple) {
      Array.from(element.options).forEach((option) => {
        option.selected = value.includes(option.value);
      });
    } else {
      element.value = value;
    }
  }

  /**
   * Helper function to update custom visual state
   */
  function updateCustomVisualState(element) {
    const wrapper = element.closest(
      element.type === "checkbox" ? ".w-checkbox" : ".w-radio",
    );
    if (!wrapper) return;

    const customInput = wrapper.querySelector(`.w-${element.type}-input`);
    if (customInput) {
      customInput.classList.toggle("w--redirected-checked", element.checked);
    }
  }

  /**
   * Gets persistence settings for an element
   * @param {HTMLElement} element - The element to check
   * @returns {Object} - Object containing persistence settings
   */
  function getPersistenceSettings(element) {
    let shouldPersist = false;
    let useLocalStorage = false;

    // Check persistence settings
    if (element.hasAttribute("fp-persist")) {
      shouldPersist = element.getAttribute("fp-persist") !== "false";
      useLocalStorage = element.getAttribute("fp-persist") === "true";
    } else {
      const form = element.form;
      if (form && form.hasAttribute("fp-persist")) {
        shouldPersist = form.getAttribute("fp-persist") !== "false";
        useLocalStorage = form.getAttribute("fp-persist") === "true";
      } else if (_state.config?.storage?.enabled && !_state.config?.persistForm) {
        shouldPersist = false;
        useLocalStorage = false;
      } else {
        shouldPersist = _state.config?.persistForm;
        useLocalStorage =
          _state.config?.storage?.enabled && _state.config?.persistForm;
      }
    }

    // For forms, check if any elements have explicit persistence
    if (element.tagName === "FORM") {
      const hasPersistentElements = Array.from(element.elements).some(
        (input) => input.getAttribute("fp-persist") === "true",
      );
      if (hasPersistentElements) {
        useLocalStorage = _state.config?.storage?.enabled;
      }
    }

    return {
      shouldPersist,
      useLocalStorage: useLocalStorage && _state.config?.storage?.enabled,
    };
  }

  /**
   * Checks if persistence is enabled for an element
   * @param {HTMLElement} element - The element to check
   * @returns {boolean} - Whether persistence is enabled for this element
   */
  function isPersistenceEnabledForElement(element) {
    return getPersistenceSettings(element).shouldPersist;
  }

  /**
   * Determines which storage to use based on configuration
   * @param {HTMLElement} element - The element to check
   * @returns {boolean} - true for localStorage, false for sessionStorage
   */
  function shouldUseLocalStorage(element) {
    return getPersistenceSettings(element).useLocalStorage;
  }

  /**
   * Captures the state of a form element
   * @param {HTMLElement} element - The form element to capture state from
   * @returns {Object} The captured state
   */
  function captureElementState(element) {
    try {
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
      ) {
        const state = {
          value: element.value,
          checked: element.checked,
          selected:
            element instanceof HTMLSelectElement
              ? element.multiple
                ? Array.from(element.selectedOptions).map((opt) => opt.value)
                : element.value
              : null,
          selectionStart:
            element instanceof HTMLTextAreaElement
              ? element.selectionStart
              : null,
          selectionEnd:
            element instanceof HTMLTextAreaElement ? element.selectionEnd : null,
          scrollTop:
            element instanceof HTMLTextAreaElement ? element.scrollTop : null,
          scrollLeft:
            element instanceof HTMLTextAreaElement ? element.scrollLeft : null,
        };

        return state;
      }
      return null;
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error capturing element state: ${error.message}`,
      );
      return null;
    }
  }

  /**
   * Restores the state of a form element
   * @param {HTMLElement} element - The form element to restore state to
   * @param {Object} state - The state to restore
   */
  function restoreElementState(element, state) {
    try {
      if (!state) return;

      if (element instanceof HTMLSelectElement) {
        if (state.selected) {
          if (element.multiple && Array.isArray(state.selected)) {
            // Handle multiple select
            state.selected.forEach((value) => {
              const option = element.querySelector(`option[value="${value}"]`);
              if (option) option.selected = true;
            });
          } else {
            // Handle single select
            const option = element.querySelector(
              `option[value="${state.selected}"]`,
            );
            if (option) {
              option.selected = true;
              element.value = state.selected;
            }
          }
        }
      } else if (element instanceof HTMLTextAreaElement) {
        element.value = state.value;
        if (state.selectionStart !== null && state.selectionEnd !== null) {
          element.setSelectionRange(state.selectionStart, state.selectionEnd);
        }
        if (state.scrollTop !== null) element.scrollTop = state.scrollTop;
        if (state.scrollLeft !== null) element.scrollLeft = state.scrollLeft;
      } else {
        element.value = state.value;
        element.checked = state.checked;
      }
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error restoring element state: ${error.message}`,
      );
    }
  }

  /**
   * Updates non-state attributes of a form element
   * @param {HTMLElement} fromEl - The target element
   * @param {HTMLElement} toEl - The source element
   */
  function updateElementAttributes(fromEl, toEl) {
    try {
      Array.from(toEl.attributes).forEach((attr) => {
        // Skip value, checked, and Webflow-specific attributes
        if (
          attr.name !== "value" &&
          attr.name !== "checked" &&
          !attr.name.startsWith("w-")
        ) {
          fromEl.setAttribute(attr.name, attr.value);
        }
      });
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error updating element attributes: ${error.message}`,
      );
    }
  }

  /**
   * Preserves the state of a form element during DOM updates
   * @param {HTMLElement} fromEl - The target element
   * @param {HTMLElement} toEl - The source element
   */
  function preserveElementState(fromEl, toEl) {
    try {
      if (
        fromEl instanceof HTMLInputElement ||
        fromEl instanceof HTMLSelectElement ||
        fromEl instanceof HTMLTextAreaElement
      ) {
        const state = captureElementState(fromEl);
        updateElementAttributes(fromEl, toEl);
        restoreElementState(fromEl, state);
      }
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error preserving element state: ${error.message}`,
      );
    }
  }

  /**
   * Captures the state of all forms within an element
   * @param {HTMLElement} element - The container element
   * @returns {Object} - Map of form states by form ID
   */
  function captureFormStates(element) {
    try {
      const forms = element.getElementsByTagName("form");
      const formStates = {};

      Array.from(forms).forEach((form) => {
        if (!form.id) return;

        const formState = {};
        const formElements = form.elements;

        Array.from(formElements).forEach((input) => {
          if (!input.name || input.type === "file") return;

          // Skip if persistence is disabled for this element
          if (!isPersistenceEnabledForElement(input)) return;

          if (input.type === "checkbox" || input.type === "radio") {
            formState[input.name] = input.checked;
          } else if (input instanceof HTMLSelectElement) {
            if (input.multiple) {
              formState[input.name] = Array.from(input.selectedOptions).map(
                (opt) => opt.value,
              );
            } else {
              formState[input.name] = input.value;
            }
          } else {
            formState[input.name] = input.value;
          }
        });

        // Only store if there are elements to store
        if (Object.keys(formState).length > 0) {
          // Emit event before storing
          EventSystem.publish("formState:beforeCapture", {
            formId: form.id,
            formElement: form,
            state: formState,
          });

          formStates[form.id] = formState;

          // Store based on configuration
          if (shouldUseLocalStorage(form)) {
            saveToLocalStorage(form.id, formState, "form");
          } else {
            sessionStorage.setItem(
              `fp_form_${form.id}`,
              JSON.stringify(formState),
            );
          }
        }
      });

      return formStates;
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error capturing form states: ${error.message}`,
      );
      return {};
    }
  }

  /**
   * Restores the state of a single form from storage
   * @param {HTMLFormElement} form - The form to restore state for
   * @param {string} [source] - The source of the call to restoreSingleFormState
   * @returns {boolean} - Whether state was restored
   */
  function restoreSingleFormState(form, source) {
    if (!form.id) return false;

    // Try to get state from storage
    const formState = handleFormStorage(form, null, "load");
    if (!formState) {
      Debug.log(Debug.levels.DEBUG, `No stored state found for form: ${form.id}`);
      return false;
    }

    const debugInfo = collectDebugInfo(form, "restore", {
      restoredElements: [],
      customVisualUpdates: [],
      skippedElements: [],
      storageType: shouldUseLocalStorage(form)
        ? "localStorage"
        : "sessionStorage",
    });

    // Restore state directly for this form
    processFormElements(form, (input) => {
      if (!(input.name in formState)) return;

      debugInfo.restoredElements.push({
        name: input.name,
        value: formState[input.name],
      });

      restoreElementValue(input, formState[input.name]);
    });

    // Single debug log with all information
    Debug.log(
      Debug.levels.DEBUG,
      `Form state restoration summary for ${form.id}`,
      {
        storageType: debugInfo.storageType,
        source: source || "unknown",
        restoredElements: debugInfo.restoredElements.map((el) => ({
          name: el.name,
          value: el.value,
        })),
        updatedCustomVisualStates: debugInfo.customVisualUpdates,
        skippedElements: debugInfo.skippedElements,
      },
    );

    // Emit event after restoration
    EventSystem.publish("formState:afterRestore", {
      formId: form.id,
      formElement: form,
      state: formState,
      source: source || "unknown",
    });

    return true;
  }

  /**
   * Clears stored form state
   * @param {string} formId - ID of the form to clear
   */
  function clearFormState(formId) {
    FormStateManager.clearFormState(formId);
  }

  /**
   * Sets up change event listeners for form elements
   * @param {HTMLElement} form - The form element to set up listeners for
   */
  function setupFormChangeListeners(form) {
    try {
      if (!form.id) {
        Debug.log(Debug.levels.DEBUG, "Skipping form without ID");
        return;
      }

      const debugInfo = collectDebugInfo(form, "setup", {
        formElements: form.elements.length,
        checkboxWrappers: form.querySelectorAll(".w-checkbox").length,
        listenersAdded: [],
        skippedElements: [],
      });

      // Initialize new listeners array if it doesn't exist
      if (!form._fpChangeListeners) {
        form._fpChangeListeners = [];
      }

      // Handle regular form elements
      processFormElements(form, (element) => {
        // Skip if element already has a listener
        if (form._fpChangeListeners.some(({ element: el }) => el === element)) {
          return;
        }

        const changeHandler = (event) => handleFormElementChange(event);
        manageEventListener(element, "change", changeHandler);

        // Store the handler reference
        form._fpChangeListeners.push({ element, handler: changeHandler });
        debugInfo.listenersAdded.push(element.name);
      });

      // Output collected debug information
      Debug.log(Debug.levels.DEBUG, `Form setup summary for ${form.id}`, {
        totalFormElements: debugInfo.formElements,
        checkboxWrappers: debugInfo.checkboxWrappers,
        formPersistence: debugInfo.persistenceEnabled ? "enabled" : "disabled",
        listenersAdded: debugInfo.listenersAdded.join(", "),
        skippedElements: debugInfo.skippedElements.join(", "),
      });
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error setting up form change listeners: ${error.message}`,
      );
    }
  }

  /**
   * Cleans up change event listeners for form elements
   * @param {HTMLElement} form - The form element to clean up listeners for
   */
  function cleanupFormChangeListeners(form) {
    try {
      if (!form._fpChangeListeners) return;

      form._fpChangeListeners.forEach(({ element, handler }) => {
        element.removeEventListener("change", handler);
        element.removeEventListener("input", handler);
      });

      form._fpChangeListeners = [];
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error cleaning up form change listeners: ${error.message}`,
      );
    }
  }

  function handleFormElementChange(event) {
    try {
      const element = event.target;
      const form = element.form;
      if (!form || !form.id) {
        Debug.log(
          Debug.levels.DEBUG,
          "Skipping change handler - no form or form ID",
        );
        return;
      }

      const debugInfo = collectDebugInfo(form, "change", {
        changedValues: {},
        skippedElements: [],
      });

      // Helper function to check if a value is a template
      function isTemplateValue(value) {
        if (typeof value !== "string") return false;
        // Check for Handlebars syntax
        if (value.includes("{{") || value.includes("}}")) return true;
        // Check for alternative syntax
        if (value.includes("[[") || value.includes("]]")) return true;
        // Check for this. references which indicate template binding
        if (value.includes("this.")) return true;
        return false;
      }

      // Helper function to check if an input is template-bound
      function isTemplateInput(input) {
        // Check if the input name itself is a template
        if (isTemplateValue(input.name)) return true;
        // Check if the input has a template value
        if (isTemplateValue(input.value)) return true;
        // Check for data-binding attributes that indicate template usage
        if (input.getAttribute("fp-bind")) return true;
        return false;
      }

      // Capture the current state of the form
      const formState = {};
      processFormElements(form, (input) => {
        // First check if this is a template-bound input
        if (isTemplateInput(input)) {
          debugInfo.skippedElements.push({
            name: input.name,
            reason: "Template binding detected",
            value: input.value,
          });
          return;
        }

        const value =
          input.type === "checkbox" || input.type === "radio"
            ? input.checked
            : input instanceof HTMLSelectElement && input.multiple
              ? Array.from(input.selectedOptions).map((opt) => opt.value)
              : input.value;

        formState[input.name] = value;
        debugInfo.changedValues[input.name] = value;
      });

      // Only store if there are elements to store
      if (Object.keys(formState).length > 0) {
        handleFormStorage(form, formState, "save");

        // Output collected debug information
        Debug.log(Debug.levels.DEBUG, "Form state update for " + form.id + ":", {
          "Changed element": element.name,
          "Storage type": shouldUseLocalStorage(form)
            ? "localStorage"
            : "sessionStorage",
          "Updated values": debugInfo.changedValues,
          "Skipped elements": debugInfo.skippedElements,
        });

        // Find instance that contains this form or whose elements are contained by this form
        let instance = null;
        for (const [instanceName, inst] of Object.entries(_state.instances)) {
          if (
            Array.from(inst.elements).some(
              (el) => el.contains(form) || form.contains(el) || el === form,
            )
          ) {
            instance = inst;
            break;
          }
        }

        // Execute updateForm hook
        PluginManager.executeHook("updateForm", instance, {
          element: form,
          id: form.id,
          data: formState,
          changedElement: element,
        });

        // Emit event
        EventSystem.publish("formState:changed", {
          formId: form.id,
          formElement: form,
          state: formState,
          changedElement: element,
        });
      }
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error handling form element change: ${error.message}`,
      );
    }
  }

  /**
   * Gets all relevant forms for an element (target, parent, and children)
   * @param {HTMLElement} element - The element to get forms for
   * @returns {Set<HTMLFormElement>} - Set of unique form elements
   */
  function getAllRelevantForms(element) {
    const forms = new Set();

    // Add the target if it's a form
    if (element.tagName === "FORM") {
      forms.add(element);
    }

    // Add parent forms
    const parentForm = element.closest("form");
    if (parentForm) {
      forms.add(parentForm);
    }

    // Add child forms
    const childForms = element.getElementsByTagName("form");
    Array.from(childForms).forEach((form) => forms.add(form));

    return forms;
  }

  /**
   * Sets up form submission handlers to clear state on submit
   * @param {HTMLElement} element - The container element
   * @param {string} [source] - The source of the call to setupFormSubmitHandlers
   */
  function setupFormSubmitHandlers(element, source) {
    try {
      Debug.log(
        Debug.levels.DEBUG,
        "Setting up form submit handlers for element:",
        element,
      );

      // Get all relevant forms
      const forms = getAllRelevantForms(element);

      Debug.log(Debug.levels.DEBUG, `Found ${forms.size} forms`);
      forms.forEach((form) => {
        setupSingleFormHandlers(form, source || "setupFormSubmitHandlers");
      });
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error setting up form submit handlers: ${error.message}`,
      );
    }
  }

  function setupSingleFormHandlers(form, source) {
    if (!form.id) {
      Debug.log(Debug.levels.DEBUG, "Skipping form without ID");
      return;
    }

    // Always set up handlers for forms that have been updated by HTMX
    Debug.log(Debug.levels.DEBUG, `Setting up handlers for form: ${form.id}`);

    // Remove existing listener if any
    form.removeEventListener("submit", handleFormSubmit);
    // Add new listener
    form.addEventListener("submit", handleFormSubmit);

    // Set up change listeners for form elements
    setupFormChangeListeners(form);

    // Mark form as having handlers set up
    form._fpHandlersSetup = true;

    // Check if form restoration is needed
    if (shouldRestoreForm(form)) {
      Debug.log(Debug.levels.DEBUG, `Restoring state for form: ${form.id}`);
      restoreSingleFormState(form, source || "setupSingleFormHandlers");
    } else {
      Debug.log(
        Debug.levels.DEBUG,
        `Skipping form restoration - no persistent elements: ${form.id}`,
      );
    }
  }

  function handleFormSubmit(event) {
    try {
      const form = event.target;
      if (form.id) {
        clearFormState(form.id);
      }
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error handling form submit: ${error.message}`,
      );
    }
  }

  function setupDynamicFormObserver(container) {
    try {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.tagName === "FORM") {
              setupFormSubmitHandlers(node);
            }
          });
        });
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
      });

      return observer;
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error setting up dynamic form observer: ${error.message}`,
      );
      return null;
    }
  }

  /**
   * Checks if form restoration should be performed for a form or its elements
   * @param {HTMLElement} element - The form or container element to check
   * @returns {boolean} - Whether form restoration should be performed
   */
  function shouldRestoreForm(element) {
    return FormStateManager.shouldRestoreForm(element);
  }

  /**
   * Optimized children morphing with keyed element handling
   */
  function morphChildren(fromEl, toEl, oldKeyedElements, newKeyedElements) {
    // Handle empty initial state
    if (!fromEl.childNodes.length) {
      fromEl.innerHTML = toEl.innerHTML;

      // Setup form persistence if enabled
      if (_state.config?.persistForm) {
        setupFormSubmitHandlers(
          fromEl,
          "updateDOM - form state restoration - setupFormSubmitHandlers",
        );
      }
      return;
    }

    // Special handling for form inputs - preserve their state completely
    if (fromEl instanceof HTMLInputElement) {
      preserveElementState(fromEl, toEl);
      return;
    }

    // Special handling for SVG elements
    const isSVG = fromEl instanceof SVGElement;

    // Handle special elements (form inputs, iframes, scripts)
    if (isSpecialElement(fromEl)) {
      if (
        fromEl instanceof HTMLIFrameElement ||
        fromEl instanceof HTMLScriptElement
      ) {
        updateElementAttributes(fromEl, toEl);
      } else {
        preserveElementState(fromEl, toEl);
      }
      return;
    }

    // If either element has no children but has content, handle as mixed content
    if (
      (!fromEl.children.length && fromEl.childNodes.length) ||
      (!toEl.children.length && toEl.childNodes.length)
    ) {
      handleMixedContent(fromEl, toEl);
      return;
    }
    if (_state.config?.persistForm) {
      captureFormStates(fromEl);
    }

    const oldNodes = Array.from(fromEl.childNodes);
    const newNodes = Array.from(toEl.childNodes);

    // If we have exactly one child on both sides, recurse into it
    if (
      oldNodes.length === 1 &&
      newNodes.length === 1 &&
      oldNodes[0].nodeType === newNodes[0].nodeType &&
      oldNodes[0].nodeName === newNodes[0].nodeName
    ) {
      morphChildren(oldNodes[0], newNodes[0], oldKeyedElements);
      return;
    }

    // Track which old nodes have been processed
    const processedNodes = new Set();

    // First pass: handle keyed elements
    newNodes.forEach((newNode, newIndex) => {
      if (newNode.nodeType === Node.ELEMENT_NODE) {
        const key = newNode.getAttribute("data-key");
        if (key) {
          const existingNode = oldKeyedElements.get(key);
          if (existingNode) {
            const oldIndex = oldNodes.indexOf(existingNode);
            if (oldIndex !== -1) {
              // Move keyed element to correct position
              fromEl.insertBefore(existingNode, oldNodes[newIndex] || null);
              processedNodes.add(oldIndex);
            }
          }
        }
      }
    });

    // Second pass: handle remaining elements
    newNodes.forEach((newNode, newIndex) => {
      // Try to find a matching node that hasn't been processed yet
      const matchIndex = oldNodes.findIndex(
        (oldNode, index) =>
          !processedNodes.has(index) && nodesAreEqual(oldNode, newNode),
      );

      if (matchIndex !== -1) {
        // Found a match - only move it if absolutely necessary
        processedNodes.add(matchIndex);
        const oldNode = oldNodes[matchIndex];

        // Find the actual current index of the node in the DOM
        const currentIndex = Array.from(fromEl.childNodes).indexOf(oldNode);

        // Only move if the node is not already in the correct position
        if (currentIndex !== newIndex) {
          const referenceNode = oldNodes[newIndex];
          // Only move if the reference node exists and is different
          if (referenceNode && referenceNode !== oldNode) {
            fromEl.insertBefore(oldNode, referenceNode);
          }
        }
      } else {
        // No match found - insert new node
        const clonedNode = isSVG
          ? cloneWithNamespace(newNode)
          : newNode.cloneNode(true);
        const referenceNode = oldNodes[newIndex] || null;
        fromEl.insertBefore(clonedNode, referenceNode);
      }
    });

    // Remove any unprocessed old nodes
    oldNodes.forEach((node, index) => {
      if (!processedNodes.has(index)) {
        fromEl.removeChild(node);
      }
    });
  }

  function isSpecialElement(el) {
    const specialTags = ["INPUT", "SELECT", "TEXTAREA", "IFRAME", "SCRIPT"];
    return specialTags.includes(el.tagName);
  }

  function handleMixedContent(fromEl, toEl) {
    const oldNodes = Array.from(fromEl.childNodes);
    const newNodes = Array.from(toEl.childNodes);

    // Compare each node type appropriately
    if (oldNodes.length === newNodes.length) {
      oldNodes.forEach((oldNode, i) => {
        const newNode = newNodes[i];
        if (!nodesAreEqual(oldNode, newNode)) {
          fromEl.replaceChild(newNode.cloneNode(true), oldNode);
        }
      });
    } else {
      fromEl.innerHTML = toEl.innerHTML;
    }
  }

  function nodesAreEqual(node1, node2) {
    if (node1.nodeType !== node2.nodeType) return false;

    if (node1.nodeType === Node.TEXT_NODE) {
      return node1.textContent.trim() === node2.textContent.trim();
    }

    if (node1.nodeType === Node.COMMENT_NODE) {
      return node1.textContent === node2.textContent;
    }

    // Skip comparison for Webflow-specific elements
    if (
      node1 instanceof Element &&
      (node1.className.includes("w-") || node2.className.includes("w-"))
    ) {
      return true;
    }

    return node1.isEqualNode(node2);
  }

  function cloneWithNamespace(node) {
    if (!(node instanceof Element)) return node.cloneNode(true);

    const ns = node.namespaceURI;
    const clone = ns
      ? document.createElementNS(ns, node.tagName)
      : document.createElement(node.tagName);

    // Copy attributes
    Array.from(node.attributes).forEach((attr) => {
      const nsURI = attr.namespaceURI;
      if (nsURI) {
        clone.setAttributeNS(nsURI, attr.name, attr.value);
      } else {
        clone.setAttribute(attr.name, attr.value);
      }
    });

    // Clone children
    Array.from(node.childNodes).forEach((child) => {
      clone.appendChild(cloneWithNamespace(child));
    });

    return clone;
  }

  /**
   * Main update function with performance tracking and error handling
   */
  async function updateDOM(element, newHTML, animate = false, instance = null) {
    Performance.start("updateDOM");

    // Add a flag to prevent multiple restorations
    const isAlreadyRestoring = element.hasAttribute("fp-restoring");
    if (isAlreadyRestoring) {
      Debug.log(Debug.levels.DEBUG, "Already restoring, skipping");
      return;
    }
    element.setAttribute("fp-restoring", "true");

    try {
      if (!element || !(element instanceof HTMLElement)) {
        throw new Error("Invalid target element");
      }

      if (typeof newHTML !== "string") {
        throw new Error("newHTML must be a string");
      }

      Debug.log(
        Debug.levels.DEBUG,
        "Starting updateDOM with config:",
        _state.config,
      );

      // Log form persistence state
      Debug.log(
        Debug.levels.DEBUG,
        `Form persistence enabled: ${
        _state.config?.persistForm
      }, Should restore form: ${FormStateManager.shouldRestoreForm(element)}`,
      );

      // Capture form states if form restoration is needed
      let formStates = null;
      if (
        _state.config?.persistForm &&
        FormStateManager.shouldRestoreForm(element)
      ) {
        Debug.log(Debug.levels.DEBUG, "Capturing form states before update");
        formStates = captureFormStates(element);
        Debug.log(Debug.levels.DEBUG, "Captured form states:", formStates);
      }

      // Single observer setup
      let formObserver = null;
      if (
        _state.config?.persistForm &&
        FormStateManager.shouldRestoreForm(element)
      ) {
        Debug.log(Debug.levels.DEBUG, "Setting up dynamic form observer");
        formObserver = setupDynamicFormObserver(element);
      }

      const updateContent = () => {
        return new Promise((resolve) => {
          // Publish beforeDomUpdate event
          EventSystem.publish("beforeDomUpdate", {
            element,
            newHTML,
            animate,
            formStates,
          });

          // Execute beforeDomUpdate plugin hook if instance is provided
          if (instance) {
            PluginManager.executeHook("beforeDomUpdate", instance, {
              element,
              newHTML,
              animate,
              formStates,
            });
          }

          const virtualContainer = document.createElement("div");
          virtualContainer.innerHTML = newHTML.trim();

          const oldKeyedElements = new Map();
          const newKeyedElements = new Map();
          indexTree(element, oldKeyedElements);
          indexTree(virtualContainer, newKeyedElements);

          morphChildren(
            element,
            virtualContainer,
            oldKeyedElements,
            newKeyedElements,
          );

          // Single form restoration
          if (
            _state.config?.persistForm &&
            FormStateManager.shouldRestoreForm(element) &&
            formStates
          ) {
            Debug.log(Debug.levels.DEBUG, "Restoring form states after update");
            FormStateManager.restoreFormStates(
              element,
              "updateDOM - form state restoration - restoreFormStates",
            );
            setupFormSubmitHandlers(
              element,
              "updateDOM - form state restoration - setupFormSubmitHandlers",
            );
          }

          // Execute afterDomUpdate plugin hook if instance is provided
          if (instance) {
            PluginManager.executeHook("afterDomUpdate", instance, {
              element,
              newHTML,
              animate,
              formStates,
            });
          }

          // Publish afterDomUpdate event
          EventSystem.publish("afterDomUpdate", {
            element,
            newHTML,
            animate,
            formStates,
          });

          resolve();
        });
      };

      if (document.startViewTransition && animate) {
        await document.startViewTransition(() => updateContent()).finished;
      } else {
        await updateContent();
      }

      // Final form state restoration if needed
      if (
        _state.config?.persistForm &&
        FormStateManager.shouldRestoreForm(element)
      ) {
        Debug.log(Debug.levels.DEBUG, "Restoring form states after update");
        const n = element.querySelectorAll('[fp-persist="true"]');
        Debug.log(Debug.levels.DEBUG, `Found ${n.length} inputs to restore`);
        FormStateManager.restoreFormStates(
          element,
          "updateDOM - final form state restoration - restoreFormStates",
        );
        setupFormSubmitHandlers(
          element,
          "updateDOM - final form state restoration - setupFormSubmitHandlers",
        );
      }

      if (formObserver) {
        Debug.log(Debug.levels.DEBUG, "Disconnecting form observer");
        formObserver.disconnect();
      }
    } catch (error) {
      Debug.log(Debug.levels.ERROR, "Error in updateDOM:", error);
      console.error("UpdateDOM error:", error);
      throw error;
    } finally {
      element.removeAttribute("fp-restoring");
      Performance.end("updateDOM");
    }
  }

  /**
   * Enhanced tree indexing with optimized traversal
   */
  function indexTree(node, keyedElements) {
    const walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_ELEMENT,
      null,
      false,
    );

    let currentNode;
    while ((currentNode = walker.nextNode())) {
      const key = currentNode.getAttribute("data-key");
      if (key) {
        keyedElements.set(key, currentNode);
      }
    }
  }

  function instanceMethods(instanceName) {
    // Helper function to resolve a path within the data
    function _resolvePath(path) {
      const instance = _state.instances[instanceName];
      if (!instance) {
        errorLog$1("Instance not found: " + instanceName);
        return undefined;
      }

      const pathParts = path.split(/[\.\[\]'"]/);
      let current = instance.data;
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

    function _validateData(data) {
      if (typeof data === "string" && data.trim().startsWith("<!DOCTYPE")) {
        Debug.log(
          Debug.levels.DEBUG,
          "Data is HTML, skipping validation",
          instanceName,
        );
        return { valid: true, isHtml: true };
      }

      if (
        (typeof data === "object" && data !== null) ||
        Array.isArray(data) ||
        typeof data === "number" ||
        typeof data === "boolean"
      ) {
        return { valid: true, isHtml: false };
      }

      errorLog$1("Invalid data type: " + typeof data);
      return { valid: false, isHtml: false };
    }

    return {
      instanceName,
      animate: _state.defaults.animation,

      _updateDOM: function () {
        const instance = _state.instances[instanceName];
        if (!instance) {
          errorLog$1("Instance not found: " + instanceName);
          return;
        }

        // Check if data is valid
        const { valid, isHtml } = _validateData(instance.data);
        if (!valid || isHtml) {
          return;
        }

        try {
          let rendered;
          if (instance.templateId === "self" || instance.templateId === null) {
            // For "self" template, use the first element as the template
            const templateElement = Array.from(instance.elements)[0];
            if (!templateElement) {
              Debug.log(
                Debug.levels.ERROR,
                "No template element found for self template",
                instance.instanceName,
              );
              return;
            }
            rendered = templateElement.innerHTML;
          } else if (!instance.template) {
            Debug.log(
              Debug.levels.ERROR,
              "No template found for instance",
              instance.instanceName,
            );
            return;
          } else {
            // Apply plugin transformations to the data before rendering
            const transformedData = PluginManager.applyTransformations(
              instance,
              instance.data,
              "transformDataBeforeRender",
              "json",
            );

            // Use transformed data for reactive rendering
            rendered = instance.template(transformedData);
            Debug.log(Debug.levels.DEBUG, "Rendered template with data:", {
              template: instance.templateId,
              data: transformedData,
              rendered: rendered,
            });
          }

          // Filter out elements that are no longer in the DOM
          const activeElements = Array.from(instance.elements).filter((el) =>
            document.body.contains(el),
          );

          if (activeElements.length === 0) {
            Debug.log(
              Debug.levels.ERROR,
              "No active elements found for instance",
              instance.instanceName,
            );
            return;
          }

          activeElements.forEach((element) => {
            updateDOM(element, rendered, instance.animate, instance);
          });
        } catch (error) {
          Debug.log(
            Debug.levels.ERROR,
            "Error updating DOM for instance",
            instance.instanceName,
            error,
          );
        }
      },

      /**
       * Replaces the entire instance data with newData,
       * removing keys not present in newData.
       * Triggers reactive updates via the proxy.
       * @param {Object} newData The new data object.
       */
      setData: function (newData) {
        const instance = _state.instances[instanceName];
        if (!instance) {
          errorLog$1("Instance not found: " + instanceName);
          return this; // Return instance for chaining?
        }

        // Validate newData type (allow empty objects)
        if (
          typeof newData !== "object" ||
          newData === null ||
          Array.isArray(newData)
        ) {
          errorLog$1("Invalid newData type provided to setData: " + typeof newData);
          return this;
        }

        const currentData = instance.data; // The proxy's target

        Debug.log(
          Debug.levels.DEBUG,
          `[setData] Replacing data for ${instanceName}. Current keys: ${Object.keys(
          currentData,
        ).join(", ")}, New keys: ${Object.keys(newData).join(", ")}`,
        );

        // --- Reconciliation Logic ---
        // 1. Delete keys
        let deletedKeys = [];
        for (const key in currentData) {
          if (
            Object.hasOwnProperty.call(currentData, key) &&
            !Object.hasOwnProperty.call(newData, key)
          ) {
            deletedKeys.push(key);
            delete currentData[key]; // Triggers proxy delete trap
          }
        }
        if (deletedKeys.length > 0) {
          Debug.log(
            Debug.levels.DEBUG,
            `[setData] Deleted stale keys for ${instanceName}: ${deletedKeys.join(
            ", ",
          )}`,
          );
        }

        // 2. Assign/update properties
        Object.assign(currentData, newData); // Triggers proxy set traps
        // --- End Reconciliation Logic ---

        Debug.log(
          Debug.levels.DEBUG,
          `[setData] Data replacement processing complete for ${instanceName}.`,
        );

        // Return raw data
        return this;
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
          // Remove from localStorage if storage is enabled
          if (_state.config?.storage?.enabled) {
            localStorage.removeItem(`fp_${instanceName}`);
          }

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
                    // Update data which will trigger render
                    Object.assign(instance.data, data);

                    // Store data if storage is enabled
                    if (_state.config?.storage?.enabled) {
                      saveToLocalStorage(instanceName, instance.data, "instance");
                    }

                    return data;
                  });
                promises.push(promise);
              }
            } else {
              updateDOM(
                element,
                instance.template(instance.data),
                instance.animate,
                instance,
              );
            }
          } catch (error) {
            element.innerHTML = `<div class="fp-error">Error refreshing template: ${error.message}</div>`;
            errorLog$1(`Failed to refresh template: ${error.message}`);
            promises.push(Promise.reject(error));
          }
        });

        await Promise.all(promises);
        return this;
      },

      getData: function () {
        const proxy = _state.instances[instanceName].data;
        return JSON.parse(JSON.stringify(proxy));
      },

      getElements: function () {
        return _state.instances[instanceName].elements;
      },

      get: function (path) {
        return !path ? this.getData() : _resolvePath.call(this, path);
      },

      refreshTemplate: function (templateId, recompile = false) {
        Performance.start("refreshTemplate:" + templateId);
        const compiledTemplate = compileTemplate(templateId, recompile);
        if (!compiledTemplate) {
          errorLog$1("Failed to compile template: " + templateId);
          Performance.end("refreshTemplate:" + templateId);
          return false;
        }
        // ... rest of refreshTemplate implementation ...
      },
    };
  }

  const InstanceManager = {
    /**
     * Gets an existing instance or creates a new one.
     * The data proxy should be assigned by the caller AFTER getting the instance.
     * @param {HTMLElement} element - The DOM element
     * @param {Object} initialData - Initial data object (will be replaced by proxy later)
     * @returns {Object} The instance
     */
    getOrCreateInstance(element, initialData = {}) {
      const instanceName = element.getAttribute("fp-instance") || element.id;
      if (!instanceName) {
        errorLog$1("No instance name found for element");
        return null;
      }

      let instance = _state.instances[instanceName];
      if (!instance) {
        instance = {
          elements: new Set([element]),
          template: null, // Template will be assigned by caller
          templateId: element.getAttribute("fp-template"),
          data: initialData, // Assign initial data, caller MUST replace with Proxy
          cleanup: () => {
            instance.elements.clear(); // Use instance scope
          },
        };

        // Add instance methods
        Object.assign(instance, instanceMethods(instanceName));

        // Add plugin instance methods
        const methods = PluginManager.instanceMethods;
        for (const [methodName] of methods.entries()) {
          // Add method to instance
          instance[methodName] = (...args) =>
            PluginManager.executeInstanceMethod(methodName, instance, ...args);
        }

        _state.instances[instanceName] = instance;
        // Execute newInstance hook
        PluginManager.executeHook("newInstance", instance);
        Debug.log(Debug.levels.INFO, `Created new instance: ${instanceName}`);
      } else {
        // If instance exists, add the new element to its set
        instance.elements.add(element);
        Debug.log(
          Debug.levels.DEBUG,
          `Added element to existing instance: ${instanceName}`,
        );
      }

      // REMOVED internal proxy creation and assignment
      // REMOVED localStorage saving here (should be handled by proxy setter)

      return instance;
    },

    /**
     * Updates an instance's data via the proxy. USE WITH CAUTION.
     * Prefer direct proxy manipulation.
     * @param {Object} instance - The instance to update
     * @param {Object} newData - New data for the instance
     */
    updateInstanceData(instance, newData) {
      if (!instance || !instance.data) {
        errorLog$1("Cannot update data: Instance or instance.data is invalid.");
        return;
      }
      // Update data through the proxy to trigger reactivity
      Object.assign(instance.data, newData);
      // No explicit re-render needed here, proxy handler should trigger _updateDOM
      // No explicit save needed here, proxy handler should save
    },
  };

  function createDeepProxy(target, handler) {
    if (typeof target !== "object" || target === null) {
      return target;
    }

    const proxyHandler = {
      get(target, property) {
        const value = target[property];
        return value && typeof value === "object"
          ? createDeepProxy(value, handler)
          : value;
      },
      set(target, property, value) {
        target[property] = value;
        handler(target);
        return true;
      },
      deleteProperty(target, property) {
        delete target[property];
        handler(target);
        return true;
      },
    };

    return new Proxy(target, proxyHandler);
  }

  function render({
    template,
    data,
    target,
    returnHtml = false,
    instanceName,
    animate = _state.defaults.animation,
    recompile = false,
    skipLocalStorageLoad = false,
    skipRender = false,
    isStoredDataRender = false,
  }) {
    Performance.start("render:" + (instanceName || "anonymous"));

    // Track initialization to prevent redundant initialization of the same instance
    if (!_state._initTracking) {
      _state._initTracking = {};
    }

    // Derive instance name early to use for tracking
    let derivedInstanceName;
    if (instanceName) {
      derivedInstanceName = instanceName;
    } else if (target instanceof Element && target.hasAttribute("fp-instance")) {
      derivedInstanceName = target.getAttribute("fp-instance");
    } else if (target instanceof Element && target.id) {
      derivedInstanceName = target.id;
    } else if (typeof target === "string" && target.startsWith("#")) {
      derivedInstanceName = target.substring(1);
    }

    // If this instance was recently initialized (within 100ms), skip
    // BUT ONLY if this is not an explicit render with stored data
    if (
      derivedInstanceName &&
      _state._initTracking[derivedInstanceName] &&
      !isStoredDataRender
    ) {
      const timeSinceLastInit =
        Date.now() - _state._initTracking[derivedInstanceName];
      if (timeSinceLastInit < 100) {
        // 100ms window to prevent duplicate initializations
        Debug.log(
          Debug.levels.WARN,
          `[Template] Skipping redundant initialization for ${derivedInstanceName}, last init was ${timeSinceLastInit}ms ago`,
        );
        // Still return the existing instance
        return _state.instances[derivedInstanceName] || null;
      }
    }

    // Update tracking timestamp
    if (derivedInstanceName) {
      _state._initTracking[derivedInstanceName] = Date.now();
    }

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

    // Handle empty or "self" template
    if (!template || template === "self") {
      const targetElement =
        typeof target === "string" ? document.querySelector(target) : target;
      template = "#" + targetElement.id;
    }

    // Normalize target to array
    let elements = [];
    if (target instanceof NodeList) {
      elements = Array.from(target);
    } else if (typeof target === "string") {
      elements = Array.from(document.querySelectorAll(target));
    } else if (target instanceof Element) {
      elements = [target];
    }

    if (elements.length === 0) {
      errorLog$1("No target elements found");
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

    // Initialize finalInitialData outside the if block so it's available throughout the function
    let finalInitialData = data || {};
    let persistedData = null;
    let proxy = null; // Initialize proxy at function level

    if (!_state.instances[instanceName] || !_state.instances[instanceName].data) {
      // Load persisted data if available and not skipped
      if (!skipLocalStorageLoad && _state.config?.storage?.enabled) {
        persistedData = loadFromLocalStorage(instanceName, "instance");
        if (persistedData) {
          // Check if stored data is HTML
          if (
            persistedData.isHtml === true ||
            (typeof persistedData === "string" &&
              typeof persistedData.trim === "function" &&
              (persistedData.trim().startsWith("<!DOCTYPE html") ||
                persistedData.trim().startsWith("<html")))
          ) {
            // Get swap specification from element
            const swapSpec = {
              swapStyle:
                elements[0].getAttribute("hx-swap")?.split(" ")[0] || "innerHTML",
              swapDelay: 0,
              settleDelay: 0,
              transition:
                elements[0]
                  .getAttribute("hx-swap")
                  ?.includes("transition:true") || false,
            };

            // Use htmx.swap with proper swap specification
            if (returnHtml) {
              return persistedData; // HTML string is now stored directly
            }
            elements.forEach((element) => {
              htmx.swap(element, persistedData, swapSpec);
            });
            return _state.instances[instanceName];
          }
          // Extract actual data - if persistedData has a 'data' property, use that
          const actualData = persistedData?.data || persistedData;
          finalInitialData = { ...actualData, ...finalInitialData };
          Debug.log(
            Debug.levels.DEBUG,
            `[Template] Merged persisted data for ${instanceName}:`,
            finalInitialData,
          );
        }
      }

      // 1. Get or create the instance shell
      const instance = InstanceManager.getOrCreateInstance(
        elements[0],
        finalInitialData,
      );

      // If instance couldn't be created, exit
      if (!instance) {
        errorLog$1("Failed to get or create instance: " + instanceName);
        return null;
      }

      // --- Debounce and Change Tracking Setup ---
      // Store the timer ID on the instance
      if (!instance._updateTimer) {
        instance._updateTimer = null;
      }
      // Store the 'state before changes' within the current debounce cycle
      if (!instance._stateBeforeDebounce) {
        instance._stateBeforeDebounce = null;
      }
      // --- End Setup ---

      // 2. Create the proxy with the final merged data and DEBOUNCED update handler
      const DEBOUNCE_DELAY = 50; // ms - slightly longer to avoid duplicate updates
      proxy = createDeepProxy(finalInitialData, (target) => {
        if (instance) {
          // -- Debounce Logic --
          // Capture state *before* the first change in this debounce cycle
          // This is crucial for comparing changes accurately after the debounce.
          if (instance._updateTimer === null) {
            // Only capture if no timer is currently set
            try {
              // Use a deep clone to prevent the captured state from being mutated
              // before the setTimeout callback runs.
              instance._stateBeforeDebounce = JSON.parse(JSON.stringify(proxy));
              Debug.log(
                Debug.levels.DEBUG,
                `[Debounce Start] Captured pre-debounce state for ${instanceName}:`,
                instance._stateBeforeDebounce, // Log the actual captured object
              );
            } catch (e) {
              errorLog$1(
                `[Debounce Start] Failed to capture pre-debounce state for ${instanceName}:`,
                e,
              );
              // If cloning fails, set to null to potentially prevent errors in trackChanges
              // though trackChanges might still fail if it receives null.
              instance._stateBeforeDebounce = null;
            }
          }

          // Clear existing timer
          clearTimeout(instance._updateTimer);

          // Schedule the update
          instance._updateTimer = setTimeout(() => {
            // ** USE STATE CAPTURED BEFORE DEBOUNCE **
            const stateBefore = instance._stateBeforeDebounce;
            const stateAfter = proxy;

            const jsonStateBefore = JSON.parse(JSON.stringify(stateBefore));
            const jsonStateAfter = JSON.parse(JSON.stringify(stateAfter));

            // 1. Basic Change Check (Optional but Recommended)
            // Avoid firing hooks if state hasn't actually changed.
            // Using simple stringify comparison - replace with deepEqual if needed & imported.
            const stateChanged =
              JSON.stringify(jsonStateBefore) !== JSON.stringify(jsonStateAfter);

            // 2. Execute Hooks/Events with Full States
            if (stateChanged) {
              Debug.log(
                Debug.levels.INFO,
                `[Debounced Update] State changed for ${instanceName}. Firing updateData hook.`,
              );
              // Pass the full old and new states
              PluginManager.executeHook("updateData", instance, {
                newData: jsonStateAfter, // Current state
                oldData: jsonStateBefore, // State before changes
                source: "proxy",
              });
              EventSystem.publish("updateData", {
                instanceName,
                newData: jsonStateAfter,
                oldData: jsonStateBefore,
                source: "proxy",
              });
            } else {
              Debug.log(
                Debug.levels.DEBUG,
                `[Debounced Update] No state change detected for ${instanceName}. Skipping updateData hook.`,
              );
            }

            // 3. Update DOM
            Debug.log(
              Debug.levels.DEBUG,
              `[Debounced Update] Triggering _updateDOM for ${instanceName}`,
            );

            instance._updateDOM();

            // 4. Save to storage
            // Get the correct instance name and sanitize it for the key
            const storageId = instance.instanceName.replace("#", "");
            Debug.log(
              Debug.levels.DEBUG,
              `[Debounced Update] Saving root proxy object for ${storageId}.`,
            );
            if (_state.config?.storage?.enabled) {
              saveToLocalStorage(
                storageId,
                stateAfter, // Save the data directly, not wrapped in an object
                "instance",
              );
            }

            // Clear timer and pre-debounce state reference after execution
            instance._updateTimer = null;
            instance._stateBeforeDebounce = null;
          }, DEBOUNCE_DELAY);
          // -- End Debounce Logic --
        }
      });

      // 3. Assign the proxy and template to the instance
      instance.elements = new Set(elements);
      instance.template = compiledTemplate;
      instance.templateId = elements[0].getAttribute("fp-template") || template;
      instance.data = proxy; // Assign the proxy!

      // 4. Trigger initial render - This should be OUTSIDE the debounce logic
      Debug.log(
        Debug.levels.DEBUG,
        `[Initial Render] ${
        skipRender ? "Skipping" : "Triggering"
      } _updateDOM for ${instanceName}`,
      );

      // Only call _updateDOM if not skipRender
      if (!skipRender) {
        instance._updateDOM();
      }

      // Optional: Initial save if needed, OUTSIDE debounce
      if (_state.config?.storage?.enabled && !persistedData) {
        // Only save if not loaded
        const storageId = instanceName.replace("#", "");
        Debug.log(
          Debug.levels.DEBUG,
          `[Initial Save] Saving initial data for ${storageId}`,
        );
        saveToLocalStorage(
          storageId,
          finalInitialData, // Save the data directly, not wrapped in an object
          "instance",
        ); // Save the raw initial merged data
      }
    } else {
      // If the instance already exists, get its proxy
      proxy = _state.instances[instanceName].data;
    }

    // Return the instance from the state (might be the one just created or an existing one)
    const finalInstance = _state.instances[instanceName];
    log("Final instance data: ", finalInstance.data);

    /* -------------------------------------------------------------------------- */
    /*                               Render template                              */
    /* -------------------------------------------------------------------------- */

    // Only create/setup instance if proxy is defined
    if (proxy) {
      // Create/get instance and set up proxy regardless of skipRender
      const instance = InstanceManager.getOrCreateInstance(
        elements[0],
        finalInitialData,
      );

      // Set up the instance but don't render automatically
      instance.elements = new Set(elements);
      instance.template = compiledTemplate; // Always store the template
      instance.templateId = elements[0].getAttribute("fp-template") || template;
      instance.data = proxy;

      // At this point do NOT call instance._updateDOM() to avoid automatic rendering

      // Only perform actual rendering if explicitly requested
      if (!skipRender) {
        Debug.log(
          Debug.levels.DEBUG,
          `[Render Template] Executing render for ${instanceName}`,
        );

        try {
          if (returnHtml) {
            // Apply plugin transformations to the data before rendering
            const transformedData = PluginManager.applyTransformations(
              finalInstance,
              finalInstance.data,
              "transformDataBeforeRender",
              "json",
            );
            return compiledTemplate(transformedData);
          }

          elements.forEach((element) => {
            // Apply plugin transformations to the data before rendering
            const transformedData = PluginManager.applyTransformations(
              finalInstance,
              finalInstance.data,
              "transformDataBeforeRender",
              "json",
            );
            updateDOM(
              element,
              compiledTemplate(transformedData),
              animate,
              finalInstance,
            );
          });
        } catch (error) {
          if (!(error instanceof TemplateError)) {
            errorLog$1(`Failed to render template: ${error.message}`);
          }
          throw error;
        }
      } else {
        Debug.log(
          Debug.levels.DEBUG,
          `[Render Template] Skipping render for ${instanceName} as requested`,
        );
      }
    } else if (!skipRender) {
      // Log a debug message that we're skipping render due to no data
      Debug.log(
        Debug.levels.DEBUG,
        `[Template] Skipping render for ${instanceName} because no data is available yet.`,
      );
    }

    return finalInstance || null;
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
          throw new TemplateError(
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
        throw new TemplateError("Unsupported operator: " + operator);
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

        // Evaluate the condition
        const result = compare(leftValue, operator, rightValue);

        // Execute the appropriate branch
        if (result) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      } catch (error) {
        // Log the error stack for better debugging
        if (!(error instanceof TemplateError)) {
          Debug.log(
            Debug.levels.ERROR,
            "Error evaluating if condition:",
            error.stack,
          );
        }
        throw error; // Re-throw to maintain error state
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

  function* Lexer(expr) {
    var _regex = new RegExp(Lexer.lang, "g");
    var x;
    while ((x = _regex.exec(expr)) !== null) {
      var [token] = x;
      for (var category in Lexer.categories) {
        if (new RegExp(Lexer.categories[category]).test(token)) {
          yield { token, category };
          break;
        }
      }
    }
  }

  Lexer.categories = {
    op: "[+*/^]|-(?!\\d)",
    num: "-?\\d+(?:\\.\\d+)?%?",
    group: "[\\[()\\]]",
    sep: ",",
    ident: "\\b(ans|pi|e)\\b",
    func: "\\b(sqrt|abs|log|ln|sin|cos|tan|min|max)\\b",
  };

  Lexer.lang = [
    Lexer.categories.op,
    Lexer.categories.num,
    Lexer.categories.group,
    Lexer.categories.sep,
    Lexer.categories.ident,
    Lexer.categories.func,
  ].join("|");

  Lexer.cat = {
    INT: "num",
    IDENT: "ident",
    PCNT: "num",
    FUNC: "func",
    SEP: "sep",
  };

  class Calc {
    constructor() {
      this.stack = [];
      this.w = null;
      this.l = null;
    }

    _next() {
      const next = this.l.next();
      if (next.done) {
        //   console.debug("End of expression reached");
        return null;
      }
      // console.debug("Next token:", next.value);
      return next.value;
    }

    exec(expr) {
      try {
        this.l = Lexer(expr);
        this.w = this._next();

        if (!this.e()) {
          throw new SyntaxError(
            this.w ? this.w.token : "Unexpected end of expression",
          );
        }

        if (this.w !== null) {
          throw new SyntaxError(`Unexpected token: ${this.w.token}`);
        }

        return (Calc.ans = this.stack.pop());
      } catch (error) {
        console.error("Error in expression evaluation:", error);
        throw error;
      }
    }

    _istok(o) {
      return this.w && o === this.w.token;
    }

    z() {
      if (this._wrapped_expr()) {
        return true;
      } else if (
        this.w &&
        ["INT", "IDENT", "PCNT"].some((k) => Lexer.cat[k] === this.w.category)
      ) {
        this.stack.push(Calc._val(this.w));
        this.w = this._next();
        return true;
      } else if (this.w && this.w.category === Lexer.cat.FUNC) {
        var fn = this.w.token;
        this.w = this._next();
        if (fn === "min" || fn === "max") {
          return this._wrapped_expr_min_max(this._rep_val, fn);
        } else {
          return this._wrapped_expr(this._rep_val, fn);
        }
      } else if (this._wrapped_expr(this._rep_val, "abs", "|", "|")) {
        return true;
      }
      return false;
    }

    _wrapped_expr_min_max(cb, arg, a = "(", b = ")") {
      if (this.w && this.w.token === a) {
        this.w = this._next();
        let args = [];
        while (this.w !== null) {
          if (this.e()) {
            args.push(this.stack.pop());
            if (this.w && this.w.category === "sep") {
              this.w = this._next();
              continue;
            }
          }
          break;
        }
        if (this.w && this.w.token === b) {
          this.w = this._next();
          if (cb instanceof Function) {
            cb.call(this, arg, args);
          }
          return true;
        }
      }
      return false;
    }

    _lrecmut(nt, pfn) {
      return nt.call(this) && pfn.call(this);
    }

    _ophit(ops, nt, pfn, follow) {
      if (this.w && ops.some((op) => op === this.w.token)) {
        var op = this.w.token;
        var a = this.stack.pop();
        this.w = this._next();
        if (nt.call(this)) {
          var b = this.stack.pop();
          this.stack.push(Calc._chooseOp(op)(a, b));
          return pfn.call(this);
        }
      } else if (!this.w || follow.some((op) => op === this.w.token)) {
        return true;
      }
      return false;
    }

    e() {
      this.t();
      while (this.w && (this.w.token === "+" || this.w.token === "-")) {
        const op = this.w.token;
        this.w = this._next();
        if (!this.t()) return false;
        const right = this.stack.pop();
        const left = this.stack.pop();
        this.stack.push(Calc._chooseOp(op)(left, right));
      }
      return true;
    }

    t() {
      let result = this.f();
      while (this.w && (this.w.token === "*" || this.w.token === "/")) {
        const op = this.w.token;
        this.w = this._next();
        if (!this.f()) return false;
        const right = this.stack.pop();
        const left = this.stack.pop();
        this.stack.push(Calc._chooseOp(op)(left, right));
      }
      return result;
    }

    f() {
      if (this.w && this.w.token === "-") {
        this.w = this._next();
        if (!this.z()) return false;
        const val = this.stack.pop();
        this.stack.push(-val);
        return true;
      }
      return this.z();
    }

    ep() {
      return this._ophit(["+", "-"], this.p, this.ep, [")", "|", ","]);
    }

    p() {
      return this._lrecmut(this.x, this.pp);
    }

    pp() {
      return this._ophit(["*", "/"], this.x, this.pp, ["+", "-", ")", "|", ","]);
    }

    x() {
      return this._lrecmut(this.z, this.xp);
    }

    xp() {
      return this._ophit(["^"], this.z, this.xp, [
        "*",
        "/",
        "+",
        "-",
        ")",
        "|",
        ",",
      ]);
    }

    _wrapped_expr(cb, arg, a = "(", b = ")") {
      if (!this.w) {
        return false;
      }

      if (this.w.token === a) {
        this.w = this._next();
        if (this.e()) {
          if (this.w && this.w.token === b) {
            this.w = this._next();
            if (cb instanceof Function) cb.call(this, arg);
            return true;
          }
        }
      }
      return false;
    }

    _rep_val(fn, args) {
      if (args) {
        // For min/max functions with multiple arguments
        this.stack.push(Calc._chooseFn(fn).apply(null, args));
      } else {
        // For single argument functions
        const value = this.stack.pop();
        if (value === undefined) {
          throw new Error(`Function ${fn} requires an argument`);
        }
        this.stack.push(Calc._chooseFn(fn)(value));
      }
    }

    static _chooseFn(fn) {
      switch (fn) {
        case "sqrt":
          return Math.sqrt;
        case "log":
          return Math.log10;
        case "ln":
          return Math.log;
        case "abs":
          return Math.abs;
        case "min":
          return Math.min;
        case "max":
          return Math.max;
        case "sin":
          return Math.sin;
        case "cos":
          return Math.cos;
        case "tan":
          return Math.tan;
        default:
          throw new Error(`Unknown function: ${fn}`);
      }
    }

    static _val(w) {
      var n;
      if (w.category === Lexer.cat.INT || w.category === Lexer.cat.PCNT) {
        n = parseFloat(w.token);
        if (w.token.endsWith("%")) n /= 100;
      } else if (w.category === Lexer.cat.IDENT) {
        if (w.token === "pi") {
          n = Math.PI;
        } else if (w.token === "e") {
          n = Math.E;
        } else if (w.token === "ans") {
          n = this.ans;
        }
      }
      return n;
    }

    static _chooseOp(op) {
      switch (op) {
        case "+":
          return (a, b) => a + b;
        case "-":
          return (a, b) => a - b;
        case "*":
          return (a, b) => a * b;
        case "/":
          return (a, b) => a / b;
        case "^":
          return (a, b) => Math.pow(a, b);
        default:
          throw new Error(`Unknown operator: ${op}`);
      }
    }
  }
  Calc.ans = 0;

  function mathHelper() {
    Handlebars.registerHelper("math", function (expression, options) {
      // First, identify and protect function names
      const functionNames = [
        "min",
        "max",
        "sqrt",
        "abs",
        "log",
        "ln",
        "sin",
        "cos",
        "tan",
      ];

      // First pass: resolve forced variable references like @{max}
      const resolvedForced = expression.replace(
        /@{([^}]+)}/g,
        (match, varPath) => {
          try {
            let value;
            if (varPath.includes(".")) {
              value = varPath
                .split(".")
                .reduce((acc, part) => acc[part], options.data.root);
            } else {
              value = options.data.root[varPath] || options.hash[varPath];
            }
            return value;
          } catch (error) {
            console.warn(`Could not resolve ${varPath}`);
            return NaN;
          }
        },
      );

      // Second pass: normal variable resolution with function name protection
      const resolvedExpression = resolvedForced.replace(
        /[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)*/g,
        (match) => {
          // Skip if it's a standalone function name (not part of a property path)
          if (functionNames.includes(match) && !match.includes(".")) {
            return match;
          }

          try {
            // Resolve context paths like 'this.data' or 'object.sum'
            let value;
            if (match.includes(".")) {
              value = match
                .split(".")
                .reduce((acc, part) => acc[part], options.data.root);
            } else {
              value = options.data.root[match] || options.hash[match];
            }
            return value;
          } catch (error) {
            console.warn(`Could not resolve ${match}`);
            return NaN;
          }
        },
      );

      Debug.log(Debug.levels.DEBUG, "Evaluating expression:", resolvedExpression);

      try {
        // Evaluate the expression using jscalc
        const c = new Calc();
        const result = c.exec(resolvedExpression);
        return result;
      } catch (error) {
        // Only log and throw once
        if (!(error instanceof TemplateError)) {
          throw new TemplateError(
            `Error evaluating expression: ${error.message}`,
            error.stack,
          );
        }
        throw error; // Re-throw TemplateErrors without wrapping
      }
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

  function setHelper() {
    Handlebars.registerHelper("set", function (varName, varValue, options) {
      if (!varName || !varValue) {
        errorLog$1("setHelper: varName and varValue are required");
        return "";
      }
      //check if varName is a valid variable name
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(varName)) {
        errorLog$1(`setHelper: varName ${varName} is not a valid variable name`);
        return "";
      }

      options.data.root[varName] = varValue;
    });
  }

  /**
   * Registers a Handlebars helper that creates an animated bunny ASCII art.
   * The bunny alternates between two states: normal and flipped.
   *
   * Requirements:
   * - Handlebars must be loaded globally before calling this function
   * - Runs in browser environment (uses window and document)
   *
   * The helper creates:
   * - Global window.bunnyStates object storing ASCII art variants
   * - Global window.bunnyAnimation function managing animation
   * - Global window.bunnyAnimationIntervalId for animation control
   *
   * Usage in Handlebars template:
   * {{bunny}}
   *
   * @returns {void}
   */
  function bunnyHelper() {
    if (typeof Handlebars === "undefined") {
      console.error("Handlebars is not loaded yet!");
      return;
    }

    // Only register once
    if (Handlebars.helpers.bunny) {
      return;
    }

    const bunny = `
    &nbsp;&nbsp;&nbsp;&nbsp;/)  /)<br>
    ପ(˶•-•˶)ଓ ♡<br>
    &nbsp;&nbsp;&nbsp;/づ  づ
  `;

    const bunnyFlipped = `
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(\\  (\\<br>
    &nbsp;&nbsp;ପ(˶•-•˶)ଓ<br>
    &nbsp;&nbsp;♡じ  じ\\
  `;

    // Store bunny states globally
    window.bunnyStates = {
      bunny,
      bunnyFlipped,
    };

    // Initialize animation function
    window.bunnyAnimation = function () {
      if (window.bunnyAnimationIntervalId) {
        clearInterval(window.bunnyAnimationIntervalId);
      }
      window.bunnyAnimationIntervalId = setInterval(function () {
        document.querySelectorAll(".fp-bunny").forEach(function (element) {
          const currentState = element.getAttribute("data-bunny-state");
          if (currentState === "normal") {
            element.innerHTML = window.bunnyStates.bunnyFlipped;
            element.setAttribute("data-bunny-state", "flipped");
          } else {
            element.innerHTML = window.bunnyStates.bunny;
            element.setAttribute("data-bunny-state", "normal");
          }
        });
      }, 1000);
    };

    // Register the helper
    Handlebars.registerHelper("bunny", function () {
      const wrapper = `<span class="fp-bunny" data-bunny-state="normal">${window.bunnyStates.bunny}</span>`;

      // Start animation on next tick
      setTimeout(window.bunnyAnimation, 0);

      return new Handlebars.SafeString(wrapper);
    });

    // Start animation if there are already bunnies on the page
    if (document.querySelectorAll(".fp-bunny").length > 0) {
      window.bunnyAnimation();
    }
  }

  function registerHelpers() {
    ifHelper();
    sumHelper();
    mathHelper();
    eachHelper();
    executeHelper();
    setHelper();
    bunnyHelper();
  }

  /**
   * @module RequestHandler
   * @description Manages HTMX request processing and lifecycle events for form processing elements
   */
  const RequestHandler = {
    /** @type {Map<HTMLElement, {requestId: string, timestamp: number, processed: boolean}>} */
    processingElements: new Map(),
    /** @type {number} Counter for generating unique request IDs */
    currentRequestId: 0,

    /**
     * Generates a unique request ID using timestamp and counter
     * @returns {string} Unique request identifier
     */
    generateRequestId() {
      return `fp-${Date.now()}-${this.currentRequestId++}`;
    },

    /**
     * Handles different stages of request processing for a target element
     * @param {HTMLElement} target - The DOM element being processed
     * @param {string} requestId - Unique identifier for the request
     * @param {'start'|'process'|'cleanup'} action - The action to perform
     * @returns {boolean|void} Returns true if processing succeeded for 'process' action
     */
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
          if (
            currentInfo &&
            currentInfo.requestId === requestId &&
            currentInfo.processed
          ) {
            this.processingElements.delete(target);
            Debug.log(
              Debug.levels.DEBUG,
              "Cleaned up after request",
              target,
              requestId,
            );
          } else {
            Debug.log(
              Debug.levels.DEBUG,
              "Skipping cleanup - request mismatch or not processed",
              { current: currentInfo?.requestId, received: requestId },
            );
          }
          break;
      }
    },

    /**
     * Removes stale processing entries that are older than the timeout threshold
     */
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

    /**
     * Sets up all necessary event listeners for HTMX integration and request handling
     */
    setupEventListeners() {
      document.body.addEventListener("htmx:configRequest", (event) => {
        // Apply plugin transformations to the request
        const target = event.detail.elt;
        const instance = InstanceManager.getOrCreateInstance(target);
        if (instance) {
          event = PluginManager.applyTransformations(
            instance,
            event,
            "transformRequest",
            "json",
          );
        }

        event.detail.headers["Content-Type"] =
          "application/x-www-form-urlencoded; charset=UTF-8";
      });

      // Add consolidated event listeners
      document.body.addEventListener("htmx:beforeRequest", (event) => {
        const target = event.detail.elt;
        const requestId = event.detail.requestId || this.generateRequestId();
        event.detail.requestId = requestId; // Ensure requestId is set
        this.handleRequest(target, requestId, "start");

        // Find instance that contains this element
        let instance = null;
        let instanceName = null;
        for (const [name, inst] of Object.entries(_state.instances)) {
          if (Array.from(inst.elements).some((el) => el.contains(target))) {
            instance = inst;
            instanceName = name;
            break;
          }
        }

        if (instance) {
          // Execute beforeRequest hook
          EventSystem.publish("request-start", {
            instanceName,
            ...event.detail,
          });
        }
      });

      document.body.addEventListener("htmx:beforeSwap", (event) => {
        const target = event.detail.elt;
        const requestId = event.detail.requestId;
        const info = this.processingElements.get(target);

        // Only prevent swap if request IDs don't match
        if (info && info.requestId !== requestId) {
          event.preventDefault();
          Debug.log(Debug.levels.DEBUG, "Prevented swap - request ID mismatch");
        }
      });

      // Cleanup handlers
      document.body.addEventListener("htmx:responseError", (event) => {
        // Only cleanup on actual errors, not on successful responses
        if (event.detail.failed) {
          this.handleRequest(event.detail.elt, event.detail.requestId, "cleanup");
        }
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

  // function isHTML(string) {
  //   return Array.from(
  //     new DOMParser().parseFromString(string, "text/html").body.childNodes,
  //   ).some(({ nodeType }) => nodeType == 1);
  // }

  function defineHtmxExtension() {
    htmx.defineExtension("flowplater", {
      transformResponse: function (text, xhr, elt) {
        // Get the instance first to apply transformations
        const instance = InstanceManager.getOrCreateInstance(elt);

        // First, check if the data is XML and transform it to JSON if needed
        const contentType = xhr.getResponseHeader("Content-Type") || "";
        const isXml = contentType.startsWith("text/xml");
        const isHtml = contentType.startsWith("text/html");

        let processedText = text;
        let isJson = false;

        if (isXml) {
          try {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(text, "text/xml");
            processedText = JSON.stringify(parseXmlToJson(xmlDoc));
            isJson = true;
          } catch (error) {
            errorLog$1("Failed to parse XML response:", error);
            // Keep the original text if XML parsing fails
          }
        } else if (!isHtml) {
          // If not HTML and not XML, assume it's JSON
          isJson = true;
        }

        // Determine the dataType for transformations
        const dataType = isHtml ? "html" : "json";

        // Apply plugin transformations to the response text
        if (instance) {
          processedText = PluginManager.applyTransformations(
            instance,
            processedText,
            "transformResponse",
            dataType,
          );
        } else {
          Debug.log(
            Debug.levels.DEBUG,
            `[transformResponse] No instance found for elt ${elt.id}. Skipping transformations.`,
          );
        }

        const requestId = xhr.requestId;
        const currentInfo = RequestHandler.processingElements.get(elt);

        if (!currentInfo || currentInfo.requestId !== requestId) {
          return processedText;
        }

        // If the transformed data is HTML, handle it accordingly
        if (!isJson) {
          if (_state.config?.storage?.enabled) {
            const instanceName = instance
              ? instance.instanceName
              : elt.getAttribute("fp-instance") || elt.id;
            if (instanceName) {
              saveToLocalStorage(
                instanceName,
                {
                  data: processedText,
                  isHtml: true,
                  timestamp: Date.now(),
                },
                "instance",
              );
            }
          }
          return processedText;
        }

        // Process JSON data
        let newData;
        try {
          newData = JSON.parse(processedText);
        } catch (error) {
          errorLog$1("Failed to parse JSON response:", error);
          return processedText;
        }

        if (!newData) return processedText;

        if (instance) {
          const instanceName = instance.instanceName;
          Debug.log(
            Debug.levels.DEBUG,
            `[transformResponse] Calling instance.setData for ${instanceName} with new data.`,
          );

          // Store the raw data in the instance
          instance.setData(newData);
          Debug.log(
            Debug.levels.DEBUG,
            `[transformResponse] setData called for request ${requestId} on elt ${elt.id}. Returning empty string.`,
          );
          return "";
        }
        return processedText;
      },

      handleSwap: function (swapStyle, target, fragment, settleInfo) {
        const isEmptySignal = fragment.textContent?.trim() === "";

        if (isEmptySignal) {
          Debug.log(
            Debug.levels.DEBUG,
            `[handleSwap] Detected empty string signal for target ${
            target.id || "[no id]"
          }. Preventing htmx default swap.`,
          );
          return true;
        } else {
          Debug.log(
            Debug.levels.DEBUG,
            `[handleSwap] Fragment is not empty signal for target ${
            target.id || "[no id]"
          }. Letting htmx swap.`,
          );
          return false;
        }
      },

      onEvent: function (name, evt) {
        const triggeringElt = evt.detail.elt;
        if (!triggeringElt) {
          Debug.log(
            Debug.levels.WARN,
            `[onEvent] Event ${name} has no triggering element (evt.detail.elt). Skipping.`,
          );
          return;
        }

        const requestId =
          evt.detail.requestId || RequestHandler.generateRequestId();
        if (!evt.detail.requestId) evt.detail.requestId = requestId;

        switch (name) {
          case "htmx:confirm":
            if (triggeringElt.hasAttribute("fp-template")) {
              const instance = InstanceManager.getOrCreateInstance(triggeringElt);
              // Apply plugin transformations to the confirm event
              evt = PluginManager.applyTransformations(
                instance || null,
                evt,
                "confirm",
                "json",
              );
            }
            break;

          case "htmx:configRequest":
            // Apply transformations regardless of fp-template attribute
            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
            evt = PluginManager.applyTransformations(
              instance || null,
              evt,
              "configRequest",
              "json",
            );
            break;

          case "htmx:beforeRequest":
            if (!evt.detail.xhr.requestId) {
              evt.detail.xhr.requestId = requestId;
            }
            RequestHandler.handleRequest(triggeringElt, requestId, "start");

            // Execute hooks if it's a template element
            if (triggeringElt.hasAttribute("fp-template")) {
              const instance = InstanceManager.getOrCreateInstance(triggeringElt);
              PluginManager.executeHook("beforeRequest", instance || null, evt);
            }
            break;

          case "htmx:beforeSwap":
            executeHtmxHook("beforeSwap", triggeringElt, evt);
            break;

          case "htmx:afterSwap":
            executeHtmxHook("afterSwap", triggeringElt, evt);
            const formsToCleanup = getAllRelevantForms(triggeringElt);
            formsToCleanup.forEach(cleanupFormChangeListeners);
            break;

          case "htmx:afterRequest":
            if (triggeringElt.hasAttribute("fp-template")) {
              const instance = InstanceManager.getOrCreateInstance(triggeringElt);
              if (instance) {
                PluginManager.executeHook("afterRequest", instance, evt);
                EventSystem.publish("request-end", {
                  instanceName: instance.instanceName,
                  ...evt.detail,
                });
              }
            }
            RequestHandler.handleRequest(triggeringElt, requestId, "cleanup");
            restoreFormIfNecessary(triggeringElt, true, evt);
            break;

          case "htmx:afterSettle":
            executeHtmxHook("afterSettle", triggeringElt, evt);
            Debug.log(
              Debug.levels.DEBUG,
              `Setting up form handlers after DOM settle for target: ${
              triggeringElt.id || "unknown"
            }, ` +
                `has fp-template: ${triggeringElt.hasAttribute(
                "fp-template",
              )}, ` +
                `parent form: ${triggeringElt.closest("form")?.id || "none"}`,
            );
            setupFormSubmitHandlers(triggeringElt);
            break;
        }
      },
    });
  }

  function executeHtmxHook(hookName, target, event) {
    if (target.hasAttribute("fp-instance") || target.hasAttribute("id")) {
      const instance = InstanceManager.getOrCreateInstance(target);
      if (instance) {
        PluginManager.executeHook(hookName, instance, event?.detail);
      }
    }
  }

  /**
   * Helper function to restore form states if necessary
   * @param {HTMLElement} target - The target element
   * @param {boolean} [checkFailed=true] - Whether to check if the request failed
   * @param {Object} [event] - The event object containing failure status
   */
  function restoreFormIfNecessary(target, checkFailed = true, event) {
    if (FormStateManager.isRestoringFormStates) {
      Debug.log(Debug.levels.DEBUG, "Already restoring form states, skipping");
      return;
    }

    if (checkFailed && event?.detail?.failed) {
      return;
    }

    FormStateManager.restoreFormStates(target);
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
      errorLog(`Error in translateCustomHTMXAttributes: ${error.message}`);
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
        (element.hasAttribute("fp-prepend") ||
          element.hasAttribute("fp-append")) &&
        methods.some((method) => element.hasAttribute("hx-" + method))
      ) {
        processElement(element);
      }
      return element;
    } catch (error) {
      errorLog$1(`Error in processUrlAffixes: ${error.message}`);
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

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                      FlowPlater module                              */
  /* -------------------------------------------------------------------------- */

  /**
   * @namespace FlowPlater
   * @description Core FlowPlater module that provides template processing and dynamic content management.
   * Integrates with HTMX and Handlebars to provide a seamless templating and interaction experience.
   * @author JWSLS
   */

  const VERSION = "1.4.26";
  const AUTHOR = "JWSLS";
  const LICENSE = "Flowplater standard licence";

  /**
   * @typedef {Object} FlowPlaterConfig
   * @property {Object} debug - Debug configuration settings
   * @property {number} debug.level - Debug level (0-3, 0 = error, 1 = warning, 2 = info, 3 = debug)
   * @property {Object} selectors - DOM selector configurations
   * @property {string} selectors.fp - Main FlowPlater element selector
   * @property {Object} templates - Template handling configuration
   * @property {number} templates.cacheSize - Maximum number of cached templates
   * @property {boolean} templates.precompile - Whether to precompile templates
   * @property {Object} animation - Animation settings
   * @property {boolean} animation.enabled - Enable/disable animations
   * @property {number} animation.duration - Animation duration in milliseconds
   * @property {Object} htmx - HTMX configuration
   * @property {number} htmx.timeout - Request timeout in milliseconds
   * @property {string} htmx.swapStyle - Default content swap style
   * @property {Object} customTags - Custom tag definitions
   * @property {Object} storage - Storage configuration
   * @property {boolean} storage.enabled - Whether to persist instance data
   * @property {number} storage.ttl - Time to live in seconds (default: 30 days in seconds, -1 for infinite)
   * @property {boolean} persistForm - Whether to persist form states
   */
  const defaultConfig = {
    debug: {
      level:
        window.location.hostname.endsWith(".webflow.io") ||
        window.location.hostname.endsWith(".canvas.webflow.com")
          ? 3
          : 1,
    },
    selectors: {
      fp: "[fp-template], [fp-get], [fp-post], [fp-put], [fp-delete], [fp-patch], [fp-persist]",
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
      selfRequestsOnly: false,
    },
    customTags: customTagList,
    storage: {
      enabled: false,
      ttl: 30 * 24 * 60 * 60, // 30 days in seconds
    },
    persistForm: true,
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
  /* ANCHOR                 process(element = document)                         */
  /* -------------------------------------------------------------------------- */

  /**
   * @namespace ProcessingChain
   * @description Handles the sequential processing of FlowPlater elements through various transformation phases.
   * Each processor in the chain performs a specific modification or setup task on the element.
   */
  const ProcessingChain = {
    /**
     * @type {Array<Object>}
     * @property {string} name - Name of the processor
     * @property {Function} process - Processing function
     */
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

    /**
     * @type {string}
     * @description Selector used to identify FlowPlater elements in the DOM
     */
    FP_SELECTOR: _state.config.selectors.fp,

    /**
     * @function processElement
     * @param {HTMLElement} element - The DOM element to process
     * @returns {HTMLElement} The processed element
     * @description Processes a single FlowPlater element through all registered processors.
     * Handles errors and maintains processing state throughout the chain.
     */
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
            if (error instanceof TemplateError) {
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

  /**
   * @function process
   * @param {HTMLElement} [element=document] - The root element to process
   * @description Processes FlowPlater elements within the given element or document.
   * If the element itself matches FlowPlater selectors, processes just that element.
   * Otherwise, finds and processes all matching child elements.
   */
  function process(element = document) {
    if (element === document || !element.matches(ProcessingChain.FP_SELECTOR)) {
      const fpElements = element.querySelectorAll(ProcessingChain.FP_SELECTOR);
      fpElements.forEach((el) => ProcessingChain.processElement(el));
    } else {
      ProcessingChain.processElement(element);
    }
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
    PluginManager,

    // Logging API
    log: function (level, ...args) {
      // add '[PLUGIN]' before the first argument
      args.unshift(`[PLUGIN]`);
      Debug.log(level, ...args);
      return this;
    },

    // Log levels for use with the log method
    logLevels: {
      ERROR: Debug.levels.ERROR,
      WARN: Debug.levels.WARN,
      INFO: Debug.levels.INFO,
      DEBUG: Debug.levels.DEBUG,
    },

    // Plugin management methods
    registerPlugin(plugin) {
      return this.PluginManager.registerPlugin(plugin);
    },

    removePlugin(name) {
      return this.PluginManager.removePlugin(name);
    },

    removeAllPlugins() {
      return this.PluginManager.destroyAll();
    },

    getPlugin(name) {
      return this.PluginManager.getPlugin(name);
    },

    getAllPlugins() {
      return this.PluginManager.getSortedPlugins();
    },

    enablePlugin(name) {
      return this.PluginManager.enablePlugin(name);
    },

    disablePlugin(name) {
      return this.PluginManager.disablePlugin(name);
    },

    pluginConfig(name) {
      return this.PluginManager.pluginConfig(name);
    },

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

      /**
       * Get a template from the cache
       * @param {string} templateId - The ID of the template to get
       * @returns {Object} The template object or all templates if no ID is provided
       */
      get: function (templateId) {
        if (templateId) {
          return _state.templateCache[templateId];
        }
        return _state.templateCache;
      },

      /**
       * Check if a template is cached
       * @param {string} templateId - The ID of the template to check
       * @returns {boolean} True if the template is cached, false otherwise
       */
      isCached: function (templateId) {
        return !!_state.templateCache[templateId];
      },

      /**
       * Clear a template from the cache
       * @param {string} templateId - The ID of the template to clear
       */
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

      /**
       * Get the size of the template cache
       * @returns {number} The number of templates in the cache
       */
      size: function () {
        return Object.keys(_state.templateCache).length;
      },
    },

    /**
     * @function init
     * @param {HTMLElement} [element=document] - Root element to initialize
     * @param {Object} [options={ render: true }] - Initialization options
     * @returns {FlowPlaterObj} The FlowPlater instance
     * @description Initializes FlowPlater functionality for the given element or entire document.
     * Processes templates, loads configuration, and sets up event handling.
     */
    init: function (element = document, options = { render: true }) {
      Performance.start("init");
      Debug.log(Debug.levels.INFO, "Initializing FlowPlater...");

      // Process any templates on the page
      const templates = document.querySelectorAll("[fp-template]");
      templates.forEach((template) => {
        let templateId = template.getAttribute("fp-template");
        if (templateId === "self" || templateId === "") {
          templateId = template.id;
        }

        if (templateId) {
          // Transform template content before compiling
          // template.innerHTML = template.innerHTML.replace(/\[\[(.*?)\]\]/g, "{{$1}}");
          const templateElement = document.querySelector(templateId);
          if (templateElement) {
            log("replacing template content", templateElement);

            const scriptTags = templateElement.getElementsByTagName("script");
            const scriptContents = Array.from(scriptTags).map(
              (script) => script.innerHTML,
            );

            // Temporarily replace script contents with placeholders
            Array.from(scriptTags).forEach((script, i) => {
              script.innerHTML = `##FP_SCRIPT_${i}##`;
            });

            // Do the replacement on the template
            templateElement.innerHTML = templateElement.innerHTML.replace(
              /\[\[(.*?)\]\]/g,
              "{{$1}}",
            );

            // Restore script contents
            Array.from(templateElement.getElementsByTagName("script")).forEach(
              (script, i) => {
                script.innerHTML = scriptContents[i];
              },
            );
          }

          // Compile the template using the templateId from the attribute
          compileTemplate(templateId, true);

          // Only render if options.render is true AND element doesn't have HTMX/FP methods
          if (options.render) {
            // Enhanced method detection - check for any fp- or hx- attribute that would trigger requests
            const methods = ["get", "post", "put", "patch", "delete"];

            // More comprehensive check for request-triggering attributes
            let hasRequestMethod = false;

            // Check for specific HTTP method attributes
            hasRequestMethod = methods.some(
              (method) =>
                template.hasAttribute(`hx-${method}`) ||
                template.hasAttribute(`fp-${method}`),
            );

            // Also check for other trigger attributes that would cause loading
            if (!hasRequestMethod) {
              // Check for any attribute that would trigger an HTTP request
              const httpTriggerAttributes = [
                "hx-trigger",
                "fp-trigger",
                "hx-boost",
                "fp-boost",
                "hx-ws",
                "fp-ws",
                "hx-sse",
                "fp-sse",
              ];

              hasRequestMethod = httpTriggerAttributes.some((attr) =>
                template.hasAttribute(attr),
              );
            }

            Debug.log(
              Debug.levels.DEBUG,
              `[Template ${templateId}] Has request method: ${hasRequestMethod}`,
              template,
            );

            // Create/update instance with template regardless of render decision
            // Important: skipRender should be true when hasRequestMethod is true
            render({
              template: templateId,
              data: {},
              target: template,
              skipRender: hasRequestMethod, // Skip render if has HTMX/FP methods
            });

            // If has HTMX methods, check for stored data
            if (hasRequestMethod && _state.config?.storage?.enabled) {
              const instanceName =
                template.getAttribute("fp-instance") || template.id || templateId;
              const storedData = loadFromLocalStorage(instanceName, "instance");
              if (storedData) {
                Debug.log(
                  Debug.levels.INFO,
                  `Found stored data for instance: ${instanceName}, rendering with stored data`,
                );
                // Instead of directly setting data, use render with the stored data
                // This ensures proper rendering with the stored data
                render({
                  template: templateId,
                  data: storedData,
                  target: template,
                  instanceName: instanceName,
                  skipRender: false, // Explicitly render with stored data
                  isStoredDataRender: true, // Flag to bypass redundant init check
                });
              } else {
                Debug.log(
                  Debug.levels.DEBUG,
                  `Skipping initial render for instance: ${instanceName} - no stored data found`,
                );
              }
            }
          }
        } else {
          errorLog$1(
            `No template ID found for element: ${template.id}`,
            template,
            "Make sure your template has an ID attribute",
          );
        }
      });

      process(element);
      Debug.log(Debug.levels.INFO, "FlowPlater initialized successfully");
      Performance.end("init");

      // Set initialized flag
      _state.initialized = true;

      EventSystem.publish("initialized");

      // Execute initComplete hook after everything is done
      this.PluginManager.executeHook("initComplete", this, _state.instances);
      return this;
    },

    /**
     * @function cleanup
     * @param {string} [instanceName] - Name of instance to clean up
     * @returns {FlowPlaterObj} The FlowPlater instance
     * @description Cleans up FlowPlater instances and their associated resources.
     * If no instanceName is provided, cleans up all instances.
     */
    cleanup: function (instanceName) {
      if (instanceName) {
        const instance = _state.instances[instanceName];
        if (instance) {
          // Clean up preload listeners
          instance.elements.forEach((element) => {
            if (element._preloadCleanup) {
              element._preloadCleanup();
            }
            // Remove DOM event listeners
            element.removeEventListeners();
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

    /**
     * @function config
     * @param {FlowPlaterConfig} [newConfig={}] - Configuration options to apply
     * @returns {FlowPlaterObj} The FlowPlater instance
     * @description Configures FlowPlater with new settings. Deep merges with existing configuration.
     */
    config: function (newConfig = {}) {
      // Handle storage shorthand configuration
      if ("storage" in newConfig) {
        newConfig.storage = normalizeStorageConfig(
          newConfig.storage,
          defaultConfig.storage,
        );
      }

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
      ProcessingChain.FP_SELECTOR = _state.config.selectors.fp;

      // Configure HTMX defaults if needed
      if (typeof htmx !== "undefined") {
        htmx.config.timeout = _state.config.htmx.timeout;
        htmx.config.defaultSwapStyle = _state.config.htmx.swapStyle;
        htmx.config.selfRequestsOnly = _state.config.htmx.selfRequestsOnly;
      }

      // Set custom tags
      if (newConfig.customTags) {
        setCustomTags(newConfig.customTags);
      }

      Debug.log(Debug.levels.INFO, "FlowPlater configured with:", _state.config);

      return this;
    },

    /**
     * Get the current configuration
     * @returns {Object} The current configuration
     */
    getConfig: function () {
      return JSON.parse(JSON.stringify(_state.config));
    },

    /**
     * Register a Handlebars helper
     * @param {string} name - The name of the helper
     * @param {Function} helperFn - The helper function
     * @returns {FlowPlaterObj} The FlowPlater instance
     * @description Registers a new Handlebars helper and clears the template cache
     * to ensure all templates are recompiled with the new helper.
     */
    registerHelper: function (name, helperFn) {
      // Register the helper with Handlebars
      Handlebars.registerHelper(name, helperFn);

      // Clear the template cache to ensure all templates are recompiled
      this.templateCache.clear();

      // Clear compiled templates stored in instances
      Object.keys(_state.instances).forEach((instanceName) => {
        const instance = _state.instances[instanceName];
        if (instance.templateId) {
          // Recompile the template for this instance
          instance.template = compileTemplate(instance.templateId, true);
        }
      });

      // Log the registration
      Debug.log(Debug.levels.INFO, `Registered Handlebars helper: ${name}`);

      return this;
    },

    /**
     * Destroy the FlowPlater instance
     * @description Cleans up all instances and their associated resources.
     * Also clears the template cache and event listeners.
     */
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

    /**
     * @function create
     * @param {string} instanceName - Name or selector for the new instance
     * @param {Object} [options={ refresh: true }] - Creation options
     * @returns {Object} The created FlowPlater instance
     * @throws {FlowPlaterError} If element cannot be found or instance creation fails
     * @description Creates a new FlowPlater instance for the specified element.
     */
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

      // Execute newInstance hook
      this.PluginManager.executeHook("newInstance", instance);

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

  /**
   * Normalizes storage configuration to a standard format
   * @param {boolean|number|Object} storageConfig - The storage configuration value
   * @param {Object} defaultStorageConfig - The default storage configuration
   * @returns {Object} Normalized storage configuration
   */
  function normalizeStorageConfig(storageConfig, defaultStorageConfig) {
    if (typeof storageConfig === "boolean") {
      return {
        enabled: storageConfig,
        ttl: defaultStorageConfig.ttl,
      };
    }
    if (typeof storageConfig === "number") {
      // Handle special cases
      if (storageConfig === -1) {
        return {
          enabled: true,
          ttl: -1, // Infinite TTL
        };
      }
      return {
        enabled: storageConfig > 0,
        ttl: storageConfig > 0 ? storageConfig : defaultStorageConfig.ttl,
      };
    }
    return storageConfig; // Already an object or undefined
  }

  // Initialize configuration once, combining default and meta tag configs
  let finalConfig = JSON.parse(JSON.stringify(defaultConfig));
  const metaElement = document.querySelector('meta[name="fp-config"]');
  if (metaElement) {
    try {
      const metaConfig = JSON.parse(metaElement.content);

      // Handle storage shorthand configuration
      if ("storage" in metaConfig) {
        metaConfig.storage = normalizeStorageConfig(
          metaConfig.storage,
          defaultConfig.storage,
        );
      }

      finalConfig = {
        ...finalConfig,
        ...metaConfig,
      };
    } catch (e) {
      errorLog$1(
        "Error parsing fp-config meta tag:",
        metaElement,
        "Make sure your meta tag is valid",
      );
    }
  }
  FlowPlaterObj.config(finalConfig);

  EventSystem.publish("loaded");

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                          Auto init                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * @description Automatically initializes FlowPlater when the DOM is ready.
   * Uses a small timeout to ensure proper initialization after other scripts.
   */
  if (document.readyState === "complete" || document.readyState !== "loading") {
    setTimeout(() => {
      try {
        FlowPlater.init();
      } catch (error) {
        errorLog$1("FlowPlater initialization failed:", error);
      }
    }, 1);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(() => {
        try {
          FlowPlater.init();
        } catch (error) {
          errorLog$1("FlowPlater initialization failed:", error);
        }
      }, 1);
    });
  }

  return FlowPlaterObj;

})();
