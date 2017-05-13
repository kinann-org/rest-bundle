/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var bind = __webpack_require__(10);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is a Node Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Node Buffer, otherwise false
 */
function isBuffer(val) {
  return ((typeof Buffer !== 'undefined') && (Buffer.isBuffer) && (Buffer.isBuffer(val)));
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41).Buffer))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(58)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.3.2
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

if (false) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (false) {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    } )); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (false) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (false) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (false) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (false) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (false) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = typeof value === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

var mark;
var measure;

if (false) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (false) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (false) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isDef(last) && isDef(last.text)) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isDef(c.text) && isDef(last) && isDef(last.text)) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            reject(
               false
                ? ("timeout (" + (res.timeout) + "ms)")
                : null
            );
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (false) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && child.data.slot != null) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns
) {
  var res = {};
  for (var i = 0; i < fns.length; i++) {
    res[fns[i][0]] = fns[i][1];
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // remove reference to DOM nodes (prevents leak)
    vm.$options._parentElm = vm.$options._refElm = null;
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (false) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    if (false) {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    if (false) {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = activatedChildren.length = 0;
  has = {};
  if (false) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdateHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdateHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  false
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "production" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = {
  key: 1,
  ref: 1,
  slot: 1
};

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (false) {
      if (isReservedProp[key] || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      "production" !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (false) {
      if (getter === undefined) {
        warn(
          ("No getter function has been defined for computed property \"" + key + "\"."),
          vm
        );
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (false) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (false) {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (false) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (false) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var result = Object.create(null);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (false) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      return
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "production" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (false) {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (false) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (false) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (false) {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (false) {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (false) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    return this.$vnode.ssrContext
  }
});

Vue$3.version = '2.3.2';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (isUndef(value)) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  }
  var res = '';
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(value[i])) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "production" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (false) {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (false) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
        isTrue(oldVnode.isStatic) &&
        vnode.key === oldVnode.key &&
        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (false) {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (false) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (false) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    false
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (false) {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (false) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((isDef(modifiers) && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
      isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (false) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (false) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "production" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (false) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (false) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (false) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (false) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (false) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (false) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (false) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "production" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if (false) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (false) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (false) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
          currentParent.tag === 'textarea' &&
          currentParent.attrsMap.placeholder === text) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (false) {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "production" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (false) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (false) {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (false) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (false) {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (false) {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      false
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  native,
  warn
) {
  var res = native ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if (false
      ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "production" !== 'production' && warn$3(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (
    false
  ) {
    warn$3(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, warn$3)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, warn$3)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if (false) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
}

function genScopedSlot (key, el) {
  return "[" + key + ",function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}]"
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
        el$1.for &&
        el$1.tag !== 'template' &&
        el$1.tag !== 'slot') {
      return genElement(el$1)
    }
    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

function makeFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompiler (baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile (
    template,
    options
  ) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        );
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    if (false) {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled
  }

  function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    if (false) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (false) {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (false) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (functionCompileCache[key] = res)
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (false) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (false) {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "production" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (false) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (false) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (false) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (false) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["a"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(12)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(31);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(6);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(6);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(48)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(23);
var buildURL = __webpack_require__(26);
var parseHeaders = __webpack_require__(32);
var isURLSameOrigin = __webpack_require__(30);
var createError = __webpack_require__(9);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(25);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("production" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(28);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(22);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(57)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(36),
  /* template */
  __webpack_require__(53),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(59);



__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

const debug = "production" !== 'production';

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
    state: {},
    getters: {
        stateData: function (state) {
            return function (stateType, stateName) {
                var typeData = state[stateType];
                return typeData == null || stateName == null ? typeData : typeData[stateName];
            };
        }
    },
    mutations: {
        registerData: function (state, data) {
            var stateType = data.stateType || "UNKNOWN_stateType";
            state[stateType] || __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].set(state, stateType, {});
            __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].set(state[stateType], data.stateName, data);
            debug && console.log("store.registerData", stateType, data.stateName);
            data.stateId = Object.keys(state[stateType]).length;
        }
    }
}));

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(54)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(35),
  /* template */
  __webpack_require__(51),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*!
* Vuetify v0.11.0
* Forged by John Leider
* Released under the MIT License.
*/   
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vuetify"] = factory();
	else
		root["Vuetify"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 128);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["b"] = createSimpleFunctional;
/* harmony export (immutable) */ exports["a"] = createSimpleTransition;
/* harmony export (immutable) */ exports["f"] = directiveConfig;
/* harmony export (immutable) */ exports["c"] = closestParentTag;
/* harmony export (immutable) */ exports["d"] = addOnceEventListener;
/* unused harmony export browserTransform */
/* harmony export (immutable) */ exports["e"] = debounce;
function createSimpleFunctional (c, el) {
  if ( el === void 0 ) el = 'div';

  return {
    functional: true,

    render: function (h, ref) {
      var data = ref.data;
      var children = ref.children;

      data.staticClass = data.staticClass ? (c + " " + (data.staticClass)) : c

      return h(el, data, children)
    }
  }
}

function createSimpleTransition (name) {
  return {
    functional: true,

    render: function render (h, context) {
      var origin = (context.data.attrs || context.data.props || {}).origin || 'top center 0'
      context.data = context.data || {}
      context.data.props = { name: name }
      context.data.on = context.data.on || {}

      context.data.on.beforeEnter = function (el) {
        el.style.transformOrigin = origin
        el.style.webkitTransformOrigin = origin
      }

      return h('transition', context.data, context.children)
    }
  }
}

function directiveConfig (binding, defaults) {
  if ( defaults === void 0 ) defaults = {};

  return Object.assign({},
    defaults,
    binding.modifiers,
    { value: binding.arg },
    binding.value || {}
  )
}

function closestParentTag (tag) {
  var parent = this.$parent

  while (parent) {
    if (!parent.$options._componentTag) {
      return null
    }

    if (parent.$options._componentTag === tag) {
      return parent
    }

    parent = parent.$parent
  }

  return null
}

function addOnceEventListener (el, event, cb) {
  var once = function () {
    cb()
    el.removeEventListener(event, once, false)
  }

  el.addEventListener(event, once, false)
}

function browserTransform (el, value) {
  [
    'transform',
    'webkitTransform'
  ].forEach(function (i) {
    el.style[i] = value
  })
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `execAsap` is passed, trigger the function on the
// leading edge, instead of the trailing.
//
// Example:
// var calculateLayout = function () { ... }
// window.addEventListner('resize', debounce(calculateLayout, 300)
function debounce (func, threshold, execAsap) {
  var timeout

  return function debounced () {
    var obj = this
    var args = arguments

    function delayed () {
      if (!execAsap) { func.apply(obj, args) }
      timeout = null
    }

    if (timeout) { clearTimeout(timeout) }
    else if (execAsap) { func.apply(obj, args) }

    timeout = setTimeout(delayed, threshold || 100)
  }
}



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data: function data () {
    return {
      isActive: this.value
    }
  },

  props: {
    value: {
      required: false
    }
  },

  watch: {
    value: function value () {
      this.isActive = Boolean(this.value)
    },
    isActive: function isActive () {
      this.$emit('input', this.isActive)
    }
  }
};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

module.exports = function normalizeComponent (
  name,
  scriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  scriptExports = scriptExports || {}

  // ES6 modules interop
  var type = typeof scriptExports.default
  if (type === 'object' || type === 'function') {
    // check named exports
    if (false) {
      if (Object.keys(scriptExports).some(function (key) {
        return key !== 'default' && key !== '__esModule'
      })) {
        console.error('named exports are not supported in *.vue files.')
      }
    }
    scriptExports = scriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // default name option based on filename
  if (options.name == null) {
    options.name = name
  }

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data: function data () {
    return {
      errors: [],
      focused: false,
      tabFocused: false,
      lazyValue: this.value
    }
  },

  props: {
    appendIcon: String,
    appendIconCb: Function,
    dark: Boolean,
    disabled: Boolean,
    hint: String,
    hideDetails: Boolean,
    persistentHint: Boolean,
    label: String,
    light: {
      type: Boolean,
      default: true
    },
    prependIcon: String,
    prependIconCb: Function,
    required: Boolean,
    rules: {
      type: Array,
      default: function () { return []; }
    },
    tabindex: {
      default: 0
    },
    value: {
      required: false
    }
  },

  computed: {
    hasError: function hasError () {
      return this.errors.length !== 0
    },
    inputGroupClasses: function inputGroupClasses () {
      return Object.assign({
        'input-group': true,
        'input-group--focused': this.focused,
        'input-group--dirty': this.isDirty,
        'input-group--tab-focused': this.tabFocused,
        'input-group--disabled': this.disabled,
        'input-group--light': this.light && !this.dark,
        'input-group--dark': this.dark,
        'input-group--error': this.hasError || this.errors.length > 0,
        'input-group--append-icon': this.appendIcon,
        'input-group--prepend-icon': this.prependIcon,
        'input-group--required': this.required,
        'input-group--hide-details': this.hideDetails
      }, this.classes)
    },
    isDirty: function isDirty () {
      return this.inputValue
    },
    modifiers: function modifiers () {
      var modifiers = {
        lazy: false,
        number: false,
        trim: false
      }

      if (!this.$vnode.data.directives) {
        return modifiers
      }

      var model = this.$vnode.data.directives.find(function (i) { return i.name === 'model'; })

      if (!model) {
        return modifiers
      }

      return Object.assign(modifiers, model.modifiers)
    }
  },

  watch: {
    rules: function rules () {
      this.validate()
    }
  },

  mounted: function mounted () {
    this.validate()
  },

  methods: {
    genLabel: function genLabel () {
      return this.$createElement('label', {}, this.label)
    },
    toggle: function toggle () {},
    genMessages: function genMessages () {
      var this$1 = this;

      var messages = []

      if ((this.hint &&
            this.focused ||
            this.hint &&
            this.persistentHint) &&
          this.errors.length === 0
      ) {
        messages = [this.genHint()]
      } else if (this.errors.length) {
        messages = this.errors.map(function (i) { return this$1.genError(i); })
      }

      return this.$createElement(
        'transition-group',
        {
          'class': {
            'input-group__messages': true
          },
          props: {
            tag: 'div',
            name: 'slide-y-transition'
          }
        },
        messages
      )
    },
    genHint: function genHint () {
      return this.$createElement('div', {
        'class': 'input-group__hint',
        key: this.hint
      }, this.hint)
    },
    genError: function genError (error) {
      return this.$createElement(
        'div',
        {
          'class': 'input-group__error',
          key: error
        },
        error
      )
    },
    genIcon: function genIcon (type) {
      var icon = this[(type + "Icon")]
      var cb = this[(type + "IconCb")]
      var hasCallback = typeof cb === 'function'

      return this.$createElement(
        'v-icon',
        {
          'class': ( obj = {
            'input-group__icon-cb': hasCallback
          }, obj[("input-group__" + type + "-icon")] = true, obj ),
          'nativeOn': {
            'click': function (e) {
              hasCallback && cb(e)
            }
          }
        },
        icon
      )
      var obj;
    },
    genInputGroup: function genInputGroup (input, data) {
      var this$1 = this;
      if ( data === void 0 ) data = {};

      var children = []
      var wrapperChildren = []
      var detailsChildren = []

      data = Object.assign({}, {
        'class': this.inputGroupClasses,
        attrs: {
          tabindex: this.tabindex
        },
        on: {
          blur: function () { return (this$1.tabFocused = false); },
          click: function () { return (this$1.tabFocused = false); },
          keyup: function (e) {
            if ([9, 16].includes(e.keyCode)) {
              this$1.tabFocused = true
            }

            if (e.keyCode === 13) {
              this$1.toggle()
            }
          }
        }
      }, data)

      if (this.label) {
        children.push(this.genLabel())
      }

      wrapperChildren.push(input)

      if (this.prependIcon) {
        wrapperChildren.unshift(this.genIcon('prepend'))
      }

      if (this.appendIcon) {
        wrapperChildren.push(this.genIcon('append'))
      }

      children.push(
        this.$createElement('div', {
          'class': 'input-group__input'
        }, wrapperChildren)
      )

      detailsChildren.push(this.genMessages())
      this.counter && detailsChildren.push(this.genCounter())

      children.push(
        this.$createElement('div', {
          'class': 'input-group__details'
        }, detailsChildren)
      )

      return this.$createElement('div', data, children)
    },
    validate: function validate () {
      var this$1 = this;

      this.errors = []

      this.rules.forEach(function (rule) {
        var valid = typeof rule === 'function'
          ? rule(this$1.value)
          : rule

        if (valid !== true) {
          this$1.errors.push(valid)
        }
      })
    }
  }
};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  props: {
    append: Boolean,
    disabled: Boolean,
    exact: Boolean,
    href: [String, Object],
    to: [String, Object],
    nuxt: Boolean,
    replace: Boolean,
    ripple: Boolean,
    router: Boolean,
    tag: String
  },

  methods: {
    click: function click () {},
    generateRouteLink: function generateRouteLink () {
      var exact = this.exact
      var tag
      var options = this.to || this.href

      var data = {
        attrs: {},
        class: this.classes,
        props: {},
        directives: [{
          name: 'ripple',
          value: this.ripple || false
        }]
      }

      if (!this.exact) {
        exact = this.href === '/' ||
          this.to === '/' ||
          (this.href === Object(this.href) && this.href.path === '/') ||
          (this.to === Object(this.to) && this.to.path === '/')
      }

      if (options && this.router) {
        tag = this.nuxt ? 'nuxt-link' : 'router-link'
        data.props.to = options
        data.props.exact = exact
        data.props.activeClass = this.activeClass
        data.props.append = this.append
        data.props.replace = this.replace
        data.nativeOn = { click: this.click }
      } else {
        tag = this.tag || 'a'

        if (tag === 'a') {
          data.attrs.href = options || 'javascript:;'
        }

        data.on = { click: this.click }
      }

      return { tag: tag, data: data }
    }
  }
};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  props: {
    primary: Boolean,
    secondary: Boolean,
    success: Boolean,
    info: Boolean,
    warning: Boolean,
    error: Boolean
  }
};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contextualable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input__ = __webpack_require__(3);



/* harmony default export */ exports["a"] = {
  mixins: [__WEBPACK_IMPORTED_MODULE_0__contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */]],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    inputValue: [Array, Boolean, String],
    falseValue: String,
    trueValue: String
  },

  computed: {
    isActive: function isActive () {
      if ((Array.isArray(this.inputValue))
      ) {
        return this.inputValue.indexOf(this.value) !== -1
      }

      if (!this.trueValue || !this.falseValue) {
        return this.value
          ? this.value === this.inputValue
          : Boolean(this.inputValue)
      }

      return this.inputValue === this.trueValue
    }
  },

  watch: {
    indeterminate: function indeterminate (val) {
      this.inputDeterminate = val
    }
  },

  methods: {
    genLabel: function genLabel () {
      return this.$createElement('label', { on: { click: this.toggle }}, this.label)
    },
    toggle: function toggle () {
      if (this.disabled) {
        return
      }

      var input = this.inputValue
      if (Array.isArray(input)) {
        var i = input.indexOf(this.value)

        if (i === -1) {
          input.push(this.value)
        } else {
          input.splice(i, 1)
        }
      } else if (this.trueValue || this.falseValue) {
        input = input === this.trueValue ? this.falseValue : this.trueValue
      } else if (this.value) {
        input = this.value === this.inputValue
          ? null
          : this.value
      } else {
        input = !input
      }

      this.$emit('change', input)
    }
  }
};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


/* harmony default export */ exports["a"] = {
  methods: {
    enter: function enter (el, done) {
      el.style.overflow = 'hidden'
      el.style.height = null
      el.style.display = 'block'
      var height = (el.clientHeight) + "px"
      el.style.height = 0

      setTimeout(function () {
        el.style.height = height
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* addOnceEventListener */])(el, 'transitionend', done)
      }, 50)
    },
    afterEnter: function afterEnter (el) {
      el.style.height = 'auto'
      el.style.overflow = null
    },
    leave: function leave (el, done) {
      el.style.overflow = 'hidden'
      el.style.height = (el.clientHeight) + "px"
      
      setTimeout(function () { return el.style.height = 0; }, 0)

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* addOnceEventListener */])(el, 'transitionend', done)
    }
  }
};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data: function data () {
    return {
      isSaving: false
    }
  },

  props: {
    actions: Boolean,
    dark: Boolean,
    landscape: Boolean,
    noTitle: Boolean,
    scrollable: Boolean,
    value: {
      required: true
    }
  },

  methods: {
    save: function save () {},
    cancel: function cancel () {},
    genSlot: function genSlot () {
      return this.$scopedSlots.default({
        save: this.save,
        cancel: this.cancel
      })
    }
  }
};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alerts_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_index__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__avatars_index__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__breadcrumbs_index__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__buttons_index__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cards_index__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__carousel_index__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__chips_index__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pickers_index__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dialogs_index__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dividers_index__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__expansion_panel_index__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__footer_index__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__forms_index__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__grid_index__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__icons_index__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__lists_index__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__menus_index__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__toolbar_index__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__overlay_index__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pagination_index__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__parallax_index__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__progress_index__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__selects_index__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__sidebar_index__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__sliders_index__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__subheaders_index__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__steppers_index__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__tables_index__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__tabs_index__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__transitions_index__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__snackbars_index__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__bottom_nav_index__ = __webpack_require__(19);


































/* harmony default export */ exports["a"] = Object.assign({},
  __WEBPACK_IMPORTED_MODULE_0__alerts_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__app_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_2__avatars_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_3__breadcrumbs_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_4__buttons_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_5__cards_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_6__carousel_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_7__chips_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_8__pickers_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_9__dialogs_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_10__dividers_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_11__expansion_panel_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_12__footer_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_13__forms_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_14__grid_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_15__icons_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_16__lists_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_17__menus_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_18__toolbar_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_19__overlay_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_20__pagination_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_21__parallax_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_22__progress_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_23__selects_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_24__sidebar_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_25__sliders_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_26__subheaders_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_27__steppers_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_28__tables_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_29__tabs_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_30__transitions_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_31__snackbars_index__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_32__bottom_nav_index__["a" /* default */]
);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__badge__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__click_outside__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ripple__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tooltip__ = __webpack_require__(98);





/* harmony default export */ exports["a"] = {
  Badge: __WEBPACK_IMPORTED_MODULE_0__badge__["a" /* default */],
  ClickOutside: __WEBPACK_IMPORTED_MODULE_1__click_outside__["a" /* default */],
  Ripple: __WEBPACK_IMPORTED_MODULE_2__ripple__["a" /* default */],
  Tooltip: __WEBPACK_IMPORTED_MODULE_3__tooltip__["a" /* default */]
};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
function load (cb) {
  if (document.readyState === 'complete') {
    return setTimeout(cb, 0)
  }

  if (document.readyState === 'interactive') {
    return setTimeout(function () { return load(cb); }, 150)
  }

  document.addEventListener('DOMContentLoaded', cb)
}

/* harmony default export */ exports["a"] = load;


/***/ },
/* 12 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__ = __webpack_require__(1);


/* harmony default export */ exports["a"] = {
  name: 'alert',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__["a" /* default */]],

  props: {
    dismissible: Boolean,
    error: Boolean,
    hideIcon: Boolean,
    icon: String,
    info: Boolean,
    success: Boolean,
    warning: Boolean
  },

  computed: {
    classes: function classes () {
      return {
        'alert': true,
        'alert--dismissible': this.dismissible,
        'alert--error': this.error,
        'alert--info': this.info,
        'alert--success': this.success,
        'alert--warning': this.warning
      }
    },

    mdIcon: function mdIcon () {
      switch (true) {
        case Boolean(this.icon):
          return this.icon
        case this.error:
          return 'warning'
        case this.info:
          return 'info'
        case this.success:
          return 'check_circle'
        case this.warning:
          return 'priority_high'
      }
    }
  },

  render: function render (h) {
    var this$1 = this;

    var children = [h('div', this.$slots.default)]

    if (!this.hideIcon) {
      children.unshift(h('v-icon', {
        'class': 'alert__icon'
      }, this.mdIcon))
    }

    if (this.dismissible) {
      children.push(h('a', {
        'class': 'alert__dismissible',
        domProps: { href: 'javascript:;' },
        on: {
          click: function () { return (this$1.$emit('input', false)); }
        }
      }, [
        h('v-icon', { props: { right: true }}, 'cancel')
      ]))
    }

    return h('div', {
      'class': this.classes,
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }, children)
  }
};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Alert__ = __webpack_require__(13);


/* harmony default export */ exports["a"] = {
  Alert: __WEBPACK_IMPORTED_MODULE_0__Alert__["a" /* default */]
};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  functional: true,

  props: {
    footer: Boolean,
    leftFixedSidebar: Boolean,
    leftSidebar: Boolean,
    id: {
      type: String,
      default: 'app'
    },
    rightFixedSidebar: Boolean,
    rightSidebar: Boolean,
    topFixedToolbar: Boolean,
    topToolbar: Boolean,
    sidebarUnderToolbar: Boolean
  },

  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;

    data.staticClass = data.staticClass ? ("with " + (data.staticClass) + " ") : 'with '

    var classes = {
      'left-fixed-sidebar': props.leftFixedSidebar,
      'left-sidebar': props.leftSidebar,
      'bottom-footer': props.footer,
      'right-fixed-sidebar': props.rightFixedSidebar,
      'right-sidebar': props.rightSidebar,
      'top-fixed-toolbar': props.topFixedToolbar,
      'top-toolbar': props.topToolbar,
      'sidebar-under-toolbar': props.sidebarUnderToolbar
    }

    data.staticClass += Object.keys(classes).filter(function (k) { return classes[k]; }).join(' ')

    data.attrs = { 'data-app': true }
    data.domProps = { id: props.id }

    return h('div', data, children)
  }
};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(15);



var AppBar = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('app__bar')

/* harmony default export */ exports["a"] = {
  App: __WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */],
  AppBar: AppBar
};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


var Avatar = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('avatar')

/* harmony default export */ exports["a"] = {
  Avatar: Avatar
};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
  /* harmony default export */ exports["a"] = {
    functional: true,

    props: {
      absolute: Boolean,
      shift: Boolean,
      value: { required: false }
    },

    render: function render (h, ref) {
      var data = ref.data;
      var props = ref.props;
      var children = ref.children;

      data.staticClass = data.staticClass ? ("bottom-nav " + (data.staticClass)) : 'bottom-nav'

      if (props.absolute) { data.staticClass += ' bottom-nav--absolute' }
      if (props.shift) { data.staticClass += ' bottom-nav--shift' }
      if (props.value) { data.staticClass += ' bottom-nav--active' }

      return h('div', data, children)
    }
  };


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BottomNav__ = __webpack_require__(18);


/* harmony default export */ exports["a"] = {
  BottomNav: __WEBPACK_IMPORTED_MODULE_0__BottomNav__["a" /* default */]
};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'breadcrumbs',

  props: {
    divider: {
      type: String,
      default: '/'
    },
    icons: Boolean
  },

  computed: {
    classes: function classes () {
      return {
        'breadcrumbs': true,
        'breadcrumbs--with-icons': this.icons
      }
    }
  },

  mounted: function mounted () {
    this.$vuetify.load(this.init)
  },

  methods: {
    init: function init () {
      var this$1 = this;

      this.$children.forEach(function (i) { return (i.$el.dataset.divider = this$1.divider); })
    }
  },

  render: function render (h) {
    return h('ul', {
      'class': this.classes,
      props: { items: this.items }
    }, this.$slots.default)
  }
};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'breadcrumbs-item',

  props: {
    disabled: Boolean,
    href: {
      type: String,
      default: 'javascript:;'
    },
    target: String
  },

  computed: {
    classes: function classes () {
      return {
        'breadcrumbs__item': true,
        'breadcrumbs__item--disabled': this.disabled
      }
    }
  },

  render: function render (h) {
    return h('li', {}, [
      h('a', {
        'class': this.classes,
        domProps: {
          href: this.href,
          target: this.target
        }
      }, this.$slots.default)
    ])
  }
};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Breadcrumbs__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BreadcrumbsItem__ = __webpack_require__(21);



