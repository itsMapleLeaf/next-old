/******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vueResource = __webpack_require__(3);
	
	var _vueResource2 = _interopRequireDefault(_vueResource);
	
	var _App = __webpack_require__(4);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _bbcode = __webpack_require__(195);
	
	var _bbcode2 = _interopRequireDefault(_bbcode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.config.debug = true;
	_vue2.default.config.devtools = true;
	
	_vue2.default.filter('bbcode', _bbcode2.default);
	
	_vue2.default.use(_vueResource2.default);
	_vue2.default.http.options.emulateJSON = true;
	
	// make the collapse transition fluid to the element height
	_vue2.default.transition('collapse', {
	  css: false,
	
	  enter: function enter(el, done) {
	    el.style.maxHeight = '0px';
	    window.requestAnimationFrame(function () {
	      el.style.transition = 'ease 0.3s max-height';
	      el.style.maxHeight = el.scrollHeight + 'px';
	      el.style.overflow = 'hidden';
	      window.setTimeout(done, 300);
	    });
	  },
	  leave: function leave(el, done) {
	    el.style.maxHeight = '0px';
	    window.setTimeout(done, 300);
	  }
	});
	
	/* eslint no-new: 0 */
	new _vue2.default({
	  el: 'body',
	  components: { App: _App2.default }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*!
	 * Vue.js v1.0.25
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';
	
	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */
	
	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj._digest();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */
	
	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}
	
	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;
	
	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}
	
	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}
	
	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */
	
	function _toString(value) {
	  return value == null ? '' : value.toString();
	}
	
	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */
	
	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}
	
	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */
	
	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}
	
	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */
	
	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var camelizeRE = /-(\w)/g;
	
	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}
	
	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}
	
	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var hyphenateRE = /([a-z\d])([A-Z])/g;
	
	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}
	
	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var classifyRE = /(?:^|[-_\/])(\w)/g;
	
	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}
	
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	
	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}
	
	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isArray = Array.isArray;
	
	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */
	
	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}
	
	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */
	
	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}
	
	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */
	
	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}
	
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */
	
	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}
	
	var hasProto = ('__proto__' in {});
	
	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
	
	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && UA.indexOf('trident') > 0;
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
	var iosVersionMatch = isIos && UA.match(/os ([\d_]+)/);
	var iosVersion = iosVersionMatch && iosVersionMatch[1].split('_');
	
	// detecting iOS UIWebView by indexedDB
	var hasMutationObserverBug = iosVersion && Number(iosVersion[0]) >= 9 && Number(iosVersion[1]) >= 3 && !window.indexedDB;
	
	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;
	
	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}
	
	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */
	
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined' && !hasMutationObserverBug) {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();
	
	var _Set = undefined;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = function () {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}
	
	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}
	
	var p = Cache.prototype;
	
	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */
	
	p.put = function (key, value) {
	  var removed;
	
	  var entry = this.get(key, true);
	  if (!entry) {
	    if (this.size === this.limit) {
	      removed = this.shift();
	    }
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;
	
	  return removed;
	};
	
	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */
	
	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};
	
	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */
	
	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};
	
	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;
	
	/**
	 * Parser state
	 */
	
	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */
	
	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}
	
	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */
	
	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}
	
	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} s
	 * @return {Object}
	 */
	
	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }
	
	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};
	
	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }
	
	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }
	
	  cache$1.put(s, dir);
	  return dir;
	}
	
	var directive = Object.freeze({
	  parseDirective: parseDirective
	});
	
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */
	
	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}
	
	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}
	
	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */
	
	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}
	
	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */
	
	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}
	
	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */
	
	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}
	
	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */
	
	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}
	
	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});
	
	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];
	
	var config = Object.defineProperties({
	
	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */
	
	  debug: false,
	
	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */
	
	  silent: false,
	
	  /**
	   * Whether to use async rendering.
	   */
	
	  async: true,
	
	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */
	
	  warnExpressionErrors: true,
	
	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */
	
	  devtools: process.env.NODE_ENV !== 'production',
	
	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */
	
	  _delimitersChanged: true,
	
	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */
	
	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],
	
	  /**
	   * prop binding modes
	   */
	
	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },
	
	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */
	
	  _maxUpdateCount: 100
	
	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */
	
	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});
	
	var warn = undefined;
	var formatComponentName = undefined;
	
	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';
	
	    warn = function (msg, vm) {
	      if (hasConsole && !config.silent) {
	        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	      }
	    };
	
	    formatComponentName = function (vm) {
	      var name = vm._isVue ? vm.$options.name : vm.name;
	      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
	    };
	  })();
	}
	
	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}
	
	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}
	
	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}
	
	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}
	
	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});
	
	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */
	
	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}
	
	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function inDoc(node) {
	  if (!node) return false;
	  var doc = node.ownerDocument.documentElement;
	  var parent = node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}
	
	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */
	
	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}
	
	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */
	
	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}
	
	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */
	
	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}
	
	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}
	
	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}
	
	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */
	
	function remove(el) {
	  el.parentNode.removeChild(el);
	}
	
	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}
	
	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */
	
	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}
	
	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */
	
	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}
	
	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}
	
	/**
	 * For IE9 compat: when both class and :class are present
	 * getAttribute('class') returns wrong value...
	 *
	 * @param {Element} el
	 * @return {String}
	 */
	
	function getClass(el) {
	  var classname = el.className;
	  if (typeof classname === 'object') {
	    classname = classname.baseVal || '';
	  }
	  return classname;
	}
	
	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}
	
	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}
	
	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}
	
	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */
	
	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}
	
	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */
	
	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}
	
	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}
	
	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */
	
	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}
	
	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */
	
	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}
	
	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */
	
	var refRE = /^v-ref:/;
	
	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}
	
	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */
	
	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}
	
	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */
	
	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}
	
	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function isFragment(node) {
	  return node && node.nodeType === 11;
	}
	
	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */
	
	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}
	
	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	var reservedTagRE = /^(slot|partial|component)$/i;
	
	var isUnknownElement = undefined;
	if (process.env.NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        // Firefox returns unknown for some "Interactive elements."
	        !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
	      );
	    }
	  };
	}
	
	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */
	
	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el, options);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el, options);
	  }
	}
	
	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */
	
	function getIsBinding(el, options) {
	  // dynamic syntax
	  var exp = el.getAttribute('is');
	  if (exp != null) {
	    if (resolveAsset(options, 'components', exp)) {
	      el.removeAttribute('is');
	      return { id: exp };
	    }
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */
	
	var strats = config.optionMergeStrategies = Object.create(null);
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	
	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}
	
	/**
	 * Data
	 */
	
	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};
	
	/**
	 * El
	 */
	
	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};
	
	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	
	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	
	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}
	
	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});
	
	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	
	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};
	
	/**
	 * Other object hashes.
	 */
	
	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};
	
	/**
	 * Default strategy.
	 */
	
	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};
	
	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */
	
	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */
	
	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}
	
	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */
	
	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */
	
	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  if (process.env.NODE_ENV !== 'production') {
	    if (child.propsData && !vm) {
	      warn('propsData can only be used as an instantiation option.');
	    }
	  }
	  var options = {};
	  var key;
	  if (child['extends']) {
	    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      var mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
	      parent = mergeOptions(parent, mixinOptions, vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @param {Boolean} warnMissing
	 * @return {Object|Function}
	 */
	
	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  var res = assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }
	  return res;
	}
	
	var uid$1 = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};
	
	/**
	 * Add self as a dependency to the target watcher.
	 */
	
	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};
	
	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});
	
	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */
	
	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});
	
	/**
	 * Convenience method to remove the element at given index or target element reference.
	 *
	 * @param {*} item
	 */
	
	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});
	
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However in certain cases, e.g.
	 * v-for scope alias and props, we don't want to force conversion
	 * because the value may be a nested value under a frozen data structure.
	 *
	 * So whenever we want to set a reactive property without forcing
	 * conversion on the new value, we wrap that call inside this function.
	 */
	
	var shouldConvert = true;
	
	function withoutConversion(fn) {
	  shouldConvert = false;
	  fn();
	  shouldConvert = true;
	}
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */
	
	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}
	
	// Instance methods
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */
	
	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};
	
	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */
	
	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */
	
	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}
	
	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */
	
	function defineReactive(obj, key, val) {
	  var dep = new Dep();
	
	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
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
	
	
	
	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE: isIE,
		isIE9: isIE9,
		isAndroid: isAndroid,
		isIos: isIos,
		iosVersionMatch: iosVersionMatch,
		iosVersion: iosVersion,
		hasMutationObserverBug: hasMutationObserverBug,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		get _Set () { return _Set; },
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		checkComponentAttr: checkComponentAttr,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});
	
	var uid = 0;
	
	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */
	
	  Vue.prototype._init = function (options) {
	    options = options || {};
	
	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives
	
	    // a uid
	    this._uid = uid++;
	
	    // a flag to avoid this being observed
	    this._isVue = true;
	
	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization
	
	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}
	
	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;
	
	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;
	
	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;
	
	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }
	
	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }
	
	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);
	
	    // set ref
	    this._updateRef();
	
	    // initialize data as empty object.
	    // it will be filled up in _initData().
	    this._data = {};
	
	    // call init hook
	    this._callHook('init');
	
	    // initialize data observation and scope inheritance.
	    this._initState();
	
	    // setup event system and option events.
	    this._initEvents();
	
	    // call created hook
	    this._callHook('created');
	
	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}
	
	var pathCache = new Cache(1000);
	
	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;
	
	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;
	
	var pathStateMachine = [];
	
	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};
	
	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};
	
	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};
	
	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};
	
	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};
	
	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};
	
	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};
	
	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */
	
	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }
	
	  var code = ch.charCodeAt(0);
	
	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;
	
	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';
	
	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }
	
	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }
	
	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }
	
	  return 'else';
	}
	
	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */
	
	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}
	
	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;
	
	  var actions = [];
	
	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };
	
	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };
	
	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };
	
	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };
	
	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }
	
	  while (mode != null) {
	    index++;
	    c = path[index];
	
	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }
	
	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;
	
	    if (transition === ERROR) {
	      return; // parse error
	    }
	
	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }
	
	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}
	
	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}
	
	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */
	
	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}
	
	/**
	 * Warn against setting non-existent root path on a vm.
	 */
	
	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path, vm) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
	  };
	}
	
	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */
	
	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path, last);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path, obj);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}
	
	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});
	
	var expressionCache = new Cache(1000);
	
	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/;
	
	function noop() {}
	
	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */
	
	var saved = [];
	
	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */
	
	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}
	
	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */
	
	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}
	
	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */
	
	function restore(str, i) {
	  return saved[i];
	}
	
	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */
	
	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here because the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}
	
	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */
	
	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      /* istanbul ignore if */
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        warn('It seems you are using the default build of Vue.js in an environment ' + 'with Content Security Policy that prohibits unsafe-eval. ' + 'Use the CSP-compliant build instead: ' + 'http://vuejs.org/guide/installation.html#CSP-compliant-build');
	      } else {
	        warn('Invalid expression. ' + 'Generated function body: ' + body);
	      }
	    }
	    return noop;
	  }
	}
	
	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */
	
	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}
	
	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */
	
	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}
	
	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat literal values as paths
	  !literalValueRE$1.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}
	
	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});
	
	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	
	/**
	 * Reset the batcher's state.
	 */
	
	function resetBatcherState() {
	  queue.length = 0;
	  userQueue.length = 0;
	  has = {};
	  circular = {};
	  waiting = false;
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	
	function flushBatcherQueue() {
	  var _again = true;
	
	  _function: while (_again) {
	    _again = false;
	
	    runBatcherQueue(queue);
	    runBatcherQueue(userQueue);
	    // user watchers triggered more watchers,
	    // keep flushing until it depletes
	    if (queue.length) {
	      _again = true;
	      continue _function;
	    }
	    // dev tool hook
	    /* istanbul ignore if */
	    if (devtools && config.devtools) {
	      devtools.emit('flush');
	    }
	    resetBatcherState();
	  }
	}
	
	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */
	
	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	        break;
	      }
	    }
	  }
	  queue.length = 0;
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */
	
	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}
	
	var uid$2 = 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};
	
	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */
	
	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};
	
	/**
	 * Prepare for dependency collection.
	 */
	
	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	};
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	Watcher.prototype.addDep = function (dep) {
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
	
	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
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
	 *
	 * @param {Boolean} shallow
	 */
	
	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};
	
	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */
	
	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	
	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	
	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};
	
	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */
	
	var seenObjects = new _Set();
	function traverse(val, seen) {
	  var i = undefined,
	      keys = undefined;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  var isA = isArray(val);
	  var isO = isObject(val);
	  if (isA || isO) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) traverse(val[i], seen);
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) traverse(val[keys[i]], seen);
	    }
	  }
	}
	
	var text$1 = {
	
	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },
	
	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};
	
	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);
	
	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};
	
	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];
	
	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];
	
	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}
	
	var tagRE$1 = /<([\w:-]+)/;
	var entityRE = /&#?\w+?;/;
	var commentRE = /<!--/;
	
	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */
	
	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }
	
	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);
	  var commentMatch = commentRE.test(templateString);
	
	  if (!tagMatch && !entityMatch && !commentMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');
	
	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }
	
	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}
	
	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */
	
	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment. However, iOS Safari has
	  // bug when using directly cloned template content with touch
	  // events and can cause crashes when the nodes are removed from DOM, so we
	  // have to treat template elements as string templates. (#2805)
	  /* istanbul ignore if */
	  if (isRealTemplate(node)) {
	    return stringToFragment(node.innerHTML);
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}
	
	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();
	
	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();
	
	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */
	
	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}
	
	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */
	
	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;
	
	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }
	
	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }
	
	  return frag && shouldClone ? cloneNode(frag) : frag;
	}
	
	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});
	
	var html = {
	
	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },
	
	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },
	
	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};
	
	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 * @param {Fragment} [parentFrag]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}
	
	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */
	
	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};
	
	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */
	
	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}
	
	/**
	 * Remove fragment, single node version
	 */
	
	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}
	
	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */
	
	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}
	
	/**
	 * Remove fragment, multi-nodes version
	 */
	
	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}
	
	/**
	 * Prepare the fragment for removal.
	 */
	
	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};
	
	/**
	 * Destroy the fragment.
	 */
	
	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};
	
	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function attach(child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached');
	  }
	}
	
	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function detach(child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached');
	  }
	}
	
	var linkerCache = new Cache(5000);
	
	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}
	
	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */
	
	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};
	
	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var IF = 2100;
	var FOR = 2200;
	var SLOT = 2300;
	
	var uid$3 = 0;
	
	var vFor = {
	
	  priority: FOR,
	  terminal: true,
	
	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],
	
	  bind: function bind() {
	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }
	
	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
	      return;
	    }
	
	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;
	
	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';
	
	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);
	
	    // cache
	    this.cache = Object.create(null);
	
	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },
	
	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },
	
	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */
	
	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');
	
	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;
	
	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          withoutConversion(function () {
	            frag.scope[alias] = value;
	          });
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }
	
	    // we're done for the initial render.
	    if (init) {
	      return;
	    }
	
	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }
	
	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },
	
	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */
	
	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    // important: define the scope alias without forced conversion
	    // so that frozen data structures remain non-reactive.
	    withoutConversion(function () {
	      defineReactive(scope, alias, value);
	    });
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },
	
	  /**
	   * Update the v-ref on owner vm.
	   */
	
	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },
	
	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */
	
	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },
	
	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */
	
	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      var target = prevEl.nextSibling;
	      /* istanbul ignore if */
	      if (!target) {
	        // reset end anchor position in case the position was messed up
	        // by an external drag-n-drop library.
	        after(this.end, prevEl);
	        target = this.end;
	      }
	      frag.before(target);
	    }
	  },
	
	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */
	
	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },
	
	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */
	
	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },
	
	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */
	
	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = getTrackByKey(index, key, value, trackByKey);
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else if (Object.isExtensible(value)) {
	        def(value, id, frag);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
	      }
	    }
	    frag.raw = value;
	  },
	
	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */
	
	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },
	
	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */
	
	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },
	
	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */
	
	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },
	
	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */
	
	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },
	
	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * watcher's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */
	
	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};
	
	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */
	
	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}
	
	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */
	
	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}
	
	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */
	
	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}
	
	/**
	 * Get the track by key for an item.
	 *
	 * @param {Number} index
	 * @param {String} key
	 * @param {*} value
	 * @param {String} [trackByKey]
	 */
	
	function getTrackByKey(index, key, value, trackByKey) {
	  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
	}
	
	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
	  };
	}
	
	var vIf = {
	
	  priority: IF,
	  terminal: true,
	
	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
	      this.invalid = true;
	    }
	  },
	
	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },
	
	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },
	
	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};
	
	var show = {
	
	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },
	
	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },
	
	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};
	
	var text$2 = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;
	
	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }
	
	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }
	
	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };
	
	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }
	
	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }
	
	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }
	
	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    // #3029 only update when the value changes. This prevent
	    // browsers from overwriting values like selectionStart
	    value = _toString(value);
	    if (value !== this.el.value) this.el.value = value;
	  },
	
	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};
	
	var radio = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };
	
	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);
	
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};
	
	var select = {
	
	  bind: function bind() {
	    var _this = this;
	
	    var self = this;
	    var el = this.el;
	
	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };
	
	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');
	
	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);
	
	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }
	
	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', function () {
	      nextTick(_this.forceUpdate);
	    });
	  },
	
	  update: function update(value) {
	    var el = this.el;
	    if (!inDoc(el)) {
	      return nextTick(this.forceUpdate);
	    }
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },
	
	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};
	
	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */
	
	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}
	
	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */
	
	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}
	
	var checkbox = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };
	
	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }
	
	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };
	
	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};
	
	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};
	
	var model = {
	
	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],
	
	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */
	
	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },
	
	  /**
	   * Check read/write filter stats.
	   */
	
	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },
	
	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};
	
	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};
	
	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}
	
	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}
	
	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}
	
	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}
	
	var on$1 = {
	
	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,
	
	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },
	
	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }
	
	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
	      return;
	    }
	
	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }
	
	    this.reset();
	    this.handler = handler;
	
	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },
	
	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },
	
	  unbind: function unbind() {
	    this.reset();
	  }
	};
	
	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);
	
	var testEl = null;
	
	var style = {
	
	  deep: true,
	
	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },
	
	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },
	
	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
	        }
	        value = value.replace(importantRE, '').trim();
	        this.el.style.setProperty(prop.kebab, value, isImportant);
	      } else {
	        this.el.style[prop.camel] = value;
	      }
	    } else {
	      this.el.style[prop.camel] = '';
	    }
	  }
	
	};
	
	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}
	
	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  if (camel !== 'filter' && camel in testEl.style) {
	    return {
	      kebab: prop,
	      camel: camel
	    };
	  }
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return {
	        kebab: prefixes[i] + prop,
	        camel: prefixed
	      };
	    }
	  }
	}
	
	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;
	
	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;
	
	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};
	
	var bind$1 = {
	
	  priority: BIND,
	
	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }
	
	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }
	
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
	        }
	
	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
	        }
	      }
	    }
	  },
	
	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },
	
	  // share object handler with v-bind:class
	  handleObject: style.handleObject,
	
	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;
	
	      if (el[attr] !== attrValue) {
	        el[attr] = attrValue;
	      }
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};
	
	var el = {
	
	  priority: EL,
	
	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },
	
	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};
	
	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
	  }
	};
	
	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};
	
	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};
	
	var vClass = {
	
	  deep: true,
	
	  update: function update(value) {
	    if (!value) {
	      this.cleanup();
	    } else if (typeof value === 'string') {
	      this.setClass(value.trim().split(/\s+/));
	    } else {
	      this.setClass(normalize$1(value));
	    }
	  },
	
	  setClass: function setClass(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      var val = value[i];
	      if (val) {
	        apply(this.el, val, addClass);
	      }
	    }
	    this.prevKeys = value;
	  },
	
	  cleanup: function cleanup(value) {
	    var prevKeys = this.prevKeys;
	    if (!prevKeys) return;
	    var i = prevKeys.length;
	    while (i--) {
	      var key = prevKeys[i];
	      if (!value || value.indexOf(key) < 0) {
	        apply(this.el, key, removeClass);
	      }
	    }
	  }
	};
	
	/**
	 * Normalize objects and arrays (potentially containing objects)
	 * into array of strings.
	 *
	 * @param {Object|Array<String|Object>} value
	 * @return {Array<String>}
	 */
	
	function normalize$1(value) {
	  var res = [];
	  if (isArray(value)) {
	    for (var i = 0, l = value.length; i < l; i++) {
	      var _key = value[i];
	      if (_key) {
	        if (typeof _key === 'string') {
	          res.push(_key);
	        } else {
	          for (var k in _key) {
	            if (_key[k]) res.push(k);
	          }
	        }
	      }
	    }
	  } else if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) res.push(key);
	    }
	  }
	  return res;
	}
	
	/**
	 * Add or remove a class/classes on an element
	 *
	 * @param {Element} el
	 * @param {String} key The class name. This may or may not
	 *                     contain a space character, in such a
	 *                     case we'll deal with multiple class
	 *                     names at once.
	 * @param {Function} fn
	 */
	
	function apply(el, key, fn) {
	  key = key.trim();
	  if (key.indexOf(' ') === -1) {
	    fn(el, key);
	    return;
	  }
	  // The key contains one or more space characters.
	  // Since a class name doesn't accept such characters, we
	  // treat it as multiple classes.
	  var keys = key.split(/\s+/);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    fn(el, keys[i]);
	  }
	}
	
	var component = {
	
	  priority: COMPONENT,
	
	  params: ['keep-alive', 'transition-mode', 'inline-template'],
	
	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */
	
	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      this.el.removeAttribute(':is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },
	
	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */
	
	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },
	
	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */
	
	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },
	
	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */
	
	  resolveComponent: function resolveComponent(value, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(value, this.pendingComponentCb);
	  },
	
	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */
	
	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },
	
	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */
	
	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },
	
	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */
	
	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
	      }
	      return child;
	    }
	  },
	
	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */
	
	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },
	
	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */
	
	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      if (!this.keepAlive) {
	        this.waitingFor.$destroy();
	      }
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },
	
	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */
	
	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },
	
	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */
	
	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },
	
	  /**
	   * Unbind.
	   */
	
	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};
	
	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */
	
	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}
	
	var propBindingModes = config._propBindingModes;
	var empty = {};
	
	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;
	
	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @param {Vue} vm
	 * @return {Function} propsLinkFn
	 */
	
	function compileProps(el, propOptions, vm) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;
	
	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.', vm);
	      continue;
	    }
	
	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
	      continue;
	    }
	
	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };
	
	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
	        }
	      }
	      prop.parentPath = value;
	
	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.', vm);
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (process.env.NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
	      } else if (options.required) {
	        // warn missing required
	        warn('Missing required prop: ' + name, vm);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}
	
	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */
	
	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var inlineProps = vm.$options.propsData;
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (inlineProps && hasOwn(inlineProps, path)) {
	        initProp(vm, prop, inlineProps[path]);
	      }if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value, or with same
	        // literal value (e.g. disabled="disabled")
	        // see https://github.com/vuejs/vue-loader/issues/182
	        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}
	
	/**
	 * Process a prop with a rawValue, applying necessary coersions,
	 * default values & assertions and call the given callback with
	 * processed value.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} rawValue
	 * @param {Function} fn
	 */
	
	function processPropValue(vm, prop, rawValue, fn) {
	  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
	  var value = rawValue;
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop);
	  }
	  value = coerceProp(prop, value, vm);
	  var coerced = value !== rawValue;
	  if (!assertProp(prop, value, vm)) {
	    value = undefined;
	  }
	  if (isSimple && !coerced) {
	    withoutConversion(function () {
	      fn(value);
	    });
	  } else {
	    fn(value);
	  }
	}
	
	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	function initProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    defineReactive(vm, prop.path, value);
	  });
	}
	
	/**
	 * Update a prop's value on a vm.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	function updateProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    vm[prop.path] = value;
	  });
	}
	
	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @return {*}
	 */
	
	function getPropDefaultValue(vm, prop) {
	  // no default, return undefined
	  var options = prop.options;
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}
	
	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 * @param {Vue} vm
	 */
	
	function assertProp(prop, value, vm) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = !type;
	  var expectedTypes = [];
	  if (type) {
	    if (!isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	    }
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
	      return false;
	    }
	  }
	  return true;
	}
	
	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */
	
	function coerceProp(prop, value, vm) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  if (typeof coerce === 'function') {
	    return coerce(value);
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + '.', vm);
	    return value;
	  }
	}
	
	/**
	 * Assert the type of a value
	 *
	 * @param {*} value
	 * @param {Function} type
	 * @return {Object}
	 */
	
	function assertType(value, type) {
	  var valid;
	  var expectedType;
	  if (type === String) {
	    expectedType = 'string';
	    valid = typeof value === expectedType;
	  } else if (type === Number) {
	    expectedType = 'number';
	    valid = typeof value === expectedType;
	  } else if (type === Boolean) {
	    expectedType = 'boolean';
	    valid = typeof value === expectedType;
	  } else if (type === Function) {
	    expectedType = 'function';
	    valid = typeof value === expectedType;
	  } else if (type === Object) {
	    expectedType = 'object';
	    valid = isPlainObject(value);
	  } else if (type === Array) {
	    expectedType = 'array';
	    valid = isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  };
	}
	
	/**
	 * Format type for output
	 *
	 * @param {String} type
	 * @return {String}
	 */
	
	function formatType(type) {
	  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	}
	
	/**
	 * Format value
	 *
	 * @param {*} value
	 * @return {String}
	 */
	
	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}
	
	var bindingModes = config._propBindingModes;
	
	var propDef = {
	
	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;
	
	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      updateProp(child, prop, val);
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });
	
	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);
	
	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },
	
	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};
	
	var queue$1 = [];
	var queued = false;
	
	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */
	
	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}
	
	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */
	
	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}
	
	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';
	
	/**
	 * If a just-entered element is applied the
	 * leave class while its enter transition hasn't started yet,
	 * and the transitioned property has the same value for both
	 * enter/leave, then the leave transition will be skipped and
	 * the transitionend event never fires. This function ensures
	 * its callback to be called after a transition has started
	 * by waiting for double raf.
	 *
	 * It falls back to setTimeout on devices that support CSS
	 * transitions but not raf (e.g. Android 4.2 browser) - since
	 * these environments are usually slow, we are giving it a
	 * relatively large timeout.
	 */
	
	var raf = inBrowser && window.requestAnimationFrame;
	var waitForTransitionStart = raf
	/* istanbul ignore next */
	? function (fn) {
	  raf(function () {
	    raf(fn);
	  });
	} : function (fn) {
	  setTimeout(fn, 50);
	};
	
	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}
	
	var p$1 = Transition.prototype;
	
	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */
	
	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};
	
	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */
	
	p$1.enterNextTick = function () {
	  var _this = this;
	
	  // prevent transition skipping
	  this.justEntered = true;
	  waitForTransitionStart(function () {
	    _this.justEntered = false;
	  });
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};
	
	/**
	 * The "cleanup" phase of an entering transition.
	 */
	
	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};
	
	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */
	
	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};
	
	/**
	 * The "nextTick" phase of a leaving transition.
	 */
	
	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};
	
	/**
	 * The "cleanup" phase of a leaving transition.
	 */
	
	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};
	
	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */
	
	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};
	
	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */
	
	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};
	
	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */
	
	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};
	
	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */
	
	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};
	
	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};
	
	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */
	
	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}
	
	var transition$1 = {
	
	  priority: TRANSITION,
	
	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    oldId = oldId || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    removeClass(el, oldId + '-transition');
	    addClass(el, id + '-transition');
	  }
	};
	
	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};
	
	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;
	
	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	var DEFAULT_TERMINAL_PRIORITY = 2000;
	
	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */
	
	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;
	
	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */
	
	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}
	
	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */
	
	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}
	
	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */
	
	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}
	
	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */
	
	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}
	
	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */
	
	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}
	
	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */
	
	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props, vm);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}
	
	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */
	
	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;
	
	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
	    }
	  }
	
	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }
	
	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);
	
	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}
	
	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && !isScript(node)) {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}
	
	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  var attrs = hasAttrs && toArray(el.attributes);
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, attrs, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(attrs, options);
	  }
	  return linkFn;
	}
	
	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */
	
	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }
	
	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }
	
	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }
	
	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}
	
	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */
	
	function removeText(vm, node) {
	  remove(node);
	}
	
	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */
	
	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}
	
	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */
	
	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = _toString(value);
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}
	
	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */
	
	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}
	
	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */
	
	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}
	
	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */
	
	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}
	
	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */
	
	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}
	
	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Array} attrs
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */
	
	function checkTerminalDirectives(el, attrs, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }
	
	  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	  for (var i = 0, j = attrs.length; i < j; i++) {
	    attr = attrs[i];
	    name = attr.name.replace(modifierRE, '');
	    if (matched = name.match(dirAttrRE)) {
	      def = resolveAsset(options, 'directives', matched[1]);
	      if (def && def.terminal) {
	        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	          termDef = def;
	          rawName = attr.name;
	          modifiers = parseModifiers(attr.name);
	          value = attr.value;
	          dirName = matched[1];
	          arg = matched[2];
	        }
	      }
	    }
	  }
	
	  if (termDef) {
	    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	  }
	}
	
	function skip() {}
	skip.terminal = true;
	
	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} def
	 * @param {String} [rawName]
	 * @param {String} [arg]
	 * @param {Object} [modifiers]
	 * @return {Function} terminalLinkFn
	 */
	
	function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    arg: arg,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    attr: rawName,
	    modifiers: modifiers,
	    def: def
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}
	
	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */
	
	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');
	
	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
	        }
	      }
	    } else
	
	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else
	
	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else
	
	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else
	
	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];
	
	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }
	
	              dirDef = resolveAsset(options, 'directives', dirName, true);
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }
	
	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */
	
	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }
	
	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}
	
	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */
	
	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}
	
	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */
	
	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}
	
	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */
	
	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}
	
	function isScript(el) {
	  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
	}
	
	var specialCharRE = /[^\w\-:\.]/;
	
	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}
	
	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}
	
	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */
	
	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}
	
	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */
	
	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}
	
	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */
	
	function resolveSlots(vm, content) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = Object.create(null);
	  var el, name;
	  for (var i = 0, l = content.children.length; i < l; i++) {
	    el = content.children[i];
	    /* eslint-disable no-cond-assign */
	    if (name = el.getAttribute('slot')) {
	      (contents[name] || (contents[name] = [])).push(el);
	    }
	    /* eslint-enable no-cond-assign */
	    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
	      warn('The "slot" attribute must be static.', vm.$parent);
	    }
	  }
	  for (name in contents) {
	    contents[name] = extractFragment(contents[name], content);
	  }
	  if (content.hasChildNodes()) {
	    var nodes = content.childNodes;
	    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
	      return;
	    }
	    contents['default'] = extractFragment(content.childNodes, content);
	  }
	}
	
	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @return {DocumentFragment}
	 */
	
	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      parent.removeChild(node);
	      node = parseTemplate(node, true);
	    }
	    frag.appendChild(node);
	  }
	  return frag;
	}
	
	
	
	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude,
		resolveSlots: resolveSlots
	});
	
	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */
	
	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });
	
	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */
	
	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };
	
	  /**
	   * Initialize props.
	   */
	
	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };
	
	  /**
	   * Initialize the data.
	   */
	
	  Vue.prototype._initData = function () {
	    var dataFn = this.$options.data;
	    var data = this._data = dataFn ? dataFn() : {};
	    if (!isPlainObject(data)) {
	      data = {};
	      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
	    }
	    var props = this._props;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      // there are two scenarios where we can proxy a data key:
	      // 1. it's not already defined as a prop
	      // 2. it's provided via a instantiation option AND there are no
	      //    template prop present
	      if (!props || !hasOwn(props, key)) {
	        this._proxy(key);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
	      }
	    }
	    // observe data
	    observe(data, this);
	  };
	
	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */
	
	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };
	
	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };
	
	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };
	
	  /**
	   * Force update on every watcher in scope.
	   */
	
	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };
	
	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */
	
	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };
	
	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }
	
	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */
	
	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };
	
	  /**
	   * Initialize meta information like $index, $key & $value.
	   */
	
	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}
	
	var eventRE = /^v-on:|^@/;
	
	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */
	
	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };
	
	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */
	
	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, value, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        // force the expression into a statement so that
	        // it always dynamically resolves the method to call (#2670)
	        // kinda ugly hack, but does the job.
	        value = attrs[i].value;
	        if (isSimplePath(value)) {
	          value += '.apply(this, $arguments)';
	        }
	        handler = (vm._scope || vm._context).$eval(value, true);
	        handler._fromParent = true;
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }
	
	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */
	
	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }
	
	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */
	
	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }
	
	  /**
	   * Setup recursive attached/detached calls
	   */
	
	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };
	
	  /**
	   * Callback to recursively call attached hook on children
	   */
	
	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }
	
	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */
	
	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }
	
	  /**
	   * Callback to recursively call detached hook on children
	   */
	
	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }
	
	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */
	
	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }
	
	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */
	
	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}
	
	function noop$1() {}
	
	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Object} [modifiers]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} arg
	 *                 - {String} raw
	 *                 - {String} [ref]
	 *                 - {Array<Object>} [interp]
	 *                 - {Boolean} [hasOneTime]
	 * @param {Vue} vm
	 * @param {Node} el
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}
	
	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 */
	
	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;
	
	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }
	
	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }
	
	  // setup directive params
	  this._setupParams();
	
	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;
	
	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop$1;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};
	
	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */
	
	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = hyphenate(params[i]);
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};
	
	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */
	
	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};
	
	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */
	
	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};
	
	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */
	
	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};
	
	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */
	
	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};
	
	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */
	
	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};
	
	/**
	 * Teardown the watcher and call unbind.
	 */
	
	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};
	
	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */
	
	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };
	
	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */
	
	  Vue.prototype._compile = function (el) {
	    var options = this.$options;
	
	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);
	
	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }
	
	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);
	
	    // resolve slot distribution
	    resolveSlots(this, options._content);
	
	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }
	
	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);
	
	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };
	
	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }
	
	    this._isCompiled = true;
	    this._callHook('compiled');
	  };
	
	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */
	
	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };
	
	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {Object} descriptor - parsed directive descriptor
	   * @param {Node} node   - target node
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */
	
	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };
	
	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */
	
	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }
	
	    var destroyReady;
	    var pendingRemoval;
	
	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };
	
	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }
	
	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }
	
	    destroyReady = true;
	    cleanupIfPossible();
	  };
	
	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */
	
	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data && this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}
	
	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */
	
	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[write ? l - i - 1 : i];
	      fn = resolveAsset(this.$options, 'filters', filter.name, true);
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };
	
	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */
	
	  Vue.prototype._resolveComponent = function (value, cb) {
	    var factory;
	    if (typeof value === 'function') {
	      factory = value;
	    } else {
	      factory = resolveAsset(this.$options, 'components', value, true);
	    }
	    /* istanbul ignore if */
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}
	
	var filterRE$1 = /[^|]\|[^|]/;
	
	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */
	
	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };
	
	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */
	
	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };
	
	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };
	
	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */
	
	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };
	
	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */
	
	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };
	
	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */
	
	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };
	
	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */
	
	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      var key;
	      for (key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	      if (this._props) {
	        for (key in this._props) {
	          data[key] = clean(this[key]);
	        }
	      }
	    }
	    console.log(data);
	  };
	
	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */
	
	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}
	
	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };
	
	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };
	
	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };
	
	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };
	
	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };
	
	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };
	
	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */
	
	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }
	
	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */
	
	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }
	
	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }
	
	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }
	
	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}
	
	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };
	
	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };
	
	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */
	
	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };
	
	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */
	
	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */
	
	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };
	
	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */
	
	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}
	
	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */
	
	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };
	
	  /**
	   * Mark an instance as ready.
	   */
	
	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }
	
	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   *
	   * @param {Boolean} remove
	   * @param {Boolean} deferCleanup
	   */
	
	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };
	
	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [frag]
	   * @return {Function}
	   */
	
	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}
	
	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */
	
	function Vue(options) {
	  this._init(options);
	}
	
	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);
	
	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);
	
	var slot = {
	
	  priority: SLOT,
	  params: ['name'],
	
	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },
	
	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },
	
	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },
	
	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};
	
	var partial = {
	
	  priority: PARTIAL,
	
	  params: ['name'],
	
	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },
	
	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },
	
	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};
	
	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};
	
	var convertArray = vFor._postProcess;
	
	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */
	
	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}
	
	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */
	
	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}
	
	/**
	 * Filter filter for arrays
	 *
	 * @param {String|Array<String>|Function} ...sortKeys
	 * @param {Number} [order]
	 */
	
	function orderBy(arr) {
	  var comparator = null;
	  var sortKeys = undefined;
	  arr = convertArray(arr);
	
	  // determine order (last argument)
	  var args = toArray(arguments, 1);
	  var order = args[args.length - 1];
	  if (typeof order === 'number') {
	    order = order < 0 ? -1 : 1;
	    args = args.length > 1 ? args.slice(0, -1) : args;
	  } else {
	    order = 1;
	  }
	
	  // determine sortKeys & comparator
	  var firstArg = args[0];
	  if (!firstArg) {
	    return arr;
	  } else if (typeof firstArg === 'function') {
	    // custom comparator
	    comparator = function (a, b) {
	      return firstArg(a, b) * order;
	    };
	  } else {
	    // string keys. flatten first
	    sortKeys = Array.prototype.concat.apply([], args);
	    comparator = function (a, b, i) {
	      i = i || 0;
	      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
	    };
	  }
	
	  function baseCompare(a, b, sortKeyIndex) {
	    var sortKey = sortKeys[sortKeyIndex];
	    if (sortKey) {
	      if (sortKey !== '$key') {
	        if (isObject(a) && '$value' in a) a = a.$value;
	        if (isObject(b) && '$value' in b) b = b.$value;
	      }
	      a = isObject(a) ? getPath(a, sortKey) : a;
	      b = isObject(b) ? getPath(b, sortKey) : b;
	    }
	    return a === b ? 0 : a > b ? order : -order;
	  }
	
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(comparator);
	}
	
	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */
	
	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}
	
	var digitsRE = /(\d{3})(?=\d)/g;
	
	// asset collections must be a plain object.
	var filters = {
	
	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,
	
	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */
	
	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },
	
	  /**
	   * 'abc' => 'Abc'
	   */
	
	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },
	
	  /**
	   * 'abc' => 'ABC'
	   */
	
	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },
	
	  /**
	   * 'AbC' => 'abc'
	   */
	
	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },
	
	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   * @param {Number} decimals Decimal places
	   */
	
	  currency: function currency(value, _currency, decimals) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    decimals = decimals != null ? decimals : 2;
	    var stringified = Math.abs(value).toFixed(decimals);
	    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = decimals ? stringified.slice(-1 - decimals) : '';
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },
	
	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */
	
	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	  },
	
	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */
	
	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};
	
	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */
	
	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };
	
	  /**
	   * Expose useful internals
	   */
	
	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;
	
	  /**
	   * The following are exposed for advanced usage / plugins
	   */
	
	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };
	
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	
	  Vue.cid = 0;
	  var cid = 1;
	
	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */
	
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };
	
	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */
	
	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }
	
	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */
	
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };
	
	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */
	
	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };
	
	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */
	
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          if (!definition.name) {
	            definition.name = id;
	          }
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });
	
	  // expose internal transition API
	  extend(Vue.transition, transition);
	}
	
	installGlobalAPI(Vue);
	
	Vue.version = '1.0.25';
	
	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue);
	    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	    }
	  }
	}, 0);
	
	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
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
	    var timeout = cachedSetTimeout(cleanUpNextTick);
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
	    cachedClearTimeout(timeout);
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
	        cachedSetTimeout(drainQueue, 0);
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
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*!
	 * vue-resource v0.8.0
	 * https://github.com/vuejs/vue-resource
	 * Released under the MIT License.
	 */
	
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};
	
	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */
	
	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING = 2;
	
	function Promise$2(executor) {
	
	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];
	
	    var promise = this;
	
	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}
	
	Promise$2.reject = function (r) {
	    return new Promise$2(function (resolve, reject) {
	        reject(r);
	    });
	};
	
	Promise$2.resolve = function (x) {
	    return new Promise$2(function (resolve, reject) {
	        resolve(x);
	    });
	};
	
	Promise$2.all = function all(iterable) {
	    return new Promise$2(function (resolve, reject) {
	        var count = 0,
	            result = [];
	
	        if (iterable.length === 0) {
	            resolve(result);
	        }
	
	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;
	
	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }
	
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$2.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};
	
	Promise$2.race = function race(iterable) {
	    return new Promise$2(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$2.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};
	
	var p$1 = Promise$2.prototype;
	
	p$1.resolve = function resolve(x) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        var called = false;
	
	        try {
	            var then = x && x['then'];
	
	            if (x !== null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }
	
	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};
	
	p$1.reject = function reject(reason) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};
	
	p$1.notify = function notify() {
	    var promise = this;
	
	    nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];
	
	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};
	
	p$1.then = function then(onResolved, onRejected) {
	    var promise = this;
	
	    return new Promise$2(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};
	
	p$1.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};
	
	var PromiseObj = window.Promise || Promise$2;
	
	function Promise$1(executor, context) {
	
	    if (executor instanceof PromiseObj) {
	        this.promise = executor;
	    } else {
	        this.promise = new PromiseObj(executor.bind(context));
	    }
	
	    this.context = context;
	}
	
	Promise$1.all = function (iterable, context) {
	    return new Promise$1(PromiseObj.all(iterable), context);
	};
	
	Promise$1.resolve = function (value, context) {
	    return new Promise$1(PromiseObj.resolve(value), context);
	};
	
	Promise$1.reject = function (reason, context) {
	    return new Promise$1(PromiseObj.reject(reason), context);
	};
	
	Promise$1.race = function (iterable, context) {
	    return new Promise$1(PromiseObj.race(iterable), context);
	};
	
	var p = Promise$1.prototype;
	
	p.bind = function (context) {
	    this.context = context;
	    return this;
	};
	
	p.then = function (fulfilled, rejected) {
	
	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    this.promise = this.promise.then(fulfilled, rejected);
	
	    return this;
	};
	
	p.catch = function (rejected) {
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    this.promise = this.promise.catch(rejected);
	
	    return this;
	};
	
	p.finally = function (callback) {
	
	    return this.then(function (value) {
	        callback.call(this);
	        return value;
	    }, function (reason) {
	        callback.call(this);
	        return PromiseObj.reject(reason);
	    });
	};
	
	p.success = function (callback) {
	
	    warn('The `success` method has been deprecated. Use the `then` method instead.');
	
	    return this.then(function (response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    });
	};
	
	p.error = function (callback) {
	
	    warn('The `error` method has been deprecated. Use the `catch` method instead.');
	
	    return this.catch(function (response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    });
	};
	
	p.always = function (callback) {
	
	    warn('The `always` method has been deprecated. Use the `finally` method instead.');
	
	    var cb = function cb(response) {
	        return callback.call(this, response.data, response.status, response) || response;
	    };
	
	    return this.then(cb, cb);
	};
	
	var debug = false;
	var util = {};
	var array = [];
	function Util (Vue) {
	    util = Vue.util;
	    debug = Vue.config.debug || !Vue.config.silent;
	}
	
	var isArray = Array.isArray;
	
	function warn(msg) {
	    if (typeof console !== 'undefined' && debug) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	}
	
	function error(msg) {
	    if (typeof console !== 'undefined') {
	        console.error(msg);
	    }
	}
	
	function nextTick(cb, ctx) {
	    return util.nextTick(cb, ctx);
	}
	
	function trim(str) {
	    return str.replace(/^\s*|\s*$/g, '');
	}
	
	function toLower(str) {
	    return str ? str.toLowerCase() : '';
	}
	
	function isString(val) {
	    return typeof val === 'string';
	}
	
	function isFunction(val) {
	    return typeof val === 'function';
	}
	
	function isObject(obj) {
	    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	}
	
	function isPlainObject(obj) {
	    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	}
	
	function when(value, fulfilled, rejected) {
	
	    var promise = Promise$1.resolve(value);
	
	    if (arguments.length < 2) {
	        return promise;
	    }
	
	    return promise.then(fulfilled, rejected);
	}
	
	function options(fn, obj, opts) {
	
	    opts = opts || {};
	
	    if (isFunction(opts)) {
	        opts = opts.call(obj);
	    }
	
	    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
	}
	
	function each(obj, iterator) {
	
	    var i, key;
	
	    if (typeof obj.length == 'number') {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (isObject(obj)) {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }
	
	    return obj;
	}
	
	function extend(target) {
	
	    var args = array.slice.call(arguments, 1);
	
	    args.forEach(function (arg) {
	        _merge(target, arg);
	    });
	
	    return target;
	}
	
	function merge(target) {
	
	    var args = array.slice.call(arguments, 1);
	
	    args.forEach(function (arg) {
	        _merge(target, arg, true);
	    });
	
	    return target;
	}
	
	function _merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }
	            _merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}
	
	function root (options, next) {
	
	    var url = next(options);
	
	    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
	        url = options.root + '/' + url;
	    }
	
	    return url;
	}
	
	function query (options, next) {
	
	    var urlParams = Object.keys(Url.options.params),
	        query = {},
	        url = next(options);
	
	    each(options.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });
	
	    query = Url.params(query);
	
	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }
	
	    return url;
	}
	
	function legacy (options, next) {
	
	    var variables = [],
	        url = next(options);
	
	    url = url.replace(/(\/?):([a-z]\w*)/gi, function (match, slash, name) {
	
	        warn('The `:' + name + '` parameter syntax has been deprecated. Use the `{' + name + '}` syntax instead.');
	
	        if (options.params[name]) {
	            variables.push(name);
	            return slash + encodeUriSegment(options.params[name]);
	        }
	
	        return '';
	    });
	
	    variables.forEach(function (key) {
	        delete options.params[key];
	    });
	
	    return url;
	}
	
	function encodeUriSegment(value) {
	
	    return encodeUriQuery(value, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
	}
	
	function encodeUriQuery(value, spaces) {
	
	    return encodeURIComponent(value).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, spaces ? '%20' : '+');
	}
	
	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */
	
	function expand(url, params, variables) {
	
	    var tmpl = parse(url),
	        expanded = tmpl.expand(params);
	
	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }
	
	    return expanded;
	}
	
	function parse(template) {
	
	    var operators = ['+', '#', '.', '/', ';', '?', '&'],
	        variables = [];
	
	    return {
	        vars: variables,
	        expand: function expand(context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {
	
	                    var operator = null,
	                        values = [];
	
	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }
	
	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });
	
	                    if (operator && operator !== '+') {
	
	                        var separator = ',';
	
	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }
	
	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }
	                } else {
	                    return encodeReserved(literal);
	                }
	            });
	        }
	    };
	}
	
	function getValues(context, operator, key, modifier) {
	
	    var value = context[key],
	        result = [];
	
	    if (isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();
	
	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }
	
	            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            result.push(encodeValue(operator, value[k], k));
	                        }
	                    });
	                }
	            } else {
	                var tmp = [];
	
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        tmp.push(encodeValue(operator, value));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(encodeValue(operator, value[k].toString()));
	                        }
	                    });
	                }
	
	                if (isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }
	
	    return result;
	}
	
	function isDefined(value) {
	    return value !== undefined && value !== null;
	}
	
	function isKeyOperator(operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	}
	
	function encodeValue(operator, value, key) {
	
	    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);
	
	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	}
	
	function encodeReserved(str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	}
	
	function template (options) {
	
	    var variables = [],
	        url = expand(options.url, options.params, variables);
	
	    variables.forEach(function (key) {
	        delete options.params[key];
	    });
	
	    return url;
	}
	
	/**
	 * Service for URL templating.
	 */
	
	var ie = document.documentMode;
	var el = document.createElement('a');
	
	function Url(url, params) {
	
	    var self = this || {},
	        options = url,
	        transform;
	
	    if (isString(url)) {
	        options = { url: url, params: params };
	    }
	
	    options = merge({}, Url.options, self.$options, options);
	
	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, self.$vm);
	    });
	
	    return transform(options);
	}
	
	/**
	 * Url options.
	 */
	
	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};
	
	/**
	 * Url transforms.
	 */
	
	Url.transforms = [template, legacy, query, root];
	
	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */
	
	Url.params = function (obj) {
	
	    var params = [],
	        escape = encodeURIComponent;
	
	    params.add = function (key, value) {
	
	        if (isFunction(value)) {
	            value = value();
	        }
	
	        if (value === null) {
	            value = '';
	        }
	
	        this.push(escape(key) + '=' + escape(value));
	    };
	
	    serialize(params, obj);
	
	    return params.join('&').replace(/%20/g, '+');
	};
	
	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */
	
	Url.parse = function (url) {
	
	    if (ie) {
	        el.href = url;
	        url = el.href;
	    }
	
	    el.href = url;
	
	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};
	
	function factory(handler, next, vm) {
	    return function (options) {
	        return handler.call(vm, options, next);
	    };
	}
	
	function serialize(params, obj, scope) {
	
	    var array = isArray(obj),
	        plain = isPlainObject(obj),
	        hash;
	
	    each(obj, function (value, key) {
	
	        hash = isObject(value) || isArray(value);
	
	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }
	
	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}
	
	function xdrClient (request) {
	    return new Promise$1(function (resolve) {
	
	        var xdr = new XDomainRequest(),
	            response = { request: request },
	            handler;
	
	        request.cancel = function () {
	            xdr.abort();
	        };
	
	        xdr.open(request.method, Url(request), true);
	
	        handler = function handler(event) {
	
	            response.data = xdr.responseText;
	            response.status = xdr.status;
	            response.statusText = xdr.statusText || '';
	
	            resolve(response);
	        };
	
	        xdr.timeout = 0;
	        xdr.onload = handler;
	        xdr.onabort = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = function () {};
	        xdr.onprogress = function () {};
	
	        xdr.send(request.data);
	    });
	}
	
	var originUrl = Url.parse(location.href);
	var supportCors = 'withCredentials' in new XMLHttpRequest();
	
	function cors (request, next) {
	
	    if (request.crossOrigin === null) {
	        request.crossOrigin = crossOrigin(request);
	    }
	
	    if (request.crossOrigin) {
	
	        if (!supportCors) {
	            request.client = xdrClient;
	        }
	
	        request.emulateHTTP = false;
	    }
	
	    next();
	}
	
	function crossOrigin(request) {
	
	    var requestUrl = Url.parse(Url(request));
	
	    return requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host;
	}
	
	function mime (request, next) {
	
	    if (request.emulateJSON && isPlainObject(request.data)) {
	        request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	        request.data = Url.params(request.data);
	    }
	
	    if (isObject(request.data) && /FormData/i.test(request.data.toString())) {
	        delete request.headers['Content-Type'];
	    }
	
	    if (isPlainObject(request.data)) {
	        request.data = JSON.stringify(request.data);
	    }
	
	    next(function (response) {
	
	        try {
	            response.data = JSON.parse(response.data);
	        } catch (e) {}
	    });
	}
	
	function jsonpClient (request) {
	    return new Promise$1(function (resolve) {
	
	        var callback = '_jsonp' + Math.random().toString(36).substr(2),
	            response = { request: request, data: null },
	            handler,
	            script;
	
	        request.params[request.jsonp] = callback;
	        request.cancel = function () {
	            handler({ type: 'cancel' });
	        };
	
	        script = document.createElement('script');
	        script.src = Url(request);
	        script.type = 'text/javascript';
	        script.async = true;
	
	        window[callback] = function (data) {
	            response.data = data;
	        };
	
	        handler = function handler(event) {
	
	            if (event.type === 'load' && response.data !== null) {
	                response.status = 200;
	            } else if (event.type === 'error') {
	                response.status = 404;
	            } else {
	                response.status = 0;
	            }
	
	            resolve(response);
	
	            delete window[callback];
	            document.body.removeChild(script);
	        };
	
	        script.onload = handler;
	        script.onerror = handler;
	
	        document.body.appendChild(script);
	    });
	}
	
	function jsonp (request, next) {
	
	    if (request.method == 'JSONP') {
	        request.client = jsonpClient;
	    }
	
	    next();
	}
	
	function before (request, next) {
	
	    if (isFunction(request.beforeSend)) {
	        request.beforeSend.call(this, request);
	    }
	
	    next();
	}
	
	/**
	 * HTTP method override Interceptor.
	 */
	
	function method (request, next) {
	
	    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	        request.headers['X-HTTP-Method-Override'] = request.method;
	        request.method = 'POST';
	    }
	
	    next();
	}
	
	function header (request, next) {
	
	    request.method = request.method.toUpperCase();
	    request.headers = extend({}, Http.headers.common, !request.crossOrigin ? Http.headers.custom : {}, Http.headers[request.method.toLowerCase()], request.headers);
	
	    if (isPlainObject(request.data) && /^(GET|JSONP)$/i.test(request.method)) {
	        extend(request.params, request.data);
	        delete request.data;
	    }
	
	    next();
	}
	
	/**
	 * Timeout Interceptor.
	 */
	
	function timeout (request, next) {
	
	    var timeout;
	
	    if (request.timeout) {
	        timeout = setTimeout(function () {
	            request.cancel();
	        }, request.timeout);
	    }
	
	    next(function (response) {
	
	        clearTimeout(timeout);
	    });
	}
	
	function xhrClient (request) {
	    return new Promise$1(function (resolve) {
	
	        var xhr = new XMLHttpRequest(),
	            response = { request: request },
	            handler;
	
	        request.cancel = function () {
	            xhr.abort();
	        };
	
	        xhr.open(request.method, Url(request), true);
	
	        handler = function handler(event) {
	
	            response.data = 'response' in xhr ? xhr.response : xhr.responseText;
	            response.status = xhr.status === 1223 ? 204 : xhr.status; // IE9 status bug
	            response.statusText = trim(xhr.statusText || '');
	            response.allHeaders = xhr.getAllResponseHeaders();
	
	            resolve(response);
	        };
	
	        xhr.timeout = 0;
	        xhr.onload = handler;
	        xhr.onabort = handler;
	        xhr.onerror = handler;
	        xhr.ontimeout = function () {};
	        xhr.onprogress = function () {};
	
	        if (isPlainObject(request.xhr)) {
	            extend(xhr, request.xhr);
	        }
	
	        if (isPlainObject(request.upload)) {
	            extend(xhr.upload, request.upload);
	        }
	
	        each(request.headers || {}, function (value, header) {
	            xhr.setRequestHeader(header, value);
	        });
	
	        xhr.send(request.data);
	    });
	}
	
	function Client (context) {
	
	    var reqHandlers = [sendRequest],
	        resHandlers = [];
	
	    if (!isObject(context)) {
	        context = null;
	    }
	
	    function Client(request) {
	        return new Promise$1(function (resolve) {
	
	            function exec() {
	                reqHandlers.pop().call(context, request, next);
	            }
	
	            function next(response) {
	                when(response, function (response) {
	
	                    if (isFunction(response)) {
	
	                        resHandlers.unshift(response);
	                    } else if (isObject(response)) {
	
	                        processResponse(response);
	
	                        resHandlers.forEach(function (handler) {
	                            handler.call(context, response);
	                        });
	
	                        resolve(response);
	
	                        return;
	                    }
	
	                    exec();
	                });
	            }
	
	            exec();
	        }, context);
	    }
	
	    Client.use = function (handler) {
	        reqHandlers.push(handler);
	    };
	
	    return Client;
	}
	
	function sendRequest(request, resolve) {
	
	    var client = request.client || xhrClient;
	
	    resolve(client(request));
	}
	
	function processResponse(response) {
	
	    var headers = response.headers || response.allHeaders;
	
	    if (isString(headers)) {
	        headers = parseHeaders(headers);
	    }
	
	    if (isObject(headers)) {
	        response.headers = function (name) {
	            return name ? headers[toLower(name)] : headers;
	        };
	    }
	
	    response.ok = response.status >= 200 && response.status < 300;
	
	    return response;
	}
	
	function parseHeaders(str) {
	
	    var headers = {},
	        value,
	        name,
	        i;
	
	    each(str.split('\n'), function (row) {
	
	        i = row.indexOf(':');
	        name = trim(toLower(row.slice(0, i)));
	        value = trim(row.slice(i + 1));
	
	        if (headers[name]) {
	
	            if (isArray(headers[name])) {
	                headers[name].push(value);
	            } else {
	                headers[name] = [headers[name], value];
	            }
	        } else {
	
	            headers[name] = value;
	        }
	    });
	
	    return headers;
	}
	
	/**
	 * Service for sending network requests.
	 */
	
	var jsonType = { 'Content-Type': 'application/json' };
	
	function Http(url, options) {
	
	    var self = this || {},
	        client = Client(self.$vm),
	        request,
	        promise;
	
	    Http.interceptors.forEach(function (handler) {
	        client.use(handler);
	    });
	
	    options = isObject(url) ? url : extend({ url: url }, options);
	    request = merge({}, Http.options, self.$options, options);
	    promise = client(request).then(function (response) {
	
	        return response.ok ? response : Promise$1.reject(response);
	    }, function (response) {
	
	        if (response instanceof Error) {
	            error(response);
	        }
	
	        return Promise$1.reject(response);
	    });
	
	    if (request.success) {
	        promise.success(request.success);
	    }
	
	    if (request.error) {
	        promise.error(request.error);
	    }
	
	    return promise;
	}
	
	Http.options = {
	    method: 'get',
	    data: '',
	    params: {},
	    headers: {},
	    xhr: null,
	    upload: null,
	    jsonp: 'callback',
	    beforeSend: null,
	    crossOrigin: null,
	    emulateHTTP: false,
	    emulateJSON: false,
	    timeout: 0
	};
	
	Http.headers = {
	    put: jsonType,
	    post: jsonType,
	    patch: jsonType,
	    delete: jsonType,
	    common: { 'Accept': 'application/json, text/plain, */*' },
	    custom: { 'X-Requested-With': 'XMLHttpRequest' }
	};
	
	Http.interceptors = [before, timeout, jsonp, method, mime, header, cors];
	
	['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {
	
	    Http[method] = function (url, data, success, options) {
	
	        if (isFunction(data)) {
	            options = success;
	            success = data;
	            data = undefined;
	        }
	
	        if (isObject(success)) {
	            options = success;
	            success = undefined;
	        }
	
	        return this(url, extend({ method: method, data: data, success: success }, options));
	    };
	});
	
	function Resource(url, params, actions, options) {
	
	    var self = this || {},
	        resource = {};
	
	    actions = extend({}, Resource.actions, actions);
	
	    each(actions, function (action, name) {
	
	        action = merge({ url: url, params: params || {} }, options, action);
	
	        resource[name] = function () {
	            return (self.$http || Http)(opts(action, arguments));
	        };
	    });
	
	    return resource;
	}
	
	function opts(action, args) {
	
	    var options = extend({}, action),
	        params = {},
	        data,
	        success,
	        error;
	
	    switch (args.length) {
	
	        case 4:
	
	            error = args[3];
	            success = args[2];
	
	        case 3:
	        case 2:
	
	            if (isFunction(args[1])) {
	
	                if (isFunction(args[0])) {
	
	                    success = args[0];
	                    error = args[1];
	
	                    break;
	                }
	
	                success = args[1];
	                error = args[2];
	            } else {
	
	                params = args[0];
	                data = args[1];
	                success = args[2];
	
	                break;
	            }
	
	        case 1:
	
	            if (isFunction(args[0])) {
	                success = args[0];
	            } else if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                data = args[0];
	            } else {
	                params = args[0];
	            }
	
	            break;
	
	        case 0:
	
	            break;
	
	        default:
	
	            throw 'Expected up to 4 arguments [params, data, success, error], got ' + args.length + ' arguments';
	    }
	
	    options.data = data;
	    options.params = extend({}, options.params, params);
	
	    if (success) {
	        options.success = success;
	    }
	
	    if (error) {
	        options.error = error;
	    }
	
	    return options;
	}
	
	Resource.actions = {
	
	    get: { method: 'GET' },
	    save: { method: 'POST' },
	    query: { method: 'GET' },
	    update: { method: 'PUT' },
	    remove: { method: 'DELETE' },
	    delete: { method: 'DELETE' }
	
	};
	
	function plugin(Vue) {
	
	    if (plugin.installed) {
	        return;
	    }
	
	    Util(Vue);
	
	    Vue.url = Url;
	    Vue.http = Http;
	    Vue.resource = Resource;
	    Vue.Promise = Promise$1;
	
	    Object.defineProperties(Vue.prototype, {
	
	        $url: {
	            get: function get() {
	                return options(Vue.url, this, this.$options.url);
	            }
	        },
	
	        $http: {
	            get: function get() {
	                return options(Vue.http, this, this.$options.http);
	            }
	        },
	
	        $resource: {
	            get: function get() {
	                return Vue.resource.bind(this);
	            }
	        },
	
	        $promise: {
	            get: function get() {
	                var _this = this;
	
	                return function (executor) {
	                    return new Vue.Promise(executor, _this);
	                };
	            }
	        }
	
	    });
	}
	
	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(plugin);
	}
	
	module.exports = plugin;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(5)
	__vue_script__ = __webpack_require__(9)
	__vue_template__ = __webpack_require__(194)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\App.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7e10603c&file=App.vue!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7e10603c&file=App.vue!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  color: inherit;\n  border: none;\n  outline: none;\n  outline-offset: 0;\n  resize: none;\n}\n:root {\n  font: 14pt 'Roboto', sans-serif;\n  color: #dee7ed;\n  -webkit-font-smoothing: antialiased;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: 300;\n  opacity: 0.9;\n  margin: 1rem 0;\n}\nul,\nol {\n  list-style: none;\n}\na {\n  text-decoration: none;\n}\np {\n  margin-bottom: 0.5em;\n}\nem .fa {\n  margin-left: 0.2em;\n  margin-right: 0.1em;\n}\n[contenteditable]:empty::after {\n  content: attr(placeholder);\n  opacity: 0.5;\n  font-style: italic;\n  cursor: text;\n}\n::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n::-webkit-scrollbar-track,\n::-webkit-scrollbar-corner {\n  background-color: #172e46;\n}\n::-webkit-scrollbar-thumb {\n  background-color: #2f5e8e;\n}\n::-webkit-scrollbar-button {\n  display: none;\n}\n::-moz-selection {\n  background: rgba(0,0,0,0.3);\n}\n::selection {\n  background: rgba(0,0,0,0.3);\n}\n.ui.transition,\n.ui.hover-darken,\n.ui.focus-darken,\n.ui.focus-lighten,\n.ui.section,\n.ui.text-input input,\n.ui.text-input [contenteditable],\n.ui.button,\n.ui.selection li,\n.ui.link {\n  -webkit-transition: 0.2s ease all;\n  transition: 0.2s ease all;\n}\n.ui.noselect,\n.ui.selection {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.ui.small {\n  font-size: 75%;\n}\n.ui.subtle {\n  opacity: 0.5;\n}\n.ui.shadow,\n.ui.panel,\n.ui.side-panel {\n  box-shadow: 0px 4px 12px rgba(0,0,0,0.2);\n}\n.ui.theme-color.main,\n.ui.panel,\n.ui.side-panel {\n  background-color: #264c73;\n}\n.ui.theme-color.dark,\n.ui.section,\n.ui.text-input input,\n.ui.text-input [contenteditable],\n.ui.button,\n.ui.selection {\n  background-color: #1d3a58;\n}\n.ui.theme-color.light,\n.ui.focus-lighten:focus {\n  background-color: #2f5e8e;\n}\n.ui.theme-color.darker,\n.ui.hover-darken:hover,\n.ui.focus-darken:focus,\n.ui.section:focus,\n.ui.text-input input:focus,\n.ui.text-input [contenteditable]:focus,\n.ui.button:hover,\n.ui.button:focus,\n.ui.selection li:hover {\n  background-color: #172e46;\n}\n.ui.theme-color.lighter {\n  background-color: #376ea6;\n}\n.ui.border,\n.ui.section,\n.ui.text-input input,\n.ui.text-input [contenteditable],\n.ui.button,\n.ui.selection {\n  border-bottom: 3px solid #2f5e8e;\n}\n.ui.border.bright,\n.ui.section.bright,\n.ui.text-input input.bright,\n.ui.text-input [contenteditable].bright,\n.ui.button.bright,\n.ui.selection.bright,\n.ui.hover-darken:hover,\n.ui.focus-darken:focus,\n.ui.focus-lighten:focus,\n.ui.section:focus,\n.ui.text-input input:focus,\n.ui.text-input [contenteditable]:focus,\n.ui.button:hover,\n.ui.button:focus,\n.ui.selection li:hover {\n  border-bottom-color: #568ec7;\n}\n.ui.highlight.green {\n  background-color: rgba(39,174,96,0.25);\n  color: #3dd37c;\n}\n.ui.highlight.blue {\n  background-color: rgba(52,152,219,0.25);\n  color: #5dade2;\n}\n.ui.highlight.red {\n  background-color: rgba(231,76,60,0.25);\n  color: #ec7063;\n}\n.ui.highlight.section {\n  border: none;\n}\n.ui.hover-darken,\n.ui.button,\n.ui.selection li {\n  cursor: pointer;\n}\n.ui.fullscreen,\n.ui.overlay {\n  position: fixed;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n.ui.overlay {\n  background-color: rgba(0,0,0,0.3);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.ui.panel,\n.ui.side-panel {\n  width: -webkit-min-content;\n  width: -moz-min-content;\n  width: min-content;\n  padding: 0em 1.5em;\n  text-align: center;\n}\n.ui.side-panel {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 12em;\n  padding: 0;\n  text-align: left;\n  overflow-y: auto;\n}\n.ui.side-panel.left {\n  left: 0;\n}\n.ui.side-panel.right {\n  right: 0;\n}\n.ui.section,\n.ui.text-input input,\n.ui.text-input [contenteditable] {\n  width: 10rem;\n  padding: 0.4em 0.6em;\n  display: block;\n}\n.ui.section.icon,\n.ui.text-input.icon {\n  position: relative;\n}\n.ui.section.icon .fa,\n.ui.text-input.icon .fa {\n  opacity: 0.5;\n  position: absolute;\n  top: 0.6em;\n  pointer-events: none;\n}\n.ui.section.icon.left .fa,\n.ui.text-input.icon.left .fa {\n  left: 0.6em;\n}\n.ui.section.icon.right .fa,\n.ui.text-input.icon.right .fa {\n  right: 0.6em;\n}\n.ui.text-input {\n  display: inline-block;\n  width: -webkit-max-content;\n  width: -moz-max-content;\n  width: max-content;\n}\n.ui.text-input.icon.left input,\n.ui.text-input.icon.left [contenteditable] {\n  padding-left: 1.8em;\n}\n.ui.text-input.icon.right input,\n.ui.text-input.icon.right [contenteditable] {\n  padding-right: 1.8em;\n}\n.ui.button {\n  padding: 0.4em 1.5em;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.ui.form .ui.field {\n  margin-bottom: 1em;\n}\n.ui.selection {\n  width: 14em;\n  height: 18em;\n  list-style: none;\n  overflow-y: scroll;\n  display: inline-block;\n}\n.ui.selection li {\n  display: block;\n  padding: 0.5em;\n}\n.ui.selection li:hover {\n  border-bottom: none;\n}\n.ui.selection li.active {\n  background-color: rgba(39,174,96,0.3);\n  color: #3dd37c;\n}\n.ui.pull.right {\n  float: right;\n}\n.ui.scroll {\n  overflow-y: auto;\n}\n.ui.link {\n  text-decoration: none;\n  border-bottom: 1px solid rgba(222,231,237,0.3);\n  position: relative;\n}\n.ui.link:hover {\n  border-bottom-color: rgba(222,231,237,0.8);\n}\n.ui.divider {\n  border-bottom: 1px solid rgba(222,231,237,0.2);\n}\n.flex.row,\n.flex.col,\n.flex.center-content {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.flex.row {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex.col {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.flex.stretch {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n}\n.flex.fixed {\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n.flex.center-content {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n              -ms-grid-row-align: center;\n          align-items: center;\n}\n.fade-transition {\n  -webkit-transition: opacity 0.3s ease;\n  transition: opacity 0.3s ease;\n  opacity: 1;\n}\n.fade-enter,\n.fade-leave {\n  opacity: 0;\n}\n.slide-left-transition {\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  opacity: 1;\n}\n.slide-left-transition .ui.side-panel {\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  left: 0em;\n}\n.slide-left-enter,\n.slide-left-leave {\n  opacity: 0;\n}\n.slide-left-enter .ui.side-panel,\n.slide-left-leave .ui.side-panel {\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  left: -14em;\n}\n.slide-right-transition {\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  opacity: 1;\n}\n.slide-right-transition .ui.side-panel {\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  right: 0em;\n}\n.slide-right-enter,\n.slide-right-leave {\n  opacity: 0;\n}\n.slide-right-enter .ui.side-panel,\n.slide-right-leave .ui.side-panel {\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  right: -14em;\n}\n", "", {"version":3,"sources":["/./view/components/App.vue.style","/./view/components/App.vue","/./view/components/view/styles/ui.styl","/./view/components/view/styles/flex.styl","/./view/components/view/styles/transitions.styl"],"names":[],"mappings":"AAEA;EACE,WAAA;EACA,UAAA;EACA,uBAAA;EACA,eAAA;EACA,aAAA;EACA,cAAA;EACA,kBAAA;EACA,aAAA;CCDD;ADGD;EACE,gCAAA;EACA,eAAA;EACA,oCAAA;CCDD;ADGD;;;;;;EACE,iBAAA;EACA,aAAA;EACA,eAAA;CCID;ADFD;;EACE,iBAAA;CCKD;ADHD;EACE,sBAAA;CCKD;ADHD;EACE,qBAAA;CCKD;ADHD;EACE,mBAAA;EACA,oBAAA;CCKD;ADFD;EACE,2BAAA;EACA,aAAA;EACA,mBAAA;EACA,aAAA;CCID;ADFD;EACE,WAAA;EACA,YAAA;CCID;ADFD;;EACE,0BAAA;CCKD;ADHD;EACE,0BAAA;CCKD;ADHD;EACE,cAAA;CCKD;ADHD;EACE,4BAAA;CCKD;ADND;EACE,4BAAA;CCKD;ACtDC;;;;;;;;;;EACE,kCAAA;EAAA,0BAAA;CDiEH;AC/DC;;EACE,0BAAA;KAAA,uBAAA;MAAA,sBAAA;UAAA,kBAAA;CDkEH;AChEC;EACE,eAAA;CDkEH;AChEC;EACE,aAAA;CDkEH;AChEC;;;EACE,yCAAA;CDoEH;ACjEG;;;EAAS,0BAAA;CDsEZ;ACrEG;;;;;;EAAS,0BAAA;CD6EZ;AC5EG;;EAAU,0BAAA;CDgFb;AC/EG;;;;;;;;;EAAW,0BAAA;CD0Fd;ACzFG;EAAY,0BAAA;CD4Ff;AC1FC;;;;;;EACE,iCAAA;CDiGH;AC/FG;;;;;;;;;;;;;;;EACE,6BAAA;CD+GL;AC5GG;EAjCF,uCAAA;EACA,eAAA;CDgJD;AC/GG;EAlCF,wCAAA;EACA,eAAA;CDoJD;AClHG;EAnCF,uCAAA;EACA,eAAA;CDwJD;ACrHG;EAAY,aAAA;CDwHf;ACtHC;;;EAEE,gBAAA;CDyHH;ACxGC;;EACE,gBAAA;EACA,QAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;CD2GH;ACzGC;EAGE,kCAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,wBAAA;EACA,0BAAA;MAAA,uBAAA;UAAA,oBAAA;CDyGH;ACvGC;;EAIE,2BAAA;EAAA,wBAAA;EAAA,mBAAA;EACA,mBAAA;EACA,mBAAA;CDuGH;ACrGC;EAEE,mBAAA;EACA,OAAA;EACA,UAAA;EACA,YAAA;EACA,WAAA;EACA,iBAAA;EACA,iBAAA;CDsGH;ACpGG;EAAS,QAAA;CDuGZ;ACtGG;EAAU,SAAA;CDyGb;ACvGC;;;EAKE,aAAA;EACA,qBAAA;EACA,eAAA;CDuGH;ACrGC;;EACE,mBAAA;CDwGH;ACtGG;;EACE,aAAA;EACA,mBAAA;EACA,WAAA;EACA,qBAAA;CDyGL;ACvGG;;EAAa,YAAA;CD2GhB;AC1GG;;EAAc,aAAA;CD8GjB;AC5GC;EACE,sBAAA;EACA,2BAAA;EAAA,wBAAA;EAAA,mBAAA;CD8GH;ACrGO;;EAA2B,oBAAA;CDyGlC;ACtGO;;EAA2B,qBAAA;CD0GlC;ACxGC;EAKE,qBAAA;EACA,0BAAA;KAAA,uBAAA;MAAA,sBAAA;UAAA,kBAAA;CDsGH;ACpGC;EACE,mBAAA;CDsGH;ACpGC;EAKE,YAAA;EACA,aAAA;EACA,iBAAA;EACA,mBAAA;EACA,sBAAA;CDkGH;AChGG;EAEE,eAAA;EACA,eAAA;CDiGL;AC/FK;EACE,oBAAA;CDiGP;AC/FK;EAEE,sCAAA;EACA,eAAA;CDgGP;AC9FC;EACE,aAAA;CDgGH;AC9FC;EACE,iBAAA;CDgGH;AC9FC;EAEE,sBAAA;EACA,+CAAA;EACA,mBAAA;CD+FH;AC7FG;EACE,2CAAA;CD+FL;AC7FC;EACE,+CAAA;CD+FH;AEtRC;;;EACE,qBAAA;EAAA,qBAAA;EAAA,cAAA;CF0RH;AExRC;EACE,+BAAA;EAAA,8BAAA;MAAA,wBAAA;UAAA,oBAAA;CF0RH;AExRC;EACE,6BAAA;EAAA,8BAAA;MAAA,2BAAA;UAAA,uBAAA;CF0RH;AExRC;EACE,oBAAA;MAAA,qBAAA;UAAA,aAAA;EACA,qBAAA;MAAA,eAAA;CF0RH;AExRC;EACE,oBAAA;MAAA,qBAAA;UAAA,aAAA;EACA,qBAAA;MAAA,eAAA;CF0RH;AExRC;EACE,yBAAA;MAAA,sBAAA;UAAA,wBAAA;EACA,0BAAA;MAAA,uBAAA;cAAA,2BAAA;UAAA,oBAAA;CF0RH;AG1SC;EAHA,sCAAA;EAAA,8BAAA;EAKE,WAAA;CH4SH;AG1SC;;EACE,WAAA;CH6SH;AGzSG;EAZF,kCAAA;EAAA,0BAAA;EAcI,WAAA;CH2SL;AG1SK;EAfJ,kCAAA;EAAA,0BAAA;EAiBY,UAAA;CH4Sb;AG1SG;;EACE,WAAA;CH6SL;AG5SK;;EArBJ,kCAAA;EAAA,0BAAA;EAuBY,YAAA;CH+Sb;AG1TG;EAZF,kCAAA;EAAA,0BAAA;EAcI,WAAA;CH4TL;AG3TK;EAfJ,kCAAA;EAAA,0BAAA;EAiBY,WAAA;CH6Tb;AG3TG;;EACE,WAAA;CH8TL;AG7TK;;EArBJ,kCAAA;EAAA,0BAAA;EAuBY,aAAA;CHgUb","file":"App.vue","sourcesContent":["@import 'colors'\r\n\r\n*\r\n  padding: 0\r\n  margin: 0\r\n  box-sizing: border-box\r\n  color: inherit\r\n  border: none\r\n  outline: none\r\n  outline-offset: 0\r\n  resize: none\r\n\r\n:root\r\n  font: 14pt 'Roboto', sans-serif\r\n  color: $text-color\r\n  -webkit-font-smoothing: antialiased\r\n\r\nh1, h2, h3, h4, h5, h6\r\n  font-weight: 300\r\n  opacity: 0.9\r\n  margin: 1rem 0\r\n\r\nul, ol\r\n  list-style: none\r\n\r\na\r\n  text-decoration: none\r\n\r\np\r\n  margin-bottom: 0.5em\r\n\r\nem .fa\r\n  margin-left: 0.2em\r\n  margin-right: 0.1em\r\n\r\n\r\n[contenteditable]:empty::after\r\n  content: attr(placeholder)\r\n  opacity: 0.5\r\n  font-style: italic\r\n  cursor: text\r\n\r\n::-webkit-scrollbar\r\n  width: 8px\r\n  height: @width\r\n\r\n::-webkit-scrollbar-track, ::-webkit-scrollbar-corner\r\n  background-color: darken($theme-color-dark, 20%)\r\n\r\n::-webkit-scrollbar-thumb\r\n  background-color: $theme-color-light\r\n\r\n::-webkit-scrollbar-button\r\n  display: none\r\n\r\n::selection\r\n  background: rgba(black, 0.3)\r\n","* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  color: inherit;\n  border: none;\n  outline: none;\n  outline-offset: 0;\n  resize: none;\n}\n:root {\n  font: 14pt 'Roboto', sans-serif;\n  color: #dee7ed;\n  -webkit-font-smoothing: antialiased;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: 300;\n  opacity: 0.9;\n  margin: 1rem 0;\n}\nul,\nol {\n  list-style: none;\n}\na {\n  text-decoration: none;\n}\np {\n  margin-bottom: 0.5em;\n}\nem .fa {\n  margin-left: 0.2em;\n  margin-right: 0.1em;\n}\n[contenteditable]:empty::after {\n  content: attr(placeholder);\n  opacity: 0.5;\n  font-style: italic;\n  cursor: text;\n}\n::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n::-webkit-scrollbar-track,\n::-webkit-scrollbar-corner {\n  background-color: #172e46;\n}\n::-webkit-scrollbar-thumb {\n  background-color: #2f5e8e;\n}\n::-webkit-scrollbar-button {\n  display: none;\n}\n::selection {\n  background: rgba(0,0,0,0.3);\n}\n.ui.transition,\n.ui.hover-darken,\n.ui.focus-darken,\n.ui.focus-lighten,\n.ui.section,\n.ui.text-input input,\n.ui.text-input [contenteditable],\n.ui.button,\n.ui.selection li,\n.ui.link {\n  transition: 0.2s ease all;\n}\n.ui.noselect,\n.ui.selection {\n  user-select: none;\n}\n.ui.small {\n  font-size: 75%;\n}\n.ui.subtle {\n  opacity: 0.5;\n}\n.ui.shadow,\n.ui.panel,\n.ui.side-panel {\n  box-shadow: 0px 4px 12px rgba(0,0,0,0.2);\n}\n.ui.theme-color.main,\n.ui.panel,\n.ui.side-panel {\n  background-color: #264c73;\n}\n.ui.theme-color.dark,\n.ui.section,\n.ui.text-input input,\n.ui.text-input [contenteditable],\n.ui.button,\n.ui.selection {\n  background-color: #1d3a58;\n}\n.ui.theme-color.light,\n.ui.focus-lighten:focus {\n  background-color: #2f5e8e;\n}\n.ui.theme-color.darker,\n.ui.hover-darken:hover,\n.ui.focus-darken:focus,\n.ui.section:focus,\n.ui.text-input input:focus,\n.ui.text-input [contenteditable]:focus,\n.ui.button:hover,\n.ui.button:focus,\n.ui.selection li:hover {\n  background-color: #172e46;\n}\n.ui.theme-color.lighter {\n  background-color: #376ea6;\n}\n.ui.border,\n.ui.section,\n.ui.text-input input,\n.ui.text-input [contenteditable],\n.ui.button,\n.ui.selection {\n  border-bottom: 3px solid #2f5e8e;\n}\n.ui.border.bright,\n.ui.section.bright,\n.ui.text-input input.bright,\n.ui.text-input [contenteditable].bright,\n.ui.button.bright,\n.ui.selection.bright,\n.ui.hover-darken:hover,\n.ui.focus-darken:focus,\n.ui.focus-lighten:focus,\n.ui.section:focus,\n.ui.text-input input:focus,\n.ui.text-input [contenteditable]:focus,\n.ui.button:hover,\n.ui.button:focus,\n.ui.selection li:hover {\n  border-bottom-color: #568ec7;\n}\n.ui.highlight.green {\n  background-color: rgba(39,174,96,0.25);\n  color: #3dd37c;\n}\n.ui.highlight.blue {\n  background-color: rgba(52,152,219,0.25);\n  color: #5dade2;\n}\n.ui.highlight.red {\n  background-color: rgba(231,76,60,0.25);\n  color: #ec7063;\n}\n.ui.highlight.section {\n  border: none;\n}\n.ui.hover-darken,\n.ui.button,\n.ui.selection li {\n  cursor: pointer;\n}\n.ui.fullscreen,\n.ui.overlay {\n  position: fixed;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n.ui.overlay {\n  background-color: rgba(0,0,0,0.3);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ui.panel,\n.ui.side-panel {\n  width: min-content;\n  padding: 0em 1.5em;\n  text-align: center;\n}\n.ui.side-panel {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 12em;\n  padding: 0;\n  text-align: left;\n  overflow-y: auto;\n}\n.ui.side-panel.left {\n  left: 0;\n}\n.ui.side-panel.right {\n  right: 0;\n}\n.ui.section,\n.ui.text-input input,\n.ui.text-input [contenteditable] {\n  width: 10rem;\n  padding: 0.4em 0.6em;\n  display: block;\n}\n.ui.section.icon,\n.ui.text-input.icon {\n  position: relative;\n}\n.ui.section.icon .fa,\n.ui.text-input.icon .fa {\n  opacity: 0.5;\n  position: absolute;\n  top: 0.6em;\n  pointer-events: none;\n}\n.ui.section.icon.left .fa,\n.ui.text-input.icon.left .fa {\n  left: 0.6em;\n}\n.ui.section.icon.right .fa,\n.ui.text-input.icon.right .fa {\n  right: 0.6em;\n}\n.ui.text-input {\n  display: inline-block;\n  width: max-content;\n}\n.ui.text-input.icon.left input,\n.ui.text-input.icon.left [contenteditable] {\n  padding-left: 1.8em;\n}\n.ui.text-input.icon.right input,\n.ui.text-input.icon.right [contenteditable] {\n  padding-right: 1.8em;\n}\n.ui.button {\n  padding: 0.4em 1.5em;\n  user-select: none;\n}\n.ui.form .ui.field {\n  margin-bottom: 1em;\n}\n.ui.selection {\n  width: 14em;\n  height: 18em;\n  list-style: none;\n  overflow-y: scroll;\n  display: inline-block;\n}\n.ui.selection li {\n  display: block;\n  padding: 0.5em;\n}\n.ui.selection li:hover {\n  border-bottom: none;\n}\n.ui.selection li.active {\n  background-color: rgba(39,174,96,0.3);\n  color: #3dd37c;\n}\n.ui.pull.right {\n  float: right;\n}\n.ui.scroll {\n  overflow-y: auto;\n}\n.ui.link {\n  text-decoration: none;\n  border-bottom: 1px solid rgba(222,231,237,0.3);\n  position: relative;\n}\n.ui.link:hover {\n  border-bottom-color: rgba(222,231,237,0.8);\n}\n.ui.divider {\n  border-bottom: 1px solid rgba(222,231,237,0.2);\n}\n.flex.row,\n.flex.col,\n.flex.center-content {\n  display: flex;\n}\n.flex.row {\n  flex-direction: row;\n}\n.flex.col {\n  flex-direction: column;\n}\n.flex.stretch {\n  flex-grow: 1;\n  flex-shrink: 1;\n}\n.flex.fixed {\n  flex-grow: 0;\n  flex-shrink: 0;\n}\n.flex.center-content {\n  justify-content: center;\n  align-items: center;\n}\n.fade-transition {\n  transition: opacity 0.3s ease;\n  opacity: 1;\n}\n.fade-enter,\n.fade-leave {\n  opacity: 0;\n}\n.slide-left-transition {\n  transition: all 0.3s ease;\n  opacity: 1;\n}\n.slide-left-transition .ui.side-panel {\n  transition: all 0.3s ease;\n  left: 0em;\n}\n.slide-left-enter,\n.slide-left-leave {\n  opacity: 0;\n}\n.slide-left-enter .ui.side-panel,\n.slide-left-leave .ui.side-panel {\n  transition: all 0.3s ease;\n  left: -14em;\n}\n.slide-right-transition {\n  transition: all 0.3s ease;\n  opacity: 1;\n}\n.slide-right-transition .ui.side-panel {\n  transition: all 0.3s ease;\n  right: 0em;\n}\n.slide-right-enter,\n.slide-right-leave {\n  opacity: 0;\n}\n.slide-right-enter .ui.side-panel,\n.slide-right-leave .ui.side-panel {\n  transition: all 0.3s ease;\n  right: -14em;\n}\n","@import 'colors'\r\n\r\nhighlight($color)\r\n  background-color: rgba($color, 0.25)\r\n  color: lighten($color, 20%)\r\n\r\n.ui\r\n  &.transition\r\n    transition: 0.2s ease all\r\n\r\n  &.noselect\r\n    user-select: none\r\n\r\n  &.small\r\n    font-size: 75%\r\n\r\n  &.subtle\r\n    opacity: 0.5\r\n\r\n  &.shadow\r\n    box-shadow: 0px 4px 12px rgba(black, 0.2)\r\n\r\n  &.theme-color\r\n    &.main { background-color: $theme-color }\r\n    &.dark { background-color: $theme-color-dark }\r\n    &.light { background-color: $theme-color-light }\r\n    &.darker { background-color: darken($theme-color-dark, 20%) }\r\n    &.lighter { background-color: lighten($theme-color-light, 10%) }\r\n\r\n  &.border\r\n    border-bottom: 3px solid $theme-color-light\r\n\r\n    &.bright\r\n      border-bottom-color: lighten($theme-color-light, 30%)\r\n\r\n  &.highlight\r\n    &.green { highlight: rgb(39, 174, 96) }\r\n    &.blue { highlight: rgb(52, 152, 219) }\r\n    &.red { highlight: rgb(231, 76, 60) }\r\n    &.section { border: none }\r\n\r\n  &.hover-darken\r\n    @extend .ui.transition\r\n    cursor: pointer\r\n    &:hover\r\n      @extend .ui.theme-color.darker\r\n      @extend .ui.border.bright\r\n\r\n  &.focus-darken\r\n    @extend .ui.transition\r\n    &:focus\r\n      @extend .ui.theme-color.darker\r\n      @extend .ui.border.bright\r\n\r\n  &.focus-lighten\r\n    @extend .ui.transition\r\n    &:focus\r\n      @extend .ui.theme-color.light\r\n      @extend .ui.border.bright\r\n\r\n  &.fullscreen\r\n    position: fixed\r\n    left: 0\r\n    top: 0\r\n    right: 0\r\n    bottom: 0\r\n\r\n  &.overlay\r\n    @extend .ui.fullscreen\r\n\r\n    background-color: rgba(black, 0.3)\r\n    display: flex\r\n    justify-content: center\r\n    align-items: center\r\n\r\n  &.panel\r\n    @extend .ui.theme-color.main\r\n    @extend .ui.shadow\r\n\r\n    width: min-content\r\n    padding: 0em 1.5em\r\n    text-align: center\r\n\r\n  &.side-panel\r\n    @extend .ui.panel\r\n    position: absolute\r\n    top: 0\r\n    bottom: 0\r\n    width: 12em\r\n    padding: 0\r\n    text-align: left\r\n    overflow-y: auto\r\n\r\n    &.left { left: 0 }\r\n    &.right { right: 0 }\r\n\r\n  &.section\r\n    @extend .ui.theme-color.dark\r\n    @extend .ui.border\r\n    @extend .ui.transition\r\n    @extend .ui.focus-darken\r\n    width: 10rem\r\n    padding: 0.4em 0.6em\r\n    display: block\r\n\r\n  &.section.icon\r\n    position: relative\r\n\r\n    .fa\r\n      opacity: 0.5\r\n      position: absolute\r\n      top: 0.6em\r\n      pointer-events: none\r\n\r\n    &.left .fa { left: 0.6em }\r\n    &.right .fa { right: 0.6em }\r\n\r\n  &.text-input\r\n    display: inline-block\r\n    width: max-content\r\n\r\n    input, [contenteditable]\r\n      @extend .ui.section\r\n\r\n    &.icon\r\n      @extend .ui.section.icon\r\n\r\n      &.left\r\n        input, [contenteditable] { padding-left: 1.8em }\r\n\r\n      &.right\r\n        input, [contenteditable] { padding-right: 1.8em }\r\n\r\n  &.button\r\n    @extend .ui.theme-color.dark\r\n    @extend .ui.border\r\n    @extend .ui.hover-darken\r\n    @extend .ui.focus-darken\r\n    padding: 0.4em 1.5em\r\n    user-select: none\r\n\r\n  &.form &.field\r\n    margin-bottom: 1em\r\n\r\n  &.selection\r\n    @extend .ui.theme-color.dark\r\n    @extend .ui.border\r\n    @extend .ui.noselect\r\n\r\n    width: 14em\r\n    height: 18em\r\n    list-style: none\r\n    overflow-y: scroll\r\n    display: inline-block\r\n\r\n    li\r\n      @extend .ui.hover-darken\r\n      display: block\r\n      padding: 0.5em\r\n\r\n      &:hover\r\n        border-bottom: none\r\n\r\n      &.active\r\n        $active-color = rgb(39, 174, 96)\r\n        background-color: rgba($active-color, 0.3)\r\n        color: lighten($active-color, 20%)\r\n\r\n  &.pull.right\r\n    float: right\r\n\r\n  &.scroll\r\n    overflow-y: auto\r\n\r\n  &.link\r\n    @extend .ui.transition\r\n    text-decoration: none\r\n    border-bottom: 1px solid rgba($text-color, 0.3)\r\n    position: relative\r\n\r\n    &:hover\r\n      border-bottom-color: rgba($text-color, 0.8)\r\n\r\n  &.divider\r\n    border-bottom: 1px solid rgba($text-color, 0.2)\r\n",".flex\r\n  &.row, &.col, &.center-content\r\n    display: flex\r\n\r\n  &.row\r\n    flex-direction: row\r\n\r\n  &.col\r\n    flex-direction: column\r\n\r\n  &.stretch\r\n    flex-grow: 1\r\n    flex-shrink: 1\r\n\r\n  &.fixed\r\n    flex-grow: 0\r\n    flex-shrink: 0\r\n\r\n  &.center-content\r\n    justify-content: center\r\n    align-items: center\r\n","animate($property = all)\r\n  transition: $property 0.3s ease\r\n\r\n.fade\r\n  &-transition\r\n    animate: opacity\r\n    opacity: 1\r\n\r\n  &-enter, &-leave\r\n    opacity: 0\r\n\r\nslide($side)\r\n  .slide-{$side}\r\n    &-transition\r\n      animate: all\r\n      opacity: 1\r\n      .ui.side-panel\r\n        animate: all\r\n        {$side}: 0em\r\n\r\n    &-enter, &-leave\r\n      opacity: 0\r\n      .ui.side-panel\r\n        animate: all\r\n        {$side}: -14em\r\n\r\nslide('left')\r\nslide('right')\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(10);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _getIterator2 = __webpack_require__(69);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _events; // <template>
	//   <div @click='checkDataAttribute($event)'>
	//     <chat v-ref:chat></chat>
	//     <component v-for="overlay in overlays" :is='overlay' :active-character='activeCharacter'></component>
	//   </div>
	// </template>
	//
	// <style lang="stylus">
	// @import '../styles/root.styl'
	// @import '../styles/ui.styl'
	// @import '../styles/flex.styl'
	// @import '../styles/transitions.styl'
	// </style>
	//
	// <script>
	
	
	var _Chat = __webpack_require__(14);
	
	var _Chat2 = _interopRequireDefault(_Chat);
	
	var _Login = __webpack_require__(133);
	
	var _Login2 = _interopRequireDefault(_Login);
	
	var _CharacterList = __webpack_require__(138);
	
	var _CharacterList2 = _interopRequireDefault(_CharacterList);
	
	var _ChannelList = __webpack_require__(141);
	
	var _ChannelList2 = _interopRequireDefault(_ChannelList);
	
	var _AppMenu = __webpack_require__(155);
	
	var _AppMenu2 = _interopRequireDefault(_AppMenu);
	
	var _CharacterMenu = __webpack_require__(178);
	
	var _CharacterMenu2 = _interopRequireDefault(_CharacterMenu);
	
	var _OnlineUsers = __webpack_require__(183);
	
	var _OnlineUsers2 = _interopRequireDefault(_OnlineUsers);
	
	var _state = __webpack_require__(33);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _socket = __webpack_require__(190);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	var _storage = __webpack_require__(86);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _types = __webpack_require__(110);
	
	var _flist = __webpack_require__(109);
	
	var _events2 = __webpack_require__(111);
	
	var events = _interopRequireWildcard(_events2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: {
	    Chat: _Chat2.default,
	    Login: _Login2.default,
	    CharacterList: _CharacterList2.default,
	    ChannelList: _ChannelList2.default,
	    AppMenu: _AppMenu2.default,
	    CharacterMenu: _CharacterMenu2.default,
	    OnlineUsers: _OnlineUsers2.default
	  },
	
	  data: function data() {
	    return {
	      overlays: [],
	      activeCharacter: {},
	      socket: _socket2.default, state: _state2.default
	    };
	  },
	  ready: function ready() {
	    var _this = this;
	
	    this.socket.setRootVM(this);
	
	    if (!this.socket.isConnected()) {
	      this.state.loadStorageData().then(function () {
	        var _state$getAuthData = _this.state.getAuthData();
	
	        var account = _state$getAuthData.account;
	        var ticket = _state$getAuthData.ticket;
	
	        if (ticket !== '') {
	          (0, _flist.getUserData)(account, ticket).then(function (data) {
	            _this.state.setUserCharacterList(data.characters);
	            _this.state.setFriendsList(data.friends);
	            _this.state.setBookmarkList(data.bookmarks);
	            _this.$emit(events.PushOverlay, 'character-list');
	          }).catch(function (err) {
	            _this.$emit(events.PushOverlay, 'login');
	            console.warn(err);
	          });
	        } else {
	          _this.$emit(events.PushOverlay, 'login');
	        }
	      });
	    }
	  },
	
	
	  events: (_events = {}, (0, _defineProperty3.default)(_events, events.PushOverlay, function (overlay) {
	    this.overlays.push(overlay);
	  }), (0, _defineProperty3.default)(_events, events.PopOverlay, function () {
	    this.overlays.pop();
	  }), (0, _defineProperty3.default)(_events, events.LoginRequest, function (account) {
	    this.state.setAccount(account);
	  }), (0, _defineProperty3.default)(_events, events.LoginSuccess, function (data) {
	    this.state.setUserCharacterList(data.characters);
	    this.state.setFriendsList(data.friends);
	    this.state.setBookmarkList(data.bookmarks);
	    this.state.setTicket(data.ticket);
	    this.$emit(events.PopOverlay);
	    this.$emit(events.PushOverlay, 'character-list');
	  }), (0, _defineProperty3.default)(_events, events.CharacterSelected, function (name) {
	    this.state.setUserCharacter(name);
	    this.socket.connect('main');
	    this.$emit(events.PopOverlay);
	  }), (0, _defineProperty3.default)(_events, events.CharacterActivated, function (character) {
	    this.activeCharacter = this.state.getCharacter(character);
	    this.$emit(events.PushOverlay, 'character-menu');
	  }), (0, _defineProperty3.default)(_events, events.ToggleChannelRequest, function (id) {
	    var status = this.state.getChannelStatus(id);
	    if (status === _types.ChannelStatus.left) {
	      this.socket.joinChannel(id);
	    } else if (status === _types.ChannelStatus.joined) {
	      this.socket.leaveChannel(id);
	    }
	  }), (0, _defineProperty3.default)(_events, events.LeaveChannelRequest, function (id) {
	    this.socket.leaveChannel(id);
	  }), (0, _defineProperty3.default)(_events, events.SocketIdentifySuccess, function () {
	    this.socket.fetchChannelList();
	    this.$emit(events.PushOverlay, 'app-menu');
	  }), (0, _defineProperty3.default)(_events, events.SocketChannelListReceived, function (type) {
	    var _this2 = this;
	
	    var account = this.state.getAccount();
	    var character = this.state.getUserCharacterName();
	
	    _storage2.default.getActiveChannels(account, character).then(function (channels) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = (0, _getIterator3.default)(channels[type]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var id = _step.value;
	
	          _this2.socket.joinChannel(id);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }).catch(function (msg) {
	      console.log(msg);
	    });
	  }), (0, _defineProperty3.default)(_events, events.SocketError, function () {
	    this.$emit(events.PushOverlay, 'login');
	  }), (0, _defineProperty3.default)(_events, events.SocketChannelJoined, function (id) {
	    this.$broadcast(events.SocketChannelJoined, this.state.getChannel(id));
	  }), (0, _defineProperty3.default)(_events, events.SocketChannelLeft, function (id) {
	    this.$broadcast(events.SocketChannelLeft, this.state.getChannel(id));
	  }), (0, _defineProperty3.default)(_events, events.ChannelMessageSent, function (id, message) {
	    this.socket.sendChannelMessage(id, message);
	  }), (0, _defineProperty3.default)(_events, events.PrivateMessageSent, function (character, message) {
	    this.socket.sendPrivateMessage(character.name, message);
	  }), (0, _defineProperty3.default)(_events, events.PrivateMessageReceived, function (name, message) {
	    this.$broadcast(events.PrivateMessageReceived, name, message);
	  }), (0, _defineProperty3.default)(_events, events.OpenPrivateChatRequest, function (name) {
	    this.$broadcast(events.OpenPrivateChatRequest, name);
	  }), _events),
	
	  methods: {
	    checkDataAttribute: function checkDataAttribute(event) {
	      var name = event.target.getAttribute('data-activate-character');
	      if (name) {
	        this.$emit(events.CharacterActivated, name);
	      }
	
	      var channelToggle = event.target.getAttribute('data-toggle-channel');
	      if (channelToggle) {
	        this.$emit(events.ToggleChannelRequest, channelToggle);
	      }
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(11);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(12), __esModule: true };

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(13);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(15)
	__webpack_require__(17)
	__vue_script__ = __webpack_require__(19)
	__vue_template__ = __webpack_require__(132)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\Chat.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-56ad2e4d&file=Chat.vue&scoped=true!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Chat.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-56ad2e4d&file=Chat.vue&scoped=true!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Chat.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".header-shortcut[_v-56ad2e4d] {\n  width: 2em;\n  height: 2em;\n}\n", "", {"version":3,"sources":["/./view/components/Chat.vue.style","/./view/components/Chat.vue"],"names":[],"mappings":"AACA;EACE,WAAA;EACA,YAAA;CCAD","file":"Chat.vue","sourcesContent":["\r\n.header-shortcut\r\n  width: 2em\r\n  height: @width\r\n",".header-shortcut {\n  width: 2em;\n  height: 2em;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-56ad2e4d&file=Chat.vue&scoped=true!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./Chat.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-56ad2e4d&file=Chat.vue&scoped=true!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=1!./Chat.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "/*@import '../styles/mixins'\n\n.app-menu-button\n  size: 2em*/\n", "", {"version":3,"sources":["/./view/components/Chat.vue.style","/./view/components/Chat.vue"],"names":[],"mappings":"AACA;;;aCEa","file":"Chat.vue","sourcesContent":["\r\n/*@import '../styles/mixins'\r\n\r\n.app-menu-button\r\n  size: 2em*/\r\n","/*@import '../styles/mixins'\n\n.app-menu-button\n  size: 2em*/\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(10);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _events; // <template>
	//   <div class='flex col ui theme-color dark fullscreen'>
	//     <div class='flex row fixed' style='flex-wrap: wrap'>
	//       <shortcut title="Actions" icon="bars" overlay="app-menu"></shortcut>
	//       <shortcut title="Channels" icon="globe" overlay="channel-list"></shortcut>
	//       <shortcut title="Users" icon="heart" overlay="online-users"></shortcut>
	//
	//       <chat-tab v-for='tab in tabs'
	//       :active='activeTabIndex === $index'
	//       :title='tab.title'
	//       @closed='closeTab(tab)'
	//       @mousedown='activeTabIndex = $index'>
	//         {{ tab.title }}
	//       </chat-tab>
	//     </div>
	//
	//     <component :is="currentTab.view" :view-state="currentTab.state">
	//     </component>
	//   </div>
	// </template>
	//
	// <style lang="stylus" scoped>
	// .header-shortcut
	//   width: 2em
	//   height: @width
	// </style>
	//
	// <script>
	
	
	var _ChatTab = __webpack_require__(20);
	
	var _ChatTab2 = _interopRequireDefault(_ChatTab);
	
	var _ChannelView = __webpack_require__(25);
	
	var _ChannelView2 = _interopRequireDefault(_ChannelView);
	
	var _PrivateChatView = __webpack_require__(127);
	
	var _PrivateChatView2 = _interopRequireDefault(_PrivateChatView);
	
	var _state = __webpack_require__(33);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _storage = __webpack_require__(86);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _events2 = __webpack_require__(111);
	
	var events = _interopRequireWildcard(_events2);
	
	var _types = __webpack_require__(110);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var nullTab = { text: 'null tab', view: '' };
	
	var Shortcut = {
	  template: '\n    <a class=\'ui hover-darken flex fixed center-content header-shortcut\'\n    title="Actions"\n    @click="pushOverlay(overlay)">\n      <i class=\'fa fa-{{icon}}\'></i>\n    </a>\n  ',
	
	  props: {
	    icon: String,
	    overlay: String
	  },
	
	  methods: {
	    pushOverlay: function pushOverlay(overlay) {
	      this.$dispatch(events.PushOverlay, overlay);
	    }
	  }
	};
	
	exports.default = {
	  components: {
	    ChatTab: _ChatTab2.default,
	    ChannelView: _ChannelView2.default,
	    PrivateChatView: _PrivateChatView2.default,
	    Shortcut: Shortcut
	  },
	
	  data: function data() {
	    return {
	      tabs: [],
	      activeTabIndex: 0,
	      state: _state2.default
	    };
	  },
	
	
	  computed: {
	    currentTab: function currentTab() {
	      return this.tabs[this.activeTabIndex] || nullTab;
	    }
	  },
	
	  events: (_events = {}, (0, _defineProperty3.default)(_events, events.SocketChannelJoined, function (channel) {
	    this.activeTabIndex = this.addChannelTab(channel);
	  }), (0, _defineProperty3.default)(_events, events.SocketChannelLeft, function (channel) {
	    var _this = this;
	
	    this.tabs = this.tabs.filter(function (tab) {
	      if (tab.view === 'channel-view' && tab.state.id === channel.id) {
	        _this.activeTabIndex = Math.max(_this.activeTabIndex - 1, 0);
	        return false;
	      }
	      return true;
	    });
	  }), (0, _defineProperty3.default)(_events, events.ChatboxSubmit, function (message) {
	    var tab = this.currentTab;
	    if (tab.view === 'private-chat-view') {
	      this.$dispatch(events.PrivateMessageSent, tab.state.character, message);
	    } else if (tab.view === 'channel-view') {
	      this.$dispatch(events.ChannelMessageSent, tab.state.id, message);
	    }
	  }), (0, _defineProperty3.default)(_events, events.PrivateMessageReceived, function (name, message) {
	    this.addPrivateChat(name);
	  }), (0, _defineProperty3.default)(_events, events.OpenPrivateChatRequest, function (name) {
	    this.activeTabIndex = this.addPrivateChat(name);
	  }), _events),
	
	  methods: {
	    addTab: function addTab(tabState) {
	      this.tabs.push(tabState);
	      return this.tabs.length - 1; // return the index so we can set the active tab if if needed
	    },
	    createChannelTabState: function createChannelTabState(channel) {
	      return {
	        view: 'channel-view',
	        title: channel.name,
	        state: channel
	      };
	    },
	    addChannelTab: function addChannelTab(channel) {
	      this.addTab({
	        view: 'channel-view',
	        title: channel.name,
	        state: channel
	      });
	      return this.tabs.length - 1;
	    },
	    addPrivateChat: function addPrivateChat(partner) {
	      // try to find an already active private chat
	      var index = this.tabs.findIndex(function (tab) {
	        return tab.view === 'private-chat-view' && tab.state.character.name === partner;
	      });
	
	      // add a new PM tab if we couldn't find one
	      if (index === -1) {
	        this.addTab({
	          view: 'private-chat-view',
	          title: partner,
	          state: this.state.getPrivateChat(partner)
	        });
	        return this.tabs.length - 1;
	      }
	
	      return index;
	    },
	    closeTab: function closeTab(tab) {
	      if (tab.view === 'channel-view') {
	        this.$dispatch(events.LeaveChannelRequest, tab.state.id);
	      }
	      this.tabs.$remove(tab);
	      this.activeTabIndex--;
	    }
	  },
	
	  watch: {
	    tabs: function tabs(_, tablist) {
	      var channels = tablist.filter(function (tab) {
	        return tab.view === 'channel-view';
	      });
	
	      var pubChannels = channels.filter(function (tab) {
	        return tab.state.type === _types.ChannelType.public;
	      }).map(function (tab) {
	        return tab.state.id;
	      });
	
	      var privChannels = channels.filter(function (tab) {
	        return tab.state.type === _types.ChannelType.private;
	      }).map(function (tab) {
	        return tab.state.id;
	      });
	
	      _storage2.default.setActiveChannels(this.state.getAccount(), this.state.getUserCharacterName(), { public: pubChannels, private: privChannels });
	    }
	  }
	};
	// </script>
	//
	// <style lang="stylus" scoped>
	// /*@import '../styles/mixins'
	//
	// .app-menu-button
	//   size: 2em*/
	// </style>
	//
	/* generated by vue-loader */

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(21)
	__vue_script__ = __webpack_require__(23)
	__vue_template__ = __webpack_require__(24)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\elements\\ChatTab.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(22);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-27416b26&file=ChatTab.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ChatTab.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-27416b26&file=ChatTab.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ChatTab.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".ui.transition[_v-27416b26],\n.ui.hover-darken[_v-27416b26],\n.ui.focus-darken[_v-27416b26],\n.ui.focus-lighten[_v-27416b26],\n.ui.section[_v-27416b26],\n.ui.text-input input[_v-27416b26],\n.ui.text-input [contenteditable][_v-27416b26],\n.ui.button[_v-27416b26],\n.ui.selection li[_v-27416b26],\n.ui.link[_v-27416b26] {\n  -webkit-transition: 0.2s ease all;\n  transition: 0.2s ease all;\n}\n.ui.noselect[_v-27416b26],\n.ui.selection[_v-27416b26] {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.ui.small[_v-27416b26] {\n  font-size: 75%;\n}\n.ui.subtle[_v-27416b26] {\n  opacity: 0.5;\n}\n.ui.shadow[_v-27416b26],\n.ui.panel[_v-27416b26],\n.ui.side-panel[_v-27416b26] {\n  box-shadow: 0px 4px 12px rgba(0,0,0,0.2);\n}\n.ui.theme-color.main[_v-27416b26],\n.ui.panel[_v-27416b26],\n.ui.side-panel[_v-27416b26] {\n  background-color: #264c73;\n}\n.ui.theme-color.dark[_v-27416b26],\n.ui.section[_v-27416b26],\n.ui.text-input input[_v-27416b26],\n.ui.text-input [contenteditable][_v-27416b26],\n.ui.button[_v-27416b26],\n.ui.selection[_v-27416b26] {\n  background-color: #1d3a58;\n}\n.ui.theme-color.light[_v-27416b26],\n.ui.focus-lighten[_v-27416b26]:focus {\n  background-color: #2f5e8e;\n}\n.ui.theme-color.darker[_v-27416b26],\n.ui.hover-darken[_v-27416b26]:hover,\n.ui.focus-darken[_v-27416b26]:focus,\n.ui.section[_v-27416b26]:focus,\n.ui.text-input input[_v-27416b26]:focus,\n.ui.text-input [contenteditable][_v-27416b26]:focus,\n.ui.button[_v-27416b26]:hover,\n.ui.button[_v-27416b26]:focus,\n.ui.selection li[_v-27416b26]:hover {\n  background-color: #172e46;\n}\n.ui.theme-color.lighter[_v-27416b26] {\n  background-color: #376ea6;\n}\n.ui.border[_v-27416b26],\n.ui.section[_v-27416b26],\n.ui.text-input input[_v-27416b26],\n.ui.text-input [contenteditable][_v-27416b26],\n.ui.button[_v-27416b26],\n.ui.selection[_v-27416b26] {\n  border-bottom: 3px solid #2f5e8e;\n}\n.ui.border.bright[_v-27416b26],\n.ui.section.bright[_v-27416b26],\n.ui.text-input input.bright[_v-27416b26],\n.ui.text-input [contenteditable].bright[_v-27416b26],\n.ui.button.bright[_v-27416b26],\n.ui.selection.bright[_v-27416b26],\n.ui.hover-darken[_v-27416b26]:hover,\n.ui.focus-darken[_v-27416b26]:focus,\n.ui.focus-lighten[_v-27416b26]:focus,\n.ui.section[_v-27416b26]:focus,\n.ui.text-input input[_v-27416b26]:focus,\n.ui.text-input [contenteditable][_v-27416b26]:focus,\n.ui.button[_v-27416b26]:hover,\n.ui.button[_v-27416b26]:focus,\n.ui.selection li[_v-27416b26]:hover {\n  border-bottom-color: #568ec7;\n}\n.ui.highlight.green[_v-27416b26] {\n  background-color: rgba(39,174,96,0.25);\n  color: #3dd37c;\n}\n.ui.highlight.blue[_v-27416b26] {\n  background-color: rgba(52,152,219,0.25);\n  color: #5dade2;\n}\n.ui.highlight.red[_v-27416b26] {\n  background-color: rgba(231,76,60,0.25);\n  color: #ec7063;\n}\n.ui.highlight.section[_v-27416b26] {\n  border: none;\n}\n.ui.hover-darken[_v-27416b26],\n.ui.button[_v-27416b26],\n.ui.selection li[_v-27416b26] {\n  cursor: pointer;\n}\n.ui.fullscreen[_v-27416b26],\n.ui.overlay[_v-27416b26] {\n  position: fixed;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n.ui.overlay[_v-27416b26] {\n  background-color: rgba(0,0,0,0.3);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.ui.panel[_v-27416b26],\n.ui.side-panel[_v-27416b26] {\n  width: -webkit-min-content;\n  width: -moz-min-content;\n  width: min-content;\n  padding: 0em 1.5em;\n  text-align: center;\n}\n.ui.side-panel[_v-27416b26] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 12em;\n  padding: 0;\n  text-align: left;\n  overflow-y: auto;\n}\n.ui.side-panel.left[_v-27416b26] {\n  left: 0;\n}\n.ui.side-panel.right[_v-27416b26] {\n  right: 0;\n}\n.ui.section[_v-27416b26],\n.ui.text-input input[_v-27416b26],\n.ui.text-input [contenteditable][_v-27416b26] {\n  width: 10rem;\n  padding: 0.4em 0.6em;\n  display: block;\n}\n.ui.section.icon[_v-27416b26],\n.ui.text-input.icon[_v-27416b26] {\n  position: relative;\n}\n.ui.section.icon .fa[_v-27416b26],\n.ui.text-input.icon .fa[_v-27416b26] {\n  opacity: 0.5;\n  position: absolute;\n  top: 0.6em;\n  pointer-events: none;\n}\n.ui.section.icon.left .fa[_v-27416b26],\n.ui.text-input.icon.left .fa[_v-27416b26] {\n  left: 0.6em;\n}\n.ui.section.icon.right .fa[_v-27416b26],\n.ui.text-input.icon.right .fa[_v-27416b26] {\n  right: 0.6em;\n}\n.ui.text-input[_v-27416b26] {\n  display: inline-block;\n  width: -webkit-max-content;\n  width: -moz-max-content;\n  width: max-content;\n}\n.ui.text-input.icon.left input[_v-27416b26],\n.ui.text-input.icon.left [contenteditable][_v-27416b26] {\n  padding-left: 1.8em;\n}\n.ui.text-input.icon.right input[_v-27416b26],\n.ui.text-input.icon.right [contenteditable][_v-27416b26] {\n  padding-right: 1.8em;\n}\n.ui.button[_v-27416b26] {\n  padding: 0.4em 1.5em;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.ui.form .ui.field[_v-27416b26] {\n  margin-bottom: 1em;\n}\n.ui.selection[_v-27416b26] {\n  width: 14em;\n  height: 18em;\n  list-style: none;\n  overflow-y: scroll;\n  display: inline-block;\n}\n.ui.selection li[_v-27416b26] {\n  display: block;\n  padding: 0.5em;\n}\n.ui.selection li[_v-27416b26]:hover {\n  border-bottom: none;\n}\n.ui.selection li.active[_v-27416b26] {\n  background-color: rgba(39,174,96,0.3);\n  color: #3dd37c;\n}\n.ui.pull.right[_v-27416b26] {\n  float: right;\n}\n.ui.scroll[_v-27416b26] {\n  overflow-y: auto;\n}\n.ui.link[_v-27416b26] {\n  text-decoration: none;\n  border-bottom: 1px solid rgba(222,231,237,0.3);\n  position: relative;\n}\n.ui.link[_v-27416b26]:hover {\n  border-bottom-color: rgba(222,231,237,0.8);\n}\n.ui.divider[_v-27416b26] {\n  border-bottom: 1px solid rgba(222,231,237,0.2);\n}\na[_v-27416b26] {\n  width: 8em;\n  display: inline-block;\n  height: 2em;\n  border-bottom: 3px solid transparent;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  padding: 0.3em 0.5em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  position: relative;\n}\n.fa[_v-27416b26] {\n  position: absolute;\n  right: 0.5em;\n  top: 0.7em;\n  opacity: 0;\n}\na[_v-27416b26]:hover {\n  padding-right: 1.3em;\n}\na:hover .fa[_v-27416b26] {\n  opacity: 0.5;\n}\n", "", {"version":3,"sources":["/./view/components/elements/ChatTab.vue.style","/./view/components/elements/ChatTab.vue","/./view/components/elements/view/components/elements/ChatTab.vue"],"names":[],"mappings":"AAOE;;;;;;;;;;EACE,kCAAA;EAAA,0BAAA;CCGH;ADDC;;EACE,0BAAA;KAAA,uBAAA;MAAA,sBAAA;UAAA,kBAAA;CCIH;ADFC;EACE,eAAA;CCIH;ADFC;EACE,aAAA;CCIH;ADFC;;;EACE,yCAAA;CCMH;ADHG;;;EAAS,0BAAA;CCQZ;ADPG;;;;;;EAAS,0BAAA;CCeZ;ADdG;;EAAU,0BAAA;CCkBb;ADjBG;;;;;;;;;EAAW,0BAAA;CC4Bd;AD3BG;EAAY,0BAAA;CC8Bf;AD5BC;;;;;;EACE,iCAAA;CCmCH;ADjCG;;;;;;;;;;;;;;;EACE,6BAAA;CCiDL;AD9CG;EAjCF,uCAAA;EACA,eAAA;CCkFD;ADjDG;EAlCF,wCAAA;EACA,eAAA;CCsFD;ADpDG;EAnCF,uCAAA;EACA,eAAA;CC0FD;ADvDG;EAAY,aAAA;CC0Df;ADxDC;;;EAEE,gBAAA;CC2DH;AD1CC;;EACE,gBAAA;EACA,QAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;CC6CH;AD3CC;EAGE,kCAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,wBAAA;EACA,0BAAA;MAAA,uBAAA;UAAA,oBAAA;CC2CH;ADzCC;;EAIE,2BAAA;EAAA,wBAAA;EAAA,mBAAA;EACA,mBAAA;EACA,mBAAA;CCyCH;ADvCC;EAEE,mBAAA;EACA,OAAA;EACA,UAAA;EACA,YAAA;EACA,WAAA;EACA,iBAAA;EACA,iBAAA;CCwCH;ADtCG;EAAS,QAAA;CCyCZ;ADxCG;EAAU,SAAA;CC2Cb;ADzCC;;;EAKE,aAAA;EACA,qBAAA;EACA,eAAA;CCyCH;ADvCC;;EACE,mBAAA;CC0CH;ADxCG;;EACE,aAAA;EACA,mBAAA;EACA,WAAA;EACA,qBAAA;CC2CL;ADzCG;;EAAa,YAAA;CC6ChB;AD5CG;;EAAc,aAAA;CCgDjB;AD9CC;EACE,sBAAA;EACA,2BAAA;EAAA,wBAAA;EAAA,mBAAA;CCgDH;ADvCO;;EAA2B,oBAAA;CC2ClC;ADxCO;;EAA2B,qBAAA;CC4ClC;AD1CC;EAKE,qBAAA;EACA,0BAAA;KAAA,uBAAA;MAAA,sBAAA;UAAA,kBAAA;CCwCH;ADtCC;EACE,mBAAA;CCwCH;ADtCC;EAKE,YAAA;EACA,aAAA;EACA,iBAAA;EACA,mBAAA;EACA,sBAAA;CCoCH;ADlCG;EAEE,eAAA;EACA,eAAA;CCmCL;ADjCK;EACE,oBAAA;CCmCP;ADjCK;EAEE,sCAAA;EACA,eAAA;CCkCP;ADhCC;EACE,aAAA;CCkCH;ADhCC;EACE,iBAAA;CCkCH;ADhCC;EAEE,sBAAA;EACA,+CAAA;EACA,mBAAA;CCiCH;AD/BG;EACE,2CAAA;CCiCL;AD/BC;EACE,+CAAA;CCiCH;ACtND;EACE,WAAA;EACA,sBAAA;EACA,YAAA;EACA,qCAAA;EACA,0BAAA;KAAA,uBAAA;MAAA,sBAAA;UAAA,kBAAA;EACA,qBAAA;EACA,iBAAA;EACA,wBAAA;EACA,oBAAA;EACA,mBAAA;CDwND;ACtND;EACE,mBAAA;EACA,aAAA;EACA,WAAA;EACA,WAAA;CDwND;ACtND;EACE,qBAAA;CDwND;ACtNC;EACE,aAAA;CDwNH","file":"ChatTab.vue","sourcesContent":["@import 'colors'\r\n\r\nhighlight($color)\r\n  background-color: rgba($color, 0.25)\r\n  color: lighten($color, 20%)\r\n\r\n.ui\r\n  &.transition\r\n    transition: 0.2s ease all\r\n\r\n  &.noselect\r\n    user-select: none\r\n\r\n  &.small\r\n    font-size: 75%\r\n\r\n  &.subtle\r\n    opacity: 0.5\r\n\r\n  &.shadow\r\n    box-shadow: 0px 4px 12px rgba(black, 0.2)\r\n\r\n  &.theme-color\r\n    &.main { background-color: $theme-color }\r\n    &.dark { background-color: $theme-color-dark }\r\n    &.light { background-color: $theme-color-light }\r\n    &.darker { background-color: darken($theme-color-dark, 20%) }\r\n    &.lighter { background-color: lighten($theme-color-light, 10%) }\r\n\r\n  &.border\r\n    border-bottom: 3px solid $theme-color-light\r\n\r\n    &.bright\r\n      border-bottom-color: lighten($theme-color-light, 30%)\r\n\r\n  &.highlight\r\n    &.green { highlight: rgb(39, 174, 96) }\r\n    &.blue { highlight: rgb(52, 152, 219) }\r\n    &.red { highlight: rgb(231, 76, 60) }\r\n    &.section { border: none }\r\n\r\n  &.hover-darken\r\n    @extend .ui.transition\r\n    cursor: pointer\r\n    &:hover\r\n      @extend .ui.theme-color.darker\r\n      @extend .ui.border.bright\r\n\r\n  &.focus-darken\r\n    @extend .ui.transition\r\n    &:focus\r\n      @extend .ui.theme-color.darker\r\n      @extend .ui.border.bright\r\n\r\n  &.focus-lighten\r\n    @extend .ui.transition\r\n    &:focus\r\n      @extend .ui.theme-color.light\r\n      @extend .ui.border.bright\r\n\r\n  &.fullscreen\r\n    position: fixed\r\n    left: 0\r\n    top: 0\r\n    right: 0\r\n    bottom: 0\r\n\r\n  &.overlay\r\n    @extend .ui.fullscreen\r\n\r\n    background-color: rgba(black, 0.3)\r\n    display: flex\r\n    justify-content: center\r\n    align-items: center\r\n\r\n  &.panel\r\n    @extend .ui.theme-color.main\r\n    @extend .ui.shadow\r\n\r\n    width: min-content\r\n    padding: 0em 1.5em\r\n    text-align: center\r\n\r\n  &.side-panel\r\n    @extend .ui.panel\r\n    position: absolute\r\n    top: 0\r\n    bottom: 0\r\n    width: 12em\r\n    padding: 0\r\n    text-align: left\r\n    overflow-y: auto\r\n\r\n    &.left { left: 0 }\r\n    &.right { right: 0 }\r\n\r\n  &.section\r\n    @extend .ui.theme-color.dark\r\n    @extend .ui.border\r\n    @extend .ui.transition\r\n    @extend .ui.focus-darken\r\n    width: 10rem\r\n    padding: 0.4em 0.6em\r\n    display: block\r\n\r\n  &.section.icon\r\n    position: relative\r\n\r\n    .fa\r\n      opacity: 0.5\r\n      position: absolute\r\n      top: 0.6em\r\n      pointer-events: none\r\n\r\n    &.left .fa { left: 0.6em }\r\n    &.right .fa { right: 0.6em }\r\n\r\n  &.text-input\r\n    display: inline-block\r\n    width: max-content\r\n\r\n    input, [contenteditable]\r\n      @extend .ui.section\r\n\r\n    &.icon\r\n      @extend .ui.section.icon\r\n\r\n      &.left\r\n        input, [contenteditable] { padding-left: 1.8em }\r\n\r\n      &.right\r\n        input, [contenteditable] { padding-right: 1.8em }\r\n\r\n  &.button\r\n    @extend .ui.theme-color.dark\r\n    @extend .ui.border\r\n    @extend .ui.hover-darken\r\n    @extend .ui.focus-darken\r\n    padding: 0.4em 1.5em\r\n    user-select: none\r\n\r\n  &.form &.field\r\n    margin-bottom: 1em\r\n\r\n  &.selection\r\n    @extend .ui.theme-color.dark\r\n    @extend .ui.border\r\n    @extend .ui.noselect\r\n\r\n    width: 14em\r\n    height: 18em\r\n    list-style: none\r\n    overflow-y: scroll\r\n    display: inline-block\r\n\r\n    li\r\n      @extend .ui.hover-darken\r\n      display: block\r\n      padding: 0.5em\r\n\r\n      &:hover\r\n        border-bottom: none\r\n\r\n      &.active\r\n        $active-color = rgb(39, 174, 96)\r\n        background-color: rgba($active-color, 0.3)\r\n        color: lighten($active-color, 20%)\r\n\r\n  &.pull.right\r\n    float: right\r\n\r\n  &.scroll\r\n    overflow-y: auto\r\n\r\n  &.link\r\n    @extend .ui.transition\r\n    text-decoration: none\r\n    border-bottom: 1px solid rgba($text-color, 0.3)\r\n    position: relative\r\n\r\n    &:hover\r\n      border-bottom-color: rgba($text-color, 0.8)\r\n\r\n  &.divider\r\n    border-bottom: 1px solid rgba($text-color, 0.2)\r\n",".ui.transition,\n.ui.hover-darken,\n.ui.focus-darken,\n.ui.focus-lighten,\n.ui.section,\n.ui.text-input input,\n.ui.text-input [contenteditable],\n.ui.button,\n.ui.selection li,\n.ui.link {\n  transition: 0.2s ease all;\n}\n.ui.noselect,\n.ui.selection {\n  user-select: none;\n}\n.ui.small {\n  font-size: 75%;\n}\n.ui.subtle {\n  opacity: 0.5;\n}\n.ui.shadow,\n.ui.panel,\n.ui.side-panel {\n  box-shadow: 0px 4px 12px rgba(0,0,0,0.2);\n}\n.ui.theme-color.main,\n.ui.panel,\n.ui.side-panel {\n  background-color: #264c73;\n}\n.ui.theme-color.dark,\n.ui.section,\n.ui.text-input input,\n.ui.text-input [contenteditable],\n.ui.button,\n.ui.selection {\n  background-color: #1d3a58;\n}\n.ui.theme-color.light,\n.ui.focus-lighten:focus {\n  background-color: #2f5e8e;\n}\n.ui.theme-color.darker,\n.ui.hover-darken:hover,\n.ui.focus-darken:focus,\n.ui.section:focus,\n.ui.text-input input:focus,\n.ui.text-input [contenteditable]:focus,\n.ui.button:hover,\n.ui.button:focus,\n.ui.selection li:hover {\n  background-color: #172e46;\n}\n.ui.theme-color.lighter {\n  background-color: #376ea6;\n}\n.ui.border,\n.ui.section,\n.ui.text-input input,\n.ui.text-input [contenteditable],\n.ui.button,\n.ui.selection {\n  border-bottom: 3px solid #2f5e8e;\n}\n.ui.border.bright,\n.ui.section.bright,\n.ui.text-input input.bright,\n.ui.text-input [contenteditable].bright,\n.ui.button.bright,\n.ui.selection.bright,\n.ui.hover-darken:hover,\n.ui.focus-darken:focus,\n.ui.focus-lighten:focus,\n.ui.section:focus,\n.ui.text-input input:focus,\n.ui.text-input [contenteditable]:focus,\n.ui.button:hover,\n.ui.button:focus,\n.ui.selection li:hover {\n  border-bottom-color: #568ec7;\n}\n.ui.highlight.green {\n  background-color: rgba(39,174,96,0.25);\n  color: #3dd37c;\n}\n.ui.highlight.blue {\n  background-color: rgba(52,152,219,0.25);\n  color: #5dade2;\n}\n.ui.highlight.red {\n  background-color: rgba(231,76,60,0.25);\n  color: #ec7063;\n}\n.ui.highlight.section {\n  border: none;\n}\n.ui.hover-darken,\n.ui.button,\n.ui.selection li {\n  cursor: pointer;\n}\n.ui.fullscreen,\n.ui.overlay {\n  position: fixed;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n.ui.overlay {\n  background-color: rgba(0,0,0,0.3);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ui.panel,\n.ui.side-panel {\n  width: min-content;\n  padding: 0em 1.5em;\n  text-align: center;\n}\n.ui.side-panel {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 12em;\n  padding: 0;\n  text-align: left;\n  overflow-y: auto;\n}\n.ui.side-panel.left {\n  left: 0;\n}\n.ui.side-panel.right {\n  right: 0;\n}\n.ui.section,\n.ui.text-input input,\n.ui.text-input [contenteditable] {\n  width: 10rem;\n  padding: 0.4em 0.6em;\n  display: block;\n}\n.ui.section.icon,\n.ui.text-input.icon {\n  position: relative;\n}\n.ui.section.icon .fa,\n.ui.text-input.icon .fa {\n  opacity: 0.5;\n  position: absolute;\n  top: 0.6em;\n  pointer-events: none;\n}\n.ui.section.icon.left .fa,\n.ui.text-input.icon.left .fa {\n  left: 0.6em;\n}\n.ui.section.icon.right .fa,\n.ui.text-input.icon.right .fa {\n  right: 0.6em;\n}\n.ui.text-input {\n  display: inline-block;\n  width: max-content;\n}\n.ui.text-input.icon.left input,\n.ui.text-input.icon.left [contenteditable] {\n  padding-left: 1.8em;\n}\n.ui.text-input.icon.right input,\n.ui.text-input.icon.right [contenteditable] {\n  padding-right: 1.8em;\n}\n.ui.button {\n  padding: 0.4em 1.5em;\n  user-select: none;\n}\n.ui.form .ui.field {\n  margin-bottom: 1em;\n}\n.ui.selection {\n  width: 14em;\n  height: 18em;\n  list-style: none;\n  overflow-y: scroll;\n  display: inline-block;\n}\n.ui.selection li {\n  display: block;\n  padding: 0.5em;\n}\n.ui.selection li:hover {\n  border-bottom: none;\n}\n.ui.selection li.active {\n  background-color: rgba(39,174,96,0.3);\n  color: #3dd37c;\n}\n.ui.pull.right {\n  float: right;\n}\n.ui.scroll {\n  overflow-y: auto;\n}\n.ui.link {\n  text-decoration: none;\n  border-bottom: 1px solid rgba(222,231,237,0.3);\n  position: relative;\n}\n.ui.link:hover {\n  border-bottom-color: rgba(222,231,237,0.8);\n}\n.ui.divider {\n  border-bottom: 1px solid rgba(222,231,237,0.2);\n}\na {\n  width: 8em;\n  display: inline-block;\n  height: 2em;\n  border-bottom: 3px solid transparent;\n  user-select: none;\n  padding: 0.3em 0.5em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  position: relative;\n}\n.fa {\n  position: absolute;\n  right: 0.5em;\n  top: 0.7em;\n  opacity: 0;\n}\na:hover {\n  padding-right: 1.3em;\n}\na:hover .fa {\n  opacity: 0.5;\n}\n","\r\n@import '../../styles/ui.styl'\r\n\r\na\r\n  width: 8em\r\n  display: inline-block\r\n  height: 2em\r\n  border-bottom: 3px solid transparent\r\n  user-select: none\r\n  padding: 0.3em 0.5em\r\n  overflow: hidden\r\n  text-overflow: ellipsis\r\n  white-space: nowrap\r\n  position: relative\r\n\r\n.fa\r\n  position: absolute\r\n  right: 0.5em\r\n  top: 0.7em\r\n  opacity: 0\r\n\r\na:hover\r\n  padding-right: 1.3em\r\n\r\n  .fa\r\n    opacity: 0.5\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <a class='ui hover-darken' :class="{ 'theme-color main border': active }" transition="fade">
	//     <span><slot></slot></span>
	//     <i class="fa fa-times ui transition small" @click="$emit('closed')"></i>
	//   </a>
	// </template>
	//
	// <style lang="stylus" scoped>
	// @import '../../styles/ui.styl'
	//
	// a
	//   width: 8em
	//   display: inline-block
	//   height: 2em
	//   border-bottom: 3px solid transparent
	//   user-select: none
	//   padding: 0.3em 0.5em
	//   overflow: hidden
	//   text-overflow: ellipsis
	//   white-space: nowrap
	//   position: relative
	//
	// .fa
	//   position: absolute
	//   right: 0.5em
	//   top: 0.7em
	//   opacity: 0
	//
	// a:hover
	//   padding-right: 1.3em
	//
	//   .fa
	//     opacity: 0.5
	// </style>
	//
	// <script>
	exports.default = {
	  props: {
	    active: Boolean
	  }
	};
	// </script>
	//
	/* generated by vue-loader */

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "\n  <a class=\"ui hover-darken\" :class=\"{ 'theme-color main border': active }\" transition=\"fade\" _v-27416b26=\"\">\n    <span _v-27416b26=\"\"><slot _v-27416b26=\"\"></slot></span>\n    <i class=\"fa fa-times ui transition small\" @click=\"$emit('closed')\" _v-27416b26=\"\"></i>\n  </a>\n";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(26)
	__vue_script__ = __webpack_require__(28)
	__vue_template__ = __webpack_require__(126)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\chat-views\\ChannelView.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0c853d9a&file=ChannelView.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ChannelView.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0c853d9a&file=ChannelView.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ChannelView.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "ul[_v-0c853d9a] {\n  list-style: none;\n}\n.description[_v-0c853d9a] {\n  height: 5em;\n  padding: 0.3em 0.5em;\n  line-height: 1.4;\n}\n.description span[_v-0c853d9a] {\n  white-space: pre-wrap;\n}\n.chatbox[_v-0c853d9a] {\n  height: 5em;\n}\n.character-list[_v-0c853d9a] {\n  width: 12em;\n}\n.character-list-item[_v-0c853d9a] {\n  display: block;\n  padding: 0.2em 0.6em;\n}\n.message-list[_v-0c853d9a] {\n  padding: 0.3em 0em;\n}\n", "", {"version":3,"sources":["/./view/components/chat-views/ChannelView.vue.style","/./view/components/chat-views/ChannelView.vue"],"names":[],"mappings":"AACA;EACE,iBAAA;CCAD;ADED;EACE,YAAA;EACA,qBAAA;EACA,iBAAA;CCAD;ADEC;EACE,sBAAA;CCAH;ADED;EACE,YAAA;CCAD;ADED;EACE,YAAA;CCAD;ADED;EACE,eAAA;EACA,qBAAA;CCAD;ADED;EACE,mBAAA;CCAD","file":"ChannelView.vue","sourcesContent":["\r\nul\r\n  list-style: none\r\n\r\n.description\r\n  height: 5em\r\n  padding: 0.3em 0.5em\r\n  line-height: 1.4\r\n\r\n  span\r\n    white-space: pre-wrap\r\n\r\n.chatbox\r\n  height: 5em\r\n\r\n.character-list\r\n  width: 12em\r\n\r\n.character-list-item\r\n  display: block\r\n  padding: 0.2em 0.6em\r\n\r\n.message-list\r\n  padding: 0.3em 0em\r\n","ul {\n  list-style: none;\n}\n.description {\n  height: 5em;\n  padding: 0.3em 0.5em;\n  line-height: 1.4;\n}\n.description span {\n  white-space: pre-wrap;\n}\n.chatbox {\n  height: 5em;\n}\n.character-list {\n  width: 12em;\n}\n.character-list-item {\n  display: block;\n  padding: 0.2em 0.6em;\n}\n.message-list {\n  padding: 0.3em 0em;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Chatbox = __webpack_require__(29);
	
	var _Chatbox2 = _interopRequireDefault(_Chatbox);
	
	var _Character = __webpack_require__(113);
	
	var _Character2 = _interopRequireDefault(_Character);
	
	var _ChatMessage = __webpack_require__(118);
	
	var _ChatMessage2 = _interopRequireDefault(_ChatMessage);
	
	var _ChatMessageList = __webpack_require__(121);
	
	var _ChatMessageList2 = _interopRequireDefault(_ChatMessageList);
	
	var _state = __webpack_require__(33);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _events = __webpack_require__(111);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div class='flex col stretch'>
	//     <!-- description -->
	//     <div class='flex fixed ui theme-color main scroll description'>
	//       <span v-html="viewState.description | bbcode"></span>
	//     </div>
	//
	//     <div class='flex row stretch'>
	//       <!-- message -->
	//       <chat-message-list class="flex stretch" :messages='viewState.messages'></chat-message-list>
	//
	//       <!-- users -->
	//       <div class='flex fixed ui theme-color main scroll character-list'>
	//         <ul>
	//           <li class='ui hover-darken highlight green' v-for='char in characterGroups.friends'>
	//             <character class='character-list-item' :character='char'></character>
	//           </li>
	//           <li class='ui hover-darken highlight blue' v-for='char in characterGroups.bookmarks'>
	//             <character class='character-list-item' :character='char'></character>
	//           </li>
	//           <li class='ui hover-darken highlight red' v-for='char in characterGroups.admins'>
	//             <character class='character-list-item' :character='char'></character>
	//           </li>
	//           <li class='ui hover-darken' v-for='char in characterGroups.looking'>
	//             <character class='character-list-item' :character='char'></character>
	//           </li>
	//           <li class='ui hover-darken' v-for='char in characterGroups.rest'>
	//             <character class='character-list-item' :character='char'></character>
	//           </li>
	//         </ul>
	//       </div>
	//     </div>
	//
	//     <!-- chatbox -->
	//     <div class='flex fixed ui theme-color main'>
	//       <chatbox class='chatbox'></chatbox>
	//     </div>
	//   </div>
	// </template>
	//
	// <style lang="stylus" scoped>
	// ul
	//   list-style: none
	//
	// .description
	//   height: 5em
	//   padding: 0.3em 0.5em
	//   line-height: 1.4
	//
	//   span
	//     white-space: pre-wrap
	//
	// .chatbox
	//   height: 5em
	//
	// .character-list
	//   width: 12em
	//
	// .character-list-item
	//   display: block
	//   padding: 0.2em 0.6em
	//
	// .message-list
	//   padding: 0.3em 0em
	// </style>
	//
	// <script>
	
	
	function compareNames(a, b) {
	  return a.name.localeCompare(b.name);
	}
	
	exports.default = {
	  components: {
	    Chatbox: _Chatbox2.default,
	    Character: _Character2.default,
	    ChatMessage: _ChatMessage2.default,
	    ChatMessageList: _ChatMessageList2.default
	  },
	
	  props: {
	    viewState: Object
	  },
	
	  data: function data() {
	    return { state: _state2.default };
	  },
	
	
	  computed: {
	    characterGroups: function characterGroups() {
	      var _this = this;
	
	      var groups = {
	        friends: [],
	        bookmarks: [],
	        admins: [],
	        looking: [],
	        rest: []
	      };
	
	      this.viewState.characters.forEach(function (char) {
	        if (_this.state.getFriendship(char.name).length > 0) {
	          groups.friends.push(char);
	        } else if (_this.state.isBookmarked(char.name)) {
	          groups.bookmarks.push(char);
	        } else if (_this.state.isAdmin(char.name)) {
	          groups.admins.push(char);
	        } else if (char.status === 'looking') {
	          groups.looking.push(char);
	        } else {
	          groups.rest.push(char);
	        }
	      });
	
	      for (var group in groups) {
	        groups[group].sort(compareNames);
	      }
	
	      return groups;
	    }
	  },
	
	  methods: {
	    characterListClicked: function characterListClicked(event) {
	      var character = event.target.getAttribute('data-character');
	      this.$dispatch(_events.CharacterActivated, character);
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(30)
	__vue_script__ = __webpack_require__(32)
	__vue_template__ = __webpack_require__(112)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\elements\\Chatbox.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-2bdf347a&file=Chatbox.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Chatbox.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-2bdf347a&file=Chatbox.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Chatbox.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "div[_v-2bdf347a] {\n  height: 5em;\n  padding: 0.4em 0.6em;\n}\n", "", {"version":3,"sources":["/./view/components/elements/Chatbox.vue.style","/./view/components/elements/Chatbox.vue"],"names":[],"mappings":"AACA;EACE,YAAA;EACA,qBAAA;CCAD","file":"Chatbox.vue","sourcesContent":["\r\ndiv\r\n  height: 5em\r\n  padding: 0.4em 0.6em\r\n","div {\n  height: 5em;\n  padding: 0.4em 0.6em;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _state = __webpack_require__(33);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _events = __webpack_require__(111);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div class="ui theme-color main focus-lighten"
	//   contenteditable
	//   :maxlength="maxLength"
	//   :placeholder="placeholder"
	//   @keydown="fixContent($event)"
	//   @keydown.enter="submit($event)"
	//   v-el:textarea></div>
	// </template>
	//
	// <style lang="stylus" scoped>
	// div
	//   height: 5em
	//   padding: 0.4em 0.6em
	// </style>
	//
	// <script>
	exports.default = {
	  props: {
	    maxLength: {
	      type: Number,
	      default: Infinity
	    }
	  },
	
	  data: function data() {
	    return { state: _state2.default };
	  },
	
	
	  computed: {
	    placeholder: function placeholder() {
	      if (this.state.getUserCharacterName() === '') {
	        return 'Not chatting quite yet...';
	      } else {
	        return 'Chatting as ' + this.state.getUserCharacterName() + '...';
	      }
	    }
	  },
	
	  methods: {
	    getContent: function getContent() {
	      return this.$els.textarea.innerText.trim();
	    },
	    setContent: function setContent(text) {
	      this.$els.textarea.innerText = text;
	    },
	    submit: function submit(event) {
	      if (!event.shiftKey) {
	        this.$dispatch(_events.ChatboxSubmit, this.getContent());
	        this.setContent('');
	        event.preventDefault();
	      }
	    },
	    fixContent: function fixContent(event) {
	      var content = this.getContent();
	      if (content.length >= this.maxLength && event.code !== 'Backspace' && event.code !== 'Enter') {
	        event.preventDefault();
	      }
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(34);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _assign = __webpack_require__(75);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _getIterator2 = __webpack_require__(69);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _keys = __webpack_require__(80);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _promise = __webpack_require__(89);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(84);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(85);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _storage = __webpack_require__(86);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _flist = __webpack_require__(109);
	
	var flist = _interopRequireWildcard(_flist);
	
	var _types = __webpack_require__(110);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var State = function () {
	  function State() {
	    (0, _classCallCheck3.default)(this, State);
	
	    this.data = {
	      account: '', // string
	      ticket: '', // string
	      character: '', // string
	      characterList: [], // string[]
	      bookmarks: [], // string[]
	      ignored: [], // string[]
	      friends: {}, // userCharacter (string) => friendName (string)
	      publicChannels: [], // ChannelInfo[]
	      privateChannels: [], // ChannelInfo[]
	      channels: {}, // channelID (string) => ChannelState
	      privateChats: {}, // characterName (string) => PrivateChatState
	      serverVariables: {}, // variableName (string) => number
	      onlineCharacters: {}, // characterName (string) => Character
	      admins: [] // string[]
	    };
	  }
	
	  (0, _createClass3.default)(State, [{
	    key: 'loadStorageData',
	    value: function loadStorageData() {
	      var _this = this;
	
	      return _storage2.default.getAccount().then(function (account) {
	        _this.data.account = account;
	        return _storage2.default.getTicket(_this.data.account);
	      }).then(function (ticket) {
	        _this.data.ticket = ticket;
	        return _storage2.default.getCharacter(_this.data.account);
	      }).then(function (character) {
	        _this.data.character = character;
	        return _promise2.default.resolve();
	      }).catch(function (msg) {
	        console.log(msg);
	        return _promise2.default.reject();
	      });
	    }
	
	    // getters
	
	  }, {
	    key: 'getAccount',
	    value: function getAccount() {
	      return this.data.account;
	    }
	  }, {
	    key: 'getTicket',
	    value: function getTicket() {
	      return this.data.ticket;
	    }
	  }, {
	    key: 'getUserCharacterList',
	    value: function getUserCharacterList() {
	      return this.data.characterList.slice();
	    }
	  }, {
	    key: 'getAuthData',
	    value: function getAuthData() {
	      return { account: this.getAccount(), ticket: this.getTicket() };
	    }
	  }, {
	    key: 'getChannel',
	    value: function getChannel(id) {
	      return this.data.channels[id] || this.createChannelState(id);
	    }
	  }, {
	    key: 'getPrivateChat',
	    value: function getPrivateChat(partner) {
	      var chat = this.data.privateChats[partner];
	      if (!chat) {
	        var character = this.data.onlineCharacters[partner];
	        chat = _vue2.default.set(this.data.privateChats, partner, (0, _types.PrivateChatState)(character));
	      }
	      return chat;
	    }
	  }, {
	    key: 'getUserCharacter',
	    value: function getUserCharacter() {
	      return this.data.onlineCharacters[this.getUserCharacterName()];
	    }
	  }, {
	    key: 'getUserCharacterName',
	    value: function getUserCharacterName() {
	      return this.data.character;
	    }
	  }, {
	    key: 'getChannelStatus',
	    value: function getChannelStatus(id) {
	      if (!this.data.channels[id]) {
	        return _types.ChannelStatus.left;
	      }
	      return this.data.channels[id].status;
	    }
	  }, {
	    key: 'getPublicChannelList',
	    value: function getPublicChannelList() {
	      return this.data.publicChannels.slice();
	    }
	  }, {
	    key: 'getPrivateChannelList',
	    value: function getPrivateChannelList() {
	      return this.data.privateChannels.slice();
	    }
	  }, {
	    key: 'getUserChannels',
	    value: function getUserChannels() {
	      return this.data.channels.slice();
	    }
	  }, {
	    key: 'getCharacter',
	    value: function getCharacter(name) {
	      return this.data.onlineCharacters[name];
	    }
	
	    // returns an array of every online character
	
	  }, {
	    key: 'getOnlineCharacters',
	    value: function getOnlineCharacters() {
	      var onlineCharacters = this.data.onlineCharacters;
	
	      return (0, _keys2.default)(onlineCharacters).map(function (name) {
	        return onlineCharacters[name];
	      });
	    }
	
	    // return the user character that another character is friends with
	    // if not friends, returns undefined
	
	  }, {
	    key: 'getFriendship',
	    value: function getFriendship(name) {
	      return this.data.friends[name] || [];
	    }
	  }, {
	    key: 'isBookmarked',
	    value: function isBookmarked(name) {
	      return this.data.bookmarks.includes(name);
	    }
	  }, {
	    key: 'isIgnored',
	    value: function isIgnored(name) {
	      return this.data.ignored.includes(name);
	    }
	  }, {
	    key: 'isAdmin',
	    value: function isAdmin(name) {
	      return this.data.admins.includes(name);
	    }
	  }, {
	    key: 'isChannelOp',
	    value: function isChannelOp(name, channel) {}
	
	    // returns a classification for a character
	    // useful for list sorting by friends, bookmarks, etc.
	
	  }, {
	    key: 'getCharacterCategory',
	    value: function getCharacterCategory(character) {
	      var cat = [];
	      if (this.getFriendship(character.name).length > 0) {
	        cat.push('friend');
	      }
	      if (this.isBookmarked(character.name)) {
	        cat.push('bookmark');
	      }
	      if (this.isAdmin(character.name)) {
	        cat.push('admin');
	      }
	      if (this.isIgnored(character.name)) {
	        cat.push('ignored');
	      }
	      if (character.status === 'looking') {
	        cat.push('looking');
	      }
	      return cat;
	    }
	
	    // setters
	
	  }, {
	    key: 'setAccount',
	    value: function setAccount(account) {
	      this.data.account = account;
	      _storage2.default.setAccount(account);
	    }
	  }, {
	    key: 'setTicket',
	    value: function setTicket(ticket) {
	      this.data.ticket = ticket;
	      _storage2.default.setTicket(this.data.account, ticket);
	    }
	  }, {
	    key: 'setUserCharacter',
	    value: function setUserCharacter(charname) {
	      this.data.character = charname;
	      _storage2.default.setCharacter(this.data.account, charname);
	    }
	  }, {
	    key: 'setUserCharacterList',
	    value: function setUserCharacterList(list) {
	      this.data.characterList = list;
	    }
	  }, {
	    key: 'setFriendsList',
	    value: function setFriendsList(friends) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = (0, _getIterator3.default)(friends), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var entry = _step.value;
	
	          // i love inconsistent APIs
	          var friend = entry.dest || entry.source_name;
	          var userCharacter = entry.source || entry.dest_name;
	          this.data.friends[friend] = (this.data.friends[friend] || []).concat([userCharacter]);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'setBookmarkList',
	    value: function setBookmarkList(bookmarks) {
	      this.data.bookmarks = bookmarks;
	    }
	  }, {
	    key: 'setIgnoreList',
	    value: function setIgnoreList(names) {
	      this.data.ignored = names;
	    }
	  }, {
	    key: 'setAdminList',
	    value: function setAdminList(names) {
	      this.data.admins = names;
	    }
	  }, {
	    key: 'setServerVariable',
	    value: function setServerVariable(key, value) {
	      _vue2.default.set(this.data.serverVariables, key, value);
	    }
	  }, {
	    key: 'hashCharacters',
	    value: function hashCharacters(chars) {
	      var hash = {};
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = (0, _getIterator3.default)(chars), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var _step2$value = (0, _slicedToArray3.default)(_step2.value, 4);
	
	          var name = _step2$value[0];
	          var gender = _step2$value[1];
	          var status = _step2$value[2];
	          var statusMessage = _step2$value[3];
	
	          hash[name] = (0, _types.Character)(name, gender, status, statusMessage);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	
	      (0, _assign2.default)(this.data.onlineCharacters, hash);
	    }
	  }, {
	    key: 'addCharacter',
	    value: function addCharacter(name, gender) {
	      _vue2.default.set(this.data.onlineCharacters, name, (0, _types.Character)(name, gender));
	    }
	  }, {
	    key: 'removeCharacter',
	    value: function removeCharacter(name) {
	      var _data = this.data;
	      var onlineCharacters = _data.onlineCharacters;
	      var channels = _data.channels;
	
	      delete onlineCharacters[name];
	      for (var id in channels) {
	        var channel = channels[id];
	        channel.characters = channel.characters.filter(function (char) {
	          return char.name !== name;
	        });
	      }
	    }
	  }, {
	    key: 'setCharacterStatus',
	    value: function setCharacterStatus(name, status, statusMessage) {
	      var char = this.data.onlineCharacters[name];
	      if (char) {
	        char.status = status;
	        char.statusMessage = statusMessage;
	      }
	    }
	  }, {
	    key: 'setPublicChannelList',
	    value: function setPublicChannelList(channels) {
	      this.data.publicChannels = channels;
	    }
	  }, {
	    key: 'setPrivateChannelList',
	    value: function setPrivateChannelList(channels) {
	      this.data.privateChannels = channels;
	    }
	  }, {
	    key: 'createChannelState',
	    value: function createChannelState(id) {
	      // lazy hacks are lazy
	      var _data2 = this.data;
	      var publicChannels = _data2.publicChannels;
	      var privateChannels = _data2.privateChannels;
	
	      var info = publicChannels.concat(privateChannels).find(function (ch) {
	        return ch.id === id;
	      });
	      if (info) {
	        return _vue2.default.set(this.data.channels, id, (0, _types.ChannelState)(info.type, info.id, info.name));
	      }
	    }
	  }, {
	    key: 'setChannelName',
	    value: function setChannelName(id, name) {
	      this.getChannel(id).name = name;
	    }
	  }, {
	    key: 'setChannelStatus',
	    value: function setChannelStatus(id, status) {
	      this.getChannel(id).status = status;
	    }
	  }, {
	    key: 'setChannelMode',
	    value: function setChannelMode(id, mode) {
	      this.getChannel(id).mode = mode;
	    }
	  }, {
	    key: 'setChannelCharacters',
	    value: function setChannelCharacters(id, names) {
	      var characters = [];
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;
	
	      try {
	        for (var _iterator3 = (0, _getIterator3.default)(names), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var name = _step3.value;
	
	          var char = this.data.onlineCharacters[name];
	          if (char) {
	            characters.push(char);
	          }
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	
	      this.getChannel(id).characters = characters;
	    }
	  }, {
	    key: 'setChannelDescription',
	    value: function setChannelDescription(id, description) {
	      this.getChannel(id).description = description;
	    }
	  }, {
	    key: 'addChannelCharacter',
	    value: function addChannelCharacter(id, name) {
	      var channel = this.getChannel(id);
	      var char = this.data.onlineCharacters[name];
	      if (char) {
	        channel.characters.push(char);
	      }
	    }
	  }, {
	    key: 'removeChannelCharacter',
	    value: function removeChannelCharacter(id, name) {
	      var channel = this.getChannel(id);
	      channel.characters = channel.characters.filter(function (char) {
	        return char.name !== name;
	      });
	    }
	  }, {
	    key: 'addChannelMessage',
	    value: function addChannelMessage(id, name, message) {
	      var channel = this.getChannel(id);
	      var char = this.data.onlineCharacters[name];
	      if (char) {
	        channel.messages.push((0, _types.ChatMessage)(char, message));
	      }
	    }
	  }, {
	    key: 'addPrivateMessage',
	    value: function addPrivateMessage(partner, name, message) {
	      var chat = this.getPrivateChat(partner);
	      var character = this.data.onlineCharacters[name];
	      if (character) {
	        chat.messages.push((0, _types.ChatMessage)(character, message));
	      }
	    }
	  }, {
	    key: 'addBookmark',
	    value: function addBookmark(name) {
	      var _data3 = this.data;
	      var account = _data3.account;
	      var ticket = _data3.ticket;
	      var bookmarks = _data3.bookmarks;
	
	      flist.addBookmark(account, ticket, name).then(function () {
	        bookmarks.push(name);
	      });
	    }
	  }, {
	    key: 'removeBookmark',
	    value: function removeBookmark(name) {
	      var _data4 = this.data;
	      var account = _data4.account;
	      var ticket = _data4.ticket;
	      var bookmarks = _data4.bookmarks;
	
	      flist.removeBookmark(account, ticket, name).then(function () {
	        bookmarks.$remove(name);
	      });
	    }
	  }]);
	  return State;
	}();
	// import {compareNames} from '../lib/util'
	
	exports.default = new State();

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(35);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(69);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(36), __esModule: true };

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(37);
	__webpack_require__(64);
	module.exports = __webpack_require__(67);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	var Iterators = __webpack_require__(41);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(39)
	  , step             = __webpack_require__(40)
	  , Iterators        = __webpack_require__(41)
	  , toIObject        = __webpack_require__(42);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(46)(Array, 'Array', function(iterated, kind){
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

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(43)
	  , defined = __webpack_require__(45);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(44);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(47)
	  , $export        = __webpack_require__(48)
	  , redefine       = __webpack_require__(53)
	  , hide           = __webpack_require__(54)
	  , has            = __webpack_require__(58)
	  , Iterators      = __webpack_require__(41)
	  , $iterCreate    = __webpack_require__(59)
	  , setToStringTag = __webpack_require__(60)
	  , getProto       = __webpack_require__(13).getProto
	  , ITERATOR       = __webpack_require__(61)('iterator')
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

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(49)
	  , core      = __webpack_require__(50)
	  , ctx       = __webpack_require__(51)
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

/***/ },
/* 49 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 50 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(52);
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

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(54);

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(13)
	  , createDesc = __webpack_require__(55);
	module.exports = __webpack_require__(56) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(57)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(13)
	  , descriptor     = __webpack_require__(55)
	  , setToStringTag = __webpack_require__(60)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(54)(IteratorPrototype, __webpack_require__(61)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(13).setDesc
	  , has = __webpack_require__(58)
	  , TAG = __webpack_require__(61)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(62)('wks')
	  , uid    = __webpack_require__(63)
	  , Symbol = __webpack_require__(49).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(49)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 63 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(65)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(46)(String, 'String', function(iterated){
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

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(66)
	  , defined   = __webpack_require__(45);
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

/***/ },
/* 66 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(68)
	  , ITERATOR  = __webpack_require__(61)('iterator')
	  , Iterators = __webpack_require__(41);
	module.exports = __webpack_require__(50).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(44)
	  , TAG = __webpack_require__(61)('toStringTag')
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

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(37);
	__webpack_require__(64);
	module.exports = __webpack_require__(71);

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(72)
	  , get      = __webpack_require__(74);
	module.exports = __webpack_require__(50).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(73);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(68)
	  , ITERATOR  = __webpack_require__(61)('iterator')
	  , Iterators = __webpack_require__(41);
	module.exports = __webpack_require__(50).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(77);
	module.exports = __webpack_require__(50).Object.assign;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(48);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(78)});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(13)
	  , toObject = __webpack_require__(79)
	  , IObject  = __webpack_require__(43);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(57)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(45);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	module.exports = __webpack_require__(50).Object.keys;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(79);
	
	__webpack_require__(83)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(48)
	  , core    = __webpack_require__(50)
	  , fails   = __webpack_require__(57);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 84 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(11);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stringify = __webpack_require__(87);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _promise = __webpack_require__(89);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _classCallCheck2 = __webpack_require__(84);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(85);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _window = window;
	var ls = _window.localStorage;
	
	var storageKey = 'fchat-next-storage';
	
	var dataKeys = {
	  account: 'account',
	  ticket: function ticket(account) {
	    return 'ticket:' + account;
	  },
	  character: function character(account) {
	    return 'character:' + account;
	  },
	  channels: function channels(account, character) {
	    return 'channels:' + account + ':' + character;
	  }
	};
	
	var Storage = function () {
	  function Storage() {
	    (0, _classCallCheck3.default)(this, Storage);
	
	    // clear out old storage implementations and start fresh
	    if (ls.getItem(storageKey) == null) {
	      ls.clear();
	    }
	    this.data = JSON.parse(ls.getItem(storageKey) || '{}');
	  }
	
	  // storage interface
	
	
	  (0, _createClass3.default)(Storage, [{
	    key: 'get',
	    value: function get(key, defaultValue) {
	      if (this.data[key] == null && defaultValue != null) {
	        this.set(key, defaultValue);
	      }
	      var value = this.data[key];
	      return value ? _promise2.default.resolve(value) : _promise2.default.reject(key + ' does not exist in storage');
	    }
	  }, {
	    key: 'set',
	    value: function set(key, value) {
	      this.data[key] = value;
	      return this.save().then(function () {
	        return _promise2.default.resolve(value);
	      });
	    }
	  }, {
	    key: 'save',
	    value: function save() {
	      try {
	        ls.setItem(storageKey, (0, _stringify2.default)(this.data));
	        return _promise2.default.resolve();
	      } catch (err) {
	        return _promise2.default.reject(err);
	      }
	    }
	
	    // getters
	
	  }, {
	    key: 'getAccount',
	    value: function getAccount() {
	      return this.get(dataKeys.account);
	    }
	  }, {
	    key: 'getTicket',
	    value: function getTicket(account) {
	      return this.get(dataKeys.ticket(account));
	    }
	  }, {
	    key: 'getCharacter',
	    value: function getCharacter(account) {
	      return this.get(dataKeys.character(account));
	    }
	  }, {
	    key: 'getActiveChannels',
	    value: function getActiveChannels(account, character) {
	      return this.get(dataKeys.channels(account, character));
	    }
	
	    // setters
	
	  }, {
	    key: 'setAccount',
	    value: function setAccount(account) {
	      return this.set(dataKeys.account, account);
	    }
	  }, {
	    key: 'setTicket',
	    value: function setTicket(account, ticket) {
	      return this.set(dataKeys.ticket(account), ticket);
	    }
	  }, {
	    key: 'setCharacter',
	    value: function setCharacter(account, character) {
	      return this.set(dataKeys.character(account), character);
	    }
	  }, {
	    key: 'setActiveChannels',
	    value: function setActiveChannels(account, character, channels) {
	      return this.set(dataKeys.channels(account, character), channels);
	    }
	  }]);
	  return Storage;
	}();
	
	exports.default = new Storage();

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(50);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(91);
	__webpack_require__(64);
	__webpack_require__(37);
	__webpack_require__(92);
	module.exports = __webpack_require__(50).Promise;

/***/ },
/* 91 */
/***/ function(module, exports) {



/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(13)
	  , LIBRARY    = __webpack_require__(47)
	  , global     = __webpack_require__(49)
	  , ctx        = __webpack_require__(51)
	  , classof    = __webpack_require__(68)
	  , $export    = __webpack_require__(48)
	  , isObject   = __webpack_require__(73)
	  , anObject   = __webpack_require__(72)
	  , aFunction  = __webpack_require__(52)
	  , strictNew  = __webpack_require__(93)
	  , forOf      = __webpack_require__(94)
	  , setProto   = __webpack_require__(98).set
	  , same       = __webpack_require__(99)
	  , SPECIES    = __webpack_require__(61)('species')
	  , speciesConstructor = __webpack_require__(100)
	  , asap       = __webpack_require__(101)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;
	
	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};
	
	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(56)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(106)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__(60)(P, PROMISE);
	__webpack_require__(107)(PROMISE);
	Wrapper = __webpack_require__(50)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(108)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(51)
	  , call        = __webpack_require__(95)
	  , isArrayIter = __webpack_require__(96)
	  , anObject    = __webpack_require__(72)
	  , toLength    = __webpack_require__(97)
	  , getIterFn   = __webpack_require__(74);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(72);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(41)
	  , ITERATOR   = __webpack_require__(61)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(66)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(13).getDesc
	  , isObject = __webpack_require__(73)
	  , anObject = __webpack_require__(72);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(51)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 99 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(72)
	  , aFunction = __webpack_require__(52)
	  , SPECIES   = __webpack_require__(61)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(49)
	  , macrotask = __webpack_require__(102).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(44)(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(51)
	  , invoke             = __webpack_require__(103)
	  , html               = __webpack_require__(104)
	  , cel                = __webpack_require__(105)
	  , global             = __webpack_require__(49)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(44)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 103 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(49).document && document.documentElement;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(73)
	  , document = __webpack_require__(49).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(53);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(50)
	  , $           = __webpack_require__(13)
	  , DESCRIPTORS = __webpack_require__(56)
	  , SPECIES     = __webpack_require__(61)('species');
	
	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(61)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _promise = __webpack_require__(89);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	exports.sendLoginRequest = sendLoginRequest;
	exports.getCharacterList = getCharacterList;
	exports.getFriendsList = getFriendsList;
	exports.getBookmarkList = getBookmarkList;
	exports.getUserData = getUserData;
	exports.addBookmark = addBookmark;
	exports.removeBookmark = removeBookmark;
	exports.getProfileURL = getProfileURL;
	exports.getAvatarURL = getAvatarURL;
	
	var _vue = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var endpoints = {
	  login: 'https://www.f-list.net/json/getApiTicket.php',
	  characterList: 'https://www.f-list.net/json/api/character-list.php',
	  friendsList: 'https://www.f-list.net/json/api/friend-list.php',
	  bookmarkList: 'https://www.f-list.net/json/api/bookmark-list.php',
	  bookmarkAdd: 'https://www.f-list.net/json/api/bookmark-add.php',
	  bookmarkRemove: 'https://www.f-list.net/json/api/bookmark-remove.php'
	};
	
	function resolvePromise(promise) {
	  return promise.then(function (_ref) {
	    var data = _ref.data;
	
	    if (data.error) {
	      return _promise2.default.reject(data.error);
	    } else {
	      return _promise2.default.resolve(data);
	    }
	  });
	}
	
	function sendLoginRequest(account, password) {
	  return resolvePromise(_vue.http.post(endpoints.login, { account: account, password: password }));
	}
	
	function getCharacterList(account, ticket) {
	  return resolvePromise(_vue.http.post(endpoints.characterList, { account: account, ticket: ticket }));
	}
	
	function getFriendsList(account, ticket) {
	  return resolvePromise(_vue.http.post(endpoints.friendsList, { account: account, ticket: ticket }));
	}
	
	function getBookmarkList(account, ticket) {
	  return resolvePromise(_vue.http.post(endpoints.bookmarkList, { account: account, ticket: ticket }));
	}
	
	function getUserData(account, ticket) {
	  var data = {};
	  return getCharacterList(account, ticket).then(function (res) {
	    data.characters = res.characters;
	    return getFriendsList(account, ticket);
	  }).then(function (res) {
	    data.friends = res.friends;
	    return getBookmarkList(account, ticket);
	  }).then(function (res) {
	    data.bookmarks = res.characters;
	    return _promise2.default.resolve(data);
	  });
	}
	
	function addBookmark(account, ticket, name) {
	  return _vue.http.post(endpoints.bookmarkAdd, { account: account, ticket: ticket, name: name }).then(function (res) {
	    if (res.data.error) {
	      return _promise2.default.reject(res.error);
	    } else {
	      return _promise2.default.resolve();
	    }
	  });
	}
	
	function removeBookmark(account, ticket, name) {
	  return _vue.http.post(endpoints.bookmarkRemove, { account: account, ticket: ticket, name: name }).then(function (res) {
	    if (res.data.error) {
	      return _promise2.default.reject(res.error);
	    } else {
	      return _promise2.default.resolve();
	    }
	  });
	}
	
	function getProfileURL(name) {
	  var encoded = encodeURI(name.toLowerCase());
	  return 'https://www.f-list.net/c/' + encoded;
	}
	
	function getAvatarURL(name) {
	  var encoded = encodeURI(name.toLowerCase());
	  return 'https://static.f-list.net/images/avatar/' + encoded + '.png';
	}

/***/ },
/* 110 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ChannelInfo = ChannelInfo;
	exports.ChannelState = ChannelState;
	exports.PrivateChatState = PrivateChatState;
	exports.Character = Character;
	exports.ChatMessage = ChatMessage;
	// enums
	var ChannelStatus = exports.ChannelStatus = {
	  left: 0,
	  joining: 1,
	  joined: 2,
	  leaving: 3
	};
	
	var ChannelMode = exports.ChannelMode = {
	  both: 0,
	  chat: 1,
	  ads: 2
	};
	
	var ChannelType = exports.ChannelType = {
	  public: 'public',
	  private: 'private'
	};
	
	var Gender = exports.Gender = {
	  'Male': 0,
	  'Female': 1,
	  'Transgender': 2,
	  'Herm': 3,
	  'Shemale': 4,
	  'Cunt-boy': 5,
	  'Male-herm': 6,
	  'None': 7
	};
	
	var UserStatus = exports.UserStatus = {
	  online: 'Online',
	  looking: 'Looking',
	  busy: 'Busy',
	  away: 'Away',
	  dnd: 'DND',
	  idle: 'Idle',
	  offline: 'Offline'
	};
	
	// structs / object types
	function ChannelInfo(type, id, name, userCount) {
	  return {
	    type: type, // ChannelType
	    id: id, // string: channel id used to join/leave
	    name: name, // string: channel title for display
	    userCount: userCount // number: number of characters in the channel
	  };
	}
	
	function ChannelState(type, id) {
	  var name = arguments.length <= 2 || arguments[2] === undefined ? id : arguments[2];
	
	  return {
	    type: type, // ChannelType
	    id: id, // string: the channel id (either 'channel' or 'name' from the server)
	    name: name, // string: the channel name (or 'title' from the server)
	    mode: ChannelMode.both, // ChannelMode
	    description: '', // string
	    characters: [], // Character[]
	    messages: [], // ChatMessage[]
	    status: ChannelStatus.left // ChannelStatus
	  };
	}
	
	function PrivateChatState(character) {
	  return {
	    character: character, // Character
	    messages: [] // ChatMessage[]
	  };
	}
	
	function Character(name, gender) {
	  var status = arguments.length <= 2 || arguments[2] === undefined ? UserStatus.online : arguments[2];
	  var statusMessage = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
	
	  return {
	    name: name, // string
	    gender: gender, // Gender
	    status: status, // UserStatus
	    statusMessage: statusMessage // string
	  };
	}
	
	// TODO: add time field
	function ChatMessage(character, message) {
	  return {
	    character: character, // Character
	    message: message // string
	  };
	}

/***/ },
/* 111 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var LoginRequest = exports.LoginRequest = 'LoginRequest'; // (account: string)
	var LoginSuccess = exports.LoginSuccess = 'LoginSuccess'; // (userData: object)
	
	var OverlayChangeRequest = exports.OverlayChangeRequest = 'OverlayChangeRequest'; // (overlay: string)
	var PushOverlay = exports.PushOverlay = 'PushOverlay'; // (overlay: string)
	var PopOverlay = exports.PopOverlay = 'PopOverlay'; // ()
	
	var CharacterSelected = exports.CharacterSelected = 'CharacterSelected'; // (characterName: string)
	var CharacterActivated = exports.CharacterActivated = 'CharacterActivated'; // (character: string)
	
	var SocketIdentifySuccess = exports.SocketIdentifySuccess = 'IdentifySuccess'; // ()
	var SocketError = exports.SocketError = 'SocketError'; // (error: string)
	var SocketChannelJoined = exports.SocketChannelJoined = 'SocketChannelJoined'; // (channelID: string)
	var SocketChannelLeft = exports.SocketChannelLeft = 'SocketChannelLeft'; // (channelID: string)
	var SocketChannelListReceived = exports.SocketChannelListReceived = 'SocketChannelListReceived'; // (type: ChannelType)
	
	var ToggleChannelRequest = exports.ToggleChannelRequest = 'ToggleChannelRequest'; // (channelID: string)
	var LeaveChannelRequest = exports.LeaveChannelRequest = 'LeaveChannelRequest'; // (channelID: string)
	
	var ChannelMessageSent = exports.ChannelMessageSent = 'ChannelMessageSent'; // (channelID: string, message: string)
	var ChannelMessageReceived = exports.ChannelMessageReceived = 'ChannelMessageReceived'; // (channelID: string, characterName: string, message: string)
	
	var PrivateMessageSent = exports.PrivateMessageSent = 'PrivateMessageSent'; // (character: Character, message: string)
	var PrivateMessageReceived = exports.PrivateMessageReceived = 'PrivateMessageReceived'; // (characterName: string, message: string)
	var OpenPrivateChatRequest = exports.OpenPrivateChatRequest = 'OpenPrivateChatRequest'; // (partner: string)
	
	var ChatboxSubmit = exports.ChatboxSubmit = 'ChatboxSubmit'; // (message: string)

/***/ },
/* 112 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"ui theme-color main focus-lighten\" contenteditable=\"\" :maxlength=\"maxLength\" :placeholder=\"placeholder\" @keydown=\"fixContent($event)\" @keydown.enter=\"submit($event)\" v-el:textarea=\"\" _v-2bdf347a=\"\"></div>\n";

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(114)
	__vue_script__ = __webpack_require__(116)
	__vue_template__ = __webpack_require__(117)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\elements\\Character.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(115);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-53dc470e&file=Character.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Character.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-53dc470e&file=Character.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Character.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "span[_v-53dc470e] {\n  font-weight: 700;\n  text-shadow: 0px 1px 2px rgba(0,0,0,0.5);\n  cursor: pointer;\n}\n.status[_v-53dc470e] {\n  font-size: 40%;\n  position: relative;\n  top: -0.4em;\n}\n.status.online[_v-53dc470e] {\n  color: #3e3e3e;\n}\n.status.looking[_v-53dc470e] {\n  color: #20df6d;\n}\n.status.busy[_v-53dc470e] {\n  color: rgba(255,255,255,0.5);\n}\n.status.away[_v-53dc470e] {\n  color: #3a6ff6;\n}\n.status.idle[_v-53dc470e] {\n  color: #ebed81;\n}\n.status.dnd[_v-53dc470e] {\n  color: #bf4d40;\n}\n.status.offline[_v-53dc470e] {\n  color: rgba(62,62,62,0.5);\n}\n.gender.male[_v-53dc470e] {\n  color: #69c;\n}\n.gender.female[_v-53dc470e] {\n  color: #f99d94;\n}\n.gender.transgender[_v-53dc470e] {\n  color: #dba457;\n}\n.gender.herm[_v-53dc470e] {\n  color: #b07cf3;\n}\n.gender.shemale[_v-53dc470e] {\n  color: #e58bda;\n}\n.gender.cunt-boy[_v-53dc470e] {\n  color: #60d27b;\n}\n.gender.male-herm[_v-53dc470e] {\n  color: #527dff;\n}\n.gender.none[_v-53dc470e] {\n  color: #dcd6a8;\n}\n", "", {"version":3,"sources":["/./view/components/elements/Character.vue.style","/./view/components/elements/Character.vue"],"names":[],"mappings":"AACA;EACE,iBAAA;EACA,yCAAA;EACA,gBAAA;CCAD;ADED;EACE,eAAA;EACA,mBAAA;EACA,YAAA;CCAD;ADEC;EAAW,eAAA;CCCZ;ADAC;EAAY,eAAA;CCGb;ADFC;EAAS,6BAAA;CCKV;ADJC;EAAS,eAAA;CCOV;ADNC;EAAS,eAAA;CCSV;ADRC;EAAQ,eAAA;CCWT;ADVC;EAAY,0BAAA;CCab;ADVC;EAAS,YAAA;CCaV;ADZC;EAAW,eAAA;CCeZ;ADdC;EAAgB,eAAA;CCiBjB;ADhBC;EAAS,eAAA;CCmBV;ADlBC;EAAY,eAAA;CCqBb;ADpBC;EAAa,eAAA;CCuBd;ADtBC;EAAc,eAAA;CCyBf;ADxBC;EAAS,eAAA;CC2BV","file":"Character.vue","sourcesContent":["\r\nspan\r\n  font-weight: 700\r\n  text-shadow: 0px 1px 2px rgba(black, 0.5)\r\n  cursor: pointer\r\n\r\n.status\r\n  font-size: 40%\r\n  position: relative\r\n  top: -0.4em\r\n\r\n  &.online { color: rgb(62, 62, 62) }\r\n  &.looking { color: rgb(32, 223, 109) }\r\n  &.busy { color: rgba(white, 0.5) }\r\n  &.away { color: rgb(58, 111, 246) }\r\n  &.idle { color: rgb(235, 237, 129) }\r\n  &.dnd { color: rgb(191, 77, 64) }\r\n  &.offline { color: rgba(62, 62, 62, 0.5) }\r\n\r\n.gender\r\n  &.male { color: hsl(210, 50%, 60%) }\r\n  &.female { color: hsl(5, 90%, 78%) }\r\n  &.transgender { color: hsl(35, 65%, 60%) }\r\n  &.herm { color: hsl(266, 83%, 72%) }\r\n  &.shemale { color: hsl(307, 63%, 72%) }\r\n  &.cunt-boy { color: hsl(134, 56%, 60%) }\r\n  &.male-herm { color: hsl(225, 100%, 66%) }\r\n  &.none { color: hsl(54, 42%, 76%) }\r\n","span {\n  font-weight: 700;\n  text-shadow: 0px 1px 2px rgba(0,0,0,0.5);\n  cursor: pointer;\n}\n.status {\n  font-size: 40%;\n  position: relative;\n  top: -0.4em;\n}\n.status.online {\n  color: #3e3e3e;\n}\n.status.looking {\n  color: #20df6d;\n}\n.status.busy {\n  color: rgba(255,255,255,0.5);\n}\n.status.away {\n  color: #3a6ff6;\n}\n.status.idle {\n  color: #ebed81;\n}\n.status.dnd {\n  color: #bf4d40;\n}\n.status.offline {\n  color: rgba(62,62,62,0.5);\n}\n.gender.male {\n  color: #69c;\n}\n.gender.female {\n  color: #f99d94;\n}\n.gender.transgender {\n  color: #dba457;\n}\n.gender.herm {\n  color: #b07cf3;\n}\n.gender.shemale {\n  color: #e58bda;\n}\n.gender.cunt-boy {\n  color: #60d27b;\n}\n.gender.male-herm {\n  color: #527dff;\n}\n.gender.none {\n  color: #dcd6a8;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _flist = __webpack_require__(109);
	
	exports.default = {
	  props: {
	    character: Object
	  },
	
	  computed: {
	    gender: function gender() {
	      return this.character.gender.toLowerCase();
	    },
	    status: function status() {
	      return this.character.status.toLowerCase();
	    },
	    profileURL: function profileURL() {
	      return (0, _flist.getProfileURL)(this.character.name);
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */
	// <template>
	//   <span class='gender {{gender}}' :data-activate-character='character.name'>
	//     <i class="fa fa-circle status {{status}}"></i> {{character.name}}
	//   </span>
	// </template>
	//
	// <style lang="stylus" scoped>
	// span
	//   font-weight: 700
	//   text-shadow: 0px 1px 2px rgba(black, 0.5)
	//   cursor: pointer
	//
	// .status
	//   font-size: 40%
	//   position: relative
	//   top: -0.4em
	//
	//   &.online { color: rgb(62, 62, 62) }
	//   &.looking { color: rgb(32, 223, 109) }
	//   &.busy { color: rgba(white, 0.5) }
	//   &.away { color: rgb(58, 111, 246) }
	//   &.idle { color: rgb(235, 237, 129) }
	//   &.dnd { color: rgb(191, 77, 64) }
	//   &.offline { color: rgba(62, 62, 62, 0.5) }
	//
	// .gender
	//   &.male { color: hsl(210, 50%, 60%) }
	//   &.female { color: hsl(5, 90%, 78%) }
	//   &.transgender { color: hsl(35, 65%, 60%) }
	//   &.herm { color: hsl(266, 83%, 72%) }
	//   &.shemale { color: hsl(307, 63%, 72%) }
	//   &.cunt-boy { color: hsl(134, 56%, 60%) }
	//   &.male-herm { color: hsl(225, 100%, 66%) }
	//   &.none { color: hsl(54, 42%, 76%) }
	// </style>
	//
	// <script>

/***/ },
/* 117 */
/***/ function(module, exports) {

	module.exports = "\n  <span class=\"gender {{gender}}\" :data-activate-character=\"character.name\" _v-53dc470e=\"\">\n    <i class=\"fa fa-circle status {{status}}\" _v-53dc470e=\"\"></i> {{character.name}}\n  </span>\n";

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(119)
	__vue_template__ = __webpack_require__(120)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\elements\\ChatMessage.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Character = __webpack_require__(113);
	
	var _Character2 = _interopRequireDefault(_Character);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: {
	    Character: _Character2.default
	  },
	
	  props: {
	    character: Object,
	    message: String
	  },
	
	  computed: {
	    parsedMessage: function parsedMessage() {
	      return this.message.replace(/^\/me\s*/gi, '');
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */
	// <template>
	//   <div class='ui hover-darken' style="padding: 0.2em 0.5em"
	//   :style="{ fontStyle: message.startsWith('/me') ? 'italic' : 'none' }">
	//     <character :character='character'></character>
	//     <span style="margin-left: 0.3em; white-space: pre-wrap" v-html="parsedMessage | bbcode"></span>
	//   </div>
	// </template>
	//
	// <style lang="stylus" scoped></style>
	//
	// <script>

/***/ },
/* 120 */
/***/ function(module, exports) {

	module.exports = "\r\n  <div class='ui hover-darken' style=\"padding: 0.2em 0.5em\"\r\n  :style=\"{ fontStyle: message.startsWith('/me') ? 'italic' : 'none' }\">\r\n    <character :character='character'></character>\r\n    <span style=\"margin-left: 0.3em; white-space: pre-wrap\" v-html=\"parsedMessage | bbcode\"></span>\r\n  </div>\r\n";

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(122)
	__vue_script__ = __webpack_require__(124)
	__vue_template__ = __webpack_require__(125)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\elements\\ChatMessageList.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(123);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-784787c6&file=ChatMessageList.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ChatMessageList.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-784787c6&file=ChatMessageList.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ChatMessageList.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".scroll[_v-784787c6] {\n  padding: 0.3em 0em;\n}\n", "", {"version":3,"sources":["/./view/components/elements/ChatMessageList.vue.style","/./view/components/elements/ChatMessageList.vue"],"names":[],"mappings":"AACA;EACE,mBAAA;CCAD","file":"ChatMessageList.vue","sourcesContent":["\r\n.scroll\r\n  padding: 0.3em 0em\r\n",".scroll {\n  padding: 0.3em 0em;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ChatMessage = __webpack_require__(118);
	
	var _ChatMessage2 = _interopRequireDefault(_ChatMessage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    messages: Array
	  },
	
	  data: function data() {
	    return {
	      scroll: 0,
	      scrollMax: 0
	    };
	  },
	  ready: function ready() {
	    var _this = this;
	
	    this.$watch('messages', function () {
	      var container = _this.$els.container;
	      var scrollTop = container.scrollTop;
	      var scrollHeight = container.scrollHeight;
	      var clientHeight = container.clientHeight;
	
	      var scroll = scrollTop;
	      var scrollMax = scrollHeight - clientHeight;
	
	      if (_this.scroll === _this.scrollMax) {
	        container.scrollTop = scrollMax;
	      }
	
	      _this.scroll = scroll;
	      _this.scrollMax = scrollMax;
	    });
	  },
	
	
	  methods: {
	    onScroll: function onScroll() {
	      var container = this.$els.container;
	
	      this.scroll = container.scrollTop;
	      this.scrollMax = container.scrollHeight - container.clientHeight;
	    }
	  },
	
	  components: {
	    ChatMessage: _ChatMessage2.default
	  }
	};
	// </script>
	//
	/* generated by vue-loader */
	// <template>
	//   <div class="ui scroll" v-el:container @scroll='onScroll'>
	//     <chat-message v-for='msg in messages'
	//     :character='msg.character'
	//     :message='msg.message'>
	//     </chat-message>
	//   </div>
	// </template>
	//
	// <style lang="stylus" scoped>
	// .scroll
	//   padding: 0.3em 0em
	// </style>
	//
	// <script>

/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"ui scroll\" v-el:container=\"\" @scroll=\"onScroll\" _v-784787c6=\"\">\n    <chat-message v-for=\"msg in messages\" :character=\"msg.character\" :message=\"msg.message\" _v-784787c6=\"\">\n    </chat-message>\n  </div>\n";

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"flex col stretch\" _v-0c853d9a=\"\">\n    <!-- description -->\n    <div class=\"flex fixed ui theme-color main scroll description\" _v-0c853d9a=\"\">\n      <span v-html=\"viewState.description | bbcode\" _v-0c853d9a=\"\"></span>\n    </div>\n\n    <div class=\"flex row stretch\" _v-0c853d9a=\"\">\n      <!-- message -->\n      <chat-message-list class=\"flex stretch\" :messages=\"viewState.messages\" _v-0c853d9a=\"\"></chat-message-list>\n\n      <!-- users -->\n      <div class=\"flex fixed ui theme-color main scroll character-list\" _v-0c853d9a=\"\">\n        <ul _v-0c853d9a=\"\">\n          <li class=\"ui hover-darken highlight green\" v-for=\"char in characterGroups.friends\" _v-0c853d9a=\"\">\n            <character class=\"character-list-item\" :character=\"char\" _v-0c853d9a=\"\"></character>\n          </li>\n          <li class=\"ui hover-darken highlight blue\" v-for=\"char in characterGroups.bookmarks\" _v-0c853d9a=\"\">\n            <character class=\"character-list-item\" :character=\"char\" _v-0c853d9a=\"\"></character>\n          </li>\n          <li class=\"ui hover-darken highlight red\" v-for=\"char in characterGroups.admins\" _v-0c853d9a=\"\">\n            <character class=\"character-list-item\" :character=\"char\" _v-0c853d9a=\"\"></character>\n          </li>\n          <li class=\"ui hover-darken\" v-for=\"char in characterGroups.looking\" _v-0c853d9a=\"\">\n            <character class=\"character-list-item\" :character=\"char\" _v-0c853d9a=\"\"></character>\n          </li>\n          <li class=\"ui hover-darken\" v-for=\"char in characterGroups.rest\" _v-0c853d9a=\"\">\n            <character class=\"character-list-item\" :character=\"char\" _v-0c853d9a=\"\"></character>\n          </li>\n        </ul>\n      </div>\n    </div>\n\n    <!-- chatbox -->\n    <div class=\"flex fixed ui theme-color main\" _v-0c853d9a=\"\">\n      <chatbox class=\"chatbox\" _v-0c853d9a=\"\"></chatbox>\n    </div>\n  </div>\n";

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(128)
	__vue_script__ = __webpack_require__(130)
	__vue_template__ = __webpack_require__(131)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\chat-views\\PrivateChatView.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(129);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-39d38f12&file=PrivateChatView.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PrivateChatView.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-39d38f12&file=PrivateChatView.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./PrivateChatView.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "header[_v-39d38f12] {\n  padding: 0.5em;\n}\n", "", {"version":3,"sources":["/./view/components/chat-views/PrivateChatView.vue.style","/./view/components/chat-views/PrivateChatView.vue"],"names":[],"mappings":"AACA;EACE,eAAA;CCAD","file":"PrivateChatView.vue","sourcesContent":["\r\nheader\r\n  padding: 0.5em\r\n","header {\n  padding: 0.5em;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Chatbox = __webpack_require__(29);
	
	var _Chatbox2 = _interopRequireDefault(_Chatbox);
	
	var _Character = __webpack_require__(113);
	
	var _Character2 = _interopRequireDefault(_Character);
	
	var _ChatMessage = __webpack_require__(118);
	
	var _ChatMessage2 = _interopRequireDefault(_ChatMessage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: {
	    Chatbox: _Chatbox2.default,
	    Character: _Character2.default,
	    ChatMessage: _ChatMessage2.default
	  },
	
	  props: {
	    viewState: Object
	  },
	
	  methods: {
	    messageSent: function messageSent(message) {
	      this.$emit('message-sent', message);
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */
	// <template>
	//   <div class='flex col stretch'>
	//     <header class='flex fixed ui theme-color main'>
	//       <character :character='viewState.character'></character>
	//       <em>
	//         <span>- {{viewState.character.status}}</span>
	//         <span v-if="viewState.character.statusMessage" v-html='", " + viewState.character.statusMessage | bbcode'></span>
	//       </em>
	//     </header>
	//
	//     <!-- <div class='box divider'></div> -->
	//
	//     <section class='flex stretch ui scroll'>
	//       <chat-message v-for='msg in viewState.messages'
	//       :character='msg.character'
	//       :message='msg.message'>
	//       </chat-message>
	//     </section>
	//
	//     <!-- <div class='box divider'></div> -->
	//
	//     <section class='flex fixed ui theme-color main'>
	//       <chatbox @message-sent='messageSent'></chatbox>
	//     </section>
	//   </div>
	// </template>
	//
	// <style lang="stylus" scoped>
	// header
	//   padding: 0.5em
	// </style>
	//
	// <script>

/***/ },
/* 131 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"flex col stretch\" _v-39d38f12=\"\">\n    <header class=\"flex fixed ui theme-color main\" _v-39d38f12=\"\">\n      <character :character=\"viewState.character\" _v-39d38f12=\"\"></character>\n      <em _v-39d38f12=\"\">\n        <span _v-39d38f12=\"\">- {{viewState.character.status}}</span>\n        <span v-if=\"viewState.character.statusMessage\" v-html=\"&quot;, &quot; + viewState.character.statusMessage | bbcode\" _v-39d38f12=\"\"></span>\n      </em>\n    </header>\n\n    <!-- <div class='box divider'></div> -->\n\n    <section class=\"flex stretch ui scroll\" _v-39d38f12=\"\">\n      <chat-message v-for=\"msg in viewState.messages\" :character=\"msg.character\" :message=\"msg.message\" _v-39d38f12=\"\">\n      </chat-message>\n    </section>\n\n    <!-- <div class='box divider'></div> -->\n\n    <section class=\"flex fixed ui theme-color main\" _v-39d38f12=\"\">\n      <chatbox @message-sent=\"messageSent\" _v-39d38f12=\"\"></chatbox>\n    </section>\n  </div>\n";

/***/ },
/* 132 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"flex col ui theme-color dark fullscreen\" _v-56ad2e4d=\"\">\n    <div class=\"flex row fixed\" style=\"flex-wrap: wrap\" _v-56ad2e4d=\"\">\n      <shortcut title=\"Actions\" icon=\"bars\" overlay=\"app-menu\" _v-56ad2e4d=\"\"></shortcut>\n      <shortcut title=\"Channels\" icon=\"globe\" overlay=\"channel-list\" _v-56ad2e4d=\"\"></shortcut>\n      <shortcut title=\"Users\" icon=\"heart\" overlay=\"online-users\" _v-56ad2e4d=\"\"></shortcut>\n\n      <chat-tab v-for=\"tab in tabs\" :active=\"activeTabIndex === $index\" :title=\"tab.title\" @closed=\"closeTab(tab)\" @mousedown=\"activeTabIndex = $index\" _v-56ad2e4d=\"\">\n        {{ tab.title }}\n      </chat-tab>\n    </div>\n\n    <component :is=\"currentTab.view\" :view-state=\"currentTab.state\" _v-56ad2e4d=\"\">\n    </component>\n  </div>\n";

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(134)
	__vue_script__ = __webpack_require__(136)
	__vue_template__ = __webpack_require__(137)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\overlays\\Login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(135);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-6c636a36&file=Login.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Login.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-6c636a36&file=Login.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Login.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".panel[_v-6c636a36] {\n  width: 14em;\n}\n", "", {"version":3,"sources":["/./view/components/overlays/Login.vue.style","/./view/components/overlays/Login.vue"],"names":[],"mappings":"AACA;EACE,YAAA;CCAD","file":"Login.vue","sourcesContent":["\r\n.panel\r\n  width: 14em\r\n",".panel {\n  width: 14em;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _flist = __webpack_require__(109);
	
	var _events = __webpack_require__(111);
	
	// <template>
	//   <div class='ui overlay flex col' transition='fade'>
	//     <div class='ui panel' style='margin-bottom: 1em'>
	//       <h1>Hi there!</h1>
	//       <form class='ui form' @submit.prevent='submit'>
	//         <div class='ui field text-input icon left'>
	//           <i class='fa fa-user'></i>
	//           <input type="text" placeholder="Username" v-model="username" :disabled='disabled'>
	//         </div>
	//         <div class='ui field text-input icon left'>
	//           <i class='fa fa-lock'></i>
	//           <input type="password" placeholder="Password" v-model="password" :disabled='disabled'>
	//         </div>
	//         <div class='ui field'>
	//           <label>
	//             <input type='checkbox' tabindex='0' /> Remember me
	//           </label>
	//         </div>
	//         <div class='ui field'>
	//           <button class='ui button' action="submit" :disabled='disabled'>Go</button>
	//         </div>
	//       </form>
	//       <span>{{status}}</span>
	//     </div>
	//     <center class='ui small subtle'>
	//       <em>
	//         <p>fchat-next alpha v0.1.0</p>
	//         <p>
	//           <i class='fa fa-code'></i> with
	//           <i class='fa fa-heart'></i> by
	//           <a class='ui link' href='https://www.f-list.net/c/alexander%20grapevine/' target='_blank'>Alexander Grapevine</a><br />
	//           Note me for questions or concerns.
	//         </p>
	//         <p><a class='ui link' href='https://github.com/Kingdaro/fchat'>Github Repository</a></p>
	//         <p>Warning: buggy and incomplete. Many things do not work.</p>
	//       </em>
	//     </center>
	//   </div>
	// </template>
	//
	// <style lang="stylus" scoped>
	// .panel
	//   width: 14em
	// </style>
	//
	// <script>
	
	
	var errorMessage = '\nCould not connect to F-List website.\nThey\'re either doing maintenance,\nor someone spilled coke on the servers again.\n';
	
	exports.default = {
	  data: function data() {
	    return {
	      username: '',
	      password: '',
	      status: '',
	      disabled: false
	    };
	  },
	
	
	  methods: {
	    submit: function submit() {
	      var _this = this;
	
	      (0, _flist.sendLoginRequest)(this.username, this.password).then(function (data) {
	        var correctedDataBecauseTheAPIIsReallyInconsistentAndStupid = {
	          characters: data.characters,
	          bookmarks: data.bookmarks.map(function (_ref) {
	            var name = _ref.name;
	            return name;
	          }),
	          friends: data.friends.map(function (_ref2) {
	            var source_name = _ref2.source_name;
	            var dest_name = _ref2.dest_name;
	
	            return { source: dest_name, dest: source_name }; // ??????
	          }),
	          ticket: data.ticket
	        };
	
	        _this.$dispatch(_events.LoginSuccess, correctedDataBecauseTheAPIIsReallyInconsistentAndStupid);
	      }).catch(function (err) {
	        _this.status = err || errorMessage;
	      }).then(function () {
	        _this.disabled = false;
	        _this.password = '';
	      });
	
	      this.$dispatch(_events.LoginRequest, this.username);
	      this.disabled = true;
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */

/***/ },
/* 137 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"ui overlay flex col\" transition=\"fade\" _v-6c636a36=\"\">\n    <div class=\"ui panel\" style=\"margin-bottom: 1em\" _v-6c636a36=\"\">\n      <h1 _v-6c636a36=\"\">Hi there!</h1>\n      <form class=\"ui form\" @submit.prevent=\"submit\" _v-6c636a36=\"\">\n        <div class=\"ui field text-input icon left\" _v-6c636a36=\"\">\n          <i class=\"fa fa-user\" _v-6c636a36=\"\"></i>\n          <input type=\"text\" placeholder=\"Username\" v-model=\"username\" :disabled=\"disabled\" _v-6c636a36=\"\">\n        </div>\n        <div class=\"ui field text-input icon left\" _v-6c636a36=\"\">\n          <i class=\"fa fa-lock\" _v-6c636a36=\"\"></i>\n          <input type=\"password\" placeholder=\"Password\" v-model=\"password\" :disabled=\"disabled\" _v-6c636a36=\"\">\n        </div>\n        <div class=\"ui field\" _v-6c636a36=\"\">\n          <label _v-6c636a36=\"\">\n            <input type=\"checkbox\" tabindex=\"0\" _v-6c636a36=\"\"> Remember me\n          </label>\n        </div>\n        <div class=\"ui field\" _v-6c636a36=\"\">\n          <button class=\"ui button\" action=\"submit\" :disabled=\"disabled\" _v-6c636a36=\"\">Go</button>\n        </div>\n      </form>\n      <span _v-6c636a36=\"\">{{status}}</span>\n    </div>\n    <center class=\"ui small subtle\" _v-6c636a36=\"\">\n      <em _v-6c636a36=\"\">\n        <p _v-6c636a36=\"\">fchat-next alpha v0.1.0</p>\n        <p _v-6c636a36=\"\">\n          <i class=\"fa fa-code\" _v-6c636a36=\"\"></i> with\n          <i class=\"fa fa-heart\" _v-6c636a36=\"\"></i> by\n          <a class=\"ui link\" href=\"https://www.f-list.net/c/alexander%20grapevine/\" target=\"_blank\" _v-6c636a36=\"\">Alexander Grapevine</a><br _v-6c636a36=\"\">\n          Note me for questions or concerns.\n        </p>\n        <p _v-6c636a36=\"\"><a class=\"ui link\" href=\"https://github.com/Kingdaro/fchat\" _v-6c636a36=\"\">Github Repository</a></p>\n        <p _v-6c636a36=\"\">Warning: buggy and incomplete. Many things do not work.</p>\n      </em>\n    </center>\n  </div>\n";

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(139)
	__vue_template__ = __webpack_require__(140)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\overlays\\CharacterList.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _state = __webpack_require__(33);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _events = __webpack_require__(111);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div class="ui overlay" transition="fade">
	//     <div class="ui panel">
	//       <h2>Who do we feel like playing today?</h2>
	//       <form class='ui form' @submit.prevent='submit'>
	//         <div class='ui field'>
	//           <ul class='ui selection'>
	//             <li v-for='name in characters'
	//             :class='{ "active": name === activeCharacter }'
	//             @click='setSelectedCharacter(name)'>
	//               {{name}}
	//             </li>
	//           </ul>
	//         </div>
	//         <div class='ui field'>
	//           <button class='ui button'>Go</button>
	//         </div>
	//       </form>
	//     </div>
	//   </div>
	// </template>
	//
	// <style lang="stylus" scoped></style>
	//
	// <script>
	exports.default = {
	  data: function data() {
	    return {
	      state: _state2.default,
	      activeCharacter: _state2.default.getCharacter()
	    };
	  },
	
	
	  computed: {
	    characters: function characters() {
	      return this.state.getUserCharacterList().sort();
	    }
	  },
	
	  methods: {
	    setSelectedCharacter: function setSelectedCharacter(name) {
	      this.activeCharacter = name;
	    },
	    submit: function submit() {
	      this.$dispatch(_events.CharacterSelected, this.activeCharacter);
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */

/***/ },
/* 140 */
/***/ function(module, exports) {

	module.exports = "\r\n  <div class=\"ui overlay\" transition=\"fade\">\r\n    <div class=\"ui panel\">\r\n      <h2>Who do we feel like playing today?</h2>\r\n      <form class='ui form' @submit.prevent='submit'>\r\n        <div class='ui field'>\r\n          <ul class='ui selection'>\r\n            <li v-for='name in characters'\r\n            :class='{ \"active\": name === activeCharacter }'\r\n            @click='setSelectedCharacter(name)'>\r\n              {{name}}\r\n            </li>\r\n          </ul>\r\n        </div>\r\n        <div class='ui field'>\r\n          <button class='ui button'>Go</button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n";

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(142)
	__vue_script__ = __webpack_require__(144)
	__vue_template__ = __webpack_require__(154)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\overlays\\ChannelList.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(143);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7c5afcbd&file=ChannelList.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ChannelList.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7c5afcbd&file=ChannelList.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ChannelList.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".selection[_v-7c5afcbd] {\n  min-width: 14em;\n  min-height: 20em;\n  text-align: left;\n  width: calc(100vh - 35em);\n  height: calc(100vh - 25em);\n}\n.selection li[_v-7c5afcbd] {\n  padding-left: 0.8em;\n  padding-right: 0.8em;\n}\n.selection li span[_v-7c5afcbd] {\n  pointer-events: none;\n}\n", "", {"version":3,"sources":["/./view/components/overlays/ChannelList.vue.style","/./view/components/overlays/ChannelList.vue"],"names":[],"mappings":"AACA;EACE,gBAAA;EACA,iBAAA;EACA,iBAAA;EAEA,0BAAA;EACA,2BAAA;CCDD;ADGC;EACE,oBAAA;EACA,qBAAA;CCDH;ADGG;EACE,qBAAA;CCDL","file":"ChannelList.vue","sourcesContent":["\r\n.selection\r\n  min-width: 14em\r\n  min-height: 20em\r\n  text-align: left\r\n\r\n  width: calc(100vh - 35em)\r\n  height: calc(100vh - 25em)\r\n\r\n  li\r\n    padding-left: 0.8em\r\n    padding-right: 0.8em\r\n\r\n    span\r\n      pointer-events: none\r\n",".selection {\n  min-width: 14em;\n  min-height: 20em;\n  text-align: left;\n  width: calc(100vh - 35em);\n  height: calc(100vh - 25em);\n}\n.selection li {\n  padding-left: 0.8em;\n  padding-right: 0.8em;\n}\n.selection li span {\n  pointer-events: none;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof2 = __webpack_require__(145);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _state = __webpack_require__(33);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _fuzzysearch = __webpack_require__(153);
	
	var _fuzzysearch2 = _interopRequireDefault(_fuzzysearch);
	
	var _types = __webpack_require__(110);
	
	var _events = __webpack_require__(111);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div class='ui overlay' transition="fade" @click.self='closeOverlay'>
	//     <div class='ui panel'>
	//       <h2>Chill and chat? Sounds good.</h2>
	//       <form class='ui form' @submit.prevent='closeOverlay'>
	//         <div class='ui field'>
	//           <ul class='ui selection'>
	//             <li v-for='channel in slicedChannelList'
	//             v-if="channel.name.trim() !== ''"
	//             class="ui noselect {{isJoined(channel.id) ? 'active' : ''}}"
	//             :data-toggle-channel='channel.name'>
	//               <span class='ui pull right'>{{channel.userCount}}</span>
	//               <span v-html="channel.name"></span>
	//             </li>
	//           </ul>
	//         </div>
	//
	//         <div class='ui field text-input icon left'>
	//           <i class='fa fa-search'></i>
	//           <input type="text" placeholder="Search..."
	//           v-model='searchQuery'>
	//         </div>
	//
	//         <div class='ui field'>
	//           <button class='ui button'>Done</button>
	//         </div>
	//       </form>
	//     </div>
	//   </div>
	// </template>
	//
	// <style lang="stylus" scoped>
	// .selection
	//   min-width: 14em
	//   min-height: 20em
	//   text-align: left
	//
	//   width: calc(100vh - 35em)
	//   height: calc(100vh - 25em)
	//
	//   li
	//     padding-left: 0.8em
	//     padding-right: 0.8em
	//
	//     span
	//       pointer-events: none
	// </style>
	//
	// <script>
	
	
	function compareChannelInfo(a, b) {
	  return a.name.localeCompare(b.name);
	}
	
	exports.default = {
	  data: function data() {
	    return {
	      searchQuery: '',
	      state: _state2.default
	    };
	  },
	
	
	  computed: {
	    channelList: function channelList() {
	      var publicChannels = this.state.getPublicChannelList().sort(compareChannelInfo);
	      var privateChannels = this.state.getPrivateChannelList().sort(compareChannelInfo);
	      return publicChannels.concat(privateChannels);
	    },
	    filteredChannelList: function filteredChannelList() {
	      var _this = this;
	
	      if (this.searchQuery.trim() === '') {
	        return this.channelList;
	      } else {
	        var _ret = function () {
	          var query = _this.searchQuery.toLocaleLowerCase();
	          var filter = function filter(ch) {
	            return (0, _fuzzysearch2.default)(query, ch.name.toLocaleLowerCase());
	          };
	          return {
	            v: _this.channelList.filter(filter)
	          };
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
	      }
	    },
	    slicedChannelList: function slicedChannelList() {
	      return this.filteredChannelList.slice(0, 200);
	    }
	  },
	
	  methods: {
	    isJoined: function isJoined(id) {
	      return this.state.getChannelStatus(id) === _types.ChannelStatus.joined;
	    },
	    closeOverlay: function closeOverlay() {
	      this.$dispatch(_events.PopOverlay);
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Symbol = __webpack_require__(146)["default"];
	
	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};
	
	exports.__esModule = true;

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(147), __esModule: true };

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(148);
	__webpack_require__(91);
	module.exports = __webpack_require__(50).Symbol;

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(13)
	  , global         = __webpack_require__(49)
	  , has            = __webpack_require__(58)
	  , DESCRIPTORS    = __webpack_require__(56)
	  , $export        = __webpack_require__(48)
	  , redefine       = __webpack_require__(53)
	  , $fails         = __webpack_require__(57)
	  , shared         = __webpack_require__(62)
	  , setToStringTag = __webpack_require__(60)
	  , uid            = __webpack_require__(63)
	  , wks            = __webpack_require__(61)
	  , keyOf          = __webpack_require__(149)
	  , $names         = __webpack_require__(150)
	  , enumKeys       = __webpack_require__(151)
	  , isArray        = __webpack_require__(152)
	  , anObject       = __webpack_require__(72)
	  , toIObject      = __webpack_require__(42)
	  , createDesc     = __webpack_require__(55)
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
	
	  if(DESCRIPTORS && !__webpack_require__(47)){
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

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(13)
	  , toIObject = __webpack_require__(42);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(42)
	  , getNames  = __webpack_require__(13).getNames
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

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(13);
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

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(44);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 153 */
/***/ function(module, exports) {

	'use strict';
	
	function fuzzysearch (needle, haystack) {
	  var tlen = haystack.length;
	  var qlen = needle.length;
	  if (qlen > tlen) {
	    return false;
	  }
	  if (qlen === tlen) {
	    return needle === haystack;
	  }
	  outer: for (var i = 0, j = 0; i < qlen; i++) {
	    var nch = needle.charCodeAt(i);
	    while (j < tlen) {
	      if (haystack.charCodeAt(j++) === nch) {
	        continue outer;
	      }
	    }
	    return false;
	  }
	  return true;
	}
	
	module.exports = fuzzysearch;


/***/ },
/* 154 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"ui overlay\" transition=\"fade\" @click.self=\"closeOverlay\" _v-7c5afcbd=\"\">\n    <div class=\"ui panel\" _v-7c5afcbd=\"\">\n      <h2 _v-7c5afcbd=\"\">Chill and chat? Sounds good.</h2>\n      <form class=\"ui form\" @submit.prevent=\"closeOverlay\" _v-7c5afcbd=\"\">\n        <div class=\"ui field\" _v-7c5afcbd=\"\">\n          <ul class=\"ui selection\" _v-7c5afcbd=\"\">\n            <li v-for=\"channel in slicedChannelList\" v-if=\"channel.name.trim() !== ''\" class=\"ui noselect {{isJoined(channel.id) ? 'active' : ''}}\" :data-toggle-channel=\"channel.name\" _v-7c5afcbd=\"\">\n              <span class=\"ui pull right\" _v-7c5afcbd=\"\">{{channel.userCount}}</span>\n              <span v-html=\"channel.name\" _v-7c5afcbd=\"\"></span>\n            </li>\n          </ul>\n        </div>\n\n        <div class=\"ui field text-input icon left\" _v-7c5afcbd=\"\">\n          <i class=\"fa fa-search\" _v-7c5afcbd=\"\"></i>\n          <input type=\"text\" placeholder=\"Search...\" v-model=\"searchQuery\" _v-7c5afcbd=\"\">\n        </div>\n\n        <div class=\"ui field\" _v-7c5afcbd=\"\">\n          <button class=\"ui button\" _v-7c5afcbd=\"\">Done</button>\n        </div>\n      </form>\n    </div>\n  </div>\n";

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(156)
	__vue_script__ = __webpack_require__(158)
	__vue_template__ = __webpack_require__(177)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\overlays\\AppMenu.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(157);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-eed82bc8&file=AppMenu.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppMenu.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-eed82bc8&file=AppMenu.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./AppMenu.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".form[_v-eed82bc8] {\n  padding: 0em 1em;\n}\n.avatar[_v-eed82bc8] {\n  display: inline-block;\n}\nimg[_v-eed82bc8] {\n  display: block;\n}\n", "", {"version":3,"sources":["/./view/components/overlays/AppMenu.vue.style","/./view/components/overlays/AppMenu.vue"],"names":[],"mappings":"AACA;EACE,iBAAA;CCAD;ADED;EACE,sBAAA;CCAD;ADED;EACE,eAAA;CCAD","file":"AppMenu.vue","sourcesContent":["\r\n.form\r\n  padding: 0em 1em\r\n\r\n.avatar\r\n  display: inline-block\r\n\r\nimg\r\n  display: block\r\n",".form {\n  padding: 0em 1em;\n}\n.avatar {\n  display: inline-block;\n}\nimg {\n  display: block;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ActionPanel = __webpack_require__(159);
	
	var _ActionPanel2 = _interopRequireDefault(_ActionPanel);
	
	var _CharacterAvatarLink = __webpack_require__(162);
	
	var _CharacterAvatarLink2 = _interopRequireDefault(_CharacterAvatarLink);
	
	var _MenuOption = __webpack_require__(167);
	
	var _MenuOption2 = _interopRequireDefault(_MenuOption);
	
	var _Dropdown = __webpack_require__(172);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var _state = __webpack_require__(33);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _flist = __webpack_require__(109);
	
	var _events = __webpack_require__(111);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: {
	    MenuOption: _MenuOption2.default,
	    Dropdown: _Dropdown2.default,
	    ActionPanel: _ActionPanel2.default,
	    CharacterAvatarLink: _CharacterAvatarLink2.default
	  },
	
	  data: function data() {
	    return { state: _state2.default };
	  },
	
	
	  computed: {
	    statusDropdown: function statusDropdown() {
	      return [{ value: 'online', label: 'Online' }, { value: 'looking', label: 'Looking' }, { value: 'busy', label: 'Busy' }, { value: 'away', label: 'Away' }, { value: 'dnd', label: 'DND' }];
	    },
	    character: function character() {
	      return this.state.getUserCharacterName();
	    },
	    greeting: function greeting() {
	      return 'Hi, ' + this.character.split(' ')[0] + '!';
	    },
	    profileURL: function profileURL() {
	      return (0, _flist.getProfileURL)(this.character);
	    },
	    avatarURL: function avatarURL() {
	      return (0, _flist.getAvatarURL)(this.character);
	    }
	  },
	
	  methods: {
	    statusChanged: function statusChanged() {
	      // set character status
	    },
	    openChannelMenu: function openChannelMenu() {
	      this.$dispatch(_events.PopOverlay);
	      this.$dispatch(_events.PushOverlay, 'channel-list');
	    },
	    openOnlineUsers: function openOnlineUsers() {
	      this.$dispatch(_events.PopOverlay);
	      this.$dispatch(_events.PushOverlay, 'online-users');
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */
	// <template>
	//   <action-panel side="left">
	//     <form slot="content" class="ui form">
	//       <h2>{{greeting}}</h2>
	//       <div class="ui field">
	//         <character-avatar-link :character="state.getUserCharacter()"></character-avatar-link>
	//       </div>
	//       <div class="ui field">
	//         <!-- <dropdown :items='statusDropdown' @selection='statusChanged'></dropdown> -->
	//         <dropdown>
	//           <li value="online">Online</li>
	//           <li value="looking">Looking</li>
	//           <li value="busy">Busy</li>
	//           <li value="away">Away</li>
	//           <li value="dnd">DND</li>
	//         </dropdown>
	//       </div>
	//       <div class="ui field text-input icon right">
	//         <i class='fa fa-pencil'></i>
	//         <div contenteditable placeholder="What's up?"></div>
	//       </div>
	//     </form>
	//
	//     <div slot="options">
	//       <menu-option icon='globe' @mousedown="openChannelMenu">Channels</menu-option>
	//       <menu-option icon='paw' @mousedown="openOnlineUsers">Online Users</menu-option>
	//       <menu-option icon='gear'>Settings</menu-option>
	//       <menu-option icon='user'>Switch Character</menu-option>
	//       <menu-option icon='sign-out'>Log Out</menu-option>
	//     </div>
	//   </action-panel>
	// </template>
	//
	// <style lang="stylus" scoped>
	// .form
	//   padding: 0em 1em
	//
	// .avatar
	//   display: inline-block
	//
	// img
	//   display: block
	// </style>
	//
	// <script>

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(160)
	__vue_template__ = __webpack_require__(161)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\elements\\ActionPanel.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _events = __webpack_require__(111);
	
	exports.default = {
	  props: {
	    side: {
	      type: String,
	      default: 'left'
	    }
	  },
	
	  data: function data() {
	    return {
	      transition: 'slide-' + this.side
	    };
	  },
	
	
	  methods: {
	    close: function close() {
	      this.$dispatch(_events.PopOverlay);
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */
	// <template>
	//   <div class="ui overlay" :transition="transition" @click.self="close">
	//     <div class="ui side-panel {{side}} flex col">
	//       <div class="flex fixed">
	//         <slot name="content"></slot>
	//       </div>
	//       <div class="flex stretch ui theme-color dark">
	//         <slot name="options"></slot>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>

/***/ },
/* 161 */
/***/ function(module, exports) {

	module.exports = "\r\n  <div class=\"ui overlay\" :transition=\"transition\" @click.self=\"close\">\r\n    <div class=\"ui side-panel {{side}} flex col\">\r\n      <div class=\"flex fixed\">\r\n        <slot name=\"content\"></slot>\r\n      </div>\r\n      <div class=\"flex stretch ui theme-color dark\">\r\n        <slot name=\"options\"></slot>\r\n      </div>\r\n    </div>\r\n  </div>\r\n";

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(163)
	__vue_script__ = __webpack_require__(165)
	__vue_template__ = __webpack_require__(166)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\elements\\CharacterAvatarLink.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(164);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3a713a68&file=CharacterAvatarLink.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CharacterAvatarLink.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3a713a68&file=CharacterAvatarLink.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CharacterAvatarLink.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "a[_v-3a713a68] {\n  width: 100px;\n  height: 100px;\n  border: none;\n  text-decoration: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\ni[_v-3a713a68] {\n  opacity: 0.5;\n}\nimg[_v-3a713a68]:hover {\n  -webkit-filter: brightness(1.2);\n          filter: brightness(1.2);\n  opacity: 0.8;\n}\n", "", {"version":3,"sources":["/./view/components/elements/CharacterAvatarLink.vue.style","/./view/components/elements/CharacterAvatarLink.vue"],"names":[],"mappings":"AACA;EACE,aAAA;EACA,cAAA;EACA,aAAA;EACA,sBAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,wBAAA;EACA,0BAAA;MAAA,uBAAA;UAAA,oBAAA;CCAD;ADED;EACE,aAAA;CCAD;ADED;EACE,gCAAA;UAAA,wBAAA;EACA,aAAA;CCAD","file":"CharacterAvatarLink.vue","sourcesContent":["\r\na\r\n  width: 100px\r\n  height: 100px\r\n  border: none\r\n  text-decoration: none\r\n  display: flex\r\n  justify-content: center\r\n  align-items: center\r\n\r\ni\r\n  opacity: 0.5\r\n\r\nimg:hover\r\n  filter: brightness(1.2)\r\n  opacity: 0.8\r\n","a {\n  width: 100px;\n  height: 100px;\n  border: none;\n  text-decoration: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\ni {\n  opacity: 0.5;\n}\nimg:hover {\n  filter: brightness(1.2);\n  opacity: 0.8;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _flist = __webpack_require__(109);
	
	exports.default = {
	  props: {
	    character: Object
	  },
	
	  data: function data() {
	    return { imageLoaded: false };
	  },
	
	
	  computed: {
	    profileURL: function profileURL() {
	      return (0, _flist.getProfileURL)(this.character.name);
	    },
	    avatarURL: function avatarURL() {
	      return (0, _flist.getAvatarURL)(this.character.name);
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */
	// <template>
	//   <a target="_blank" :href="profileURL">
	//     <img class="ui transition" v-show="imageLoaded" transition="fade" :src="avatarURL" @load="imageLoaded = true" />
	//     <i v-show="!imageLoaded" class="fa fa-circle-o-notch fa-spin fa-2x"></i>
	//   </a>
	// </template>
	//
	// <style lang="stylus" scoped>
	// a
	//   width: 100px
	//   height: 100px
	//   border: none
	//   text-decoration: none
	//   display: flex
	//   justify-content: center
	//   align-items: center
	//
	// i
	//   opacity: 0.5
	//
	// img:hover
	//   filter: brightness(1.2)
	//   opacity: 0.8
	// </style>
	//
	// <script>

/***/ },
/* 166 */
/***/ function(module, exports) {

	module.exports = "\n  <a target=\"_blank\" :href=\"profileURL\" _v-3a713a68=\"\">\n    <img class=\"ui transition\" v-show=\"imageLoaded\" transition=\"fade\" :src=\"avatarURL\" @load=\"imageLoaded = true\" _v-3a713a68=\"\">\n    <i v-show=\"!imageLoaded\" class=\"fa fa-circle-o-notch fa-spin fa-2x\" _v-3a713a68=\"\"></i>\n  </a>\n";

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(168)
	__vue_script__ = __webpack_require__(170)
	__vue_template__ = __webpack_require__(171)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\elements\\MenuOption.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(169);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-422d3b14&file=MenuOption.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./MenuOption.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-422d3b14&file=MenuOption.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./MenuOption.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "a[_v-422d3b14] {\n  display: block;\n  padding: 0.6em 0.6em;\n}\n", "", {"version":3,"sources":["/./view/components/elements/MenuOption.vue.style","/./view/components/elements/MenuOption.vue"],"names":[],"mappings":"AACA;EACE,eAAA;EACA,qBAAA;CCAD","file":"MenuOption.vue","sourcesContent":["\r\na\r\n  display: block\r\n  padding: 0.6em 0.6em\r\n","a {\n  display: block;\n  padding: 0.6em 0.6em;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 170 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <a class='ui hover-darken' target="_blank">
	//     <i class='fa fa-{{icon}} fa-fw'></i> <slot></slot>
	//   </a>
	// </template>
	//
	// <style lang="stylus" scoped>
	// a
	//   display: block
	//   padding: 0.6em 0.6em
	// </style>
	//
	// <script>
	exports.default = {
	  props: {
	    icon: String
	  }
	};
	// </script>
	//
	/* generated by vue-loader */

/***/ },
/* 171 */
/***/ function(module, exports) {

	module.exports = "\n  <a class=\"ui hover-darken\" target=\"_blank\" _v-422d3b14=\"\">\n    <i class=\"fa fa-{{icon}} fa-fw\" _v-422d3b14=\"\"></i> <slot _v-422d3b14=\"\"></slot>\n  </a>\n";

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(173)
	__vue_script__ = __webpack_require__(175)
	__vue_template__ = __webpack_require__(176)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\elements\\Dropdown.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(174);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0d0213f1&file=Dropdown.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Dropdown.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0d0213f1&file=Dropdown.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Dropdown.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "div[_v-0d0213f1] {\n  display: inline-block;\n  text-align: left;\n  position: relative;\n  width: 10em;\n}\n.head[_v-0d0213f1] {\n  width: 100%;\n  z-index: 10000;\n}\nol[_v-0d0213f1] {\n  width: 100%;\n  position: absolute;\n  z-index: 9999;\n}\n", "", {"version":3,"sources":["/./view/components/elements/Dropdown.vue.style","/./view/components/elements/Dropdown.vue"],"names":[],"mappings":"AACA;EACE,sBAAA;EACA,iBAAA;EACA,mBAAA;EACA,YAAA;CCAD;ADED;EACE,YAAA;EACA,eAAA;CCAD;ADED;EACE,YAAA;EACA,mBAAA;EACA,cAAA;CCAD","file":"Dropdown.vue","sourcesContent":["\r\ndiv\r\n  display: inline-block\r\n  text-align: left\r\n  position: relative\r\n  width: 10em\r\n\r\n.head\r\n  width: 100%\r\n  z-index: 10000\r\n\r\nol\r\n  width: 100%\r\n  position: absolute\r\n  z-index: 9999\r\n","div {\n  display: inline-block;\n  text-align: left;\n  position: relative;\n  width: 10em;\n}\n.head {\n  width: 100%;\n  z-index: 10000;\n}\nol {\n  width: 100%;\n  position: absolute;\n  z-index: 9999;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getIterator2 = __webpack_require__(69);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div>
	//     <span class='ui section icon right hover-darken noselect head' @click='toggle'>
	//       <i class='fa fa-caret-down'></i> {{ valueLabel }}
	//     </span>
	//     <ol class='ui theme-color dark border shadow' v-show='open' transition="collapse" v-el:list-items @click='selectItem($event)'>
	//       <slot></slot>
	//     </ol>
	//   </div>
	// </template>
	//
	// <style lang="stylus" scoped>
	// div
	//   display: inline-block
	//   text-align: left
	//   position: relative
	//   width: 10em
	//
	// .head
	//   width: 100%
	//   z-index: 10000
	//
	// ol
	//   width: 100%
	//   position: absolute
	//   z-index: 9999
	// </style>
	//
	// <script>
	exports.default = {
	  data: function data() {
	    return {
	      open: false,
	      selected: undefined
	    };
	  },
	  ready: function ready() {
	    var children = this.$els.listItems.children;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = (0, _getIterator3.default)(children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var item = _step.value;
	
	        item.style.padding = '0.5em';
	        item.classList.add('ui', 'theme-color', 'dark', 'hover-darken');
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	
	    this.selected = children[0];
	  },
	
	
	  methods: {
	    toggle: function toggle() {
	      this.open = !this.open;
	    },
	    selectItem: function selectItem(event) {
	      this.selected = event.target;
	      this.open = false;
	    }
	  },
	
	  computed: {
	    value: function value() {
	      if (this.selected) {
	        var value = this.selected.getAttribute('value');
	        return value !== null ? value : this.selected.innerText;
	      } else {
	        return '';
	      }
	    },
	    valueLabel: function valueLabel() {
	      return this.selected ? this.selected.innerText : '';
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */

/***/ },
/* 176 */
/***/ function(module, exports) {

	module.exports = "\n  <div _v-0d0213f1=\"\">\n    <span class=\"ui section icon right hover-darken noselect head\" @click=\"toggle\" _v-0d0213f1=\"\">\n      <i class=\"fa fa-caret-down\" _v-0d0213f1=\"\"></i> {{ valueLabel }}\n    </span>\n    <ol class=\"ui theme-color dark border shadow\" v-show=\"open\" transition=\"collapse\" v-el:list-items=\"\" @click=\"selectItem($event)\" _v-0d0213f1=\"\">\n      <slot _v-0d0213f1=\"\"></slot>\n    </ol>\n  </div>\n";

/***/ },
/* 177 */
/***/ function(module, exports) {

	module.exports = "\n  <action-panel side=\"left\" _v-eed82bc8=\"\">\n    <form slot=\"content\" class=\"ui form\" _v-eed82bc8=\"\">\n      <h2 _v-eed82bc8=\"\">{{greeting}}</h2>\n      <div class=\"ui field\" _v-eed82bc8=\"\">\n        <character-avatar-link :character=\"state.getUserCharacter()\" _v-eed82bc8=\"\"></character-avatar-link>\n      </div>\n      <div class=\"ui field\" _v-eed82bc8=\"\">\n        <!-- <dropdown :items='statusDropdown' @selection='statusChanged'></dropdown> -->\n        <dropdown _v-eed82bc8=\"\">\n          <li value=\"online\" _v-eed82bc8=\"\">Online</li>\n          <li value=\"looking\" _v-eed82bc8=\"\">Looking</li>\n          <li value=\"busy\" _v-eed82bc8=\"\">Busy</li>\n          <li value=\"away\" _v-eed82bc8=\"\">Away</li>\n          <li value=\"dnd\" _v-eed82bc8=\"\">DND</li>\n        </dropdown>\n      </div>\n      <div class=\"ui field text-input icon right\" _v-eed82bc8=\"\">\n        <i class=\"fa fa-pencil\" _v-eed82bc8=\"\"></i>\n        <div contenteditable=\"\" placeholder=\"What's up?\" _v-eed82bc8=\"\"></div>\n      </div>\n    </form>\n\n    <div slot=\"options\" _v-eed82bc8=\"\">\n      <menu-option icon=\"globe\" @mousedown=\"openChannelMenu\" _v-eed82bc8=\"\">Channels</menu-option>\n      <menu-option icon=\"paw\" @mousedown=\"openOnlineUsers\" _v-eed82bc8=\"\">Online Users</menu-option>\n      <menu-option icon=\"gear\" _v-eed82bc8=\"\">Settings</menu-option>\n      <menu-option icon=\"user\" _v-eed82bc8=\"\">Switch Character</menu-option>\n      <menu-option icon=\"sign-out\" _v-eed82bc8=\"\">Log Out</menu-option>\n    </div>\n  </action-panel>\n";

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(179)
	__vue_script__ = __webpack_require__(181)
	__vue_template__ = __webpack_require__(182)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\overlays\\CharacterMenu.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(180);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-645a6fb8&file=CharacterMenu.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CharacterMenu.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-645a6fb8&file=CharacterMenu.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./CharacterMenu.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".form[_v-645a6fb8] {\n  padding: 0em 1em;\n}\n.wrap-break-word[_v-645a6fb8] {\n  word-wrap: break-word;\n}\nimg[_v-645a6fb8] {\n  display: block;\n}\n", "", {"version":3,"sources":["/./view/components/overlays/CharacterMenu.vue.style","/./view/components/overlays/CharacterMenu.vue"],"names":[],"mappings":"AACA;EACE,iBAAA;CCAD;ADED;EACE,sBAAA;CCAD;ADED;EACE,eAAA;CCAD","file":"CharacterMenu.vue","sourcesContent":["\r\n.form\r\n  padding: 0em 1em\r\n\r\n.wrap-break-word\r\n  word-wrap: break-word\r\n\r\nimg\r\n  display: block\r\n",".form {\n  padding: 0em 1em;\n}\n.wrap-break-word {\n  word-wrap: break-word;\n}\nimg {\n  display: block;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _MenuOption = __webpack_require__(167);
	
	var _MenuOption2 = _interopRequireDefault(_MenuOption);
	
	var _ActionPanel = __webpack_require__(159);
	
	var _ActionPanel2 = _interopRequireDefault(_ActionPanel);
	
	var _CharacterAvatarLink = __webpack_require__(162);
	
	var _CharacterAvatarLink2 = _interopRequireDefault(_CharacterAvatarLink);
	
	var _flist = __webpack_require__(109);
	
	var _events = __webpack_require__(111);
	
	var _state = __webpack_require__(33);
	
	var _state2 = _interopRequireDefault(_state);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <action-panel side="right">
	//     <section slot="content">
	//       <form slot="content" class="ui form">
	//         <h2 class="wrap-break-word">{{char.name}}</h2>
	//         <div class="ui field">
	//           <character-avatar-link :character="activeCharacter"></character-avatar-link>
	//         </div>
	//         <small class="ui field wrap-break-word section">
	//           <em>
	//             {{char.gender}}, {{char.status}}
	//             <span v-if="char.statusMessage !== ''" v-html="'- ' + char.statusMessage | bbcode"></span>
	//           </em>
	//         </small>
	//         <small class="ui field section highlight green" v-for="friend in friendships">
	//           <em><i class="fa fa-heart"></i> {{friend}}</em>
	//         </small>
	//       </form>
	//     </section>
	//     <section slot="options">
	//       <menu-option icon='comment' @click='openPrivateChat'>Send Message</menu-option>
	//
	//       <menu-option icon='star-o' v-if='!bookmarked' @click='state.addBookmark(char.name)'>Bookmark</menu-option>
	//       <menu-option icon='star' v-else @click='state.removeBookmark(char.name)'>Unbookmark</menu-option>
	//
	//       <menu-option icon='minus-square-o' v-if='!ignored'>Ignore</menu-option>
	//       <menu-option icon='minus-square' v-else>Unignore</menu-option>
	//
	//       <menu-option icon='link' :href="getProfileURL(char.name)">View Profile</menu-option>
	//     </section>
	//   </action-panel>
	// </template>
	//
	// <style lang="stylus" scoped>
	// .form
	//   padding: 0em 1em
	//
	// .wrap-break-word
	//   word-wrap: break-word
	//
	// img
	//   display: block
	// </style>
	//
	// <script>
	exports.default = {
	  props: {
	    activeCharacter: Object
	  },
	
	  components: {
	    MenuOption: _MenuOption2.default,
	    ActionPanel: _ActionPanel2.default,
	    CharacterAvatarLink: _CharacterAvatarLink2.default
	  },
	
	  data: function data() {
	    return {
	      getProfileURL: _flist.getProfileURL,
	      getAvatarURL: _flist.getAvatarURL,
	      state: _state2.default
	    };
	  },
	
	
	  methods: {
	    openPrivateChat: function openPrivateChat() {
	      this.$dispatch(_events.OpenPrivateChatRequest, this.activeCharacter.name);
	      this.close();
	    },
	    close: function close() {
	      this.$dispatch(_events.PopOverlay);
	    }
	  },
	
	  computed: {
	    char: function char() {
	      return this.activeCharacter;
	    },
	    friendships: function friendships() {
	      return this.state.getFriendship(this.char.name);
	    },
	    bookmarked: function bookmarked() {
	      return this.state.isBookmarked(this.char.name);
	    },
	    ignored: function ignored() {
	      return this.state.isIgnored(this.char.name);
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */

/***/ },
/* 182 */
/***/ function(module, exports) {

	module.exports = "\n  <action-panel side=\"right\" _v-645a6fb8=\"\">\n    <section slot=\"content\" _v-645a6fb8=\"\">\n      <form slot=\"content\" class=\"ui form\" _v-645a6fb8=\"\">\n        <h2 class=\"wrap-break-word\" _v-645a6fb8=\"\">{{char.name}}</h2>\n        <div class=\"ui field\" _v-645a6fb8=\"\">\n          <character-avatar-link :character=\"activeCharacter\" _v-645a6fb8=\"\"></character-avatar-link>\n        </div>\n        <small class=\"ui field wrap-break-word section\" _v-645a6fb8=\"\">\n          <em _v-645a6fb8=\"\">\n            {{char.gender}}, {{char.status}}\n            <span v-if=\"char.statusMessage !== ''\" v-html=\"'- ' + char.statusMessage | bbcode\" _v-645a6fb8=\"\"></span>\n          </em>\n        </small>\n        <small class=\"ui field section highlight green\" v-for=\"friend in friendships\" _v-645a6fb8=\"\">\n          <em _v-645a6fb8=\"\"><i class=\"fa fa-heart\" _v-645a6fb8=\"\"></i> {{friend}}</em>\n        </small>\n      </form>\n    </section>\n    <section slot=\"options\" _v-645a6fb8=\"\">\n      <menu-option icon=\"comment\" @click=\"openPrivateChat\" _v-645a6fb8=\"\">Send Message</menu-option>\n\n      <menu-option icon=\"star-o\" v-if=\"!bookmarked\" @click=\"state.addBookmark(char.name)\" _v-645a6fb8=\"\">Bookmark</menu-option>\n      <menu-option icon=\"star\" v-else=\"\" @click=\"state.removeBookmark(char.name)\" _v-645a6fb8=\"\">Unbookmark</menu-option>\n\n      <menu-option icon=\"minus-square-o\" v-if=\"!ignored\" _v-645a6fb8=\"\">Ignore</menu-option>\n      <menu-option icon=\"minus-square\" v-else=\"\" _v-645a6fb8=\"\">Unignore</menu-option>\n\n      <menu-option icon=\"link\" :href=\"getProfileURL(char.name)\" _v-645a6fb8=\"\">View Profile</menu-option>\n    </section>\n  </action-panel>\n";

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(184)
	__vue_script__ = __webpack_require__(186)
	__vue_template__ = __webpack_require__(189)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "E:\\Kingdaro\\Projects\\web\\fchat\\view\\components\\overlays\\OnlineUsers.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(185);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7a68841e&file=OnlineUsers.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./OnlineUsers.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7a68841e&file=OnlineUsers.vue&scoped=true!./../../../node_modules/stylus-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./OnlineUsers.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".selection[_v-7a68841e] {\n  text-align: left;\n  width: calc(100vh - 38em);\n  height: calc(100vh - 30em);\n  min-width: 14em;\n  min-height: 18em;\n}\n", "", {"version":3,"sources":["/./view/components/overlays/OnlineUsers.vue.style","/./view/components/overlays/OnlineUsers.vue"],"names":[],"mappings":"AACA;EACE,iBAAA;EACA,0BAAA;EACA,2BAAA;EACA,gBAAA;EACA,iBAAA;CCAD","file":"OnlineUsers.vue","sourcesContent":["\r\n.selection\r\n  text-align: left\r\n  width: calc(100vh - 38em)\r\n  height: calc(100vh - 30em)\r\n  min-width: 14em\r\n  min-height: 18em\r\n",".selection {\n  text-align: left;\n  width: calc(100vh - 38em);\n  height: calc(100vh - 30em);\n  min-width: 14em;\n  min-height: 18em;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getIterator2 = __webpack_require__(69);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _Character = __webpack_require__(113);
	
	var _Character2 = _interopRequireDefault(_Character);
	
	var _Dropdown = __webpack_require__(172);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var _state = __webpack_require__(33);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _util = __webpack_require__(187);
	
	var _events = __webpack_require__(111);
	
	var _fuse = __webpack_require__(188);
	
	var _fuse2 = _interopRequireDefault(_fuse);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template>
	//   <div class="ui overlay" transition="fade" @click.self='close'>
	//     <div class="ui panel">
	//       <h2>Let's find some friends!</h2>
	//       <form class="ui form" @submit.prevent>
	//         <div class="ui field">
	//           <dropdown style="width: 8em" v-ref:filter>
	//             <li value="all">All</li>
	//             <li value="friend">Friends</li>
	//             <li value="bookmark">Bookmarks</li>
	//             <li value="looking">Looking</li>
	//           </dropdown>
	//         </div>
	//         <div class="ui field">
	//           <ul class="ui selection" style="">
	//             <li v-for="char in slicedCharacters" :class="getListClass(char)" :data-activate-character='char.name'>
	//               <i class="fa fa-heart ui pull-right" v-if="characterIs(char, 'friend')"></i>
	//               <i class="fa fa-star ui pull-right" v-if="characterIs(char, 'bookmark')"></i>
	//               <i class="fa fa-paw ui pull-right" v-if="characterIs(char, 'looking')"></i>
	//               <character :character='char'></character>
	//             </li>
	//             <center class="ui small subtle" style="padding: 0.5em" v-if="slicedCharacters.length === 200">
	//               <em>List truncated for performance. Search for more results.</em>
	//             </center>
	//           </ul>
	//         </div>
	//         <div class="ui field text-input icon right">
	//           <i class="fa fa-search"></i>
	//           <input type="text" placeholder="Search..." v-model="search" debounce="500" />
	//         </div>
	//         <div class="ui field">
	//           <button class="ui button" @click='close'>Done</button>
	//         </div>
	//       </form>
	//     </div>
	//   </div>
	// </template>
	//
	// <style lang="stylus" scoped>
	// .selection
	//   text-align: left
	//   width: calc(100vh - 38em)
	//   height: calc(100vh - 30em)
	//   min-width: 14em
	//   min-height: 18em
	// </style>
	//
	// <script>
	exports.default = {
	  components: {
	    Character: _Character2.default,
	    Dropdown: _Dropdown2.default
	  },
	
	  data: function data() {
	    return {
	      characters: [],
	      search: '',
	      state: _state2.default
	    };
	  },
	  ready: function ready() {
	    var characters = this.state.getOnlineCharacters();
	    var friends = [];
	    var bookmarks = [];
	    var looking = [];
	    var rest = [];
	
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = (0, _getIterator3.default)(characters), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var char = _step.value;
	
	        var cat = this.state.getCharacterCategory(char);
	        if (cat[0] === 'friend') {
	          friends.push(char);
	        } else if (cat[0] === 'bookmark') {
	          bookmarks.push(char);
	        } else if (cat[0] === 'looking') {
	          looking.push(char);
	        } else {
	          rest.push(char);
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	
	    friends.sort(_util.compareNames);
	    bookmarks.sort(_util.compareNames);
	    looking.sort(_util.compareNames);
	    rest.sort(_util.compareNames);
	
	    this.characters = friends.concat(bookmarks, looking, rest);
	  },
	
	
	  computed: {
	    filteredCharacters: function filteredCharacters() {
	      var _this = this;
	
	      if (!this.$refs.filter) {
	        return this.characters;
	      }
	
	      var value = this.$refs.filter.value;
	
	      if (value === 'all') {
	        return this.characters;
	      }
	
	      return this.characters.filter(function (char) {
	        var cat = _this.state.getCharacterCategory(char);
	        return cat.includes(value);
	      });
	    },
	    searchedCharacters: function searchedCharacters() {
	      var filtered = this.filteredCharacters;
	      if (this.search.trim() !== '') {
	        var fuse = new _fuse2.default(filtered, { keys: ['name', 'gender'] });
	        return fuse.search(this.search);
	      }
	      return filtered;
	    },
	    slicedCharacters: function slicedCharacters() {
	      return this.searchedCharacters.slice(0, 200);
	    }
	  },
	
	  methods: {
	    characterIs: function characterIs(char, what) {
	      var cat = this.state.getCharacterCategory(char);
	      return cat.includes(what);
	    },
	    getListClass: function getListClass(char) {
	      var cat = this.state.getCharacterCategory(char);
	      if (cat[0] === 'friend') {
	        return 'ui highlight green';
	      } else if (cat[0] === 'bookmark') {
	        return 'ui highlight blue';
	      }
	      return '';
	    },
	    close: function close() {
	      this.$dispatch(_events.PopOverlay);
	    }
	  }
	};
	// </script>
	//
	/* generated by vue-loader */

/***/ },
/* 187 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.compareNames = compareNames;
	function compareNames(a, b) {
	  return a.name.localeCompare(b.name);
	}

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Fuse - Lightweight fuzzy-search
	 *
	 * Copyright (c) 2012-2016 Kirollos Risk <kirollos@gmail.com>.
	 * All Rights Reserved. Apache Software License 2.0
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License")
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	;(function (global) {
	  'use strict'
	
	  function log () {
	    console.log.apply(console, arguments)
	  }
	
	  var MULTI_CHAR_REGEX = / +/g
	
	  var defaultOptions = {
	    // The name of the identifier property. If specified, the returned result will be a list
	    // of the items' dentifiers, otherwise it will be a list of the items.
	    id: null,
	
	    // Indicates whether comparisons should be case sensitive.
	
	    caseSensitive: false,
	
	    // An array of values that should be included from the searcher's output. When this array
	    // contains elements, each result in the list will be of the form `{ item: ..., include1: ..., include2: ... }`.
	    // Values you can include are `score`, `matchedLocations`
	    include: [],
	
	    // Whether to sort the result list, by score
	    shouldSort: true,
	
	    // The search function to use
	    // Note that the default search function ([[Function]]) must conform to the following API:
	    //
	    //  @param pattern The pattern string to search
	    //  @param options The search option
	    //  [[Function]].constructor = function(pattern, options)
	    //
	    //  @param text: the string to search in for the pattern
	    //  @return Object in the form of:
	    //    - isMatch: boolean
	    //    - score: Int
	    //  [[Function]].prototype.search = function(text)
	    searchFn: BitapSearcher,
	
	    // Default sort function
	    sortFn: function (a, b) {
	      return a.score - b.score
	    },
	
	    // The get function to use when fetching an object's properties.
	    // The default will search nested paths *ie foo.bar.baz*
	    getFn: deepValue,
	
	    // List of properties that will be searched. This also supports nested properties.
	    keys: [],
	
	    // Will print to the console. Useful for debugging.
	    verbose: false,
	
	    // When true, the search algorithm will search individual words **and** the full string,
	    // computing the final score as a function of both. Note that when `tokenize` is `true`,
	    // the `threshold`, `distance`, and `location` are inconsequential for individual tokens.
	    tokenize: false
	  }
	
	  function Fuse (list, options) {
	    var i
	    var len
	    var key
	    var keys
	
	    this.list = list
	    this.options = options = options || {}
	
	    // Add boolean type options
	    for (i = 0, keys = ['sort', 'shouldSort', 'verbose', 'tokenize'], len = keys.length; i < len; i++) {
	      key = keys[i]
	      this.options[key] = key in options ? options[key] : defaultOptions[key]
	    }
	    // Add all other options
	    for (i = 0, keys = ['searchFn', 'sortFn', 'keys', 'getFn', 'include'], len = keys.length; i < len; i++) {
	      key = keys[i]
	      this.options[key] = options[key] || defaultOptions[key]
	    }
	  }
	
	  Fuse.VERSION = '2.2.0'
	
	  /**
	   * Sets a new list for Fuse to match against.
	   * @param {Array} list
	   * @return {Array} The newly set list
	   * @public
	   */
	  Fuse.prototype.set = function (list) {
	    this.list = list
	    return list
	  }
	
	  Fuse.prototype.search = function (pattern) {
	    if (this.options.verbose) log('\nSearch term:', pattern, '\n')
	
	    this.pattern = pattern
	    this.results = []
	    this.resultMap = {}
	    this._keyMap = null
	
	    this._prepareSearchers()
	    this._startSearch()
	    this._computeScore()
	    this._sort()
	
	    var output = this._format()
	    return output
	  }
	
	  Fuse.prototype._prepareSearchers = function () {
	    var options = this.options
	    var pattern = this.pattern
	    var searchFn = options.searchFn
	    var tokens = pattern.split(MULTI_CHAR_REGEX)
	    var i = 0
	    var len = tokens.length
	
	    if (this.options.tokenize) {
	      this.tokenSearchers = []
	      for (; i < len; i++) {
	        this.tokenSearchers.push(new searchFn(tokens[i], options))
	      }
	    }
	    this.fullSeacher = new searchFn(pattern, options)
	  }
	
	  Fuse.prototype._startSearch = function () {
	    var options = this.options
	    var getFn = options.getFn
	    var list = this.list
	    var listLen = list.length
	    var keys = this.options.keys
	    var keysLen = keys.length
	    var key
	    var weight
	    var item = null
	    var i
	    var j
	
	    // Check the first item in the list, if it's a string, then we assume
	    // that every item in the list is also a string, and thus it's a flattened array.
	    if (typeof list[0] === 'string') {
	      // Iterate over every item
	      for (i = 0; i < listLen; i++) {
	        this._analyze('', list[i], i, i)
	      }
	    } else {
	      this._keyMap = {}
	      // Otherwise, the first item is an Object (hopefully), and thus the searching
	      // is done on the values of the keys of each item.
	      // Iterate over every item
	      for (i = 0; i < listLen; i++) {
	        item = list[i]
	        // Iterate over every key
	        for (j = 0; j < keysLen; j++) {
	          key = keys[j]
	          if (typeof key !== 'string') {
	            weight = (1 - key.weight) || 1
	            this._keyMap[key.name] = {
	              weight: weight
	            }
	            if (key.weight <= 0 || key.weight > 1) {
	              throw new Error('Key weight has to be > 0 and <= 1')
	            }
	            key = key.name
	          } else {
	            this._keyMap[key] = {
	              weight: 1
	            }
	          }
	          this._analyze(key, getFn(item, key, []), item, i)
	        }
	      }
	    }
	  }
	
	  Fuse.prototype._analyze = function (key, text, entity, index) {
	    var options = this.options
	    var words
	    var scores
	    var exists = false
	    var tokenSearchers
	    var tokenSearchersLen
	    var existingResult
	    var averageScore
	    var finalScore
	    var scoresLen
	    var mainSearchResult
	    var tokenSearcher
	    var termScores
	    var word
	    var tokenSearchResult
	    var i
	    var j
	
	    // Check if the text can be searched
	    if (text === undefined || text === null) {
	      return
	    }
	
	    scores = []
	
	    if (typeof text === 'string') {
	      words = text.split(MULTI_CHAR_REGEX)
	
	      if (options.verbose) log('---------\nKey:', key)
	      if (options.verbose) log('Record:', words)
	
	      if (this.options.tokenize) {
	        tokenSearchers = this.tokenSearchers
	        tokenSearchersLen = tokenSearchers.length
	
	        for (i = 0; i < this.tokenSearchers.length; i++) {
	          tokenSearcher = this.tokenSearchers[i]
	          termScores = []
	          for (j = 0; j < words.length; j++) {
	            word = words[j]
	            tokenSearchResult = tokenSearcher.search(word)
	            if (tokenSearchResult.isMatch) {
	              exists = true
	              termScores.push(tokenSearchResult.score)
	              scores.push(tokenSearchResult.score)
	            } else {
	              termScores.push(1)
	              scores.push(1)
	            }
	          }
	          if (options.verbose) log('Token scores:', termScores)
	        }
	
	        averageScore = scores[0]
	        scoresLen = scores.length
	        for (i = 1; i < scoresLen; i++) {
	          averageScore += scores[i]
	        }
	        averageScore = averageScore / scoresLen
	
	        if (options.verbose) log('Token score average:', averageScore)
	      }
	
	      // Get the result
	      mainSearchResult = this.fullSeacher.search(text)
	      if (options.verbose) log('Full text score:', mainSearchResult.score)
	
	      finalScore = mainSearchResult.score
	      if (averageScore !== undefined) {
	        finalScore = (finalScore + averageScore) / 2
	      }
	
	      if (options.verbose) log('Score average:', finalScore)
	
	      // If a match is found, add the item to <rawResults>, including its score
	      if (exists || mainSearchResult.isMatch) {
	        // Check if the item already exists in our results
	        existingResult = this.resultMap[index]
	
	        if (existingResult) {
	          // Use the lowest score
	          // existingResult.score, bitapResult.score
	          existingResult.output.push({
	            key: key,
	            score: finalScore,
	            matchedIndices: mainSearchResult.matchedIndices
	          })
	        } else {
	          // Add it to the raw result list
	          this.resultMap[index] = {
	            item: entity,
	            output: [{
	              key: key,
	              score: finalScore,
	              matchedIndices: mainSearchResult.matchedIndices
	            }]
	          }
	
	          this.results.push(this.resultMap[index])
	        }
	      }
	    } else if (isArray(text)) {
	      for (i = 0; i < text.length; i++) {
	        this._analyze(key, text[i], entity, index)
	      }
	    }
	  }
	
	  Fuse.prototype._computeScore = function () {
	    var i
	    var j
	    var keyMap = this._keyMap
	    var totalScore
	    var output
	    var scoreLen
	    var score
	    var weight
	    var results = this.results
	    var bestScore
	    var nScore
	
	    if (this.options.verbose) log('\n\nComputing score:\n')
	
	    for (i = 0; i < results.length; i++) {
	      totalScore = 0
	      output = results[i].output
	      scoreLen = output.length
	
	      bestScore = 1
	
	      for (j = 0; j < scoreLen; j++) {
	        score = output[j].score
	        weight = keyMap ? keyMap[output[j].key].weight : 1
	
	        nScore = score * weight
	
	        if (weight !== 1) {
	          bestScore = Math.min(bestScore, nScore)
	        } else {
	          totalScore += nScore
	          output[j].nScore = nScore
	        }
	      }
	
	      if (bestScore === 1) {
	        results[i].score = totalScore / scoreLen
	      } else {
	        results[i].score = bestScore
	      }
	
	      if (this.options.verbose) log(results[i])
	    }
	  }
	
	  Fuse.prototype._sort = function () {
	    var options = this.options
	    if (options.shouldSort) {
	      if (options.verbose) log('\n\nSorting....')
	      this.results.sort(options.sortFn)
	    }
	  }
	
	  Fuse.prototype._format = function () {
	    var options = this.options
	    var getFn = options.getFn
	    var finalOutput = []
	    var item
	    var i
	    var len
	    var results = this.results
	    var replaceValue
	    var getItemAtIndex
	    var include = options.include
	
	    if (options.verbose) log('\n\nOutput:\n\n', results)
	
	    // Helper function, here for speed-up, which replaces the item with its value,
	    // if the options specifies it,
	    replaceValue = options.id ? function (index) {
	      results[index].item = getFn(results[index].item, options.id, [])[0]
	    } : function () {}
	
	    getItemAtIndex = function (index) {
	      var record = results[index]
	      var data
	      var includeVal
	      var j
	      var output
	      var _item
	      var _result
	
	      // If `include` has values, put the item in the result
	      if (include.length > 0) {
	        data = {
	          item: record.item
	        }
	        if (include.indexOf('matches') !== -1) {
	          output = record.output
	          data.matches = []
	          for (j = 0; j < output.length; j++) {
	            _item = output[j]
	            _result = {
	              indices: _item.matchedIndices
	            }
	            if (_item.key) {
	              _result.key = _item.key
	            }
	            data.matches.push(_result)
	          }
	        }
	
	        if (include.indexOf('score') !== -1) {
	          data.score = results[index].score
	        }
	
	      } else {
	        data = record.item
	      }
	
	      return data
	    }
	
	    // From the results, push into a new array only the item identifier (if specified)
	    // of the entire item.  This is because we don't want to return the <results>,
	    // since it contains other metadata
	    for (i = 0, len = results.length; i < len; i++) {
	      replaceValue(i)
	      item = getItemAtIndex(i)
	      finalOutput.push(item)
	    }
	
	    return finalOutput
	  }
	
	  // Helpers
	
	  function deepValue (obj, path, list) {
	    var firstSegment
	    var remaining
	    var dotIndex
	    var value
	    var i
	    var len
	
	    if (!path) {
	      // If there's no path left, we've gotten to the object we care about.
	      list.push(obj)
	    } else {
	      dotIndex = path.indexOf('.')
	
	      if (dotIndex !== -1) {
	        firstSegment = path.slice(0, dotIndex)
	        remaining = path.slice(dotIndex + 1)
	      } else {
	        firstSegment = path
	      }
	
	      value = obj[firstSegment]
	      if (value !== null && value !== undefined) {
	        if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
	          list.push(value)
	        } else if (isArray(value)) {
	          // Search each item in the array.
	          for (i = 0, len = value.length; i < len; i++) {
	            deepValue(value[i], remaining, list)
	          }
	        } else if (remaining) {
	          // An object. Recurse further.
	          deepValue(value, remaining, list)
	        }
	      }
	    }
	
	    return list
	  }
	
	  function isArray (obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]'
	  }
	
	  /**
	   * Adapted from "Diff, Match and Patch", by Google
	   *
	   *   http://code.google.com/p/google-diff-match-patch/
	   *
	   * Modified by: Kirollos Risk <kirollos@gmail.com>
	   * -----------------------------------------------
	   * Details: the algorithm and structure was modified to allow the creation of
	   * <Searcher> instances with a <search> method which does the actual
	   * bitap search. The <pattern> (the string that is searched for) is only defined
	   * once per instance and thus it eliminates redundant re-creation when searching
	   * over a list of strings.
	   *
	   * Licensed under the Apache License, Version 2.0 (the "License")
	   * you may not use this file except in compliance with the License.
	   */
	  function BitapSearcher (pattern, options) {
	    options = options || {}
	    this.options = options
	    this.options.location = options.location || BitapSearcher.defaultOptions.location
	    this.options.distance = 'distance' in options ? options.distance : BitapSearcher.defaultOptions.distance
	    this.options.threshold = 'threshold' in options ? options.threshold : BitapSearcher.defaultOptions.threshold
	    this.options.maxPatternLength = options.maxPatternLength || BitapSearcher.defaultOptions.maxPatternLength
	
	    this.pattern = options.caseSensitive ? pattern : pattern.toLowerCase()
	    this.patternLen = pattern.length
	
	    if (this.patternLen <= this.options.maxPatternLength) {
	      this.matchmask = 1 << (this.patternLen - 1)
	      this.patternAlphabet = this._calculatePatternAlphabet()
	    }
	  }
	
	  BitapSearcher.defaultOptions = {
	    // Approximately where in the text is the pattern expected to be found?
	    location: 0,
	
	    // Determines how close the match must be to the fuzzy location (specified above).
	    // An exact letter match which is 'distance' characters away from the fuzzy location
	    // would score as a complete mismatch. A distance of '0' requires the match be at
	    // the exact location specified, a threshold of '1000' would require a perfect match
	    // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
	    distance: 100,
	
	    // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
	    // (of both letters and location), a threshold of '1.0' would match anything.
	    threshold: 0.6,
	
	    // Machine word size
	    maxPatternLength: 32
	  }
	
	  /**
	   * Initialize the alphabet for the Bitap algorithm.
	   * @return {Object} Hash of character locations.
	   * @private
	   */
	  BitapSearcher.prototype._calculatePatternAlphabet = function () {
	    var mask = {},
	      i = 0
	
	    for (i = 0; i < this.patternLen; i++) {
	      mask[this.pattern.charAt(i)] = 0
	    }
	
	    for (i = 0; i < this.patternLen; i++) {
	      mask[this.pattern.charAt(i)] |= 1 << (this.pattern.length - i - 1)
	    }
	
	    return mask
	  }
	
	  /**
	   * Compute and return the score for a match with `e` errors and `x` location.
	   * @param {number} errors Number of errors in match.
	   * @param {number} location Location of match.
	   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
	   * @private
	   */
	  BitapSearcher.prototype._bitapScore = function (errors, location) {
	    var accuracy = errors / this.patternLen,
	      proximity = Math.abs(this.options.location - location)
	
	    if (!this.options.distance) {
	      // Dodge divide by zero error.
	      return proximity ? 1.0 : accuracy
	    }
	    return accuracy + (proximity / this.options.distance)
	  }
	
	  /**
	   * Compute and return the result of the search
	   * @param {String} text The text to search in
	   * @return {Object} Literal containing:
	   *                          {Boolean} isMatch Whether the text is a match or not
	   *                          {Decimal} score Overall score for the match
	   * @public
	   */
	  BitapSearcher.prototype.search = function (text) {
	    var options = this.options
	    var i
	    var j
	    var textLen
	    var location
	    var threshold
	    var bestLoc
	    var binMin
	    var binMid
	    var binMax
	    var start, finish
	    var bitArr
	    var lastBitArr
	    var charMatch
	    var score
	    var locations
	    var matches
	    var isMatched
	    var matchMask
	    var matchedIndices
	    var matchesLen
	    var match
	
	    text = options.caseSensitive ? text : text.toLowerCase()
	
	    if (this.pattern === text) {
	      // Exact match
	      return {
	        isMatch: true,
	        score: 0,
	        matchedIndices: [[0, text.length - 1]]
	      }
	    }
	
	    // When pattern length is greater than the machine word length, just do a a regex comparison
	    if (this.patternLen > options.maxPatternLength) {
	      matches = text.match(new RegExp(this.pattern.replace(MULTI_CHAR_REGEX, '|')))
	      isMatched = !!matches
	
	      if (isMatched) {
	        matchedIndices = []
	        for (i = 0, matchesLen = matches.length; i < matchesLen; i++) {
	          match = matches[i]
	          matchedIndices.push([text.indexOf(match), match.length - 1])
	        }
	      }
	
	      return {
	        isMatch: isMatched,
	        // TODO: revisit this score
	        score: isMatched ? 0.5 : 1,
	        matchedIndices: matchedIndices
	      }
	    }
	
	    location = options.location
	    // Set starting location at beginning text and initialize the alphabet.
	    textLen = text.length
	    // Highest score beyond which we give up.
	    threshold = options.threshold
	    // Is there a nearby exact match? (speedup)
	    bestLoc = text.indexOf(this.pattern, location)
	
	    // a mask of the matches
	    matchMask = []
	    for (i = 0; i < textLen; i++) {
	      matchMask[i] = 0
	    }
	
	    if (bestLoc != -1) {
	      threshold = Math.min(this._bitapScore(0, bestLoc), threshold)
	      // What about in the other direction? (speed up)
	      bestLoc = text.lastIndexOf(this.pattern, location + this.patternLen)
	
	      if (bestLoc != -1) {
	        threshold = Math.min(this._bitapScore(0, bestLoc), threshold)
	      }
	    }
	
	    bestLoc = -1
	    score = 1
	    locations = []
	    binMax = this.patternLen + textLen
	
	    for (i = 0; i < this.patternLen; i++) {
	      // Scan for the best match; each iteration allows for one more error.
	      // Run a binary search to determine how far from the match location we can stray
	      // at this error level.
	      binMin = 0
	      binMid = binMax
	      while (binMin < binMid) {
	        if (this._bitapScore(i, location + binMid) <= threshold) {
	          binMin = binMid
	        } else {
	          binMax = binMid
	        }
	        binMid = Math.floor((binMax - binMin) / 2 + binMin)
	      }
	
	      // Use the result from this iteration as the maximum for the next.
	      binMax = binMid
	      start = Math.max(1, location - binMid + 1)
	      finish = Math.min(location + binMid, textLen) + this.patternLen
	
	      // Initialize the bit array
	      bitArr = Array(finish + 2)
	
	      bitArr[finish + 1] = (1 << i) - 1
	
	      for (j = finish; j >= start; j--) {
	        charMatch = this.patternAlphabet[text.charAt(j - 1)]
	
	        if (charMatch) {
	          matchMask[j - 1] = 1
	        }
	
	        if (i === 0) {
	          // First pass: exact match.
	          bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch
	        } else {
	          // Subsequent passes: fuzzy match.
	          bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch | (((lastBitArr[j + 1] | lastBitArr[j]) << 1) | 1) | lastBitArr[j + 1]
	        }
	        if (bitArr[j] & this.matchmask) {
	          score = this._bitapScore(i, j - 1)
	
	          // This match will almost certainly be better than any existing match.
	          // But check anyway.
	          if (score <= threshold) {
	            // Indeed it is
	            threshold = score
	            bestLoc = j - 1
	            locations.push(bestLoc)
	
	            if (bestLoc > location) {
	              // When passing loc, don't exceed our current distance from loc.
	              start = Math.max(1, 2 * location - bestLoc)
	            } else {
	              // Already passed loc, downhill from here on in.
	              break
	            }
	          }
	        }
	      }
	
	      // No hope for a (better) match at greater error levels.
	      if (this._bitapScore(i + 1, location) > threshold) {
	        break
	      }
	      lastBitArr = bitArr
	    }
	
	    matchedIndices = this._getMatchedIndices(matchMask)
	
	    // Count exact matches (those with a score of 0) to be "almost" exact
	    return {
	      isMatch: bestLoc >= 0,
	      score: score === 0 ? 0.001 : score,
	      matchedIndices: matchedIndices
	    }
	  }
	
	  BitapSearcher.prototype._getMatchedIndices = function (matchMask) {
	    var matchedIndices = []
	    var start = -1
	    var end = -1
	    var i = 0
	    var match
	    var len = len = matchMask.length
	    for (; i < len; i++) {
	      match = matchMask[i]
	      if (match && start === -1) {
	        start = i
	      } else if (!match && start !== -1) {
	        end = i - 1
	        matchedIndices.push([start, end])
	        start = -1
	      }
	    }
	    if (matchMask[i - 1]) {
	      matchedIndices.push([start, i - 1])
	    }
	    return matchedIndices
	  }
	
	  // Export to Common JS Loader
	  if (true) {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = Fuse
	  } else if (typeof define === 'function' && define.amd) {
	    // AMD. Register as an anonymous module.
	    define(function () {
	      return Fuse
	    })
	  } else {
	    // Browser globals (root is window)
	    global.Fuse = Fuse
	  }
	
	})(this)


/***/ },
/* 189 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"ui overlay\" transition=\"fade\" @click.self=\"close\" _v-7a68841e=\"\">\n    <div class=\"ui panel\" _v-7a68841e=\"\">\n      <h2 _v-7a68841e=\"\">Let's find some friends!</h2>\n      <form class=\"ui form\" @submit.prevent=\"\" _v-7a68841e=\"\">\n        <div class=\"ui field\" _v-7a68841e=\"\">\n          <dropdown style=\"width: 8em\" v-ref:filter=\"\" _v-7a68841e=\"\">\n            <li value=\"all\" _v-7a68841e=\"\">All</li>\n            <li value=\"friend\" _v-7a68841e=\"\">Friends</li>\n            <li value=\"bookmark\" _v-7a68841e=\"\">Bookmarks</li>\n            <li value=\"looking\" _v-7a68841e=\"\">Looking</li>\n          </dropdown>\n        </div>\n        <div class=\"ui field\" _v-7a68841e=\"\">\n          <ul class=\"ui selection\" style=\"\" _v-7a68841e=\"\">\n            <li v-for=\"char in slicedCharacters\" :class=\"getListClass(char)\" :data-activate-character=\"char.name\" _v-7a68841e=\"\">\n              <i class=\"fa fa-heart ui pull-right\" v-if=\"characterIs(char, 'friend')\" _v-7a68841e=\"\"></i>\n              <i class=\"fa fa-star ui pull-right\" v-if=\"characterIs(char, 'bookmark')\" _v-7a68841e=\"\"></i>\n              <i class=\"fa fa-paw ui pull-right\" v-if=\"characterIs(char, 'looking')\" _v-7a68841e=\"\"></i>\n              <character :character=\"char\" _v-7a68841e=\"\"></character>\n            </li>\n            <center class=\"ui small subtle\" style=\"padding: 0.5em\" v-if=\"slicedCharacters.length === 200\" _v-7a68841e=\"\">\n              <em _v-7a68841e=\"\">List truncated for performance. Search for more results.</em>\n            </center>\n          </ul>\n        </div>\n        <div class=\"ui field text-input icon right\" _v-7a68841e=\"\">\n          <i class=\"fa fa-search\" _v-7a68841e=\"\"></i>\n          <input type=\"text\" placeholder=\"Search...\" v-model=\"search\" debounce=\"500\" _v-7a68841e=\"\">\n        </div>\n        <div class=\"ui field\" _v-7a68841e=\"\">\n          <button class=\"ui button\" @click=\"close\" _v-7a68841e=\"\">Done</button>\n        </div>\n      </form>\n    </div>\n  </div>\n";

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stringify = __webpack_require__(87);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _classCallCheck2 = __webpack_require__(84);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(85);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _types = __webpack_require__(110);
	
	var _util = __webpack_require__(191);
	
	var _events = __webpack_require__(111);
	
	var events = _interopRequireWildcard(_events);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var urls = {
	  mainInsecure: 'ws://chat.f-list.net:9722',
	  main: 'wss://chat.f-list.net:9799',
	  testInsecure: 'ws://chat.f-list.net:8722',
	  test: 'ws://chat.f-list.net:8799'
	};
	
	var Socket = function () {
	  function Socket() {
	    (0, _classCallCheck3.default)(this, Socket);
	  }
	
	  (0, _createClass3.default)(Socket, [{
	    key: 'setRootVM',
	    value: function setRootVM(vm) {
	      this.vm = vm;
	    }
	  }, {
	    key: 'connect',
	    value: function connect(urlID) {
	      var _this = this;
	
	      if (this.ws) {
	        this.ws.onClose = function () {};
	        this.ws.close();
	      }
	
	      this.ws = new window.WebSocket(urls[urlID]);
	
	      this.ws.onopen = function () {
	        _this.sendIdentifyRequest();
	      };
	
	      this.ws.onclose = function () {
	        var err = 'Lost connection to server. :(';
	        _this.vm.$emit(events.SocketError, err);
	      };
	
	      this.ws.onerror = function (err) {
	        _this.vm.$emit(events.SocketError, err);
	      };
	
	      this.ws.onmessage = function (_ref) {
	        var data = _ref.data;
	
	        var _parseServerCommand = _this.parseServerCommand(data);
	
	        var command = _parseServerCommand.command;
	        var params = _parseServerCommand.params;
	
	        _this.handleChatCommand(command, params);
	      };
	    }
	  }, {
	    key: 'sendIdentifyRequest',
	    value: function sendIdentifyRequest() {
	      var state = this.vm.state;
	
	      var params = {
	        account: state.getAccount(),
	        ticket: state.getTicket(),
	        character: state.getUserCharacterName(),
	        method: 'ticket',
	        cname: 'fchat-next',
	        cversion: '0.1.0'
	      };
	
	      this.send('IDN', params);
	    }
	  }, {
	    key: 'parseServerCommand',
	    value: function parseServerCommand(payload) {
	      var command = payload.substring(0, 3);
	      var params = payload.length > 3 ? JSON.parse(payload.substring(4)) : {};
	      return { command: command, params: params };
	    }
	  }, {
	    key: 'handleChatCommand',
	    value: function handleChatCommand(command, params) {
	      var state = this.vm.state;
	
	
	      switch (command) {
	        // identify with server
	        case 'IDN':
	          this.vm.$emit(events.SocketIdentifySuccess);
	          break;
	
	        /* ping~! */
	        case 'PIN':
	          /* pong~! */
	          this.send('PIN');
	          break;
	
	        // receiving server variables
	        case 'VAR':
	          state.setServerVariable(params.variable, params.value);
	          break;
	
	        // hello :)
	        case 'HLO':
	          console.info(params.message);
	          break;
	
	        // receive # of characters online
	        case 'CON':
	          console.info('There are ' + params.count + ' characters online.');
	          break;
	
	        // receiving list of friends
	        // we can ignore this, since we already got that from the login data
	        case 'FRL':
	          break;
	
	        // receiving ignore list action
	        case 'IGN':
	          switch (params.action) {
	            case 'init':
	              state.setIgnoreList(params.characters);
	              break;
	
	            default:
	              console.warn('Unknown ignore list action ' + params.action);
	          }
	          break;
	
	        // receiving list of admins
	        case 'ADL':
	          state.setAdminList(params.ops);
	          break;
	
	        // receiving all characters online
	        // comes in multiple batches
	        case 'LIS':
	          state.hashCharacters(params.characters);
	          break;
	
	        // character came online
	        case 'NLN':
	          state.addCharacter(params.identity, params.gender);
	          break;
	
	        // character went offline
	        case 'FLN':
	          state.removeCharacter(params.character);
	          break;
	
	        // character changed status
	        case 'STA':
	          var character = params.character;
	          var status = params.status;
	          var statusmsg = params.statusmsg;
	
	          state.setCharacterStatus(character, status, statusmsg);
	          break;
	
	        // received list of public channels
	        case 'CHA':
	          {
	            var toChannelInfo = function toChannelInfo(_ref2) {
	              var name = _ref2.name;
	              var characters = _ref2.characters;
	              return (0, _types.ChannelInfo)(_types.ChannelType.public, name, name, characters);
	            };
	            var list = params.channels.map(toChannelInfo);
	            state.setPublicChannelList(list);
	            this.vm.$emit(events.SocketChannelListReceived, _types.ChannelType.public);
	            break;
	          }
	
	        // received list of private channels
	        case 'ORS':
	          {
	            var _toChannelInfo = function _toChannelInfo(_ref3) {
	              var name = _ref3.name;
	              var title = _ref3.title;
	              var characters = _ref3.characters;
	              return (0, _types.ChannelInfo)(_types.ChannelType.private, name, title, characters);
	            };
	            var _list = params.channels.map(_toChannelInfo);
	            state.setPrivateChannelList(_list);
	            this.vm.$emit(events.SocketChannelListReceived, _types.ChannelType.private);
	            break;
	          }
	
	        // receiving initial channel information
	        case 'ICH':
	          var namelist = params.users.map(function (_ref4) {
	            var identity = _ref4.identity;
	            return identity;
	          });
	          state.setChannelCharacters(params.channel, namelist);
	          state.setChannelMode(params.channel, _types.ChannelMode[params.mode]);
	          break;
	
	        // receiving a channel description
	        case 'CDS':
	          state.setChannelDescription(params.channel, params.description);
	          break;
	
	        // user joined a channel (could be us)
	        case 'JCH':
	          {
	            var identity = params.character.identity;
	
	            state.addChannelCharacter(params.channel, identity);
	            if (identity === state.getUserCharacterName()) {
	              state.setChannelStatus(params.channel, _types.ChannelStatus.joined);
	              this.vm.$emit(events.SocketChannelJoined, params.channel);
	            }
	            break;
	          }
	
	        // user left a channel (could be us)
	        case 'LCH':
	          state.removeChannelCharacter(params.channel, params.character);
	          if (params.character === state.getUserCharacterName()) {
	            state.setChannelStatus(params.channel, _types.ChannelStatus.left);
	            this.vm.$emit(events.SocketChannelLeft, params.channel);
	          }
	          break;
	
	        // channel message
	        case 'MSG':
	          state.addChannelMessage(params.channel, params.character, params.message);
	          this.vm.$emit(events.ChannelMessageReceived, params.channel, params.character, params.message);
	          break;
	
	        // private message
	        case 'PRI':
	          state.addPrivateMessage(params.character, params.character, params.message);
	          this.vm.$emit(events.PrivateMessageReceived, params.character, params.character, params.message);
	          break;
	
	        default:
	          console.warn('Unknown command ' + command + ' with params:\n', (0, _util.inspect)(params, { depth: null }));
	      }
	    }
	  }, {
	    key: 'send',
	    value: function send(command, params) {
	      if (params) {
	        this.ws.send(command + ' ' + (0, _stringify2.default)(params));
	        console.log('Sent command', command, (0, _util.inspect)(params));
	      } else {
	        this.ws.send(command);
	        console.log('Sent command', command);
	      }
	    }
	  }, {
	    key: 'fetchChannelList',
	    value: function fetchChannelList() {
	      this.send('CHA');
	      this.send('ORS');
	    }
	  }, {
	    key: 'joinChannel',
	    value: function joinChannel(id) {
	      this.send('JCH', { channel: id });
	      this.vm.state.setChannelStatus(id, _types.ChannelStatus.joining);
	    }
	  }, {
	    key: 'leaveChannel',
	    value: function leaveChannel(id) {
	      this.send('LCH', { channel: id });
	      this.vm.state.setChannelStatus(id, _types.ChannelStatus.leaving);
	    }
	  }, {
	    key: 'sendChannelMessage',
	    value: function sendChannelMessage(channel, message) {
	      this.send('MSG', { channel: channel, message: message });
	      this.vm.state.addChannelMessage(channel, this.vm.state.getUserCharacterName(), message);
	    }
	  }, {
	    key: 'sendPrivateMessage',
	    value: function sendPrivateMessage(recipient, message) {
	      this.send('PRI', { recipient: recipient, message: message });
	      this.vm.state.addPrivateMessage(recipient, this.vm.state.getUserCharacterName(), message);
	    }
	  }, {
	    key: 'disconnect',
	    value: function disconnect() {
	      this.ws.onclose = function () {};
	      this.ws.close();
	      this.ws = undefined;
	    }
	  }, {
	    key: 'isConnected',
	    value: function isConnected() {
	      return this.ws != null;
	    }
	  }]);
	  return Socket;
	}();
	
	exports.default = new Socket();

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(192);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(193);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ },
/* 192 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 193 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 194 */
/***/ function(module, exports) {

	module.exports = "\r\n  <div @click='checkDataAttribute($event)'>\r\n    <chat v-ref:chat></chat>\r\n    <component v-for=\"overlay in overlays\" :is='overlay' :active-character='activeCharacter'></component>\r\n  </div>\r\n";

/***/ },
/* 195 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = parseBBC;
	var regexp = /\[(\w+?)=?([^\]]*)\]([\s\S]+?)\[\/\1\]|(https?:\/\/[^\[\]\(\)\s]+)/gi;
	
	function parseBBC(input) {
	  return input.replace(regexp, function (match, tag, param, content, url) {
	    if (url) {
	      param = content = url;
	      tag = 'url';
	    } else if (tag === 'noparse') {
	      return content;
	    } else if (tag !== 'url' && regexp.test(content)) {
	      content = parseBBC(content);
	    }
	
	    switch (tag) {
	      case 'i':
	        return '<em>' + content + '</em>';
	      case 'b':
	        return '<strong>' + content + '</strong>';
	      case 'u':
	        return '<u>' + content + '</u>';
	      case 's':
	        return '<del>' + content + '</del>';
	      case 'sup':
	        return '<sup>' + content + '</sup>';
	      case 'sub':
	        return '<small>' + content + '</small>';
	
	      case 'color':
	        return '<span class="chat-color ' + param + '">' + content + '</span>';
	
	      case 'url':
	        {
	          if (param) {
	            return '<a class="ui link" href="' + param + '" target="_blank">' + content + '</a>';
	          } else {
	            return '<a class="ui link" href="' + content + '" target="_blank">' + content + '</a>';
	          }
	        }
	
	      default:
	        return match;
	    }
	  });
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map