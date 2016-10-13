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
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_29__) {
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
	module.exports = __webpack_require__(140);


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
	
	var _AppContainer = __webpack_require__(24);
	
	var _AppContainer2 = _interopRequireDefault(_AppContainer);
	
	var _testbed = __webpack_require__(139);
	
	var _testbed2 = _interopRequireDefault(_testbed);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var store = (0, _redux.createStore)(_reducers2.default, _extends({}, _testbed2.default, {
	  viewFilter: 'Home',
	  logLevel: 'debug'
	}));
	
	// console.log('[index]:\r\n' + JSON.stringify(store.getState(), null, 2))
	
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
	
	var _logLevel = __webpack_require__(23);
	
	var testbedApp = (0, _redux.combineReducers)({
	  settings: _settings.settings,
	  tests: _settings.tests,
	  viewFilter: _viewFilter.viewFilter,
	  logLevel: _logLevel.logLevel
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
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _actions.SETTINGS_UPDATE:
	      {
	        var settingsUpdate = state;
	        settingsUpdate[action.key] = action.value;
	        return _extends({}, settingsUpdate);
	      }
	    default:
	      return state;
	  }
	};
	
	var tests = exports.tests = function tests() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
	var LOG_LEVEL_CHANGE = exports.LOG_LEVEL_CHANGE = 'LOG_LEVEL_CHANGE';
	
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
	
	var changeLogLevel = exports.changeLogLevel = function changeLogLevel(level) {
	  return {
	    type: LOG_LEVEL_CHANGE,
	    level: level
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
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Home';
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
	exports.logLevel = undefined;
	
	var _actions = __webpack_require__(21);
	
	var logLevel = exports.logLevel = function logLevel() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'debug';
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _actions.LOG_LEVEL_CHANGE:
	      return action.level;
	    default:
	      return state;
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(18);
	
	var _selectors = __webpack_require__(25);
	
	var _App = __webpack_require__(138);
	
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCurrentPage = undefined;
	
	var _reselect = __webpack_require__(26);
	
	var _TestListContainer = __webpack_require__(27);
	
	var _TestListContainer2 = _interopRequireDefault(_TestListContainer);
	
	var _SettingsFormContainer = __webpack_require__(31);
	
	var _SettingsFormContainer2 = _interopRequireDefault(_SettingsFormContainer);
	
	var _test = __webpack_require__(34);
	
	var tests = _interopRequireWildcard(_test);
	
	var _TestContainer = __webpack_require__(135);
	
	var _TestContainer2 = _interopRequireDefault(_TestContainer);
	
	var _PublisherSettingsOverrideContainer = __webpack_require__(136);
	
	var _PublisherSettingsOverrideContainer2 = _interopRequireDefault(_PublisherSettingsOverrideContainer);
	
	var _SubscriberSettingsOverrideContainer = __webpack_require__(137);
	
	var _SubscriberSettingsOverrideContainer2 = _interopRequireDefault(_SubscriberSettingsOverrideContainer);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// eslint-disable-line no-unused-vars
	
	// eslint-disable-line no-unused-vars
	
	// Because we cannot dynamically import modules from strings, we need to,
	// unfortunately, import them specifically here and define their associated
	// filter clause.
	
	var getViewFilter = function getViewFilter(state) {
	  return state.viewFilter;
	}; // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	var getCurrentPage = exports.getCurrentPage = (0, _reselect.createSelector)([getViewFilter], function (viewFilter) {
	  switch (viewFilter.toLowerCase()) {
	    case 'publish':
	      return (0, _TestContainer2.default)(tests.PublisherTest);
	    case 'publish - 1080p':
	      return (0, _TestContainer2.default)(tests.Publisher1080pTest);
	    case 'publish - failover':
	      return (0, _TestContainer2.default)(tests.PublisherFailoverTest);
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
	    case 'subscribe':
	      return (0, _TestContainer2.default)(tests.SubscriberTest);
	    case 'subscribe - failover':
	      return (0, _TestContainer2.default)(tests.SubscriberFailoverTest);
	    case 'subscribe - audio only':
	      return (0, _TestContainer2.default)(tests.SubscriberAudioOnlyTest);
	    case 'subscribe - image capture':
	      return (0, _TestContainer2.default)(tests.SubscriberImageCaptureTest);
	    case 'subscribe - cluster':
	      return (0, _TestContainer2.default)(tests.SubscriberClusterTest);
	    case 'subscribe - stream manager':
	      return (0, _TestContainer2.default)(tests.SubscriberStreamManagerTest);
	    case 'settings':
	    case 'home':
	      return React.createElement(_SettingsFormContainer2.default, null);
	    default:
	      return React.createElement(_TestListContainer2.default, null);
	  }
	});

/***/ },
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(18);
	
	var _actions = __webpack_require__(21);
	
	var _TestList = __webpack_require__(28);
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(29);
	
	var _TestListItem = __webpack_require__(30);
	
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
/* 29 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_29__;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(29);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(18);
	
	var _actions = __webpack_require__(21);
	
	var _SettingsForm = __webpack_require__(32);
	
	var _SettingsForm2 = _interopRequireDefault(_SettingsForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    settings: state.settings,
	    logLevel: state.logLevel
	  };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    onBackClick: function onBackClick() {
	      dispatch((0, _actions.changeView)('list'));
	    },
	    onFieldChange: function onFieldChange(key, value) {
	      dispatch((0, _actions.changeSetting)(key, value));
	    },
	    onLogLevelChange: function onLogLevelChange(level) {
	      dispatch((0, _actions.changeLogLevel)(level));
	    }
	  };
	};
	
	var SettingsFormContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_SettingsForm2.default);
	
	exports.default = SettingsFormContainer;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
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
	    key: 'changeLogLevel',
	    value: function changeLogLevel() {
	      var check = this._verboseLogging;
	      var isVerbose = check.checked;
	      this.props.onLogLevelChange(isVerbose ? 'debug' : 'warn');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var checkStyle = {
	        'vertical-align': 'middle'
	      };
	      var isLogVerbose = this.props.logLevel === 'debug';
	      red5prosdk.setLogLevel(this.props.logLevel);
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
	        ),
	        _react2.default.createElement('hr', null),
	        _react2.default.createElement(
	          'p',
	          { className: 'settings-field' },
	          _react2.default.createElement(
	            'label',
	            { className: 'settings-label', 'for': 'logging-field' },
	            'Verbose R5 Logging:'
	          ),
	          isLogVerbose ? _react2.default.createElement('input', { type: 'checkbox',
	            ref: function ref(c) {
	              return _this2._verboseLogging = c;
	            },
	            name: 'logging-field',
	            value: 'on', style: checkStyle,
	            checked: true,
	            onClick: this.changeLogLevel.bind(this) }) : _react2.default.createElement('input', { type: 'checkbox',
	            ref: function ref(c) {
	              return _this2._verboseLogging = c;
	            },
	            name: 'logging-field',
	            value: 'off', style: checkStyle,
	            onClick: this.changeLogLevel.bind(this) })
	        )
	      );
	    }
	  }]);
	
	  return SettingsForm;
	}(_react2.default.Component);
	
	SettingsForm.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  logLevel: _react.PropTypes.string.isRequired,
	  onFieldChange: _react.PropTypes.func.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired,
	  onLogLevelChange: _react.PropTypes.func.isRequired
	};
	
	exports.default = SettingsForm;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(29);
	
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
	
	var _Publisher1080pTest = __webpack_require__(118);
	
	Object.defineProperty(exports, 'Publisher1080pTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Publisher1080pTest).default;
	  }
	});
	
	var _PublisherAudioOnlyTest = __webpack_require__(119);
	
	Object.defineProperty(exports, 'PublisherAudioOnlyTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherAudioOnlyTest).default;
	  }
	});
	
	var _PublisherCameraSourceTest = __webpack_require__(120);
	
	Object.defineProperty(exports, 'PublisherCameraSourceTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherCameraSourceTest).default;
	  }
	});
	
	var _PublisherCameraSwapTest = __webpack_require__(121);
	
	Object.defineProperty(exports, 'PublisherCameraSwapTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherCameraSwapTest).default;
	  }
	});
	
	var _PublisherFiltersTest = __webpack_require__(122);
	
	Object.defineProperty(exports, 'PublisherFiltersTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherFiltersTest).default;
	  }
	});
	
	var _PublisherFailoverTest = __webpack_require__(123);
	
	Object.defineProperty(exports, 'PublisherFailoverTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherFailoverTest).default;
	  }
	});
	
	var _PublisherImageCaptureTest = __webpack_require__(125);
	
	Object.defineProperty(exports, 'PublisherImageCaptureTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherImageCaptureTest).default;
	  }
	});
	
	var _PublisherStreamManagerTest = __webpack_require__(126);
	
	Object.defineProperty(exports, 'PublisherStreamManagerTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PublisherStreamManagerTest).default;
	  }
	});
	
	var _SubscriberTest = __webpack_require__(127);
	
	Object.defineProperty(exports, 'SubscriberTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_SubscriberTest).default;
	  }
	});
	
	var _SubscriberFailoverTest = __webpack_require__(130);
	
	Object.defineProperty(exports, 'SubscriberFailoverTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_SubscriberFailoverTest).default;
	  }
	});
	
	var _SubscriberAudioOnlyTest = __webpack_require__(131);
	
	Object.defineProperty(exports, 'SubscriberAudioOnlyTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_SubscriberAudioOnlyTest).default;
	  }
	});
	
	var _SubscriberImageCaptureTest = __webpack_require__(132);
	
	Object.defineProperty(exports, 'SubscriberImageCaptureTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_SubscriberImageCaptureTest).default;
	  }
	});
	
	var _SubscriberClusterTest = __webpack_require__(133);
	
	Object.defineProperty(exports, 'SubscriberClusterTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_SubscriberClusterTest).default;
	  }
	});
	
	var _SubscriberStreamManagerTest = __webpack_require__(134);
	
	Object.defineProperty(exports, 'SubscriberStreamManagerTest', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_SubscriberStreamManagerTest).default;
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
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Red5ProPublisher = __webpack_require__(36);
	
	var _Red5ProPublisher2 = _interopRequireDefault(_Red5ProPublisher);
	
	var _PublisherStatus = __webpack_require__(117);
	
	var _PublisherStatus2 = _interopRequireDefault(_PublisherStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var PublisherTest = function (_React$Component) {
	  _inherits(PublisherTest, _React$Component);
	
	  function PublisherTest(props) {
	    _classCallCheck(this, PublisherTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherTest.__proto__ || Object.getPrototypeOf(PublisherTest)).call(this, props));
	
	    _this.state = {
	      statusEvent: undefined
	    };
	    return _this;
	  }
	
	  _createClass(PublisherTest, [{
	    key: 'watchStats',
	    value: function watchStats(connection) {
	      this._watchStatsInterval = window.setInterval(function () {
	        connection.getStats(null).then(function (res) {
	          Object.keys(res).forEach(function (key) {
	            console.log(JSON.stringify(res[key], null, 2));
	          });
	        });
	      }, 1000);
	    }
	  }, {
	    key: 'unwatchStats',
	    value: function unwatchStats() {
	      window.clearInterval(this._watchStatsInterval);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unwatchStats();
	    }
	  }, {
	    key: 'handlePublisherEvent',
	    value: function handlePublisherEvent(event) {
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	    }
	  }, {
	    key: 'publisherEstablished',
	    value: function publisherEstablished(publisher, publisherView) {
	      console.log('[PublisherTest] publisher: ' + publisher + ', ' + publisherView);
	      //    this.watchStats(publisher.getConnection())
	    }
	  }, {
	    key: 'render',
	    value: function render() {
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
	        _react2.default.createElement(_PublisherStatus2.default, { event: this.state.statusEvent }),
	        _react2.default.createElement(_Red5ProPublisher2.default, {
	          className: 'centered',
	          mediaClassName: 'video-element',
	          configuration: this.props.settings,
	          streamName: this.props.settings.stream1,
	          showControls: true,
	          onPublisherEstablished: this.publisherEstablished.bind(this),
	          onPublisherEvent: this.handlePublisherEvent.bind(this)
	        })
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
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _isEqual = __webpack_require__(37);
	
	var _isEqual2 = _interopRequireDefault(_isEqual);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	var defaultConfiguration = {
	  protocol: 'ws',
	  port: 8081,
	  app: 'live',
	  streamType: 'webrtc',
	  audioOn: true,
	  videoOn: true
	};
	
	var Red5ProPublisher = function (_React$Component) {
	  _inherits(Red5ProPublisher, _React$Component);
	
	  function Red5ProPublisher(props) {
	    _classCallCheck(this, Red5ProPublisher);
	
	    var _this = _possibleConstructorReturn(this, (Red5ProPublisher.__proto__ || Object.getPrototypeOf(Red5ProPublisher)).call(this, props));
	
	    _this.state = {
	      view: undefined,
	      publisher: undefined,
	      instanceId: Math.floor(Math.random() * 0x10000).toString(16)
	    };
	    return _this;
	  }
	
	  _createClass(Red5ProPublisher, [{
	    key: 'onPublishFail',
	    value: function onPublishFail(message) {
	      console.error('[Red5ProPublisher] :: ' + message);
	    }
	  }, {
	    key: 'onPublishSuccess',
	    value: function onPublishSuccess() {}
	  }, {
	    key: 'onUnpublishFail',
	    value: function onUnpublishFail(message) {
	      console.error('[Red5ProPublisher] :: ' + message);
	    }
	  }, {
	    key: 'onUnpublishSuccess',
	    value: function onUnpublishSuccess() {}
	  }, {
	    key: 'getUserMediaConfiguration',
	    value: function getUserMediaConfiguration() {
	      var defaultMedia = {
	        audio: !this.props.configuration.audio || defaultConfiguration.audioOn,
	        video: !this.props.configuration.video || defaultConfiguration.videoOn
	      };
	      var definedMedia = this.props.userMedia || {};
	      return Object.assign(defaultMedia, definedMedia);
	    }
	  }, {
	    key: 'notifyPublisherEstablished',
	    value: function notifyPublisherEstablished(publisher, view) {
	      if (this.props.onPublisherEstablished) {
	        this.props.onPublisherEstablished(publisher, view);
	      }
	    }
	  }, {
	    key: 'preview',
	    value: function preview() {
	      var _this2 = this;
	
	      var comp = this;
	      var gUM = this.getUserMediaConfiguration.bind(this);
	      return new Promise(function (resolve, reject) {
	        var elementId = ['red5pro-publisher-video', _this2.state.instanceId].join('-');
	        var publisher = new red5prosdk.RTCPublisher();
	        var view = new red5prosdk.PublisherView(elementId);
	        var gmd = navigator.mediaDevice || navigator;
	
	        if (_this2.props.onPublisherEvent) {
	          publisher.on('*', _this2.props.onPublisherEvent);
	        } else {
	          publisher.on('*', function (event) {
	            console.log('[Red5ProPublisher] :: PublisherEvent - ' + event.type);
	          });
	        }
	
	        console.log('[Red5ProPublisher] gUM:: ' + JSON.stringify(gUM(), null, 2));
	        gmd.getUserMedia(gUM(), function (media) {
	
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
	          resolve(publisher, view);
	        }, function (error) {
	
	          comp.onPublishFail('Error - ' + error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'publish',
	    value: function publish() {
	      var comp = this;
	      var publisher = this.state.publisher;
	      var view = this.state.view;
	      view.attachPublisher(publisher);
	
	      var config = Object.assign({}, defaultConfiguration, this.props.configuration);
	      config.port = config.rtcport || config.port;
	      config.host = this.props.host || config.host;
	      config.streamName = this.props.streamName || config.streamName;
	
	      console.log('[Red5ProPublisher] config:: ' + JSON.stringify(config, null, 2));
	
	      // Initialize
	      publisher.init(config).then(function (pub) {
	        // Invoke the publish action
	        comp.notifyPublisherEstablished(pub, view);
	        return publisher.publish();
	      }).then(function () {
	        comp.onPublishSuccess();
	      }).catch(function (error) {
	        // A fault occurred while trying to initialize and publish the stream.
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        comp.onPublishFail('Error - ' + jsonError);
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
	            publisher.off('*', comp.props.onPublisherevent);
	            comp.setState(function (state) {
	              state.publisher = undefined;
	              state.view = undefined;
	              return state;
	            });
	            comp.onUnpublishSuccess();
	            comp.notifyPublisherEstablished(undefined, undefined);
	            resolve();
	          }).catch(function (error) {
	
	            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	            comp.onUnpublishFailed('Unmount Error = ' + jsonError);
	            reject(error);
	          });
	        } else {
	
	          comp.onUnpublishSuccess();
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: 'tryPublish',
	    value: function tryPublish(auto) {
	      var comp = this;
	      var pub = this.publish.bind(this);
	      if (auto) {
	        this.preview().then(pub).catch(function () {
	          comp.onPublishFail('Error - Could not start publishing session.');
	        });
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.tryPublish(this.props.autoPublish);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var publisher = this.state.publisher;
	      this.unpublish();
	      if (publisher && this.props.onPublisherEvent) {
	        publisher.off('*', this.props.onPublisherEvent);
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      var _this3 = this;
	
	      var p = this.props;
	      var pUM = p.userMedia;
	      var prevUM = prevProps.userMedia;
	      if (!(0, _isEqual2.default)(prevUM, pUM)) {
	        (function () {
	          var pub = _this3.tryPublish.bind(_this3);
	          var auto = _this3.props.autoPublish;
	          _this3.unpublish().then(function () {
	            pub(auto);
	          });
	        })();
	      }
	    }
	  }, {
	    key: 'getPublisherElement',
	    value: function getPublisherElement() {
	      return this._red5ProPublisher;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;
	
	      var elementId = ['red5pro-publisher-video', this.state.instanceId].join('-');
	      var classNames = ['red5pro-publisher-video-container'];
	      if (this.props.className) {
	        classNames = classNames.concat(this.props.className);
	      }
	      var mediaClassNames = [];
	      if (this.props.mediaClassName) {
	        mediaClassNames = mediaClassNames.concat(this.props.mediaClassName);
	      }
	      return _react2.default.createElement(
	        'div',
	        { ref: function ref(c) {
	            return _this4._videoContainer = c;
	          },
	          style: this.props.style,
	          className: classNames.join(' ') },
	        _react2.default.createElement('video', { ref: function ref(c) {
	            return _this4._red5ProPublisher = c;
	          },
	          id: elementId,
	          controls: this.props.showControls,
	          className: mediaClassNames.join(' ') })
	      );
	    }
	  }]);
	
	  return Red5ProPublisher;
	}(_react2.default.Component);
	
	Red5ProPublisher.propTypes = {
	  autoPublish: _react.PropTypes.boolean,
	  showControls: _react.PropTypes.boolean,
	  host: _react.PropTypes.string,
	  userMedia: _react.PropTypes.object,
	  streamName: _react.PropTypes.string.isRequired,
	  configuration: _react.PropTypes.object.isRequired,
	  onPublisherEstablished: _react.PropTypes.func,
	  onPublisherEvent: _react.PropTypes.func
	};
	
	Red5ProPublisher.defaultProps = {
	  autoPublish: true,
	  showControls: true,
	  host: undefined,
	  userMedia: undefined,
	  streamName: undefined,
	  configuration: defaultConfiguration
	};
	
	exports.default = Red5ProPublisher;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(38);
	
	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are **not** supported.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
	}
	
	module.exports = isEqual;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(39),
	    isObject = __webpack_require__(58),
	    isObjectLike = __webpack_require__(9);
	
	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(40),
	    equalArrays = __webpack_require__(80),
	    equalByTag = __webpack_require__(86),
	    equalObjects = __webpack_require__(91),
	    getTag = __webpack_require__(111),
	    isArray = __webpack_require__(97),
	    isBuffer = __webpack_require__(98),
	    isTypedArray = __webpack_require__(102);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;
	
	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(41),
	    stackClear = __webpack_require__(49),
	    stackDelete = __webpack_require__(50),
	    stackGet = __webpack_require__(51),
	    stackHas = __webpack_require__(52),
	    stackSet = __webpack_require__(53);
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}
	
	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	module.exports = Stack;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(42),
	    listCacheDelete = __webpack_require__(43),
	    listCacheGet = __webpack_require__(46),
	    listCacheHas = __webpack_require__(47),
	    listCacheSet = __webpack_require__(48);
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	module.exports = ListCache;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}
	
	module.exports = listCacheClear;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(44);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}
	
	module.exports = listCacheDelete;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(45);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	module.exports = assocIndexOf;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(44);
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	module.exports = listCacheGet;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(44);
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	module.exports = listCacheHas;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(44);
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	module.exports = listCacheSet;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(41);
	
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}
	
	module.exports = stackClear;


/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);
	
	  this.size = data.size;
	  return result;
	}
	
	module.exports = stackDelete;


/***/ },
/* 51 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}
	
	module.exports = stackGet;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}
	
	module.exports = stackHas;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(41),
	    Map = __webpack_require__(54),
	    MapCache = __webpack_require__(65);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}
	
	module.exports = stackSet;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(55),
	    root = __webpack_require__(61);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(56),
	    getValue = __webpack_require__(64);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(57),
	    isMasked = __webpack_require__(59),
	    isObject = __webpack_require__(58),
	    toSource = __webpack_require__(63);
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	module.exports = baseIsNative;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(58);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag || tag == proxyTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 58 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(60);
	
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}
	
	module.exports = isMasked;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(61);
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	module.exports = coreJsData;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(62);
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	module.exports = root;


/***/ },
/* 62 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	module.exports = freeGlobal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 63 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
	module.exports = toSource;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	module.exports = getValue;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(66),
	    mapCacheDelete = __webpack_require__(74),
	    mapCacheGet = __webpack_require__(77),
	    mapCacheHas = __webpack_require__(78),
	    mapCacheSet = __webpack_require__(79);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	
	module.exports = MapCache;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(67),
	    ListCache = __webpack_require__(41),
	    Map = __webpack_require__(54);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	
	module.exports = mapCacheClear;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(68),
	    hashDelete = __webpack_require__(70),
	    hashGet = __webpack_require__(71),
	    hashHas = __webpack_require__(72),
	    hashSet = __webpack_require__(73);
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	
	module.exports = Hash;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(69);
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}
	
	module.exports = hashClear;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(55);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 70 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}
	
	module.exports = hashDelete;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(69);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}
	
	module.exports = hashGet;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(69);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}
	
	module.exports = hashHas;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(69);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	
	module.exports = hashSet;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(75);
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}
	
	module.exports = mapCacheDelete;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(76);
	
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}
	
	module.exports = getMapData;


/***/ },
/* 76 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}
	
	module.exports = isKeyable;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(75);
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	
	module.exports = mapCacheGet;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(75);
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	
	module.exports = mapCacheHas;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(75);
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;
	
	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}
	
	module.exports = mapCacheSet;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(81),
	    arraySome = __webpack_require__(84),
	    cacheHas = __webpack_require__(85);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;
	
	  stack.set(array, other);
	  stack.set(other, array);
	
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}
	
	module.exports = equalArrays;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(65),
	    setCacheAdd = __webpack_require__(82),
	    setCacheHas = __webpack_require__(83);
	
	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}
	
	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	
	module.exports = SetCache;


/***/ },
/* 82 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}
	
	module.exports = setCacheAdd;


/***/ },
/* 83 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}
	
	module.exports = setCacheHas;


/***/ },
/* 84 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arraySome;


/***/ },
/* 85 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}
	
	module.exports = cacheHas;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(87),
	    Uint8Array = __webpack_require__(88),
	    eq = __webpack_require__(45),
	    equalArrays = __webpack_require__(80),
	    mapToArray = __webpack_require__(89),
	    setToArray = __webpack_require__(90);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;
	
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	
	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;
	
	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	      stack['delete'](object);
	      return result;
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(61);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(61);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.exports = Uint8Array;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	module.exports = mapToArray;


/***/ },
/* 90 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	module.exports = setToArray;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(92);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);
	
	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}
	
	module.exports = equalObjects;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(93),
	    baseKeys = __webpack_require__(107),
	    isArrayLike = __webpack_require__(110);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	
	module.exports = keys;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(94),
	    isArguments = __webpack_require__(95),
	    isArray = __webpack_require__(97),
	    isBuffer = __webpack_require__(98),
	    isIndex = __webpack_require__(101),
	    isTypedArray = __webpack_require__(102);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = arrayLikeKeys;


/***/ },
/* 94 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(96),
	    isObjectLike = __webpack_require__(9);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};
	
	module.exports = isArguments;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(9);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && objectToString.call(value) == argsTag;
	}
	
	module.exports = baseIsArguments;


/***/ },
/* 97 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(61),
	    stubFalse = __webpack_require__(100);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
	
	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;
	
	module.exports = isBuffer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(99)(module)))

/***/ },
/* 99 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 100 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ },
/* 101 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	module.exports = isIndex;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(103),
	    baseUnary = __webpack_require__(105),
	    nodeUtil = __webpack_require__(106);
	
	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	
	module.exports = isTypedArray;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(104),
	    isObjectLike = __webpack_require__(9);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	module.exports = baseIsTypedArray;


/***/ },
/* 104 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 105 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
	module.exports = baseUnary;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(62);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;
	
	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());
	
	module.exports = nodeUtil;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(99)(module)))

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(108),
	    nativeKeys = __webpack_require__(109);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = baseKeys;


/***/ },
/* 108 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(8);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);
	
	module.exports = nativeKeys;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(57),
	    isLength = __webpack_require__(104);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(112),
	    Map = __webpack_require__(54),
	    Promise = __webpack_require__(113),
	    Set = __webpack_require__(114),
	    WeakMap = __webpack_require__(115),
	    baseGetTag = __webpack_require__(116),
	    toSource = __webpack_require__(63);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	var dataViewTag = '[object DataView]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;
	
	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;
	
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.exports = getTag;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(55),
	    root = __webpack_require__(61);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');
	
	module.exports = DataView;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(55),
	    root = __webpack_require__(61);
	
	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');
	
	module.exports = Promise;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(55),
	    root = __webpack_require__(61);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(55),
	    root = __webpack_require__(61);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 116 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}
	
	module.exports = baseGetTag;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	var PublisherStatus = function (_React$Component) {
	  _inherits(PublisherStatus, _React$Component);
	
	  function PublisherStatus(props) {
	    _classCallCheck(this, PublisherStatus);
	
	    var _this = _possibleConstructorReturn(this, (PublisherStatus.__proto__ || Object.getPrototypeOf(PublisherStatus)).call(this, props));
	
	    _this.state = {
	      status: 'On hold.'
	    };
	    return _this;
	  }
	
	  _createClass(PublisherStatus, [{
	    key: 'updateStatusFromEvent',
	    value: function updateStatusFromEvent(event) {
	      console.log('[PublisherStatus] event: ' + event.type);
	      var pubTypes = red5prosdk.PublisherEventTypes;
	      var rtcTypes = red5prosdk.RTCPublisherEventTypes;
	      var status = this.state.status;
	      switch (event.type) {
	        case pubTypes.CONNECT_SUCCESS:
	          status = 'Connection established...';
	          break;
	        case pubTypes.CONNECT_FAILURE:
	          status = 'Error - Could not establish connection.';
	          break;
	        case pubTypes.PUBLISH_START:
	          status = 'Started publishing session.';
	          break;
	        case pubTypes.PUBLISH_FAIL:
	          status = 'Error - Could not start a publishing session.';
	          break;
	        case pubTypes.PUBLISH_INVALID_NAME:
	          status = 'Error - Stream name already in use.';
	          break;
	        case rtcTypes.MEDIA_STREAM_AVAILABLE:
	          status = 'Stream available...';
	          break;
	        case rtcTypes.PEER_CONNECTION_AVAILABLE:
	          status = 'Peer Connection available...';
	          break;
	        case rtcTypes.OFFER_START:
	          status = 'Begin offer...';
	          break;
	        case rtcTypes.OFFER_END:
	          status = 'Offer accepted...';
	          break;
	        case rtcTypes.ICE_TRICKLE_COMPLETE:
	          status = 'Negotiation complete. Waiting Publish Start...';
	          break;
	      }
	      this.setState(function (state) {
	        state.status = status;
	        return state;
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.props.event !== nextProps.event && nextProps.event) {
	        this.updateStatusFromEvent(nextProps.event);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'p',
	        { className: 'centered status-field' },
	        'STATUS: ',
	        this.state.status
	      );
	    }
	  }]);
	
	  return PublisherStatus;
	}(_react2.default.Component);
	
	PublisherStatus.propTypes = {
	  event: _react.PropTypes.object
	};
	
	exports.default = PublisherStatus;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Red5ProPublisher = __webpack_require__(36);
	
	var _Red5ProPublisher2 = _interopRequireDefault(_Red5ProPublisher);
	
	var _PublisherStatus = __webpack_require__(117);
	
	var _PublisherStatus2 = _interopRequireDefault(_PublisherStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var USER_MEDIA_SETTING = {
	  video: {
	    width: 1920,
	    height: 1080
	  }
	};
	
	var Publisher1080pTest = function (_React$Component) {
	  _inherits(Publisher1080pTest, _React$Component);
	
	  function Publisher1080pTest(props) {
	    _classCallCheck(this, Publisher1080pTest);
	
	    var _this = _possibleConstructorReturn(this, (Publisher1080pTest.__proto__ || Object.getPrototypeOf(Publisher1080pTest)).call(this, props));
	
	    _this.state = {
	      statusEvent: undefined
	    };
	    return _this;
	  }
	
	  _createClass(Publisher1080pTest, [{
	    key: 'handlePublisherEvent',
	    value: function handlePublisherEvent(event) {
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	    }
	  }, {
	    key: 'publisherEstablished',
	    value: function publisherEstablished(publisher, publisherView) {
	      console.log('[Publisher1080pTest] publisher: ' + publisher + ', ' + publisherView);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher 1080p Test'
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
	        _react2.default.createElement(_PublisherStatus2.default, { event: this.state.statusEvent }),
	        _react2.default.createElement(_Red5ProPublisher2.default, {
	          className: 'centered',
	          mediaClassName: 'video-element',
	          configuration: this.props.settings,
	          userMedia: USER_MEDIA_SETTING,
	          streamName: this.props.settings.stream1,
	          showControls: true,
	          onPublisherEstablished: this.publisherEstablished.bind(this),
	          onPublisherEvent: this.handlePublisherEvent.bind(this)
	        })
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
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Red5ProPublisher = __webpack_require__(36);
	
	var _Red5ProPublisher2 = _interopRequireDefault(_Red5ProPublisher);
	
	var _PublisherStatus = __webpack_require__(117);
	
	var _PublisherStatus2 = _interopRequireDefault(_PublisherStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	// eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var USER_MEDIA_SETTING = {
	  audio: true,
	  video: false
	};
	
	var PublisherAudioOnlyTest = function (_React$Component) {
	  _inherits(PublisherAudioOnlyTest, _React$Component);
	
	  function PublisherAudioOnlyTest(props) {
	    _classCallCheck(this, PublisherAudioOnlyTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherAudioOnlyTest.__proto__ || Object.getPrototypeOf(PublisherAudioOnlyTest)).call(this, props));
	
	    _this.state = {
	      statusEvent: undefined
	    };
	    return _this;
	  }
	
	  _createClass(PublisherAudioOnlyTest, [{
	    key: 'handlePublisherEvent',
	    value: function handlePublisherEvent(event) {
	      // update state with event
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	      // shutdown playback
	      var videoElement = this._red5ProPublisher.getPublisherElement();
	      var pubTypes = red5prosdk.PublisherEventTypes;
	      switch (event.type) {
	        case pubTypes.CONNECT_FAILURE:
	        case pubTypes.PUBLISH_FAIL:
	          videoElement.pause();
	          videoElement.src = '';
	          break;
	      }
	    }
	  }, {
	    key: 'publisherEstablished',
	    value: function publisherEstablished(publisher, publisherView) {
	      console.log('[PublisherAudioOnlyTest] publisher: ' + publisher + ', ' + publisherView);
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
	          'Publisher Audio Only Test'
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
	        _react2.default.createElement(_PublisherStatus2.default, { event: this.state.statusEvent }),
	        _react2.default.createElement(_Red5ProPublisher2.default, {
	          ref: function ref(c) {
	            return _this2._red5ProPublisher = c;
	          },
	          className: 'centered',
	          mediaClassName: 'video-element audio-only-element',
	          configuration: this.props.settings,
	          userMedia: USER_MEDIA_SETTING,
	          streamName: this.props.settings.stream1,
	          showControls: true,
	          onPublisherEstablished: this.publisherEstablished.bind(this),
	          onPublisherEvent: this.handlePublisherEvent.bind(this)
	        })
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
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Red5ProPublisher = __webpack_require__(36);
	
	var _Red5ProPublisher2 = _interopRequireDefault(_Red5ProPublisher);
	
	var _PublisherStatus = __webpack_require__(117);
	
	var _PublisherStatus2 = _interopRequireDefault(_PublisherStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var SELECT_DEFAULT = 'Select a camera...';
	
	var PublisherCameraSourceTest = function (_React$Component) {
	  _inherits(PublisherCameraSourceTest, _React$Component);
	
	  function PublisherCameraSourceTest(props) {
	    _classCallCheck(this, PublisherCameraSourceTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherCameraSourceTest.__proto__ || Object.getPrototypeOf(PublisherCameraSourceTest)).call(this, props));
	
	    _this.state = {
	      cameras: [{
	        label: SELECT_DEFAULT
	      }],
	      selectedCamera: undefined,
	      publishAllowed: false,
	      statusEvent: undefined
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
	          return state;
	        });
	      });
	    }
	  }, {
	    key: 'preview',
	    value: function preview(mediaDeviceId) {
	      this.setState(function (state) {
	        state.selectedCamera = mediaDeviceId;
	        state.publishAllowed = true;
	        return state;
	      });
	    }
	  }, {
	    key: 'onCameraSelect',
	    value: function onCameraSelect() {
	      var cameraSelected = this._cameraSelect.value;
	      if (this.state.selectedCamera !== cameraSelected && cameraSelected && cameraSelected !== SELECT_DEFAULT) {
	        this.preview(cameraSelected);
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.waitForSelect();
	    }
	  }, {
	    key: 'handlePublisherEvent',
	    value: function handlePublisherEvent(event) {
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	    }
	  }, {
	    key: 'publisherEstablished',
	    value: function publisherEstablished(publisher, view) {
	      console.log('[PublisherCameraSourceTest] publisher: ' + publisher + ', ' + view);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var labelStyle = {
	        'margin-right': '0.5rem'
	      };
	      var cameraSelectField = {
	        'background-color': '#ffffff',
	        'padding': '0.8rem'
	      };
	      var canPublish = this.state.publishAllowed;
	      var userMedia = {
	        video: {
	          optional: [{
	            sourceId: this.state.selectedCamera
	          }]
	        }
	      };
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Camera Source Test'
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
	        _react2.default.createElement(_PublisherStatus2.default, { event: this.state.statusEvent }),
	        _react2.default.createElement(_Red5ProPublisher2.default, {
	          className: 'centered',
	          mediaClassName: 'video-element',
	          autoPublish: canPublish,
	          showControls: true,
	          userMedia: userMedia,
	          configuration: this.props.settings,
	          streamName: this.props.settings.stream1,
	          onPublisherEstablished: this.publisherEstablished.bind(this),
	          onPublisherEvent: this.handlePublisherEvent.bind(this),
	          ref: function ref(c) {
	            return _this2._red5ProPublisher = c;
	          }
	        })
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
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Red5ProPublisher = __webpack_require__(36);
	
	var _Red5ProPublisher2 = _interopRequireDefault(_Red5ProPublisher);
	
	var _PublisherStatus = __webpack_require__(117);
	
	var _PublisherStatus2 = _interopRequireDefault(_PublisherStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var FACING_MODE_FRONT = 'user';
	var FACING_MODE_REAR = 'environment';
	
	var PublisherCameraSwapTest = function (_React$Component) {
	  _inherits(PublisherCameraSwapTest, _React$Component);
	
	  function PublisherCameraSwapTest(props) {
	    _classCallCheck(this, PublisherCameraSwapTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherCameraSwapTest.__proto__ || Object.getPrototypeOf(PublisherCameraSwapTest)).call(this, props));
	
	    _this.state = {
	      facingModeFront: true,
	      supported: navigator.mediaDevices.getSupportedConstraints()["facingMode"],
	      statusEvent: undefined
	    };
	    return _this;
	  }
	
	  _createClass(PublisherCameraSwapTest, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {}
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {}
	  }, {
	    key: 'onCameraSwapRequest',
	    value: function onCameraSwapRequest() {
	      this.setState(function (state) {
	        state.facingModeFront = !state.facingModeFront;
	        return state;
	      });
	    }
	  }, {
	    key: 'handlePublisherEvent',
	    value: function handlePublisherEvent(event) {
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	    }
	  }, {
	    key: 'publisherEstablished',
	    value: function publisherEstablished(publisher, view) {
	      console.log('[PublisherCameraSwapTest] publisher: ' + publisher + ', ' + view);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var hintClass = ['hint-block', this.state.supported ? '' : 'hint-alert'].join(' ');
	      var supportedStr = this.state.supported ? 'supports' : 'does not support';
	      var userMedia = {
	        video: {
	          facingMode: this.state.facingModeFront ? FACING_MODE_FRONT : FACING_MODE_REAR
	        }
	      };
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Camera Swap Test'
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
	        _react2.default.createElement(_PublisherStatus2.default, { event: this.state.statusEvent }),
	        _react2.default.createElement(
	          'div',
	          { onClick: this.onCameraSwapRequest.bind(this) },
	          _react2.default.createElement(_Red5ProPublisher2.default, {
	            className: 'centered',
	            mediaClassName: 'video-element',
	            showControls: true,
	            userMedia: userMedia,
	            configuration: this.props.settings,
	            streamName: this.props.settings.stream1,
	            onPublisherEstablished: this.publisherEstablished.bind(this),
	            onPublisherEvent: this.handlePublisherEvent.bind(this),
	            ref: function ref(c) {
	              return _this2._red5ProPublisher = c;
	            }
	          })
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
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BackLink = __webpack_require__(33);
	
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
	          audio: !comp.props.settings.audio ? false : true,
	          video: !comp.props.settings.video ? false : true
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
	      var publisher = this.state.publisher;
	      var view = this.state.view;
	      view.attachPublisher(publisher);
	
	      comp.setState(function (state) {
	        state.status = 'Establishing connection...';
	        return state;
	      });
	
	      // Initialize
	      publisher.init(Object.assign({}, this.props.settings, {
	        protocol: 'ws',
	        port: this.props.settings.rtcport,
	        streamName: this.props.settings.stream1,
	        streamType: 'webrtc'
	      })).then(function () {
	        // Invoke the publish action
	        comp.setState(function (state) {
	          state.status = 'Starting publish session...';
	          return state;
	        });
	        return publisher.publish();
	      }).then(function () {
	        comp.setState(function (state) {
	          state.status = 'Publishing started. You\'re Live!';
	          return state;
	        });
	      }).catch(function (error) {
	        // A fault occurred while trying to initialize and publish the stream.
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        comp.setState(function (state) {
	          state.status = 'ERROR: ' + jsonError;
	          return state;
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
	            console.error('[PublisherFiltersTest] :: Unmount Error = ' + jsonError);
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
	        console.error('[PublisherFilterTest] :: Error - Could not start publishing session.');
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
	        return state;
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var labelStyle = {
	        'margin-right': '0.5rem'
	      };
	      var filterSelectField = {
	        'background-color': '#ffffff',
	        'padding': '0.8rem'
	      };
	      var videoClassList = this.state.videoClassList.concat(['video-element']);
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Filters Test'
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
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _autoBind = __webpack_require__(124);
	
	var _autoBind2 = _interopRequireDefault(_autoBind);
	
	var _PublisherStatus = __webpack_require__(117);
	
	var _PublisherStatus2 = _interopRequireDefault(_PublisherStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var PublisherFailoverTest = function (_React$Component) {
	  _inherits(PublisherFailoverTest, _React$Component);
	
	  function PublisherFailoverTest(props) {
	    _classCallCheck(this, PublisherFailoverTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherFailoverTest.__proto__ || Object.getPrototypeOf(PublisherFailoverTest)).call(this, props));
	
	    (0, _autoBind2.default)(_this);
	    _this.state = {
	      view: undefined,
	      publisher: undefined,
	      selectedPublisherType: undefined,
	      statusEvent: undefined
	    };
	    _this._publisherEntry = undefined;
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
	
	        // Establish event handling.
	        _this2._publisherEntry = publisher;
	        _this2._publisherEntry.on('*', _this2.handlePublisherEvent);
	
	        var rtcConfig = Object.assign({}, _this2.props.settings, {
	          protocol: 'ws',
	          port: _this2.props.settings.rtcport,
	          streamName: _this2.props.settings.stream1,
	          streamType: 'webrtc'
	        });
	        var rtmpConfig = Object.assign({}, _this2.props.settings, {
	          protocol: 'rtmp',
	          port: _this2.props.settings.rtmpport,
	          streamName: _this2.props.settings.stream1,
	          swf: 'lib/red5pro/red5pro-publisher.swf'
	        });
	        var publishOrder = _this2.props.settings.publisherFailoverOrder.split(',').map(function (item) {
	          return item.trim();
	        });
	
	        publisher.setPublishOrder(publishOrder).init({
	          rtc: rtcConfig,
	          rtmp: rtmpConfig
	        }).then(function (selectedPublisher) {
	          // Invoke the publish action
	          var type = selectedPublisher ? selectedPublisher.getType() : undefined;
	          if (type.toLowerCase() === publisher.publishTypes.RTC) {
	            var gmd = navigator.mediaDevice || navigator;
	            gmd.getUserMedia({
	              audio: !comp.props.settings.audio ? false : true,
	              video: !comp.props.settings.video ? false : true
	            }, function (media) {
	
	              // Upon access of user media,
	              // 1. Attach the stream to the publisher.
	              // 2. Show the stream as preview in view instance.
	              selectedPublisher.attachStream(media);
	              view.preview(media, true);
	
	              comp.setState(function (state) {
	                state.publisher = selectedPublisher;
	                state.view = view;
	                state.selectedPublisherType = type;
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
	              state.selectedPublisherType = type;
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
	      var publisher = this.state.publisher;
	      // Initialize
	      publisher.publish().then(function () {
	        console.log('[PublisherFailoverTest] :: Publishing.');
	      }).catch(function (error) {
	        // A fault occurred while trying to initialize and publish the stream.
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
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
	            console.error('[PublishFailoverTest] :: Unmount Error = ' + jsonError);
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
	      this.preview().then(pub).catch(function (error) {
	        console.error('[PublishFailoverTest] :: Error - Could not start publishing session: ' + error);
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unpublish();
	      if (this._publisherEntry) {
	        this._publisherEntry.off('*', this.handlePublisherEvent);
	        this._publisherEntry = undefined;
	      }
	    }
	  }, {
	    key: 'handlePublisherEvent',
	    value: function handlePublisherEvent(event) {
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Failover Test'
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
	          { className: 'centered failover-detected-field' },
	          'Detected Supported Publisher: ',
	          this.state.selectedPublisherType
	        ),
	        _react2.default.createElement(_PublisherStatus2.default, { event: this.state.statusEvent }),
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
	            className: 'video-element',
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
/* 124 */
/***/ function(module, exports) {

	"use strict";
	
	var skipMethods = {
	  'constructor': 1,
	  'render': 1,
	  'shouldComponentUpdate': 1,
	  'componentWillMount': 1,
	  'componentDidMount': 1,
	  'componentWillReceiveProps': 1,
	  'componentWillUpdate': 1,
	  'componentDidUpdate': 1,
	  'componentWillUnmount': 1
	}
	
	function autoBind(object, filter){
	  var proto = object.constructor.prototype
	
	  var filterFn = typeof filter == 'function' ?
	    filter:
	    filter && typeof filter == 'object' ?
	      function(key) {
	        return !filter[key] && skipMethods[key] !== 1 && typeof proto[key] === 'function'
	      }:
	      function(key) {
	        return skipMethods[key] !== 1 && typeof proto[key] === 'function'
	      }
	
	  var names = Object.getOwnPropertyNames(proto).filter(filterFn)
	
	  names.push('setState')
	  names.forEach(function(key){
	    object[key] = object[key].bind(object)
	  })
	
	  return object
	}
	
	exports.default = autoBind
	module.exports = exports['default']

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Red5ProPublisher = __webpack_require__(36);
	
	var _Red5ProPublisher2 = _interopRequireDefault(_Red5ProPublisher);
	
	var _PublisherStatus = __webpack_require__(117);
	
	var _PublisherStatus2 = _interopRequireDefault(_PublisherStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var PublisherImageCaptureTest = function (_React$Component) {
	  _inherits(PublisherImageCaptureTest, _React$Component);
	
	  function PublisherImageCaptureTest(props) {
	    _classCallCheck(this, PublisherImageCaptureTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherImageCaptureTest.__proto__ || Object.getPrototypeOf(PublisherImageCaptureTest)).call(this, props));
	
	    _this.state = {
	      captureFilled: false,
	      statusEvent: undefined
	    };
	    return _this;
	  }
	
	  _createClass(PublisherImageCaptureTest, [{
	    key: 'onVideoImageCapture',
	    value: function onVideoImageCapture() {
	      var videoElement = this._red5ProPublisher.getPublisherElement();
	      this.clearCanvas(videoElement);
	      this.drawOnCanvas(videoElement);
	    }
	  }, {
	    key: 'clearCanvas',
	    value: function clearCanvas(targetElement) {
	      var canvas = this._captureCanvas;
	      var context = canvas.getContext('2d');
	      context.fillStyle = "#aaaaaa";
	      context.fillRect(0, 0, targetElement.offsetWidth, targetElement.offsetHeight);
	      this.setState(function (state) {
	        state.captureFilled = false;
	        return state;
	      });
	    }
	  }, {
	    key: 'drawOnCanvas',
	    value: function drawOnCanvas(targetElement) {
	      var canvas = this._captureCanvas;
	      var context = canvas.getContext('2d');
	      canvas.width = targetElement.offsetWidth;
	      canvas.height = targetElement.offsetHeight;
	      context.drawImage(targetElement, 0, 0, targetElement.offsetWidth, targetElement.offsetHeight);
	      this.setState(function (state) {
	        state.captureFilled = true;
	        return state;
	      });
	    }
	  }, {
	    key: 'handlePublisherEvent',
	    value: function handlePublisherEvent(event) {
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	    }
	  }, {
	    key: 'publisherEstablished',
	    value: function publisherEstablished(publisher, view) {
	      console.log('[PublisherImageCaptureTest] publisher: ' + publisher + ', ' + view);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.clearCanvas(this._red5ProPublisher.getPublisherElement());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var visible = this.state.captureFilled ? 'hidden' : 'visible';
	      var captureTextStyle = {
	        'visibility': visible,
	        'position': 'absolute',
	        'padding': '1rem',
	        'color': '#333333',
	        'width': '100%',
	        'text-align': 'center'
	      };
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher Image Capture Test'
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
	        _react2.default.createElement(_PublisherStatus2.default, { event: this.state.statusEvent }),
	        _react2.default.createElement(
	          'div',
	          { onClick: this.onVideoImageCapture.bind(this) },
	          _react2.default.createElement(_Red5ProPublisher2.default, {
	            className: 'centered',
	            mediaClassName: 'video-element',
	            showControls: true,
	            configuration: this.props.settings,
	            streamName: this.props.settings.stream1,
	            onPublisherEstablished: this.publisherEstablished.bind(this),
	            onPublisherEvent: this.handlePublisherEvent.bind(this),
	            ref: function ref(c) {
	              return _this2._red5ProPublisher = c;
	            }
	          })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'centered' },
	          _react2.default.createElement(
	            'p',
	            { style: captureTextStyle },
	            _react2.default.createElement(
	              'span',
	              null,
	              'Click video to capture image.'
	            ),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(
	              'span',
	              null,
	              'Your Image will appear here.'
	            )
	          ),
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
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Red5ProPublisher = __webpack_require__(36);
	
	var _Red5ProPublisher2 = _interopRequireDefault(_Red5ProPublisher);
	
	var _PublisherStatus = __webpack_require__(117);
	
	var _PublisherStatus2 = _interopRequireDefault(_PublisherStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var PublisherStreamManagerTest = function (_React$Component) {
	  _inherits(PublisherStreamManagerTest, _React$Component);
	
	  function PublisherStreamManagerTest(props) {
	    _classCallCheck(this, PublisherStreamManagerTest);
	
	    var _this = _possibleConstructorReturn(this, (PublisherStreamManagerTest.__proto__ || Object.getPrototypeOf(PublisherStreamManagerTest)).call(this, props));
	
	    _this.state = {
	      targetHost: undefined,
	      statusEvent: undefined
	    };
	    return _this;
	  }
	
	  _createClass(PublisherStreamManagerTest, [{
	    key: 'requestOrigin',
	    value: function requestOrigin() {
	      var host = this.props.settings.host;
	      var app = this.props.settings.app;
	      var streamName = this.props.settings.stream1;
	      var url = 'http://' + host + ':5080/streammanager/api/1.0/event/' + app + '/' + streamName + '?action=broadcast';
	      this.setState(function (state) {
	        state.status = 'Requesting Origin from ' + url + '...';
	        return state;
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
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var comp = this;
	      this.requestOrigin().then(function (host) {
	        comp.setState(function (state) {
	          state.targetHost = host;
	          return state;
	        });
	      }).catch(function (error) {
	        comp.setState(function (state) {
	          state.status = 'Could not start a broadcast session.';
	          return state;
	        });
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        console.error('[PublisherStreamManagerTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'handlePublisherEvent',
	    value: function handlePublisherEvent(event) {
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	    }
	  }, {
	    key: 'publisherEstablished',
	    value: function publisherEstablished(publisher, view) {
	      console.log('[PublisherStreamManagerTest] publisher: ' + publisher + ', ' + view);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var canPublish = this.state.targetHost !== undefined;
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Publisher StreamManager Test'
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
	        _react2.default.createElement(_PublisherStatus2.default, { event: this.state.statusEvent }),
	        _react2.default.createElement(_Red5ProPublisher2.default, {
	          className: 'centered',
	          mediaClassName: 'video-element',
	          configuration: this.props.settings,
	          streamName: this.props.settings.stream1,
	          host: this.state.targetHost,
	          showControls: true,
	          autoPublish: canPublish,
	          onPublisherEstablished: this.publisherEstablished.bind(this),
	          onPublisherEvent: this.handlePublisherEvent.bind(this)
	        })
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
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Red5ProSubscriber = __webpack_require__(128);
	
	var _Red5ProSubscriber2 = _interopRequireDefault(_Red5ProSubscriber);
	
	var _SubscriberStatus = __webpack_require__(129);
	
	var _SubscriberStatus2 = _interopRequireDefault(_SubscriberStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var SubscriberTest = function (_React$Component) {
	  _inherits(SubscriberTest, _React$Component);
	
	  function SubscriberTest(props) {
	    _classCallCheck(this, SubscriberTest);
	
	    var _this = _possibleConstructorReturn(this, (SubscriberTest.__proto__ || Object.getPrototypeOf(SubscriberTest)).call(this, props));
	
	    _this.state = {
	      statusEvent: undefined
	    };
	    return _this;
	  }
	
	  _createClass(SubscriberTest, [{
	    key: 'handleSubscriberEvent',
	    value: function handleSubscriberEvent(event) {
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	    }
	  }, {
	    key: 'subscriberEstablished',
	    value: function subscriberEstablished(subscriber, view) {
	      console.log('[SubscriberTest] subscriber: ' + subscriber + ', ' + view);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
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
	        _react2.default.createElement(_SubscriberStatus2.default, { event: this.state.statusEvent }),
	        _react2.default.createElement(_Red5ProSubscriber2.default, {
	          className: 'centered',
	          mediaClassName: 'video-element',
	          configuration: this.props.settings,
	          streamName: this.props.settings.stream1,
	          autoPlay: true,
	          showControls: true,
	          onSubscriberEstablished: this.subscriberEstablished.bind(this),
	          onSubscriberEvent: this.handleSubscriberEvent.bind(this)
	        })
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
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	var defaultConfiguration = {
	  protocol: 'ws',
	  port: 8081,
	  app: 'live',
	  bandwidth: {
	    audio: 50,
	    video: 256,
	    data: 30 * 1000 * 1000
	  }
	};
	
	var Red5ProSubscriber = function (_React$Component) {
	  _inherits(Red5ProSubscriber, _React$Component);
	
	  function Red5ProSubscriber(props) {
	    _classCallCheck(this, Red5ProSubscriber);
	
	    var _this = _possibleConstructorReturn(this, (Red5ProSubscriber.__proto__ || Object.getPrototypeOf(Red5ProSubscriber)).call(this, props));
	
	    _this.state = {
	      view: undefined,
	      subscriber: undefined,
	      instanceId: Math.floor(Math.random() * 0x10000).toString(16)
	    };
	    return _this;
	  }
	
	  _createClass(Red5ProSubscriber, [{
	    key: 'onSubscribeFail',
	    value: function onSubscribeFail(message) {
	      console.error('[Red5ProSubscriber] :: ' + message);
	    }
	  }, {
	    key: 'onSubscribeSuccess',
	    value: function onSubscribeSuccess() {}
	  }, {
	    key: 'onUnsubscribeFail',
	    value: function onUnsubscribeFail(message) {
	      console.error('[Red5ProSubscriber] :: ' + message);
	    }
	  }, {
	    key: 'onUnsubscribeSuccess',
	    value: function onUnsubscribeSuccess() {}
	  }, {
	    key: 'notifySubscriberEstablished',
	    value: function notifySubscriberEstablished(subscriber, view) {
	      if (this.props.onSubscriberEstablished) {
	        this.props.onSubscriberEstablished(subscriber, view);
	      }
	    }
	  }, {
	    key: 'subscribe',
	    value: function subscribe() {
	      var comp = this;
	      var view = new red5prosdk.PlaybackView(['red5pro-subscriber-video', this.state.instanceId].join('-'));
	      var subscriber = new red5prosdk.RTCSubscriber();
	      var origAttachStream = view.attachStream.bind(view);
	      view.attachStream = function (stream, autoplay) {
	        origAttachStream(stream, autoplay);
	        view.attachStream = origAttachStream;
	      };
	      view.attachSubscriber(subscriber);
	
	      if (this.props.onSubscriberEvent) {
	        subscriber.on('*', this.props.onSubscriberEvent);
	      } else {
	        subscriber.on('*', function (event) {
	          console.log('[Red5ProSubscriber] :: SubscriberEvent - ' + event.type);
	        });
	      }
	
	      var config = Object.assign({}, defaultConfiguration, this.props.configuration);
	      config.port = config.rtcport || config.port;
	      config.host = this.props.host || config.host;
	      config.streamName = this.props.streamName || config.streamName;
	      config.subscriptionId = 'subscriber-' + this.state.instanceId;
	
	      console.log('[Red5ProSubscriber] config:: ' + JSON.stringify(config, null, 2));
	
	      subscriber.init(config).then(function (player) {
	        comp.setState(function (state) {
	          state.view = view;
	          state.subscriber = subscriber;
	        });
	        return player.play();
	      }).then(function () {
	        comp.onSubscribeSuccess();
	        comp.notifySubscriberEstablished(subscriber, view);
	      }).catch(function (error) {
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        comp.onSubscribeFail('Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe() {
	      var comp = this;
	      return new Promise(function (resolve, reject) {
	        var view = comp.state.view;
	        var subscriber = comp.state.subscriber;
	        if (subscriber) {
	          subscriber.stop().then(function () {
	            view.view.src = '';
	            subscriber.setView(undefined);
	            subscriber.off('*', comp.props.onSubscriberEvent);
	            comp.setState(function (state) {
	              state.view = undefined;
	              state.subscriber = undefined;
	            });
	            comp.onUnsubscribeSuccess();
	            resolve();
	          }).catch(function (error) {
	            var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	            comp.onUnsubscribeFail('Unmount Error = ' + jsonError);
	            reject('Could not unsubscribe: ' + error);
	          });
	        } else {
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: 'trySubscribe',
	    value: function trySubscribe(auto) {
	      if (auto) {
	        this.subscribe();
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.trySubscribe(this.props.autoSubscribe);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var subscriber = this.state.subscriber;
	      this.unsubscribe();
	      if (subscriber && this.props.onSubscriberEvent) {
	        subscriber.off('*', this.props.onSubscriberEvent);
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      var _this2 = this;
	
	      var comp = this;
	      if (prevProps.autoSubscribe !== this.props.autoSubscribe) {
	        (function () {
	          var sub = _this2.trySubscribe.bind(_this2);
	          var auto = _this2.props.autoSubscribe;
	          _this2.unsubscribe().then(function () {
	            sub(auto);
	          }).catch(function (error) {
	            comp.onSubscribeFail('Could not start a subscription session: ' + error);
	          });
	        })();
	      }
	    }
	  }, {
	    key: 'getPlaybackElement',
	    value: function getPlaybackElement() {
	      return this._red5ProSubscriber;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      var elementId = ['red5pro-subscriber-video', this.state.instanceId].join('-');
	      var classNames = ['red5pro-subscriber-video-container'];
	      if (this.props.className) {
	        classNames = classNames.concat(this.props.className);
	      }
	      var mediaClassNames = ['red5pro-subscriber-video'];
	      if (this.props.mediaClassName) {
	        mediaClassNames = mediaClassNames.concat(this.props.mediaClassName);
	      }
	      var children = this.props.audioOnly ? _react2.default.createElement('audio', { ref: function ref(c) {
	          return _this3._red5ProSubscriber = c;
	        },
	        id: elementId,
	        className: mediaClassNames.join(' '),
	        controls: this.props.showControls,
	        autoplay: this.props.autoPlay }) : _react2.default.createElement('video', { ref: function ref(c) {
	          return _this3._red5ProSubscriber = c;
	        },
	        id: elementId,
	        className: mediaClassNames.join(' '),
	        controls: this.props.showControls,
	        autoplay: this.props.autoPlay });
	      return _react2.default.createElement(
	        'div',
	        { ref: function ref(c) {
	            return _this3._videoContainer = c;
	          },
	          style: this.props.style,
	          className: classNames.join(' ') },
	        children
	      );
	    }
	  }]);
	
	  return Red5ProSubscriber;
	}(_react2.default.Component);
	
	Red5ProSubscriber.propTypes = {
	  autoSubscribe: _react.PropTypes.boolean,
	  autoPlay: _react.PropTypes.boolean,
	  showControls: _react.PropTypes.boolean,
	  audioOnly: _react.PropTypes.boolean,
	  host: _react.PropTypes.string,
	  streamName: _react.PropTypes.string.isRequired,
	  configuration: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired,
	  onSubscriberEstablished: _react.PropTypes.func,
	  onSubscriberEvent: _react.PropTypes.func
	};
	
	Red5ProSubscriber.defaultProps = {
	  autoSubscribe: true,
	  autoPlay: true,
	  showControls: true,
	  audioOnly: false,
	  host: undefined,
	  streamName: undefined,
	  configuration: defaultConfiguration
	};
	
	exports.default = Red5ProSubscriber;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	
	
	var SubscriberStatus = function (_React$Component) {
	  _inherits(SubscriberStatus, _React$Component);
	
	  function SubscriberStatus(props) {
	    _classCallCheck(this, SubscriberStatus);
	
	    var _this = _possibleConstructorReturn(this, (SubscriberStatus.__proto__ || Object.getPrototypeOf(SubscriberStatus)).call(this, props));
	
	    _this.state = {
	      status: 'On hold.'
	    };
	    return _this;
	  }
	
	  _createClass(SubscriberStatus, [{
	    key: 'updateStatusFromEvent',
	    value: function updateStatusFromEvent(event) {
	      console.log('[SubscriberStatus] event: ' + event.type);
	      var subTypes = red5prosdk.SubscriberEventTypes;
	      var rtcTypes = red5prosdk.RTCSubscriberEventTypes;
	      var answer = void 0;
	      var candidate = void 0;
	      var status = this.state.status;
	      switch (event.type) {
	        case subTypes.CONNECT_SUCCESS:
	          status = 'Connection established...';
	          break;
	        case subTypes.CONNECT_FAILURE:
	          status = 'Error - Could not establish connection.';
	          break;
	        case subTypes.SUBSCRIBE_START:
	          status = 'Started subscribing session.';
	          break;
	        case subTypes.SUBSCRIBE_FAIL:
	          status = 'Error - Could not start a subscribing session.';
	          break;
	        case subTypes.SUBSCRIBE_INVALID_NAME:
	          status = 'Error - Stream name not in use.';
	          break;
	        case rtcTypes.OFFER_START:
	          status = 'Begin offer...';
	          break;
	        case rtcTypes.OFFER_END:
	          status = 'Offer accepted...';
	          break;
	        case rtcTypes.ANSWER_START:
	          status = 'Sending answer...';
	          answer = JSON.stringify(event.data, null, 2);
	          console.log('[SubscriberStatus] ' + event.type + ': ' + answer);
	          break;
	        case rtcTypes.ANSWER_END:
	          status = 'Answer received...';
	          break;
	        case rtcTypes.CANDIDATE_START:
	          status = 'Sending candidate...';
	          candidate = JSON.stringify(event.data, null, 2);
	          console.log('[SubscriberStatus] ' + event.type + ': ' + candidate);
	          break;
	        case rtcTypes.CANDIDATE_END:
	          status = 'Candidate received...';
	          break;
	        case rtcTypes.ICE_TRICKLE_COMPLETE:
	          status = 'Negotiation complete. Waiting Subscription Start...';
	          break;
	      }
	      this.setState(function (state) {
	        state.status = status;
	        return state;
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.props.event !== nextProps.event && nextProps.event) {
	        this.updateStatusFromEvent(nextProps.event);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'p',
	        { className: 'centered status-field' },
	        'STATUS: ',
	        this.state.status
	      );
	    }
	  }]);
	
	  return SubscriberStatus;
	}(_react2.default.Component);
	
	SubscriberStatus.propTypes = {
	  event: _react.PropTypes.object
	};
	
	exports.default = SubscriberStatus;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _autoBind = __webpack_require__(124);
	
	var _autoBind2 = _interopRequireDefault(_autoBind);
	
	var _SubscriberStatus = __webpack_require__(129);
	
	var _SubscriberStatus2 = _interopRequireDefault(_SubscriberStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global red5prosdk */
	
	// import red5prosdk from 'red5pro-sdk'
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var SubscriberFailoverTest = function (_React$Component) {
	  _inherits(SubscriberFailoverTest, _React$Component);
	
	  function SubscriberFailoverTest(props) {
	    _classCallCheck(this, SubscriberFailoverTest);
	
	    var _this = _possibleConstructorReturn(this, (SubscriberFailoverTest.__proto__ || Object.getPrototypeOf(SubscriberFailoverTest)).call(this, props));
	
	    (0, _autoBind2.default)(_this);
	    _this.state = {
	      view: undefined,
	      subscriber: undefined,
	      statusEvent: undefined
	    };
	    _this._subscriberEntry = undefined;
	    return _this;
	  }
	
	  _createClass(SubscriberFailoverTest, [{
	    key: 'subscribe',
	    value: function subscribe() {
	      var comp = this;
	      var view = new red5prosdk.PlaybackView('red5pro-subscriber');
	      var subscriber = new red5prosdk.Red5ProSubscriber();
	      var subscribeOrder = this.props.settings.subscriberFailoverOrder.split(',').map(function (item) {
	        return item.trim();
	      });
	
	      this._subscriberEntry = subscriber;
	      this._subscriberEntry.on('*', this.handleSubscriberEvent);
	
	      var origAttachStream = view.attachStream.bind(view);
	      view.attachStream = function (stream, autoplay) {
	        origAttachStream(stream, autoplay);
	        view.attachStream = origAttachStream;
	      };
	
	      var rtcConfig = Object.assign({}, this.props.settings, {
	        protocol: 'ws',
	        port: this.props.settings.rtcport,
	        subscriptionId: 'subscriber-' + Math.floor(Math.random() * 0x10000).toString(16),
	        streamName: this.props.settings.stream1,
	        bandwidth: {
	          audio: 50,
	          video: 256,
	          data: 30 * 1000 * 1000
	        }
	      });
	      var rtmpConfig = Object.assign({}, this.props.settings, {
	        protocol: 'rtmp',
	        port: this.props.settings.rtmpport,
	        streamName: this.props.settings.stream1,
	        mimeType: 'rtmp/flv',
	        useVideoJS: false,
	        swf: 'lib/red5pro/red5pro-subscriber.swf'
	      });
	      var hlsConfig = Object.assign({}, this.props.settings, {
	        protocol: 'http',
	        port: this.props.settings.hlsport,
	        streamName: this.props.settings.stream1,
	        mimeType: 'application/x-mpegURL',
	        swf: 'lib/red5pro/red5pro-video-js.swf'
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
	          return state;
	        });
	        return player.play();
	      }).then(function () {}).catch(function (error) {
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        console.error('[SubscriberFailoverTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe() {
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
	            return state;
	          });
	        }).catch(function (error) {
	          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	          console.error('[SubscriberFailoverTest] :: Unmount Error = ' + jsonError);
	        });
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.subscribe();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unsubscribe();
	      if (this._subscriberEntry) {
	        this._subscriberEntry.off('*', this.handleSubscriberEvent);
	        this._subscriberEntry = undefined;
	      }
	    }
	  }, {
	    key: 'handleSubscriberEvent',
	    value: function handleSubscriberEvent(event) {
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this,
	          _React$createElement;
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Subscriber Failover Test'
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
	        _react2.default.createElement(_SubscriberStatus2.default, { event: this.state.statusEvent }),
	        _react2.default.createElement(
	          'div',
	          _defineProperty({ className: 'centered', ref: function ref(c) {
	              return _this2._videoContainer = c;
	            },
	            id: 'video-container'
	          }, 'className', 'centered'),
	          _react2.default.createElement('video', (_React$createElement = { className: 'video-js vjs-default-skin', ref: function ref(c) {
	              return _this2._red5ProSubscriber = c;
	            },
	            id: 'red5pro-subscriber'
	          }, _defineProperty(_React$createElement, 'className', 'video-element'), _defineProperty(_React$createElement, 'controls', true), _defineProperty(_React$createElement, 'autoplay', true), _React$createElement))
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
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Red5ProSubscriber = __webpack_require__(128);
	
	var _Red5ProSubscriber2 = _interopRequireDefault(_Red5ProSubscriber);
	
	var _SubscriberStatus = __webpack_require__(129);
	
	var _SubscriberStatus2 = _interopRequireDefault(_SubscriberStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var SubscriberAudioOnlyTest = function (_React$Component) {
	  _inherits(SubscriberAudioOnlyTest, _React$Component);
	
	  function SubscriberAudioOnlyTest(props) {
	    _classCallCheck(this, SubscriberAudioOnlyTest);
	
	    var _this = _possibleConstructorReturn(this, (SubscriberAudioOnlyTest.__proto__ || Object.getPrototypeOf(SubscriberAudioOnlyTest)).call(this, props));
	
	    _this.state = {
	      statusEvent: undefined
	    };
	    return _this;
	  }
	
	  _createClass(SubscriberAudioOnlyTest, [{
	    key: 'handleSubscriberEvent',
	    value: function handleSubscriberEvent(event) {
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	    }
	  }, {
	    key: 'subscriberEstablished',
	    value: function subscriberEstablished(subscriber, view) {
	      console.log('[SubscriberAudioOnlyTest] subscriber: ' + subscriber + ', ' + view);
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
	          'Subscriber Audio Only Test'
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
	        _react2.default.createElement(_SubscriberStatus2.default, { event: this.state.statusEvent }),
	        _react2.default.createElement(_Red5ProSubscriber2.default, {
	          className: 'centered',
	          mediaClassName: 'video-element',
	          configuration: this.props.settings,
	          streamName: this.props.settings.stream1,
	          autoPlay: true,
	          audioOnly: true,
	          showControls: true,
	          onSubscriberEstablished: this.subscriberEstablished.bind(this),
	          onSubscriberEvent: this.handleSubscriberEvent.bind(this),
	          ref: function ref(c) {
	            return _this2._red5ProSubscriber = c;
	          }
	        })
	      );
	    }
	  }]);
	
	  return SubscriberAudioOnlyTest;
	}(_react2.default.Component);
	
	SubscriberAudioOnlyTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = SubscriberAudioOnlyTest;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Red5ProSubscriber = __webpack_require__(128);
	
	var _Red5ProSubscriber2 = _interopRequireDefault(_Red5ProSubscriber);
	
	var _SubscriberStatus = __webpack_require__(129);
	
	var _SubscriberStatus2 = _interopRequireDefault(_SubscriberStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var SubscriberImageCaptureTest = function (_React$Component) {
	  _inherits(SubscriberImageCaptureTest, _React$Component);
	
	  function SubscriberImageCaptureTest(props) {
	    _classCallCheck(this, SubscriberImageCaptureTest);
	
	    var _this = _possibleConstructorReturn(this, (SubscriberImageCaptureTest.__proto__ || Object.getPrototypeOf(SubscriberImageCaptureTest)).call(this, props));
	
	    _this.state = {
	      captureFilled: false,
	      statusEvent: undefined
	    };
	    return _this;
	  }
	
	  _createClass(SubscriberImageCaptureTest, [{
	    key: 'onVideoImageCapture',
	    value: function onVideoImageCapture() {
	      var videoElement = this._red5ProSubscriber.getPlaybackElement();
	      this.clearCanvas(videoElement);
	      this.drawOnCanvas(videoElement);
	    }
	  }, {
	    key: 'clearCanvas',
	    value: function clearCanvas(targetElement) {
	      var canvas = this._captureCanvas;
	      var context = canvas.getContext('2d');
	      context.fillStyle = "#aaaaaa";
	      context.fillRect(0, 0, targetElement.offsetWidth, targetElement.offsetHeight);
	      this.setState(function (state) {
	        state.captureFilled = false;
	        return state;
	      });
	    }
	  }, {
	    key: 'drawOnCanvas',
	    value: function drawOnCanvas(targetElement) {
	      var canvas = this._captureCanvas;
	      var context = canvas.getContext('2d');
	      canvas.width = targetElement.offsetWidth;
	      canvas.height = targetElement.offsetHeight;
	      context.drawImage(targetElement, 0, 0, targetElement.offsetWidth, targetElement.offsetHeight);
	      this.setState(function (state) {
	        state.captureFilled = true;
	        return state;
	      });
	    }
	  }, {
	    key: 'handleSubscriberEvent',
	    value: function handleSubscriberEvent(event) {
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	    }
	  }, {
	    key: 'subscriberEstablished',
	    value: function subscriberEstablished(subscriber, view) {
	      console.log('[SubscriberImageCaptureTest] subscriber: ' + subscriber + ', ' + view);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.clearCanvas(this._red5ProSubscriber.getPlaybackElement());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var visible = this.state.captureFilled ? 'hidden' : 'visible';
	      var captureTextStyle = {
	        'visibility': visible,
	        'position': 'absolute',
	        'padding': '1rem',
	        'color': '#333333',
	        'width': '100%',
	        'text-align': 'center'
	      };
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Subscriber Image Capture Test'
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
	        _react2.default.createElement(_SubscriberStatus2.default, { event: this.state.statusEvent }),
	        _react2.default.createElement(
	          'div',
	          { onClick: this.onVideoImageCapture.bind(this) },
	          _react2.default.createElement(_Red5ProSubscriber2.default, {
	            className: 'centered',
	            mediaClassName: 'video-element',
	            configuration: this.props.settings,
	            streamName: this.props.settings.stream1,
	            host: this.state.targetHost,
	            autoPlay: true,
	            showControls: true,
	            onSubscriberEstablished: this.subscriberEstablished.bind(this),
	            onSubscriberEvent: this.handleSubscriberEvent.bind(this),
	            ref: function ref(c) {
	              return _this2._red5ProSubscriber = c;
	            }
	          })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'centered' },
	          _react2.default.createElement(
	            'p',
	            { style: captureTextStyle },
	            _react2.default.createElement(
	              'span',
	              null,
	              'Click video to capture image.'
	            ),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(
	              'span',
	              null,
	              'Your Image will appear here.'
	            )
	          ),
	          _react2.default.createElement('canvas', { ref: function ref(c) {
	              return _this2._captureCanvas = c;
	            } })
	        )
	      );
	    }
	  }]);
	
	  return SubscriberImageCaptureTest;
	}(_react2.default.Component);
	
	SubscriberImageCaptureTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = SubscriberImageCaptureTest;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Red5ProSubscriber = __webpack_require__(128);
	
	var _Red5ProSubscriber2 = _interopRequireDefault(_Red5ProSubscriber);
	
	var _SubscriberStatus = __webpack_require__(129);
	
	var _SubscriberStatus2 = _interopRequireDefault(_SubscriberStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var SubscriberClusterTest = function (_React$Component) {
	  _inherits(SubscriberClusterTest, _React$Component);
	
	  function SubscriberClusterTest(props) {
	    _classCallCheck(this, SubscriberClusterTest);
	
	    var _this = _possibleConstructorReturn(this, (SubscriberClusterTest.__proto__ || Object.getPrototypeOf(SubscriberClusterTest)).call(this, props));
	
	    _this.state = {
	      targetHost: undefined,
	      statusEvent: undefined
	    };
	    return _this;
	  }
	
	  _createClass(SubscriberClusterTest, [{
	    key: 'requestEdge',
	    value: function requestEdge() {
	      var host = this.props.settings.host;
	      var url = 'http://' + host + ':5080/cluster';
	      this.setState(function (state) {
	        state.status = 'Requesting Edge from ' + url + '...';
	        return state;
	      });
	      return new Promise(function (resolve, reject) {
	        fetch(url).then(function (res) {
	          if (res.headers.get("content-type") && res.headers.get("content-type").toLowerCase().indexOf("text/plain") >= 0) {
	            res.text().then(function (value) {
	              resolve(value.substring(0, value.indexOf(':')));
	            });
	          } else {
	            reject(res);
	          }
	        }).catch(function (error) {
	          var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	          console.error('[SubscriberClusterTest] :: Error - Could not requst Edge IP. ' + jsonError);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var comp = this;
	      this.requestEdge().then(function (host) {
	        comp.setState(function (state) {
	          state.targetHost = host;
	          return state;
	        });
	      }).catch(function (error) {
	        comp.setState(function (state) {
	          state.status = 'Could not start a subscription session.';
	          return state;
	        });
	        var jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
	        console.error('[SubscriberClusterTest] :: Error - ' + jsonError);
	      });
	    }
	  }, {
	    key: 'handleSubscriberEvent',
	    value: function handleSubscriberEvent(event) {
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	    }
	  }, {
	    key: 'subscriberEstablished',
	    value: function subscriberEstablished(subscriber, view) {
	      console.log('[SubscriberClusterTest] subscriber: ' + subscriber + ', ' + view);
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
	          'Subscriber Cluster Test'
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
	        _react2.default.createElement(_SubscriberStatus2.default, { event: this.state.statusEvent }),
	        _react2.default.createElement(_Red5ProSubscriber2.default, {
	          className: 'centered',
	          mediaClassName: 'video-element',
	          configuration: this.props.settings,
	          streamName: this.props.settings.stream1,
	          host: this.state.targetHost,
	          autoPlay: true,
	          showControls: true,
	          onSubscriberEstablished: this.subscriberEstablished.bind(this),
	          onSubscriberEvent: this.handleSubscriberEvent.bind(this),
	          ref: function ref(c) {
	            return _this2._red5ProSubscriber = c;
	          }
	        })
	      );
	    }
	  }]);
	
	  return SubscriberClusterTest;
	}(_react2.default.Component);
	
	SubscriberClusterTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = SubscriberClusterTest;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(29);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Red5ProSubscriber = __webpack_require__(128);
	
	var _Red5ProSubscriber2 = _interopRequireDefault(_Red5ProSubscriber);
	
	var _SubscriberStatus = __webpack_require__(129);
	
	var _SubscriberStatus2 = _interopRequireDefault(_SubscriberStatus);
	
	var _BackLink = __webpack_require__(33);
	
	var _BackLink2 = _interopRequireDefault(_BackLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars
	
	
	// eslint-disable-line no-unused-vars
	
	var SubscriberStreamManagerTest = function (_React$Component) {
	  _inherits(SubscriberStreamManagerTest, _React$Component);
	
	  function SubscriberStreamManagerTest(props) {
	    _classCallCheck(this, SubscriberStreamManagerTest);
	
	    var _this = _possibleConstructorReturn(this, (SubscriberStreamManagerTest.__proto__ || Object.getPrototypeOf(SubscriberStreamManagerTest)).call(this, props));
	
	    _this.state = {
	      targetHost: undefined,
	      statusEvent: undefined
	    };
	    return _this;
	  }
	
	  _createClass(SubscriberStreamManagerTest, [{
	    key: 'requestEdge',
	    value: function requestEdge() {
	      var host = this.props.settings.host;
	      var app = this.props.settings.app;
	      var streamName = this.props.settings.stream1;
	      var url = 'http://' + host + ':5080/streammanager/api/1.0/event/' + app + '/' + streamName + '?action=subscribe';
	      this.setState(function (state) {
	        state.status = 'Requesting Edge from ' + url + '...';
	        return state;
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
	          console.error('[SubscriberStreamManagerTest] :: Error - Could not request Edge IP from Stream Manager. ' + jsonError);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var comp = this;
	      this.requestEdge().then(function (host) {
	        comp.setState(function (state) {
	          state.targetHost = host;
	          return state;
	        });
	      }).catch(function () {
	        comp.setState(function (state) {
	          state.status = 'Error - Could not start subscribing session.';
	          return state;
	        });
	        console.error('[SubscriberStreamManagerTest] :: Error - Could not start subscribing session.');
	      });
	    }
	  }, {
	    key: 'handleSubscriberEvent',
	    value: function handleSubscriberEvent(event) {
	      this.setState(function (state) {
	        state.statusEvent = event;
	        return state;
	      });
	    }
	  }, {
	    key: 'subscriberEstablished',
	    value: function subscriberEstablished(subscriber, view) {
	      console.log('[SubscriberStreamManagerTest] subscriber: ' + subscriber + ', ' + view);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var canSubscribe = this.state.targetHost != undefined;
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_BackLink2.default, { onClick: this.props.onBackClick }),
	        _react2.default.createElement(
	          'h1',
	          { className: 'centered' },
	          'Subscriber StreamManager Test'
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
	        _react2.default.createElement(_SubscriberStatus2.default, { event: this.state.statusEvent }),
	        _react2.default.createElement(_Red5ProSubscriber2.default, {
	          className: 'centered',
	          mediaClassName: 'video-element',
	          configuration: this.props.settings,
	          streamName: this.props.settings.stream1,
	          host: this.state.targetHost,
	          autoSubscribe: canSubscribe,
	          autoPlay: true,
	          showControls: true,
	          onSubscriberEstablished: this.subscriberEstablished.bind(this),
	          onSubscriberEvent: this.handleSubscriberEvent.bind(this),
	          ref: function ref(c) {
	            return _this2._red5ProSubscriber = c;
	          }
	        })
	      );
	    }
	  }]);
	
	  return SubscriberStreamManagerTest;
	}(_react2.default.Component);
	
	SubscriberStreamManagerTest.propTypes = {
	  settings: _react.PropTypes.object.isRequired,
	  onBackClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = SubscriberStreamManagerTest;

/***/ },
/* 135 */
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
	
	  var TestContainer = (0, _reactRedux.connect)( // eslint-disable-line no-unused-vars
	  mapStateToProps, mapDispatchToProps)(targetTest);
	
	  return React.createElement(TestContainer, null);
	};

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(18);
	
	var _actions = __webpack_require__(21);
	
	exports.default = function (targetTest, settingsOverride) {
	
	  var mapStateToProps = function mapStateToProps(state) {
	    return {
	      settings: Object.assign(state.settings, settingsOverride)
	    };
	  };
	
	  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	      onBackClick: function onBackClick() {
	        dispatch((0, _actions.changeView)('list'));
	      }
	    };
	  };
	
	  var PublisherContainer = (0, _reactRedux.connect)( // eslint-disable-line no-unused-vars
	  mapStateToProps, mapDispatchToProps)(targetTest);
	
	  return React.createElement(PublisherContainer, null);
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(18);
	
	var _actions = __webpack_require__(21);
	
	exports.default = function (targetTest, settingsOverride) {
	
	  var mapStateToProps = function mapStateToProps(state) {
	    return {
	      settings: Object.assign(state.settings, settingsOverride)
	    };
	  };
	
	  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	      onBackClick: function onBackClick() {
	        dispatch((0, _actions.changeView)('list'));
	      }
	    };
	  };
	
	  var SubscriberContainer = (0, _reactRedux.connect)( // eslint-disable-line no-unused-vars
	  mapStateToProps, mapDispatchToProps)(targetTest);
	
	  return React.createElement(SubscriberContainer, null);
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(29);
	
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
/* 139 */
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
			"app": "live",
			"cameraWidth": 854,
			"cameraHeight": 480,
			"video": true,
			"audio": true,
			"buffer": 0.5,
			"bitrate": 1000,
			"publisherFailoverOrder": "rtc,rtmp",
			"subscriberFailoverOrder": "rtc,rtmp,hls",
			"iceServers": [
				{
					"urls": "stun:stun2.l.google.com:19302"
				}
			],
			"verboseLogging": true
		},
		"tests": [
			{
				"name": "Home"
			},
			{
				"name": "Publish"
			},
			{
				"name": "Publish - Failover",
				"description": "Demonstrates failover of browser support for publishing."
			},
			{
				"name": "Publish - 1080p",
				"description": "Demonstration of assigning 1080p resolution to publishing."
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
			},
			{
				"name": "Subscribe - Audio Only",
				"description": "Demonstrates Audio-Only subscription."
			},
			{
				"name": "Subscribe - Image Capture",
				"description": "Demonstrates capturing image from subscription."
			},
			{
				"name": "Subscribe - Cluster",
				"description": "Demonstrates accessing Edge IP from Cluster for subscription."
			},
			{
				"name": "Subscribe - Stream Manager",
				"description": "Demonstrates accessing Edge IP from Stream Manager API for subscription."
			}
		]
	};

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxMGJkNTEyNTZiODgxNDliZjk0YyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RET01cIiIsIndlYnBhY2s6Ly8vLi9+L3JlZHV4L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZHV4L2xpYi9jcmVhdGVTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc1BsYWluT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19nZXRQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX292ZXJBcmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovLy8uL34vc3ltYm9sLW9ic2VydmFibGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvcG9ueWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWR1eC9saWIvY29tYmluZVJlZHVjZXJzLmpzIiwid2VicGFjazovLy8uL34vcmVkdXgvbGliL3V0aWxzL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWR1eC9saWIvYmluZEFjdGlvbkNyZWF0b3JzLmpzIiwid2VicGFjazovLy8uL34vcmVkdXgvbGliL2FwcGx5TWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZHV4L2xpYi9jb21wb3NlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0UmVkdXhcIiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZHVjZXJzL3NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9yZWR1Y2Vycy92aWV3LWZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVkdWNlcnMvbG9nLWxldmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb250YWluZXJzL0FwcENvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VsZWN0b3JzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVzZWxlY3QvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb250YWluZXJzL1Rlc3RMaXN0Q29udGFpbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL1Rlc3RMaXN0LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvVGVzdExpc3RJdGVtLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb250YWluZXJzL1NldHRpbmdzRm9ybUNvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9TZXR0aW5nc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvQmFja0xpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3B1Ymxpc2gvUHVibGlzaGVyVGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9SZWQ1UHJvUHVibGlzaGVyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2lzRXF1YWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VJc0VxdWFsLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlSXNFcXVhbERlZXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX1N0YWNrLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19MaXN0Q2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2xpc3RDYWNoZUNsZWFyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19saXN0Q2FjaGVEZWxldGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Fzc29jSW5kZXhPZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9lcS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbGlzdENhY2hlR2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19saXN0Q2FjaGVIYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2xpc3RDYWNoZVNldC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fc3RhY2tDbGVhci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fc3RhY2tEZWxldGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3N0YWNrR2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zdGFja0hhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fc3RhY2tTZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX01hcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fZ2V0TmF0aXZlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlSXNOYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9faXNNYXNrZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2NvcmVKc0RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3Jvb3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3RvU291cmNlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19nZXRWYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fTWFwQ2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX21hcENhY2hlQ2xlYXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX0hhc2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2hhc2hDbGVhci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbmF0aXZlQ3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19oYXNoRGVsZXRlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19oYXNoR2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19oYXNoSGFzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19oYXNoU2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19tYXBDYWNoZURlbGV0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fZ2V0TWFwRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9faXNLZXlhYmxlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19tYXBDYWNoZUdldC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbWFwQ2FjaGVIYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX21hcENhY2hlU2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19lcXVhbEFycmF5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fU2V0Q2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3NldENhY2hlQWRkLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zZXRDYWNoZUhhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYXJyYXlTb21lLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19jYWNoZUhhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fZXF1YWxCeVRhZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19VaW50OEFycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19tYXBUb0FycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zZXRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19lcXVhbE9iamVjdHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYXJyYXlMaWtlS2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZVRpbWVzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2lzQXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlSXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaXNBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc0J1ZmZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL3N0dWJGYWxzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9faXNJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VJc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaXNMZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VVbmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbm9kZVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VLZXlzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19pc1Byb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbmF0aXZlS2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fZ2V0VGFnLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19EYXRhVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fU2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19XZWFrTWFwLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvUHVibGlzaGVyU3RhdHVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvcHVibGlzaC9QdWJsaXNoZXIxMDgwcFRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlckF1ZGlvT25seVRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlckNhbWVyYVN3YXBUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvcHVibGlzaC9QdWJsaXNoZXJGaWx0ZXJzVGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3B1Ymxpc2gvUHVibGlzaGVyRmFpbG92ZXJUZXN0LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtY2xhc3MvYXV0b0JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlckltYWdlQ2FwdHVyZVRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3Qvc3Vic2NyaWJlL1N1YnNjcmliZXJUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL1JlZDVQcm9TdWJzY3JpYmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvU3Vic2NyaWJlclN0YXR1cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3N1YnNjcmliZS9TdWJzY3JpYmVyRmFpbG92ZXJUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3Qvc3Vic2NyaWJlL1N1YnNjcmliZXJBdWRpb09ubHlUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3Qvc3Vic2NyaWJlL1N1YnNjcmliZXJJbWFnZUNhcHR1cmVUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3Qvc3Vic2NyaWJlL1N1YnNjcmliZXJDbHVzdGVyVGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3N1YnNjcmliZS9TdWJzY3JpYmVyU3RyZWFtTWFuYWdlclRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRhaW5lcnMvdGVzdC9UZXN0Q29udGFpbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb250YWluZXJzL3Rlc3QvUHVibGlzaGVyU2V0dGluZ3NPdmVycmlkZUNvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udGFpbmVycy90ZXN0L1N1YnNjcmliZXJTZXR0aW5nc092ZXJyaWRlQ29udGFpbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVzb3VyY2UvdGVzdGJlZC5qc29uIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5odG1sIl0sIm5hbWVzIjpbInN0b3JlIiwidmlld0ZpbHRlciIsImxvZ0xldmVsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRlc3RiZWRBcHAiLCJzZXR0aW5ncyIsInRlc3RzIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwic2V0dGluZ3NVcGRhdGUiLCJrZXkiLCJ2YWx1ZSIsIlNFVFRJTkdTX1VQREFURSIsIlZJRVdfQ0hBTkdFIiwiTE9HX0xFVkVMX0NIQU5HRSIsImNoYW5nZVNldHRpbmciLCJjaGFuZ2VWaWV3IiwibmFtZSIsImZpbHRlciIsImNoYW5nZUxvZ0xldmVsIiwibGV2ZWwiLCJtYXBTdGF0ZVRvUHJvcHMiLCJwYWdlIiwiQXBwQ29udGFpbmVyIiwiZ2V0Vmlld0ZpbHRlciIsImdldEN1cnJlbnRQYWdlIiwidG9Mb3dlckNhc2UiLCJQdWJsaXNoZXJUZXN0IiwiUHVibGlzaGVyMTA4MHBUZXN0IiwiUHVibGlzaGVyRmFpbG92ZXJUZXN0IiwiUHVibGlzaGVyQXVkaW9Pbmx5VGVzdCIsIlB1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3QiLCJQdWJsaXNoZXJDYW1lcmFTd2FwVGVzdCIsIlB1Ymxpc2hlckZpbHRlcnNUZXN0IiwiUHVibGlzaGVySW1hZ2VDYXB0dXJlVGVzdCIsIlB1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0IiwiU3Vic2NyaWJlclRlc3QiLCJTdWJzY3JpYmVyRmFpbG92ZXJUZXN0IiwiU3Vic2NyaWJlckF1ZGlvT25seVRlc3QiLCJTdWJzY3JpYmVySW1hZ2VDYXB0dXJlVGVzdCIsIlN1YnNjcmliZXJDbHVzdGVyVGVzdCIsIlN1YnNjcmliZXJTdHJlYW1NYW5hZ2VyVGVzdCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwib25UZXN0TGlzdEl0ZW1DbGljayIsIlRlc3RMaXN0Q29udGFpbmVyIiwiVGVzdExpc3QiLCJtYXAiLCJ0ZXN0IiwicHJvcFR5cGVzIiwiYXJyYXlPZiIsInNoYXBlIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsIm1vZHVsZSIsImRlc2NyaXB0aW9uIiwiZnVuYyIsIlRlc3RMaXN0SXRlbSIsIm9uQ2xpY2siLCJvbkJhY2tDbGljayIsIm9uRmllbGRDaGFuZ2UiLCJvbkxvZ0xldmVsQ2hhbmdlIiwiU2V0dGluZ3NGb3JtQ29udGFpbmVyIiwiU2V0dGluZ3NGb3JtIiwicHJvcHMiLCJfcmVmIiwidmFsdWUxIiwiX3N0cmVhbTEiLCJ2YWx1ZTIiLCJfc3RyZWFtMiIsImNoZWNrIiwiX3ZlcmJvc2VMb2dnaW5nIiwiaXNWZXJib3NlIiwiY2hlY2tlZCIsImNoZWNrU3R5bGUiLCJpc0xvZ1ZlcmJvc2UiLCJyZWQ1cHJvc2RrIiwic2V0TG9nTGV2ZWwiLCJjIiwiX2hvc3QiLCJob3N0Iiwic3RyZWFtMSIsInN3YXBTdHJlYW1OYW1lcyIsImJpbmQiLCJzdHJlYW0yIiwiQ29tcG9uZW50Iiwib2JqZWN0IiwiQmFja0xpbmsiLCJkZWZhdWx0Iiwic3RhdHVzRXZlbnQiLCJ1bmRlZmluZWQiLCJjb25uZWN0aW9uIiwiX3dhdGNoU3RhdHNJbnRlcnZhbCIsIndpbmRvdyIsInNldEludGVydmFsIiwiZ2V0U3RhdHMiLCJ0aGVuIiwiT2JqZWN0Iiwia2V5cyIsInJlcyIsImZvckVhY2giLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsImNsZWFySW50ZXJ2YWwiLCJ1bndhdGNoU3RhdHMiLCJldmVudCIsInNldFN0YXRlIiwicHVibGlzaGVyIiwicHVibGlzaGVyVmlldyIsInB1Ymxpc2hlckVzdGFibGlzaGVkIiwiaGFuZGxlUHVibGlzaGVyRXZlbnQiLCJkZWZhdWx0Q29uZmlndXJhdGlvbiIsInByb3RvY29sIiwicG9ydCIsImFwcCIsInN0cmVhbVR5cGUiLCJhdWRpb09uIiwidmlkZW9PbiIsIlJlZDVQcm9QdWJsaXNoZXIiLCJ2aWV3IiwiaW5zdGFuY2VJZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwibWVzc2FnZSIsImVycm9yIiwiZGVmYXVsdE1lZGlhIiwiYXVkaW8iLCJjb25maWd1cmF0aW9uIiwidmlkZW8iLCJkZWZpbmVkTWVkaWEiLCJ1c2VyTWVkaWEiLCJhc3NpZ24iLCJvblB1Ymxpc2hlckVzdGFibGlzaGVkIiwiY29tcCIsImdVTSIsImdldFVzZXJNZWRpYUNvbmZpZ3VyYXRpb24iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVsZW1lbnRJZCIsImpvaW4iLCJSVENQdWJsaXNoZXIiLCJQdWJsaXNoZXJWaWV3IiwiZ21kIiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2UiLCJvblB1Ymxpc2hlckV2ZW50Iiwib24iLCJnZXRVc2VyTWVkaWEiLCJhdHRhY2hTdHJlYW0iLCJtZWRpYSIsInByZXZpZXciLCJvblB1Ymxpc2hGYWlsIiwiYXR0YWNoUHVibGlzaGVyIiwiY29uZmlnIiwicnRjcG9ydCIsInN0cmVhbU5hbWUiLCJpbml0IiwicHViIiwibm90aWZ5UHVibGlzaGVyRXN0YWJsaXNoZWQiLCJwdWJsaXNoIiwib25QdWJsaXNoU3VjY2VzcyIsImNhdGNoIiwianNvbkVycm9yIiwidW5wdWJsaXNoIiwic3JjIiwic2V0VmlldyIsIm9mZiIsIm9uUHVibGlzaGVyZXZlbnQiLCJvblVucHVibGlzaFN1Y2Nlc3MiLCJvblVucHVibGlzaEZhaWxlZCIsImF1dG8iLCJ0cnlQdWJsaXNoIiwiYXV0b1B1Ymxpc2giLCJwcmV2UHJvcHMiLCJwIiwicFVNIiwicHJldlVNIiwiX3JlZDVQcm9QdWJsaXNoZXIiLCJjbGFzc05hbWVzIiwiY2xhc3NOYW1lIiwiY29uY2F0IiwibWVkaWFDbGFzc05hbWVzIiwibWVkaWFDbGFzc05hbWUiLCJfdmlkZW9Db250YWluZXIiLCJzdHlsZSIsInNob3dDb250cm9scyIsImJvb2xlYW4iLCJkZWZhdWx0UHJvcHMiLCJQdWJsaXNoZXJTdGF0dXMiLCJzdGF0dXMiLCJwdWJUeXBlcyIsIlB1Ymxpc2hlckV2ZW50VHlwZXMiLCJydGNUeXBlcyIsIlJUQ1B1Ymxpc2hlckV2ZW50VHlwZXMiLCJDT05ORUNUX1NVQ0NFU1MiLCJDT05ORUNUX0ZBSUxVUkUiLCJQVUJMSVNIX1NUQVJUIiwiUFVCTElTSF9GQUlMIiwiUFVCTElTSF9JTlZBTElEX05BTUUiLCJNRURJQV9TVFJFQU1fQVZBSUxBQkxFIiwiUEVFUl9DT05ORUNUSU9OX0FWQUlMQUJMRSIsIk9GRkVSX1NUQVJUIiwiT0ZGRVJfRU5EIiwiSUNFX1RSSUNLTEVfQ09NUExFVEUiLCJuZXh0UHJvcHMiLCJ1cGRhdGVTdGF0dXNGcm9tRXZlbnQiLCJVU0VSX01FRElBX1NFVFRJTkciLCJ3aWR0aCIsImhlaWdodCIsInZpZGVvRWxlbWVudCIsImdldFB1Ymxpc2hlckVsZW1lbnQiLCJwYXVzZSIsIlNFTEVDVF9ERUZBVUxUIiwiY2FtZXJhcyIsImxhYmVsIiwic2VsZWN0ZWRDYW1lcmEiLCJwdWJsaXNoQWxsb3dlZCIsIm1lZGlhRGV2aWNlcyIsImVudW1lcmF0ZURldmljZXMiLCJ2aWRlb0NhbWVyYXMiLCJkZXZpY2VzIiwiaXRlbSIsImtpbmQiLCJtZWRpYURldmljZUlkIiwiY2FtZXJhU2VsZWN0ZWQiLCJfY2FtZXJhU2VsZWN0Iiwid2FpdEZvclNlbGVjdCIsImxhYmVsU3R5bGUiLCJjYW1lcmFTZWxlY3RGaWVsZCIsImNhblB1Ymxpc2giLCJvcHRpb25hbCIsInNvdXJjZUlkIiwib25DYW1lcmFTZWxlY3QiLCJjYW1lcmEiLCJkZXZpY2VJZCIsIkZBQ0lOR19NT0RFX0ZST05UIiwiRkFDSU5HX01PREVfUkVBUiIsImZhY2luZ01vZGVGcm9udCIsInN1cHBvcnRlZCIsImdldFN1cHBvcnRlZENvbnN0cmFpbnRzIiwiaGludENsYXNzIiwic3VwcG9ydGVkU3RyIiwiZmFjaW5nTW9kZSIsIm9uQ2FtZXJhU3dhcFJlcXVlc3QiLCJGSUxURVJfU0VMRUNUIiwiZmlsdGVycyIsInZpZGVvQ2xhc3NMaXN0Iiwic2VsZWN0ZWRGaWx0ZXIiLCJfZmlsdGVyU2VsZWN0IiwiY2xhc3NMaXN0IiwiZmlsdGVyU2VsZWN0RmllbGQiLCJvbkZpbHRlclNlbGVjdCIsInNlbGVjdGVkUHVibGlzaGVyVHlwZSIsIl9wdWJsaXNoZXJFbnRyeSIsInJ0Y0NvbmZpZyIsInJ0bXBDb25maWciLCJydG1wcG9ydCIsInN3ZiIsInB1Ymxpc2hPcmRlciIsInB1Ymxpc2hlckZhaWxvdmVyT3JkZXIiLCJzcGxpdCIsInRyaW0iLCJzZXRQdWJsaXNoT3JkZXIiLCJydGMiLCJydG1wIiwic2VsZWN0ZWRQdWJsaXNoZXIiLCJnZXRUeXBlIiwicHVibGlzaFR5cGVzIiwiUlRDIiwiY2FwdHVyZUZpbGxlZCIsImNsZWFyQ2FudmFzIiwiZHJhd09uQ2FudmFzIiwidGFyZ2V0RWxlbWVudCIsImNhbnZhcyIsIl9jYXB0dXJlQ2FudmFzIiwiY29udGV4dCIsImdldENvbnRleHQiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwiZHJhd0ltYWdlIiwidmlzaWJsZSIsImNhcHR1cmVUZXh0U3R5bGUiLCJvblZpZGVvSW1hZ2VDYXB0dXJlIiwidGFyZ2V0SG9zdCIsInVybCIsImZldGNoIiwiaGVhZGVycyIsImdldCIsImluZGV4T2YiLCJqc29uIiwiVHlwZUVycm9yIiwic2VydmVyQWRkcmVzcyIsInJlcXVlc3RPcmlnaW4iLCJzdWJzY3JpYmVyIiwic3Vic2NyaWJlckVzdGFibGlzaGVkIiwiaGFuZGxlU3Vic2NyaWJlckV2ZW50IiwiYmFuZHdpZHRoIiwiZGF0YSIsIlJlZDVQcm9TdWJzY3JpYmVyIiwib25TdWJzY3JpYmVyRXN0YWJsaXNoZWQiLCJQbGF5YmFja1ZpZXciLCJSVENTdWJzY3JpYmVyIiwib3JpZ0F0dGFjaFN0cmVhbSIsInN0cmVhbSIsImF1dG9wbGF5IiwiYXR0YWNoU3Vic2NyaWJlciIsIm9uU3Vic2NyaWJlckV2ZW50Iiwic3Vic2NyaXB0aW9uSWQiLCJwbGF5ZXIiLCJwbGF5Iiwib25TdWJzY3JpYmVTdWNjZXNzIiwibm90aWZ5U3Vic2NyaWJlckVzdGFibGlzaGVkIiwib25TdWJzY3JpYmVGYWlsIiwic3RvcCIsIm9uVW5zdWJzY3JpYmVTdWNjZXNzIiwib25VbnN1YnNjcmliZUZhaWwiLCJzdWJzY3JpYmUiLCJ0cnlTdWJzY3JpYmUiLCJhdXRvU3Vic2NyaWJlIiwidW5zdWJzY3JpYmUiLCJzdWIiLCJfcmVkNVByb1N1YnNjcmliZXIiLCJjaGlsZHJlbiIsImF1ZGlvT25seSIsImF1dG9QbGF5IiwiU3Vic2NyaWJlclN0YXR1cyIsInN1YlR5cGVzIiwiU3Vic2NyaWJlckV2ZW50VHlwZXMiLCJSVENTdWJzY3JpYmVyRXZlbnRUeXBlcyIsImFuc3dlciIsImNhbmRpZGF0ZSIsIlNVQlNDUklCRV9TVEFSVCIsIlNVQlNDUklCRV9GQUlMIiwiU1VCU0NSSUJFX0lOVkFMSURfTkFNRSIsIkFOU1dFUl9TVEFSVCIsIkFOU1dFUl9FTkQiLCJDQU5ESURBVEVfU1RBUlQiLCJDQU5ESURBVEVfRU5EIiwiX3N1YnNjcmliZXJFbnRyeSIsInN1YnNjcmliZU9yZGVyIiwic3Vic2NyaWJlckZhaWxvdmVyT3JkZXIiLCJtaW1lVHlwZSIsInVzZVZpZGVvSlMiLCJobHNDb25maWciLCJobHNwb3J0Iiwic2V0UGxheWJhY2tPcmRlciIsImhscyIsImdldFBsYXliYWNrRWxlbWVudCIsInRleHQiLCJzdWJzdHJpbmciLCJyZXF1ZXN0RWRnZSIsImNhblN1YnNjcmliZSIsInRhcmdldFRlc3QiLCJUZXN0Q29udGFpbmVyIiwic2V0dGluZ3NPdmVycmlkZSIsIlB1Ymxpc2hlckNvbnRhaW5lciIsIlN1YnNjcmliZXJDb250YWluZXIiLCJBcHAiLCJURVNUQkVEX1ZFUlNJT04iLCJvbmx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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QUUxQnFCLGtCQUYwQixFQUcxQjZULFVBSDBCLENBQTVCOztBQUtBLFVBQU8sb0JBQUMsbUJBQUQsT0FBUDtBQUVELEU7Ozs7Ozs7Ozs7OztBQ3hCRDs7QUFFQSxLQUFNSyxNQUFNLFNBQU5BLEdBQU07QUFBQSxPQUFHdFYsSUFBSCxRQUFHQSxJQUFIO0FBQUEsVUFDVjtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsU0FBRyxXQUFVLGVBQWI7QUFBQTtBQUErQ3VWLE9BQUEsU0FBQUE7QUFBL0MsTUFERjtBQUVHLHFCQUFTQyxJQUFULENBQWN4VixJQUFkO0FBRkgsSUFEVTtBQUFBLEVBQVosQyxDQUpBO0FBQ0E7bUJBVWVzVixHOzs7Ozs7QUNYZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNwRkEsdUQiLCJmaWxlIjoic2NyaXB0L3JlZDVwcm8tdGVzdGJlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIlJlYWN0RE9NXCIpLCByZXF1aXJlKFwiUmVhY3RSZWR1eFwiKSwgcmVxdWlyZShcIlJlYWN0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcIlJlYWN0RE9NXCIsIFwiUmVhY3RSZWR1eFwiLCBcIlJlYWN0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInJlZDVwcm90ZXN0YmVkXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiUmVhY3RET01cIiksIHJlcXVpcmUoXCJSZWFjdFJlZHV4XCIpLCByZXF1aXJlKFwiUmVhY3RcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInJlZDVwcm90ZXN0YmVkXCJdID0gZmFjdG9yeShyb290W1wiUmVhY3RET01cIl0sIHJvb3RbXCJSZWFjdFJlZHV4XCJdLCByb290W1wiUmVhY3RcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMThfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yOV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxMGJkNTEyNTZiODgxNDliZjk0Y1xuICoqLyIsImltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgcmVkdWNlciBmcm9tICcuL3JlZHVjZXJzJ1xuaW1wb3J0IEFwcENvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvQXBwQ29udGFpbmVyJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmltcG9ydCB0ZXN0YmVkIGZyb20gXCIuLi9yZXNvdXJjZS90ZXN0YmVkLmpzb25cIlxuXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHtcbiAgLi4udGVzdGJlZCxcbiAgdmlld0ZpbHRlcjogJ0hvbWUnLFxuICBsb2dMZXZlbDogJ2RlYnVnJ1xufSlcblxuLy8gY29uc29sZS5sb2coJ1tpbmRleF06XFxyXFxuJyArIEpTT04uc3RyaW5naWZ5KHN0b3JlLmdldFN0YXRlKCksIG51bGwsIDIpKVxuXG5yZW5kZXIoXG4gIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgIDxBcHBDb250YWluZXIgLz5cbiAgPC9Qcm92aWRlcj4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuKVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIlJlYWN0RE9NXCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmNvbXBvc2UgPSBleHBvcnRzLmFwcGx5TWlkZGxld2FyZSA9IGV4cG9ydHMuYmluZEFjdGlvbkNyZWF0b3JzID0gZXhwb3J0cy5jb21iaW5lUmVkdWNlcnMgPSBleHBvcnRzLmNyZWF0ZVN0b3JlID0gdW5kZWZpbmVkO1xuXG52YXIgX2NyZWF0ZVN0b3JlID0gcmVxdWlyZSgnLi9jcmVhdGVTdG9yZScpO1xuXG52YXIgX2NyZWF0ZVN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZVN0b3JlKTtcblxudmFyIF9jb21iaW5lUmVkdWNlcnMgPSByZXF1aXJlKCcuL2NvbWJpbmVSZWR1Y2VycycpO1xuXG52YXIgX2NvbWJpbmVSZWR1Y2VyczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21iaW5lUmVkdWNlcnMpO1xuXG52YXIgX2JpbmRBY3Rpb25DcmVhdG9ycyA9IHJlcXVpcmUoJy4vYmluZEFjdGlvbkNyZWF0b3JzJyk7XG5cbnZhciBfYmluZEFjdGlvbkNyZWF0b3JzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2JpbmRBY3Rpb25DcmVhdG9ycyk7XG5cbnZhciBfYXBwbHlNaWRkbGV3YXJlID0gcmVxdWlyZSgnLi9hcHBseU1pZGRsZXdhcmUnKTtcblxudmFyIF9hcHBseU1pZGRsZXdhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXBwbHlNaWRkbGV3YXJlKTtcblxudmFyIF9jb21wb3NlID0gcmVxdWlyZSgnLi9jb21wb3NlJyk7XG5cbnZhciBfY29tcG9zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb3NlKTtcblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnLi91dGlscy93YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4vKlxuKiBUaGlzIGlzIGEgZHVtbXkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIGZ1bmN0aW9uIG5hbWUgaGFzIGJlZW4gYWx0ZXJlZCBieSBtaW5pZmljYXRpb24uXG4qIElmIHRoZSBmdW5jdGlvbiBoYXMgYmVlbiBtaW5pZmllZCBhbmQgTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJywgd2FybiB0aGUgdXNlci5cbiovXG5mdW5jdGlvbiBpc0NydXNoZWQoKSB7fVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgaXNDcnVzaGVkLm5hbWUgPT09ICdzdHJpbmcnICYmIGlzQ3J1c2hlZC5uYW1lICE9PSAnaXNDcnVzaGVkJykge1xuICAoMCwgX3dhcm5pbmcyWydkZWZhdWx0J10pKCdZb3UgYXJlIGN1cnJlbnRseSB1c2luZyBtaW5pZmllZCBjb2RlIG91dHNpZGUgb2YgTk9ERV9FTlYgPT09IFxcJ3Byb2R1Y3Rpb25cXCcuICcgKyAnVGhpcyBtZWFucyB0aGF0IHlvdSBhcmUgcnVubmluZyBhIHNsb3dlciBkZXZlbG9wbWVudCBidWlsZCBvZiBSZWR1eC4gJyArICdZb3UgY2FuIHVzZSBsb29zZS1lbnZpZnkgKGh0dHBzOi8vZ2l0aHViLmNvbS96ZXJ0b3NoL2xvb3NlLWVudmlmeSkgZm9yIGJyb3dzZXJpZnkgJyArICdvciBEZWZpbmVQbHVnaW4gZm9yIHdlYnBhY2sgKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzAwMzAwMzEpICcgKyAndG8gZW5zdXJlIHlvdSBoYXZlIHRoZSBjb3JyZWN0IGNvZGUgZm9yIHlvdXIgcHJvZHVjdGlvbiBidWlsZC4nKTtcbn1cblxuZXhwb3J0cy5jcmVhdGVTdG9yZSA9IF9jcmVhdGVTdG9yZTJbJ2RlZmF1bHQnXTtcbmV4cG9ydHMuY29tYmluZVJlZHVjZXJzID0gX2NvbWJpbmVSZWR1Y2VyczJbJ2RlZmF1bHQnXTtcbmV4cG9ydHMuYmluZEFjdGlvbkNyZWF0b3JzID0gX2JpbmRBY3Rpb25DcmVhdG9yczJbJ2RlZmF1bHQnXTtcbmV4cG9ydHMuYXBwbHlNaWRkbGV3YXJlID0gX2FwcGx5TWlkZGxld2FyZTJbJ2RlZmF1bHQnXTtcbmV4cG9ydHMuY29tcG9zZSA9IF9jb21wb3NlMlsnZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZHV4L2xpYi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLkFjdGlvblR5cGVzID0gdW5kZWZpbmVkO1xuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlU3RvcmU7XG5cbnZhciBfaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJ2xvZGFzaC9pc1BsYWluT2JqZWN0Jyk7XG5cbnZhciBfaXNQbGFpbk9iamVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1BsYWluT2JqZWN0KTtcblxudmFyIF9zeW1ib2xPYnNlcnZhYmxlID0gcmVxdWlyZSgnc3ltYm9sLW9ic2VydmFibGUnKTtcblxudmFyIF9zeW1ib2xPYnNlcnZhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbE9ic2VydmFibGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbi8qKlxuICogVGhlc2UgYXJlIHByaXZhdGUgYWN0aW9uIHR5cGVzIHJlc2VydmVkIGJ5IFJlZHV4LlxuICogRm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHlvdSBtdXN0IHJldHVybiB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLlxuICogRG8gbm90IHJlZmVyZW5jZSB0aGVzZSBhY3Rpb24gdHlwZXMgZGlyZWN0bHkgaW4geW91ciBjb2RlLlxuICovXG52YXIgQWN0aW9uVHlwZXMgPSBleHBvcnRzLkFjdGlvblR5cGVzID0ge1xuICBJTklUOiAnQEByZWR1eC9JTklUJ1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cbiAqIFRoZSBvbmx5IHdheSB0byBjaGFuZ2UgdGhlIGRhdGEgaW4gdGhlIHN0b3JlIGlzIHRvIGNhbGwgYGRpc3BhdGNoKClgIG9uIGl0LlxuICpcbiAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcbiAqIHBhcnRzIG9mIHRoZSBzdGF0ZSB0cmVlIHJlc3BvbmQgdG8gYWN0aW9ucywgeW91IG1heSBjb21iaW5lIHNldmVyYWwgcmVkdWNlcnNcbiAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWR1Y2VyIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuZXh0IHN0YXRlIHRyZWUsIGdpdmVuXG4gKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cbiAqXG4gKiBAcGFyYW0ge2FueX0gW3ByZWxvYWRlZFN0YXRlXSBUaGUgaW5pdGlhbCBzdGF0ZS4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG4gKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuICogSWYgeW91IHVzZSBgY29tYmluZVJlZHVjZXJzYCB0byBwcm9kdWNlIHRoZSByb290IHJlZHVjZXIgZnVuY3Rpb24sIHRoaXMgbXVzdCBiZVxuICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmhhbmNlciBUaGUgc3RvcmUgZW5oYW5jZXIuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gKiB0byBlbmhhbmNlIHRoZSBzdG9yZSB3aXRoIHRoaXJkLXBhcnR5IGNhcGFiaWxpdGllcyBzdWNoIGFzIG1pZGRsZXdhcmUsXG4gKiB0aW1lIHRyYXZlbCwgcGVyc2lzdGVuY2UsIGV0Yy4gVGhlIG9ubHkgc3RvcmUgZW5oYW5jZXIgdGhhdCBzaGlwcyB3aXRoIFJlZHV4XG4gKiBpcyBgYXBwbHlNaWRkbGV3YXJlKClgLlxuICpcbiAqIEByZXR1cm5zIHtTdG9yZX0gQSBSZWR1eCBzdG9yZSB0aGF0IGxldHMgeW91IHJlYWQgdGhlIHN0YXRlLCBkaXNwYXRjaCBhY3Rpb25zXG4gKiBhbmQgc3Vic2NyaWJlIHRvIGNoYW5nZXMuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICB2YXIgX3JlZjI7XG5cbiAgaWYgKHR5cGVvZiBwcmVsb2FkZWRTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW5oYW5jZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZW5oYW5jZXIgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgICBwcmVsb2FkZWRTdGF0ZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgZW5oYW5jZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW5oYW5jZXIoY3JlYXRlU3RvcmUpKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIHJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciBjdXJyZW50UmVkdWNlciA9IHJlZHVjZXI7XG4gIHZhciBjdXJyZW50U3RhdGUgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgdmFyIGN1cnJlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgdmFyIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzO1xuICB2YXIgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKG5leHRMaXN0ZW5lcnMgPT09IGN1cnJlbnRMaXN0ZW5lcnMpIHtcbiAgICAgIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIHRoZSBzdGF0ZSB0cmVlIG1hbmFnZWQgYnkgdGhlIHN0b3JlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7YW55fSBUaGUgY3VycmVudCBzdGF0ZSB0cmVlIG9mIHlvdXIgYXBwbGljYXRpb24uXG4gICAqL1xuICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGFuZ2UgbGlzdGVuZXIuIEl0IHdpbGwgYmUgY2FsbGVkIGFueSB0aW1lIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLFxuICAgKiBhbmQgc29tZSBwYXJ0IG9mIHRoZSBzdGF0ZSB0cmVlIG1heSBwb3RlbnRpYWxseSBoYXZlIGNoYW5nZWQuIFlvdSBtYXkgdGhlblxuICAgKiBjYWxsIGBnZXRTdGF0ZSgpYCB0byByZWFkIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgaW5zaWRlIHRoZSBjYWxsYmFjay5cbiAgICpcbiAgICogWW91IG1heSBjYWxsIGBkaXNwYXRjaCgpYCBmcm9tIGEgY2hhbmdlIGxpc3RlbmVyLCB3aXRoIHRoZSBmb2xsb3dpbmdcbiAgICogY2F2ZWF0czpcbiAgICpcbiAgICogMS4gVGhlIHN1YnNjcmlwdGlvbnMgYXJlIHNuYXBzaG90dGVkIGp1c3QgYmVmb3JlIGV2ZXJ5IGBkaXNwYXRjaCgpYCBjYWxsLlxuICAgKiBJZiB5b3Ugc3Vic2NyaWJlIG9yIHVuc3Vic2NyaWJlIHdoaWxlIHRoZSBsaXN0ZW5lcnMgYXJlIGJlaW5nIGludm9rZWQsIHRoaXNcbiAgICogd2lsbCBub3QgaGF2ZSBhbnkgZWZmZWN0IG9uIHRoZSBgZGlzcGF0Y2goKWAgdGhhdCBpcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3MuXG4gICAqIEhvd2V2ZXIsIHRoZSBuZXh0IGBkaXNwYXRjaCgpYCBjYWxsLCB3aGV0aGVyIG5lc3RlZCBvciBub3QsIHdpbGwgdXNlIGEgbW9yZVxuICAgKiByZWNlbnQgc25hcHNob3Qgb2YgdGhlIHN1YnNjcmlwdGlvbiBsaXN0LlxuICAgKlxuICAgKiAyLiBUaGUgbGlzdGVuZXIgc2hvdWxkIG5vdCBleHBlY3QgdG8gc2VlIGFsbCBzdGF0ZSBjaGFuZ2VzLCBhcyB0aGUgc3RhdGVcbiAgICogbWlnaHQgaGF2ZSBiZWVuIHVwZGF0ZWQgbXVsdGlwbGUgdGltZXMgZHVyaW5nIGEgbmVzdGVkIGBkaXNwYXRjaCgpYCBiZWZvcmVcbiAgICogdGhlIGxpc3RlbmVyIGlzIGNhbGxlZC4gSXQgaXMsIGhvd2V2ZXIsIGd1YXJhbnRlZWQgdGhhdCBhbGwgc3Vic2NyaWJlcnNcbiAgICogcmVnaXN0ZXJlZCBiZWZvcmUgdGhlIGBkaXNwYXRjaCgpYCBzdGFydGVkIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGxhdGVzdFxuICAgKiBzdGF0ZSBieSB0aGUgdGltZSBpdCBleGl0cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgQSBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGV2ZXJ5IGRpc3BhdGNoLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoaXMgY2hhbmdlIGxpc3RlbmVyLlxuICAgKi9cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBsaXN0ZW5lciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBpc1N1YnNjcmliZWQgPSB0cnVlO1xuXG4gICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgIG5leHRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICBpZiAoIWlzU3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuXG4gICAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgICB2YXIgaW5kZXggPSBuZXh0TGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgICAgbmV4dExpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhbiBhY3Rpb24uIEl0IGlzIHRoZSBvbmx5IHdheSB0byB0cmlnZ2VyIGEgc3RhdGUgY2hhbmdlLlxuICAgKlxuICAgKiBUaGUgYHJlZHVjZXJgIGZ1bmN0aW9uLCB1c2VkIHRvIGNyZWF0ZSB0aGUgc3RvcmUsIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlXG4gICAqIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGdpdmVuIGBhY3Rpb25gLiBJdHMgcmV0dXJuIHZhbHVlIHdpbGxcbiAgICogYmUgY29uc2lkZXJlZCB0aGUgKipuZXh0Kiogc3RhdGUgb2YgdGhlIHRyZWUsIGFuZCB0aGUgY2hhbmdlIGxpc3RlbmVyc1xuICAgKiB3aWxsIGJlIG5vdGlmaWVkLlxuICAgKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvbmx5IHN1cHBvcnRzIHBsYWluIG9iamVjdCBhY3Rpb25zLiBJZiB5b3Ugd2FudCB0b1xuICAgKiBkaXNwYXRjaCBhIFByb21pc2UsIGFuIE9ic2VydmFibGUsIGEgdGh1bmssIG9yIHNvbWV0aGluZyBlbHNlLCB5b3UgbmVlZCB0b1xuICAgKiB3cmFwIHlvdXIgc3RvcmUgY3JlYXRpbmcgZnVuY3Rpb24gaW50byB0aGUgY29ycmVzcG9uZGluZyBtaWRkbGV3YXJlLiBGb3JcbiAgICogZXhhbXBsZSwgc2VlIHRoZSBkb2N1bWVudGF0aW9uIGZvciB0aGUgYHJlZHV4LXRodW5rYCBwYWNrYWdlLiBFdmVuIHRoZVxuICAgKiBtaWRkbGV3YXJlIHdpbGwgZXZlbnR1YWxseSBkaXNwYXRjaCBwbGFpbiBvYmplY3QgYWN0aW9ucyB1c2luZyB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBBIHBsYWluIG9iamVjdCByZXByZXNlbnRpbmcg4oCcd2hhdCBjaGFuZ2Vk4oCdLiBJdCBpc1xuICAgKiBhIGdvb2QgaWRlYSB0byBrZWVwIGFjdGlvbnMgc2VyaWFsaXphYmxlIHNvIHlvdSBjYW4gcmVjb3JkIGFuZCByZXBsYXkgdXNlclxuICAgKiBzZXNzaW9ucywgb3IgdXNlIHRoZSB0aW1lIHRyYXZlbGxpbmcgYHJlZHV4LWRldnRvb2xzYC4gQW4gYWN0aW9uIG11c3QgaGF2ZVxuICAgKiBhIGB0eXBlYCBwcm9wZXJ0eSB3aGljaCBtYXkgbm90IGJlIGB1bmRlZmluZWRgLiBJdCBpcyBhIGdvb2QgaWRlYSB0byB1c2VcbiAgICogc3RyaW5nIGNvbnN0YW50cyBmb3IgYWN0aW9uIHR5cGVzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBGb3IgY29udmVuaWVuY2UsIHRoZSBzYW1lIGFjdGlvbiBvYmplY3QgeW91IGRpc3BhdGNoZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCwgaWYgeW91IHVzZSBhIGN1c3RvbSBtaWRkbGV3YXJlLCBpdCBtYXkgd3JhcCBgZGlzcGF0Y2goKWAgdG9cbiAgICogcmV0dXJuIHNvbWV0aGluZyBlbHNlIChmb3IgZXhhbXBsZSwgYSBQcm9taXNlIHlvdSBjYW4gYXdhaXQpLlxuICAgKi9cbiAgZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgaWYgKCEoMCwgX2lzUGxhaW5PYmplY3QyWydkZWZhdWx0J10pKGFjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtdXN0IGJlIHBsYWluIG9iamVjdHMuICcgKyAnVXNlIGN1c3RvbSBtaWRkbGV3YXJlIGZvciBhc3luYyBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYWN0aW9uLnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbWF5IG5vdCBoYXZlIGFuIHVuZGVmaW5lZCBcInR5cGVcIiBwcm9wZXJ0eS4gJyArICdIYXZlIHlvdSBtaXNzcGVsbGVkIGEgY29uc3RhbnQ/Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlcnMgbWF5IG5vdCBkaXNwYXRjaCBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRSZWR1Y2VyKGN1cnJlbnRTdGF0ZSwgYWN0aW9uKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBsaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzID0gbmV4dExpc3RlbmVycztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGlzdGVuZXJzW2ldKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgcmVkdWNlciBjdXJyZW50bHkgdXNlZCBieSB0aGUgc3RvcmUgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogWW91IG1pZ2h0IG5lZWQgdGhpcyBpZiB5b3VyIGFwcCBpbXBsZW1lbnRzIGNvZGUgc3BsaXR0aW5nIGFuZCB5b3Ugd2FudCB0b1xuICAgKiBsb2FkIHNvbWUgb2YgdGhlIHJlZHVjZXJzIGR5bmFtaWNhbGx5LiBZb3UgbWlnaHQgYWxzbyBuZWVkIHRoaXMgaWYgeW91XG4gICAqIGltcGxlbWVudCBhIGhvdCByZWxvYWRpbmcgbWVjaGFuaXNtIGZvciBSZWR1eC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dFJlZHVjZXIgVGhlIHJlZHVjZXIgZm9yIHRoZSBzdG9yZSB0byB1c2UgaW5zdGVhZC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlUmVkdWNlcihuZXh0UmVkdWNlcikge1xuICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjtcbiAgICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJvcGVyYWJpbGl0eSBwb2ludCBmb3Igb2JzZXJ2YWJsZS9yZWFjdGl2ZSBsaWJyYXJpZXMuXG4gICAqIEByZXR1cm5zIHtvYnNlcnZhYmxlfSBBIG1pbmltYWwgb2JzZXJ2YWJsZSBvZiBzdGF0ZSBjaGFuZ2VzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBvYnNlcnZhYmxlIHByb3Bvc2FsOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vemVucGFyc2luZy9lcy1vYnNlcnZhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBvYnNlcnZhYmxlKCkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIG91dGVyU3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJldHVybiBfcmVmID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgbWluaW1hbCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXIgQW55IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIG9ic2VydmVyLlxuICAgICAgICogVGhlIG9ic2VydmVyIG9iamVjdCBzaG91bGQgaGF2ZSBhIGBuZXh0YCBtZXRob2QuXG4gICAgICAgKiBAcmV0dXJucyB7c3Vic2NyaXB0aW9ufSBBbiBvYmplY3Qgd2l0aCBhbiBgdW5zdWJzY3JpYmVgIG1ldGhvZCB0aGF0IGNhblxuICAgICAgICogYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGUgb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIHByZXZlbnQgZnVydGhlclxuICAgICAgICogZW1pc3Npb24gb2YgdmFsdWVzIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAgICAgKi9cbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXIgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIG9ic2VydmVyIHRvIGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmVTdGF0ZSgpIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChnZXRTdGF0ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gb3V0ZXJTdWJzY3JpYmUob2JzZXJ2ZVN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHsgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlIH07XG4gICAgICB9XG4gICAgfSwgX3JlZltfc3ltYm9sT2JzZXJ2YWJsZTJbJ2RlZmF1bHQnXV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBfcmVmO1xuICB9XG5cbiAgLy8gV2hlbiBhIHN0b3JlIGlzIGNyZWF0ZWQsIGFuIFwiSU5JVFwiIGFjdGlvbiBpcyBkaXNwYXRjaGVkIHNvIHRoYXQgZXZlcnlcbiAgLy8gcmVkdWNlciByZXR1cm5zIHRoZWlyIGluaXRpYWwgc3RhdGUuIFRoaXMgZWZmZWN0aXZlbHkgcG9wdWxhdGVzXG4gIC8vIHRoZSBpbml0aWFsIHN0YXRlIHRyZWUuXG4gIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuICByZXR1cm4gX3JlZjIgPSB7XG4gICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgIHN1YnNjcmliZTogc3Vic2NyaWJlLFxuICAgIGdldFN0YXRlOiBnZXRTdGF0ZSxcbiAgICByZXBsYWNlUmVkdWNlcjogcmVwbGFjZVJlZHVjZXJcbiAgfSwgX3JlZjJbX3N5bWJvbE9ic2VydmFibGUyWydkZWZhdWx0J11dID0gb2JzZXJ2YWJsZSwgX3JlZjI7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVkdXgvbGliL2NyZWF0ZVN0b3JlLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdldFByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2dldFByb3RvdHlwZScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpICE9IG9iamVjdFRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiZcbiAgICBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1BsYWluT2JqZWN0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2lzUGxhaW5PYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgb3ZlckFyZyA9IHJlcXVpcmUoJy4vX292ZXJBcmcnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UHJvdG90eXBlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19nZXRQcm90b3R5cGUuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvdmVyQXJnO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19vdmVyQXJnLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2lzT2JqZWN0TGlrZS5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaW5kZXgnKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N5bWJvbC1vYnNlcnZhYmxlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9wb255ZmlsbCA9IHJlcXVpcmUoJy4vcG9ueWZpbGwnKTtcblxudmFyIF9wb255ZmlsbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb255ZmlsbCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIHJvb3QgPSB1bmRlZmluZWQ7IC8qIGdsb2JhbCB3aW5kb3cgKi9cblxuaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG5cdHJvb3QgPSB3aW5kb3c7XG59XG5cbnZhciByZXN1bHQgPSAoMCwgX3BvbnlmaWxsMlsnZGVmYXVsdCddKShyb290KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJlc3VsdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsO1xuZnVuY3Rpb24gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsKHJvb3QpIHtcblx0dmFyIHJlc3VsdDtcblx0dmFyIF9TeW1ib2wgPSByb290LlN5bWJvbDtcblxuXHRpZiAodHlwZW9mIF9TeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcblx0XHRpZiAoX1N5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRyZXN1bHQgPSBfU3ltYm9sLm9ic2VydmFibGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCA9IF9TeW1ib2woJ29ic2VydmFibGUnKTtcblx0XHRcdF9TeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvcG9ueWZpbGwuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1snZGVmYXVsdCddID0gY29tYmluZVJlZHVjZXJzO1xuXG52YXIgX2NyZWF0ZVN0b3JlID0gcmVxdWlyZSgnLi9jcmVhdGVTdG9yZScpO1xuXG52YXIgX2lzUGxhaW5PYmplY3QgPSByZXF1aXJlKCdsb2Rhc2gvaXNQbGFpbk9iamVjdCcpO1xuXG52YXIgX2lzUGxhaW5PYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQbGFpbk9iamVjdCk7XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2Uoa2V5LCBhY3Rpb24pIHtcbiAgdmFyIGFjdGlvblR5cGUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGU7XG4gIHZhciBhY3Rpb25OYW1lID0gYWN0aW9uVHlwZSAmJiAnXCInICsgYWN0aW9uVHlwZS50b1N0cmluZygpICsgJ1wiJyB8fCAnYW4gYWN0aW9uJztcblxuICByZXR1cm4gJ0dpdmVuIGFjdGlvbiAnICsgYWN0aW9uTmFtZSArICcsIHJlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZC4gJyArICdUbyBpZ25vcmUgYW4gYWN0aW9uLCB5b3UgbXVzdCBleHBsaWNpdGx5IHJldHVybiB0aGUgcHJldmlvdXMgc3RhdGUuJztcbn1cblxuZnVuY3Rpb24gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShpbnB1dFN0YXRlLCByZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgYXJndW1lbnROYW1lID0gYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSBfY3JlYXRlU3RvcmUuQWN0aW9uVHlwZXMuSU5JVCA/ICdwcmVsb2FkZWRTdGF0ZSBhcmd1bWVudCBwYXNzZWQgdG8gY3JlYXRlU3RvcmUnIDogJ3ByZXZpb3VzIHN0YXRlIHJlY2VpdmVkIGJ5IHRoZSByZWR1Y2VyJztcblxuICBpZiAocmVkdWNlcktleXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuICdTdG9yZSBkb2VzIG5vdCBoYXZlIGEgdmFsaWQgcmVkdWNlci4gTWFrZSBzdXJlIHRoZSBhcmd1bWVudCBwYXNzZWQgJyArICd0byBjb21iaW5lUmVkdWNlcnMgaXMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgcmVkdWNlcnMuJztcbiAgfVxuXG4gIGlmICghKDAsIF9pc1BsYWluT2JqZWN0MlsnZGVmYXVsdCddKShpbnB1dFN0YXRlKSkge1xuICAgIHJldHVybiAnVGhlICcgKyBhcmd1bWVudE5hbWUgKyAnIGhhcyB1bmV4cGVjdGVkIHR5cGUgb2YgXCInICsge30udG9TdHJpbmcuY2FsbChpbnB1dFN0YXRlKS5tYXRjaCgvXFxzKFthLXp8QS1aXSspLylbMV0gKyAnXCIuIEV4cGVjdGVkIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgJyArICgna2V5czogXCInICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyAnXCInKTtcbiAgfVxuXG4gIHZhciB1bmV4cGVjdGVkS2V5cyA9IE9iamVjdC5rZXlzKGlucHV0U3RhdGUpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuICFyZWR1Y2Vycy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICF1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XTtcbiAgfSk7XG5cbiAgdW5leHBlY3RlZEtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdW5leHBlY3RlZEtleUNhY2hlW2tleV0gPSB0cnVlO1xuICB9KTtcblxuICBpZiAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiAnVW5leHBlY3RlZCAnICsgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDEgPyAna2V5cycgOiAna2V5JykgKyAnICcgKyAoJ1wiJyArIHVuZXhwZWN0ZWRLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiIGZvdW5kIGluICcgKyBhcmd1bWVudE5hbWUgKyAnLiAnKSArICdFeHBlY3RlZCB0byBmaW5kIG9uZSBvZiB0aGUga25vd24gcmVkdWNlciBrZXlzIGluc3RlYWQ6ICcgKyAoJ1wiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiLiBVbmV4cGVjdGVkIGtleXMgd2lsbCBiZSBpZ25vcmVkLicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFJlZHVjZXJTYW5pdHkocmVkdWNlcnMpIHtcbiAgT2JqZWN0LmtleXMocmVkdWNlcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciByZWR1Y2VyID0gcmVkdWNlcnNba2V5XTtcbiAgICB2YXIgaW5pdGlhbFN0YXRlID0gcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogX2NyZWF0ZVN0b3JlLkFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgICBpZiAodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkIGR1cmluZyBpbml0aWFsaXphdGlvbi4gJyArICdJZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZSByZWR1Y2VyIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgJyArICdleHBsaWNpdGx5IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5ICcgKyAnbm90IGJlIHVuZGVmaW5lZC4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9ICdAQHJlZHV4L1BST0JFX1VOS05PV05fQUNUSU9OXycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNykuc3BsaXQoJycpLmpvaW4oJy4nKTtcbiAgICBpZiAodHlwZW9mIHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IHR5cGUgfSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCB3aGVuIHByb2JlZCB3aXRoIGEgcmFuZG9tIHR5cGUuICcgKyAoJ0RvblxcJ3QgdHJ5IHRvIGhhbmRsZSAnICsgX2NyZWF0ZVN0b3JlLkFjdGlvblR5cGVzLklOSVQgKyAnIG9yIG90aGVyIGFjdGlvbnMgaW4gXCJyZWR1eC8qXCIgJykgKyAnbmFtZXNwYWNlLiBUaGV5IGFyZSBjb25zaWRlcmVkIHByaXZhdGUuIEluc3RlYWQsIHlvdSBtdXN0IHJldHVybiB0aGUgJyArICdjdXJyZW50IHN0YXRlIGZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB1bmxlc3MgaXQgaXMgdW5kZWZpbmVkLCAnICsgJ2luIHdoaWNoIGNhc2UgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLCByZWdhcmRsZXNzIG9mIHRoZSAnICsgJ2FjdGlvbiB0eXBlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgbm90IGJlIHVuZGVmaW5lZC4nKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGRpZmZlcmVudCByZWR1Y2VyIGZ1bmN0aW9ucywgaW50byBhIHNpbmdsZVxuICogcmVkdWNlciBmdW5jdGlvbi4gSXQgd2lsbCBjYWxsIGV2ZXJ5IGNoaWxkIHJlZHVjZXIsIGFuZCBnYXRoZXIgdGhlaXIgcmVzdWx0c1xuICogaW50byBhIHNpbmdsZSBzdGF0ZSBvYmplY3QsIHdob3NlIGtleXMgY29ycmVzcG9uZCB0byB0aGUga2V5cyBvZiB0aGUgcGFzc2VkXG4gKiByZWR1Y2VyIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVkdWNlcnMgQW4gb2JqZWN0IHdob3NlIHZhbHVlcyBjb3JyZXNwb25kIHRvIGRpZmZlcmVudFxuICogcmVkdWNlciBmdW5jdGlvbnMgdGhhdCBuZWVkIHRvIGJlIGNvbWJpbmVkIGludG8gb25lLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpblxuICogaXQgaXMgdG8gdXNlIEVTNiBgaW1wb3J0ICogYXMgcmVkdWNlcnNgIHN5bnRheC4gVGhlIHJlZHVjZXJzIG1heSBuZXZlciByZXR1cm5cbiAqIHVuZGVmaW5lZCBmb3IgYW55IGFjdGlvbi4gSW5zdGVhZCwgdGhleSBzaG91bGQgcmV0dXJuIHRoZWlyIGluaXRpYWwgc3RhdGVcbiAqIGlmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlbSB3YXMgdW5kZWZpbmVkLCBhbmQgdGhlIGN1cnJlbnQgc3RhdGUgZm9yIGFueVxuICogdW5yZWNvZ25pemVkIGFjdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgcmVkdWNlciBmdW5jdGlvbiB0aGF0IGludm9rZXMgZXZlcnkgcmVkdWNlciBpbnNpZGUgdGhlXG4gKiBwYXNzZWQgb2JqZWN0LCBhbmQgYnVpbGRzIGEgc3RhdGUgb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUuXG4gKi9cbmZ1bmN0aW9uIGNvbWJpbmVSZWR1Y2VycyhyZWR1Y2Vycykge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBmaW5hbFJlZHVjZXJzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVkdWNlcktleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gcmVkdWNlcktleXNbaV07XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAoMCwgX3dhcm5pbmcyWydkZWZhdWx0J10pKCdObyByZWR1Y2VyIHByb3ZpZGVkIGZvciBrZXkgXCInICsga2V5ICsgJ1wiJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBmaW5hbFJlZHVjZXJzW2tleV0gPSByZWR1Y2Vyc1trZXldO1xuICAgIH1cbiAgfVxuICB2YXIgZmluYWxSZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKGZpbmFsUmVkdWNlcnMpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdmFyIHVuZXhwZWN0ZWRLZXlDYWNoZSA9IHt9O1xuICB9XG5cbiAgdmFyIHNhbml0eUVycm9yO1xuICB0cnkge1xuICAgIGFzc2VydFJlZHVjZXJTYW5pdHkoZmluYWxSZWR1Y2Vycyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzYW5pdHlFcnJvciA9IGU7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gY29tYmluYXRpb24oKSB7XG4gICAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG4gICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50c1sxXTtcblxuICAgIGlmIChzYW5pdHlFcnJvcikge1xuICAgICAgdGhyb3cgc2FuaXR5RXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB3YXJuaW5nTWVzc2FnZSA9IGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2Uoc3RhdGUsIGZpbmFsUmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKTtcbiAgICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgICAoMCwgX3dhcm5pbmcyWydkZWZhdWx0J10pKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBuZXh0U3RhdGUgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbmFsUmVkdWNlcktleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBmaW5hbFJlZHVjZXJLZXlzW2ldO1xuICAgICAgdmFyIHJlZHVjZXIgPSBmaW5hbFJlZHVjZXJzW2tleV07XG4gICAgICB2YXIgcHJldmlvdXNTdGF0ZUZvcktleSA9IHN0YXRlW2tleV07XG4gICAgICB2YXIgbmV4dFN0YXRlRm9yS2V5ID0gcmVkdWNlcihwcmV2aW91c1N0YXRlRm9yS2V5LCBhY3Rpb24pO1xuICAgICAgaWYgKHR5cGVvZiBuZXh0U3RhdGVGb3JLZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgbmV4dFN0YXRlW2tleV0gPSBuZXh0U3RhdGVGb3JLZXk7XG4gICAgICBoYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZCB8fCBuZXh0U3RhdGVGb3JLZXkgIT09IHByZXZpb3VzU3RhdGVGb3JLZXk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDaGFuZ2VkID8gbmV4dFN0YXRlIDogc3RhdGU7XG4gIH07XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVkdXgvbGliL2NvbWJpbmVSZWR1Y2Vycy5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzWydkZWZhdWx0J10gPSB3YXJuaW5nO1xuLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tZW1wdHkgKi9cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWR1eC9saWIvdXRpbHMvd2FybmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzWydkZWZhdWx0J10gPSBiaW5kQWN0aW9uQ3JlYXRvcnM7XG5mdW5jdGlvbiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkaXNwYXRjaChhY3Rpb25DcmVhdG9yLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gIH07XG59XG5cbi8qKlxuICogVHVybnMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgYWN0aW9uIGNyZWF0b3JzLCBpbnRvIGFuIG9iamVjdCB3aXRoIHRoZVxuICogc2FtZSBrZXlzLCBidXQgd2l0aCBldmVyeSBmdW5jdGlvbiB3cmFwcGVkIGludG8gYSBgZGlzcGF0Y2hgIGNhbGwgc28gdGhleVxuICogbWF5IGJlIGludm9rZWQgZGlyZWN0bHkuIFRoaXMgaXMganVzdCBhIGNvbnZlbmllbmNlIG1ldGhvZCwgYXMgeW91IGNhbiBjYWxsXG4gKiBgc3RvcmUuZGlzcGF0Y2goTXlBY3Rpb25DcmVhdG9ycy5kb1NvbWV0aGluZygpKWAgeW91cnNlbGYganVzdCBmaW5lLlxuICpcbiAqIEZvciBjb252ZW5pZW5jZSwgeW91IGNhbiBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24gYXMgdGhlIGZpcnN0IGFyZ3VtZW50LFxuICogYW5kIGdldCBhIGZ1bmN0aW9uIGluIHJldHVybi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdH0gYWN0aW9uQ3JlYXRvcnMgQW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgYWN0aW9uXG4gKiBjcmVhdG9yIGZ1bmN0aW9ucy4gT25lIGhhbmR5IHdheSB0byBvYnRhaW4gaXQgaXMgdG8gdXNlIEVTNiBgaW1wb3J0ICogYXNgXG4gKiBzeW50YXguIFlvdSBtYXkgYWxzbyBwYXNzIGEgc2luZ2xlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRpc3BhdGNoIFRoZSBgZGlzcGF0Y2hgIGZ1bmN0aW9uIGF2YWlsYWJsZSBvbiB5b3VyIFJlZHV4XG4gKiBzdG9yZS5cbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb258T2JqZWN0fSBUaGUgb2JqZWN0IG1pbWlja2luZyB0aGUgb3JpZ2luYWwgb2JqZWN0LCBidXQgd2l0aFxuICogZXZlcnkgYWN0aW9uIGNyZWF0b3Igd3JhcHBlZCBpbnRvIHRoZSBgZGlzcGF0Y2hgIGNhbGwuIElmIHlvdSBwYXNzZWQgYVxuICogZnVuY3Rpb24gYXMgYGFjdGlvbkNyZWF0b3JzYCwgdGhlIHJldHVybiB2YWx1ZSB3aWxsIGFsc28gYmUgYSBzaW5nbGVcbiAqIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiaW5kQWN0aW9uQ3JlYXRvcnMoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKSB7XG4gIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvcnMgIT09ICdvYmplY3QnIHx8IGFjdGlvbkNyZWF0b3JzID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdiaW5kQWN0aW9uQ3JlYXRvcnMgZXhwZWN0ZWQgYW4gb2JqZWN0IG9yIGEgZnVuY3Rpb24sIGluc3RlYWQgcmVjZWl2ZWQgJyArIChhY3Rpb25DcmVhdG9ycyA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBhY3Rpb25DcmVhdG9ycykgKyAnLiAnICsgJ0RpZCB5b3Ugd3JpdGUgXCJpbXBvcnQgQWN0aW9uQ3JlYXRvcnMgZnJvbVwiIGluc3RlYWQgb2YgXCJpbXBvcnQgKiBhcyBBY3Rpb25DcmVhdG9ycyBmcm9tXCI/Jyk7XG4gIH1cblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFjdGlvbkNyZWF0b3JzKTtcbiAgdmFyIGJvdW5kQWN0aW9uQ3JlYXRvcnMgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgdmFyIGFjdGlvbkNyZWF0b3IgPSBhY3Rpb25DcmVhdG9yc1trZXldO1xuICAgIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYm91bmRBY3Rpb25DcmVhdG9yc1trZXldID0gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYm91bmRBY3Rpb25DcmVhdG9ycztcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWR1eC9saWIvYmluZEFjdGlvbkNyZWF0b3JzLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gYXBwbHlNaWRkbGV3YXJlO1xuXG52YXIgX2NvbXBvc2UgPSByZXF1aXJlKCcuL2NvbXBvc2UnKTtcblxudmFyIF9jb21wb3NlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbXBvc2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0b3JlIGVuaGFuY2VyIHRoYXQgYXBwbGllcyBtaWRkbGV3YXJlIHRvIHRoZSBkaXNwYXRjaCBtZXRob2RcbiAqIG9mIHRoZSBSZWR1eCBzdG9yZS4gVGhpcyBpcyBoYW5keSBmb3IgYSB2YXJpZXR5IG9mIHRhc2tzLCBzdWNoIGFzIGV4cHJlc3NpbmdcbiAqIGFzeW5jaHJvbm91cyBhY3Rpb25zIGluIGEgY29uY2lzZSBtYW5uZXIsIG9yIGxvZ2dpbmcgZXZlcnkgYWN0aW9uIHBheWxvYWQuXG4gKlxuICogU2VlIGByZWR1eC10aHVua2AgcGFja2FnZSBhcyBhbiBleGFtcGxlIG9mIHRoZSBSZWR1eCBtaWRkbGV3YXJlLlxuICpcbiAqIEJlY2F1c2UgbWlkZGxld2FyZSBpcyBwb3RlbnRpYWxseSBhc3luY2hyb25vdXMsIHRoaXMgc2hvdWxkIGJlIHRoZSBmaXJzdFxuICogc3RvcmUgZW5oYW5jZXIgaW4gdGhlIGNvbXBvc2l0aW9uIGNoYWluLlxuICpcbiAqIE5vdGUgdGhhdCBlYWNoIG1pZGRsZXdhcmUgd2lsbCBiZSBnaXZlbiB0aGUgYGRpc3BhdGNoYCBhbmQgYGdldFN0YXRlYCBmdW5jdGlvbnNcbiAqIGFzIG5hbWVkIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBtaWRkbGV3YXJlcyBUaGUgbWlkZGxld2FyZSBjaGFpbiB0byBiZSBhcHBsaWVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHN0b3JlIGVuaGFuY2VyIGFwcGx5aW5nIHRoZSBtaWRkbGV3YXJlLlxuICovXG5mdW5jdGlvbiBhcHBseU1pZGRsZXdhcmUoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBtaWRkbGV3YXJlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIG1pZGRsZXdhcmVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChjcmVhdGVTdG9yZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gICAgICB2YXIgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpO1xuICAgICAgdmFyIF9kaXNwYXRjaCA9IHN0b3JlLmRpc3BhdGNoO1xuICAgICAgdmFyIGNoYWluID0gW107XG5cbiAgICAgIHZhciBtaWRkbGV3YXJlQVBJID0ge1xuICAgICAgICBnZXRTdGF0ZTogc3RvcmUuZ2V0U3RhdGUsXG4gICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICAgICAgICByZXR1cm4gX2Rpc3BhdGNoKGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjaGFpbiA9IG1pZGRsZXdhcmVzLm1hcChmdW5jdGlvbiAobWlkZGxld2FyZSkge1xuICAgICAgICByZXR1cm4gbWlkZGxld2FyZShtaWRkbGV3YXJlQVBJKTtcbiAgICAgIH0pO1xuICAgICAgX2Rpc3BhdGNoID0gX2NvbXBvc2UyWydkZWZhdWx0J10uYXBwbHkodW5kZWZpbmVkLCBjaGFpbikoc3RvcmUuZGlzcGF0Y2gpO1xuXG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0b3JlLCB7XG4gICAgICAgIGRpc3BhdGNoOiBfZGlzcGF0Y2hcbiAgICAgIH0pO1xuICAgIH07XG4gIH07XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVkdXgvbGliL2FwcGx5TWlkZGxld2FyZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gY29tcG9zZTtcbi8qKlxuICogQ29tcG9zZXMgc2luZ2xlLWFyZ3VtZW50IGZ1bmN0aW9ucyBmcm9tIHJpZ2h0IHRvIGxlZnQuIFRoZSByaWdodG1vc3RcbiAqIGZ1bmN0aW9uIGNhbiB0YWtlIG11bHRpcGxlIGFyZ3VtZW50cyBhcyBpdCBwcm92aWRlcyB0aGUgc2lnbmF0dXJlIGZvclxuICogdGhlIHJlc3VsdGluZyBjb21wb3NpdGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3MgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIG9idGFpbmVkIGJ5IGNvbXBvc2luZyB0aGUgYXJndW1lbnQgZnVuY3Rpb25zXG4gKiBmcm9tIHJpZ2h0IHRvIGxlZnQuIEZvciBleGFtcGxlLCBjb21wb3NlKGYsIGcsIGgpIGlzIGlkZW50aWNhbCB0byBkb2luZ1xuICogKC4uLmFyZ3MpID0+IGYoZyhoKC4uLmFyZ3MpKSkuXG4gKi9cblxuZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgZnVuY3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIHJldHVybiBhcmc7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZnVuY3NbMF07XG4gIH1cblxuICB2YXIgbGFzdCA9IGZ1bmNzW2Z1bmNzLmxlbmd0aCAtIDFdO1xuICB2YXIgcmVzdCA9IGZ1bmNzLnNsaWNlKDAsIC0xKTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcmVzdC5yZWR1Y2VSaWdodChmdW5jdGlvbiAoY29tcG9zZWQsIGYpIHtcbiAgICAgIHJldHVybiBmKGNvbXBvc2VkKTtcbiAgICB9LCBsYXN0LmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gIH07XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVkdXgvbGliL2NvbXBvc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE4X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIlJlYWN0UmVkdXhcIlxuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IHNldHRpbmdzLCB0ZXN0cyB9IGZyb20gJy4vc2V0dGluZ3MnXG5pbXBvcnQgeyB2aWV3RmlsdGVyIH0gZnJvbSAnLi92aWV3LWZpbHRlcidcbmltcG9ydCB7IGxvZ0xldmVsIH0gZnJvbSAnLi9sb2ctbGV2ZWwnXG5cbmNvbnN0IHRlc3RiZWRBcHAgPSBjb21iaW5lUmVkdWNlcnMoe1xuICBzZXR0aW5ncyxcbiAgdGVzdHMsXG4gIHZpZXdGaWx0ZXIsXG4gIGxvZ0xldmVsXG59KVxuXG5leHBvcnQgZGVmYXVsdCB0ZXN0YmVkQXBwXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3JlZHVjZXJzL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHsgU0VUVElOR1NfVVBEQVRFIH0gZnJvbSAnLi4vYWN0aW9ucydcblxuZXhwb3J0IGNvbnN0IHNldHRpbmdzID0gKHN0YXRlID0ge30sIGFjdGlvbikgPT4ge1xuICBzd2l0Y2goYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFNFVFRJTkdTX1VQREFURToge1xuICAgICAgbGV0IHNldHRpbmdzVXBkYXRlID0gc3RhdGVcbiAgICAgIHNldHRpbmdzVXBkYXRlW2FjdGlvbi5rZXldID0gYWN0aW9uLnZhbHVlXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zZXR0aW5nc1VwZGF0ZVxuICAgICAgfVxuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRlc3RzID0gKHN0YXRlID0ge30sIGFjdGlvbikgPT4ge1xuICBzd2l0Y2goYWN0aW9uLnR5cGUpIHtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvcmVkdWNlcnMvc2V0dGluZ3MuanNcbiAqKi8iLCJleHBvcnQgY29uc3QgU0VUVElOR1NfVVBEQVRFID0gJ1NFVFRJTkdTX1VQREFURSdcbmV4cG9ydCBjb25zdCBWSUVXX0NIQU5HRSA9ICdWSUVXX0NIQU5HRSdcbmV4cG9ydCBjb25zdCBMT0dfTEVWRUxfQ0hBTkdFID0gJ0xPR19MRVZFTF9DSEFOR0UnXG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VTZXR0aW5nID0gKGtleSwgdmFsdWUpID0+ICh7XG4gIHR5cGU6IFNFVFRJTkdTX1VQREFURSxcbiAga2V5OiBrZXksXG4gIHZhbHVlOiB2YWx1ZVxufSlcblxuZXhwb3J0IGNvbnN0IGNoYW5nZVZpZXcgPSAobmFtZSkgPT4gKHtcbiAgdHlwZTogVklFV19DSEFOR0UsXG4gIGZpbHRlcjogbmFtZVxufSlcblxuZXhwb3J0IGNvbnN0IGNoYW5nZUxvZ0xldmVsID0gKGxldmVsKSA9PiAoe1xuICB0eXBlOiBMT0dfTEVWRUxfQ0hBTkdFLFxuICBsZXZlbDogbGV2ZWxcbn0pXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2FjdGlvbnMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgeyBWSUVXX0NIQU5HRSB9IGZyb20gJy4uL2FjdGlvbnMnXG5cbmV4cG9ydCBjb25zdCB2aWV3RmlsdGVyID0gKHN0YXRlID0gJ0hvbWUnLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBWSUVXX0NIQU5HRTpcbiAgICAgIHJldHVybiBhY3Rpb24uZmlsdGVyXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3JlZHVjZXJzL3ZpZXctZmlsdGVyLmpzXG4gKiovIiwiaW1wb3J0IHsgTE9HX0xFVkVMX0NIQU5HRSB9IGZyb20gJy4uL2FjdGlvbnMnXG5cbmV4cG9ydCBjb25zdCBsb2dMZXZlbCA9IChzdGF0ZSA9ICdkZWJ1ZycsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBMT0dfTEVWRUxfQ0hBTkdFOlxuICAgICAgcmV0dXJuIGFjdGlvbi5sZXZlbFxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvcmVkdWNlcnMvbG9nLWxldmVsLmpzXG4gKiovIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgZ2V0Q3VycmVudFBhZ2UgfSBmcm9tICcuLi9zZWxlY3RvcnMnXG5pbXBvcnQgQXBwIGZyb20gJy4uL2NvbXBvbmVudHMvQXBwJ1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBwYWdlOiBnZXRDdXJyZW50UGFnZShzdGF0ZSksXG4gICAgc3RhdGU6IHN0YXRlXG4gIH1cbn1cblxuY29uc3QgQXBwQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzXG4pKEFwcClcblxuZXhwb3J0IGRlZmF1bHQgQXBwQ29udGFpbmVyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb250YWluZXJzL0FwcENvbnRhaW5lci5qc1xuICoqLyIsImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnXG5cbi8vIEJlY2F1c2Ugd2UgY2Fubm90IGR5bmFtaWNhbGx5IGltcG9ydCBtb2R1bGVzIGZyb20gc3RyaW5ncywgd2UgbmVlZCB0byxcbi8vIHVuZm9ydHVuYXRlbHksIGltcG9ydCB0aGVtIHNwZWNpZmljYWxseSBoZXJlIGFuZCBkZWZpbmUgdGhlaXIgYXNzb2NpYXRlZFxuLy8gZmlsdGVyIGNsYXVzZS5cblxuaW1wb3J0IFRlc3RMaXN0Q29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvVGVzdExpc3RDb250YWluZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBTZXR0aW5nc0Zvcm1Db250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy9TZXR0aW5nc0Zvcm1Db250YWluZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuaW1wb3J0ICogYXMgdGVzdHMgZnJvbSAnLi4vY29tcG9uZW50cy90ZXN0J1xuaW1wb3J0IFRlc3RDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy90ZXN0L1Rlc3RDb250YWluZXInXG5pbXBvcnQgUHVibGlzaGVyU2V0dGluZ3NPdmVycmlkZUNvbnRhaW5lciBmcm9tICcuLi9jb250YWluZXJzL3Rlc3QvUHVibGlzaGVyU2V0dGluZ3NPdmVycmlkZUNvbnRhaW5lcicgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFN1YnNjcmliZXJTZXR0aW5nc092ZXJyaWRlQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvdGVzdC9TdWJzY3JpYmVyU2V0dGluZ3NPdmVycmlkZUNvbnRhaW5lcicgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jb25zdCBnZXRWaWV3RmlsdGVyID0gKHN0YXRlKSA9PiBzdGF0ZS52aWV3RmlsdGVyXG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50UGFnZSA9IGNyZWF0ZVNlbGVjdG9yKFxuICBbZ2V0Vmlld0ZpbHRlcl0sXG4gICh2aWV3RmlsdGVyKSA9PiB7XG4gICAgc3dpdGNoKHZpZXdGaWx0ZXIudG9Mb3dlckNhc2UoKSkge1xuICAgICAgY2FzZSAncHVibGlzaCc6XG4gICAgICAgIHJldHVybiBUZXN0Q29udGFpbmVyKHRlc3RzLlB1Ymxpc2hlclRlc3QpXG4gICAgICBjYXNlICdwdWJsaXNoIC0gMTA4MHAnOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5QdWJsaXNoZXIxMDgwcFRlc3QpXG4gICAgICBjYXNlICdwdWJsaXNoIC0gZmFpbG92ZXInOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5QdWJsaXNoZXJGYWlsb3ZlclRlc3QpXG4gICAgICBjYXNlICdwdWJsaXNoIC0gYXVkaW8gbW9kZSc6XG4gICAgICAgIHJldHVybiBUZXN0Q29udGFpbmVyKHRlc3RzLlB1Ymxpc2hlckF1ZGlvT25seVRlc3QpXG4gICAgICBjYXNlICdwdWJsaXNoIC0gY2FtZXJhIHNvdXJjZSc6XG4gICAgICAgIHJldHVybiBUZXN0Q29udGFpbmVyKHRlc3RzLlB1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3QpXG4gICAgICBjYXNlICdwdWJsaXNoIC0gY2FtZXJhIHN3YXAnOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5QdWJsaXNoZXJDYW1lcmFTd2FwVGVzdClcbiAgICAgIGNhc2UgJ3B1Ymxpc2ggLSBmaWx0ZXJzJzpcbiAgICAgICAgcmV0dXJuIFRlc3RDb250YWluZXIodGVzdHMuUHVibGlzaGVyRmlsdGVyc1Rlc3QpXG4gICAgICBjYXNlICdwdWJsaXNoIC0gaW1hZ2UgY2FwdHVyZSc6XG4gICAgICAgIHJldHVybiBUZXN0Q29udGFpbmVyKHRlc3RzLlB1Ymxpc2hlckltYWdlQ2FwdHVyZVRlc3QpXG4gICAgICBjYXNlICdwdWJsaXNoIC0gc3RyZWFtIG1hbmFnZXInOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5QdWJsaXNoZXJTdHJlYW1NYW5hZ2VyVGVzdClcbiAgICAgIGNhc2UgJ3N1YnNjcmliZSc6XG4gICAgICAgIHJldHVybiBUZXN0Q29udGFpbmVyKHRlc3RzLlN1YnNjcmliZXJUZXN0KVxuICAgICAgY2FzZSAnc3Vic2NyaWJlIC0gZmFpbG92ZXInOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5TdWJzY3JpYmVyRmFpbG92ZXJUZXN0KVxuICAgICAgY2FzZSAnc3Vic2NyaWJlIC0gYXVkaW8gb25seSc6XG4gICAgICAgIHJldHVybiBUZXN0Q29udGFpbmVyKHRlc3RzLlN1YnNjcmliZXJBdWRpb09ubHlUZXN0KVxuICAgICAgY2FzZSAnc3Vic2NyaWJlIC0gaW1hZ2UgY2FwdHVyZSc6XG4gICAgICAgIHJldHVybiBUZXN0Q29udGFpbmVyKHRlc3RzLlN1YnNjcmliZXJJbWFnZUNhcHR1cmVUZXN0KVxuICAgICAgY2FzZSAnc3Vic2NyaWJlIC0gY2x1c3Rlcic6XG4gICAgICAgIHJldHVybiBUZXN0Q29udGFpbmVyKHRlc3RzLlN1YnNjcmliZXJDbHVzdGVyVGVzdClcbiAgICAgIGNhc2UgJ3N1YnNjcmliZSAtIHN0cmVhbSBtYW5hZ2VyJzpcbiAgICAgICAgcmV0dXJuIFRlc3RDb250YWluZXIodGVzdHMuU3Vic2NyaWJlclN0cmVhbU1hbmFnZXJUZXN0KVxuICAgICAgY2FzZSAnc2V0dGluZ3MnOlxuICAgICAgY2FzZSAnaG9tZSc6XG4gICAgICAgIHJldHVybiA8U2V0dGluZ3NGb3JtQ29udGFpbmVyIC8+XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gPFRlc3RMaXN0Q29udGFpbmVyIC8+XG4gICAgfVxuICB9XG4pXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3NlbGVjdG9ycy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdE1lbW9pemUgPSBkZWZhdWx0TWVtb2l6ZTtcbmV4cG9ydHMuY3JlYXRlU2VsZWN0b3JDcmVhdG9yID0gY3JlYXRlU2VsZWN0b3JDcmVhdG9yO1xuZXhwb3J0cy5jcmVhdGVTdHJ1Y3R1cmVkU2VsZWN0b3IgPSBjcmVhdGVTdHJ1Y3R1cmVkU2VsZWN0b3I7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG5mdW5jdGlvbiBkZWZhdWx0RXF1YWxpdHlDaGVjayhhLCBiKSB7XG4gIHJldHVybiBhID09PSBiO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0TWVtb2l6ZShmdW5jKSB7XG4gIHZhciBlcXVhbGl0eUNoZWNrID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdEVxdWFsaXR5Q2hlY2sgOiBhcmd1bWVudHNbMV07XG5cbiAgdmFyIGxhc3RBcmdzID0gbnVsbDtcbiAgdmFyIGxhc3RSZXN1bHQgPSBudWxsO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGlmIChsYXN0QXJncyA9PT0gbnVsbCB8fCBsYXN0QXJncy5sZW5ndGggIT09IGFyZ3MubGVuZ3RoIHx8ICFhcmdzLmV2ZXJ5KGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBlcXVhbGl0eUNoZWNrKHZhbHVlLCBsYXN0QXJnc1tpbmRleF0pO1xuICAgIH0pKSB7XG4gICAgICBsYXN0UmVzdWx0ID0gZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGFyZ3M7XG4gICAgcmV0dXJuIGxhc3RSZXN1bHQ7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldERlcGVuZGVuY2llcyhmdW5jcykge1xuICB2YXIgZGVwZW5kZW5jaWVzID0gQXJyYXkuaXNBcnJheShmdW5jc1swXSkgPyBmdW5jc1swXSA6IGZ1bmNzO1xuXG4gIGlmICghZGVwZW5kZW5jaWVzLmV2ZXJ5KGZ1bmN0aW9uIChkZXApIHtcbiAgICByZXR1cm4gdHlwZW9mIGRlcCA9PT0gJ2Z1bmN0aW9uJztcbiAgfSkpIHtcbiAgICB2YXIgZGVwZW5kZW5jeVR5cGVzID0gZGVwZW5kZW5jaWVzLm1hcChmdW5jdGlvbiAoZGVwKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGRlcDtcbiAgICB9KS5qb2luKCcsICcpO1xuICAgIHRocm93IG5ldyBFcnJvcignU2VsZWN0b3IgY3JlYXRvcnMgZXhwZWN0IGFsbCBpbnB1dC1zZWxlY3RvcnMgdG8gYmUgZnVuY3Rpb25zLCAnICsgKCdpbnN0ZWFkIHJlY2VpdmVkIHRoZSBmb2xsb3dpbmcgdHlwZXM6IFsnICsgZGVwZW5kZW5jeVR5cGVzICsgJ10nKSk7XG4gIH1cblxuICByZXR1cm4gZGVwZW5kZW5jaWVzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTZWxlY3RvckNyZWF0b3IobWVtb2l6ZSkge1xuICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIG1lbW9pemVPcHRpb25zID0gQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgIG1lbW9pemVPcHRpb25zW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgIGZ1bmNzW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgfVxuXG4gICAgdmFyIHJlY29tcHV0YXRpb25zID0gMDtcbiAgICB2YXIgcmVzdWx0RnVuYyA9IGZ1bmNzLnBvcCgpO1xuICAgIHZhciBkZXBlbmRlbmNpZXMgPSBnZXREZXBlbmRlbmNpZXMoZnVuY3MpO1xuXG4gICAgdmFyIG1lbW9pemVkUmVzdWx0RnVuYyA9IG1lbW9pemUuYXBwbHkodW5kZWZpbmVkLCBbZnVuY3Rpb24gKCkge1xuICAgICAgcmVjb21wdXRhdGlvbnMrKztcbiAgICAgIHJldHVybiByZXN1bHRGdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICB9XS5jb25jYXQobWVtb2l6ZU9wdGlvbnMpKTtcblxuICAgIHZhciBzZWxlY3RvciA9IGZ1bmN0aW9uIHNlbGVjdG9yKHN0YXRlLCBwcm9wcykge1xuICAgICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjQgPiAyID8gX2xlbjQgLSAyIDogMCksIF9rZXk0ID0gMjsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICBhcmdzW19rZXk0IC0gMl0gPSBhcmd1bWVudHNbX2tleTRdO1xuICAgICAgfVxuXG4gICAgICB2YXIgcGFyYW1zID0gZGVwZW5kZW5jaWVzLm1hcChmdW5jdGlvbiAoZGVwZW5kZW5jeSkge1xuICAgICAgICByZXR1cm4gZGVwZW5kZW5jeS5hcHBseSh1bmRlZmluZWQsIFtzdGF0ZSwgcHJvcHNdLmNvbmNhdChhcmdzKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtZW1vaXplZFJlc3VsdEZ1bmMuYXBwbHkodW5kZWZpbmVkLCBfdG9Db25zdW1hYmxlQXJyYXkocGFyYW1zKSk7XG4gICAgfTtcblxuICAgIHNlbGVjdG9yLnJlc3VsdEZ1bmMgPSByZXN1bHRGdW5jO1xuICAgIHNlbGVjdG9yLnJlY29tcHV0YXRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJlY29tcHV0YXRpb25zO1xuICAgIH07XG4gICAgc2VsZWN0b3IucmVzZXRSZWNvbXB1dGF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZWNvbXB1dGF0aW9ucyA9IDA7XG4gICAgfTtcbiAgICByZXR1cm4gc2VsZWN0b3I7XG4gIH07XG59XG5cbnZhciBjcmVhdGVTZWxlY3RvciA9IGV4cG9ydHMuY3JlYXRlU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvckNyZWF0b3IoZGVmYXVsdE1lbW9pemUpO1xuXG5mdW5jdGlvbiBjcmVhdGVTdHJ1Y3R1cmVkU2VsZWN0b3Ioc2VsZWN0b3JzKSB7XG4gIHZhciBzZWxlY3RvckNyZWF0b3IgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBjcmVhdGVTZWxlY3RvciA6IGFyZ3VtZW50c1sxXTtcblxuICBpZiAodHlwZW9mIHNlbGVjdG9ycyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyZWF0ZVN0cnVjdHVyZWRTZWxlY3RvciBleHBlY3RzIGZpcnN0IGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCAnICsgKCd3aGVyZSBlYWNoIHByb3BlcnR5IGlzIGEgc2VsZWN0b3IsIGluc3RlYWQgcmVjZWl2ZWQgYSAnICsgdHlwZW9mIHNlbGVjdG9ycykpO1xuICB9XG4gIHZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMoc2VsZWN0b3JzKTtcbiAgcmV0dXJuIHNlbGVjdG9yQ3JlYXRvcihvYmplY3RLZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yc1trZXldO1xuICB9KSwgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgdmFsdWVzID0gQXJyYXkoX2xlbjUpLCBfa2V5NSA9IDA7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgIHZhbHVlc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXMucmVkdWNlKGZ1bmN0aW9uIChjb21wb3NpdGlvbiwgdmFsdWUsIGluZGV4KSB7XG4gICAgICBjb21wb3NpdGlvbltvYmplY3RLZXlzW2luZGV4XV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiBjb21wb3NpdGlvbjtcbiAgICB9LCB7fSk7XG4gIH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Jlc2VsZWN0L2xpYi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBjaGFuZ2VWaWV3IH0gZnJvbSAnLi4vYWN0aW9ucydcbmltcG9ydCBUZXN0TGlzdCBmcm9tICcuLi9jb21wb25lbnRzL1Rlc3RMaXN0J1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0ZXN0czogc3RhdGUudGVzdHNcbiAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvblRlc3RMaXN0SXRlbUNsaWNrOiAobmFtZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goY2hhbmdlVmlldyhuYW1lKSlcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgVGVzdExpc3RDb250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wc1xuKShUZXN0TGlzdClcblxuZXhwb3J0IGRlZmF1bHQgVGVzdExpc3RDb250YWluZXJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbnRhaW5lcnMvVGVzdExpc3RDb250YWluZXIuanNcbiAqKi8iLCJpbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBUZXN0TGlzdEl0ZW0gZnJvbSAnLi9UZXN0TGlzdEl0ZW0nIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY29uc3QgVGVzdExpc3QgPSAoeyB0ZXN0cywgb25UZXN0TGlzdEl0ZW1DbGljayB9KSA9PiAoXG4gIDx1bCBpZD1cInRlc3QtbGlzdFwiPlxuICAgIHt0ZXN0cy5tYXAodGVzdCA9PlxuICAgICAgPFRlc3RMaXN0SXRlbVxuICAgICAgICBrZXk9e3Rlc3QubmFtZX1cbiAgICAgICAgey4uLnRlc3R9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uVGVzdExpc3RJdGVtQ2xpY2sodGVzdC5uYW1lKX1cbiAgICAgIC8+XG4gICAgKX1cbiAgPC91bD5cbilcblxuVGVzdExpc3QucHJvcFR5cGVzID0ge1xuICB0ZXN0czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbW9kdWxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5zdHJpbmdcbiAgfSkuaXNSZXF1aXJlZCkuaXNSZXF1aXJlZCxcbiAgb25UZXN0TGlzdEl0ZW1DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufVxuXG5leHBvcnQgZGVmYXVsdCBUZXN0TGlzdFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy9UZXN0TGlzdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yOV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJSZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBUZXN0TGlzdEl0ZW0gPSAoeyBvbkNsaWNrLCBuYW1lIH0pID0+IChcbiAgPGxpIG9uQ2xpY2s9e29uQ2xpY2t9PntuYW1lfTwvbGk+XG4pXG5cblRlc3RMaXN0SXRlbS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxufVxuXG5leHBvcnQgZGVmYXVsdCBUZXN0TGlzdEl0ZW1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvVGVzdExpc3RJdGVtLmpzXG4gKiovIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgY2hhbmdlVmlldywgY2hhbmdlU2V0dGluZywgY2hhbmdlTG9nTGV2ZWwgfSBmcm9tICcuLi9hY3Rpb25zJ1xuaW1wb3J0IFNldHRpbmdzRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL1NldHRpbmdzRm9ybSdcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgc2V0dGluZ3M6IHN0YXRlLnNldHRpbmdzLFxuICAgIGxvZ0xldmVsOiBzdGF0ZS5sb2dMZXZlbFxuICB9XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQmFja0NsaWNrOiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChjaGFuZ2VWaWV3KCdsaXN0JykpXG4gICAgfSxcbiAgICBvbkZpZWxkQ2hhbmdlOiAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goY2hhbmdlU2V0dGluZyhrZXksIHZhbHVlKSlcbiAgICB9LFxuICAgIG9uTG9nTGV2ZWxDaGFuZ2U6IChsZXZlbCkgPT4ge1xuICAgICAgZGlzcGF0Y2goY2hhbmdlTG9nTGV2ZWwobGV2ZWwpKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBTZXR0aW5nc0Zvcm1Db250YWluZXIgPSBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wc1xuKShTZXR0aW5nc0Zvcm0pXG5cbmV4cG9ydCBkZWZhdWx0IFNldHRpbmdzRm9ybUNvbnRhaW5lclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29udGFpbmVycy9TZXR0aW5nc0Zvcm1Db250YWluZXIuanNcbiAqKi8iLCIvKiBnbG9iYWwgcmVkNXByb3NkayAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgcmVkNXByb3NkayBmcm9tICdyZWQ1cHJvLXNkaydcbmltcG9ydCBCYWNrTGluayBmcm9tICcuL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIFNldHRpbmdzRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5wcm9wcy5zZXR0aW5nc1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNldHRpbmdzKSB7XG4gICAgICBjb25zdCBfcmVmID0gdGhpc1snXycgKyBrZXldXG4gICAgICBpZiAoX3JlZiAmJiBzZXR0aW5nc1trZXldICE9PSBfcmVmLnZhbHVlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25GaWVsZENoYW5nZShrZXksIF9yZWYudmFsdWUpXG4gICAgIH1cbiAgICB9XG4gIH1cblxuICBzd2FwU3RyZWFtTmFtZXMgKCkge1xuICAgIGNvbnN0IHZhbHVlMSA9IHRoaXMuX3N0cmVhbTEudmFsdWVcbiAgICBjb25zdCB2YWx1ZTIgPSB0aGlzLl9zdHJlYW0yLnZhbHVlXG4gICAgdGhpcy5fc3RyZWFtMS52YWx1ZSA9IHZhbHVlMlxuICAgIHRoaXMuX3N0cmVhbTIudmFsdWUgPSB2YWx1ZTFcbiAgfVxuXG4gIGNoYW5nZUxvZ0xldmVsICgpIHtcbiAgICBjb25zdCBjaGVjayA9IHRoaXMuX3ZlcmJvc2VMb2dnaW5nXG4gICAgY29uc3QgaXNWZXJib3NlID0gY2hlY2suY2hlY2tlZFxuICAgIHRoaXMucHJvcHMub25Mb2dMZXZlbENoYW5nZShpc1ZlcmJvc2UgPyAnZGVidWcnIDogJ3dhcm4nKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBjaGVja1N0eWxlID0ge1xuICAgICAgJ3ZlcnRpY2FsLWFsaWduJzogJ21pZGRsZSdcbiAgICB9XG4gICAgY29uc3QgaXNMb2dWZXJib3NlID0gdGhpcy5wcm9wcy5sb2dMZXZlbCA9PT0gJ2RlYnVnJ1xuICAgIHJlZDVwcm9zZGsuc2V0TG9nTGV2ZWwodGhpcy5wcm9wcy5sb2dMZXZlbClcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlNldHRpbmdzPC9oMT5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwic2V0dGluZ3MtZmllbGRcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic2V0dGluZ3MtbGFiZWxcIiBmb3I9XCJob3N0LWZpZWxkXCI+SG9zdDo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCByZWY9eyhjKSA9PiB0aGlzLl9ob3N0ID0gY30gbmFtZT1cImhvc3QtZmllbGRcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuc2V0dGluZ3MuaG9zdH0+PC9pbnB1dD5cbiAgICAgICAgPC9wPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJzZXR0aW5ncy1maWVsZFwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJzZXR0aW5ncy1sYWJlbFwiIGZvcj1cInN0cmVhbTEtZmllbGRcIj5TdHJlYW0xIE5hbWU6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgcmVmPXsoYykgPT4gdGhpcy5fc3RyZWFtMSA9IGN9IG5hbWU9XCJzdHJlYW0xLWZpZWxkXCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PjwvaW5wdXQ+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwic2V0dGluZ3MtZmllbGQgc3dhcC1zdHJlYW1zLWxpbmtcIj5cbiAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLnN3YXBTdHJlYW1OYW1lcy5iaW5kKHRoaXMpfT5Td2FwIFN0cmVhbSBOYW1lczwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJzZXR0aW5ncy1maWVsZFwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJzZXR0aW5ncy1sYWJlbFwiIGZvcj1cInN0cmVhbTItZmllbGRcIj5TdHJlYW0yIE5hbWU6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgcmVmPXsoYykgPT4gdGhpcy5fc3RyZWFtMiA9IGN9IG5hbWU9XCJzdHJlYW0yLWZpZWxkXCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTJ9PjwvaW5wdXQ+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPGhyLz5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwic2V0dGluZ3MtZmllbGRcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic2V0dGluZ3MtbGFiZWxcIiBmb3I9XCJsb2dnaW5nLWZpZWxkXCI+VmVyYm9zZSBSNSBMb2dnaW5nOjwvbGFiZWw+XG4gICAgICAgICAge2lzTG9nVmVyYm9zZVxuICAgICAgICAgICAgPyAoXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgcmVmPXsoYykgPT4gdGhpcy5fdmVyYm9zZUxvZ2dpbmcgPSBjfVxuICAgICAgICAgICAgICBuYW1lPVwibG9nZ2luZy1maWVsZFwiXG4gICAgICAgICAgICAgIHZhbHVlPVwib25cIiBzdHlsZT17Y2hlY2tTdHlsZX1cbiAgICAgICAgICAgICAgY2hlY2tlZFxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNoYW5nZUxvZ0xldmVsLmJpbmQodGhpcyl9PjwvaW5wdXQ+XG4gICAgICAgICAgICApXG4gICAgICAgICAgICA6IChcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICByZWY9eyhjKSA9PiB0aGlzLl92ZXJib3NlTG9nZ2luZyA9IGN9XG4gICAgICAgICAgICAgIG5hbWU9XCJsb2dnaW5nLWZpZWxkXCJcbiAgICAgICAgICAgICAgdmFsdWU9XCJvZmZcIiBzdHlsZT17Y2hlY2tTdHlsZX1cbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jaGFuZ2VMb2dMZXZlbC5iaW5kKHRoaXMpfT48L2lucHV0PlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuU2V0dGluZ3NGb3JtLnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgbG9nTGV2ZWw6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25GaWVsZENoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uTG9nTGV2ZWxDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3NGb3JtXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL1NldHRpbmdzRm9ybS5qc1xuICoqLyIsImltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBCYWNrTGluayA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8ZGl2IGlkPVwiYmFjay1saW5rLWNvbnRhaW5lclwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIDxhIGlkPVwiYmFjay1saW5rXCI+UmV0dXJuIHRvIE1lbnU8L2E+XG4gIDwvZGl2PlxuKVxuXG5CYWNrTGluay5wcm9wVHlwZXMgPSB7XG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFja0xpbmtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy9CYWNrTGluay5qc1xuICoqLyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgUHVibGlzaGVyVGVzdCB9IGZyb20gJy4vcHVibGlzaC9QdWJsaXNoZXJUZXN0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQdWJsaXNoZXIxMDgwcFRlc3QgfSBmcm9tICcuL3B1Ymxpc2gvUHVibGlzaGVyMTA4MHBUZXN0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQdWJsaXNoZXJBdWRpb09ubHlUZXN0IH0gZnJvbSAnLi9wdWJsaXNoL1B1Ymxpc2hlckF1ZGlvT25seVRlc3QnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFB1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3QgfSBmcm9tICcuL3B1Ymxpc2gvUHVibGlzaGVyQ2FtZXJhU291cmNlVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUHVibGlzaGVyQ2FtZXJhU3dhcFRlc3QgfSBmcm9tICcuL3B1Ymxpc2gvUHVibGlzaGVyQ2FtZXJhU3dhcFRlc3QnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFB1Ymxpc2hlckZpbHRlcnNUZXN0IH0gZnJvbSAnLi9wdWJsaXNoL1B1Ymxpc2hlckZpbHRlcnNUZXN0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQdWJsaXNoZXJGYWlsb3ZlclRlc3QgfSBmcm9tICcuL3B1Ymxpc2gvUHVibGlzaGVyRmFpbG92ZXJUZXN0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQdWJsaXNoZXJJbWFnZUNhcHR1cmVUZXN0IH0gZnJvbSAnLi9wdWJsaXNoL1B1Ymxpc2hlckltYWdlQ2FwdHVyZVRlc3QnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFB1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0IH0gZnJvbSAnLi9wdWJsaXNoL1B1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTdWJzY3JpYmVyVGVzdCB9IGZyb20gJy4vc3Vic2NyaWJlL1N1YnNjcmliZXJUZXN0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTdWJzY3JpYmVyRmFpbG92ZXJUZXN0IH0gZnJvbSAnLi9zdWJzY3JpYmUvU3Vic2NyaWJlckZhaWxvdmVyVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3Vic2NyaWJlckF1ZGlvT25seVRlc3QgfSBmcm9tICcuL3N1YnNjcmliZS9TdWJzY3JpYmVyQXVkaW9Pbmx5VGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3Vic2NyaWJlckltYWdlQ2FwdHVyZVRlc3QgfSBmcm9tICcuL3N1YnNjcmliZS9TdWJzY3JpYmVySW1hZ2VDYXB0dXJlVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3Vic2NyaWJlckNsdXN0ZXJUZXN0IH0gZnJvbSAnLi9zdWJzY3JpYmUvU3Vic2NyaWJlckNsdXN0ZXJUZXN0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTdWJzY3JpYmVyU3RyZWFtTWFuYWdlclRlc3QgfSBmcm9tICcuL3N1YnNjcmliZS9TdWJzY3JpYmVyU3RyZWFtTWFuYWdlclRlc3QnXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9pbmRleC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlZDVQcm9QdWJsaXNoZXIgZnJvbSAnLi4vLi4vUmVkNVByb1B1Ymxpc2hlcicgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFB1Ymxpc2hlclN0YXR1cyBmcm9tICcuLi9QdWJsaXNoZXJTdGF0dXMnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBCYWNrTGluayBmcm9tICcuLi8uLi9CYWNrTGluaycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jbGFzcyBQdWJsaXNoZXJUZXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBfd2F0Y2hTdGF0c0ludGVydmFsXG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHN0YXR1c0V2ZW50OiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICB3YXRjaFN0YXRzIChjb25uZWN0aW9uKSB7XG4gICAgdGhpcy5fd2F0Y2hTdGF0c0ludGVydmFsID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY29ubmVjdGlvbi5nZXRTdGF0cyhudWxsKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgT2JqZWN0LmtleXMocmVzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXNba2V5XSwgbnVsbCwgMikpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0sIDEwMDApXG4gIH1cblxuICB1bndhdGNoU3RhdHMgKCkge1xuICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuX3dhdGNoU3RhdHNJbnRlcnZhbClcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLnVud2F0Y2hTdGF0cygpXG4gIH1cblxuICBoYW5kbGVQdWJsaXNoZXJFdmVudCAoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1c0V2ZW50ID0gZXZlbnRcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gIH1cblxuICBwdWJsaXNoZXJFc3RhYmxpc2hlZCAocHVibGlzaGVyLCBwdWJsaXNoZXJWaWV3KSB7XG4gICAgY29uc29sZS5sb2coYFtQdWJsaXNoZXJUZXN0XSBwdWJsaXNoZXI6ICR7cHVibGlzaGVyfSwgJHtwdWJsaXNoZXJWaWV3fWApXG4gICAgLy8gICAgdGhpcy53YXRjaFN0YXRzKHB1Ymxpc2hlci5nZXRDb25uZWN0aW9uKCkpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+UHVibGlzaGVyIFRlc3Q8L2gxPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+PGVtPnN0cmVhbTwvZW0+OiB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfTwvaDI+XG4gICAgICAgIDxQdWJsaXNoZXJTdGF0dXMgZXZlbnQ9e3RoaXMuc3RhdGUuc3RhdHVzRXZlbnR9IC8+XG4gICAgICAgIDxSZWQ1UHJvUHVibGlzaGVyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIlxuICAgICAgICAgIG1lZGlhQ2xhc3NOYW1lPVwidmlkZW8tZWxlbWVudFwiXG4gICAgICAgICAgY29uZmlndXJhdGlvbj17dGhpcy5wcm9wcy5zZXR0aW5nc31cbiAgICAgICAgICBzdHJlYW1OYW1lPXt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9XG4gICAgICAgICAgc2hvd0NvbnRyb2xzPXt0cnVlfVxuICAgICAgICAgIG9uUHVibGlzaGVyRXN0YWJsaXNoZWQ9e3RoaXMucHVibGlzaGVyRXN0YWJsaXNoZWQuYmluZCh0aGlzKX1cbiAgICAgICAgICBvblB1Ymxpc2hlckV2ZW50PXt0aGlzLmhhbmRsZVB1Ymxpc2hlckV2ZW50LmJpbmQodGhpcyl9XG4gICAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblB1Ymxpc2hlclRlc3QucHJvcFR5cGVzID0ge1xuICBzZXR0aW5nczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbkJhY2tDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoZXJUZXN0XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlclRlc3QuanNcbiAqKi8iLCIvKiBnbG9iYWwgcmVkNXByb3NkayAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuLy8gaW1wb3J0IHJlZDVwcm9zZGsgZnJvbSAncmVkNXByby1zZGsnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2xvZGFzaC9pc0VxdWFsJ1xuXG5jb25zdCBkZWZhdWx0Q29uZmlndXJhdGlvbiA9IHtcbiAgcHJvdG9jb2w6ICd3cycsXG4gIHBvcnQ6IDgwODEsXG4gIGFwcDogJ2xpdmUnLFxuICBzdHJlYW1UeXBlOiAnd2VicnRjJyxcbiAgYXVkaW9PbjogdHJ1ZSxcbiAgdmlkZW9PbjogdHJ1ZVxufVxuXG5jbGFzcyBSZWQ1UHJvUHVibGlzaGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmlldzogdW5kZWZpbmVkLFxuICAgICAgcHVibGlzaGVyOiB1bmRlZmluZWQsXG4gICAgICBpbnN0YW5jZUlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwKS50b1N0cmluZygxNilcbiAgICB9XG4gIH1cblxuICBvblB1Ymxpc2hGYWlsIChtZXNzYWdlKSB7XG4gICAgY29uc29sZS5lcnJvcihgW1JlZDVQcm9QdWJsaXNoZXJdIDo6ICR7bWVzc2FnZX1gKVxuICB9XG5cbiAgb25QdWJsaXNoU3VjY2VzcyAoKSB7XG4gIH1cblxuICBvblVucHVibGlzaEZhaWwgKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmVycm9yKGBbUmVkNVByb1B1Ymxpc2hlcl0gOjogJHttZXNzYWdlfWApXG4gIH1cblxuICBvblVucHVibGlzaFN1Y2Nlc3MgKCkge1xuICB9XG5cbiAgZ2V0VXNlck1lZGlhQ29uZmlndXJhdGlvbiAoKSB7XG4gICAgY29uc3QgZGVmYXVsdE1lZGlhID0ge1xuICAgICAgYXVkaW86ICF0aGlzLnByb3BzLmNvbmZpZ3VyYXRpb24uYXVkaW8gfHwgZGVmYXVsdENvbmZpZ3VyYXRpb24uYXVkaW9PbixcbiAgICAgIHZpZGVvOiAhdGhpcy5wcm9wcy5jb25maWd1cmF0aW9uLnZpZGVvIHx8IGRlZmF1bHRDb25maWd1cmF0aW9uLnZpZGVvT25cbiAgICB9XG4gICAgY29uc3QgZGVmaW5lZE1lZGlhID0gdGhpcy5wcm9wcy51c2VyTWVkaWEgfHwge31cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihkZWZhdWx0TWVkaWEsIGRlZmluZWRNZWRpYSlcbiAgfVxuXG4gIG5vdGlmeVB1Ymxpc2hlckVzdGFibGlzaGVkIChwdWJsaXNoZXIsIHZpZXcpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblB1Ymxpc2hlckVzdGFibGlzaGVkKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUHVibGlzaGVyRXN0YWJsaXNoZWQocHVibGlzaGVyLCB2aWV3KVxuICAgIH1cbiAgfVxuXG4gIHByZXZpZXcgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgY29uc3QgZ1VNID0gdGhpcy5nZXRVc2VyTWVkaWFDb25maWd1cmF0aW9uLmJpbmQodGhpcylcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudElkID0gWydyZWQ1cHJvLXB1Ymxpc2hlci12aWRlbycsIHRoaXMuc3RhdGUuaW5zdGFuY2VJZF0uam9pbignLScpXG4gICAgICBjb25zdCBwdWJsaXNoZXIgPSBuZXcgcmVkNXByb3Nkay5SVENQdWJsaXNoZXIoKVxuICAgICAgY29uc3QgdmlldyA9IG5ldyByZWQ1cHJvc2RrLlB1Ymxpc2hlclZpZXcoZWxlbWVudElkKVxuICAgICAgY29uc3QgZ21kID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlIHx8IG5hdmlnYXRvclxuXG4gICAgICBpZiAodGhpcy5wcm9wcy5vblB1Ymxpc2hlckV2ZW50KSB7XG4gICAgICAgIHB1Ymxpc2hlci5vbignKicsIHRoaXMucHJvcHMub25QdWJsaXNoZXJFdmVudClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBwdWJsaXNoZXIub24oJyonLCBldmVudCA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coYFtSZWQ1UHJvUHVibGlzaGVyXSA6OiBQdWJsaXNoZXJFdmVudCAtICR7ZXZlbnQudHlwZX1gKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZygnW1JlZDVQcm9QdWJsaXNoZXJdIGdVTTo6ICcgKyBKU09OLnN0cmluZ2lmeShnVU0oKSwgbnVsbCwgMikpXG4gICAgICBnbWQuZ2V0VXNlck1lZGlhKGdVTSgpLCBtZWRpYSA9PiB7XG5cbiAgICAgICAgLy8gVXBvbiBhY2Nlc3Mgb2YgdXNlciBtZWRpYSxcbiAgICAgICAgLy8gMS4gQXR0YWNoIHRoZSBzdHJlYW0gdG8gdGhlIHB1Ymxpc2hlci5cbiAgICAgICAgLy8gMi4gU2hvdyB0aGUgc3RyZWFtIGFzIHByZXZpZXcgaW4gdmlldyBpbnN0YW5jZS5cbiAgICAgICAgcHVibGlzaGVyLmF0dGFjaFN0cmVhbShtZWRpYSlcbiAgICAgICAgdmlldy5wcmV2aWV3KG1lZGlhLCB0cnVlKVxuXG4gICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHB1Ymxpc2hlclxuICAgICAgICAgIHN0YXRlLnZpZXcgPSB2aWV3XG4gICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIH0pXG4gICAgICAgIHJlc29sdmUocHVibGlzaGVyLCB2aWV3KVxuXG4gICAgICB9LCBlcnJvciA9PiB7XG5cbiAgICAgICAgY29tcC5vblB1Ymxpc2hGYWlsKGBFcnJvciAtICR7ZXJyb3J9YClcbiAgICAgICAgcmVqZWN0KGVycm9yKVxuXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwdWJsaXNoICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIGNvbnN0IHB1Ymxpc2hlciA9IHRoaXMuc3RhdGUucHVibGlzaGVyXG4gICAgY29uc3QgdmlldyA9IHRoaXMuc3RhdGUudmlld1xuICAgIHZpZXcuYXR0YWNoUHVibGlzaGVyKHB1Ymxpc2hlcik7XG5cbiAgICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q29uZmlndXJhdGlvbiwgdGhpcy5wcm9wcy5jb25maWd1cmF0aW9uKVxuICAgIGNvbmZpZy5wb3J0ID0gY29uZmlnLnJ0Y3BvcnQgfHwgY29uZmlnLnBvcnRcbiAgICBjb25maWcuaG9zdCA9IHRoaXMucHJvcHMuaG9zdCB8fCBjb25maWcuaG9zdFxuICAgIGNvbmZpZy5zdHJlYW1OYW1lID0gdGhpcy5wcm9wcy5zdHJlYW1OYW1lIHx8IGNvbmZpZy5zdHJlYW1OYW1lXG5cbiAgICBjb25zb2xlLmxvZygnW1JlZDVQcm9QdWJsaXNoZXJdIGNvbmZpZzo6ICcgKyBKU09OLnN0cmluZ2lmeShjb25maWcsIG51bGwsIDIpKVxuXG4gICAgLy8gSW5pdGlhbGl6ZVxuICAgIHB1Ymxpc2hlci5pbml0KGNvbmZpZylcbiAgICAgIC50aGVuKChwdWIpID0+IHtcbiAgICAgICAgLy8gSW52b2tlIHRoZSBwdWJsaXNoIGFjdGlvblxuICAgICAgICBjb21wLm5vdGlmeVB1Ymxpc2hlckVzdGFibGlzaGVkKHB1YiwgdmlldylcbiAgICAgICAgcmV0dXJuIHB1Ymxpc2hlci5wdWJsaXNoKClcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbXAub25QdWJsaXNoU3VjY2VzcygpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgLy8gQSBmYXVsdCBvY2N1cnJlZCB3aGlsZSB0cnlpbmcgdG8gaW5pdGlhbGl6ZSBhbmQgcHVibGlzaCB0aGUgc3RyZWFtLlxuICAgICAgICBjb25zdCBqc29uRXJyb3IgPSB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnID8gZXJyb3IgOiBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgMilcbiAgICAgICAgY29tcC5vblB1Ymxpc2hGYWlsKGBFcnJvciAtICR7anNvbkVycm9yfWApXG4gICAgICB9KVxuXG4gIH1cblxuICB1bnB1Ymxpc2ggKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHZpZXcgPSBjb21wLnN0YXRlLnZpZXdcbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IGNvbXAuc3RhdGUucHVibGlzaGVyXG4gICAgICBpZiAocHVibGlzaGVyKSB7XG4gICAgICAgIHB1Ymxpc2hlci51bnB1Ymxpc2goKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgdmlldy52aWV3LnNyYyA9ICcnXG4gICAgICAgICAgICBwdWJsaXNoZXIuc2V0Vmlldyh1bmRlZmluZWQpXG4gICAgICAgICAgICBwdWJsaXNoZXIub2ZmKCcqJywgY29tcC5wcm9wcy5vblB1Ymxpc2hlcmV2ZW50KVxuICAgICAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICBzdGF0ZS52aWV3ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbXAub25VbnB1Ymxpc2hTdWNjZXNzKClcbiAgICAgICAgICAgIGNvbXAubm90aWZ5UHVibGlzaGVyRXN0YWJsaXNoZWQodW5kZWZpbmVkLCB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXNvbHZlKClcblxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcblxuICAgICAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgICAgICBjb21wLm9uVW5wdWJsaXNoRmFpbGVkKGBVbm1vdW50IEVycm9yID0gJHtqc29uRXJyb3J9YClcbiAgICAgICAgICAgIHJlamVjdChlcnJvcilcblxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcblxuICAgICAgICBjb21wLm9uVW5wdWJsaXNoU3VjY2VzcygpXG4gICAgICAgIHJlc29sdmUoKVxuXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRyeVB1Ymxpc2ggKGF1dG8pIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIGNvbnN0IHB1YiA9IHRoaXMucHVibGlzaC5iaW5kKHRoaXMpXG4gICAgaWYgKGF1dG8pIHtcbiAgICAgIHRoaXMucHJldmlldygpXG4gICAgICAgIC50aGVuKHB1YikuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIGNvbXAub25QdWJsaXNoRmFpbCgnRXJyb3IgLSBDb3VsZCBub3Qgc3RhcnQgcHVibGlzaGluZyBzZXNzaW9uLicpXG4gICAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMudHJ5UHVibGlzaCh0aGlzLnByb3BzLmF1dG9QdWJsaXNoKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIGNvbnN0IHB1Ymxpc2hlciA9IHRoaXMuc3RhdGUucHVibGlzaGVyXG4gICAgdGhpcy51bnB1Ymxpc2goKVxuICAgIGlmIChwdWJsaXNoZXIgJiYgdGhpcy5wcm9wcy5vblB1Ymxpc2hlckV2ZW50KSB7XG4gICAgICBwdWJsaXNoZXIub2ZmKCcqJywgdGhpcy5wcm9wcy5vblB1Ymxpc2hlckV2ZW50KVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSAocHJldlByb3BzKSB7XG4gICAgY29uc3QgcCA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBwVU0gPSBwLnVzZXJNZWRpYVxuICAgIGNvbnN0IHByZXZVTSA9IHByZXZQcm9wcy51c2VyTWVkaWFcbiAgICBpZiAoIWlzRXF1YWwocHJldlVNLCBwVU0pKSB7XG4gICAgICBjb25zdCBwdWIgPSB0aGlzLnRyeVB1Ymxpc2guYmluZCh0aGlzKVxuICAgICAgY29uc3QgYXV0byA9IHRoaXMucHJvcHMuYXV0b1B1Ymxpc2hcbiAgICAgIHRoaXMudW5wdWJsaXNoKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHB1YihhdXRvKVxuICAgICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGdldFB1Ymxpc2hlckVsZW1lbnQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWQ1UHJvUHVibGlzaGVyXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGVsZW1lbnRJZCA9IFsncmVkNXByby1wdWJsaXNoZXItdmlkZW8nLCB0aGlzLnN0YXRlLmluc3RhbmNlSWRdLmpvaW4oJy0nKVxuICAgIGxldCBjbGFzc05hbWVzID0gWydyZWQ1cHJvLXB1Ymxpc2hlci12aWRlby1jb250YWluZXInXVxuICAgIGlmICh0aGlzLnByb3BzLmNsYXNzTmFtZSkge1xuICAgICAgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXMuY29uY2F0KHRoaXMucHJvcHMuY2xhc3NOYW1lKVxuICAgIH1cbiAgICBsZXQgbWVkaWFDbGFzc05hbWVzID0gW11cbiAgICBpZiAodGhpcy5wcm9wcy5tZWRpYUNsYXNzTmFtZSkge1xuICAgICAgbWVkaWFDbGFzc05hbWVzID0gbWVkaWFDbGFzc05hbWVzLmNvbmNhdCh0aGlzLnByb3BzLm1lZGlhQ2xhc3NOYW1lKVxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiByZWY9e2MgPT4gdGhpcy5fdmlkZW9Db250YWluZXIgPSBjfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmpvaW4oJyAnKX0+XG4gICAgICAgIDx2aWRlbyByZWY9e2MgPT4gdGhpcy5fcmVkNVByb1B1Ymxpc2hlciA9IGN9XG4gICAgICAgICAgaWQ9e2VsZW1lbnRJZH1cbiAgICAgICAgICBjb250cm9scz17dGhpcy5wcm9wcy5zaG93Q29udHJvbHN9XG4gICAgICAgICAgY2xhc3NOYW1lPXttZWRpYUNsYXNzTmFtZXMuam9pbignICcpfT5cbiAgICAgICAgPC92aWRlbz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblJlZDVQcm9QdWJsaXNoZXIucHJvcFR5cGVzID0ge1xuICBhdXRvUHVibGlzaDogUHJvcFR5cGVzLmJvb2xlYW4sXG4gIHNob3dDb250cm9sczogUHJvcFR5cGVzLmJvb2xlYW4sXG4gIGhvc3Q6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHVzZXJNZWRpYTogUHJvcFR5cGVzLm9iamVjdCxcbiAgc3RyZWFtTmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjb25maWd1cmF0aW9uOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uUHVibGlzaGVyRXN0YWJsaXNoZWQ6IFByb3BUeXBlcy5mdW5jLFxuICBvblB1Ymxpc2hlckV2ZW50OiBQcm9wVHlwZXMuZnVuY1xufVxuXG5SZWQ1UHJvUHVibGlzaGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgYXV0b1B1Ymxpc2g6IHRydWUsXG4gIHNob3dDb250cm9sczogdHJ1ZSxcbiAgaG9zdDogdW5kZWZpbmVkLFxuICB1c2VyTWVkaWE6IHVuZGVmaW5lZCxcbiAgc3RyZWFtTmFtZTogdW5kZWZpbmVkLFxuICBjb25maWd1cmF0aW9uOiBkZWZhdWx0Q29uZmlndXJhdGlvblxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWQ1UHJvUHVibGlzaGVyXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvUmVkNVByb1B1Ymxpc2hlci5qc1xuICoqLyIsInZhciBiYXNlSXNFcXVhbCA9IHJlcXVpcmUoJy4vX2Jhc2VJc0VxdWFsJyk7XG5cbi8qKlxuICogUGVyZm9ybXMgYSBkZWVwIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZVxuICogZXF1aXZhbGVudC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2Qgc3VwcG9ydHMgY29tcGFyaW5nIGFycmF5cywgYXJyYXkgYnVmZmVycywgYm9vbGVhbnMsXG4gKiBkYXRlIG9iamVjdHMsIGVycm9yIG9iamVjdHMsIG1hcHMsIG51bWJlcnMsIGBPYmplY3RgIG9iamVjdHMsIHJlZ2V4ZXMsXG4gKiBzZXRzLCBzdHJpbmdzLCBzeW1ib2xzLCBhbmQgdHlwZWQgYXJyYXlzLiBgT2JqZWN0YCBvYmplY3RzIGFyZSBjb21wYXJlZFxuICogYnkgdGhlaXIgb3duLCBub3QgaW5oZXJpdGVkLCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuIEZ1bmN0aW9ucyBhbmQgRE9NXG4gKiBub2RlcyBhcmUgKipub3QqKiBzdXBwb3J0ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uaXNFcXVhbChvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBvYmplY3QgPT09IG90aGVyO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNFcXVhbCh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFcXVhbDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pc0VxdWFsLmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlSXNFcXVhbERlZXAgPSByZXF1aXJlKCcuL19iYXNlSXNFcXVhbERlZXAnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdoaWNoIHN1cHBvcnRzIHBhcnRpYWwgY29tcGFyaXNvbnNcbiAqIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtiaXRtYXNrXSBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLlxuICogIFRoZSBiaXRtYXNrIG1heSBiZSBjb21wb3NlZCBvZiB0aGUgZm9sbG93aW5nIGZsYWdzOlxuICogICAgIDEgLSBVbm9yZGVyZWQgY29tcGFyaXNvblxuICogICAgIDIgLSBQYXJ0aWFsIGNvbXBhcmlzb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICBpZiAodmFsdWUgPT09IG90aGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCB8fCAoIWlzT2JqZWN0KHZhbHVlKSAmJiAhaXNPYmplY3RMaWtlKG90aGVyKSkpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYmFzZUlzRXF1YWwsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fYmFzZUlzRXF1YWwuanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFN0YWNrID0gcmVxdWlyZSgnLi9fU3RhY2snKSxcbiAgICBlcXVhbEFycmF5cyA9IHJlcXVpcmUoJy4vX2VxdWFsQXJyYXlzJyksXG4gICAgZXF1YWxCeVRhZyA9IHJlcXVpcmUoJy4vX2VxdWFsQnlUYWcnKSxcbiAgICBlcXVhbE9iamVjdHMgPSByZXF1aXJlKCcuL19lcXVhbE9iamVjdHMnKSxcbiAgICBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNCdWZmZXIgPSByZXF1aXJlKCcuL2lzQnVmZmVyJyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9pc1R5cGVkQXJyYXknKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY29tcGFyaXNvbiBzdHlsZXMuICovXG52YXIgUEFSVElBTF9DT01QQVJFX0ZMQUcgPSAyO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYml0bWFza10gVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBhcnJheVRhZyxcbiAgICAgIG90aFRhZyA9IGFycmF5VGFnO1xuXG4gIGlmICghb2JqSXNBcnIpIHtcbiAgICBvYmpUYWcgPSBnZXRUYWcob2JqZWN0KTtcbiAgICBvYmpUYWcgPSBvYmpUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG9ialRhZztcbiAgfVxuICBpZiAoIW90aElzQXJyKSB7XG4gICAgb3RoVGFnID0gZ2V0VGFnKG90aGVyKTtcbiAgICBvdGhUYWcgPSBvdGhUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG90aFRhZztcbiAgfVxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmIGlzQnVmZmVyKG9iamVjdCkpIHtcbiAgICBpZiAoIWlzQnVmZmVyKG90aGVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBvYmpJc0FyciA9IHRydWU7XG4gICAgb2JqSXNPYmogPSBmYWxzZTtcbiAgfVxuICBpZiAoaXNTYW1lVGFnICYmICFvYmpJc09iaikge1xuICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgcmV0dXJuIChvYmpJc0FyciB8fCBpc1R5cGVkQXJyYXkob2JqZWN0KSlcbiAgICAgID8gZXF1YWxBcnJheXMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaylcbiAgICAgIDogZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICB9XG4gIGlmICghKGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRykpIHtcbiAgICB2YXIgb2JqSXNXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgIGlmIChvYmpJc1dyYXBwZWQgfHwgb3RoSXNXcmFwcGVkKSB7XG4gICAgICB2YXIgb2JqVW53cmFwcGVkID0gb2JqSXNXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsXG4gICAgICAgICAgb3RoVW53cmFwcGVkID0gb3RoSXNXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyO1xuXG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgcmV0dXJuIGVxdWFsRnVuYyhvYmpVbndyYXBwZWQsIG90aFVud3JhcHBlZCwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgIH1cbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICByZXR1cm4gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsRGVlcDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fYmFzZUlzRXF1YWxEZWVwLmpzXG4gKiogbW9kdWxlIGlkID0gMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBzdGFja0NsZWFyID0gcmVxdWlyZSgnLi9fc3RhY2tDbGVhcicpLFxuICAgIHN0YWNrRGVsZXRlID0gcmVxdWlyZSgnLi9fc3RhY2tEZWxldGUnKSxcbiAgICBzdGFja0dldCA9IHJlcXVpcmUoJy4vX3N0YWNrR2V0JyksXG4gICAgc3RhY2tIYXMgPSByZXF1aXJlKCcuL19zdGFja0hhcycpLFxuICAgIHN0YWNrU2V0ID0gcmVxdWlyZSgnLi9fc3RhY2tTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YWNrO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19TdGFjay5qc1xuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgbGlzdENhY2hlQ2xlYXIgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVDbGVhcicpLFxuICAgIGxpc3RDYWNoZURlbGV0ZSA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZURlbGV0ZScpLFxuICAgIGxpc3RDYWNoZUdldCA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUdldCcpLFxuICAgIGxpc3RDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUhhcycpLFxuICAgIGxpc3RDYWNoZVNldCA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZVNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RDYWNoZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fTGlzdENhY2hlLmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVDbGVhcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fbGlzdENhY2hlQ2xlYXIuanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICAtLXRoaXMuc2l6ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlRGVsZXRlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19saXN0Q2FjaGVEZWxldGUuanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGVxID0gcmVxdWlyZSgnLi9lcScpO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc29jSW5kZXhPZjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fYXNzb2NJbmRleE9mLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2VxLmpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVHZXQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2xpc3RDYWNoZUdldC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZUhhcztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fbGlzdENhY2hlSGFzLmpzXG4gKiogbW9kdWxlIGlkID0gNDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICArK3RoaXMuc2l6ZTtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZVNldDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fbGlzdENhY2hlU2V0LmpzXG4gKiogbW9kdWxlIGlkID0gNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBTdGFja1xuICovXG5mdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0NsZWFyO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19zdGFja0NsZWFyLmpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICByZXN1bHQgPSBkYXRhWydkZWxldGUnXShrZXkpO1xuXG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0RlbGV0ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fc3RhY2tEZWxldGUuanNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrR2V0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19zdGFja0dldC5qc1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrSGFzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19zdGFja0hhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgTGlzdENhY2hlID0gcmVxdWlyZSgnLi9fTGlzdENhY2hlJyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgTWFwQ2FjaGUgPSByZXF1aXJlKCcuL19NYXBDYWNoZScpO1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKipcbiAqIFNldHMgdGhlIHN0YWNrIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzdGFja1NldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBkYXRhLl9fZGF0YV9fO1xuICAgIGlmICghTWFwIHx8IChwYWlycy5sZW5ndGggPCBMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgIHRoaXMuc2l6ZSA9ICsrZGF0YS5zaXplO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja1NldDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fc3RhY2tTZXQuanNcbiAqKiBtb2R1bGUgaWQgPSA1M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fTWFwLmpzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlSXNOYXRpdmUgPSByZXF1aXJlKCcuL19iYXNlSXNOYXRpdmUnKSxcbiAgICBnZXRWYWx1ZSA9IHJlcXVpcmUoJy4vX2dldFZhbHVlJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TmF0aXZlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19nZXROYXRpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSA1NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc01hc2tlZCA9IHJlcXVpcmUoJy4vX2lzTWFza2VkJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IGlzRnVuY3Rpb24odmFsdWUpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc05hdGl2ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fYmFzZUlzTmF0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pc0Z1bmN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gNTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2lzT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb3JlSnNEYXRhID0gcmVxdWlyZSgnLi9fY29yZUpzRGF0YScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTWFza2VkO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19pc01hc2tlZC5qc1xuICoqIG1vZHVsZSBpZCA9IDU5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb3JlSnNEYXRhO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19jb3JlSnNEYXRhLmpzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fcm9vdC5qc1xuICoqIG1vZHVsZSBpZCA9IDYxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2ZyZWVHbG9iYWwuanNcbiAqKiBtb2R1bGUgaWQgPSA2MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU291cmNlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL190b1NvdXJjZS5qc1xuICoqIG1vZHVsZSBpZCA9IDYzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRWYWx1ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fZ2V0VmFsdWUuanNcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIG1hcENhY2hlQ2xlYXIgPSByZXF1aXJlKCcuL19tYXBDYWNoZUNsZWFyJyksXG4gICAgbWFwQ2FjaGVEZWxldGUgPSByZXF1aXJlKCcuL19tYXBDYWNoZURlbGV0ZScpLFxuICAgIG1hcENhY2hlR2V0ID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVHZXQnKSxcbiAgICBtYXBDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX21hcENhY2hlSGFzJyksXG4gICAgbWFwQ2FjaGVTZXQgPSByZXF1aXJlKCcuL19tYXBDYWNoZVNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwQ2FjaGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX01hcENhY2hlLmpzXG4gKiogbW9kdWxlIGlkID0gNjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBIYXNoID0gcmVxdWlyZSgnLi9fSGFzaCcpLFxuICAgIExpc3RDYWNoZSA9IHJlcXVpcmUoJy4vX0xpc3RDYWNoZScpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLnNpemUgPSAwO1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVDbGVhcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fbWFwQ2FjaGVDbGVhci5qc1xuICoqIG1vZHVsZSBpZCA9IDY2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaGFzaENsZWFyID0gcmVxdWlyZSgnLi9faGFzaENsZWFyJyksXG4gICAgaGFzaERlbGV0ZSA9IHJlcXVpcmUoJy4vX2hhc2hEZWxldGUnKSxcbiAgICBoYXNoR2V0ID0gcmVxdWlyZSgnLi9faGFzaEdldCcpLFxuICAgIGhhc2hIYXMgPSByZXF1aXJlKCcuL19oYXNoSGFzJyksXG4gICAgaGFzaFNldCA9IHJlcXVpcmUoJy4vX2hhc2hTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhhc2g7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX0hhc2guanNcbiAqKiBtb2R1bGUgaWQgPSA2N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoQ2xlYXI7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2hhc2hDbGVhci5qc1xuICoqIG1vZHVsZSBpZCA9IDY4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlQ3JlYXRlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19uYXRpdmVDcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA2OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoRGVsZXRlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19oYXNoRGVsZXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hHZXQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2hhc2hHZXQuanNcbiAqKiBtb2R1bGUgaWQgPSA3MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hIYXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2hhc2hIYXMuanNcbiAqKiBtb2R1bGUgaWQgPSA3MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHRoaXMuc2l6ZSArPSB0aGlzLmhhcyhrZXkpID8gMCA6IDE7XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoU2V0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19oYXNoU2V0LmpzXG4gKiogbW9kdWxlIGlkID0gNzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZURlbGV0ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fbWFwQ2FjaGVEZWxldGUuanNcbiAqKiBtb2R1bGUgaWQgPSA3NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzS2V5YWJsZSA9IHJlcXVpcmUoJy4vX2lzS2V5YWJsZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TWFwRGF0YTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fZ2V0TWFwRGF0YS5qc1xuICoqIG1vZHVsZSBpZCA9IDc1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNLZXlhYmxlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19pc0tleWFibGUuanNcbiAqKiBtb2R1bGUgaWQgPSA3NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZUdldDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fbWFwQ2FjaGVHZXQuanNcbiAqKiBtb2R1bGUgaWQgPSA3N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVIYXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX21hcENhY2hlSGFzLmpzXG4gKiogbW9kdWxlIGlkID0gNzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSksXG4gICAgICBzaXplID0gZGF0YS5zaXplO1xuXG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgKz0gZGF0YS5zaXplID09IHNpemUgPyAwIDogMTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVTZXQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX21hcENhY2hlU2V0LmpzXG4gKiogbW9kdWxlIGlkID0gNzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBTZXRDYWNoZSA9IHJlcXVpcmUoJy4vX1NldENhY2hlJyksXG4gICAgYXJyYXlTb21lID0gcmVxdWlyZSgnLi9fYXJyYXlTb21lJyksXG4gICAgY2FjaGVIYXMgPSByZXF1aXJlKCcuL19jYWNoZUhhcycpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBjb21wYXJpc29uIHN0eWxlcy4gKi9cbnZhciBVTk9SREVSRURfQ09NUEFSRV9GTEFHID0gMSxcbiAgICBQQVJUSUFMX0NPTVBBUkVfRkxBRyA9IDI7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYGFycmF5YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUcsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGg7XG5cbiAgaWYgKGFyckxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIShpc1BhcnRpYWwgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KGFycmF5KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gdHJ1ZSxcbiAgICAgIHNlZW4gPSAoYml0bWFzayAmIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcpID8gbmV3IFNldENhY2hlIDogdW5kZWZpbmVkO1xuXG4gIHN0YWNrLnNldChhcnJheSwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIGFycmF5KTtcblxuICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gIHdoaWxlICgrK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgsIG90aGVyLCBhcnJheSwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihhcnJWYWx1ZSwgb3RoVmFsdWUsIGluZGV4LCBhcnJheSwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgaWYgKGNvbXBhcmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wYXJlZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKHNlZW4pIHtcbiAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSwgb3RoSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghY2FjaGVIYXMoc2Vlbiwgb3RoSW5kZXgpICYmXG4gICAgICAgICAgICAgICAgKGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZWVuLnB1c2gob3RoSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoXG4gICAgICAgICAgYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8XG4gICAgICAgICAgICBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaylcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKGFycmF5KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcXVhbEFycmF5cztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fZXF1YWxBcnJheXMuanNcbiAqKiBtb2R1bGUgaWQgPSA4MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIE1hcENhY2hlID0gcmVxdWlyZSgnLi9fTWFwQ2FjaGUnKSxcbiAgICBzZXRDYWNoZUFkZCA9IHJlcXVpcmUoJy4vX3NldENhY2hlQWRkJyksXG4gICAgc2V0Q2FjaGVIYXMgPSByZXF1aXJlKCcuL19zZXRDYWNoZUhhcycpO1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGU7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldENhY2hlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19TZXRDYWNoZS5qc1xuICoqIG1vZHVsZSBpZCA9IDgxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgYWRkXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBhbGlhcyBwdXNoXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRDYWNoZUFkZDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fc2V0Q2FjaGVBZGQuanNcbiAqKiBtb2R1bGUgaWQgPSA4MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldENhY2hlSGFzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19zZXRDYWNoZUhhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDgzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zb21lYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlTb21lKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheVNvbWU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2FycmF5U29tZS5qc1xuICoqIG1vZHVsZSBpZCA9IDg0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENoZWNrcyBpZiBhIGBjYWNoZWAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYWNoZUhhcztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fY2FjaGVIYXMuanNcbiAqKiBtb2R1bGUgaWQgPSA4NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIFVpbnQ4QXJyYXkgPSByZXF1aXJlKCcuL19VaW50OEFycmF5JyksXG4gICAgZXEgPSByZXF1aXJlKCcuL2VxJyksXG4gICAgZXF1YWxBcnJheXMgPSByZXF1aXJlKCcuL19lcXVhbEFycmF5cycpLFxuICAgIG1hcFRvQXJyYXkgPSByZXF1aXJlKCcuL19tYXBUb0FycmF5JyksXG4gICAgc2V0VG9BcnJheSA9IHJlcXVpcmUoJy4vX3NldFRvQXJyYXknKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY29tcGFyaXNvbiBzdHlsZXMuICovXG52YXIgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyA9IDEsXG4gICAgUEFSVElBTF9DT01QQVJFX0ZMQUcgPSAyO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XSc7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgIChvYmplY3QuYnl0ZU9mZnNldCAhPSBvdGhlci5ieXRlT2Zmc2V0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBvYmplY3QuYnVmZmVyO1xuICAgICAgb3RoZXIgPSBvdGhlci5idWZmZXI7XG5cbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgICFlcXVhbEZ1bmMobmV3IFVpbnQ4QXJyYXkob2JqZWN0KSwgbmV3IFVpbnQ4QXJyYXkob3RoZXIpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBDb2VyY2UgYm9vbGVhbnMgdG8gYDFgIG9yIGAwYCBhbmQgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzLlxuICAgICAgLy8gSW52YWxpZCBkYXRlcyBhcmUgY29lcmNlZCB0byBgTmFOYC5cbiAgICAgIHJldHVybiBlcSgrb2JqZWN0LCArb3RoZXIpO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MsIHByaW1pdGl2ZXMgYW5kIG9iamVjdHMsXG4gICAgICAvLyBhcyBlcXVhbC4gU2VlIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1yZWdleHAucHJvdG90eXBlLnRvc3RyaW5nXG4gICAgICAvLyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG5cbiAgICBjYXNlIG1hcFRhZzpcbiAgICAgIHZhciBjb252ZXJ0ID0gbWFwVG9BcnJheTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRztcbiAgICAgIGNvbnZlcnQgfHwgKGNvbnZlcnQgPSBzZXRUb0FycmF5KTtcblxuICAgICAgaWYgKG9iamVjdC5zaXplICE9IG90aGVyLnNpemUgJiYgIWlzUGFydGlhbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAgICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICAgICAgaWYgKHN0YWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gICAgICB9XG4gICAgICBiaXRtYXNrIHw9IFVOT1JERVJFRF9DT01QQVJFX0ZMQUc7XG5cbiAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuICAgICAgdmFyIHJlc3VsdCA9IGVxdWFsQXJyYXlzKGNvbnZlcnQob2JqZWN0KSwgY29udmVydChvdGhlciksIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgICAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICBpZiAoc3ltYm9sVmFsdWVPZikge1xuICAgICAgICByZXR1cm4gc3ltYm9sVmFsdWVPZi5jYWxsKG9iamVjdCkgPT0gc3ltYm9sVmFsdWVPZi5jYWxsKG90aGVyKTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxCeVRhZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fZXF1YWxCeVRhZy5qc1xuICoqIG1vZHVsZSBpZCA9IDg2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19TeW1ib2wuanNcbiAqKiBtb2R1bGUgaWQgPSA4N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gVWludDhBcnJheTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fVWludDhBcnJheS5qc1xuICoqIG1vZHVsZSBpZCA9IDg4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcFRvQXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX21hcFRvQXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSA4OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRUb0FycmF5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19zZXRUb0FycmF5LmpzXG4gKiogbW9kdWxlIGlkID0gOTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNvbXBhcmlzb24gc3R5bGVzLiAqL1xudmFyIFBBUlRJQUxfQ09NUEFSRV9GTEFHID0gMjtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICogIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUcsXG4gICAgICBvYmpQcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgIG90aFByb3BzID0ga2V5cyhvdGhlciksXG4gICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzUGFydGlhbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgaW5kZXggPSBvYmpMZW5ndGg7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICBpZiAoIShpc1BhcnRpYWwgPyBrZXkgaW4gb3RoZXIgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCBrZXkpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gIGlmIChzdGFja2VkICYmIHN0YWNrLmdldChvdGhlcikpIHtcbiAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgfVxuICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIG9iamVjdCk7XG5cbiAgdmFyIHNraXBDdG9yID0gaXNQYXJ0aWFsO1xuICB3aGlsZSAoKytpbmRleCA8IG9iakxlbmd0aCkge1xuICAgIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltrZXldO1xuXG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIG9ialZhbHVlLCBrZXksIG90aGVyLCBvYmplY3QsIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIob2JqVmFsdWUsIG90aFZhbHVlLCBrZXksIG9iamVjdCwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKCEoY29tcGFyZWQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gKG9ialZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMob2JqVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykpXG4gICAgICAgICAgOiBjb21wYXJlZFxuICAgICAgICApKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBza2lwQ3RvciB8fCAoc2tpcEN0b3IgPSBrZXkgPT0gJ2NvbnN0cnVjdG9yJyk7XG4gIH1cbiAgaWYgKHJlc3VsdCAmJiAhc2tpcEN0b3IpIHtcbiAgICB2YXIgb2JqQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgaWYgKG9iakN0b3IgIT0gb3RoQ3RvciAmJlxuICAgICAgICAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmXG4gICAgICAgICAgdHlwZW9mIG90aEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvdGhDdG9yIGluc3RhbmNlb2Ygb3RoQ3RvcikpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcXVhbE9iamVjdHM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2VxdWFsT2JqZWN0cy5qc1xuICoqIG1vZHVsZSBpZCA9IDkxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYXJyYXlMaWtlS2V5cyA9IHJlcXVpcmUoJy4vX2FycmF5TGlrZUtleXMnKSxcbiAgICBiYXNlS2V5cyA9IHJlcXVpcmUoJy4vX2Jhc2VLZXlzJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gva2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDkyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZVRpbWVzID0gcmVxdWlyZSgnLi9fYmFzZVRpbWVzJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzQnVmZmVyID0gcmVxdWlyZSgnLi9pc0J1ZmZlcicpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9pc1R5cGVkQXJyYXknKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpLFxuICAgICAgaXNBcmcgPSAhaXNBcnIgJiYgaXNBcmd1bWVudHModmFsdWUpLFxuICAgICAgaXNCdWZmID0gIWlzQXJyICYmICFpc0FyZyAmJiBpc0J1ZmZlcih2YWx1ZSksXG4gICAgICBpc1R5cGUgPSAhaXNBcnIgJiYgIWlzQXJnICYmICFpc0J1ZmYgJiYgaXNUeXBlZEFycmF5KHZhbHVlKSxcbiAgICAgIHNraXBJbmRleGVzID0gaXNBcnIgfHwgaXNBcmcgfHwgaXNCdWZmIHx8IGlzVHlwZSxcbiAgICAgIHJlc3VsdCA9IHNraXBJbmRleGVzID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKSA6IFtdLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChcbiAgICAgICAgICAgLy8gU2FmYXJpIDkgaGFzIGVudW1lcmFibGUgYGFyZ3VtZW50cy5sZW5ndGhgIGluIHN0cmljdCBtb2RlLlxuICAgICAgICAgICBrZXkgPT0gJ2xlbmd0aCcgfHxcbiAgICAgICAgICAgLy8gTm9kZS5qcyAwLjEwIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIGJ1ZmZlcnMuXG4gICAgICAgICAgIChpc0J1ZmYgJiYgKGtleSA9PSAnb2Zmc2V0JyB8fCBrZXkgPT0gJ3BhcmVudCcpKSB8fFxuICAgICAgICAgICAvLyBQaGFudG9tSlMgMiBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiB0eXBlZCBhcnJheXMuXG4gICAgICAgICAgIChpc1R5cGUgJiYgKGtleSA9PSAnYnVmZmVyJyB8fCBrZXkgPT0gJ2J5dGVMZW5ndGgnIHx8IGtleSA9PSAnYnl0ZU9mZnNldCcpKSB8fFxuICAgICAgICAgICAvLyBTa2lwIGluZGV4IHByb3BlcnRpZXMuXG4gICAgICAgICAgIGlzSW5kZXgoa2V5LCBsZW5ndGgpXG4gICAgICAgICkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TGlrZUtleXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2FycmF5TGlrZUtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA5M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVGltZXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2Jhc2VUaW1lcy5qc1xuICoqIG1vZHVsZSBpZCA9IDk0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZUlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9fYmFzZUlzQXJndW1lbnRzJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJndW1lbnRzID0gYmFzZUlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID8gYmFzZUlzQXJndW1lbnRzIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaXNBcmd1bWVudHMuanNcbiAqKiBtb2R1bGUgaWQgPSA5NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzQXJndW1lbnRzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0FyZ3VtZW50cztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fYmFzZUlzQXJndW1lbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gOTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaXNBcnJheS5qc1xuICoqIG1vZHVsZSBpZCA9IDk3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKSxcbiAgICBzdHViRmFsc2UgPSByZXF1aXJlKCcuL3N0dWJGYWxzZScpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQnVmZmVyID0gQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSBuYXRpdmVJc0J1ZmZlciB8fCBzdHViRmFsc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNCdWZmZXI7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaXNCdWZmZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA5OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0bW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDk5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R1YkZhbHNlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL3N0dWJGYWxzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9faXNJbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2VJc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL19iYXNlSXNUeXBlZEFycmF5JyksXG4gICAgYmFzZVVuYXJ5ID0gcmVxdWlyZSgnLi9fYmFzZVVuYXJ5JyksXG4gICAgbm9kZVV0aWwgPSByZXF1aXJlKCcuL19ub2RlVXRpbCcpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaXNUeXBlZEFycmF5LmpzXG4gKiogbW9kdWxlIGlkID0gMTAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNUeXBlZEFycmF5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19iYXNlSXNUeXBlZEFycmF5LmpzXG4gKiogbW9kdWxlIGlkID0gMTAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZW5ndGg7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaXNMZW5ndGguanNcbiAqKiBtb2R1bGUgaWQgPSAxMDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVW5hcnk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2Jhc2VVbmFyeS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbm9kZVV0aWw7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX25vZGVVdGlsLmpzXG4gKiogbW9kdWxlIGlkID0gMTA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpLFxuICAgIG5hdGl2ZUtleXMgPSByZXF1aXJlKCcuL19uYXRpdmVLZXlzJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlS2V5cztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fYmFzZUtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Byb3RvdHlwZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9faXNQcm90b3R5cGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxMDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBvdmVyQXJnID0gcmVxdWlyZSgnLi9fb3ZlckFyZycpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlS2V5cztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fbmF0aXZlS2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheUxpa2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaXNBcnJheUxpa2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBEYXRhVmlldyA9IHJlcXVpcmUoJy4vX0RhdGFWaWV3JyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJy4vX1Byb21pc2UnKSxcbiAgICBTZXQgPSByZXF1aXJlKCcuL19TZXQnKSxcbiAgICBXZWFrTWFwID0gcmVxdWlyZSgnLi9fV2Vha01hcCcpLFxuICAgIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEgYW5kIHByb21pc2VzIGluIE5vZGUuanMgPCA2LlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY3RvclN0cmluZykge1xuICAgICAgc3dpdGNoIChjdG9yU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWc7XG4gICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZztcbiAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgIGNhc2Ugc2V0Q3RvclN0cmluZzogcmV0dXJuIHNldFRhZztcbiAgICAgICAgY2FzZSB3ZWFrTWFwQ3RvclN0cmluZzogcmV0dXJuIHdlYWtNYXBUYWc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VGFnO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19nZXRUYWcuanNcbiAqKiBtb2R1bGUgaWQgPSAxMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgRGF0YVZpZXcgPSBnZXROYXRpdmUocm9vdCwgJ0RhdGFWaWV3Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVZpZXc7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX0RhdGFWaWV3LmpzXG4gKiogbW9kdWxlIGlkID0gMTEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFByb21pc2UgPSBnZXROYXRpdmUocm9vdCwgJ1Byb21pc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19Qcm9taXNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2V0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19TZXQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYWtNYXA7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX1dlYWtNYXAuanNcbiAqKiBtb2R1bGUgaWQgPSAxMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2Jhc2VHZXRUYWcuanNcbiAqKiBtb2R1bGUgaWQgPSAxMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIGdsb2JhbCByZWQ1cHJvc2RrICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgcmVkNXByb3NkayBmcm9tICdyZWQ1cHJvLXNkaydcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuXG5jbGFzcyBQdWJsaXNoZXJTdGF0dXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0dXM6ICdPbiBob2xkLidcbiAgICB9XG4gIH1cblxuICB1cGRhdGVTdGF0dXNGcm9tRXZlbnQgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coYFtQdWJsaXNoZXJTdGF0dXNdIGV2ZW50OiAke2V2ZW50LnR5cGV9YClcbiAgICBjb25zdCBwdWJUeXBlcyA9IHJlZDVwcm9zZGsuUHVibGlzaGVyRXZlbnRUeXBlc1xuICAgIGNvbnN0IHJ0Y1R5cGVzID0gcmVkNXByb3Nkay5SVENQdWJsaXNoZXJFdmVudFR5cGVzXG4gICAgbGV0IHN0YXR1cyA9IHRoaXMuc3RhdGUuc3RhdHVzXG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICBjYXNlIHB1YlR5cGVzLkNPTk5FQ1RfU1VDQ0VTUzpcbiAgICAgICAgc3RhdHVzID0gJ0Nvbm5lY3Rpb24gZXN0YWJsaXNoZWQuLi4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIHB1YlR5cGVzLkNPTk5FQ1RfRkFJTFVSRTpcbiAgICAgICAgc3RhdHVzID0gJ0Vycm9yIC0gQ291bGQgbm90IGVzdGFibGlzaCBjb25uZWN0aW9uLidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgcHViVHlwZXMuUFVCTElTSF9TVEFSVDpcbiAgICAgICAgc3RhdHVzID0gJ1N0YXJ0ZWQgcHVibGlzaGluZyBzZXNzaW9uLidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgcHViVHlwZXMuUFVCTElTSF9GQUlMOlxuICAgICAgICBzdGF0dXMgPSAnRXJyb3IgLSBDb3VsZCBub3Qgc3RhcnQgYSBwdWJsaXNoaW5nIHNlc3Npb24uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBwdWJUeXBlcy5QVUJMSVNIX0lOVkFMSURfTkFNRTpcbiAgICAgICAgc3RhdHVzID0gJ0Vycm9yIC0gU3RyZWFtIG5hbWUgYWxyZWFkeSBpbiB1c2UuJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBydGNUeXBlcy5NRURJQV9TVFJFQU1fQVZBSUxBQkxFOlxuICAgICAgICBzdGF0dXMgPSAnU3RyZWFtIGF2YWlsYWJsZS4uLidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgcnRjVHlwZXMuUEVFUl9DT05ORUNUSU9OX0FWQUlMQUJMRTpcbiAgICAgICAgc3RhdHVzID0gJ1BlZXIgQ29ubmVjdGlvbiBhdmFpbGFibGUuLi4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIHJ0Y1R5cGVzLk9GRkVSX1NUQVJUOlxuICAgICAgICBzdGF0dXMgPSAnQmVnaW4gb2ZmZXIuLi4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIHJ0Y1R5cGVzLk9GRkVSX0VORDpcbiAgICAgICAgc3RhdHVzID0gJ09mZmVyIGFjY2VwdGVkLi4uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBydGNUeXBlcy5JQ0VfVFJJQ0tMRV9DT01QTEVURTpcbiAgICAgICAgc3RhdHVzID0gJ05lZ290aWF0aW9uIGNvbXBsZXRlLiBXYWl0aW5nIFB1Ymxpc2ggU3RhcnQuLi4nXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzID0gc3RhdHVzXG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZXZlbnQgIT09IG5leHRQcm9wcy5ldmVudCAmJiBuZXh0UHJvcHMuZXZlbnQpIHtcbiAgICAgIHRoaXMudXBkYXRlU3RhdHVzRnJvbUV2ZW50KG5leHRQcm9wcy5ldmVudClcbiAgICB9XG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8cCBjbGFzc05hbWU9XCJjZW50ZXJlZCBzdGF0dXMtZmllbGRcIj5TVEFUVVM6IHt0aGlzLnN0YXRlLnN0YXR1c308L3A+XG4gICAgKVxuICB9XG5cbn1cblxuUHVibGlzaGVyU3RhdHVzLnByb3BUeXBlcyA9IHtcbiAgZXZlbnQ6IFByb3BUeXBlcy5vYmplY3Rcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVyU3RhdHVzXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9QdWJsaXNoZXJTdGF0dXMuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWQ1UHJvUHVibGlzaGVyIGZyb20gJy4uLy4uL1JlZDVQcm9QdWJsaXNoZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBQdWJsaXNoZXJTdGF0dXMgZnJvbSAnLi4vUHVibGlzaGVyU3RhdHVzJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi4vLi4vQmFja0xpbmsnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY29uc3QgVVNFUl9NRURJQV9TRVRUSU5HID0ge1xuICB2aWRlbzoge1xuICAgIHdpZHRoOiAxOTIwLFxuICAgIGhlaWdodDogMTA4MFxuICB9XG59XG5cbmNsYXNzIFB1Ymxpc2hlcjEwODBwVGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHN0YXR1c0V2ZW50OiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBoYW5kbGVQdWJsaXNoZXJFdmVudCAoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1c0V2ZW50ID0gZXZlbnRcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gIH1cblxuICBwdWJsaXNoZXJFc3RhYmxpc2hlZCAocHVibGlzaGVyLCBwdWJsaXNoZXJWaWV3KSB7XG4gICAgY29uc29sZS5sb2coYFtQdWJsaXNoZXIxMDgwcFRlc3RdIHB1Ymxpc2hlcjogJHtwdWJsaXNoZXJ9LCAke3B1Ymxpc2hlclZpZXd9YClcbiAgfVxuXG4gIHJlbmRlciAoKSAge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+UHVibGlzaGVyIDEwODBwIFRlc3Q8L2gxPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+PGVtPnN0cmVhbTwvZW0+OiB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfTwvaDI+XG4gICAgICAgIDxQdWJsaXNoZXJTdGF0dXMgZXZlbnQ9e3RoaXMuc3RhdGUuc3RhdHVzRXZlbnR9IC8+XG4gICAgICAgIDxSZWQ1UHJvUHVibGlzaGVyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIlxuICAgICAgICAgIG1lZGlhQ2xhc3NOYW1lPVwidmlkZW8tZWxlbWVudFwiXG4gICAgICAgICAgY29uZmlndXJhdGlvbj17dGhpcy5wcm9wcy5zZXR0aW5nc31cbiAgICAgICAgICB1c2VyTWVkaWE9e1VTRVJfTUVESUFfU0VUVElOR31cbiAgICAgICAgICBzdHJlYW1OYW1lPXt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9XG4gICAgICAgICAgc2hvd0NvbnRyb2xzPXt0cnVlfVxuICAgICAgICAgIG9uUHVibGlzaGVyRXN0YWJsaXNoZWQ9e3RoaXMucHVibGlzaGVyRXN0YWJsaXNoZWQuYmluZCh0aGlzKX1cbiAgICAgICAgICBvblB1Ymxpc2hlckV2ZW50PXt0aGlzLmhhbmRsZVB1Ymxpc2hlckV2ZW50LmJpbmQodGhpcyl9XG4gICAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblB1Ymxpc2hlcjEwODBwVGVzdC5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hlcjEwODBwVGVzdFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvcHVibGlzaC9QdWJsaXNoZXIxMDgwcFRlc3QuanNcbiAqKi8iLCIvKiBnbG9iYWwgcmVkNXByb3NkayAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuLy8gaW1wb3J0IHJlZDVwcm9zZGsgZnJvbSAncmVkNXByby1zZGsnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWQ1UHJvUHVibGlzaGVyIGZyb20gJy4uLy4uL1JlZDVQcm9QdWJsaXNoZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBQdWJsaXNoZXJTdGF0dXMgZnJvbSAnLi4vUHVibGlzaGVyU3RhdHVzJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi4vLi4vQmFja0xpbmsnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY29uc3QgVVNFUl9NRURJQV9TRVRUSU5HID0ge1xuICBhdWRpbzogdHJ1ZSxcbiAgdmlkZW86IGZhbHNlXG59XG5cbmNsYXNzIFB1Ymxpc2hlckF1ZGlvT25seVRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0dXNFdmVudDogdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUHVibGlzaGVyRXZlbnQgKGV2ZW50KSB7XG4gICAgLy8gdXBkYXRlIHN0YXRlIHdpdGggZXZlbnRcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1c0V2ZW50ID0gZXZlbnRcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gICAgLy8gc2h1dGRvd24gcGxheWJhY2tcbiAgICBjb25zdCB2aWRlb0VsZW1lbnQgPSB0aGlzLl9yZWQ1UHJvUHVibGlzaGVyLmdldFB1Ymxpc2hlckVsZW1lbnQoKVxuICAgIGNvbnN0IHB1YlR5cGVzID0gcmVkNXByb3Nkay5QdWJsaXNoZXJFdmVudFR5cGVzXG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICBjYXNlIHB1YlR5cGVzLkNPTk5FQ1RfRkFJTFVSRTpcbiAgICAgIGNhc2UgcHViVHlwZXMuUFVCTElTSF9GQUlMOlxuICAgICAgICB2aWRlb0VsZW1lbnQucGF1c2UoKVxuICAgICAgICB2aWRlb0VsZW1lbnQuc3JjID0gJydcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBwdWJsaXNoZXJFc3RhYmxpc2hlZCAocHVibGlzaGVyLCBwdWJsaXNoZXJWaWV3KSB7XG4gICAgY29uc29sZS5sb2coYFtQdWJsaXNoZXJBdWRpb09ubHlUZXN0XSBwdWJsaXNoZXI6ICR7cHVibGlzaGVyfSwgJHtwdWJsaXNoZXJWaWV3fWApXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+UHVibGlzaGVyIEF1ZGlvIE9ubHkgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPFB1Ymxpc2hlclN0YXR1cyBldmVudD17dGhpcy5zdGF0ZS5zdGF0dXNFdmVudH0gLz5cbiAgICAgICAgPFJlZDVQcm9QdWJsaXNoZXJcbiAgICAgICAgICByZWY9e2MgPT4gdGhpcy5fcmVkNVByb1B1Ymxpc2hlciA9IGN9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIlxuICAgICAgICAgIG1lZGlhQ2xhc3NOYW1lPVwidmlkZW8tZWxlbWVudCBhdWRpby1vbmx5LWVsZW1lbnRcIlxuICAgICAgICAgIGNvbmZpZ3VyYXRpb249e3RoaXMucHJvcHMuc2V0dGluZ3N9XG4gICAgICAgICAgdXNlck1lZGlhPXtVU0VSX01FRElBX1NFVFRJTkd9XG4gICAgICAgICAgc3RyZWFtTmFtZT17dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfVxuICAgICAgICAgIHNob3dDb250cm9scz17dHJ1ZX1cbiAgICAgICAgICBvblB1Ymxpc2hlckVzdGFibGlzaGVkPXt0aGlzLnB1Ymxpc2hlckVzdGFibGlzaGVkLmJpbmQodGhpcyl9XG4gICAgICAgICAgb25QdWJsaXNoZXJFdmVudD17dGhpcy5oYW5kbGVQdWJsaXNoZXJFdmVudC5iaW5kKHRoaXMpfVxuICAgICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5QdWJsaXNoZXJBdWRpb09ubHlUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVyQXVkaW9Pbmx5VGVzdFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvcHVibGlzaC9QdWJsaXNoZXJBdWRpb09ubHlUZXN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVkNVByb1B1Ymxpc2hlciBmcm9tICcuLi8uLi9SZWQ1UHJvUHVibGlzaGVyJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgUHVibGlzaGVyU3RhdHVzIGZyb20gJy4uL1B1Ymxpc2hlclN0YXR1cycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uLy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNvbnN0IFNFTEVDVF9ERUZBVUxUID0gJ1NlbGVjdCBhIGNhbWVyYS4uLidcblxuY2xhc3MgUHVibGlzaGVyQ2FtZXJhU291cmNlVGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNhbWVyYXM6IFt7XG4gICAgICAgIGxhYmVsOiBTRUxFQ1RfREVGQVVMVFxuICAgICAgfV0sXG4gICAgICBzZWxlY3RlZENhbWVyYTogdW5kZWZpbmVkLFxuICAgICAgcHVibGlzaEFsbG93ZWQ6IGZhbHNlLFxuICAgICAgc3RhdHVzRXZlbnQ6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIHdhaXRGb3JTZWxlY3QgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKClcbiAgICAgIC50aGVuKGRldmljZXMgPT4ge1xuICAgICAgICBsZXQgdmlkZW9DYW1lcmFzID0gZGV2aWNlcy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0ua2luZCA9PT0gJ3ZpZGVvaW5wdXQnXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IGNhbWVyYXMgPSBbe1xuICAgICAgICAgIGxhYmVsOiBTRUxFQ1RfREVGQVVMVFxuICAgICAgICB9XS5jb25jYXQodmlkZW9DYW1lcmFzKVxuICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICBzdGF0ZS5jYW1lcmFzID0gY2FtZXJhc1xuICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgfVxuXG4gIHByZXZpZXcgKG1lZGlhRGV2aWNlSWQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnNlbGVjdGVkQ2FtZXJhID0gbWVkaWFEZXZpY2VJZFxuICAgICAgc3RhdGUucHVibGlzaEFsbG93ZWQgPSB0cnVlXG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgb25DYW1lcmFTZWxlY3QgKCkge1xuICAgIGNvbnN0IGNhbWVyYVNlbGVjdGVkID0gdGhpcy5fY2FtZXJhU2VsZWN0LnZhbHVlXG4gICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRDYW1lcmEgIT09IGNhbWVyYVNlbGVjdGVkICYmXG4gICAgICAoY2FtZXJhU2VsZWN0ZWQgJiYgY2FtZXJhU2VsZWN0ZWQgIT09IFNFTEVDVF9ERUZBVUxUKSkge1xuICAgICAgdGhpcy5wcmV2aWV3KGNhbWVyYVNlbGVjdGVkKVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLndhaXRGb3JTZWxlY3QoKVxuICB9XG5cbiAgaGFuZGxlUHVibGlzaGVyRXZlbnQgKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXNFdmVudCA9IGV2ZW50XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgcHVibGlzaGVyRXN0YWJsaXNoZWQgKHB1Ymxpc2hlciwgdmlldykge1xuICAgIGNvbnNvbGUubG9nKGBbUHVibGlzaGVyQ2FtZXJhU291cmNlVGVzdF0gcHVibGlzaGVyOiAke3B1Ymxpc2hlcn0sICR7dmlld31gKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBsYWJlbFN0eWxlID0ge1xuICAgICAgJ21hcmdpbi1yaWdodCc6ICcwLjVyZW0nXG4gICAgfVxuICAgIGNvbnN0IGNhbWVyYVNlbGVjdEZpZWxkID0ge1xuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnI2ZmZmZmZicsXG4gICAgICAncGFkZGluZyc6ICcwLjhyZW0nXG4gICAgfVxuICAgIGNvbnN0IGNhblB1Ymxpc2ggPSB0aGlzLnN0YXRlLnB1Ymxpc2hBbGxvd2VkXG4gICAgY29uc3QgdXNlck1lZGlhID0ge1xuICAgICAgdmlkZW86IHtcbiAgICAgICAgb3B0aW9uYWw6IFt7XG4gICAgICAgICAgc291cmNlSWQ6IHRoaXMuc3RhdGUuc2VsZWN0ZWRDYW1lcmFcbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5QdWJsaXNoZXIgQ2FtZXJhIFNvdXJjZSBUZXN0PC9oMT5cbiAgICAgICAgPGhyIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPjxlbT5zdHJlYW08L2VtPjoge3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX08L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluc3RydWN0aW9ucy1ibG9ja1wiPlxuICAgICAgICAgIDxwPlRvIGJlZ2luIHRoaXMgdGVzdCwgZmlyc3Qgc2VsZWN0IGEgY2FtZXJhIGZyb20gdGhlIGZvbGxvd2luZyBzZWxlY3Rpb25zOjwvcD5cbiAgICAgICAgICA8cCBzdHlsZT17Y2FtZXJhU2VsZWN0RmllbGR9PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNhbWVyYS1zZWxlY3RcIiBzdHlsZT17bGFiZWxTdHlsZX0+Q2FtZXJhIFNvdXJjZTo8L2xhYmVsPlxuICAgICAgICAgICAgPHNlbGVjdCByZWY9e2MgPT4gdGhpcy5fY2FtZXJhU2VsZWN0ID0gY31cbiAgICAgICAgICAgICAgaWQ9XCJjYW1lcmEtc2VsZWN0XCJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DYW1lcmFTZWxlY3QuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmNhbWVyYXMubWFwKGNhbWVyYSA9PlxuICAgICAgICAgICAgICAgICh0aGlzLnN0YXRlLnNlbGVjdGVkQ2FtZXJhID09PSBjYW1lcmEuZGV2aWNlSWQpXG4gICAgICAgICAgICAgICAgICA/IDxvcHRpb24gdmFsdWU9e2NhbWVyYS5kZXZpY2VJZH0gc2VsZWN0ZWQ+e2NhbWVyYS5sYWJlbH08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDogPG9wdGlvbiB2YWx1ZT17Y2FtZXJhLmRldmljZUlkfT57Y2FtZXJhLmxhYmVsfTwvb3B0aW9uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFB1Ymxpc2hlclN0YXR1cyBldmVudD17dGhpcy5zdGF0ZS5zdGF0dXNFdmVudH0gLz5cbiAgICAgICAgPFJlZDVQcm9QdWJsaXNoZXJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjZW50ZXJlZFwiXG4gICAgICAgICAgbWVkaWFDbGFzc05hbWU9XCJ2aWRlby1lbGVtZW50XCJcbiAgICAgICAgICBhdXRvUHVibGlzaD17Y2FuUHVibGlzaH1cbiAgICAgICAgICBzaG93Q29udHJvbHM9e3RydWV9XG4gICAgICAgICAgdXNlck1lZGlhPXt1c2VyTWVkaWF9XG4gICAgICAgICAgY29uZmlndXJhdGlvbj17dGhpcy5wcm9wcy5zZXR0aW5nc31cbiAgICAgICAgICBzdHJlYW1OYW1lPXt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9XG4gICAgICAgICAgb25QdWJsaXNoZXJFc3RhYmxpc2hlZD17dGhpcy5wdWJsaXNoZXJFc3RhYmxpc2hlZC5iaW5kKHRoaXMpfVxuICAgICAgICAgIG9uUHVibGlzaGVyRXZlbnQ9e3RoaXMuaGFuZGxlUHVibGlzaGVyRXZlbnQuYmluZCh0aGlzKX1cbiAgICAgICAgICByZWY9e2MgPT4gdGhpcy5fcmVkNVByb1B1Ymxpc2hlciA9IGN9XG4gICAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblB1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3QucHJvcFR5cGVzID0ge1xuICBzZXR0aW5nczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbkJhY2tDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoZXJDYW1lcmFTb3VyY2VUZXN0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvcHVibGlzaC9QdWJsaXNoZXJDYW1lcmFTb3VyY2VUZXN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVkNVByb1B1Ymxpc2hlciBmcm9tICcuLi8uLi9SZWQ1UHJvUHVibGlzaGVyJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgUHVibGlzaGVyU3RhdHVzIGZyb20gJy4uL1B1Ymxpc2hlclN0YXR1cycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uLy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNvbnN0IEZBQ0lOR19NT0RFX0ZST05UID0gJ3VzZXInXG5jb25zdCBGQUNJTkdfTU9ERV9SRUFSID0gJ2Vudmlyb25tZW50J1xuXG5jbGFzcyBQdWJsaXNoZXJDYW1lcmFTd2FwVGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGZhY2luZ01vZGVGcm9udDogdHJ1ZSxcbiAgICAgIHN1cHBvcnRlZDogbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cygpW1wiZmFjaW5nTW9kZVwiXSxcbiAgICAgIHN0YXR1c0V2ZW50OiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG4gIH1cblxuICBvbkNhbWVyYVN3YXBSZXF1ZXN0ICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLmZhY2luZ01vZGVGcm9udCA9ICFzdGF0ZS5mYWNpbmdNb2RlRnJvbnRcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVQdWJsaXNoZXJFdmVudCAoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1c0V2ZW50ID0gZXZlbnRcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gIH1cblxuICBwdWJsaXNoZXJFc3RhYmxpc2hlZCAocHVibGlzaGVyLCB2aWV3KSB7XG4gICAgY29uc29sZS5sb2coYFtQdWJsaXNoZXJDYW1lcmFTd2FwVGVzdF0gcHVibGlzaGVyOiAke3B1Ymxpc2hlcn0sICR7dmlld31gKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBoaW50Q2xhc3MgPSBbJ2hpbnQtYmxvY2snLCB0aGlzLnN0YXRlLnN1cHBvcnRlZCA/ICcnIDogJ2hpbnQtYWxlcnQnXS5qb2luKCcgJylcbiAgICBjb25zdCBzdXBwb3J0ZWRTdHIgPSB0aGlzLnN0YXRlLnN1cHBvcnRlZCA/ICdzdXBwb3J0cycgOiAnZG9lcyBub3Qgc3VwcG9ydCdcbiAgICBjb25zdCB1c2VyTWVkaWEgPSB7XG4gICAgICB2aWRlbzoge1xuICAgICAgICBmYWNpbmdNb2RlOiB0aGlzLnN0YXRlLmZhY2luZ01vZGVGcm9udCA/IEZBQ0lOR19NT0RFX0ZST05UIDogRkFDSU5HX01PREVfUkVBUlxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlB1Ymxpc2hlciBDYW1lcmEgU3dhcCBUZXN0PC9oMT5cbiAgICAgICAgPGhyIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPjxlbT5zdHJlYW08L2VtPjoge3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX08L2gyPlxuICAgICAgICA8cCBjbGFzc05hbWU9e2hpbnRDbGFzc30+PGVtPlRoZSBicm93c2VyIHlvdSBhcmUgdXNpbmcgPC9lbT48c3Ryb25nPntzdXBwb3J0ZWRTdHJ9PC9zdHJvbmc+PGVtPiB0aGUgPC9lbT48Y29kZT5mYWNpbmdNb2RlPC9jb2RlPjxlbT4gdmlkZW8gY29uc3RyYWludCByZXF1aXJlIGZvciB0aGlzIHRlc3QuPC9lbT48L3A+XG4gICAgICAgIDxQdWJsaXNoZXJTdGF0dXMgZXZlbnQ9e3RoaXMuc3RhdGUuc3RhdHVzRXZlbnR9IC8+XG4gICAgICAgIDxkaXYgb25DbGljaz17dGhpcy5vbkNhbWVyYVN3YXBSZXF1ZXN0LmJpbmQodGhpcyl9PlxuICAgICAgICAgIDxSZWQ1UHJvUHVibGlzaGVyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJjZW50ZXJlZFwiXG4gICAgICAgICAgICBtZWRpYUNsYXNzTmFtZT1cInZpZGVvLWVsZW1lbnRcIlxuICAgICAgICAgICAgc2hvd0NvbnRyb2xzPXt0cnVlfVxuICAgICAgICAgICAgdXNlck1lZGlhPXt1c2VyTWVkaWF9XG4gICAgICAgICAgICBjb25maWd1cmF0aW9uPXt0aGlzLnByb3BzLnNldHRpbmdzfVxuICAgICAgICAgICAgc3RyZWFtTmFtZT17dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfVxuICAgICAgICAgICAgb25QdWJsaXNoZXJFc3RhYmxpc2hlZD17dGhpcy5wdWJsaXNoZXJFc3RhYmxpc2hlZC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgb25QdWJsaXNoZXJFdmVudD17dGhpcy5oYW5kbGVQdWJsaXNoZXJFdmVudC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9QdWJsaXNoZXIgPSBjfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5QdWJsaXNoZXJDYW1lcmFTd2FwVGVzdC5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hlckNhbWVyYVN3YXBUZXN0XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlckNhbWVyYVN3YXBUZXN0LmpzXG4gKiovIiwiLyogZ2xvYmFsIHJlZDVwcm9zZGsgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbi8vIGltcG9ydCByZWQ1cHJvc2RrIGZyb20gJ3JlZDVwcm8tc2RrJ1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi4vLi4vQmFja0xpbmsnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY29uc3QgRklMVEVSX1NFTEVDVCA9ICdTZWxlY3QgZmlsdGVyLi4uJ1xuXG5jbGFzcyBQdWJsaXNoZXJGaWx0ZXJzVGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpZXc6IHVuZGVmaW5lZCxcbiAgICAgIHB1Ymxpc2hlcjogdW5kZWZpbmVkLFxuICAgICAgc3RhdHVzOiAnT24gaG9sZC4nLFxuICAgICAgZmlsdGVyczogW0ZJTFRFUl9TRUxFQ1QsICdncmF5c2NhbGUnLCAnc2VwaWEnLCAnYmx1ciddLFxuICAgICAgdmlkZW9DbGFzc0xpc3Q6ICcnXG4gICAgfVxuICB9XG5cbiAgcHJldmlldyAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcHVibGlzaGVyID0gbmV3IHJlZDVwcm9zZGsuUlRDUHVibGlzaGVyKClcbiAgICAgIGNvbnN0IHZpZXcgPSBuZXcgcmVkNXByb3Nkay5QdWJsaXNoZXJWaWV3KCdyZWQ1cHJvLXB1Ymxpc2hlcicpXG4gICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgYXVkaW86ICFjb21wLnByb3BzLnNldHRpbmdzLmF1ZGlvID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICB2aWRlbzogIWNvbXAucHJvcHMuc2V0dGluZ3MudmlkZW8gPyBmYWxzZSA6IHRydWVcbiAgICAgIH0sIG1lZGlhID0+IHtcblxuICAgICAgICAvLyBVcG9uIGFjY2VzcyBvZiB1c2VyIG1lZGlhLFxuICAgICAgICAvLyAxLiBBdHRhY2ggdGhlIHN0cmVhbSB0byB0aGUgcHVibGlzaGVyLlxuICAgICAgICAvLyAyLiBTaG93IHRoZSBzdHJlYW0gYXMgcHJldmlldyBpbiB2aWV3IGluc3RhbmNlLlxuICAgICAgICBwdWJsaXNoZXIuYXR0YWNoU3RyZWFtKG1lZGlhKVxuICAgICAgICB2aWV3LnByZXZpZXcobWVkaWEsIHRydWUpXG5cbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUucHVibGlzaGVyID0gcHVibGlzaGVyXG4gICAgICAgICAgc3RhdGUudmlldyA9IHZpZXdcbiAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgfSlcblxuICAgICAgICByZXNvbHZlKClcblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaGVyRmlsdGVyc1Rlc3RdIDo6IEVycm9yIC0gJHtlcnJvcn1gKVxuICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwdWJsaXNoICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIGNvbnN0IHB1Ymxpc2hlciA9IHRoaXMuc3RhdGUucHVibGlzaGVyXG4gICAgY29uc3QgdmlldyA9IHRoaXMuc3RhdGUudmlld1xuICAgIHZpZXcuYXR0YWNoUHVibGlzaGVyKHB1Ymxpc2hlcik7XG5cbiAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1cyA9ICdFc3RhYmxpc2hpbmcgY29ubmVjdGlvbi4uLidcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG5cbiAgICAvLyBJbml0aWFsaXplXG4gICAgcHVibGlzaGVyLmluaXQoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy5zZXR0aW5ncywge1xuICAgICAgcHJvdG9jb2w6ICd3cycsXG4gICAgICBwb3J0OiB0aGlzLnByb3BzLnNldHRpbmdzLnJ0Y3BvcnQsXG4gICAgICBzdHJlYW1OYW1lOiB0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTEsXG4gICAgICBzdHJlYW1UeXBlOiAnd2VicnRjJ1xuICAgIH0pKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIC8vIEludm9rZSB0aGUgcHVibGlzaCBhY3Rpb25cbiAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnU3RhcnRpbmcgcHVibGlzaCBzZXNzaW9uLi4uJ1xuICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgIH0pXG4gICAgICByZXR1cm4gcHVibGlzaGVyLnB1Ymxpc2goKVxuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9ICdQdWJsaXNoaW5nIHN0YXJ0ZWQuIFlvdVxcJ3JlIExpdmUhJ1xuICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgIH0pXG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgLy8gQSBmYXVsdCBvY2N1cnJlZCB3aGlsZSB0cnlpbmcgdG8gaW5pdGlhbGl6ZSBhbmQgcHVibGlzaCB0aGUgc3RyZWFtLlxuICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgc3RhdGUuc3RhdHVzID0gYEVSUk9SOiAke2pzb25FcnJvcn1gXG4gICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgfSlcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFtQdWJsaXNoZXJGaWx0ZXJzVGVzdF0gOjogRXJyb3IgLSAke2pzb25FcnJvcn1gKVxuICAgIH0pXG5cbiAgfVxuXG4gIHVucHVibGlzaCAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgdmlldyA9IGNvbXAuc3RhdGUudmlld1xuICAgICAgY29uc3QgcHVibGlzaGVyID0gY29tcC5zdGF0ZS5wdWJsaXNoZXJcbiAgICAgIGlmIChwdWJsaXNoZXIpIHtcbiAgICAgICAgcHVibGlzaGVyLnVucHVibGlzaCgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdmlldy52aWV3LnNyYyA9ICcnXG4gICAgICAgICAgICBwdWJsaXNoZXIuc2V0Vmlldyh1bmRlZmluZWQpXG4gICAgICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICAgICAgc3RhdGUucHVibGlzaGVyID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnZpZXcgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWRDYW1lcmEgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaGVyRmlsdGVyc1Rlc3RdIDo6IFVubW91bnQgRXJyb3IgPSAke2pzb25FcnJvcn1gKVxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCBwdWIgPSB0aGlzLnB1Ymxpc2guYmluZCh0aGlzKVxuICAgIHRoaXMucHJldmlldygpXG4gICAgICAudGhlbihwdWIpXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbUHVibGlzaGVyRmlsdGVyVGVzdF0gOjogRXJyb3IgLSBDb3VsZCBub3Qgc3RhcnQgcHVibGlzaGluZyBzZXNzaW9uLicpXG4gICAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIHRoaXMudW5wdWJsaXNoKClcbiAgfVxuXG4gIG9uRmlsdGVyU2VsZWN0ICgpIHtcbiAgICBjb25zdCBzZWxlY3RlZEZpbHRlciA9IHRoaXMuX2ZpbHRlclNlbGVjdC52YWx1ZVxuICAgIGxldCBjbGFzc0xpc3QgPSBzZWxlY3RlZEZpbHRlciA9PT0gRklMVEVSX1NFTEVDVCA/ICcnIDogc2VsZWN0ZWRGaWx0ZXJcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnZpZGVvQ2xhc3NMaXN0ID0gY2xhc3NMaXN0XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBsYWJlbFN0eWxlID0ge1xuICAgICAgJ21hcmdpbi1yaWdodCc6ICcwLjVyZW0nXG4gICAgfVxuICAgIGNvbnN0IGZpbHRlclNlbGVjdEZpZWxkID0ge1xuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnI2ZmZmZmZicsXG4gICAgICAncGFkZGluZyc6ICcwLjhyZW0nXG4gICAgfVxuICAgIGNvbnN0IHZpZGVvQ2xhc3NMaXN0ID0gdGhpcy5zdGF0ZS52aWRlb0NsYXNzTGlzdC5jb25jYXQoWyd2aWRlby1lbGVtZW50J10pXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5QdWJsaXNoZXIgRmlsdGVycyBUZXN0PC9oMT5cbiAgICAgICAgPGhyIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPjxlbT5zdHJlYW08L2VtPjoge3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX08L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluc3RydWN0aW9ucy1ibG9ja1wiPlxuICAgICAgICAgIDxwPlRvIGJlZ2luIHRoaXMgdGVzdCwgb25jZSBzdHJlYW1pbmcgaGFzIHN0YXJ0ZWQsIHNlbGVjdCBhIGZpbHRlciB0byBhcHBseTo8L3A+XG4gICAgICAgICAgPHAgc3R5bGU9e2ZpbHRlclNlbGVjdEZpZWxkfT5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmaWx0ZXItc2VsZWN0XCIgc3R5bGU9e2xhYmVsU3R5bGV9PkNhbWVyYSBGaWx0ZXI6PC9sYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3QgcmVmPXtjID0+IHRoaXMuX2ZpbHRlclNlbGVjdCA9IGN9XG4gICAgICAgICAgICAgIGlkPVwiZmlsdGVyLXNlbGVjdFwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmlsdGVyU2VsZWN0LmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5maWx0ZXJzLm1hcChmaWx0ZXIgPT5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtmaWx0ZXJ9PntmaWx0ZXJ9PC9vcHRpb24+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJjZW50ZXJlZCBwdWJsaXNoLXN0YXR1cy1maWVsZFwiPlNUQVRVUzoge3RoaXMuc3RhdGUuc3RhdHVzfTwvcD5cbiAgICAgICAgPGRpdiByZWY9e2MgPT4gdGhpcy5fdmlkZW9Db250YWluZXIgPSBjfVxuICAgICAgICAgIGlkPVwidmlkZW8tY29udGFpbmVyXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlxuICAgICAgICAgIDx2aWRlbyByZWY9e2MgPT4gdGhpcy5fcmVkNVByb1B1Ymxpc2hlciA9IGN9XG4gICAgICAgICAgICBpZD1cInJlZDVwcm8tcHVibGlzaGVyXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17dmlkZW9DbGFzc0xpc3R9XG4gICAgICAgICAgICBjb250cm9scyBhdXRvcGxheSBkaXNhYmxlZD48L3ZpZGVvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblB1Ymxpc2hlckZpbHRlcnNUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVyRmlsdGVyc1Rlc3RcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3B1Ymxpc2gvUHVibGlzaGVyRmlsdGVyc1Rlc3QuanNcbiAqKi8iLCIvKiBnbG9iYWwgcmVkNXByb3NkayAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuLy8gaW1wb3J0IHJlZDVwcm9zZGsgZnJvbSAncmVkNXByby1zZGsnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBhdXRvQmluZCBmcm9tICdyZWFjdC1jbGFzcy9hdXRvQmluZCdcbmltcG9ydCBQdWJsaXNoZXJTdGF0dXMgZnJvbSAnLi4vUHVibGlzaGVyU3RhdHVzJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi4vLi4vQmFja0xpbmsnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY2xhc3MgUHVibGlzaGVyRmFpbG92ZXJUZXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICBhdXRvQmluZCh0aGlzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWV3OiB1bmRlZmluZWQsXG4gICAgICBwdWJsaXNoZXI6IHVuZGVmaW5lZCxcbiAgICAgIHNlbGVjdGVkUHVibGlzaGVyVHlwZTogdW5kZWZpbmVkLFxuICAgICAgc3RhdHVzRXZlbnQ6IHVuZGVmaW5lZFxuICAgIH1cbiAgICB0aGlzLl9wdWJsaXNoZXJFbnRyeSA9IHVuZGVmaW5lZFxuICB9XG5cbiAgcHJldmlldyAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IG5ldyByZWQ1cHJvc2RrLlJlZDVQcm9QdWJsaXNoZXIoKVxuICAgICAgY29uc3QgdmlldyA9IG5ldyByZWQ1cHJvc2RrLlB1Ymxpc2hlclZpZXcoJ3JlZDVwcm8tcHVibGlzaGVyJylcbiAgICAgIHZpZXcuYXR0YWNoUHVibGlzaGVyKHB1Ymxpc2hlcilcblxuICAgICAgLy8gRXN0YWJsaXNoIGV2ZW50IGhhbmRsaW5nLlxuICAgICAgdGhpcy5fcHVibGlzaGVyRW50cnkgPSBwdWJsaXNoZXJcbiAgICAgIHRoaXMuX3B1Ymxpc2hlckVudHJ5Lm9uKCcqJywgdGhpcy5oYW5kbGVQdWJsaXNoZXJFdmVudClcblxuICAgICAgY29uc3QgcnRjQ29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy5zZXR0aW5ncywge1xuICAgICAgICBwcm90b2NvbDogJ3dzJyxcbiAgICAgICAgcG9ydDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ydGNwb3J0LFxuICAgICAgICBzdHJlYW1OYW1lOiB0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTEsXG4gICAgICAgIHN0cmVhbVR5cGU6ICd3ZWJydGMnXG4gICAgICB9KVxuICAgICAgY29uc3QgcnRtcENvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuc2V0dGluZ3MsIHtcbiAgICAgICAgcHJvdG9jb2w6ICdydG1wJyxcbiAgICAgICAgcG9ydDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ydG1wcG9ydCxcbiAgICAgICAgc3RyZWFtTmFtZTogdGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xLFxuICAgICAgICBzd2Y6ICdsaWIvcmVkNXByby9yZWQ1cHJvLXB1Ymxpc2hlci5zd2YnXG4gICAgICB9KVxuICAgICAgY29uc3QgcHVibGlzaE9yZGVyID0gdGhpcy5wcm9wcy5zZXR0aW5ncy5wdWJsaXNoZXJGYWlsb3Zlck9yZGVyLnNwbGl0KCcsJykubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS50cmltKClcbiAgICAgIH0pXG5cbiAgICAgIHB1Ymxpc2hlci5zZXRQdWJsaXNoT3JkZXIocHVibGlzaE9yZGVyKVxuICAgICAgICAuaW5pdCh7XG4gICAgICAgICAgcnRjOiBydGNDb25maWcsXG4gICAgICAgICAgcnRtcDogcnRtcENvbmZpZ1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoc2VsZWN0ZWRQdWJsaXNoZXIpID0+IHtcbiAgICAgICAgICAvLyBJbnZva2UgdGhlIHB1Ymxpc2ggYWN0aW9uXG4gICAgICAgICAgY29uc3QgdHlwZSA9IHNlbGVjdGVkUHVibGlzaGVyID8gc2VsZWN0ZWRQdWJsaXNoZXIuZ2V0VHlwZSgpIDogdW5kZWZpbmVkXG4gICAgICAgICAgaWYgKHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gcHVibGlzaGVyLnB1Ymxpc2hUeXBlcy5SVEMpIHtcbiAgICAgICAgICAgIGNvbnN0IGdtZCA9IG5hdmlnYXRvci5tZWRpYURldmljZSB8fCBuYXZpZ2F0b3JcbiAgICAgICAgICAgIGdtZC5nZXRVc2VyTWVkaWEoe1xuICAgICAgICAgICAgICBhdWRpbzogIWNvbXAucHJvcHMuc2V0dGluZ3MuYXVkaW8gPyBmYWxzZSA6IHRydWUsXG4gICAgICAgICAgICAgIHZpZGVvOiAhY29tcC5wcm9wcy5zZXR0aW5ncy52aWRlbyA/IGZhbHNlIDogdHJ1ZVxuICAgICAgICAgICAgfSwgbWVkaWEgPT4ge1xuXG4gICAgICAgICAgICAgIC8vIFVwb24gYWNjZXNzIG9mIHVzZXIgbWVkaWEsXG4gICAgICAgICAgICAgIC8vIDEuIEF0dGFjaCB0aGUgc3RyZWFtIHRvIHRoZSBwdWJsaXNoZXIuXG4gICAgICAgICAgICAgIC8vIDIuIFNob3cgdGhlIHN0cmVhbSBhcyBwcmV2aWV3IGluIHZpZXcgaW5zdGFuY2UuXG4gICAgICAgICAgICAgIHNlbGVjdGVkUHVibGlzaGVyLmF0dGFjaFN0cmVhbShtZWRpYSlcbiAgICAgICAgICAgICAgdmlldy5wcmV2aWV3KG1lZGlhLCB0cnVlKVxuXG4gICAgICAgICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHNlbGVjdGVkUHVibGlzaGVyXG4gICAgICAgICAgICAgICAgc3RhdGUudmlldyA9IHZpZXdcbiAgICAgICAgICAgICAgICBzdGF0ZS5zZWxlY3RlZFB1Ymxpc2hlclR5cGUgPSB0eXBlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaGVyRmFpbG92ZXJUZXN0XSA6OiBFcnJvciAtICR7ZXJyb3J9YClcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICAgICAgc3RhdGUucHVibGlzaGVyID0gc2VsZWN0ZWRQdWJsaXNoZXJcbiAgICAgICAgICAgICAgc3RhdGUudmlldyA9IHZpZXdcbiAgICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWRQdWJsaXNoZXJUeXBlID0gdHlwZVxuICAgICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzZWxlY3RlZFB1Ymxpc2hlciA/IHJlc29sdmUoKSA6IHJlamVjdCgnQ291bGQgbm90IGZpbmQgcHVibGlzaGVyLicpXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEVuZCBpZi9jbGF1c2UgZm9yIHB1Ymxpc2hlciB0eXBlLlxuICAgICAgICB9KVxuICAgICAgICAvLyBFbmQgUHJvbWlzZSBkZWNsYXJhdGlvbi5cbiAgICAgIH0pXG4gIH1cblxuICBwdWJsaXNoICgpIHtcbiAgICBjb25zdCBwdWJsaXNoZXIgPSB0aGlzLnN0YXRlLnB1Ymxpc2hlclxuICAgIC8vIEluaXRpYWxpemVcbiAgICBwdWJsaXNoZXIucHVibGlzaCgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbUHVibGlzaGVyRmFpbG92ZXJUZXN0XSA6OiBQdWJsaXNoaW5nLicpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgLy8gQSBmYXVsdCBvY2N1cnJlZCB3aGlsZSB0cnlpbmcgdG8gaW5pdGlhbGl6ZSBhbmQgcHVibGlzaCB0aGUgc3RyZWFtLlxuICAgICAgICBjb25zdCBqc29uRXJyb3IgPSB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnID8gZXJyb3IgOiBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgMilcbiAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hlckZhaWxvdmVyVGVzdF0gOjogRXJyb3IgLSAke2pzb25FcnJvcn1gKVxuICAgICAgfSlcbiAgfVxuXG4gIHVucHVibGlzaCAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgdmlldyA9IGNvbXAuc3RhdGUudmlld1xuICAgICAgY29uc3QgcHVibGlzaGVyID0gY29tcC5zdGF0ZS5wdWJsaXNoZXJcbiAgICAgIGlmIChwdWJsaXNoZXIpIHtcbiAgICAgICAgcHVibGlzaGVyLnVucHVibGlzaCgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdmlldy52aWV3LnNyYyA9ICcnXG4gICAgICAgICAgICBwdWJsaXNoZXIuc2V0Vmlldyh1bmRlZmluZWQpXG4gICAgICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICAgICAgc3RhdGUucHVibGlzaGVyID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnZpZXcgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWRDYW1lcmEgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaEZhaWxvdmVyVGVzdF0gOjogVW5tb3VudCBFcnJvciA9ICR7anNvbkVycm9yfWApXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXNvbHZlKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIGNvbnN0IHB1YiA9IHRoaXMucHVibGlzaC5iaW5kKHRoaXMpXG4gICAgdGhpcy5wcmV2aWV3KClcbiAgICAgIC50aGVuKHB1YilcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFtQdWJsaXNoRmFpbG92ZXJUZXN0XSA6OiBFcnJvciAtIENvdWxkIG5vdCBzdGFydCBwdWJsaXNoaW5nIHNlc3Npb246ICR7ZXJyb3J9YClcbiAgICAgIH0pXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG4gICAgdGhpcy51bnB1Ymxpc2goKVxuICAgIGlmICh0aGlzLl9wdWJsaXNoZXJFbnRyeSkge1xuICAgICAgdGhpcy5fcHVibGlzaGVyRW50cnkub2ZmKCcqJywgdGhpcy5oYW5kbGVQdWJsaXNoZXJFdmVudClcbiAgICAgIHRoaXMuX3B1Ymxpc2hlckVudHJ5ID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUHVibGlzaGVyRXZlbnQgKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXNFdmVudCA9IGV2ZW50XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlB1Ymxpc2hlciBGYWlsb3ZlciBUZXN0PC9oMT5cbiAgICAgICAgPGhyIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPjxlbT5zdHJlYW08L2VtPjoge3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX08L2gyPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJjZW50ZXJlZCBmYWlsb3Zlci1kZXRlY3RlZC1maWVsZFwiPkRldGVjdGVkIFN1cHBvcnRlZCBQdWJsaXNoZXI6IHt0aGlzLnN0YXRlLnNlbGVjdGVkUHVibGlzaGVyVHlwZX08L3A+XG4gICAgICAgIDxQdWJsaXNoZXJTdGF0dXMgZXZlbnQ9e3RoaXMuc3RhdGUuc3RhdHVzRXZlbnR9IC8+XG4gICAgICAgIDxkaXYgcmVmPXtjID0+IHRoaXMuX3ZpZGVvQ29udGFpbmVyID0gY31cbiAgICAgICAgICBpZD1cInZpZGVvLWNvbnRhaW5lclwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5cbiAgICAgICAgICA8dmlkZW8gcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9QdWJsaXNoZXIgPSBjfVxuICAgICAgICAgICAgaWQ9XCJyZWQ1cHJvLXB1Ymxpc2hlclwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ2aWRlby1lbGVtZW50XCJcbiAgICAgICAgICAgIGNvbnRyb2xzIGF1dG9wbGF5IGRpc2FibGVkPjwvdmlkZW8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuUHVibGlzaGVyRmFpbG92ZXJUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVyRmFpbG92ZXJUZXN0XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlckZhaWxvdmVyVGVzdC5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc2tpcE1ldGhvZHMgPSB7XG4gICdjb25zdHJ1Y3Rvcic6IDEsXG4gICdyZW5kZXInOiAxLFxuICAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJzogMSxcbiAgJ2NvbXBvbmVudFdpbGxNb3VudCc6IDEsXG4gICdjb21wb25lbnREaWRNb3VudCc6IDEsXG4gICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJzogMSxcbiAgJ2NvbXBvbmVudFdpbGxVcGRhdGUnOiAxLFxuICAnY29tcG9uZW50RGlkVXBkYXRlJzogMSxcbiAgJ2NvbXBvbmVudFdpbGxVbm1vdW50JzogMVxufVxuXG5mdW5jdGlvbiBhdXRvQmluZChvYmplY3QsIGZpbHRlcil7XG4gIHZhciBwcm90byA9IG9iamVjdC5jb25zdHJ1Y3Rvci5wcm90b3R5cGVcblxuICB2YXIgZmlsdGVyRm4gPSB0eXBlb2YgZmlsdGVyID09ICdmdW5jdGlvbicgP1xuICAgIGZpbHRlcjpcbiAgICBmaWx0ZXIgJiYgdHlwZW9mIGZpbHRlciA9PSAnb2JqZWN0JyA/XG4gICAgICBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuICFmaWx0ZXJba2V5XSAmJiBza2lwTWV0aG9kc1trZXldICE9PSAxICYmIHR5cGVvZiBwcm90b1trZXldID09PSAnZnVuY3Rpb24nXG4gICAgICB9OlxuICAgICAgZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiBza2lwTWV0aG9kc1trZXldICE9PSAxICYmIHR5cGVvZiBwcm90b1trZXldID09PSAnZnVuY3Rpb24nXG4gICAgICB9XG5cbiAgdmFyIG5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pLmZpbHRlcihmaWx0ZXJGbilcblxuICBuYW1lcy5wdXNoKCdzZXRTdGF0ZScpXG4gIG5hbWVzLmZvckVhY2goZnVuY3Rpb24oa2V5KXtcbiAgICBvYmplY3Rba2V5XSA9IG9iamVjdFtrZXldLmJpbmQob2JqZWN0KVxuICB9KVxuXG4gIHJldHVybiBvYmplY3Rcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gYXV0b0JpbmRcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtY2xhc3MvYXV0b0JpbmQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlZDVQcm9QdWJsaXNoZXIgZnJvbSAnLi4vLi4vUmVkNVByb1B1Ymxpc2hlcicgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFB1Ymxpc2hlclN0YXR1cyBmcm9tICcuLi9QdWJsaXNoZXJTdGF0dXMnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBCYWNrTGluayBmcm9tICcuLi8uLi9CYWNrTGluaycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jbGFzcyBQdWJsaXNoZXJJbWFnZUNhcHR1cmVUZXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2FwdHVyZUZpbGxlZDogZmFsc2UsXG4gICAgICBzdGF0dXNFdmVudDogdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgb25WaWRlb0ltYWdlQ2FwdHVyZSAoKSB7XG4gICAgY29uc3QgdmlkZW9FbGVtZW50ID0gdGhpcy5fcmVkNVByb1B1Ymxpc2hlci5nZXRQdWJsaXNoZXJFbGVtZW50KClcbiAgICB0aGlzLmNsZWFyQ2FudmFzKHZpZGVvRWxlbWVudClcbiAgICB0aGlzLmRyYXdPbkNhbnZhcyh2aWRlb0VsZW1lbnQpXG4gIH1cblxuICBjbGVhckNhbnZhcyAodGFyZ2V0RWxlbWVudCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuX2NhcHR1cmVDYW52YXNcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI2FhYWFhYVwiXG4gICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoLCB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodClcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLmNhcHR1cmVGaWxsZWQgPSBmYWxzZVxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIGRyYXdPbkNhbnZhcyAodGFyZ2V0RWxlbWVudCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuX2NhcHR1cmVDYW52YXNcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBjYW52YXMud2lkdGggPSB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoXG4gICAgY2FudmFzLmhlaWdodCA9IHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGFyZ2V0RWxlbWVudCwgMCwgMCwgdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCwgdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQpXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5jYXB0dXJlRmlsbGVkID0gdHJ1ZVxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIGhhbmRsZVB1Ymxpc2hlckV2ZW50IChldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzRXZlbnQgPSBldmVudFxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIHB1Ymxpc2hlckVzdGFibGlzaGVkIChwdWJsaXNoZXIsIHZpZXcpIHtcbiAgICBjb25zb2xlLmxvZyhgW1B1Ymxpc2hlckltYWdlQ2FwdHVyZVRlc3RdIHB1Ymxpc2hlcjogJHtwdWJsaXNoZXJ9LCAke3ZpZXd9YClcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMuX3JlZDVQcm9QdWJsaXNoZXIuZ2V0UHVibGlzaGVyRWxlbWVudCgpKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB2aXNpYmxlID0gdGhpcy5zdGF0ZS5jYXB0dXJlRmlsbGVkID8gJ2hpZGRlbicgOiAndmlzaWJsZSdcbiAgICBjb25zdCBjYXB0dXJlVGV4dFN0eWxlID0ge1xuICAgICAgJ3Zpc2liaWxpdHknOiB2aXNpYmxlLFxuICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcbiAgICAgICdwYWRkaW5nJzogJzFyZW0nLFxuICAgICAgJ2NvbG9yJzogJyMzMzMzMzMnLFxuICAgICAgJ3dpZHRoJzogJzEwMCUnLFxuICAgICAgJ3RleHQtYWxpZ24nOiAnY2VudGVyJ1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlB1Ymxpc2hlciBJbWFnZSBDYXB0dXJlIFRlc3Q8L2gxPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+PGVtPnN0cmVhbTwvZW0+OiB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfTwvaDI+XG4gICAgICAgIDxQdWJsaXNoZXJTdGF0dXMgZXZlbnQ9e3RoaXMuc3RhdGUuc3RhdHVzRXZlbnR9IC8+XG4gICAgICAgIDxkaXYgb25DbGljaz17dGhpcy5vblZpZGVvSW1hZ2VDYXB0dXJlLmJpbmQodGhpcyl9PlxuICAgICAgICAgIDxSZWQ1UHJvUHVibGlzaGVyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJjZW50ZXJlZFwiXG4gICAgICAgICAgICBtZWRpYUNsYXNzTmFtZT1cInZpZGVvLWVsZW1lbnRcIlxuICAgICAgICAgICAgc2hvd0NvbnRyb2xzPXt0cnVlfVxuICAgICAgICAgICAgY29uZmlndXJhdGlvbj17dGhpcy5wcm9wcy5zZXR0aW5nc31cbiAgICAgICAgICAgIHN0cmVhbU5hbWU9e3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX1cbiAgICAgICAgICAgIG9uUHVibGlzaGVyRXN0YWJsaXNoZWQ9e3RoaXMucHVibGlzaGVyRXN0YWJsaXNoZWQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uUHVibGlzaGVyRXZlbnQ9e3RoaXMuaGFuZGxlUHVibGlzaGVyRXZlbnQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvUHVibGlzaGVyID0gY31cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+XG4gICAgICAgICAgPHAgc3R5bGU9e2NhcHR1cmVUZXh0U3R5bGV9PjxzcGFuPkNsaWNrIHZpZGVvIHRvIGNhcHR1cmUgaW1hZ2UuPC9zcGFuPjxici8+PHNwYW4+WW91ciBJbWFnZSB3aWxsIGFwcGVhciBoZXJlLjwvc3Bhbj48L3A+XG4gICAgICAgICAgPGNhbnZhcyByZWY9e2MgPT4gdGhpcy5fY2FwdHVyZUNhbnZhcyA9IGN9PjwvY2FudmFzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblB1Ymxpc2hlckltYWdlQ2FwdHVyZVRlc3QucHJvcFR5cGVzID0ge1xuICBzZXR0aW5nczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbkJhY2tDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoZXJJbWFnZUNhcHR1cmVUZXN0XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlckltYWdlQ2FwdHVyZVRlc3QuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWQ1UHJvUHVibGlzaGVyIGZyb20gJy4uLy4uL1JlZDVQcm9QdWJsaXNoZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBQdWJsaXNoZXJTdGF0dXMgZnJvbSAnLi4vUHVibGlzaGVyU3RhdHVzJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi4vLi4vQmFja0xpbmsnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY2xhc3MgUHVibGlzaGVyU3RyZWFtTWFuYWdlclRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0YXJnZXRIb3N0OiB1bmRlZmluZWQsXG4gICAgICBzdGF0dXNFdmVudDogdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgcmVxdWVzdE9yaWdpbiAoKSB7XG4gICAgY29uc3QgaG9zdCA9IHRoaXMucHJvcHMuc2V0dGluZ3MuaG9zdFxuICAgIGNvbnN0IGFwcCA9IHRoaXMucHJvcHMuc2V0dGluZ3MuYXBwXG4gICAgY29uc3Qgc3RyZWFtTmFtZSA9IHRoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMVxuICAgIGNvbnN0IHVybCA9IGBodHRwOi8vJHtob3N0fTo1MDgwL3N0cmVhbW1hbmFnZXIvYXBpLzEuMC9ldmVudC8ke2FwcH0vJHtzdHJlYW1OYW1lfT9hY3Rpb249YnJvYWRjYXN0YFxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzID0gYFJlcXVlc3RpbmcgT3JpZ2luIGZyb20gJHt1cmx9Li4uYFxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZmV0Y2godXJsKVxuICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIikgJiZcbiAgICAgICAgICAgIHJlcy5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJhcHBsaWNhdGlvbi9qc29uXCIpID49IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDb3VsZCBub3QgcHJvcGVybHkgcGFyc2UgcmVzcG9uc2UuJylcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgIHJlc29sdmUoanNvbi5zZXJ2ZXJBZGRyZXNzKVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFtQdWJsaXNoZXJTdHJlYW1NYW5hZ2VyVGVzdF0gOjogRXJyb3IgLSBDb3VsZCBub3QgcmVxdWVzdCBPcmlnaW4gSVAgZnJvbSBTdHJlYW0gTWFuYWdlci4gJHtqc29uRXJyb3J9YClcbiAgICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIHRoaXMucmVxdWVzdE9yaWdpbigpXG4gICAgICAudGhlbihob3N0ID0+IHtcbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUudGFyZ2V0SG9zdCA9IGhvc3RcbiAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnQ291bGQgbm90IHN0YXJ0IGEgYnJvYWRjYXN0IHNlc3Npb24uJ1xuICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBqc29uRXJyb3IgPSB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnID8gZXJyb3IgOiBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgMilcbiAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0XSA6OiBFcnJvciAtICR7anNvbkVycm9yfWApXG4gICAgICB9KVxuICB9XG5cbiAgaGFuZGxlUHVibGlzaGVyRXZlbnQgKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXNFdmVudCA9IGV2ZW50XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgcHVibGlzaGVyRXN0YWJsaXNoZWQgKHB1Ymxpc2hlciwgdmlldykge1xuICAgIGNvbnNvbGUubG9nKGBbUHVibGlzaGVyU3RyZWFtTWFuYWdlclRlc3RdIHB1Ymxpc2hlcjogJHtwdWJsaXNoZXJ9LCAke3ZpZXd9YClcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgY2FuUHVibGlzaCA9IHRoaXMuc3RhdGUudGFyZ2V0SG9zdCAhPT0gdW5kZWZpbmVkXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5QdWJsaXNoZXIgU3RyZWFtTWFuYWdlciBUZXN0PC9oMT5cbiAgICAgICAgPGhyIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPjxlbT5zdHJlYW08L2VtPjoge3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX08L2gyPlxuICAgICAgICA8UHVibGlzaGVyU3RhdHVzIGV2ZW50PXt0aGlzLnN0YXRlLnN0YXR1c0V2ZW50fSAvPlxuICAgICAgICA8UmVkNVByb1B1Ymxpc2hlclxuICAgICAgICAgIGNsYXNzTmFtZT1cImNlbnRlcmVkXCJcbiAgICAgICAgICBtZWRpYUNsYXNzTmFtZT1cInZpZGVvLWVsZW1lbnRcIlxuICAgICAgICAgIGNvbmZpZ3VyYXRpb249e3RoaXMucHJvcHMuc2V0dGluZ3N9XG4gICAgICAgICAgc3RyZWFtTmFtZT17dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfVxuICAgICAgICAgIGhvc3Q9e3RoaXMuc3RhdGUudGFyZ2V0SG9zdH1cbiAgICAgICAgICBzaG93Q29udHJvbHM9e3RydWV9XG4gICAgICAgICAgYXV0b1B1Ymxpc2g9e2NhblB1Ymxpc2h9XG4gICAgICAgICAgb25QdWJsaXNoZXJFc3RhYmxpc2hlZD17dGhpcy5wdWJsaXNoZXJFc3RhYmxpc2hlZC5iaW5kKHRoaXMpfVxuICAgICAgICAgIG9uUHVibGlzaGVyRXZlbnQ9e3RoaXMuaGFuZGxlUHVibGlzaGVyRXZlbnQuYmluZCh0aGlzKX1cbiAgICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuUHVibGlzaGVyU3RyZWFtTWFuYWdlclRlc3QucHJvcFR5cGVzID0ge1xuICBzZXR0aW5nczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbkJhY2tDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoZXJTdHJlYW1NYW5hZ2VyVGVzdFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvcHVibGlzaC9QdWJsaXNoZXJTdHJlYW1NYW5hZ2VyVGVzdC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlZDVQcm9TdWJzY3JpYmVyIGZyb20gJy4uLy4uL1JlZDVQcm9TdWJzY3JpYmVyJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgU3Vic2NyaWJlclN0YXR1cyBmcm9tICcuLi9TdWJzY3JpYmVyU3RhdHVzJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi4vLi4vQmFja0xpbmsnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY2xhc3MgU3Vic2NyaWJlclRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0dXNFdmVudDogdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU3Vic2NyaWJlckV2ZW50IChldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzRXZlbnQgPSBldmVudFxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIHN1YnNjcmliZXJFc3RhYmxpc2hlZCAoc3Vic2NyaWJlciwgdmlldykge1xuICAgIGNvbnNvbGUubG9nKGBbU3Vic2NyaWJlclRlc3RdIHN1YnNjcmliZXI6ICR7c3Vic2NyaWJlcn0sICR7dmlld31gKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlN1YnNjcmliZXIgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPFN1YnNjcmliZXJTdGF0dXMgZXZlbnQ9e3RoaXMuc3RhdGUuc3RhdHVzRXZlbnR9IC8+XG4gICAgICAgIDxSZWQ1UHJvU3Vic2NyaWJlclxuICAgICAgICAgIGNsYXNzTmFtZT1cImNlbnRlcmVkXCJcbiAgICAgICAgICBtZWRpYUNsYXNzTmFtZT1cInZpZGVvLWVsZW1lbnRcIlxuICAgICAgICAgIGNvbmZpZ3VyYXRpb249e3RoaXMucHJvcHMuc2V0dGluZ3N9XG4gICAgICAgICAgc3RyZWFtTmFtZT17dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfVxuICAgICAgICAgIGF1dG9QbGF5PXt0cnVlfVxuICAgICAgICAgIHNob3dDb250cm9scz17dHJ1ZX1cbiAgICAgICAgICBvblN1YnNjcmliZXJFc3RhYmxpc2hlZD17dGhpcy5zdWJzY3JpYmVyRXN0YWJsaXNoZWQuYmluZCh0aGlzKX1cbiAgICAgICAgICBvblN1YnNjcmliZXJFdmVudD17dGhpcy5oYW5kbGVTdWJzY3JpYmVyRXZlbnQuYmluZCh0aGlzKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblN1YnNjcmliZXJUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3Vic2NyaWJlclRlc3RcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3N1YnNjcmliZS9TdWJzY3JpYmVyVGVzdC5qc1xuICoqLyIsIi8qIGdsb2JhbCByZWQ1cHJvc2RrICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgcmVkNXByb3NkayBmcm9tICdyZWQ1cHJvLXNkaydcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBkZWZhdWx0Q29uZmlndXJhdGlvbiA9IHtcbiAgcHJvdG9jb2w6ICd3cycsXG4gIHBvcnQ6IDgwODEsXG4gIGFwcDogJ2xpdmUnLFxuICBiYW5kd2lkdGg6IHtcbiAgICBhdWRpbzogNTAsXG4gICAgdmlkZW86IDI1NixcbiAgICBkYXRhOiAzMCAqIDEwMDAgKiAxMDAwXG4gIH1cbn1cblxuY2xhc3MgUmVkNVByb1N1YnNjcmliZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWV3OiB1bmRlZmluZWQsXG4gICAgICBzdWJzY3JpYmVyOiB1bmRlZmluZWQsXG4gICAgICBpbnN0YW5jZUlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwKS50b1N0cmluZygxNilcbiAgICB9XG4gIH1cblxuICBvblN1YnNjcmliZUZhaWwgKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmVycm9yKGBbUmVkNVByb1N1YnNjcmliZXJdIDo6ICR7bWVzc2FnZX1gKVxuICB9XG5cbiAgb25TdWJzY3JpYmVTdWNjZXNzICgpIHtcbiAgfVxuXG4gIG9uVW5zdWJzY3JpYmVGYWlsIChtZXNzYWdlKSB7XG4gICAgY29uc29sZS5lcnJvcihgW1JlZDVQcm9TdWJzY3JpYmVyXSA6OiAke21lc3NhZ2V9YClcbiAgfVxuXG4gIG9uVW5zdWJzY3JpYmVTdWNjZXNzICgpIHtcbiAgfVxuXG4gIG5vdGlmeVN1YnNjcmliZXJFc3RhYmxpc2hlZCAoc3Vic2NyaWJlciwgdmlldykge1xuICAgIGlmICh0aGlzLnByb3BzLm9uU3Vic2NyaWJlckVzdGFibGlzaGVkKSB7XG4gICAgICB0aGlzLnByb3BzLm9uU3Vic2NyaWJlckVzdGFibGlzaGVkKHN1YnNjcmliZXIsIHZpZXcpXG4gICAgfVxuICB9XG5cbiAgc3Vic2NyaWJlICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgcmVkNXByb3Nkay5QbGF5YmFja1ZpZXcoWydyZWQ1cHJvLXN1YnNjcmliZXItdmlkZW8nLCB0aGlzLnN0YXRlLmluc3RhbmNlSWRdLmpvaW4oJy0nKSlcbiAgICBjb25zdCBzdWJzY3JpYmVyID0gbmV3IHJlZDVwcm9zZGsuUlRDU3Vic2NyaWJlcigpXG4gICAgY29uc3Qgb3JpZ0F0dGFjaFN0cmVhbSA9IHZpZXcuYXR0YWNoU3RyZWFtLmJpbmQodmlldylcbiAgICB2aWV3LmF0dGFjaFN0cmVhbSA9IChzdHJlYW0sIGF1dG9wbGF5KSA9PiB7XG4gICAgICBvcmlnQXR0YWNoU3RyZWFtKHN0cmVhbSwgYXV0b3BsYXkpXG4gICAgICB2aWV3LmF0dGFjaFN0cmVhbSA9IG9yaWdBdHRhY2hTdHJlYW1cbiAgICB9XG4gICAgdmlldy5hdHRhY2hTdWJzY3JpYmVyKHN1YnNjcmliZXIpXG5cbiAgICBpZiAodGhpcy5wcm9wcy5vblN1YnNjcmliZXJFdmVudCkge1xuICAgICAgc3Vic2NyaWJlci5vbignKicsIHRoaXMucHJvcHMub25TdWJzY3JpYmVyRXZlbnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3Vic2NyaWJlci5vbignKicsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYFtSZWQ1UHJvU3Vic2NyaWJlcl0gOjogU3Vic2NyaWJlckV2ZW50IC0gJHtldmVudC50eXBlfWApXG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDb25maWd1cmF0aW9uLCB0aGlzLnByb3BzLmNvbmZpZ3VyYXRpb24pXG4gICAgY29uZmlnLnBvcnQgPSBjb25maWcucnRjcG9ydCB8fCBjb25maWcucG9ydFxuICAgIGNvbmZpZy5ob3N0ID0gdGhpcy5wcm9wcy5ob3N0IHx8IGNvbmZpZy5ob3N0XG4gICAgY29uZmlnLnN0cmVhbU5hbWUgPSB0aGlzLnByb3BzLnN0cmVhbU5hbWUgfHwgY29uZmlnLnN0cmVhbU5hbWVcbiAgICBjb25maWcuc3Vic2NyaXB0aW9uSWQgPSAnc3Vic2NyaWJlci0nICsgdGhpcy5zdGF0ZS5pbnN0YW5jZUlkXG5cbiAgICBjb25zb2xlLmxvZygnW1JlZDVQcm9TdWJzY3JpYmVyXSBjb25maWc6OiAnICsgSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKSlcblxuICAgIHN1YnNjcmliZXIuaW5pdChjb25maWcpXG4gICAgICAudGhlbihwbGF5ZXIgPT4ge1xuICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICBzdGF0ZS52aWV3ID0gdmlld1xuICAgICAgICAgIHN0YXRlLnN1YnNjcmliZXIgPSBzdWJzY3JpYmVyXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBwbGF5ZXIucGxheSgpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb21wLm9uU3Vic2NyaWJlU3VjY2VzcygpXG4gICAgICAgIGNvbXAubm90aWZ5U3Vic2NyaWJlckVzdGFibGlzaGVkKHN1YnNjcmliZXIsIHZpZXcpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgIGNvbXAub25TdWJzY3JpYmVGYWlsKGBFcnJvciAtICR7anNvbkVycm9yfWApXG4gICAgfSlcblxuICB9XG5cbiAgdW5zdWJzY3JpYmUgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHZpZXcgPSBjb21wLnN0YXRlLnZpZXdcbiAgICAgIGNvbnN0IHN1YnNjcmliZXIgPSBjb21wLnN0YXRlLnN1YnNjcmliZXJcbiAgICAgIGlmIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHN1YnNjcmliZXIuc3RvcCgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdmlldy52aWV3LnNyYyA9ICcnXG4gICAgICAgICAgICBzdWJzY3JpYmVyLnNldFZpZXcodW5kZWZpbmVkKVxuICAgICAgICAgICAgc3Vic2NyaWJlci5vZmYoJyonLCBjb21wLnByb3BzLm9uU3Vic2NyaWJlckV2ZW50KVxuICAgICAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLnZpZXcgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgc3RhdGUuc3Vic2NyaWJlciA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbXAub25VbnN1YnNjcmliZVN1Y2Nlc3MoKVxuICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgICAgICBjb21wLm9uVW5zdWJzY3JpYmVGYWlsKGBVbm1vdW50IEVycm9yID0gJHtqc29uRXJyb3J9YClcbiAgICAgICAgICAgIHJlamVjdChgQ291bGQgbm90IHVuc3Vic2NyaWJlOiAke2Vycm9yfWApXG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXNvbHZlKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgdHJ5U3Vic2NyaWJlIChhdXRvKSB7XG4gICAgaWYgKGF1dG8pIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlKClcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy50cnlTdWJzY3JpYmUodGhpcy5wcm9wcy5hdXRvU3Vic2NyaWJlKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgY29uc3Qgc3Vic2NyaWJlciA9IHRoaXMuc3RhdGUuc3Vic2NyaWJlclxuICAgIHRoaXMudW5zdWJzY3JpYmUoKVxuICAgIGlmIChzdWJzY3JpYmVyICYmIHRoaXMucHJvcHMub25TdWJzY3JpYmVyRXZlbnQpIHtcbiAgICAgIHN1YnNjcmliZXIub2ZmKCcqJywgdGhpcy5wcm9wcy5vblN1YnNjcmliZXJFdmVudClcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUgKHByZXZQcm9wcykge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgaWYgKHByZXZQcm9wcy5hdXRvU3Vic2NyaWJlICE9PSB0aGlzLnByb3BzLmF1dG9TdWJzY3JpYmUpIHtcbiAgICAgIGNvbnN0IHN1YiA9IHRoaXMudHJ5U3Vic2NyaWJlLmJpbmQodGhpcylcbiAgICAgIGNvbnN0IGF1dG8gPSB0aGlzLnByb3BzLmF1dG9TdWJzY3JpYmVcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgc3ViKGF1dG8pXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29tcC5vblN1YnNjcmliZUZhaWwoYENvdWxkIG5vdCBzdGFydCBhIHN1YnNjcmlwdGlvbiBzZXNzaW9uOiAke2Vycm9yfWApXG4gICAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZ2V0UGxheWJhY2tFbGVtZW50ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVkNVByb1N1YnNjcmliZXJcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgZWxlbWVudElkID0gWydyZWQ1cHJvLXN1YnNjcmliZXItdmlkZW8nLCB0aGlzLnN0YXRlLmluc3RhbmNlSWRdLmpvaW4oJy0nKVxuICAgIGxldCBjbGFzc05hbWVzID0gWydyZWQ1cHJvLXN1YnNjcmliZXItdmlkZW8tY29udGFpbmVyJ11cbiAgICBpZiAodGhpcy5wcm9wcy5jbGFzc05hbWUpIHtcbiAgICAgIGNsYXNzTmFtZXMgPSBjbGFzc05hbWVzLmNvbmNhdCh0aGlzLnByb3BzLmNsYXNzTmFtZSlcbiAgICB9XG4gICAgbGV0IG1lZGlhQ2xhc3NOYW1lcyA9IFsncmVkNXByby1zdWJzY3JpYmVyLXZpZGVvJ11cbiAgICBpZiAodGhpcy5wcm9wcy5tZWRpYUNsYXNzTmFtZSkge1xuICAgICAgbWVkaWFDbGFzc05hbWVzID0gbWVkaWFDbGFzc05hbWVzLmNvbmNhdCh0aGlzLnByb3BzLm1lZGlhQ2xhc3NOYW1lKVxuICAgIH1cbiAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMucHJvcHMuYXVkaW9Pbmx5XG4gICAgICA/IChcbiAgICAgICAgPGF1ZGlvIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvU3Vic2NyaWJlciA9IGN9XG4gICAgICAgICAgaWQ9e2VsZW1lbnRJZH1cbiAgICAgICAgICBjbGFzc05hbWU9e21lZGlhQ2xhc3NOYW1lcy5qb2luKCcgJyl9XG4gICAgICAgICAgY29udHJvbHM9e3RoaXMucHJvcHMuc2hvd0NvbnRyb2xzfVxuICAgICAgICAgIGF1dG9wbGF5PXt0aGlzLnByb3BzLmF1dG9QbGF5fT5cbiAgICAgICAgPC9hdWRpbz5cbiAgICAgIClcbiAgICAgIDogKFxuICAgICAgICA8dmlkZW8gcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9TdWJzY3JpYmVyID0gY31cbiAgICAgICAgICBpZD17ZWxlbWVudElkfVxuICAgICAgICAgIGNsYXNzTmFtZT17bWVkaWFDbGFzc05hbWVzLmpvaW4oJyAnKX1cbiAgICAgICAgICBjb250cm9scz17dGhpcy5wcm9wcy5zaG93Q29udHJvbHN9XG4gICAgICAgICAgYXV0b3BsYXk9e3RoaXMucHJvcHMuYXV0b1BsYXl9PlxuICAgICAgICA8L3ZpZGVvPlxuICAgICAgKVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHJlZj17YyA9PiB0aGlzLl92aWRlb0NvbnRhaW5lciA9IGN9XG4gICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuam9pbignICcpfT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuUmVkNVByb1N1YnNjcmliZXIucHJvcFR5cGVzID0ge1xuICBhdXRvU3Vic2NyaWJlOiBQcm9wVHlwZXMuYm9vbGVhbixcbiAgYXV0b1BsYXk6IFByb3BUeXBlcy5ib29sZWFuLFxuICBzaG93Q29udHJvbHM6IFByb3BUeXBlcy5ib29sZWFuLFxuICBhdWRpb09ubHk6IFByb3BUeXBlcy5ib29sZWFuLFxuICBob3N0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzdHJlYW1OYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNvbmZpZ3VyYXRpb246IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uU3Vic2NyaWJlckVzdGFibGlzaGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25TdWJzY3JpYmVyRXZlbnQ6IFByb3BUeXBlcy5mdW5jXG59XG5cblJlZDVQcm9TdWJzY3JpYmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgYXV0b1N1YnNjcmliZTogdHJ1ZSxcbiAgYXV0b1BsYXk6IHRydWUsXG4gIHNob3dDb250cm9sczogdHJ1ZSxcbiAgYXVkaW9Pbmx5OiBmYWxzZSxcbiAgaG9zdDogdW5kZWZpbmVkLFxuICBzdHJlYW1OYW1lOiB1bmRlZmluZWQsXG4gIGNvbmZpZ3VyYXRpb246IGRlZmF1bHRDb25maWd1cmF0aW9uXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlZDVQcm9TdWJzY3JpYmVyXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvUmVkNVByb1N1YnNjcmliZXIuanNcbiAqKi8iLCIvKiBnbG9iYWwgcmVkNXByb3NkayAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuLy8gaW1wb3J0IHJlZDVwcm9zZGsgZnJvbSAncmVkNXByby1zZGsnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcblxuY2xhc3MgU3Vic2NyaWJlclN0YXR1cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHN0YXR1czogJ09uIGhvbGQuJ1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVN0YXR1c0Zyb21FdmVudCAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhgW1N1YnNjcmliZXJTdGF0dXNdIGV2ZW50OiAke2V2ZW50LnR5cGV9YClcbiAgICBjb25zdCBzdWJUeXBlcyA9IHJlZDVwcm9zZGsuU3Vic2NyaWJlckV2ZW50VHlwZXNcbiAgICBjb25zdCBydGNUeXBlcyA9IHJlZDVwcm9zZGsuUlRDU3Vic2NyaWJlckV2ZW50VHlwZXNcbiAgICBsZXQgYW5zd2VyXG4gICAgbGV0IGNhbmRpZGF0ZVxuICAgIGxldCBzdGF0dXMgPSB0aGlzLnN0YXRlLnN0YXR1c1xuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgY2FzZSBzdWJUeXBlcy5DT05ORUNUX1NVQ0NFU1M6XG4gICAgICAgIHN0YXR1cyA9ICdDb25uZWN0aW9uIGVzdGFibGlzaGVkLi4uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBzdWJUeXBlcy5DT05ORUNUX0ZBSUxVUkU6XG4gICAgICAgIHN0YXR1cyA9ICdFcnJvciAtIENvdWxkIG5vdCBlc3RhYmxpc2ggY29ubmVjdGlvbi4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIHN1YlR5cGVzLlNVQlNDUklCRV9TVEFSVDpcbiAgICAgICAgc3RhdHVzID0gJ1N0YXJ0ZWQgc3Vic2NyaWJpbmcgc2Vzc2lvbi4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIHN1YlR5cGVzLlNVQlNDUklCRV9GQUlMOlxuICAgICAgICBzdGF0dXMgPSAnRXJyb3IgLSBDb3VsZCBub3Qgc3RhcnQgYSBzdWJzY3JpYmluZyBzZXNzaW9uLidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2Ugc3ViVHlwZXMuU1VCU0NSSUJFX0lOVkFMSURfTkFNRTpcbiAgICAgICAgc3RhdHVzID0gJ0Vycm9yIC0gU3RyZWFtIG5hbWUgbm90IGluIHVzZS4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIHJ0Y1R5cGVzLk9GRkVSX1NUQVJUOlxuICAgICAgICBzdGF0dXMgPSAnQmVnaW4gb2ZmZXIuLi4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIHJ0Y1R5cGVzLk9GRkVSX0VORDpcbiAgICAgICAgc3RhdHVzID0gJ09mZmVyIGFjY2VwdGVkLi4uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBydGNUeXBlcy5BTlNXRVJfU1RBUlQ6XG4gICAgICAgIHN0YXR1cyA9ICdTZW5kaW5nIGFuc3dlci4uLidcbiAgICAgICAgYW5zd2VyID0gSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGF0YSwgbnVsbCwgMilcbiAgICAgICAgY29uc29sZS5sb2coYFtTdWJzY3JpYmVyU3RhdHVzXSAke2V2ZW50LnR5cGV9OiAke2Fuc3dlcn1gKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBydGNUeXBlcy5BTlNXRVJfRU5EOlxuICAgICAgICBzdGF0dXMgPSAnQW5zd2VyIHJlY2VpdmVkLi4uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBydGNUeXBlcy5DQU5ESURBVEVfU1RBUlQ6XG4gICAgICAgIHN0YXR1cyA9ICdTZW5kaW5nIGNhbmRpZGF0ZS4uLidcbiAgICAgICAgY2FuZGlkYXRlID0gSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGF0YSwgbnVsbCwgMilcbiAgICAgICAgY29uc29sZS5sb2coYFtTdWJzY3JpYmVyU3RhdHVzXSAke2V2ZW50LnR5cGV9OiAke2NhbmRpZGF0ZX1gKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBydGNUeXBlcy5DQU5ESURBVEVfRU5EOlxuICAgICAgICBzdGF0dXMgPSAnQ2FuZGlkYXRlIHJlY2VpdmVkLi4uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBydGNUeXBlcy5JQ0VfVFJJQ0tMRV9DT01QTEVURTpcbiAgICAgICAgc3RhdHVzID0gJ05lZ290aWF0aW9uIGNvbXBsZXRlLiBXYWl0aW5nIFN1YnNjcmlwdGlvbiBTdGFydC4uLidcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXMgPSBzdGF0dXNcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5ldmVudCAhPT0gbmV4dFByb3BzLmV2ZW50ICYmIG5leHRQcm9wcy5ldmVudCkge1xuICAgICAgdGhpcy51cGRhdGVTdGF0dXNGcm9tRXZlbnQobmV4dFByb3BzLmV2ZW50KVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxwIGNsYXNzTmFtZT1cImNlbnRlcmVkIHN0YXR1cy1maWVsZFwiPlNUQVRVUzoge3RoaXMuc3RhdGUuc3RhdHVzfTwvcD5cbiAgICApXG4gIH1cblxufVxuXG5TdWJzY3JpYmVyU3RhdHVzLnByb3BUeXBlcyA9IHtcbiAgZXZlbnQ6IFByb3BUeXBlcy5vYmplY3Rcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3Vic2NyaWJlclN0YXR1c1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvU3Vic2NyaWJlclN0YXR1cy5qc1xuICoqLyIsIi8qIGdsb2JhbCByZWQ1cHJvc2RrICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgcmVkNXByb3NkayBmcm9tICdyZWQ1cHJvLXNkaydcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGF1dG9CaW5kIGZyb20gJ3JlYWN0LWNsYXNzL2F1dG9CaW5kJ1xuaW1wb3J0IFN1YnNjcmliZXJTdGF0dXMgZnJvbSAnLi4vU3Vic2NyaWJlclN0YXR1cycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uLy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIFN1YnNjcmliZXJGYWlsb3ZlclRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIGF1dG9CaW5kKHRoaXMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpZXc6IHVuZGVmaW5lZCxcbiAgICAgIHN1YnNjcmliZXI6IHVuZGVmaW5lZCxcbiAgICAgIHN0YXR1c0V2ZW50OiB1bmRlZmluZWRcbiAgICB9XG4gICAgdGhpcy5fc3Vic2NyaWJlckVudHJ5ID0gdW5kZWZpbmVkXG4gIH1cblxuICBzdWJzY3JpYmUgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgY29uc3QgdmlldyA9IG5ldyByZWQ1cHJvc2RrLlBsYXliYWNrVmlldygncmVkNXByby1zdWJzY3JpYmVyJylcbiAgICBjb25zdCBzdWJzY3JpYmVyID0gbmV3IHJlZDVwcm9zZGsuUmVkNVByb1N1YnNjcmliZXIoKVxuICAgIGNvbnN0IHN1YnNjcmliZU9yZGVyID0gdGhpcy5wcm9wcy5zZXR0aW5ncy5zdWJzY3JpYmVyRmFpbG92ZXJPcmRlci5zcGxpdCgnLCcpLm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0udHJpbSgpXG4gICAgfSlcblxuICAgIHRoaXMuX3N1YnNjcmliZXJFbnRyeSA9IHN1YnNjcmliZXJcbiAgICB0aGlzLl9zdWJzY3JpYmVyRW50cnkub24oJyonLCB0aGlzLmhhbmRsZVN1YnNjcmliZXJFdmVudClcblxuICAgIGNvbnN0IG9yaWdBdHRhY2hTdHJlYW0gPSB2aWV3LmF0dGFjaFN0cmVhbS5iaW5kKHZpZXcpXG4gICAgdmlldy5hdHRhY2hTdHJlYW0gPSAoc3RyZWFtLCBhdXRvcGxheSkgPT4ge1xuICAgICAgb3JpZ0F0dGFjaFN0cmVhbShzdHJlYW0sIGF1dG9wbGF5KVxuICAgICAgdmlldy5hdHRhY2hTdHJlYW0gPSBvcmlnQXR0YWNoU3RyZWFtXG4gICAgfVxuXG4gICAgY29uc3QgcnRjQ29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy5zZXR0aW5ncywge1xuICAgICAgcHJvdG9jb2w6ICd3cycsXG4gICAgICBwb3J0OiB0aGlzLnByb3BzLnNldHRpbmdzLnJ0Y3BvcnQsXG4gICAgICBzdWJzY3JpcHRpb25JZDogJ3N1YnNjcmliZXItJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KSxcbiAgICAgIHN0cmVhbU5hbWU6IHRoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMSxcbiAgICAgIGJhbmR3aWR0aDoge1xuICAgICAgICBhdWRpbzogNTAsXG4gICAgICAgIHZpZGVvOiAyNTYsXG4gICAgICAgIGRhdGE6IDMwICogMTAwMCAqIDEwMDBcbiAgICAgIH1cbiAgICB9KVxuICAgIGNvbnN0IHJ0bXBDb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLnNldHRpbmdzLCB7XG4gICAgICBwcm90b2NvbDogJ3J0bXAnLFxuICAgICAgcG9ydDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ydG1wcG9ydCxcbiAgICAgIHN0cmVhbU5hbWU6IHRoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMSxcbiAgICAgIG1pbWVUeXBlOiAncnRtcC9mbHYnLFxuICAgICAgdXNlVmlkZW9KUzogZmFsc2UsXG4gICAgICBzd2Y6ICdsaWIvcmVkNXByby9yZWQ1cHJvLXN1YnNjcmliZXIuc3dmJ1xuICAgIH0pXG4gICAgY29uc3QgaGxzQ29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy5zZXR0aW5ncywge1xuICAgICAgcHJvdG9jb2w6ICdodHRwJyxcbiAgICAgIHBvcnQ6IHRoaXMucHJvcHMuc2V0dGluZ3MuaGxzcG9ydCxcbiAgICAgIHN0cmVhbU5hbWU6IHRoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMSxcbiAgICAgIG1pbWVUeXBlOiAnYXBwbGljYXRpb24veC1tcGVnVVJMJyxcbiAgICAgIHN3ZjogJ2xpYi9yZWQ1cHJvL3JlZDVwcm8tdmlkZW8tanMuc3dmJ1xuICAgIH0pXG5cbiAgICB2aWV3LmF0dGFjaFN1YnNjcmliZXIoc3Vic2NyaWJlcilcblxuICAgIHN1YnNjcmliZXJcbiAgICAgIC5zZXRQbGF5YmFja09yZGVyKHN1YnNjcmliZU9yZGVyKVxuICAgICAgLmluaXQoe1xuICAgICAgICBydGM6IHJ0Y0NvbmZpZyxcbiAgICAgICAgcnRtcDogcnRtcENvbmZpZyxcbiAgICAgICAgaGxzOiBobHNDb25maWdcbiAgICAgIH0pXG4gICAgICAudGhlbihwbGF5ZXIgPT4ge1xuICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICBzdGF0ZS52aWV3ID0gdmlld1xuICAgICAgICAgIHN0YXRlLnN1YnNjcmliZXIgPSBwbGF5ZXJcbiAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHBsYXllci5wbGF5KClcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFtTdWJzY3JpYmVyRmFpbG92ZXJUZXN0XSA6OiBFcnJvciAtICR7anNvbkVycm9yfWApXG4gICAgICB9KVxuXG4gIH1cblxuICB1bnN1YnNjcmliZSAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXM7XG4gICAgY29uc3QgdmlldyA9IGNvbXAuc3RhdGUudmlldztcbiAgICBjb25zdCBzdWJzY3JpYmVyID0gY29tcC5zdGF0ZS5zdWJzY3JpYmVyO1xuICAgIGlmIChzdWJzY3JpYmVyKSB7XG4gICAgICBzdWJzY3JpYmVyLnN0b3AoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgdmlldy52aWV3LnNyYyA9ICcnXG4gICAgICAgICAgc3Vic2NyaWJlci5zZXRWaWV3KHVuZGVmaW5lZClcbiAgICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICAgIHN0YXRlLnZpZXcgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHN0YXRlLnN1YnNjcmliZXIgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgW1N1YnNjcmliZXJGYWlsb3ZlclRlc3RdIDo6IFVubW91bnQgRXJyb3IgPSAke2pzb25FcnJvcn1gKVxuICAgICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnN1YnNjcmliZSgpXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKClcbiAgICBpZiAodGhpcy5fc3Vic2NyaWJlckVudHJ5KSB7XG4gICAgICB0aGlzLl9zdWJzY3JpYmVyRW50cnkub2ZmKCcqJywgdGhpcy5oYW5kbGVTdWJzY3JpYmVyRXZlbnQpXG4gICAgICB0aGlzLl9zdWJzY3JpYmVyRW50cnkgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTdWJzY3JpYmVyRXZlbnQgKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXNFdmVudCA9IGV2ZW50XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlN1YnNjcmliZXIgRmFpbG92ZXIgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPFN1YnNjcmliZXJTdGF0dXMgZXZlbnQ9e3RoaXMuc3RhdGUuc3RhdHVzRXZlbnR9IC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyZWRcIiByZWY9e2MgPT4gdGhpcy5fdmlkZW9Db250YWluZXIgPSBjfVxuICAgICAgICAgIGlkPVwidmlkZW8tY29udGFpbmVyXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlxuICAgICAgICAgIDx2aWRlbyBjbGFzc05hbWU9XCJ2aWRlby1qcyB2anMtZGVmYXVsdC1za2luXCIgcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9TdWJzY3JpYmVyID0gY31cbiAgICAgICAgICAgIGlkPVwicmVkNXByby1zdWJzY3JpYmVyXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInZpZGVvLWVsZW1lbnRcIlxuICAgICAgICAgICAgY29udHJvbHMgYXV0b3BsYXk+PC92aWRlbz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5TdWJzY3JpYmVyRmFpbG92ZXJUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3Vic2NyaWJlckZhaWxvdmVyVGVzdFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3Qvc3Vic2NyaWJlL1N1YnNjcmliZXJGYWlsb3ZlclRlc3QuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWQ1UHJvU3Vic2NyaWJlciBmcm9tICcuLi8uLi9SZWQ1UHJvU3Vic2NyaWJlcicgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFN1YnNjcmliZXJTdGF0dXMgZnJvbSAnLi4vU3Vic2NyaWJlclN0YXR1cycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uLy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIFN1YnNjcmliZXJBdWRpb09ubHlUZXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3RhdHVzRXZlbnQ6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVN1YnNjcmliZXJFdmVudCAoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1c0V2ZW50ID0gZXZlbnRcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gIH1cblxuICBzdWJzY3JpYmVyRXN0YWJsaXNoZWQgKHN1YnNjcmliZXIsIHZpZXcpIHtcbiAgICBjb25zb2xlLmxvZyhgW1N1YnNjcmliZXJBdWRpb09ubHlUZXN0XSBzdWJzY3JpYmVyOiAke3N1YnNjcmliZXJ9LCAke3ZpZXd9YClcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5TdWJzY3JpYmVyIEF1ZGlvIE9ubHkgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPFN1YnNjcmliZXJTdGF0dXMgZXZlbnQ9e3RoaXMuc3RhdGUuc3RhdHVzRXZlbnR9IC8+XG4gICAgICAgIDxSZWQ1UHJvU3Vic2NyaWJlclxuICAgICAgICAgIGNsYXNzTmFtZT1cImNlbnRlcmVkXCJcbiAgICAgICAgICBtZWRpYUNsYXNzTmFtZT1cInZpZGVvLWVsZW1lbnRcIlxuICAgICAgICAgIGNvbmZpZ3VyYXRpb249e3RoaXMucHJvcHMuc2V0dGluZ3N9XG4gICAgICAgICAgc3RyZWFtTmFtZT17dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfVxuICAgICAgICAgIGF1dG9QbGF5PXt0cnVlfVxuICAgICAgICAgIGF1ZGlvT25seT17dHJ1ZX1cbiAgICAgICAgICBzaG93Q29udHJvbHM9e3RydWV9XG4gICAgICAgICAgb25TdWJzY3JpYmVyRXN0YWJsaXNoZWQ9e3RoaXMuc3Vic2NyaWJlckVzdGFibGlzaGVkLmJpbmQodGhpcyl9XG4gICAgICAgICAgb25TdWJzY3JpYmVyRXZlbnQ9e3RoaXMuaGFuZGxlU3Vic2NyaWJlckV2ZW50LmJpbmQodGhpcyl9XG4gICAgICAgICAgcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9TdWJzY3JpYmVyID0gY31cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblN1YnNjcmliZXJBdWRpb09ubHlUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3Vic2NyaWJlckF1ZGlvT25seVRlc3RcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3N1YnNjcmliZS9TdWJzY3JpYmVyQXVkaW9Pbmx5VGVzdC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlZDVQcm9TdWJzY3JpYmVyIGZyb20gJy4uLy4uL1JlZDVQcm9TdWJzY3JpYmVyJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgU3Vic2NyaWJlclN0YXR1cyBmcm9tICcuLi9TdWJzY3JpYmVyU3RhdHVzJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi4vLi4vQmFja0xpbmsnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY2xhc3MgU3Vic2NyaWJlckltYWdlQ2FwdHVyZVRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjYXB0dXJlRmlsbGVkOiBmYWxzZSxcbiAgICAgIHN0YXR1c0V2ZW50OiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBvblZpZGVvSW1hZ2VDYXB0dXJlICgpIHtcbiAgICBjb25zdCB2aWRlb0VsZW1lbnQgPSB0aGlzLl9yZWQ1UHJvU3Vic2NyaWJlci5nZXRQbGF5YmFja0VsZW1lbnQoKVxuICAgIHRoaXMuY2xlYXJDYW52YXModmlkZW9FbGVtZW50KVxuICAgIHRoaXMuZHJhd09uQ2FudmFzKHZpZGVvRWxlbWVudClcbiAgfVxuXG4gIGNsZWFyQ2FudmFzICh0YXJnZXRFbGVtZW50KSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5fY2FwdHVyZUNhbnZhc1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCIjYWFhYWFhXCJcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGgsIHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0KVxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuY2FwdHVyZUZpbGxlZCA9IGZhbHNlXG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgZHJhd09uQ2FudmFzICh0YXJnZXRFbGVtZW50KSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5fY2FwdHVyZUNhbnZhc1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGNhbnZhcy53aWR0aCA9IHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGhcbiAgICBjYW52YXMuaGVpZ2h0ID0gdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHRcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh0YXJnZXRFbGVtZW50LCAwLCAwLCB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoLCB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodClcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLmNhcHR1cmVGaWxsZWQgPSB0cnVlXG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlU3Vic2NyaWJlckV2ZW50IChldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzRXZlbnQgPSBldmVudFxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIHN1YnNjcmliZXJFc3RhYmxpc2hlZCAoc3Vic2NyaWJlciwgdmlldykge1xuICAgIGNvbnNvbGUubG9nKGBbU3Vic2NyaWJlckltYWdlQ2FwdHVyZVRlc3RdIHN1YnNjcmliZXI6ICR7c3Vic2NyaWJlcn0sICR7dmlld31gKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5fcmVkNVByb1N1YnNjcmliZXIuZ2V0UGxheWJhY2tFbGVtZW50KCkpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHZpc2libGUgPSB0aGlzLnN0YXRlLmNhcHR1cmVGaWxsZWQgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJ1xuICAgIGNvbnN0IGNhcHR1cmVUZXh0U3R5bGUgPSB7XG4gICAgICAndmlzaWJpbGl0eSc6IHZpc2libGUsXG4gICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuICAgICAgJ3BhZGRpbmcnOiAnMXJlbScsXG4gICAgICAnY29sb3InOiAnIzMzMzMzMycsXG4gICAgICAnd2lkdGgnOiAnMTAwJScsXG4gICAgICAndGV4dC1hbGlnbic6ICdjZW50ZXInXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+U3Vic2NyaWJlciBJbWFnZSBDYXB0dXJlIFRlc3Q8L2gxPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+PGVtPnN0cmVhbTwvZW0+OiB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfTwvaDI+XG4gICAgICAgIDxTdWJzY3JpYmVyU3RhdHVzIGV2ZW50PXt0aGlzLnN0YXRlLnN0YXR1c0V2ZW50fSAvPlxuICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMub25WaWRlb0ltYWdlQ2FwdHVyZS5iaW5kKHRoaXMpfT5cbiAgICAgICAgICA8UmVkNVByb1N1YnNjcmliZXJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImNlbnRlcmVkXCJcbiAgICAgICAgICAgIG1lZGlhQ2xhc3NOYW1lPVwidmlkZW8tZWxlbWVudFwiXG4gICAgICAgICAgICBjb25maWd1cmF0aW9uPXt0aGlzLnByb3BzLnNldHRpbmdzfVxuICAgICAgICAgICAgc3RyZWFtTmFtZT17dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfVxuICAgICAgICAgICAgaG9zdD17dGhpcy5zdGF0ZS50YXJnZXRIb3N0fVxuICAgICAgICAgICAgYXV0b1BsYXk9e3RydWV9XG4gICAgICAgICAgICBzaG93Q29udHJvbHM9e3RydWV9XG4gICAgICAgICAgICBvblN1YnNjcmliZXJFc3RhYmxpc2hlZD17dGhpcy5zdWJzY3JpYmVyRXN0YWJsaXNoZWQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uU3Vic2NyaWJlckV2ZW50PXt0aGlzLmhhbmRsZVN1YnNjcmliZXJFdmVudC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9TdWJzY3JpYmVyID0gY31cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlxuICAgICAgICAgIDxwIHN0eWxlPXtjYXB0dXJlVGV4dFN0eWxlfT48c3Bhbj5DbGljayB2aWRlbyB0byBjYXB0dXJlIGltYWdlLjwvc3Bhbj48YnIvPjxzcGFuPllvdXIgSW1hZ2Ugd2lsbCBhcHBlYXIgaGVyZS48L3NwYW4+PC9wPlxuICAgICAgICAgIDxjYW52YXMgcmVmPXtjID0+IHRoaXMuX2NhcHR1cmVDYW52YXMgPSBjfT48L2NhbnZhcz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5TdWJzY3JpYmVySW1hZ2VDYXB0dXJlVGVzdC5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1YnNjcmliZXJJbWFnZUNhcHR1cmVUZXN0XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9zdWJzY3JpYmUvU3Vic2NyaWJlckltYWdlQ2FwdHVyZVRlc3QuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWQ1UHJvU3Vic2NyaWJlciBmcm9tICcuLi8uLi9SZWQ1UHJvU3Vic2NyaWJlcicgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFN1YnNjcmliZXJTdGF0dXMgZnJvbSAnLi4vU3Vic2NyaWJlclN0YXR1cycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uLy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIFN1YnNjcmliZXJDbHVzdGVyVGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRhcmdldEhvc3Q6IHVuZGVmaW5lZCxcbiAgICAgIHN0YXR1c0V2ZW50OiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0RWRnZSAoKSB7XG4gICAgY29uc3QgaG9zdCA9IHRoaXMucHJvcHMuc2V0dGluZ3MuaG9zdFxuICAgIGNvbnN0IHVybCA9IGBodHRwOi8vJHtob3N0fTo1MDgwL2NsdXN0ZXJgXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXMgPSBgUmVxdWVzdGluZyBFZGdlIGZyb20gJHt1cmx9Li4uYFxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZmV0Y2godXJsKVxuICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKSAmJlxuICAgICAgICAgICAgcmVzLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcInRleHQvcGxhaW5cIikgPj0gMCkge1xuICAgICAgICAgIHJlcy50ZXh0KCkudGhlbih2YWx1ZSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlLnN1YnN0cmluZygwLCB2YWx1ZS5pbmRleE9mKCc6JykpKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICBjb25zb2xlLmVycm9yKGBbU3Vic2NyaWJlckNsdXN0ZXJUZXN0XSA6OiBFcnJvciAtIENvdWxkIG5vdCByZXF1c3QgRWRnZSBJUC4gJHtqc29uRXJyb3J9YClcbiAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgdGhpcy5yZXF1ZXN0RWRnZSgpXG4gICAgICAudGhlbihob3N0ID0+IHtcbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUudGFyZ2V0SG9zdCA9IGhvc3RcbiAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnQ291bGQgbm90IHN0YXJ0IGEgc3Vic2NyaXB0aW9uIHNlc3Npb24uJ1xuICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBqc29uRXJyb3IgPSB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnID8gZXJyb3IgOiBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgMilcbiAgICAgICAgY29uc29sZS5lcnJvcihgW1N1YnNjcmliZXJDbHVzdGVyVGVzdF0gOjogRXJyb3IgLSAke2pzb25FcnJvcn1gKVxuICAgICAgfSlcbiAgfVxuXG4gIGhhbmRsZVN1YnNjcmliZXJFdmVudCAoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1c0V2ZW50ID0gZXZlbnRcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gIH1cblxuICBzdWJzY3JpYmVyRXN0YWJsaXNoZWQgKHN1YnNjcmliZXIsIHZpZXcpIHtcbiAgICBjb25zb2xlLmxvZyhgW1N1YnNjcmliZXJDbHVzdGVyVGVzdF0gc3Vic2NyaWJlcjogJHtzdWJzY3JpYmVyfSwgJHt2aWV3fWApXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+U3Vic2NyaWJlciBDbHVzdGVyIFRlc3Q8L2gxPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+PGVtPnN0cmVhbTwvZW0+OiB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfTwvaDI+XG4gICAgICAgIDxTdWJzY3JpYmVyU3RhdHVzIGV2ZW50PXt0aGlzLnN0YXRlLnN0YXR1c0V2ZW50fSAvPlxuICAgICAgICA8UmVkNVByb1N1YnNjcmliZXJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjZW50ZXJlZFwiXG4gICAgICAgICAgbWVkaWFDbGFzc05hbWU9XCJ2aWRlby1lbGVtZW50XCJcbiAgICAgICAgICBjb25maWd1cmF0aW9uPXt0aGlzLnByb3BzLnNldHRpbmdzfVxuICAgICAgICAgIHN0cmVhbU5hbWU9e3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX1cbiAgICAgICAgICBob3N0PXt0aGlzLnN0YXRlLnRhcmdldEhvc3R9XG4gICAgICAgICAgYXV0b1BsYXk9e3RydWV9XG4gICAgICAgICAgc2hvd0NvbnRyb2xzPXt0cnVlfVxuICAgICAgICAgIG9uU3Vic2NyaWJlckVzdGFibGlzaGVkPXt0aGlzLnN1YnNjcmliZXJFc3RhYmxpc2hlZC5iaW5kKHRoaXMpfVxuICAgICAgICAgIG9uU3Vic2NyaWJlckV2ZW50PXt0aGlzLmhhbmRsZVN1YnNjcmliZXJFdmVudC5iaW5kKHRoaXMpfVxuICAgICAgICAgIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvU3Vic2NyaWJlciA9IGN9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5TdWJzY3JpYmVyQ2x1c3RlclRlc3QucHJvcFR5cGVzID0ge1xuICBzZXR0aW5nczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbkJhY2tDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufVxuXG5leHBvcnQgZGVmYXVsdCBTdWJzY3JpYmVyQ2x1c3RlclRlc3RcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3N1YnNjcmliZS9TdWJzY3JpYmVyQ2x1c3RlclRlc3QuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWQ1UHJvU3Vic2NyaWJlciBmcm9tICcuLi8uLi9SZWQ1UHJvU3Vic2NyaWJlcicgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFN1YnNjcmliZXJTdGF0dXMgZnJvbSAnLi4vU3Vic2NyaWJlclN0YXR1cycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uLy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIFN1YnNjcmliZXJTdHJlYW1NYW5hZ2VyVGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRhcmdldEhvc3Q6IHVuZGVmaW5lZCxcbiAgICAgIHN0YXR1c0V2ZW50OiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0RWRnZSAoKSB7XG4gICAgY29uc3QgaG9zdCA9IHRoaXMucHJvcHMuc2V0dGluZ3MuaG9zdFxuICAgIGNvbnN0IGFwcCA9IHRoaXMucHJvcHMuc2V0dGluZ3MuYXBwXG4gICAgY29uc3Qgc3RyZWFtTmFtZSA9IHRoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMVxuICAgIGNvbnN0IHVybCA9IGBodHRwOi8vJHtob3N0fTo1MDgwL3N0cmVhbW1hbmFnZXIvYXBpLzEuMC9ldmVudC8ke2FwcH0vJHtzdHJlYW1OYW1lfT9hY3Rpb249c3Vic2NyaWJlYFxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzID0gYFJlcXVlc3RpbmcgRWRnZSBmcm9tICR7dXJsfS4uLmBcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGZldGNoKHVybClcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICBpZiAocmVzLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpICYmXG4gICAgICAgICAgICByZXMuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIikudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiYXBwbGljYXRpb24vanNvblwiKSA+PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ291bGQgbm90IHByb3Blcmx5IHBhcnNlIHJlc3BvbnNlLicpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICByZXNvbHZlKGpzb24uc2VydmVyQWRkcmVzcylcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBjb25zdCBqc29uRXJyb3IgPSB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnID8gZXJyb3IgOiBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgMilcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBbU3Vic2NyaWJlclN0cmVhbU1hbmFnZXJUZXN0XSA6OiBFcnJvciAtIENvdWxkIG5vdCByZXF1ZXN0IEVkZ2UgSVAgZnJvbSBTdHJlYW0gTWFuYWdlci4gJHtqc29uRXJyb3J9YClcbiAgICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIHRoaXMucmVxdWVzdEVkZ2UoKVxuICAgICAgLnRoZW4oaG9zdCA9PiB7XG4gICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgIHN0YXRlLnRhcmdldEhvc3QgPSBob3N0XG4gICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUuc3RhdHVzID0gJ0Vycm9yIC0gQ291bGQgbm90IHN0YXJ0IHN1YnNjcmliaW5nIHNlc3Npb24uJ1xuICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmVycm9yKCdbU3Vic2NyaWJlclN0cmVhbU1hbmFnZXJUZXN0XSA6OiBFcnJvciAtIENvdWxkIG5vdCBzdGFydCBzdWJzY3JpYmluZyBzZXNzaW9uLicpXG4gICAgICB9KVxuICB9XG5cbiAgaGFuZGxlU3Vic2NyaWJlckV2ZW50IChldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzRXZlbnQgPSBldmVudFxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIHN1YnNjcmliZXJFc3RhYmxpc2hlZCAoc3Vic2NyaWJlciwgdmlldykge1xuICAgIGNvbnNvbGUubG9nKGBbU3Vic2NyaWJlclN0cmVhbU1hbmFnZXJUZXN0XSBzdWJzY3JpYmVyOiAke3N1YnNjcmliZXJ9LCAke3ZpZXd9YClcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgY2FuU3Vic2NyaWJlID0gdGhpcy5zdGF0ZS50YXJnZXRIb3N0ICE9IHVuZGVmaW5lZFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+U3Vic2NyaWJlciBTdHJlYW1NYW5hZ2VyIFRlc3Q8L2gxPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+PGVtPnN0cmVhbTwvZW0+OiB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfTwvaDI+XG4gICAgICAgIDxTdWJzY3JpYmVyU3RhdHVzIGV2ZW50PXt0aGlzLnN0YXRlLnN0YXR1c0V2ZW50fSAvPlxuICAgICAgICA8UmVkNVByb1N1YnNjcmliZXJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjZW50ZXJlZFwiXG4gICAgICAgICAgbWVkaWFDbGFzc05hbWU9XCJ2aWRlby1lbGVtZW50XCJcbiAgICAgICAgICBjb25maWd1cmF0aW9uPXt0aGlzLnByb3BzLnNldHRpbmdzfVxuICAgICAgICAgIHN0cmVhbU5hbWU9e3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX1cbiAgICAgICAgICBob3N0PXt0aGlzLnN0YXRlLnRhcmdldEhvc3R9XG4gICAgICAgICAgYXV0b1N1YnNjcmliZT17Y2FuU3Vic2NyaWJlfVxuICAgICAgICAgIGF1dG9QbGF5PXt0cnVlfVxuICAgICAgICAgIHNob3dDb250cm9scz17dHJ1ZX1cbiAgICAgICAgICBvblN1YnNjcmliZXJFc3RhYmxpc2hlZD17dGhpcy5zdWJzY3JpYmVyRXN0YWJsaXNoZWQuYmluZCh0aGlzKX1cbiAgICAgICAgICBvblN1YnNjcmliZXJFdmVudD17dGhpcy5oYW5kbGVTdWJzY3JpYmVyRXZlbnQuYmluZCh0aGlzKX1cbiAgICAgICAgICByZWY9e2MgPT4gdGhpcy5fcmVkNVByb1N1YnNjcmliZXIgPSBjfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuU3Vic2NyaWJlclN0cmVhbU1hbmFnZXJUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3Vic2NyaWJlclN0cmVhbU1hbmFnZXJUZXN0XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9zdWJzY3JpYmUvU3Vic2NyaWJlclN0cmVhbU1hbmFnZXJUZXN0LmpzXG4gKiovIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgY2hhbmdlVmlldyB9IGZyb20gJy4uLy4uL2FjdGlvbnMnXG5cbmV4cG9ydCBkZWZhdWx0ICh0YXJnZXRUZXN0KSA9PiB7XG5cbiAgY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNldHRpbmdzOiBzdGF0ZS5zZXR0aW5nc1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBvbkJhY2tDbGljazogKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaChjaGFuZ2VWaWV3KCdsaXN0JykpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgVGVzdENvbnRhaW5lciA9IGNvbm5lY3QoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXG4gICkodGFyZ2V0VGVzdClcblxuICByZXR1cm4gPFRlc3RDb250YWluZXIgLz5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb250YWluZXJzL3Rlc3QvVGVzdENvbnRhaW5lci5qc1xuICoqLyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGNoYW5nZVZpZXcgfSBmcm9tICcuLi8uLi9hY3Rpb25zJ1xuXG5leHBvcnQgZGVmYXVsdCAodGFyZ2V0VGVzdCwgc2V0dGluZ3NPdmVycmlkZSkgPT4ge1xuXG4gIGNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBzZXR0aW5nczogT2JqZWN0LmFzc2lnbihzdGF0ZS5zZXR0aW5ncywgc2V0dGluZ3NPdmVycmlkZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgb25CYWNrQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goY2hhbmdlVmlldygnbGlzdCcpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IFB1Ymxpc2hlckNvbnRhaW5lciA9IGNvbm5lY3QoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXG4gICkodGFyZ2V0VGVzdClcblxuICByZXR1cm4gPFB1Ymxpc2hlckNvbnRhaW5lciAvPlxuXG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbnRhaW5lcnMvdGVzdC9QdWJsaXNoZXJTZXR0aW5nc092ZXJyaWRlQ29udGFpbmVyLmpzXG4gKiovIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgY2hhbmdlVmlldyB9IGZyb20gJy4uLy4uL2FjdGlvbnMnXG5cbmV4cG9ydCBkZWZhdWx0ICh0YXJnZXRUZXN0LCBzZXR0aW5nc092ZXJyaWRlKSA9PiB7XG5cbiAgY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNldHRpbmdzOiBPYmplY3QuYXNzaWduKHN0YXRlLnNldHRpbmdzLCBzZXR0aW5nc092ZXJyaWRlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBvbkJhY2tDbGljazogKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaChjaGFuZ2VWaWV3KCdsaXN0JykpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgU3Vic2NyaWJlckNvbnRhaW5lciA9IGNvbm5lY3QoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXG4gICkodGFyZ2V0VGVzdClcblxuICByZXR1cm4gPFN1YnNjcmliZXJDb250YWluZXIgLz5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb250YWluZXJzL3Rlc3QvU3Vic2NyaWJlclNldHRpbmdzT3ZlcnJpZGVDb250YWluZXIuanNcbiAqKi8iLCIvKiBnbG9iYWwgVEVTVEJFRF9WRVJTSU9OICovXG4vLyBURVNUQkVEX1ZFUlNJT04gaW5qZWN0ZWQgZnJvbSB3ZWJwYWNrLlxuaW1wb3J0IHsgQ2hpbGRyZW4gfSBmcm9tICdyZWFjdCdcblxuY29uc3QgQXBwID0gKHsgcGFnZSB9KSA9PiAoXG4gIDxkaXY+XG4gICAgPHAgY2xhc3NOYW1lPVwidmVyc2lvbi1maWVsZFwiPlRlc3RiZWQgVmVyc2lvbjoge1RFU1RCRURfVkVSU0lPTn08L3A+XG4gICAge0NoaWxkcmVuLm9ubHkocGFnZSl9XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBBcHBcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy9BcHAuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJzZXR0aW5nc1wiOiB7XG5cdFx0XCJob3N0XCI6IFwibG9jYWxob3N0XCIsXG5cdFx0XCJwb3J0XCI6IDg1NTQsXG5cdFx0XCJydGNwb3J0XCI6IDgwODEsXG5cdFx0XCJydG1wcG9ydFwiOiAxOTM1LFxuXHRcdFwiaGxzcG9ydFwiOiA1MDgwLFxuXHRcdFwic3RyZWFtMVwiOiBcInN0cmVhbTFcIixcblx0XHRcInN0cmVhbTJcIjogXCJzdHJlYW0yXCIsXG5cdFx0XCJhcHBcIjogXCJsaXZlXCIsXG5cdFx0XCJjYW1lcmFXaWR0aFwiOiA4NTQsXG5cdFx0XCJjYW1lcmFIZWlnaHRcIjogNDgwLFxuXHRcdFwidmlkZW9cIjogdHJ1ZSxcblx0XHRcImF1ZGlvXCI6IHRydWUsXG5cdFx0XCJidWZmZXJcIjogMC41LFxuXHRcdFwiYml0cmF0ZVwiOiAxMDAwLFxuXHRcdFwicHVibGlzaGVyRmFpbG92ZXJPcmRlclwiOiBcInJ0YyxydG1wXCIsXG5cdFx0XCJzdWJzY3JpYmVyRmFpbG92ZXJPcmRlclwiOiBcInJ0YyxydG1wLGhsc1wiLFxuXHRcdFwiaWNlU2VydmVyc1wiOiBbXG5cdFx0XHR7XG5cdFx0XHRcdFwidXJsc1wiOiBcInN0dW46c3R1bjIubC5nb29nbGUuY29tOjE5MzAyXCJcblx0XHRcdH1cblx0XHRdLFxuXHRcdFwidmVyYm9zZUxvZ2dpbmdcIjogdHJ1ZVxuXHR9LFxuXHRcInRlc3RzXCI6IFtcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJIb21lXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlB1Ymxpc2hcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiUHVibGlzaCAtIEZhaWxvdmVyXCIsXG5cdFx0XHRcImRlc2NyaXB0aW9uXCI6IFwiRGVtb25zdHJhdGVzIGZhaWxvdmVyIG9mIGJyb3dzZXIgc3VwcG9ydCBmb3IgcHVibGlzaGluZy5cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiUHVibGlzaCAtIDEwODBwXCIsXG5cdFx0XHRcImRlc2NyaXB0aW9uXCI6IFwiRGVtb25zdHJhdGlvbiBvZiBhc3NpZ25pbmcgMTA4MHAgcmVzb2x1dGlvbiB0byBwdWJsaXNoaW5nLlwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJQdWJsaXNoIC0gQXVkaW8gTW9kZVwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBcIkRlbW9uc3RyYXRlcyBBdWRpby1Pbmx5IGJyb2FkY2FzdCBmb3IgcHVibGlzaGluZy5cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiUHVibGlzaCAtIENhbWVyYSBTb3VyY2VcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJEZW1vbnN0cmF0ZXMgc2VsZWN0aW9uIG9mIGNhbWVyYSBzb3VyY2UgZm9yIHB1Ymxpc2hpbmcuXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlB1Ymxpc2ggLSBDYW1lcmEgU3dhcFwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBcIkRlbW9uc3RyYXRlcyBzd2FwIG9mIGNhbWVyYSBpbiBmcm9udCB0byByZWFyIHdoZXJlIHN1cHBvcnRlZCBvbiBkZXZpY2UgYnJvd3Nlci5cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiUHVibGlzaCAtIEltYWdlIENhcHR1cmVcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJEZW1vbnN0cmF0ZXMgY2FwdHVyaW5nIGFuIGltYWdlIG9mIGxpdmUgdmlkZW8uXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlB1Ymxpc2ggLSBTdHJlYW0gTWFuYWdlclwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBcIkRlbW9uc3RyYXRlcyBhY2Nlc3NpbmcgdGFyZ2V0IG9yaWdpbiBmb3IgYnJvYWRjYXN0IHVzaW5nIFN0cmVhbSBNYW5hZ2VyLlwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJTdWJzY3JpYmVcIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiU3Vic2NyaWJlIC0gRmFpbG92ZXJcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJEZW1vbnN0cmF0ZXMgZmFpbG92ZXIgb2YgYnJvd3NlciBzdXBwb3J0IGZvciBzdWJzY3JpYmluZy5cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiU3Vic2NyaWJlIC0gQXVkaW8gT25seVwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBcIkRlbW9uc3RyYXRlcyBBdWRpby1Pbmx5IHN1YnNjcmlwdGlvbi5cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiU3Vic2NyaWJlIC0gSW1hZ2UgQ2FwdHVyZVwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBcIkRlbW9uc3RyYXRlcyBjYXB0dXJpbmcgaW1hZ2UgZnJvbSBzdWJzY3JpcHRpb24uXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlN1YnNjcmliZSAtIENsdXN0ZXJcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJEZW1vbnN0cmF0ZXMgYWNjZXNzaW5nIEVkZ2UgSVAgZnJvbSBDbHVzdGVyIGZvciBzdWJzY3JpcHRpb24uXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlN1YnNjcmliZSAtIFN0cmVhbSBNYW5hZ2VyXCIsXG5cdFx0XHRcImRlc2NyaXB0aW9uXCI6IFwiRGVtb25zdHJhdGVzIGFjY2Vzc2luZyBFZGdlIElQIGZyb20gU3RyZWFtIE1hbmFnZXIgQVBJIGZvciBzdWJzY3JpcHRpb24uXCJcblx0XHR9XG5cdF1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9yZXNvdXJjZS90ZXN0YmVkLmpzb25cbiAqKiBtb2R1bGUgaWQgPSAxMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImluZGV4Lmh0bWxcIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2luZGV4Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=