/* harmony default export */ exports["a"] = {
  Breadcrumbs: __WEBPACK_IMPORTED_MODULE_0__Breadcrumbs__["a" /* default */],
  BreadcrumbsItem: __WEBPACK_IMPORTED_MODULE_1__BreadcrumbsItem__["a" /* default */]
};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_route_link__ = __webpack_require__(4);




/* harmony default export */ exports["a"] = {
  name: 'btn',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_route_link__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  props: {
    activeClass: {
      type: String,
      default: 'btn--active'
    },
    block: Boolean,
    dark: Boolean,
    default: Boolean,
    flat: Boolean,
    floating: Boolean,
    icon: Boolean,
    large: Boolean,
    light: Boolean,
    loading: Boolean,
    outline: Boolean,
    raised: {
      type: Boolean,
      default: true
    },
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    round: Boolean,
    small: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    }
  },

  computed: {
    classes: function classes () {
      return {
        'btn': true,
        'btn--active': this.isActive,
        'btn--block': this.block,
        'btn--dark': this.dark,
        'btn--default': this.default,
        'btn--disabled': this.disabled,
        'btn--flat': this.flat,
        'btn--floating': this.floating,
        'btn--icon': this.icon,
        'btn--large': this.large,
        'btn--light': this.light && !this.dark,
        'btn--loader': this.loading,
        'btn--outline': this.outline,
        'btn--raised': this.raised,
        'btn--round': this.round,
        'btn--small': this.small,
        'primary': this.primary && !this.outline,
        'secondary': this.secondary && !this.outline,
        'success': this.success && !this.outline,
        'info': this.info && !this.outline,
        'warning': this.warning && !this.outline,
        'error': this.error && !this.outline,
        'primary--text': this.primary && (this.outline || this.flat),
        'secondary--text': this.secondary && (this.outline || this.flat),
        'success--text': this.success && (this.outline || this.flat),
        'info--text': this.info && (this.outline || this.flat),
        'warning--text': this.warning && (this.outline || this.flat),
        'error--text': this.error && (this.outline || this.flat)
      }
    }
  },

  methods: {
    genContent: function genContent (h) {
      return h('span', { 'class': 'btn__content' }, [this.$slots.default])
    },
    genLoader: function genLoader (h) {
      var children = []

      if (!this.$slots.loader) {
        children.push(h('v-progress-circular', {
          props: {
            indeterminate: true,
            size: 26
          }
        }))
      } else {
        children.push(this.$slots.loader)
      }

      return h('span', { 'class': 'btn__loading' }, children)
    }
  },

  render: function render (h) {
    var ref = this.generateRouteLink();
    var tag = ref.tag;
    var data = ref.data;
    var children = []
    
    if (tag === 'button') {
      data.attrs.type = this.type
    }

    children.push(this.genContent(h))

    if (this.loading) {
      children.push(this.genLoader(h))
    }

    return h(tag, data, children)
  }
};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Button__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonDropdown_vue__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonDropdown_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ButtonDropdown_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonToggle_vue__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonToggle_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ButtonToggle_vue__);




/* harmony default export */ exports["a"] = {
  Btn: __WEBPACK_IMPORTED_MODULE_0__Button__["a" /* default */],
  BtnDropdown: __WEBPACK_IMPORTED_MODULE_1__ButtonDropdown_vue___default.a,
  BtnToggle: __WEBPACK_IMPORTED_MODULE_2__ButtonToggle_vue___default.a
};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  functional: true,

  name: 'card',

  props: {
    height: {
      type: String,
      default: 'auto'
    },
    horizontal: Boolean,
    img: String,
    hover: Boolean,
    raised: Boolean
  },

  render: function render (h, ref) {
    var data = ref.data;
    var props = ref.props;
    var children = ref.children;
    var style = ref.style;

    data.staticClass = data.staticClass ? ("card " + (data.staticClass)) : 'card'
    data.style = style || {}
    data.style.height = props.height
    if (props.horizontal) { data.staticClass += ' card--horizontal' }
    if (props.hover) { data.staticClass += ' card--hover' }
    if (props.raised) { data.staticClass += ' card--raised' }

    if (props.img) {
      data.style.background = "url(" + (props.img) + ") center center / cover no-repeat"
    }

    return h('div', data, children)
  }
};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'card-row',

  props: {
    actions: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    img: String,
    stackedActions: Boolean
  },

  computed: {
    classes: function classes () {
      return {
        'card__row': true,
        'card__row--actions': this.actions,
        'card__row--actions-stacked': this.stackedActions,
      }
    },

    styles: function styles () {
      var styles = {
        height: this.height
      }

      if (this.img) {
        styles.background = "url(" + (this.img) + ") center center / cover no-repeat"
      }

      return styles
    }
  },

  render: function render (h) {
    var data = {
      'class': this.classes,
      style: this.styles
    }

    if (this.actions) { data.ref = 'actions' }

    return h('div', data, this.$slots.default)
  }
};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Card__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CardRow__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_helpers__ = __webpack_require__(0);




var CardColumn = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["b" /* createSimpleFunctional */])('card__column')
var CardText = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["b" /* createSimpleFunctional */])('card__text')
var CardTitle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["b" /* createSimpleFunctional */])('card__title')

/* harmony default export */ exports["a"] = {
  Card: __WEBPACK_IMPORTED_MODULE_0__Card__["a" /* default */],
  CardRow: __WEBPACK_IMPORTED_MODULE_1__CardRow__["a" /* default */],
  CardColumn: CardColumn,
  CardText: CardText,
  CardTitle: CardTitle
};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Carousel_vue__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Carousel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Carousel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CarouselItem_vue__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CarouselItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__CarouselItem_vue__);



/* harmony default export */ exports["a"] = {
  Carousel: __WEBPACK_IMPORTED_MODULE_0__Carousel_vue___default.a,
  CarouselItem: __WEBPACK_IMPORTED_MODULE_1__CarouselItem_vue___default.a
};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__ = __webpack_require__(1);


/* harmony default export */ exports["a"] = {
  name: 'chip',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__["a" /* default */]],

  props: {
    close: Boolean,
    label: Boolean,
    outline: Boolean,
    small: Boolean,
    value: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes: function classes () {
      return {
        'chip': true,
        'chip--label': this.label,
        'chip--outline': this.outline,
        'chip--small': this.small,
        'chip--removable': this.close
      }
    }
  },

  render: function render (h) {
    var this$1 = this;

    var children = [this.$slots.default]
    var data = {
      'class': this.classes,
      attrs: {
        tabindex: -1
      },
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }

    if (this.close) {
      var icon = h('v-icon', { props: { right: true }}, 'cancel')

      children.push(h('a', {
        'class': 'chip__close',
        domProps: {
          href: 'javascript:;'
        },
        on: {
          click: function (e) {
            e.preventDefault()

            this$1.$emit('input', false)
          }
        }
      }, [icon]))
    }

    return h('span', data, children)
  }
};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Chip__ = __webpack_require__(29);


/* harmony default export */ exports["a"] = {
  Chip: __WEBPACK_IMPORTED_MODULE_0__Chip__["a" /* default */]
};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_bootable__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(1);



/* harmony default export */ exports["a"] = {
  name: 'dialog',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  props: {
    persistent: Boolean,
    fullscreen: Boolean,
    lazy: Boolean,
    overlay: {
      type: Boolean,
      default: true
    },
    origin: {
      type: String,
      default: 'center center'
    },
    width: {
      type: [String, Number],
      default: 290
    },
    scrollable: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'v-dialog-transition'
    }
  },

  computed: {
    classes: function classes () {
      return {
        'dialog': true,
        'dialog--active': this.isActive,
        'dialog--persistent': this.persistent,
        'dialog--fullscreen': this.fullscreen,
        'dialog--stacked-actions': this.stackedActions && !this.fullscreen,
        'dialog--scrollable': this.scrollable
      }
    },
    computedTransition: function computedTransition () {
      return !this.transition
        ? 'transition'
        : this.transition
    }
  },

  methods: {
    closeConditional: function closeConditional (e) {
      // close dialog if !persistent and clicked outside
      return !this.persistent
    }
  },

  render: function render (h) {
    var this$1 = this;

    var children = []
    var data = {
      'class': this.classes,
      ref: 'dialog',
      directives: [
        { name: 'click-outside', value: this.closeConditional },
        { name: 'show', value: this.isActive }
      ]
    }

    if (!this.fullscreen) {
      data.style = {
        width: isNaN(this.width) ? this.width : ((this.width) + "px")
      }
    }

    if (this.$slots.activator) {
      children.push(h('div', {
        'class': 'dialog__activator',
        on: {
          click: function (e) {
            e.stopPropagation()
            this$1.isActive = !this$1.isActive
          }
        }
      }, [this.$slots.activator]))
    }

    var dialog = h(this.computedTransition, {
      props: { origin: this.origin }
    }, [h('div', data, [this.$slots.default])])

    if (this.overlay) {
      dialog = h('v-overlay', {
        props: { value: this.isActive }
      }, [dialog])
    }

    children.push(dialog)

    return h('div', {
      'class': 'dialog__container'
    }, children)
  }
};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dialog__ = __webpack_require__(31);


/* harmony default export */ exports["a"] = {
  Dialog: __WEBPACK_IMPORTED_MODULE_0__Dialog__["a" /* default */]
};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var Divider = {
  functional: true,

  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;

    data.staticClass = data.staticClass ? ("divider " + (data.staticClass)) : 'divider'

    if (data.attrs) {
      if ('inset' in data.attrs) { data.staticClass += ' divider--inset' }
      if ('light' in data.attrs) { data.staticClass += ' divider--light' }
    }

    return h('hr', data)
  }
}

/* harmony default export */ exports["a"] = {
  Divider: Divider
};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'expansion-panel',

  props: {
    expand: Boolean
  },

  computed: {
    params: function params () {
      return {
        expand: this.expand
      }
    }
  },

  render: function render (h) {
    return h('ul', {
      'class': 'expansion-panel'
    }, this.$slots.default)
  }
};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ExpansionPanel__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ExpansionPanelContent_vue__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ExpansionPanelContent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ExpansionPanelContent_vue__);



/* harmony default export */ exports["a"] = {
  ExpansionPanel: __WEBPACK_IMPORTED_MODULE_0__ExpansionPanel__["a" /* default */],
  ExpansionPanelContent: __WEBPACK_IMPORTED_MODULE_1__ExpansionPanelContent_vue___default.a
};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


var Footer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('footer', 'footer')

/* harmony default export */ exports["a"] = {
  Footer: Footer
};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_checkbox__ = __webpack_require__(6);


/* harmony default export */ exports["a"] = {
  name: 'checkbox',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_checkbox__["a" /* default */]],

  data: function data () {
    return {
      inputDeterminate: this.indeterminate
    }
  },

  props: {
    indeterminate: Boolean
  },

  computed: {
    classes: function classes () {
      return {
        'checkbox': true,
        'input-group--selection-controls': true,
        'input-group--active': this.isActive,
        'primary--text': this.primary,
        'secondary--text': this.secondary,
        'error--text': this.error,
        'success--text': this.success,
        'info--text': this.info,
        'warning--text': this.warning
      }
    },
    icon: function icon () {
      if (this.inputDeterminate) {
        return 'indeterminate_check_box'
      } else if (this.isActive) {
        return 'check_box'
      } else {
        return 'check_box_outline_blank'
      }
    }
  },

  render: function render (h) {
    var transition = h('v-fade-transition', [
      h('v-icon', {
        'class': {
          'icon--checkbox': this.icon === 'check_box'
        },
        key: this.icon
      }, this.icon)
    ])

    var ripple = h('div', {
      'class': 'input-group--selection-controls__ripple',
      on: { click: this.toggle },
      directives: [{
        name: 'ripple',
        value: { center: true }
      }]
    })

    return this.genInputGroup([transition, ripple])
  }
};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_input__ = __webpack_require__(3);



/* harmony default export */ exports["a"] = {
  name: 'radio',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_input__["a" /* default */]],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    inputValue: [String, Number]
  },

  computed: {
    isActive: function isActive () {
      return this.inputValue === this.value
    },
    classes: function classes () {
      return {
        'radio': true,
        'input-group--selection-controls': true,
        'input-group--active': this.isActive,
        'primary--text': this.primary,
        'secondary--text': this.secondary,
        'error--text': this.error,
        'success--text': this.success,
        'info--text': this.info,
        'warning--text': this.warning
      }
    },

    icon: function icon () {
      return this.isActive ? 'radio_button_checked' : 'radio_button_unchecked'
    }
  },

  methods: {
    genLabel: function genLabel () {
      return this.$createElement('label', { on: { click: this.toggle }}, this.label)
    },
    toggle: function toggle () {
      if (!this.disabled) {
        this.$emit('change', this.value)
      }
    }
  },

  render: function render (h) {
    var transition = h('v-fade-transition', {}, [
      h('v-icon', {
        'class': {
          'icon--radio': this.isActive
        },
        key: this.icon
      }, this.icon)
    ])

    var ripple = h('div', {
      'class': 'input-group--selection-controls__ripple',
      on: { click: this.toggle },
      directives: [
        {
          name: 'ripple',
          value: { center: true }
        }
      ]
    })

    return this.genInputGroup([transition, ripple])
  }
};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_checkbox__ = __webpack_require__(6);


/* harmony default export */ exports["a"] = {
  name: 'switch',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_checkbox__["a" /* default */]],

  computed: {
    classes: function classes () {
      return {
        'input-group--selection-controls switch': true
      }
    },
    rippleClasses: function rippleClasses () {
      return {
        'input-group--selection-controls__ripple': true,
        'input-group--selection-controls__ripple--active': this.isActive
      }
    },
    containerClasses: function containerClasses () {
      return {
        'input-group--selection-controls__container': true,
        'input-group--selection-controls__container--light': this.light,
        'input-group--selection-controls__container--dark': this.dark,
        'input-group--selection-controls__container--disabled': this.disabled,
        'primary--text': this.primary,
        'secondary--text': this.secondary,
        'error--text': this.error,
        'success--text': this.success,
        'info--text': this.info,
        'warning--text': this.warning
      }
    },
    toggleClasses: function toggleClasses () {
      return {
        'input-group--selection-controls__toggle': true,
        'input-group--selection-controls__toggle--active': this.isActive
      }
    }
  },

  render: function render (h) {
    var ripple = h('div', {
      'class': this.rippleClasses,
      on: { click: this.toggle },
      directives: [
        {
          name: 'ripple',
          value: { center: true }
        }
      ]
    })

    var container = h('div', {
      'class': this.containerClasses
    }, [
      h('div', { 'class': this.toggleClasses }),
      ripple
    ])

    return this.genInputGroup([
      container,
      h('label', { on: { click: this.toggle }}, this.label)
    ])
  }
};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(3);


/* harmony default export */ exports["a"] = {
  name: 'text-field',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */]],

  data: function data () {
    return {
      hasFocused: false,
      inputHeight: null
    }
  },

  computed: {
    classes: function classes () {
      return {
        'input-group--text-field': true,
        'input-group--single-line': this.singleLine,
        'input-group--multi-line': this.multiLine,
        'input-group--full-width': this.fullWidth
      }
    },
    hasError: function hasError () {
      return this.errors.length !== 0 ||
        !this.counterIsValid() ||
        !this.validateIsValid()
    },
    count: function count () {
      var inputLength = (this.inputValue && this.inputValue.toString() || '').length
      var min = inputLength

      if (this.min !== 0 && inputLength < this.min) {
        min = this.min
      }

      return (min + " / " + (this.max))
    },
    inputValue: {
      get: function get () {
        return this.value
      },
      set: function set (val) {
        if (this.modifiers.trim) {
          val = val.trim()
        }

        if (this.modifiers.number) {
          val = Number(val)
        }

        if (!this.modifiers.lazy) {
          this.$emit('input', val)
        }

        this.lazyValue = val
      }
    },
    isDirty: function isDirty () {
      return this.lazyValue !== null &&
        typeof this.lazyValue !== 'undefined' &&
        this.lazyValue.toString().length > 0
    }
  },

  props: {
    autofocus: Boolean,
    autoGrow: Boolean,
    counter: Boolean,
    fullWidth: Boolean,
    maxlength: [Number, String],
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 25
    },
    multiLine: Boolean,
    singleLine: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    readonly: Boolean,
    rows: {
      default: 5
    }
  },

  watch: {
    focused: function focused () {
      this.hasFocused = true

      if (!this.focused) {
        this.$emit('blur')
        this.$emit('change', this.lazyValue)
      } else {
        this.$emit('focus')
      }
    },
    value: function value () {
      this.lazyValue = this.value
      this.validate()
      this.multiLine && this.autoGrow && this.calculateInputHeight()
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$vuetify.load(function () {
      this$1.multiLine && this$1.autoGrow && this$1.calculateInputHeight()
      this$1.autofocus && this$1.focus()
    })
  },

  methods: {
    calculateInputHeight: function calculateInputHeight () {
      var height = this.$refs.input.scrollHeight
      var minHeight = this.rows * 24
      this.inputHeight = height < minHeight ? minHeight : height
    },
    onInput: function onInput (e) {
      this.inputValue = e.target.value
      this.multiLine && this.autoGrow && this.calculateInputHeight()
    },
    blur: function blur () {
      var this$1 = this;

      this.validate()
      this.$nextTick(function () { return (this$1.focused = false); })
    },
    focus: function focus () {
      this.focused = true
      this.$refs.input.focus()
    },
    genCounter: function genCounter () {
      return this.$createElement('div', {
        'class': {
          'input-group__counter': true,
          'input-group__counter--error': !this.counterIsValid()
        }
      }, this.count)
    },
    genInput: function genInput () {
      var tag = this.multiLine ? 'textarea' : 'input'

      var inputData = {
        style: {
          'height': this.inputHeight && ((this.inputHeight) + "px")
        },
        domProps: {
          disabled: this.disabled,
          required: this.required,
          value: this.lazyValue,
          autofucus: this.autofocus
        },
        attrs: {
          tabindex: this.tabindex,
          readonly: this.readonly
        },
        on: {
          blur: this.blur,
          input: this.onInput,
          focus: this.focus
        },
        ref: 'input'
      }

      if (this.autocomplete) { inputData.domProps.autocomplete = true }
      if (this.name) { inputData.attrs = { name: this.name } }
      if (this.maxlength) { inputData.attrs.maxlength = this.maxlength }

      if (this.multiLine) {
        inputData.domProps.rows = this.rows
      } else {
        inputData.domProps.type = this.type
      }

      return this.$createElement(tag, inputData)
    },
    counterIsValid: function counterIsValid () {
      var val = (this.inputValue && this.inputValue.toString() || '')
      return (!this.counter ||
        (val.length >= this.min && val.length <= this.max)
      )
    },
    validateIsValid: function validateIsValid () {
      return (!this.required ||
        (this.required &&
          this.inputValue) ||
        !this.hasFocused ||
        (this.hasFocused && this.focused))
    }
  },

  render: function render () {
    return this.genInputGroup(this.genInput(), {
      attrs: {
        tabindex: -1
      }
    })
  }
};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Checkbox__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Radio__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Switch__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TextField__ = __webpack_require__(40);





/* harmony default export */ exports["a"] = {
  Checkbox: __WEBPACK_IMPORTED_MODULE_0__Checkbox__["a" /* default */],
  Radio: __WEBPACK_IMPORTED_MODULE_1__Radio__["a" /* default */],
  Switch: __WEBPACK_IMPORTED_MODULE_2__Switch__["a" /* default */],
  TextField: __WEBPACK_IMPORTED_MODULE_3__TextField__["a" /* default */]
};


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


