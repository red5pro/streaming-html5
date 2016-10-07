/*!
 * 
 *   red5pro-html-sdk-testbed - Testbed examples for Red5 Pro HTML SDK
 *   Version: 1.0.0
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ReactDOM"), require("ReactRedux"), require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["ReactDOM", "ReactRedux", "React"], factory);
	else if(typeof exports === 'object')
		exports["red5protestbed"] = factory(require("ReactDOM"), require("ReactRedux"), require("React"));
	else
		root["red5protestbed"] = factory(root["ReactDOM"], root["ReactRedux"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_28__) {
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(48);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	
	var _reactDom = __webpack_require__(2);
	
	var _redux = __webpack_require__(3);
	
	var _reactRedux = __webpack_require__(18);
	
	var _reducers = __webpack_require__(19);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	var _AppContainer = __webpack_require__(23);
	
	var _AppContainer2 = _interopRequireDefault(_AppContainer);
	
	var _testbed = __webpack_require__(47);
	
	var _testbed2 = _interopRequireDefault(_testbed);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var store = (0, _redux.createStore)(_reducers2.default, _extends({}, _testbed2.default, {
	  viewFilter: 'Home'
	}));
	
	console.log('[index]:\r\n' + JSON.stringify(store.getState(), null, 2));
	
	(0, _reactDom.render)(React.createElement(
	  _reactRedux.Provider,
	  { store: store },
	  React.createElement(_AppContainer2.default, null)
	), document.getElementById('app'));

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;
	
	var _createStore = __webpack_require__(5);
	
	var _createStore2 = _interopRequireDefault(_createStore);
	
	var _combineReducers = __webpack_require__(13);
	
	var _combineReducers2 = _interopRequireDefault(_combineReducers);
	
	var _bindActionCreators = __webpack_require__(15);
	
	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);
	
	var _applyMiddleware = __webpack_require__(16);
	
	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);
	
	var _compose = __webpack_require__(17);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	var _warning = __webpack_require__(14);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}
	
	if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}
	
	exports.createStore = _createStore2['default'];
	exports.combineReducers = _combineReducers2['default'];
	exports.bindActionCreators = _bindActionCreators2['default'];
	exports.applyMiddleware = _applyMiddleware2['default'];
	exports.compose = _compose2['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

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
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports['default'] = createStore;
	
	var _isPlainObject = __webpack_require__(6);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _symbolObservable = __webpack_require__(10);
	
	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};
	
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [preloadedState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;
	
	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }
	
	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }
	
	    return enhancer(createStore)(reducer, preloadedState);
	  }
	
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }
	
	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;
	
	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }
	
	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }
	
	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }
	
	    var isSubscribed = true;
	
	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);
	
	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }
	
	      isSubscribed = false;
	
	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }
	
	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2['default'])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }
	
	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }
	
	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }
	
	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }
	
	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }
	
	    return action;
	  }
	
	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }
	
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }
	
	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;
	
	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }
	
	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }
	
	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2['default']] = function () {
	      return this;
	    }, _ref;
	  }
	
	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });
	
	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(7),
	    isObjectLike = __webpack_require__(9);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || objectToString.call(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}
	
	module.exports = isPlainObject;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(8);
	
	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);
	
	module.exports = getPrototype;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ponyfill = __webpack_require__(12);
	
	var _ponyfill2 = _interopRequireDefault(_ponyfill);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var root = undefined; /* global window */
	
	if (typeof global !== 'undefined') {
		root = global;
	} else if (typeof window !== 'undefined') {
		root = window;
	}
	
	var result = (0, _ponyfill2['default'])(root);
	exports['default'] = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports['default'] = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;
	
		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}
	
		return result;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports['default'] = combineReducers;
	
	var _createStore = __webpack_require__(5);
	
	var _isPlainObject = __webpack_require__(6);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _warning = __webpack_require__(14);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
	
	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}
	
	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
	
	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }
	
	  if (!(0, _isPlainObject2['default'])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }
	
	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
	  });
	
	  unexpectedKeys.forEach(function (key) {
	    unexpectedKeyCache[key] = true;
	  });
	
	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}
	
	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });
	
	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }
	
	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}
	
	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	
	    if (process.env.NODE_ENV !== 'production') {
	      if (typeof reducers[key] === 'undefined') {
	        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
	      }
	    }
	
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);
	
	  if (process.env.NODE_ENV !== 'production') {
	    var unexpectedKeyCache = {};
	  }
	
	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }
	
	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];
	
	    if (sanityError) {
	      throw sanityError;
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
	      if (warningMessage) {
	        (0, _warning2['default'])(warningMessage);
	      }
	    }
	
	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}
	
	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }
	
	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }
	
	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = applyMiddleware;
	
	var _compose = __webpack_require__(17);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }
	
	  return function (createStore) {
	    return function (reducer, preloadedState, enhancer) {
	      var store = createStore(reducer, preloadedState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];
	
	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);
	
	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */
	
	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }
	
	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }
	
	  if (funcs.length === 1) {
	    return funcs[0];
	  }
	
	  var last = funcs[funcs.length - 1];
	  var rest = funcs.slice(0, -1);
	  return function () {
	    return rest.reduceRight(function (composed, f) {
	      return f(composed);
	    }, last.apply(undefined, arguments));
	  };
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(3);
	
	var _settings = __webpack_require__(20);
	
	var _viewFilter = __webpack_require__(22);
	
	var testbedApp = (0, _redux.combineReducers)({
	  settings: _settings.settings,
	  tests: _settings.tests,
	  viewFilter: _viewFilter.viewFilter
	});
	
	exports.default = testbedApp;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.tests = exports.settings = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _actions = __webpack_require__(21);
	
	var settings = exports.settings = function settings() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _actions.SETTINGS_UPDATE:
	      {
	        console.log('change setting: ' + action.key + ', to: ' + action.value);
	        var settingsUpdate = state;
	        settingsUpdate[action.key] = action.value;
	        return _extends({}, settingsUpdate);
	      }
	    default:
	      return state;
	  }
	};
	
	var tests = exports.tests = function tests() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    default:
	      return state;
	  }
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SETTINGS_UPDATE = exports.SETTINGS_UPDATE = 'SETTINGS_UPDATE';
	var VIEW_CHANGE = exports.VIEW_CHANGE = 'VIEW_CHANGE';
	
	var changeSetting = exports.changeSetting = function changeSetting(key, value) {
	  return {
	    type: SETTINGS_UPDATE,
	    key: key,
	    value: value
	  };
	};
	
	var changeView = exports.changeView = function changeView(name) {
	  return {
	    type: VIEW_CHANGE,
	    filter: name
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.viewFilter = undefined;
	
	var _actions = __webpack_require__(21);
	
	var viewFilter = exports.viewFilter = function viewFilter() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? 'Home' : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _actions.VIEW_CHANGE:
	      return action.filter;
	    default:
	      return state;
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(18);
	
	var _selectors = __webpack_require__(24);
	
	var _App = __webpack_require__(46);
	
	var _App2 = _interopRequireDefault(_App);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    page: (0, _selectors.getCurrentPage)(state),
	    state: state
	  };
	};
	
	var AppContainer = (0, _reactRedux.connect)(mapStateToProps)(_App2.default);
	
	exports.default = AppContainer;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCurrentPage = undefined;
	
	var _reselect = __webpack_require__(25);
	
	var _TestListContainer = __webpack_require__(26);
	
	var _TestListContainer2 = _interopRequireDefault(_TestListContainer);
	
	var _SettingsFormContainer = __webpack_require__(30);
	
	var _SettingsFormContainer2 = _interopRequireDefault(_SettingsFormContainer);
	
	var _TestContainer = __webpack_require__(33);
	
	var _TestContainer2 = _interopRequireDefault(_TestContainer);
	
	var _test = __webpack_require__(34);
	
	var tests = _interopRequireWildcard(_test);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// eslint-disable-line no-unused-vars
	
	// Because we cannot dynamically import modules from strings, we need to,
	// unfortunately, import them specifically here and define their associated
	// filter clause.
	
	var getViewFilter = function getViewFilter(state) {
	  return state.viewFilter;
	}; // eslint-disable-line no-unused-vars
	var getCurrentPage = exports.getCurrentPage = (0, _reselect.createSelector)([getViewFilter], function (viewFilter) {
	  switch (viewFilter.toLowerCase()) {
	    case 'publish':
	      return (0, _TestContainer2.default)(tests.PublisherTest);
	    case 'subscribe':
	      return (0, _TestContainer2.default)(tests.SubscriberTest);
	    case 'publish - 1080p':
	      return (0, _TestContainer2.default)(tests.Publisher1080pTest);
	    case 'publish - failover':
	      return (0, _TestContainer2.default)(tests.PublisherFailoverTest);
	    case 'subscribe - failover':
	      return (0, _TestContainer2.default)(tests.SubscriberFailoverTest);
	    case 'publish - audio mode':
	      return (0, _TestContainer2.default)(tests.PublisherAudioOnlyTest);
	    case 'publish - camera source':
	      return (0, _TestContainer2.default)(tests.PublisherCameraSourceTest);
	    case 'publish - camera swap':
	      return (0, _TestContainer2.default)(tests.PublisherCameraSwapTest);
	    case 'publish - filters':
	      return (0, _TestContainer2.default)(tests.PublisherFiltersTest);
	    case 'publish - image capture':
	      return (0, _TestContainer2.default)(tests.PublisherImageCaptureTest);
	    case 'publish - stream manager':
	      return (0, _TestContainer2.default)(tests.PublisherStreamManagerTest);
	    case 'settings':
	    case 'home':
	      return React.createElement(_SettingsFormContainer2.default, null);
	    default:
	      return React.createElement(_TestListContainer2.default, null);
	  }
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.defaultMemoize = defaultMemoize;
	exports.createSelectorCreator = createSelectorCreator;
	exports.createStructuredSelector = createStructuredSelector;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function defaultEqualityCheck(a, b) {
	  return a === b;
	}
	
	function defaultMemoize(func) {
	  var equalityCheck = arguments.length <= 1 || arguments[1] === undefined ? defaultEqualityCheck : arguments[1];
	
	  var lastArgs = null;
	  var lastResult = null;
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    if (lastArgs === null || lastArgs.length !== args.length || !args.every(function (value, index) {
	      return equalityCheck(value, lastArgs[index]);
	    })) {
	      lastResult = func.apply(undefined, args);
	    }
	    lastArgs = args;
	    return lastResult;
	  };
	}
	
	function getDependencies(funcs) {
	  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;
	
	  if (!dependencies.every(function (dep) {
	    return typeof dep === 'function';
	  })) {
	    var dependencyTypes = dependencies.map(function (dep) {
	      return typeof dep;
	    }).join(', ');
	    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
	  }
	
	  return dependencies;
	}
	
	function createSelectorCreator(memoize) {
	  for (var _len2 = arguments.length, memoizeOptions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    memoizeOptions[_key2 - 1] = arguments[_key2];
	  }
	
	  return function () {
	    for (var _len3 = arguments.length, funcs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      funcs[_key3] = arguments[_key3];
	    }
	
	    var recomputations = 0;
	    var resultFunc = funcs.pop();
	    var dependencies = getDependencies(funcs);
	
	    var memoizedResultFunc = memoize.apply(undefined, [function () {
	      recomputations++;
	      return resultFunc.apply(undefined, arguments);
	    }].concat(memoizeOptions));
	
	    var selector = function selector(state, props) {
	      for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
	        args[_key4 - 2] = arguments[_key4];
	      }
	
	      var params = dependencies.map(function (dependency) {
	        return dependency.apply(undefined, [state, props].concat(args));
	      });
	      return memoizedResultFunc.apply(undefined, _toConsumableArray(params));
	    };
	
	    selector.resultFunc = resultFunc;
	    selector.recomputations = function () {
	      return recomputations;
	    };
	    selector.resetRecomputations = function () {
	      return recomputations = 0;
	    };
	    return selector;
	  };
	}
	
	var createSelector = exports.createSelector = createSelectorCreator(defaultMemoize);
	
	function createStructuredSelector(selectors) {
	  var selectorCreator = arguments.length <= 1 || arguments[1] === undefined ? createSelector : arguments[1];
	
	  if (typeof selectors !== 'object') {
	    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
	  }
	  var objectKeys = Object.keys(selectors);
	  return selectorCreator(objectKeys.map(function (key) {
	    return selectors[key];
	  }), function () {
	    for (var _len5 = arguments.length, values = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	      values[_key5] = arguments[_key5];
	    }
	
	    return values.reduce(function (composition, value, index) {
	      composition[objectKeys[index]] = value;
	      return composition;
	    }, {});
	  });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(18);
	
	var _actions = __webpack_require__(21);
	
	var _TestList = __webpack_require__(27);
	
	var _TestList2 = _interopRequireDefault(_TestList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    tests: state.tests
	  };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onTestListItemClick: function onTestListItemClick(name) {
	      dispatch((0, _actions.changeView)(name));
	    }
	  };
	};
	
	var TestListContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_TestList2.default);
	
	exports.default = TestListContainer;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(28);
	
	var _TestListItem = __webpack_require__(29);
	
	var _TestListItem2 = _interopRequireDefault(_TestListItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// eslint-disable-line no-unused-vars
	
	var TestList = function TestList(_ref) {
	  var tests = _ref.tests;
	  var onTestListItemClick = _ref.onTestListItemClick;
	  return React.createElement(
	    'ul',
	    { id: 'test-list' },
	    tests.map(function (test) {
	      return React.createElement(_TestListItem2.default, _extends({
	        key: test.name
	      }, test, {
	        onClick: function onClick() {
	          return onTestListItemClick(test.name);
	        }
	      }));
	    })
	  );
	};
	
	TestList.propTypes = {
	  tests: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	    name: _react.PropTypes.string.isRequired,
	    module: _react.PropTypes.string.isRequired,
	    description: _react.PropTypes.string
	  }).isRequired).isRequired,
	  onTestListItemClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = TestList;

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_28__;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(28);
	
	var TestListItem = function TestListItem(_ref) {
	  var onClick = _ref.onClick;
	  var name = _ref.name;
	  return React.createElement(
	    'li',
	    { onClick: onClick },
	    name
	  );
	};
	
	TestListItem.propTypes = {
	  onClick: _react.PropTypes.func.isRequired,
	  name: _react.PropTypes.string.isRequired
	};
	
	exports.default = TestListItem;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(18);
	
	var _actions = __webpack_require__(21);
	
	var _SettingsForm = __webpack_require__(31);
	
	var _SettingsForm2 = _interopRequireDefault(_SettingsForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    settings: state.settings
	  };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onBackClick: function onBackClick() {
	      dispatch((0, _actions.changeView)('list'));
	    },
	    onFieldChange: function onFieldChange(key, value) {
	      dispatch((0, _actions.changeSetting)(key, value));
	    }
	  };
	};
	
	var SettingsFormContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_SettingsForm2.default);
	
	exports.default = SettingsFormContainer;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(28);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(32);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// eslint-disable-line no-unused-vars
	
	var SettingsForm = function (_React$Component) {
	  _inherits(SettingsForm, _React$Component);
	
	  function SettingsForm() {
	    _classCallCheck(this, SettingsForm);
	
	    return _possibleConstructorReturn(this, (SettingsForm.__proto__ || Object.getPrototypeOf(SettingsForm)).apply(this, arguments));
	  }
	
	  _createClass(SettingsForm, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var settings = this.props.settings;
	      for (var key in settings) {
	        var _ref = this['_' + key];
	        if (_ref && settings[key] !== _ref.value) {
	          this.props.onFieldChange(key, _ref.value);
	        }
	      }
	    }
	  }, {
	    key: 'swapStreamNames',
	    value: function swapStreamNames() {
	      var value1 = this._stream1.value;
	      var value2 = this._stream2.value;
	      this._stream1.value = value2;
	      this._stream2.value = value1;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Settings'
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'settings-field' },
	          _react2.default.createElement(
	            'label',
	            { className: 'settings-label', 'for': 'host-field' },
	            'Host:'
	          ),
	          _react2.default.createElement('input', { ref: function ref(c) {
	              return _this2._host = c;
	            }, name: 'host-field', defaultValue: this.props.settings.host })
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'settings-field' },
	          _react2.default.createElement(
	            'label',
	            { className: 'settings-label', 'for': 'stream1-field' },
	            'Stream1 Name:'
	          ),
	          _react2.default.createElement('input', { ref: function ref(c) {
	              return _this2._stream1 = c;
	            }, name: 'stream1-field', defaultValue: this.props.settings.stream1 })
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'settings-field swap-streams-link' },
	          _react2.default.createElement(
	            'span',
	            { onClick: this.swapStreamNames.bind(this) },
	            'Swap Stream Names'
	          )
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'settings-field' },
	          _react2.default.createElement(
	            'label',
	            { className: 'settings-label', 'for': 'stream2-field' },
	            'Stream2 Name:'
	          ),
	          _react2.default.createElement('input', { ref: function ref(c) {
	              return _this2._stream2 = c;
	            }, name: 'stream2-field', defaultValue: this.props.settings.stream2 })
	        )
	      );
	    }
	  }]);
	
	  return SettingsForm;
	}(_react2.default.Component);
	
	SettingsForm.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onFieldChange: _react.PropTypes.func.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = SettingsForm;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(28);
	
	var BackLink = function BackLink(_ref) {
	  var onClick = _ref.onClick;
	  return React.createElement(
	    "div",
	    { id: "back-link-container", onClick: onClick },
	    React.createElement(
	      "a",
	      { id: "back-link" },
	      "Return to Menu"
	    )
	  );
	};
	
	BackLink.propTypes = {
	  onClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = BackLink;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(18);
	
	var _actions = __webpack_require__(21);
	
	exports.default = function (targetTest) {
	
	  var mapStateToProps = function mapStateToProps(state) {
	    return {
	      settings: state.settings
	    };
	  };
	
	  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	      onBackClick: function onBackClick() {
	        dispatch((0, _actions.changeView)('list'));
	      }
	    };
	  };
	
	  var TestContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(targetTest);
	
	  return React.createElement(TestContainer, null);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _PublisherTest = __webpack_require__(35);
	
	Object.defineProperty(exports, 'PublisherTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherTest).default;
	  }
	});
	
	var _Publisher1080pTest = __webpack_require__(36);
	
	Object.defineProperty(exports, 'Publisher1080pTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Publisher1080pTest).default;
	  }
	});
	
	var _PublisherAudioOnlyTest = __webpack_require__(37);
	
	Object.defineProperty(exports, 'PublisherAudioOnlyTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherAudioOnlyTest).default;
	  }
	});
	
	var _PublisherCameraSourceTest = __webpack_require__(38);
	
	Object.defineProperty(exports, 'PublisherCameraSourceTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherCameraSourceTest).default;
	  }
	});
	
	var _PublisherCameraSwapTest = __webpack_require__(39);
	
	Object.defineProperty(exports, 'PublisherCameraSwapTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherCameraSwapTest).default;
	  }
	});
	
	var _PublisherFiltersTest = __webpack_require__(40);
	
	Object.defineProperty(exports, 'PublisherFiltersTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherFiltersTest).default;
	  }
	});
	
	var _PublisherFailoverTest = __webpack_require__(41);
	
	Object.defineProperty(exports, 'PublisherFailoverTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherFailoverTest).default;
	  }
	});
	
	var _PublisherImageCaptureTest = __webpack_require__(42);
	
	Object.defineProperty(exports, 'PublisherImageCaptureTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherImageCaptureTest).default;
	  }
	});
	
	var _PublisherStreamManagerTest = __webpack_require__(43);
	
	Object.defineProperty(exports, 'PublisherStreamManagerTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherStreamManagerTest).default;
	  }
	});
	
	var _SubscriberTest = __webpack_require__(44);
	
	Object.defineProperty(exports, 'SubscriberTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_SubscriberTest).default;
	  }
	});
	
	var _SubscriberFailoverTest = __webpack_require__(45);
	
	Object.defineProperty(exports, 'SubscriberFailoverTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_SubscriberFailoverTest).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(28);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(32);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	// eslint-disable-line no-unused-vars
	
	var PublisherTest = function (_React$Component) {
	  _inherits(PublisherTest, _React$Component);
	
	  function PublisherTest(props) {
	    _classCallCheck(this, PublisherTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherTest.__proto__ || Object.getPrototypeOf(PublisherTest)).call(this, props));
	
	    _this.state = {
	      view: undefined,
	      publisher: undefined,
	      status: 'On hold.'
	    };
	    return _this;
	  }
	
	  _createClass(PublisherTest, [{
	    key: 'preview',
	    value: function preview() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var publisher = new red5prosdk.RTCPublisher();
	        var view = new red5prosdk.PublisherView('red5pro-publisher');
	        navigator.getUserMedia({
	          audio: !comp.props.settings.audioOn ? false : true,
	          video: !comp.props.settings.videoOn ? false : true
	        }, function (media) {
	
	          // Upon access of user media,
	          // 1. Attach the stream to the publisher.
	          // 2. Show the stream as preview in view instance.
	          publisher.attachStream(media);
	          view.preview(media, true);
	
	          comp.setState(function (state) {
	            state.publisher = publisher;
	            state.view = view;
	            return state;
	          });
	
	          resolve();
	        }, function (error) {
	          console.error('[PublisherTest] :: Error - ' + error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'publish',
	    value: function publish() {
	      var comp = this;
	      var iceServers = this.props.settings.iceServers;
	      var publisher = this.state.publisher;
	      var view = this.state.view;
	      view.attachPublisher(publisher);
	
	      comp.setState(function (state) {
	        state.status = 'Establishing connection...';
	      });
	
	      // Initialize
	      publisher.init({
	        protocol: 'ws',
	        host: this.props.settings.host,
	        port: this.props.settings.rtcport,
	        app: this.props.settings.context,
	        streamName: this.props.settings.stream1,
	        streamType: 'webrtc',
	        iceServers: iceServers
	      }).then(function () {
	        // Invoke the publish action
	        comp.setState(function (state) {
	          state.status = 'Starting publish session...';
	        });
	        return publisher.publish();
	      }).then(function () {
	        comp.setState(function (state) {
	          state.status = 'Publishing started. You\'re Live!';
	        });
	      }).catch(function (error) {
	        // A fault occurred while trying to initialize and publish the stream.
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        comp.setState(function (state) {
	          state.status = 'ERROR: ' + jsonError;
	        });
	        console.error('[PublisherTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'unpublish',
	    value: function unpublish() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var view = comp.state.view;
	        var publisher = comp.state.publisher;
	        if (publisher) {
	          publisher.unpublish().then(function () {
	            view.view.src = '';
	            publisher.setView(undefined);
	            comp.setState(function (state) {
	              state.publisher = undefined;
	              state.view = undefined;
	              state.selectedCamera = undefined;
	              return state;
	            });
	            resolve();
	          }).catch(function (error) {
	            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	            console.error('[PublishTest] :: Unmount Error = ' + jsonError);
	            reject(error);
	          });
	        } else {
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var pub = this.publish.bind(this);
	      this.preview().then(pub).catch(function () {
	        console.error('[PublishTest] :: Error - Could not start publishing session.');
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unpublish();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var videoStyle = {
	        'width': '100%',
	        'max-width': '640px'
	      };
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Test'
	        ),
	        _react2.default.createElement('hr', null),
	        _react2.default.createElement(
	          'h2',
	          { className: 'centered' },
	          _react2.default.createElement(
	            'em',
	            null,
	            'stream'
	          ),
	          ': ',
	          this.props.settings.stream1
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'centered publish-status-field' },
	          'STATUS: ',
	          this.state.status
	        ),
	        _react2.default.createElement(
	          'div',
	          { ref: function ref(c) {
	              return _this2._videoContainer = c;
	            },
	            id: 'video-container',
	            className: 'centered' },
	          _react2.default.createElement('video', { ref: function ref(c) {
	              return _this2._red5ProPublisher = c;
	            },
	            id: 'red5pro-publisher',
	            style: videoStyle,
	            controls: true, autoplay: true, disabled: true })
	        )
	      );
	    }
	  }]);
	
	  return PublisherTest;
	}(_react2.default.Component);
	
	PublisherTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = PublisherTest;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(28);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(32);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	// eslint-disable-line no-unused-vars
	
	var Publisher1080pTest = function (_React$Component) {
	  _inherits(Publisher1080pTest, _React$Component);
	
	  function Publisher1080pTest(props) {
	    _classCallCheck(this, Publisher1080pTest);
	
	    var _this = _possibleConstructorReturn(this, (Publisher1080pTest.__proto__ || Object.getPrototypeOf(Publisher1080pTest)).call(this, props));
	
	    _this.state = {
	      view: undefined,
	      publisher: undefined,
	      status: 'On hold.'
	    };
	    return _this;
	  }
	
	  _createClass(Publisher1080pTest, [{
	    key: 'preview',
	    value: function preview() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var publisher = new red5prosdk.RTCPublisher();
	        var view = new red5prosdk.PublisherView('red5pro-publisher');
	        navigator.getUserMedia({
	          audio: !comp.props.settings.audioOn ? false : true,
	          video: {
	            width: 1920,
	            height: 1080
	          }
	        }, function (media) {
	
	          // Upon access of user media,
	          // 1. Attach the stream to the publisher.
	          // 2. Show the stream as preview in view instance.
	          publisher.attachStream(media);
	          view.preview(media, true);
	
	          comp.setState(function (state) {
	            state.publisher = publisher;
	            state.view = view;
	            return state;
	          });
	
	          resolve();
	        }, function (error) {
	          console.error('[Publisher1080pTest] :: Error - ' + error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'publish',
	    value: function publish() {
	      var comp = this;
	      var iceServers = this.props.settings.iceServers;
	      var publisher = this.state.publisher;
	      var view = this.state.view;
	      view.attachPublisher(publisher);
	
	      comp.setState(function (state) {
	        state.status = 'Establishing connection...';
	      });
	
	      // Initialize
	      publisher.init({
	        protocol: 'ws',
	        host: this.props.settings.host,
	        port: this.props.settings.rtcport,
	        app: this.props.settings.context,
	        streamName: this.props.settings.stream1,
	        streamType: 'webrtc',
	        iceServers: iceServers
	      }).then(function () {
	        // Invoke the publish action
	        comp.setState(function (state) {
	          state.status = 'Starting publish session...';
	        });
	        return publisher.publish();
	      }).then(function () {
	        comp.setState(function (state) {
	          state.status = 'Publishing started. You\'re Live!';
	        });
	      }).catch(function (error) {
	        // A fault occurred while trying to initialize and publish the stream.
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        comp.setState(function (state) {
	          state.status = 'ERROR: ' + jsonError;
	        });
	        console.error('[Publisher1080pTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'unpublish',
	    value: function unpublish() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var view = comp.state.view;
	        var publisher = comp.state.publisher;
	        if (publisher) {
	          publisher.unpublish().then(function () {
	            view.view.src = '';
	            publisher.setView(undefined);
	            comp.setState(function (state) {
	              state.publisher = undefined;
	              state.view = undefined;
	              state.selectedCamera = undefined;
	              return state;
	            });
	            resolve();
	          }).catch(function (error) {
	            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	            console.error('[PublishTest] :: Unmount Error = ' + jsonError);
	            reject(error);
	          });
	        } else {
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var pub = this.publish.bind(this);
	      this.preview().then(pub).catch(function () {
	        console.error('[PublishTest] :: Error - Could not start publishing session.');
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unpublish();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var videoStyle = {
	        'width': '100%',
	        'max-width': '640px'
	      };
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Test'
	        ),
	        _react2.default.createElement('hr', null),
	        _react2.default.createElement(
	          'h2',
	          { className: 'centered' },
	          _react2.default.createElement(
	            'em',
	            null,
	            'stream'
	          ),
	          ': ',
	          this.props.settings.stream1
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'centered publish-status-field' },
	          'STATUS: ',
	          this.state.status
	        ),
	        _react2.default.createElement(
	          'div',
	          { ref: function ref(c) {
	              return _this2._videoContainer = c;
	            },
	            id: 'video-container',
	            className: 'centered' },
	          _react2.default.createElement('video', { ref: function ref(c) {
	              return _this2._red5ProPublisher = c;
	            },
	            id: 'red5pro-publisher',
	            style: videoStyle,
	            controls: true, autoplay: true, disabled: true })
	        )
	      );
	    }
	  }]);
	
	  return Publisher1080pTest;
	}(_react2.default.Component);
	
	Publisher1080pTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = Publisher1080pTest;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(28);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(32);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	// eslint-disable-line no-unused-vars
	
	var PublisherAudioOnlyTest = function (_React$Component) {
	  _inherits(PublisherAudioOnlyTest, _React$Component);
	
	  function PublisherAudioOnlyTest(props) {
	    _classCallCheck(this, PublisherAudioOnlyTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherAudioOnlyTest.__proto__ || Object.getPrototypeOf(PublisherAudioOnlyTest)).call(this, props));
	
	    _this.state = {
	      view: undefined,
	      publisher: undefined,
	      status: 'On hold.'
	    };
	    return _this;
	  }
	
	  _createClass(PublisherAudioOnlyTest, [{
	    key: 'preview',
	    value: function preview() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var publisher = new red5prosdk.RTCPublisher();
	        var view = new red5prosdk.PublisherView('red5pro-publisher');
	        navigator.getUserMedia({
	          audio: true,
	          video: false
	        }, function (media) {
	
	          // Upon access of user media,
	          // 1. Attach the stream to the publisher.
	          // 2. Show the stream as preview in view instance.
	          publisher.attachStream(media);
	          view.preview(media, true);
	
	          comp.setState(function (state) {
	            state.publisher = publisher;
	            state.view = view;
	            return state;
	          });
	
	          resolve();
	        }, function (error) {
	          console.error('[PublisherAudioOnlyTest] :: Error - ' + error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'publish',
	    value: function publish() {
	      var comp = this;
	      var iceServers = this.props.settings.iceServers;
	      var publisher = this.state.publisher;
	      var view = this.state.view;
	      view.attachPublisher(publisher);
	
	      comp.setState(function (state) {
	        state.status = 'Establishing connection...';
	      });
	
	      // Initialize
	      publisher.init({
	        protocol: 'ws',
	        host: this.props.settings.host,
	        port: this.props.settings.rtcport,
	        app: this.props.settings.context,
	        streamName: this.props.settings.stream1,
	        streamType: 'webrtc',
	        iceServers: iceServers
	      }).then(function () {
	        // Invoke the publish action
	        comp.setState(function (state) {
	          state.status = 'Starting publish session...';
	        });
	        return publisher.publish();
	      }).then(function () {
	        comp.setState(function (state) {
	          state.status = 'Publishing started. You\'re Live!';
	        });
	      }).catch(function (error) {
	        // A fault occurred while trying to initialize and publish the stream.
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        comp.setState(function (state) {
	          state.status = 'ERROR: ' + jsonError;
	        });
	        console.error('[PublisherCameraSourceTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'unpublish',
	    value: function unpublish() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var view = comp.state.view;
	        var publisher = comp.state.publisher;
	        if (publisher) {
	          publisher.unpublish().then(function () {
	            view.view.src = '';
	            publisher.setView(undefined);
	            comp.setState(function (state) {
	              state.publisher = undefined;
	              state.view = undefined;
	              state.selectedCamera = undefined;
	              return state;
	            });
	            resolve();
	          }).catch(function (error) {
	            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	            console.error('[PublishTest] :: Unmount Error = ' + jsonError);
	            reject(error);
	          });
	        } else {
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var pub = this.publish.bind(this);
	      this.preview().then(pub).catch(function () {
	        console.error('[PublishTest] :: Error - Could not start publishing session.');
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unpublish();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var videoStyle = {
	        'width': '100%',
	        'max-width': '640px',
	        'height': '40px'
	      };
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Test'
	        ),
	        _react2.default.createElement('hr', null),
	        _react2.default.createElement(
	          'h2',
	          { className: 'centered' },
	          _react2.default.createElement(
	            'em',
	            null,
	            'stream'
	          ),
	          ': ',
	          this.props.settings.stream1
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'centered publish-status-field' },
	          'STATUS: ',
	          this.state.status
	        ),
	        _react2.default.createElement(
	          'div',
	          { ref: function ref(c) {
	              return _this2._videoContainer = c;
	            },
	            id: 'video-container',
	            className: 'centered' },
	          _react2.default.createElement('video', { ref: function ref(c) {
	              return _this2._red5ProPublisher = c;
	            },
	            id: 'red5pro-publisher',
	            style: videoStyle,
	            controls: true, autoplay: true, disabled: true })
	        )
	      );
	    }
	  }]);
	
	  return PublisherAudioOnlyTest;
	}(_react2.default.Component);
	
	PublisherAudioOnlyTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = PublisherAudioOnlyTest;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(28);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(32);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	// eslint-disable-line no-unused-vars
	
	var SELECT_DEFAULT = 'Select a camera...';
	
	var PublisherCameraSourceTest = function (_React$Component) {
	  _inherits(PublisherCameraSourceTest, _React$Component);
	
	  function PublisherCameraSourceTest(props) {
	    _classCallCheck(this, PublisherCameraSourceTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherCameraSourceTest.__proto__ || Object.getPrototypeOf(PublisherCameraSourceTest)).call(this, props));
	
	    _this.state = {
	      view: undefined,
	      publisher: undefined,
	      cameras: [{
	        label: SELECT_DEFAULT
	      }],
	      selectedCamera: undefined,
	      status: 'On hold.'
	    };
	    return _this;
	  }
	
	  _createClass(PublisherCameraSourceTest, [{
	    key: 'waitForSelect',
	    value: function waitForSelect() {
	      var comp = this;
	      navigator.mediaDevices.enumerateDevices().then(function (devices) {
	        var videoCameras = devices.filter(function (item) {
	          return item.kind === 'videoinput';
	        });
	        var cameras = [{
	          label: SELECT_DEFAULT
	        }].concat(videoCameras);
	        comp.setState(function (state) {
	          state.cameras = cameras;
	        });
	      });
	    }
	  }, {
	    key: 'preview',
	    value: function preview(mediaDeviceId) {
	      var comp = this;
	      var createPromise = new Promise(function (resolve, reject) {
	        var publisher = new red5prosdk.RTCPublisher();
	        var view = new red5prosdk.PublisherView('red5pro-publisher');
	        var gmd = navigator.mediaDevice || navigator;
	        gmd.getUserMedia({
	          audio: !comp.props.settings.audioOn ? false : true,
	          video: {
	            optional: [{
	              sourceId: mediaDeviceId
	            }]
	          }
	        }, function (media) {
	
	          // Upon access of user media,
	          // 1. Attach the stream to the publisher.
	          // 2. Show the stream as preview in view instance.
	          publisher.attachStream(media);
	          view.preview(media, true);
	
	          comp.setState(function (state) {
	            state.publisher = publisher;
	            state.view = view;
	            state.selectedCamera = mediaDeviceId;
	            return state;
	          });
	
	          resolve();
	        }, function (error) {
	          console.error('[PublisherCameraSourceTest] :: Error - ' + error);
	          reject(error);
	        });
	      });
	
	      if (this.state.publisher) {
	        return this.state.publisher.unpublish();
	      }
	      return createPromise;
	    }
	  }, {
	    key: 'publish',
	    value: function publish() {
	      var comp = this;
	      var iceServers = this.props.settings.iceServers;
	      var publisher = this.state.publisher;
	      var view = this.state.view;
	      view.attachPublisher(publisher);
	
	      comp.setState(function (state) {
	        state.status = 'Establishing connection...';
	      });
	
	      // Initialize
	      publisher.init({
	        protocol: 'ws',
	        host: this.props.settings.host,
	        port: this.props.settings.rtcport,
	        app: this.props.settings.context,
	        streamName: this.props.settings.stream1,
	        streamType: 'webrtc',
	        iceServers: iceServers
	      }).then(function () {
	        // Invoke the publish action
	        comp.setState(function (state) {
	          state.status = 'Starting publish session...';
	        });
	        return publisher.publish();
	      }).then(function () {
	        comp.setState(function (state) {
	          state.status = 'Publishing started. You\'re Live!';
	        });
	      }).catch(function (error) {
	        // A fault occurred while trying to initialize and publish the stream.
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        comp.setState(function (state) {
	          state.status = 'ERROR: ' + jsonError;
	        });
	        console.error('[PublisherCameraSourceTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'unpublish',
	    value: function unpublish() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var view = comp.state.view;
	        var publisher = comp.state.publisher;
	        if (publisher) {
	          publisher.unpublish().then(function () {
	            view.view.src = '';
	            publisher.setView(undefined);
	            comp.setState(function (state) {
	              state.publisher = undefined;
	              state.view = undefined;
	              state.selectedCamera = undefined;
	              return state;
	            });
	            resolve();
	          }).catch(function (error) {
	            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	            console.error('[PublishTest] :: Unmount Error = ' + jsonError);
	            reject(error);
	          });
	        } else {
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: 'onCameraSelect',
	    value: function onCameraSelect() {
	      var comp = this;
	      var cameraSelected = comp._cameraSelect.value;
	      if (comp.state.selectedCamera !== cameraSelected && cameraSelected && cameraSelected !== SELECT_DEFAULT) {
	        var pub = comp.publish.bind(comp);
	        comp.unpublish().then(function () {
	          return comp.preview(cameraSelected);
	        }).then(pub).catch(function () {
	          console.error('[PublishTest] :: Error - Could not start publishing session.');
	        });
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.waitForSelect();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unpublish();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var videoStyle = {
	        'width': '100%',
	        'max-width': '640px'
	      };
	      var labelStyle = {
	        'margin-right': '0.5rem'
	      };
	      var cameraSelectField = {
	        'background-color': '#ffffff',
	        'padding': '0.8rem'
	      };
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Test'
	        ),
	        _react2.default.createElement('hr', null),
	        _react2.default.createElement(
	          'h2',
	          { className: 'centered' },
	          _react2.default.createElement(
	            'em',
	            null,
	            'stream'
	          ),
	          ': ',
	          this.props.settings.stream1
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'instructions-block' },
	          _react2.default.createElement(
	            'p',
	            null,
	            'To begin this test, first select a camera from the following selections:'
	          ),
	          _react2.default.createElement(
	            'p',
	            { style: cameraSelectField },
	            _react2.default.createElement(
	              'label',
	              { 'for': 'camera-select', style: labelStyle },
	              'Camera Source:'
	            ),
	            _react2.default.createElement(
	              'select',
	              { ref: function ref(c) {
	                  return _this2._cameraSelect = c;
	                },
	                id: 'camera-select',
	                onChange: this.onCameraSelect.bind(this) },
	              this.state.cameras.map(function (camera) {
	                return _this2.state.selectedCamera === camera.deviceId ? _react2.default.createElement(
	                  'option',
	                  { value: camera.deviceId, selected: true },
	                  camera.label
	                ) : _react2.default.createElement(
	                  'option',
	                  { value: camera.deviceId },
	                  camera.label
	                );
	              })
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'centered publish-status-field' },
	          'STATUS: ',
	          this.state.status
	        ),
	        _react2.default.createElement(
	          'div',
	          { ref: function ref(c) {
	              return _this2._videoContainer = c;
	            },
	            id: 'video-container',
	            className: 'centered' },
	          _react2.default.createElement('video', { ref: function ref(c) {
	              return _this2._red5ProPublisher = c;
	            },
	            id: 'red5pro-publisher',
	            style: videoStyle,
	            controls: true, autoplay: true, disabled: true })
	        )
	      );
	    }
	  }]);
	
	  return PublisherCameraSourceTest;
	}(_react2.default.Component);
	
	PublisherCameraSourceTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = PublisherCameraSourceTest;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(28);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(32);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	// eslint-disable-line no-unused-vars
	
	var FACING_MODE_FRONT = 'user';
	var FACING_MODE_REAR = 'environment';
	
	var PublisherCameraSwapTest = function (_React$Component) {
	  _inherits(PublisherCameraSwapTest, _React$Component);
	
	  function PublisherCameraSwapTest(props) {
	    _classCallCheck(this, PublisherCameraSwapTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherCameraSwapTest.__proto__ || Object.getPrototypeOf(PublisherCameraSwapTest)).call(this, props));
	
	    _this.state = {
	      view: undefined,
	      publisher: undefined,
	      facingModeFront: true,
	      status: 'On hold.',
	      supported: false
	    };
	    return _this;
	  }
	
	  _createClass(PublisherCameraSwapTest, [{
	    key: 'preview',
	    value: function preview() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var publisher = new red5prosdk.RTCPublisher();
	        var view = new red5prosdk.PublisherView('red5pro-publisher');
	        navigator.getUserMedia({
	          audio: !comp.props.settings.audioOn ? false : true,
	          video: {
	            facingMode: comp.state.facingModeFront ? FACING_MODE_FRONT : FACING_MODE_REAR
	          }
	        }, function (media) {
	
	          // Upon access of user media,
	          // 1. Attach the stream to the publisher.
	          // 2. Show the stream as preview in view instance.
	          publisher.attachStream(media);
	          view.preview(media, true);
	
	          comp.setState(function (state) {
	            state.publisher = publisher;
	            state.view = view;
	            return state;
	          });
	
	          resolve();
	        }, function (error) {
	          console.error('[PublisherCameraSwapTest] :: Error - ' + error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'publish',
	    value: function publish() {
	      var comp = this;
	      var iceServers = this.props.settings.iceServers;
	      var publisher = this.state.publisher;
	      var view = this.state.view;
	      view.attachPublisher(publisher);
	
	      comp.setState(function (state) {
	        state.status = 'Establishing connection...';
	      });
	
	      // Initialize
	      publisher.init({
	        protocol: 'ws',
	        host: this.props.settings.host,
	        port: this.props.settings.rtcport,
	        app: this.props.settings.context,
	        streamName: this.props.settings.stream1,
	        streamType: 'webrtc',
	        iceServers: iceServers
	      }).then(function () {
	        // Invoke the publish action
	        comp.setState(function (state) {
	          state.status = 'Starting publish session...';
	        });
	        return publisher.publish();
	      }).then(function () {
	        var facingMode = comp.state.facingModeFront ? FACING_MODE_FRONT : FACING_MODE_REAR;
	        comp.setState(function (state) {
	          state.status = 'Publishing started. You\'re Live! FacingMode=' + facingMode;
	        });
	      }).catch(function (error) {
	        // A fault occurred while trying to initialize and publish the stream.
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        comp.setState(function (state) {
	          state.status = 'ERROR: ' + jsonError;
	        });
	        console.error('[PublisherCameraSwapTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'unpublish',
	    value: function unpublish() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var view = comp.state.view;
	        var publisher = comp.state.publisher;
	        if (publisher) {
	          publisher.unpublish().then(function () {
	            view.view.src = '';
	            publisher.setView(undefined);
	            comp.setState(function (state) {
	              state.publisher = undefined;
	              state.view = undefined;
	              state.selectedCamera = undefined;
	              return state;
	            });
	            resolve();
	          }).catch(function (error) {
	            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	            console.error('[PublishTest] :: Unmount Error = ' + jsonError);
	            reject(error);
	          });
	        } else {
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState(function (state) {
	        state.supported = navigator.mediaDevices.getSupportedConstraints()["facingMode"];
	      });
	
	      var pub = this.publish.bind(this);
	      this.preview().then(pub).catch(function () {
	        console.error('[PublishTest] :: Error - Could not start publishing session.');
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unpublish();
	    }
	  }, {
	    key: 'onCameraSwapRequest',
	    value: function onCameraSwapRequest() {
	      var comp = this;
	      var pub = this.publish.bind(this);
	      var prev = this.preview.bind(this);
	
	      this.setState(function (state) {
	        state.facingModeFront = !state.facingModeFront;
	      });
	
	      this.unpublish().then(prev).then(pub).catch(function () {
	        comp.setState(function (state) {
	          state.status = 'Error: Could not start publishing session swap camera.';
	        });
	        console.error('[PublishCameraTest] :: Error - Could not start publishing session on camera swap.');
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var videoStyle = {
	        'width': '100%',
	        'max-width': '640px'
	      };
	      var hintClass = ['hint-block', this.state.supported ? '' : 'hint-alert'].join(' ');
	      var supportedStr = this.state.supported ? 'supports' : 'does not support';
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Test'
	        ),
	        _react2.default.createElement('hr', null),
	        _react2.default.createElement(
	          'h2',
	          { className: 'centered' },
	          _react2.default.createElement(
	            'em',
	            null,
	            'stream'
	          ),
	          ': ',
	          this.props.settings.stream1
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: hintClass },
	          _react2.default.createElement(
	            'em',
	            null,
	            'The browser you are using '
	          ),
	          _react2.default.createElement(
	            'strong',
	            null,
	            supportedStr
	          ),
	          _react2.default.createElement(
	            'em',
	            null,
	            ' the '
	          ),
	          _react2.default.createElement(
	            'code',
	            null,
	            'facingMode'
	          ),
	          _react2.default.createElement(
	            'em',
	            null,
	            ' video constraint require for this test.'
	          )
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'centered publish-status-field' },
	          'STATUS: ',
	          this.state.status
	        ),
	        _react2.default.createElement(
	          'div',
	          { ref: function ref(c) {
	              return _this2._videoContainer = c;
	            },
	            id: 'video-container',
	            className: 'centered',
	            onClick: this.onCameraSwapRequest.bind(this) },
	          _react2.default.createElement('video', { ref: function ref(c) {
	              return _this2._red5ProPublisher = c;
	            },
	            id: 'red5pro-publisher',
	            style: videoStyle,
	            controls: true, autoplay: true, disabled: true })
	        )
	      );
	    }
	  }]);
	
	  return PublisherCameraSwapTest;
	}(_react2.default.Component);
	
	PublisherCameraSwapTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = PublisherCameraSwapTest;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(28);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(32);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	// eslint-disable-line no-unused-vars
	
	var FILTER_SELECT = 'Select filter...';
	
	var PublisherFiltersTest = function (_React$Component) {
	  _inherits(PublisherFiltersTest, _React$Component);
	
	  function PublisherFiltersTest(props) {
	    _classCallCheck(this, PublisherFiltersTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherFiltersTest.__proto__ || Object.getPrototypeOf(PublisherFiltersTest)).call(this, props));
	
	    _this.state = {
	      view: undefined,
	      publisher: undefined,
	      status: 'On hold.',
	      filters: [FILTER_SELECT, 'grayscale', 'sepia', 'blur'],
	      videoClassList: ''
	    };
	    return _this;
	  }
	
	  _createClass(PublisherFiltersTest, [{
	    key: 'preview',
	    value: function preview() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var publisher = new red5prosdk.RTCPublisher();
	        var view = new red5prosdk.PublisherView('red5pro-publisher');
	        navigator.getUserMedia({
	          audio: !comp.props.settings.audioOn ? false : true,
	          video: !comp.props.settings.videoOn ? false : true
	        }, function (media) {
	
	          // Upon access of user media,
	          // 1. Attach the stream to the publisher.
	          // 2. Show the stream as preview in view instance.
	          publisher.attachStream(media);
	          view.preview(media, true);
	
	          comp.setState(function (state) {
	            state.publisher = publisher;
	            state.view = view;
	            return state;
	          });
	
	          resolve();
	        }, function (error) {
	          console.error('[PublisherFiltersTest] :: Error - ' + error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'publish',
	    value: function publish() {
	      var comp = this;
	      var iceServers = this.props.settings.iceServers;
	      var publisher = this.state.publisher;
	      var view = this.state.view;
	      view.attachPublisher(publisher);
	
	      comp.setState(function (state) {
	        state.status = 'Establishing connection...';
	      });
	
	      // Initialize
	      publisher.init({
	        protocol: 'ws',
	        host: this.props.settings.host,
	        port: this.props.settings.rtcport,
	        app: this.props.settings.context,
	        streamName: this.props.settings.stream1,
	        streamType: 'webrtc',
	        iceServers: iceServers
	      }).then(function () {
	        // Invoke the publish action
	        comp.setState(function (state) {
	          state.status = 'Starting publish session...';
	        });
	        return publisher.publish();
	      }).then(function () {
	        comp.setState(function (state) {
	          state.status = 'Publishing started. You\'re Live!';
	        });
	      }).catch(function (error) {
	        // A fault occurred while trying to initialize and publish the stream.
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        comp.setState(function (state) {
	          state.status = 'ERROR: ' + jsonError;
	        });
	        console.error('[PublisherFiltersTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'unpublish',
	    value: function unpublish() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var view = comp.state.view;
	        var publisher = comp.state.publisher;
	        if (publisher) {
	          publisher.unpublish().then(function () {
	            view.view.src = '';
	            publisher.setView(undefined);
	            comp.setState(function (state) {
	              state.publisher = undefined;
	              state.view = undefined;
	              state.selectedCamera = undefined;
	              return state;
	            });
	            resolve();
	          }).catch(function (error) {
	            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	            console.error('[PublishTest] :: Unmount Error = ' + jsonError);
	            reject(error);
	          });
	        } else {
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var pub = this.publish.bind(this);
	      this.preview().then(pub).catch(function () {
	        console.error('[PublishTest] :: Error - Could not start publishing session.');
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unpublish();
	    }
	  }, {
	    key: 'onFilterSelect',
	    value: function onFilterSelect() {
	      var selectedFilter = this._filterSelect.value;
	      var classList = selectedFilter === FILTER_SELECT ? '' : selectedFilter;
	      this.setState(function (state) {
	        state.videoClassList = classList;
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var videoStyle = {
	        'width': '100%',
	        'max-width': '640px'
	      };
	      var labelStyle = {
	        'margin-right': '0.5rem'
	      };
	      var filterSelectField = {
	        'background-color': '#ffffff',
	        'padding': '0.8rem'
	      };
	      var videoClassList = this.state.videoClassList;
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Test'
	        ),
	        _react2.default.createElement('hr', null),
	        _react2.default.createElement(
	          'h2',
	          { className: 'centered' },
	          _react2.default.createElement(
	            'em',
	            null,
	            'stream'
	          ),
	          ': ',
	          this.props.settings.stream1
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'instructions-block' },
	          _react2.default.createElement(
	            'p',
	            null,
	            'To begin this test, once streaming has started, select a filter to apply:'
	          ),
	          _react2.default.createElement(
	            'p',
	            { style: filterSelectField },
	            _react2.default.createElement(
	              'label',
	              { 'for': 'filter-select', style: labelStyle },
	              'Camera Filter:'
	            ),
	            _react2.default.createElement(
	              'select',
	              { ref: function ref(c) {
	                  return _this2._filterSelect = c;
	                },
	                id: 'filter-select',
	                onChange: this.onFilterSelect.bind(this) },
	              this.state.filters.map(function (filter) {
	                return _react2.default.createElement(
	                  'option',
	                  { value: filter },
	                  filter
	                );
	              })
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'centered publish-status-field' },
	          'STATUS: ',
	          this.state.status
	        ),
	        _react2.default.createElement(
	          'div',
	          { ref: function ref(c) {
	              return _this2._videoContainer = c;
	            },
	            id: 'video-container',
	            className: 'centered' },
	          _react2.default.createElement('video', { ref: function ref(c) {
	              return _this2._red5ProPublisher = c;
	            },
	            id: 'red5pro-publisher',
	            style: videoStyle,
	            className: videoClassList,
	            controls: true, autoplay: true, disabled: true })
	        )
	      );
	    }
	  }]);
	
	  return PublisherFiltersTest;
	}(_react2.default.Component);
	
	PublisherFiltersTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = PublisherFiltersTest;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(28);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(32);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	// eslint-disable-line no-unused-vars
	
	var PublisherFailoverTest = function (_React$Component) {
	  _inherits(PublisherFailoverTest, _React$Component);
	
	  function PublisherFailoverTest(props) {
	    _classCallCheck(this, PublisherFailoverTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherFailoverTest.__proto__ || Object.getPrototypeOf(PublisherFailoverTest)).call(this, props));
	
	    _this.state = {
	      view: undefined,
	      publisher: undefined,
	      status: 'On hold.'
	    };
	    return _this;
	  }
	
	  _createClass(PublisherFailoverTest, [{
	    key: 'preview',
	    value: function preview() {
	      var _this2 = this;
	
	      var comp = this;
	
	      return new Promise(function (resolve, reject) {
	
	        var publisher = new red5prosdk.Red5ProPublisher();
	        var view = new red5prosdk.PublisherView('red5pro-publisher');
	        view.attachPublisher(publisher);
	
	        var iceServers = _this2.props.settings.iceServers;
	        var rtcConfig = {
	          protocol: 'ws',
	          host: _this2.props.settings.host,
	          port: _this2.props.settings.rtcport,
	          app: _this2.props.settings.context,
	          streamName: _this2.props.settings.stream1,
	          streamType: 'webrtc',
	          iceServers: iceServers
	        };
	        var rtmpConfig = {
	          protocol: 'rtmp',
	          host: _this2.props.settings.host,
	          port: _this2.props.settings.rtmpport,
	          app: _this2.props.settings.context,
	          streamName: _this2.props.settings.stream1,
	          swf: 'lib/red5pro/red5pro-publisher.swf'
	        };
	        var publishOrder = _this2.props.settings.publisherFailoverOrder.split(',').map(function (item) {
	          return item.trim();
	        });
	
	        publisher.setPublishOrder(publishOrder).init({
	          rtc: rtcConfig,
	          rtmp: rtmpConfig
	        }).then(function (selectedPublisher) {
	
	          // Invoke the publish action
	          var type = selectedPublisher.getType();
	          comp.setState(function (state) {
	            state.status = 'Starting publish session with ' + type + '...';
	          });
	
	          if (type.toLowerCase() === publisher.publishTypes.RTC) {
	            navigator.getUserMedia({
	              audio: !comp.props.settings.audioOn ? false : true,
	              video: !comp.props.settings.videoOn ? false : true
	            }, function (media) {
	
	              // Upon access of user media,
	              // 1. Attach the stream to the publisher.
	              // 2. Show the stream as preview in view instance.
	              selectedPublisher.attachStream(media);
	              view.preview(media, true);
	
	              comp.setState(function (state) {
	                state.publisher = selectedPublisher;
	                state.view = view;
	                return state;
	              });
	              resolve();
	            }, function (error) {
	              console.error('[PublisherFailoverTest] :: Error - ' + error);
	              reject(error);
	            });
	          } else {
	            comp.setState(function (state) {
	              state.publisher = selectedPublisher;
	              state.view = view;
	              return state;
	            });
	            selectedPublisher ? resolve() : reject('Could not find publisher.');
	          }
	          // End if/clause for publisher type.
	        });
	        // End Promise declaration.
	      });
	    }
	  }, {
	    key: 'publish',
	    value: function publish() {
	      var comp = this;
	      var publisher = this.state.publisher;
	
	      var type = publisher.getType();
	      comp.setState(function (state) {
	        state.status = 'Establishing connection with ' + type + ' publisher...';
	      });
	      // Initialize
	      publisher.publish().then(function () {
	        comp.setState(function (state) {
	          state.status = type + ' publishing started. You\'re Live!';
	        });
	      }).catch(function (error) {
	        // A fault occurred while trying to initialize and publish the stream.
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        comp.setState(function (state) {
	          state.status = 'ERROR: ' + jsonError;
	        });
	        console.error('[PublisherFailoverTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'unpublish',
	    value: function unpublish() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var view = comp.state.view;
	        var publisher = comp.state.publisher;
	        if (publisher) {
	          publisher.unpublish().then(function () {
	            view.view.src = '';
	            publisher.setView(undefined);
	            comp.setState(function (state) {
	              state.publisher = undefined;
	              state.view = undefined;
	              state.selectedCamera = undefined;
	              return state;
	            });
	            resolve();
	          }).catch(function (error) {
	            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	            console.error('[PublishTest] :: Unmount Error = ' + jsonError);
	            reject(error);
	          });
	        } else {
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var pub = this.publish.bind(this);
	      this.preview().then(pub).catch(function () {
	        console.error('[PublishTest] :: Error - Could not start publishing session.');
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unpublish();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      var videoStyle = {
	        'width': '100%',
	        'max-width': '640px'
	      };
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Test'
	        ),
	        _react2.default.createElement('hr', null),
	        _react2.default.createElement(
	          'h2',
	          { className: 'centered' },
	          _react2.default.createElement(
	            'em',
	            null,
	            'stream'
	          ),
	          ': ',
	          this.props.settings.stream1
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'centered publish-status-field' },
	          'STATUS: ',
	          this.state.status
	        ),
	        _react2.default.createElement(
	          'div',
	          { ref: function ref(c) {
	              return _this3._videoContainer = c;
	            },
	            id: 'video-container',
	            className: 'centered' },
	          _react2.default.createElement('video', { ref: function ref(c) {
	              return _this3._red5ProPublisher = c;
	            },
	            id: 'red5pro-publisher',
	            style: videoStyle,
	            controls: true, autoplay: true, disabled: true })
	        )
	      );
	    }
	  }]);
	
	  return PublisherFailoverTest;
	}(_react2.default.Component);
	
	PublisherFailoverTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = PublisherFailoverTest;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(28);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(32);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	// eslint-disable-line no-unused-vars
	
	var PublisherImageCaptureTest = function (_React$Component) {
	  _inherits(PublisherImageCaptureTest, _React$Component);
	
	  function PublisherImageCaptureTest(props) {
	    _classCallCheck(this, PublisherImageCaptureTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherImageCaptureTest.__proto__ || Object.getPrototypeOf(PublisherImageCaptureTest)).call(this, props));
	
	    _this.state = {
	      view: undefined,
	      publisher: undefined,
	      status: 'On hold.'
	    };
	    return _this;
	  }
	
	  _createClass(PublisherImageCaptureTest, [{
	    key: 'preview',
	    value: function preview() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var publisher = new red5prosdk.RTCPublisher();
	        var view = new red5prosdk.PublisherView('red5pro-publisher');
	        navigator.getUserMedia({
	          audio: !comp.props.settings.audioOn ? false : true,
	          video: !comp.props.settings.videoOn ? false : true
	        }, function (media) {
	
	          // Upon access of user media,
	          // 1. Attach the stream to the publisher.
	          // 2. Show the stream as preview in view instance.
	          publisher.attachStream(media);
	          view.preview(media, true);
	
	          comp.setState(function (state) {
	            state.publisher = publisher;
	            state.view = view;
	            return state;
	          });
	
	          resolve();
	        }, function (error) {
	          console.error('[PublisherImageCaptureTest] :: Error - ' + error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'publish',
	    value: function publish() {
	      var comp = this;
	      var iceServers = this.props.settings.iceServers;
	      var publisher = this.state.publisher;
	      var view = this.state.view;
	      view.attachPublisher(publisher);
	
	      comp.setState(function (state) {
	        state.status = 'Establishing connection...';
	      });
	
	      // Initialize
	      publisher.init({
	        protocol: 'ws',
	        host: this.props.settings.host,
	        port: this.props.settings.rtcport,
	        app: this.props.settings.context,
	        streamName: this.props.settings.stream1,
	        streamType: 'webrtc',
	        iceServers: iceServers
	      }).then(function () {
	        // Invoke the publish action
	        comp.setState(function (state) {
	          state.status = 'Starting publish session...';
	        });
	        return publisher.publish();
	      }).then(function () {
	        comp.setState(function (state) {
	          state.status = 'Publishing started. You\'re Live!';
	        });
	      }).catch(function (error) {
	        // A fault occurred while trying to initialize and publish the stream.
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        comp.setState(function (state) {
	          state.status = 'ERROR: ' + jsonError;
	        });
	        console.error('[PublisherImageCaptureTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'unpublish',
	    value: function unpublish() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var view = comp.state.view;
	        var publisher = comp.state.publisher;
	        if (publisher) {
	          publisher.unpublish().then(function () {
	            view.view.src = '';
	            publisher.setView(undefined);
	            comp.setState(function (state) {
	              state.publisher = undefined;
	              state.view = undefined;
	              state.selectedCamera = undefined;
	              return state;
	            });
	            resolve();
	          }).catch(function (error) {
	            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	            console.error('[PublishTest] :: Unmount Error = ' + jsonError);
	            reject(error);
	          });
	        } else {
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var pub = this.publish.bind(this);
	      this.preview().then(pub).catch(function () {
	        console.error('[PublishTest] :: Error - Could not start publishing session.');
	      });
	      this.clearCanvas();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unpublish();
	    }
	  }, {
	    key: 'onVideoImageCapture',
	    value: function onVideoImageCapture() {
	      this.clearCanvas();
	      this.drawOnCanvas(this._red5ProPublisher);
	    }
	  }, {
	    key: 'clearCanvas',
	    value: function clearCanvas() {
	      var video = this._red5ProPublisher;
	      var canvas = this._captureCanvas;
	      var context = canvas.getContext('2d');
	      context.fillStyle = "#aaaaaa";
	      context.fillRect(0, 0, video.offsetWidth, video.offsetHeight);
	    }
	  }, {
	    key: 'drawOnCanvas',
	    value: function drawOnCanvas(targetElement) {
	      var canvas = this._captureCanvas;
	      var context = canvas.getContext('2d');
	      canvas.width = targetElement.offsetWidth;
	      canvas.height = targetElement.offsetHeight;
	      context.drawImage(targetElement, 0, 0, targetElement.offsetWidth, targetElement.offsetHeight);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var videoStyle = {
	        'width': '100%',
	        'max-width': '640px'
	      };
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Test'
	        ),
	        _react2.default.createElement('hr', null),
	        _react2.default.createElement(
	          'h2',
	          { className: 'centered' },
	          _react2.default.createElement(
	            'em',
	            null,
	            'stream'
	          ),
	          ': ',
	          this.props.settings.stream1
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'centered publish-status-field' },
	          'STATUS: ',
	          this.state.status
	        ),
	        _react2.default.createElement(
	          'div',
	          { ref: function ref(c) {
	              return _this2._videoContainer = c;
	            },
	            id: 'video-container',
	            className: 'centered' },
	          _react2.default.createElement('video', { ref: function ref(c) {
	              return _this2._red5ProPublisher = c;
	            },
	            id: 'red5pro-publisher',
	            style: videoStyle,
	            onClick: this.onVideoImageCapture.bind(this),
	            controls: true, autoplay: true, disabled: true })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'centered' },
	          _react2.default.createElement('canvas', { ref: function ref(c) {
	              return _this2._captureCanvas = c;
	            } })
	        )
	      );
	    }
	  }]);
	
	  return PublisherImageCaptureTest;
	}(_react2.default.Component);
	
	PublisherImageCaptureTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = PublisherImageCaptureTest;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(28);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(32);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	// eslint-disable-line no-unused-vars
	
	var PublisherStreamManagerTest = function (_React$Component) {
	  _inherits(PublisherStreamManagerTest, _React$Component);
	
	  function PublisherStreamManagerTest(props) {
	    _classCallCheck(this, PublisherStreamManagerTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherStreamManagerTest.__proto__ || Object.getPrototypeOf(PublisherStreamManagerTest)).call(this, props));
	
	    _this.state = {
	      view: undefined,
	      publisher: undefined,
	      status: 'On hold.'
	    };
	    return _this;
	  }
	
	  _createClass(PublisherStreamManagerTest, [{
	    key: 'requestOrigin',
	    value: function requestOrigin() {
	      var host = this.props.settings.host;
	      var context = this.props.settings.context;
	      var streamName = this.props.settings.stream1;
	      var url = 'http://' + host + ':5080/streammanager/api/1.0/event/' + context + '/' + streamName + '?action=broadcast';
	      this.setState(function (state) {
	        state.status = 'Requesting Origin from ' + url + '...';
	      });
	      return new Promise(function (resolve, reject) {
	        fetch(url).then(function (res) {
	          if (res.headers.get("content-type") && res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
	            return res.json();
	          } else {
	            throw new TypeError('Could not properly parse response.');
	          }
	        }).then(function (json) {
	          resolve(json.serverAddress);
	        }).catch(function (error) {
	          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	          console.error('[PublisherStreamManagerTest] :: Error - Could not request Origin IP from Stream Manager. ' + jsonError);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'preview',
	    value: function preview() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var publisher = new red5prosdk.RTCPublisher();
	        var view = new red5prosdk.PublisherView('red5pro-publisher');
	        navigator.getUserMedia({
	          audio: !comp.props.settings.audioOn ? false : true,
	          video: !comp.props.settings.videoOn ? false : true
	        }, function (media) {
	
	          // Upon access of user media,
	          // 1. Attach the stream to the publisher.
	          // 2. Show the stream as preview in view instance.
	          publisher.attachStream(media);
	          view.preview(media, true);
	
	          comp.setState(function (state) {
	            state.publisher = publisher;
	            state.view = view;
	            return state;
	          });
	
	          resolve();
	        }, function (error) {
	          console.error('[PublisherStreamManagerTest] :: Error - ' + error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'publish',
	    value: function publish(serverHost) {
	      var comp = this;
	      var iceServers = this.props.settings.iceServers;
	      var publisher = this.state.publisher;
	      var view = this.state.view;
	      view.attachPublisher(publisher);
	
	      comp.setState(function (state) {
	        state.status = 'Establishing connection on ' + serverHost + '...';
	      });
	
	      // Initialize
	      publisher.init({
	        protocol: 'ws',
	        host: serverHost,
	        port: this.props.settings.rtcport,
	        app: this.props.settings.context,
	        streamName: this.props.settings.stream1,
	        streamType: 'webrtc',
	        iceServers: iceServers
	      }).then(function () {
	        // Invoke the publish action
	        comp.setState(function (state) {
	          state.status = 'Starting publish session...';
	        });
	        return publisher.publish();
	      }).then(function () {
	        comp.setState(function (state) {
	          state.status = 'Publishing started. You\'re Live!';
	        });
	      }).catch(function (error) {
	        // A fault occurred while trying to initialize and publish the stream.
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        comp.setState(function (state) {
	          state.status = 'ERROR: ' + jsonError;
	        });
	        console.error('[PublisherStreamManagerTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'unpublish',
	    value: function unpublish() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var view = comp.state.view;
	        var publisher = comp.state.publisher;
	        if (publisher) {
	          publisher.unpublish().then(function () {
	            view.view.src = '';
	            publisher.setView(undefined);
	            comp.setState(function (state) {
	              state.publisher = undefined;
	              state.view = undefined;
	              state.selectedCamera = undefined;
	              return state;
	            });
	            resolve();
	          }).catch(function (error) {
	            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	            console.error('[PublishTest] :: Unmount Error = ' + jsonError);
	            reject(error);
	          });
	        } else {
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var comp = this;
	      var pub = this.publish.bind(this);
	      var getOrigin = this.requestOrigin.bind(this);
	      this.preview().then(getOrigin).then(pub).catch(function () {
	        comp.setState(function (state) {
	          state.status = 'Error - Could not start publishing session.';
	        });
	        console.error('[PublishTest] :: Error - Could not start publishing session.');
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unpublish();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var videoStyle = {
	        'width': '100%',
	        'max-width': '640px'
	      };
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Test'
	        ),
	        _react2.default.createElement('hr', null),
	        _react2.default.createElement(
	          'h2',
	          { className: 'centered' },
	          _react2.default.createElement(
	            'em',
	            null,
	            'stream'
	          ),
	          ': ',
	          this.props.settings.stream1
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'centered publish-status-field' },
	          'STATUS: ',
	          this.state.status
	        ),
	        _react2.default.createElement(
	          'div',
	          { ref: function ref(c) {
	              return _this2._videoContainer = c;
	            },
	            id: 'video-container',
	            className: 'centered' },
	          _react2.default.createElement('video', { ref: function ref(c) {
	              return _this2._red5ProPublisher = c;
	            },
	            id: 'red5pro-publisher',
	            style: videoStyle,
	            controls: true, autoplay: true, disabled: true })
	        )
	      );
	    }
	  }]);
	
	  return PublisherStreamManagerTest;
	}(_react2.default.Component);
	
	PublisherStreamManagerTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = PublisherStreamManagerTest;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(28);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(32);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	// eslint-disable-line no-unused-vars
	
	var SubscriberTest = function (_React$Component) {
	  _inherits(SubscriberTest, _React$Component);
	
	  function SubscriberTest(props) {
	    _classCallCheck(this, SubscriberTest);
	
	    var _this = _possibleConstructorReturn(this, (SubscriberTest.__proto__ || Object.getPrototypeOf(SubscriberTest)).call(this, props));
	
	    _this.state = {
	      view: undefined,
	      subscriber: undefined,
	      status: 'On Hold.'
	    };
	    return _this;
	  }
	
	  _createClass(SubscriberTest, [{
	    key: 'subscribe',
	    value: function subscribe() {
	      var comp = this;
	      var view = new red5prosdk.PlaybackView('red5pro-subscriber');
	      var subscriber = new red5prosdk.RTCSubscriber();
	      var iceServers = [{ urls: 'stun:stun2.l.google.com:19302' }];
	
	      var origAttachStream = view.attachStream.bind(view);
	      view.attachStream = function (stream, autoplay) {
	        comp.setState(function (state) {
	          state.status = 'Subscribed. They\'re Live!';
	        });
	        origAttachStream(stream, autoplay);
	        view.attachStream = origAttachStream;
	      };
	
	      comp.setState(function (state) {
	        state.status = 'Establishing connection...';
	      });
	      view.attachSubscriber(subscriber);
	      subscriber.init({
	        protocol: 'ws',
	        host: this.props.settings.host,
	        port: this.props.settings.rtcport,
	        app: this.props.settings.context,
	        subscriptionId: 'subscriber-' + Math.floor(Math.random() * 0x10000).toString(16),
	        streamName: this.props.settings.stream1,
	        iceServers: iceServers,
	        bandwidth: {
	          audio: 50,
	          video: 256,
	          data: 30 * 1000 * 1000
	        }
	      }).then(function (player) {
	        comp.setState(function (state) {
	          state.view = view;
	          state.subscriber = subscriber;
	        });
	        comp.setState(function (state) {
	          state.status = 'Negotating connection...';
	        });
	        return player.play();
	      }).then(function () {
	        comp.setState(function (state) {
	          state.status = 'Requesting stream for playback...';
	        });
	      }).catch(function (error) {
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        console.error('[SubscriberTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.subscribe();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var comp = this;
	      var view = comp.state.view;
	      var subscriber = comp.state.subscriber;
	      if (subscriber) {
	        subscriber.stop().then(function () {
	          view.view.src = '';
	          subscriber.setView(undefined);
	          comp.setState(function (state) {
	            state.view = undefined;
	            state.subscriber = undefined;
	          });
	        }).catch(function (error) {
	          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	          console.error('[SubscriberTest] :: Unmount Error = ' + jsonError);
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var videoStyle = {
	        'width': '100%',
	        'max-width': '640px'
	      };
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Subscriber Test'
	        ),
	        _react2.default.createElement('hr', null),
	        _react2.default.createElement(
	          'h2',
	          { className: 'centered' },
	          _react2.default.createElement(
	            'em',
	            null,
	            'stream'
	          ),
	          ': ',
	          this.props.settings.stream1
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'centered subscriber-status-field' },
	          'STATUS: ',
	          this.state.status
	        ),
	        _react2.default.createElement(
	          'div',
	          { ref: function ref(c) {
	              return _this2._videoContainer = c;
	            },
	            id: 'video-container',
	            className: 'centered' },
	          _react2.default.createElement('video', { ref: function ref(c) {
	              return _this2._red5ProSubscriber = c;
	            },
	            id: 'red5pro-subscriber',
	            style: videoStyle,
	            controls: true, autoplay: true })
	        )
	      );
	    }
	  }]);
	
	  return SubscriberTest;
	}(_react2.default.Component);
	
	SubscriberTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = SubscriberTest;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(28);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(32);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	// eslint-disable-line no-unused-vars
	
	var SubscriberFailoverTest = function (_React$Component) {
	  _inherits(SubscriberFailoverTest, _React$Component);
	
	  function SubscriberFailoverTest(props) {
	    _classCallCheck(this, SubscriberFailoverTest);
	
	    var _this = _possibleConstructorReturn(this, (SubscriberFailoverTest.__proto__ || Object.getPrototypeOf(SubscriberFailoverTest)).call(this, props));
	
	    _this.state = {
	      view: undefined,
	      subscriber: undefined,
	      status: 'On hold.'
	    };
	    return _this;
	  }
	
	  _createClass(SubscriberFailoverTest, [{
	    key: 'subscribe',
	    value: function subscribe() {
	      var comp = this;
	      var view = new red5prosdk.PlaybackView('red5pro-subscriber');
	      var subscriber = new red5prosdk.Red5ProSubscriber();
	      var iceServers = [{ urls: 'stun:stun2.l.google.com:19302' }];
	      var subscribeOrder = this.props.settings.subscriberFailoverOrder.split(',').map(function (item) {
	        return item.trim();
	      });
	
	      var origAttachStream = view.attachStream.bind(view);
	      view.attachStream = function (stream, autoplay) {
	        var type = comp.state.subscriber.getType();
	        comp.setState(function (state) {
	          state.status = type + ' Subscribed. They\'re Live!';
	        });
	        origAttachStream(stream, autoplay);
	        view.attachStream = origAttachStream;
	      };
	
	      var rtcConfig = {
	        protocol: 'ws',
	        host: this.props.settings.host,
	        port: this.props.settings.rtcport,
	        app: this.props.settings.context,
	        subscriptionId: 'subscriber-' + Math.floor(Math.random() * 0x10000).toString(16),
	        streamName: this.props.settings.stream1,
	        iceServers: iceServers,
	        bandwidth: {
	          audio: 50,
	          video: 256,
	          data: 30 * 1000 * 1000
	        }
	      };
	      var rtmpConfig = {
	        protocol: 'rtmp',
	        host: this.props.settings.host,
	        port: this.props.settings.rtmpport,
	        app: this.props.settings.context,
	        streamName: this.props.settings.stream1,
	        mimeType: 'rtmp/flv',
	        useVideoJS: false,
	        swf: 'lib/red5pro/red5pro-subscriber.swf'
	      };
	      var hlsConfig = {
	        protocol: 'http',
	        host: this.props.settings.host,
	        port: this.props.settings.hlsport,
	        app: this.props.settings.context,
	        streamName: this.props.settings.stream1,
	        mimeType: 'application/x-mpegURL',
	        swf: 'lib/red5pro/red5pro-video-js.swf'
	      };
	
	      comp.setState(function (state) {
	        state.status = 'Establishing connection...';
	      });
	      view.attachSubscriber(subscriber);
	
	      subscriber.setPlaybackOrder(subscribeOrder).init({
	        rtc: rtcConfig,
	        rtmp: rtmpConfig,
	        hls: hlsConfig
	      }).then(function (player) {
	        comp.setState(function (state) {
	          state.view = view;
	          state.subscriber = player;
	        });
	        var type = player.getType();
	        comp.setState(function (state) {
	          state.status = 'Negotating ' + type + ' connection...';
	        });
	        return player.play();
	      }).then(function () {
	        var type = comp.state.subscriber.getType();
	        comp.setState(function (state) {
	          state.status = 'Requesting ' + type + ' stream for playback...';
	        });
	      }).catch(function (error) {
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        comp.setState(function (state) {
	          state.status = 'Error: ' + jsonError;
	        });
	        console.error('[SubscriberTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.subscribe();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var comp = this;
	      var view = comp.state.view;
	      var subscriber = comp.state.subscriber;
	      if (subscriber) {
	        subscriber.stop().then(function () {
	          view.view.src = '';
	          subscriber.setView(undefined);
	          comp.setState(function (state) {
	            state.view = undefined;
	            state.subscriber = undefined;
	          });
	        }).catch(function (error) {
	          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	          console.error('[SubscriberTest] :: Unmount Error = ' + jsonError);
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var videoStyle = {
	        'width': '100%',
	        'max-width': '640px',
	        'height': '300px'
	      };
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Subscriber Test'
	        ),
	        _react2.default.createElement('hr', null),
	        _react2.default.createElement(
	          'h2',
	          { className: 'centered' },
	          _react2.default.createElement(
	            'em',
	            null,
	            'stream'
	          ),
	          ': ',
	          this.props.settings.stream1
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'centered subscriber-status-field' },
	          'STATUS: ',
	          this.state.status
	        ),
	        _react2.default.createElement(
	          'div',
	          _defineProperty({ className: 'centered', ref: function ref(c) {
	              return _this2._videoContainer = c;
	            },
	            id: 'video-container'
	          }, 'className', 'centered'),
	          _react2.default.createElement('video', { className: 'video-js vjs-default-skin', ref: function ref(c) {
	              return _this2._red5ProSubscriber = c;
	            },
	            id: 'red5pro-subscriber',
	            style: videoStyle,
	            controls: true, autoplay: true })
	        )
	      );
	    }
	  }]);
	
	  return SubscriberFailoverTest;
	}(_react2.default.Component);
	
	SubscriberFailoverTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = SubscriberFailoverTest;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(28);
	
	var App = function App(_ref) {
	  var page = _ref.page;
	  return React.createElement(
	    "div",
	    null,
	    React.createElement(
	      "p",
	      { className: "version-field" },
	      "Testbed Version: ",
	      ("1.0.0")
	    ),
	    _react.Children.only(page)
	  );
	}; /* global TESTBED_VERSION */
	// TESTBED_VERSION injected from webpack.
	exports.default = App;

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = {
		"settings": {
			"host": "localhost",
			"port": 8554,
			"rtcport": 8081,
			"rtmpport": 1935,
			"hlsport": 5080,
			"stream1": "stream1",
			"stream2": "stream2",
			"context": "live",
			"cameraWidth": 854,
			"cameraHeight": 480,
			"videoOn": true,
			"audioOn": true,
			"buffer": 0.5,
			"bitrate": 1000,
			"publisherFailoverOrder": "rtc,rtmp",
			"subscriberFailoverOrder": "rtc,rtmp,hls",
			"iceServers": [
				{
					"urls": "stun:stun2.l.google.com:19302"
				}
			]
		},
		"tests": [
			{
				"name": "Home"
			},
			{
				"name": "Publish"
			},
			{
				"name": "Publish - 1080p",
				"description": "Demonstration of assigning 1080p resolution to publishing."
			},
			{
				"name": "Publish - Failover",
				"description": "Demonstrates failover of browser support for publishing."
			},
			{
				"name": "Publish - Audio Mode",
				"description": "Demonstrates Audio-Only broadcast for publishing."
			},
			{
				"name": "Publish - Camera Source",
				"description": "Demonstrates selection of camera source for publishing."
			},
			{
				"name": "Publish - Camera Swap",
				"description": "Demonstrates swap of camera in front to rear where supported on device browser."
			},
			{
				"name": "Publish - Image Capture",
				"description": "Demonstrates capturing an image of live video."
			},
			{
				"name": "Publish - Stream Manager",
				"description": "Demonstrates accessing target origin for broadcast using Stream Manager."
			},
			{
				"name": "Subscribe"
			},
			{
				"name": "Subscribe - Failover",
				"description": "Demonstrates failover of browser support for subscribing."
			}
		]
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMDhkMDgxYWVjYjc5OGRmOWM0ZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RET01cIiIsIndlYnBhY2s6Ly8vLi9+L3JlZHV4L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZHV4L2xpYi9jcmVhdGVTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc1BsYWluT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19nZXRQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX292ZXJBcmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovLy8uL34vc3ltYm9sLW9ic2VydmFibGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvcG9ueWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWR1eC9saWIvY29tYmluZVJlZHVjZXJzLmpzIiwid2VicGFjazovLy8uL34vcmVkdXgvbGliL3V0aWxzL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWR1eC9saWIvYmluZEFjdGlvbkNyZWF0b3JzLmpzIiwid2VicGFjazovLy8uL34vcmVkdXgvbGliL2FwcGx5TWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZHV4L2xpYi9jb21wb3NlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0UmVkdXhcIiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZHVjZXJzL3NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9yZWR1Y2Vycy92aWV3LWZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udGFpbmVycy9BcHBDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NlbGVjdG9ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3Jlc2VsZWN0L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udGFpbmVycy9UZXN0TGlzdENvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9UZXN0TGlzdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdFwiIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL1Rlc3RMaXN0SXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udGFpbmVycy9TZXR0aW5nc0Zvcm1Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvU2V0dGluZ3NGb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL0JhY2tMaW5rLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb250YWluZXJzL3Rlc3QvVGVzdENvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvUHVibGlzaGVyVGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L1B1Ymxpc2hlcjEwODBwVGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L1B1Ymxpc2hlckF1ZGlvT25seVRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9QdWJsaXNoZXJDYW1lcmFTb3VyY2VUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvUHVibGlzaGVyQ2FtZXJhU3dhcFRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9QdWJsaXNoZXJGaWx0ZXJzVGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L1B1Ymxpc2hlckZhaWxvdmVyVGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L1B1Ymxpc2hlckltYWdlQ2FwdHVyZVRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9QdWJsaXNoZXJTdHJlYW1NYW5hZ2VyVGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L1N1YnNjcmliZXJUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvU3Vic2NyaWJlckZhaWxvdmVyVGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Jlc291cmNlL3Rlc3RiZWQuanNvbiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguaHRtbCJdLCJuYW1lcyI6WyJzdG9yZSIsInZpZXdGaWx0ZXIiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFN0YXRlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRlc3RiZWRBcHAiLCJzZXR0aW5ncyIsInRlc3RzIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwia2V5IiwidmFsdWUiLCJzZXR0aW5nc1VwZGF0ZSIsIlNFVFRJTkdTX1VQREFURSIsIlZJRVdfQ0hBTkdFIiwiY2hhbmdlU2V0dGluZyIsImNoYW5nZVZpZXciLCJuYW1lIiwiZmlsdGVyIiwibWFwU3RhdGVUb1Byb3BzIiwicGFnZSIsIkFwcENvbnRhaW5lciIsImdldFZpZXdGaWx0ZXIiLCJnZXRDdXJyZW50UGFnZSIsInRvTG93ZXJDYXNlIiwiUHVibGlzaGVyVGVzdCIsIlN1YnNjcmliZXJUZXN0IiwiUHVibGlzaGVyMTA4MHBUZXN0IiwiUHVibGlzaGVyRmFpbG92ZXJUZXN0IiwiU3Vic2NyaWJlckZhaWxvdmVyVGVzdCIsIlB1Ymxpc2hlckF1ZGlvT25seVRlc3QiLCJQdWJsaXNoZXJDYW1lcmFTb3VyY2VUZXN0IiwiUHVibGlzaGVyQ2FtZXJhU3dhcFRlc3QiLCJQdWJsaXNoZXJGaWx0ZXJzVGVzdCIsIlB1Ymxpc2hlckltYWdlQ2FwdHVyZVRlc3QiLCJQdWJsaXNoZXJTdHJlYW1NYW5hZ2VyVGVzdCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwib25UZXN0TGlzdEl0ZW1DbGljayIsIlRlc3RMaXN0Q29udGFpbmVyIiwiVGVzdExpc3QiLCJtYXAiLCJ0ZXN0IiwicHJvcFR5cGVzIiwiYXJyYXlPZiIsInNoYXBlIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsIm1vZHVsZSIsImRlc2NyaXB0aW9uIiwiZnVuYyIsIlRlc3RMaXN0SXRlbSIsIm9uQ2xpY2siLCJvbkJhY2tDbGljayIsIm9uRmllbGRDaGFuZ2UiLCJTZXR0aW5nc0Zvcm1Db250YWluZXIiLCJTZXR0aW5nc0Zvcm0iLCJwcm9wcyIsIl9yZWYiLCJ2YWx1ZTEiLCJfc3RyZWFtMSIsInZhbHVlMiIsIl9zdHJlYW0yIiwiYyIsIl9ob3N0IiwiaG9zdCIsInN0cmVhbTEiLCJzd2FwU3RyZWFtTmFtZXMiLCJiaW5kIiwic3RyZWFtMiIsIkNvbXBvbmVudCIsIm9iamVjdCIsIkJhY2tMaW5rIiwidGFyZ2V0VGVzdCIsIlRlc3RDb250YWluZXIiLCJkZWZhdWx0IiwidmlldyIsInVuZGVmaW5lZCIsInB1Ymxpc2hlciIsInN0YXR1cyIsImNvbXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlZDVwcm9zZGsiLCJSVENQdWJsaXNoZXIiLCJQdWJsaXNoZXJWaWV3IiwibmF2aWdhdG9yIiwiZ2V0VXNlck1lZGlhIiwiYXVkaW8iLCJhdWRpb09uIiwidmlkZW8iLCJ2aWRlb09uIiwiYXR0YWNoU3RyZWFtIiwibWVkaWEiLCJwcmV2aWV3Iiwic2V0U3RhdGUiLCJlcnJvciIsImljZVNlcnZlcnMiLCJhdHRhY2hQdWJsaXNoZXIiLCJpbml0IiwicHJvdG9jb2wiLCJwb3J0IiwicnRjcG9ydCIsImFwcCIsImNvbnRleHQiLCJzdHJlYW1OYW1lIiwic3RyZWFtVHlwZSIsInRoZW4iLCJwdWJsaXNoIiwiY2F0Y2giLCJqc29uRXJyb3IiLCJ1bnB1Ymxpc2giLCJzcmMiLCJzZXRWaWV3Iiwic2VsZWN0ZWRDYW1lcmEiLCJwdWIiLCJ2aWRlb1N0eWxlIiwiX3ZpZGVvQ29udGFpbmVyIiwiX3JlZDVQcm9QdWJsaXNoZXIiLCJ3aWR0aCIsImhlaWdodCIsIlNFTEVDVF9ERUZBVUxUIiwiY2FtZXJhcyIsImxhYmVsIiwibWVkaWFEZXZpY2VzIiwiZW51bWVyYXRlRGV2aWNlcyIsInZpZGVvQ2FtZXJhcyIsImRldmljZXMiLCJpdGVtIiwia2luZCIsImNvbmNhdCIsIm1lZGlhRGV2aWNlSWQiLCJjcmVhdGVQcm9taXNlIiwiZ21kIiwibWVkaWFEZXZpY2UiLCJvcHRpb25hbCIsInNvdXJjZUlkIiwiY2FtZXJhU2VsZWN0ZWQiLCJfY2FtZXJhU2VsZWN0Iiwid2FpdEZvclNlbGVjdCIsImxhYmVsU3R5bGUiLCJjYW1lcmFTZWxlY3RGaWVsZCIsIm9uQ2FtZXJhU2VsZWN0IiwiY2FtZXJhIiwiZGV2aWNlSWQiLCJGQUNJTkdfTU9ERV9GUk9OVCIsIkZBQ0lOR19NT0RFX1JFQVIiLCJmYWNpbmdNb2RlRnJvbnQiLCJzdXBwb3J0ZWQiLCJmYWNpbmdNb2RlIiwiZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMiLCJwcmV2IiwiaGludENsYXNzIiwiam9pbiIsInN1cHBvcnRlZFN0ciIsIm9uQ2FtZXJhU3dhcFJlcXVlc3QiLCJGSUxURVJfU0VMRUNUIiwiZmlsdGVycyIsInZpZGVvQ2xhc3NMaXN0Iiwic2VsZWN0ZWRGaWx0ZXIiLCJfZmlsdGVyU2VsZWN0IiwiY2xhc3NMaXN0IiwiZmlsdGVyU2VsZWN0RmllbGQiLCJvbkZpbHRlclNlbGVjdCIsIlJlZDVQcm9QdWJsaXNoZXIiLCJydGNDb25maWciLCJydG1wQ29uZmlnIiwicnRtcHBvcnQiLCJzd2YiLCJwdWJsaXNoT3JkZXIiLCJwdWJsaXNoZXJGYWlsb3Zlck9yZGVyIiwic3BsaXQiLCJ0cmltIiwic2V0UHVibGlzaE9yZGVyIiwicnRjIiwicnRtcCIsInNlbGVjdGVkUHVibGlzaGVyIiwiZ2V0VHlwZSIsInB1Ymxpc2hUeXBlcyIsIlJUQyIsImNsZWFyQ2FudmFzIiwiZHJhd09uQ2FudmFzIiwiY2FudmFzIiwiX2NhcHR1cmVDYW52YXMiLCJnZXRDb250ZXh0IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsInRhcmdldEVsZW1lbnQiLCJkcmF3SW1hZ2UiLCJvblZpZGVvSW1hZ2VDYXB0dXJlIiwidXJsIiwiZmV0Y2giLCJyZXMiLCJoZWFkZXJzIiwiZ2V0IiwiaW5kZXhPZiIsImpzb24iLCJUeXBlRXJyb3IiLCJzZXJ2ZXJBZGRyZXNzIiwic2VydmVySG9zdCIsImdldE9yaWdpbiIsInJlcXVlc3RPcmlnaW4iLCJzdWJzY3JpYmVyIiwiUGxheWJhY2tWaWV3IiwiUlRDU3Vic2NyaWJlciIsInVybHMiLCJvcmlnQXR0YWNoU3RyZWFtIiwic3RyZWFtIiwiYXV0b3BsYXkiLCJhdHRhY2hTdWJzY3JpYmVyIiwic3Vic2NyaXB0aW9uSWQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsImJhbmR3aWR0aCIsImRhdGEiLCJwbGF5ZXIiLCJwbGF5Iiwic3Vic2NyaWJlIiwic3RvcCIsIl9yZWQ1UHJvU3Vic2NyaWJlciIsIlJlZDVQcm9TdWJzY3JpYmVyIiwic3Vic2NyaWJlT3JkZXIiLCJzdWJzY3JpYmVyRmFpbG92ZXJPcmRlciIsIm1pbWVUeXBlIiwidXNlVmlkZW9KUyIsImhsc0NvbmZpZyIsImhsc3BvcnQiLCJzZXRQbGF5YmFja09yZGVyIiwiaGxzIiwiQXBwIiwiVEVTVEJFRF9WRVJTSU9OIiwib25seSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OzttUUNwQ3VDO0FBRWM7O0FBSnJEOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRUEsS0FBTUEsUUFBUTtBQUVaQyxlQUFZO0FBRkEsSUFBZDs7QUFLQUMsU0FBUUMsR0FBUixDQUFZLGlCQUFpQkMsS0FBS0MsU0FBTCxDQUFlTCxNQUFNTSxRQUFOLEVBQWYsRUFBaUMsSUFBakMsRUFBdUMsQ0FBdkMsQ0FBN0I7O0FBRUEsdUJBQ0U7QUFBQTtBQUFBLEtBQVUsT0FBT04sS0FBakI7QUFDRTtBQURGLEVBREYsRUFJRU8sU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUpGLEU7Ozs7OztBQ2ZBLGdEOzs7Ozs7QUNBQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsa0JBQWtCOztBQUUvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDOzs7Ozs7O0FDN0NBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVU7Ozs7Ozs7QUNuTHRDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7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RztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ25FQSx1RCIsImZpbGUiOiJzY3JpcHQvcmVkNXByby10ZXN0YmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiUmVhY3RET01cIiksIHJlcXVpcmUoXCJSZWFjdFJlZHV4XCIpLCByZXF1aXJlKFwiUmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiUmVhY3RET01cIiwgXCJSZWFjdFJlZHV4XCIsIFwiUmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wicmVkNXByb3Rlc3RiZWRcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdERPTVwiKSwgcmVxdWlyZShcIlJlYWN0UmVkdXhcIiksIHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wicmVkNXByb3Rlc3RiZWRcIl0gPSBmYWN0b3J5KHJvb3RbXCJSZWFjdERPTVwiXSwgcm9vdFtcIlJlYWN0UmVkdXhcIl0sIHJvb3RbXCJSZWFjdFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xOF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzI4X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGMwOGQwODFhZWNiNzk4ZGY5YzRlXG4gKiovIiwiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCByZWR1Y2VyIGZyb20gJy4vcmVkdWNlcnMnXG5pbXBvcnQgQXBwQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9BcHBDb250YWluZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuaW1wb3J0IHRlc3RiZWQgZnJvbSBcIi4uL3Jlc291cmNlL3Rlc3RiZWQuanNvblwiXG5cbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlciwge1xuICAuLi50ZXN0YmVkLFxuICB2aWV3RmlsdGVyOiAnSG9tZSdcbn0pXG5cbmNvbnNvbGUubG9nKCdbaW5kZXhdOlxcclxcbicgKyBKU09OLnN0cmluZ2lmeShzdG9yZS5nZXRTdGF0ZSgpLCBudWxsLCAyKSlcblxucmVuZGVyKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8QXBwQ29udGFpbmVyIC8+XG4gIDwvUHJvdmlkZXI+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbilcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJSZWFjdERPTVwiXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5jb21wb3NlID0gZXhwb3J0cy5hcHBseU1pZGRsZXdhcmUgPSBleHBvcnRzLmJpbmRBY3Rpb25DcmVhdG9ycyA9IGV4cG9ydHMuY29tYmluZVJlZHVjZXJzID0gZXhwb3J0cy5jcmVhdGVTdG9yZSA9IHVuZGVmaW5lZDtcblxudmFyIF9jcmVhdGVTdG9yZSA9IHJlcXVpcmUoJy4vY3JlYXRlU3RvcmUnKTtcblxudmFyIF9jcmVhdGVTdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVTdG9yZSk7XG5cbnZhciBfY29tYmluZVJlZHVjZXJzID0gcmVxdWlyZSgnLi9jb21iaW5lUmVkdWNlcnMnKTtcblxudmFyIF9jb21iaW5lUmVkdWNlcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tYmluZVJlZHVjZXJzKTtcblxudmFyIF9iaW5kQWN0aW9uQ3JlYXRvcnMgPSByZXF1aXJlKCcuL2JpbmRBY3Rpb25DcmVhdG9ycycpO1xuXG52YXIgX2JpbmRBY3Rpb25DcmVhdG9yczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iaW5kQWN0aW9uQ3JlYXRvcnMpO1xuXG52YXIgX2FwcGx5TWlkZGxld2FyZSA9IHJlcXVpcmUoJy4vYXBwbHlNaWRkbGV3YXJlJyk7XG5cbnZhciBfYXBwbHlNaWRkbGV3YXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FwcGx5TWlkZGxld2FyZSk7XG5cbnZhciBfY29tcG9zZSA9IHJlcXVpcmUoJy4vY29tcG9zZScpO1xuXG52YXIgX2NvbXBvc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9zZSk7XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuLypcbiogVGhpcyBpcyBhIGR1bW15IGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBmdW5jdGlvbiBuYW1lIGhhcyBiZWVuIGFsdGVyZWQgYnkgbWluaWZpY2F0aW9uLlxuKiBJZiB0aGUgZnVuY3Rpb24gaGFzIGJlZW4gbWluaWZpZWQgYW5kIE5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsIHdhcm4gdGhlIHVzZXIuXG4qL1xuZnVuY3Rpb24gaXNDcnVzaGVkKCkge31cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGlzQ3J1c2hlZC5uYW1lID09PSAnc3RyaW5nJyAmJiBpc0NydXNoZWQubmFtZSAhPT0gJ2lzQ3J1c2hlZCcpIHtcbiAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSgnWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgbWluaWZpZWQgY29kZSBvdXRzaWRlIG9mIE5PREVfRU5WID09PSBcXCdwcm9kdWN0aW9uXFwnLiAnICsgJ1RoaXMgbWVhbnMgdGhhdCB5b3UgYXJlIHJ1bm5pbmcgYSBzbG93ZXIgZGV2ZWxvcG1lbnQgYnVpbGQgb2YgUmVkdXguICcgKyAnWW91IGNhbiB1c2UgbG9vc2UtZW52aWZ5IChodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9sb29zZS1lbnZpZnkpIGZvciBicm93c2VyaWZ5ICcgKyAnb3IgRGVmaW5lUGx1Z2luIGZvciB3ZWJwYWNrIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwMDMwMDMxKSAnICsgJ3RvIGVuc3VyZSB5b3UgaGF2ZSB0aGUgY29ycmVjdCBjb2RlIGZvciB5b3VyIHByb2R1Y3Rpb24gYnVpbGQuJyk7XG59XG5cbmV4cG9ydHMuY3JlYXRlU3RvcmUgPSBfY3JlYXRlU3RvcmUyWydkZWZhdWx0J107XG5leHBvcnRzLmNvbWJpbmVSZWR1Y2VycyA9IF9jb21iaW5lUmVkdWNlcnMyWydkZWZhdWx0J107XG5leHBvcnRzLmJpbmRBY3Rpb25DcmVhdG9ycyA9IF9iaW5kQWN0aW9uQ3JlYXRvcnMyWydkZWZhdWx0J107XG5leHBvcnRzLmFwcGx5TWlkZGxld2FyZSA9IF9hcHBseU1pZGRsZXdhcmUyWydkZWZhdWx0J107XG5leHBvcnRzLmNvbXBvc2UgPSBfY29tcG9zZTJbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWR1eC9saWIvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5BY3Rpb25UeXBlcyA9IHVuZGVmaW5lZDtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNyZWF0ZVN0b3JlO1xuXG52YXIgX2lzUGxhaW5PYmplY3QgPSByZXF1aXJlKCdsb2Rhc2gvaXNQbGFpbk9iamVjdCcpO1xuXG52YXIgX2lzUGxhaW5PYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQbGFpbk9iamVjdCk7XG5cbnZhciBfc3ltYm9sT2JzZXJ2YWJsZSA9IHJlcXVpcmUoJ3N5bWJvbC1vYnNlcnZhYmxlJyk7XG5cbnZhciBfc3ltYm9sT2JzZXJ2YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2xPYnNlcnZhYmxlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4vKipcbiAqIFRoZXNlIGFyZSBwcml2YXRlIGFjdGlvbiB0eXBlcyByZXNlcnZlZCBieSBSZWR1eC5cbiAqIEZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB5b3UgbXVzdCByZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGUuXG4gKiBJZiB0aGUgY3VycmVudCBzdGF0ZSBpcyB1bmRlZmluZWQsIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAqIERvIG5vdCByZWZlcmVuY2UgdGhlc2UgYWN0aW9uIHR5cGVzIGRpcmVjdGx5IGluIHlvdXIgY29kZS5cbiAqL1xudmFyIEFjdGlvblR5cGVzID0gZXhwb3J0cy5BY3Rpb25UeXBlcyA9IHtcbiAgSU5JVDogJ0BAcmVkdXgvSU5JVCdcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIFJlZHV4IHN0b3JlIHRoYXQgaG9sZHMgdGhlIHN0YXRlIHRyZWUuXG4gKiBUaGUgb25seSB3YXkgdG8gY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBpcyB0byBjYWxsIGBkaXNwYXRjaCgpYCBvbiBpdC5cbiAqXG4gKiBUaGVyZSBzaG91bGQgb25seSBiZSBhIHNpbmdsZSBzdG9yZSBpbiB5b3VyIGFwcC4gVG8gc3BlY2lmeSBob3cgZGlmZmVyZW50XG4gKiBwYXJ0cyBvZiB0aGUgc3RhdGUgdHJlZSByZXNwb25kIHRvIGFjdGlvbnMsIHlvdSBtYXkgY29tYmluZSBzZXZlcmFsIHJlZHVjZXJzXG4gKiBpbnRvIGEgc2luZ2xlIHJlZHVjZXIgZnVuY3Rpb24gYnkgdXNpbmcgYGNvbWJpbmVSZWR1Y2Vyc2AuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmV4dCBzdGF0ZSB0cmVlLCBnaXZlblxuICogdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGFjdGlvbiB0byBoYW5kbGUuXG4gKlxuICogQHBhcmFtIHthbnl9IFtwcmVsb2FkZWRTdGF0ZV0gVGhlIGluaXRpYWwgc3RhdGUuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gKiB0byBoeWRyYXRlIHRoZSBzdGF0ZSBmcm9tIHRoZSBzZXJ2ZXIgaW4gdW5pdmVyc2FsIGFwcHMsIG9yIHRvIHJlc3RvcmUgYVxuICogcHJldmlvdXNseSBzZXJpYWxpemVkIHVzZXIgc2Vzc2lvbi5cbiAqIElmIHlvdSB1c2UgYGNvbWJpbmVSZWR1Y2Vyc2AgdG8gcHJvZHVjZSB0aGUgcm9vdCByZWR1Y2VyIGZ1bmN0aW9uLCB0aGlzIG11c3QgYmVcbiAqIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlIGFzIGBjb21iaW5lUmVkdWNlcnNgIGtleXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5oYW5jZXIgVGhlIHN0b3JlIGVuaGFuY2VyLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICogdG8gZW5oYW5jZSB0aGUgc3RvcmUgd2l0aCB0aGlyZC1wYXJ0eSBjYXBhYmlsaXRpZXMgc3VjaCBhcyBtaWRkbGV3YXJlLFxuICogdGltZSB0cmF2ZWwsIHBlcnNpc3RlbmNlLCBldGMuIFRoZSBvbmx5IHN0b3JlIGVuaGFuY2VyIHRoYXQgc2hpcHMgd2l0aCBSZWR1eFxuICogaXMgYGFwcGx5TWlkZGxld2FyZSgpYC5cbiAqXG4gKiBAcmV0dXJucyB7U3RvcmV9IEEgUmVkdXggc3RvcmUgdGhhdCBsZXRzIHlvdSByZWFkIHRoZSBzdGF0ZSwgZGlzcGF0Y2ggYWN0aW9uc1xuICogYW5kIHN1YnNjcmliZSB0byBjaGFuZ2VzLlxuICovXG5mdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgdmFyIF9yZWYyO1xuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAndW5kZWZpbmVkJykge1xuICAgIGVuaGFuY2VyID0gcHJlbG9hZGVkU3RhdGU7XG4gICAgcHJlbG9hZGVkU3RhdGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGVuaGFuY2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuaGFuY2VyKGNyZWF0ZVN0b3JlKShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSByZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgY3VycmVudFJlZHVjZXIgPSByZWR1Y2VyO1xuICB2YXIgY3VycmVudFN0YXRlID0gcHJlbG9hZGVkU3RhdGU7XG4gIHZhciBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gIHZhciBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycztcbiAgdmFyIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCkge1xuICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycy5zbGljZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cbiAgICpcbiAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hhbmdlIGxpc3RlbmVyLiBJdCB3aWxsIGJlIGNhbGxlZCBhbnkgdGltZSBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCxcbiAgICogYW5kIHNvbWUgcGFydCBvZiB0aGUgc3RhdGUgdHJlZSBtYXkgcG90ZW50aWFsbHkgaGF2ZSBjaGFuZ2VkLiBZb3UgbWF5IHRoZW5cbiAgICogY2FsbCBgZ2V0U3RhdGUoKWAgdG8gcmVhZCB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGluc2lkZSB0aGUgY2FsbGJhY2suXG4gICAqXG4gICAqIFlvdSBtYXkgY2FsbCBgZGlzcGF0Y2goKWAgZnJvbSBhIGNoYW5nZSBsaXN0ZW5lciwgd2l0aCB0aGUgZm9sbG93aW5nXG4gICAqIGNhdmVhdHM6XG4gICAqXG4gICAqIDEuIFRoZSBzdWJzY3JpcHRpb25zIGFyZSBzbmFwc2hvdHRlZCBqdXN0IGJlZm9yZSBldmVyeSBgZGlzcGF0Y2goKWAgY2FsbC5cbiAgICogSWYgeW91IHN1YnNjcmliZSBvciB1bnN1YnNjcmliZSB3aGlsZSB0aGUgbGlzdGVuZXJzIGFyZSBiZWluZyBpbnZva2VkLCB0aGlzXG4gICAqIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdCBvbiB0aGUgYGRpc3BhdGNoKClgIHRoYXQgaXMgY3VycmVudGx5IGluIHByb2dyZXNzLlxuICAgKiBIb3dldmVyLCB0aGUgbmV4dCBgZGlzcGF0Y2goKWAgY2FsbCwgd2hldGhlciBuZXN0ZWQgb3Igbm90LCB3aWxsIHVzZSBhIG1vcmVcbiAgICogcmVjZW50IHNuYXBzaG90IG9mIHRoZSBzdWJzY3JpcHRpb24gbGlzdC5cbiAgICpcbiAgICogMi4gVGhlIGxpc3RlbmVyIHNob3VsZCBub3QgZXhwZWN0IHRvIHNlZSBhbGwgc3RhdGUgY2hhbmdlcywgYXMgdGhlIHN0YXRlXG4gICAqIG1pZ2h0IGhhdmUgYmVlbiB1cGRhdGVkIG11bHRpcGxlIHRpbWVzIGR1cmluZyBhIG5lc3RlZCBgZGlzcGF0Y2goKWAgYmVmb3JlXG4gICAqIHRoZSBsaXN0ZW5lciBpcyBjYWxsZWQuIEl0IGlzLCBob3dldmVyLCBndWFyYW50ZWVkIHRoYXQgYWxsIHN1YnNjcmliZXJzXG4gICAqIHJlZ2lzdGVyZWQgYmVmb3JlIHRoZSBgZGlzcGF0Y2goKWAgc3RhcnRlZCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBsYXRlc3RcbiAgICogc3RhdGUgYnkgdGhlIHRpbWUgaXQgZXhpdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBldmVyeSBkaXNwYXRjaC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGlzIGNoYW5nZSBsaXN0ZW5lci5cbiAgICovXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcblxuICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICBuZXh0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgaWYgKCFpc1N1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgICAgdmFyIGluZGV4ID0gbmV4dExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uLiBJdCBpcyB0aGUgb25seSB3YXkgdG8gdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS5cbiAgICpcbiAgICogVGhlIGByZWR1Y2VyYCBmdW5jdGlvbiwgdXNlZCB0byBjcmVhdGUgdGhlIHN0b3JlLCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZVxuICAgKiBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBnaXZlbiBgYWN0aW9uYC4gSXRzIHJldHVybiB2YWx1ZSB3aWxsXG4gICAqIGJlIGNvbnNpZGVyZWQgdGhlICoqbmV4dCoqIHN0YXRlIG9mIHRoZSB0cmVlLCBhbmQgdGhlIGNoYW5nZSBsaXN0ZW5lcnNcbiAgICogd2lsbCBiZSBub3RpZmllZC5cbiAgICpcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb25seSBzdXBwb3J0cyBwbGFpbiBvYmplY3QgYWN0aW9ucy4gSWYgeW91IHdhbnQgdG9cbiAgICogZGlzcGF0Y2ggYSBQcm9taXNlLCBhbiBPYnNlcnZhYmxlLCBhIHRodW5rLCBvciBzb21ldGhpbmcgZWxzZSwgeW91IG5lZWQgdG9cbiAgICogd3JhcCB5b3VyIHN0b3JlIGNyZWF0aW5nIGZ1bmN0aW9uIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgbWlkZGxld2FyZS4gRm9yXG4gICAqIGV4YW1wbGUsIHNlZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIGByZWR1eC10aHVua2AgcGFja2FnZS4gRXZlbiB0aGVcbiAgICogbWlkZGxld2FyZSB3aWxsIGV2ZW50dWFsbHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0IGFjdGlvbnMgdXNpbmcgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gQSBwbGFpbiBvYmplY3QgcmVwcmVzZW50aW5nIOKAnHdoYXQgY2hhbmdlZOKAnS4gSXQgaXNcbiAgICogYSBnb29kIGlkZWEgdG8ga2VlcCBhY3Rpb25zIHNlcmlhbGl6YWJsZSBzbyB5b3UgY2FuIHJlY29yZCBhbmQgcmVwbGF5IHVzZXJcbiAgICogc2Vzc2lvbnMsIG9yIHVzZSB0aGUgdGltZSB0cmF2ZWxsaW5nIGByZWR1eC1kZXZ0b29sc2AuIEFuIGFjdGlvbiBtdXN0IGhhdmVcbiAgICogYSBgdHlwZWAgcHJvcGVydHkgd2hpY2ggbWF5IG5vdCBiZSBgdW5kZWZpbmVkYC4gSXQgaXMgYSBnb29kIGlkZWEgdG8gdXNlXG4gICAqIHN0cmluZyBjb25zdGFudHMgZm9yIGFjdGlvbiB0eXBlcy5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gRm9yIGNvbnZlbmllbmNlLCB0aGUgc2FtZSBhY3Rpb24gb2JqZWN0IHlvdSBkaXNwYXRjaGVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQsIGlmIHlvdSB1c2UgYSBjdXN0b20gbWlkZGxld2FyZSwgaXQgbWF5IHdyYXAgYGRpc3BhdGNoKClgIHRvXG4gICAqIHJldHVybiBzb21ldGhpbmcgZWxzZSAoZm9yIGV4YW1wbGUsIGEgUHJvbWlzZSB5b3UgY2FuIGF3YWl0KS5cbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgIGlmICghKDAsIF9pc1BsYWluT2JqZWN0MlsnZGVmYXVsdCddKShhY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbXVzdCBiZSBwbGFpbiBvYmplY3RzLiAnICsgJ1VzZSBjdXN0b20gbWlkZGxld2FyZSBmb3IgYXN5bmMgYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuICcgKyAnSGF2ZSB5b3UgbWlzc3BlbGxlZCBhIGNvbnN0YW50PycpO1xuICAgIH1cblxuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycyA9IG5leHRMaXN0ZW5lcnM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyc1tpXSgpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgdGhlIHJlZHVjZXIgY3VycmVudGx5IHVzZWQgYnkgdGhlIHN0b3JlIHRvIGNhbGN1bGF0ZSB0aGUgc3RhdGUuXG4gICAqXG4gICAqIFlvdSBtaWdodCBuZWVkIHRoaXMgaWYgeW91ciBhcHAgaW1wbGVtZW50cyBjb2RlIHNwbGl0dGluZyBhbmQgeW91IHdhbnQgdG9cbiAgICogbG9hZCBzb21lIG9mIHRoZSByZWR1Y2VycyBkeW5hbWljYWxseS4gWW91IG1pZ2h0IGFsc28gbmVlZCB0aGlzIGlmIHlvdVxuICAgKiBpbXBsZW1lbnQgYSBob3QgcmVsb2FkaW5nIG1lY2hhbmlzbSBmb3IgUmVkdXguXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRSZWR1Y2VyIFRoZSByZWR1Y2VyIGZvciB0aGUgc3RvcmUgdG8gdXNlIGluc3RlYWQuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpIHtcbiAgICBpZiAodHlwZW9mIG5leHRSZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBuZXh0UmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGN1cnJlbnRSZWR1Y2VyID0gbmV4dFJlZHVjZXI7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyb3BlcmFiaWxpdHkgcG9pbnQgZm9yIG9ic2VydmFibGUvcmVhY3RpdmUgbGlicmFyaWVzLlxuICAgKiBAcmV0dXJucyB7b2JzZXJ2YWJsZX0gQSBtaW5pbWFsIG9ic2VydmFibGUgb2Ygc3RhdGUgY2hhbmdlcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgb2JzZXJ2YWJsZSBwcm9wb3NhbDpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3plbnBhcnNpbmcvZXMtb2JzZXJ2YWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gb2JzZXJ2YWJsZSgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBvdXRlclN1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICByZXR1cm4gX3JlZiA9IHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIG1pbmltYWwgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ic2VydmVyIEFueSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyBhbiBvYnNlcnZlci5cbiAgICAgICAqIFRoZSBvYnNlcnZlciBvYmplY3Qgc2hvdWxkIGhhdmUgYSBgbmV4dGAgbWV0aG9kLlxuICAgICAgICogQHJldHVybnMge3N1YnNjcmlwdGlvbn0gQW4gb2JqZWN0IHdpdGggYW4gYHVuc3Vic2NyaWJlYCBtZXRob2QgdGhhdCBjYW5cbiAgICAgICAqIGJlIHVzZWQgdG8gdW5zdWJzY3JpYmUgdGhlIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBwcmV2ZW50IGZ1cnRoZXJcbiAgICAgICAqIGVtaXNzaW9uIG9mIHZhbHVlcyBmcm9tIHRoZSBvYnNlcnZhYmxlLlxuICAgICAgICovXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICBpZiAodHlwZW9mIG9ic2VydmVyICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBvYnNlcnZlciB0byBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlU3RhdGUoKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZ2V0U3RhdGUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZVN0YXRlKCk7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9IG91dGVyU3Vic2NyaWJlKG9ic2VydmVTdGF0ZSk7XG4gICAgICAgIHJldHVybiB7IHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZSB9O1xuICAgICAgfVxuICAgIH0sIF9yZWZbX3N5bWJvbE9ic2VydmFibGUyWydkZWZhdWx0J11dID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgX3JlZjtcbiAgfVxuXG4gIC8vIFdoZW4gYSBzdG9yZSBpcyBjcmVhdGVkLCBhbiBcIklOSVRcIiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBzbyB0aGF0IGV2ZXJ5XG4gIC8vIHJlZHVjZXIgcmV0dXJucyB0aGVpciBpbml0aWFsIHN0YXRlLiBUaGlzIGVmZmVjdGl2ZWx5IHBvcHVsYXRlc1xuICAvLyB0aGUgaW5pdGlhbCBzdGF0ZSB0cmVlLlxuICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG4gICAgcmVwbGFjZVJlZHVjZXI6IHJlcGxhY2VSZWR1Y2VyXG4gIH0sIF9yZWYyW19zeW1ib2xPYnNlcnZhYmxlMlsnZGVmYXVsdCddXSA9IG9ic2VydmFibGUsIF9yZWYyO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZHV4L2xpYi9jcmVhdGVTdG9yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXRQcm90b3R5cGUgPSByZXF1aXJlKCcuL19nZXRQcm90b3R5cGUnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmXG4gICAgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiYgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQbGFpbk9iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pc1BsYWluT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIG92ZXJBcmcgPSByZXF1aXJlKCcuL19vdmVyQXJnJyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFByb3RvdHlwZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fZ2V0UHJvdG90eXBlLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlckFyZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fb3ZlckFyZy5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pc09iamVjdExpa2UuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zeW1ib2wtb2JzZXJ2YWJsZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcG9ueWZpbGwgPSByZXF1aXJlKCcuL3BvbnlmaWxsJyk7XG5cbnZhciBfcG9ueWZpbGwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9ueWZpbGwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciByb290ID0gdW5kZWZpbmVkOyAvKiBnbG9iYWwgd2luZG93ICovXG5cbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuXHRyb290ID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHRyb290ID0gd2luZG93O1xufVxuXG52YXIgcmVzdWx0ID0gKDAsIF9wb255ZmlsbDJbJ2RlZmF1bHQnXSkocm9vdCk7XG5leHBvcnRzWydkZWZhdWx0J10gPSByZXN1bHQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3ltYm9sLW9ic2VydmFibGUvbGliL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHN5bWJvbE9ic2VydmFibGVQb255ZmlsbDtcbmZ1bmN0aW9uIHN5bWJvbE9ic2VydmFibGVQb255ZmlsbChyb290KSB7XG5cdHZhciByZXN1bHQ7XG5cdHZhciBfU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBfU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKF9TeW1ib2wub2JzZXJ2YWJsZSkge1xuXHRcdFx0cmVzdWx0ID0gX1N5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBfU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRfU3ltYm9sLm9ic2VydmFibGUgPSByZXN1bHQ7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9ICdAQG9ic2VydmFibGUnO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3ltYm9sLW9ic2VydmFibGUvbGliL3BvbnlmaWxsLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNvbWJpbmVSZWR1Y2VycztcblxudmFyIF9jcmVhdGVTdG9yZSA9IHJlcXVpcmUoJy4vY3JlYXRlU3RvcmUnKTtcblxudmFyIF9pc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnbG9kYXNoL2lzUGxhaW5PYmplY3QnKTtcblxudmFyIF9pc1BsYWluT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUGxhaW5PYmplY3QpO1xuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCcuL3V0aWxzL3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKGtleSwgYWN0aW9uKSB7XG4gIHZhciBhY3Rpb25UeXBlID0gYWN0aW9uICYmIGFjdGlvbi50eXBlO1xuICB2YXIgYWN0aW9uTmFtZSA9IGFjdGlvblR5cGUgJiYgJ1wiJyArIGFjdGlvblR5cGUudG9TdHJpbmcoKSArICdcIicgfHwgJ2FuIGFjdGlvbic7XG5cbiAgcmV0dXJuICdHaXZlbiBhY3Rpb24gJyArIGFjdGlvbk5hbWUgKyAnLCByZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQuICcgKyAnVG8gaWdub3JlIGFuIGFjdGlvbiwgeW91IG11c3QgZXhwbGljaXRseSByZXR1cm4gdGhlIHByZXZpb3VzIHN0YXRlLic7XG59XG5cbmZ1bmN0aW9uIGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2UoaW5wdXRTdGF0ZSwgcmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGFyZ3VtZW50TmFtZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gX2NyZWF0ZVN0b3JlLkFjdGlvblR5cGVzLklOSVQgPyAncHJlbG9hZGVkU3RhdGUgYXJndW1lbnQgcGFzc2VkIHRvIGNyZWF0ZVN0b3JlJyA6ICdwcmV2aW91cyBzdGF0ZSByZWNlaXZlZCBieSB0aGUgcmVkdWNlcic7XG5cbiAgaWYgKHJlZHVjZXJLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnU3RvcmUgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHJlZHVjZXIuIE1ha2Ugc3VyZSB0aGUgYXJndW1lbnQgcGFzc2VkICcgKyAndG8gY29tYmluZVJlZHVjZXJzIGlzIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIHJlZHVjZXJzLic7XG4gIH1cblxuICBpZiAoISgwLCBfaXNQbGFpbk9iamVjdDJbJ2RlZmF1bHQnXSkoaW5wdXRTdGF0ZSkpIHtcbiAgICByZXR1cm4gJ1RoZSAnICsgYXJndW1lbnROYW1lICsgJyBoYXMgdW5leHBlY3RlZCB0eXBlIG9mIFwiJyArIHt9LnRvU3RyaW5nLmNhbGwoaW5wdXRTdGF0ZSkubWF0Y2goL1xccyhbYS16fEEtWl0rKS8pWzFdICsgJ1wiLiBFeHBlY3RlZCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nICcgKyAoJ2tleXM6IFwiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiJyk7XG4gIH1cblxuICB2YXIgdW5leHBlY3RlZEtleXMgPSBPYmplY3Qua2V5cyhpbnB1dFN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAhcmVkdWNlcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhdW5leHBlY3RlZEtleUNhY2hlW2tleV07XG4gIH0pO1xuXG4gIHVuZXhwZWN0ZWRLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldID0gdHJ1ZTtcbiAgfSk7XG5cbiAgaWYgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gJ1VuZXhwZWN0ZWQgJyArICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAxID8gJ2tleXMnIDogJ2tleScpICsgJyAnICsgKCdcIicgKyB1bmV4cGVjdGVkS2V5cy5qb2luKCdcIiwgXCInKSArICdcIiBmb3VuZCBpbiAnICsgYXJndW1lbnROYW1lICsgJy4gJykgKyAnRXhwZWN0ZWQgdG8gZmluZCBvbmUgb2YgdGhlIGtub3duIHJlZHVjZXIga2V5cyBpbnN0ZWFkOiAnICsgKCdcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIi4gVW5leHBlY3RlZCBrZXlzIHdpbGwgYmUgaWdub3JlZC4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRSZWR1Y2VyU2FuaXR5KHJlZHVjZXJzKSB7XG4gIE9iamVjdC5rZXlzKHJlZHVjZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgcmVkdWNlciA9IHJlZHVjZXJzW2tleV07XG4gICAgdmFyIGluaXRpYWxTdGF0ZSA9IHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IF9jcmVhdGVTdG9yZS5BY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCBkdXJpbmcgaW5pdGlhbGl6YXRpb24uICcgKyAnSWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGUgcmVkdWNlciBpcyB1bmRlZmluZWQsIHlvdSBtdXN0ICcgKyAnZXhwbGljaXRseSByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSAnICsgJ25vdCBiZSB1bmRlZmluZWQuJyk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSAnQEByZWR1eC9QUk9CRV9VTktOT1dOX0FDVElPTl8nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLnNwbGl0KCcnKS5qb2luKCcuJyk7XG4gICAgaWYgKHR5cGVvZiByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiB0eXBlIH0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgd2hlbiBwcm9iZWQgd2l0aCBhIHJhbmRvbSB0eXBlLiAnICsgKCdEb25cXCd0IHRyeSB0byBoYW5kbGUgJyArIF9jcmVhdGVTdG9yZS5BY3Rpb25UeXBlcy5JTklUICsgJyBvciBvdGhlciBhY3Rpb25zIGluIFwicmVkdXgvKlwiICcpICsgJ25hbWVzcGFjZS4gVGhleSBhcmUgY29uc2lkZXJlZCBwcml2YXRlLiBJbnN0ZWFkLCB5b3UgbXVzdCByZXR1cm4gdGhlICcgKyAnY3VycmVudCBzdGF0ZSBmb3IgYW55IHVua25vd24gYWN0aW9ucywgdW5sZXNzIGl0IGlzIHVuZGVmaW5lZCwgJyArICdpbiB3aGljaCBjYXNlIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZSwgcmVnYXJkbGVzcyBvZiB0aGUgJyArICdhY3Rpb24gdHlwZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5IG5vdCBiZSB1bmRlZmluZWQuJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBkaWZmZXJlbnQgcmVkdWNlciBmdW5jdGlvbnMsIGludG8gYSBzaW5nbGVcbiAqIHJlZHVjZXIgZnVuY3Rpb24uIEl0IHdpbGwgY2FsbCBldmVyeSBjaGlsZCByZWR1Y2VyLCBhbmQgZ2F0aGVyIHRoZWlyIHJlc3VsdHNcbiAqIGludG8gYSBzaW5nbGUgc3RhdGUgb2JqZWN0LCB3aG9zZSBrZXlzIGNvcnJlc3BvbmQgdG8gdGhlIGtleXMgb2YgdGhlIHBhc3NlZFxuICogcmVkdWNlciBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlZHVjZXJzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgY29ycmVzcG9uZCB0byBkaWZmZXJlbnRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zIHRoYXQgbmVlZCB0byBiZSBjb21iaW5lZCBpbnRvIG9uZS4gT25lIGhhbmR5IHdheSB0byBvYnRhaW5cbiAqIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzIHJlZHVjZXJzYCBzeW50YXguIFRoZSByZWR1Y2VycyBtYXkgbmV2ZXIgcmV0dXJuXG4gKiB1bmRlZmluZWQgZm9yIGFueSBhY3Rpb24uIEluc3RlYWQsIHRoZXkgc2hvdWxkIHJldHVybiB0aGVpciBpbml0aWFsIHN0YXRlXG4gKiBpZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZW0gd2FzIHVuZGVmaW5lZCwgYW5kIHRoZSBjdXJyZW50IHN0YXRlIGZvciBhbnlcbiAqIHVucmVjb2duaXplZCBhY3Rpb24uXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHJlZHVjZXIgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGV2ZXJ5IHJlZHVjZXIgaW5zaWRlIHRoZVxuICogcGFzc2VkIG9iamVjdCwgYW5kIGJ1aWxkcyBhIHN0YXRlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlLlxuICovXG5mdW5jdGlvbiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgZmluYWxSZWR1Y2VycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSgnTm8gcmVkdWNlciBwcm92aWRlZCBmb3Iga2V5IFwiJyArIGtleSArICdcIicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcbiAgICB9XG4gIH1cbiAgdmFyIGZpbmFsUmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhmaW5hbFJlZHVjZXJzKTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciB1bmV4cGVjdGVkS2V5Q2FjaGUgPSB7fTtcbiAgfVxuXG4gIHZhciBzYW5pdHlFcnJvcjtcbiAgdHJ5IHtcbiAgICBhc3NlcnRSZWR1Y2VyU2FuaXR5KGZpbmFsUmVkdWNlcnMpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc2FuaXR5RXJyb3IgPSBlO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbWJpbmF0aW9uKCkge1xuICAgIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuICAgIHZhciBhY3Rpb24gPSBhcmd1bWVudHNbMV07XG5cbiAgICBpZiAoc2FuaXR5RXJyb3IpIHtcbiAgICAgIHRocm93IHNhbml0eUVycm9yO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgd2FybmluZ01lc3NhZ2UgPSBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKHN0YXRlLCBmaW5hbFJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSk7XG4gICAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgICAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSh3YXJuaW5nTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGhhc0NoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgbmV4dFN0YXRlID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaW5hbFJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0gZmluYWxSZWR1Y2VyS2V5c1tpXTtcbiAgICAgIHZhciByZWR1Y2VyID0gZmluYWxSZWR1Y2Vyc1trZXldO1xuICAgICAgdmFyIHByZXZpb3VzU3RhdGVGb3JLZXkgPSBzdGF0ZVtrZXldO1xuICAgICAgdmFyIG5leHRTdGF0ZUZvcktleSA9IHJlZHVjZXIocHJldmlvdXNTdGF0ZUZvcktleSwgYWN0aW9uKTtcbiAgICAgIGlmICh0eXBlb2YgbmV4dFN0YXRlRm9yS2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2Uoa2V5LCBhY3Rpb24pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIG5leHRTdGF0ZVtrZXldID0gbmV4dFN0YXRlRm9yS2V5O1xuICAgICAgaGFzQ2hhbmdlZCA9IGhhc0NoYW5nZWQgfHwgbmV4dFN0YXRlRm9yS2V5ICE9PSBwcmV2aW91c1N0YXRlRm9yS2V5O1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2hhbmdlZCA/IG5leHRTdGF0ZSA6IHN0YXRlO1xuICB9O1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZHV4L2xpYi9jb21iaW5lUmVkdWNlcnMuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1snZGVmYXVsdCddID0gd2FybmluZztcbi8qKlxuICogUHJpbnRzIGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IGlmIHlvdSBlbmFibGVcbiAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuICB9IGNhdGNoIChlKSB7fVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVkdXgvbGliL3V0aWxzL3dhcm5pbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1snZGVmYXVsdCddID0gYmluZEFjdGlvbkNyZWF0b3JzO1xuZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goYWN0aW9uQ3JlYXRvci5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvbiBjcmVhdG9ycywgaW50byBhbiBvYmplY3Qgd2l0aCB0aGVcbiAqIHNhbWUga2V5cywgYnV0IHdpdGggZXZlcnkgZnVuY3Rpb24gd3JhcHBlZCBpbnRvIGEgYGRpc3BhdGNoYCBjYWxsIHNvIHRoZXlcbiAqIG1heSBiZSBpbnZva2VkIGRpcmVjdGx5LiBUaGlzIGlzIGp1c3QgYSBjb252ZW5pZW5jZSBtZXRob2QsIGFzIHlvdSBjYW4gY2FsbFxuICogYHN0b3JlLmRpc3BhdGNoKE15QWN0aW9uQ3JlYXRvcnMuZG9Tb21ldGhpbmcoKSlgIHlvdXJzZWxmIGp1c3QgZmluZS5cbiAqXG4gKiBGb3IgY29udmVuaWVuY2UsIHlvdSBjYW4gYWxzbyBwYXNzIGEgc2luZ2xlIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCxcbiAqIGFuZCBnZXQgYSBmdW5jdGlvbiBpbiByZXR1cm4uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9IGFjdGlvbkNyZWF0b3JzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvblxuICogY3JlYXRvciBmdW5jdGlvbnMuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzYFxuICogc3ludGF4LiBZb3UgbWF5IGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkaXNwYXRjaCBUaGUgYGRpc3BhdGNoYCBmdW5jdGlvbiBhdmFpbGFibGUgb24geW91ciBSZWR1eFxuICogc3RvcmUuXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufE9iamVjdH0gVGhlIG9iamVjdCBtaW1pY2tpbmcgdGhlIG9yaWdpbmFsIG9iamVjdCwgYnV0IHdpdGhcbiAqIGV2ZXJ5IGFjdGlvbiBjcmVhdG9yIHdyYXBwZWQgaW50byB0aGUgYGRpc3BhdGNoYCBjYWxsLiBJZiB5b3UgcGFzc2VkIGFcbiAqIGZ1bmN0aW9uIGFzIGBhY3Rpb25DcmVhdG9yc2AsIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBhbHNvIGJlIGEgc2luZ2xlXG4gKiBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCkge1xuICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCk7XG4gIH1cblxuICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzICE9PSAnb2JqZWN0JyB8fCBhY3Rpb25DcmVhdG9ycyA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYmluZEFjdGlvbkNyZWF0b3JzIGV4cGVjdGVkIGFuIG9iamVjdCBvciBhIGZ1bmN0aW9uLCBpbnN0ZWFkIHJlY2VpdmVkICcgKyAoYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgYWN0aW9uQ3JlYXRvcnMpICsgJy4gJyArICdEaWQgeW91IHdyaXRlIFwiaW1wb3J0IEFjdGlvbkNyZWF0b3JzIGZyb21cIiBpbnN0ZWFkIG9mIFwiaW1wb3J0ICogYXMgQWN0aW9uQ3JlYXRvcnMgZnJvbVwiPycpO1xuICB9XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhY3Rpb25DcmVhdG9ycyk7XG4gIHZhciBib3VuZEFjdGlvbkNyZWF0b3JzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIHZhciBhY3Rpb25DcmVhdG9yID0gYWN0aW9uQ3JlYXRvcnNba2V5XTtcbiAgICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGJvdW5kQWN0aW9uQ3JlYXRvcnNba2V5XSA9IGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvdW5kQWN0aW9uQ3JlYXRvcnM7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVkdXgvbGliL2JpbmRBY3Rpb25DcmVhdG9ycy5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGFwcGx5TWlkZGxld2FyZTtcblxudmFyIF9jb21wb3NlID0gcmVxdWlyZSgnLi9jb21wb3NlJyk7XG5cbnZhciBfY29tcG9zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb3NlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4vKipcbiAqIENyZWF0ZXMgYSBzdG9yZSBlbmhhbmNlciB0aGF0IGFwcGxpZXMgbWlkZGxld2FyZSB0byB0aGUgZGlzcGF0Y2ggbWV0aG9kXG4gKiBvZiB0aGUgUmVkdXggc3RvcmUuIFRoaXMgaXMgaGFuZHkgZm9yIGEgdmFyaWV0eSBvZiB0YXNrcywgc3VjaCBhcyBleHByZXNzaW5nXG4gKiBhc3luY2hyb25vdXMgYWN0aW9ucyBpbiBhIGNvbmNpc2UgbWFubmVyLCBvciBsb2dnaW5nIGV2ZXJ5IGFjdGlvbiBwYXlsb2FkLlxuICpcbiAqIFNlZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UgYXMgYW4gZXhhbXBsZSBvZiB0aGUgUmVkdXggbWlkZGxld2FyZS5cbiAqXG4gKiBCZWNhdXNlIG1pZGRsZXdhcmUgaXMgcG90ZW50aWFsbHkgYXN5bmNocm9ub3VzLCB0aGlzIHNob3VsZCBiZSB0aGUgZmlyc3RcbiAqIHN0b3JlIGVuaGFuY2VyIGluIHRoZSBjb21wb3NpdGlvbiBjaGFpbi5cbiAqXG4gKiBOb3RlIHRoYXQgZWFjaCBtaWRkbGV3YXJlIHdpbGwgYmUgZ2l2ZW4gdGhlIGBkaXNwYXRjaGAgYW5kIGBnZXRTdGF0ZWAgZnVuY3Rpb25zXG4gKiBhcyBuYW1lZCBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gbWlkZGxld2FyZXMgVGhlIG1pZGRsZXdhcmUgY2hhaW4gdG8gYmUgYXBwbGllZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBzdG9yZSBlbmhhbmNlciBhcHBseWluZyB0aGUgbWlkZGxld2FyZS5cbiAqL1xuZnVuY3Rpb24gYXBwbHlNaWRkbGV3YXJlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWlkZGxld2FyZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBtaWRkbGV3YXJlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoY3JlYXRlU3RvcmUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICAgICAgdmFyIHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKTtcbiAgICAgIHZhciBfZGlzcGF0Y2ggPSBzdG9yZS5kaXNwYXRjaDtcbiAgICAgIHZhciBjaGFpbiA9IFtdO1xuXG4gICAgICB2YXIgbWlkZGxld2FyZUFQSSA9IHtcbiAgICAgICAgZ2V0U3RhdGU6IHN0b3JlLmdldFN0YXRlLFxuICAgICAgICBkaXNwYXRjaDogZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIF9kaXNwYXRjaChhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY2hhaW4gPSBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgICAgICAgcmV0dXJuIG1pZGRsZXdhcmUobWlkZGxld2FyZUFQSSk7XG4gICAgICB9KTtcbiAgICAgIF9kaXNwYXRjaCA9IF9jb21wb3NlMlsnZGVmYXVsdCddLmFwcGx5KHVuZGVmaW5lZCwgY2hhaW4pKHN0b3JlLmRpc3BhdGNoKTtcblxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdG9yZSwge1xuICAgICAgICBkaXNwYXRjaDogX2Rpc3BhdGNoXG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZHV4L2xpYi9hcHBseU1pZGRsZXdhcmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGNvbXBvc2U7XG4vKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5cbmZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgdmFyIGxhc3QgPSBmdW5jc1tmdW5jcy5sZW5ndGggLSAxXTtcbiAgdmFyIHJlc3QgPSBmdW5jcy5zbGljZSgwLCAtMSk7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJlc3QucmVkdWNlUmlnaHQoZnVuY3Rpb24gKGNvbXBvc2VkLCBmKSB7XG4gICAgICByZXR1cm4gZihjb21wb3NlZCk7XG4gICAgfSwgbGFzdC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZHV4L2xpYi9jb21wb3NlLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xOF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJSZWFjdFJlZHV4XCJcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBzZXR0aW5ncywgdGVzdHMgfSBmcm9tICcuL3NldHRpbmdzJ1xuaW1wb3J0IHsgdmlld0ZpbHRlciB9IGZyb20gJy4vdmlldy1maWx0ZXInXG5cbmNvbnN0IHRlc3RiZWRBcHAgPSBjb21iaW5lUmVkdWNlcnMoe1xuICBzZXR0aW5ncyxcbiAgdGVzdHMsXG4gIHZpZXdGaWx0ZXJcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHRlc3RiZWRBcHBcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvcmVkdWNlcnMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgeyBTRVRUSU5HU19VUERBVEUgfSBmcm9tICcuLi9hY3Rpb25zJ1xuXG5leHBvcnQgY29uc3Qgc2V0dGluZ3MgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgU0VUVElOR1NfVVBEQVRFOiB7XG4gICAgICBjb25zb2xlLmxvZygnY2hhbmdlIHNldHRpbmc6ICcgKyBhY3Rpb24ua2V5ICsgJywgdG86ICcgKyBhY3Rpb24udmFsdWUpXG4gICAgICBsZXQgc2V0dGluZ3NVcGRhdGUgPSBzdGF0ZVxuICAgICAgc2V0dGluZ3NVcGRhdGVbYWN0aW9uLmtleV0gPSBhY3Rpb24udmFsdWVcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnNldHRpbmdzVXBkYXRlXG4gICAgICB9XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdGVzdHMgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaChhY3Rpb24udHlwZSkge1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9yZWR1Y2Vycy9zZXR0aW5ncy5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBTRVRUSU5HU19VUERBVEUgPSAnU0VUVElOR1NfVVBEQVRFJ1xuZXhwb3J0IGNvbnN0IFZJRVdfQ0hBTkdFID0gJ1ZJRVdfQ0hBTkdFJ1xuXG5leHBvcnQgY29uc3QgY2hhbmdlU2V0dGluZyA9IChrZXksIHZhbHVlKSA9PiAoe1xuICB0eXBlOiBTRVRUSU5HU19VUERBVEUsXG4gIGtleToga2V5LFxuICB2YWx1ZTogdmFsdWVcbn0pXG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VWaWV3ID0gKG5hbWUpID0+ICh7XG4gIHR5cGU6IFZJRVdfQ0hBTkdFLFxuICBmaWx0ZXI6IG5hbWVcbn0pXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2FjdGlvbnMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgeyBWSUVXX0NIQU5HRSB9IGZyb20gJy4uL2FjdGlvbnMnXG5cbmV4cG9ydCBjb25zdCB2aWV3RmlsdGVyID0gKHN0YXRlID0gJ0hvbWUnLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBWSUVXX0NIQU5HRTpcbiAgICAgIHJldHVybiBhY3Rpb24uZmlsdGVyXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3JlZHVjZXJzL3ZpZXctZmlsdGVyLmpzXG4gKiovIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgZ2V0Q3VycmVudFBhZ2UgfSBmcm9tICcuLi9zZWxlY3RvcnMnXG5pbXBvcnQgQXBwIGZyb20gJy4uL2NvbXBvbmVudHMvQXBwJ1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBwYWdlOiBnZXRDdXJyZW50UGFnZShzdGF0ZSksXG4gICAgc3RhdGU6IHN0YXRlXG4gIH1cbn1cblxuY29uc3QgQXBwQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzXG4pKEFwcClcblxuZXhwb3J0IGRlZmF1bHQgQXBwQ29udGFpbmVyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb250YWluZXJzL0FwcENvbnRhaW5lci5qc1xuICoqLyIsImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnXG5cbi8vIEJlY2F1c2Ugd2UgY2Fubm90IGR5bmFtaWNhbGx5IGltcG9ydCBtb2R1bGVzIGZyb20gc3RyaW5ncywgd2UgbmVlZCB0byxcbi8vIHVuZm9ydHVuYXRlbHksIGltcG9ydCB0aGVtIHNwZWNpZmljYWxseSBoZXJlIGFuZCBkZWZpbmUgdGhlaXIgYXNzb2NpYXRlZFxuLy8gZmlsdGVyIGNsYXVzZS5cblxuaW1wb3J0IFRlc3RMaXN0Q29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvVGVzdExpc3RDb250YWluZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBTZXR0aW5nc0Zvcm1Db250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy9TZXR0aW5nc0Zvcm1Db250YWluZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuaW1wb3J0IFRlc3RDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy90ZXN0L1Rlc3RDb250YWluZXInXG5pbXBvcnQgKiBhcyB0ZXN0cyBmcm9tICcuLi9jb21wb25lbnRzL3Rlc3QnXG5cbmNvbnN0IGdldFZpZXdGaWx0ZXIgPSAoc3RhdGUpID0+IHN0YXRlLnZpZXdGaWx0ZXJcblxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRQYWdlID0gY3JlYXRlU2VsZWN0b3IoXG4gIFtnZXRWaWV3RmlsdGVyXSxcbiAgKHZpZXdGaWx0ZXIpID0+IHtcbiAgICBzd2l0Y2godmlld0ZpbHRlci50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICBjYXNlICdwdWJsaXNoJzpcbiAgICAgICAgcmV0dXJuIFRlc3RDb250YWluZXIodGVzdHMuUHVibGlzaGVyVGVzdClcbiAgICAgIGNhc2UgJ3N1YnNjcmliZSc6XG4gICAgICAgIHJldHVybiBUZXN0Q29udGFpbmVyKHRlc3RzLlN1YnNjcmliZXJUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIDEwODBwJzpcbiAgICAgICAgcmV0dXJuIFRlc3RDb250YWluZXIodGVzdHMuUHVibGlzaGVyMTA4MHBUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIGZhaWxvdmVyJzpcbiAgICAgICAgcmV0dXJuIFRlc3RDb250YWluZXIodGVzdHMuUHVibGlzaGVyRmFpbG92ZXJUZXN0KVxuICAgICAgY2FzZSAnc3Vic2NyaWJlIC0gZmFpbG92ZXInOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5TdWJzY3JpYmVyRmFpbG92ZXJUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIGF1ZGlvIG1vZGUnOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5QdWJsaXNoZXJBdWRpb09ubHlUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIGNhbWVyYSBzb3VyY2UnOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5QdWJsaXNoZXJDYW1lcmFTb3VyY2VUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIGNhbWVyYSBzd2FwJzpcbiAgICAgICAgcmV0dXJuIFRlc3RDb250YWluZXIodGVzdHMuUHVibGlzaGVyQ2FtZXJhU3dhcFRlc3QpXG4gICAgICBjYXNlICdwdWJsaXNoIC0gZmlsdGVycyc6XG4gICAgICAgIHJldHVybiBUZXN0Q29udGFpbmVyKHRlc3RzLlB1Ymxpc2hlckZpbHRlcnNUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIGltYWdlIGNhcHR1cmUnOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5QdWJsaXNoZXJJbWFnZUNhcHR1cmVUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIHN0cmVhbSBtYW5hZ2VyJzpcbiAgICAgICAgcmV0dXJuIFRlc3RDb250YWluZXIodGVzdHMuUHVibGlzaGVyU3RyZWFtTWFuYWdlclRlc3QpXG4gICAgICBjYXNlICdzZXR0aW5ncyc6XG4gICAgICBjYXNlICdob21lJzpcbiAgICAgICAgcmV0dXJuIDxTZXR0aW5nc0Zvcm1Db250YWluZXIgLz5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiA8VGVzdExpc3RDb250YWluZXIgLz5cbiAgICB9XG4gIH1cbilcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvc2VsZWN0b3JzL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0TWVtb2l6ZSA9IGRlZmF1bHRNZW1vaXplO1xuZXhwb3J0cy5jcmVhdGVTZWxlY3RvckNyZWF0b3IgPSBjcmVhdGVTZWxlY3RvckNyZWF0b3I7XG5leHBvcnRzLmNyZWF0ZVN0cnVjdHVyZWRTZWxlY3RvciA9IGNyZWF0ZVN0cnVjdHVyZWRTZWxlY3RvcjtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbmZ1bmN0aW9uIGRlZmF1bHRFcXVhbGl0eUNoZWNrKGEsIGIpIHtcbiAgcmV0dXJuIGEgPT09IGI7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRNZW1vaXplKGZ1bmMpIHtcbiAgdmFyIGVxdWFsaXR5Q2hlY2sgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBkZWZhdWx0RXF1YWxpdHlDaGVjayA6IGFyZ3VtZW50c1sxXTtcblxuICB2YXIgbGFzdEFyZ3MgPSBudWxsO1xuICB2YXIgbGFzdFJlc3VsdCA9IG51bGw7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgaWYgKGxhc3RBcmdzID09PSBudWxsIHx8IGxhc3RBcmdzLmxlbmd0aCAhPT0gYXJncy5sZW5ndGggfHwgIWFyZ3MuZXZlcnkoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGVxdWFsaXR5Q2hlY2sodmFsdWUsIGxhc3RBcmdzW2luZGV4XSk7XG4gICAgfSkpIHtcbiAgICAgIGxhc3RSZXN1bHQgPSBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gYXJncztcbiAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVwZW5kZW5jaWVzKGZ1bmNzKSB7XG4gIHZhciBkZXBlbmRlbmNpZXMgPSBBcnJheS5pc0FycmF5KGZ1bmNzWzBdKSA/IGZ1bmNzWzBdIDogZnVuY3M7XG5cbiAgaWYgKCFkZXBlbmRlbmNpZXMuZXZlcnkoZnVuY3Rpb24gKGRlcCkge1xuICAgIHJldHVybiB0eXBlb2YgZGVwID09PSAnZnVuY3Rpb24nO1xuICB9KSkge1xuICAgIHZhciBkZXBlbmRlbmN5VHlwZXMgPSBkZXBlbmRlbmNpZXMubWFwKGZ1bmN0aW9uIChkZXApIHtcbiAgICAgIHJldHVybiB0eXBlb2YgZGVwO1xuICAgIH0pLmpvaW4oJywgJyk7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTZWxlY3RvciBjcmVhdG9ycyBleHBlY3QgYWxsIGlucHV0LXNlbGVjdG9ycyB0byBiZSBmdW5jdGlvbnMsICcgKyAoJ2luc3RlYWQgcmVjZWl2ZWQgdGhlIGZvbGxvd2luZyB0eXBlczogWycgKyBkZXBlbmRlbmN5VHlwZXMgKyAnXScpKTtcbiAgfVxuXG4gIHJldHVybiBkZXBlbmRlbmNpZXM7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yQ3JlYXRvcihtZW1vaXplKSB7XG4gIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgbWVtb2l6ZU9wdGlvbnMgPSBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgbWVtb2l6ZU9wdGlvbnNbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgZnVuY3MgPSBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgZnVuY3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICB9XG5cbiAgICB2YXIgcmVjb21wdXRhdGlvbnMgPSAwO1xuICAgIHZhciByZXN1bHRGdW5jID0gZnVuY3MucG9wKCk7XG4gICAgdmFyIGRlcGVuZGVuY2llcyA9IGdldERlcGVuZGVuY2llcyhmdW5jcyk7XG5cbiAgICB2YXIgbWVtb2l6ZWRSZXN1bHRGdW5jID0gbWVtb2l6ZS5hcHBseSh1bmRlZmluZWQsIFtmdW5jdGlvbiAoKSB7XG4gICAgICByZWNvbXB1dGF0aW9ucysrO1xuICAgICAgcmV0dXJuIHJlc3VsdEZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgIH1dLmNvbmNhdChtZW1vaXplT3B0aW9ucykpO1xuXG4gICAgdmFyIHNlbGVjdG9yID0gZnVuY3Rpb24gc2VsZWN0b3Ioc3RhdGUsIHByb3BzKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuNCA+IDIgPyBfbGVuNCAtIDIgOiAwKSwgX2tleTQgPSAyOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTQgLSAyXSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICB9XG5cbiAgICAgIHZhciBwYXJhbXMgPSBkZXBlbmRlbmNpZXMubWFwKGZ1bmN0aW9uIChkZXBlbmRlbmN5KSB7XG4gICAgICAgIHJldHVybiBkZXBlbmRlbmN5LmFwcGx5KHVuZGVmaW5lZCwgW3N0YXRlLCBwcm9wc10uY29uY2F0KGFyZ3MpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1lbW9pemVkUmVzdWx0RnVuYy5hcHBseSh1bmRlZmluZWQsIF90b0NvbnN1bWFibGVBcnJheShwYXJhbXMpKTtcbiAgICB9O1xuXG4gICAgc2VsZWN0b3IucmVzdWx0RnVuYyA9IHJlc3VsdEZ1bmM7XG4gICAgc2VsZWN0b3IucmVjb21wdXRhdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVjb21wdXRhdGlvbnM7XG4gICAgfTtcbiAgICBzZWxlY3Rvci5yZXNldFJlY29tcHV0YXRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJlY29tcHV0YXRpb25zID0gMDtcbiAgICB9O1xuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfTtcbn1cblxudmFyIGNyZWF0ZVNlbGVjdG9yID0gZXhwb3J0cy5jcmVhdGVTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yQ3JlYXRvcihkZWZhdWx0TWVtb2l6ZSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0cnVjdHVyZWRTZWxlY3RvcihzZWxlY3RvcnMpIHtcbiAgdmFyIHNlbGVjdG9yQ3JlYXRvciA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGNyZWF0ZVNlbGVjdG9yIDogYXJndW1lbnRzWzFdO1xuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3JzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignY3JlYXRlU3RydWN0dXJlZFNlbGVjdG9yIGV4cGVjdHMgZmlyc3QgYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0ICcgKyAoJ3doZXJlIGVhY2ggcHJvcGVydHkgaXMgYSBzZWxlY3RvciwgaW5zdGVhZCByZWNlaXZlZCBhICcgKyB0eXBlb2Ygc2VsZWN0b3JzKSk7XG4gIH1cbiAgdmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyhzZWxlY3RvcnMpO1xuICByZXR1cm4gc2VsZWN0b3JDcmVhdG9yKG9iamVjdEtleXMubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gc2VsZWN0b3JzW2tleV07XG4gIH0pLCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCB2YWx1ZXMgPSBBcnJheShfbGVuNSksIF9rZXk1ID0gMDsgX2tleTUgPCBfbGVuNTsgX2tleTUrKykge1xuICAgICAgdmFsdWVzW19rZXk1XSA9IGFyZ3VtZW50c1tfa2V5NV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcy5yZWR1Y2UoZnVuY3Rpb24gKGNvbXBvc2l0aW9uLCB2YWx1ZSwgaW5kZXgpIHtcbiAgICAgIGNvbXBvc2l0aW9uW29iamVjdEtleXNbaW5kZXhdXSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIGNvbXBvc2l0aW9uO1xuICAgIH0sIHt9KTtcbiAgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVzZWxlY3QvbGliL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGNoYW5nZVZpZXcgfSBmcm9tICcuLi9hY3Rpb25zJ1xuaW1wb3J0IFRlc3RMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvVGVzdExpc3QnXG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHRlc3RzOiBzdGF0ZS50ZXN0c1xuICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG9uVGVzdExpc3RJdGVtQ2xpY2s6IChuYW1lKSA9PiB7XG4gICAgICBkaXNwYXRjaChjaGFuZ2VWaWV3KG5hbWUpKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBUZXN0TGlzdENvbnRhaW5lciA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzXG4pKFRlc3RMaXN0KVxuXG5leHBvcnQgZGVmYXVsdCBUZXN0TGlzdENvbnRhaW5lclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29udGFpbmVycy9UZXN0TGlzdENvbnRhaW5lci5qc1xuICoqLyIsImltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFRlc3RMaXN0SXRlbSBmcm9tICcuL1Rlc3RMaXN0SXRlbScgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jb25zdCBUZXN0TGlzdCA9ICh7IHRlc3RzLCBvblRlc3RMaXN0SXRlbUNsaWNrIH0pID0+IChcbiAgPHVsIGlkPVwidGVzdC1saXN0XCI+XG4gICAge3Rlc3RzLm1hcCh0ZXN0ID0+XG4gICAgICA8VGVzdExpc3RJdGVtXG4gICAgICAgIGtleT17dGVzdC5uYW1lfVxuICAgICAgICB7Li4udGVzdH1cbiAgICAgICAgb25DbGljaz17KCkgPT4gb25UZXN0TGlzdEl0ZW1DbGljayh0ZXN0Lm5hbWUpfVxuICAgICAgLz5cbiAgICApfVxuICA8L3VsPlxuKVxuXG5UZXN0TGlzdC5wcm9wVHlwZXMgPSB7XG4gIHRlc3RzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBtb2R1bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZ1xuICB9KS5pc1JlcXVpcmVkKS5pc1JlcXVpcmVkLFxuICBvblRlc3RMaXN0SXRlbUNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRlc3RMaXN0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL1Rlc3RMaXN0LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzI4X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIlJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5cbmNvbnN0IFRlc3RMaXN0SXRlbSA9ICh7IG9uQ2xpY2ssIG5hbWUgfSkgPT4gKFxuICA8bGkgb25DbGljaz17b25DbGlja30+e25hbWV9PC9saT5cbilcblxuVGVzdExpc3RJdGVtLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRlc3RMaXN0SXRlbVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy9UZXN0TGlzdEl0ZW0uanNcbiAqKi8iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBjaGFuZ2VWaWV3LCBjaGFuZ2VTZXR0aW5nIH0gZnJvbSAnLi4vYWN0aW9ucydcbmltcG9ydCBTZXR0aW5nc0Zvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9TZXR0aW5nc0Zvcm0nXG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHNldHRpbmdzOiBzdGF0ZS5zZXR0aW5nc1xuICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQmFja0NsaWNrOiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChjaGFuZ2VWaWV3KCdsaXN0JykpXG4gICAgfSxcbiAgICBvbkZpZWxkQ2hhbmdlOiAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goY2hhbmdlU2V0dGluZyhrZXksIHZhbHVlKSlcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgU2V0dGluZ3NGb3JtQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHNcbikoU2V0dGluZ3NGb3JtKVxuXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nc0Zvcm1Db250YWluZXJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbnRhaW5lcnMvU2V0dGluZ3NGb3JtQ29udGFpbmVyLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi9CYWNrTGluaycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jbGFzcyBTZXR0aW5nc0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMucHJvcHMuc2V0dGluZ3NcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzZXR0aW5ncykge1xuICAgICAgY29uc3QgX3JlZiA9IHRoaXNbJ18nICsga2V5XVxuICAgICAgaWYgKF9yZWYgJiYgc2V0dGluZ3Nba2V5XSAhPT0gX3JlZi52YWx1ZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uRmllbGRDaGFuZ2Uoa2V5LCBfcmVmLnZhbHVlKVxuICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3dhcFN0cmVhbU5hbWVzICgpIHtcbiAgICBjb25zdCB2YWx1ZTEgPSB0aGlzLl9zdHJlYW0xLnZhbHVlXG4gICAgY29uc3QgdmFsdWUyID0gdGhpcy5fc3RyZWFtMi52YWx1ZVxuICAgIHRoaXMuX3N0cmVhbTEudmFsdWUgPSB2YWx1ZTJcbiAgICB0aGlzLl9zdHJlYW0yLnZhbHVlID0gdmFsdWUxXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+U2V0dGluZ3M8L2gxPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJzZXR0aW5ncy1maWVsZFwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJzZXR0aW5ncy1sYWJlbFwiIGZvcj1cImhvc3QtZmllbGRcIj5Ib3N0OjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHJlZj17KGMpID0+IHRoaXMuX2hvc3QgPSBjfSBuYW1lPVwiaG9zdC1maWVsZFwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5zZXR0aW5ncy5ob3N0fT48L2lucHV0PlxuICAgICAgICA8L3A+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInNldHRpbmdzLWZpZWxkXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInNldHRpbmdzLWxhYmVsXCIgZm9yPVwic3RyZWFtMS1maWVsZFwiPlN0cmVhbTEgTmFtZTo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCByZWY9eyhjKSA9PiB0aGlzLl9zdHJlYW0xID0gY30gbmFtZT1cInN0cmVhbTEtZmllbGRcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX0+PC9pbnB1dD5cbiAgICAgICAgPC9wPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJzZXR0aW5ncy1maWVsZCBzd2FwLXN0cmVhbXMtbGlua1wiPlxuICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e3RoaXMuc3dhcFN0cmVhbU5hbWVzLmJpbmQodGhpcyl9PlN3YXAgU3RyZWFtIE5hbWVzPC9zcGFuPlxuICAgICAgICA8L3A+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInNldHRpbmdzLWZpZWxkXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInNldHRpbmdzLWxhYmVsXCIgZm9yPVwic3RyZWFtMi1maWVsZFwiPlN0cmVhbTIgTmFtZTo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCByZWY9eyhjKSA9PiB0aGlzLl9zdHJlYW0yID0gY30gbmFtZT1cInN0cmVhbTItZmllbGRcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMn0+PC9pbnB1dD5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuU2V0dGluZ3NGb3JtLnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25GaWVsZENoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3NGb3JtXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL1NldHRpbmdzRm9ybS5qc1xuICoqLyIsImltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBCYWNrTGluayA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8ZGl2IGlkPVwiYmFjay1saW5rLWNvbnRhaW5lclwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxhIGlkPVwiYmFjay1saW5rXCI+UmV0dXJuIHRvIE1lbnU8L2E+XG4gIDwvZGl2PlxuKVxuXG5CYWNrTGluay5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFja0xpbmtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy9CYWNrTGluay5qc1xuICoqLyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGNoYW5nZVZpZXcgfSBmcm9tICcuLi8uLi9hY3Rpb25zJ1xuXG5leHBvcnQgZGVmYXVsdCAodGFyZ2V0VGVzdCkgPT4ge1xuXG4gIGNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBzZXR0aW5nczogc3RhdGUuc2V0dGluZ3NcbiAgICB9XG4gIH1cblxuICBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgb25CYWNrQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goY2hhbmdlVmlldygnbGlzdCcpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IFRlc3RDb250YWluZXIgPSBjb25uZWN0KFxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcbiAgKSh0YXJnZXRUZXN0KVxuXG4gIHJldHVybiA8VGVzdENvbnRhaW5lciAvPlxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb250YWluZXJzL3Rlc3QvVGVzdENvbnRhaW5lci5qc1xuICoqLyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgUHVibGlzaGVyVGVzdCB9IGZyb20gJy4vUHVibGlzaGVyVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUHVibGlzaGVyMTA4MHBUZXN0IH0gZnJvbSAnLi9QdWJsaXNoZXIxMDgwcFRlc3QnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFB1Ymxpc2hlckF1ZGlvT25seVRlc3QgfSBmcm9tICcuL1B1Ymxpc2hlckF1ZGlvT25seVRlc3QnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFB1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3QgfSBmcm9tICcuL1B1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3QnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFB1Ymxpc2hlckNhbWVyYVN3YXBUZXN0IH0gZnJvbSAnLi9QdWJsaXNoZXJDYW1lcmFTd2FwVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUHVibGlzaGVyRmlsdGVyc1Rlc3QgfSBmcm9tICcuL1B1Ymxpc2hlckZpbHRlcnNUZXN0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQdWJsaXNoZXJGYWlsb3ZlclRlc3QgfSBmcm9tICcuL1B1Ymxpc2hlckZhaWxvdmVyVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUHVibGlzaGVySW1hZ2VDYXB0dXJlVGVzdCB9IGZyb20gJy4vUHVibGlzaGVySW1hZ2VDYXB0dXJlVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUHVibGlzaGVyU3RyZWFtTWFuYWdlclRlc3QgfSBmcm9tICcuL1B1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTdWJzY3JpYmVyVGVzdCB9IGZyb20gJy4vU3Vic2NyaWJlclRlc3QnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFN1YnNjcmliZXJGYWlsb3ZlclRlc3QgfSBmcm9tICcuL1N1YnNjcmliZXJGYWlsb3ZlclRlc3QnXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9pbmRleC5qc1xuICoqLyIsIi8qIGdsb2JhbCByZWQ1cHJvc2RrICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgcmVkNXByb3NkayBmcm9tICdyZWQ1cHJvLXNkaydcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIFB1Ymxpc2hlclRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWV3OiB1bmRlZmluZWQsXG4gICAgICBwdWJsaXNoZXI6IHVuZGVmaW5lZCxcbiAgICAgIHN0YXR1czogJ09uIGhvbGQuJ1xuICAgIH1cbiAgfVxuXG4gIHByZXZpZXcgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IG5ldyByZWQ1cHJvc2RrLlJUQ1B1Ymxpc2hlcigpXG4gICAgICBjb25zdCB2aWV3ID0gbmV3IHJlZDVwcm9zZGsuUHVibGlzaGVyVmlldygncmVkNXByby1wdWJsaXNoZXInKVxuICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSh7XG4gICAgICAgIGF1ZGlvOiAhY29tcC5wcm9wcy5zZXR0aW5ncy5hdWRpb09uID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICB2aWRlbzogIWNvbXAucHJvcHMuc2V0dGluZ3MudmlkZW9PbiA/IGZhbHNlIDogdHJ1ZVxuICAgICAgfSwgbWVkaWEgPT4ge1xuXG4gICAgICAgIC8vIFVwb24gYWNjZXNzIG9mIHVzZXIgbWVkaWEsXG4gICAgICAgIC8vIDEuIEF0dGFjaCB0aGUgc3RyZWFtIHRvIHRoZSBwdWJsaXNoZXIuXG4gICAgICAgIC8vIDIuIFNob3cgdGhlIHN0cmVhbSBhcyBwcmV2aWV3IGluIHZpZXcgaW5zdGFuY2UuXG4gICAgICAgIHB1Ymxpc2hlci5hdHRhY2hTdHJlYW0obWVkaWEpXG4gICAgICAgIHZpZXcucHJldmlldyhtZWRpYSwgdHJ1ZSlcblxuICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICBzdGF0ZS5wdWJsaXNoZXIgPSBwdWJsaXNoZXJcbiAgICAgICAgICBzdGF0ZS52aWV3ID0gdmlld1xuICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICB9KVxuXG4gICAgICAgIHJlc29sdmUoKVxuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFtQdWJsaXNoZXJUZXN0XSA6OiBFcnJvciAtICR7ZXJyb3J9YClcbiAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGlzaCAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICBjb25zdCBpY2VTZXJ2ZXJzID0gdGhpcy5wcm9wcy5zZXR0aW5ncy5pY2VTZXJ2ZXJzXG4gICAgY29uc3QgcHVibGlzaGVyID0gdGhpcy5zdGF0ZS5wdWJsaXNoZXJcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5zdGF0ZS52aWV3XG4gICAgdmlldy5hdHRhY2hQdWJsaXNoZXIocHVibGlzaGVyKTtcblxuICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzID0gJ0VzdGFibGlzaGluZyBjb25uZWN0aW9uLi4uJ1xuICAgIH0pXG5cbiAgICAvLyBJbml0aWFsaXplXG4gICAgcHVibGlzaGVyLmluaXQoe1xuICAgICAgcHJvdG9jb2w6ICd3cycsXG4gICAgICBob3N0OiB0aGlzLnByb3BzLnNldHRpbmdzLmhvc3QsXG4gICAgICBwb3J0OiB0aGlzLnByb3BzLnNldHRpbmdzLnJ0Y3BvcnQsXG4gICAgICBhcHA6IHRoaXMucHJvcHMuc2V0dGluZ3MuY29udGV4dCxcbiAgICAgIHN0cmVhbU5hbWU6IHRoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMSxcbiAgICAgIHN0cmVhbVR5cGU6ICd3ZWJydGMnLFxuICAgICAgaWNlU2VydmVyczogaWNlU2VydmVyc1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gSW52b2tlIHRoZSBwdWJsaXNoIGFjdGlvblxuICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9ICdTdGFydGluZyBwdWJsaXNoIHNlc3Npb24uLi4nXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHB1Ymxpc2hlci5wdWJsaXNoKClcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnUHVibGlzaGluZyBzdGFydGVkLiBZb3VcXCdyZSBMaXZlISdcbiAgICAgIH0pXG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgLy8gQSBmYXVsdCBvY2N1cnJlZCB3aGlsZSB0cnlpbmcgdG8gaW5pdGlhbGl6ZSBhbmQgcHVibGlzaCB0aGUgc3RyZWFtLlxuICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgc3RhdGUuc3RhdHVzID0gYEVSUk9SOiAke2pzb25FcnJvcn1gXG4gICAgICB9KVxuICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hlclRlc3RdIDo6IEVycm9yIC0gJHtqc29uRXJyb3J9YClcbiAgICB9KVxuXG4gIH1cblxuICB1bnB1Ymxpc2ggKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHZpZXcgPSBjb21wLnN0YXRlLnZpZXdcbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IGNvbXAuc3RhdGUucHVibGlzaGVyXG4gICAgICBpZiAocHVibGlzaGVyKSB7XG4gICAgICAgIHB1Ymxpc2hlci51bnB1Ymxpc2goKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHZpZXcudmlldy5zcmMgPSAnJ1xuICAgICAgICAgICAgcHVibGlzaGVyLnNldFZpZXcodW5kZWZpbmVkKVxuICAgICAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICBzdGF0ZS52aWV3ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkQ2FtZXJhID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hUZXN0XSA6OiBVbm1vdW50IEVycm9yID0gJHtqc29uRXJyb3J9YClcbiAgICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgcHViID0gdGhpcy5wdWJsaXNoLmJpbmQodGhpcylcbiAgICB0aGlzLnByZXZpZXcoKVxuICAgICAgLnRoZW4ocHViKVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW1B1Ymxpc2hUZXN0XSA6OiBFcnJvciAtIENvdWxkIG5vdCBzdGFydCBwdWJsaXNoaW5nIHNlc3Npb24uJylcbiAgICAgIH0pXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG4gICAgdGhpcy51bnB1Ymxpc2goKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB2aWRlb1N0eWxlID0ge1xuICAgICAgJ3dpZHRoJzogJzEwMCUnLFxuICAgICAgJ21heC13aWR0aCc6ICc2NDBweCdcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5QdWJsaXNoZXIgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiY2VudGVyZWQgcHVibGlzaC1zdGF0dXMtZmllbGRcIj5TVEFUVVM6IHt0aGlzLnN0YXRlLnN0YXR1c308L3A+XG4gICAgICAgIDxkaXYgcmVmPXtjID0+IHRoaXMuX3ZpZGVvQ29udGFpbmVyID0gY31cbiAgICAgICAgICBpZD1cInZpZGVvLWNvbnRhaW5lclwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5cbiAgICAgICAgICA8dmlkZW8gcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9QdWJsaXNoZXIgPSBjfVxuICAgICAgICAgICAgaWQ9XCJyZWQ1cHJvLXB1Ymxpc2hlclwiXG4gICAgICAgICAgICBzdHlsZT17dmlkZW9TdHlsZX1cbiAgICAgICAgICAgIGNvbnRyb2xzIGF1dG9wbGF5IGRpc2FibGVkPjwvdmlkZW8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuUHVibGlzaGVyVGVzdC5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hlclRlc3RcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L1B1Ymxpc2hlclRlc3QuanNcbiAqKi8iLCIvKiBnbG9iYWwgcmVkNXByb3NkayAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuLy8gaW1wb3J0IHJlZDVwcm9zZGsgZnJvbSAncmVkNXByby1zZGsnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBCYWNrTGluayBmcm9tICcuLi9CYWNrTGluaycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jbGFzcyBQdWJsaXNoZXIxMDgwcFRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWV3OiB1bmRlZmluZWQsXG4gICAgICBwdWJsaXNoZXI6IHVuZGVmaW5lZCxcbiAgICAgIHN0YXR1czogJ09uIGhvbGQuJ1xuICAgIH1cbiAgfVxuXG4gIHByZXZpZXcgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IG5ldyByZWQ1cHJvc2RrLlJUQ1B1Ymxpc2hlcigpXG4gICAgICBjb25zdCB2aWV3ID0gbmV3IHJlZDVwcm9zZGsuUHVibGlzaGVyVmlldygncmVkNXByby1wdWJsaXNoZXInKVxuICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSh7XG4gICAgICAgIGF1ZGlvOiAhY29tcC5wcm9wcy5zZXR0aW5ncy5hdWRpb09uID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICB2aWRlbzoge1xuICAgICAgICAgIHdpZHRoOiAxOTIwLFxuICAgICAgICAgIGhlaWdodDogMTA4MFxuICAgICAgICB9XG4gICAgICB9LCBtZWRpYSA9PiB7XG5cbiAgICAgICAgLy8gVXBvbiBhY2Nlc3Mgb2YgdXNlciBtZWRpYSxcbiAgICAgICAgLy8gMS4gQXR0YWNoIHRoZSBzdHJlYW0gdG8gdGhlIHB1Ymxpc2hlci5cbiAgICAgICAgLy8gMi4gU2hvdyB0aGUgc3RyZWFtIGFzIHByZXZpZXcgaW4gdmlldyBpbnN0YW5jZS5cbiAgICAgICAgcHVibGlzaGVyLmF0dGFjaFN0cmVhbShtZWRpYSlcbiAgICAgICAgdmlldy5wcmV2aWV3KG1lZGlhLCB0cnVlKVxuXG4gICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHB1Ymxpc2hlclxuICAgICAgICAgIHN0YXRlLnZpZXcgPSB2aWV3XG4gICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmVzb2x2ZSgpXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hlcjEwODBwVGVzdF0gOjogRXJyb3IgLSAke2Vycm9yfWApXG4gICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHB1Ymxpc2ggKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgY29uc3QgaWNlU2VydmVycyA9IHRoaXMucHJvcHMuc2V0dGluZ3MuaWNlU2VydmVyc1xuICAgIGNvbnN0IHB1Ymxpc2hlciA9IHRoaXMuc3RhdGUucHVibGlzaGVyXG4gICAgY29uc3QgdmlldyA9IHRoaXMuc3RhdGUudmlld1xuICAgIHZpZXcuYXR0YWNoUHVibGlzaGVyKHB1Ymxpc2hlcik7XG5cbiAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1cyA9ICdFc3RhYmxpc2hpbmcgY29ubmVjdGlvbi4uLidcbiAgICB9KVxuXG4gICAgLy8gSW5pdGlhbGl6ZVxuICAgIHB1Ymxpc2hlci5pbml0KHtcbiAgICAgIHByb3RvY29sOiAnd3MnLFxuICAgICAgaG9zdDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ob3N0LFxuICAgICAgcG9ydDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ydGNwb3J0LFxuICAgICAgYXBwOiB0aGlzLnByb3BzLnNldHRpbmdzLmNvbnRleHQsXG4gICAgICBzdHJlYW1OYW1lOiB0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTEsXG4gICAgICBzdHJlYW1UeXBlOiAnd2VicnRjJyxcbiAgICAgIGljZVNlcnZlcnM6IGljZVNlcnZlcnNcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIC8vIEludm9rZSB0aGUgcHVibGlzaCBhY3Rpb25cbiAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnU3RhcnRpbmcgcHVibGlzaCBzZXNzaW9uLi4uJ1xuICAgICAgfSlcbiAgICAgIHJldHVybiBwdWJsaXNoZXIucHVibGlzaCgpXG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgc3RhdGUuc3RhdHVzID0gJ1B1Ymxpc2hpbmcgc3RhcnRlZC4gWW91XFwncmUgTGl2ZSEnXG4gICAgICB9KVxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIC8vIEEgZmF1bHQgb2NjdXJyZWQgd2hpbGUgdHJ5aW5nIHRvIGluaXRpYWxpemUgYW5kIHB1Ymxpc2ggdGhlIHN0cmVhbS5cbiAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9IGBFUlJPUjogJHtqc29uRXJyb3J9YFxuICAgICAgfSlcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFtQdWJsaXNoZXIxMDgwcFRlc3RdIDo6IEVycm9yIC0gJHtqc29uRXJyb3J9YClcbiAgICB9KVxuXG4gIH1cblxuICB1bnB1Ymxpc2ggKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHZpZXcgPSBjb21wLnN0YXRlLnZpZXdcbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IGNvbXAuc3RhdGUucHVibGlzaGVyXG4gICAgICBpZiAocHVibGlzaGVyKSB7XG4gICAgICAgIHB1Ymxpc2hlci51bnB1Ymxpc2goKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHZpZXcudmlldy5zcmMgPSAnJ1xuICAgICAgICAgICAgcHVibGlzaGVyLnNldFZpZXcodW5kZWZpbmVkKVxuICAgICAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICBzdGF0ZS52aWV3ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkQ2FtZXJhID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hUZXN0XSA6OiBVbm1vdW50IEVycm9yID0gJHtqc29uRXJyb3J9YClcbiAgICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgcHViID0gdGhpcy5wdWJsaXNoLmJpbmQodGhpcylcbiAgICB0aGlzLnByZXZpZXcoKVxuICAgICAgLnRoZW4ocHViKVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW1B1Ymxpc2hUZXN0XSA6OiBFcnJvciAtIENvdWxkIG5vdCBzdGFydCBwdWJsaXNoaW5nIHNlc3Npb24uJylcbiAgICAgIH0pXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG4gICAgdGhpcy51bnB1Ymxpc2goKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB2aWRlb1N0eWxlID0ge1xuICAgICAgJ3dpZHRoJzogJzEwMCUnLFxuICAgICAgJ21heC13aWR0aCc6ICc2NDBweCdcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5QdWJsaXNoZXIgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiY2VudGVyZWQgcHVibGlzaC1zdGF0dXMtZmllbGRcIj5TVEFUVVM6IHt0aGlzLnN0YXRlLnN0YXR1c308L3A+XG4gICAgICAgIDxkaXYgcmVmPXtjID0+IHRoaXMuX3ZpZGVvQ29udGFpbmVyID0gY31cbiAgICAgICAgICBpZD1cInZpZGVvLWNvbnRhaW5lclwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5cbiAgICAgICAgICA8dmlkZW8gcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9QdWJsaXNoZXIgPSBjfVxuICAgICAgICAgICAgaWQ9XCJyZWQ1cHJvLXB1Ymxpc2hlclwiXG4gICAgICAgICAgICBzdHlsZT17dmlkZW9TdHlsZX1cbiAgICAgICAgICAgIGNvbnRyb2xzIGF1dG9wbGF5IGRpc2FibGVkPjwvdmlkZW8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuUHVibGlzaGVyMTA4MHBUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVyMTA4MHBUZXN0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvUHVibGlzaGVyMTA4MHBUZXN0LmpzXG4gKiovIiwiLyogZ2xvYmFsIHJlZDVwcm9zZGsgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbi8vIGltcG9ydCByZWQ1cHJvc2RrIGZyb20gJ3JlZDVwcm8tc2RrJ1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi4vQmFja0xpbmsnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY2xhc3MgUHVibGlzaGVyQXVkaW9Pbmx5VGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpZXc6IHVuZGVmaW5lZCxcbiAgICAgIHB1Ymxpc2hlcjogdW5kZWZpbmVkLFxuICAgICAgc3RhdHVzOiAnT24gaG9sZC4nXG4gICAgfVxuICB9XG5cbiAgcHJldmlldyAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcHVibGlzaGVyID0gbmV3IHJlZDVwcm9zZGsuUlRDUHVibGlzaGVyKClcbiAgICAgIGNvbnN0IHZpZXcgPSBuZXcgcmVkNXByb3Nkay5QdWJsaXNoZXJWaWV3KCdyZWQ1cHJvLXB1Ymxpc2hlcicpXG4gICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgYXVkaW86IHRydWUsXG4gICAgICAgIHZpZGVvOiBmYWxzZVxuICAgICAgfSwgbWVkaWEgPT4ge1xuXG4gICAgICAgIC8vIFVwb24gYWNjZXNzIG9mIHVzZXIgbWVkaWEsXG4gICAgICAgIC8vIDEuIEF0dGFjaCB0aGUgc3RyZWFtIHRvIHRoZSBwdWJsaXNoZXIuXG4gICAgICAgIC8vIDIuIFNob3cgdGhlIHN0cmVhbSBhcyBwcmV2aWV3IGluIHZpZXcgaW5zdGFuY2UuXG4gICAgICAgIHB1Ymxpc2hlci5hdHRhY2hTdHJlYW0obWVkaWEpXG4gICAgICAgIHZpZXcucHJldmlldyhtZWRpYSwgdHJ1ZSlcblxuICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICBzdGF0ZS5wdWJsaXNoZXIgPSBwdWJsaXNoZXJcbiAgICAgICAgICBzdGF0ZS52aWV3ID0gdmlld1xuICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICB9KVxuXG4gICAgICAgIHJlc29sdmUoKVxuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFtQdWJsaXNoZXJBdWRpb09ubHlUZXN0XSA6OiBFcnJvciAtICR7ZXJyb3J9YClcbiAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGlzaCAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICBjb25zdCBpY2VTZXJ2ZXJzID0gdGhpcy5wcm9wcy5zZXR0aW5ncy5pY2VTZXJ2ZXJzXG4gICAgY29uc3QgcHVibGlzaGVyID0gdGhpcy5zdGF0ZS5wdWJsaXNoZXJcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5zdGF0ZS52aWV3XG4gICAgdmlldy5hdHRhY2hQdWJsaXNoZXIocHVibGlzaGVyKTtcblxuICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzID0gJ0VzdGFibGlzaGluZyBjb25uZWN0aW9uLi4uJ1xuICAgIH0pXG5cbiAgICAvLyBJbml0aWFsaXplXG4gICAgcHVibGlzaGVyLmluaXQoe1xuICAgICAgcHJvdG9jb2w6ICd3cycsXG4gICAgICBob3N0OiB0aGlzLnByb3BzLnNldHRpbmdzLmhvc3QsXG4gICAgICBwb3J0OiB0aGlzLnByb3BzLnNldHRpbmdzLnJ0Y3BvcnQsXG4gICAgICBhcHA6IHRoaXMucHJvcHMuc2V0dGluZ3MuY29udGV4dCxcbiAgICAgIHN0cmVhbU5hbWU6IHRoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMSxcbiAgICAgIHN0cmVhbVR5cGU6ICd3ZWJydGMnLFxuICAgICAgaWNlU2VydmVyczogaWNlU2VydmVyc1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gSW52b2tlIHRoZSBwdWJsaXNoIGFjdGlvblxuICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9ICdTdGFydGluZyBwdWJsaXNoIHNlc3Npb24uLi4nXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHB1Ymxpc2hlci5wdWJsaXNoKClcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnUHVibGlzaGluZyBzdGFydGVkLiBZb3VcXCdyZSBMaXZlISdcbiAgICAgIH0pXG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgLy8gQSBmYXVsdCBvY2N1cnJlZCB3aGlsZSB0cnlpbmcgdG8gaW5pdGlhbGl6ZSBhbmQgcHVibGlzaCB0aGUgc3RyZWFtLlxuICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgc3RhdGUuc3RhdHVzID0gYEVSUk9SOiAke2pzb25FcnJvcn1gXG4gICAgICB9KVxuICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3RdIDo6IEVycm9yIC0gJHtqc29uRXJyb3J9YClcbiAgICB9KVxuXG4gIH1cblxuICB1bnB1Ymxpc2ggKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHZpZXcgPSBjb21wLnN0YXRlLnZpZXdcbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IGNvbXAuc3RhdGUucHVibGlzaGVyXG4gICAgICBpZiAocHVibGlzaGVyKSB7XG4gICAgICAgIHB1Ymxpc2hlci51bnB1Ymxpc2goKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHZpZXcudmlldy5zcmMgPSAnJ1xuICAgICAgICAgICAgcHVibGlzaGVyLnNldFZpZXcodW5kZWZpbmVkKVxuICAgICAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICBzdGF0ZS52aWV3ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkQ2FtZXJhID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hUZXN0XSA6OiBVbm1vdW50IEVycm9yID0gJHtqc29uRXJyb3J9YClcbiAgICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgcHViID0gdGhpcy5wdWJsaXNoLmJpbmQodGhpcylcbiAgICB0aGlzLnByZXZpZXcoKVxuICAgICAgLnRoZW4ocHViKVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW1B1Ymxpc2hUZXN0XSA6OiBFcnJvciAtIENvdWxkIG5vdCBzdGFydCBwdWJsaXNoaW5nIHNlc3Npb24uJylcbiAgICAgIH0pXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG4gICAgdGhpcy51bnB1Ymxpc2goKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB2aWRlb1N0eWxlID0ge1xuICAgICAgJ3dpZHRoJzogJzEwMCUnLFxuICAgICAgJ21heC13aWR0aCc6ICc2NDBweCcsXG4gICAgICAnaGVpZ2h0JzogJzQwcHgnXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+UHVibGlzaGVyIFRlc3Q8L2gxPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+PGVtPnN0cmVhbTwvZW0+OiB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfTwvaDI+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImNlbnRlcmVkIHB1Ymxpc2gtc3RhdHVzLWZpZWxkXCI+U1RBVFVTOiB7dGhpcy5zdGF0ZS5zdGF0dXN9PC9wPlxuICAgICAgICA8ZGl2IHJlZj17YyA9PiB0aGlzLl92aWRlb0NvbnRhaW5lciA9IGN9XG4gICAgICAgICAgaWQ9XCJ2aWRlby1jb250YWluZXJcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+XG4gICAgICAgICAgPHZpZGVvIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvUHVibGlzaGVyID0gY31cbiAgICAgICAgICAgIGlkPVwicmVkNXByby1wdWJsaXNoZXJcIlxuICAgICAgICAgICAgc3R5bGU9e3ZpZGVvU3R5bGV9XG4gICAgICAgICAgICBjb250cm9scyBhdXRvcGxheSBkaXNhYmxlZD48L3ZpZGVvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblB1Ymxpc2hlckF1ZGlvT25seVRlc3QucHJvcFR5cGVzID0ge1xuICBzZXR0aW5nczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbkJhY2tDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoZXJBdWRpb09ubHlUZXN0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvUHVibGlzaGVyQXVkaW9Pbmx5VGVzdC5qc1xuICoqLyIsIi8qIGdsb2JhbCByZWQ1cHJvc2RrICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgcmVkNXByb3NkayBmcm9tICdyZWQ1cHJvLXNkaydcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNvbnN0IFNFTEVDVF9ERUZBVUxUID0gJ1NlbGVjdCBhIGNhbWVyYS4uLidcblxuY2xhc3MgUHVibGlzaGVyQ2FtZXJhU291cmNlVGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpZXc6IHVuZGVmaW5lZCxcbiAgICAgIHB1Ymxpc2hlcjogdW5kZWZpbmVkLFxuICAgICAgY2FtZXJhczogW3tcbiAgICAgICAgbGFiZWw6IFNFTEVDVF9ERUZBVUxUXG4gICAgICB9XSxcbiAgICAgIHNlbGVjdGVkQ2FtZXJhOiB1bmRlZmluZWQsXG4gICAgICBzdGF0dXM6ICdPbiBob2xkLidcbiAgICB9XG4gIH1cblxuICB3YWl0Rm9yU2VsZWN0ICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpXG4gICAgICAudGhlbihkZXZpY2VzID0+IHtcbiAgICAgICAgbGV0IHZpZGVvQ2FtZXJhcyA9IGRldmljZXMuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgIHJldHVybiBpdGVtLmtpbmQgPT09ICd2aWRlb2lucHV0J1xuICAgICAgICB9KVxuICAgICAgICBjb25zdCBjYW1lcmFzID0gW3tcbiAgICAgICAgICBsYWJlbDogU0VMRUNUX0RFRkFVTFRcbiAgICAgICAgfV0uY29uY2F0KHZpZGVvQ2FtZXJhcylcbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUuY2FtZXJhcyA9IGNhbWVyYXNcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gIH1cblxuICBwcmV2aWV3IChtZWRpYURldmljZUlkKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICBjb25zdCBjcmVhdGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcHVibGlzaGVyID0gbmV3IHJlZDVwcm9zZGsuUlRDUHVibGlzaGVyKClcbiAgICAgIGNvbnN0IHZpZXcgPSBuZXcgcmVkNXByb3Nkay5QdWJsaXNoZXJWaWV3KCdyZWQ1cHJvLXB1Ymxpc2hlcicpXG4gICAgICBjb25zdCBnbWQgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2UgfHwgbmF2aWdhdG9yXG4gICAgICBnbWQuZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgYXVkaW86ICFjb21wLnByb3BzLnNldHRpbmdzLmF1ZGlvT24gPyBmYWxzZSA6IHRydWUsXG4gICAgICAgIHZpZGVvOiB7XG4gICAgICAgICAgb3B0aW9uYWw6IFt7XG4gICAgICAgICAgICBzb3VyY2VJZDogbWVkaWFEZXZpY2VJZFxuICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICAgIH0sIG1lZGlhID0+IHtcblxuICAgICAgICAvLyBVcG9uIGFjY2VzcyBvZiB1c2VyIG1lZGlhLFxuICAgICAgICAvLyAxLiBBdHRhY2ggdGhlIHN0cmVhbSB0byB0aGUgcHVibGlzaGVyLlxuICAgICAgICAvLyAyLiBTaG93IHRoZSBzdHJlYW0gYXMgcHJldmlldyBpbiB2aWV3IGluc3RhbmNlLlxuICAgICAgICBwdWJsaXNoZXIuYXR0YWNoU3RyZWFtKG1lZGlhKVxuICAgICAgICB2aWV3LnByZXZpZXcobWVkaWEsIHRydWUpXG5cbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUucHVibGlzaGVyID0gcHVibGlzaGVyXG4gICAgICAgICAgc3RhdGUudmlldyA9IHZpZXdcbiAgICAgICAgICBzdGF0ZS5zZWxlY3RlZENhbWVyYSA9IG1lZGlhRGV2aWNlSWRcbiAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgfSlcblxuICAgICAgICByZXNvbHZlKClcblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaGVyQ2FtZXJhU291cmNlVGVzdF0gOjogRXJyb3IgLSAke2Vycm9yfWApXG4gICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGlmICh0aGlzLnN0YXRlLnB1Ymxpc2hlcikge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhdGUucHVibGlzaGVyLnVucHVibGlzaCgpXG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVQcm9taXNlXG4gIH1cblxuICBwdWJsaXNoICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIGNvbnN0IGljZVNlcnZlcnMgPSB0aGlzLnByb3BzLnNldHRpbmdzLmljZVNlcnZlcnNcbiAgICBjb25zdCBwdWJsaXNoZXIgPSB0aGlzLnN0YXRlLnB1Ymxpc2hlclxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLnN0YXRlLnZpZXdcbiAgICB2aWV3LmF0dGFjaFB1Ymxpc2hlcihwdWJsaXNoZXIpO1xuXG4gICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXMgPSAnRXN0YWJsaXNoaW5nIGNvbm5lY3Rpb24uLi4nXG4gICAgfSlcblxuICAgIC8vIEluaXRpYWxpemVcbiAgICBwdWJsaXNoZXIuaW5pdCh7XG4gICAgICBwcm90b2NvbDogJ3dzJyxcbiAgICAgIGhvc3Q6IHRoaXMucHJvcHMuc2V0dGluZ3MuaG9zdCxcbiAgICAgIHBvcnQ6IHRoaXMucHJvcHMuc2V0dGluZ3MucnRjcG9ydCxcbiAgICAgIGFwcDogdGhpcy5wcm9wcy5zZXR0aW5ncy5jb250ZXh0LFxuICAgICAgc3RyZWFtTmFtZTogdGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xLFxuICAgICAgc3RyZWFtVHlwZTogJ3dlYnJ0YycsXG4gICAgICBpY2VTZXJ2ZXJzOiBpY2VTZXJ2ZXJzXG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICAvLyBJbnZva2UgdGhlIHB1Ymxpc2ggYWN0aW9uXG4gICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgc3RhdGUuc3RhdHVzID0gJ1N0YXJ0aW5nIHB1Ymxpc2ggc2Vzc2lvbi4uLidcbiAgICAgIH0pXG4gICAgICByZXR1cm4gcHVibGlzaGVyLnB1Ymxpc2goKVxuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9ICdQdWJsaXNoaW5nIHN0YXJ0ZWQuIFlvdVxcJ3JlIExpdmUhJ1xuICAgICAgfSlcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAvLyBBIGZhdWx0IG9jY3VycmVkIHdoaWxlIHRyeWluZyB0byBpbml0aWFsaXplIGFuZCBwdWJsaXNoIHRoZSBzdHJlYW0uXG4gICAgICBjb25zdCBqc29uRXJyb3IgPSB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnID8gZXJyb3IgOiBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgMilcbiAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICBzdGF0ZS5zdGF0dXMgPSBgRVJST1I6ICR7anNvbkVycm9yfWBcbiAgICAgIH0pXG4gICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaGVyQ2FtZXJhU291cmNlVGVzdF0gOjogRXJyb3IgLSAke2pzb25FcnJvcn1gKVxuICAgIH0pXG5cbiAgfVxuXG4gIHVucHVibGlzaCAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgdmlldyA9IGNvbXAuc3RhdGUudmlld1xuICAgICAgY29uc3QgcHVibGlzaGVyID0gY29tcC5zdGF0ZS5wdWJsaXNoZXJcbiAgICAgIGlmIChwdWJsaXNoZXIpIHtcbiAgICAgICAgcHVibGlzaGVyLnVucHVibGlzaCgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdmlldy52aWV3LnNyYyA9ICcnXG4gICAgICAgICAgICBwdWJsaXNoZXIuc2V0Vmlldyh1bmRlZmluZWQpXG4gICAgICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICAgICAgc3RhdGUucHVibGlzaGVyID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnZpZXcgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWRDYW1lcmEgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaFRlc3RdIDo6IFVubW91bnQgRXJyb3IgPSAke2pzb25FcnJvcn1gKVxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG9uQ2FtZXJhU2VsZWN0ICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIGNvbnN0IGNhbWVyYVNlbGVjdGVkID0gY29tcC5fY2FtZXJhU2VsZWN0LnZhbHVlXG4gICAgaWYgKGNvbXAuc3RhdGUuc2VsZWN0ZWRDYW1lcmEgIT09IGNhbWVyYVNlbGVjdGVkICYmXG4gICAgICAoY2FtZXJhU2VsZWN0ZWQgJiYgY2FtZXJhU2VsZWN0ZWQgIT09IFNFTEVDVF9ERUZBVUxUKSkge1xuICAgICAgY29uc3QgcHViID0gY29tcC5wdWJsaXNoLmJpbmQoY29tcClcbiAgICAgIGNvbXAudW5wdWJsaXNoKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21wLnByZXZpZXcoY2FtZXJhU2VsZWN0ZWQpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHB1YilcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdbUHVibGlzaFRlc3RdIDo6IEVycm9yIC0gQ291bGQgbm90IHN0YXJ0IHB1Ymxpc2hpbmcgc2Vzc2lvbi4nKVxuICAgICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLndhaXRGb3JTZWxlY3QoKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIHRoaXMudW5wdWJsaXNoKClcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgdmlkZW9TdHlsZSA9IHtcbiAgICAgICd3aWR0aCc6ICcxMDAlJyxcbiAgICAgICdtYXgtd2lkdGgnOiAnNjQwcHgnXG4gICAgfVxuICAgIGNvbnN0IGxhYmVsU3R5bGUgPSB7XG4gICAgICAnbWFyZ2luLXJpZ2h0JzogJzAuNXJlbSdcbiAgICB9XG4gICAgY29uc3QgY2FtZXJhU2VsZWN0RmllbGQgPSB7XG4gICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjZmZmZmZmJyxcbiAgICAgICdwYWRkaW5nJzogJzAuOHJlbSdcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5QdWJsaXNoZXIgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnN0cnVjdGlvbnMtYmxvY2tcIj5cbiAgICAgICAgICA8cD5UbyBiZWdpbiB0aGlzIHRlc3QsIGZpcnN0IHNlbGVjdCBhIGNhbWVyYSBmcm9tIHRoZSBmb2xsb3dpbmcgc2VsZWN0aW9uczo8L3A+XG4gICAgICAgICAgPHAgc3R5bGU9e2NhbWVyYVNlbGVjdEZpZWxkfT5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjYW1lcmEtc2VsZWN0XCIgc3R5bGU9e2xhYmVsU3R5bGV9PkNhbWVyYSBTb3VyY2U6PC9sYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3QgcmVmPXtjID0+IHRoaXMuX2NhbWVyYVNlbGVjdCA9IGN9XG4gICAgICAgICAgICAgIGlkPVwiY2FtZXJhLXNlbGVjdFwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2FtZXJhU2VsZWN0LmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5jYW1lcmFzLm1hcChjYW1lcmEgPT5cbiAgICAgICAgICAgICAgICAodGhpcy5zdGF0ZS5zZWxlY3RlZENhbWVyYSA9PT0gY2FtZXJhLmRldmljZUlkKVxuICAgICAgICAgICAgICAgICAgPyA8b3B0aW9uIHZhbHVlPXtjYW1lcmEuZGV2aWNlSWR9IHNlbGVjdGVkPntjYW1lcmEubGFiZWx9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA6IDxvcHRpb24gdmFsdWU9e2NhbWVyYS5kZXZpY2VJZH0+e2NhbWVyYS5sYWJlbH08L29wdGlvbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImNlbnRlcmVkIHB1Ymxpc2gtc3RhdHVzLWZpZWxkXCI+U1RBVFVTOiB7dGhpcy5zdGF0ZS5zdGF0dXN9PC9wPlxuICAgICAgICA8ZGl2IHJlZj17YyA9PiB0aGlzLl92aWRlb0NvbnRhaW5lciA9IGN9XG4gICAgICAgICAgaWQ9XCJ2aWRlby1jb250YWluZXJcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+XG4gICAgICAgICAgPHZpZGVvIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvUHVibGlzaGVyID0gY31cbiAgICAgICAgICAgIGlkPVwicmVkNXByby1wdWJsaXNoZXJcIlxuICAgICAgICAgICAgc3R5bGU9e3ZpZGVvU3R5bGV9XG4gICAgICAgICAgICBjb250cm9scyBhdXRvcGxheSBkaXNhYmxlZD48L3ZpZGVvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblB1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3QucHJvcFR5cGVzID0ge1xuICBzZXR0aW5nczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbkJhY2tDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoZXJDYW1lcmFTb3VyY2VUZXN0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvUHVibGlzaGVyQ2FtZXJhU291cmNlVGVzdC5qc1xuICoqLyIsIi8qIGdsb2JhbCByZWQ1cHJvc2RrICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgcmVkNXByb3NkayBmcm9tICdyZWQ1cHJvLXNkaydcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNvbnN0IEZBQ0lOR19NT0RFX0ZST05UID0gJ3VzZXInXG5jb25zdCBGQUNJTkdfTU9ERV9SRUFSID0gJ2Vudmlyb25tZW50J1xuXG5jbGFzcyBQdWJsaXNoZXJDYW1lcmFTd2FwVGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpZXc6IHVuZGVmaW5lZCxcbiAgICAgIHB1Ymxpc2hlcjogdW5kZWZpbmVkLFxuICAgICAgZmFjaW5nTW9kZUZyb250OiB0cnVlLFxuICAgICAgc3RhdHVzOiAnT24gaG9sZC4nLFxuICAgICAgc3VwcG9ydGVkOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHByZXZpZXcgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IG5ldyByZWQ1cHJvc2RrLlJUQ1B1Ymxpc2hlcigpXG4gICAgICBjb25zdCB2aWV3ID0gbmV3IHJlZDVwcm9zZGsuUHVibGlzaGVyVmlldygncmVkNXByby1wdWJsaXNoZXInKVxuICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSh7XG4gICAgICAgIGF1ZGlvOiAhY29tcC5wcm9wcy5zZXR0aW5ncy5hdWRpb09uID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICB2aWRlbzoge1xuICAgICAgICAgIGZhY2luZ01vZGU6IGNvbXAuc3RhdGUuZmFjaW5nTW9kZUZyb250ID8gRkFDSU5HX01PREVfRlJPTlQgOiBGQUNJTkdfTU9ERV9SRUFSXG4gICAgICAgIH1cbiAgICAgIH0sIG1lZGlhID0+IHtcblxuICAgICAgICAvLyBVcG9uIGFjY2VzcyBvZiB1c2VyIG1lZGlhLFxuICAgICAgICAvLyAxLiBBdHRhY2ggdGhlIHN0cmVhbSB0byB0aGUgcHVibGlzaGVyLlxuICAgICAgICAvLyAyLiBTaG93IHRoZSBzdHJlYW0gYXMgcHJldmlldyBpbiB2aWV3IGluc3RhbmNlLlxuICAgICAgICBwdWJsaXNoZXIuYXR0YWNoU3RyZWFtKG1lZGlhKVxuICAgICAgICB2aWV3LnByZXZpZXcobWVkaWEsIHRydWUpXG5cbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUucHVibGlzaGVyID0gcHVibGlzaGVyXG4gICAgICAgICAgc3RhdGUudmlldyA9IHZpZXdcbiAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgfSlcblxuICAgICAgICByZXNvbHZlKClcblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaGVyQ2FtZXJhU3dhcFRlc3RdIDo6IEVycm9yIC0gJHtlcnJvcn1gKVxuICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwdWJsaXNoICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIGNvbnN0IGljZVNlcnZlcnMgPSB0aGlzLnByb3BzLnNldHRpbmdzLmljZVNlcnZlcnNcbiAgICBjb25zdCBwdWJsaXNoZXIgPSB0aGlzLnN0YXRlLnB1Ymxpc2hlclxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLnN0YXRlLnZpZXdcbiAgICB2aWV3LmF0dGFjaFB1Ymxpc2hlcihwdWJsaXNoZXIpO1xuXG4gICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXMgPSAnRXN0YWJsaXNoaW5nIGNvbm5lY3Rpb24uLi4nXG4gICAgfSlcblxuICAgIC8vIEluaXRpYWxpemVcbiAgICBwdWJsaXNoZXIuaW5pdCh7XG4gICAgICBwcm90b2NvbDogJ3dzJyxcbiAgICAgIGhvc3Q6IHRoaXMucHJvcHMuc2V0dGluZ3MuaG9zdCxcbiAgICAgIHBvcnQ6IHRoaXMucHJvcHMuc2V0dGluZ3MucnRjcG9ydCxcbiAgICAgIGFwcDogdGhpcy5wcm9wcy5zZXR0aW5ncy5jb250ZXh0LFxuICAgICAgc3RyZWFtTmFtZTogdGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xLFxuICAgICAgc3RyZWFtVHlwZTogJ3dlYnJ0YycsXG4gICAgICBpY2VTZXJ2ZXJzOiBpY2VTZXJ2ZXJzXG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICAvLyBJbnZva2UgdGhlIHB1Ymxpc2ggYWN0aW9uXG4gICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgc3RhdGUuc3RhdHVzID0gJ1N0YXJ0aW5nIHB1Ymxpc2ggc2Vzc2lvbi4uLidcbiAgICAgIH0pXG4gICAgICByZXR1cm4gcHVibGlzaGVyLnB1Ymxpc2goKVxuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgZmFjaW5nTW9kZSA9IGNvbXAuc3RhdGUuZmFjaW5nTW9kZUZyb250ID8gRkFDSU5HX01PREVfRlJPTlQgOiBGQUNJTkdfTU9ERV9SRUFSXG4gICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgc3RhdGUuc3RhdHVzID0gYFB1Ymxpc2hpbmcgc3RhcnRlZC4gWW91XFwncmUgTGl2ZSEgRmFjaW5nTW9kZT0ke2ZhY2luZ01vZGV9YFxuICAgICAgfSlcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAvLyBBIGZhdWx0IG9jY3VycmVkIHdoaWxlIHRyeWluZyB0byBpbml0aWFsaXplIGFuZCBwdWJsaXNoIHRoZSBzdHJlYW0uXG4gICAgICBjb25zdCBqc29uRXJyb3IgPSB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnID8gZXJyb3IgOiBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgMilcbiAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICBzdGF0ZS5zdGF0dXMgPSBgRVJST1I6ICR7anNvbkVycm9yfWBcbiAgICAgIH0pXG4gICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaGVyQ2FtZXJhU3dhcFRlc3RdIDo6IEVycm9yIC0gJHtqc29uRXJyb3J9YClcbiAgICB9KVxuXG4gIH1cblxuICB1bnB1Ymxpc2ggKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHZpZXcgPSBjb21wLnN0YXRlLnZpZXdcbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IGNvbXAuc3RhdGUucHVibGlzaGVyXG4gICAgICBpZiAocHVibGlzaGVyKSB7XG4gICAgICAgIHB1Ymxpc2hlci51bnB1Ymxpc2goKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHZpZXcudmlldy5zcmMgPSAnJ1xuICAgICAgICAgICAgcHVibGlzaGVyLnNldFZpZXcodW5kZWZpbmVkKVxuICAgICAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICBzdGF0ZS52aWV3ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkQ2FtZXJhID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hUZXN0XSA6OiBVbm1vdW50IEVycm9yID0gJHtqc29uRXJyb3J9YClcbiAgICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdXBwb3J0ZWQgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFN1cHBvcnRlZENvbnN0cmFpbnRzKClbXCJmYWNpbmdNb2RlXCJdXG4gICAgfSlcblxuICAgIGNvbnN0IHB1YiA9IHRoaXMucHVibGlzaC5iaW5kKHRoaXMpXG4gICAgdGhpcy5wcmV2aWV3KClcbiAgICAgIC50aGVuKHB1YilcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tQdWJsaXNoVGVzdF0gOjogRXJyb3IgLSBDb3VsZCBub3Qgc3RhcnQgcHVibGlzaGluZyBzZXNzaW9uLicpXG4gICAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIHRoaXMudW5wdWJsaXNoKClcbiAgfVxuXG4gIG9uQ2FtZXJhU3dhcFJlcXVlc3QgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgY29uc3QgcHViID0gdGhpcy5wdWJsaXNoLmJpbmQodGhpcylcbiAgICBjb25zdCBwcmV2ID0gdGhpcy5wcmV2aWV3LmJpbmQodGhpcylcblxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuZmFjaW5nTW9kZUZyb250ID0gIXN0YXRlLmZhY2luZ01vZGVGcm9udFxuICAgIH0pXG5cbiAgICB0aGlzLnVucHVibGlzaCgpXG4gICAgICAudGhlbihwcmV2KVxuICAgICAgLnRoZW4ocHViKVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUuc3RhdHVzID0gJ0Vycm9yOiBDb3VsZCBub3Qgc3RhcnQgcHVibGlzaGluZyBzZXNzaW9uIHN3YXAgY2FtZXJhLidcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5lcnJvcignW1B1Ymxpc2hDYW1lcmFUZXN0XSA6OiBFcnJvciAtIENvdWxkIG5vdCBzdGFydCBwdWJsaXNoaW5nIHNlc3Npb24gb24gY2FtZXJhIHN3YXAuJylcbiAgICAgIH0pXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHZpZGVvU3R5bGUgPSB7XG4gICAgICAnd2lkdGgnOiAnMTAwJScsXG4gICAgICAnbWF4LXdpZHRoJzogJzY0MHB4J1xuICAgIH1cbiAgICBjb25zdCBoaW50Q2xhc3MgPSBbJ2hpbnQtYmxvY2snLCB0aGlzLnN0YXRlLnN1cHBvcnRlZCA/ICcnIDogJ2hpbnQtYWxlcnQnXS5qb2luKCcgJylcbiAgICBjb25zdCBzdXBwb3J0ZWRTdHIgPSB0aGlzLnN0YXRlLnN1cHBvcnRlZCA/ICdzdXBwb3J0cycgOiAnZG9lcyBub3Qgc3VwcG9ydCdcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlB1Ymxpc2hlciBUZXN0PC9oMT5cbiAgICAgICAgPGhyIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPjxlbT5zdHJlYW08L2VtPjoge3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX08L2gyPlxuICAgICAgICA8cCBjbGFzc05hbWU9e2hpbnRDbGFzc30+PGVtPlRoZSBicm93c2VyIHlvdSBhcmUgdXNpbmcgPC9lbT48c3Ryb25nPntzdXBwb3J0ZWRTdHJ9PC9zdHJvbmc+PGVtPiB0aGUgPC9lbT48Y29kZT5mYWNpbmdNb2RlPC9jb2RlPjxlbT4gdmlkZW8gY29uc3RyYWludCByZXF1aXJlIGZvciB0aGlzIHRlc3QuPC9lbT48L3A+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImNlbnRlcmVkIHB1Ymxpc2gtc3RhdHVzLWZpZWxkXCI+U1RBVFVTOiB7dGhpcy5zdGF0ZS5zdGF0dXN9PC9wPlxuICAgICAgICA8ZGl2IHJlZj17YyA9PiB0aGlzLl92aWRlb0NvbnRhaW5lciA9IGN9XG4gICAgICAgICAgaWQ9XCJ2aWRlby1jb250YWluZXJcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNlbnRlcmVkXCJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uQ2FtZXJhU3dhcFJlcXVlc3QuYmluZCh0aGlzKX0+XG4gICAgICAgICAgPHZpZGVvIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvUHVibGlzaGVyID0gY31cbiAgICAgICAgICAgIGlkPVwicmVkNXByby1wdWJsaXNoZXJcIlxuICAgICAgICAgICAgc3R5bGU9e3ZpZGVvU3R5bGV9XG4gICAgICAgICAgICBjb250cm9scyBhdXRvcGxheSBkaXNhYmxlZD48L3ZpZGVvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblB1Ymxpc2hlckNhbWVyYVN3YXBUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVyQ2FtZXJhU3dhcFRlc3RcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9QdWJsaXNoZXJDYW1lcmFTd2FwVGVzdC5qc1xuICoqLyIsIi8qIGdsb2JhbCByZWQ1cHJvc2RrICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgcmVkNXByb3NkayBmcm9tICdyZWQ1cHJvLXNkaydcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNvbnN0IEZJTFRFUl9TRUxFQ1QgPSAnU2VsZWN0IGZpbHRlci4uLidcblxuY2xhc3MgUHVibGlzaGVyRmlsdGVyc1Rlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWV3OiB1bmRlZmluZWQsXG4gICAgICBwdWJsaXNoZXI6IHVuZGVmaW5lZCxcbiAgICAgIHN0YXR1czogJ09uIGhvbGQuJyxcbiAgICAgIGZpbHRlcnM6IFtGSUxURVJfU0VMRUNULCAnZ3JheXNjYWxlJywgJ3NlcGlhJywgJ2JsdXInXSxcbiAgICAgIHZpZGVvQ2xhc3NMaXN0OiAnJ1xuICAgIH1cbiAgfVxuXG4gIHByZXZpZXcgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IG5ldyByZWQ1cHJvc2RrLlJUQ1B1Ymxpc2hlcigpXG4gICAgICBjb25zdCB2aWV3ID0gbmV3IHJlZDVwcm9zZGsuUHVibGlzaGVyVmlldygncmVkNXByby1wdWJsaXNoZXInKVxuICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSh7XG4gICAgICAgIGF1ZGlvOiAhY29tcC5wcm9wcy5zZXR0aW5ncy5hdWRpb09uID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICB2aWRlbzogIWNvbXAucHJvcHMuc2V0dGluZ3MudmlkZW9PbiA/IGZhbHNlIDogdHJ1ZVxuICAgICAgfSwgbWVkaWEgPT4ge1xuXG4gICAgICAgIC8vIFVwb24gYWNjZXNzIG9mIHVzZXIgbWVkaWEsXG4gICAgICAgIC8vIDEuIEF0dGFjaCB0aGUgc3RyZWFtIHRvIHRoZSBwdWJsaXNoZXIuXG4gICAgICAgIC8vIDIuIFNob3cgdGhlIHN0cmVhbSBhcyBwcmV2aWV3IGluIHZpZXcgaW5zdGFuY2UuXG4gICAgICAgIHB1Ymxpc2hlci5hdHRhY2hTdHJlYW0obWVkaWEpXG4gICAgICAgIHZpZXcucHJldmlldyhtZWRpYSwgdHJ1ZSlcblxuICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICBzdGF0ZS5wdWJsaXNoZXIgPSBwdWJsaXNoZXJcbiAgICAgICAgICBzdGF0ZS52aWV3ID0gdmlld1xuICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICB9KVxuXG4gICAgICAgIHJlc29sdmUoKVxuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFtQdWJsaXNoZXJGaWx0ZXJzVGVzdF0gOjogRXJyb3IgLSAke2Vycm9yfWApXG4gICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHB1Ymxpc2ggKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgY29uc3QgaWNlU2VydmVycyA9IHRoaXMucHJvcHMuc2V0dGluZ3MuaWNlU2VydmVyc1xuICAgIGNvbnN0IHB1Ymxpc2hlciA9IHRoaXMuc3RhdGUucHVibGlzaGVyXG4gICAgY29uc3QgdmlldyA9IHRoaXMuc3RhdGUudmlld1xuICAgIHZpZXcuYXR0YWNoUHVibGlzaGVyKHB1Ymxpc2hlcik7XG5cbiAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1cyA9ICdFc3RhYmxpc2hpbmcgY29ubmVjdGlvbi4uLidcbiAgICB9KVxuXG4gICAgLy8gSW5pdGlhbGl6ZVxuICAgIHB1Ymxpc2hlci5pbml0KHtcbiAgICAgIHByb3RvY29sOiAnd3MnLFxuICAgICAgaG9zdDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ob3N0LFxuICAgICAgcG9ydDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ydGNwb3J0LFxuICAgICAgYXBwOiB0aGlzLnByb3BzLnNldHRpbmdzLmNvbnRleHQsXG4gICAgICBzdHJlYW1OYW1lOiB0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTEsXG4gICAgICBzdHJlYW1UeXBlOiAnd2VicnRjJyxcbiAgICAgIGljZVNlcnZlcnM6IGljZVNlcnZlcnNcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIC8vIEludm9rZSB0aGUgcHVibGlzaCBhY3Rpb25cbiAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnU3RhcnRpbmcgcHVibGlzaCBzZXNzaW9uLi4uJ1xuICAgICAgfSlcbiAgICAgIHJldHVybiBwdWJsaXNoZXIucHVibGlzaCgpXG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgc3RhdGUuc3RhdHVzID0gJ1B1Ymxpc2hpbmcgc3RhcnRlZC4gWW91XFwncmUgTGl2ZSEnXG4gICAgICB9KVxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIC8vIEEgZmF1bHQgb2NjdXJyZWQgd2hpbGUgdHJ5aW5nIHRvIGluaXRpYWxpemUgYW5kIHB1Ymxpc2ggdGhlIHN0cmVhbS5cbiAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9IGBFUlJPUjogJHtqc29uRXJyb3J9YFxuICAgICAgfSlcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFtQdWJsaXNoZXJGaWx0ZXJzVGVzdF0gOjogRXJyb3IgLSAke2pzb25FcnJvcn1gKVxuICAgIH0pXG5cbiAgfVxuXG4gIHVucHVibGlzaCAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgdmlldyA9IGNvbXAuc3RhdGUudmlld1xuICAgICAgY29uc3QgcHVibGlzaGVyID0gY29tcC5zdGF0ZS5wdWJsaXNoZXJcbiAgICAgIGlmIChwdWJsaXNoZXIpIHtcbiAgICAgICAgcHVibGlzaGVyLnVucHVibGlzaCgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdmlldy52aWV3LnNyYyA9ICcnXG4gICAgICAgICAgICBwdWJsaXNoZXIuc2V0Vmlldyh1bmRlZmluZWQpXG4gICAgICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICAgICAgc3RhdGUucHVibGlzaGVyID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnZpZXcgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWRDYW1lcmEgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaFRlc3RdIDo6IFVubW91bnQgRXJyb3IgPSAke2pzb25FcnJvcn1gKVxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCBwdWIgPSB0aGlzLnB1Ymxpc2guYmluZCh0aGlzKVxuICAgIHRoaXMucHJldmlldygpXG4gICAgICAudGhlbihwdWIpXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbUHVibGlzaFRlc3RdIDo6IEVycm9yIC0gQ291bGQgbm90IHN0YXJ0IHB1Ymxpc2hpbmcgc2Vzc2lvbi4nKVxuICAgICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLnVucHVibGlzaCgpXG4gIH1cblxuICBvbkZpbHRlclNlbGVjdCAoKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRGaWx0ZXIgPSB0aGlzLl9maWx0ZXJTZWxlY3QudmFsdWVcbiAgICBsZXQgY2xhc3NMaXN0ID0gc2VsZWN0ZWRGaWx0ZXIgPT09IEZJTFRFUl9TRUxFQ1QgPyAnJyA6IHNlbGVjdGVkRmlsdGVyXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS52aWRlb0NsYXNzTGlzdCA9IGNsYXNzTGlzdFxuICAgIH0pXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHZpZGVvU3R5bGUgPSB7XG4gICAgICAnd2lkdGgnOiAnMTAwJScsXG4gICAgICAnbWF4LXdpZHRoJzogJzY0MHB4J1xuICAgIH1cbiAgICBjb25zdCBsYWJlbFN0eWxlID0ge1xuICAgICAgJ21hcmdpbi1yaWdodCc6ICcwLjVyZW0nXG4gICAgfVxuICAgIGNvbnN0IGZpbHRlclNlbGVjdEZpZWxkID0ge1xuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnI2ZmZmZmZicsXG4gICAgICAncGFkZGluZyc6ICcwLjhyZW0nXG4gICAgfVxuICAgIGNvbnN0IHZpZGVvQ2xhc3NMaXN0ID0gdGhpcy5zdGF0ZS52aWRlb0NsYXNzTGlzdFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+UHVibGlzaGVyIFRlc3Q8L2gxPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+PGVtPnN0cmVhbTwvZW0+OiB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfTwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5zdHJ1Y3Rpb25zLWJsb2NrXCI+XG4gICAgICAgICAgPHA+VG8gYmVnaW4gdGhpcyB0ZXN0LCBvbmNlIHN0cmVhbWluZyBoYXMgc3RhcnRlZCwgc2VsZWN0IGEgZmlsdGVyIHRvIGFwcGx5OjwvcD5cbiAgICAgICAgICA8cCBzdHlsZT17ZmlsdGVyU2VsZWN0RmllbGR9PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZpbHRlci1zZWxlY3RcIiBzdHlsZT17bGFiZWxTdHlsZX0+Q2FtZXJhIEZpbHRlcjo8L2xhYmVsPlxuICAgICAgICAgICAgPHNlbGVjdCByZWY9e2MgPT4gdGhpcy5fZmlsdGVyU2VsZWN0ID0gY31cbiAgICAgICAgICAgICAgaWQ9XCJmaWx0ZXItc2VsZWN0XCJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWx0ZXJTZWxlY3QuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmZpbHRlcnMubWFwKGZpbHRlciA9PlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e2ZpbHRlcn0+e2ZpbHRlcn08L29wdGlvbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImNlbnRlcmVkIHB1Ymxpc2gtc3RhdHVzLWZpZWxkXCI+U1RBVFVTOiB7dGhpcy5zdGF0ZS5zdGF0dXN9PC9wPlxuICAgICAgICA8ZGl2IHJlZj17YyA9PiB0aGlzLl92aWRlb0NvbnRhaW5lciA9IGN9XG4gICAgICAgICAgaWQ9XCJ2aWRlby1jb250YWluZXJcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+XG4gICAgICAgICAgPHZpZGVvIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvUHVibGlzaGVyID0gY31cbiAgICAgICAgICAgIGlkPVwicmVkNXByby1wdWJsaXNoZXJcIlxuICAgICAgICAgICAgc3R5bGU9e3ZpZGVvU3R5bGV9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3ZpZGVvQ2xhc3NMaXN0fVxuICAgICAgICAgICAgY29udHJvbHMgYXV0b3BsYXkgZGlzYWJsZWQ+PC92aWRlbz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5QdWJsaXNoZXJGaWx0ZXJzVGVzdC5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hlckZpbHRlcnNUZXN0XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9QdWJsaXNoZXJGaWx0ZXJzVGVzdC5qc1xuICoqLyIsIi8qIGdsb2JhbCByZWQ1cHJvc2RrICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgcmVkNXByb3NkayBmcm9tICdyZWQ1cHJvLXNkaydcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIFB1Ymxpc2hlckZhaWxvdmVyVGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpZXc6IHVuZGVmaW5lZCxcbiAgICAgIHB1Ymxpc2hlcjogdW5kZWZpbmVkLFxuICAgICAgc3RhdHVzOiAnT24gaG9sZC4nXG4gICAgfVxuICB9XG5cbiAgcHJldmlldyAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IG5ldyByZWQ1cHJvc2RrLlJlZDVQcm9QdWJsaXNoZXIoKVxuICAgICAgY29uc3QgdmlldyA9IG5ldyByZWQ1cHJvc2RrLlB1Ymxpc2hlclZpZXcoJ3JlZDVwcm8tcHVibGlzaGVyJylcbiAgICAgIHZpZXcuYXR0YWNoUHVibGlzaGVyKHB1Ymxpc2hlcik7XG5cbiAgICAgIGNvbnN0IGljZVNlcnZlcnMgPSB0aGlzLnByb3BzLnNldHRpbmdzLmljZVNlcnZlcnNcbiAgICAgIGNvbnN0IHJ0Y0NvbmZpZyA9IHtcbiAgICAgICAgcHJvdG9jb2w6ICd3cycsXG4gICAgICAgIGhvc3Q6IHRoaXMucHJvcHMuc2V0dGluZ3MuaG9zdCxcbiAgICAgICAgcG9ydDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ydGNwb3J0LFxuICAgICAgICBhcHA6IHRoaXMucHJvcHMuc2V0dGluZ3MuY29udGV4dCxcbiAgICAgICAgc3RyZWFtTmFtZTogdGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xLFxuICAgICAgICBzdHJlYW1UeXBlOiAnd2VicnRjJyxcbiAgICAgICAgaWNlU2VydmVyczogaWNlU2VydmVyc1xuICAgICAgfVxuICAgICAgY29uc3QgcnRtcENvbmZpZyA9IHtcbiAgICAgICAgcHJvdG9jb2w6ICdydG1wJyxcbiAgICAgICAgaG9zdDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ob3N0LFxuICAgICAgICBwb3J0OiB0aGlzLnByb3BzLnNldHRpbmdzLnJ0bXBwb3J0LFxuICAgICAgICBhcHA6IHRoaXMucHJvcHMuc2V0dGluZ3MuY29udGV4dCxcbiAgICAgICAgc3RyZWFtTmFtZTogdGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xLFxuICAgICAgICBzd2Y6ICdsaWIvcmVkNXByby9yZWQ1cHJvLXB1Ymxpc2hlci5zd2YnXG4gICAgICB9XG4gICAgICBjb25zdCBwdWJsaXNoT3JkZXIgPSB0aGlzLnByb3BzLnNldHRpbmdzLnB1Ymxpc2hlckZhaWxvdmVyT3JkZXIuc3BsaXQoJywnKS5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnRyaW0oKVxuICAgICAgfSlcblxuICAgICAgcHVibGlzaGVyLnNldFB1Ymxpc2hPcmRlcihwdWJsaXNoT3JkZXIpXG4gICAgICAuaW5pdCh7XG4gICAgICAgIHJ0YzogcnRjQ29uZmlnLFxuICAgICAgICBydG1wOiBydG1wQ29uZmlnXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHNlbGVjdGVkUHVibGlzaGVyKSA9PiB7XG5cbiAgICAgICAgLy8gSW52b2tlIHRoZSBwdWJsaXNoIGFjdGlvblxuICAgICAgICBjb25zdCB0eXBlID0gc2VsZWN0ZWRQdWJsaXNoZXIuZ2V0VHlwZSgpXG4gICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgIHN0YXRlLnN0YXR1cyA9IGBTdGFydGluZyBwdWJsaXNoIHNlc3Npb24gd2l0aCAke3R5cGV9Li4uYFxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICh0eXBlLnRvTG93ZXJDYXNlKCkgPT09IHB1Ymxpc2hlci5wdWJsaXNoVHlwZXMuUlRDKSB7XG4gICAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSh7XG4gICAgICAgICAgICBhdWRpbzogIWNvbXAucHJvcHMuc2V0dGluZ3MuYXVkaW9PbiA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgICAgICAgIHZpZGVvOiAhY29tcC5wcm9wcy5zZXR0aW5ncy52aWRlb09uID8gZmFsc2UgOiB0cnVlXG4gICAgICAgICAgfSwgbWVkaWEgPT4ge1xuXG4gICAgICAgICAgICAvLyBVcG9uIGFjY2VzcyBvZiB1c2VyIG1lZGlhLFxuICAgICAgICAgICAgLy8gMS4gQXR0YWNoIHRoZSBzdHJlYW0gdG8gdGhlIHB1Ymxpc2hlci5cbiAgICAgICAgICAgIC8vIDIuIFNob3cgdGhlIHN0cmVhbSBhcyBwcmV2aWV3IGluIHZpZXcgaW5zdGFuY2UuXG4gICAgICAgICAgICBzZWxlY3RlZFB1Ymxpc2hlci5hdHRhY2hTdHJlYW0obWVkaWEpXG4gICAgICAgICAgICB2aWV3LnByZXZpZXcobWVkaWEsIHRydWUpXG5cbiAgICAgICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgICAgICBzdGF0ZS5wdWJsaXNoZXIgPSBzZWxlY3RlZFB1Ymxpc2hlclxuICAgICAgICAgICAgICBzdGF0ZS52aWV3ID0gdmlld1xuICAgICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaGVyRmFpbG92ZXJUZXN0XSA6OiBFcnJvciAtICR7ZXJyb3J9YClcbiAgICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgICAgc3RhdGUucHVibGlzaGVyID0gc2VsZWN0ZWRQdWJsaXNoZXJcbiAgICAgICAgICAgIHN0YXRlLnZpZXcgPSB2aWV3XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHNlbGVjdGVkUHVibGlzaGVyID8gcmVzb2x2ZSgpIDogcmVqZWN0KCdDb3VsZCBub3QgZmluZCBwdWJsaXNoZXIuJylcbiAgICAgICAgfVxuICAgICAgICAvLyBFbmQgaWYvY2xhdXNlIGZvciBwdWJsaXNoZXIgdHlwZS5cbiAgICAgIH0pXG4gICAgICAvLyBFbmQgUHJvbWlzZSBkZWNsYXJhdGlvbi5cbiAgICB9KVxuICB9XG5cbiAgcHVibGlzaCAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICBjb25zdCBwdWJsaXNoZXIgPSB0aGlzLnN0YXRlLnB1Ymxpc2hlclxuXG4gICAgY29uc3QgdHlwZSA9IHB1Ymxpc2hlci5nZXRUeXBlKClcbiAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1cyA9IGBFc3RhYmxpc2hpbmcgY29ubmVjdGlvbiB3aXRoICR7dHlwZX0gcHVibGlzaGVyLi4uYFxuICAgIH0pXG4gICAgLy8gSW5pdGlhbGl6ZVxuICAgIHB1Ymxpc2hlci5wdWJsaXNoKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgc3RhdGUuc3RhdHVzID0gYCR7dHlwZX0gcHVibGlzaGluZyBzdGFydGVkLiBZb3UncmUgTGl2ZSFgXG4gICAgICB9KVxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIC8vIEEgZmF1bHQgb2NjdXJyZWQgd2hpbGUgdHJ5aW5nIHRvIGluaXRpYWxpemUgYW5kIHB1Ymxpc2ggdGhlIHN0cmVhbS5cbiAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9IGBFUlJPUjogJHtqc29uRXJyb3J9YFxuICAgICAgfSlcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFtQdWJsaXNoZXJGYWlsb3ZlclRlc3RdIDo6IEVycm9yIC0gJHtqc29uRXJyb3J9YClcbiAgICB9KVxuXG4gIH1cblxuICB1bnB1Ymxpc2ggKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHZpZXcgPSBjb21wLnN0YXRlLnZpZXdcbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IGNvbXAuc3RhdGUucHVibGlzaGVyXG4gICAgICBpZiAocHVibGlzaGVyKSB7XG4gICAgICAgIHB1Ymxpc2hlci51bnB1Ymxpc2goKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHZpZXcudmlldy5zcmMgPSAnJ1xuICAgICAgICAgICAgcHVibGlzaGVyLnNldFZpZXcodW5kZWZpbmVkKVxuICAgICAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICBzdGF0ZS52aWV3ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkQ2FtZXJhID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hUZXN0XSA6OiBVbm1vdW50IEVycm9yID0gJHtqc29uRXJyb3J9YClcbiAgICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgcHViID0gdGhpcy5wdWJsaXNoLmJpbmQodGhpcylcbiAgICB0aGlzLnByZXZpZXcoKVxuICAgICAgLnRoZW4ocHViKVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW1B1Ymxpc2hUZXN0XSA6OiBFcnJvciAtIENvdWxkIG5vdCBzdGFydCBwdWJsaXNoaW5nIHNlc3Npb24uJylcbiAgICAgIH0pXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG4gICAgdGhpcy51bnB1Ymxpc2goKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB2aWRlb1N0eWxlID0ge1xuICAgICAgJ3dpZHRoJzogJzEwMCUnLFxuICAgICAgJ21heC13aWR0aCc6ICc2NDBweCdcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5QdWJsaXNoZXIgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiY2VudGVyZWQgcHVibGlzaC1zdGF0dXMtZmllbGRcIj5TVEFUVVM6IHt0aGlzLnN0YXRlLnN0YXR1c308L3A+XG4gICAgICAgIDxkaXYgcmVmPXtjID0+IHRoaXMuX3ZpZGVvQ29udGFpbmVyID0gY31cbiAgICAgICAgICBpZD1cInZpZGVvLWNvbnRhaW5lclwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5cbiAgICAgICAgICA8dmlkZW8gcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9QdWJsaXNoZXIgPSBjfVxuICAgICAgICAgICAgaWQ9XCJyZWQ1cHJvLXB1Ymxpc2hlclwiXG4gICAgICAgICAgICBzdHlsZT17dmlkZW9TdHlsZX1cbiAgICAgICAgICAgIGNvbnRyb2xzIGF1dG9wbGF5IGRpc2FibGVkPjwvdmlkZW8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuUHVibGlzaGVyRmFpbG92ZXJUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVyRmFpbG92ZXJUZXN0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvUHVibGlzaGVyRmFpbG92ZXJUZXN0LmpzXG4gKiovIiwiLyogZ2xvYmFsIHJlZDVwcm9zZGsgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbi8vIGltcG9ydCByZWQ1cHJvc2RrIGZyb20gJ3JlZDVwcm8tc2RrJ1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi4vQmFja0xpbmsnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY2xhc3MgUHVibGlzaGVySW1hZ2VDYXB0dXJlVGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpZXc6IHVuZGVmaW5lZCxcbiAgICAgIHB1Ymxpc2hlcjogdW5kZWZpbmVkLFxuICAgICAgc3RhdHVzOiAnT24gaG9sZC4nXG4gICAgfVxuICB9XG5cbiAgcHJldmlldyAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcHVibGlzaGVyID0gbmV3IHJlZDVwcm9zZGsuUlRDUHVibGlzaGVyKClcbiAgICAgIGNvbnN0IHZpZXcgPSBuZXcgcmVkNXByb3Nkay5QdWJsaXNoZXJWaWV3KCdyZWQ1cHJvLXB1Ymxpc2hlcicpXG4gICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgYXVkaW86ICFjb21wLnByb3BzLnNldHRpbmdzLmF1ZGlvT24gPyBmYWxzZSA6IHRydWUsXG4gICAgICAgIHZpZGVvOiAhY29tcC5wcm9wcy5zZXR0aW5ncy52aWRlb09uID8gZmFsc2UgOiB0cnVlXG4gICAgICB9LCBtZWRpYSA9PiB7XG5cbiAgICAgICAgLy8gVXBvbiBhY2Nlc3Mgb2YgdXNlciBtZWRpYSxcbiAgICAgICAgLy8gMS4gQXR0YWNoIHRoZSBzdHJlYW0gdG8gdGhlIHB1Ymxpc2hlci5cbiAgICAgICAgLy8gMi4gU2hvdyB0aGUgc3RyZWFtIGFzIHByZXZpZXcgaW4gdmlldyBpbnN0YW5jZS5cbiAgICAgICAgcHVibGlzaGVyLmF0dGFjaFN0cmVhbShtZWRpYSlcbiAgICAgICAgdmlldy5wcmV2aWV3KG1lZGlhLCB0cnVlKVxuXG4gICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHB1Ymxpc2hlclxuICAgICAgICAgIHN0YXRlLnZpZXcgPSB2aWV3XG4gICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmVzb2x2ZSgpXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hlckltYWdlQ2FwdHVyZVRlc3RdIDo6IEVycm9yIC0gJHtlcnJvcn1gKVxuICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwdWJsaXNoICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIGNvbnN0IGljZVNlcnZlcnMgPSB0aGlzLnByb3BzLnNldHRpbmdzLmljZVNlcnZlcnNcbiAgICBjb25zdCBwdWJsaXNoZXIgPSB0aGlzLnN0YXRlLnB1Ymxpc2hlclxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLnN0YXRlLnZpZXdcbiAgICB2aWV3LmF0dGFjaFB1Ymxpc2hlcihwdWJsaXNoZXIpO1xuXG4gICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXMgPSAnRXN0YWJsaXNoaW5nIGNvbm5lY3Rpb24uLi4nXG4gICAgfSlcblxuICAgIC8vIEluaXRpYWxpemVcbiAgICBwdWJsaXNoZXIuaW5pdCh7XG4gICAgICBwcm90b2NvbDogJ3dzJyxcbiAgICAgIGhvc3Q6IHRoaXMucHJvcHMuc2V0dGluZ3MuaG9zdCxcbiAgICAgIHBvcnQ6IHRoaXMucHJvcHMuc2V0dGluZ3MucnRjcG9ydCxcbiAgICAgIGFwcDogdGhpcy5wcm9wcy5zZXR0aW5ncy5jb250ZXh0LFxuICAgICAgc3RyZWFtTmFtZTogdGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xLFxuICAgICAgc3RyZWFtVHlwZTogJ3dlYnJ0YycsXG4gICAgICBpY2VTZXJ2ZXJzOiBpY2VTZXJ2ZXJzXG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICAvLyBJbnZva2UgdGhlIHB1Ymxpc2ggYWN0aW9uXG4gICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgc3RhdGUuc3RhdHVzID0gJ1N0YXJ0aW5nIHB1Ymxpc2ggc2Vzc2lvbi4uLidcbiAgICAgIH0pXG4gICAgICByZXR1cm4gcHVibGlzaGVyLnB1Ymxpc2goKVxuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9ICdQdWJsaXNoaW5nIHN0YXJ0ZWQuIFlvdVxcJ3JlIExpdmUhJ1xuICAgICAgfSlcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAvLyBBIGZhdWx0IG9jY3VycmVkIHdoaWxlIHRyeWluZyB0byBpbml0aWFsaXplIGFuZCBwdWJsaXNoIHRoZSBzdHJlYW0uXG4gICAgICBjb25zdCBqc29uRXJyb3IgPSB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnID8gZXJyb3IgOiBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgMilcbiAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICBzdGF0ZS5zdGF0dXMgPSBgRVJST1I6ICR7anNvbkVycm9yfWBcbiAgICAgIH0pXG4gICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaGVySW1hZ2VDYXB0dXJlVGVzdF0gOjogRXJyb3IgLSAke2pzb25FcnJvcn1gKVxuICAgIH0pXG5cbiAgfVxuXG4gIHVucHVibGlzaCAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgdmlldyA9IGNvbXAuc3RhdGUudmlld1xuICAgICAgY29uc3QgcHVibGlzaGVyID0gY29tcC5zdGF0ZS5wdWJsaXNoZXJcbiAgICAgIGlmIChwdWJsaXNoZXIpIHtcbiAgICAgICAgcHVibGlzaGVyLnVucHVibGlzaCgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdmlldy52aWV3LnNyYyA9ICcnXG4gICAgICAgICAgICBwdWJsaXNoZXIuc2V0Vmlldyh1bmRlZmluZWQpXG4gICAgICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICAgICAgc3RhdGUucHVibGlzaGVyID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnZpZXcgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWRDYW1lcmEgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaFRlc3RdIDo6IFVubW91bnQgRXJyb3IgPSAke2pzb25FcnJvcn1gKVxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCBwdWIgPSB0aGlzLnB1Ymxpc2guYmluZCh0aGlzKVxuICAgIHRoaXMucHJldmlldygpXG4gICAgICAudGhlbihwdWIpXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbUHVibGlzaFRlc3RdIDo6IEVycm9yIC0gQ291bGQgbm90IHN0YXJ0IHB1Ymxpc2hpbmcgc2Vzc2lvbi4nKVxuICAgICAgfSlcbiAgICB0aGlzLmNsZWFyQ2FudmFzKClcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLnVucHVibGlzaCgpXG4gIH1cblxuICBvblZpZGVvSW1hZ2VDYXB0dXJlICgpIHtcbiAgICB0aGlzLmNsZWFyQ2FudmFzKClcbiAgICB0aGlzLmRyYXdPbkNhbnZhcyh0aGlzLl9yZWQ1UHJvUHVibGlzaGVyKVxuICB9XG5cbiAgY2xlYXJDYW52YXMgKCkge1xuICAgIGNvbnN0IHZpZGVvID0gdGhpcy5fcmVkNVByb1B1Ymxpc2hlclxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuX2NhcHR1cmVDYW52YXNcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiNhYWFhYWFcIjtcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHZpZGVvLm9mZnNldFdpZHRoLCB2aWRlby5vZmZzZXRIZWlnaHQpO1xuICB9XG5cbiAgZHJhd09uQ2FudmFzICh0YXJnZXRFbGVtZW50KSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5fY2FwdHVyZUNhbnZhc1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjYW52YXMud2lkdGggPSB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoXG4gICAgY2FudmFzLmhlaWdodCA9IHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGFyZ2V0RWxlbWVudCwgMCwgMCwgdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCwgdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHZpZGVvU3R5bGUgPSB7XG4gICAgICAnd2lkdGgnOiAnMTAwJScsXG4gICAgICAnbWF4LXdpZHRoJzogJzY0MHB4J1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlB1Ymxpc2hlciBUZXN0PC9oMT5cbiAgICAgICAgPGhyIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPjxlbT5zdHJlYW08L2VtPjoge3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX08L2gyPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJjZW50ZXJlZCBwdWJsaXNoLXN0YXR1cy1maWVsZFwiPlNUQVRVUzoge3RoaXMuc3RhdGUuc3RhdHVzfTwvcD5cbiAgICAgICAgPGRpdiByZWY9e2MgPT4gdGhpcy5fdmlkZW9Db250YWluZXIgPSBjfVxuICAgICAgICAgIGlkPVwidmlkZW8tY29udGFpbmVyXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlxuICAgICAgICAgIDx2aWRlbyByZWY9e2MgPT4gdGhpcy5fcmVkNVByb1B1Ymxpc2hlciA9IGN9XG4gICAgICAgICAgICBpZD1cInJlZDVwcm8tcHVibGlzaGVyXCJcbiAgICAgICAgICAgIHN0eWxlPXt2aWRlb1N0eWxlfVxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5vblZpZGVvSW1hZ2VDYXB0dXJlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBjb250cm9scyBhdXRvcGxheSBkaXNhYmxlZD48L3ZpZGVvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlxuICAgICAgICAgIDxjYW52YXMgcmVmPXtjID0+IHRoaXMuX2NhcHR1cmVDYW52YXMgPSBjfT48L2NhbnZhcz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5QdWJsaXNoZXJJbWFnZUNhcHR1cmVUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVySW1hZ2VDYXB0dXJlVGVzdFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvUHVibGlzaGVySW1hZ2VDYXB0dXJlVGVzdC5qc1xuICoqLyIsIi8qIGdsb2JhbCByZWQ1cHJvc2RrICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgcmVkNXByb3NkayBmcm9tICdyZWQ1cHJvLXNkaydcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIFB1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmlldzogdW5kZWZpbmVkLFxuICAgICAgcHVibGlzaGVyOiB1bmRlZmluZWQsXG4gICAgICBzdGF0dXM6ICdPbiBob2xkLidcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0T3JpZ2luICgpIHtcbiAgICBjb25zdCBob3N0ID0gdGhpcy5wcm9wcy5zZXR0aW5ncy5ob3N0XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMucHJvcHMuc2V0dGluZ3MuY29udGV4dFxuICAgIGNvbnN0IHN0cmVhbU5hbWUgPSB0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTFcbiAgICBjb25zdCB1cmwgPSBgaHR0cDovLyR7aG9zdH06NTA4MC9zdHJlYW1tYW5hZ2VyL2FwaS8xLjAvZXZlbnQvJHtjb250ZXh0fS8ke3N0cmVhbU5hbWV9P2FjdGlvbj1icm9hZGNhc3RgXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXMgPSBgUmVxdWVzdGluZyBPcmlnaW4gZnJvbSAke3VybH0uLi5gXG4gICAgfSlcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZmV0Y2godXJsKVxuICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGlmKHJlcy5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKSAmJlxuICAgICAgICAgICAgcmVzLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImFwcGxpY2F0aW9uL2pzb25cIikgPj0gMCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NvdWxkIG5vdCBwcm9wZXJseSBwYXJzZSByZXNwb25zZS4nKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShqc29uLnNlcnZlckFkZHJlc3MpXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0XSA6OiBFcnJvciAtIENvdWxkIG5vdCByZXF1ZXN0IE9yaWdpbiBJUCBmcm9tIFN0cmVhbSBNYW5hZ2VyLiAke2pzb25FcnJvcn1gKVxuICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHJldmlldyAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcHVibGlzaGVyID0gbmV3IHJlZDVwcm9zZGsuUlRDUHVibGlzaGVyKClcbiAgICAgIGNvbnN0IHZpZXcgPSBuZXcgcmVkNXByb3Nkay5QdWJsaXNoZXJWaWV3KCdyZWQ1cHJvLXB1Ymxpc2hlcicpXG4gICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgYXVkaW86ICFjb21wLnByb3BzLnNldHRpbmdzLmF1ZGlvT24gPyBmYWxzZSA6IHRydWUsXG4gICAgICAgIHZpZGVvOiAhY29tcC5wcm9wcy5zZXR0aW5ncy52aWRlb09uID8gZmFsc2UgOiB0cnVlXG4gICAgICB9LCBtZWRpYSA9PiB7XG5cbiAgICAgICAgLy8gVXBvbiBhY2Nlc3Mgb2YgdXNlciBtZWRpYSxcbiAgICAgICAgLy8gMS4gQXR0YWNoIHRoZSBzdHJlYW0gdG8gdGhlIHB1Ymxpc2hlci5cbiAgICAgICAgLy8gMi4gU2hvdyB0aGUgc3RyZWFtIGFzIHByZXZpZXcgaW4gdmlldyBpbnN0YW5jZS5cbiAgICAgICAgcHVibGlzaGVyLmF0dGFjaFN0cmVhbShtZWRpYSlcbiAgICAgICAgdmlldy5wcmV2aWV3KG1lZGlhLCB0cnVlKVxuXG4gICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHB1Ymxpc2hlclxuICAgICAgICAgIHN0YXRlLnZpZXcgPSB2aWV3XG4gICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmVzb2x2ZSgpXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0XSA6OiBFcnJvciAtICR7ZXJyb3J9YClcbiAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGlzaCAoc2VydmVySG9zdCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgY29uc3QgaWNlU2VydmVycyA9IHRoaXMucHJvcHMuc2V0dGluZ3MuaWNlU2VydmVyc1xuICAgIGNvbnN0IHB1Ymxpc2hlciA9IHRoaXMuc3RhdGUucHVibGlzaGVyXG4gICAgY29uc3QgdmlldyA9IHRoaXMuc3RhdGUudmlld1xuICAgIHZpZXcuYXR0YWNoUHVibGlzaGVyKHB1Ymxpc2hlcik7XG5cbiAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1cyA9IGBFc3RhYmxpc2hpbmcgY29ubmVjdGlvbiBvbiAke3NlcnZlckhvc3R9Li4uYFxuICAgIH0pXG5cbiAgICAvLyBJbml0aWFsaXplXG4gICAgcHVibGlzaGVyLmluaXQoe1xuICAgICAgcHJvdG9jb2w6ICd3cycsXG4gICAgICBob3N0OiBzZXJ2ZXJIb3N0LFxuICAgICAgcG9ydDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ydGNwb3J0LFxuICAgICAgYXBwOiB0aGlzLnByb3BzLnNldHRpbmdzLmNvbnRleHQsXG4gICAgICBzdHJlYW1OYW1lOiB0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTEsXG4gICAgICBzdHJlYW1UeXBlOiAnd2VicnRjJyxcbiAgICAgIGljZVNlcnZlcnM6IGljZVNlcnZlcnNcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIC8vIEludm9rZSB0aGUgcHVibGlzaCBhY3Rpb25cbiAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnU3RhcnRpbmcgcHVibGlzaCBzZXNzaW9uLi4uJ1xuICAgICAgfSlcbiAgICAgIHJldHVybiBwdWJsaXNoZXIucHVibGlzaCgpXG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgc3RhdGUuc3RhdHVzID0gJ1B1Ymxpc2hpbmcgc3RhcnRlZC4gWW91XFwncmUgTGl2ZSEnXG4gICAgICB9KVxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIC8vIEEgZmF1bHQgb2NjdXJyZWQgd2hpbGUgdHJ5aW5nIHRvIGluaXRpYWxpemUgYW5kIHB1Ymxpc2ggdGhlIHN0cmVhbS5cbiAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9IGBFUlJPUjogJHtqc29uRXJyb3J9YFxuICAgICAgfSlcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFtQdWJsaXNoZXJTdHJlYW1NYW5hZ2VyVGVzdF0gOjogRXJyb3IgLSAke2pzb25FcnJvcn1gKVxuICAgIH0pXG5cbiAgfVxuXG4gIHVucHVibGlzaCAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgdmlldyA9IGNvbXAuc3RhdGUudmlld1xuICAgICAgY29uc3QgcHVibGlzaGVyID0gY29tcC5zdGF0ZS5wdWJsaXNoZXJcbiAgICAgIGlmIChwdWJsaXNoZXIpIHtcbiAgICAgICAgcHVibGlzaGVyLnVucHVibGlzaCgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdmlldy52aWV3LnNyYyA9ICcnXG4gICAgICAgICAgICBwdWJsaXNoZXIuc2V0Vmlldyh1bmRlZmluZWQpXG4gICAgICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICAgICAgc3RhdGUucHVibGlzaGVyID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnZpZXcgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWRDYW1lcmEgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaFRlc3RdIDo6IFVubW91bnQgRXJyb3IgPSAke2pzb25FcnJvcn1gKVxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIGNvbnN0IHB1YiA9IHRoaXMucHVibGlzaC5iaW5kKHRoaXMpXG4gICAgY29uc3QgZ2V0T3JpZ2luID0gdGhpcy5yZXF1ZXN0T3JpZ2luLmJpbmQodGhpcylcbiAgICB0aGlzLnByZXZpZXcoKVxuICAgICAgLnRoZW4oZ2V0T3JpZ2luKVxuICAgICAgLnRoZW4ocHViKVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUuc3RhdHVzID0gJ0Vycm9yIC0gQ291bGQgbm90IHN0YXJ0IHB1Ymxpc2hpbmcgc2Vzc2lvbi4nXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tQdWJsaXNoVGVzdF0gOjogRXJyb3IgLSBDb3VsZCBub3Qgc3RhcnQgcHVibGlzaGluZyBzZXNzaW9uLicpXG4gICAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIHRoaXMudW5wdWJsaXNoKClcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgdmlkZW9TdHlsZSA9IHtcbiAgICAgICd3aWR0aCc6ICcxMDAlJyxcbiAgICAgICdtYXgtd2lkdGgnOiAnNjQwcHgnXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+UHVibGlzaGVyIFRlc3Q8L2gxPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+PGVtPnN0cmVhbTwvZW0+OiB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfTwvaDI+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImNlbnRlcmVkIHB1Ymxpc2gtc3RhdHVzLWZpZWxkXCI+U1RBVFVTOiB7dGhpcy5zdGF0ZS5zdGF0dXN9PC9wPlxuICAgICAgICA8ZGl2IHJlZj17YyA9PiB0aGlzLl92aWRlb0NvbnRhaW5lciA9IGN9XG4gICAgICAgICAgaWQ9XCJ2aWRlby1jb250YWluZXJcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+XG4gICAgICAgICAgPHZpZGVvIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvUHVibGlzaGVyID0gY31cbiAgICAgICAgICAgIGlkPVwicmVkNXByby1wdWJsaXNoZXJcIlxuICAgICAgICAgICAgc3R5bGU9e3ZpZGVvU3R5bGV9XG4gICAgICAgICAgICBjb250cm9scyBhdXRvcGxheSBkaXNhYmxlZD48L3ZpZGVvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblB1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVyU3RyZWFtTWFuYWdlclRlc3RcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L1B1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0LmpzXG4gKiovIiwiLyogZ2xvYmFsIHJlZDVwcm9zZGsgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbi8vIGltcG9ydCByZWQ1cHJvc2RrIGZyb20gJ3JlZDVwcm8tc2RrJ1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi4vQmFja0xpbmsnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY2xhc3MgU3Vic2NyaWJlclRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWV3OiB1bmRlZmluZWQsXG4gICAgICBzdWJzY3JpYmVyOiB1bmRlZmluZWQsXG4gICAgICBzdGF0dXM6ICdPbiBIb2xkLidcbiAgICB9XG4gIH1cblxuICBzdWJzY3JpYmUgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgY29uc3QgdmlldyA9IG5ldyByZWQ1cHJvc2RrLlBsYXliYWNrVmlldygncmVkNXByby1zdWJzY3JpYmVyJylcbiAgICBjb25zdCBzdWJzY3JpYmVyID0gbmV3IHJlZDVwcm9zZGsuUlRDU3Vic2NyaWJlcigpXG4gICAgY29uc3QgaWNlU2VydmVycyA9IFt7dXJsczogJ3N0dW46c3R1bjIubC5nb29nbGUuY29tOjE5MzAyJ31dXG5cbiAgICBjb25zdCBvcmlnQXR0YWNoU3RyZWFtID0gdmlldy5hdHRhY2hTdHJlYW0uYmluZCh2aWV3KVxuICAgIHZpZXcuYXR0YWNoU3RyZWFtID0gKHN0cmVhbSwgYXV0b3BsYXkpID0+IHtcbiAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnU3Vic2NyaWJlZC4gVGhleVxcJ3JlIExpdmUhJ1xuICAgICAgfSlcbiAgICAgIG9yaWdBdHRhY2hTdHJlYW0oc3RyZWFtLCBhdXRvcGxheSlcbiAgICAgIHZpZXcuYXR0YWNoU3RyZWFtID0gb3JpZ0F0dGFjaFN0cmVhbVxuICAgIH1cblxuICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzID0gJ0VzdGFibGlzaGluZyBjb25uZWN0aW9uLi4uJ1xuICAgIH0pXG4gICAgdmlldy5hdHRhY2hTdWJzY3JpYmVyKHN1YnNjcmliZXIpXG4gICAgc3Vic2NyaWJlci5pbml0KHtcbiAgICAgIHByb3RvY29sOiAnd3MnLFxuICAgICAgaG9zdDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ob3N0LFxuICAgICAgcG9ydDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ydGNwb3J0LFxuICAgICAgYXBwOiB0aGlzLnByb3BzLnNldHRpbmdzLmNvbnRleHQsXG4gICAgICBzdWJzY3JpcHRpb25JZDogJ3N1YnNjcmliZXItJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KSxcbiAgICAgIHN0cmVhbU5hbWU6IHRoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMSxcbiAgICAgIGljZVNlcnZlcnM6IGljZVNlcnZlcnMsXG4gICAgICBiYW5kd2lkdGg6IHtcbiAgICAgICAgYXVkaW86IDUwLFxuICAgICAgICB2aWRlbzogMjU2LFxuICAgICAgICBkYXRhOiAzMCAqIDEwMDAgKiAxMDAwXG4gICAgICB9XG4gICAgfSlcbiAgICAudGhlbihwbGF5ZXIgPT4ge1xuICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgIHN0YXRlLnZpZXcgPSB2aWV3XG4gICAgICAgIHN0YXRlLnN1YnNjcmliZXIgPSBzdWJzY3JpYmVyXG4gICAgICB9KVxuICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9ICdOZWdvdGF0aW5nIGNvbm5lY3Rpb24uLi4nXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHBsYXllci5wbGF5KClcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnUmVxdWVzdGluZyBzdHJlYW0gZm9yIHBsYXliYWNrLi4uJ1xuICAgICAgfSlcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zdCBqc29uRXJyb3IgPSB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnID8gZXJyb3IgOiBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgMilcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFtTdWJzY3JpYmVyVGVzdF0gOjogRXJyb3IgLSAke2pzb25FcnJvcn1gKVxuICAgIH0pXG5cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnN1YnNjcmliZSgpXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpcztcbiAgICBjb25zdCB2aWV3ID0gY29tcC5zdGF0ZS52aWV3O1xuICAgIGNvbnN0IHN1YnNjcmliZXIgPSBjb21wLnN0YXRlLnN1YnNjcmliZXI7XG4gICAgaWYgKHN1YnNjcmliZXIpIHtcbiAgICAgIHN1YnNjcmliZXIuc3RvcCgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICB2aWV3LnZpZXcuc3JjID0gJydcbiAgICAgICAgICBzdWJzY3JpYmVyLnNldFZpZXcodW5kZWZpbmVkKVxuICAgICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgICAgc3RhdGUudmlldyA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgc3RhdGUuc3Vic2NyaWJlciA9IHVuZGVmaW5lZFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgW1N1YnNjcmliZXJUZXN0XSA6OiBVbm1vdW50IEVycm9yID0gJHtqc29uRXJyb3J9YClcbiAgICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHZpZGVvU3R5bGUgPSB7XG4gICAgICAnd2lkdGgnOiAnMTAwJScsXG4gICAgICAnbWF4LXdpZHRoJzogJzY0MHB4J1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlN1YnNjcmliZXIgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiY2VudGVyZWQgc3Vic2NyaWJlci1zdGF0dXMtZmllbGRcIj5TVEFUVVM6IHt0aGlzLnN0YXRlLnN0YXR1c308L3A+XG4gICAgICAgIDxkaXYgcmVmPXtjID0+IHRoaXMuX3ZpZGVvQ29udGFpbmVyID0gY31cbiAgICAgICAgICBpZD1cInZpZGVvLWNvbnRhaW5lclwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5cbiAgICAgICAgICA8dmlkZW8gcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9TdWJzY3JpYmVyID0gY31cbiAgICAgICAgICAgIGlkPVwicmVkNXByby1zdWJzY3JpYmVyXCJcbiAgICAgICAgICAgIHN0eWxlPXt2aWRlb1N0eWxlfVxuICAgICAgICAgICAgY29udHJvbHMgYXV0b3BsYXk+PC92aWRlbz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5TdWJzY3JpYmVyVGVzdC5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1YnNjcmliZXJUZXN0XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9TdWJzY3JpYmVyVGVzdC5qc1xuICoqLyIsIi8qIGdsb2JhbCByZWQ1cHJvc2RrICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgcmVkNXByb3NkayBmcm9tICdyZWQ1cHJvLXNkaydcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIFN1YnNjcmliZXJGYWlsb3ZlclRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWV3OiB1bmRlZmluZWQsXG4gICAgICBzdWJzY3JpYmVyOiB1bmRlZmluZWQsXG4gICAgICBzdGF0dXM6ICdPbiBob2xkLidcbiAgICB9XG4gIH1cblxuICBzdWJzY3JpYmUgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgY29uc3QgdmlldyA9IG5ldyByZWQ1cHJvc2RrLlBsYXliYWNrVmlldygncmVkNXByby1zdWJzY3JpYmVyJylcbiAgICBjb25zdCBzdWJzY3JpYmVyID0gbmV3IHJlZDVwcm9zZGsuUmVkNVByb1N1YnNjcmliZXIoKVxuICAgIGNvbnN0IGljZVNlcnZlcnMgPSBbe3VybHM6ICdzdHVuOnN0dW4yLmwuZ29vZ2xlLmNvbToxOTMwMid9XVxuICAgIGNvbnN0IHN1YnNjcmliZU9yZGVyID0gdGhpcy5wcm9wcy5zZXR0aW5ncy5zdWJzY3JpYmVyRmFpbG92ZXJPcmRlci5zcGxpdCgnLCcpLm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0udHJpbSgpXG4gICAgICB9KVxuXG4gICAgY29uc3Qgb3JpZ0F0dGFjaFN0cmVhbSA9IHZpZXcuYXR0YWNoU3RyZWFtLmJpbmQodmlldylcbiAgICB2aWV3LmF0dGFjaFN0cmVhbSA9IChzdHJlYW0sIGF1dG9wbGF5KSA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gY29tcC5zdGF0ZS5zdWJzY3JpYmVyLmdldFR5cGUoKVxuICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9IGAke3R5cGV9IFN1YnNjcmliZWQuIFRoZXkncmUgTGl2ZSFgXG4gICAgICB9KVxuICAgICAgb3JpZ0F0dGFjaFN0cmVhbShzdHJlYW0sIGF1dG9wbGF5KVxuICAgICAgdmlldy5hdHRhY2hTdHJlYW0gPSBvcmlnQXR0YWNoU3RyZWFtXG4gICAgfVxuXG4gICAgY29uc3QgcnRjQ29uZmlnID0ge1xuICAgICAgcHJvdG9jb2w6ICd3cycsXG4gICAgICBob3N0OiB0aGlzLnByb3BzLnNldHRpbmdzLmhvc3QsXG4gICAgICBwb3J0OiB0aGlzLnByb3BzLnNldHRpbmdzLnJ0Y3BvcnQsXG4gICAgICBhcHA6IHRoaXMucHJvcHMuc2V0dGluZ3MuY29udGV4dCxcbiAgICAgIHN1YnNjcmlwdGlvbklkOiAnc3Vic2NyaWJlci0nICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMCkudG9TdHJpbmcoMTYpLFxuICAgICAgc3RyZWFtTmFtZTogdGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xLFxuICAgICAgaWNlU2VydmVyczogaWNlU2VydmVycyxcbiAgICAgIGJhbmR3aWR0aDoge1xuICAgICAgICBhdWRpbzogNTAsXG4gICAgICAgIHZpZGVvOiAyNTYsXG4gICAgICAgIGRhdGE6IDMwICogMTAwMCAqIDEwMDBcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcnRtcENvbmZpZyA9IHtcbiAgICAgIHByb3RvY29sOiAncnRtcCcsXG4gICAgICBob3N0OiB0aGlzLnByb3BzLnNldHRpbmdzLmhvc3QsXG4gICAgICBwb3J0OiB0aGlzLnByb3BzLnNldHRpbmdzLnJ0bXBwb3J0LFxuICAgICAgYXBwOiB0aGlzLnByb3BzLnNldHRpbmdzLmNvbnRleHQsXG4gICAgICBzdHJlYW1OYW1lOiB0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTEsXG4gICAgICBtaW1lVHlwZTogJ3J0bXAvZmx2JyxcbiAgICAgIHVzZVZpZGVvSlM6IGZhbHNlLFxuICAgICAgc3dmOiAnbGliL3JlZDVwcm8vcmVkNXByby1zdWJzY3JpYmVyLnN3ZidcbiAgICB9XG4gICAgY29uc3QgaGxzQ29uZmlnID0ge1xuICAgICAgcHJvdG9jb2w6ICdodHRwJyxcbiAgICAgIGhvc3Q6IHRoaXMucHJvcHMuc2V0dGluZ3MuaG9zdCxcbiAgICAgIHBvcnQ6IHRoaXMucHJvcHMuc2V0dGluZ3MuaGxzcG9ydCxcbiAgICAgIGFwcDogdGhpcy5wcm9wcy5zZXR0aW5ncy5jb250ZXh0LFxuICAgICAgc3RyZWFtTmFtZTogdGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xLFxuICAgICAgbWltZVR5cGU6ICdhcHBsaWNhdGlvbi94LW1wZWdVUkwnLFxuICAgICAgc3dmOiAnbGliL3JlZDVwcm8vcmVkNXByby12aWRlby1qcy5zd2YnXG4gICAgfVxuXG4gICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXMgPSAnRXN0YWJsaXNoaW5nIGNvbm5lY3Rpb24uLi4nXG4gICAgfSlcbiAgICB2aWV3LmF0dGFjaFN1YnNjcmliZXIoc3Vic2NyaWJlcilcblxuICAgIHN1YnNjcmliZXJcbiAgICAgIC5zZXRQbGF5YmFja09yZGVyKHN1YnNjcmliZU9yZGVyKVxuICAgICAgLmluaXQoe1xuICAgICAgICBydGM6IHJ0Y0NvbmZpZyxcbiAgICAgICAgcnRtcDogcnRtcENvbmZpZyxcbiAgICAgICAgaGxzOiBobHNDb25maWdcbiAgICAgIH0pXG4gICAgICAudGhlbihwbGF5ZXIgPT4ge1xuICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICBzdGF0ZS52aWV3ID0gdmlld1xuICAgICAgICAgIHN0YXRlLnN1YnNjcmliZXIgPSBwbGF5ZXJcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgdHlwZSA9IHBsYXllci5nZXRUeXBlKClcbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUuc3RhdHVzID0gYE5lZ290YXRpbmcgJHt0eXBlfSBjb25uZWN0aW9uLi4uYFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcGxheWVyLnBsYXkoKVxuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgdHlwZSA9IGNvbXAuc3RhdGUuc3Vic2NyaWJlci5nZXRUeXBlKClcbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUuc3RhdHVzID0gYFJlcXVlc3RpbmcgJHt0eXBlfSBzdHJlYW0gZm9yIHBsYXliYWNrLi4uYFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICBzdGF0ZS5zdGF0dXMgPSBgRXJyb3I6ICR7anNvbkVycm9yfWBcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5lcnJvcihgW1N1YnNjcmliZXJUZXN0XSA6OiBFcnJvciAtICR7anNvbkVycm9yfWApXG4gICAgICB9KVxuXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5zdWJzY3JpYmUoKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXM7XG4gICAgY29uc3QgdmlldyA9IGNvbXAuc3RhdGUudmlldztcbiAgICBjb25zdCBzdWJzY3JpYmVyID0gY29tcC5zdGF0ZS5zdWJzY3JpYmVyO1xuICAgIGlmIChzdWJzY3JpYmVyKSB7XG4gICAgICBzdWJzY3JpYmVyLnN0b3AoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgdmlldy52aWV3LnNyYyA9ICcnXG4gICAgICAgICAgc3Vic2NyaWJlci5zZXRWaWV3KHVuZGVmaW5lZClcbiAgICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICAgIHN0YXRlLnZpZXcgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHN0YXRlLnN1YnNjcmliZXIgPSB1bmRlZmluZWRcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFtTdWJzY3JpYmVyVGVzdF0gOjogVW5tb3VudCBFcnJvciA9ICR7anNvbkVycm9yfWApXG4gICAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB2aWRlb1N0eWxlID0ge1xuICAgICAgJ3dpZHRoJzogJzEwMCUnLFxuICAgICAgJ21heC13aWR0aCc6ICc2NDBweCcsXG4gICAgICAnaGVpZ2h0JzogJzMwMHB4J1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlN1YnNjcmliZXIgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiY2VudGVyZWQgc3Vic2NyaWJlci1zdGF0dXMtZmllbGRcIj5TVEFUVVM6IHt0aGlzLnN0YXRlLnN0YXR1c308L3A+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyZWRcIiByZWY9e2MgPT4gdGhpcy5fdmlkZW9Db250YWluZXIgPSBjfVxuICAgICAgICAgIGlkPVwidmlkZW8tY29udGFpbmVyXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlxuICAgICAgICAgIDx2aWRlbyBjbGFzc05hbWU9XCJ2aWRlby1qcyB2anMtZGVmYXVsdC1za2luXCIgcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9TdWJzY3JpYmVyID0gY31cbiAgICAgICAgICAgIGlkPVwicmVkNXByby1zdWJzY3JpYmVyXCJcbiAgICAgICAgICAgIHN0eWxlPXt2aWRlb1N0eWxlfVxuICAgICAgICAgICAgY29udHJvbHMgYXV0b3BsYXk+PC92aWRlbz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5TdWJzY3JpYmVyRmFpbG92ZXJUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3Vic2NyaWJlckZhaWxvdmVyVGVzdFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvU3Vic2NyaWJlckZhaWxvdmVyVGVzdC5qc1xuICoqLyIsIi8qIGdsb2JhbCBURVNUQkVEX1ZFUlNJT04gKi9cbi8vIFRFU1RCRURfVkVSU0lPTiBpbmplY3RlZCBmcm9tIHdlYnBhY2suXG5pbXBvcnQgeyBDaGlsZHJlbiB9IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBBcHAgPSAoeyBwYWdlIH0pID0+IChcbiAgPGRpdj5cbiAgICA8cCBjbGFzc05hbWU9XCJ2ZXJzaW9uLWZpZWxkXCI+VGVzdGJlZCBWZXJzaW9uOiB7VEVTVEJFRF9WRVJTSU9OfTwvcD5cbiAgICB7Q2hpbGRyZW4ub25seShwYWdlKX1cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IEFwcFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL0FwcC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRcInNldHRpbmdzXCI6IHtcblx0XHRcImhvc3RcIjogXCJsb2NhbGhvc3RcIixcblx0XHRcInBvcnRcIjogODU1NCxcblx0XHRcInJ0Y3BvcnRcIjogODA4MSxcblx0XHRcInJ0bXBwb3J0XCI6IDE5MzUsXG5cdFx0XCJobHNwb3J0XCI6IDUwODAsXG5cdFx0XCJzdHJlYW0xXCI6IFwic3RyZWFtMVwiLFxuXHRcdFwic3RyZWFtMlwiOiBcInN0cmVhbTJcIixcblx0XHRcImNvbnRleHRcIjogXCJsaXZlXCIsXG5cdFx0XCJjYW1lcmFXaWR0aFwiOiA4NTQsXG5cdFx0XCJjYW1lcmFIZWlnaHRcIjogNDgwLFxuXHRcdFwidmlkZW9PblwiOiB0cnVlLFxuXHRcdFwiYXVkaW9PblwiOiB0cnVlLFxuXHRcdFwiYnVmZmVyXCI6IDAuNSxcblx0XHRcImJpdHJhdGVcIjogMTAwMCxcblx0XHRcInB1Ymxpc2hlckZhaWxvdmVyT3JkZXJcIjogXCJydGMscnRtcFwiLFxuXHRcdFwic3Vic2NyaWJlckZhaWxvdmVyT3JkZXJcIjogXCJydGMscnRtcCxobHNcIixcblx0XHRcImljZVNlcnZlcnNcIjogW1xuXHRcdFx0e1xuXHRcdFx0XHRcInVybHNcIjogXCJzdHVuOnN0dW4yLmwuZ29vZ2xlLmNvbToxOTMwMlwiXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHRcInRlc3RzXCI6IFtcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJIb21lXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlB1Ymxpc2hcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiUHVibGlzaCAtIDEwODBwXCIsXG5cdFx0XHRcImRlc2NyaXB0aW9uXCI6IFwiRGVtb25zdHJhdGlvbiBvZiBhc3NpZ25pbmcgMTA4MHAgcmVzb2x1dGlvbiB0byBwdWJsaXNoaW5nLlwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJQdWJsaXNoIC0gRmFpbG92ZXJcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJEZW1vbnN0cmF0ZXMgZmFpbG92ZXIgb2YgYnJvd3NlciBzdXBwb3J0IGZvciBwdWJsaXNoaW5nLlwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJQdWJsaXNoIC0gQXVkaW8gTW9kZVwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBcIkRlbW9uc3RyYXRlcyBBdWRpby1Pbmx5IGJyb2FkY2FzdCBmb3IgcHVibGlzaGluZy5cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiUHVibGlzaCAtIENhbWVyYSBTb3VyY2VcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJEZW1vbnN0cmF0ZXMgc2VsZWN0aW9uIG9mIGNhbWVyYSBzb3VyY2UgZm9yIHB1Ymxpc2hpbmcuXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlB1Ymxpc2ggLSBDYW1lcmEgU3dhcFwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBcIkRlbW9uc3RyYXRlcyBzd2FwIG9mIGNhbWVyYSBpbiBmcm9udCB0byByZWFyIHdoZXJlIHN1cHBvcnRlZCBvbiBkZXZpY2UgYnJvd3Nlci5cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiUHVibGlzaCAtIEltYWdlIENhcHR1cmVcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJEZW1vbnN0cmF0ZXMgY2FwdHVyaW5nIGFuIGltYWdlIG9mIGxpdmUgdmlkZW8uXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlB1Ymxpc2ggLSBTdHJlYW0gTWFuYWdlclwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBcIkRlbW9uc3RyYXRlcyBhY2Nlc3NpbmcgdGFyZ2V0IG9yaWdpbiBmb3IgYnJvYWRjYXN0IHVzaW5nIFN0cmVhbSBNYW5hZ2VyLlwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJTdWJzY3JpYmVcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiU3Vic2NyaWJlIC0gRmFpbG92ZXJcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJEZW1vbnN0cmF0ZXMgZmFpbG92ZXIgb2YgYnJvd3NlciBzdXBwb3J0IGZvciBzdWJzY3JpYmluZy5cIlxuXHRcdH1cblx0XVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3Jlc291cmNlL3Rlc3RiZWQuanNvblxuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbmRleC5odG1sXCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9pbmRleC5odG1sXG4gKiogbW9kdWxlIGlkID0gNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=