var Col = {
  functional: true,

  render: function (h, ref) {
    var data = ref.data;
    var children = ref.children;

    data.staticClass = data.staticClass ? ("col " + (data.staticClass)) : 'col'
    data.staticClass += " " + (Object.keys(data.attrs).join(' '))
    delete data.attrs

    return h('div', data, children)
  }
}

var Container = {
  functional: true,

  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;

    var staticClass = data.staticClass ? ("container " + (data.staticClass)) : 'container'

    if (data.attrs && typeof data.attrs.fluid !== 'undefined') {
      staticClass += ' container--fluid'
      data.attrs.fluid = undefined
    }

    data.staticClass = staticClass

    return h('div', data, children)
  }
}

var Content = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('content')
var Row = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('row')
var ColSpacer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('col--spacer')
var Spacer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('spacer')

/* harmony default export */ exports["a"] = {
  Col: Col,
  ColSpacer: ColSpacer,
  Container: Container,
  Content: Content,
  Spacer: Spacer,
  Row: Row
};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'icon',

  props: {
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    xLarge: Boolean
  },

  computed: {
    classes: function classes () {
      return {
        'material-icons icon': true,
        'icon--large': this.large,
        'icon--left': this.left,
        'icon--medium': this.medium,
        'icon--right': this.right,
        'icon--x-large': this.xLarge
      }
    }
  },

  render: function render (h) {
    return h('i', { 'class': this.classes }, this.$slots.default)
  }
};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Icon__ = __webpack_require__(43);


/* harmony default export */ exports["a"] = {
  Icon: __WEBPACK_IMPORTED_MODULE_0__Icon__["a" /* default */]
};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'list',

  data: function data () {
    return {
      uid: null,
      groups: []
    }
  },

  props: {
    dense: Boolean,
    subheader: Boolean,
    threeLine: Boolean,
    twoLine: Boolean
  },

  computed: {
    classes: function classes () {
      return {
        'list': true,
        'list--two-line': this.twoLine,
        'list--dense': this.dense,
        'list--three-line': this.threeLine,
        'list--subheader': this.subheader
      }
    }
  },

  watch: {
    uid: function uid () {
      var this$1 = this;

      this.$children.filter(function (i) { return i.$options._componentTag === 'v-list-group'; }).forEach(function (i) { return i.toggle(this$1.uid); })
    }
  },

  methods: {
    listClick: function listClick (uid, force) {
      if (force) {
        this.uid = uid
      } else {
        this.uid = this.uid === uid ? null : uid
      }
    },

    listClose: function listClose (uid) {
      if (this.uid === uid) {
        this.uid = null
      }
    }
  },

  render: function render (h) {
    var data = {
      'class': this.classes,
      attrs: { 'data-uid': this._uid }
    }

    return h('ul', data, [this.$slots.default])
  }
};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_expand_transition__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(1);




/* harmony default export */ exports["a"] = {
  name: 'list-group',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_expand_transition__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */]],

  data: function data () {
    return {
      isBooted: this.value,
      height: 0
    }
  },

  props: {
    group: String,
    lazy: Boolean,
    noAction: Boolean
  },

  computed: {
    classes: function classes () {
      return {
        'list--group__header': true,
        'list--group__header--active': this.isActive,
        'list--group__header--no-action': this.noAction
      }
    },
    list: function list () {
      return __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* closestParentTag */].call(this, 'v-list')
    },
    styles: function styles () {
      return {
        height: ((this.height) + "px")
      }
    }
  },

  watch: {
    isActive: function isActive () {
      this.isBooted = true

      if (!this.isActive) {
        this.list.listClose(this._uid)
      }
    },
    '$route': function $route (to) {
      var isActive = this.matchRoute(to.path)

      if (this.group) {
        if (isActive && this.isActive !== isActive) {
          this.list.listClick(this._uid)
        }
        this.isActive = isActive
      }
    }
  },

  mounted: function mounted () {
    if (this.group) {
      this.isActive = this.matchRoute(this.$route.path)
    }

    if (this.isActive) {
      this.list.listClick(this._uid)
    }

    this.height = this.$refs.group.scrollHeight
  },

  methods: {
    click: function click () {
      if (!this.$refs.item.querySelector('.list__tile--disabled')) {
        this.list.listClick(this._uid)
      }
    },
    toggle: function toggle (uid) {
      this.isActive = this._uid === uid
    },
    matchRoute: function matchRoute (to) {
      if (!this.group) { return false }
      return to.match(this.group) !== null
    }
  },

  render: function render (h) {
    var group = h('ul', {
      'class': 'list list--group',
      style: this.styles,
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      ref: 'group'
    }, [this.lazy && !this.isBooted ? null : this.$slots.default])

    var item = h('div', {
      'class': this.classes,
      on: { click: this.click },
      ref: 'item'
    }, [this.$slots.item])

    var transition = h('transition', {
      on: {
        enter: this.enter,
        afterEnter: this.afterEnter,
        leave: this.leave
      }
    }, [group])

    return h('div', { 'class': 'list--group__container' }, [item, transition])
  }
};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_route_link__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(1);



/* harmony default export */ exports["a"] = {
  name: 'list-tile',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_route_link__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  props: {
    activeClass: {
      type: String,
      default: 'list__tile--active'
    },
    avatar: Boolean
  },

  computed: {
    classes: function classes () {
      return {
        'list__tile': true,
        'list__tile--active': this.isActive,
        'list__tile--avatar': this.avatar,
        'list__tile--disabled': this.disabled
      }
    }
  },

  render: function render (h) {
    var ref = this.generateRouteLink();
    var tag = ref.tag;
    var data = ref.data;

    return h(tag, data, [this.$slots.default])
  }
};


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  functional: true,

  name: 'list-tile-action',

  render: function render (h, context) {
    var data = {
      'class': {
        'list__tile__action': true,
        'list__tile__action--stack': (context.children || []).length > 1
      }
    }

    return h('div', data, context.children)
  }
};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__List__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ListGroup__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ListTile__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ListTileAction__ = __webpack_require__(48);







var ListItem = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('list__item', 'li')
var ListTileActionText = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('list__tile__action-text', 'span')
var ListTileAvatar = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('list__tile__avatar', 'v-avatar')
var ListTileContent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('list__tile__content', 'div')
var ListTileTitle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('list__tile__title', 'div')
var ListTileSubTitle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('list__tile__sub-title', 'div')

/* harmony default export */ exports["a"] = {
  List: __WEBPACK_IMPORTED_MODULE_1__List__["a" /* default */],
  ListItem: ListItem,
  ListTile: __WEBPACK_IMPORTED_MODULE_3__ListTile__["a" /* default */],
  ListGroup: __WEBPACK_IMPORTED_MODULE_2__ListGroup__["a" /* default */],
  ListTileAction: __WEBPACK_IMPORTED_MODULE_4__ListTileAction__["a" /* default */],
  ListTileActionText: ListTileActionText,
  ListTileAvatar: ListTileAvatar,
  ListTileContent: ListTileContent,
  ListTileTitle: ListTileTitle,
  ListTileSubTitle: ListTileSubTitle
};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_helpers__ = __webpack_require__(0);



/* harmony default export */ exports["a"] = {
  name: 'menu',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__["a" /* default */]],

  data: function data () {
    return {
      window: {},
      windowResizeHandler: function () {},
      dimensions: {
        activator: {
          top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, offsetTop: 0
        },
        content: {
          top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, offsetTop: 0
        },
        list: null,
        selected: null
      },
      direction: { vert: 'bottom', horiz: 'right' },
      position: { left: '0px', top: '0px', right: 'auto', bottom: 'auto' },
      isContentActive: false,
      isBooted: false,
      maxHeightAutoDefault: '200px'
    }
  },

  props: {
    top: Boolean,
    left: Boolean,
    bottom: Boolean,
    right: Boolean,
    auto: Boolean,
    offsetX: Boolean,
    offsetY: Boolean,
    disabled: Boolean,
    maxHeight: {
      default: 'auto'
    },
    nudgeXAuto: {
      type: Number,
      default: -16
    },
    nudgeYAuto: {
      type: Number,
      default: -18
    },
    nudgeTop: {
      type: Number,
      default: 0
    },
    nudgeBottom: {
      type: Number,
      default: 0
    },
    nudgeLeft: {
      type: Number,
      default: 0
    },
    nudgeRight: {
      type: Number,
      default: 0
    },
    nudgeWidth: {
      type: Number,
      default: 0
    },
    openOnClick: {
      type: Boolean,
      default: true
    },
    lazy: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    activator: {
      default: null
    },
    activatorXY: {
      default: null
    },
    origin: {
      type: String,
      default: 'top left'
    },
    transition: {
      type: String,
      default: 'v-menu-transition'
    }
  },

  computed: {
    offset: function offset () {
      var ref = this.dimensions;
      var a = ref.activator;
      var c = ref.content;
      var ref$1 = this;
      var direction = ref$1.direction;
      var offsetX = ref$1.offsetX;
      var offsetY = ref$1.offsetY;
      var auto = ref$1.offsetAuto;
      var ref$2 = this;
      var nt = ref$2.nudgeTop;
      var nb = ref$2.nudgeBottom;
      var nr = ref$2.nudgeRight;
      var nl = ref$2.nudgeLeft;

      var horiz = direction.horiz === 'left'
          ? offsetX ? a.left - c.right + nl : a.right - c.right + auto.horiz
          : offsetX ? a.right - c.left + nr : a.left - c.left + auto.horiz
      var vert = direction.vert === 'top'
          ? offsetY ? a.top - c.bottom + nt : a.bottom - c.bottom + auto.vert
          : offsetY ? a.bottom - c.top + nb : a.top - c.top + auto.vert

      return { horiz: horiz, vert: vert }
    },

    offsetAuto: function offsetAuto () {
      if (!this.auto) { return { horiz: 0, vert: 0 } }
      if (!this.dimensions.selected) { return { horiz: this.nudgeXAuto, vert: this.nudgeYAuto } }

      var ref = this.dimensions;
      var a = ref.activator;
      var c = ref.content;
      var s = ref.selected;
      var list = ref.list;
      var offsetBottom = list.height - s.height - s.offsetTop
      var scrollMiddle = (c.height - s.height) / 2
      var horiz = this.nudgeXAuto
      var vert = (a.height - c.height + this.nudgeYAuto) / 2

      vert += s.offsetTop < scrollMiddle ? scrollMiddle - s.offsetTop : 0
      vert += offsetBottom < scrollMiddle ? offsetBottom - scrollMiddle : 0

      return { horiz: horiz, vert: vert }
    },

    screenDist: function screenDist () {
      var ref = this.dimensions;
      var a = ref.activator;
      var ref$1 = this.window;
      var innerH = ref$1.innerHeight;
      var innerW = ref$1.innerWidth;
      var ref$2 = this;
      var nt = ref$2.nudgeTop;
      var nb = ref$2.nudgeBottom;
      var nr = ref$2.nudgeRight;
      var nl = ref$2.nudgeLeft;
      var dist = {}

      dist.top = this.offsetY ? a.top + nt : a.bottom
      dist.left = this.offsetX ? a.left + nl : a.right
      dist.bottom = this.offsetY ? innerH - a.bottom - nb : innerH - a.top
      dist.right = this.offsetX ? innerW - a.right - nr : innerW - a.left
      dist.horizMax = dist.left > dist.right ? dist.left : dist.right
      dist.horizMaxDir = dist.left > dist.right ? 'left' : 'right'
      dist.vertMax = dist.top > dist.bottom ? dist.top : dist.bottom
      dist.vertMaxDir = dist.top > dist.bottom ? 'top' : 'bottom'

      return dist
    },

    screenOverflow: function screenOverflow () {
      var ref = this.dimensions;
      var c = ref.content;
      var left = c.left + this.offset.horiz
      var top = c.top + this.offset.vert

      var horiz = this.auto && left + c.width > this.window.innerWidth
          ? (left + c.width) - this.window.innerWidth
          : this.auto && left < 0
            ? left
            : 0
      var vert = this.auto && top + c.height > this.window.innerHeight
          ? (top + c.height) - this.window.innerHeight
          : this.auto && top < 0
            ? top
            : 0

      return { horiz: horiz, vert: vert }
    },

    styles: function styles () {
      return {
        top: this.position.top,
        left: this.position.left,
        right: this.position.right,
        bottom: this.position.bottom
      }
    }
  },

  watch: {
    isActive: function isActive (val) {
      this.isBooted = true
      if (val) { this.activate() }
      else { this.isContentActive = false }
    },

    activator: function activator (newActivator, oldActivator) {
      this.removeActivatorEvents(oldActivator)
      this.addActivatorEvents(newActivator)
    },

    activatorXY: function activatorXY (val) {
      this.isActive = true
    }
  },

  mounted: function mounted () {
    this.addActivatorEvents(this.activator)
  },

  beforeDestroy: function beforeDestroy () {
    this.removeActivatorEvents(this.activator)
    window.removeEventListener('resize', this.windowResizeHandler)
  },

  methods: {
    activate: function activate () {
      if (!this.isActive || this.disabled) { return }

      this.initWindow()
      this.setDirection()
      this.updatePosition()
    },

    initWindow: function initWindow () {
      if (this.window === window) { return }

      this.window = window
      this.windowResizeHandler = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_helpers__["e" /* debounce */])(this.activate, 200)
      this.window.addEventListener('resize', this.windowResizeHandler)
    },

    getActivator: function getActivator () {
      var ref = this;
      var $refs = ref.$refs;

      if (this.activator) { return this.activator }
      if (this.activatorXY) { return this.activatorXY }
      return $refs.activator.children ? $refs.activator.children[0] : $refs.activator
    },

    activatorClickHandler: function activatorClickHandler () {
      if (this.disabled) { return }
      else if (this.openOnClick && !this.isActive) { this.isActive = true }
      else if (this.closeOnClick && this.isActive) { this.isActive = false }
    },

    addActivatorEvents: function addActivatorEvents (activator) {
      if ( activator === void 0 ) activator = null;

      if (!activator) { return }
      activator.addEventListener('click', this.activatorClickHandler)
    },

    removeActivatorEvents: function removeActivatorEvents (activator) {
      if ( activator === void 0 ) activator = null;

      if (!activator) { return }
      activator.removeEventListener('click', this.activatorClickHandler)
    },

    setDirection: function setDirection (horiz, vert) {
      if ( horiz === void 0 ) horiz = '';
      if ( vert === void 0 ) vert = '';

      this.direction = {
        horiz: horiz || (this.left && !this.auto ? 'left' : 'right'),
        vert: vert || (this.top && !this.auto ? 'top' : 'bottom')
      }

      this.resetPosition()
    },

    resetPosition: function resetPosition () {
      this.position.top = this.direction.vert === 'top' ? 'auto' : '0px'
      this.position.left = this.direction.horiz === 'left' ? 'auto' : '0px'
      this.position.bottom = this.direction.vert === 'bottom' ? 'auto' : '0px'
      this.position.right = this.direction.horiz === 'right' ? 'auto' : '0px'
    },

    updatePosition: function updatePosition () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.updateDimensions()

        var ref = this$1;
        var offset = ref.offset;
        var screen = ref.screenOverflow;
        var ref$1 = this$1.direction;
        var horiz = ref$1.horiz;
        var vert = ref$1.vert;

        var left = horiz === 'left' ? 'auto' : offset.horiz - screen.horiz + this$1.nudgeLeft
        var top = vert === 'top' ? 'auto' : offset.vert - screen.vert + this$1.nudgeTop
        var right = horiz === 'right' ? 'auto' : -offset.horiz - screen.horiz + this$1.nudgeRight
        var bottom = vert === 'bottom' ? 'auto' : -offset.vert - screen.vert + this$1.nudgeBottom

        var leftSpace = left + this$1.dimensions.content.width
        if (leftSpace > this$1.window.innerWidth) {
          var diff = leftSpace - this$1.window.innerWidth
          left = left - diff - 16
        }

        this$1.position.left = left + "px"
        this$1.position.right = right + "px"
        this$1.position.top = top + "px"
        this$1.position.bottom = bottom + "px"

        var noMoreFlipping = this$1.flip() === false

        if (noMoreFlipping) { this$1.startTransition() }
      })
    },

    updateDimensions: function updateDimensions () {
      var this$1 = this;

      var a = this.getActivator()
      var c = this.$refs.content

      this.sneakPeek(c, function () {
        this$1.updateMaxMin()

        this$1.dimensions = {
          activator: this$1.measure(a),
          content: this$1.measure(c),
          list: this$1.measure(c, '.list'),
          selected: this$1.auto ? this$1.measure(c, '.list__tile--active', 'parent') : null
        }

        this$1.updateScroll()
      })
    },

    updateMaxMin: function updateMaxMin () {
      var ref = this;
      var maxHeight = ref.maxHeight;
      var maxAuto = ref.maxHeightAutoDefault;
      var offsetAuto = ref.offsetAuto;
      var auto = ref.auto;
      var a = this.getActivator()
      var c = this.$refs.content
      var widthAdjust = this.nudgeWidth + Math.abs(offsetAuto.horiz) * 2

      if (!this.activatorXY) {
        c.style.minWidth = (a.getBoundingClientRect().width + widthAdjust) + "px"
      }
      c.style.maxHeight = null  // <-- Todo: Investigate why this fixes rendering.
      c.style.maxHeight = isNaN(maxHeight) ? maxHeight : (maxHeight + "px")
      c.style.maxHeight = maxHeight === null && auto ? maxAuto : c.style.maxHeight
    },

    updateScroll: function updateScroll () {
      if (!this.auto || !this.dimensions.selected) { return }

      var ref = this.dimensions;
      var c = ref.content;
      var s = ref.selected;
      var l = ref.list;
      var scrollMiddle = (c.height - s.height) / 2
      var scrollMax = l.height - c.height
      var offsetTop = s.offsetTop - scrollMiddle

      offsetTop = this.screenOverflow.vert && offsetTop > scrollMax ? scrollMax : offsetTop
      offsetTop = this.screenOverflow.vert && offsetTop < 0 ? 0 : offsetTop
      offsetTop -= this.screenOverflow.vert

      this.$refs.content.scrollTop = offsetTop
    },

    flip: function flip () {
      var ref = this;
      var auto = ref.auto;
      var screenDist = ref.screenDist;
      var ref$1 = this.dimensions;
      var c = ref$1.content;
      var ref$2 = this.direction;
      var horiz = ref$2.horiz;
      var vert = ref$2.vert;
      var flipHoriz = !auto && c.width > screenDist[horiz] ? screenDist.horizMaxDir : horiz
      var flipVert = !auto && c.height > screenDist[vert] ? screenDist.vertMaxDir : vert
      var doFlip = flipHoriz !== horiz || flipVert !== vert

      if (doFlip) {
        this.setDirection(flipHoriz, flipVert)
        this.updatePosition()
      }

      return doFlip
    },

    startTransition: function startTransition () {
      this.$refs.content.offsetHeight // <-- Force DOM to repaint first.
      this.isContentActive = true     // <-- Trigger v-show on content.
    },

    // Render functions
    // ====================

    genActivator: function genActivator (h) {
      var data = {
        ref: 'activator',
        slot: 'activator',
        class: {
          'menu__activator': true
        },
        on: {
          click: this.activatorClickHandler
        }
      }

      return h('div', data, [this.$slots.activator || null])
    },

    genTransition: function genTransition (h) {
      var data = {
        props: {
          origin: this.origin
        }
      }

      return h(this.transition, data, [this.genContent(h)])
    },

    genContent: function genContent (h) {
      var this$1 = this;

      var data = {
        ref: 'content',
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isContentActive
        }],
        'class': { 'menu__content': true },
        on: {
          click: function (e) {
            e.stopPropagation()
            if (this$1.closeOnContentClick) {
              this$1.isActive = false
            }
          }
        }
      }

      return h('div', data, [this.lazy && !this.isBooted ? null : this.$slots.default])
    },

    // Utils
    // ====================

    measure: function measure (el, selector, getParent) {
      if ( getParent === void 0 ) getParent = false;

      el = selector ? el.querySelector(selector) : el
      el = el && getParent ? el.parentElement : el

      if (!el) { return null }
      if (!el.nodeName && el.hasOwnProperty('clientX') && el.hasOwnProperty('clientY')) {
        return {
          top: el.clientY, bottom: el.clientY, left: el.clientX, right: el.clientX,
          width: 0, height: 0, offsetTop: 0
        }
      }

      var ref = el.getBoundingClientRect();
      var top = ref.top;
      var left = ref.left;
      var bottom = ref.bottom;
      var right = ref.right;
      var width = ref.width;
      var height = ref.height;
      return { top: top, left: left, bottom: bottom, right: right, width: width, height: height, offsetTop: el.offsetTop }
    },

    sneakPeek: function sneakPeek (el, cb) {
      var oldOpacity = el.style.opacity
      var oldDisplay = el.style.display

      el.style.opacity = 0
      el.style.display = 'inline-block'
      cb()
      el.style.opacity = oldOpacity
      el.style.display = oldDisplay
    }
  },

  render: function render (h) {
    var this$1 = this;

    var data = {
      'class': {
        'menu': true
      },
      directives: [{
        name: 'click-outside',
        value: function (e) {
          if (!this$1.closeOnClick) { return false }
          var a = this$1.activator
          if (a && (a === e.target || a.contains(e.target))) { return false }
          return true
        }
      }],
      on: {
        'keyup': function (e) { if (e.keyCode === 27) { this$1.isActive = false } }
      }
    }

    return h('div', data, [this.genActivator(h), this.genTransition(h)])
  }
};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Menu_js__ = __webpack_require__(50);


/* harmony default export */ exports["a"] = {
  Menu: __WEBPACK_IMPORTED_MODULE_0__Menu_js__["a" /* default */]
};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var Overlay = {
  functional: true,

  props: {
    value: Boolean
  },

  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    var props = ref.props;

    data.staticClass = data.staticClass ? ("overlay " + (data.staticClass)) : 'overlay'
    if (props.value) { data.staticClass += ' overlay--active' }

    return h('div', data, children)
  }
}

/* harmony default export */ exports["a"] = {
  Overlay: Overlay
};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Pagination_vue__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Pagination_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Pagination_vue__);


/* harmony default export */ exports["a"] = {
  Pagination: __WEBPACK_IMPORTED_MODULE_0__Pagination_vue___default.a
};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Parallax_vue__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Parallax_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Parallax_vue__);


/* harmony default export */ exports["a"] = {
  Parallax: __WEBPACK_IMPORTED_MODULE_0__Parallax_vue___default.a
};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_date_title__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_date_header__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_date_table__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_date_years__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_picker__ = __webpack_require__(8);






/* harmony default export */ exports["a"] = {
  name: 'date-picker',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_date_title__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_date_header__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_date_table__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_date_years__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_picker__["a" /* default */]],

  data: function data () {
    return {
      tableDate: new Date(),
      originalDate: this.value,
      currentDay: null,
      currentMonth: null,
      currentYear: null,
      isSelected: false,
      isReversing: false
    }
  },

  props: {
    dateFormat: {
      type: Function,
      default: function (val) {
        return new Date(val).toISOString().substr(0, 10)
      }
    },
    days: {
      type: Array,
      default: function () { return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; }
    },
    months: {
      type: Array,
      default: function () { return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]; }
    }
  },

  computed: {
    inputDate: {
      get: function get () {
        if (!this.value) { return new Date() }
        if (this.value instanceof Date) { return this.value }
        if (!isNaN(this.value) && this.value.indexOf(':') !== -1) { return new Date(this.value) }

        return new Date(((this.value) + "T12:00:00"))
      },
      set: function set (val) {
        this.$emit('input', val ? this.dateFormat(val) : this.originalDate)
      }
    },
    day: function day () {
      return this.inputDate.getDate()
    },
    month: function month () {
      return this.inputDate.getMonth()
    },
    year: function year () {
      return this.inputDate.getFullYear()
    },
    tableMonth: function tableMonth () {
      return this.tableDate.getMonth()
    },
    tableYear: function tableYear () {
      return this.tableDate.getFullYear()
    },
    dayName: function dayName () {
      return this.inputDate ? this.days[this.inputDate.getDay()] : ''
    },
    monthName: function monthName () {
      return this.inputDate ? this.months[this.month] : ''
    },
    computedTransition: function computedTransition () {
      return this.isReversing ? 'v-tab-reverse-transition' : 'v-tab-transition'
    }
  },

  watch: {
    isSelected: function isSelected (val) {
      var this$1 = this;

      val && this.$nextTick(function () {
        this$1.$refs.years.scrollTop = this$1.$refs.years.scrollHeight / 2 - 125
      })
    },
    tableDate: function tableDate (val, prev) {
      this.isReversing = val < prev
    },
    value: function value (val) {
      if (val) { this.tableDate = this.inputDate }
    }
  },

  methods: {
    save: function save () {
      if (this.originalDate) {
        this.originalDate = this.value
      } else {
        this.inputDate = this.inputDate
        this.originalDate = this.inputDate
      }

      if (this.$parent && this.$parent.isActive) { this.$parent.isActive = false }
    },
    cancel: function cancel () {
      this.inputDate = this.originalDate
      if (this.$parent && this.$parent.isActive) { this.$parent.isActive = false }
    }
  },

  mounted: function mounted () {
    this.currentDay = this.tableDate.getDate()
    this.currentMonth = this.tableDate.getMonth()
    this.currentYear = this.tableDate.getFullYear()
    this.tableDate = this.inputDate
  },

  render: function render (h) {
    var children = []

    !this.noTitle && children.push(this.genTitle())

    if (!this.isSelected) {
      var bodyChildren = []

      bodyChildren.push(this.genHeader())
      bodyChildren.push(this.genTable())

      children.push(h('div', {
        'class': 'picker__body'
      }, bodyChildren))
    } else {
      children.push(this.genYears())
    }

    this.$scopedSlots.default && children.push(this.genSlot())

    return h('v-card', {
      'class': {
        'picker picker--date': true,
        'picker--landscape': this.landscape,
        'picker--dark': this.dark
      }
    }, children)
  }
};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_picker__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_time_title__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_time_body__ = __webpack_require__(62);




/* harmony default export */ exports["a"] = {
  name: 'time-picker',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_picker__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_time_body__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_time_title__["a" /* default */]],

  data: function data () {
    return {
      isDragging: false,
      rotate: 0,
      originalTime: this.value,
      period: 'am',
      selectingHour: true
    }
  },

  props: {
    format: {
      type: String,
      default: 'ampm',
      validator: function validator (val) {
        return ['ampm', '24hr'].includes(val)
      }
    }
  },

  computed: {
    is24hr: function is24hr () {
      return this.format !== 'ampm'
    },
    divider: function divider () {
      if (!this.selectingHour) { return 60 }
      return this.is24hr ? 24 : 12
    },
    degrees: function degrees () {
      return this.degreesPerUnit * Math.PI / 180
    },
    degreesPerUnit: function degreesPerUnit () {
      return 360 / this.divider
    },
    inputTime: {
      get: function get () {
        if (this.value && !(this.value instanceof Date)) { return this.value }
        var value = new Date()

        if (this.value instanceof Date) {
          value = this.value
        }

        var hour = value.getHours()
        var minute = value.getMinutes()
        var period = ''

        if (!this.is24hr) {
          hour = hour > 12 ? hour - 12 : hour
          period = this.period
        }

        return (hour + ":" + minute + period)
      },
      set: function set (val) {
        return this.$emit('input', val)
      }
    },
    timeArray: function timeArray () {
      return this.inputTime.replace(/(am|pm)/, '').split(':')
    },
    hour: {
      get: function get () {
        return parseInt(this.timeArray[0])
      },
      set: function set (val) {
        if (!this.is24hr) {
          val = val > 12 ? val - 12 : val < 1 ? 12 : val
        } else {
          val = val < 10 ? ("0" + val) : val > 23 ? '00' : val
        }

        this.inputTime = val + ":" + (this.minute) + (!this.is24hr ? this.period : '')
      }
    },
    minute: {
      get: function get () {
        var minute = parseInt(this.timeArray[1])

        return minute < 10 ? ("0" + minute) : minute > 59 ? '00' : minute
      },
      set: function set (val) {
        val = val < 10 ? ("0" + (parseInt(val))) : val > 59 ? '00' : val
        var hour = this.hour

        if (this.is24hr && hour < 10) {
          hour = "0" + hour
        }

        this.inputTime = hour + ":" + val + (!this.is24hr ? this.period : '')
      }
    },
    clockHand: function clockHand () {
      if (this.selectingHour) { return this.degreesPerUnit * this.hour }
      return this.degreesPerUnit * this.minute
    },
    radius: function radius () {
      return this.clockSize / 2
    },
    clockSize: {
      get: function get () {
        return this.size
      },
      set: function set (val) {
        this.size = val
      }
    },
    size: function size () {
      return this.landscape ? 250 : 280
    }
  },

  watch: {
    period: function period (val) {
      this.inputTime = (this.hour) + ":" + (this.minute) + val
    },
    value: function value (val) {
      if (this.isSaving) {
        this.originalTime = this.inputTime
        this.isSaving = false
      }
    }
  },

  methods: {
    save: function save () {
      if (this.originalTime) {
        this.originalTime = this.value
      } else {
        this.inputTime = this.inputTime
        this.originalTime = this.inputTime
      }

      if (this.$parent && this.$parent.isActive) { this.$parent.isActive = false }
    },
    cancel: function cancel () {
      this.inputTime = this.originalTime
      if (this.$parent && this.$parent.isActive) { this.$parent.isActive = false }
    }
  },

  render: function render (h) {
    var children = [this.genBody()]

    !this.noTitle && children.unshift(this.genTitle())
    this.$scopedSlots.default && children.push(this.genSlot())

    return h('v-card', {
      'class': {
        'picker picker--time': true,
        'picker--landscape': this.landscape,
        'picker--dark': this.dark,
        'picker--time--hours': this.selectingHour
      }
    }, children)
  }
};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DatePicker__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TimePicker__ = __webpack_require__(56);



/* harmony default export */ exports["a"] = {
  DatePicker: __WEBPACK_IMPORTED_MODULE_0__DatePicker__["a" /* default */],
  TimePicker: __WEBPACK_IMPORTED_MODULE_1__TimePicker__["a" /* default */]
};


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genHeader: function genHeader () {
      return this.$createElement('div', {
        'class': 'picker--date__header'
      }, [
        this.genSelector()
      ])
    },
    genSelector: function genSelector () {
      var this$1 = this;

      return this.$createElement('div', {
        'class': 'picker--date__header-selector'
      }, [
        this.$createElement('v-btn', {
          props: { icon: true },
          nativeOn: {
            click: function (e) {
              e.stopPropagation()
              this$1.tableDate = new Date(this$1.tableYear, this$1.tableMonth - 1)
            }
          }
        }, [
          this.$createElement('v-icon', 'chevron_left')
        ]),
        this.$createElement('div', {
          'class': 'picker--date__header-selector-date'
        }, [
          this.$createElement(this.computedTransition, [
            this.$createElement('strong', {
              key: this.tableMonth
            }, ((this.months[this.tableMonth]) + " " + (this.tableYear)))
          ])
        ]),
        this.$createElement('v-btn', {
          props: { icon: true },
          nativeOn: {
            click: function (e) {
              e.stopPropagation()
              this$1.tableDate = new Date(this$1.tableYear, this$1.tableMonth + 1)
            }
          }
        }, [
          this.$createElement('v-icon', 'chevron_right')
        ])
      ])
    }
  }
};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genTable: function genTable () {
      var this$1 = this;

      var children = []
      var data = {
        'class': 'picker--date__table',
      }

      if (this.scrollable) {
        data.on = {
          wheel: function (e) {
            e.preventDefault()

            var month = this$1.tableMonth
            var year = this$1.tableYear
            var next = e.wheelDelta > 0

            if (next) { month++ }
            else { month-- }

            this$1.tableDate = new Date(year, month)
          }
        }
      }

      children.push(this.$createElement('table', {
        key: this.tableMonth
      }, [
        this.genTHead(),
        this.genTBody()
      ]))

      return this.$createElement('div', data, [
        this.$createElement(this.computedTransition, children)
      ])
    },
    genTHead: function genTHead () {
      var this$1 = this;

      return this.$createElement('thead', {

      }, this.genTR(this.days.map(function (o) {
        return this$1.$createElement('th', o.substr(0, 1))
      })))
    },
    genTBody: function genTBody () {
      var this$1 = this;

      var children = []
      var rows = []
      var length = new Date(
        this.tableYear,
        this.tableMonth + 1,
        0
      ).getDate()

      var day = new Date(
        this.tableYear,
        this.tableMonth
      ).getDay()

      for (var i = 0; i < day; i++) {
        rows.push(this$1.$createElement('td'))
      }

      var loop = function ( i ) {
        rows.push(this$1.$createElement('td', [
          this$1.$createElement('button', {
            'class': {
              'btn btn--floating btn--small btn--flat': true,
              'btn--active': this$1.isActive(i),
              'btn--current': this$1.isCurrent(i)
            },
            domProps: {
              innerHTML: ("<span class=\"btn__content\">" + i + "</span>")
            },
            on: {
              click: function () {
                var day = i < 10 ? ("0" + i) : i
                var tableMonth = this$1.tableMonth + 1
                tableMonth = tableMonth < 10 ? ("0" + tableMonth) : tableMonth

                this$1.inputDate = (this$1.tableYear) + "-" + tableMonth + "-" + day + "T12:00:00"
                !this$1.actions && this$1.save()
              }
            }
          })
        ]))

        if (rows.length % 7 === 0) {
          children.push(this$1.genTR(rows))
          rows = []
        }
      };

      for (var i$1 = 1; i$1 <= length; i$1++) loop( i$1 );

      if (rows.length) {
        children.push(this.genTR(rows))
      }

      children.length < 6 && children.push(this.genTR([
        this.$createElement('td', { domProps: { innerHTML: '&nbsp;' }})
      ]))

      return this.$createElement('tbody', children)
    },
    genTR: function genTR (children, data) {
      if ( children === void 0 ) children = [];
      if ( data === void 0 ) data = {};

      return [this.$createElement('tr', data, children)]
    },
    isActive: function isActive (i) {
      return this.tableYear === this.year &&
        this.tableMonth === this.month &&
        this.day === i
    },
    isCurrent: function isCurrent (i) {
      return this.currentYear === this.tableYear &&
        this.currentMonth === this.tableMonth &&
        this.currentDay === i
    }
  }
};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony default export */ exports["a"] = {
  methods: {
    genTitle: function genTitle () {
      var this$1 = this;

      var date = (this.dayName.substr(0, 3)) + "," + (this.landscape ? '<br>' : '') + " " + (this.monthName.substr(0, 3)) + " " + (this.day)

      var text = this.$createElement('transition', {
        props: {
          name: 'slide-x-transition',
          mode: 'out-in'
        }
      }, [
        this.$createElement('div', {
          domProps: { innerHTML: date },
          key: date
        })
      ])

      return this.$createElement('div', {
        'class': 'picker__title'
      }, [
        this.$createElement('div', {
          'class': {
            'picker--date__title-year': true,
            'active': this.isSelected
          },
          on: {
            click: function (e) {
              e.stopPropagation()
              this$1.isSelected = true
            }
          }
        }, this.year),
        this.$createElement('div', {
          'class': {
            'picker--date__title-date': true,
            'active': !this.isSelected
          },
          on: {
            click: function (e) {
              e.stopPropagation()
              this$1.isSelected = false
            }
          }
        }, [text])
      ])
    }
  }
};


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genYears: function genYears () {
      return this.$createElement('ul', {
        'class': 'picker--date__years',
        ref: 'years'
      }, this.genYearItems())
    },
    genYearItems: function genYearItems () {
      var this$1 = this;

      var children = []
      var loop = function ( i, length ) {
        children.push(this$1.$createElement('li', {
          'class': {
            active: this$1.year === i
          },
          on: {
            click: function (e) {
              e.stopPropagation()

              var tableMonth = this$1.tableMonth + 1
              var day = this$1.day
              tableMonth = tableMonth < 10 ? ("0" + tableMonth) : tableMonth
              day = day < 10 ? ("0" + day) : day

              this$1.inputDate = i + "-" + tableMonth + "-" + day
              this$1.isSelected = false
            }
          }
        }, i))
      };

      for (var i = this.year - 100, length = this.year + 100; i < length; i++) loop( i, length );
      return children
    }
  }
};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genBody: function genBody () {
      var this$1 = this;

      var children = [this.genHand(this.selectingHour ? 'hour' : 'minute')]
      var data = {
        'class': 'picker--time__clock',
        on: {
          mousedown: this.onMouseDown,
          mouseup: this.onMouseUp,
          mouseleave: function () {
            this$1.isDragging && this$1.onMouseUp()
          },
          mousemove: this.onDragMove,
          touchstart: this.onMouseDown,
          touchcancel: this.onMouseUp,
          touchmove: this.onDragMove
        },
        key: this.selectingHour ? 'hour' : 'minute',
        ref: 'clock'
      }

      this.selectingHour &&
        children.push(this.genHours()) ||
        children.push(this.genMinutes())

      if (this.scrollable) {
        data.on.wheel = function (e) {
          e.preventDefault()

          var diff = e.wheelDelta > 0 ? 1 : -1
          var changing = this$1.selectingHour ? 'changeHour' : 'changeMinute'

          this$1[changing](diff)
        }
      }

      return this.$createElement('div', {
        'class': 'picker__body'
      }, [
        this.$createElement('v-fade-transition', {
          props: { mode: 'out-in' }
        }, [
          this.$createElement('div', data, children)
        ])
      ])
    },
    genHand: function genHand (type) {
      return [this.$createElement('div', {
        'class': ("picker--time__clock-hand " + type),
        style: {
          transform: ("rotate(" + (this.clockHand) + "deg)")
        }
      })]
    },
    genHours: function genHours () {
      var this$1 = this;

      var hours = this.is24hr ? 24 : 12
      var children = []
      var start = 0

      if (hours === 12) {
        hours++
        start = 1
      }

      for (var i = start; i < hours; i++) {
        children.push(this$1.$createElement('span', {
          'class': {
            'active': i === this$1.hour
          },
          style: this$1.getTransform(i),
          domProps: { innerHTML: ("<span>" + i + "</span>") }
        }))
      }

      return children
    },
    genMinutes: function genMinutes () {
      var this$1 = this;

      var children = []

      for (var i = 0; i < 60; i = i + 5) {
        var num = i

        if (num < 10) { num = "0" + num }
        if (num === 60) { num = '00' }

        children.push(this$1.$createElement('span', {
          'class': {
            'active': num.toString() === this$1.minute.toString()
          },
          style: this$1.getTransform(i),
          domProps: { innerHTML: ("<span>" + num + "</span>") }
        }))
      }

      return children
    },
    getTransform: function getTransform (i) {
      var ref = this.getPosition(i);
      var x = ref.x;
      var y = ref.y;

      return { transform: ("translate(" + x + "px, " + y + "px)") }
    },
    getPosition: function getPosition (i) {
      return {
        x: Math.round(Math.sin(i * this.degrees) * this.radius * 0.8),
        y: Math.round(-Math.cos(i * this.degrees) * this.radius * 0.8)
      }
    },
    changeHour: function changeHour (time) {
      if (!this.is24hr) {
        this.hour = time < 0 && this.hour === 1
          ? 12 : time > 0 && this.hour === 12
          ? 1 : this.hour + time
      } else {
        this.hour = time < 0 && this.hour === 0
          ? 23 : time > 0 && this.hour === 23
          ? 0 : this.hour + time
      }

      return true
    },
    changeMinute: function changeMinute (time) {
      var current = Number(this.minute)

      var minute = time < 0 && current === 0
        ? 59 : time > 0 && current === 59
        ? 0 : current + time

      this.minute = minute < 10 ? ("0" + minute) : minute

      return true
    },
    onMouseDown: function onMouseDown (e) {
      e.preventDefault()

      this.isDragging = true
      this.onDragMove(e)
    },
    onMouseUp: function onMouseUp () {
      this.isDragging = false
      !this.selectingHour && !this.actions && this.save()
      this.selectingHour = false
    },
    onDragMove: function onDragMove (e) {
      if (!this.isDragging && e.type !== 'click') { return }

      var rect = this.$refs.clock.getBoundingClientRect()
      var center = { x: rect.width / 2, y: 0 - rect.width / 2 }
      var clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      var clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      var coords = {
        y: rect.top - clientY,
        x: clientX - rect.left
      }

      var selecting = this.selectingHour ? 'hour' : 'minute'
      this[selecting] = Math.round(this.angle(center, coords) / this.degreesPerUnit)
    },
    angle: function angle (center, p1) {
      var p0 = {
        x: center.x,
        y: center.y + Math.sqrt(
          Math.abs(p1.x - center.x) * Math.abs(p1.x - center.x) +
          Math.abs(p1.y - center.y) * Math.abs(p1.y - center.y))
      }
      return Math.abs((2 * Math.atan2(p1.y - p0.y, p1.x - p0.x)) * 180 / Math.PI);
    }
  }
};


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genTitle: function genTitle () {
      var children = [this.genTime()]

      if (this.format === 'ampm') {
        children.push(this.genAMPM())
      }

      return this.$createElement('div', {
        'class': 'picker__title'
      }, children)
    },
    genTime: function genTime () {
      var this$1 = this;

      var hour = this.hour

      if (this.is24hr && hour < 10) {
        hour = "0" + hour
      }

      return this.$createElement('div', {
        'class': 'picker--time__title'
      }, [
        this.$createElement('span', {
          'class': { active: this.selectingHour },
          on: {
            click: function () { return (this$1.selectingHour = true); }
          }
        }, hour),
        this.$createElement('span', {
          'class': { active: !this.selectingHour },
          on: {
            click: function () { return (this$1.selectingHour = false); }
          }
        }, (":" + (this.minute)))
      ])
    },
    genAMPM: function genAMPM () {
      var this$1 = this;

      return this.$createElement('div', [
        this.$createElement('span', {
          'class': { active: this.period === 'am' },
          on: { click: function () { return (this$1.period = 'am'); } }
        }, 'AM'),
        this.$createElement('span', {
          'class': { active: this.period === 'pm' },
          on: { click: function () { return (this$1.period = 'pm'); } }
        }, 'PM')
      ])
    }
  }
};


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProgressLinear_vue__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProgressLinear_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ProgressLinear_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProgressCircular_vue__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProgressCircular_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ProgressCircular_vue__);



/* harmony default export */ exports["a"] = {
  ProgressLinear: __WEBPACK_IMPORTED_MODULE_0__ProgressLinear_vue___default.a,
  ProgressCircular: __WEBPACK_IMPORTED_MODULE_1__ProgressCircular_vue___default.a
};


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_generators__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_autocomplete__ = __webpack_require__(67);




/* harmony default export */ exports["a"] = {
  name: 'select',

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_autocomplete__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_generators__["a" /* default */]],

  data: function data () {
    return {
      content: {},
      inputValue: this.value,
      isBooted: false,
      lastItem: 20,
      menuActive: false
    }
  },

  props: {
    appendIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    auto: Boolean,
    autocomplete: Boolean,
    bottom: Boolean,
    chips: Boolean,
    close: Boolean,
    debounce: {
      type: Number,
      default: 200
    },
    items: {
      type: Array,
      default: function () { return []; }
    },
    filter: Function,
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    maxHeight: {
      type: [Number, String],
      default: 300
    },
    multiple: Boolean,
    multiLine: Boolean,
    offset: Boolean,
    singleLine: Boolean,
    top: Boolean
  },

  computed: {
    classes: function classes () {
      return {
        'input-group--text-field input-group--select': true,
        'input-group--autocomplete': this.autocomplete,
        'input-group--single-line': this.singleLine,
        'input-group--multi-line': this.multiLine,
        'input-group--chips': this.chips,
        'input-group--multiple': this.multiple
      }
    },
    filteredItems: function filteredItems () {
      var items = this.autocomplete && this.searchValue
        ? this.filterSearch()
        : this.items

      return !this.auto ? items.slice(0, this.lastItem) : items
    },
    isDirty: function isDirty () {
      return this.selectedItems.length
    },
    selectedItems: function selectedItems () {
      var this$1 = this;

      if (this.inputValue === null) { return [] }

      return this.items.filter(function (i) {
        if (!this$1.multiple) {
          return this$1.getValue(i) === this$1.getValue(this$1.inputValue)
        } else {
          return this$1.inputValue.find(function (j) { return this$1.getValue(j) === this$1.getValue(i); })
        }
      })
    }
  },

  watch: {
    inputValue: function inputValue (val) {
      this.$emit('input', val)
    },
    value: function value (val) {
      this.inputValue = val
      this.validate()
      this.autocomplete && this.$refs.menu.activate()
    },
    menuActive: function menuActive (val) {
      this.isBooted = true
      this.lastItem += !val ? 20 : 0

      if (!val) { this.blur() }
      else { this.focus() }
    },
    isBooted: function isBooted () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.content = this$1.$refs.menu.$el.querySelector('.menu__content')

        this$1.content.addEventListener('scroll', this$1.onScroll, false)
      })
    }
  },

  beforeDestroy: function beforeDestroy () {
    if (this.isBooted) {
      this.content.removeEventListener('scroll', this.onScroll, false)
    }
  },

  methods: {
    blur: function blur () {
      var this$1 = this;

      this.$nextTick(function () { return (this$1.focused = false); })
    },
    focus: function focus () {
      this.focused = true
      this.autocomplete && this.$refs.input.focus()
    },
    getText: function getText (item) {
      return item === Object(item) ? item[this.itemText] : item
    },
    getValue: function getValue (item) {
      return item === Object(item) ? item[this.itemValue] : item
    },
    onScroll: function onScroll () {
      var this$1 = this;

      if (!this.menuActive) {
        setTimeout(function () { return (this$1.content.scrollTop = 0); }, 50)
      } else {
        var showMoreItems = (
          this.content.scrollHeight -
          (this.content.scrollTop +
          this.content.clientHeight)
        ) < 200

        if (showMoreItems) {
          this.lastItem += 20
        }
      }
    },
    selectItem: function selectItem (item) {
      var this$1 = this;

      if (!this.multiple) {
        this.inputValue = item
      }

      if (this.inputValue === null) {
        this.inputValue = [item]
      }

      if (this.multiple) {
        var inputValue = this.inputValue.slice()
        var i = this.inputValue.findIndex(function (i) { return this$1.getValue(i) === this$1.getValue(item); })

        i !== -1 && inputValue.splice(i, 1) || inputValue.push(item)
        this.inputValue = inputValue
      }

      if (this.autocomplete) {
        this.$nextTick(function () {
          this$1.searchValue = null
          this$1.$refs.input.focus()
        })
      }
    }
  },

  render: function render (h) {
    return this.genInputGroup([
      this.genSelectionsAndSearch(),
      this.genMenu()
    ], {
      ref: 'activator'
    })
  }
};


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Select__ = __webpack_require__(65);


/* harmony default export */ exports["a"] = {
  Select: __WEBPACK_IMPORTED_MODULE_0__Select__["a" /* default */]
};


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data: function data () {
    return {
      searchValue: null
    }
  },

  methods: {
    filterSearch: function filterSearch () {
      var this$1 = this;

      return this.items.filter(function (i) {
        var text = this$1.getText(i)
        if (typeof text === 'undefined') { return false }

        return text.toLowerCase().indexOf(this$1.searchValue.toLowerCase()) !== -1
      })
    }
  }
};


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genMenu: function genMenu () {
      var this$1 = this;

      var data = {
        ref: 'menu',
        props: {
          auto: this.auto,
          closeOnContentClick: !this.multiple,
          disabled: this.disabled,
          offsetY: this.autocomplete || this.offset,
          value: this.menuActive,
          nudgeBottom: 2,
          nudgeTop: -11,
          nudgeYAuto: 2,
          nudgeXAuto: this.multiple ? -40 : -16,
          nudgeWidth: 25,
          maxHeight: this.maxHeight,
          activator: this.$refs.activator,
          top: true
        },
        on: {
          input: function (val) { return (this$1.menuActive = val); }
        }
      }

      return this.$createElement('v-menu', data, [this.genList()])
    },
    genSelectionsAndSearch: function genSelectionsAndSearch () {
      var this$1 = this;

      var input

      if (this.autocomplete) {
        input = [this.$createElement('input', {
          'class': 'input-group--select__autocomplete',
          domProps: { value: this.searchValue },
          on: {
            input: function (e) { return (this$1.searchValue = e.target.value); },
            keyup: function (e) {
              if (e.keyCode === 27) {
                this$1.menuActive = false
                e.target.blur()
              }
            }
          },
          ref: 'input',
          key: 'input'
        })]
      }

      var group = this.$createElement('transition-group', {
        props: {
          name: 'fade-transition'
        }
      }, this.isDirty ? this.genSelections() : [])

      return this.$createElement('div', {
        'class': 'input-group__selections',
        style: { 'overflow': 'hidden' },
        ref: 'activator'
      }, [group, input])
    },
    genSelections: function genSelections () {
      var this$1 = this;

      var children = []
      var chips = this.chips
      var slots = this.$scopedSlots.selection
      var length = this.selectedItems.length

      this.selectedItems.forEach(function (item, i) {
        if (slots) {
          children.push(this$1.genSlotSelection(item))
        } else if (chips) {
          children.push(this$1.genChipSelection(item))
        } else {
          children.push(this$1.genCommaSelection(item, i < length - 1))
        }
      })

      return children
    },
    genSlotSelection: function genSlotSelection (item) {
      return this.$scopedSlots.selection({ parent: this, item: item })
    },
    genChipSelection: function genChipSelection (item) {
      var this$1 = this;

      return this.$createElement('v-chip', {
        'class': 'chip--select-multi',
        props: { close: true },
        on: { input: function () { return this$1.selectItem(item); } },
        nativeOn: { click: function (e) { return e.stopPropagation(); } },
        key: item
      }, this.getText(item))
    },
    genCommaSelection: function genCommaSelection (item, comma) {
      return this.$createElement('div', {
        'class': 'input-group__selections__comma',
        key: item
      }, ("" + (this.getText(item)) + (comma ? ', ' : '')))
    },
    genList: function genList () {
      var this$1 = this;

      return this.$createElement('v-list', {
        ref: 'list'
      }, this.filteredItems.map(function (o) {
        if (o.header) { return this$1.genHeader(o) }
        if (o.divider) { return this$1.genDivider(o) }
        else { return this$1.genListItem(o) }
      }))
    },
    genHeader: function genHeader (item) {
      return this.$createElement('v-subheader', {
        props: item
      }, item.header)
    },
    genDivider: function genDivider (item) {
      return this.$createElement('v-divider', {
        props: item
      })
    },
    genListItem: function genListItem (item) {
      return this.$createElement('v-list-item', [this.genTile(item)])
    },
    genTile: function genTile (item) {
      var this$1 = this;

      var active = this.selectedItems.indexOf(item) !== -1
      var data = {
        'class': {
          'list__tile--active': active,
          'list__tile--select-multi': this.multiple
        },
        nativeOn: { click: function () { return this$1.selectItem(item); } },
        props: { avatar: item === Object(item) && 'avatar' in item }
      }

      if (this.$scopedSlots.item) {
        return this.$createElement('v-list-tile', data,
          [this.$scopedSlots.item({ parent: this, item: item })]
        )
      }

      return this.$createElement('v-list-tile', data,
        [this.genAction(item, active), this.genContent(item)]
      )
    },
    genAction: function genAction (item, active) {
      var this$1 = this;

      if (!this.multiple) { return null }

      var data = {
        'class': {
          'list__tile__action--select-multi': this.multiple
        },
        nativeOn: { click: function () { return this$1.selectItem(item); } }
      }

      return this.$createElement('v-list-tile-action', data, [
        this.$createElement('v-checkbox', { props: { inputValue: active }})
      ])
    },
    genContent: function genContent (item) {
      return this.$createElement('v-list-tile-content',
        [this.$createElement('v-list-tile-title', this.getText(item))]
      )
    }
  }
};


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__ = __webpack_require__(1);


/* harmony default export */ exports["a"] = {
  name: 'sidebar',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__["a" /* default */]],

  props: {
    absolute: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    drawer: Boolean,
    fixed: Boolean,
    right: Boolean,
    height: String,
    mobile: {
      type: Boolean,
      default: true
    },
    mobileBreakPoint: {
      type: Number,
      default: 992
    },
    disableRouteWatcher: Boolean
  },

  computed: {
    calculatedHeight: function calculatedHeight () {
      if (this.height) { return this.height }
      return this.fixed || this.drawer ? '100vh' : 'auto'
    },
    classes: function classes () {
      return {
        'sidebar': true,
        'sidebar--close': !this.isActive,
        'sidebar--right': this.right,
        'sidebar--drawer': this.drawer,
        'sidebar--absolute': this.absolute,
        'sidebar--fixed': this.fixed || this.drawer,
        'sidebar--fixed-right': this.fixed && this.right,
        'sidebar--mobile': this.mobile,
        'sidebar--open': this.isActive
      }
    },
    styles: function styles () {
      return {
        height: this.calculatedHeight
      }
    }
  },

  watch: {
    '$route': function $route () {
      if (!this.disableRouteWatcher) {
        this.isActive = !this.routeChanged()
      }
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$vuetify.load(function () {
      this$1.resize()
      window.addEventListener('resize', this$1.resize, false)
    })
  },

  beforeDestroy: function beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  },

  methods: {
    closeConditional: function closeConditional () {
      return this.routeChanged()
    },

    resize: function resize () {
      if (this.mobile && !this.drawer) {
        this.isActive = window.innerWidth >= this.mobileBreakPoint
      }
    },

    routeChanged: function routeChanged () {
      return (
        (window.innerWidth < this.mobileBreakPoint && this.mobile) ||
        (this.drawer && this.closeOnClick)
      )
    }
  },

  render: function render (h) {
    var data = {
      'class': this.classes,
      style: this.styles,
      directives: [
        {
          name: 'click-outside',
          value: this.closeConditional
        }
      ]
    }

    return h('aside', data, [this.$slots.default])
  }
};


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sidebar__ = __webpack_require__(69);


/* harmony default export */ exports["a"] = {
  Sidebar: __WEBPACK_IMPORTED_MODULE_0__Sidebar__["a" /* default */]
};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_helpers__ = __webpack_require__(0);



/* harmony default export */ exports["a"] = {
  name: 'slider',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */]],

  data: function data () {
    return {
      app: {},
      isActive: false,
      inputWidth: 0
    }
  },

  props: {
    inverted: Boolean,
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: 1
    },
    thumbLabel: Boolean,
    value: [Number, String],
    vertical: Boolean
  },

  computed: {
    classes: function classes () {
      return {
        'input-group input-group--slider': true,
        'input-group--active': this.isActive,
        'input-group--dirty': this.inputValue > this.min,
        'input-group--disabled': this.disabled,
        'input-group--ticks': this.thumbLabel
      }
    },
    inputValue: {
      get: function get () {
        return this.value
      },
      set: function set (val) {
        val = val < this.min ? this.min : val > this.max ? this.max : val
        if (Math.ceil(val) !== Math.ceil(this.lazyValue)) {
          this.inputWidth = this.calculateWidth(val)
        }

        var value = parseInt(val)
        this.lazyValue = value

        if (value !== this.value) {
          this.$emit('input', value)
        }
      }
    },
    interval: function interval () {
      return 100 / (this.max - this.min) * this.step
    },
    thumbContainerClasses: function thumbContainerClasses () {
      return {
        'slider__thumb-container': true,
        'slider__thumb-container--label': this.thumbLabel
      }
    },
    thumbStyles: function thumbStyles () {
      return {
        left: ((this.inputWidth) + "%")
      }
    },
    tickContainerStyles: function tickContainerStyles () {
      return {
        transform: ("translate3d(-" + (this.interval) + "%, -50%, 0)")
      }
    },
    tickStyles: function tickStyles () {
      return {
        backgroundSize: ((this.interval) + "% 2px"),
        transform: ("translate3d(" + (this.interval) + "%, 0, 0)")
      }
    },
    trackStyles: function trackStyles () {
      var scaleX = this.calculateScale(1 - (this.inputWidth / 100))
      var translateX = this.inputWidth < 1 && !this.thumbLabel ? ((8) + "px") : 0
      return {
        transform: ("scaleX(" + scaleX + ") translateX(" + translateX + ")")
      }
    },
    trackFillStyles: function trackFillStyles () {
      var scaleX = this.calculateScale(this.inputWidth / 100)
      var translateX = this.inputWidth > 99 && !this.thumbLabel ? ((-8) + "px") : 0
      return {
        transform: ("scaleX(" + scaleX + ") translateX(" + translateX + ")")
      }
    }
  },

  watch: {
    value: function value () {
      this.inputValue = this.value
    }
  },

  mounted: function mounted () {
    this.inputValue = this.value
    this.inputWidth = this.calculateWidth(this.inputValue)
    this.app = document.querySelector('[data-app]')
  },

  methods: {
    calculateWidth: function calculateWidth (val) {
      return (val - this.min) / (this.max - this.min) * 100
    },
    calculateScale: function calculateScale (scale) {
      if (scale < 0.02 && !this.thumbLabel) {
        return 0
      }

      return this.disabled ? scale - 0.015 : scale
    },
    onMouseDown: function onMouseDown (e) {
      this.isActive = true

      if ('touches' in e) {
        this.app.addEventListener('touchmove', this.onMouseMove, false)
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_helpers__["d" /* addOnceEventListener */])(this.app, 'touchend', this.onMouseUp)
      } else {
        this.app.addEventListener('mousemove', this.onMouseMove, false)
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_helpers__["d" /* addOnceEventListener */])(this.app, 'mouseup', this.onMouseUp)
      }
    },
    onMouseUp: function onMouseUp () {
      this.isActive = false
      this.app.removeEventListener('touchmove', this.onMouseMove, false)
      this.app.removeEventListener('mousemove', this.onMouseMove, false)
    },
    onMouseMove: function onMouseMove (e) {
      var ref = this.$refs.track.getBoundingClientRect();
      var offsetLeft = ref.left;
      var trackWidth = ref.width;
      var clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      var left = (
        ((clientX - offsetLeft) / trackWidth) * 100
      )

      left = left < 0 ? 0 : left > 100 ? 100 : left

      this.inputValue = this.min + ((left / 100) * (this.max - this.min))
    },
    sliderMove: function sliderMove (e) {
      if (!this.isActive) {
        this.onMouseMove(e)
      }
    }
  },

  render: function render (h) {
    var children = []
    var trackChildren = []
    var thumbChildren = []

    trackChildren.push(h('div', { 'class': 'slider__track', style: this.trackStyles }))
    trackChildren.push(h('div', { 'class': 'slider__track-fill', style: this.trackFillStyles }))
    children.push(h('div', { 'class': 'slider__track__container', ref: 'track' }, trackChildren))

    if (this.step) {
      children.push(
        h('div', { 'class': 'slider__ticks-container', style: this.tickContainerStyles }, [
          h('div', { 'class': 'slider__ticks', style: this.tickStyles })
        ])
      )
    }

    thumbChildren.push(h('div', { 'class': 'slider__thumb' }))

    if (this.thumbLabel) {
      thumbChildren.push(
        h('v-scale-transition', { props: { origin: 'bottom center' }}, [
          h('div', {
            'class': 'slider__thumb--label__container',
            directives: [
              {
                name: 'show',
                value: this.isActive
              }
            ]
          }, [
            h('div', { 'class': 'slider__thumb--label' }, [
              h('span', {}, parseInt(this.inputValue))
            ])
          ])
        ])
      )
    }

    var thumbContainer = h('div', {
      'class': this.thumbContainerClasses,
      style: this.thumbStyles,
      on: {
        touchstart: this.onMouseDown,
        mousedown: this.onMouseDown
      },
      ref: 'thumb'
    }, thumbChildren)

    children.push(thumbContainer)

    var slider = h('div', { 'class': 'slider' }, children)

    return this.genInputGroup([slider], {
      attrs: {
        role: 'slider'
      },
      on: {
        mouseup: this.sliderMove
      },
      directives: [
        {
          name: 'click-outside'
        }
      ]
    })
  }
};


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Slider__ = __webpack_require__(71);


/* harmony default export */ exports["a"] = {
  Slider: __WEBPACK_IMPORTED_MODULE_0__Slider__["a" /* default */]
};


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__ = __webpack_require__(1);


/* harmony default export */ exports["a"] = {
  name: 'snackbar',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__["a" /* default */]],

  data: function data () {
    return {
      activeTimeout: {}
    }
  },

  props: {
    absolute: Boolean,
    bottom: Boolean,
    left: Boolean,
    multiLine: Boolean,
    right: Boolean,
    top: Boolean,
    timeout: {
      type: Number,
      default: 6000
    }
  },

  computed: {
    classes: function classes () {
      return {
        'snack': true,
        'snack--active': this.isActive,
        'snack--absolute': this.absolute,
        'snack--bottom': this.bottom || !this.top,
        'snack--left': this.left,
        'snack--right': this.right,
        'snack--top': this.top,
        'snack--multi-line': this.multiLine
      }
    },
    computedTransition: function computedTransition () {
      return this.top ? 'v-slide-y-transition' : 'v-slide-y-reverse-transition'
    }
  },

  watch: {
    isActive: function isActive () {
      var this$1 = this;

      clearTimeout(this.activeTimeout)

      if (this.isActive && this.timeout) {
        this.activeTimeout = setTimeout(function () { return (this$1.isActive = false); }, this.timeout)
      }
    }
  },

  render: function render (h) {
    var children = []

    if (this.isActive) {
      children.push(h('div', {
        'class': 'snack__content'
      }, [this.$slots.default]))
    }

    return h('div', {
      'class': this.classes
    }, [h(this.computedTransition, {}, children)])
  }
};


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Snackbar__ = __webpack_require__(73);


/* harmony default export */ exports["a"] = {
  Snackbar: __WEBPACK_IMPORTED_MODULE_0__Snackbar__["a" /* default */]
};


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'stepper',

  data: function data () {
    return {
      inputValue: null,
      steps: [],
      content: [],
      isReverse: false
    }
  },

  props: {
    altLabels: Boolean,
    vertical: Boolean,
    value: [Number, String]
  },

  computed: {
    classes: function classes () {
      return {
        'stepper': true,
        'stepper--vertical': this.vertical,
        'stepper--alt-labels': this.altLabels
      }
    }
  },

  watch: {
    inputValue: function inputValue (val, prev) {
      var this$1 = this;

      this.isReverse = Number(val) < Number(prev)
      this.steps.forEach(function (i) { return i.toggle(this$1.inputValue); })
      this.content.forEach(function (i) { return i.toggle(this$1.inputValue, this$1.isReverse); })

      this.$emit('input', this.inputValue)
    },
    value: function value () {
      this.inputValue = this.value
    }
  },

  mounted: function mounted () {
    this.$vuetify.load(this.init)
  },

  methods: {
    init: function init () {
      var this$1 = this;

      this.$children.forEach(function (i) {
        if (i.$options._componentTag === 'v-stepper-step') {
          this$1.steps.push(i)
        } else if (i.$options._componentTag === 'v-stepper-content') {
          i.isVertical = this$1.vertical
          this$1.content.push(i)
        }
      })

      this.inputValue = this.value || this.steps[0].step || 1
    },
    stepClick: function stepClick (step) {
      this.inputValue = step
    }
  },

  render: function render (h) {
    var data = {
      'class': this.classes
    }

    return h('div', data, [this.$slots.default])
  }
};


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'stepper-content',

  data: function data () {
    return {
      height: 0,
      isActive: false,
      isReverse: false,
      isVertical: false
    }
  },

  props: {
    step: {
      type: [Number, String],
      required: true
    }
  },

  computed: {
    classes: function classes () {
      return {
        'stepper__content': true
      }
    },
    computedTransition: function computedTransition () {
      return this.isReverse
        ? 'v-tab-reverse-transition'
        : 'v-tab-transition'
    },
    styles: function styles () {
      return this.isVertical
        ? { 'height': ((this.height) + "px") }
        : {}
    },
    wrapperClasses: function wrapperClasses () {
      return {
        'stepper__wrapper': true
      }
    }
  },

  watch: {
    isActive: function isActive () {
      if (!this.isVertical) {
        return
      }

      if (this.isActive) {
        this.enter()
      } else {
        this.leave()
      }
    }
  },

  methods: {
    enter: function enter () {
      var this$1 = this;

      var scrollHeight = 0

      // Render bug with height
      setTimeout(function () {
        scrollHeight = this$1.$refs.wrapper.scrollHeight
      }, 0)

      this.height = 0

      setTimeout(function () { return (this$1.height = scrollHeight); }, 450)
    },
    leave: function leave () {
      this.height = 0
    },
    toggle: function toggle (step, reverse) {
      this.isActive = step.toString() === this.step.toString()
      this.isReverse = reverse
    }
  },

  render: function render (h) {
    var contentData = {
      'class': this.classes
    }
    var wrapperData = {
      'class': this.wrapperClasses,
      style: this.styles,
      ref: 'wrapper'
    }

    if (!this.isVertical) {
      contentData.directives = [{
        name: 'show',
        value: this.isActive
      }]
    }

    var wrapper = h('div', wrapperData, [this.$slots.default])
    var content = h('div', contentData, [wrapper])

    return h(this.computedTransition, {}, [content])
  }
};


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


/* harmony default export */ exports["a"] = {
  name: 'stepper-step',

  data: function data () {
    return {
      isActive: false,
      isInactive: true
    }
  },

  props: {
    complete: Boolean,
    completeIcon: {
      type: String,
      default: 'check'
    },
    editIcon: {
      type: String,
      default: 'edit'
    },
    errorIcon: {
      type: String,
      default: 'warning'
    },
    editable: Boolean,
    rules: {
      type: Array,
      default: function () { return []; }
    },
    step: [Number, String]
  },

  computed: {
    classes: function classes () {
      return {
        'stepper__step': true,
        'stepper__step--active': this.isActive,
        'stepper__step--editable': this.editable,
        'stepper__step--inactive': this.isInactive,
        'stepper__step--error': this.hasError,
        'stepper__step--complete': this.complete
      }
    },
    hasError: function hasError () {
      return this.rules.some(function (i) { return (i() !== true); })
    },
    stepper: function stepper () {
      return __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* closestParentTag */].call(this, 'v-stepper')
    }
  },

  methods: {
    click: function click () {
      if (this.editable) {
        this.stepper.stepClick(this.step)
      }
    },
    toggle: function toggle (step) {
      this.isActive = step.toString() === this.step.toString()
      this.isInactive = Number(step) < Number(this.step)
    }
  },

  render: function render (h) {
    var data = {
      'class': this.classes,
      directives: [{
        name: 'ripple',
        value: this.editable
      }],
      on: {
        click: this.click
      }
    }
    var stepContent

    if (this.hasError) {
      stepContent = [h('v-icon', {}, this.errorIcon)]
    } else if (this.complete) {
      if (this.editable) {
        stepContent = [h('v-icon', {}, this.editIcon)]
      } else {
        stepContent = [h('v-icon', {}, this.completeIcon)]
      }
    } else {
      stepContent = this.step
    }

    var step = h('span', { 'class': 'stepper__step__step' }, stepContent)
    var label = h('div', { 'class': 'stepper__label' }, [this.$slots.default])

    return h('div', data, [step, label])
  }
};


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stepper__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StepperStep__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__StepperContent__ = __webpack_require__(76);





var StepperHeader = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('stepper__header')

/* harmony default export */ exports["a"] = {
  Stepper: __WEBPACK_IMPORTED_MODULE_1__Stepper__["a" /* default */],
  StepperContent: __WEBPACK_IMPORTED_MODULE_3__StepperContent__["a" /* default */],
  StepperHeader: StepperHeader,
  StepperStep: __WEBPACK_IMPORTED_MODULE_2__StepperStep__["a" /* default */]
};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var Subheader = {
  functional: true,

  props: {
    inset: Boolean
  },

  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    var props = ref.props;

    data.staticClass = data.staticClass ? ("subheader " + (data.staticClass)) : 'subheader'
    if (props.inset) { data.staticClass += ' subheader--inset' }

    return h('li', data, children)
  }
}

/* harmony default export */ exports["a"] = {
  Subheader: Subheader
};


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_head__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_body__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_foot__ = __webpack_require__(84);




/* harmony default export */ exports["a"] = {
  name: 'datatable',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_head__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_body__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_foot__["a" /* default */]],

  data: function data () {
    return {
      desc: null,
      page: 1,
      sorting: null,
      all: false
    }
  },

  props: {
    headers: {
      type: Array,
      default: function () { return []; }
    },
    headerText: {
      type: String,
      default: 'text'
    },
    hideActions: Boolean,
    items: {
      type: Array,
      default: function () { return []; }
    },
    itemValue: {
      default: 'value'
    },
    noDataText: {
      type: String,
      default: 'No data available in table'
    },
    noResultsText: {
      type: String,
      default: 'No matching records found'
    },
    rowsPerPage: {
      type: [Number, String],
      default: 5
    },
    rowsPerPageItems: {
      type: Array,
      default: function default$1 () {
        return [
          5,
          10,
          25,
          { text: 'All', value: -1 }
        ]
      }
    },
    rowsPerPageText: {
      type: String,
      default: 'Rows per page:'
    },
    selectAll: Boolean,
    search: {
      required: false
    },
    filter: {
      type: Function,
      default: function (val, search) {
        return val !== null &&
          ['undefined', 'boolean'].indexOf(typeof val) === -1 &&
          val.toString().toLowerCase().indexOf(search) !== -1
      }
    },
    value: {
      type: Array,
      default: function () { return []; }
    }
  },

  computed: {
    indeterminate: function indeterminate () {
      return this.selectAll && this.someItems && !this.everyItem
    },
    everyItem: function everyItem () {
      var this$1 = this;

      return this.value.every(function (i) { return i[this$1.itemValue]; })
    },
    someItems: function someItems () {
      var this$1 = this;

      return this.value.some(function (i) { return i[this$1.itemValue]; })
    },
    pageStart: function pageStart () {
      var page = this.rowsPerPage === Object(this.rowsPerPage)
        ? this.rowsPerPage.value
        : this.rowsPerPage
      return page === -1 ? 0 : (this.page - 1) * page
    },
    pageStop: function pageStop () {
      var page = this.rowsPerPage === Object(this.rowsPerPage)
        ? this.rowsPerPage.value
        : this.rowsPerPage
      return page === -1 ? this.value.length : this.page * page
    },
    filteredItems: function filteredItems () {
      var this$1 = this;

      var items = this.value.slice()
      var hasSearch = typeof this.search !== 'undefined' && this.search !== null

      if (hasSearch) {
        var search = this.search.toString().toLowerCase()

        items = items.filter(function (i) { return Object.keys(i).some(function (j) { return this$1.filter(i[j], search); }); })
      }

      items = items.sort(function (a, b) {
        this$1.sorting = !this$1.sorting ? this$1.headers.find(function (h) { return !('sortable' in h) || h.sortable; }).value : this$1.sorting
        var sortA = a[this$1.sorting]
        var sortB = b[this$1.sorting]

        if (this$1.desc) {
          if (sortA < sortB) { return 1 }
          if (sortA > sortB) { return -1 }
          return 0
        } else {
          if (sortA < sortB) { return -1 }
          if (sortA > sortB) { return 1 }
          return 0
        }
      })

      return this.hideActions ? items : items.slice(this.pageStart, this.pageStop)
    }
  },

  watch: {
    rowsPerPage: function rowsPerPage () {
      this.page = 1
    },
    indeterminate: function indeterminate (val) {
      if (val) { this.all = true }
    },
    someItems: function someItems (val) {
      if (!val) { this.all = false }
    },
    search: function search () {
      this.page = 1
    }
  },

  methods: {
    sort: function sort (index) {
      if (this.sorting === null) {
        this.sorting = index
        this.desc = true
      } else if (this.sorting === index && this.desc) {
        this.desc = false
      } else if (this.sorting !== index) {
        this.sorting = index
        this.desc = true
      } else {
        this.sorting = null
        this.desc = null
      }
    },
    genTR: function genTR (children, data) {
      if ( data === void 0 ) data = {};

      return this.$createElement('tr', data, children)
    },
    toggle: function toggle (val) {
      var this$1 = this;

      this.all = val

      this.$emit('input', this.value.map(function (i) {
        i[this$1.itemValue] = this$1.filteredItems.includes(i) ? val : false

        return i
      }))
    }
  },

  render: function render (h) {
    return h('v-table-overflow', {}, [
      h('table', {
        'class': {
          'datatable table': true,
          'datatable--select-all': this.selectAll
        }
      }, [
        this.genTHead(),
        this.genTBody(),
        this.hideActions ? null : this.genTFoot()
      ])
    ])
  }
};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'edit-dialog',

  data: function data () {
    return {
      isActive: false,
      isSaving: false
    }
  },

  props: {
    cancelText: {
      default: 'Cancel'
    },
    large: Boolean,
    lazy: Boolean,
    saveText: {
      default: 'Save'
    },
    transition: {
      type: String,
      default: 'v-slide-x-reverse-transition'
    }
  },

  watch: {
    isActive: function isActive (val) {
      val && this.$emit('open') && this.$nextTick(this.focus)
      if (!val) {
        !this.isSaving && this.$emit('cancel')
        this.isSaving && this.$emit('close')
        this.isSaving = false
      }
    }
  },

  methods: {
    cancel: function cancel () {
      this.isActive = false
    },
    focus: function focus () {
      var input = this.$el.querySelector('input')
      input && setTimeout(function () { return (input.focus()); }, 0)
    },
    save: function save () {
      this.isSaving = true
      this.isActive = false
      this.$emit('save')
    },
    genButton: function genButton (fn, text) {
      return this.$createElement('v-btn', {
        props: {
          flat: true,
          primary: true,
          light: true
        },
        nativeOn: { click: fn }
      }, text)
    },
    genActions: function genActions () {
      return this.$createElement('div', {
        'class': 'small-dialog__actions',
        directives: [{
          name: 'show',
          value: this.large
        }]
      }, [
        this.genButton(this.cancel, this.cancelText),
        this.genButton(this.save, this.saveText)
      ])
    },
    genContent: function genContent () {
      var this$1 = this;

      return this.$createElement('div', {
        'class': 'small-dialog__content',
        on: {
          keydown: function (e) {
            e.keyCode === 27 && this$1.cancel()
            e.keyCode === 13 && this$1.save()
          }
        }
      }, [this.$slots.input])
    }
  },

  render: function render (h) {
    var this$1 = this;

    return h('v-menu', {
      'class': 'small-dialog',
      props: {
        transition: this.transition,
        origin: 'top right',
        right: true,
        value: this.isActive,
        closeOnContentClick: false,
        lazy: this.lazy
      },
      on: {
        input: function (val) { return (this$1.isActive = val); }
      }
    }, [
      h('a', {
        domProps: { href: 'javascript:;' },
        slot: 'activator'
      }, [this.$slots.default]),
      this.genContent(),
      this.genActions()
    ])
  }
};


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DataTable__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EditDialog__ = __webpack_require__(81);




var TableOverflow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('table__overflow')

/* harmony default export */ exports["a"] = {
  DataTable: __WEBPACK_IMPORTED_MODULE_1__DataTable__["a" /* default */],
  EditDialog: __WEBPACK_IMPORTED_MODULE_2__EditDialog__["a" /* default */],
  TableOverflow: TableOverflow
};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genTBody: function genTBody () {
      var this$1 = this;

      var children = []

      if (!this.value.length) {
        children = [this.genEmptyBody(this.noDataText)]
      } else if (!this.filteredItems.length) {
        children = [this.genEmptyBody(this.noResultsText)]
      } else {
        children = this.filteredItems.map(function (item) {
          return this$1.genTR(this$1.$scopedSlots.items({ item: item }), {
            attrs: { active: item[this$1.itemValue] }
          })
        })
      }

      return this.$createElement('tbody', children)
    },
    genEmptyBody: function genEmptyBody (text) {
      return this.genTR([this.$createElement('td', {
        'class': 'text-xs-center',
        attrs: { colspan: '100%' }
      }, text)])
    }
  }
};


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genPrevIcon: function genPrevIcon () {
      var this$1 = this;

      return this.$createElement('v-btn', {
        props: {
          disabled: this.page === 1,
          icon: true
        },
        nativeOn: { click: function () { return (this$1.page--); } }
      }, [this.$createElement('v-icon', 'chevron_left')])
    },
    genNextIcon: function genNextIcon () {
      var this$1 = this;

      return this.$createElement('v-btn', {
        props: {
          disabled: this.page * this.rowsPerPage >= this.value.length || this.pageStop < 0,
          icon: true
        },
        nativeOn: { click: function () { return (this$1.page++); } }
      }, [this.$createElement('v-icon', 'chevron_right')])
    },
    genSelect: function genSelect () {
      var this$1 = this;

      return this.$createElement('div', {
        'class': 'datatable__actions__select'
      }, [
        this.rowsPerPageText,
        this.$createElement('v-select', {
          props: {
            items: this.rowsPerPageItems,
            value: this.rowsPerPage,
            hideDetails: true,
            top: true,
            auto: true
          },
          on: { input: function (val) { return (this$1.rowsPerPage = val); } }
        })
      ])
    },
    genPagination: function genPagination () {
      var pagination = '&mdash;'

      if (this.value.length) {
        var stop = this.value.length < this.pageStop || this.pageStop < 0
                ? this.value.length
                : this.pageStop

        pagination = (this.pageStart + 1) + "-" + stop + " of " + (this.value.length)
      }

      return this.$createElement('div', {
        'class': 'datatable__actions__pagination',
        domProps: { innerHTML: pagination }
      })
    },
    genActions: function genActions () {
      return [this.$createElement('div', {
        'class': 'datatable__actions'
      }, [
        this.genSelect(),
        this.genPagination(),
        this.genPrevIcon(),
        this.genNextIcon()
      ])]
    },
    genTFoot: function genTFoot () {
      return this.$createElement('tfoot', [
        this.genTR([
          this.$createElement('td', {
            attrs: { colspan: '100%' }
          }, this.genActions())
        ])
      ])
    }
  }
};


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genTHead: function genTHead () {
      var this$1 = this;

      var children = this.headers.map(function (o) { return this$1.genHeader(o); })
      var checkbox = this.$createElement('v-checkbox', {
        props: {
          hideDetails: true,
          primary: true,
          inputValue: this.all,
          indeterminate: this.indeterminate
        },
        on: { change: this.toggle }
      })

      this.selectAll && children.unshift(this.$createElement('th', [checkbox]))

      return this.$createElement('thead', [this.genTR(children)])
    },
    genHeader: function genHeader (item) {
      var array = [
        this.$scopedSlots.headers
          ? this.$scopedSlots.headers({ item: item })
          : item[this.headerText]
      ]

      return (ref = this).$createElement.apply(ref, [ 'th' ].concat( this.genHeaderData(item, array) ))
      var ref;
    },
    genHeaderData: function genHeaderData (item, children) {
      var this$1 = this;

      var beingSorted = false
      var classes = ['column']
      var data = {}

      if ('sortable' in item && item.sortable || !('sortable' in item)) {
        data.on = { click: function () { return this$1.sort(item.value); } }
        !('value' in item) && console.warn('Data table headers must have a value property that corresponds to a value in the v-model array')

        classes.push('sortable')
        var icon = this.$createElement('v-icon', 'arrow_downward')
        item.left && children.push(icon) || children.unshift(icon)

        beingSorted = this.sorting === item.value
        beingSorted && classes.push('active')
        beingSorted && this.desc && classes.push('desc') || classes.push('asc')
      }

      item.left && classes.push('text-xs-left') || classes.push('text-xs-right')

      data.class = classes

      return [data, children]
    }
  }
};


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'tabs-item',

  data: function data () {
    return {
      isActive: false,
      reverse: false
    }
  },

  props: {
    id: {
      type: String,
      required: true
    },
    transition: {
      type: String,
      default: 'v-tab-transition'
    },
    reverseTransition: {
      type: String,
      default: 'v-tab-reverse-transition'
    }
  },

  computed: {
    computedTransition: function computedTransition () {
      return this.reverse ? this.reverseTransition : this.transition
    }
  },

  methods: {
    toggle: function toggle (target, reverse) {
      this.reverse = reverse
      this.isActive = this.id === target
    }
  },

  render: function render (h) {
    return h(this.computedTransition, {}, [
      h('div', {
        'class': 'tabs__item',
        domProps: { id: this.id },
        directives: [{
          name: 'show', 
          value: this.isActive
        }]
    }, [this.$slots.default])])
  }
};
  

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_route_link__ = __webpack_require__(4);



/* harmony default export */ exports["a"] = {
  name: 'tab-item',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_route_link__["a" /* default */]],

  data: function data () {
    return {
      isActive: false,
      defaultActiveClass: 'tab__item--active'
    }
  },

  props: {
    activeClass: {
      type: String,
      default: 'tab__item--active'
    }
  },

  computed: {
    classes: function classes () {
      return {
        'tab__item': true,
        'tab__item--active': this.isActive,
        'tab__item--disabled': this.disabled
      }
    },

    target: function target () {
      var to = this.to || this.href

      if (to === Object(to)) { return this._uid }

      return to.replace('#', '')
    },

    tabs: function tabs () {
      return __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* closestParentTag */].call(this, 'v-tabs')
    }
  },

  methods: {
    click: function click (e) {
      e.preventDefault()

      this.tabs.tabClick(this.target)
    },

    toggle: function toggle (target) {
      this.isActive = this.target === target
    }
  },

  render: function render (h) {
    var ref = this.generateRouteLink();
    var tag = ref.tag;
    var data = ref.data;

    return h('li', {}, [h(tag, data, [this.$slots.default])])
  }
};


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'tabs',

  data: function data () {
    return {
      activators: [],
      isActive: null,
      reverse: false,
      target: null,
      resizeDebounce: {},
      targetEl: null
    }
  },

  props: {
    centered: Boolean,
    grow: Boolean,
    icons: Boolean,
    scrollBars: Boolean,
    value: String
  },

  computed: {
    classes: function classes () {
      return {
        'tabs': true,
        'tabs--centered': this.centered,
        'tabs--grow': this.grow,
        'tabs--icons': this.icons,
        'tabs--scroll-bars': this.scrollBars
      }
    }
  },

  watch: {
    value: function value () {
      this.tabClick(this.value)
    },
    isActive: function isActive () {
      var this$1 = this;

      this.activators.forEach(function (i) {
        i.toggle(this$1.target)

        if (i.isActive) {
          this$1.slider(i.$el)
        }
      })

      this.$refs.content.$children.forEach(function (i) { return i.toggle(this$1.target, this$1.reverse); })
      this.$emit('input', this.target)
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$vuetify.load(function () {
      this$1.init()
      window.addEventListener('resize', this$1.resize, false)
    })
  },

  beforeDestroy: function beforeDestroy () {
    window.removeEventListener('resize', this.resize, false)
  },

  methods: {
    init: function init () {
      var this$1 = this;

      this.activators = this.$refs.activators.$children.filter(function (i) { return i.$options._componentTag === 'v-tab-item'; })
      setTimeout(function () {
        this$1.tabClick(this$1.value || this$1.activators[0].target)
      }, 200)
    },
    resize: function resize () {
      var this$1 = this;

      clearTimeout(this.resizeDebounce)

      this.resizeDebounce = setTimeout(function () {
        this$1.slider()
      }, 250)
    },
    slider: function slider (el) {
      this.targetEl = el || this.targetEl
      this.$refs.slider.style.width = (this.targetEl.clientWidth) + "px"
      this.$refs.slider.style.left = (this.targetEl.offsetLeft) + "px"
    },
    tabClick: function tabClick (target) {
      var this$1 = this;

      this.target = target

      if (!this.$refs.content.length) {
        this.isActive = target
        return
      }

      this.$nextTick(function () {
        var nextIndex = this$1.$refs.content.$children.findIndex(function (i) { return i.id === this$1.target; })
        this$1.reverse = nextIndex < this$1.isActive
        this$1.isActive = nextIndex
      })
    }
  },

  render: function render (h) {
    var tabs = h('v-tabs-tabs', {
      ref: 'activators'
    }, [
      h('v-tabs-slider', { ref: 'slider' }),
      this.$slots.activators
    ])

    var items = h('v-tabs-items', {
      'class': 'tabs__items',
      ref: 'content'
    }, [this.$slots.content])

    return h('div', {
      'class': this.classes
    }, [this.$slots.default, tabs, items])
  }
};


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'tabs-tabs',

  data: function data () {
    return {
      mobile: false
    }
  },

  computed: {
    classes: function classes () {
      return {
        'tabs__tabs': true,
        'tabs__tabs--mobile': this.mobile
      }
    }
  },

  methods: {
    scrollLeft: function scrollLeft () {
      this.$refs.container.scrollLeft -= 50
    },
    scrollRight: function scrollRight () {
      this.$refs.container.scrollLeft += 50
    }
  },

  render: function render (h) {
    var container = h('ul', {
      'class': 'tabs__container',
      ref: 'container'
    }, [this.$slots.default])

    var left = h('v-icon', {
      props: {
        left: true
      },
      directives: [{
        name: 'ripple',
        value: ''
      }],
      nativeOn: {
        click: this.scrollLeft
      }
    }, 'chevron_left')

    var right = h('v-icon', {
      props: {
        right: true
      },
      directives: [{
        name: 'ripple',
        value: ''
      }],
      nativeOn: {
        click: this.scrollLeft
      }
    }, 'chevron_right')

    return h('div', {
      'class': this.classes
    }, [container, left, right])
  }
};


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tabs__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TabItem__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TabContent__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TabsTabs__ = __webpack_require__(89);






var TabsSlider = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleFunctional */])('tabs__slider')

var TabsItems = {
  name: 'tabs__items',

  render: function render (h) {
    return h('div', { 'class': { 'tabs__items': true }}, [this.$slots.default])
  }
}

/* harmony default export */ exports["a"] = {
  TabItem: __WEBPACK_IMPORTED_MODULE_2__TabItem__["a" /* default */],
  TabsItems: TabsItems,
  Tabs: __WEBPACK_IMPORTED_MODULE_1__Tabs__["a" /* default */],
  TabContent: __WEBPACK_IMPORTED_MODULE_3__TabContent__["a" /* default */],
  TabsTabs: __WEBPACK_IMPORTED_MODULE_4__TabsTabs__["a" /* default */],
  TabsSlider: TabsSlider
};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  functional: true,

  props: {
    fixed: Boolean
  },

  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;
    var props = ref.props;

    data.staticClass = data.staticClass ? ("toolbar " + (data.staticClass)) : 'toolbar'
    if (props.fixed) { data.staticClass += ' toolbar--fixed' }

    return h('nav', data, children)
  }
};


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_route_link__ = __webpack_require__(4);



/* harmony default export */ exports["a"] = {
  name: 'toolbar-item',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_route_link__["a" /* default */]],

  props: {
    activeClass: {
      type: String,
      default: 'toolbar__item--active'
    }
  },

  computed: {
    classes: function classes () {
      return {
        'toolbar__item': true,
        'toolbar__item--disabled': this.disabled
      }
    },

    listUID: function listUID () {
      return __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* closestParentTag */].call(this, 'v-list')
    }
  },

  render: function render (h) {
    var ref = this.generateRouteLink();
    var tag = ref.tag;
    var data = ref.data;

    return h('li', {}, [h(tag, data, [this.$slots.default])])
  }
};


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toolbar__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ToolbarItem__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_helpers__ = __webpack_require__(0);





var ToolbarLogo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["b" /* createSimpleFunctional */])('toolbar__logo')
var ToolbarTitle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["b" /* createSimpleFunctional */])('toolbar__title')
var ToolbarSub = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["b" /* createSimpleFunctional */])('toolbar__sub')
var ToolbarItems = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["b" /* createSimpleFunctional */])('toolbar__items', 'ul')
var ToolbarSideIcon = {
  functional: true,

  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;

    data.staticClass = data.staticClass ? ("toolbar__side-icon " + (data.staticClass)) : 'toolbar__side-icon'
    data.props = {
      icon: true,
      dark: true
    }

    return h('v-btn', data, [h('v-icon', 'menu')])
  }
}

/* harmony default export */ exports["a"] = {
  Toolbar: __WEBPACK_IMPORTED_MODULE_0__Toolbar__["a" /* default */],
  ToolbarItem: __WEBPACK_IMPORTED_MODULE_1__ToolbarItem__["a" /* default */],
  ToolbarItems: ToolbarItems,
  ToolbarLogo: ToolbarLogo,
  ToolbarTitle: ToolbarTitle,
  ToolbarSideIcon: ToolbarSideIcon,
  ToolbarSub: ToolbarSub
};


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


var SlideXTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* createSimpleTransition */])('slide-x-transition')
var SlideXReverseTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* createSimpleTransition */])('slide-x-reverse-transition')
var SlideYTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* createSimpleTransition */])('slide-y-transition')
var SlideYReverseTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* createSimpleTransition */])('slide-y-reverse-transition')
var ScaleTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* createSimpleTransition */])('scale-transition')
var TabTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* createSimpleTransition */])('tab-transition')
var TabReverseTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* createSimpleTransition */])('tab-reverse-transition')
var CarouselTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* createSimpleTransition */])('carousel-transition')
var CarouselReverseTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* createSimpleTransition */])('carousel-reverse-transition')
var DialogTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* createSimpleTransition */])('dialog-transition')
var DialogBottomTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* createSimpleTransition */])('dialog-bottom-transition')
var FadeTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* createSimpleTransition */])('fade-transition')
var MenuTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* createSimpleTransition */])('menu-transition')

/* harmony default export */ exports["a"] = {
  SlideXTransition: SlideXTransition,
  SlideXReverseTransition: SlideXReverseTransition,
  SlideYTransition: SlideYTransition,
  SlideYReverseTransition: SlideYReverseTransition,
  ScaleTransition: ScaleTransition,
  FadeTransition: FadeTransition,
  TabTransition: TabTransition,
  TabReverseTransition: TabReverseTransition,
  DialogTransition: DialogTransition,
  DialogBottomTransition: DialogBottomTransition,
  MenuTransition: MenuTransition,
  CarouselTransition: CarouselTransition,
  CarouselReverseTransition: CarouselReverseTransition
};


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


function directive (el, binding) {
  var config = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f" /* directiveConfig */])(
    binding,
    {
      icon: false,
      left: false,
      overlap: false
    }
  )

  if (config.overlap) { el.classList.add('badge--overlap') }
  if (config.icon) { el.classList.add('badge--icon') }
  if (config.left) { el.classList.add('badge--left') }

  el.dataset.badge = config.value
  el.classList.add('badge')
}

/* harmony default export */ exports["a"] = {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: function (el) {
    el.removeAttribute('data-badge')
    el.classList.remove('badge')
  }
};


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
function directive (e, el, binding, v) {
  var cb = function () { return true; }

  if (binding.value) { cb = binding.value }

  if ((e && e.target) &&
    (e.target !== el && !el.contains(e.target)) &&
    cb(e)
  ) {
    v.context.isActive = false
  }
}

/* harmony default export */ exports["a"] = {
  bind: function bind (el, binding, v) {
    v.context.$vuetify.load(function () {
      var click = function (e) { return directive(e, el, binding, v); }
      document.querySelector('[data-app]').addEventListener('click', click, false)
      el._clickOutside = click
    })
  },

  unbind: function unbind (el) {
    document.querySelector('[data-app]').removeEventListener('click', el._clickOutside, false)
  }
};


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
function style (el, value) {
  [
    'transform',
    'webkitTransform'
  ].forEach(function (i) {
    el.style[i] = value
  })
}

var ripple = {
  show: function (e, el, ref) {
    var value = ref.value; if ( value === void 0 ) value = {};

    var container = document.createElement('span')
    var animation = document.createElement('span')

    container.appendChild(animation)
    container.className = 'ripple__container'

    if (value.class) {
      container.className += " " + (value.class)
    }

    var size = el.clientWidth > el.clientHeight ? el.clientWidth : el.clientHeight
    animation.className = 'ripple__animation'
    animation.style.width = (size * (value.center ? 1 : 2)) + "px"
    animation.style.height = animation.style.width

    el.appendChild(container)

    var offset = el.getBoundingClientRect()
    var x = value.center ? '50%' : ((e.clientX - offset.left) + "px")
    var y = value.center ? '50%' : ((e.clientY - offset.top) + "px")

    animation.classList.add('ripple__animation--enter')
    animation.classList.add('ripple__animation--visible')
    style(animation, ("translate(-50%, -50%) translate(" + x + ", " + y + ") scale3d(0.01,0.01,0.01)"))
    animation.dataset.activated = Date.now()

    setTimeout(function () {
      animation.classList.remove('ripple__animation--enter')
      style(animation, ("translate(-50%, -50%) translate(" + x + ", " + y + ")  scale3d(0.99,0.99,0.99)"))
    }, 0)
  },

  hide: function (el) {
    var ripples = el.getElementsByClassName('ripple__animation')

    if (ripples.length === 0) { return }
    var animation = ripples[ripples.length - 1]
    var diff = Date.now() - Number(animation.dataset.activated)
    var delay = 400 - diff

    delay = delay < 0 ? 0 : delay

    setTimeout(function () {
      animation.classList.remove('ripple__animation--visible')

      setTimeout(function () {
        animation.parentNode.remove()
      }, 300)
    }, delay)
  }
}

function directive (el, binding, v) {
  if (binding.value === false) { return }

  if ('ontouchstart' in window) {
    el.addEventListener('touchend', function () { return ripple.hide(el); }, false)
    el.addEventListener('touchcancel', function () { return ripple.hide(el); }, false)
  }

  el.addEventListener('mousedown', function (e) { return ripple.show(e, el, binding); }, false)
  el.addEventListener('mouseup', function () { return ripple.hide(el); }, false)
  el.addEventListener('mouseleave', function () { return ripple.hide(el); }, false)
}

function unbind (el, binding) {
  el.removeEventListener('touchstart', function (e) { return ripple.show(e, el, binding); }, false)
  el.removeEventListener('mousedown', function (e) { return ripple.show(e, el, binding); }, false)
  el.removeEventListener('touchend', function () { return ripple.hide(el); }, false)
  el.removeEventListener('touchcancel', function () { return ripple.hide(el); }, false)
  el.removeEventListener('mouseup', function () { return ripple.hide(el); }, false)
  el.removeEventListener('mouseleave', function () { return ripple.hide(el); }, false)
}

/* harmony default export */ exports["a"] = {
  bind: directive,
  unbind: unbind
};


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


function directive (el, binding) {
  var config = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f" /* directiveConfig */])(
    binding,
    { top: true }
  )

  unbind(el, binding, config)

  el.dataset.tooltip = config.html
  el.dataset['tooltipLocation'] = config.value
}

function unbind (el) {
  el.removeAttribute('data-tooltip')
  el.removeAttribute('data-tooltip-location')
}

/* harmony default export */ exports["a"] = {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: unbind
};


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data: function data () {
    return {
      isBooted: false
    }
  },

  watch: {
    isActive: function isActive () {
      this.isBooted = true
    }
  }
};


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data: function data () {
    return {
      parallax: null,
      parallaxDist: null,
      elOffsetTop: null,
      percentScrolled: null,
      scrollTop: null,
      windowHeight: null,
      windowBottom: null
    }
  },

  computed: {
    normalizedHeight: function normalizedHeight () {
      return Number(this.height.toString().replace(/(^[0-9]*$)/, '$1'))
    },

    imgHeight: function imgHeight () {
      return this.objHeight()
    }
  },

  mounted: function mounted () {
    this.$vuetify.load(this.init)
  },

  beforeDestroy: function beforeDestroy () {
    document.removeEventListener('scroll', this.translate, false)
    document.removeEventListener('resize', this.translate, false)
  },

  methods: {
    listeners: function listeners () {
      document.addEventListener('scroll', this.translate, false)
      document.addEventListener('resize', this.translate, false)
    },

    translate: function translate () {
      this.calcDimensions()

      this.percentScrolled = (
        (this.windowBottom - this.elOffsetTop) / (this.normalizedHeight + this.windowHeight)
      )

      this.parallax = Math.round(this.parallaxDist * this.percentScrolled)

      if (this.translated) {
        this.translated()
      }
    },

    calcDimensions: function calcDimensions () {
      var offset = this.$el.getBoundingClientRect()

      this.scrollTop = window.pageYOffset
      this.parallaxDist = this.imgHeight - this.normalizedHeight
      this.elOffsetTop = offset.top + this.scrollTop
      this.windowHeight = window.innerHeight
      this.windowBottom = this.scrollTop + this.windowHeight
    }
  }
};


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'button-dropdown',

  data: function data () {
    return {
      isActive: false,
      inputValue: this.value,
      editableValue: null
    }
  },

  props: {
    dark: Boolean,
    editable: Boolean,
    light: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: function () { return []; }
    },
    maxHeight: {
      type: [String, Number],
      default: 200
    },
    overflow: Boolean,
    label: {
      type: String,
      default: 'Select'
    },
    segmented: Boolean,
    value: {
      required: false
    }
  },

  computed: {
    classes: function classes () {
      return {
        'btn-dropdown--editable': this.editable,
        'btn-dropdown--overflow': this.overflow || this.segmented || this.editable,
        'btn-dropdown--segmented': this.segmented,
        'btn-dropdown--light': this.light && !this.dark,
        'btn-dropdown--dark': this.dark
      }
    },

    computedItems: function computedItems () {
      var this$1 = this;

      if (this.editable) {
        return this.options
      }

      if (this.index !== -1 &&
        (this.overflow || this.segmented)
      ) {
        return this.options.filter(function (obj, i) { return i !== this$1.index; })
      }

      return this.options
    },

    index: function index () {
      var this$1 = this;

      return this.options.findIndex(function (i) { return i === this$1.inputValue; })
    }
  },

  mounted: function mounted () {
    if (this.inputValue) {
      this.editableValue = this.inputValue.text
    } 
  },

  watch: {
    inputValue: function inputValue () {
      this.$emit('input', this.inputValue)
    },

    value: function value () {
      if (typeof this.value === 'string') {
        return (this.inputValue = { title: this.value })
      }

      this.inputValue = this.value
    }
  },

  methods: {
    toggle: function toggle (active) {
      this.isActive = active
    },

    updateValue: function updateValue (e, obj) {
      if (e.keyCode === 13) {
        this.$refs.input.$el.querySelector('input').blur()
        this.isActive = false
      }

      if (typeof obj === 'string') {
        obj = { text: obj }
      }

      this.inputValue = obj
      this.editableValue = obj.text || obj.action
      this.isActive = false
    }
  }
};


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'button-toggle',

  data: function data () {
    return {
      inputValue: this.value
    }
  },

  props: {
    options: {
      type: Array,
      default: function () { return []; }
    },

    multiple: Boolean,

    value: {
      required: false
    }
  },

  computed: {
    classes: function classes () {
      return {
        'btn-toggle--selected': this.inputValue && !this.multiple || this.inputValue && this.inputValue.length > 0
      }
    }
  },

  watch: {
    value: function value () {
      this.inputValue = this.value
    }
  },

  methods: {
    isSelected: function isSelected (item) {
      if (!this.multiple) {
        return this.inputValue === item.value
      }

      return this.inputValue.includes(item.value)
    },

    updateValue: function updateValue (item) {
      if (!this.multiple) {
        return this.$emit('input', this.inputValue === item.value ? null : item.value)
      }

      var items = this.inputValue

      var i = items.indexOf(item.value)
      if (i !== -1) {
        items.splice(i, 1)
      } else {
        items.push(item.value)
      }

      this.$emit('input', items)
    }
  }
};


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'carousel',

  data: function data () {
    return {
      current: null,
      items: [],
      slideInterval: {},
      reverse: false
    }
  },

  props: {
    cycle: {
      type: Boolean,
      default: true
    },

    icon: {
      type: String,
      default: 'fiber_manual_record'
    },

    interval: {
      type: Number,
      default: 6000
    }
  },

  computed: {
    defaultState: function defaultState () {
      return {
        current: null,
        reverse: false
      }
    }
  },

  watch: {
    current: function current () {
      var this$1 = this;

      // Evaluate items when current changes to account for
      // dynamic changing of children
      this.items = this.$children.filter(function (i) {
        return i.$el.classList && i.$el.classList.contains('carousel__item')
      })

      this.items.forEach(function (i) { return i.open(this$1.items[this$1.current]._uid, this$1.reverse); })

      if (this.cycle) {
        clearInterval(this.slideInterval)
        this.startInterval()
      }
    }
  },

  mounted: function mounted () {
    this.init()
  },

  methods: {
    init: function init () {
      this.current = 0
    },

    next: function next () {
      this.reverse = false

      if (this.current + 1 === this.items.length) {
        return (this.current = 0)
      }

      this.current++
    },

    prev: function prev () {
      this.reverse = true

      if (this.current - 1 < 0) {
        return (this.current = this.items.length - 1)
      }

      this.current--
    },

    select: function select (index) {
      this.reverse = index < this.current
      this.current = index
    },

    startInterval: function startInterval () {
      this.slideInterval = setInterval(this.next, this.interval)
    }
  }
};


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'carousel-item',

  data: function data () {
    return {
      active: false,
      reverse: false
    }
  },

  props: {
    src: {
      type: String,
      required: true
    },

    transition: {
      type: String,
      default: 'v-tab-transition'
    },

    reverseTransition: {
      type: String,
      default: 'v-tab-reverse-transition'
    }
  },

  computed: {
    computedTransition: function computedTransition () {
      return this.reverse ? this.reverseTransition : this.transition
    },

    styles: function styles () {
      return {
        backgroundImage: ("url(" + (this.src) + ")")
      }
    }
  },

  methods: {
    open: function open (id, reverse) {
      this.active = this._uid === id
      this.reverse = reverse
    }
  }
};


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_expand_transition__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ exports["default"] = {
  name: 'expansion-panel-content',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_expand_transition__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  data: function data () {
    return {
      height: 'auto'
    }
  },

  props: {
    ripple: Boolean
  },

  computed: {
    classes: function classes () {
      return {
        'expansion-panel__header--active': this.isActive
      }
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    // TODO: This is temporary, replace
    if (this.value) {
      this.$vuetify.load(function () {
        setTimeout(function () {
          this$1.$refs.body.style.height = (this$1.$refs.body.clientHeight) + "px"
        }, 1000)
      })
    }
  },

  methods: {
    closeConditional: function closeConditional (e) {
      return this.$parent.$el.contains(e.target) && 
        !this.$parent.expand &&
        !this.$el.contains(e.target)
    },

    toggle: function toggle () {
      this.isActive = !this.isActive
    }
  }
};


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'pagination',

  props: {
    circle: Boolean,

    disabled: Boolean,

    length: {
      type: Number,
      default: 0
    },

    value: {
      type: Number,
      default: 0
    }
  },

  watch: {
    value: function value () {
      this.init()
    }
  },

  computed: {
    classes: function classes () {
      return {
        'pagination--circle': this.circle,
        'pagination--disabled': this.disabled
      }
    },

    items: function items () {
      if (this.length <= 5) {
        return this.range(1, this.length)
      }

      var min = this.value - 3
      min = min > 0 ? min : 1

      var max = min + 6
      max = max <= this.length ? max : this.length

      if (max === this.length) {
        min = this.length - 6
      }

      var range = this.range(min, max)

      if (this.value >= 4 && this.length > 6) {
        range.splice(0, 2, 1, '...')
      }

      if (this.value + 3 < this.length && this.length > 6) {
        range.splice(range.length - 2, 2, '...', this.length)
      }

      return range
    }
  },

  mounted: function mounted () {
    this.$vuetify.load.call(this, this.init)
  },

  methods: {
    init: function init () {
      var this$1 = this;

      this.selected = null

      // Change this
      setTimeout(function () { return (this$1.selected = this$1.value); }, 100)
    },

    range: function range (from, to) {
      var range = []

      from = from > 0 ? from : 1

      for (var i = from; i <= to; i++) {
        range.push(i)
      }

      return range
    }
  }
};


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_translatable__ = __webpack_require__(100);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ exports["default"] = {
  name: 'parallax',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_translatable__["a" /* default */]],

  props: {
    height: {
      type: [String, Number],
      default: 500
    },

    src: {
      type: String,
      required: true
    }
  },

  computed: {
    styles: function styles () {
      return {
        display: 'block',
        transform: ("translate3d(-50%, " + (this.parallax) + "px, 0)")
      }
    }
  },

  methods: {
    init: function init () {
      var this$1 = this;

      if (this.$refs.img.complete) {
        this.translate()
        this.listeners()
      }

      this.$refs.img.addEventListener('load', function () {
        this$1.translate()
        this$1.listeners()
      }, false)
    },

    objHeight: function objHeight () {
      return this.$refs.img.naturalHeight
    },

    elOffsetTop: function elOffsetTop () {
      return this.$el.offsetTop
    }
  }
};


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var this$1 = this;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'progress-circular',

  props: {
    button: Boolean,

    fill: {
      type: String,
      default: function () { return this$1.indeterminate ? 'none' : 'transparent'; }
    },

    indeterminate: Boolean,

    rotate: {
      type: Number,
      default: 0
    },

    size: {
      type: [Number, String],
      default: 32
    },

    width: {
      type: Number,
      default: 4
    },

    value: {
      type: Number,
      default: 0
    }
  },

  computed: {
    calculatedSize: function calculatedSize () {
      var size = Number(this.size)

      if (this.button) {
        size += 8
      }

      return size
    },

    circumference: function circumference () {
      return 2 * Math.PI * this.radius
    },

    classes: function classes () {
      return {
        'progress-circular--indeterminate': this.indeterminate,
        'progress-circular--button': this.button
      }
    },

    cxy: function cxy () {
      return this.indeterminate && !this.button ? 50 : this.calculatedSize / 2
    },

    normalizedValue: function normalizedValue () {
      if (this.value < 0) {
        return 0
      }

      if (this.value > 100) {
        return 100
      }

      return this.value
    },

    radius: function radius () {
      return this.indeterminate && !this.button ? 20 : (this.calculatedSize - this.width) / 2
    },

    strokeDashArray: function strokeDashArray () {
      return Math.round(this.circumference * 1000) / 1000
    },

    strokeDashOffset: function strokeDashOffset () {
      return ((100 - this.normalizedValue) / 100) * this.circumference + 'px'
    },

    styles: function styles () {
      return {
        height: ((this.calculatedSize) + "px"),
        width: ((this.calculatedSize) + "px")
      }
    },

    svgSize: function svgSize () {
      return this.indeterminate ? false : this.calculatedSize
    },

    svgStyles: function svgStyles () {
      return {
        transform: ("rotate(" + (this.rotate) + "deg)")
      }
    },

    viewBox: function viewBox () {
      return this.indeterminate ? '25 25 50 50' : false
    }
  }
};


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
  name: 'progress',

  props: {
    active: {
      type: Boolean,
      default: true
    },

    buffer: Boolean,

    bufferValue: Number,

    error: Boolean,

    height: {
      type: [Number, String],
      default: 7
    },

    indeterminate: Boolean,

    info: Boolean,

    secondary: Boolean,

    success: Boolean,

    query: Boolean,

    warning: Boolean,

    value: {
      type: [Number, String],
      default: 0
    }
  },

  computed: {
    classes: function classes () {
      return {
        'progress-linear--query': this.query,
        'progress-linear--secondary': this.secondary,
        'progress-linear--success': this.success,
        'progress-linear--info': this.info,
        'progress-linear--warning': this.warning,
        'progress-linear--error': this.error
      }
    },

    styles: function styles () {
      var styles = {}

      if (!this.active) {
        styles.height = 0
      }

      if (this.buffer) {
        styles.width = (this.bufferValue) + "%"
      }

      return styles
    },

    bufferStyles: function bufferStyles () {
      var styles = {}

      if (!this.active) {
        styles.height = 0
      }

      return styles
    }
  }
};


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* name */
  "ButtonDropdown",
  /* script */
  __webpack_require__(101),
  /* template */
  __webpack_require__(127),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* name */
  "ButtonToggle",
  /* script */
  __webpack_require__(102),
  /* template */
  __webpack_require__(120),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* name */
  "Carousel",
  /* script */
  __webpack_require__(103),
  /* template */
  __webpack_require__(123),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* name */
  "CarouselItem",
  /* script */
  __webpack_require__(104),
  /* template */
  __webpack_require__(126),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* name */
  "ExpansionPanelContent",
  /* script */
  __webpack_require__(105),
  /* template */
  __webpack_require__(124),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* name */
  "Pagination",
  /* script */
  __webpack_require__(106),
  /* template */
  __webpack_require__(122),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* name */
  "Parallax",
  /* script */
  __webpack_require__(107),
  /* template */
  __webpack_require__(125),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* name */
  "ProgressCircular",
  /* script */
  __webpack_require__(108),
  /* template */
  __webpack_require__(121),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* name */
  "ProgressLinear",
  /* script */
  __webpack_require__(109),
  /* template */
  __webpack_require__(119),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 119 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "progress-linear",
    class: _vm.classes,
    style: ({
      height: _vm.height + 'px'
    })
  }, [_c('div', {
    staticClass: "progress-linear__bar",
    style: (_vm.styles)
  }, [_c('v-fade-transition', [(_vm.indeterminate) ? _c('div', {
    staticClass: "progress-linear__bar__indeterminate"
  }) : _vm._e()]), _c('v-slide-x-transition', [(!_vm.indeterminate) ? _c('div', {
    staticClass: "progress-linear__bar__determinate",
    style: ({
      width: _vm.value + '%'
    })
  }) : _vm._e()])], 1)])
},staticRenderFns: []}

/***/ },
/* 120 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "btn-toggle",
    class: _vm.classes
  }, _vm._l((_vm.options), function(option, index) {
    return _c('v-btn', {
      attrs: {
        "data-selected": _vm.isSelected(option),
        "data-index": index,
        "data-only-child": _vm.isSelected(option) && (!_vm.multiple || _vm.inputValue.length === 1),
        "flat": "flat"
      },
      nativeOn: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.updateValue(option)
        }
      }
    }, [(option.text) ? _c('span', {
      domProps: {
        "textContent": _vm._s(option.text)
      }
    }) : _vm._e(), (option.icon) ? _c('v-icon', [_vm._v(_vm._s(option.icon))]) : _vm._e()], 1)
  }))
},staticRenderFns: []}

/***/ },
/* 121 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "progress-circular",
    class: _vm.classes,
    style: (_vm.styles)
  }, [_c('svg', {
    style: (_vm.svgStyles),
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "height": _vm.svgSize,
      "width": _vm.svgSize,
      "viewBox": _vm.viewBox
    }
  }, [(!_vm.indeterminate) ? _c('circle', {
    staticClass: "progress-circular__underlay",
    attrs: {
      "fill": "transparent",
      "cx": _vm.cxy,
      "cy": _vm.cxy,
      "r": _vm.radius,
      "stroke-width": _vm.width,
      "stroke-dasharray": _vm.strokeDashArray,
      "stroke-dashoffset": 0
    }
  }) : _vm._e(), _c('circle', {
    staticClass: "progress-circular__overlay",
    attrs: {
      "fill": _vm.fill,
      "cx": _vm.cxy,
      "cy": _vm.cxy,
      "r": _vm.radius,
      "stroke-width": _vm.width,
      "stroke-dasharray": _vm.strokeDashArray,
      "stroke-dashoffset": _vm.strokeDashOffset
    }
  })]), _c('div', {
    staticClass: "progress-circular__info"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ },
/* 122 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "pagination",
    class: _vm.classes
  }, [_c('li', [_c('a', {
    staticClass: "pagination__navigation",
    class: {
      'pagination__navigation--disabled': _vm.value === 1
    },
    attrs: {
      "href": "#!"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$emit('input', _vm.value - 1)
      }
    }
  }, [_c('v-icon', [_vm._v("chevron_left")])], 1)]), _vm._l((_vm.items), function(n) {
    return _c('li', [(!isNaN(n)) ? _c('a', {
      staticClass: "pagination__item",
      class: {
        'pagination__item--active': n === _vm.value
      },
      attrs: {
        "href": "#!"
      },
      domProps: {
        "textContent": _vm._s(n)
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.$emit('input', n)
        }
      }
    }) : _c('span', {
      staticClass: "pagination__more",
      domProps: {
        "textContent": _vm._s(n)
      }
    })])
  }), _c('li', [_c('a', {
    staticClass: "pagination__navigation",
    class: {
      'pagination__navigation--disabled': _vm.value === _vm.length
    },
    attrs: {
      "href": "#!"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$emit('input', _vm.value + 1)
      }
    }
  }, [_c('v-icon', [_vm._v("chevron_right")])], 1)])], 2)
},staticRenderFns: []}

/***/ },
/* 123 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "carousel"
  }, [_c('div', {
    staticClass: "carousel__left"
  }, [_c('v-btn', {
    attrs: {
      "icon": "icon"
    },
    nativeOn: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.prev($event)
      }
    }
  }, [_c('v-icon', [_vm._v("chevron_left")])], 1)], 1), _c('div', {
    staticClass: "carousel__right"
  }, [_c('v-btn', {
    attrs: {
      "icon": "icon"
    },
    nativeOn: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.next($event)
      }
    }
  }, [_c('v-icon', [_vm._v("chevron_right")])], 1)], 1), _c('div', {
    staticClass: "carousel__controls"
  }, _vm._l((_vm.items), function(item, index) {
    return _c('v-btn', {
      staticClass: "carousel__controls__item",
      class: {
        'carousel__controls__item--active': index === _vm.current
      },
      attrs: {
        "icon": "icon"
      },
      nativeOn: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.select(index)
        }
      }
    }, [_c('v-icon', [_vm._v(_vm._s(_vm.icon))])], 1)
  })), _vm._t("default")], 2)
},staticRenderFns: []}

/***/ },
/* 124 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [(_vm.$slots.header) ? _c('div', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: (_vm.closeConditional),
      expression: "closeConditional"
    }, {
      name: "ripple",
      rawName: "v-ripple",
      value: (_vm.ripple),
      expression: "ripple"
    }],
    staticClass: "expansion-panel__header",
    class: _vm.classes,
    on: {
      "click": function($event) {
        _vm.isActive = !_vm.isActive
      }
    }
  }, [_vm._t("header")], 2) : _vm._e(), _c('transition', {
    on: {
      "enter": _vm.enter,
      "after-enter": _vm.afterEnter,
      "leave": _vm.leave
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isActive),
      expression: "isActive"
    }],
    ref: "body",
    staticClass: "expansion-panel__body"
  }, [_vm._t("default")], 2)])], 1)
},staticRenderFns: []}

/***/ },
/* 125 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "parallax",
    style: ({
      minHeight: this.normalizedHeight + 'px'
    })
  }, [_c('div', {
    staticClass: "parallax__image-container"
  }, [_c('img', {
    ref: "img",
    staticClass: "parallax__image",
    style: (_vm.styles),
    attrs: {
      "src": _vm.src
    }
  }), _vm._t("default")], 2)])
},staticRenderFns: []}

/***/ },
/* 126 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.computedTransition, {
    tag: "component"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.active),
      expression: "active"
    }],
    staticClass: "carousel__item",
    class: {
      'reverse': _vm.reverse
    },
    style: (_vm.styles)
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ },
/* 127 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "btn-dropdown",
    class: _vm.classes
  }, [_c('v-menu', {
    attrs: {
      "auto": !_vm.overflow && !_vm.segmented && !_vm.editable,
      "right": !_vm.overflow && !_vm.segmented && !_vm.editable,
      "max-height": _vm.maxHeight,
      "offset-y": _vm.overflow || _vm.segmented || _vm.editable,
      "close-on-click": _vm.isActive,
      "open-on-click": !_vm.isActive,
      "bottom": "bottom"
    },
    model: {
      value: (_vm.isActive),
      callback: function($$v) {
        _vm.isActive = $$v
      },
      expression: "isActive"
    }
  }, [_c('v-text-field', {
    ref: "input",
    attrs: {
      "type": _vm.editable ? 'text' : 'button',
      "label": _vm.label,
      "light": _vm.light && !_vm.dark,
      "dark": _vm.dark,
      "single-line": "single-line",
      "append-icon": "arrow_drop_down"
    },
    on: {
      "focus": function($event) {
        _vm.isActive = arguments[0]
      }
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        (function (e) { return _vm.updateValue(e, _vm.editableValue); })($event)
      }
    },
    slot: "activator",
    model: {
      value: (_vm.editableValue),
      callback: function($$v) {
        _vm.editableValue = $$v
      },
      expression: "editableValue"
    }
  }), _c('v-list', _vm._l((_vm.options), function(option, index) {
    return _c('v-list-item', [_c('v-list-tile', {
      class: {
        'list__tile--active': _vm.inputValue === option
      },
      nativeOn: {
        "click": function($event) {
          (function (e) { return _vm.updateValue(e, option); })($event)
        }
      }
    }, [(option.action) ? _c('v-list-tile-action', [_c('v-icon', [_vm._v(_vm._s(option.action))])], 1) : _vm._e(), (option.text) ? _c('v-list-tile-content', [_c('v-list-tile-title', [_vm._v(_vm._s(option.text))])], 1) : _vm._e()], 1)], 1)
  }))], 1)], 1)
},staticRenderFns: []}

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_index__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_load__ = __webpack_require__(11);
__webpack_require__(12)





var defaults = {
  componentPrefix: 'V',
  directivePrefix: ''
}

function plugin (Vue, options) {
  options = Object.assign(defaults, (options || {}))

  Object.keys(__WEBPACK_IMPORTED_MODULE_1__directives_index__["a" /* default */]).forEach(function (key) {
    Vue.directive(("" + (options.directivePrefix) + key), __WEBPACK_IMPORTED_MODULE_1__directives_index__["a" /* default */][key])
  })

  Object.keys(__WEBPACK_IMPORTED_MODULE_0__components_index__["a" /* default */]).forEach(function (key) {
    Vue.component(("" + (options.componentPrefix) + key), __WEBPACK_IMPORTED_MODULE_0__components_index__["a" /* default */][key])
  })

  Vue.prototype.$vuetify = {
    load: __WEBPACK_IMPORTED_MODULE_2__util_load__["a" /* default */]
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

/* harmony default export */ exports["default"] = plugin;


/***/ }
/******/ ]);
});
//# sourceMappingURL=vuetify.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(10);
var Axios = __webpack_require__(19);
var defaults = __webpack_require__(5);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(7);
axios.CancelToken = __webpack_require__(18);
axios.isCancel = __webpack_require__(8);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(33);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(7);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(5);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(20);
var dispatchRequest = __webpack_require__(21);
var isAbsoluteURL = __webpack_require__(29);
var combineURLs = __webpack_require__(27);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(24);
var isCancel = __webpack_require__(8);
var defaults = __webpack_require__(5);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(9);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);




var colWidth = 3; // em

var gridCell = function (cols) {
    return function () {
        return {
            width: Number(cols) * colWidth + "em"
        };
    };
};

var methods = {
    emitClick: function () {
        this.$emit("click");
    }
};

var components = {
    grid: __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component("grid", {
        template: '<div class="grid" ><slot></slot></div>'
    }),
    "g-number": __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component("g-number", {
        template: '<div class="grid-cell grid-number" @click="emitClick()" ><slot></slot></div>',
        methods
    }),
    "g-text": __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component("g-text", {
        template: '<div class="grid-cell grid-text" @click="emitClick()" ><slot></slot></div>',
        methods
    }),
    "g-icon": __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component("g-icon", {
        template: '<div class="grid-cell grid-icon" @click="emitClick()" ><slot></slot></div>',
        methods
    }),
    "g-label": __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component("g-label", {
        template: '<div class="grid-cell grid-label" @click="emitClick()" ><slot></slot></div>',
        methods
    }),
    "g-header": __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component("g-header", {
        template: '<div class="grid-cell grid-label grid-header" @click="emitClick()" ><slot></slot></div>',
        methods
    })
};
components["g-col"] = __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component("g-col", {
    template: '<div class="grid-column" @click="emitClick()" ><slot></slot></div>',
    methods
});
components["g-row"] = __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component("g-row", {
    template: '<div class="grid-row" @click="emitClick()" ><slot></slot></div>',
    methods
});

/* harmony default export */ __webpack_exports__["default"] = ({
    components
});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RbIdentity_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RbIdentity_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__RbIdentity_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Service_vue__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Service_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Service_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'dev',
    computed: {
        restBundles() {
            return this.$store.getters.restBundles;
        }
    },
    components: {
        RbIdentity: __WEBPACK_IMPORTED_MODULE_0__RbIdentity_vue___default.a,
        Service: __WEBPACK_IMPORTED_MODULE_1__Service_vue___default.a
    }
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var grid = __webpack_require__(49);

/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__webpack_require__(39)],
    data: function () {
        return {
            showDetail: false
        };
    },
    components: Object.assign({}, grid),
    methods: {
        blam: function (v) {
            console.log("BLAM", v);
        }
    }
});

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RbIdentity_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RbIdentity_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__RbIdentity_vue__);
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: "service",
    computed: {
        serviceName() {
            return this.$store.state.serviceName || "test";
        },
        restBundles() {
            return this.$store.getters.restBundles;
        }
    },
    mounted() {
        console.log("service mounted");
    },
    components: {
        RbIdentity: __WEBPACK_IMPORTED_MODULE_0__RbIdentity_vue___default.a
    }
});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuetify__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuetify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuetify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Dev_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Dev_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Dev_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(13);





__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vuetify___default.a);

new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    el: '#dev',
    store: __WEBPACK_IMPORTED_MODULE_3__store__["a" /* default */],
    render: h => h(__WEBPACK_IMPORTED_MODULE_2__Dev_vue___default.a)
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var axios = __webpack_require__(16);
const debug = "production" !== 'production';

module.exports = {
    props: {
        service: {
            type: String,
            required: true
        }
    },
    data() {
        let stateType = this.$options._componentTag + "_state";
        let data = this.$store.getters.stateData(stateType, this.service);
        if (data == null) {
            data = {
                stateName: this.service,
                stateType: stateType,
                package: "tbd",
                version: "tbd",
                error: "",
                origin: ""
            };
            this.$store.commit("registerData", data);
        }
        return data;
    },
    computed: {
        selector() {
            return this.$options._componentTag;
        }
    },
    beforeMount() {
        this.origin = debug ? "http://localhost:8080" : location.origin;
        axios.get(this.origin + "/" + this.service + "/identity").then(res => {
            var json = res.data;
            this.package = json.package || this.package;
            this.version = json.version || this.version;
        }).catch(err => {
            var res = err.response;
            this.package = "(no package)";
            this.version = "(no version)";
            this.error = " \u2794 HTTP" + res.status;
        });
    }
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(40)
var ieee754 = __webpack_require__(46)
var isArray = __webpack_require__(47)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "#dev{border:1pt solid #fff;border-radius:5px;padding:5px}#dev:hover{border:1pt solid #ccc}", ""]);

// exports


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".rb-service{border:1pt solid #fff;border-radius:5px;padding:5px}.rb-service:hover{border:1pt solid #ccc}", ""]);

// exports


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".grid-column{display:flex;flex-direction:column;text-align:center}.grid-row{text-align:left;display:flex;flex-direction:row;flex-wrap:wrap;align-items:baseline}.grid{padding:.1em}.grid-cell{vertical-align:top;padding:0;padding-left:.15em;padding-right:.15em}.grid-row>.grid-cell:first-child{padding-left:.3em}.grid-text{min-width:27em;height:1.8em}.grid-icon{width:3em;text-align:center;height:1.8em}.grid-number{text-align:right;padding-right:1em}.grid-label,.grid-number{width:9em;height:1.8em}.grid-header{font-weight:700}.grid-cell.grid-w-1{width:3em}.grid-cell.grid-w-2{width:6em}.grid-cell.grid-w-3{width:9em}.grid-cell.grid-w-4{width:12em}.grid-cell.grid-w-5{width:15em}.grid-cell.grid-w-6{width:18em}.grid-cell.grid-w-7{width:21em}.grid-cell.grid-w-8{width:24em}.grid-cell.grid-w-9{width:27em}.grid-cell.grid-w-10{width:30em}.grid-cell.grid-w-11{width:33em}.grid-cell.grid-w-12{width:36em}.grid-cell.grid-h-1{height:1.8em}.grid-cell.grid-h-2{height:3.6em}.grid-cell.grid-h-3{height:5.4em}.grid-cell.grid-h-4{height:7.2em}.grid-cell.grid-h-5{height:9em}[clickable]:hover{border-radius:5px;border:1px solid #d0d0d0;cursor:pointer}", ""]);

// exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 46 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 47 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(56)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(34),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(55)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(37),
  /* template */
  __webpack_require__(52),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "dev"
    }
  }, [_c('h1', [_vm._v("Dev.vue")]), _vm._v(" "), _c('p', [_vm._v("\n    This is the RestBundle development application.\n    ")]), _c('p'), _c('h3', [_vm._v("What is a RestBundle?")]), _vm._v("\n    A RestBundle is a single Nodejs package that comprises both the web front-end\n    as well as the back-end implementations of a REST service. RestBundles are\n    robust vertical application slices that facilitate the development of lightweight\n    application shells.\n    "), _c('p'), _c('p', [_vm._v("\n    This single page application (SPA) itself \n    demonstrates the integration of Vue components for three separate \n    RestBundles (i.e., \"/test\",  \"/greeting\" and \"/aloha\"): \n    ")]), _vm._v(" "), _vm._l((["test", "greeting", "aloha"]), function(service) {
    return [_c('rb-identity', {
      attrs: {
        "service": service
      }
    })]
  }), _vm._v("\n    Each "), _c('code', [_vm._v("<rb-identity>")]), _vm._v(" Vue component shown above\n    displays the status of its corresponding service.\n    The display will change according to how the services are launched.\n    If we launch ony \"test\" and \"aloha\", the \"greeting\" RestBundle will show \n    a red X:\n    "), _vm._m(0), _vm._v(" "), _c('h3', [_vm._v("Multiple Vue Components")]), _vm._v("\n    Each RestBundle typically has multiple Vue components. The RestBundle\n    package alone has the following Vue components: \n    "), _vm._m(1), _vm._v(" "), _c('service')], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', [_c('li', [_c('code', [_vm._v("scripts/rest-bundle test aloha")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', [_c('li', [_c('strong', [_vm._v("Dev.vue")]), _vm._v(" is the development view that shows components for multiple services")]), _vm._v(" "), _c('li', [_c('strong', [_vm._v("Service.vue")]), _vm._v(" is the end-user \"home page\" for an individual service")]), _vm._v(" "), _c('li', [_c('strong', [_vm._v("RbIdentity.vue")]), _vm._v(" is the Vue component for the "), _c('code', [_vm._v("/identity")]), _vm._v(" REST method \n            that describes an individual service")])])
}]}

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "rb-service",
    attrs: {
      "id": "service"
    }
  }, [_c('h3', [_vm._v("Service.vue component")]), _vm._v("\n  This is the "), _vm._t("default", [_vm._v("Vue component")]), _vm._v(" for the \"" + _vm._s(_vm.serviceName) + "\" RestBundle service.\n  "), _c('rb-identity', {
    attrs: {
      "service": _vm.serviceName
    }
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('g-row', {
    staticClass: "rb-component rb-identity"
  }, [_c('g-col', [_c('g-icon', {
    attrs: {
      "clickable": ""
    },
    on: {
      "click": function($event) {
        _vm.showDetail = !_vm.showDetail
      }
    }
  }, [_c('span', {
    class: "glyphicon " + (_vm.error ? "glyphicon-remove text-danger" : "glyphicon-ok text-success")
  })])], 1), _vm._v(" "), _c('g-header', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.showDetail),
      expression: "!showDetail"
    }]
  }, [_c('code', [_vm._v("/" + _vm._s(_vm.service))])]), _vm._v(" "), _c('g-col', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showDetail),
      expression: "showDetail"
    }]
  }, [_c('g-row', [_c('g-header', [_vm._v("Service:")]), _c('g-text', [_c('code', [_vm._v("/" + _vm._s(_vm.service))])])], 1), _vm._v(" "), _c('g-row', [_c('g-header', [_vm._v("Component:")]), _vm._v(" "), _c('g-text', [_c('code', [_vm._v("<" + _vm._s(_vm.selector) + ">")]), _vm._v(" " + _vm._s(_vm.stateType) + "#" + _vm._s(_vm.stateId))])], 1), _vm._v(" "), _c('g-row', [_c('g-header', [_vm._v("Description:")]), _vm._v(" "), _c('g-text', [_vm._t("default", [_vm._v("Displays identity of \"" + _vm._s(_vm.service) + "\" RestBundle service")])], 2)], 1), _vm._v(" "), _c('g-row', [_c('g-header', [_vm._v("REST:")]), _vm._v(" "), _c('g-text', [_c('a', {
    attrs: {
      "href": _vm.origin + '/' + _vm.service + '/identity',
      "target": "_blank"
    }
  }, [_vm._v("/" + _vm._s(_vm.service) + "/identity")]), _vm._v(" "), _c('span', {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.error))])])], 1), _vm._v(" "), _c('g-row', [_c('g-header', [_vm._v("View:")]), _vm._v(" "), _c('g-text', [_c('a', {
    attrs: {
      "href": "/" + _vm.service + "/ui",
      "target": "_blank"
    }
  }, [_vm._v("/" + _vm._s(_vm.service) + "/ui")])])], 1), _vm._v(" "), _c('g-row', [_c('g-header', [_vm._v("Package:")]), _c('g-text', [_vm._v(_vm._s(_vm.package) + "@" + _vm._s(_vm.version))])], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(42);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("dfd77166", content, true);

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("2056b4da", content, true);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(44);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("00686a8a", content, true);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(45);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("66a4fc7a", content, true);

/***/ }),
/* 58 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* unused harmony export mapState */
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* unused harmony export mapActions */
/**
 * vuex v2.3.0
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: {} };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  var this$1 = this;

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false);

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, function (rawModule, key) {
      this$1.register([key], rawModule, false);
    });
  }
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update(this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  var parent = this.get(path.slice(0, -1));
  var newModule = new Module(rawModule, runtime);
  parent.addChild(path[path.length - 1], newModule);

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (targetModule, newModule) {
  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed'
        );
        return
      }
      update(targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

  var state = options.state; if ( state === void 0 ) state = {};
  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.");
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    console.error(("[vuex] unknown mutation type: " + type));
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    console.error(("[vuex] unknown action type: " + type));
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.");
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler(local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error(("[vuex] duplicate getter key: " + type));
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    );
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      return this.$store.commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (!(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.3.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
};

/* harmony default export */ __webpack_exports__["a"] = (index_esm);


/***/ })
/******/ ]);
//# sourceMappingURL=build-dev.js.map