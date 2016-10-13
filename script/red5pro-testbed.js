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
	            publisher.off('*', comp.props.onPublisherEvent);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlM2Q5OTJlNWI3ZDAyNDcwZjA0YiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RET01cIiIsIndlYnBhY2s6Ly8vLi9+L3JlZHV4L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZHV4L2xpYi9jcmVhdGVTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc1BsYWluT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19nZXRQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX292ZXJBcmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovLy8uL34vc3ltYm9sLW9ic2VydmFibGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvcG9ueWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWR1eC9saWIvY29tYmluZVJlZHVjZXJzLmpzIiwid2VicGFjazovLy8uL34vcmVkdXgvbGliL3V0aWxzL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWR1eC9saWIvYmluZEFjdGlvbkNyZWF0b3JzLmpzIiwid2VicGFjazovLy8uL34vcmVkdXgvbGliL2FwcGx5TWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZHV4L2xpYi9jb21wb3NlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0UmVkdXhcIiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlZHVjZXJzL3NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9yZWR1Y2Vycy92aWV3LWZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVkdWNlcnMvbG9nLWxldmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb250YWluZXJzL0FwcENvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VsZWN0b3JzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVzZWxlY3QvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb250YWluZXJzL1Rlc3RMaXN0Q29udGFpbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL1Rlc3RMaXN0LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvVGVzdExpc3RJdGVtLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb250YWluZXJzL1NldHRpbmdzRm9ybUNvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9TZXR0aW5nc0Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvQmFja0xpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3B1Ymxpc2gvUHVibGlzaGVyVGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9SZWQ1UHJvUHVibGlzaGVyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2lzRXF1YWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VJc0VxdWFsLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlSXNFcXVhbERlZXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX1N0YWNrLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19MaXN0Q2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2xpc3RDYWNoZUNsZWFyLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19saXN0Q2FjaGVEZWxldGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Fzc29jSW5kZXhPZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9lcS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbGlzdENhY2hlR2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19saXN0Q2FjaGVIYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2xpc3RDYWNoZVNldC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fc3RhY2tDbGVhci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fc3RhY2tEZWxldGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3N0YWNrR2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zdGFja0hhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fc3RhY2tTZXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX01hcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fZ2V0TmF0aXZlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlSXNOYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9faXNNYXNrZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2NvcmVKc0RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3Jvb3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3RvU291cmNlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19nZXRWYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fTWFwQ2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX21hcENhY2hlQ2xlYXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX0hhc2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2hhc2hDbGVhci5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbmF0aXZlQ3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19oYXNoRGVsZXRlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19oYXNoR2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19oYXNoSGFzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19oYXNoU2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19tYXBDYWNoZURlbGV0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fZ2V0TWFwRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9faXNLZXlhYmxlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19tYXBDYWNoZUdldC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbWFwQ2FjaGVIYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX21hcENhY2hlU2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19lcXVhbEFycmF5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fU2V0Q2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX3NldENhY2hlQWRkLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zZXRDYWNoZUhhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYXJyYXlTb21lLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19jYWNoZUhhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fZXF1YWxCeVRhZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19VaW50OEFycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19tYXBUb0FycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19zZXRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19lcXVhbE9iamVjdHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYXJyYXlMaWtlS2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fYmFzZVRpbWVzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2lzQXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlSXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaXNBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc0J1ZmZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL3N0dWJGYWxzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9faXNJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VJc1R5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvaXNMZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VVbmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbm9kZVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sb2Rhc2gvX2Jhc2VLZXlzLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19pc1Byb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fbmF0aXZlS2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9pc0FycmF5TGlrZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fZ2V0VGFnLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19EYXRhVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC9fU2V0LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19XZWFrTWFwLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvUHVibGlzaGVyU3RhdHVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvcHVibGlzaC9QdWJsaXNoZXIxMDgwcFRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlckF1ZGlvT25seVRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlckNhbWVyYVN3YXBUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvcHVibGlzaC9QdWJsaXNoZXJGaWx0ZXJzVGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3B1Ymxpc2gvUHVibGlzaGVyRmFpbG92ZXJUZXN0LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtY2xhc3MvYXV0b0JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlckltYWdlQ2FwdHVyZVRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3Qvc3Vic2NyaWJlL1N1YnNjcmliZXJUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL1JlZDVQcm9TdWJzY3JpYmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvU3Vic2NyaWJlclN0YXR1cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3N1YnNjcmliZS9TdWJzY3JpYmVyRmFpbG92ZXJUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3Qvc3Vic2NyaWJlL1N1YnNjcmliZXJBdWRpb09ubHlUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3Qvc3Vic2NyaWJlL1N1YnNjcmliZXJJbWFnZUNhcHR1cmVUZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3Rlc3Qvc3Vic2NyaWJlL1N1YnNjcmliZXJDbHVzdGVyVGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3N1YnNjcmliZS9TdWJzY3JpYmVyU3RyZWFtTWFuYWdlclRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRhaW5lcnMvdGVzdC9UZXN0Q29udGFpbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb250YWluZXJzL3Rlc3QvUHVibGlzaGVyU2V0dGluZ3NPdmVycmlkZUNvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29udGFpbmVycy90ZXN0L1N1YnNjcmliZXJTZXR0aW5nc092ZXJyaWRlQ29udGFpbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVzb3VyY2UvdGVzdGJlZC5qc29uIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5odG1sIl0sIm5hbWVzIjpbInN0b3JlIiwidmlld0ZpbHRlciIsImxvZ0xldmVsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRlc3RiZWRBcHAiLCJzZXR0aW5ncyIsInRlc3RzIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwic2V0dGluZ3NVcGRhdGUiLCJrZXkiLCJ2YWx1ZSIsIlNFVFRJTkdTX1VQREFURSIsIlZJRVdfQ0hBTkdFIiwiTE9HX0xFVkVMX0NIQU5HRSIsImNoYW5nZVNldHRpbmciLCJjaGFuZ2VWaWV3IiwibmFtZSIsImZpbHRlciIsImNoYW5nZUxvZ0xldmVsIiwibGV2ZWwiLCJtYXBTdGF0ZVRvUHJvcHMiLCJwYWdlIiwiQXBwQ29udGFpbmVyIiwiZ2V0Vmlld0ZpbHRlciIsImdldEN1cnJlbnRQYWdlIiwidG9Mb3dlckNhc2UiLCJQdWJsaXNoZXJUZXN0IiwiUHVibGlzaGVyMTA4MHBUZXN0IiwiUHVibGlzaGVyRmFpbG92ZXJUZXN0IiwiUHVibGlzaGVyQXVkaW9Pbmx5VGVzdCIsIlB1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3QiLCJQdWJsaXNoZXJDYW1lcmFTd2FwVGVzdCIsIlB1Ymxpc2hlckZpbHRlcnNUZXN0IiwiUHVibGlzaGVySW1hZ2VDYXB0dXJlVGVzdCIsIlB1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0IiwiU3Vic2NyaWJlclRlc3QiLCJTdWJzY3JpYmVyRmFpbG92ZXJUZXN0IiwiU3Vic2NyaWJlckF1ZGlvT25seVRlc3QiLCJTdWJzY3JpYmVySW1hZ2VDYXB0dXJlVGVzdCIsIlN1YnNjcmliZXJDbHVzdGVyVGVzdCIsIlN1YnNjcmliZXJTdHJlYW1NYW5hZ2VyVGVzdCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwib25UZXN0TGlzdEl0ZW1DbGljayIsIlRlc3RMaXN0Q29udGFpbmVyIiwiVGVzdExpc3QiLCJtYXAiLCJ0ZXN0IiwicHJvcFR5cGVzIiwiYXJyYXlPZiIsInNoYXBlIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsIm1vZHVsZSIsImRlc2NyaXB0aW9uIiwiZnVuYyIsIlRlc3RMaXN0SXRlbSIsIm9uQ2xpY2siLCJvbkJhY2tDbGljayIsIm9uRmllbGRDaGFuZ2UiLCJvbkxvZ0xldmVsQ2hhbmdlIiwiU2V0dGluZ3NGb3JtQ29udGFpbmVyIiwiU2V0dGluZ3NGb3JtIiwicHJvcHMiLCJfcmVmIiwidmFsdWUxIiwiX3N0cmVhbTEiLCJ2YWx1ZTIiLCJfc3RyZWFtMiIsImNoZWNrIiwiX3ZlcmJvc2VMb2dnaW5nIiwiaXNWZXJib3NlIiwiY2hlY2tlZCIsImNoZWNrU3R5bGUiLCJpc0xvZ1ZlcmJvc2UiLCJyZWQ1cHJvc2RrIiwic2V0TG9nTGV2ZWwiLCJjIiwiX2hvc3QiLCJob3N0Iiwic3RyZWFtMSIsInN3YXBTdHJlYW1OYW1lcyIsImJpbmQiLCJzdHJlYW0yIiwiQ29tcG9uZW50Iiwib2JqZWN0IiwiQmFja0xpbmsiLCJkZWZhdWx0Iiwic3RhdHVzRXZlbnQiLCJ1bmRlZmluZWQiLCJjb25uZWN0aW9uIiwiX3dhdGNoU3RhdHNJbnRlcnZhbCIsIndpbmRvdyIsInNldEludGVydmFsIiwiZ2V0U3RhdHMiLCJ0aGVuIiwiT2JqZWN0Iiwia2V5cyIsInJlcyIsImZvckVhY2giLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsImNsZWFySW50ZXJ2YWwiLCJ1bndhdGNoU3RhdHMiLCJldmVudCIsInNldFN0YXRlIiwicHVibGlzaGVyIiwicHVibGlzaGVyVmlldyIsInB1Ymxpc2hlckVzdGFibGlzaGVkIiwiaGFuZGxlUHVibGlzaGVyRXZlbnQiLCJkZWZhdWx0Q29uZmlndXJhdGlvbiIsInByb3RvY29sIiwicG9ydCIsImFwcCIsInN0cmVhbVR5cGUiLCJhdWRpb09uIiwidmlkZW9PbiIsIlJlZDVQcm9QdWJsaXNoZXIiLCJ2aWV3IiwiaW5zdGFuY2VJZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwibWVzc2FnZSIsImVycm9yIiwiZGVmYXVsdE1lZGlhIiwiYXVkaW8iLCJjb25maWd1cmF0aW9uIiwidmlkZW8iLCJkZWZpbmVkTWVkaWEiLCJ1c2VyTWVkaWEiLCJhc3NpZ24iLCJvblB1Ymxpc2hlckVzdGFibGlzaGVkIiwiY29tcCIsImdVTSIsImdldFVzZXJNZWRpYUNvbmZpZ3VyYXRpb24iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVsZW1lbnRJZCIsImpvaW4iLCJSVENQdWJsaXNoZXIiLCJQdWJsaXNoZXJWaWV3IiwiZ21kIiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2UiLCJvblB1Ymxpc2hlckV2ZW50Iiwib24iLCJnZXRVc2VyTWVkaWEiLCJhdHRhY2hTdHJlYW0iLCJtZWRpYSIsInByZXZpZXciLCJvblB1Ymxpc2hGYWlsIiwiYXR0YWNoUHVibGlzaGVyIiwiY29uZmlnIiwicnRjcG9ydCIsInN0cmVhbU5hbWUiLCJpbml0IiwicHViIiwibm90aWZ5UHVibGlzaGVyRXN0YWJsaXNoZWQiLCJwdWJsaXNoIiwib25QdWJsaXNoU3VjY2VzcyIsImNhdGNoIiwianNvbkVycm9yIiwidW5wdWJsaXNoIiwic3JjIiwic2V0VmlldyIsIm9mZiIsIm9uVW5wdWJsaXNoU3VjY2VzcyIsIm9uVW5wdWJsaXNoRmFpbGVkIiwiYXV0byIsInRyeVB1Ymxpc2giLCJhdXRvUHVibGlzaCIsInByZXZQcm9wcyIsInAiLCJwVU0iLCJwcmV2VU0iLCJfcmVkNVByb1B1Ymxpc2hlciIsImNsYXNzTmFtZXMiLCJjbGFzc05hbWUiLCJjb25jYXQiLCJtZWRpYUNsYXNzTmFtZXMiLCJtZWRpYUNsYXNzTmFtZSIsIl92aWRlb0NvbnRhaW5lciIsInN0eWxlIiwic2hvd0NvbnRyb2xzIiwiYm9vbGVhbiIsImRlZmF1bHRQcm9wcyIsIlB1Ymxpc2hlclN0YXR1cyIsInN0YXR1cyIsInB1YlR5cGVzIiwiUHVibGlzaGVyRXZlbnRUeXBlcyIsInJ0Y1R5cGVzIiwiUlRDUHVibGlzaGVyRXZlbnRUeXBlcyIsIkNPTk5FQ1RfU1VDQ0VTUyIsIkNPTk5FQ1RfRkFJTFVSRSIsIlBVQkxJU0hfU1RBUlQiLCJQVUJMSVNIX0ZBSUwiLCJQVUJMSVNIX0lOVkFMSURfTkFNRSIsIk1FRElBX1NUUkVBTV9BVkFJTEFCTEUiLCJQRUVSX0NPTk5FQ1RJT05fQVZBSUxBQkxFIiwiT0ZGRVJfU1RBUlQiLCJPRkZFUl9FTkQiLCJJQ0VfVFJJQ0tMRV9DT01QTEVURSIsIm5leHRQcm9wcyIsInVwZGF0ZVN0YXR1c0Zyb21FdmVudCIsIlVTRVJfTUVESUFfU0VUVElORyIsIndpZHRoIiwiaGVpZ2h0IiwidmlkZW9FbGVtZW50IiwiZ2V0UHVibGlzaGVyRWxlbWVudCIsInBhdXNlIiwiU0VMRUNUX0RFRkFVTFQiLCJjYW1lcmFzIiwibGFiZWwiLCJzZWxlY3RlZENhbWVyYSIsInB1Ymxpc2hBbGxvd2VkIiwibWVkaWFEZXZpY2VzIiwiZW51bWVyYXRlRGV2aWNlcyIsInZpZGVvQ2FtZXJhcyIsImRldmljZXMiLCJpdGVtIiwia2luZCIsIm1lZGlhRGV2aWNlSWQiLCJjYW1lcmFTZWxlY3RlZCIsIl9jYW1lcmFTZWxlY3QiLCJ3YWl0Rm9yU2VsZWN0IiwibGFiZWxTdHlsZSIsImNhbWVyYVNlbGVjdEZpZWxkIiwiY2FuUHVibGlzaCIsIm9wdGlvbmFsIiwic291cmNlSWQiLCJvbkNhbWVyYVNlbGVjdCIsImNhbWVyYSIsImRldmljZUlkIiwiRkFDSU5HX01PREVfRlJPTlQiLCJGQUNJTkdfTU9ERV9SRUFSIiwiZmFjaW5nTW9kZUZyb250Iiwic3VwcG9ydGVkIiwiZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMiLCJoaW50Q2xhc3MiLCJzdXBwb3J0ZWRTdHIiLCJmYWNpbmdNb2RlIiwib25DYW1lcmFTd2FwUmVxdWVzdCIsIkZJTFRFUl9TRUxFQ1QiLCJmaWx0ZXJzIiwidmlkZW9DbGFzc0xpc3QiLCJzZWxlY3RlZEZpbHRlciIsIl9maWx0ZXJTZWxlY3QiLCJjbGFzc0xpc3QiLCJmaWx0ZXJTZWxlY3RGaWVsZCIsIm9uRmlsdGVyU2VsZWN0Iiwic2VsZWN0ZWRQdWJsaXNoZXJUeXBlIiwiX3B1Ymxpc2hlckVudHJ5IiwicnRjQ29uZmlnIiwicnRtcENvbmZpZyIsInJ0bXBwb3J0Iiwic3dmIiwicHVibGlzaE9yZGVyIiwicHVibGlzaGVyRmFpbG92ZXJPcmRlciIsInNwbGl0IiwidHJpbSIsInNldFB1Ymxpc2hPcmRlciIsInJ0YyIsInJ0bXAiLCJzZWxlY3RlZFB1Ymxpc2hlciIsImdldFR5cGUiLCJwdWJsaXNoVHlwZXMiLCJSVEMiLCJjYXB0dXJlRmlsbGVkIiwiY2xlYXJDYW52YXMiLCJkcmF3T25DYW52YXMiLCJ0YXJnZXRFbGVtZW50IiwiY2FudmFzIiwiX2NhcHR1cmVDYW52YXMiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJkcmF3SW1hZ2UiLCJ2aXNpYmxlIiwiY2FwdHVyZVRleHRTdHlsZSIsIm9uVmlkZW9JbWFnZUNhcHR1cmUiLCJ0YXJnZXRIb3N0IiwidXJsIiwiZmV0Y2giLCJoZWFkZXJzIiwiZ2V0IiwiaW5kZXhPZiIsImpzb24iLCJUeXBlRXJyb3IiLCJzZXJ2ZXJBZGRyZXNzIiwicmVxdWVzdE9yaWdpbiIsInN1YnNjcmliZXIiLCJzdWJzY3JpYmVyRXN0YWJsaXNoZWQiLCJoYW5kbGVTdWJzY3JpYmVyRXZlbnQiLCJiYW5kd2lkdGgiLCJkYXRhIiwiUmVkNVByb1N1YnNjcmliZXIiLCJvblN1YnNjcmliZXJFc3RhYmxpc2hlZCIsIlBsYXliYWNrVmlldyIsIlJUQ1N1YnNjcmliZXIiLCJvcmlnQXR0YWNoU3RyZWFtIiwic3RyZWFtIiwiYXV0b3BsYXkiLCJhdHRhY2hTdWJzY3JpYmVyIiwib25TdWJzY3JpYmVyRXZlbnQiLCJzdWJzY3JpcHRpb25JZCIsInBsYXllciIsInBsYXkiLCJvblN1YnNjcmliZVN1Y2Nlc3MiLCJub3RpZnlTdWJzY3JpYmVyRXN0YWJsaXNoZWQiLCJvblN1YnNjcmliZUZhaWwiLCJzdG9wIiwib25VbnN1YnNjcmliZVN1Y2Nlc3MiLCJvblVuc3Vic2NyaWJlRmFpbCIsInN1YnNjcmliZSIsInRyeVN1YnNjcmliZSIsImF1dG9TdWJzY3JpYmUiLCJ1bnN1YnNjcmliZSIsInN1YiIsIl9yZWQ1UHJvU3Vic2NyaWJlciIsImNoaWxkcmVuIiwiYXVkaW9Pbmx5IiwiYXV0b1BsYXkiLCJTdWJzY3JpYmVyU3RhdHVzIiwic3ViVHlwZXMiLCJTdWJzY3JpYmVyRXZlbnRUeXBlcyIsIlJUQ1N1YnNjcmliZXJFdmVudFR5cGVzIiwiYW5zd2VyIiwiY2FuZGlkYXRlIiwiU1VCU0NSSUJFX1NUQVJUIiwiU1VCU0NSSUJFX0ZBSUwiLCJTVUJTQ1JJQkVfSU5WQUxJRF9OQU1FIiwiQU5TV0VSX1NUQVJUIiwiQU5TV0VSX0VORCIsIkNBTkRJREFURV9TVEFSVCIsIkNBTkRJREFURV9FTkQiLCJfc3Vic2NyaWJlckVudHJ5Iiwic3Vic2NyaWJlT3JkZXIiLCJzdWJzY3JpYmVyRmFpbG92ZXJPcmRlciIsIm1pbWVUeXBlIiwidXNlVmlkZW9KUyIsImhsc0NvbmZpZyIsImhsc3BvcnQiLCJzZXRQbGF5YmFja09yZGVyIiwiaGxzIiwiZ2V0UGxheWJhY2tFbGVtZW50IiwidGV4dCIsInN1YnN0cmluZyIsInJlcXVlc3RFZGdlIiwiY2FuU3Vic2NyaWJlIiwidGFyZ2V0VGVzdCIsIlRlc3RDb250YWluZXIiLCJzZXR0aW5nc092ZXJyaWRlIiwiUHVibGlzaGVyQ29udGFpbmVyIiwiU3Vic2NyaWJlckNvbnRhaW5lciIsIkFwcCIsIlRFU1RCRURfVkVSU0lPTiIsIm9ubHkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7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QTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxFQUFFO0FBQ2IsY0FBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDakJBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsRUFBRTtBQUNiLFlBQVcsT0FBTztBQUNsQixjQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLEVBQUU7QUFDYixjQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDMUJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsRUFBRTtBQUNiLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDcEVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLEVBQUU7QUFDYixjQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxTQUFTO0FBQ3BCLGNBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNiQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEVBQUM7O0FBRUQ7Ozs7Ozs7O0FDckJBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGNBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQzdCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxFQUFFO0FBQ2IsY0FBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNqQkE7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7OztBQ0xBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxFQUFFO0FBQ2IsY0FBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsRUFBRTtBQUNiLGNBQWEsT0FBTztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ25FQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNOQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNOQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNOQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNOQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsRUFBRTtBQUNiLGNBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBOzs7Ozs7Ozs7O2dmQURBOztBQUVBOzs7S0FHTXdFLGU7OztBQUVKLDRCQUFhaEksS0FBYixFQUFvQjtBQUFBOztBQUFBLG1JQUNaQSxLQURZOztBQUVsQixXQUFLMUQsS0FBTCxHQUFhO0FBQ1gyTCxlQUFRO0FBREcsTUFBYjtBQUZrQjtBQUtuQjs7OzsyQ0FFc0J0RixLLEVBQU87QUFDNUJOLGVBQVFDLEdBQVIsK0JBQXdDSyxNQUFNbkcsSUFBOUM7QUFDQSxXQUFNMEwsV0FBV3RILFdBQVd1SCxtQkFBNUI7QUFDQSxXQUFNQyxXQUFXeEgsV0FBV3lILHNCQUE1QjtBQUNBLFdBQUlKLFNBQVMsS0FBSzNMLEtBQUwsQ0FBVzJMLE1BQXhCO0FBQ0EsZUFBUXRGLE1BQU1uRyxJQUFkO0FBQ0UsY0FBSzBMLFNBQVNJLGVBQWQ7QUFDRUwsb0JBQVMsMkJBQVQ7QUFDQTtBQUNGLGNBQUtDLFNBQVNLLGVBQWQ7QUFDRU4sb0JBQVMseUNBQVQ7QUFDQTtBQUNGLGNBQUtDLFNBQVNNLGFBQWQ7QUFDRVAsb0JBQVMsNkJBQVQ7QUFDQTtBQUNGLGNBQUtDLFNBQVNPLFlBQWQ7QUFDRVIsb0JBQVMsK0NBQVQ7QUFDQTtBQUNGLGNBQUtDLFNBQVNRLG9CQUFkO0FBQ0VULG9CQUFTLHFDQUFUO0FBQ0E7QUFDRixjQUFLRyxTQUFTTyxzQkFBZDtBQUNFVixvQkFBUyxxQkFBVDtBQUNBO0FBQ0YsY0FBS0csU0FBU1EseUJBQWQ7QUFDRVgsb0JBQVMsOEJBQVQ7QUFDQTtBQUNGLGNBQUtHLFNBQVNTLFdBQWQ7QUFDRVosb0JBQVMsZ0JBQVQ7QUFDQTtBQUNGLGNBQUtHLFNBQVNVLFNBQWQ7QUFDRWIsb0JBQVMsbUJBQVQ7QUFDQTtBQUNGLGNBQUtHLFNBQVNXLG9CQUFkO0FBQ0VkLG9CQUFTLGdEQUFUO0FBQ0E7QUE5Qko7QUFnQ0EsWUFBS3JGLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGVBQU0yTCxNQUFOLEdBQWVBLE1BQWY7QUFDQSxnQkFBTzNMLEtBQVA7QUFDRCxRQUhEO0FBSUQ7OzsrQ0FFMEIwTSxTLEVBQVc7QUFDcEMsV0FBSSxLQUFLaEosS0FBTCxDQUFXMkMsS0FBWCxLQUFxQnFHLFVBQVVyRyxLQUEvQixJQUF3Q3FHLFVBQVVyRyxLQUF0RCxFQUE2RDtBQUMzRCxjQUFLc0cscUJBQUwsQ0FBMkJELFVBQVVyRyxLQUFyQztBQUNEO0FBQ0Y7Ozs4QkFFUztBQUNSLGNBQ0U7QUFBQTtBQUFBLFdBQUcsV0FBVSx1QkFBYjtBQUFBO0FBQThDLGNBQUtyRyxLQUFMLENBQVcyTDtBQUF6RCxRQURGO0FBR0Q7Ozs7R0E5RDJCLGdCQUFNNUcsUzs7QUFrRXBDMkcsaUJBQWdCL0ksU0FBaEIsR0FBNEI7QUFDMUIwRCxVQUFPLGlCQUFVckI7QUFEUyxFQUE1Qjs7bUJBSWUwRyxlOzs7Ozs7Ozs7Ozs7OztBQzNFZjs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztnZkFGc0Q7QUFDTDs7O0FBQ1g7O0FBRXRDLEtBQU1rQixxQkFBcUI7QUFDekI5RSxVQUFPO0FBQ0wrRSxZQUFPLElBREY7QUFFTEMsYUFBUTtBQUZIO0FBRGtCLEVBQTNCOztLQU9NeEwsa0I7OztBQUVKLCtCQUFhb0MsS0FBYixFQUFvQjtBQUFBOztBQUFBLHlJQUNaQSxLQURZOztBQUVsQixXQUFLMUQsS0FBTCxHQUFhO0FBQ1htRixvQkFBYUM7QUFERixNQUFiO0FBRmtCO0FBS25COzs7OzBDQUVxQmlCLEssRUFBTztBQUMzQixZQUFLQyxRQUFMLENBQWMsaUJBQVM7QUFDckJ0RyxlQUFNbUYsV0FBTixHQUFvQmtCLEtBQXBCO0FBQ0EsZ0JBQU9yRyxLQUFQO0FBQ0QsUUFIRDtBQUlEOzs7MENBRXFCdUcsUyxFQUFXQyxhLEVBQWU7QUFDOUNULGVBQVFDLEdBQVIsc0NBQStDTyxTQUEvQyxVQUE2REMsYUFBN0Q7QUFDRDs7OzhCQUVVO0FBQ1QsY0FDRTtBQUFBO0FBQUE7QUFDRSw2REFBVSxTQUFTLEtBQUs5QyxLQUFMLENBQVdMLFdBQTlCLEdBREY7QUFFRTtBQUFBO0FBQUEsYUFBSSxXQUFVLFVBQWQ7QUFBQTtBQUFBLFVBRkY7QUFHRSxrREFIRjtBQUlFO0FBQUE7QUFBQSxhQUFJLFdBQVUsVUFBZDtBQUF5QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQXpCO0FBQUE7QUFBMkMsZ0JBQUtLLEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I2RTtBQUEvRCxVQUpGO0FBS0Usb0VBQWlCLE9BQU8sS0FBSzNFLEtBQUwsQ0FBV21GLFdBQW5DLEdBTEY7QUFNRTtBQUNFLHNCQUFVLFVBRFo7QUFFRSwyQkFBZSxlQUZqQjtBQUdFLDBCQUFlLEtBQUt6QixLQUFMLENBQVc1RCxRQUg1QjtBQUlFLHNCQUFXOE0sa0JBSmI7QUFLRSx1QkFBWSxLQUFLbEosS0FBTCxDQUFXNUQsUUFBWCxDQUFvQjZFLE9BTGxDO0FBTUUseUJBQWMsSUFOaEI7QUFPRSxtQ0FBd0IsS0FBSzhCLG9CQUFMLENBQTBCNUIsSUFBMUIsQ0FBK0IsSUFBL0IsQ0FQMUI7QUFRRSw2QkFBa0IsS0FBSzZCLG9CQUFMLENBQTBCN0IsSUFBMUIsQ0FBK0IsSUFBL0I7QUFScEI7QUFORixRQURGO0FBbUJEOzs7O0dBeEM4QixnQkFBTUUsUzs7QUE0Q3ZDekQsb0JBQW1CcUIsU0FBbkIsR0FBK0I7QUFDN0I3QyxhQUFVLGlCQUFVa0YsTUFBVixDQUFpQmpDLFVBREU7QUFFN0JNLGdCQUFhLGlCQUFVSCxJQUFWLENBQWVIO0FBRkMsRUFBL0I7O21CQUtlekIsa0I7Ozs7Ozs7Ozs7Ozs7O0FDN0RmOzs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O2dmQU5BOztBQUVBO0FBRXNEO0FBQ0w7OztBQUNYOztBQUV0QyxLQUFNc0wscUJBQXFCO0FBQ3pCaEYsVUFBTyxJQURrQjtBQUV6QkUsVUFBTztBQUZrQixFQUEzQjs7S0FLTXRHLHNCOzs7QUFFSixtQ0FBYWtDLEtBQWIsRUFBb0I7QUFBQTs7QUFBQSxpSkFDWkEsS0FEWTs7QUFFbEIsV0FBSzFELEtBQUwsR0FBYTtBQUNYbUYsb0JBQWFDO0FBREYsTUFBYjtBQUZrQjtBQUtuQjs7OzswQ0FFcUJpQixLLEVBQU87QUFDM0I7QUFDQSxZQUFLQyxRQUFMLENBQWMsaUJBQVM7QUFDckJ0RyxlQUFNbUYsV0FBTixHQUFvQmtCLEtBQXBCO0FBQ0EsZ0JBQU9yRyxLQUFQO0FBQ0QsUUFIRDtBQUlBO0FBQ0EsV0FBTStNLGVBQWUsS0FBS2hDLGlCQUFMLENBQXVCaUMsbUJBQXZCLEVBQXJCO0FBQ0EsV0FBTXBCLFdBQVd0SCxXQUFXdUgsbUJBQTVCO0FBQ0EsZUFBUXhGLE1BQU1uRyxJQUFkO0FBQ0UsY0FBSzBMLFNBQVNLLGVBQWQ7QUFDQSxjQUFLTCxTQUFTTyxZQUFkO0FBQ0VZLHdCQUFhRSxLQUFiO0FBQ0FGLHdCQUFhNUMsR0FBYixHQUFtQixFQUFuQjtBQUNBO0FBTEo7QUFPRDs7OzBDQUVxQjVELFMsRUFBV0MsYSxFQUFlO0FBQzlDVCxlQUFRQyxHQUFSLDBDQUFtRE8sU0FBbkQsVUFBaUVDLGFBQWpFO0FBQ0Q7Ozs4QkFFUztBQUFBOztBQUNSLGNBQ0U7QUFBQTtBQUFBO0FBQ0UsNkRBQVUsU0FBUyxLQUFLOUMsS0FBTCxDQUFXTCxXQUE5QixHQURGO0FBRUU7QUFBQTtBQUFBLGFBQUksV0FBVSxVQUFkO0FBQUE7QUFBQSxVQUZGO0FBR0Usa0RBSEY7QUFJRTtBQUFBO0FBQUEsYUFBSSxXQUFVLFVBQWQ7QUFBeUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUF6QjtBQUFBO0FBQTJDLGdCQUFLSyxLQUFMLENBQVc1RCxRQUFYLENBQW9CNkU7QUFBL0QsVUFKRjtBQUtFLG9FQUFpQixPQUFPLEtBQUszRSxLQUFMLENBQVdtRixXQUFuQyxHQUxGO0FBTUU7QUFDRSxnQkFBSztBQUFBLG9CQUFLLE9BQUs0RixpQkFBTCxHQUF5QnZHLENBQTlCO0FBQUEsWUFEUDtBQUVFLHNCQUFVLFVBRlo7QUFHRSwyQkFBZSxrQ0FIakI7QUFJRSwwQkFBZSxLQUFLZCxLQUFMLENBQVc1RCxRQUo1QjtBQUtFLHNCQUFXOE0sa0JBTGI7QUFNRSx1QkFBWSxLQUFLbEosS0FBTCxDQUFXNUQsUUFBWCxDQUFvQjZFLE9BTmxDO0FBT0UseUJBQWMsSUFQaEI7QUFRRSxtQ0FBd0IsS0FBSzhCLG9CQUFMLENBQTBCNUIsSUFBMUIsQ0FBK0IsSUFBL0IsQ0FSMUI7QUFTRSw2QkFBa0IsS0FBSzZCLG9CQUFMLENBQTBCN0IsSUFBMUIsQ0FBK0IsSUFBL0I7QUFUcEI7QUFORixRQURGO0FBb0JEOzs7O0dBcERrQyxnQkFBTUUsUzs7QUF3RDNDdkQsd0JBQXVCbUIsU0FBdkIsR0FBbUM7QUFDakM3QyxhQUFVLGlCQUFVa0YsTUFBVixDQUFpQmpDLFVBRE07QUFFakNNLGdCQUFhLGlCQUFVSCxJQUFWLENBQWVIO0FBRkssRUFBbkM7O21CQUtldkIsc0I7Ozs7Ozs7Ozs7Ozs7O0FDMUVmOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O2dmQUZzRDtBQUNMOzs7QUFDWDs7QUFFdEMsS0FBTTBMLGlCQUFpQixvQkFBdkI7O0tBRU16TCx5Qjs7O0FBRUosc0NBQWFpQyxLQUFiLEVBQW9CO0FBQUE7O0FBQUEsdUpBQ1pBLEtBRFk7O0FBRWxCLFdBQUsxRCxLQUFMLEdBQWE7QUFDWG1OLGdCQUFTLENBQUM7QUFDUkMsZ0JBQU9GO0FBREMsUUFBRCxDQURFO0FBSVhHLHVCQUFnQmpJLFNBSkw7QUFLWGtJLHVCQUFnQixLQUxMO0FBTVhuSSxvQkFBYUM7QUFORixNQUFiO0FBRmtCO0FBVW5COzs7O3FDQUVnQjtBQUNmLFdBQU0rQyxPQUFPLElBQWI7QUFDQVcsaUJBQVV5RSxZQUFWLENBQXVCQyxnQkFBdkIsR0FDRzlILElBREgsQ0FDUSxtQkFBVztBQUNmLGFBQUkrSCxlQUFlQyxRQUFROU0sTUFBUixDQUFlLGdCQUFRO0FBQ3hDLGtCQUFPK00sS0FBS0MsSUFBTCxLQUFjLFlBQXJCO0FBQ0QsVUFGa0IsQ0FBbkI7QUFHQSxhQUFNVCxVQUFVLENBQUM7QUFDZkMsa0JBQU9GO0FBRFEsVUFBRCxFQUViaEMsTUFGYSxDQUVOdUMsWUFGTSxDQUFoQjtBQUdBdEYsY0FBSzdCLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGlCQUFNbU4sT0FBTixHQUFnQkEsT0FBaEI7QUFDQSxrQkFBT25OLEtBQVA7QUFDRCxVQUhEO0FBSUQsUUFaSDtBQWFEOzs7NkJBRVE2TixhLEVBQWU7QUFDdEIsWUFBS3ZILFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGVBQU1xTixjQUFOLEdBQXVCUSxhQUF2QjtBQUNBN04sZUFBTXNOLGNBQU4sR0FBdUIsSUFBdkI7QUFDQSxnQkFBT3ROLEtBQVA7QUFDRCxRQUpEO0FBS0Q7OztzQ0FFaUI7QUFDaEIsV0FBTThOLGlCQUFpQixLQUFLQyxhQUFMLENBQW1CMU4sS0FBMUM7QUFDQSxXQUFJLEtBQUtMLEtBQUwsQ0FBV3FOLGNBQVgsS0FBOEJTLGNBQTlCLElBQ0RBLGtCQUFrQkEsbUJBQW1CWixjQUR4QyxFQUN5RDtBQUN2RCxjQUFLN0QsT0FBTCxDQUFheUUsY0FBYjtBQUNEO0FBQ0Y7Ozt5Q0FFb0I7QUFDbkIsWUFBS0UsYUFBTDtBQUNEOzs7MENBRXFCM0gsSyxFQUFPO0FBQzNCLFlBQUtDLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGVBQU1tRixXQUFOLEdBQW9Ca0IsS0FBcEI7QUFDQSxnQkFBT3JHLEtBQVA7QUFDRCxRQUhEO0FBSUQ7OzswQ0FFcUJ1RyxTLEVBQVdZLEksRUFBTTtBQUNyQ3BCLGVBQVFDLEdBQVIsNkNBQXNETyxTQUF0RCxVQUFvRVksSUFBcEU7QUFDRDs7OzhCQUVTO0FBQUE7O0FBQ1IsV0FBTThHLGFBQWE7QUFDakIseUJBQWdCO0FBREMsUUFBbkI7QUFHQSxXQUFNQyxvQkFBb0I7QUFDeEIsNkJBQW9CLFNBREk7QUFFeEIsb0JBQVc7QUFGYSxRQUExQjtBQUlBLFdBQU1DLGFBQWEsS0FBS25PLEtBQUwsQ0FBV3NOLGNBQTlCO0FBQ0EsV0FBTXRGLFlBQVk7QUFDaEJGLGdCQUFPO0FBQ0xzRyxxQkFBVSxDQUFDO0FBQ1RDLHVCQUFVLEtBQUtyTyxLQUFMLENBQVdxTjtBQURaLFlBQUQ7QUFETDtBQURTLFFBQWxCO0FBT0EsY0FDRTtBQUFBO0FBQUE7QUFDRSw2REFBVSxTQUFTLEtBQUszSixLQUFMLENBQVdMLFdBQTlCLEdBREY7QUFFRTtBQUFBO0FBQUEsYUFBSSxXQUFVLFVBQWQ7QUFBQTtBQUFBLFVBRkY7QUFHRSxrREFIRjtBQUlFO0FBQUE7QUFBQSxhQUFJLFdBQVUsVUFBZDtBQUF5QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQXpCO0FBQUE7QUFBMkMsZ0JBQUtLLEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I2RTtBQUEvRCxVQUpGO0FBS0U7QUFBQTtBQUFBLGFBQUssV0FBVSxvQkFBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERjtBQUVFO0FBQUE7QUFBQSxlQUFHLE9BQU91SixpQkFBVjtBQUNFO0FBQUE7QUFBQSxpQkFBTyxPQUFJLGVBQVgsRUFBMkIsT0FBT0QsVUFBbEM7QUFBQTtBQUFBLGNBREY7QUFFRTtBQUFBO0FBQUEsaUJBQVEsS0FBSztBQUFBLDBCQUFLLE9BQUtGLGFBQUwsR0FBcUJ2SixDQUExQjtBQUFBLGtCQUFiO0FBQ0UscUJBQUcsZUFETDtBQUVFLDJCQUFVLEtBQUs4SixjQUFMLENBQW9CekosSUFBcEIsQ0FBeUIsSUFBekIsQ0FGWjtBQUdHLG9CQUFLN0UsS0FBTCxDQUFXbU4sT0FBWCxDQUFtQjFLLEdBQW5CLENBQXVCO0FBQUEsd0JBQ3JCLE9BQUt6QyxLQUFMLENBQVdxTixjQUFYLEtBQThCa0IsT0FBT0MsUUFBdEMsR0FDSTtBQUFBO0FBQUEscUJBQVEsT0FBT0QsT0FBT0MsUUFBdEIsRUFBZ0MsY0FBaEM7QUFBMENELDBCQUFPbkI7QUFBakQsa0JBREosR0FFSTtBQUFBO0FBQUEscUJBQVEsT0FBT21CLE9BQU9DLFFBQXRCO0FBQWlDRCwwQkFBT25CO0FBQXhDLGtCQUhrQjtBQUFBLGdCQUF2QjtBQUhIO0FBRkY7QUFGRixVQUxGO0FBb0JFLG9FQUFpQixPQUFPLEtBQUtwTixLQUFMLENBQVdtRixXQUFuQyxHQXBCRjtBQXFCRTtBQUNFLHNCQUFVLFVBRFo7QUFFRSwyQkFBZSxlQUZqQjtBQUdFLHdCQUFhZ0osVUFIZjtBQUlFLHlCQUFjLElBSmhCO0FBS0Usc0JBQVduRyxTQUxiO0FBTUUsMEJBQWUsS0FBS3RFLEtBQUwsQ0FBVzVELFFBTjVCO0FBT0UsdUJBQVksS0FBSzRELEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I2RSxPQVBsQztBQVFFLG1DQUF3QixLQUFLOEIsb0JBQUwsQ0FBMEI1QixJQUExQixDQUErQixJQUEvQixDQVIxQjtBQVNFLDZCQUFrQixLQUFLNkIsb0JBQUwsQ0FBMEI3QixJQUExQixDQUErQixJQUEvQixDQVRwQjtBQVVFLGdCQUFLO0FBQUEsb0JBQUssT0FBS2tHLGlCQUFMLEdBQXlCdkcsQ0FBOUI7QUFBQTtBQVZQO0FBckJGLFFBREY7QUFvQ0Q7Ozs7R0FsSHFDLGdCQUFNTyxTOztBQXNIOUN0RCwyQkFBMEJrQixTQUExQixHQUFzQztBQUNwQzdDLGFBQVUsaUJBQVVrRixNQUFWLENBQWlCakMsVUFEUztBQUVwQ00sZ0JBQWEsaUJBQVVILElBQVYsQ0FBZUg7QUFGUSxFQUF0Qzs7bUJBS2V0Qix5Qjs7Ozs7Ozs7Ozs7Ozs7QUNuSWY7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Z2ZBRnNEO0FBQ0w7OztBQUNYOztBQUV0QyxLQUFNZ04sb0JBQW9CLE1BQTFCO0FBQ0EsS0FBTUMsbUJBQW1CLGFBQXpCOztLQUVNaE4sdUI7OztBQUVKLG9DQUFhZ0MsS0FBYixFQUFvQjtBQUFBOztBQUFBLG1KQUNaQSxLQURZOztBQUVsQixXQUFLMUQsS0FBTCxHQUFhO0FBQ1gyTyx3QkFBaUIsSUFETjtBQUVYQyxrQkFBVzlGLFVBQVV5RSxZQUFWLENBQXVCc0IsdUJBQXZCLEdBQWlELFlBQWpELENBRkE7QUFHWDFKLG9CQUFhQztBQUhGLE1BQWI7QUFGa0I7QUFPbkI7Ozs7eUNBRW9CLENBQ3BCOzs7NENBRXVCLENBQ3ZCOzs7MkNBRXNCO0FBQ3JCLFlBQUtrQixRQUFMLENBQWMsaUJBQVM7QUFDckJ0RyxlQUFNMk8sZUFBTixHQUF3QixDQUFDM08sTUFBTTJPLGVBQS9CO0FBQ0EsZ0JBQU8zTyxLQUFQO0FBQ0QsUUFIRDtBQUlEOzs7MENBRXFCcUcsSyxFQUFPO0FBQzNCLFlBQUtDLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGVBQU1tRixXQUFOLEdBQW9Ca0IsS0FBcEI7QUFDQSxnQkFBT3JHLEtBQVA7QUFDRCxRQUhEO0FBSUQ7OzswQ0FFcUJ1RyxTLEVBQVdZLEksRUFBTTtBQUNyQ3BCLGVBQVFDLEdBQVIsMkNBQW9ETyxTQUFwRCxVQUFrRVksSUFBbEU7QUFDRDs7OzhCQUVTO0FBQUE7O0FBQ1IsV0FBTTJILFlBQVksQ0FBQyxZQUFELEVBQWUsS0FBSzlPLEtBQUwsQ0FBVzRPLFNBQVgsR0FBdUIsRUFBdkIsR0FBNEIsWUFBM0MsRUFBeURsRyxJQUF6RCxDQUE4RCxHQUE5RCxDQUFsQjtBQUNBLFdBQU1xRyxlQUFlLEtBQUsvTyxLQUFMLENBQVc0TyxTQUFYLEdBQXVCLFVBQXZCLEdBQW9DLGtCQUF6RDtBQUNBLFdBQU01RyxZQUFZO0FBQ2hCRixnQkFBTztBQUNMa0gsdUJBQVksS0FBS2hQLEtBQUwsQ0FBVzJPLGVBQVgsR0FBNkJGLGlCQUE3QixHQUFpREM7QUFEeEQ7QUFEUyxRQUFsQjtBQUtBLGNBQ0U7QUFBQTtBQUFBO0FBQ0UsNkRBQVUsU0FBUyxLQUFLaEwsS0FBTCxDQUFXTCxXQUE5QixHQURGO0FBRUU7QUFBQTtBQUFBLGFBQUksV0FBVSxVQUFkO0FBQUE7QUFBQSxVQUZGO0FBR0Usa0RBSEY7QUFJRTtBQUFBO0FBQUEsYUFBSSxXQUFVLFVBQWQ7QUFBeUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUF6QjtBQUFBO0FBQTJDLGdCQUFLSyxLQUFMLENBQVc1RCxRQUFYLENBQW9CNkU7QUFBL0QsVUFKRjtBQUtFO0FBQUE7QUFBQSxhQUFHLFdBQVdtSyxTQUFkO0FBQXlCO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFBekI7QUFBNEQ7QUFBQTtBQUFBO0FBQVNDO0FBQVQsWUFBNUQ7QUFBMkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUEzRjtBQUF5RztBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQXpHO0FBQWdJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBaEksVUFMRjtBQU1FLG9FQUFpQixPQUFPLEtBQUsvTyxLQUFMLENBQVdtRixXQUFuQyxHQU5GO0FBT0U7QUFBQTtBQUFBLGFBQUssU0FBUyxLQUFLOEosbUJBQUwsQ0FBeUJwSyxJQUF6QixDQUE4QixJQUE5QixDQUFkO0FBQ0U7QUFDRSx3QkFBVSxVQURaO0FBRUUsNkJBQWUsZUFGakI7QUFHRSwyQkFBYyxJQUhoQjtBQUlFLHdCQUFXbUQsU0FKYjtBQUtFLDRCQUFlLEtBQUt0RSxLQUFMLENBQVc1RCxRQUw1QjtBQU1FLHlCQUFZLEtBQUs0RCxLQUFMLENBQVc1RCxRQUFYLENBQW9CNkUsT0FObEM7QUFPRSxxQ0FBd0IsS0FBSzhCLG9CQUFMLENBQTBCNUIsSUFBMUIsQ0FBK0IsSUFBL0IsQ0FQMUI7QUFRRSwrQkFBa0IsS0FBSzZCLG9CQUFMLENBQTBCN0IsSUFBMUIsQ0FBK0IsSUFBL0IsQ0FScEI7QUFTRSxrQkFBSztBQUFBLHNCQUFLLE9BQUtrRyxpQkFBTCxHQUF5QnZHLENBQTlCO0FBQUE7QUFUUDtBQURGO0FBUEYsUUFERjtBQXVCRDs7OztHQWxFbUMsZ0JBQU1PLFM7O0FBc0U1Q3JELHlCQUF3QmlCLFNBQXhCLEdBQW9DO0FBQ2xDN0MsYUFBVSxpQkFBVWtGLE1BQVYsQ0FBaUJqQyxVQURPO0FBRWxDTSxnQkFBYSxpQkFBVUgsSUFBVixDQUFlSDtBQUZNLEVBQXBDOzttQkFLZXJCLHVCOzs7Ozs7Ozs7Ozs7OztBQ25GZjs7OztBQUdBOzs7Ozs7Ozs7O2dmQUpBOztBQUVBOzs7QUFFc0M7O0FBRXRDLEtBQU13TixnQkFBZ0Isa0JBQXRCOztLQUVNdk4sb0I7OztBQUVKLGlDQUFhK0IsS0FBYixFQUFvQjtBQUFBOztBQUFBLDZJQUNaQSxLQURZOztBQUVsQixXQUFLMUQsS0FBTCxHQUFhO0FBQ1htSCxhQUFNL0IsU0FESztBQUVYbUIsa0JBQVduQixTQUZBO0FBR1h1RyxlQUFRLFVBSEc7QUFJWHdELGdCQUFTLENBQUNELGFBQUQsRUFBZ0IsV0FBaEIsRUFBNkIsT0FBN0IsRUFBc0MsTUFBdEMsQ0FKRTtBQUtYRSx1QkFBZ0I7QUFMTCxNQUFiO0FBRmtCO0FBU25COzs7OytCQUVVO0FBQ1QsV0FBTWpILE9BQU8sSUFBYjtBQUNBLGNBQU8sSUFBSUcsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxhQUFNakMsWUFBWSxJQUFJakMsV0FBV3FFLFlBQWYsRUFBbEI7QUFDQSxhQUFNeEIsT0FBTyxJQUFJN0MsV0FBV3NFLGFBQWYsQ0FBNkIsbUJBQTdCLENBQWI7QUFDQUUsbUJBQVVJLFlBQVYsQ0FBdUI7QUFDckJ0QixrQkFBTyxDQUFDTyxLQUFLekUsS0FBTCxDQUFXNUQsUUFBWCxDQUFvQjhILEtBQXJCLEdBQTZCLEtBQTdCLEdBQXFDLElBRHZCO0FBRXJCRSxrQkFBTyxDQUFDSyxLQUFLekUsS0FBTCxDQUFXNUQsUUFBWCxDQUFvQmdJLEtBQXJCLEdBQTZCLEtBQTdCLEdBQXFDO0FBRnZCLFVBQXZCLEVBR0csaUJBQVM7O0FBRVY7QUFDQTtBQUNBO0FBQ0F2QixxQkFBVTRDLFlBQVYsQ0FBdUJDLEtBQXZCO0FBQ0FqQyxnQkFBS2tDLE9BQUwsQ0FBYUQsS0FBYixFQUFvQixJQUFwQjs7QUFFQWpCLGdCQUFLN0IsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcsbUJBQU11RyxTQUFOLEdBQWtCQSxTQUFsQjtBQUNBdkcsbUJBQU1tSCxJQUFOLEdBQWFBLElBQWI7QUFDQSxvQkFBT25ILEtBQVA7QUFDRCxZQUpEOztBQU1BdUk7QUFFRCxVQW5CRCxFQW1CRyxpQkFBUztBQUNWeEMsbUJBQVEyQixLQUFSLHdDQUFtREEsS0FBbkQ7QUFDQWMsa0JBQU9kLEtBQVA7QUFDRCxVQXRCRDtBQXVCRCxRQTFCTSxDQUFQO0FBMkJEOzs7K0JBRVU7QUFDVCxXQUFNUyxPQUFPLElBQWI7QUFDQSxXQUFNNUIsWUFBWSxLQUFLdkcsS0FBTCxDQUFXdUcsU0FBN0I7QUFDQSxXQUFNWSxPQUFPLEtBQUtuSCxLQUFMLENBQVdtSCxJQUF4QjtBQUNBQSxZQUFLb0MsZUFBTCxDQUFxQmhELFNBQXJCOztBQUVBNEIsWUFBSzdCLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGVBQU0yTCxNQUFOLEdBQWUsNEJBQWY7QUFDQSxnQkFBTzNMLEtBQVA7QUFDRCxRQUhEOztBQUtBO0FBQ0F1RyxpQkFBVW9ELElBQVYsQ0FBZWhFLE9BQU9zQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLdkUsS0FBTCxDQUFXNUQsUUFBN0IsRUFBdUM7QUFDcEQ4RyxtQkFBVSxJQUQwQztBQUVwREMsZUFBTSxLQUFLbkQsS0FBTCxDQUFXNUQsUUFBWCxDQUFvQjJKLE9BRjBCO0FBR3BEQyxxQkFBWSxLQUFLaEcsS0FBTCxDQUFXNUQsUUFBWCxDQUFvQjZFLE9BSG9CO0FBSXBEb0MscUJBQVk7QUFKd0MsUUFBdkMsQ0FBZixFQU1DckIsSUFORCxDQU1NLFlBQU07QUFDVjtBQUNBeUMsY0FBSzdCLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGlCQUFNMkwsTUFBTixHQUFlLDZCQUFmO0FBQ0Esa0JBQU8zTCxLQUFQO0FBQ0QsVUFIRDtBQUlBLGdCQUFPdUcsVUFBVXVELE9BQVYsRUFBUDtBQUNELFFBYkQsRUFjQ3BFLElBZEQsQ0FjTSxZQUFNO0FBQ1Z5QyxjQUFLN0IsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcsaUJBQU0yTCxNQUFOLEdBQWUsbUNBQWY7QUFDQSxrQkFBTzNMLEtBQVA7QUFDRCxVQUhEO0FBSUQsUUFuQkQsRUFvQkNnSyxLQXBCRCxDQW9CTyxpQkFBUztBQUNkO0FBQ0EsYUFBTUMsWUFBWSxPQUFPdkMsS0FBUCxLQUFpQixRQUFqQixHQUE0QkEsS0FBNUIsR0FBb0N6QixLQUFLQyxTQUFMLENBQWV3QixLQUFmLEVBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQXREO0FBQ0FTLGNBQUs3QixRQUFMLENBQWMsaUJBQVM7QUFDckJ0RyxpQkFBTTJMLE1BQU4sZUFBeUIxQixTQUF6QjtBQUNBLGtCQUFPakssS0FBUDtBQUNELFVBSEQ7QUFJQStGLGlCQUFRMkIsS0FBUix3Q0FBbUR1QyxTQUFuRDtBQUNELFFBNUJEO0FBOEJEOzs7aUNBRVk7QUFDWCxXQUFNOUIsT0FBTyxJQUFiO0FBQ0EsY0FBTyxJQUFJRyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLGFBQU1yQixPQUFPZ0IsS0FBS25JLEtBQUwsQ0FBV21ILElBQXhCO0FBQ0EsYUFBTVosWUFBWTRCLEtBQUtuSSxLQUFMLENBQVd1RyxTQUE3QjtBQUNBLGFBQUlBLFNBQUosRUFBZTtBQUNiQSxxQkFBVTJELFNBQVYsR0FDR3hFLElBREgsQ0FDUSxZQUFNO0FBQ1Z5QixrQkFBS0EsSUFBTCxDQUFVZ0QsR0FBVixHQUFnQixFQUFoQjtBQUNBNUQsdUJBQVU2RCxPQUFWLENBQWtCaEYsU0FBbEI7QUFDQStDLGtCQUFLN0IsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcscUJBQU11RyxTQUFOLEdBQWtCbkIsU0FBbEI7QUFDQXBGLHFCQUFNbUgsSUFBTixHQUFhL0IsU0FBYjtBQUNBcEYscUJBQU1xTixjQUFOLEdBQXVCakksU0FBdkI7QUFDQSxzQkFBT3BGLEtBQVA7QUFDRCxjQUxEO0FBTUF1STtBQUNELFlBWEgsRUFZR3lCLEtBWkgsQ0FZUyxpQkFBUztBQUNkLGlCQUFNQyxZQUFZLE9BQU92QyxLQUFQLEtBQWlCLFFBQWpCLEdBQTRCQSxLQUE1QixHQUFvQ3pCLEtBQUtDLFNBQUwsQ0FBZXdCLEtBQWYsRUFBc0IsSUFBdEIsRUFBNEIsQ0FBNUIsQ0FBdEQ7QUFDQTNCLHFCQUFRMkIsS0FBUixnREFBMkR1QyxTQUEzRDtBQUNBekIsb0JBQU9kLEtBQVA7QUFDRCxZQWhCSDtBQWlCRCxVQWxCRCxNQW1CSztBQUNIYTtBQUNEO0FBQ0YsUUF6Qk0sQ0FBUDtBQTBCRDs7O3lDQUVvQjtBQUNuQixXQUFNcUIsTUFBTSxLQUFLRSxPQUFMLENBQWFqRixJQUFiLENBQWtCLElBQWxCLENBQVo7QUFDQSxZQUFLd0UsT0FBTCxHQUNHM0QsSUFESCxDQUNRa0UsR0FEUixFQUVHSSxLQUZILENBRVMsWUFBTTtBQUNYakUsaUJBQVEyQixLQUFSLENBQWMsc0VBQWQ7QUFDRCxRQUpIO0FBS0Q7Ozs0Q0FFdUI7QUFDdEIsWUFBS3dDLFNBQUw7QUFDRDs7O3NDQUVpQjtBQUNoQixXQUFNbUYsaUJBQWlCLEtBQUtDLGFBQUwsQ0FBbUJqUCxLQUExQztBQUNBLFdBQUlrUCxZQUFZRixtQkFBbUJILGFBQW5CLEdBQW1DLEVBQW5DLEdBQXdDRyxjQUF4RDtBQUNBLFlBQUsvSSxRQUFMLENBQWMsaUJBQVM7QUFDckJ0RyxlQUFNb1AsY0FBTixHQUF1QkcsU0FBdkI7QUFDQSxnQkFBT3ZQLEtBQVA7QUFDRCxRQUhEO0FBSUQ7Ozs4QkFFUztBQUFBOztBQUNSLFdBQU1pTyxhQUFhO0FBQ2pCLHlCQUFnQjtBQURDLFFBQW5CO0FBR0EsV0FBTXVCLG9CQUFvQjtBQUN4Qiw2QkFBb0IsU0FESTtBQUV4QixvQkFBVztBQUZhLFFBQTFCO0FBSUEsV0FBTUosaUJBQWlCLEtBQUtwUCxLQUFMLENBQVdvUCxjQUFYLENBQTBCbEUsTUFBMUIsQ0FBaUMsQ0FBQyxlQUFELENBQWpDLENBQXZCO0FBQ0EsY0FDRTtBQUFBO0FBQUE7QUFDRSw2REFBVSxTQUFTLEtBQUt4SCxLQUFMLENBQVdMLFdBQTlCLEdBREY7QUFFRTtBQUFBO0FBQUEsYUFBSSxXQUFVLFVBQWQ7QUFBQTtBQUFBLFVBRkY7QUFHRSxrREFIRjtBQUlFO0FBQUE7QUFBQSxhQUFJLFdBQVUsVUFBZDtBQUF5QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQXpCO0FBQUE7QUFBMkMsZ0JBQUtLLEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I2RTtBQUEvRCxVQUpGO0FBS0U7QUFBQTtBQUFBLGFBQUssV0FBVSxvQkFBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERjtBQUVFO0FBQUE7QUFBQSxlQUFHLE9BQU82SyxpQkFBVjtBQUNFO0FBQUE7QUFBQSxpQkFBTyxPQUFJLGVBQVgsRUFBMkIsT0FBT3ZCLFVBQWxDO0FBQUE7QUFBQSxjQURGO0FBRUU7QUFBQTtBQUFBLGlCQUFRLEtBQUs7QUFBQSwwQkFBSyxPQUFLcUIsYUFBTCxHQUFxQjlLLENBQTFCO0FBQUEsa0JBQWI7QUFDRSxxQkFBRyxlQURMO0FBRUUsMkJBQVUsS0FBS2lMLGNBQUwsQ0FBb0I1SyxJQUFwQixDQUF5QixJQUF6QixDQUZaO0FBR0csb0JBQUs3RSxLQUFMLENBQVdtUCxPQUFYLENBQW1CMU0sR0FBbkIsQ0FBdUI7QUFBQSx3QkFDdEI7QUFBQTtBQUFBLHFCQUFRLE9BQU83QixNQUFmO0FBQXdCQTtBQUF4QixrQkFEc0I7QUFBQSxnQkFBdkI7QUFISDtBQUZGO0FBRkYsVUFMRjtBQWtCRTtBQUFBO0FBQUEsYUFBRyxXQUFVLCtCQUFiO0FBQUE7QUFBc0QsZ0JBQUtaLEtBQUwsQ0FBVzJMO0FBQWpFLFVBbEJGO0FBbUJFO0FBQUE7QUFBQSxhQUFLLEtBQUs7QUFBQSxzQkFBSyxPQUFLTixlQUFMLEdBQXVCN0csQ0FBNUI7QUFBQSxjQUFWO0FBQ0UsaUJBQUcsaUJBREw7QUFFRSx3QkFBVSxVQUZaO0FBR0Usb0RBQU8sS0FBSztBQUFBLHNCQUFLLE9BQUt1RyxpQkFBTCxHQUF5QnZHLENBQTlCO0FBQUEsY0FBWjtBQUNFLGlCQUFHLG1CQURMO0FBRUUsd0JBQVc0SyxjQUZiO0FBR0UsMkJBSEYsRUFHVyxjQUhYLEVBR29CLGNBSHBCO0FBSEY7QUFuQkYsUUFERjtBQThCRDs7OztHQW5MZ0MsZ0JBQU1ySyxTOztBQXVMekNwRCxzQkFBcUJnQixTQUFyQixHQUFpQztBQUMvQjdDLGFBQVUsaUJBQVVrRixNQUFWLENBQWlCakMsVUFESTtBQUUvQk0sZ0JBQWEsaUJBQVVILElBQVYsQ0FBZUg7QUFGRyxFQUFqQzs7bUJBS2VwQixvQjs7Ozs7Ozs7Ozs7Ozs7QUNuTWY7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Z2ZBTkE7O0FBRUE7QUFHaUQ7OztBQUNYOztLQUVoQ0oscUI7OztBQUVKLGtDQUFhbUMsS0FBYixFQUFvQjtBQUFBOztBQUFBLCtJQUNaQSxLQURZOztBQUVsQjtBQUNBLFdBQUsxRCxLQUFMLEdBQWE7QUFDWG1ILGFBQU0vQixTQURLO0FBRVhtQixrQkFBV25CLFNBRkE7QUFHWHNLLDhCQUF1QnRLLFNBSFo7QUFJWEQsb0JBQWFDO0FBSkYsTUFBYjtBQU1BLFdBQUt1SyxlQUFMLEdBQXVCdkssU0FBdkI7QUFUa0I7QUFVbkI7Ozs7K0JBRVU7QUFBQTs7QUFDVCxXQUFNK0MsT0FBTyxJQUFiOztBQUVBLGNBQU8sSUFBSUcsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjs7QUFFdEMsYUFBTWpDLFlBQVksSUFBSWpDLFdBQVc0QyxnQkFBZixFQUFsQjtBQUNBLGFBQU1DLE9BQU8sSUFBSTdDLFdBQVdzRSxhQUFmLENBQTZCLG1CQUE3QixDQUFiO0FBQ0F6QixjQUFLb0MsZUFBTCxDQUFxQmhELFNBQXJCOztBQUVBO0FBQ0EsZ0JBQUtvSixlQUFMLEdBQXVCcEosU0FBdkI7QUFDQSxnQkFBS29KLGVBQUwsQ0FBcUIxRyxFQUFyQixDQUF3QixHQUF4QixFQUE2QixPQUFLdkMsb0JBQWxDOztBQUVBLGFBQU1rSixZQUFZakssT0FBT3NDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLE9BQUt2RSxLQUFMLENBQVc1RCxRQUE3QixFQUF1QztBQUN2RDhHLHFCQUFVLElBRDZDO0FBRXZEQyxpQkFBTSxPQUFLbkQsS0FBTCxDQUFXNUQsUUFBWCxDQUFvQjJKLE9BRjZCO0FBR3ZEQyx1QkFBWSxPQUFLaEcsS0FBTCxDQUFXNUQsUUFBWCxDQUFvQjZFLE9BSHVCO0FBSXZEb0MsdUJBQVk7QUFKMkMsVUFBdkMsQ0FBbEI7QUFNQSxhQUFNOEksYUFBYWxLLE9BQU9zQyxNQUFQLENBQWMsRUFBZCxFQUFrQixPQUFLdkUsS0FBTCxDQUFXNUQsUUFBN0IsRUFBdUM7QUFDeEQ4RyxxQkFBVSxNQUQ4QztBQUV4REMsaUJBQU0sT0FBS25ELEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0JnUSxRQUY4QjtBQUd4RHBHLHVCQUFZLE9BQUtoRyxLQUFMLENBQVc1RCxRQUFYLENBQW9CNkUsT0FId0I7QUFJeERvTCxnQkFBSztBQUptRCxVQUF2QyxDQUFuQjtBQU1BLGFBQU1DLGVBQWUsT0FBS3RNLEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0JtUSxzQkFBcEIsQ0FBMkNDLEtBQTNDLENBQWlELEdBQWpELEVBQXNEek4sR0FBdEQsQ0FBMEQsZ0JBQVE7QUFDckYsa0JBQU9rTCxLQUFLd0MsSUFBTCxFQUFQO0FBQ0QsVUFGb0IsQ0FBckI7O0FBSUE1SixtQkFBVTZKLGVBQVYsQ0FBMEJKLFlBQTFCLEVBQ0dyRyxJQURILENBQ1E7QUFDSjBHLGdCQUFLVCxTQUREO0FBRUpVLGlCQUFNVDtBQUZGLFVBRFIsRUFLR25LLElBTEgsQ0FLUSxVQUFDNkssaUJBQUQsRUFBdUI7QUFDM0I7QUFDQSxlQUFNclEsT0FBT3FRLG9CQUFvQkEsa0JBQWtCQyxPQUFsQixFQUFwQixHQUFrRHBMLFNBQS9EO0FBQ0EsZUFBSWxGLEtBQUtrQixXQUFMLE9BQXVCbUYsVUFBVWtLLFlBQVYsQ0FBdUJDLEdBQWxELEVBQXVEO0FBQ3JELGlCQUFNN0gsTUFBTUMsVUFBVUMsV0FBVixJQUF5QkQsU0FBckM7QUFDQUQsaUJBQUlLLFlBQUosQ0FBaUI7QUFDZnRCLHNCQUFPLENBQUNPLEtBQUt6RSxLQUFMLENBQVc1RCxRQUFYLENBQW9COEgsS0FBckIsR0FBNkIsS0FBN0IsR0FBcUMsSUFEN0I7QUFFZkUsc0JBQU8sQ0FBQ0ssS0FBS3pFLEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0JnSSxLQUFyQixHQUE2QixLQUE3QixHQUFxQztBQUY3QixjQUFqQixFQUdHLGlCQUFTOztBQUVWO0FBQ0E7QUFDQTtBQUNBeUksaUNBQWtCcEgsWUFBbEIsQ0FBK0JDLEtBQS9CO0FBQ0FqQyxvQkFBS2tDLE9BQUwsQ0FBYUQsS0FBYixFQUFvQixJQUFwQjs7QUFFQWpCLG9CQUFLN0IsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcsdUJBQU11RyxTQUFOLEdBQWtCZ0ssaUJBQWxCO0FBQ0F2USx1QkFBTW1ILElBQU4sR0FBYUEsSUFBYjtBQUNBbkgsdUJBQU0wUCxxQkFBTixHQUE4QnhQLElBQTlCO0FBQ0Esd0JBQU9GLEtBQVA7QUFDRCxnQkFMRDtBQU1BdUk7QUFDRCxjQWxCRCxFQWtCRyxpQkFBUztBQUNWeEMsdUJBQVEyQixLQUFSLHlDQUFvREEsS0FBcEQ7QUFDQWMsc0JBQU9kLEtBQVA7QUFDRCxjQXJCRDtBQXNCRCxZQXhCRCxNQXlCSztBQUNIUyxrQkFBSzdCLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLHFCQUFNdUcsU0FBTixHQUFrQmdLLGlCQUFsQjtBQUNBdlEscUJBQU1tSCxJQUFOLEdBQWFBLElBQWI7QUFDQW5ILHFCQUFNMFAscUJBQU4sR0FBOEJ4UCxJQUE5QjtBQUNBLHNCQUFPRixLQUFQO0FBQ0QsY0FMRDtBQU1BdVEsaUNBQW9CaEksU0FBcEIsR0FBZ0NDLE9BQU8sMkJBQVAsQ0FBaEM7QUFDRDtBQUNEO0FBQ0QsVUEzQ0g7QUE0Q0U7QUFDRCxRQXZFSSxDQUFQO0FBd0VEOzs7K0JBRVU7QUFDVCxXQUFNakMsWUFBWSxLQUFLdkcsS0FBTCxDQUFXdUcsU0FBN0I7QUFDQTtBQUNBQSxpQkFBVXVELE9BQVYsR0FDR3BFLElBREgsQ0FDUSxZQUFNO0FBQ1ZLLGlCQUFRQyxHQUFSLENBQVksd0NBQVo7QUFDRCxRQUhILEVBSUdnRSxLQUpILENBSVMsaUJBQVM7QUFDZDtBQUNBLGFBQU1DLFlBQVksT0FBT3ZDLEtBQVAsS0FBaUIsUUFBakIsR0FBNEJBLEtBQTVCLEdBQW9DekIsS0FBS0MsU0FBTCxDQUFld0IsS0FBZixFQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUF0RDtBQUNBM0IsaUJBQVEyQixLQUFSLHlDQUFvRHVDLFNBQXBEO0FBQ0QsUUFSSDtBQVNEOzs7aUNBRVk7QUFDWCxXQUFNOUIsT0FBTyxJQUFiO0FBQ0EsY0FBTyxJQUFJRyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLGFBQU1yQixPQUFPZ0IsS0FBS25JLEtBQUwsQ0FBV21ILElBQXhCO0FBQ0EsYUFBTVosWUFBWTRCLEtBQUtuSSxLQUFMLENBQVd1RyxTQUE3QjtBQUNBLGFBQUlBLFNBQUosRUFBZTtBQUNiQSxxQkFBVTJELFNBQVYsR0FDR3hFLElBREgsQ0FDUSxZQUFNO0FBQ1Z5QixrQkFBS0EsSUFBTCxDQUFVZ0QsR0FBVixHQUFnQixFQUFoQjtBQUNBNUQsdUJBQVU2RCxPQUFWLENBQWtCaEYsU0FBbEI7QUFDQStDLGtCQUFLN0IsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcscUJBQU11RyxTQUFOLEdBQWtCbkIsU0FBbEI7QUFDQXBGLHFCQUFNbUgsSUFBTixHQUFhL0IsU0FBYjtBQUNBcEYscUJBQU1xTixjQUFOLEdBQXVCakksU0FBdkI7QUFDQSxzQkFBT3BGLEtBQVA7QUFDRCxjQUxEO0FBTUF1STtBQUNELFlBWEgsRUFZR3lCLEtBWkgsQ0FZUyxpQkFBUztBQUNkLGlCQUFNQyxZQUFZLE9BQU92QyxLQUFQLEtBQWlCLFFBQWpCLEdBQTRCQSxLQUE1QixHQUFvQ3pCLEtBQUtDLFNBQUwsQ0FBZXdCLEtBQWYsRUFBc0IsSUFBdEIsRUFBNEIsQ0FBNUIsQ0FBdEQ7QUFDQTNCLHFCQUFRMkIsS0FBUiwrQ0FBMER1QyxTQUExRDtBQUNBekIsb0JBQU9kLEtBQVA7QUFDRCxZQWhCSDtBQWlCRCxVQWxCRCxNQW1CSztBQUNIYTtBQUNEO0FBQ0YsUUF6Qk0sQ0FBUDtBQTBCRDs7O3lDQUVvQjtBQUNuQixXQUFNcUIsTUFBTSxLQUFLRSxPQUFMLENBQWFqRixJQUFiLENBQWtCLElBQWxCLENBQVo7QUFDQSxZQUFLd0UsT0FBTCxHQUNHM0QsSUFESCxDQUNRa0UsR0FEUixFQUVHSSxLQUZILENBRVMsaUJBQVM7QUFDZGpFLGlCQUFRMkIsS0FBUiwyRUFBc0ZBLEtBQXRGO0FBQ0QsUUFKSDtBQUtEOzs7NENBRXVCO0FBQ3RCLFlBQUt3QyxTQUFMO0FBQ0EsV0FBSSxLQUFLeUYsZUFBVCxFQUEwQjtBQUN4QixjQUFLQSxlQUFMLENBQXFCdEYsR0FBckIsQ0FBeUIsR0FBekIsRUFBOEIsS0FBSzNELG9CQUFuQztBQUNBLGNBQUtpSixlQUFMLEdBQXVCdkssU0FBdkI7QUFDRDtBQUNGOzs7MENBRXFCaUIsSyxFQUFPO0FBQzNCLFlBQUtDLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGVBQU1tRixXQUFOLEdBQW9Ca0IsS0FBcEI7QUFDQSxnQkFBT3JHLEtBQVA7QUFDRCxRQUhEO0FBSUQ7Ozs4QkFFUztBQUFBOztBQUNSLGNBQ0U7QUFBQTtBQUFBO0FBQ0UsNkRBQVUsU0FBUyxLQUFLMEQsS0FBTCxDQUFXTCxXQUE5QixHQURGO0FBRUU7QUFBQTtBQUFBLGFBQUksV0FBVSxVQUFkO0FBQUE7QUFBQSxVQUZGO0FBR0Usa0RBSEY7QUFJRTtBQUFBO0FBQUEsYUFBSSxXQUFVLFVBQWQ7QUFBeUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUF6QjtBQUFBO0FBQTJDLGdCQUFLSyxLQUFMLENBQVc1RCxRQUFYLENBQW9CNkU7QUFBL0QsVUFKRjtBQUtFO0FBQUE7QUFBQSxhQUFHLFdBQVUsa0NBQWI7QUFBQTtBQUErRSxnQkFBSzNFLEtBQUwsQ0FBVzBQO0FBQTFGLFVBTEY7QUFNRSxvRUFBaUIsT0FBTyxLQUFLMVAsS0FBTCxDQUFXbUYsV0FBbkMsR0FORjtBQU9FO0FBQUE7QUFBQSxhQUFLLEtBQUs7QUFBQSxzQkFBSyxPQUFLa0csZUFBTCxHQUF1QjdHLENBQTVCO0FBQUEsY0FBVjtBQUNFLGlCQUFHLGlCQURMO0FBRUUsd0JBQVUsVUFGWjtBQUdFLG9EQUFPLEtBQUs7QUFBQSxzQkFBSyxPQUFLdUcsaUJBQUwsR0FBeUJ2RyxDQUE5QjtBQUFBLGNBQVo7QUFDRSxpQkFBRyxtQkFETDtBQUVFLHdCQUFVLGVBRlo7QUFHRSwyQkFIRixFQUdXLGNBSFgsRUFHb0IsY0FIcEI7QUFIRjtBQVBGLFFBREY7QUFrQkQ7Ozs7R0FsTGlDLGdCQUFNTyxTOztBQXNMMUN4RCx1QkFBc0JvQixTQUF0QixHQUFrQztBQUNoQzdDLGFBQVUsaUJBQVVrRixNQUFWLENBQWlCakMsVUFESztBQUVoQ00sZ0JBQWEsaUJBQVVILElBQVYsQ0FBZUg7QUFGSSxFQUFsQzs7bUJBS2V4QixxQjs7Ozs7O0FDbk1mOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQSxvQzs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Z2ZBRnNEO0FBQ0w7OztBQUNYOztLQUVoQ0sseUI7OztBQUVKLHNDQUFhOEIsS0FBYixFQUFvQjtBQUFBOztBQUFBLHVKQUNaQSxLQURZOztBQUVsQixXQUFLMUQsS0FBTCxHQUFhO0FBQ1gyUSxzQkFBZSxLQURKO0FBRVh4TCxvQkFBYUM7QUFGRixNQUFiO0FBRmtCO0FBTW5COzs7OzJDQUVzQjtBQUNyQixXQUFNMkgsZUFBZSxLQUFLaEMsaUJBQUwsQ0FBdUJpQyxtQkFBdkIsRUFBckI7QUFDQSxZQUFLNEQsV0FBTCxDQUFpQjdELFlBQWpCO0FBQ0EsWUFBSzhELFlBQUwsQ0FBa0I5RCxZQUFsQjtBQUNEOzs7aUNBRVkrRCxhLEVBQWU7QUFDMUIsV0FBTUMsU0FBUyxLQUFLQyxjQUFwQjtBQUNBLFdBQU1DLFVBQVVGLE9BQU9HLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBaEI7QUFDQUQsZUFBUUUsU0FBUixHQUFvQixTQUFwQjtBQUNBRixlQUFRRyxRQUFSLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBQXVCTixjQUFjTyxXQUFyQyxFQUFrRFAsY0FBY1EsWUFBaEU7QUFDQSxZQUFLaEwsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcsZUFBTTJRLGFBQU4sR0FBc0IsS0FBdEI7QUFDQSxnQkFBTzNRLEtBQVA7QUFDRCxRQUhEO0FBSUQ7OztrQ0FFYThRLGEsRUFBZTtBQUMzQixXQUFNQyxTQUFTLEtBQUtDLGNBQXBCO0FBQ0EsV0FBTUMsVUFBVUYsT0FBT0csVUFBUCxDQUFrQixJQUFsQixDQUFoQjtBQUNBSCxjQUFPbEUsS0FBUCxHQUFlaUUsY0FBY08sV0FBN0I7QUFDQU4sY0FBT2pFLE1BQVAsR0FBZ0JnRSxjQUFjUSxZQUE5QjtBQUNBTCxlQUFRTSxTQUFSLENBQWtCVCxhQUFsQixFQUFpQyxDQUFqQyxFQUFvQyxDQUFwQyxFQUF1Q0EsY0FBY08sV0FBckQsRUFBa0VQLGNBQWNRLFlBQWhGO0FBQ0EsWUFBS2hMLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGVBQU0yUSxhQUFOLEdBQXNCLElBQXRCO0FBQ0EsZ0JBQU8zUSxLQUFQO0FBQ0QsUUFIRDtBQUlEOzs7MENBRXFCcUcsSyxFQUFPO0FBQzNCLFlBQUtDLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGVBQU1tRixXQUFOLEdBQW9Ca0IsS0FBcEI7QUFDQSxnQkFBT3JHLEtBQVA7QUFDRCxRQUhEO0FBSUQ7OzswQ0FFcUJ1RyxTLEVBQVdZLEksRUFBTTtBQUNyQ3BCLGVBQVFDLEdBQVIsNkNBQXNETyxTQUF0RCxVQUFvRVksSUFBcEU7QUFDRDs7O3lDQUVvQjtBQUNuQixZQUFLeUosV0FBTCxDQUFpQixLQUFLN0YsaUJBQUwsQ0FBdUJpQyxtQkFBdkIsRUFBakI7QUFDRDs7OzhCQUVTO0FBQUE7O0FBQ1IsV0FBTXdFLFVBQVUsS0FBS3hSLEtBQUwsQ0FBVzJRLGFBQVgsR0FBMkIsUUFBM0IsR0FBc0MsU0FBdEQ7QUFDQSxXQUFNYyxtQkFBbUI7QUFDdkIsdUJBQWNELE9BRFM7QUFFdkIscUJBQVksVUFGVztBQUd2QixvQkFBVyxNQUhZO0FBSXZCLGtCQUFTLFNBSmM7QUFLdkIsa0JBQVMsTUFMYztBQU12Qix1QkFBYztBQU5TLFFBQXpCO0FBUUEsY0FDRTtBQUFBO0FBQUE7QUFDRSw2REFBVSxTQUFTLEtBQUs5TixLQUFMLENBQVdMLFdBQTlCLEdBREY7QUFFRTtBQUFBO0FBQUEsYUFBSSxXQUFVLFVBQWQ7QUFBQTtBQUFBLFVBRkY7QUFHRSxrREFIRjtBQUlFO0FBQUE7QUFBQSxhQUFJLFdBQVUsVUFBZDtBQUF5QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQXpCO0FBQUE7QUFBMkMsZ0JBQUtLLEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I2RTtBQUEvRCxVQUpGO0FBS0Usb0VBQWlCLE9BQU8sS0FBSzNFLEtBQUwsQ0FBV21GLFdBQW5DLEdBTEY7QUFNRTtBQUFBO0FBQUEsYUFBSyxTQUFTLEtBQUt1TSxtQkFBTCxDQUF5QjdNLElBQXpCLENBQThCLElBQTlCLENBQWQ7QUFDRTtBQUNFLHdCQUFVLFVBRFo7QUFFRSw2QkFBZSxlQUZqQjtBQUdFLDJCQUFjLElBSGhCO0FBSUUsNEJBQWUsS0FBS25CLEtBQUwsQ0FBVzVELFFBSjVCO0FBS0UseUJBQVksS0FBSzRELEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I2RSxPQUxsQztBQU1FLHFDQUF3QixLQUFLOEIsb0JBQUwsQ0FBMEI1QixJQUExQixDQUErQixJQUEvQixDQU4xQjtBQU9FLCtCQUFrQixLQUFLNkIsb0JBQUwsQ0FBMEI3QixJQUExQixDQUErQixJQUEvQixDQVBwQjtBQVFFLGtCQUFLO0FBQUEsc0JBQUssT0FBS2tHLGlCQUFMLEdBQXlCdkcsQ0FBOUI7QUFBQTtBQVJQO0FBREYsVUFORjtBQWtCRTtBQUFBO0FBQUEsYUFBSyxXQUFVLFVBQWY7QUFDRTtBQUFBO0FBQUEsZUFBRyxPQUFPaU4sZ0JBQVY7QUFBNEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUE1QjtBQUFzRSxzREFBdEU7QUFBMkU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEzRSxZQURGO0FBRUUscURBQVEsS0FBSztBQUFBLHNCQUFLLE9BQUtULGNBQUwsR0FBc0J4TSxDQUEzQjtBQUFBLGNBQWI7QUFGRjtBQWxCRixRQURGO0FBeUJEOzs7O0dBekZxQyxnQkFBTU8sUzs7QUE2RjlDbkQsMkJBQTBCZSxTQUExQixHQUFzQztBQUNwQzdDLGFBQVUsaUJBQVVrRixNQUFWLENBQWlCakMsVUFEUztBQUVwQ00sZ0JBQWEsaUJBQVVILElBQVYsQ0FBZUg7QUFGUSxFQUF0Qzs7bUJBS2VuQix5Qjs7Ozs7Ozs7Ozs7Ozs7QUN4R2Y7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Z2ZBRnNEO0FBQ0w7OztBQUNYOztLQUVoQ0MsMEI7OztBQUVKLHVDQUFhNkIsS0FBYixFQUFvQjtBQUFBOztBQUFBLHlKQUNaQSxLQURZOztBQUVsQixXQUFLMUQsS0FBTCxHQUFhO0FBQ1gyUixtQkFBWXZNLFNBREQ7QUFFWEQsb0JBQWFDO0FBRkYsTUFBYjtBQUZrQjtBQU1uQjs7OztxQ0FFZ0I7QUFDZixXQUFNVixPQUFPLEtBQUtoQixLQUFMLENBQVc1RCxRQUFYLENBQW9CNEUsSUFBakM7QUFDQSxXQUFNb0MsTUFBTSxLQUFLcEQsS0FBTCxDQUFXNUQsUUFBWCxDQUFvQmdILEdBQWhDO0FBQ0EsV0FBTTRDLGFBQWEsS0FBS2hHLEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I2RSxPQUF2QztBQUNBLFdBQU1pTixrQkFBZ0JsTixJQUFoQiwwQ0FBeURvQyxHQUF6RCxTQUFnRTRDLFVBQWhFLHNCQUFOO0FBQ0EsWUFBS3BELFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGVBQU0yTCxNQUFOLCtCQUF5Q2lHLEdBQXpDO0FBQ0EsZ0JBQU81UixLQUFQO0FBQ0QsUUFIRDtBQUlBLGNBQU8sSUFBSXNJLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENxSixlQUFNRCxHQUFOLEVBQ0dsTSxJQURILENBQ1EsZUFBTztBQUNYLGVBQUlHLElBQUlpTSxPQUFKLENBQVlDLEdBQVosQ0FBZ0IsY0FBaEIsS0FDRmxNLElBQUlpTSxPQUFKLENBQVlDLEdBQVosQ0FBZ0IsY0FBaEIsRUFBZ0MzUSxXQUFoQyxHQUE4QzRRLE9BQTlDLENBQXNELGtCQUF0RCxLQUE2RSxDQUQvRSxFQUNrRjtBQUM5RSxvQkFBT25NLElBQUlvTSxJQUFKLEVBQVA7QUFDSCxZQUhELE1BSUs7QUFDSCxtQkFBTSxJQUFJQyxTQUFKLENBQWMsb0NBQWQsQ0FBTjtBQUNEO0FBQ0YsVUFUSCxFQVVHeE0sSUFWSCxDQVVRLGdCQUFRO0FBQ1o2QyxtQkFBUTBKLEtBQUtFLGFBQWI7QUFDRCxVQVpILEVBYUduSSxLQWJILENBYVMsaUJBQVM7QUFDZCxlQUFNQyxZQUFZLE9BQU92QyxLQUFQLEtBQWlCLFFBQWpCLEdBQTRCQSxLQUE1QixHQUFvQ3pCLEtBQUtDLFNBQUwsQ0FBZXdCLEtBQWYsRUFBc0IsSUFBdEIsRUFBNEIsQ0FBNUIsQ0FBdEQ7QUFDQTNCLG1CQUFRMkIsS0FBUiwrRkFBMEd1QyxTQUExRztBQUNBekIsa0JBQU9kLEtBQVA7QUFDRCxVQWpCSDtBQWtCRCxRQW5CTSxDQUFQO0FBb0JEOzs7eUNBRW9CO0FBQ25CLFdBQU1TLE9BQU8sSUFBYjtBQUNBLFlBQUtpSyxhQUFMLEdBQ0cxTSxJQURILENBQ1EsZ0JBQVE7QUFDWnlDLGNBQUs3QixRQUFMLENBQWMsaUJBQVM7QUFDckJ0RyxpQkFBTTJSLFVBQU4sR0FBbUJqTixJQUFuQjtBQUNBLGtCQUFPMUUsS0FBUDtBQUNELFVBSEQ7QUFJRCxRQU5ILEVBT0dnSyxLQVBILENBT1MsaUJBQVM7QUFDZDdCLGNBQUs3QixRQUFMLENBQWMsaUJBQVM7QUFDckJ0RyxpQkFBTTJMLE1BQU4sR0FBZSxzQ0FBZjtBQUNBLGtCQUFPM0wsS0FBUDtBQUNELFVBSEQ7QUFJQSxhQUFNaUssWUFBWSxPQUFPdkMsS0FBUCxLQUFpQixRQUFqQixHQUE0QkEsS0FBNUIsR0FBb0N6QixLQUFLQyxTQUFMLENBQWV3QixLQUFmLEVBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQXREO0FBQ0EzQixpQkFBUTJCLEtBQVIsOENBQXlEdUMsU0FBekQ7QUFDRCxRQWRIO0FBZUQ7OzswQ0FFcUI1RCxLLEVBQU87QUFDM0IsWUFBS0MsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcsZUFBTW1GLFdBQU4sR0FBb0JrQixLQUFwQjtBQUNBLGdCQUFPckcsS0FBUDtBQUNELFFBSEQ7QUFJRDs7OzBDQUVxQnVHLFMsRUFBV1ksSSxFQUFNO0FBQ3JDcEIsZUFBUUMsR0FBUiw4Q0FBdURPLFNBQXZELFVBQXFFWSxJQUFyRTtBQUNEOzs7OEJBRVM7QUFDUixXQUFNZ0gsYUFBYSxLQUFLbk8sS0FBTCxDQUFXMlIsVUFBWCxLQUEwQnZNLFNBQTdDO0FBQ0EsY0FDRTtBQUFBO0FBQUE7QUFDRSw2REFBVSxTQUFTLEtBQUsxQixLQUFMLENBQVdMLFdBQTlCLEdBREY7QUFFRTtBQUFBO0FBQUEsYUFBSSxXQUFVLFVBQWQ7QUFBQTtBQUFBLFVBRkY7QUFHRSxrREFIRjtBQUlFO0FBQUE7QUFBQSxhQUFJLFdBQVUsVUFBZDtBQUF5QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQXpCO0FBQUE7QUFBMkMsZ0JBQUtLLEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I2RTtBQUEvRCxVQUpGO0FBS0Usb0VBQWlCLE9BQU8sS0FBSzNFLEtBQUwsQ0FBV21GLFdBQW5DLEdBTEY7QUFNRTtBQUNFLHNCQUFVLFVBRFo7QUFFRSwyQkFBZSxlQUZqQjtBQUdFLDBCQUFlLEtBQUt6QixLQUFMLENBQVc1RCxRQUg1QjtBQUlFLHVCQUFZLEtBQUs0RCxLQUFMLENBQVc1RCxRQUFYLENBQW9CNkUsT0FKbEM7QUFLRSxpQkFBTSxLQUFLM0UsS0FBTCxDQUFXMlIsVUFMbkI7QUFNRSx5QkFBYyxJQU5oQjtBQU9FLHdCQUFheEQsVUFQZjtBQVFFLG1DQUF3QixLQUFLMUgsb0JBQUwsQ0FBMEI1QixJQUExQixDQUErQixJQUEvQixDQVIxQjtBQVNFLDZCQUFrQixLQUFLNkIsb0JBQUwsQ0FBMEI3QixJQUExQixDQUErQixJQUEvQjtBQVRwQjtBQU5GLFFBREY7QUFvQkQ7Ozs7R0E3RnNDLGdCQUFNRSxTOztBQWlHL0NsRCw0QkFBMkJjLFNBQTNCLEdBQXVDO0FBQ3JDN0MsYUFBVSxpQkFBVWtGLE1BQVYsQ0FBaUJqQyxVQURVO0FBRXJDTSxnQkFBYSxpQkFBVUgsSUFBVixDQUFlSDtBQUZTLEVBQXZDOzttQkFLZWxCLDBCOzs7Ozs7Ozs7Ozs7OztBQzVHZjs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztnZkFGd0Q7QUFDTDs7O0FBQ2I7O0tBRWhDQyxjOzs7QUFFSiwyQkFBYTRCLEtBQWIsRUFBb0I7QUFBQTs7QUFBQSxpSUFDWkEsS0FEWTs7QUFFbEIsV0FBSzFELEtBQUwsR0FBYTtBQUNYbUYsb0JBQWFDO0FBREYsTUFBYjtBQUZrQjtBQUtuQjs7OzsyQ0FFc0JpQixLLEVBQU87QUFDNUIsWUFBS0MsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcsZUFBTW1GLFdBQU4sR0FBb0JrQixLQUFwQjtBQUNBLGdCQUFPckcsS0FBUDtBQUNELFFBSEQ7QUFJRDs7OzJDQUVzQnFTLFUsRUFBWWxMLEksRUFBTTtBQUN2Q3BCLGVBQVFDLEdBQVIsbUNBQTRDcU0sVUFBNUMsVUFBMkRsTCxJQUEzRDtBQUNEOzs7OEJBRVM7QUFDUixjQUNFO0FBQUE7QUFBQTtBQUNFLDZEQUFVLFNBQVMsS0FBS3pELEtBQUwsQ0FBV0wsV0FBOUIsR0FERjtBQUVFO0FBQUE7QUFBQSxhQUFJLFdBQVUsVUFBZDtBQUFBO0FBQUEsVUFGRjtBQUdFLGtEQUhGO0FBSUU7QUFBQTtBQUFBLGFBQUksV0FBVSxVQUFkO0FBQXlCO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFBekI7QUFBQTtBQUEyQyxnQkFBS0ssS0FBTCxDQUFXNUQsUUFBWCxDQUFvQjZFO0FBQS9ELFVBSkY7QUFLRSxxRUFBa0IsT0FBTyxLQUFLM0UsS0FBTCxDQUFXbUYsV0FBcEMsR0FMRjtBQU1FO0FBQ0Usc0JBQVUsVUFEWjtBQUVFLDJCQUFlLGVBRmpCO0FBR0UsMEJBQWUsS0FBS3pCLEtBQUwsQ0FBVzVELFFBSDVCO0FBSUUsdUJBQVksS0FBSzRELEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I2RSxPQUpsQztBQUtFLHFCQUFVLElBTFo7QUFNRSx5QkFBYyxJQU5oQjtBQU9FLG9DQUF5QixLQUFLMk4scUJBQUwsQ0FBMkJ6TixJQUEzQixDQUFnQyxJQUFoQyxDQVAzQjtBQVFFLDhCQUFtQixLQUFLME4scUJBQUwsQ0FBMkIxTixJQUEzQixDQUFnQyxJQUFoQztBQVJyQjtBQU5GLFFBREY7QUFtQkQ7Ozs7R0F4QzBCLGdCQUFNRSxTOztBQTRDbkNqRCxnQkFBZWEsU0FBZixHQUEyQjtBQUN6QjdDLGFBQVUsaUJBQVVrRixNQUFWLENBQWlCakMsVUFERjtBQUV6Qk0sZ0JBQWEsaUJBQVVILElBQVYsQ0FBZUg7QUFGSCxFQUEzQjs7bUJBS2VqQixjOzs7Ozs7Ozs7Ozs7OztBQ3REZjs7Ozs7Ozs7OztnZkFEQTs7QUFFQTs7O0FBR0EsS0FBTTZFLHVCQUF1QjtBQUMzQkMsYUFBVSxJQURpQjtBQUUzQkMsU0FBTSxJQUZxQjtBQUczQkMsUUFBSyxNQUhzQjtBQUkzQjBMLGNBQVc7QUFDVDVLLFlBQU8sRUFERTtBQUVURSxZQUFPLEdBRkU7QUFHVDJLLFdBQU0sS0FBSyxJQUFMLEdBQVk7QUFIVDtBQUpnQixFQUE3Qjs7S0FXTUMsaUI7OztBQUVKLDhCQUFhaFAsS0FBYixFQUFvQjtBQUFBOztBQUFBLHVJQUNaQSxLQURZOztBQUVsQixXQUFLMUQsS0FBTCxHQUFhO0FBQ1htSCxhQUFNL0IsU0FESztBQUVYaU4sbUJBQVlqTixTQUZEO0FBR1hnQyxtQkFBWUMsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLEtBQWdCLE9BQTNCLEVBQW9DQyxRQUFwQyxDQUE2QyxFQUE3QztBQUhELE1BQWI7QUFGa0I7QUFPbkI7Ozs7cUNBRWdCQyxPLEVBQVM7QUFDeEIxQixlQUFRMkIsS0FBUiw2QkFBd0NELE9BQXhDO0FBQ0Q7OzswQ0FFcUIsQ0FDckI7Ozt1Q0FFa0JBLE8sRUFBUztBQUMxQjFCLGVBQVEyQixLQUFSLDZCQUF3Q0QsT0FBeEM7QUFDRDs7OzRDQUV1QixDQUN2Qjs7O2lEQUU0QjRLLFUsRUFBWWxMLEksRUFBTTtBQUM3QyxXQUFJLEtBQUt6RCxLQUFMLENBQVdpUCx1QkFBZixFQUF3QztBQUN0QyxjQUFLalAsS0FBTCxDQUFXaVAsdUJBQVgsQ0FBbUNOLFVBQW5DLEVBQStDbEwsSUFBL0M7QUFDRDtBQUNGOzs7aUNBRVk7QUFDWCxXQUFNZ0IsT0FBTyxJQUFiO0FBQ0EsV0FBTWhCLE9BQU8sSUFBSTdDLFdBQVdzTyxZQUFmLENBQTRCLENBQUMsMEJBQUQsRUFBNkIsS0FBSzVTLEtBQUwsQ0FBV29ILFVBQXhDLEVBQW9Ec0IsSUFBcEQsQ0FBeUQsR0FBekQsQ0FBNUIsQ0FBYjtBQUNBLFdBQU0ySixhQUFhLElBQUkvTixXQUFXdU8sYUFBZixFQUFuQjtBQUNBLFdBQU1DLG1CQUFtQjNMLEtBQUtnQyxZQUFMLENBQWtCdEUsSUFBbEIsQ0FBdUJzQyxJQUF2QixDQUF6QjtBQUNBQSxZQUFLZ0MsWUFBTCxHQUFvQixVQUFDNEosTUFBRCxFQUFTQyxRQUFULEVBQXNCO0FBQ3hDRiwwQkFBaUJDLE1BQWpCLEVBQXlCQyxRQUF6QjtBQUNBN0wsY0FBS2dDLFlBQUwsR0FBb0IySixnQkFBcEI7QUFDRCxRQUhEO0FBSUEzTCxZQUFLOEwsZ0JBQUwsQ0FBc0JaLFVBQXRCOztBQUVBLFdBQUksS0FBSzNPLEtBQUwsQ0FBV3dQLGlCQUFmLEVBQWtDO0FBQ2hDYixvQkFBV3BKLEVBQVgsQ0FBYyxHQUFkLEVBQW1CLEtBQUt2RixLQUFMLENBQVd3UCxpQkFBOUI7QUFDRCxRQUZELE1BR0s7QUFDSGIsb0JBQVdwSixFQUFYLENBQWMsR0FBZCxFQUFtQixpQkFBUztBQUMxQmxELG1CQUFRQyxHQUFSLCtDQUF3REssTUFBTW5HLElBQTlEO0FBQ0QsVUFGRDtBQUdEOztBQUVELFdBQU1zSixTQUFTN0QsT0FBT3NDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCdEIsb0JBQWxCLEVBQXdDLEtBQUtqRCxLQUFMLENBQVdtRSxhQUFuRCxDQUFmO0FBQ0EyQixjQUFPM0MsSUFBUCxHQUFjMkMsT0FBT0MsT0FBUCxJQUFrQkQsT0FBTzNDLElBQXZDO0FBQ0EyQyxjQUFPOUUsSUFBUCxHQUFjLEtBQUtoQixLQUFMLENBQVdnQixJQUFYLElBQW1COEUsT0FBTzlFLElBQXhDO0FBQ0E4RSxjQUFPRSxVQUFQLEdBQW9CLEtBQUtoRyxLQUFMLENBQVdnRyxVQUFYLElBQXlCRixPQUFPRSxVQUFwRDtBQUNBRixjQUFPMkosY0FBUCxHQUF3QixnQkFBZ0IsS0FBS25ULEtBQUwsQ0FBV29ILFVBQW5EOztBQUVBckIsZUFBUUMsR0FBUixDQUFZLGtDQUFrQ0MsS0FBS0MsU0FBTCxDQUFlc0QsTUFBZixFQUF1QixJQUF2QixFQUE2QixDQUE3QixDQUE5Qzs7QUFFQTZJLGtCQUFXMUksSUFBWCxDQUFnQkgsTUFBaEIsRUFDRzlELElBREgsQ0FDUSxrQkFBVTtBQUNkeUMsY0FBSzdCLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGlCQUFNbUgsSUFBTixHQUFhQSxJQUFiO0FBQ0FuSCxpQkFBTXFTLFVBQU4sR0FBbUJBLFVBQW5CO0FBQ0QsVUFIRDtBQUlBLGdCQUFPZSxPQUFPQyxJQUFQLEVBQVA7QUFDRCxRQVBILEVBUUczTixJQVJILENBUVEsWUFBTTtBQUNWeUMsY0FBS21MLGtCQUFMO0FBQ0FuTCxjQUFLb0wsMkJBQUwsQ0FBaUNsQixVQUFqQyxFQUE2Q2xMLElBQTdDO0FBQ0QsUUFYSCxFQVlHNkMsS0FaSCxDQVlTLGlCQUFTO0FBQ2QsYUFBTUMsWUFBWSxPQUFPdkMsS0FBUCxLQUFpQixRQUFqQixHQUE0QkEsS0FBNUIsR0FBb0N6QixLQUFLQyxTQUFMLENBQWV3QixLQUFmLEVBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQXREO0FBQ0FTLGNBQUtxTCxlQUFMLGNBQWdDdkosU0FBaEM7QUFDSCxRQWZEO0FBaUJEOzs7bUNBRWM7QUFDYixXQUFNOUIsT0FBTyxJQUFiO0FBQ0EsY0FBTyxJQUFJRyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLGFBQU1yQixPQUFPZ0IsS0FBS25JLEtBQUwsQ0FBV21ILElBQXhCO0FBQ0EsYUFBTWtMLGFBQWFsSyxLQUFLbkksS0FBTCxDQUFXcVMsVUFBOUI7QUFDQSxhQUFJQSxVQUFKLEVBQWdCO0FBQ2RBLHNCQUFXb0IsSUFBWCxHQUNHL04sSUFESCxDQUNRLFlBQU07QUFDVnlCLGtCQUFLQSxJQUFMLENBQVVnRCxHQUFWLEdBQWdCLEVBQWhCO0FBQ0FrSSx3QkFBV2pJLE9BQVgsQ0FBbUJoRixTQUFuQjtBQUNBaU4sd0JBQVdoSSxHQUFYLENBQWUsR0FBZixFQUFvQmxDLEtBQUt6RSxLQUFMLENBQVd3UCxpQkFBL0I7QUFDQS9LLGtCQUFLN0IsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcscUJBQU1tSCxJQUFOLEdBQWEvQixTQUFiO0FBQ0FwRixxQkFBTXFTLFVBQU4sR0FBbUJqTixTQUFuQjtBQUNELGNBSEQ7QUFJQStDLGtCQUFLdUwsb0JBQUw7QUFDQW5MO0FBQ0QsWUFYSCxFQVlHeUIsS0FaSCxDQVlTLGlCQUFTO0FBQ2QsaUJBQU1DLFlBQVksT0FBT3ZDLEtBQVAsS0FBaUIsUUFBakIsR0FBNEJBLEtBQTVCLEdBQW9DekIsS0FBS0MsU0FBTCxDQUFld0IsS0FBZixFQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUF0RDtBQUNBUyxrQkFBS3dMLGlCQUFMLHNCQUEwQzFKLFNBQTFDO0FBQ0F6QixnREFBaUNkLEtBQWpDO0FBQ0QsWUFoQkg7QUFpQkQsVUFsQkQsTUFtQks7QUFDSGE7QUFDRDtBQUNGLFFBekJNLENBQVA7QUEwQkQ7OztrQ0FFYWlDLEksRUFBTTtBQUNsQixXQUFJQSxJQUFKLEVBQVU7QUFDUixjQUFLb0osU0FBTDtBQUNEO0FBQ0Y7Ozt5Q0FFb0I7QUFDbkIsWUFBS0MsWUFBTCxDQUFrQixLQUFLblEsS0FBTCxDQUFXb1EsYUFBN0I7QUFDRDs7OzRDQUVzQjtBQUNyQixXQUFNekIsYUFBYSxLQUFLclMsS0FBTCxDQUFXcVMsVUFBOUI7QUFDQSxZQUFLMEIsV0FBTDtBQUNBLFdBQUkxQixjQUFjLEtBQUszTyxLQUFMLENBQVd3UCxpQkFBN0IsRUFBZ0Q7QUFDOUNiLG9CQUFXaEksR0FBWCxDQUFlLEdBQWYsRUFBb0IsS0FBSzNHLEtBQUwsQ0FBV3dQLGlCQUEvQjtBQUNEO0FBQ0Y7Ozt3Q0FFbUJ2SSxTLEVBQVc7QUFBQTs7QUFDN0IsV0FBTXhDLE9BQU8sSUFBYjtBQUNBLFdBQUl3QyxVQUFVbUosYUFBVixLQUE0QixLQUFLcFEsS0FBTCxDQUFXb1EsYUFBM0MsRUFBMEQ7QUFBQTtBQUN4RCxlQUFNRSxNQUFNLE9BQUtILFlBQUwsQ0FBa0JoUCxJQUFsQixRQUFaO0FBQ0EsZUFBTTJGLE9BQU8sT0FBSzlHLEtBQUwsQ0FBV29RLGFBQXhCO0FBQ0Esa0JBQUtDLFdBQUwsR0FDR3JPLElBREgsQ0FDUSxZQUFNO0FBQ1ZzTyxpQkFBSXhKLElBQUo7QUFDRCxZQUhILEVBSUdSLEtBSkgsQ0FJUyxpQkFBUztBQUNkN0Isa0JBQUtxTCxlQUFMLDhDQUFnRTlMLEtBQWhFO0FBQ0QsWUFOSDtBQUh3RDtBQVV6RDtBQUNGOzs7MENBRXFCO0FBQ3BCLGNBQU8sS0FBS3VNLGtCQUFaO0FBQ0Q7Ozs4QkFFUztBQUFBOztBQUNSLFdBQU14TCxZQUFZLENBQUMsMEJBQUQsRUFBNkIsS0FBS3pJLEtBQUwsQ0FBV29ILFVBQXhDLEVBQW9Ec0IsSUFBcEQsQ0FBeUQsR0FBekQsQ0FBbEI7QUFDQSxXQUFJc0MsYUFBYSxDQUFDLG9DQUFELENBQWpCO0FBQ0EsV0FBSSxLQUFLdEgsS0FBTCxDQUFXdUgsU0FBZixFQUEwQjtBQUN4QkQsc0JBQWFBLFdBQVdFLE1BQVgsQ0FBa0IsS0FBS3hILEtBQUwsQ0FBV3VILFNBQTdCLENBQWI7QUFDRDtBQUNELFdBQUlFLGtCQUFrQixDQUFDLDBCQUFELENBQXRCO0FBQ0EsV0FBSSxLQUFLekgsS0FBTCxDQUFXMEgsY0FBZixFQUErQjtBQUM3QkQsMkJBQWtCQSxnQkFBZ0JELE1BQWhCLENBQXVCLEtBQUt4SCxLQUFMLENBQVcwSCxjQUFsQyxDQUFsQjtBQUNEO0FBQ0QsV0FBTThJLFdBQVcsS0FBS3hRLEtBQUwsQ0FBV3lRLFNBQVgsR0FFYix5Q0FBTyxLQUFLO0FBQUEsa0JBQUssT0FBS0Ysa0JBQUwsR0FBMEJ6UCxDQUEvQjtBQUFBLFVBQVo7QUFDRSxhQUFJaUUsU0FETjtBQUVFLG9CQUFXMEMsZ0JBQWdCekMsSUFBaEIsQ0FBcUIsR0FBckIsQ0FGYjtBQUdFLG1CQUFVLEtBQUtoRixLQUFMLENBQVc2SCxZQUh2QjtBQUlFLG1CQUFVLEtBQUs3SCxLQUFMLENBQVcwUSxRQUp2QixHQUZhLEdBVWIseUNBQU8sS0FBSztBQUFBLGtCQUFLLE9BQUtILGtCQUFMLEdBQTBCelAsQ0FBL0I7QUFBQSxVQUFaO0FBQ0UsYUFBSWlFLFNBRE47QUFFRSxvQkFBVzBDLGdCQUFnQnpDLElBQWhCLENBQXFCLEdBQXJCLENBRmI7QUFHRSxtQkFBVSxLQUFLaEYsS0FBTCxDQUFXNkgsWUFIdkI7QUFJRSxtQkFBVSxLQUFLN0gsS0FBTCxDQUFXMFEsUUFKdkIsR0FWSjtBQWlCQSxjQUNFO0FBQUE7QUFBQSxXQUFLLEtBQUs7QUFBQSxvQkFBSyxPQUFLL0ksZUFBTCxHQUF1QjdHLENBQTVCO0FBQUEsWUFBVjtBQUNFLGtCQUFPLEtBQUtkLEtBQUwsQ0FBVzRILEtBRHBCO0FBRUUsc0JBQVdOLFdBQVd0QyxJQUFYLENBQWdCLEdBQWhCLENBRmI7QUFHR3dMO0FBSEgsUUFERjtBQU9EOzs7O0dBbkw2QixnQkFBTW5QLFM7O0FBdUx0QzJOLG1CQUFrQi9QLFNBQWxCLEdBQThCO0FBQzVCbVIsa0JBQWUsaUJBQVV0SSxPQURHO0FBRTVCNEksYUFBVSxpQkFBVTVJLE9BRlE7QUFHNUJELGlCQUFjLGlCQUFVQyxPQUhJO0FBSTVCMkksY0FBVyxpQkFBVTNJLE9BSk87QUFLNUI5RyxTQUFNLGlCQUFVNUIsTUFMWTtBQU01QjRHLGVBQVksaUJBQVU1RyxNQUFWLENBQWlCQyxVQU5EO0FBTzVCOEUsa0JBQWUsaUJBQVU3QyxNQUFWLENBQWlCakMsVUFQSjtBQVE1Qk0sZ0JBQWEsaUJBQVVILElBQVYsQ0FBZUgsVUFSQTtBQVM1QjRQLDRCQUF5QixpQkFBVXpQLElBVFA7QUFVNUJnUSxzQkFBbUIsaUJBQVVoUTtBQVZELEVBQTlCOztBQWFBd1AsbUJBQWtCakgsWUFBbEIsR0FBaUM7QUFDL0JxSSxrQkFBZSxJQURnQjtBQUUvQk0sYUFBVSxJQUZxQjtBQUcvQjdJLGlCQUFjLElBSGlCO0FBSS9CNEksY0FBVyxLQUpvQjtBQUsvQnpQLFNBQU1VLFNBTHlCO0FBTS9Cc0UsZUFBWXRFLFNBTm1CO0FBTy9CeUMsa0JBQWVsQjtBQVBnQixFQUFqQzs7bUJBVWUrTCxpQjs7Ozs7Ozs7Ozs7Ozs7QUM3TmY7Ozs7Ozs7Ozs7Z2ZBREE7O0FBRUE7OztLQUdNMkIsZ0I7OztBQUVKLDZCQUFhM1EsS0FBYixFQUFvQjtBQUFBOztBQUFBLHFJQUNaQSxLQURZOztBQUVsQixXQUFLMUQsS0FBTCxHQUFhO0FBQ1gyTCxlQUFRO0FBREcsTUFBYjtBQUZrQjtBQUtuQjs7OzsyQ0FFc0J0RixLLEVBQU87QUFDNUJOLGVBQVFDLEdBQVIsZ0NBQXlDSyxNQUFNbkcsSUFBL0M7QUFDQSxXQUFNb1UsV0FBV2hRLFdBQVdpUSxvQkFBNUI7QUFDQSxXQUFNekksV0FBV3hILFdBQVdrUSx1QkFBNUI7QUFDQSxXQUFJQyxlQUFKO0FBQ0EsV0FBSUMsa0JBQUo7QUFDQSxXQUFJL0ksU0FBUyxLQUFLM0wsS0FBTCxDQUFXMkwsTUFBeEI7QUFDQSxlQUFRdEYsTUFBTW5HLElBQWQ7QUFDRSxjQUFLb1UsU0FBU3RJLGVBQWQ7QUFDRUwsb0JBQVMsMkJBQVQ7QUFDQTtBQUNGLGNBQUsySSxTQUFTckksZUFBZDtBQUNFTixvQkFBUyx5Q0FBVDtBQUNBO0FBQ0YsY0FBSzJJLFNBQVNLLGVBQWQ7QUFDRWhKLG9CQUFTLDhCQUFUO0FBQ0E7QUFDRixjQUFLMkksU0FBU00sY0FBZDtBQUNFakosb0JBQVMsZ0RBQVQ7QUFDQTtBQUNGLGNBQUsySSxTQUFTTyxzQkFBZDtBQUNFbEosb0JBQVMsaUNBQVQ7QUFDQTtBQUNGLGNBQUtHLFNBQVNTLFdBQWQ7QUFDRVosb0JBQVMsZ0JBQVQ7QUFDQTtBQUNGLGNBQUtHLFNBQVNVLFNBQWQ7QUFDRWIsb0JBQVMsbUJBQVQ7QUFDQTtBQUNGLGNBQUtHLFNBQVNnSixZQUFkO0FBQ0VuSixvQkFBUyxtQkFBVDtBQUNBOEksb0JBQVN4TyxLQUFLQyxTQUFMLENBQWVHLE1BQU1vTSxJQUFyQixFQUEyQixJQUEzQixFQUFpQyxDQUFqQyxDQUFUO0FBQ0ExTSxtQkFBUUMsR0FBUix5QkFBa0NLLE1BQU1uRyxJQUF4QyxVQUFpRHVVLE1BQWpEO0FBQ0E7QUFDRixjQUFLM0ksU0FBU2lKLFVBQWQ7QUFDRXBKLG9CQUFTLG9CQUFUO0FBQ0E7QUFDRixjQUFLRyxTQUFTa0osZUFBZDtBQUNFckosb0JBQVMsc0JBQVQ7QUFDQStJLHVCQUFZek8sS0FBS0MsU0FBTCxDQUFlRyxNQUFNb00sSUFBckIsRUFBMkIsSUFBM0IsRUFBaUMsQ0FBakMsQ0FBWjtBQUNBMU0sbUJBQVFDLEdBQVIseUJBQWtDSyxNQUFNbkcsSUFBeEMsVUFBaUR3VSxTQUFqRDtBQUNBO0FBQ0YsY0FBSzVJLFNBQVNtSixhQUFkO0FBQ0V0SixvQkFBUyx1QkFBVDtBQUNBO0FBQ0YsY0FBS0csU0FBU1csb0JBQWQ7QUFDRWQsb0JBQVMscURBQVQ7QUFDQTtBQXhDSjtBQTBDQSxZQUFLckYsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcsZUFBTTJMLE1BQU4sR0FBZUEsTUFBZjtBQUNBLGdCQUFPM0wsS0FBUDtBQUNELFFBSEQ7QUFJRDs7OytDQUUwQjBNLFMsRUFBVztBQUNwQyxXQUFJLEtBQUtoSixLQUFMLENBQVcyQyxLQUFYLEtBQXFCcUcsVUFBVXJHLEtBQS9CLElBQXdDcUcsVUFBVXJHLEtBQXRELEVBQTZEO0FBQzNELGNBQUtzRyxxQkFBTCxDQUEyQkQsVUFBVXJHLEtBQXJDO0FBQ0Q7QUFDRjs7OzhCQUVTO0FBQ1IsY0FDRTtBQUFBO0FBQUEsV0FBRyxXQUFVLHVCQUFiO0FBQUE7QUFBOEMsY0FBS3JHLEtBQUwsQ0FBVzJMO0FBQXpELFFBREY7QUFHRDs7OztHQTFFNEIsZ0JBQU01RyxTOztBQThFckNzUCxrQkFBaUIxUixTQUFqQixHQUE2QjtBQUMzQjBELFVBQU8saUJBQVVyQjtBQURVLEVBQTdCOzttQkFJZXFQLGdCOzs7Ozs7Ozs7Ozs7OztBQ3RGZjs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O2dmQU5BOztBQUVBO0FBR21EOzs7QUFDYjs7S0FFaEN0UyxzQjs7O0FBRUosbUNBQWEyQixLQUFiLEVBQW9CO0FBQUE7O0FBQUEsaUpBQ1pBLEtBRFk7O0FBRWxCO0FBQ0EsV0FBSzFELEtBQUwsR0FBYTtBQUNYbUgsYUFBTS9CLFNBREs7QUFFWGlOLG1CQUFZak4sU0FGRDtBQUdYRCxvQkFBYUM7QUFIRixNQUFiO0FBS0EsV0FBSzhQLGdCQUFMLEdBQXdCOVAsU0FBeEI7QUFSa0I7QUFTbkI7Ozs7aUNBRVk7QUFDWCxXQUFNK0MsT0FBTyxJQUFiO0FBQ0EsV0FBTWhCLE9BQU8sSUFBSTdDLFdBQVdzTyxZQUFmLENBQTRCLG9CQUE1QixDQUFiO0FBQ0EsV0FBTVAsYUFBYSxJQUFJL04sV0FBV29PLGlCQUFmLEVBQW5CO0FBQ0EsV0FBTXlDLGlCQUFpQixLQUFLelIsS0FBTCxDQUFXNUQsUUFBWCxDQUFvQnNWLHVCQUFwQixDQUE0Q2xGLEtBQTVDLENBQWtELEdBQWxELEVBQXVEek4sR0FBdkQsQ0FBMkQsZ0JBQVE7QUFDdEYsZ0JBQU9rTCxLQUFLd0MsSUFBTCxFQUFQO0FBQ0gsUUFGc0IsQ0FBdkI7O0FBSUEsWUFBSytFLGdCQUFMLEdBQXdCN0MsVUFBeEI7QUFDQSxZQUFLNkMsZ0JBQUwsQ0FBc0JqTSxFQUF0QixDQUF5QixHQUF6QixFQUE4QixLQUFLc0oscUJBQW5DOztBQUVBLFdBQU1PLG1CQUFtQjNMLEtBQUtnQyxZQUFMLENBQWtCdEUsSUFBbEIsQ0FBdUJzQyxJQUF2QixDQUF6QjtBQUNBQSxZQUFLZ0MsWUFBTCxHQUFvQixVQUFDNEosTUFBRCxFQUFTQyxRQUFULEVBQXNCO0FBQ3hDRiwwQkFBaUJDLE1BQWpCLEVBQXlCQyxRQUF6QjtBQUNBN0wsY0FBS2dDLFlBQUwsR0FBb0IySixnQkFBcEI7QUFDRCxRQUhEOztBQUtBLFdBQU1sRCxZQUFZakssT0FBT3NDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUt2RSxLQUFMLENBQVc1RCxRQUE3QixFQUF1QztBQUN2RDhHLG1CQUFVLElBRDZDO0FBRXZEQyxlQUFNLEtBQUtuRCxLQUFMLENBQVc1RCxRQUFYLENBQW9CMkosT0FGNkI7QUFHdkQwSix5QkFBZ0IsZ0JBQWdCOUwsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLEtBQWdCLE9BQTNCLEVBQW9DQyxRQUFwQyxDQUE2QyxFQUE3QyxDQUh1QjtBQUl2RGtDLHFCQUFZLEtBQUtoRyxLQUFMLENBQVc1RCxRQUFYLENBQW9CNkUsT0FKdUI7QUFLdkQ2TixvQkFBVztBQUNUNUssa0JBQU8sRUFERTtBQUVURSxrQkFBTyxHQUZFO0FBR1QySyxpQkFBTSxLQUFLLElBQUwsR0FBWTtBQUhUO0FBTDRDLFFBQXZDLENBQWxCO0FBV0EsV0FBTTVDLGFBQWFsSyxPQUFPc0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS3ZFLEtBQUwsQ0FBVzVELFFBQTdCLEVBQXVDO0FBQ3hEOEcsbUJBQVUsTUFEOEM7QUFFeERDLGVBQU0sS0FBS25ELEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0JnUSxRQUY4QjtBQUd4RHBHLHFCQUFZLEtBQUtoRyxLQUFMLENBQVc1RCxRQUFYLENBQW9CNkUsT0FId0I7QUFJeEQwUSxtQkFBVSxVQUo4QztBQUt4REMscUJBQVksS0FMNEM7QUFNeER2RixjQUFLO0FBTm1ELFFBQXZDLENBQW5CO0FBUUEsV0FBTXdGLFlBQVk1UCxPQUFPc0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS3ZFLEtBQUwsQ0FBVzVELFFBQTdCLEVBQXVDO0FBQ3ZEOEcsbUJBQVUsTUFENkM7QUFFdkRDLGVBQU0sS0FBS25ELEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0IwVixPQUY2QjtBQUd2RDlMLHFCQUFZLEtBQUtoRyxLQUFMLENBQVc1RCxRQUFYLENBQW9CNkUsT0FIdUI7QUFJdkQwUSxtQkFBVSx1QkFKNkM7QUFLdkR0RixjQUFLO0FBTGtELFFBQXZDLENBQWxCOztBQVFBNUksWUFBSzhMLGdCQUFMLENBQXNCWixVQUF0Qjs7QUFFQUEsa0JBQ0dvRCxnQkFESCxDQUNvQk4sY0FEcEIsRUFFR3hMLElBRkgsQ0FFUTtBQUNKMEcsY0FBS1QsU0FERDtBQUVKVSxlQUFNVCxVQUZGO0FBR0o2RixjQUFLSDtBQUhELFFBRlIsRUFPRzdQLElBUEgsQ0FPUSxrQkFBVTtBQUNkeUMsY0FBSzdCLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGlCQUFNbUgsSUFBTixHQUFhQSxJQUFiO0FBQ0FuSCxpQkFBTXFTLFVBQU4sR0FBbUJlLE1BQW5CO0FBQ0Esa0JBQU9wVCxLQUFQO0FBQ0QsVUFKRDtBQUtBLGdCQUFPb1QsT0FBT0MsSUFBUCxFQUFQO0FBQ0QsUUFkSCxFQWVHM04sSUFmSCxDQWVRLFlBQU0sQ0FDWCxDQWhCSCxFQWlCR3NFLEtBakJILENBaUJTLGlCQUFTO0FBQ2QsYUFBTUMsWUFBWSxPQUFPdkMsS0FBUCxLQUFpQixRQUFqQixHQUE0QkEsS0FBNUIsR0FBb0N6QixLQUFLQyxTQUFMLENBQWV3QixLQUFmLEVBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQXREO0FBQ0EzQixpQkFBUTJCLEtBQVIsMENBQXFEdUMsU0FBckQ7QUFDRCxRQXBCSDtBQXNCRDs7O21DQUVjO0FBQ2IsV0FBTTlCLE9BQU8sSUFBYjtBQUNBLFdBQU1oQixPQUFPZ0IsS0FBS25JLEtBQUwsQ0FBV21ILElBQXhCO0FBQ0EsV0FBTWtMLGFBQWFsSyxLQUFLbkksS0FBTCxDQUFXcVMsVUFBOUI7QUFDQSxXQUFJQSxVQUFKLEVBQWdCO0FBQ2RBLG9CQUFXb0IsSUFBWCxHQUNHL04sSUFESCxDQUNRLFlBQU07QUFDVnlCLGdCQUFLQSxJQUFMLENBQVVnRCxHQUFWLEdBQWdCLEVBQWhCO0FBQ0FrSSxzQkFBV2pJLE9BQVgsQ0FBbUJoRixTQUFuQjtBQUNBK0MsZ0JBQUs3QixRQUFMLENBQWMsaUJBQVM7QUFDckJ0RyxtQkFBTW1ILElBQU4sR0FBYS9CLFNBQWI7QUFDQXBGLG1CQUFNcVMsVUFBTixHQUFtQmpOLFNBQW5CO0FBQ0Esb0JBQU9wRixLQUFQO0FBQ0QsWUFKRDtBQUtELFVBVEgsRUFVR2dLLEtBVkgsQ0FVUyxpQkFBUztBQUNkLGVBQU1DLFlBQVksT0FBT3ZDLEtBQVAsS0FBaUIsUUFBakIsR0FBNEJBLEtBQTVCLEdBQW9DekIsS0FBS0MsU0FBTCxDQUFld0IsS0FBZixFQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUF0RDtBQUNBM0IsbUJBQVEyQixLQUFSLGtEQUE2RHVDLFNBQTdEO0FBQ0QsVUFiSDtBQWNEO0FBQ0Y7Ozt5Q0FFb0I7QUFDbkIsWUFBSzJKLFNBQUw7QUFDRDs7OzRDQUVzQjtBQUNyQixZQUFLRyxXQUFMO0FBQ0EsV0FBSSxLQUFLbUIsZ0JBQVQsRUFBMkI7QUFDekIsY0FBS0EsZ0JBQUwsQ0FBc0I3SyxHQUF0QixDQUEwQixHQUExQixFQUErQixLQUFLa0kscUJBQXBDO0FBQ0EsY0FBSzJDLGdCQUFMLEdBQXdCOVAsU0FBeEI7QUFDRDtBQUNGOzs7MkNBRXNCaUIsSyxFQUFPO0FBQzVCLFlBQUtDLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGVBQU1tRixXQUFOLEdBQW9Ca0IsS0FBcEI7QUFDQSxnQkFBT3JHLEtBQVA7QUFDRCxRQUhEO0FBSUQ7Ozs4QkFFUztBQUFBO0FBQUE7O0FBQ1IsY0FDRTtBQUFBO0FBQUE7QUFDRSw2REFBVSxTQUFTLEtBQUswRCxLQUFMLENBQVdMLFdBQTlCLEdBREY7QUFFRTtBQUFBO0FBQUEsYUFBSSxXQUFVLFVBQWQ7QUFBQTtBQUFBLFVBRkY7QUFHRSxrREFIRjtBQUlFO0FBQUE7QUFBQSxhQUFJLFdBQVUsVUFBZDtBQUF5QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQXpCO0FBQUE7QUFBMkMsZ0JBQUtLLEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I2RTtBQUEvRCxVQUpGO0FBS0UscUVBQWtCLE9BQU8sS0FBSzNFLEtBQUwsQ0FBV21GLFdBQXBDLEdBTEY7QUFNRTtBQUFBO0FBQUEsNkJBQUssV0FBVSxVQUFmLEVBQTBCLEtBQUs7QUFBQSxzQkFBSyxPQUFLa0csZUFBTCxHQUF1QjdHLENBQTVCO0FBQUEsY0FBL0I7QUFDRSxpQkFBRztBQURMLDJCQUVZLFVBRlo7QUFHRSw0RUFBTyxXQUFVLDJCQUFqQixFQUE2QyxLQUFLO0FBQUEsc0JBQUssT0FBS3lQLGtCQUFMLEdBQTBCelAsQ0FBL0I7QUFBQSxjQUFsRDtBQUNFLGlCQUFHO0FBREwsaUVBRVksZUFGWjtBQUhGO0FBTkYsUUFERjtBQWlCRDs7OztHQTlJa0MsZ0JBQU1PLFM7O0FBa0ozQ2hELHdCQUF1QlksU0FBdkIsR0FBbUM7QUFDakM3QyxhQUFVLGlCQUFVa0YsTUFBVixDQUFpQmpDLFVBRE07QUFFakNNLGdCQUFhLGlCQUFVSCxJQUFWLENBQWVIO0FBRkssRUFBbkM7O21CQUtlaEIsc0I7Ozs7Ozs7Ozs7Ozs7O0FDL0pmOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O2dmQUZ3RDtBQUNMOzs7QUFDYjs7S0FFaENDLHVCOzs7QUFFSixvQ0FBYTBCLEtBQWIsRUFBb0I7QUFBQTs7QUFBQSxtSkFDWkEsS0FEWTs7QUFFbEIsV0FBSzFELEtBQUwsR0FBYTtBQUNYbUYsb0JBQWFDO0FBREYsTUFBYjtBQUZrQjtBQUtuQjs7OzsyQ0FFc0JpQixLLEVBQU87QUFDNUIsWUFBS0MsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcsZUFBTW1GLFdBQU4sR0FBb0JrQixLQUFwQjtBQUNBLGdCQUFPckcsS0FBUDtBQUNELFFBSEQ7QUFJRDs7OzJDQUVzQnFTLFUsRUFBWWxMLEksRUFBTTtBQUN2Q3BCLGVBQVFDLEdBQVIsNENBQXFEcU0sVUFBckQsVUFBb0VsTCxJQUFwRTtBQUNEOzs7OEJBRVM7QUFBQTs7QUFDUixjQUNFO0FBQUE7QUFBQTtBQUNFLDZEQUFVLFNBQVMsS0FBS3pELEtBQUwsQ0FBV0wsV0FBOUIsR0FERjtBQUVFO0FBQUE7QUFBQSxhQUFJLFdBQVUsVUFBZDtBQUFBO0FBQUEsVUFGRjtBQUdFLGtEQUhGO0FBSUU7QUFBQTtBQUFBLGFBQUksV0FBVSxVQUFkO0FBQXlCO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFBekI7QUFBQTtBQUEyQyxnQkFBS0ssS0FBTCxDQUFXNUQsUUFBWCxDQUFvQjZFO0FBQS9ELFVBSkY7QUFLRSxxRUFBa0IsT0FBTyxLQUFLM0UsS0FBTCxDQUFXbUYsV0FBcEMsR0FMRjtBQU1FO0FBQ0Usc0JBQVUsVUFEWjtBQUVFLDJCQUFlLGVBRmpCO0FBR0UsMEJBQWUsS0FBS3pCLEtBQUwsQ0FBVzVELFFBSDVCO0FBSUUsdUJBQVksS0FBSzRELEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I2RSxPQUpsQztBQUtFLHFCQUFVLElBTFo7QUFNRSxzQkFBVyxJQU5iO0FBT0UseUJBQWMsSUFQaEI7QUFRRSxvQ0FBeUIsS0FBSzJOLHFCQUFMLENBQTJCek4sSUFBM0IsQ0FBZ0MsSUFBaEMsQ0FSM0I7QUFTRSw4QkFBbUIsS0FBSzBOLHFCQUFMLENBQTJCMU4sSUFBM0IsQ0FBZ0MsSUFBaEMsQ0FUckI7QUFVRSxnQkFBSztBQUFBLG9CQUFLLE9BQUtvUCxrQkFBTCxHQUEwQnpQLENBQS9CO0FBQUE7QUFWUDtBQU5GLFFBREY7QUFxQkQ7Ozs7R0ExQ21DLGdCQUFNTyxTOztBQThDNUMvQyx5QkFBd0JXLFNBQXhCLEdBQW9DO0FBQ2xDN0MsYUFBVSxpQkFBVWtGLE1BQVYsQ0FBaUJqQyxVQURPO0FBRWxDTSxnQkFBYSxpQkFBVUgsSUFBVixDQUFlSDtBQUZNLEVBQXBDOzttQkFLZWYsdUI7Ozs7Ozs7Ozs7Ozs7O0FDekRmOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O2dmQUZ3RDtBQUNMOzs7QUFDYjs7S0FFaENDLDBCOzs7QUFFSix1Q0FBYXlCLEtBQWIsRUFBb0I7QUFBQTs7QUFBQSx5SkFDWkEsS0FEWTs7QUFFbEIsV0FBSzFELEtBQUwsR0FBYTtBQUNYMlEsc0JBQWUsS0FESjtBQUVYeEwsb0JBQWFDO0FBRkYsTUFBYjtBQUZrQjtBQU1uQjs7OzsyQ0FFc0I7QUFDckIsV0FBTTJILGVBQWUsS0FBS2tILGtCQUFMLENBQXdCMEIsa0JBQXhCLEVBQXJCO0FBQ0EsWUFBSy9FLFdBQUwsQ0FBaUI3RCxZQUFqQjtBQUNBLFlBQUs4RCxZQUFMLENBQWtCOUQsWUFBbEI7QUFDRDs7O2lDQUVZK0QsYSxFQUFlO0FBQzFCLFdBQU1DLFNBQVMsS0FBS0MsY0FBcEI7QUFDQSxXQUFNQyxVQUFVRixPQUFPRyxVQUFQLENBQWtCLElBQWxCLENBQWhCO0FBQ0FELGVBQVFFLFNBQVIsR0FBb0IsU0FBcEI7QUFDQUYsZUFBUUcsUUFBUixDQUFpQixDQUFqQixFQUFvQixDQUFwQixFQUF1Qk4sY0FBY08sV0FBckMsRUFBa0RQLGNBQWNRLFlBQWhFO0FBQ0EsWUFBS2hMLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGVBQU0yUSxhQUFOLEdBQXNCLEtBQXRCO0FBQ0EsZ0JBQU8zUSxLQUFQO0FBQ0QsUUFIRDtBQUlEOzs7a0NBRWE4USxhLEVBQWU7QUFDM0IsV0FBTUMsU0FBUyxLQUFLQyxjQUFwQjtBQUNBLFdBQU1DLFVBQVVGLE9BQU9HLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBaEI7QUFDQUgsY0FBT2xFLEtBQVAsR0FBZWlFLGNBQWNPLFdBQTdCO0FBQ0FOLGNBQU9qRSxNQUFQLEdBQWdCZ0UsY0FBY1EsWUFBOUI7QUFDQUwsZUFBUU0sU0FBUixDQUFrQlQsYUFBbEIsRUFBaUMsQ0FBakMsRUFBb0MsQ0FBcEMsRUFBdUNBLGNBQWNPLFdBQXJELEVBQWtFUCxjQUFjUSxZQUFoRjtBQUNBLFlBQUtoTCxRQUFMLENBQWMsaUJBQVM7QUFDckJ0RyxlQUFNMlEsYUFBTixHQUFzQixJQUF0QjtBQUNBLGdCQUFPM1EsS0FBUDtBQUNELFFBSEQ7QUFJRDs7OzJDQUVzQnFHLEssRUFBTztBQUM1QixZQUFLQyxRQUFMLENBQWMsaUJBQVM7QUFDckJ0RyxlQUFNbUYsV0FBTixHQUFvQmtCLEtBQXBCO0FBQ0EsZ0JBQU9yRyxLQUFQO0FBQ0QsUUFIRDtBQUlEOzs7MkNBRXNCcVMsVSxFQUFZbEwsSSxFQUFNO0FBQ3ZDcEIsZUFBUUMsR0FBUiwrQ0FBd0RxTSxVQUF4RCxVQUF1RWxMLElBQXZFO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsWUFBS3lKLFdBQUwsQ0FBaUIsS0FBS3FELGtCQUFMLENBQXdCMEIsa0JBQXhCLEVBQWpCO0FBQ0Q7Ozs4QkFFUztBQUFBOztBQUNSLFdBQU1uRSxVQUFVLEtBQUt4UixLQUFMLENBQVcyUSxhQUFYLEdBQTJCLFFBQTNCLEdBQXNDLFNBQXREO0FBQ0EsV0FBTWMsbUJBQW1CO0FBQ3ZCLHVCQUFjRCxPQURTO0FBRXZCLHFCQUFZLFVBRlc7QUFHdkIsb0JBQVcsTUFIWTtBQUl2QixrQkFBUyxTQUpjO0FBS3ZCLGtCQUFTLE1BTGM7QUFNdkIsdUJBQWM7QUFOUyxRQUF6QjtBQVFBLGNBQ0U7QUFBQTtBQUFBO0FBQ0UsNkRBQVUsU0FBUyxLQUFLOU4sS0FBTCxDQUFXTCxXQUE5QixHQURGO0FBRUU7QUFBQTtBQUFBLGFBQUksV0FBVSxVQUFkO0FBQUE7QUFBQSxVQUZGO0FBR0Usa0RBSEY7QUFJRTtBQUFBO0FBQUEsYUFBSSxXQUFVLFVBQWQ7QUFBeUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUF6QjtBQUFBO0FBQTJDLGdCQUFLSyxLQUFMLENBQVc1RCxRQUFYLENBQW9CNkU7QUFBL0QsVUFKRjtBQUtFLHFFQUFrQixPQUFPLEtBQUszRSxLQUFMLENBQVdtRixXQUFwQyxHQUxGO0FBTUU7QUFBQTtBQUFBLGFBQUssU0FBUyxLQUFLdU0sbUJBQUwsQ0FBeUI3TSxJQUF6QixDQUE4QixJQUE5QixDQUFkO0FBQ0U7QUFDRSx3QkFBVSxVQURaO0FBRUUsNkJBQWUsZUFGakI7QUFHRSw0QkFBZSxLQUFLbkIsS0FBTCxDQUFXNUQsUUFINUI7QUFJRSx5QkFBWSxLQUFLNEQsS0FBTCxDQUFXNUQsUUFBWCxDQUFvQjZFLE9BSmxDO0FBS0UsbUJBQU0sS0FBSzNFLEtBQUwsQ0FBVzJSLFVBTG5CO0FBTUUsdUJBQVUsSUFOWjtBQU9FLDJCQUFjLElBUGhCO0FBUUUsc0NBQXlCLEtBQUtXLHFCQUFMLENBQTJCek4sSUFBM0IsQ0FBZ0MsSUFBaEMsQ0FSM0I7QUFTRSxnQ0FBbUIsS0FBSzBOLHFCQUFMLENBQTJCMU4sSUFBM0IsQ0FBZ0MsSUFBaEMsQ0FUckI7QUFVRSxrQkFBSztBQUFBLHNCQUFLLE9BQUtvUCxrQkFBTCxHQUEwQnpQLENBQS9CO0FBQUE7QUFWUDtBQURGLFVBTkY7QUFvQkU7QUFBQTtBQUFBLGFBQUssV0FBVSxVQUFmO0FBQ0U7QUFBQTtBQUFBLGVBQUcsT0FBT2lOLGdCQUFWO0FBQTRCO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FBNUI7QUFBc0Usc0RBQXRFO0FBQTJFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBM0UsWUFERjtBQUVFLHFEQUFRLEtBQUs7QUFBQSxzQkFBSyxPQUFLVCxjQUFMLEdBQXNCeE0sQ0FBM0I7QUFBQSxjQUFiO0FBRkY7QUFwQkYsUUFERjtBQTJCRDs7OztHQTNGc0MsZ0JBQU1PLFM7O0FBK0YvQzlDLDRCQUEyQlUsU0FBM0IsR0FBdUM7QUFDckM3QyxhQUFVLGlCQUFVa0YsTUFBVixDQUFpQmpDLFVBRFU7QUFFckNNLGdCQUFhLGlCQUFVSCxJQUFWLENBQWVIO0FBRlMsRUFBdkM7O21CQUtlZCwwQjs7Ozs7Ozs7Ozs7Ozs7QUMxR2Y7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Z2ZBRndEO0FBQ0w7OztBQUNiOztLQUVoQ0MscUI7OztBQUVKLGtDQUFhd0IsS0FBYixFQUFvQjtBQUFBOztBQUFBLCtJQUNaQSxLQURZOztBQUVsQixXQUFLMUQsS0FBTCxHQUFhO0FBQ1gyUixtQkFBWXZNLFNBREQ7QUFFWEQsb0JBQWFDO0FBRkYsTUFBYjtBQUZrQjtBQU1uQjs7OzttQ0FFYztBQUNiLFdBQU1WLE9BQU8sS0FBS2hCLEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I0RSxJQUFqQztBQUNBLFdBQU1rTixrQkFBZ0JsTixJQUFoQixrQkFBTjtBQUNBLFlBQUs0QixRQUFMLENBQWMsaUJBQVM7QUFDckJ0RyxlQUFNMkwsTUFBTiw2QkFBdUNpRyxHQUF2QztBQUNBLGdCQUFPNVIsS0FBUDtBQUNELFFBSEQ7QUFJQSxjQUFPLElBQUlzSSxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDcUosZUFBTUQsR0FBTixFQUNDbE0sSUFERCxDQUNNLGVBQU87QUFDWCxlQUFJRyxJQUFJaU0sT0FBSixDQUFZQyxHQUFaLENBQWdCLGNBQWhCLEtBQ0FsTSxJQUFJaU0sT0FBSixDQUFZQyxHQUFaLENBQWdCLGNBQWhCLEVBQWdDM1EsV0FBaEMsR0FBOEM0USxPQUE5QyxDQUFzRCxZQUF0RCxLQUF1RSxDQUQzRSxFQUM4RTtBQUM1RW5NLGlCQUFJK1AsSUFBSixHQUFXbFEsSUFBWCxDQUFnQixpQkFBUztBQUN2QjZDLHVCQUFRbEksTUFBTXdWLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBbUJ4VixNQUFNMlIsT0FBTixDQUFjLEdBQWQsQ0FBbkIsQ0FBUjtBQUNELGNBRkQ7QUFHRCxZQUxELE1BTUs7QUFDSHhKLG9CQUFPM0MsR0FBUDtBQUNEO0FBQ0YsVUFYRCxFQVlDbUUsS0FaRCxDQVlPLGlCQUFTO0FBQ2QsZUFBTUMsWUFBWSxPQUFPdkMsS0FBUCxLQUFpQixRQUFqQixHQUE0QkEsS0FBNUIsR0FBb0N6QixLQUFLQyxTQUFMLENBQWV3QixLQUFmLEVBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQXREO0FBQ0EzQixtQkFBUTJCLEtBQVIsbUVBQThFdUMsU0FBOUU7QUFDQXpCLGtCQUFPZCxLQUFQO0FBQ0QsVUFoQkQ7QUFpQkQsUUFsQk0sQ0FBUDtBQW1CRDs7O3lDQUVvQjtBQUNuQixXQUFNUyxPQUFPLElBQWI7QUFDQSxZQUFLMk4sV0FBTCxHQUNHcFEsSUFESCxDQUNRLGdCQUFRO0FBQ1p5QyxjQUFLN0IsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcsaUJBQU0yUixVQUFOLEdBQW1Cak4sSUFBbkI7QUFDQSxrQkFBTzFFLEtBQVA7QUFDRCxVQUhEO0FBSUQsUUFOSCxFQU9HZ0ssS0FQSCxDQU9TLGlCQUFTO0FBQ2Q3QixjQUFLN0IsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcsaUJBQU0yTCxNQUFOLEdBQWUseUNBQWY7QUFDQSxrQkFBTzNMLEtBQVA7QUFDRCxVQUhEO0FBSUEsYUFBTWlLLFlBQVksT0FBT3ZDLEtBQVAsS0FBaUIsUUFBakIsR0FBNEJBLEtBQTVCLEdBQW9DekIsS0FBS0MsU0FBTCxDQUFld0IsS0FBZixFQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUF0RDtBQUNBM0IsaUJBQVEyQixLQUFSLHlDQUFvRHVDLFNBQXBEO0FBQ0QsUUFkSDtBQWVEOzs7MkNBRXNCNUQsSyxFQUFPO0FBQzVCLFlBQUtDLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGVBQU1tRixXQUFOLEdBQW9Ca0IsS0FBcEI7QUFDQSxnQkFBT3JHLEtBQVA7QUFDRCxRQUhEO0FBSUQ7OzsyQ0FFc0JxUyxVLEVBQVlsTCxJLEVBQU07QUFDdkNwQixlQUFRQyxHQUFSLDBDQUFtRHFNLFVBQW5ELFVBQWtFbEwsSUFBbEU7QUFDRDs7OzhCQUVTO0FBQUE7O0FBQ1IsY0FDRTtBQUFBO0FBQUE7QUFDRSw2REFBVSxTQUFTLEtBQUt6RCxLQUFMLENBQVdMLFdBQTlCLEdBREY7QUFFRTtBQUFBO0FBQUEsYUFBSSxXQUFVLFVBQWQ7QUFBQTtBQUFBLFVBRkY7QUFHRSxrREFIRjtBQUlFO0FBQUE7QUFBQSxhQUFJLFdBQVUsVUFBZDtBQUF5QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQXpCO0FBQUE7QUFBMkMsZ0JBQUtLLEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I2RTtBQUEvRCxVQUpGO0FBS0UscUVBQWtCLE9BQU8sS0FBSzNFLEtBQUwsQ0FBV21GLFdBQXBDLEdBTEY7QUFNRTtBQUNFLHNCQUFVLFVBRFo7QUFFRSwyQkFBZSxlQUZqQjtBQUdFLDBCQUFlLEtBQUt6QixLQUFMLENBQVc1RCxRQUg1QjtBQUlFLHVCQUFZLEtBQUs0RCxLQUFMLENBQVc1RCxRQUFYLENBQW9CNkUsT0FKbEM7QUFLRSxpQkFBTSxLQUFLM0UsS0FBTCxDQUFXMlIsVUFMbkI7QUFNRSxxQkFBVSxJQU5aO0FBT0UseUJBQWMsSUFQaEI7QUFRRSxvQ0FBeUIsS0FBS1cscUJBQUwsQ0FBMkJ6TixJQUEzQixDQUFnQyxJQUFoQyxDQVIzQjtBQVNFLDhCQUFtQixLQUFLME4scUJBQUwsQ0FBMkIxTixJQUEzQixDQUFnQyxJQUFoQyxDQVRyQjtBQVVFLGdCQUFLO0FBQUEsb0JBQUssT0FBS29QLGtCQUFMLEdBQTBCelAsQ0FBL0I7QUFBQTtBQVZQO0FBTkYsUUFERjtBQXFCRDs7OztHQTFGaUMsZ0JBQU1PLFM7O0FBOEYxQzdDLHVCQUFzQlMsU0FBdEIsR0FBa0M7QUFDaEM3QyxhQUFVLGlCQUFVa0YsTUFBVixDQUFpQmpDLFVBREs7QUFFaENNLGdCQUFhLGlCQUFVSCxJQUFWLENBQWVIO0FBRkksRUFBbEM7O21CQUtlYixxQjs7Ozs7Ozs7Ozs7Ozs7QUN6R2Y7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Z2ZBRndEO0FBQ0w7OztBQUNiOztLQUVoQ0MsMkI7OztBQUVKLHdDQUFhdUIsS0FBYixFQUFvQjtBQUFBOztBQUFBLDJKQUNaQSxLQURZOztBQUVsQixXQUFLMUQsS0FBTCxHQUFhO0FBQ1gyUixtQkFBWXZNLFNBREQ7QUFFWEQsb0JBQWFDO0FBRkYsTUFBYjtBQUZrQjtBQU1uQjs7OzttQ0FFYztBQUNiLFdBQU1WLE9BQU8sS0FBS2hCLEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I0RSxJQUFqQztBQUNBLFdBQU1vQyxNQUFNLEtBQUtwRCxLQUFMLENBQVc1RCxRQUFYLENBQW9CZ0gsR0FBaEM7QUFDQSxXQUFNNEMsYUFBYSxLQUFLaEcsS0FBTCxDQUFXNUQsUUFBWCxDQUFvQjZFLE9BQXZDO0FBQ0EsV0FBTWlOLGtCQUFnQmxOLElBQWhCLDBDQUF5RG9DLEdBQXpELFNBQWdFNEMsVUFBaEUsc0JBQU47QUFDQSxZQUFLcEQsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcsZUFBTTJMLE1BQU4sNkJBQXVDaUcsR0FBdkM7QUFDQSxnQkFBTzVSLEtBQVA7QUFDRCxRQUhEO0FBSUEsY0FBTyxJQUFJc0ksT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q3FKLGVBQU1ELEdBQU4sRUFDR2xNLElBREgsQ0FDUSxlQUFPO0FBQ1gsZUFBSUcsSUFBSWlNLE9BQUosQ0FBWUMsR0FBWixDQUFnQixjQUFoQixLQUNGbE0sSUFBSWlNLE9BQUosQ0FBWUMsR0FBWixDQUFnQixjQUFoQixFQUFnQzNRLFdBQWhDLEdBQThDNFEsT0FBOUMsQ0FBc0Qsa0JBQXRELEtBQTZFLENBRC9FLEVBQ2tGO0FBQzlFLG9CQUFPbk0sSUFBSW9NLElBQUosRUFBUDtBQUNILFlBSEQsTUFJSztBQUNILG1CQUFNLElBQUlDLFNBQUosQ0FBYyxvQ0FBZCxDQUFOO0FBQ0Q7QUFDRixVQVRILEVBVUd4TSxJQVZILENBVVEsZ0JBQVE7QUFDWjZDLG1CQUFRMEosS0FBS0UsYUFBYjtBQUNELFVBWkgsRUFhR25JLEtBYkgsQ0FhUyxpQkFBUztBQUNkLGVBQU1DLFlBQVksT0FBT3ZDLEtBQVAsS0FBaUIsUUFBakIsR0FBNEJBLEtBQTVCLEdBQW9DekIsS0FBS0MsU0FBTCxDQUFld0IsS0FBZixFQUFzQixJQUF0QixFQUE0QixDQUE1QixDQUF0RDtBQUNBM0IsbUJBQVEyQixLQUFSLDhGQUF5R3VDLFNBQXpHO0FBQ0F6QixrQkFBT2QsS0FBUDtBQUNELFVBakJIO0FBa0JELFFBbkJNLENBQVA7QUFvQkQ7Ozt5Q0FFb0I7QUFDbkIsV0FBTVMsT0FBTyxJQUFiO0FBQ0EsWUFBSzJOLFdBQUwsR0FDR3BRLElBREgsQ0FDUSxnQkFBUTtBQUNaeUMsY0FBSzdCLFFBQUwsQ0FBYyxpQkFBUztBQUNyQnRHLGlCQUFNMlIsVUFBTixHQUFtQmpOLElBQW5CO0FBQ0Esa0JBQU8xRSxLQUFQO0FBQ0QsVUFIRDtBQUlELFFBTkgsRUFPR2dLLEtBUEgsQ0FPUyxZQUFNO0FBQ1g3QixjQUFLN0IsUUFBTCxDQUFjLGlCQUFTO0FBQ3JCdEcsaUJBQU0yTCxNQUFOLEdBQWUsOENBQWY7QUFDQSxrQkFBTzNMLEtBQVA7QUFDRCxVQUhEO0FBSUErRixpQkFBUTJCLEtBQVIsQ0FBYywrRUFBZDtBQUNELFFBYkg7QUFjRDs7OzJDQUVzQnJCLEssRUFBTztBQUM1QixZQUFLQyxRQUFMLENBQWMsaUJBQVM7QUFDckJ0RyxlQUFNbUYsV0FBTixHQUFvQmtCLEtBQXBCO0FBQ0EsZ0JBQU9yRyxLQUFQO0FBQ0QsUUFIRDtBQUlEOzs7MkNBRXNCcVMsVSxFQUFZbEwsSSxFQUFNO0FBQ3ZDcEIsZUFBUUMsR0FBUixnREFBeURxTSxVQUF6RCxVQUF3RWxMLElBQXhFO0FBQ0Q7Ozs4QkFFUztBQUFBOztBQUNSLFdBQU00TyxlQUFlLEtBQUsvVixLQUFMLENBQVcyUixVQUFYLElBQXlCdk0sU0FBOUM7QUFDQSxjQUNFO0FBQUE7QUFBQTtBQUNFLDZEQUFVLFNBQVMsS0FBSzFCLEtBQUwsQ0FBV0wsV0FBOUIsR0FERjtBQUVFO0FBQUE7QUFBQSxhQUFJLFdBQVUsVUFBZDtBQUFBO0FBQUEsVUFGRjtBQUdFLGtEQUhGO0FBSUU7QUFBQTtBQUFBLGFBQUksV0FBVSxVQUFkO0FBQXlCO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFBekI7QUFBQTtBQUEyQyxnQkFBS0ssS0FBTCxDQUFXNUQsUUFBWCxDQUFvQjZFO0FBQS9ELFVBSkY7QUFLRSxxRUFBa0IsT0FBTyxLQUFLM0UsS0FBTCxDQUFXbUYsV0FBcEMsR0FMRjtBQU1FO0FBQ0Usc0JBQVUsVUFEWjtBQUVFLDJCQUFlLGVBRmpCO0FBR0UsMEJBQWUsS0FBS3pCLEtBQUwsQ0FBVzVELFFBSDVCO0FBSUUsdUJBQVksS0FBSzRELEtBQUwsQ0FBVzVELFFBQVgsQ0FBb0I2RSxPQUpsQztBQUtFLGlCQUFNLEtBQUszRSxLQUFMLENBQVcyUixVQUxuQjtBQU1FLDBCQUFlb0UsWUFOakI7QUFPRSxxQkFBVSxJQVBaO0FBUUUseUJBQWMsSUFSaEI7QUFTRSxvQ0FBeUIsS0FBS3pELHFCQUFMLENBQTJCek4sSUFBM0IsQ0FBZ0MsSUFBaEMsQ0FUM0I7QUFVRSw4QkFBbUIsS0FBSzBOLHFCQUFMLENBQTJCMU4sSUFBM0IsQ0FBZ0MsSUFBaEMsQ0FWckI7QUFXRSxnQkFBSztBQUFBLG9CQUFLLE9BQUtvUCxrQkFBTCxHQUEwQnpQLENBQS9CO0FBQUE7QUFYUDtBQU5GLFFBREY7QUFzQkQ7Ozs7R0E5RnVDLGdCQUFNTyxTOztBQWtHaEQ1Qyw2QkFBNEJRLFNBQTVCLEdBQXdDO0FBQ3RDN0MsYUFBVSxpQkFBVWtGLE1BQVYsQ0FBaUJqQyxVQURXO0FBRXRDTSxnQkFBYSxpQkFBVUgsSUFBVixDQUFlSDtBQUZVLEVBQXhDOzttQkFLZVosMkI7Ozs7Ozs7Ozs7OztBQzdHZjs7QUFDQTs7bUJBRWUsVUFBQzZULFVBQUQsRUFBZ0I7O0FBRTdCLE9BQU1qVixrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNmLEtBQUQsRUFBVztBQUNqQyxZQUFPO0FBQ0xGLGlCQUFVRSxNQUFNRjtBQURYLE1BQVA7QUFHRCxJQUpEOztBQU1BLE9BQU1zQyxxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFDQyxRQUFELEVBQWM7QUFDdkMsWUFBTztBQUNMZ0Isb0JBQWEsdUJBQU07QUFDakJoQixrQkFBUyx5QkFBVyxNQUFYLENBQVQ7QUFDRDtBQUhJLE1BQVA7QUFLRCxJQU5EOztBQVFBLE9BQU00VCxnQkFBZ0IsMEJBQVM7QUFDN0JsVixrQkFEb0IsRUFFcEJxQixrQkFGb0IsRUFHcEI0VCxVQUhvQixDQUF0Qjs7QUFLQSxVQUFPLG9CQUFDLGFBQUQsT0FBUDtBQUVELEU7Ozs7Ozs7Ozs7OztBQzFCRDs7QUFDQTs7bUJBRWUsVUFBQ0EsVUFBRCxFQUFhRSxnQkFBYixFQUFrQzs7QUFFL0MsT0FBTW5WLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ2YsS0FBRCxFQUFXO0FBQ2pDLFlBQU87QUFDTEYsaUJBQVU2RixPQUFPc0MsTUFBUCxDQUFjakksTUFBTUYsUUFBcEIsRUFBOEJvVyxnQkFBOUI7QUFETCxNQUFQO0FBR0QsSUFKRDs7QUFNQSxPQUFNOVQscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ0MsUUFBRCxFQUFjO0FBQ3ZDLFlBQU87QUFDTGdCLG9CQUFhLHVCQUFNO0FBQ2pCaEIsa0JBQVMseUJBQVcsTUFBWCxDQUFUO0FBQ0Q7QUFISSxNQUFQO0FBS0QsSUFORDs7QUFRQSxPQUFNOFQscUJBQXFCLDBCQUFTO0FBQ2xDcFYsa0JBRHlCLEVBRXpCcUIsa0JBRnlCLEVBR3pCNFQsVUFIeUIsQ0FBM0I7O0FBS0EsVUFBTyxvQkFBQyxrQkFBRCxPQUFQO0FBRUQsRTs7Ozs7Ozs7Ozs7O0FDMUJEOztBQUNBOzttQkFFZSxVQUFDQSxVQUFELEVBQWFFLGdCQUFiLEVBQWtDOztBQUUvQyxPQUFNblYsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDZixLQUFELEVBQVc7QUFDakMsWUFBTztBQUNMRixpQkFBVTZGLE9BQU9zQyxNQUFQLENBQWNqSSxNQUFNRixRQUFwQixFQUE4Qm9XLGdCQUE5QjtBQURMLE1BQVA7QUFHRCxJQUpEOztBQU1BLE9BQU05VCxxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFDQyxRQUFELEVBQWM7QUFDdkMsWUFBTztBQUNMZ0Isb0JBQWEsdUJBQU07QUFDakJoQixrQkFBUyx5QkFBVyxNQUFYLENBQVQ7QUFDRDtBQUhJLE1BQVA7QUFLRCxJQU5EOztBQVFBLE9BQU0rVCxzQkFBc0IsMEJBQVM7QUFDbkNyVixrQkFEMEIsRUFFMUJxQixrQkFGMEIsRUFHMUI0VCxVQUgwQixDQUE1Qjs7QUFLQSxVQUFPLG9CQUFDLG1CQUFELE9BQVA7QUFFRCxFOzs7Ozs7Ozs7Ozs7QUN4QkQ7O0FBRUEsS0FBTUssTUFBTSxTQUFOQSxHQUFNO0FBQUEsT0FBR3JWLElBQUgsUUFBR0EsSUFBSDtBQUFBLFVBQ1Y7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFNBQUcsV0FBVSxlQUFiO0FBQUE7QUFBK0NzVixPQUFBLFNBQUFBO0FBQS9DLE1BREY7QUFFRyxxQkFBU0MsSUFBVCxDQUFjdlYsSUFBZDtBQUZILElBRFU7QUFBQSxFQUFaLEMsQ0FKQTtBQUNBO21CQVVlcVYsRzs7Ozs7O0FDWGY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDcEZBLHVEIiwiZmlsZSI6InNjcmlwdC9yZWQ1cHJvLXRlc3RiZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdERPTVwiKSwgcmVxdWlyZShcIlJlYWN0UmVkdXhcIiksIHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJSZWFjdERPTVwiLCBcIlJlYWN0UmVkdXhcIiwgXCJSZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJyZWQ1cHJvdGVzdGJlZFwiXSA9IGZhY3RvcnkocmVxdWlyZShcIlJlYWN0RE9NXCIpLCByZXF1aXJlKFwiUmVhY3RSZWR1eFwiKSwgcmVxdWlyZShcIlJlYWN0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJyZWQ1cHJvdGVzdGJlZFwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0RE9NXCJdLCByb290W1wiUmVhY3RSZWR1eFwiXSwgcm9vdFtcIlJlYWN0XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE4X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMjlfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZTNkOTkyZTViN2QwMjQ3MGYwNGJcbiAqKi8iLCJpbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCcgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IHJlZHVjZXIgZnJvbSAnLi9yZWR1Y2VycydcbmltcG9ydCBBcHBDb250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL0FwcENvbnRhaW5lcicgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5pbXBvcnQgdGVzdGJlZCBmcm9tIFwiLi4vcmVzb3VyY2UvdGVzdGJlZC5qc29uXCJcblxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyLCB7XG4gIC4uLnRlc3RiZWQsXG4gIHZpZXdGaWx0ZXI6ICdIb21lJyxcbiAgbG9nTGV2ZWw6ICdkZWJ1Zydcbn0pXG5cbi8vIGNvbnNvbGUubG9nKCdbaW5kZXhdOlxcclxcbicgKyBKU09OLnN0cmluZ2lmeShzdG9yZS5nZXRTdGF0ZSgpLCBudWxsLCAyKSlcblxucmVuZGVyKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8QXBwQ29udGFpbmVyIC8+XG4gIDwvUHJvdmlkZXI+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbilcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJSZWFjdERPTVwiXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5jb21wb3NlID0gZXhwb3J0cy5hcHBseU1pZGRsZXdhcmUgPSBleHBvcnRzLmJpbmRBY3Rpb25DcmVhdG9ycyA9IGV4cG9ydHMuY29tYmluZVJlZHVjZXJzID0gZXhwb3J0cy5jcmVhdGVTdG9yZSA9IHVuZGVmaW5lZDtcblxudmFyIF9jcmVhdGVTdG9yZSA9IHJlcXVpcmUoJy4vY3JlYXRlU3RvcmUnKTtcblxudmFyIF9jcmVhdGVTdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVTdG9yZSk7XG5cbnZhciBfY29tYmluZVJlZHVjZXJzID0gcmVxdWlyZSgnLi9jb21iaW5lUmVkdWNlcnMnKTtcblxudmFyIF9jb21iaW5lUmVkdWNlcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tYmluZVJlZHVjZXJzKTtcblxudmFyIF9iaW5kQWN0aW9uQ3JlYXRvcnMgPSByZXF1aXJlKCcuL2JpbmRBY3Rpb25DcmVhdG9ycycpO1xuXG52YXIgX2JpbmRBY3Rpb25DcmVhdG9yczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iaW5kQWN0aW9uQ3JlYXRvcnMpO1xuXG52YXIgX2FwcGx5TWlkZGxld2FyZSA9IHJlcXVpcmUoJy4vYXBwbHlNaWRkbGV3YXJlJyk7XG5cbnZhciBfYXBwbHlNaWRkbGV3YXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FwcGx5TWlkZGxld2FyZSk7XG5cbnZhciBfY29tcG9zZSA9IHJlcXVpcmUoJy4vY29tcG9zZScpO1xuXG52YXIgX2NvbXBvc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9zZSk7XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuLypcbiogVGhpcyBpcyBhIGR1bW15IGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBmdW5jdGlvbiBuYW1lIGhhcyBiZWVuIGFsdGVyZWQgYnkgbWluaWZpY2F0aW9uLlxuKiBJZiB0aGUgZnVuY3Rpb24gaGFzIGJlZW4gbWluaWZpZWQgYW5kIE5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsIHdhcm4gdGhlIHVzZXIuXG4qL1xuZnVuY3Rpb24gaXNDcnVzaGVkKCkge31cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGlzQ3J1c2hlZC5uYW1lID09PSAnc3RyaW5nJyAmJiBpc0NydXNoZWQubmFtZSAhPT0gJ2lzQ3J1c2hlZCcpIHtcbiAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSgnWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgbWluaWZpZWQgY29kZSBvdXRzaWRlIG9mIE5PREVfRU5WID09PSBcXCdwcm9kdWN0aW9uXFwnLiAnICsgJ1RoaXMgbWVhbnMgdGhhdCB5b3UgYXJlIHJ1bm5pbmcgYSBzbG93ZXIgZGV2ZWxvcG1lbnQgYnVpbGQgb2YgUmVkdXguICcgKyAnWW91IGNhbiB1c2UgbG9vc2UtZW52aWZ5IChodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9sb29zZS1lbnZpZnkpIGZvciBicm93c2VyaWZ5ICcgKyAnb3IgRGVmaW5lUGx1Z2luIGZvciB3ZWJwYWNrIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwMDMwMDMxKSAnICsgJ3RvIGVuc3VyZSB5b3UgaGF2ZSB0aGUgY29ycmVjdCBjb2RlIGZvciB5b3VyIHByb2R1Y3Rpb24gYnVpbGQuJyk7XG59XG5cbmV4cG9ydHMuY3JlYXRlU3RvcmUgPSBfY3JlYXRlU3RvcmUyWydkZWZhdWx0J107XG5leHBvcnRzLmNvbWJpbmVSZWR1Y2VycyA9IF9jb21iaW5lUmVkdWNlcnMyWydkZWZhdWx0J107XG5leHBvcnRzLmJpbmRBY3Rpb25DcmVhdG9ycyA9IF9iaW5kQWN0aW9uQ3JlYXRvcnMyWydkZWZhdWx0J107XG5leHBvcnRzLmFwcGx5TWlkZGxld2FyZSA9IF9hcHBseU1pZGRsZXdhcmUyWydkZWZhdWx0J107XG5leHBvcnRzLmNvbXBvc2UgPSBfY29tcG9zZTJbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWR1eC9saWIvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5BY3Rpb25UeXBlcyA9IHVuZGVmaW5lZDtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNyZWF0ZVN0b3JlO1xuXG52YXIgX2lzUGxhaW5PYmplY3QgPSByZXF1aXJlKCdsb2Rhc2gvaXNQbGFpbk9iamVjdCcpO1xuXG52YXIgX2lzUGxhaW5PYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQbGFpbk9iamVjdCk7XG5cbnZhciBfc3ltYm9sT2JzZXJ2YWJsZSA9IHJlcXVpcmUoJ3N5bWJvbC1vYnNlcnZhYmxlJyk7XG5cbnZhciBfc3ltYm9sT2JzZXJ2YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2xPYnNlcnZhYmxlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4vKipcbiAqIFRoZXNlIGFyZSBwcml2YXRlIGFjdGlvbiB0eXBlcyByZXNlcnZlZCBieSBSZWR1eC5cbiAqIEZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB5b3UgbXVzdCByZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGUuXG4gKiBJZiB0aGUgY3VycmVudCBzdGF0ZSBpcyB1bmRlZmluZWQsIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAqIERvIG5vdCByZWZlcmVuY2UgdGhlc2UgYWN0aW9uIHR5cGVzIGRpcmVjdGx5IGluIHlvdXIgY29kZS5cbiAqL1xudmFyIEFjdGlvblR5cGVzID0gZXhwb3J0cy5BY3Rpb25UeXBlcyA9IHtcbiAgSU5JVDogJ0BAcmVkdXgvSU5JVCdcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIFJlZHV4IHN0b3JlIHRoYXQgaG9sZHMgdGhlIHN0YXRlIHRyZWUuXG4gKiBUaGUgb25seSB3YXkgdG8gY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBpcyB0byBjYWxsIGBkaXNwYXRjaCgpYCBvbiBpdC5cbiAqXG4gKiBUaGVyZSBzaG91bGQgb25seSBiZSBhIHNpbmdsZSBzdG9yZSBpbiB5b3VyIGFwcC4gVG8gc3BlY2lmeSBob3cgZGlmZmVyZW50XG4gKiBwYXJ0cyBvZiB0aGUgc3RhdGUgdHJlZSByZXNwb25kIHRvIGFjdGlvbnMsIHlvdSBtYXkgY29tYmluZSBzZXZlcmFsIHJlZHVjZXJzXG4gKiBpbnRvIGEgc2luZ2xlIHJlZHVjZXIgZnVuY3Rpb24gYnkgdXNpbmcgYGNvbWJpbmVSZWR1Y2Vyc2AuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmV4dCBzdGF0ZSB0cmVlLCBnaXZlblxuICogdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGFjdGlvbiB0byBoYW5kbGUuXG4gKlxuICogQHBhcmFtIHthbnl9IFtwcmVsb2FkZWRTdGF0ZV0gVGhlIGluaXRpYWwgc3RhdGUuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gKiB0byBoeWRyYXRlIHRoZSBzdGF0ZSBmcm9tIHRoZSBzZXJ2ZXIgaW4gdW5pdmVyc2FsIGFwcHMsIG9yIHRvIHJlc3RvcmUgYVxuICogcHJldmlvdXNseSBzZXJpYWxpemVkIHVzZXIgc2Vzc2lvbi5cbiAqIElmIHlvdSB1c2UgYGNvbWJpbmVSZWR1Y2Vyc2AgdG8gcHJvZHVjZSB0aGUgcm9vdCByZWR1Y2VyIGZ1bmN0aW9uLCB0aGlzIG11c3QgYmVcbiAqIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlIGFzIGBjb21iaW5lUmVkdWNlcnNgIGtleXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5oYW5jZXIgVGhlIHN0b3JlIGVuaGFuY2VyLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICogdG8gZW5oYW5jZSB0aGUgc3RvcmUgd2l0aCB0aGlyZC1wYXJ0eSBjYXBhYmlsaXRpZXMgc3VjaCBhcyBtaWRkbGV3YXJlLFxuICogdGltZSB0cmF2ZWwsIHBlcnNpc3RlbmNlLCBldGMuIFRoZSBvbmx5IHN0b3JlIGVuaGFuY2VyIHRoYXQgc2hpcHMgd2l0aCBSZWR1eFxuICogaXMgYGFwcGx5TWlkZGxld2FyZSgpYC5cbiAqXG4gKiBAcmV0dXJucyB7U3RvcmV9IEEgUmVkdXggc3RvcmUgdGhhdCBsZXRzIHlvdSByZWFkIHRoZSBzdGF0ZSwgZGlzcGF0Y2ggYWN0aW9uc1xuICogYW5kIHN1YnNjcmliZSB0byBjaGFuZ2VzLlxuICovXG5mdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgdmFyIF9yZWYyO1xuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAndW5kZWZpbmVkJykge1xuICAgIGVuaGFuY2VyID0gcHJlbG9hZGVkU3RhdGU7XG4gICAgcHJlbG9hZGVkU3RhdGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGVuaGFuY2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuaGFuY2VyKGNyZWF0ZVN0b3JlKShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSByZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgY3VycmVudFJlZHVjZXIgPSByZWR1Y2VyO1xuICB2YXIgY3VycmVudFN0YXRlID0gcHJlbG9hZGVkU3RhdGU7XG4gIHZhciBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gIHZhciBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycztcbiAgdmFyIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCkge1xuICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycy5zbGljZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cbiAgICpcbiAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hhbmdlIGxpc3RlbmVyLiBJdCB3aWxsIGJlIGNhbGxlZCBhbnkgdGltZSBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCxcbiAgICogYW5kIHNvbWUgcGFydCBvZiB0aGUgc3RhdGUgdHJlZSBtYXkgcG90ZW50aWFsbHkgaGF2ZSBjaGFuZ2VkLiBZb3UgbWF5IHRoZW5cbiAgICogY2FsbCBgZ2V0U3RhdGUoKWAgdG8gcmVhZCB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGluc2lkZSB0aGUgY2FsbGJhY2suXG4gICAqXG4gICAqIFlvdSBtYXkgY2FsbCBgZGlzcGF0Y2goKWAgZnJvbSBhIGNoYW5nZSBsaXN0ZW5lciwgd2l0aCB0aGUgZm9sbG93aW5nXG4gICAqIGNhdmVhdHM6XG4gICAqXG4gICAqIDEuIFRoZSBzdWJzY3JpcHRpb25zIGFyZSBzbmFwc2hvdHRlZCBqdXN0IGJlZm9yZSBldmVyeSBgZGlzcGF0Y2goKWAgY2FsbC5cbiAgICogSWYgeW91IHN1YnNjcmliZSBvciB1bnN1YnNjcmliZSB3aGlsZSB0aGUgbGlzdGVuZXJzIGFyZSBiZWluZyBpbnZva2VkLCB0aGlzXG4gICAqIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdCBvbiB0aGUgYGRpc3BhdGNoKClgIHRoYXQgaXMgY3VycmVudGx5IGluIHByb2dyZXNzLlxuICAgKiBIb3dldmVyLCB0aGUgbmV4dCBgZGlzcGF0Y2goKWAgY2FsbCwgd2hldGhlciBuZXN0ZWQgb3Igbm90LCB3aWxsIHVzZSBhIG1vcmVcbiAgICogcmVjZW50IHNuYXBzaG90IG9mIHRoZSBzdWJzY3JpcHRpb24gbGlzdC5cbiAgICpcbiAgICogMi4gVGhlIGxpc3RlbmVyIHNob3VsZCBub3QgZXhwZWN0IHRvIHNlZSBhbGwgc3RhdGUgY2hhbmdlcywgYXMgdGhlIHN0YXRlXG4gICAqIG1pZ2h0IGhhdmUgYmVlbiB1cGRhdGVkIG11bHRpcGxlIHRpbWVzIGR1cmluZyBhIG5lc3RlZCBgZGlzcGF0Y2goKWAgYmVmb3JlXG4gICAqIHRoZSBsaXN0ZW5lciBpcyBjYWxsZWQuIEl0IGlzLCBob3dldmVyLCBndWFyYW50ZWVkIHRoYXQgYWxsIHN1YnNjcmliZXJzXG4gICAqIHJlZ2lzdGVyZWQgYmVmb3JlIHRoZSBgZGlzcGF0Y2goKWAgc3RhcnRlZCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBsYXRlc3RcbiAgICogc3RhdGUgYnkgdGhlIHRpbWUgaXQgZXhpdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBldmVyeSBkaXNwYXRjaC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGlzIGNoYW5nZSBsaXN0ZW5lci5cbiAgICovXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcblxuICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICBuZXh0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgaWYgKCFpc1N1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgICAgdmFyIGluZGV4ID0gbmV4dExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uLiBJdCBpcyB0aGUgb25seSB3YXkgdG8gdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS5cbiAgICpcbiAgICogVGhlIGByZWR1Y2VyYCBmdW5jdGlvbiwgdXNlZCB0byBjcmVhdGUgdGhlIHN0b3JlLCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZVxuICAgKiBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBnaXZlbiBgYWN0aW9uYC4gSXRzIHJldHVybiB2YWx1ZSB3aWxsXG4gICAqIGJlIGNvbnNpZGVyZWQgdGhlICoqbmV4dCoqIHN0YXRlIG9mIHRoZSB0cmVlLCBhbmQgdGhlIGNoYW5nZSBsaXN0ZW5lcnNcbiAgICogd2lsbCBiZSBub3RpZmllZC5cbiAgICpcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb25seSBzdXBwb3J0cyBwbGFpbiBvYmplY3QgYWN0aW9ucy4gSWYgeW91IHdhbnQgdG9cbiAgICogZGlzcGF0Y2ggYSBQcm9taXNlLCBhbiBPYnNlcnZhYmxlLCBhIHRodW5rLCBvciBzb21ldGhpbmcgZWxzZSwgeW91IG5lZWQgdG9cbiAgICogd3JhcCB5b3VyIHN0b3JlIGNyZWF0aW5nIGZ1bmN0aW9uIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgbWlkZGxld2FyZS4gRm9yXG4gICAqIGV4YW1wbGUsIHNlZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIGByZWR1eC10aHVua2AgcGFja2FnZS4gRXZlbiB0aGVcbiAgICogbWlkZGxld2FyZSB3aWxsIGV2ZW50dWFsbHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0IGFjdGlvbnMgdXNpbmcgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gQSBwbGFpbiBvYmplY3QgcmVwcmVzZW50aW5nIOKAnHdoYXQgY2hhbmdlZOKAnS4gSXQgaXNcbiAgICogYSBnb29kIGlkZWEgdG8ga2VlcCBhY3Rpb25zIHNlcmlhbGl6YWJsZSBzbyB5b3UgY2FuIHJlY29yZCBhbmQgcmVwbGF5IHVzZXJcbiAgICogc2Vzc2lvbnMsIG9yIHVzZSB0aGUgdGltZSB0cmF2ZWxsaW5nIGByZWR1eC1kZXZ0b29sc2AuIEFuIGFjdGlvbiBtdXN0IGhhdmVcbiAgICogYSBgdHlwZWAgcHJvcGVydHkgd2hpY2ggbWF5IG5vdCBiZSBgdW5kZWZpbmVkYC4gSXQgaXMgYSBnb29kIGlkZWEgdG8gdXNlXG4gICAqIHN0cmluZyBjb25zdGFudHMgZm9yIGFjdGlvbiB0eXBlcy5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gRm9yIGNvbnZlbmllbmNlLCB0aGUgc2FtZSBhY3Rpb24gb2JqZWN0IHlvdSBkaXNwYXRjaGVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQsIGlmIHlvdSB1c2UgYSBjdXN0b20gbWlkZGxld2FyZSwgaXQgbWF5IHdyYXAgYGRpc3BhdGNoKClgIHRvXG4gICAqIHJldHVybiBzb21ldGhpbmcgZWxzZSAoZm9yIGV4YW1wbGUsIGEgUHJvbWlzZSB5b3UgY2FuIGF3YWl0KS5cbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgIGlmICghKDAsIF9pc1BsYWluT2JqZWN0MlsnZGVmYXVsdCddKShhY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbXVzdCBiZSBwbGFpbiBvYmplY3RzLiAnICsgJ1VzZSBjdXN0b20gbWlkZGxld2FyZSBmb3IgYXN5bmMgYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuICcgKyAnSGF2ZSB5b3UgbWlzc3BlbGxlZCBhIGNvbnN0YW50PycpO1xuICAgIH1cblxuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycyA9IG5leHRMaXN0ZW5lcnM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyc1tpXSgpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgdGhlIHJlZHVjZXIgY3VycmVudGx5IHVzZWQgYnkgdGhlIHN0b3JlIHRvIGNhbGN1bGF0ZSB0aGUgc3RhdGUuXG4gICAqXG4gICAqIFlvdSBtaWdodCBuZWVkIHRoaXMgaWYgeW91ciBhcHAgaW1wbGVtZW50cyBjb2RlIHNwbGl0dGluZyBhbmQgeW91IHdhbnQgdG9cbiAgICogbG9hZCBzb21lIG9mIHRoZSByZWR1Y2VycyBkeW5hbWljYWxseS4gWW91IG1pZ2h0IGFsc28gbmVlZCB0aGlzIGlmIHlvdVxuICAgKiBpbXBsZW1lbnQgYSBob3QgcmVsb2FkaW5nIG1lY2hhbmlzbSBmb3IgUmVkdXguXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRSZWR1Y2VyIFRoZSByZWR1Y2VyIGZvciB0aGUgc3RvcmUgdG8gdXNlIGluc3RlYWQuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpIHtcbiAgICBpZiAodHlwZW9mIG5leHRSZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBuZXh0UmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGN1cnJlbnRSZWR1Y2VyID0gbmV4dFJlZHVjZXI7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyb3BlcmFiaWxpdHkgcG9pbnQgZm9yIG9ic2VydmFibGUvcmVhY3RpdmUgbGlicmFyaWVzLlxuICAgKiBAcmV0dXJucyB7b2JzZXJ2YWJsZX0gQSBtaW5pbWFsIG9ic2VydmFibGUgb2Ygc3RhdGUgY2hhbmdlcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgb2JzZXJ2YWJsZSBwcm9wb3NhbDpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3plbnBhcnNpbmcvZXMtb2JzZXJ2YWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gb2JzZXJ2YWJsZSgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBvdXRlclN1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICByZXR1cm4gX3JlZiA9IHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIG1pbmltYWwgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ic2VydmVyIEFueSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyBhbiBvYnNlcnZlci5cbiAgICAgICAqIFRoZSBvYnNlcnZlciBvYmplY3Qgc2hvdWxkIGhhdmUgYSBgbmV4dGAgbWV0aG9kLlxuICAgICAgICogQHJldHVybnMge3N1YnNjcmlwdGlvbn0gQW4gb2JqZWN0IHdpdGggYW4gYHVuc3Vic2NyaWJlYCBtZXRob2QgdGhhdCBjYW5cbiAgICAgICAqIGJlIHVzZWQgdG8gdW5zdWJzY3JpYmUgdGhlIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBwcmV2ZW50IGZ1cnRoZXJcbiAgICAgICAqIGVtaXNzaW9uIG9mIHZhbHVlcyBmcm9tIHRoZSBvYnNlcnZhYmxlLlxuICAgICAgICovXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICBpZiAodHlwZW9mIG9ic2VydmVyICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBvYnNlcnZlciB0byBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlU3RhdGUoKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZ2V0U3RhdGUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZVN0YXRlKCk7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9IG91dGVyU3Vic2NyaWJlKG9ic2VydmVTdGF0ZSk7XG4gICAgICAgIHJldHVybiB7IHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZSB9O1xuICAgICAgfVxuICAgIH0sIF9yZWZbX3N5bWJvbE9ic2VydmFibGUyWydkZWZhdWx0J11dID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgX3JlZjtcbiAgfVxuXG4gIC8vIFdoZW4gYSBzdG9yZSBpcyBjcmVhdGVkLCBhbiBcIklOSVRcIiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBzbyB0aGF0IGV2ZXJ5XG4gIC8vIHJlZHVjZXIgcmV0dXJucyB0aGVpciBpbml0aWFsIHN0YXRlLiBUaGlzIGVmZmVjdGl2ZWx5IHBvcHVsYXRlc1xuICAvLyB0aGUgaW5pdGlhbCBzdGF0ZSB0cmVlLlxuICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG4gICAgcmVwbGFjZVJlZHVjZXI6IHJlcGxhY2VSZWR1Y2VyXG4gIH0sIF9yZWYyW19zeW1ib2xPYnNlcnZhYmxlMlsnZGVmYXVsdCddXSA9IG9ic2VydmFibGUsIF9yZWYyO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZHV4L2xpYi9jcmVhdGVTdG9yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXRQcm90b3R5cGUgPSByZXF1aXJlKCcuL19nZXRQcm90b3R5cGUnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmXG4gICAgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiYgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQbGFpbk9iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pc1BsYWluT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIG92ZXJBcmcgPSByZXF1aXJlKCcuL19vdmVyQXJnJyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFByb3RvdHlwZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fZ2V0UHJvdG90eXBlLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlckFyZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fb3ZlckFyZy5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pc09iamVjdExpa2UuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zeW1ib2wtb2JzZXJ2YWJsZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcG9ueWZpbGwgPSByZXF1aXJlKCcuL3BvbnlmaWxsJyk7XG5cbnZhciBfcG9ueWZpbGwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9ueWZpbGwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciByb290ID0gdW5kZWZpbmVkOyAvKiBnbG9iYWwgd2luZG93ICovXG5cbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuXHRyb290ID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHRyb290ID0gd2luZG93O1xufVxuXG52YXIgcmVzdWx0ID0gKDAsIF9wb255ZmlsbDJbJ2RlZmF1bHQnXSkocm9vdCk7XG5leHBvcnRzWydkZWZhdWx0J10gPSByZXN1bHQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3ltYm9sLW9ic2VydmFibGUvbGliL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHN5bWJvbE9ic2VydmFibGVQb255ZmlsbDtcbmZ1bmN0aW9uIHN5bWJvbE9ic2VydmFibGVQb255ZmlsbChyb290KSB7XG5cdHZhciByZXN1bHQ7XG5cdHZhciBfU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBfU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKF9TeW1ib2wub2JzZXJ2YWJsZSkge1xuXHRcdFx0cmVzdWx0ID0gX1N5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBfU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRfU3ltYm9sLm9ic2VydmFibGUgPSByZXN1bHQ7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9ICdAQG9ic2VydmFibGUnO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3ltYm9sLW9ic2VydmFibGUvbGliL3BvbnlmaWxsLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNvbWJpbmVSZWR1Y2VycztcblxudmFyIF9jcmVhdGVTdG9yZSA9IHJlcXVpcmUoJy4vY3JlYXRlU3RvcmUnKTtcblxudmFyIF9pc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnbG9kYXNoL2lzUGxhaW5PYmplY3QnKTtcblxudmFyIF9pc1BsYWluT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUGxhaW5PYmplY3QpO1xuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCcuL3V0aWxzL3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKGtleSwgYWN0aW9uKSB7XG4gIHZhciBhY3Rpb25UeXBlID0gYWN0aW9uICYmIGFjdGlvbi50eXBlO1xuICB2YXIgYWN0aW9uTmFtZSA9IGFjdGlvblR5cGUgJiYgJ1wiJyArIGFjdGlvblR5cGUudG9TdHJpbmcoKSArICdcIicgfHwgJ2FuIGFjdGlvbic7XG5cbiAgcmV0dXJuICdHaXZlbiBhY3Rpb24gJyArIGFjdGlvbk5hbWUgKyAnLCByZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQuICcgKyAnVG8gaWdub3JlIGFuIGFjdGlvbiwgeW91IG11c3QgZXhwbGljaXRseSByZXR1cm4gdGhlIHByZXZpb3VzIHN0YXRlLic7XG59XG5cbmZ1bmN0aW9uIGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2UoaW5wdXRTdGF0ZSwgcmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGFyZ3VtZW50TmFtZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gX2NyZWF0ZVN0b3JlLkFjdGlvblR5cGVzLklOSVQgPyAncHJlbG9hZGVkU3RhdGUgYXJndW1lbnQgcGFzc2VkIHRvIGNyZWF0ZVN0b3JlJyA6ICdwcmV2aW91cyBzdGF0ZSByZWNlaXZlZCBieSB0aGUgcmVkdWNlcic7XG5cbiAgaWYgKHJlZHVjZXJLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnU3RvcmUgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHJlZHVjZXIuIE1ha2Ugc3VyZSB0aGUgYXJndW1lbnQgcGFzc2VkICcgKyAndG8gY29tYmluZVJlZHVjZXJzIGlzIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIHJlZHVjZXJzLic7XG4gIH1cblxuICBpZiAoISgwLCBfaXNQbGFpbk9iamVjdDJbJ2RlZmF1bHQnXSkoaW5wdXRTdGF0ZSkpIHtcbiAgICByZXR1cm4gJ1RoZSAnICsgYXJndW1lbnROYW1lICsgJyBoYXMgdW5leHBlY3RlZCB0eXBlIG9mIFwiJyArIHt9LnRvU3RyaW5nLmNhbGwoaW5wdXRTdGF0ZSkubWF0Y2goL1xccyhbYS16fEEtWl0rKS8pWzFdICsgJ1wiLiBFeHBlY3RlZCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nICcgKyAoJ2tleXM6IFwiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiJyk7XG4gIH1cblxuICB2YXIgdW5leHBlY3RlZEtleXMgPSBPYmplY3Qua2V5cyhpbnB1dFN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAhcmVkdWNlcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhdW5leHBlY3RlZEtleUNhY2hlW2tleV07XG4gIH0pO1xuXG4gIHVuZXhwZWN0ZWRLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldID0gdHJ1ZTtcbiAgfSk7XG5cbiAgaWYgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gJ1VuZXhwZWN0ZWQgJyArICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAxID8gJ2tleXMnIDogJ2tleScpICsgJyAnICsgKCdcIicgKyB1bmV4cGVjdGVkS2V5cy5qb2luKCdcIiwgXCInKSArICdcIiBmb3VuZCBpbiAnICsgYXJndW1lbnROYW1lICsgJy4gJykgKyAnRXhwZWN0ZWQgdG8gZmluZCBvbmUgb2YgdGhlIGtub3duIHJlZHVjZXIga2V5cyBpbnN0ZWFkOiAnICsgKCdcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIi4gVW5leHBlY3RlZCBrZXlzIHdpbGwgYmUgaWdub3JlZC4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRSZWR1Y2VyU2FuaXR5KHJlZHVjZXJzKSB7XG4gIE9iamVjdC5rZXlzKHJlZHVjZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgcmVkdWNlciA9IHJlZHVjZXJzW2tleV07XG4gICAgdmFyIGluaXRpYWxTdGF0ZSA9IHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IF9jcmVhdGVTdG9yZS5BY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCBkdXJpbmcgaW5pdGlhbGl6YXRpb24uICcgKyAnSWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGUgcmVkdWNlciBpcyB1bmRlZmluZWQsIHlvdSBtdXN0ICcgKyAnZXhwbGljaXRseSByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSAnICsgJ25vdCBiZSB1bmRlZmluZWQuJyk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSAnQEByZWR1eC9QUk9CRV9VTktOT1dOX0FDVElPTl8nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLnNwbGl0KCcnKS5qb2luKCcuJyk7XG4gICAgaWYgKHR5cGVvZiByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiB0eXBlIH0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgd2hlbiBwcm9iZWQgd2l0aCBhIHJhbmRvbSB0eXBlLiAnICsgKCdEb25cXCd0IHRyeSB0byBoYW5kbGUgJyArIF9jcmVhdGVTdG9yZS5BY3Rpb25UeXBlcy5JTklUICsgJyBvciBvdGhlciBhY3Rpb25zIGluIFwicmVkdXgvKlwiICcpICsgJ25hbWVzcGFjZS4gVGhleSBhcmUgY29uc2lkZXJlZCBwcml2YXRlLiBJbnN0ZWFkLCB5b3UgbXVzdCByZXR1cm4gdGhlICcgKyAnY3VycmVudCBzdGF0ZSBmb3IgYW55IHVua25vd24gYWN0aW9ucywgdW5sZXNzIGl0IGlzIHVuZGVmaW5lZCwgJyArICdpbiB3aGljaCBjYXNlIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZSwgcmVnYXJkbGVzcyBvZiB0aGUgJyArICdhY3Rpb24gdHlwZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5IG5vdCBiZSB1bmRlZmluZWQuJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBkaWZmZXJlbnQgcmVkdWNlciBmdW5jdGlvbnMsIGludG8gYSBzaW5nbGVcbiAqIHJlZHVjZXIgZnVuY3Rpb24uIEl0IHdpbGwgY2FsbCBldmVyeSBjaGlsZCByZWR1Y2VyLCBhbmQgZ2F0aGVyIHRoZWlyIHJlc3VsdHNcbiAqIGludG8gYSBzaW5nbGUgc3RhdGUgb2JqZWN0LCB3aG9zZSBrZXlzIGNvcnJlc3BvbmQgdG8gdGhlIGtleXMgb2YgdGhlIHBhc3NlZFxuICogcmVkdWNlciBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlZHVjZXJzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgY29ycmVzcG9uZCB0byBkaWZmZXJlbnRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zIHRoYXQgbmVlZCB0byBiZSBjb21iaW5lZCBpbnRvIG9uZS4gT25lIGhhbmR5IHdheSB0byBvYnRhaW5cbiAqIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzIHJlZHVjZXJzYCBzeW50YXguIFRoZSByZWR1Y2VycyBtYXkgbmV2ZXIgcmV0dXJuXG4gKiB1bmRlZmluZWQgZm9yIGFueSBhY3Rpb24uIEluc3RlYWQsIHRoZXkgc2hvdWxkIHJldHVybiB0aGVpciBpbml0aWFsIHN0YXRlXG4gKiBpZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZW0gd2FzIHVuZGVmaW5lZCwgYW5kIHRoZSBjdXJyZW50IHN0YXRlIGZvciBhbnlcbiAqIHVucmVjb2duaXplZCBhY3Rpb24uXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHJlZHVjZXIgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGV2ZXJ5IHJlZHVjZXIgaW5zaWRlIHRoZVxuICogcGFzc2VkIG9iamVjdCwgYW5kIGJ1aWxkcyBhIHN0YXRlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlLlxuICovXG5mdW5jdGlvbiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgZmluYWxSZWR1Y2VycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSgnTm8gcmVkdWNlciBwcm92aWRlZCBmb3Iga2V5IFwiJyArIGtleSArICdcIicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcbiAgICB9XG4gIH1cbiAgdmFyIGZpbmFsUmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhmaW5hbFJlZHVjZXJzKTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciB1bmV4cGVjdGVkS2V5Q2FjaGUgPSB7fTtcbiAgfVxuXG4gIHZhciBzYW5pdHlFcnJvcjtcbiAgdHJ5IHtcbiAgICBhc3NlcnRSZWR1Y2VyU2FuaXR5KGZpbmFsUmVkdWNlcnMpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc2FuaXR5RXJyb3IgPSBlO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbWJpbmF0aW9uKCkge1xuICAgIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuICAgIHZhciBhY3Rpb24gPSBhcmd1bWVudHNbMV07XG5cbiAgICBpZiAoc2FuaXR5RXJyb3IpIHtcbiAgICAgIHRocm93IHNhbml0eUVycm9yO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgd2FybmluZ01lc3NhZ2UgPSBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKHN0YXRlLCBmaW5hbFJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSk7XG4gICAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgICAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSh3YXJuaW5nTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGhhc0NoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgbmV4dFN0YXRlID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaW5hbFJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0gZmluYWxSZWR1Y2VyS2V5c1tpXTtcbiAgICAgIHZhciByZWR1Y2VyID0gZmluYWxSZWR1Y2Vyc1trZXldO1xuICAgICAgdmFyIHByZXZpb3VzU3RhdGVGb3JLZXkgPSBzdGF0ZVtrZXldO1xuICAgICAgdmFyIG5leHRTdGF0ZUZvcktleSA9IHJlZHVjZXIocHJldmlvdXNTdGF0ZUZvcktleSwgYWN0aW9uKTtcbiAgICAgIGlmICh0eXBlb2YgbmV4dFN0YXRlRm9yS2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2Uoa2V5LCBhY3Rpb24pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIG5leHRTdGF0ZVtrZXldID0gbmV4dFN0YXRlRm9yS2V5O1xuICAgICAgaGFzQ2hhbmdlZCA9IGhhc0NoYW5nZWQgfHwgbmV4dFN0YXRlRm9yS2V5ICE9PSBwcmV2aW91c1N0YXRlRm9yS2V5O1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2hhbmdlZCA/IG5leHRTdGF0ZSA6IHN0YXRlO1xuICB9O1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZHV4L2xpYi9jb21iaW5lUmVkdWNlcnMuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1snZGVmYXVsdCddID0gd2FybmluZztcbi8qKlxuICogUHJpbnRzIGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IGlmIHlvdSBlbmFibGVcbiAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuICB9IGNhdGNoIChlKSB7fVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVkdXgvbGliL3V0aWxzL3dhcm5pbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1snZGVmYXVsdCddID0gYmluZEFjdGlvbkNyZWF0b3JzO1xuZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goYWN0aW9uQ3JlYXRvci5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvbiBjcmVhdG9ycywgaW50byBhbiBvYmplY3Qgd2l0aCB0aGVcbiAqIHNhbWUga2V5cywgYnV0IHdpdGggZXZlcnkgZnVuY3Rpb24gd3JhcHBlZCBpbnRvIGEgYGRpc3BhdGNoYCBjYWxsIHNvIHRoZXlcbiAqIG1heSBiZSBpbnZva2VkIGRpcmVjdGx5LiBUaGlzIGlzIGp1c3QgYSBjb252ZW5pZW5jZSBtZXRob2QsIGFzIHlvdSBjYW4gY2FsbFxuICogYHN0b3JlLmRpc3BhdGNoKE15QWN0aW9uQ3JlYXRvcnMuZG9Tb21ldGhpbmcoKSlgIHlvdXJzZWxmIGp1c3QgZmluZS5cbiAqXG4gKiBGb3IgY29udmVuaWVuY2UsIHlvdSBjYW4gYWxzbyBwYXNzIGEgc2luZ2xlIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCxcbiAqIGFuZCBnZXQgYSBmdW5jdGlvbiBpbiByZXR1cm4uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9IGFjdGlvbkNyZWF0b3JzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvblxuICogY3JlYXRvciBmdW5jdGlvbnMuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzYFxuICogc3ludGF4LiBZb3UgbWF5IGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkaXNwYXRjaCBUaGUgYGRpc3BhdGNoYCBmdW5jdGlvbiBhdmFpbGFibGUgb24geW91ciBSZWR1eFxuICogc3RvcmUuXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufE9iamVjdH0gVGhlIG9iamVjdCBtaW1pY2tpbmcgdGhlIG9yaWdpbmFsIG9iamVjdCwgYnV0IHdpdGhcbiAqIGV2ZXJ5IGFjdGlvbiBjcmVhdG9yIHdyYXBwZWQgaW50byB0aGUgYGRpc3BhdGNoYCBjYWxsLiBJZiB5b3UgcGFzc2VkIGFcbiAqIGZ1bmN0aW9uIGFzIGBhY3Rpb25DcmVhdG9yc2AsIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBhbHNvIGJlIGEgc2luZ2xlXG4gKiBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCkge1xuICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCk7XG4gIH1cblxuICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzICE9PSAnb2JqZWN0JyB8fCBhY3Rpb25DcmVhdG9ycyA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYmluZEFjdGlvbkNyZWF0b3JzIGV4cGVjdGVkIGFuIG9iamVjdCBvciBhIGZ1bmN0aW9uLCBpbnN0ZWFkIHJlY2VpdmVkICcgKyAoYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgYWN0aW9uQ3JlYXRvcnMpICsgJy4gJyArICdEaWQgeW91IHdyaXRlIFwiaW1wb3J0IEFjdGlvbkNyZWF0b3JzIGZyb21cIiBpbnN0ZWFkIG9mIFwiaW1wb3J0ICogYXMgQWN0aW9uQ3JlYXRvcnMgZnJvbVwiPycpO1xuICB9XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhY3Rpb25DcmVhdG9ycyk7XG4gIHZhciBib3VuZEFjdGlvbkNyZWF0b3JzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIHZhciBhY3Rpb25DcmVhdG9yID0gYWN0aW9uQ3JlYXRvcnNba2V5XTtcbiAgICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGJvdW5kQWN0aW9uQ3JlYXRvcnNba2V5XSA9IGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvdW5kQWN0aW9uQ3JlYXRvcnM7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVkdXgvbGliL2JpbmRBY3Rpb25DcmVhdG9ycy5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGFwcGx5TWlkZGxld2FyZTtcblxudmFyIF9jb21wb3NlID0gcmVxdWlyZSgnLi9jb21wb3NlJyk7XG5cbnZhciBfY29tcG9zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb3NlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4vKipcbiAqIENyZWF0ZXMgYSBzdG9yZSBlbmhhbmNlciB0aGF0IGFwcGxpZXMgbWlkZGxld2FyZSB0byB0aGUgZGlzcGF0Y2ggbWV0aG9kXG4gKiBvZiB0aGUgUmVkdXggc3RvcmUuIFRoaXMgaXMgaGFuZHkgZm9yIGEgdmFyaWV0eSBvZiB0YXNrcywgc3VjaCBhcyBleHByZXNzaW5nXG4gKiBhc3luY2hyb25vdXMgYWN0aW9ucyBpbiBhIGNvbmNpc2UgbWFubmVyLCBvciBsb2dnaW5nIGV2ZXJ5IGFjdGlvbiBwYXlsb2FkLlxuICpcbiAqIFNlZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UgYXMgYW4gZXhhbXBsZSBvZiB0aGUgUmVkdXggbWlkZGxld2FyZS5cbiAqXG4gKiBCZWNhdXNlIG1pZGRsZXdhcmUgaXMgcG90ZW50aWFsbHkgYXN5bmNocm9ub3VzLCB0aGlzIHNob3VsZCBiZSB0aGUgZmlyc3RcbiAqIHN0b3JlIGVuaGFuY2VyIGluIHRoZSBjb21wb3NpdGlvbiBjaGFpbi5cbiAqXG4gKiBOb3RlIHRoYXQgZWFjaCBtaWRkbGV3YXJlIHdpbGwgYmUgZ2l2ZW4gdGhlIGBkaXNwYXRjaGAgYW5kIGBnZXRTdGF0ZWAgZnVuY3Rpb25zXG4gKiBhcyBuYW1lZCBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gbWlkZGxld2FyZXMgVGhlIG1pZGRsZXdhcmUgY2hhaW4gdG8gYmUgYXBwbGllZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBzdG9yZSBlbmhhbmNlciBhcHBseWluZyB0aGUgbWlkZGxld2FyZS5cbiAqL1xuZnVuY3Rpb24gYXBwbHlNaWRkbGV3YXJlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWlkZGxld2FyZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBtaWRkbGV3YXJlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoY3JlYXRlU3RvcmUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICAgICAgdmFyIHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKTtcbiAgICAgIHZhciBfZGlzcGF0Y2ggPSBzdG9yZS5kaXNwYXRjaDtcbiAgICAgIHZhciBjaGFpbiA9IFtdO1xuXG4gICAgICB2YXIgbWlkZGxld2FyZUFQSSA9IHtcbiAgICAgICAgZ2V0U3RhdGU6IHN0b3JlLmdldFN0YXRlLFxuICAgICAgICBkaXNwYXRjaDogZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIF9kaXNwYXRjaChhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY2hhaW4gPSBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgICAgICAgcmV0dXJuIG1pZGRsZXdhcmUobWlkZGxld2FyZUFQSSk7XG4gICAgICB9KTtcbiAgICAgIF9kaXNwYXRjaCA9IF9jb21wb3NlMlsnZGVmYXVsdCddLmFwcGx5KHVuZGVmaW5lZCwgY2hhaW4pKHN0b3JlLmRpc3BhdGNoKTtcblxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdG9yZSwge1xuICAgICAgICBkaXNwYXRjaDogX2Rpc3BhdGNoXG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZHV4L2xpYi9hcHBseU1pZGRsZXdhcmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGNvbXBvc2U7XG4vKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5cbmZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgdmFyIGxhc3QgPSBmdW5jc1tmdW5jcy5sZW5ndGggLSAxXTtcbiAgdmFyIHJlc3QgPSBmdW5jcy5zbGljZSgwLCAtMSk7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJlc3QucmVkdWNlUmlnaHQoZnVuY3Rpb24gKGNvbXBvc2VkLCBmKSB7XG4gICAgICByZXR1cm4gZihjb21wb3NlZCk7XG4gICAgfSwgbGFzdC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZHV4L2xpYi9jb21wb3NlLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xOF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJSZWFjdFJlZHV4XCJcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBzZXR0aW5ncywgdGVzdHMgfSBmcm9tICcuL3NldHRpbmdzJ1xuaW1wb3J0IHsgdmlld0ZpbHRlciB9IGZyb20gJy4vdmlldy1maWx0ZXInXG5pbXBvcnQgeyBsb2dMZXZlbCB9IGZyb20gJy4vbG9nLWxldmVsJ1xuXG5jb25zdCB0ZXN0YmVkQXBwID0gY29tYmluZVJlZHVjZXJzKHtcbiAgc2V0dGluZ3MsXG4gIHRlc3RzLFxuICB2aWV3RmlsdGVyLFxuICBsb2dMZXZlbFxufSlcblxuZXhwb3J0IGRlZmF1bHQgdGVzdGJlZEFwcFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9yZWR1Y2Vycy9pbmRleC5qc1xuICoqLyIsImltcG9ydCB7IFNFVFRJTkdTX1VQREFURSB9IGZyb20gJy4uL2FjdGlvbnMnXG5cbmV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IChzdGF0ZSA9IHt9LCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBTRVRUSU5HU19VUERBVEU6IHtcbiAgICAgIGxldCBzZXR0aW5nc1VwZGF0ZSA9IHN0YXRlXG4gICAgICBzZXR0aW5nc1VwZGF0ZVthY3Rpb24ua2V5XSA9IGFjdGlvbi52YWx1ZVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc2V0dGluZ3NVcGRhdGVcbiAgICAgIH1cbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0ZXN0cyA9IChzdGF0ZSA9IHt9LCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoKGFjdGlvbi50eXBlKSB7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3JlZHVjZXJzL3NldHRpbmdzLmpzXG4gKiovIiwiZXhwb3J0IGNvbnN0IFNFVFRJTkdTX1VQREFURSA9ICdTRVRUSU5HU19VUERBVEUnXG5leHBvcnQgY29uc3QgVklFV19DSEFOR0UgPSAnVklFV19DSEFOR0UnXG5leHBvcnQgY29uc3QgTE9HX0xFVkVMX0NIQU5HRSA9ICdMT0dfTEVWRUxfQ0hBTkdFJ1xuXG5leHBvcnQgY29uc3QgY2hhbmdlU2V0dGluZyA9IChrZXksIHZhbHVlKSA9PiAoe1xuICB0eXBlOiBTRVRUSU5HU19VUERBVEUsXG4gIGtleToga2V5LFxuICB2YWx1ZTogdmFsdWVcbn0pXG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VWaWV3ID0gKG5hbWUpID0+ICh7XG4gIHR5cGU6IFZJRVdfQ0hBTkdFLFxuICBmaWx0ZXI6IG5hbWVcbn0pXG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VMb2dMZXZlbCA9IChsZXZlbCkgPT4gKHtcbiAgdHlwZTogTE9HX0xFVkVMX0NIQU5HRSxcbiAgbGV2ZWw6IGxldmVsXG59KVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9hY3Rpb25zL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHsgVklFV19DSEFOR0UgfSBmcm9tICcuLi9hY3Rpb25zJ1xuXG5leHBvcnQgY29uc3Qgdmlld0ZpbHRlciA9IChzdGF0ZSA9ICdIb21lJywgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgVklFV19DSEFOR0U6XG4gICAgICByZXR1cm4gYWN0aW9uLmZpbHRlclxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9yZWR1Y2Vycy92aWV3LWZpbHRlci5qc1xuICoqLyIsImltcG9ydCB7IExPR19MRVZFTF9DSEFOR0UgfSBmcm9tICcuLi9hY3Rpb25zJ1xuXG5leHBvcnQgY29uc3QgbG9nTGV2ZWwgPSAoc3RhdGUgPSAnZGVidWcnLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgTE9HX0xFVkVMX0NIQU5HRTpcbiAgICAgIHJldHVybiBhY3Rpb24ubGV2ZWxcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3JlZHVjZXJzL2xvZy1sZXZlbC5qc1xuICoqLyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGdldEN1cnJlbnRQYWdlIH0gZnJvbSAnLi4vc2VsZWN0b3JzJ1xuaW1wb3J0IEFwcCBmcm9tICcuLi9jb21wb25lbnRzL0FwcCdcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgcGFnZTogZ2V0Q3VycmVudFBhZ2Uoc3RhdGUpLFxuICAgIHN0YXRlOiBzdGF0ZVxuICB9XG59XG5cbmNvbnN0IEFwcENvbnRhaW5lciA9IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wc1xuKShBcHApXG5cbmV4cG9ydCBkZWZhdWx0IEFwcENvbnRhaW5lclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29udGFpbmVycy9BcHBDb250YWluZXIuanNcbiAqKi8iLCJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0J1xuXG4vLyBCZWNhdXNlIHdlIGNhbm5vdCBkeW5hbWljYWxseSBpbXBvcnQgbW9kdWxlcyBmcm9tIHN0cmluZ3MsIHdlIG5lZWQgdG8sXG4vLyB1bmZvcnR1bmF0ZWx5LCBpbXBvcnQgdGhlbSBzcGVjaWZpY2FsbHkgaGVyZSBhbmQgZGVmaW5lIHRoZWlyIGFzc29jaWF0ZWRcbi8vIGZpbHRlciBjbGF1c2UuXG5cbmltcG9ydCBUZXN0TGlzdENvbnRhaW5lciBmcm9tICcuLi9jb250YWluZXJzL1Rlc3RMaXN0Q29udGFpbmVyJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgU2V0dGluZ3NGb3JtQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvU2V0dGluZ3NGb3JtQ29udGFpbmVyJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmltcG9ydCAqIGFzIHRlc3RzIGZyb20gJy4uL2NvbXBvbmVudHMvdGVzdCdcbmltcG9ydCBUZXN0Q29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvdGVzdC9UZXN0Q29udGFpbmVyJ1xuaW1wb3J0IFB1Ymxpc2hlclNldHRpbmdzT3ZlcnJpZGVDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVycy90ZXN0L1B1Ymxpc2hlclNldHRpbmdzT3ZlcnJpZGVDb250YWluZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBTdWJzY3JpYmVyU2V0dGluZ3NPdmVycmlkZUNvbnRhaW5lciBmcm9tICcuLi9jb250YWluZXJzL3Rlc3QvU3Vic2NyaWJlclNldHRpbmdzT3ZlcnJpZGVDb250YWluZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY29uc3QgZ2V0Vmlld0ZpbHRlciA9IChzdGF0ZSkgPT4gc3RhdGUudmlld0ZpbHRlclxuXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudFBhZ2UgPSBjcmVhdGVTZWxlY3RvcihcbiAgW2dldFZpZXdGaWx0ZXJdLFxuICAodmlld0ZpbHRlcikgPT4ge1xuICAgIHN3aXRjaCh2aWV3RmlsdGVyLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIGNhc2UgJ3B1Ymxpc2gnOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5QdWJsaXNoZXJUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIDEwODBwJzpcbiAgICAgICAgcmV0dXJuIFRlc3RDb250YWluZXIodGVzdHMuUHVibGlzaGVyMTA4MHBUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIGZhaWxvdmVyJzpcbiAgICAgICAgcmV0dXJuIFRlc3RDb250YWluZXIodGVzdHMuUHVibGlzaGVyRmFpbG92ZXJUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIGF1ZGlvIG1vZGUnOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5QdWJsaXNoZXJBdWRpb09ubHlUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIGNhbWVyYSBzb3VyY2UnOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5QdWJsaXNoZXJDYW1lcmFTb3VyY2VUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIGNhbWVyYSBzd2FwJzpcbiAgICAgICAgcmV0dXJuIFRlc3RDb250YWluZXIodGVzdHMuUHVibGlzaGVyQ2FtZXJhU3dhcFRlc3QpXG4gICAgICBjYXNlICdwdWJsaXNoIC0gZmlsdGVycyc6XG4gICAgICAgIHJldHVybiBUZXN0Q29udGFpbmVyKHRlc3RzLlB1Ymxpc2hlckZpbHRlcnNUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIGltYWdlIGNhcHR1cmUnOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5QdWJsaXNoZXJJbWFnZUNhcHR1cmVUZXN0KVxuICAgICAgY2FzZSAncHVibGlzaCAtIHN0cmVhbSBtYW5hZ2VyJzpcbiAgICAgICAgcmV0dXJuIFRlc3RDb250YWluZXIodGVzdHMuUHVibGlzaGVyU3RyZWFtTWFuYWdlclRlc3QpXG4gICAgICBjYXNlICdzdWJzY3JpYmUnOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5TdWJzY3JpYmVyVGVzdClcbiAgICAgIGNhc2UgJ3N1YnNjcmliZSAtIGZhaWxvdmVyJzpcbiAgICAgICAgcmV0dXJuIFRlc3RDb250YWluZXIodGVzdHMuU3Vic2NyaWJlckZhaWxvdmVyVGVzdClcbiAgICAgIGNhc2UgJ3N1YnNjcmliZSAtIGF1ZGlvIG9ubHknOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5TdWJzY3JpYmVyQXVkaW9Pbmx5VGVzdClcbiAgICAgIGNhc2UgJ3N1YnNjcmliZSAtIGltYWdlIGNhcHR1cmUnOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5TdWJzY3JpYmVySW1hZ2VDYXB0dXJlVGVzdClcbiAgICAgIGNhc2UgJ3N1YnNjcmliZSAtIGNsdXN0ZXInOlxuICAgICAgICByZXR1cm4gVGVzdENvbnRhaW5lcih0ZXN0cy5TdWJzY3JpYmVyQ2x1c3RlclRlc3QpXG4gICAgICBjYXNlICdzdWJzY3JpYmUgLSBzdHJlYW0gbWFuYWdlcic6XG4gICAgICAgIHJldHVybiBUZXN0Q29udGFpbmVyKHRlc3RzLlN1YnNjcmliZXJTdHJlYW1NYW5hZ2VyVGVzdClcbiAgICAgIGNhc2UgJ3NldHRpbmdzJzpcbiAgICAgIGNhc2UgJ2hvbWUnOlxuICAgICAgICByZXR1cm4gPFNldHRpbmdzRm9ybUNvbnRhaW5lciAvPlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIDxUZXN0TGlzdENvbnRhaW5lciAvPlxuICAgIH1cbiAgfVxuKVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9zZWxlY3RvcnMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmRlZmF1bHRNZW1vaXplID0gZGVmYXVsdE1lbW9pemU7XG5leHBvcnRzLmNyZWF0ZVNlbGVjdG9yQ3JlYXRvciA9IGNyZWF0ZVNlbGVjdG9yQ3JlYXRvcjtcbmV4cG9ydHMuY3JlYXRlU3RydWN0dXJlZFNlbGVjdG9yID0gY3JlYXRlU3RydWN0dXJlZFNlbGVjdG9yO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuZnVuY3Rpb24gZGVmYXVsdEVxdWFsaXR5Q2hlY2soYSwgYikge1xuICByZXR1cm4gYSA9PT0gYjtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdE1lbW9pemUoZnVuYykge1xuICB2YXIgZXF1YWxpdHlDaGVjayA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRFcXVhbGl0eUNoZWNrIDogYXJndW1lbnRzWzFdO1xuXG4gIHZhciBsYXN0QXJncyA9IG51bGw7XG4gIHZhciBsYXN0UmVzdWx0ID0gbnVsbDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBpZiAobGFzdEFyZ3MgPT09IG51bGwgfHwgbGFzdEFyZ3MubGVuZ3RoICE9PSBhcmdzLmxlbmd0aCB8fCAhYXJncy5ldmVyeShmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XG4gICAgICByZXR1cm4gZXF1YWxpdHlDaGVjayh2YWx1ZSwgbGFzdEFyZ3NbaW5kZXhdKTtcbiAgICB9KSkge1xuICAgICAgbGFzdFJlc3VsdCA9IGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBhcmdzO1xuICAgIHJldHVybiBsYXN0UmVzdWx0O1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXREZXBlbmRlbmNpZXMoZnVuY3MpIHtcbiAgdmFyIGRlcGVuZGVuY2llcyA9IEFycmF5LmlzQXJyYXkoZnVuY3NbMF0pID8gZnVuY3NbMF0gOiBmdW5jcztcblxuICBpZiAoIWRlcGVuZGVuY2llcy5ldmVyeShmdW5jdGlvbiAoZGVwKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBkZXAgPT09ICdmdW5jdGlvbic7XG4gIH0pKSB7XG4gICAgdmFyIGRlcGVuZGVuY3lUeXBlcyA9IGRlcGVuZGVuY2llcy5tYXAoZnVuY3Rpb24gKGRlcCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBkZXA7XG4gICAgfSkuam9pbignLCAnKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlbGVjdG9yIGNyZWF0b3JzIGV4cGVjdCBhbGwgaW5wdXQtc2VsZWN0b3JzIHRvIGJlIGZ1bmN0aW9ucywgJyArICgnaW5zdGVhZCByZWNlaXZlZCB0aGUgZm9sbG93aW5nIHR5cGVzOiBbJyArIGRlcGVuZGVuY3lUeXBlcyArICddJykpO1xuICB9XG5cbiAgcmV0dXJuIGRlcGVuZGVuY2llcztcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JDcmVhdG9yKG1lbW9pemUpIHtcbiAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBtZW1vaXplT3B0aW9ucyA9IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICBtZW1vaXplT3B0aW9uc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICBmdW5jc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgIH1cblxuICAgIHZhciByZWNvbXB1dGF0aW9ucyA9IDA7XG4gICAgdmFyIHJlc3VsdEZ1bmMgPSBmdW5jcy5wb3AoKTtcbiAgICB2YXIgZGVwZW5kZW5jaWVzID0gZ2V0RGVwZW5kZW5jaWVzKGZ1bmNzKTtcblxuICAgIHZhciBtZW1vaXplZFJlc3VsdEZ1bmMgPSBtZW1vaXplLmFwcGx5KHVuZGVmaW5lZCwgW2Z1bmN0aW9uICgpIHtcbiAgICAgIHJlY29tcHV0YXRpb25zKys7XG4gICAgICByZXR1cm4gcmVzdWx0RnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgfV0uY29uY2F0KG1lbW9pemVPcHRpb25zKSk7XG5cbiAgICB2YXIgc2VsZWN0b3IgPSBmdW5jdGlvbiBzZWxlY3RvcihzdGF0ZSwgcHJvcHMpIHtcbiAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW40ID4gMiA/IF9sZW40IC0gMiA6IDApLCBfa2V5NCA9IDI7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgICAgYXJnc1tfa2V5NCAtIDJdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgICAgIH1cblxuICAgICAgdmFyIHBhcmFtcyA9IGRlcGVuZGVuY2llcy5tYXAoZnVuY3Rpb24gKGRlcGVuZGVuY3kpIHtcbiAgICAgICAgcmV0dXJuIGRlcGVuZGVuY3kuYXBwbHkodW5kZWZpbmVkLCBbc3RhdGUsIHByb3BzXS5jb25jYXQoYXJncykpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWVtb2l6ZWRSZXN1bHRGdW5jLmFwcGx5KHVuZGVmaW5lZCwgX3RvQ29uc3VtYWJsZUFycmF5KHBhcmFtcykpO1xuICAgIH07XG5cbiAgICBzZWxlY3Rvci5yZXN1bHRGdW5jID0gcmVzdWx0RnVuYztcbiAgICBzZWxlY3Rvci5yZWNvbXB1dGF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZWNvbXB1dGF0aW9ucztcbiAgICB9O1xuICAgIHNlbGVjdG9yLnJlc2V0UmVjb21wdXRhdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVjb21wdXRhdGlvbnMgPSAwO1xuICAgIH07XG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9O1xufVxuXG52YXIgY3JlYXRlU2VsZWN0b3IgPSBleHBvcnRzLmNyZWF0ZVNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3JDcmVhdG9yKGRlZmF1bHRNZW1vaXplKTtcblxuZnVuY3Rpb24gY3JlYXRlU3RydWN0dXJlZFNlbGVjdG9yKHNlbGVjdG9ycykge1xuICB2YXIgc2VsZWN0b3JDcmVhdG9yID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gY3JlYXRlU2VsZWN0b3IgOiBhcmd1bWVudHNbMV07XG5cbiAgaWYgKHR5cGVvZiBzZWxlY3RvcnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjcmVhdGVTdHJ1Y3R1cmVkU2VsZWN0b3IgZXhwZWN0cyBmaXJzdCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QgJyArICgnd2hlcmUgZWFjaCBwcm9wZXJ0eSBpcyBhIHNlbGVjdG9yLCBpbnN0ZWFkIHJlY2VpdmVkIGEgJyArIHR5cGVvZiBzZWxlY3RvcnMpKTtcbiAgfVxuICB2YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzKHNlbGVjdG9ycyk7XG4gIHJldHVybiBzZWxlY3RvckNyZWF0b3Iob2JqZWN0S2V5cy5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBzZWxlY3RvcnNba2V5XTtcbiAgfSksIGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIHZhbHVlcyA9IEFycmF5KF9sZW41KSwgX2tleTUgPSAwOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgICB2YWx1ZXNbX2tleTVdID0gYXJndW1lbnRzW19rZXk1XTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzLnJlZHVjZShmdW5jdGlvbiAoY29tcG9zaXRpb24sIHZhbHVlLCBpbmRleCkge1xuICAgICAgY29tcG9zaXRpb25bb2JqZWN0S2V5c1tpbmRleF1dID0gdmFsdWU7XG4gICAgICByZXR1cm4gY29tcG9zaXRpb247XG4gICAgfSwge30pO1xuICB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZXNlbGVjdC9saWIvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgY2hhbmdlVmlldyB9IGZyb20gJy4uL2FjdGlvbnMnXG5pbXBvcnQgVGVzdExpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9UZXN0TGlzdCdcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdGVzdHM6IHN0YXRlLnRlc3RzXG4gIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgb25UZXN0TGlzdEl0ZW1DbGljazogKG5hbWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKGNoYW5nZVZpZXcobmFtZSkpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IFRlc3RMaXN0Q29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHNcbikoVGVzdExpc3QpXG5cbmV4cG9ydCBkZWZhdWx0IFRlc3RMaXN0Q29udGFpbmVyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb250YWluZXJzL1Rlc3RMaXN0Q29udGFpbmVyLmpzXG4gKiovIiwiaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgVGVzdExpc3RJdGVtIGZyb20gJy4vVGVzdExpc3RJdGVtJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNvbnN0IFRlc3RMaXN0ID0gKHsgdGVzdHMsIG9uVGVzdExpc3RJdGVtQ2xpY2sgfSkgPT4gKFxuICA8dWwgaWQ9XCJ0ZXN0LWxpc3RcIj5cbiAgICB7dGVzdHMubWFwKHRlc3QgPT5cbiAgICAgIDxUZXN0TGlzdEl0ZW1cbiAgICAgICAga2V5PXt0ZXN0Lm5hbWV9XG4gICAgICAgIHsuLi50ZXN0fVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblRlc3RMaXN0SXRlbUNsaWNrKHRlc3QubmFtZSl9XG4gICAgICAvPlxuICAgICl9XG4gIDwvdWw+XG4pXG5cblRlc3RMaXN0LnByb3BUeXBlcyA9IHtcbiAgdGVzdHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIG1vZHVsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nXG4gIH0pLmlzUmVxdWlyZWQpLmlzUmVxdWlyZWQsXG4gIG9uVGVzdExpc3RJdGVtQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVzdExpc3RcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvVGVzdExpc3QuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMjlfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiUmVhY3RcIlxuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcblxuY29uc3QgVGVzdExpc3RJdGVtID0gKHsgb25DbGljaywgbmFtZSB9KSA9PiAoXG4gIDxsaSBvbkNsaWNrPXtvbkNsaWNrfT57bmFtZX08L2xpPlxuKVxuXG5UZXN0TGlzdEl0ZW0ucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVzdExpc3RJdGVtXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL1Rlc3RMaXN0SXRlbS5qc1xuICoqLyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGNoYW5nZVZpZXcsIGNoYW5nZVNldHRpbmcsIGNoYW5nZUxvZ0xldmVsIH0gZnJvbSAnLi4vYWN0aW9ucydcbmltcG9ydCBTZXR0aW5nc0Zvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9TZXR0aW5nc0Zvcm0nXG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHNldHRpbmdzOiBzdGF0ZS5zZXR0aW5ncyxcbiAgICBsb2dMZXZlbDogc3RhdGUubG9nTGV2ZWxcbiAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkJhY2tDbGljazogKCkgPT4ge1xuICAgICAgZGlzcGF0Y2goY2hhbmdlVmlldygnbGlzdCcpKVxuICAgIH0sXG4gICAgb25GaWVsZENoYW5nZTogKGtleSwgdmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKGNoYW5nZVNldHRpbmcoa2V5LCB2YWx1ZSkpXG4gICAgfSxcbiAgICBvbkxvZ0xldmVsQ2hhbmdlOiAobGV2ZWwpID0+IHtcbiAgICAgIGRpc3BhdGNoKGNoYW5nZUxvZ0xldmVsKGxldmVsKSlcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgU2V0dGluZ3NGb3JtQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHNcbikoU2V0dGluZ3NGb3JtKVxuXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nc0Zvcm1Db250YWluZXJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbnRhaW5lcnMvU2V0dGluZ3NGb3JtQ29udGFpbmVyLmpzXG4gKiovIiwiLyogZ2xvYmFsIHJlZDVwcm9zZGsgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuLy8gaW1wb3J0IHJlZDVwcm9zZGsgZnJvbSAncmVkNXByby1zZGsnXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi9CYWNrTGluaycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jbGFzcyBTZXR0aW5nc0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMucHJvcHMuc2V0dGluZ3NcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzZXR0aW5ncykge1xuICAgICAgY29uc3QgX3JlZiA9IHRoaXNbJ18nICsga2V5XVxuICAgICAgaWYgKF9yZWYgJiYgc2V0dGluZ3Nba2V5XSAhPT0gX3JlZi52YWx1ZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uRmllbGRDaGFuZ2Uoa2V5LCBfcmVmLnZhbHVlKVxuICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3dhcFN0cmVhbU5hbWVzICgpIHtcbiAgICBjb25zdCB2YWx1ZTEgPSB0aGlzLl9zdHJlYW0xLnZhbHVlXG4gICAgY29uc3QgdmFsdWUyID0gdGhpcy5fc3RyZWFtMi52YWx1ZVxuICAgIHRoaXMuX3N0cmVhbTEudmFsdWUgPSB2YWx1ZTJcbiAgICB0aGlzLl9zdHJlYW0yLnZhbHVlID0gdmFsdWUxXG4gIH1cblxuICBjaGFuZ2VMb2dMZXZlbCAoKSB7XG4gICAgY29uc3QgY2hlY2sgPSB0aGlzLl92ZXJib3NlTG9nZ2luZ1xuICAgIGNvbnN0IGlzVmVyYm9zZSA9IGNoZWNrLmNoZWNrZWRcbiAgICB0aGlzLnByb3BzLm9uTG9nTGV2ZWxDaGFuZ2UoaXNWZXJib3NlID8gJ2RlYnVnJyA6ICd3YXJuJylcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgY2hlY2tTdHlsZSA9IHtcbiAgICAgICd2ZXJ0aWNhbC1hbGlnbic6ICdtaWRkbGUnXG4gICAgfVxuICAgIGNvbnN0IGlzTG9nVmVyYm9zZSA9IHRoaXMucHJvcHMubG9nTGV2ZWwgPT09ICdkZWJ1ZydcbiAgICByZWQ1cHJvc2RrLnNldExvZ0xldmVsKHRoaXMucHJvcHMubG9nTGV2ZWwpXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5TZXR0aW5nczwvaDE+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInNldHRpbmdzLWZpZWxkXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInNldHRpbmdzLWxhYmVsXCIgZm9yPVwiaG9zdC1maWVsZFwiPkhvc3Q6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgcmVmPXsoYykgPT4gdGhpcy5faG9zdCA9IGN9IG5hbWU9XCJob3N0LWZpZWxkXCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLnNldHRpbmdzLmhvc3R9PjwvaW5wdXQ+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwic2V0dGluZ3MtZmllbGRcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic2V0dGluZ3MtbGFiZWxcIiBmb3I9XCJzdHJlYW0xLWZpZWxkXCI+U3RyZWFtMSBOYW1lOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHJlZj17KGMpID0+IHRoaXMuX3N0cmVhbTEgPSBjfSBuYW1lPVwic3RyZWFtMS1maWVsZFwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfT48L2lucHV0PlxuICAgICAgICA8L3A+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInNldHRpbmdzLWZpZWxkIHN3YXAtc3RyZWFtcy1saW5rXCI+XG4gICAgICAgICAgPHNwYW4gb25DbGljaz17dGhpcy5zd2FwU3RyZWFtTmFtZXMuYmluZCh0aGlzKX0+U3dhcCBTdHJlYW0gTmFtZXM8L3NwYW4+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwic2V0dGluZ3MtZmllbGRcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic2V0dGluZ3MtbGFiZWxcIiBmb3I9XCJzdHJlYW0yLWZpZWxkXCI+U3RyZWFtMiBOYW1lOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHJlZj17KGMpID0+IHRoaXMuX3N0cmVhbTIgPSBjfSBuYW1lPVwic3RyZWFtMi1maWVsZFwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0yfT48L2lucHV0PlxuICAgICAgICA8L3A+XG4gICAgICAgIDxoci8+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInNldHRpbmdzLWZpZWxkXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInNldHRpbmdzLWxhYmVsXCIgZm9yPVwibG9nZ2luZy1maWVsZFwiPlZlcmJvc2UgUjUgTG9nZ2luZzo8L2xhYmVsPlxuICAgICAgICAgIHtpc0xvZ1ZlcmJvc2VcbiAgICAgICAgICAgID8gKFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgIHJlZj17KGMpID0+IHRoaXMuX3ZlcmJvc2VMb2dnaW5nID0gY31cbiAgICAgICAgICAgICAgbmFtZT1cImxvZ2dpbmctZmllbGRcIlxuICAgICAgICAgICAgICB2YWx1ZT1cIm9uXCIgc3R5bGU9e2NoZWNrU3R5bGV9XG4gICAgICAgICAgICAgIGNoZWNrZWRcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jaGFuZ2VMb2dMZXZlbC5iaW5kKHRoaXMpfT48L2lucHV0PlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiAoXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgcmVmPXsoYykgPT4gdGhpcy5fdmVyYm9zZUxvZ2dpbmcgPSBjfVxuICAgICAgICAgICAgICBuYW1lPVwibG9nZ2luZy1maWVsZFwiXG4gICAgICAgICAgICAgIHZhbHVlPVwib2ZmXCIgc3R5bGU9e2NoZWNrU3R5bGV9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2hhbmdlTG9nTGV2ZWwuYmluZCh0aGlzKX0+PC9pbnB1dD5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblNldHRpbmdzRm9ybS5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIGxvZ0xldmVsOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uRmllbGRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkxvZ0xldmVsQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNldHRpbmdzRm9ybVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy9TZXR0aW5nc0Zvcm0uanNcbiAqKi8iLCJpbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcblxuY29uc3QgQmFja0xpbmsgPSAoeyBvbkNsaWNrIH0pID0+IChcbiAgPGRpdiBpZD1cImJhY2stbGluay1jb250YWluZXJcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8YSBpZD1cImJhY2stbGlua1wiPlJldHVybiB0byBNZW51PC9hPlxuICA8L2Rpdj5cbilcblxuQmFja0xpbmsucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tMaW5rXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvQmFja0xpbmsuanNcbiAqKi8iLCJleHBvcnQgeyBkZWZhdWx0IGFzIFB1Ymxpc2hlclRlc3QgfSBmcm9tICcuL3B1Ymxpc2gvUHVibGlzaGVyVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUHVibGlzaGVyMTA4MHBUZXN0IH0gZnJvbSAnLi9wdWJsaXNoL1B1Ymxpc2hlcjEwODBwVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUHVibGlzaGVyQXVkaW9Pbmx5VGVzdCB9IGZyb20gJy4vcHVibGlzaC9QdWJsaXNoZXJBdWRpb09ubHlUZXN0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQdWJsaXNoZXJDYW1lcmFTb3VyY2VUZXN0IH0gZnJvbSAnLi9wdWJsaXNoL1B1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3QnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFB1Ymxpc2hlckNhbWVyYVN3YXBUZXN0IH0gZnJvbSAnLi9wdWJsaXNoL1B1Ymxpc2hlckNhbWVyYVN3YXBUZXN0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQdWJsaXNoZXJGaWx0ZXJzVGVzdCB9IGZyb20gJy4vcHVibGlzaC9QdWJsaXNoZXJGaWx0ZXJzVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUHVibGlzaGVyRmFpbG92ZXJUZXN0IH0gZnJvbSAnLi9wdWJsaXNoL1B1Ymxpc2hlckZhaWxvdmVyVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUHVibGlzaGVySW1hZ2VDYXB0dXJlVGVzdCB9IGZyb20gJy4vcHVibGlzaC9QdWJsaXNoZXJJbWFnZUNhcHR1cmVUZXN0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQdWJsaXNoZXJTdHJlYW1NYW5hZ2VyVGVzdCB9IGZyb20gJy4vcHVibGlzaC9QdWJsaXNoZXJTdHJlYW1NYW5hZ2VyVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3Vic2NyaWJlclRlc3QgfSBmcm9tICcuL3N1YnNjcmliZS9TdWJzY3JpYmVyVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3Vic2NyaWJlckZhaWxvdmVyVGVzdCB9IGZyb20gJy4vc3Vic2NyaWJlL1N1YnNjcmliZXJGYWlsb3ZlclRlc3QnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFN1YnNjcmliZXJBdWRpb09ubHlUZXN0IH0gZnJvbSAnLi9zdWJzY3JpYmUvU3Vic2NyaWJlckF1ZGlvT25seVRlc3QnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFN1YnNjcmliZXJJbWFnZUNhcHR1cmVUZXN0IH0gZnJvbSAnLi9zdWJzY3JpYmUvU3Vic2NyaWJlckltYWdlQ2FwdHVyZVRlc3QnXG5leHBvcnQgeyBkZWZhdWx0IGFzIFN1YnNjcmliZXJDbHVzdGVyVGVzdCB9IGZyb20gJy4vc3Vic2NyaWJlL1N1YnNjcmliZXJDbHVzdGVyVGVzdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3Vic2NyaWJlclN0cmVhbU1hbmFnZXJUZXN0IH0gZnJvbSAnLi9zdWJzY3JpYmUvU3Vic2NyaWJlclN0cmVhbU1hbmFnZXJUZXN0J1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWQ1UHJvUHVibGlzaGVyIGZyb20gJy4uLy4uL1JlZDVQcm9QdWJsaXNoZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBQdWJsaXNoZXJTdGF0dXMgZnJvbSAnLi4vUHVibGlzaGVyU3RhdHVzJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi4vLi4vQmFja0xpbmsnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY2xhc3MgUHVibGlzaGVyVGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgX3dhdGNoU3RhdHNJbnRlcnZhbFxuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0dXNFdmVudDogdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgd2F0Y2hTdGF0cyAoY29ubmVjdGlvbikge1xuICAgIHRoaXMuX3dhdGNoU3RhdHNJbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbm5lY3Rpb24uZ2V0U3RhdHMobnVsbCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHJlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzW2tleV0sIG51bGwsIDIpKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9LCAxMDAwKVxuICB9XG5cbiAgdW53YXRjaFN0YXRzICgpIHtcbiAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLl93YXRjaFN0YXRzSW50ZXJ2YWwpXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG4gICAgdGhpcy51bndhdGNoU3RhdHMoKVxuICB9XG5cbiAgaGFuZGxlUHVibGlzaGVyRXZlbnQgKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXNFdmVudCA9IGV2ZW50XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgcHVibGlzaGVyRXN0YWJsaXNoZWQgKHB1Ymxpc2hlciwgcHVibGlzaGVyVmlldykge1xuICAgIGNvbnNvbGUubG9nKGBbUHVibGlzaGVyVGVzdF0gcHVibGlzaGVyOiAke3B1Ymxpc2hlcn0sICR7cHVibGlzaGVyVmlld31gKVxuICAgIC8vICAgIHRoaXMud2F0Y2hTdGF0cyhwdWJsaXNoZXIuZ2V0Q29ubmVjdGlvbigpKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlB1Ymxpc2hlciBUZXN0PC9oMT5cbiAgICAgICAgPGhyIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPjxlbT5zdHJlYW08L2VtPjoge3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX08L2gyPlxuICAgICAgICA8UHVibGlzaGVyU3RhdHVzIGV2ZW50PXt0aGlzLnN0YXRlLnN0YXR1c0V2ZW50fSAvPlxuICAgICAgICA8UmVkNVByb1B1Ymxpc2hlclxuICAgICAgICAgIGNsYXNzTmFtZT1cImNlbnRlcmVkXCJcbiAgICAgICAgICBtZWRpYUNsYXNzTmFtZT1cInZpZGVvLWVsZW1lbnRcIlxuICAgICAgICAgIGNvbmZpZ3VyYXRpb249e3RoaXMucHJvcHMuc2V0dGluZ3N9XG4gICAgICAgICAgc3RyZWFtTmFtZT17dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfVxuICAgICAgICAgIHNob3dDb250cm9scz17dHJ1ZX1cbiAgICAgICAgICBvblB1Ymxpc2hlckVzdGFibGlzaGVkPXt0aGlzLnB1Ymxpc2hlckVzdGFibGlzaGVkLmJpbmQodGhpcyl9XG4gICAgICAgICAgb25QdWJsaXNoZXJFdmVudD17dGhpcy5oYW5kbGVQdWJsaXNoZXJFdmVudC5iaW5kKHRoaXMpfVxuICAgICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5QdWJsaXNoZXJUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVyVGVzdFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvcHVibGlzaC9QdWJsaXNoZXJUZXN0LmpzXG4gKiovIiwiLyogZ2xvYmFsIHJlZDVwcm9zZGsgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbi8vIGltcG9ydCByZWQ1cHJvc2RrIGZyb20gJ3JlZDVwcm8tc2RrJ1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgaXNFcXVhbCBmcm9tICdsb2Rhc2gvaXNFcXVhbCdcblxuY29uc3QgZGVmYXVsdENvbmZpZ3VyYXRpb24gPSB7XG4gIHByb3RvY29sOiAnd3MnLFxuICBwb3J0OiA4MDgxLFxuICBhcHA6ICdsaXZlJyxcbiAgc3RyZWFtVHlwZTogJ3dlYnJ0YycsXG4gIGF1ZGlvT246IHRydWUsXG4gIHZpZGVvT246IHRydWVcbn1cblxuY2xhc3MgUmVkNVByb1B1Ymxpc2hlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpZXc6IHVuZGVmaW5lZCxcbiAgICAgIHB1Ymxpc2hlcjogdW5kZWZpbmVkLFxuICAgICAgaW5zdGFuY2VJZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMCkudG9TdHJpbmcoMTYpXG4gICAgfVxuICB9XG5cbiAgb25QdWJsaXNoRmFpbCAobWVzc2FnZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoYFtSZWQ1UHJvUHVibGlzaGVyXSA6OiAke21lc3NhZ2V9YClcbiAgfVxuXG4gIG9uUHVibGlzaFN1Y2Nlc3MgKCkge1xuICB9XG5cbiAgb25VbnB1Ymxpc2hGYWlsIChtZXNzYWdlKSB7XG4gICAgY29uc29sZS5lcnJvcihgW1JlZDVQcm9QdWJsaXNoZXJdIDo6ICR7bWVzc2FnZX1gKVxuICB9XG5cbiAgb25VbnB1Ymxpc2hTdWNjZXNzICgpIHtcbiAgfVxuXG4gIGdldFVzZXJNZWRpYUNvbmZpZ3VyYXRpb24gKCkge1xuICAgIGNvbnN0IGRlZmF1bHRNZWRpYSA9IHtcbiAgICAgIGF1ZGlvOiAhdGhpcy5wcm9wcy5jb25maWd1cmF0aW9uLmF1ZGlvIHx8IGRlZmF1bHRDb25maWd1cmF0aW9uLmF1ZGlvT24sXG4gICAgICB2aWRlbzogIXRoaXMucHJvcHMuY29uZmlndXJhdGlvbi52aWRlbyB8fCBkZWZhdWx0Q29uZmlndXJhdGlvbi52aWRlb09uXG4gICAgfVxuICAgIGNvbnN0IGRlZmluZWRNZWRpYSA9IHRoaXMucHJvcHMudXNlck1lZGlhIHx8IHt9XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZGVmYXVsdE1lZGlhLCBkZWZpbmVkTWVkaWEpXG4gIH1cblxuICBub3RpZnlQdWJsaXNoZXJFc3RhYmxpc2hlZCAocHVibGlzaGVyLCB2aWV3KSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25QdWJsaXNoZXJFc3RhYmxpc2hlZCkge1xuICAgICAgdGhpcy5wcm9wcy5vblB1Ymxpc2hlckVzdGFibGlzaGVkKHB1Ymxpc2hlciwgdmlldylcbiAgICB9XG4gIH1cblxuICBwcmV2aWV3ICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIGNvbnN0IGdVTSA9IHRoaXMuZ2V0VXNlck1lZGlhQ29uZmlndXJhdGlvbi5iaW5kKHRoaXMpXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRJZCA9IFsncmVkNXByby1wdWJsaXNoZXItdmlkZW8nLCB0aGlzLnN0YXRlLmluc3RhbmNlSWRdLmpvaW4oJy0nKVxuICAgICAgY29uc3QgcHVibGlzaGVyID0gbmV3IHJlZDVwcm9zZGsuUlRDUHVibGlzaGVyKClcbiAgICAgIGNvbnN0IHZpZXcgPSBuZXcgcmVkNXByb3Nkay5QdWJsaXNoZXJWaWV3KGVsZW1lbnRJZClcbiAgICAgIGNvbnN0IGdtZCA9IG5hdmlnYXRvci5tZWRpYURldmljZSB8fCBuYXZpZ2F0b3JcblxuICAgICAgaWYgKHRoaXMucHJvcHMub25QdWJsaXNoZXJFdmVudCkge1xuICAgICAgICBwdWJsaXNoZXIub24oJyonLCB0aGlzLnByb3BzLm9uUHVibGlzaGVyRXZlbnQpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcHVibGlzaGVyLm9uKCcqJywgZXZlbnQgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBbUmVkNVByb1B1Ymxpc2hlcl0gOjogUHVibGlzaGVyRXZlbnQgLSAke2V2ZW50LnR5cGV9YClcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coJ1tSZWQ1UHJvUHVibGlzaGVyXSBnVU06OiAnICsgSlNPTi5zdHJpbmdpZnkoZ1VNKCksIG51bGwsIDIpKVxuICAgICAgZ21kLmdldFVzZXJNZWRpYShnVU0oKSwgbWVkaWEgPT4ge1xuXG4gICAgICAgIC8vIFVwb24gYWNjZXNzIG9mIHVzZXIgbWVkaWEsXG4gICAgICAgIC8vIDEuIEF0dGFjaCB0aGUgc3RyZWFtIHRvIHRoZSBwdWJsaXNoZXIuXG4gICAgICAgIC8vIDIuIFNob3cgdGhlIHN0cmVhbSBhcyBwcmV2aWV3IGluIHZpZXcgaW5zdGFuY2UuXG4gICAgICAgIHB1Ymxpc2hlci5hdHRhY2hTdHJlYW0obWVkaWEpXG4gICAgICAgIHZpZXcucHJldmlldyhtZWRpYSwgdHJ1ZSlcblxuICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICBzdGF0ZS5wdWJsaXNoZXIgPSBwdWJsaXNoZXJcbiAgICAgICAgICBzdGF0ZS52aWV3ID0gdmlld1xuICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICB9KVxuICAgICAgICByZXNvbHZlKHB1Ymxpc2hlciwgdmlldylcblxuICAgICAgfSwgZXJyb3IgPT4ge1xuXG4gICAgICAgIGNvbXAub25QdWJsaXNoRmFpbChgRXJyb3IgLSAke2Vycm9yfWApXG4gICAgICAgIHJlamVjdChlcnJvcilcblxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGlzaCAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICBjb25zdCBwdWJsaXNoZXIgPSB0aGlzLnN0YXRlLnB1Ymxpc2hlclxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLnN0YXRlLnZpZXdcbiAgICB2aWV3LmF0dGFjaFB1Ymxpc2hlcihwdWJsaXNoZXIpO1xuXG4gICAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENvbmZpZ3VyYXRpb24sIHRoaXMucHJvcHMuY29uZmlndXJhdGlvbilcbiAgICBjb25maWcucG9ydCA9IGNvbmZpZy5ydGNwb3J0IHx8IGNvbmZpZy5wb3J0XG4gICAgY29uZmlnLmhvc3QgPSB0aGlzLnByb3BzLmhvc3QgfHwgY29uZmlnLmhvc3RcbiAgICBjb25maWcuc3RyZWFtTmFtZSA9IHRoaXMucHJvcHMuc3RyZWFtTmFtZSB8fCBjb25maWcuc3RyZWFtTmFtZVxuXG4gICAgY29uc29sZS5sb2coJ1tSZWQ1UHJvUHVibGlzaGVyXSBjb25maWc6OiAnICsgSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKSlcblxuICAgIC8vIEluaXRpYWxpemVcbiAgICBwdWJsaXNoZXIuaW5pdChjb25maWcpXG4gICAgICAudGhlbigocHViKSA9PiB7XG4gICAgICAgIC8vIEludm9rZSB0aGUgcHVibGlzaCBhY3Rpb25cbiAgICAgICAgY29tcC5ub3RpZnlQdWJsaXNoZXJFc3RhYmxpc2hlZChwdWIsIHZpZXcpXG4gICAgICAgIHJldHVybiBwdWJsaXNoZXIucHVibGlzaCgpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb21wLm9uUHVibGlzaFN1Y2Nlc3MoKVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIC8vIEEgZmF1bHQgb2NjdXJyZWQgd2hpbGUgdHJ5aW5nIHRvIGluaXRpYWxpemUgYW5kIHB1Ymxpc2ggdGhlIHN0cmVhbS5cbiAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgIGNvbXAub25QdWJsaXNoRmFpbChgRXJyb3IgLSAke2pzb25FcnJvcn1gKVxuICAgICAgfSlcblxuICB9XG5cbiAgdW5wdWJsaXNoICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB2aWV3ID0gY29tcC5zdGF0ZS52aWV3XG4gICAgICBjb25zdCBwdWJsaXNoZXIgPSBjb21wLnN0YXRlLnB1Ymxpc2hlclxuICAgICAgaWYgKHB1Ymxpc2hlcikge1xuICAgICAgICBwdWJsaXNoZXIudW5wdWJsaXNoKClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIHZpZXcudmlldy5zcmMgPSAnJ1xuICAgICAgICAgICAgcHVibGlzaGVyLnNldFZpZXcodW5kZWZpbmVkKVxuICAgICAgICAgICAgcHVibGlzaGVyLm9mZignKicsIGNvbXAucHJvcHMub25QdWJsaXNoZXJFdmVudClcbiAgICAgICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgICAgICBzdGF0ZS5wdWJsaXNoZXIgPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgc3RhdGUudmlldyA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb21wLm9uVW5wdWJsaXNoU3VjY2VzcygpXG4gICAgICAgICAgICBjb21wLm5vdGlmeVB1Ymxpc2hlckVzdGFibGlzaGVkKHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmVzb2x2ZSgpXG5cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICAgICAgY29tcC5vblVucHVibGlzaEZhaWxlZChgVW5tb3VudCBFcnJvciA9ICR7anNvbkVycm9yfWApXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpXG5cbiAgICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG5cbiAgICAgICAgY29tcC5vblVucHVibGlzaFN1Y2Nlc3MoKVxuICAgICAgICByZXNvbHZlKClcblxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB0cnlQdWJsaXNoIChhdXRvKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICBjb25zdCBwdWIgPSB0aGlzLnB1Ymxpc2guYmluZCh0aGlzKVxuICAgIGlmIChhdXRvKSB7XG4gICAgICB0aGlzLnByZXZpZXcoKVxuICAgICAgICAudGhlbihwdWIpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICBjb21wLm9uUHVibGlzaEZhaWwoJ0Vycm9yIC0gQ291bGQgbm90IHN0YXJ0IHB1Ymxpc2hpbmcgc2Vzc2lvbi4nKVxuICAgICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnRyeVB1Ymxpc2godGhpcy5wcm9wcy5hdXRvUHVibGlzaClcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICBjb25zdCBwdWJsaXNoZXIgPSB0aGlzLnN0YXRlLnB1Ymxpc2hlclxuICAgIHRoaXMudW5wdWJsaXNoKClcbiAgICBpZiAocHVibGlzaGVyICYmIHRoaXMucHJvcHMub25QdWJsaXNoZXJFdmVudCkge1xuICAgICAgcHVibGlzaGVyLm9mZignKicsIHRoaXMucHJvcHMub25QdWJsaXNoZXJFdmVudClcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUgKHByZXZQcm9wcykge1xuICAgIGNvbnN0IHAgPSB0aGlzLnByb3BzXG4gICAgY29uc3QgcFVNID0gcC51c2VyTWVkaWFcbiAgICBjb25zdCBwcmV2VU0gPSBwcmV2UHJvcHMudXNlck1lZGlhXG4gICAgaWYgKCFpc0VxdWFsKHByZXZVTSwgcFVNKSkge1xuICAgICAgY29uc3QgcHViID0gdGhpcy50cnlQdWJsaXNoLmJpbmQodGhpcylcbiAgICAgIGNvbnN0IGF1dG8gPSB0aGlzLnByb3BzLmF1dG9QdWJsaXNoXG4gICAgICB0aGlzLnVucHVibGlzaCgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBwdWIoYXV0bylcbiAgICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBnZXRQdWJsaXNoZXJFbGVtZW50ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVkNVByb1B1Ymxpc2hlclxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBlbGVtZW50SWQgPSBbJ3JlZDVwcm8tcHVibGlzaGVyLXZpZGVvJywgdGhpcy5zdGF0ZS5pbnN0YW5jZUlkXS5qb2luKCctJylcbiAgICBsZXQgY2xhc3NOYW1lcyA9IFsncmVkNXByby1wdWJsaXNoZXItdmlkZW8tY29udGFpbmVyJ11cbiAgICBpZiAodGhpcy5wcm9wcy5jbGFzc05hbWUpIHtcbiAgICAgIGNsYXNzTmFtZXMgPSBjbGFzc05hbWVzLmNvbmNhdCh0aGlzLnByb3BzLmNsYXNzTmFtZSlcbiAgICB9XG4gICAgbGV0IG1lZGlhQ2xhc3NOYW1lcyA9IFtdXG4gICAgaWYgKHRoaXMucHJvcHMubWVkaWFDbGFzc05hbWUpIHtcbiAgICAgIG1lZGlhQ2xhc3NOYW1lcyA9IG1lZGlhQ2xhc3NOYW1lcy5jb25jYXQodGhpcy5wcm9wcy5tZWRpYUNsYXNzTmFtZSlcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPXtjID0+IHRoaXMuX3ZpZGVvQ29udGFpbmVyID0gY31cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5qb2luKCcgJyl9PlxuICAgICAgICA8dmlkZW8gcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9QdWJsaXNoZXIgPSBjfVxuICAgICAgICAgIGlkPXtlbGVtZW50SWR9XG4gICAgICAgICAgY29udHJvbHM9e3RoaXMucHJvcHMuc2hvd0NvbnRyb2xzfVxuICAgICAgICAgIGNsYXNzTmFtZT17bWVkaWFDbGFzc05hbWVzLmpvaW4oJyAnKX0+XG4gICAgICAgIDwvdmlkZW8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5SZWQ1UHJvUHVibGlzaGVyLnByb3BUeXBlcyA9IHtcbiAgYXV0b1B1Ymxpc2g6IFByb3BUeXBlcy5ib29sZWFuLFxuICBzaG93Q29udHJvbHM6IFByb3BUeXBlcy5ib29sZWFuLFxuICBob3N0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICB1c2VyTWVkaWE6IFByb3BUeXBlcy5vYmplY3QsXG4gIHN0cmVhbU5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgY29uZmlndXJhdGlvbjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvblB1Ymxpc2hlckVzdGFibGlzaGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25QdWJsaXNoZXJFdmVudDogUHJvcFR5cGVzLmZ1bmNcbn1cblxuUmVkNVByb1B1Ymxpc2hlci5kZWZhdWx0UHJvcHMgPSB7XG4gIGF1dG9QdWJsaXNoOiB0cnVlLFxuICBzaG93Q29udHJvbHM6IHRydWUsXG4gIGhvc3Q6IHVuZGVmaW5lZCxcbiAgdXNlck1lZGlhOiB1bmRlZmluZWQsXG4gIHN0cmVhbU5hbWU6IHVuZGVmaW5lZCxcbiAgY29uZmlndXJhdGlvbjogZGVmYXVsdENvbmZpZ3VyYXRpb25cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVkNVByb1B1Ymxpc2hlclxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL1JlZDVQcm9QdWJsaXNoZXIuanNcbiAqKi8iLCJ2YXIgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCcuL19iYXNlSXNFcXVhbCcpO1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgZGVlcCBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmVcbiAqIGVxdWl2YWxlbnQuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIHN1cHBvcnRzIGNvbXBhcmluZyBhcnJheXMsIGFycmF5IGJ1ZmZlcnMsIGJvb2xlYW5zLFxuICogZGF0ZSBvYmplY3RzLCBlcnJvciBvYmplY3RzLCBtYXBzLCBudW1iZXJzLCBgT2JqZWN0YCBvYmplY3RzLCByZWdleGVzLFxuICogc2V0cywgc3RyaW5ncywgc3ltYm9scywgYW5kIHR5cGVkIGFycmF5cy4gYE9iamVjdGAgb2JqZWN0cyBhcmUgY29tcGFyZWRcbiAqIGJ5IHRoZWlyIG93biwgbm90IGluaGVyaXRlZCwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLiBGdW5jdGlvbnMgYW5kIERPTVxuICogbm9kZXMgYXJlICoqbm90Kiogc3VwcG9ydGVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmlzRXF1YWwob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogb2JqZWN0ID09PSBvdGhlcjtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRXF1YWwodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRXF1YWw7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaXNFcXVhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZUlzRXF1YWxEZWVwID0gcmVxdWlyZSgnLi9fYmFzZUlzRXF1YWxEZWVwJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aGljaCBzdXBwb3J0cyBwYXJ0aWFsIGNvbXBhcmlzb25zXG4gKiBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtib29sZWFufSBbYml0bWFza10gVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy5cbiAqICBUaGUgYml0bWFzayBtYXkgYmUgY29tcG9zZWQgb2YgdGhlIGZvbGxvd2luZyBmbGFnczpcbiAqICAgICAxIC0gVW5vcmRlcmVkIGNvbXBhcmlzb25cbiAqICAgICAyIC0gUGFydGlhbCBjb21wYXJpc29uXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdCh2YWx1ZSkgJiYgIWlzT2JqZWN0TGlrZShvdGhlcikpKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJhc2VJc0VxdWFsLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRXF1YWw7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2Jhc2VJc0VxdWFsLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBTdGFjayA9IHJlcXVpcmUoJy4vX1N0YWNrJyksXG4gICAgZXF1YWxBcnJheXMgPSByZXF1aXJlKCcuL19lcXVhbEFycmF5cycpLFxuICAgIGVxdWFsQnlUYWcgPSByZXF1aXJlKCcuL19lcXVhbEJ5VGFnJyksXG4gICAgZXF1YWxPYmplY3RzID0gcmVxdWlyZSgnLi9fZXF1YWxPYmplY3RzJyksXG4gICAgZ2V0VGFnID0gcmVxdWlyZSgnLi9fZ2V0VGFnJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzQnVmZmVyID0gcmVxdWlyZSgnLi9pc0J1ZmZlcicpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vaXNUeXBlZEFycmF5Jyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNvbXBhcmlzb24gc3R5bGVzLiAqL1xudmFyIFBBUlRJQUxfQ09NUEFSRV9GTEFHID0gMjtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gW2JpdG1hc2tdIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICBvdGhUYWcgPSBhcnJheVRhZztcblxuICBpZiAoIW9iaklzQXJyKSB7XG4gICAgb2JqVGFnID0gZ2V0VGFnKG9iamVjdCk7XG4gICAgb2JqVGFnID0gb2JqVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvYmpUYWc7XG4gIH1cbiAgaWYgKCFvdGhJc0Fycikge1xuICAgIG90aFRhZyA9IGdldFRhZyhvdGhlcik7XG4gICAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvdGhUYWc7XG4gIH1cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiBpc0J1ZmZlcihvYmplY3QpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihvdGhlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgb2JqSXNBcnIgPSB0cnVlO1xuICAgIG9iaklzT2JqID0gZmFsc2U7XG4gIH1cbiAgaWYgKGlzU2FtZVRhZyAmJiAhb2JqSXNPYmopIHtcbiAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgIHJldHVybiAob2JqSXNBcnIgfHwgaXNUeXBlZEFycmF5KG9iamVjdCkpXG4gICAgICA/IGVxdWFsQXJyYXlzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spXG4gICAgICA6IGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgfVxuICBpZiAoIShiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUcpKSB7XG4gICAgdmFyIG9iaklzV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgb3RoSXNXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAob2JqSXNXcmFwcGVkIHx8IG90aElzV3JhcHBlZCkge1xuICAgICAgdmFyIG9ialVud3JhcHBlZCA9IG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LFxuICAgICAgICAgIG90aFVud3JhcHBlZCA9IG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlcjtcblxuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIHJldHVybiBlcXVhbEZ1bmMob2JqVW53cmFwcGVkLCBvdGhVbndyYXBwZWQsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgcmV0dXJuIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbERlZXA7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2Jhc2VJc0VxdWFsRGVlcC5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgTGlzdENhY2hlID0gcmVxdWlyZSgnLi9fTGlzdENhY2hlJyksXG4gICAgc3RhY2tDbGVhciA9IHJlcXVpcmUoJy4vX3N0YWNrQ2xlYXInKSxcbiAgICBzdGFja0RlbGV0ZSA9IHJlcXVpcmUoJy4vX3N0YWNrRGVsZXRlJyksXG4gICAgc3RhY2tHZXQgPSByZXF1aXJlKCcuL19zdGFja0dldCcpLFxuICAgIHN0YWNrSGFzID0gcmVxdWlyZSgnLi9fc3RhY2tIYXMnKSxcbiAgICBzdGFja1NldCA9IHJlcXVpcmUoJy4vX3N0YWNrU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxubW9kdWxlLmV4cG9ydHMgPSBTdGFjaztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fU3RhY2suanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGxpc3RDYWNoZUNsZWFyID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlQ2xlYXInKSxcbiAgICBsaXN0Q2FjaGVEZWxldGUgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVEZWxldGUnKSxcbiAgICBsaXN0Q2FjaGVHZXQgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVHZXQnKSxcbiAgICBsaXN0Q2FjaGVIYXMgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVIYXMnKSxcbiAgICBsaXN0Q2FjaGVTZXQgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBMaXN0Q2FjaGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX0xpc3RDYWNoZS5qc1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlQ2xlYXI7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2xpc3RDYWNoZUNsZWFyLmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgLS10aGlzLnNpemU7XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZURlbGV0ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fbGlzdENhY2hlRGVsZXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBlcSA9IHJlcXVpcmUoJy4vZXEnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NvY0luZGV4T2Y7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2Fzc29jSW5kZXhPZi5qc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9lcS5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlR2V0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19saXN0Q2FjaGVHZXQuanNcbiAqKiBtb2R1bGUgaWQgPSA0NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVIYXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2xpc3RDYWNoZUhhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgKyt0aGlzLnNpemU7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVTZXQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2xpc3RDYWNoZVNldC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgTGlzdENhY2hlID0gcmVxdWlyZSgnLi9fTGlzdENhY2hlJyk7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tDbGVhcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fc3RhY2tDbGVhci5qc1xuICoqIG1vZHVsZSBpZCA9IDQ5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgcmVzdWx0ID0gZGF0YVsnZGVsZXRlJ10oa2V5KTtcblxuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tEZWxldGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX3N0YWNrRGVsZXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0dldDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fc3RhY2tHZXQuanNcbiAqKiBtb2R1bGUgaWQgPSA1MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0hhcztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fc3RhY2tIYXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIExpc3RDYWNoZSA9IHJlcXVpcmUoJy4vX0xpc3RDYWNoZScpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpLFxuICAgIE1hcENhY2hlID0gcmVxdWlyZSgnLi9fTWFwQ2FjaGUnKTtcblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChkYXRhIGluc3RhbmNlb2YgTGlzdENhY2hlKSB7XG4gICAgdmFyIHBhaXJzID0gZGF0YS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICB0aGlzLnNpemUgPSArK2RhdGEuc2l6ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkYXRhID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZShwYWlycyk7XG4gIH1cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tTZXQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX3N0YWNrU2V0LmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXA7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX01hcC5qc1xuICoqIG1vZHVsZSBpZCA9IDU0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZUlzTmF0aXZlID0gcmVxdWlyZSgnLi9fYmFzZUlzTmF0aXZlJyksXG4gICAgZ2V0VmFsdWUgPSByZXF1aXJlKCcuL19nZXRWYWx1ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fZ2V0TmF0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gNTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNNYXNrZWQgPSByZXF1aXJlKCcuL19pc01hc2tlZCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYXRpdmU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2Jhc2VJc05hdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDU2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IHByb3h5VGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvaXNGdW5jdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDU3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9pc09iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDU4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY29yZUpzRGF0YSA9IHJlcXVpcmUoJy4vX2NvcmVKc0RhdGEnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc01hc2tlZDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9faXNNYXNrZWQuanNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbm1vZHVsZS5leHBvcnRzID0gY29yZUpzRGF0YTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fY29yZUpzRGF0YS5qc1xuICoqIG1vZHVsZSBpZCA9IDYwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX3Jvb3QuanNcbiAqKiBtb2R1bGUgaWQgPSA2MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19mcmVlR2xvYmFsLmpzXG4gKiogbW9kdWxlIGlkID0gNjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1NvdXJjZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fdG9Tb3VyY2UuanNcbiAqKiBtb2R1bGUgaWQgPSA2M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VmFsdWU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2dldFZhbHVlLmpzXG4gKiogbW9kdWxlIGlkID0gNjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBtYXBDYWNoZUNsZWFyID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVDbGVhcicpLFxuICAgIG1hcENhY2hlRGVsZXRlID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVEZWxldGUnKSxcbiAgICBtYXBDYWNoZUdldCA9IHJlcXVpcmUoJy4vX21hcENhY2hlR2V0JyksXG4gICAgbWFwQ2FjaGVIYXMgPSByZXF1aXJlKCcuL19tYXBDYWNoZUhhcycpLFxuICAgIG1hcENhY2hlU2V0ID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcENhY2hlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19NYXBDYWNoZS5qc1xuICoqIG1vZHVsZSBpZCA9IDY1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgSGFzaCA9IHJlcXVpcmUoJy4vX0hhc2gnKSxcbiAgICBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBNYXAgPSByZXF1aXJlKCcuL19NYXAnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5zaXplID0gMDtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlQ2xlYXI7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX21hcENhY2hlQ2xlYXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGhhc2hDbGVhciA9IHJlcXVpcmUoJy4vX2hhc2hDbGVhcicpLFxuICAgIGhhc2hEZWxldGUgPSByZXF1aXJlKCcuL19oYXNoRGVsZXRlJyksXG4gICAgaGFzaEdldCA9IHJlcXVpcmUoJy4vX2hhc2hHZXQnKSxcbiAgICBoYXNoSGFzID0gcmVxdWlyZSgnLi9faGFzaEhhcycpLFxuICAgIGhhc2hTZXQgPSByZXF1aXJlKCcuL19oYXNoU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBIYXNoO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19IYXNoLmpzXG4gKiogbW9kdWxlIGlkID0gNjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaENsZWFyO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19oYXNoQ2xlYXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdGl2ZUNyZWF0ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fbmF0aXZlQ3JlYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaERlbGV0ZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9faGFzaERlbGV0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDcwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoR2V0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19oYXNoR2V0LmpzXG4gKiogbW9kdWxlIGlkID0gNzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoSGFzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19oYXNoSGFzLmpzXG4gKiogbW9kdWxlIGlkID0gNzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICB0aGlzLnNpemUgKz0gdGhpcy5oYXMoa2V5KSA/IDAgOiAxO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFNldDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9faGFzaFNldC5qc1xuICoqIG1vZHVsZSBpZCA9IDczXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVEZWxldGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX21hcENhY2hlRGVsZXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0tleWFibGUgPSByZXF1aXJlKCcuL19pc0tleWFibGUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1hcERhdGE7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2dldE1hcERhdGEuanNcbiAqKiBtb2R1bGUgaWQgPSA3NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzS2V5YWJsZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9faXNLZXlhYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gNzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVHZXQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX21hcENhY2hlR2V0LmpzXG4gKiogbW9kdWxlIGlkID0gNzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnZXRNYXBEYXRhID0gcmVxdWlyZSgnLi9fZ2V0TWFwRGF0YScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlSGFzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19tYXBDYWNoZUhhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDc4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLFxuICAgICAgc2l6ZSA9IGRhdGEuc2l6ZTtcblxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplICs9IGRhdGEuc2l6ZSA9PSBzaXplID8gMCA6IDE7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlU2V0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19tYXBDYWNoZVNldC5qc1xuICoqIG1vZHVsZSBpZCA9IDc5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgU2V0Q2FjaGUgPSByZXF1aXJlKCcuL19TZXRDYWNoZScpLFxuICAgIGFycmF5U29tZSA9IHJlcXVpcmUoJy4vX2FycmF5U29tZScpLFxuICAgIGNhY2hlSGFzID0gcmVxdWlyZSgnLi9fY2FjaGVIYXMnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY29tcGFyaXNvbiBzdHlsZXMuICovXG52YXIgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyA9IDEsXG4gICAgUEFSVElBTF9DT01QQVJFX0ZMQUcgPSAyO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBhcnJheWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoO1xuXG4gIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNQYXJ0aWFsICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChhcnJheSk7XG4gIGlmIChzdGFja2VkICYmIHN0YWNrLmdldChvdGhlcikpIHtcbiAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IHRydWUsXG4gICAgICBzZWVuID0gKGJpdG1hc2sgJiBVTk9SREVSRURfQ09NUEFSRV9GTEFHKSA/IG5ldyBTZXRDYWNoZSA6IHVuZGVmaW5lZDtcblxuICBzdGFjay5zZXQoYXJyYXksIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBhcnJheSk7XG5cbiAgLy8gSWdub3JlIG5vbi1pbmRleCBwcm9wZXJ0aWVzLlxuICB3aGlsZSAoKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4LCBvdGhlciwgYXJyYXksIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCwgYXJyYXksIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIGlmIChjb21wYXJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY29tcGFyZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmIChzZWVuKSB7XG4gICAgICBpZiAoIWFycmF5U29tZShvdGhlciwgZnVuY3Rpb24ob3RoVmFsdWUsIG90aEluZGV4KSB7XG4gICAgICAgICAgICBpZiAoIWNhY2hlSGFzKHNlZW4sIG90aEluZGV4KSAmJlxuICAgICAgICAgICAgICAgIChhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2Vlbi5wdXNoKG90aEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSkge1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghKFxuICAgICAgICAgIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fFxuICAgICAgICAgICAgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShhcnJheSk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxBcnJheXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2VxdWFsQXJyYXlzLmpzXG4gKiogbW9kdWxlIGlkID0gODBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBNYXBDYWNoZSA9IHJlcXVpcmUoJy4vX01hcENhY2hlJyksXG4gICAgc2V0Q2FjaGVBZGQgPSByZXF1aXJlKCcuL19zZXRDYWNoZUFkZCcpLFxuICAgIHNldENhY2hlSGFzID0gcmVxdWlyZSgnLi9fc2V0Q2FjaGVIYXMnKTtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxubW9kdWxlLmV4cG9ydHMgPSBTZXRDYWNoZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fU2V0Q2FjaGUuanNcbiAqKiBtb2R1bGUgaWQgPSA4MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGFkZFxuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAYWxpYXMgcHVzaFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVBZGQodmFsdWUpIHtcbiAgdGhpcy5fX2RhdGFfXy5zZXQodmFsdWUsIEhBU0hfVU5ERUZJTkVEKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0Q2FjaGVBZGQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX3NldENhY2hlQWRkLmpzXG4gKiogbW9kdWxlIGlkID0gODJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRDYWNoZUhhcztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fc2V0Q2FjaGVIYXMuanNcbiAqKiBtb2R1bGUgaWQgPSA4M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc29tZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlTb21lO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19hcnJheVNvbWUuanNcbiAqKiBtb2R1bGUgaWQgPSA4NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDaGVja3MgaWYgYSBgY2FjaGVgIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSBUaGUgY2FjaGUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gY2FjaGVIYXMoY2FjaGUsIGtleSkge1xuICByZXR1cm4gY2FjaGUuaGFzKGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FjaGVIYXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2NhY2hlSGFzLmpzXG4gKiogbW9kdWxlIGlkID0gODVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBVaW50OEFycmF5ID0gcmVxdWlyZSgnLi9fVWludDhBcnJheScpLFxuICAgIGVxID0gcmVxdWlyZSgnLi9lcScpLFxuICAgIGVxdWFsQXJyYXlzID0gcmVxdWlyZSgnLi9fZXF1YWxBcnJheXMnKSxcbiAgICBtYXBUb0FycmF5ID0gcmVxdWlyZSgnLi9fbWFwVG9BcnJheScpLFxuICAgIHNldFRvQXJyYXkgPSByZXF1aXJlKCcuL19zZXRUb0FycmF5Jyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNvbXBhcmlzb24gc3R5bGVzLiAqL1xudmFyIFVOT1JERVJFRF9DT01QQVJFX0ZMQUcgPSAxLFxuICAgIFBBUlRJQUxfQ09NUEFSRV9GTEFHID0gMjtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYFxuICogIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAob2JqZWN0LmJ5dGVPZmZzZXQgIT0gb3RoZXIuYnl0ZU9mZnNldCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgb2JqZWN0ID0gb2JqZWN0LmJ1ZmZlcjtcbiAgICAgIG90aGVyID0gb3RoZXIuYnVmZmVyO1xuXG4gICAgY2FzZSBhcnJheUJ1ZmZlclRhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAhZXF1YWxGdW5jKG5ldyBVaW50OEFycmF5KG9iamVjdCksIG5ldyBVaW50OEFycmF5KG90aGVyKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgICAgLy8gQ29lcmNlIGJvb2xlYW5zIHRvIGAxYCBvciBgMGAgYW5kIGRhdGVzIHRvIG1pbGxpc2Vjb25kcy5cbiAgICAgIC8vIEludmFsaWQgZGF0ZXMgYXJlIGNvZXJjZWQgdG8gYE5hTmAuXG4gICAgICByZXR1cm4gZXEoK29iamVjdCwgK290aGVyKTtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzLCBwcmltaXRpdmVzIGFuZCBvYmplY3RzLFxuICAgICAgLy8gYXMgZXF1YWwuIFNlZSBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcmVnZXhwLnByb3RvdHlwZS50b3N0cmluZ1xuICAgICAgLy8gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuXG4gICAgY2FzZSBtYXBUYWc6XG4gICAgICB2YXIgY29udmVydCA9IG1hcFRvQXJyYXk7XG5cbiAgICBjYXNlIHNldFRhZzpcbiAgICAgIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgUEFSVElBTF9DT01QQVJFX0ZMQUc7XG4gICAgICBjb252ZXJ0IHx8IChjb252ZXJ0ID0gc2V0VG9BcnJheSk7XG5cbiAgICAgIGlmIChvYmplY3Quc2l6ZSAhPSBvdGhlci5zaXplICYmICFpc1BhcnRpYWwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgICAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgICAgIGlmIChzdGFja2VkKSB7XG4gICAgICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICAgICAgfVxuICAgICAgYml0bWFzayB8PSBVTk9SREVSRURfQ09NUEFSRV9GTEFHO1xuXG4gICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgICAgIHZhciByZXN1bHQgPSBlcXVhbEFycmF5cyhjb252ZXJ0KG9iamVjdCksIGNvbnZlcnQob3RoZXIpLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgICAgIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIGNhc2Ugc3ltYm9sVGFnOlxuICAgICAgaWYgKHN5bWJvbFZhbHVlT2YpIHtcbiAgICAgICAgcmV0dXJuIHN5bWJvbFZhbHVlT2YuY2FsbChvYmplY3QpID09IHN5bWJvbFZhbHVlT2YuY2FsbChvdGhlcik7XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsQnlUYWc7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2VxdWFsQnlUYWcuanNcbiAqKiBtb2R1bGUgaWQgPSA4NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fU3ltYm9sLmpzXG4gKiogbW9kdWxlIGlkID0gODdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVpbnQ4QXJyYXk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX1VpbnQ4QXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSA4OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBUb0FycmF5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19tYXBUb0FycmF5LmpzXG4gKiogbW9kdWxlIGlkID0gODlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0VG9BcnJheTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fc2V0VG9BcnJheS5qc1xuICoqIG1vZHVsZSBpZCA9IDkwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBjb21wYXJpc29uIHN0eWxlcy4gKi9cbnZhciBQQVJUSUFMX0NPTVBBUkVfRkxBRyA9IDI7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBvYmplY3RzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHLFxuICAgICAgb2JqUHJvcHMgPSBrZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc1BhcnRpYWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGluZGV4ID0gb2JqTGVuZ3RoO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgaWYgKCEoaXNQYXJ0aWFsID8ga2V5IGluIG90aGVyIDogaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IHRydWU7XG4gIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBvYmplY3QpO1xuXG4gIHZhciBza2lwQ3RvciA9IGlzUGFydGlhbDtcbiAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBvYmpWYWx1ZSwga2V5LCBvdGhlciwgb2JqZWN0LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKG9ialZhbHVlLCBvdGhWYWx1ZSwga2V5LCBvYmplY3QsIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmICghKGNvbXBhcmVkID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IChvYmpWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spKVxuICAgICAgICAgIDogY29tcGFyZWRcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgc2tpcEN0b3IgfHwgKHNraXBDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICB9XG4gIGlmIChyZXN1bHQgJiYgIXNraXBDdG9yKSB7XG4gICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIG90aEN0b3IgPSBvdGhlci5jb25zdHJ1Y3RvcjtcblxuICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgKCdjb25zdHJ1Y3RvcicgaW4gb2JqZWN0ICYmICdjb25zdHJ1Y3RvcicgaW4gb3RoZXIpICYmXG4gICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxPYmplY3RzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19lcXVhbE9iamVjdHMuanNcbiAqKiBtb2R1bGUgaWQgPSA5MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFycmF5TGlrZUtleXMgPSByZXF1aXJlKCcuL19hcnJheUxpa2VLZXlzJyksXG4gICAgYmFzZUtleXMgPSByZXF1aXJlKCcuL19iYXNlS2V5cycpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2tleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA5MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2VUaW1lcyA9IHJlcXVpcmUoJy4vX2Jhc2VUaW1lcycpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJy4vaXNCdWZmZXInKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vaXNUeXBlZEFycmF5Jyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICB2YXIgaXNBcnIgPSBpc0FycmF5KHZhbHVlKSxcbiAgICAgIGlzQXJnID0gIWlzQXJyICYmIGlzQXJndW1lbnRzKHZhbHVlKSxcbiAgICAgIGlzQnVmZiA9ICFpc0FyciAmJiAhaXNBcmcgJiYgaXNCdWZmZXIodmFsdWUpLFxuICAgICAgaXNUeXBlID0gIWlzQXJyICYmICFpc0FyZyAmJiAhaXNCdWZmICYmIGlzVHlwZWRBcnJheSh2YWx1ZSksXG4gICAgICBza2lwSW5kZXhlcyA9IGlzQXJyIHx8IGlzQXJnIHx8IGlzQnVmZiB8fCBpc1R5cGUsXG4gICAgICByZXN1bHQgPSBza2lwSW5kZXhlcyA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZykgOiBbXSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoXG4gICAgICAgICAgIC8vIFNhZmFyaSA5IGhhcyBlbnVtZXJhYmxlIGBhcmd1bWVudHMubGVuZ3RoYCBpbiBzdHJpY3QgbW9kZS5cbiAgICAgICAgICAga2V5ID09ICdsZW5ndGgnIHx8XG4gICAgICAgICAgIC8vIE5vZGUuanMgMC4xMCBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiBidWZmZXJzLlxuICAgICAgICAgICAoaXNCdWZmICYmIChrZXkgPT0gJ29mZnNldCcgfHwga2V5ID09ICdwYXJlbnQnKSkgfHxcbiAgICAgICAgICAgLy8gUGhhbnRvbUpTIDIgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gdHlwZWQgYXJyYXlzLlxuICAgICAgICAgICAoaXNUeXBlICYmIChrZXkgPT0gJ2J1ZmZlcicgfHwga2V5ID09ICdieXRlTGVuZ3RoJyB8fCBrZXkgPT0gJ2J5dGVPZmZzZXQnKSkgfHxcbiAgICAgICAgICAgLy8gU2tpcCBpbmRleCBwcm9wZXJ0aWVzLlxuICAgICAgICAgICBpc0luZGV4KGtleSwgbGVuZ3RoKVxuICAgICAgICApKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUxpa2VLZXlzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19hcnJheUxpa2VLZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gOTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRpbWVzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19iYXNlVGltZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA5NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2VJc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vX2Jhc2VJc0FyZ3VtZW50cycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA/IGJhc2VJc0FyZ3VtZW50cyA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2lzQXJndW1lbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gOTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0FyZ3VtZW50c2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICovXG5mdW5jdGlvbiBiYXNlSXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNBcmd1bWVudHM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2Jhc2VJc0FyZ3VtZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDk2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2lzQXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSA5N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290JyksXG4gICAgc3R1YkZhbHNlID0gcmVxdWlyZSgnLi9zdHViRmFsc2UnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQnVmZmVyO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2lzQnVmZmVyLmpzXG4gKiogbW9kdWxlIGlkID0gOThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSA5OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0dWJGYWxzZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9zdHViRmFsc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxMDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW5kZXg7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2lzSW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxMDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlSXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9fYmFzZUlzVHlwZWRBcnJheScpLFxuICAgIGJhc2VVbmFyeSA9IHJlcXVpcmUoJy4vX2Jhc2VVbmFyeScpLFxuICAgIG5vZGVVdGlsID0gcmVxdWlyZSgnLi9fbm9kZVV0aWwnKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUeXBlZEFycmF5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2lzVHlwZWRBcnJheS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzVHlwZWRBcnJheTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fYmFzZUlzVHlwZWRBcnJheS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2lzTGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gMTA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVVuYXJ5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19iYXNlVW5hcnkuanNcbiAqKiBtb2R1bGUgaWQgPSAxMDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vZGVVdGlsO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19ub2RlVXRpbC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzUHJvdG90eXBlID0gcmVxdWlyZSgnLi9faXNQcm90b3R5cGUnKSxcbiAgICBuYXRpdmVLZXlzID0gcmVxdWlyZSgnLi9fbmF0aXZlS2V5cycpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUtleXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2Jhc2VLZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gMTA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQcm90b3R5cGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX2lzUHJvdG90eXBlLmpzXG4gKiogbW9kdWxlIGlkID0gMTA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgb3ZlckFyZyA9IHJlcXVpcmUoJy4vX292ZXJBcmcnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdGl2ZUtleXM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2gvX25hdGl2ZUtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXlMaWtlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2lzQXJyYXlMaWtlLmpzXG4gKiogbW9kdWxlIGlkID0gMTEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgRGF0YVZpZXcgPSByZXF1aXJlKCcuL19EYXRhVmlldycpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpLFxuICAgIFByb21pc2UgPSByZXF1aXJlKCcuL19Qcm9taXNlJyksXG4gICAgU2V0ID0gcmVxdWlyZSgnLi9fU2V0JyksXG4gICAgV2Vha01hcCA9IHJlcXVpcmUoJy4vX1dlYWtNYXAnKSxcbiAgICBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtYXBzLCBzZXRzLCBhbmQgd2Vha21hcHMuICovXG52YXIgZGF0YVZpZXdDdG9yU3RyaW5nID0gdG9Tb3VyY2UoRGF0YVZpZXcpLFxuICAgIG1hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShNYXApLFxuICAgIHByb21pc2VDdG9yU3RyaW5nID0gdG9Tb3VyY2UoUHJvbWlzZSksXG4gICAgc2V0Q3RvclN0cmluZyA9IHRvU291cmNlKFNldCksXG4gICAgd2Vha01hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShXZWFrTWFwKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBgdG9TdHJpbmdUYWdgIG9mIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xudmFyIGdldFRhZyA9IGJhc2VHZXRUYWc7XG5cbi8vIEZhbGxiYWNrIGZvciBkYXRhIHZpZXdzLCBtYXBzLCBzZXRzLCBhbmQgd2VhayBtYXBzIGluIElFIDExIGFuZCBwcm9taXNlcyBpbiBOb2RlLmpzIDwgNi5cbmlmICgoRGF0YVZpZXcgJiYgZ2V0VGFnKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSkpKSAhPSBkYXRhVmlld1RhZykgfHxcbiAgICAoTWFwICYmIGdldFRhZyhuZXcgTWFwKSAhPSBtYXBUYWcpIHx8XG4gICAgKFByb21pc2UgJiYgZ2V0VGFnKFByb21pc2UucmVzb2x2ZSgpKSAhPSBwcm9taXNlVGFnKSB8fFxuICAgIChTZXQgJiYgZ2V0VGFnKG5ldyBTZXQpICE9IHNldFRhZykgfHxcbiAgICAoV2Vha01hcCAmJiBnZXRUYWcobmV3IFdlYWtNYXApICE9IHdlYWtNYXBUYWcpKSB7XG4gIGdldFRhZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHJlc3VsdCA9IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpLFxuICAgICAgICBDdG9yID0gcmVzdWx0ID09IG9iamVjdFRhZyA/IHZhbHVlLmNvbnN0cnVjdG9yIDogdW5kZWZpbmVkLFxuICAgICAgICBjdG9yU3RyaW5nID0gQ3RvciA/IHRvU291cmNlKEN0b3IpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFRhZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fZ2V0VGFnLmpzXG4gKiogbW9kdWxlIGlkID0gMTExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFWaWV3O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19EYXRhVmlldy5qc1xuICoqIG1vZHVsZSBpZCA9IDExMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fUHJvbWlzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDExM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9fU2V0LmpzXG4gKiogbW9kdWxlIGlkID0gMTE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWFrTWFwO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19XZWFrTWFwLmpzXG4gKiogbW9kdWxlIGlkID0gMTE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL19iYXNlR2V0VGFnLmpzXG4gKiogbW9kdWxlIGlkID0gMTE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBnbG9iYWwgcmVkNXByb3NkayAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuLy8gaW1wb3J0IHJlZDVwcm9zZGsgZnJvbSAncmVkNXByby1zZGsnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcblxuY2xhc3MgUHVibGlzaGVyU3RhdHVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3RhdHVzOiAnT24gaG9sZC4nXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU3RhdHVzRnJvbUV2ZW50IChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGBbUHVibGlzaGVyU3RhdHVzXSBldmVudDogJHtldmVudC50eXBlfWApXG4gICAgY29uc3QgcHViVHlwZXMgPSByZWQ1cHJvc2RrLlB1Ymxpc2hlckV2ZW50VHlwZXNcbiAgICBjb25zdCBydGNUeXBlcyA9IHJlZDVwcm9zZGsuUlRDUHVibGlzaGVyRXZlbnRUeXBlc1xuICAgIGxldCBzdGF0dXMgPSB0aGlzLnN0YXRlLnN0YXR1c1xuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgY2FzZSBwdWJUeXBlcy5DT05ORUNUX1NVQ0NFU1M6XG4gICAgICAgIHN0YXR1cyA9ICdDb25uZWN0aW9uIGVzdGFibGlzaGVkLi4uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBwdWJUeXBlcy5DT05ORUNUX0ZBSUxVUkU6XG4gICAgICAgIHN0YXR1cyA9ICdFcnJvciAtIENvdWxkIG5vdCBlc3RhYmxpc2ggY29ubmVjdGlvbi4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIHB1YlR5cGVzLlBVQkxJU0hfU1RBUlQ6XG4gICAgICAgIHN0YXR1cyA9ICdTdGFydGVkIHB1Ymxpc2hpbmcgc2Vzc2lvbi4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIHB1YlR5cGVzLlBVQkxJU0hfRkFJTDpcbiAgICAgICAgc3RhdHVzID0gJ0Vycm9yIC0gQ291bGQgbm90IHN0YXJ0IGEgcHVibGlzaGluZyBzZXNzaW9uLidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgcHViVHlwZXMuUFVCTElTSF9JTlZBTElEX05BTUU6XG4gICAgICAgIHN0YXR1cyA9ICdFcnJvciAtIFN0cmVhbSBuYW1lIGFscmVhZHkgaW4gdXNlLidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgcnRjVHlwZXMuTUVESUFfU1RSRUFNX0FWQUlMQUJMRTpcbiAgICAgICAgc3RhdHVzID0gJ1N0cmVhbSBhdmFpbGFibGUuLi4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIHJ0Y1R5cGVzLlBFRVJfQ09OTkVDVElPTl9BVkFJTEFCTEU6XG4gICAgICAgIHN0YXR1cyA9ICdQZWVyIENvbm5lY3Rpb24gYXZhaWxhYmxlLi4uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBydGNUeXBlcy5PRkZFUl9TVEFSVDpcbiAgICAgICAgc3RhdHVzID0gJ0JlZ2luIG9mZmVyLi4uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBydGNUeXBlcy5PRkZFUl9FTkQ6XG4gICAgICAgIHN0YXR1cyA9ICdPZmZlciBhY2NlcHRlZC4uLidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgcnRjVHlwZXMuSUNFX1RSSUNLTEVfQ09NUExFVEU6XG4gICAgICAgIHN0YXR1cyA9ICdOZWdvdGlhdGlvbiBjb21wbGV0ZS4gV2FpdGluZyBQdWJsaXNoIFN0YXJ0Li4uJ1xuICAgICAgICBicmVha1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1cyA9IHN0YXR1c1xuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLmV2ZW50ICE9PSBuZXh0UHJvcHMuZXZlbnQgJiYgbmV4dFByb3BzLmV2ZW50KSB7XG4gICAgICB0aGlzLnVwZGF0ZVN0YXR1c0Zyb21FdmVudChuZXh0UHJvcHMuZXZlbnQpXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHAgY2xhc3NOYW1lPVwiY2VudGVyZWQgc3RhdHVzLWZpZWxkXCI+U1RBVFVTOiB7dGhpcy5zdGF0ZS5zdGF0dXN9PC9wPlxuICAgIClcbiAgfVxuXG59XG5cblB1Ymxpc2hlclN0YXR1cy5wcm9wVHlwZXMgPSB7XG4gIGV2ZW50OiBQcm9wVHlwZXMub2JqZWN0XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hlclN0YXR1c1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvUHVibGlzaGVyU3RhdHVzLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVkNVByb1B1Ymxpc2hlciBmcm9tICcuLi8uLi9SZWQ1UHJvUHVibGlzaGVyJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgUHVibGlzaGVyU3RhdHVzIGZyb20gJy4uL1B1Ymxpc2hlclN0YXR1cycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uLy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNvbnN0IFVTRVJfTUVESUFfU0VUVElORyA9IHtcbiAgdmlkZW86IHtcbiAgICB3aWR0aDogMTkyMCxcbiAgICBoZWlnaHQ6IDEwODBcbiAgfVxufVxuXG5jbGFzcyBQdWJsaXNoZXIxMDgwcFRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0dXNFdmVudDogdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUHVibGlzaGVyRXZlbnQgKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXNFdmVudCA9IGV2ZW50XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgcHVibGlzaGVyRXN0YWJsaXNoZWQgKHB1Ymxpc2hlciwgcHVibGlzaGVyVmlldykge1xuICAgIGNvbnNvbGUubG9nKGBbUHVibGlzaGVyMTA4MHBUZXN0XSBwdWJsaXNoZXI6ICR7cHVibGlzaGVyfSwgJHtwdWJsaXNoZXJWaWV3fWApXG4gIH1cblxuICByZW5kZXIgKCkgIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlB1Ymxpc2hlciAxMDgwcCBUZXN0PC9oMT5cbiAgICAgICAgPGhyIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPjxlbT5zdHJlYW08L2VtPjoge3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX08L2gyPlxuICAgICAgICA8UHVibGlzaGVyU3RhdHVzIGV2ZW50PXt0aGlzLnN0YXRlLnN0YXR1c0V2ZW50fSAvPlxuICAgICAgICA8UmVkNVByb1B1Ymxpc2hlclxuICAgICAgICAgIGNsYXNzTmFtZT1cImNlbnRlcmVkXCJcbiAgICAgICAgICBtZWRpYUNsYXNzTmFtZT1cInZpZGVvLWVsZW1lbnRcIlxuICAgICAgICAgIGNvbmZpZ3VyYXRpb249e3RoaXMucHJvcHMuc2V0dGluZ3N9XG4gICAgICAgICAgdXNlck1lZGlhPXtVU0VSX01FRElBX1NFVFRJTkd9XG4gICAgICAgICAgc3RyZWFtTmFtZT17dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfVxuICAgICAgICAgIHNob3dDb250cm9scz17dHJ1ZX1cbiAgICAgICAgICBvblB1Ymxpc2hlckVzdGFibGlzaGVkPXt0aGlzLnB1Ymxpc2hlckVzdGFibGlzaGVkLmJpbmQodGhpcyl9XG4gICAgICAgICAgb25QdWJsaXNoZXJFdmVudD17dGhpcy5oYW5kbGVQdWJsaXNoZXJFdmVudC5iaW5kKHRoaXMpfVxuICAgICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5QdWJsaXNoZXIxMDgwcFRlc3QucHJvcFR5cGVzID0ge1xuICBzZXR0aW5nczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbkJhY2tDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoZXIxMDgwcFRlc3RcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3B1Ymxpc2gvUHVibGlzaGVyMTA4MHBUZXN0LmpzXG4gKiovIiwiLyogZ2xvYmFsIHJlZDVwcm9zZGsgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbi8vIGltcG9ydCByZWQ1cHJvc2RrIGZyb20gJ3JlZDVwcm8tc2RrJ1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVkNVByb1B1Ymxpc2hlciBmcm9tICcuLi8uLi9SZWQ1UHJvUHVibGlzaGVyJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgUHVibGlzaGVyU3RhdHVzIGZyb20gJy4uL1B1Ymxpc2hlclN0YXR1cycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uLy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNvbnN0IFVTRVJfTUVESUFfU0VUVElORyA9IHtcbiAgYXVkaW86IHRydWUsXG4gIHZpZGVvOiBmYWxzZVxufVxuXG5jbGFzcyBQdWJsaXNoZXJBdWRpb09ubHlUZXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3RhdHVzRXZlbnQ6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVB1Ymxpc2hlckV2ZW50IChldmVudCkge1xuICAgIC8vIHVwZGF0ZSBzdGF0ZSB3aXRoIGV2ZW50XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXNFdmVudCA9IGV2ZW50XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICAgIC8vIHNodXRkb3duIHBsYXliYWNrXG4gICAgY29uc3QgdmlkZW9FbGVtZW50ID0gdGhpcy5fcmVkNVByb1B1Ymxpc2hlci5nZXRQdWJsaXNoZXJFbGVtZW50KClcbiAgICBjb25zdCBwdWJUeXBlcyA9IHJlZDVwcm9zZGsuUHVibGlzaGVyRXZlbnRUeXBlc1xuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgY2FzZSBwdWJUeXBlcy5DT05ORUNUX0ZBSUxVUkU6XG4gICAgICBjYXNlIHB1YlR5cGVzLlBVQkxJU0hfRkFJTDpcbiAgICAgICAgdmlkZW9FbGVtZW50LnBhdXNlKClcbiAgICAgICAgdmlkZW9FbGVtZW50LnNyYyA9ICcnXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcHVibGlzaGVyRXN0YWJsaXNoZWQgKHB1Ymxpc2hlciwgcHVibGlzaGVyVmlldykge1xuICAgIGNvbnNvbGUubG9nKGBbUHVibGlzaGVyQXVkaW9Pbmx5VGVzdF0gcHVibGlzaGVyOiAke3B1Ymxpc2hlcn0sICR7cHVibGlzaGVyVmlld31gKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlB1Ymxpc2hlciBBdWRpbyBPbmx5IFRlc3Q8L2gxPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+PGVtPnN0cmVhbTwvZW0+OiB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfTwvaDI+XG4gICAgICAgIDxQdWJsaXNoZXJTdGF0dXMgZXZlbnQ9e3RoaXMuc3RhdGUuc3RhdHVzRXZlbnR9IC8+XG4gICAgICAgIDxSZWQ1UHJvUHVibGlzaGVyXG4gICAgICAgICAgcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9QdWJsaXNoZXIgPSBjfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImNlbnRlcmVkXCJcbiAgICAgICAgICBtZWRpYUNsYXNzTmFtZT1cInZpZGVvLWVsZW1lbnQgYXVkaW8tb25seS1lbGVtZW50XCJcbiAgICAgICAgICBjb25maWd1cmF0aW9uPXt0aGlzLnByb3BzLnNldHRpbmdzfVxuICAgICAgICAgIHVzZXJNZWRpYT17VVNFUl9NRURJQV9TRVRUSU5HfVxuICAgICAgICAgIHN0cmVhbU5hbWU9e3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX1cbiAgICAgICAgICBzaG93Q29udHJvbHM9e3RydWV9XG4gICAgICAgICAgb25QdWJsaXNoZXJFc3RhYmxpc2hlZD17dGhpcy5wdWJsaXNoZXJFc3RhYmxpc2hlZC5iaW5kKHRoaXMpfVxuICAgICAgICAgIG9uUHVibGlzaGVyRXZlbnQ9e3RoaXMuaGFuZGxlUHVibGlzaGVyRXZlbnQuYmluZCh0aGlzKX1cbiAgICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuUHVibGlzaGVyQXVkaW9Pbmx5VGVzdC5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hlckF1ZGlvT25seVRlc3RcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3B1Ymxpc2gvUHVibGlzaGVyQXVkaW9Pbmx5VGVzdC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlZDVQcm9QdWJsaXNoZXIgZnJvbSAnLi4vLi4vUmVkNVByb1B1Ymxpc2hlcicgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFB1Ymxpc2hlclN0YXR1cyBmcm9tICcuLi9QdWJsaXNoZXJTdGF0dXMnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBCYWNrTGluayBmcm9tICcuLi8uLi9CYWNrTGluaycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jb25zdCBTRUxFQ1RfREVGQVVMVCA9ICdTZWxlY3QgYSBjYW1lcmEuLi4nXG5cbmNsYXNzIFB1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjYW1lcmFzOiBbe1xuICAgICAgICBsYWJlbDogU0VMRUNUX0RFRkFVTFRcbiAgICAgIH1dLFxuICAgICAgc2VsZWN0ZWRDYW1lcmE6IHVuZGVmaW5lZCxcbiAgICAgIHB1Ymxpc2hBbGxvd2VkOiBmYWxzZSxcbiAgICAgIHN0YXR1c0V2ZW50OiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICB3YWl0Rm9yU2VsZWN0ICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpXG4gICAgICAudGhlbihkZXZpY2VzID0+IHtcbiAgICAgICAgbGV0IHZpZGVvQ2FtZXJhcyA9IGRldmljZXMuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgIHJldHVybiBpdGVtLmtpbmQgPT09ICd2aWRlb2lucHV0J1xuICAgICAgICB9KVxuICAgICAgICBjb25zdCBjYW1lcmFzID0gW3tcbiAgICAgICAgICBsYWJlbDogU0VMRUNUX0RFRkFVTFRcbiAgICAgICAgfV0uY29uY2F0KHZpZGVvQ2FtZXJhcylcbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUuY2FtZXJhcyA9IGNhbWVyYXNcbiAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gIH1cblxuICBwcmV2aWV3IChtZWRpYURldmljZUlkKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zZWxlY3RlZENhbWVyYSA9IG1lZGlhRGV2aWNlSWRcbiAgICAgIHN0YXRlLnB1Ymxpc2hBbGxvd2VkID0gdHJ1ZVxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIG9uQ2FtZXJhU2VsZWN0ICgpIHtcbiAgICBjb25zdCBjYW1lcmFTZWxlY3RlZCA9IHRoaXMuX2NhbWVyYVNlbGVjdC52YWx1ZVxuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkQ2FtZXJhICE9PSBjYW1lcmFTZWxlY3RlZCAmJlxuICAgICAgKGNhbWVyYVNlbGVjdGVkICYmIGNhbWVyYVNlbGVjdGVkICE9PSBTRUxFQ1RfREVGQVVMVCkpIHtcbiAgICAgIHRoaXMucHJldmlldyhjYW1lcmFTZWxlY3RlZClcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy53YWl0Rm9yU2VsZWN0KClcbiAgfVxuXG4gIGhhbmRsZVB1Ymxpc2hlckV2ZW50IChldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzRXZlbnQgPSBldmVudFxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIHB1Ymxpc2hlckVzdGFibGlzaGVkIChwdWJsaXNoZXIsIHZpZXcpIHtcbiAgICBjb25zb2xlLmxvZyhgW1B1Ymxpc2hlckNhbWVyYVNvdXJjZVRlc3RdIHB1Ymxpc2hlcjogJHtwdWJsaXNoZXJ9LCAke3ZpZXd9YClcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgbGFiZWxTdHlsZSA9IHtcbiAgICAgICdtYXJnaW4tcmlnaHQnOiAnMC41cmVtJ1xuICAgIH1cbiAgICBjb25zdCBjYW1lcmFTZWxlY3RGaWVsZCA9IHtcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyNmZmZmZmYnLFxuICAgICAgJ3BhZGRpbmcnOiAnMC44cmVtJ1xuICAgIH1cbiAgICBjb25zdCBjYW5QdWJsaXNoID0gdGhpcy5zdGF0ZS5wdWJsaXNoQWxsb3dlZFxuICAgIGNvbnN0IHVzZXJNZWRpYSA9IHtcbiAgICAgIHZpZGVvOiB7XG4gICAgICAgIG9wdGlvbmFsOiBbe1xuICAgICAgICAgIHNvdXJjZUlkOiB0aGlzLnN0YXRlLnNlbGVjdGVkQ2FtZXJhXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+UHVibGlzaGVyIENhbWVyYSBTb3VyY2UgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnN0cnVjdGlvbnMtYmxvY2tcIj5cbiAgICAgICAgICA8cD5UbyBiZWdpbiB0aGlzIHRlc3QsIGZpcnN0IHNlbGVjdCBhIGNhbWVyYSBmcm9tIHRoZSBmb2xsb3dpbmcgc2VsZWN0aW9uczo8L3A+XG4gICAgICAgICAgPHAgc3R5bGU9e2NhbWVyYVNlbGVjdEZpZWxkfT5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjYW1lcmEtc2VsZWN0XCIgc3R5bGU9e2xhYmVsU3R5bGV9PkNhbWVyYSBTb3VyY2U6PC9sYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3QgcmVmPXtjID0+IHRoaXMuX2NhbWVyYVNlbGVjdCA9IGN9XG4gICAgICAgICAgICAgIGlkPVwiY2FtZXJhLXNlbGVjdFwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2FtZXJhU2VsZWN0LmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5jYW1lcmFzLm1hcChjYW1lcmEgPT5cbiAgICAgICAgICAgICAgICAodGhpcy5zdGF0ZS5zZWxlY3RlZENhbWVyYSA9PT0gY2FtZXJhLmRldmljZUlkKVxuICAgICAgICAgICAgICAgICAgPyA8b3B0aW9uIHZhbHVlPXtjYW1lcmEuZGV2aWNlSWR9IHNlbGVjdGVkPntjYW1lcmEubGFiZWx9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA6IDxvcHRpb24gdmFsdWU9e2NhbWVyYS5kZXZpY2VJZH0+e2NhbWVyYS5sYWJlbH08L29wdGlvbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxQdWJsaXNoZXJTdGF0dXMgZXZlbnQ9e3RoaXMuc3RhdGUuc3RhdHVzRXZlbnR9IC8+XG4gICAgICAgIDxSZWQ1UHJvUHVibGlzaGVyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIlxuICAgICAgICAgIG1lZGlhQ2xhc3NOYW1lPVwidmlkZW8tZWxlbWVudFwiXG4gICAgICAgICAgYXV0b1B1Ymxpc2g9e2NhblB1Ymxpc2h9XG4gICAgICAgICAgc2hvd0NvbnRyb2xzPXt0cnVlfVxuICAgICAgICAgIHVzZXJNZWRpYT17dXNlck1lZGlhfVxuICAgICAgICAgIGNvbmZpZ3VyYXRpb249e3RoaXMucHJvcHMuc2V0dGluZ3N9XG4gICAgICAgICAgc3RyZWFtTmFtZT17dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfVxuICAgICAgICAgIG9uUHVibGlzaGVyRXN0YWJsaXNoZWQ9e3RoaXMucHVibGlzaGVyRXN0YWJsaXNoZWQuYmluZCh0aGlzKX1cbiAgICAgICAgICBvblB1Ymxpc2hlckV2ZW50PXt0aGlzLmhhbmRsZVB1Ymxpc2hlckV2ZW50LmJpbmQodGhpcyl9XG4gICAgICAgICAgcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9QdWJsaXNoZXIgPSBjfVxuICAgICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5QdWJsaXNoZXJDYW1lcmFTb3VyY2VUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVyQ2FtZXJhU291cmNlVGVzdFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3B1Ymxpc2gvUHVibGlzaGVyQ2FtZXJhU291cmNlVGVzdC5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlZDVQcm9QdWJsaXNoZXIgZnJvbSAnLi4vLi4vUmVkNVByb1B1Ymxpc2hlcicgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFB1Ymxpc2hlclN0YXR1cyBmcm9tICcuLi9QdWJsaXNoZXJTdGF0dXMnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBCYWNrTGluayBmcm9tICcuLi8uLi9CYWNrTGluaycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jb25zdCBGQUNJTkdfTU9ERV9GUk9OVCA9ICd1c2VyJ1xuY29uc3QgRkFDSU5HX01PREVfUkVBUiA9ICdlbnZpcm9ubWVudCdcblxuY2xhc3MgUHVibGlzaGVyQ2FtZXJhU3dhcFRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmYWNpbmdNb2RlRnJvbnQ6IHRydWUsXG4gICAgICBzdXBwb3J0ZWQ6IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKVtcImZhY2luZ01vZGVcIl0sXG4gICAgICBzdGF0dXNFdmVudDogdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICB9XG5cbiAgb25DYW1lcmFTd2FwUmVxdWVzdCAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5mYWNpbmdNb2RlRnJvbnQgPSAhc3RhdGUuZmFjaW5nTW9kZUZyb250XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlUHVibGlzaGVyRXZlbnQgKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXNFdmVudCA9IGV2ZW50XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgcHVibGlzaGVyRXN0YWJsaXNoZWQgKHB1Ymxpc2hlciwgdmlldykge1xuICAgIGNvbnNvbGUubG9nKGBbUHVibGlzaGVyQ2FtZXJhU3dhcFRlc3RdIHB1Ymxpc2hlcjogJHtwdWJsaXNoZXJ9LCAke3ZpZXd9YClcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgaGludENsYXNzID0gWydoaW50LWJsb2NrJywgdGhpcy5zdGF0ZS5zdXBwb3J0ZWQgPyAnJyA6ICdoaW50LWFsZXJ0J10uam9pbignICcpXG4gICAgY29uc3Qgc3VwcG9ydGVkU3RyID0gdGhpcy5zdGF0ZS5zdXBwb3J0ZWQgPyAnc3VwcG9ydHMnIDogJ2RvZXMgbm90IHN1cHBvcnQnXG4gICAgY29uc3QgdXNlck1lZGlhID0ge1xuICAgICAgdmlkZW86IHtcbiAgICAgICAgZmFjaW5nTW9kZTogdGhpcy5zdGF0ZS5mYWNpbmdNb2RlRnJvbnQgPyBGQUNJTkdfTU9ERV9GUk9OVCA6IEZBQ0lOR19NT0RFX1JFQVJcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5QdWJsaXNoZXIgQ2FtZXJhIFN3YXAgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPXtoaW50Q2xhc3N9PjxlbT5UaGUgYnJvd3NlciB5b3UgYXJlIHVzaW5nIDwvZW0+PHN0cm9uZz57c3VwcG9ydGVkU3RyfTwvc3Ryb25nPjxlbT4gdGhlIDwvZW0+PGNvZGU+ZmFjaW5nTW9kZTwvY29kZT48ZW0+IHZpZGVvIGNvbnN0cmFpbnQgcmVxdWlyZSBmb3IgdGhpcyB0ZXN0LjwvZW0+PC9wPlxuICAgICAgICA8UHVibGlzaGVyU3RhdHVzIGV2ZW50PXt0aGlzLnN0YXRlLnN0YXR1c0V2ZW50fSAvPlxuICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMub25DYW1lcmFTd2FwUmVxdWVzdC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICA8UmVkNVByb1B1Ymxpc2hlclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIlxuICAgICAgICAgICAgbWVkaWFDbGFzc05hbWU9XCJ2aWRlby1lbGVtZW50XCJcbiAgICAgICAgICAgIHNob3dDb250cm9scz17dHJ1ZX1cbiAgICAgICAgICAgIHVzZXJNZWRpYT17dXNlck1lZGlhfVxuICAgICAgICAgICAgY29uZmlndXJhdGlvbj17dGhpcy5wcm9wcy5zZXR0aW5nc31cbiAgICAgICAgICAgIHN0cmVhbU5hbWU9e3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX1cbiAgICAgICAgICAgIG9uUHVibGlzaGVyRXN0YWJsaXNoZWQ9e3RoaXMucHVibGlzaGVyRXN0YWJsaXNoZWQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uUHVibGlzaGVyRXZlbnQ9e3RoaXMuaGFuZGxlUHVibGlzaGVyRXZlbnQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvUHVibGlzaGVyID0gY31cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuUHVibGlzaGVyQ2FtZXJhU3dhcFRlc3QucHJvcFR5cGVzID0ge1xuICBzZXR0aW5nczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbkJhY2tDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoZXJDYW1lcmFTd2FwVGVzdFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvcHVibGlzaC9QdWJsaXNoZXJDYW1lcmFTd2FwVGVzdC5qc1xuICoqLyIsIi8qIGdsb2JhbCByZWQ1cHJvc2RrICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG4vLyBpbXBvcnQgcmVkNXByb3NkayBmcm9tICdyZWQ1cHJvLXNkaydcbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uLy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNvbnN0IEZJTFRFUl9TRUxFQ1QgPSAnU2VsZWN0IGZpbHRlci4uLidcblxuY2xhc3MgUHVibGlzaGVyRmlsdGVyc1Rlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWV3OiB1bmRlZmluZWQsXG4gICAgICBwdWJsaXNoZXI6IHVuZGVmaW5lZCxcbiAgICAgIHN0YXR1czogJ09uIGhvbGQuJyxcbiAgICAgIGZpbHRlcnM6IFtGSUxURVJfU0VMRUNULCAnZ3JheXNjYWxlJywgJ3NlcGlhJywgJ2JsdXInXSxcbiAgICAgIHZpZGVvQ2xhc3NMaXN0OiAnJ1xuICAgIH1cbiAgfVxuXG4gIHByZXZpZXcgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IG5ldyByZWQ1cHJvc2RrLlJUQ1B1Ymxpc2hlcigpXG4gICAgICBjb25zdCB2aWV3ID0gbmV3IHJlZDVwcm9zZGsuUHVibGlzaGVyVmlldygncmVkNXByby1wdWJsaXNoZXInKVxuICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSh7XG4gICAgICAgIGF1ZGlvOiAhY29tcC5wcm9wcy5zZXR0aW5ncy5hdWRpbyA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgICAgdmlkZW86ICFjb21wLnByb3BzLnNldHRpbmdzLnZpZGVvID8gZmFsc2UgOiB0cnVlXG4gICAgICB9LCBtZWRpYSA9PiB7XG5cbiAgICAgICAgLy8gVXBvbiBhY2Nlc3Mgb2YgdXNlciBtZWRpYSxcbiAgICAgICAgLy8gMS4gQXR0YWNoIHRoZSBzdHJlYW0gdG8gdGhlIHB1Ymxpc2hlci5cbiAgICAgICAgLy8gMi4gU2hvdyB0aGUgc3RyZWFtIGFzIHByZXZpZXcgaW4gdmlldyBpbnN0YW5jZS5cbiAgICAgICAgcHVibGlzaGVyLmF0dGFjaFN0cmVhbShtZWRpYSlcbiAgICAgICAgdmlldy5wcmV2aWV3KG1lZGlhLCB0cnVlKVxuXG4gICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHB1Ymxpc2hlclxuICAgICAgICAgIHN0YXRlLnZpZXcgPSB2aWV3XG4gICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmVzb2x2ZSgpXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hlckZpbHRlcnNUZXN0XSA6OiBFcnJvciAtICR7ZXJyb3J9YClcbiAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGlzaCAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICBjb25zdCBwdWJsaXNoZXIgPSB0aGlzLnN0YXRlLnB1Ymxpc2hlclxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLnN0YXRlLnZpZXdcbiAgICB2aWV3LmF0dGFjaFB1Ymxpc2hlcihwdWJsaXNoZXIpO1xuXG4gICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXMgPSAnRXN0YWJsaXNoaW5nIGNvbm5lY3Rpb24uLi4nXG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuXG4gICAgLy8gSW5pdGlhbGl6ZVxuICAgIHB1Ymxpc2hlci5pbml0KE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuc2V0dGluZ3MsIHtcbiAgICAgIHByb3RvY29sOiAnd3MnLFxuICAgICAgcG9ydDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ydGNwb3J0LFxuICAgICAgc3RyZWFtTmFtZTogdGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xLFxuICAgICAgc3RyZWFtVHlwZTogJ3dlYnJ0YydcbiAgICB9KSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICAvLyBJbnZva2UgdGhlIHB1Ymxpc2ggYWN0aW9uXG4gICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgc3RhdGUuc3RhdHVzID0gJ1N0YXJ0aW5nIHB1Ymxpc2ggc2Vzc2lvbi4uLidcbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHB1Ymxpc2hlci5wdWJsaXNoKClcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnUHVibGlzaGluZyBzdGFydGVkLiBZb3VcXCdyZSBMaXZlISdcbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICB9KVxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIC8vIEEgZmF1bHQgb2NjdXJyZWQgd2hpbGUgdHJ5aW5nIHRvIGluaXRpYWxpemUgYW5kIHB1Ymxpc2ggdGhlIHN0cmVhbS5cbiAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgIHN0YXRlLnN0YXR1cyA9IGBFUlJPUjogJHtqc29uRXJyb3J9YFxuICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgIH0pXG4gICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaGVyRmlsdGVyc1Rlc3RdIDo6IEVycm9yIC0gJHtqc29uRXJyb3J9YClcbiAgICB9KVxuXG4gIH1cblxuICB1bnB1Ymxpc2ggKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHZpZXcgPSBjb21wLnN0YXRlLnZpZXdcbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IGNvbXAuc3RhdGUucHVibGlzaGVyXG4gICAgICBpZiAocHVibGlzaGVyKSB7XG4gICAgICAgIHB1Ymxpc2hlci51bnB1Ymxpc2goKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHZpZXcudmlldy5zcmMgPSAnJ1xuICAgICAgICAgICAgcHVibGlzaGVyLnNldFZpZXcodW5kZWZpbmVkKVxuICAgICAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICBzdGF0ZS52aWV3ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkQ2FtZXJhID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hlckZpbHRlcnNUZXN0XSA6OiBVbm1vdW50IEVycm9yID0gJHtqc29uRXJyb3J9YClcbiAgICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgcHViID0gdGhpcy5wdWJsaXNoLmJpbmQodGhpcylcbiAgICB0aGlzLnByZXZpZXcoKVxuICAgICAgLnRoZW4ocHViKVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW1B1Ymxpc2hlckZpbHRlclRlc3RdIDo6IEVycm9yIC0gQ291bGQgbm90IHN0YXJ0IHB1Ymxpc2hpbmcgc2Vzc2lvbi4nKVxuICAgICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLnVucHVibGlzaCgpXG4gIH1cblxuICBvbkZpbHRlclNlbGVjdCAoKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRGaWx0ZXIgPSB0aGlzLl9maWx0ZXJTZWxlY3QudmFsdWVcbiAgICBsZXQgY2xhc3NMaXN0ID0gc2VsZWN0ZWRGaWx0ZXIgPT09IEZJTFRFUl9TRUxFQ1QgPyAnJyA6IHNlbGVjdGVkRmlsdGVyXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS52aWRlb0NsYXNzTGlzdCA9IGNsYXNzTGlzdFxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgbGFiZWxTdHlsZSA9IHtcbiAgICAgICdtYXJnaW4tcmlnaHQnOiAnMC41cmVtJ1xuICAgIH1cbiAgICBjb25zdCBmaWx0ZXJTZWxlY3RGaWVsZCA9IHtcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJyNmZmZmZmYnLFxuICAgICAgJ3BhZGRpbmcnOiAnMC44cmVtJ1xuICAgIH1cbiAgICBjb25zdCB2aWRlb0NsYXNzTGlzdCA9IHRoaXMuc3RhdGUudmlkZW9DbGFzc0xpc3QuY29uY2F0KFsndmlkZW8tZWxlbWVudCddKVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+UHVibGlzaGVyIEZpbHRlcnMgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnN0cnVjdGlvbnMtYmxvY2tcIj5cbiAgICAgICAgICA8cD5UbyBiZWdpbiB0aGlzIHRlc3QsIG9uY2Ugc3RyZWFtaW5nIGhhcyBzdGFydGVkLCBzZWxlY3QgYSBmaWx0ZXIgdG8gYXBwbHk6PC9wPlxuICAgICAgICAgIDxwIHN0eWxlPXtmaWx0ZXJTZWxlY3RGaWVsZH0+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZmlsdGVyLXNlbGVjdFwiIHN0eWxlPXtsYWJlbFN0eWxlfT5DYW1lcmEgRmlsdGVyOjwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0IHJlZj17YyA9PiB0aGlzLl9maWx0ZXJTZWxlY3QgPSBjfVxuICAgICAgICAgICAgICBpZD1cImZpbHRlci1zZWxlY3RcIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpbHRlclNlbGVjdC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZmlsdGVycy5tYXAoZmlsdGVyID0+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17ZmlsdGVyfT57ZmlsdGVyfTwvb3B0aW9uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiY2VudGVyZWQgcHVibGlzaC1zdGF0dXMtZmllbGRcIj5TVEFUVVM6IHt0aGlzLnN0YXRlLnN0YXR1c308L3A+XG4gICAgICAgIDxkaXYgcmVmPXtjID0+IHRoaXMuX3ZpZGVvQ29udGFpbmVyID0gY31cbiAgICAgICAgICBpZD1cInZpZGVvLWNvbnRhaW5lclwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5cbiAgICAgICAgICA8dmlkZW8gcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9QdWJsaXNoZXIgPSBjfVxuICAgICAgICAgICAgaWQ9XCJyZWQ1cHJvLXB1Ymxpc2hlclwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e3ZpZGVvQ2xhc3NMaXN0fVxuICAgICAgICAgICAgY29udHJvbHMgYXV0b3BsYXkgZGlzYWJsZWQ+PC92aWRlbz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5QdWJsaXNoZXJGaWx0ZXJzVGVzdC5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hlckZpbHRlcnNUZXN0XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9wdWJsaXNoL1B1Ymxpc2hlckZpbHRlcnNUZXN0LmpzXG4gKiovIiwiLyogZ2xvYmFsIHJlZDVwcm9zZGsgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbi8vIGltcG9ydCByZWQ1cHJvc2RrIGZyb20gJ3JlZDVwcm8tc2RrJ1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgYXV0b0JpbmQgZnJvbSAncmVhY3QtY2xhc3MvYXV0b0JpbmQnXG5pbXBvcnQgUHVibGlzaGVyU3RhdHVzIGZyb20gJy4uL1B1Ymxpc2hlclN0YXR1cycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uLy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIFB1Ymxpc2hlckZhaWxvdmVyVGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgYXV0b0JpbmQodGhpcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmlldzogdW5kZWZpbmVkLFxuICAgICAgcHVibGlzaGVyOiB1bmRlZmluZWQsXG4gICAgICBzZWxlY3RlZFB1Ymxpc2hlclR5cGU6IHVuZGVmaW5lZCxcbiAgICAgIHN0YXR1c0V2ZW50OiB1bmRlZmluZWRcbiAgICB9XG4gICAgdGhpcy5fcHVibGlzaGVyRW50cnkgPSB1bmRlZmluZWRcbiAgfVxuXG4gIHByZXZpZXcgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICBjb25zdCBwdWJsaXNoZXIgPSBuZXcgcmVkNXByb3Nkay5SZWQ1UHJvUHVibGlzaGVyKClcbiAgICAgIGNvbnN0IHZpZXcgPSBuZXcgcmVkNXByb3Nkay5QdWJsaXNoZXJWaWV3KCdyZWQ1cHJvLXB1Ymxpc2hlcicpXG4gICAgICB2aWV3LmF0dGFjaFB1Ymxpc2hlcihwdWJsaXNoZXIpXG5cbiAgICAgIC8vIEVzdGFibGlzaCBldmVudCBoYW5kbGluZy5cbiAgICAgIHRoaXMuX3B1Ymxpc2hlckVudHJ5ID0gcHVibGlzaGVyXG4gICAgICB0aGlzLl9wdWJsaXNoZXJFbnRyeS5vbignKicsIHRoaXMuaGFuZGxlUHVibGlzaGVyRXZlbnQpXG5cbiAgICAgIGNvbnN0IHJ0Y0NvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuc2V0dGluZ3MsIHtcbiAgICAgICAgcHJvdG9jb2w6ICd3cycsXG4gICAgICAgIHBvcnQ6IHRoaXMucHJvcHMuc2V0dGluZ3MucnRjcG9ydCxcbiAgICAgICAgc3RyZWFtTmFtZTogdGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xLFxuICAgICAgICBzdHJlYW1UeXBlOiAnd2VicnRjJ1xuICAgICAgfSlcbiAgICAgIGNvbnN0IHJ0bXBDb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLnNldHRpbmdzLCB7XG4gICAgICAgIHByb3RvY29sOiAncnRtcCcsXG4gICAgICAgIHBvcnQ6IHRoaXMucHJvcHMuc2V0dGluZ3MucnRtcHBvcnQsXG4gICAgICAgIHN0cmVhbU5hbWU6IHRoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMSxcbiAgICAgICAgc3dmOiAnbGliL3JlZDVwcm8vcmVkNXByby1wdWJsaXNoZXIuc3dmJ1xuICAgICAgfSlcbiAgICAgIGNvbnN0IHB1Ymxpc2hPcmRlciA9IHRoaXMucHJvcHMuc2V0dGluZ3MucHVibGlzaGVyRmFpbG92ZXJPcmRlci5zcGxpdCgnLCcpLm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0udHJpbSgpXG4gICAgICB9KVxuXG4gICAgICBwdWJsaXNoZXIuc2V0UHVibGlzaE9yZGVyKHB1Ymxpc2hPcmRlcilcbiAgICAgICAgLmluaXQoe1xuICAgICAgICAgIHJ0YzogcnRjQ29uZmlnLFxuICAgICAgICAgIHJ0bXA6IHJ0bXBDb25maWdcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHNlbGVjdGVkUHVibGlzaGVyKSA9PiB7XG4gICAgICAgICAgLy8gSW52b2tlIHRoZSBwdWJsaXNoIGFjdGlvblxuICAgICAgICAgIGNvbnN0IHR5cGUgPSBzZWxlY3RlZFB1Ymxpc2hlciA/IHNlbGVjdGVkUHVibGlzaGVyLmdldFR5cGUoKSA6IHVuZGVmaW5lZFxuICAgICAgICAgIGlmICh0eXBlLnRvTG93ZXJDYXNlKCkgPT09IHB1Ymxpc2hlci5wdWJsaXNoVHlwZXMuUlRDKSB7XG4gICAgICAgICAgICBjb25zdCBnbWQgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2UgfHwgbmF2aWdhdG9yXG4gICAgICAgICAgICBnbWQuZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgICAgICAgYXVkaW86ICFjb21wLnByb3BzLnNldHRpbmdzLmF1ZGlvID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICAgICAgICB2aWRlbzogIWNvbXAucHJvcHMuc2V0dGluZ3MudmlkZW8gPyBmYWxzZSA6IHRydWVcbiAgICAgICAgICAgIH0sIG1lZGlhID0+IHtcblxuICAgICAgICAgICAgICAvLyBVcG9uIGFjY2VzcyBvZiB1c2VyIG1lZGlhLFxuICAgICAgICAgICAgICAvLyAxLiBBdHRhY2ggdGhlIHN0cmVhbSB0byB0aGUgcHVibGlzaGVyLlxuICAgICAgICAgICAgICAvLyAyLiBTaG93IHRoZSBzdHJlYW0gYXMgcHJldmlldyBpbiB2aWV3IGluc3RhbmNlLlxuICAgICAgICAgICAgICBzZWxlY3RlZFB1Ymxpc2hlci5hdHRhY2hTdHJlYW0obWVkaWEpXG4gICAgICAgICAgICAgIHZpZXcucHJldmlldyhtZWRpYSwgdHJ1ZSlcblxuICAgICAgICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5wdWJsaXNoZXIgPSBzZWxlY3RlZFB1Ymxpc2hlclxuICAgICAgICAgICAgICAgIHN0YXRlLnZpZXcgPSB2aWV3XG4gICAgICAgICAgICAgICAgc3RhdGUuc2VsZWN0ZWRQdWJsaXNoZXJUeXBlID0gdHlwZVxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hlckZhaWxvdmVyVGVzdF0gOjogRXJyb3IgLSAke2Vycm9yfWApXG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHNlbGVjdGVkUHVibGlzaGVyXG4gICAgICAgICAgICAgIHN0YXRlLnZpZXcgPSB2aWV3XG4gICAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkUHVibGlzaGVyVHlwZSA9IHR5cGVcbiAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgc2VsZWN0ZWRQdWJsaXNoZXIgPyByZXNvbHZlKCkgOiByZWplY3QoJ0NvdWxkIG5vdCBmaW5kIHB1Ymxpc2hlci4nKVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBFbmQgaWYvY2xhdXNlIGZvciBwdWJsaXNoZXIgdHlwZS5cbiAgICAgICAgfSlcbiAgICAgICAgLy8gRW5kIFByb21pc2UgZGVjbGFyYXRpb24uXG4gICAgICB9KVxuICB9XG5cbiAgcHVibGlzaCAoKSB7XG4gICAgY29uc3QgcHVibGlzaGVyID0gdGhpcy5zdGF0ZS5wdWJsaXNoZXJcbiAgICAvLyBJbml0aWFsaXplXG4gICAgcHVibGlzaGVyLnB1Ymxpc2goKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnW1B1Ymxpc2hlckZhaWxvdmVyVGVzdF0gOjogUHVibGlzaGluZy4nKVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIC8vIEEgZmF1bHQgb2NjdXJyZWQgd2hpbGUgdHJ5aW5nIHRvIGluaXRpYWxpemUgYW5kIHB1Ymxpc2ggdGhlIHN0cmVhbS5cbiAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFtQdWJsaXNoZXJGYWlsb3ZlclRlc3RdIDo6IEVycm9yIC0gJHtqc29uRXJyb3J9YClcbiAgICAgIH0pXG4gIH1cblxuICB1bnB1Ymxpc2ggKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHZpZXcgPSBjb21wLnN0YXRlLnZpZXdcbiAgICAgIGNvbnN0IHB1Ymxpc2hlciA9IGNvbXAuc3RhdGUucHVibGlzaGVyXG4gICAgICBpZiAocHVibGlzaGVyKSB7XG4gICAgICAgIHB1Ymxpc2hlci51bnB1Ymxpc2goKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHZpZXcudmlldy5zcmMgPSAnJ1xuICAgICAgICAgICAgcHVibGlzaGVyLnNldFZpZXcodW5kZWZpbmVkKVxuICAgICAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLnB1Ymxpc2hlciA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICBzdGF0ZS52aWV3ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnNlbGVjdGVkQ2FtZXJhID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW1B1Ymxpc2hGYWlsb3ZlclRlc3RdIDo6IFVubW91bnQgRXJyb3IgPSAke2pzb25FcnJvcn1gKVxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCBwdWIgPSB0aGlzLnB1Ymxpc2guYmluZCh0aGlzKVxuICAgIHRoaXMucHJldmlldygpXG4gICAgICAudGhlbihwdWIpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaEZhaWxvdmVyVGVzdF0gOjogRXJyb3IgLSBDb3VsZCBub3Qgc3RhcnQgcHVibGlzaGluZyBzZXNzaW9uOiAke2Vycm9yfWApXG4gICAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIHRoaXMudW5wdWJsaXNoKClcbiAgICBpZiAodGhpcy5fcHVibGlzaGVyRW50cnkpIHtcbiAgICAgIHRoaXMuX3B1Ymxpc2hlckVudHJ5Lm9mZignKicsIHRoaXMuaGFuZGxlUHVibGlzaGVyRXZlbnQpXG4gICAgICB0aGlzLl9wdWJsaXNoZXJFbnRyeSA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVB1Ymxpc2hlckV2ZW50IChldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzRXZlbnQgPSBldmVudFxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5QdWJsaXNoZXIgRmFpbG92ZXIgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiY2VudGVyZWQgZmFpbG92ZXItZGV0ZWN0ZWQtZmllbGRcIj5EZXRlY3RlZCBTdXBwb3J0ZWQgUHVibGlzaGVyOiB7dGhpcy5zdGF0ZS5zZWxlY3RlZFB1Ymxpc2hlclR5cGV9PC9wPlxuICAgICAgICA8UHVibGlzaGVyU3RhdHVzIGV2ZW50PXt0aGlzLnN0YXRlLnN0YXR1c0V2ZW50fSAvPlxuICAgICAgICA8ZGl2IHJlZj17YyA9PiB0aGlzLl92aWRlb0NvbnRhaW5lciA9IGN9XG4gICAgICAgICAgaWQ9XCJ2aWRlby1jb250YWluZXJcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+XG4gICAgICAgICAgPHZpZGVvIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvUHVibGlzaGVyID0gY31cbiAgICAgICAgICAgIGlkPVwicmVkNXByby1wdWJsaXNoZXJcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidmlkZW8tZWxlbWVudFwiXG4gICAgICAgICAgICBjb250cm9scyBhdXRvcGxheSBkaXNhYmxlZD48L3ZpZGVvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblB1Ymxpc2hlckZhaWxvdmVyVGVzdC5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hlckZhaWxvdmVyVGVzdFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvcHVibGlzaC9QdWJsaXNoZXJGYWlsb3ZlclRlc3QuanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHNraXBNZXRob2RzID0ge1xuICAnY29uc3RydWN0b3InOiAxLFxuICAncmVuZGVyJzogMSxcbiAgJ3Nob3VsZENvbXBvbmVudFVwZGF0ZSc6IDEsXG4gICdjb21wb25lbnRXaWxsTW91bnQnOiAxLFxuICAnY29tcG9uZW50RGlkTW91bnQnOiAxLFxuICAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyc6IDEsXG4gICdjb21wb25lbnRXaWxsVXBkYXRlJzogMSxcbiAgJ2NvbXBvbmVudERpZFVwZGF0ZSc6IDEsXG4gICdjb21wb25lbnRXaWxsVW5tb3VudCc6IDFcbn1cblxuZnVuY3Rpb24gYXV0b0JpbmQob2JqZWN0LCBmaWx0ZXIpe1xuICB2YXIgcHJvdG8gPSBvYmplY3QuY29uc3RydWN0b3IucHJvdG90eXBlXG5cbiAgdmFyIGZpbHRlckZuID0gdHlwZW9mIGZpbHRlciA9PSAnZnVuY3Rpb24nID9cbiAgICBmaWx0ZXI6XG4gICAgZmlsdGVyICYmIHR5cGVvZiBmaWx0ZXIgPT0gJ29iamVjdCcgP1xuICAgICAgZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiAhZmlsdGVyW2tleV0gJiYgc2tpcE1ldGhvZHNba2V5XSAhPT0gMSAmJiB0eXBlb2YgcHJvdG9ba2V5XSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgfTpcbiAgICAgIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICByZXR1cm4gc2tpcE1ldGhvZHNba2V5XSAhPT0gMSAmJiB0eXBlb2YgcHJvdG9ba2V5XSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgfVxuXG4gIHZhciBuYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvKS5maWx0ZXIoZmlsdGVyRm4pXG5cbiAgbmFtZXMucHVzaCgnc2V0U3RhdGUnKVxuICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGtleSl7XG4gICAgb2JqZWN0W2tleV0gPSBvYmplY3Rba2V5XS5iaW5kKG9iamVjdClcbiAgfSlcblxuICByZXR1cm4gb2JqZWN0XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGF1dG9CaW5kXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWNsYXNzL2F1dG9CaW5kLmpzXG4gKiogbW9kdWxlIGlkID0gMTI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWQ1UHJvUHVibGlzaGVyIGZyb20gJy4uLy4uL1JlZDVQcm9QdWJsaXNoZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBQdWJsaXNoZXJTdGF0dXMgZnJvbSAnLi4vUHVibGlzaGVyU3RhdHVzJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgQmFja0xpbmsgZnJvbSAnLi4vLi4vQmFja0xpbmsnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuY2xhc3MgUHVibGlzaGVySW1hZ2VDYXB0dXJlVGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNhcHR1cmVGaWxsZWQ6IGZhbHNlLFxuICAgICAgc3RhdHVzRXZlbnQ6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIG9uVmlkZW9JbWFnZUNhcHR1cmUgKCkge1xuICAgIGNvbnN0IHZpZGVvRWxlbWVudCA9IHRoaXMuX3JlZDVQcm9QdWJsaXNoZXIuZ2V0UHVibGlzaGVyRWxlbWVudCgpXG4gICAgdGhpcy5jbGVhckNhbnZhcyh2aWRlb0VsZW1lbnQpXG4gICAgdGhpcy5kcmF3T25DYW52YXModmlkZW9FbGVtZW50KVxuICB9XG5cbiAgY2xlYXJDYW52YXMgKHRhcmdldEVsZW1lbnQpIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLl9jYXB0dXJlQ2FudmFzXG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiNhYWFhYWFcIlxuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCwgdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQpXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5jYXB0dXJlRmlsbGVkID0gZmFsc2VcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gIH1cblxuICBkcmF3T25DYW52YXMgKHRhcmdldEVsZW1lbnQpIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLl9jYXB0dXJlQ2FudmFzXG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgY2FudmFzLndpZHRoID0gdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aFxuICAgIGNhbnZhcy5oZWlnaHQgPSB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodFxuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRhcmdldEVsZW1lbnQsIDAsIDAsIHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGgsIHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0KVxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuY2FwdHVyZUZpbGxlZCA9IHRydWVcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVQdWJsaXNoZXJFdmVudCAoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1c0V2ZW50ID0gZXZlbnRcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gIH1cblxuICBwdWJsaXNoZXJFc3RhYmxpc2hlZCAocHVibGlzaGVyLCB2aWV3KSB7XG4gICAgY29uc29sZS5sb2coYFtQdWJsaXNoZXJJbWFnZUNhcHR1cmVUZXN0XSBwdWJsaXNoZXI6ICR7cHVibGlzaGVyfSwgJHt2aWV3fWApXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLl9yZWQ1UHJvUHVibGlzaGVyLmdldFB1Ymxpc2hlckVsZW1lbnQoKSlcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgdmlzaWJsZSA9IHRoaXMuc3RhdGUuY2FwdHVyZUZpbGxlZCA/ICdoaWRkZW4nIDogJ3Zpc2libGUnXG4gICAgY29uc3QgY2FwdHVyZVRleHRTdHlsZSA9IHtcbiAgICAgICd2aXNpYmlsaXR5JzogdmlzaWJsZSxcbiAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXG4gICAgICAncGFkZGluZyc6ICcxcmVtJyxcbiAgICAgICdjb2xvcic6ICcjMzMzMzMzJyxcbiAgICAgICd3aWR0aCc6ICcxMDAlJyxcbiAgICAgICd0ZXh0LWFsaWduJzogJ2NlbnRlcidcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5QdWJsaXNoZXIgSW1hZ2UgQ2FwdHVyZSBUZXN0PC9oMT5cbiAgICAgICAgPGhyIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPjxlbT5zdHJlYW08L2VtPjoge3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX08L2gyPlxuICAgICAgICA8UHVibGlzaGVyU3RhdHVzIGV2ZW50PXt0aGlzLnN0YXRlLnN0YXR1c0V2ZW50fSAvPlxuICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMub25WaWRlb0ltYWdlQ2FwdHVyZS5iaW5kKHRoaXMpfT5cbiAgICAgICAgICA8UmVkNVByb1B1Ymxpc2hlclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIlxuICAgICAgICAgICAgbWVkaWFDbGFzc05hbWU9XCJ2aWRlby1lbGVtZW50XCJcbiAgICAgICAgICAgIHNob3dDb250cm9scz17dHJ1ZX1cbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb249e3RoaXMucHJvcHMuc2V0dGluZ3N9XG4gICAgICAgICAgICBzdHJlYW1OYW1lPXt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9XG4gICAgICAgICAgICBvblB1Ymxpc2hlckVzdGFibGlzaGVkPXt0aGlzLnB1Ymxpc2hlckVzdGFibGlzaGVkLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvblB1Ymxpc2hlckV2ZW50PXt0aGlzLmhhbmRsZVB1Ymxpc2hlckV2ZW50LmJpbmQodGhpcyl9XG4gICAgICAgICAgICByZWY9e2MgPT4gdGhpcy5fcmVkNVByb1B1Ymxpc2hlciA9IGN9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlxuICAgICAgICAgIDxwIHN0eWxlPXtjYXB0dXJlVGV4dFN0eWxlfT48c3Bhbj5DbGljayB2aWRlbyB0byBjYXB0dXJlIGltYWdlLjwvc3Bhbj48YnIvPjxzcGFuPllvdXIgSW1hZ2Ugd2lsbCBhcHBlYXIgaGVyZS48L3NwYW4+PC9wPlxuICAgICAgICAgIDxjYW52YXMgcmVmPXtjID0+IHRoaXMuX2NhcHR1cmVDYW52YXMgPSBjfT48L2NhbnZhcz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5QdWJsaXNoZXJJbWFnZUNhcHR1cmVUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVySW1hZ2VDYXB0dXJlVGVzdFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3QvcHVibGlzaC9QdWJsaXNoZXJJbWFnZUNhcHR1cmVUZXN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVkNVByb1B1Ymxpc2hlciBmcm9tICcuLi8uLi9SZWQ1UHJvUHVibGlzaGVyJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgUHVibGlzaGVyU3RhdHVzIGZyb20gJy4uL1B1Ymxpc2hlclN0YXR1cycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uLy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIFB1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdGFyZ2V0SG9zdDogdW5kZWZpbmVkLFxuICAgICAgc3RhdHVzRXZlbnQ6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3RPcmlnaW4gKCkge1xuICAgIGNvbnN0IGhvc3QgPSB0aGlzLnByb3BzLnNldHRpbmdzLmhvc3RcbiAgICBjb25zdCBhcHAgPSB0aGlzLnByb3BzLnNldHRpbmdzLmFwcFxuICAgIGNvbnN0IHN0cmVhbU5hbWUgPSB0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTFcbiAgICBjb25zdCB1cmwgPSBgaHR0cDovLyR7aG9zdH06NTA4MC9zdHJlYW1tYW5hZ2VyL2FwaS8xLjAvZXZlbnQvJHthcHB9LyR7c3RyZWFtTmFtZX0/YWN0aW9uPWJyb2FkY2FzdGBcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1cyA9IGBSZXF1ZXN0aW5nIE9yaWdpbiBmcm9tICR7dXJsfS4uLmBcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGZldGNoKHVybClcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICBpZiAocmVzLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpICYmXG4gICAgICAgICAgICByZXMuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIikudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiYXBwbGljYXRpb24vanNvblwiKSA+PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ291bGQgbm90IHByb3Blcmx5IHBhcnNlIHJlc3BvbnNlLicpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICByZXNvbHZlKGpzb24uc2VydmVyQWRkcmVzcylcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBjb25zdCBqc29uRXJyb3IgPSB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnID8gZXJyb3IgOiBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgMilcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBbUHVibGlzaGVyU3RyZWFtTWFuYWdlclRlc3RdIDo6IEVycm9yIC0gQ291bGQgbm90IHJlcXVlc3QgT3JpZ2luIElQIGZyb20gU3RyZWFtIE1hbmFnZXIuICR7anNvbkVycm9yfWApXG4gICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICB0aGlzLnJlcXVlc3RPcmlnaW4oKVxuICAgICAgLnRoZW4oaG9zdCA9PiB7XG4gICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgIHN0YXRlLnRhcmdldEhvc3QgPSBob3N0XG4gICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUuc3RhdHVzID0gJ0NvdWxkIG5vdCBzdGFydCBhIGJyb2FkY2FzdCBzZXNzaW9uLidcbiAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFtQdWJsaXNoZXJTdHJlYW1NYW5hZ2VyVGVzdF0gOjogRXJyb3IgLSAke2pzb25FcnJvcn1gKVxuICAgICAgfSlcbiAgfVxuXG4gIGhhbmRsZVB1Ymxpc2hlckV2ZW50IChldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzRXZlbnQgPSBldmVudFxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIHB1Ymxpc2hlckVzdGFibGlzaGVkIChwdWJsaXNoZXIsIHZpZXcpIHtcbiAgICBjb25zb2xlLmxvZyhgW1B1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0XSBwdWJsaXNoZXI6ICR7cHVibGlzaGVyfSwgJHt2aWV3fWApXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGNhblB1Ymxpc2ggPSB0aGlzLnN0YXRlLnRhcmdldEhvc3QgIT09IHVuZGVmaW5lZFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+UHVibGlzaGVyIFN0cmVhbU1hbmFnZXIgVGVzdDwvaDE+XG4gICAgICAgIDxociAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj48ZW0+c3RyZWFtPC9lbT46IHt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9PC9oMj5cbiAgICAgICAgPFB1Ymxpc2hlclN0YXR1cyBldmVudD17dGhpcy5zdGF0ZS5zdGF0dXNFdmVudH0gLz5cbiAgICAgICAgPFJlZDVQcm9QdWJsaXNoZXJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjZW50ZXJlZFwiXG4gICAgICAgICAgbWVkaWFDbGFzc05hbWU9XCJ2aWRlby1lbGVtZW50XCJcbiAgICAgICAgICBjb25maWd1cmF0aW9uPXt0aGlzLnByb3BzLnNldHRpbmdzfVxuICAgICAgICAgIHN0cmVhbU5hbWU9e3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX1cbiAgICAgICAgICBob3N0PXt0aGlzLnN0YXRlLnRhcmdldEhvc3R9XG4gICAgICAgICAgc2hvd0NvbnRyb2xzPXt0cnVlfVxuICAgICAgICAgIGF1dG9QdWJsaXNoPXtjYW5QdWJsaXNofVxuICAgICAgICAgIG9uUHVibGlzaGVyRXN0YWJsaXNoZWQ9e3RoaXMucHVibGlzaGVyRXN0YWJsaXNoZWQuYmluZCh0aGlzKX1cbiAgICAgICAgICBvblB1Ymxpc2hlckV2ZW50PXt0aGlzLmhhbmRsZVB1Ymxpc2hlckV2ZW50LmJpbmQodGhpcyl9XG4gICAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblB1Ymxpc2hlclN0cmVhbU1hbmFnZXJUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVyU3RyZWFtTWFuYWdlclRlc3RcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3B1Ymxpc2gvUHVibGlzaGVyU3RyZWFtTWFuYWdlclRlc3QuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWQ1UHJvU3Vic2NyaWJlciBmcm9tICcuLi8uLi9SZWQ1UHJvU3Vic2NyaWJlcicgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFN1YnNjcmliZXJTdGF0dXMgZnJvbSAnLi4vU3Vic2NyaWJlclN0YXR1cycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uLy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIFN1YnNjcmliZXJUZXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3RhdHVzRXZlbnQ6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVN1YnNjcmliZXJFdmVudCAoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1c0V2ZW50ID0gZXZlbnRcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gIH1cblxuICBzdWJzY3JpYmVyRXN0YWJsaXNoZWQgKHN1YnNjcmliZXIsIHZpZXcpIHtcbiAgICBjb25zb2xlLmxvZyhgW1N1YnNjcmliZXJUZXN0XSBzdWJzY3JpYmVyOiAke3N1YnNjcmliZXJ9LCAke3ZpZXd9YClcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5TdWJzY3JpYmVyIFRlc3Q8L2gxPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+PGVtPnN0cmVhbTwvZW0+OiB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfTwvaDI+XG4gICAgICAgIDxTdWJzY3JpYmVyU3RhdHVzIGV2ZW50PXt0aGlzLnN0YXRlLnN0YXR1c0V2ZW50fSAvPlxuICAgICAgICA8UmVkNVByb1N1YnNjcmliZXJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjZW50ZXJlZFwiXG4gICAgICAgICAgbWVkaWFDbGFzc05hbWU9XCJ2aWRlby1lbGVtZW50XCJcbiAgICAgICAgICBjb25maWd1cmF0aW9uPXt0aGlzLnByb3BzLnNldHRpbmdzfVxuICAgICAgICAgIHN0cmVhbU5hbWU9e3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX1cbiAgICAgICAgICBhdXRvUGxheT17dHJ1ZX1cbiAgICAgICAgICBzaG93Q29udHJvbHM9e3RydWV9XG4gICAgICAgICAgb25TdWJzY3JpYmVyRXN0YWJsaXNoZWQ9e3RoaXMuc3Vic2NyaWJlckVzdGFibGlzaGVkLmJpbmQodGhpcyl9XG4gICAgICAgICAgb25TdWJzY3JpYmVyRXZlbnQ9e3RoaXMuaGFuZGxlU3Vic2NyaWJlckV2ZW50LmJpbmQodGhpcyl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5TdWJzY3JpYmVyVGVzdC5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1YnNjcmliZXJUZXN0XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9zdWJzY3JpYmUvU3Vic2NyaWJlclRlc3QuanNcbiAqKi8iLCIvKiBnbG9iYWwgcmVkNXByb3NkayAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuLy8gaW1wb3J0IHJlZDVwcm9zZGsgZnJvbSAncmVkNXByby1zZGsnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcblxuY29uc3QgZGVmYXVsdENvbmZpZ3VyYXRpb24gPSB7XG4gIHByb3RvY29sOiAnd3MnLFxuICBwb3J0OiA4MDgxLFxuICBhcHA6ICdsaXZlJyxcbiAgYmFuZHdpZHRoOiB7XG4gICAgYXVkaW86IDUwLFxuICAgIHZpZGVvOiAyNTYsXG4gICAgZGF0YTogMzAgKiAxMDAwICogMTAwMFxuICB9XG59XG5cbmNsYXNzIFJlZDVQcm9TdWJzY3JpYmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmlldzogdW5kZWZpbmVkLFxuICAgICAgc3Vic2NyaWJlcjogdW5kZWZpbmVkLFxuICAgICAgaW5zdGFuY2VJZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMCkudG9TdHJpbmcoMTYpXG4gICAgfVxuICB9XG5cbiAgb25TdWJzY3JpYmVGYWlsIChtZXNzYWdlKSB7XG4gICAgY29uc29sZS5lcnJvcihgW1JlZDVQcm9TdWJzY3JpYmVyXSA6OiAke21lc3NhZ2V9YClcbiAgfVxuXG4gIG9uU3Vic2NyaWJlU3VjY2VzcyAoKSB7XG4gIH1cblxuICBvblVuc3Vic2NyaWJlRmFpbCAobWVzc2FnZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoYFtSZWQ1UHJvU3Vic2NyaWJlcl0gOjogJHttZXNzYWdlfWApXG4gIH1cblxuICBvblVuc3Vic2NyaWJlU3VjY2VzcyAoKSB7XG4gIH1cblxuICBub3RpZnlTdWJzY3JpYmVyRXN0YWJsaXNoZWQgKHN1YnNjcmliZXIsIHZpZXcpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblN1YnNjcmliZXJFc3RhYmxpc2hlZCkge1xuICAgICAgdGhpcy5wcm9wcy5vblN1YnNjcmliZXJFc3RhYmxpc2hlZChzdWJzY3JpYmVyLCB2aWV3KVxuICAgIH1cbiAgfVxuXG4gIHN1YnNjcmliZSAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICBjb25zdCB2aWV3ID0gbmV3IHJlZDVwcm9zZGsuUGxheWJhY2tWaWV3KFsncmVkNXByby1zdWJzY3JpYmVyLXZpZGVvJywgdGhpcy5zdGF0ZS5pbnN0YW5jZUlkXS5qb2luKCctJykpXG4gICAgY29uc3Qgc3Vic2NyaWJlciA9IG5ldyByZWQ1cHJvc2RrLlJUQ1N1YnNjcmliZXIoKVxuICAgIGNvbnN0IG9yaWdBdHRhY2hTdHJlYW0gPSB2aWV3LmF0dGFjaFN0cmVhbS5iaW5kKHZpZXcpXG4gICAgdmlldy5hdHRhY2hTdHJlYW0gPSAoc3RyZWFtLCBhdXRvcGxheSkgPT4ge1xuICAgICAgb3JpZ0F0dGFjaFN0cmVhbShzdHJlYW0sIGF1dG9wbGF5KVxuICAgICAgdmlldy5hdHRhY2hTdHJlYW0gPSBvcmlnQXR0YWNoU3RyZWFtXG4gICAgfVxuICAgIHZpZXcuYXR0YWNoU3Vic2NyaWJlcihzdWJzY3JpYmVyKVxuXG4gICAgaWYgKHRoaXMucHJvcHMub25TdWJzY3JpYmVyRXZlbnQpIHtcbiAgICAgIHN1YnNjcmliZXIub24oJyonLCB0aGlzLnByb3BzLm9uU3Vic2NyaWJlckV2ZW50KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHN1YnNjcmliZXIub24oJyonLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBbUmVkNVByb1N1YnNjcmliZXJdIDo6IFN1YnNjcmliZXJFdmVudCAtICR7ZXZlbnQudHlwZX1gKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q29uZmlndXJhdGlvbiwgdGhpcy5wcm9wcy5jb25maWd1cmF0aW9uKVxuICAgIGNvbmZpZy5wb3J0ID0gY29uZmlnLnJ0Y3BvcnQgfHwgY29uZmlnLnBvcnRcbiAgICBjb25maWcuaG9zdCA9IHRoaXMucHJvcHMuaG9zdCB8fCBjb25maWcuaG9zdFxuICAgIGNvbmZpZy5zdHJlYW1OYW1lID0gdGhpcy5wcm9wcy5zdHJlYW1OYW1lIHx8IGNvbmZpZy5zdHJlYW1OYW1lXG4gICAgY29uZmlnLnN1YnNjcmlwdGlvbklkID0gJ3N1YnNjcmliZXItJyArIHRoaXMuc3RhdGUuaW5zdGFuY2VJZFxuXG4gICAgY29uc29sZS5sb2coJ1tSZWQ1UHJvU3Vic2NyaWJlcl0gY29uZmlnOjogJyArIEpTT04uc3RyaW5naWZ5KGNvbmZpZywgbnVsbCwgMikpXG5cbiAgICBzdWJzY3JpYmVyLmluaXQoY29uZmlnKVxuICAgICAgLnRoZW4ocGxheWVyID0+IHtcbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUudmlldyA9IHZpZXdcbiAgICAgICAgICBzdGF0ZS5zdWJzY3JpYmVyID0gc3Vic2NyaWJlclxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcGxheWVyLnBsYXkoKVxuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY29tcC5vblN1YnNjcmliZVN1Y2Nlc3MoKVxuICAgICAgICBjb21wLm5vdGlmeVN1YnNjcmliZXJFc3RhYmxpc2hlZChzdWJzY3JpYmVyLCB2aWV3KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICBjb21wLm9uU3Vic2NyaWJlRmFpbChgRXJyb3IgLSAke2pzb25FcnJvcn1gKVxuICAgIH0pXG5cbiAgfVxuXG4gIHVuc3Vic2NyaWJlICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB2aWV3ID0gY29tcC5zdGF0ZS52aWV3XG4gICAgICBjb25zdCBzdWJzY3JpYmVyID0gY29tcC5zdGF0ZS5zdWJzY3JpYmVyXG4gICAgICBpZiAoc3Vic2NyaWJlcikge1xuICAgICAgICBzdWJzY3JpYmVyLnN0b3AoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHZpZXcudmlldy5zcmMgPSAnJ1xuICAgICAgICAgICAgc3Vic2NyaWJlci5zZXRWaWV3KHVuZGVmaW5lZClcbiAgICAgICAgICAgIHN1YnNjcmliZXIub2ZmKCcqJywgY29tcC5wcm9wcy5vblN1YnNjcmliZXJFdmVudClcbiAgICAgICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgICAgICBzdGF0ZS52aWV3ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN0YXRlLnN1YnNjcmliZXIgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb21wLm9uVW5zdWJzY3JpYmVTdWNjZXNzKClcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICAgICAgY29tcC5vblVuc3Vic2NyaWJlRmFpbChgVW5tb3VudCBFcnJvciA9ICR7anNvbkVycm9yfWApXG4gICAgICAgICAgICByZWplY3QoYENvdWxkIG5vdCB1bnN1YnNjcmliZTogJHtlcnJvcn1gKVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRyeVN1YnNjcmliZSAoYXV0bykge1xuICAgIGlmIChhdXRvKSB7XG4gICAgICB0aGlzLnN1YnNjcmliZSgpXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMudHJ5U3Vic2NyaWJlKHRoaXMucHJvcHMuYXV0b1N1YnNjcmliZSlcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGNvbnN0IHN1YnNjcmliZXIgPSB0aGlzLnN0YXRlLnN1YnNjcmliZXJcbiAgICB0aGlzLnVuc3Vic2NyaWJlKClcbiAgICBpZiAoc3Vic2NyaWJlciAmJiB0aGlzLnByb3BzLm9uU3Vic2NyaWJlckV2ZW50KSB7XG4gICAgICBzdWJzY3JpYmVyLm9mZignKicsIHRoaXMucHJvcHMub25TdWJzY3JpYmVyRXZlbnQpXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlIChwcmV2UHJvcHMpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIGlmIChwcmV2UHJvcHMuYXV0b1N1YnNjcmliZSAhPT0gdGhpcy5wcm9wcy5hdXRvU3Vic2NyaWJlKSB7XG4gICAgICBjb25zdCBzdWIgPSB0aGlzLnRyeVN1YnNjcmliZS5iaW5kKHRoaXMpXG4gICAgICBjb25zdCBhdXRvID0gdGhpcy5wcm9wcy5hdXRvU3Vic2NyaWJlXG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHN1YihhdXRvKVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbXAub25TdWJzY3JpYmVGYWlsKGBDb3VsZCBub3Qgc3RhcnQgYSBzdWJzY3JpcHRpb24gc2Vzc2lvbjogJHtlcnJvcn1gKVxuICAgICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGdldFBsYXliYWNrRWxlbWVudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZDVQcm9TdWJzY3JpYmVyXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGVsZW1lbnRJZCA9IFsncmVkNXByby1zdWJzY3JpYmVyLXZpZGVvJywgdGhpcy5zdGF0ZS5pbnN0YW5jZUlkXS5qb2luKCctJylcbiAgICBsZXQgY2xhc3NOYW1lcyA9IFsncmVkNXByby1zdWJzY3JpYmVyLXZpZGVvLWNvbnRhaW5lciddXG4gICAgaWYgKHRoaXMucHJvcHMuY2xhc3NOYW1lKSB7XG4gICAgICBjbGFzc05hbWVzID0gY2xhc3NOYW1lcy5jb25jYXQodGhpcy5wcm9wcy5jbGFzc05hbWUpXG4gICAgfVxuICAgIGxldCBtZWRpYUNsYXNzTmFtZXMgPSBbJ3JlZDVwcm8tc3Vic2NyaWJlci12aWRlbyddXG4gICAgaWYgKHRoaXMucHJvcHMubWVkaWFDbGFzc05hbWUpIHtcbiAgICAgIG1lZGlhQ2xhc3NOYW1lcyA9IG1lZGlhQ2xhc3NOYW1lcy5jb25jYXQodGhpcy5wcm9wcy5tZWRpYUNsYXNzTmFtZSlcbiAgICB9XG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmF1ZGlvT25seVxuICAgICAgPyAoXG4gICAgICAgIDxhdWRpbyByZWY9e2MgPT4gdGhpcy5fcmVkNVByb1N1YnNjcmliZXIgPSBjfVxuICAgICAgICAgIGlkPXtlbGVtZW50SWR9XG4gICAgICAgICAgY2xhc3NOYW1lPXttZWRpYUNsYXNzTmFtZXMuam9pbignICcpfVxuICAgICAgICAgIGNvbnRyb2xzPXt0aGlzLnByb3BzLnNob3dDb250cm9sc31cbiAgICAgICAgICBhdXRvcGxheT17dGhpcy5wcm9wcy5hdXRvUGxheX0+XG4gICAgICAgIDwvYXVkaW8+XG4gICAgICApXG4gICAgICA6IChcbiAgICAgICAgPHZpZGVvIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvU3Vic2NyaWJlciA9IGN9XG4gICAgICAgICAgaWQ9e2VsZW1lbnRJZH1cbiAgICAgICAgICBjbGFzc05hbWU9e21lZGlhQ2xhc3NOYW1lcy5qb2luKCcgJyl9XG4gICAgICAgICAgY29udHJvbHM9e3RoaXMucHJvcHMuc2hvd0NvbnRyb2xzfVxuICAgICAgICAgIGF1dG9wbGF5PXt0aGlzLnByb3BzLmF1dG9QbGF5fT5cbiAgICAgICAgPC92aWRlbz5cbiAgICAgIClcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiByZWY9e2MgPT4gdGhpcy5fdmlkZW9Db250YWluZXIgPSBjfVxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmpvaW4oJyAnKX0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblJlZDVQcm9TdWJzY3JpYmVyLnByb3BUeXBlcyA9IHtcbiAgYXV0b1N1YnNjcmliZTogUHJvcFR5cGVzLmJvb2xlYW4sXG4gIGF1dG9QbGF5OiBQcm9wVHlwZXMuYm9vbGVhbixcbiAgc2hvd0NvbnRyb2xzOiBQcm9wVHlwZXMuYm9vbGVhbixcbiAgYXVkaW9Pbmx5OiBQcm9wVHlwZXMuYm9vbGVhbixcbiAgaG9zdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgc3RyZWFtTmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjb25maWd1cmF0aW9uOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvblN1YnNjcmliZXJFc3RhYmxpc2hlZDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uU3Vic2NyaWJlckV2ZW50OiBQcm9wVHlwZXMuZnVuY1xufVxuXG5SZWQ1UHJvU3Vic2NyaWJlci5kZWZhdWx0UHJvcHMgPSB7XG4gIGF1dG9TdWJzY3JpYmU6IHRydWUsXG4gIGF1dG9QbGF5OiB0cnVlLFxuICBzaG93Q29udHJvbHM6IHRydWUsXG4gIGF1ZGlvT25seTogZmFsc2UsXG4gIGhvc3Q6IHVuZGVmaW5lZCxcbiAgc3RyZWFtTmFtZTogdW5kZWZpbmVkLFxuICBjb25maWd1cmF0aW9uOiBkZWZhdWx0Q29uZmlndXJhdGlvblxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWQ1UHJvU3Vic2NyaWJlclxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL1JlZDVQcm9TdWJzY3JpYmVyLmpzXG4gKiovIiwiLyogZ2xvYmFsIHJlZDVwcm9zZGsgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbi8vIGltcG9ydCByZWQ1cHJvc2RrIGZyb20gJ3JlZDVwcm8tc2RrJ1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5cbmNsYXNzIFN1YnNjcmliZXJTdGF0dXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0dXM6ICdPbiBob2xkLidcbiAgICB9XG4gIH1cblxuICB1cGRhdGVTdGF0dXNGcm9tRXZlbnQgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coYFtTdWJzY3JpYmVyU3RhdHVzXSBldmVudDogJHtldmVudC50eXBlfWApXG4gICAgY29uc3Qgc3ViVHlwZXMgPSByZWQ1cHJvc2RrLlN1YnNjcmliZXJFdmVudFR5cGVzXG4gICAgY29uc3QgcnRjVHlwZXMgPSByZWQ1cHJvc2RrLlJUQ1N1YnNjcmliZXJFdmVudFR5cGVzXG4gICAgbGV0IGFuc3dlclxuICAgIGxldCBjYW5kaWRhdGVcbiAgICBsZXQgc3RhdHVzID0gdGhpcy5zdGF0ZS5zdGF0dXNcbiAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgIGNhc2Ugc3ViVHlwZXMuQ09OTkVDVF9TVUNDRVNTOlxuICAgICAgICBzdGF0dXMgPSAnQ29ubmVjdGlvbiBlc3RhYmxpc2hlZC4uLidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2Ugc3ViVHlwZXMuQ09OTkVDVF9GQUlMVVJFOlxuICAgICAgICBzdGF0dXMgPSAnRXJyb3IgLSBDb3VsZCBub3QgZXN0YWJsaXNoIGNvbm5lY3Rpb24uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBzdWJUeXBlcy5TVUJTQ1JJQkVfU1RBUlQ6XG4gICAgICAgIHN0YXR1cyA9ICdTdGFydGVkIHN1YnNjcmliaW5nIHNlc3Npb24uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBzdWJUeXBlcy5TVUJTQ1JJQkVfRkFJTDpcbiAgICAgICAgc3RhdHVzID0gJ0Vycm9yIC0gQ291bGQgbm90IHN0YXJ0IGEgc3Vic2NyaWJpbmcgc2Vzc2lvbi4nXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIHN1YlR5cGVzLlNVQlNDUklCRV9JTlZBTElEX05BTUU6XG4gICAgICAgIHN0YXR1cyA9ICdFcnJvciAtIFN0cmVhbSBuYW1lIG5vdCBpbiB1c2UuJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBydGNUeXBlcy5PRkZFUl9TVEFSVDpcbiAgICAgICAgc3RhdHVzID0gJ0JlZ2luIG9mZmVyLi4uJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSBydGNUeXBlcy5PRkZFUl9FTkQ6XG4gICAgICAgIHN0YXR1cyA9ICdPZmZlciBhY2NlcHRlZC4uLidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgcnRjVHlwZXMuQU5TV0VSX1NUQVJUOlxuICAgICAgICBzdGF0dXMgPSAnU2VuZGluZyBhbnN3ZXIuLi4nXG4gICAgICAgIGFuc3dlciA9IEpTT04uc3RyaW5naWZ5KGV2ZW50LmRhdGEsIG51bGwsIDIpXG4gICAgICAgIGNvbnNvbGUubG9nKGBbU3Vic2NyaWJlclN0YXR1c10gJHtldmVudC50eXBlfTogJHthbnN3ZXJ9YClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgcnRjVHlwZXMuQU5TV0VSX0VORDpcbiAgICAgICAgc3RhdHVzID0gJ0Fuc3dlciByZWNlaXZlZC4uLidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgcnRjVHlwZXMuQ0FORElEQVRFX1NUQVJUOlxuICAgICAgICBzdGF0dXMgPSAnU2VuZGluZyBjYW5kaWRhdGUuLi4nXG4gICAgICAgIGNhbmRpZGF0ZSA9IEpTT04uc3RyaW5naWZ5KGV2ZW50LmRhdGEsIG51bGwsIDIpXG4gICAgICAgIGNvbnNvbGUubG9nKGBbU3Vic2NyaWJlclN0YXR1c10gJHtldmVudC50eXBlfTogJHtjYW5kaWRhdGV9YClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgcnRjVHlwZXMuQ0FORElEQVRFX0VORDpcbiAgICAgICAgc3RhdHVzID0gJ0NhbmRpZGF0ZSByZWNlaXZlZC4uLidcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgcnRjVHlwZXMuSUNFX1RSSUNLTEVfQ09NUExFVEU6XG4gICAgICAgIHN0YXR1cyA9ICdOZWdvdGlhdGlvbiBjb21wbGV0ZS4gV2FpdGluZyBTdWJzY3JpcHRpb24gU3RhcnQuLi4nXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzID0gc3RhdHVzXG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZXZlbnQgIT09IG5leHRQcm9wcy5ldmVudCAmJiBuZXh0UHJvcHMuZXZlbnQpIHtcbiAgICAgIHRoaXMudXBkYXRlU3RhdHVzRnJvbUV2ZW50KG5leHRQcm9wcy5ldmVudClcbiAgICB9XG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8cCBjbGFzc05hbWU9XCJjZW50ZXJlZCBzdGF0dXMtZmllbGRcIj5TVEFUVVM6IHt0aGlzLnN0YXRlLnN0YXR1c308L3A+XG4gICAgKVxuICB9XG5cbn1cblxuU3Vic2NyaWJlclN0YXR1cy5wcm9wVHlwZXMgPSB7XG4gIGV2ZW50OiBQcm9wVHlwZXMub2JqZWN0XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1YnNjcmliZXJTdGF0dXNcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L1N1YnNjcmliZXJTdGF0dXMuanNcbiAqKi8iLCIvKiBnbG9iYWwgcmVkNXByb3NkayAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuLy8gaW1wb3J0IHJlZDVwcm9zZGsgZnJvbSAncmVkNXByby1zZGsnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBhdXRvQmluZCBmcm9tICdyZWFjdC1jbGFzcy9hdXRvQmluZCdcbmltcG9ydCBTdWJzY3JpYmVyU3RhdHVzIGZyb20gJy4uL1N1YnNjcmliZXJTdGF0dXMnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBCYWNrTGluayBmcm9tICcuLi8uLi9CYWNrTGluaycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jbGFzcyBTdWJzY3JpYmVyRmFpbG92ZXJUZXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICBhdXRvQmluZCh0aGlzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWV3OiB1bmRlZmluZWQsXG4gICAgICBzdWJzY3JpYmVyOiB1bmRlZmluZWQsXG4gICAgICBzdGF0dXNFdmVudDogdW5kZWZpbmVkXG4gICAgfVxuICAgIHRoaXMuX3N1YnNjcmliZXJFbnRyeSA9IHVuZGVmaW5lZFxuICB9XG5cbiAgc3Vic2NyaWJlICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgcmVkNXByb3Nkay5QbGF5YmFja1ZpZXcoJ3JlZDVwcm8tc3Vic2NyaWJlcicpXG4gICAgY29uc3Qgc3Vic2NyaWJlciA9IG5ldyByZWQ1cHJvc2RrLlJlZDVQcm9TdWJzY3JpYmVyKClcbiAgICBjb25zdCBzdWJzY3JpYmVPcmRlciA9IHRoaXMucHJvcHMuc2V0dGluZ3Muc3Vic2NyaWJlckZhaWxvdmVyT3JkZXIuc3BsaXQoJywnKS5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnRyaW0oKVxuICAgIH0pXG5cbiAgICB0aGlzLl9zdWJzY3JpYmVyRW50cnkgPSBzdWJzY3JpYmVyXG4gICAgdGhpcy5fc3Vic2NyaWJlckVudHJ5Lm9uKCcqJywgdGhpcy5oYW5kbGVTdWJzY3JpYmVyRXZlbnQpXG5cbiAgICBjb25zdCBvcmlnQXR0YWNoU3RyZWFtID0gdmlldy5hdHRhY2hTdHJlYW0uYmluZCh2aWV3KVxuICAgIHZpZXcuYXR0YWNoU3RyZWFtID0gKHN0cmVhbSwgYXV0b3BsYXkpID0+IHtcbiAgICAgIG9yaWdBdHRhY2hTdHJlYW0oc3RyZWFtLCBhdXRvcGxheSlcbiAgICAgIHZpZXcuYXR0YWNoU3RyZWFtID0gb3JpZ0F0dGFjaFN0cmVhbVxuICAgIH1cblxuICAgIGNvbnN0IHJ0Y0NvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuc2V0dGluZ3MsIHtcbiAgICAgIHByb3RvY29sOiAnd3MnLFxuICAgICAgcG9ydDogdGhpcy5wcm9wcy5zZXR0aW5ncy5ydGNwb3J0LFxuICAgICAgc3Vic2NyaXB0aW9uSWQ6ICdzdWJzY3JpYmVyLScgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwKS50b1N0cmluZygxNiksXG4gICAgICBzdHJlYW1OYW1lOiB0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTEsXG4gICAgICBiYW5kd2lkdGg6IHtcbiAgICAgICAgYXVkaW86IDUwLFxuICAgICAgICB2aWRlbzogMjU2LFxuICAgICAgICBkYXRhOiAzMCAqIDEwMDAgKiAxMDAwXG4gICAgICB9XG4gICAgfSlcbiAgICBjb25zdCBydG1wQ29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy5zZXR0aW5ncywge1xuICAgICAgcHJvdG9jb2w6ICdydG1wJyxcbiAgICAgIHBvcnQ6IHRoaXMucHJvcHMuc2V0dGluZ3MucnRtcHBvcnQsXG4gICAgICBzdHJlYW1OYW1lOiB0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTEsXG4gICAgICBtaW1lVHlwZTogJ3J0bXAvZmx2JyxcbiAgICAgIHVzZVZpZGVvSlM6IGZhbHNlLFxuICAgICAgc3dmOiAnbGliL3JlZDVwcm8vcmVkNXByby1zdWJzY3JpYmVyLnN3ZidcbiAgICB9KVxuICAgIGNvbnN0IGhsc0NvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuc2V0dGluZ3MsIHtcbiAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICBwb3J0OiB0aGlzLnByb3BzLnNldHRpbmdzLmhsc3BvcnQsXG4gICAgICBzdHJlYW1OYW1lOiB0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTEsXG4gICAgICBtaW1lVHlwZTogJ2FwcGxpY2F0aW9uL3gtbXBlZ1VSTCcsXG4gICAgICBzd2Y6ICdsaWIvcmVkNXByby9yZWQ1cHJvLXZpZGVvLWpzLnN3ZidcbiAgICB9KVxuXG4gICAgdmlldy5hdHRhY2hTdWJzY3JpYmVyKHN1YnNjcmliZXIpXG5cbiAgICBzdWJzY3JpYmVyXG4gICAgICAuc2V0UGxheWJhY2tPcmRlcihzdWJzY3JpYmVPcmRlcilcbiAgICAgIC5pbml0KHtcbiAgICAgICAgcnRjOiBydGNDb25maWcsXG4gICAgICAgIHJ0bXA6IHJ0bXBDb25maWcsXG4gICAgICAgIGhsczogaGxzQ29uZmlnXG4gICAgICB9KVxuICAgICAgLnRoZW4ocGxheWVyID0+IHtcbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUudmlldyA9IHZpZXdcbiAgICAgICAgICBzdGF0ZS5zdWJzY3JpYmVyID0gcGxheWVyXG4gICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBwbGF5ZXIucGxheSgpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICBjb25zb2xlLmVycm9yKGBbU3Vic2NyaWJlckZhaWxvdmVyVGVzdF0gOjogRXJyb3IgLSAke2pzb25FcnJvcn1gKVxuICAgICAgfSlcblxuICB9XG5cbiAgdW5zdWJzY3JpYmUgKCkge1xuICAgIGNvbnN0IGNvbXAgPSB0aGlzO1xuICAgIGNvbnN0IHZpZXcgPSBjb21wLnN0YXRlLnZpZXc7XG4gICAgY29uc3Qgc3Vic2NyaWJlciA9IGNvbXAuc3RhdGUuc3Vic2NyaWJlcjtcbiAgICBpZiAoc3Vic2NyaWJlcikge1xuICAgICAgc3Vic2NyaWJlci5zdG9wKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHZpZXcudmlldy5zcmMgPSAnJ1xuICAgICAgICAgIHN1YnNjcmliZXIuc2V0Vmlldyh1bmRlZmluZWQpXG4gICAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgICBzdGF0ZS52aWV3ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICBzdGF0ZS5zdWJzY3JpYmVyID0gdW5kZWZpbmVkXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGNvbnN0IGpzb25FcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBlcnJvciA6IEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAyKVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFtTdWJzY3JpYmVyRmFpbG92ZXJUZXN0XSA6OiBVbm1vdW50IEVycm9yID0gJHtqc29uRXJyb3J9YClcbiAgICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5zdWJzY3JpYmUoKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpXG4gICAgaWYgKHRoaXMuX3N1YnNjcmliZXJFbnRyeSkge1xuICAgICAgdGhpcy5fc3Vic2NyaWJlckVudHJ5Lm9mZignKicsIHRoaXMuaGFuZGxlU3Vic2NyaWJlckV2ZW50KVxuICAgICAgdGhpcy5fc3Vic2NyaWJlckVudHJ5ID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU3Vic2NyaWJlckV2ZW50IChldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzRXZlbnQgPSBldmVudFxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxCYWNrTGluayBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQmFja0NsaWNrfSAvPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5TdWJzY3JpYmVyIEZhaWxvdmVyIFRlc3Q8L2gxPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+PGVtPnN0cmVhbTwvZW0+OiB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfTwvaDI+XG4gICAgICAgIDxTdWJzY3JpYmVyU3RhdHVzIGV2ZW50PXt0aGlzLnN0YXRlLnN0YXR1c0V2ZW50fSAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbnRlcmVkXCIgcmVmPXtjID0+IHRoaXMuX3ZpZGVvQ29udGFpbmVyID0gY31cbiAgICAgICAgICBpZD1cInZpZGVvLWNvbnRhaW5lclwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5cbiAgICAgICAgICA8dmlkZW8gY2xhc3NOYW1lPVwidmlkZW8tanMgdmpzLWRlZmF1bHQtc2tpblwiIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvU3Vic2NyaWJlciA9IGN9XG4gICAgICAgICAgICBpZD1cInJlZDVwcm8tc3Vic2NyaWJlclwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ2aWRlby1lbGVtZW50XCJcbiAgICAgICAgICAgIGNvbnRyb2xzIGF1dG9wbGF5PjwvdmlkZW8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuU3Vic2NyaWJlckZhaWxvdmVyVGVzdC5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1YnNjcmliZXJGYWlsb3ZlclRlc3RcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy90ZXN0L3N1YnNjcmliZS9TdWJzY3JpYmVyRmFpbG92ZXJUZXN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVkNVByb1N1YnNjcmliZXIgZnJvbSAnLi4vLi4vUmVkNVByb1N1YnNjcmliZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBTdWJzY3JpYmVyU3RhdHVzIGZyb20gJy4uL1N1YnNjcmliZXJTdGF0dXMnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBCYWNrTGluayBmcm9tICcuLi8uLi9CYWNrTGluaycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jbGFzcyBTdWJzY3JpYmVyQXVkaW9Pbmx5VGVzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHN0YXR1c0V2ZW50OiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTdWJzY3JpYmVyRXZlbnQgKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXNFdmVudCA9IGV2ZW50XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgc3Vic2NyaWJlckVzdGFibGlzaGVkIChzdWJzY3JpYmVyLCB2aWV3KSB7XG4gICAgY29uc29sZS5sb2coYFtTdWJzY3JpYmVyQXVkaW9Pbmx5VGVzdF0gc3Vic2NyaWJlcjogJHtzdWJzY3JpYmVyfSwgJHt2aWV3fWApXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8QmFja0xpbmsgb25DbGljaz17dGhpcy5wcm9wcy5vbkJhY2tDbGlja30gLz5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+U3Vic2NyaWJlciBBdWRpbyBPbmx5IFRlc3Q8L2gxPlxuICAgICAgICA8aHIgLz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+PGVtPnN0cmVhbTwvZW0+OiB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zdHJlYW0xfTwvaDI+XG4gICAgICAgIDxTdWJzY3JpYmVyU3RhdHVzIGV2ZW50PXt0aGlzLnN0YXRlLnN0YXR1c0V2ZW50fSAvPlxuICAgICAgICA8UmVkNVByb1N1YnNjcmliZXJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjZW50ZXJlZFwiXG4gICAgICAgICAgbWVkaWFDbGFzc05hbWU9XCJ2aWRlby1lbGVtZW50XCJcbiAgICAgICAgICBjb25maWd1cmF0aW9uPXt0aGlzLnByb3BzLnNldHRpbmdzfVxuICAgICAgICAgIHN0cmVhbU5hbWU9e3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX1cbiAgICAgICAgICBhdXRvUGxheT17dHJ1ZX1cbiAgICAgICAgICBhdWRpb09ubHk9e3RydWV9XG4gICAgICAgICAgc2hvd0NvbnRyb2xzPXt0cnVlfVxuICAgICAgICAgIG9uU3Vic2NyaWJlckVzdGFibGlzaGVkPXt0aGlzLnN1YnNjcmliZXJFc3RhYmxpc2hlZC5iaW5kKHRoaXMpfVxuICAgICAgICAgIG9uU3Vic2NyaWJlckV2ZW50PXt0aGlzLmhhbmRsZVN1YnNjcmliZXJFdmVudC5iaW5kKHRoaXMpfVxuICAgICAgICAgIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvU3Vic2NyaWJlciA9IGN9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxufVxuXG5TdWJzY3JpYmVyQXVkaW9Pbmx5VGVzdC5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1YnNjcmliZXJBdWRpb09ubHlUZXN0XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9zdWJzY3JpYmUvU3Vic2NyaWJlckF1ZGlvT25seVRlc3QuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWQ1UHJvU3Vic2NyaWJlciBmcm9tICcuLi8uLi9SZWQ1UHJvU3Vic2NyaWJlcicgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFN1YnNjcmliZXJTdGF0dXMgZnJvbSAnLi4vU3Vic2NyaWJlclN0YXR1cycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tMaW5rIGZyb20gJy4uLy4uL0JhY2tMaW5rJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmNsYXNzIFN1YnNjcmliZXJJbWFnZUNhcHR1cmVUZXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2FwdHVyZUZpbGxlZDogZmFsc2UsXG4gICAgICBzdGF0dXNFdmVudDogdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgb25WaWRlb0ltYWdlQ2FwdHVyZSAoKSB7XG4gICAgY29uc3QgdmlkZW9FbGVtZW50ID0gdGhpcy5fcmVkNVByb1N1YnNjcmliZXIuZ2V0UGxheWJhY2tFbGVtZW50KClcbiAgICB0aGlzLmNsZWFyQ2FudmFzKHZpZGVvRWxlbWVudClcbiAgICB0aGlzLmRyYXdPbkNhbnZhcyh2aWRlb0VsZW1lbnQpXG4gIH1cblxuICBjbGVhckNhbnZhcyAodGFyZ2V0RWxlbWVudCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuX2NhcHR1cmVDYW52YXNcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiI2FhYWFhYVwiXG4gICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoLCB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodClcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLmNhcHR1cmVGaWxsZWQgPSBmYWxzZVxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIGRyYXdPbkNhbnZhcyAodGFyZ2V0RWxlbWVudCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuX2NhcHR1cmVDYW52YXNcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBjYW52YXMud2lkdGggPSB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoXG4gICAgY2FudmFzLmhlaWdodCA9IHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGFyZ2V0RWxlbWVudCwgMCwgMCwgdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCwgdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQpXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5jYXB0dXJlRmlsbGVkID0gdHJ1ZVxuICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfSlcbiAgfVxuXG4gIGhhbmRsZVN1YnNjcmliZXJFdmVudCAoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1c0V2ZW50ID0gZXZlbnRcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gIH1cblxuICBzdWJzY3JpYmVyRXN0YWJsaXNoZWQgKHN1YnNjcmliZXIsIHZpZXcpIHtcbiAgICBjb25zb2xlLmxvZyhgW1N1YnNjcmliZXJJbWFnZUNhcHR1cmVUZXN0XSBzdWJzY3JpYmVyOiAke3N1YnNjcmliZXJ9LCAke3ZpZXd9YClcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMuX3JlZDVQcm9TdWJzY3JpYmVyLmdldFBsYXliYWNrRWxlbWVudCgpKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB2aXNpYmxlID0gdGhpcy5zdGF0ZS5jYXB0dXJlRmlsbGVkID8gJ2hpZGRlbicgOiAndmlzaWJsZSdcbiAgICBjb25zdCBjYXB0dXJlVGV4dFN0eWxlID0ge1xuICAgICAgJ3Zpc2liaWxpdHknOiB2aXNpYmxlLFxuICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcbiAgICAgICdwYWRkaW5nJzogJzFyZW0nLFxuICAgICAgJ2NvbG9yJzogJyMzMzMzMzMnLFxuICAgICAgJ3dpZHRoJzogJzEwMCUnLFxuICAgICAgJ3RleHQtYWxpZ24nOiAnY2VudGVyJ1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlN1YnNjcmliZXIgSW1hZ2UgQ2FwdHVyZSBUZXN0PC9oMT5cbiAgICAgICAgPGhyIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPjxlbT5zdHJlYW08L2VtPjoge3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX08L2gyPlxuICAgICAgICA8U3Vic2NyaWJlclN0YXR1cyBldmVudD17dGhpcy5zdGF0ZS5zdGF0dXNFdmVudH0gLz5cbiAgICAgICAgPGRpdiBvbkNsaWNrPXt0aGlzLm9uVmlkZW9JbWFnZUNhcHR1cmUuYmluZCh0aGlzKX0+XG4gICAgICAgICAgPFJlZDVQcm9TdWJzY3JpYmVyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJjZW50ZXJlZFwiXG4gICAgICAgICAgICBtZWRpYUNsYXNzTmFtZT1cInZpZGVvLWVsZW1lbnRcIlxuICAgICAgICAgICAgY29uZmlndXJhdGlvbj17dGhpcy5wcm9wcy5zZXR0aW5nc31cbiAgICAgICAgICAgIHN0cmVhbU5hbWU9e3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX1cbiAgICAgICAgICAgIGhvc3Q9e3RoaXMuc3RhdGUudGFyZ2V0SG9zdH1cbiAgICAgICAgICAgIGF1dG9QbGF5PXt0cnVlfVxuICAgICAgICAgICAgc2hvd0NvbnRyb2xzPXt0cnVlfVxuICAgICAgICAgICAgb25TdWJzY3JpYmVyRXN0YWJsaXNoZWQ9e3RoaXMuc3Vic2NyaWJlckVzdGFibGlzaGVkLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBvblN1YnNjcmliZXJFdmVudD17dGhpcy5oYW5kbGVTdWJzY3JpYmVyRXZlbnQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIHJlZj17YyA9PiB0aGlzLl9yZWQ1UHJvU3Vic2NyaWJlciA9IGN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyZWRcIj5cbiAgICAgICAgICA8cCBzdHlsZT17Y2FwdHVyZVRleHRTdHlsZX0+PHNwYW4+Q2xpY2sgdmlkZW8gdG8gY2FwdHVyZSBpbWFnZS48L3NwYW4+PGJyLz48c3Bhbj5Zb3VyIEltYWdlIHdpbGwgYXBwZWFyIGhlcmUuPC9zcGFuPjwvcD5cbiAgICAgICAgICA8Y2FudmFzIHJlZj17YyA9PiB0aGlzLl9jYXB0dXJlQ2FudmFzID0gY30+PC9jYW52YXM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuU3Vic2NyaWJlckltYWdlQ2FwdHVyZVRlc3QucHJvcFR5cGVzID0ge1xuICBzZXR0aW5nczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbkJhY2tDbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufVxuXG5leHBvcnQgZGVmYXVsdCBTdWJzY3JpYmVySW1hZ2VDYXB0dXJlVGVzdFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3Qvc3Vic2NyaWJlL1N1YnNjcmliZXJJbWFnZUNhcHR1cmVUZXN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVkNVByb1N1YnNjcmliZXIgZnJvbSAnLi4vLi4vUmVkNVByb1N1YnNjcmliZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBTdWJzY3JpYmVyU3RhdHVzIGZyb20gJy4uL1N1YnNjcmliZXJTdGF0dXMnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBCYWNrTGluayBmcm9tICcuLi8uLi9CYWNrTGluaycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jbGFzcyBTdWJzY3JpYmVyQ2x1c3RlclRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0YXJnZXRIb3N0OiB1bmRlZmluZWQsXG4gICAgICBzdGF0dXNFdmVudDogdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgcmVxdWVzdEVkZ2UgKCkge1xuICAgIGNvbnN0IGhvc3QgPSB0aGlzLnByb3BzLnNldHRpbmdzLmhvc3RcbiAgICBjb25zdCB1cmwgPSBgaHR0cDovLyR7aG9zdH06NTA4MC9jbHVzdGVyYFxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgc3RhdGUuc3RhdHVzID0gYFJlcXVlc3RpbmcgRWRnZSBmcm9tICR7dXJsfS4uLmBcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGZldGNoKHVybClcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIikgJiZcbiAgICAgICAgICAgIHJlcy5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJ0ZXh0L3BsYWluXCIpID49IDApIHtcbiAgICAgICAgICByZXMudGV4dCgpLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZS5zdWJzdHJpbmcoMCwgdmFsdWUuaW5kZXhPZignOicpKSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJlamVjdChyZXMpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zdCBqc29uRXJyb3IgPSB0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnID8gZXJyb3IgOiBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgMilcbiAgICAgICAgY29uc29sZS5lcnJvcihgW1N1YnNjcmliZXJDbHVzdGVyVGVzdF0gOjogRXJyb3IgLSBDb3VsZCBub3QgcmVxdXN0IEVkZ2UgSVAuICR7anNvbkVycm9yfWApXG4gICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCBjb21wID0gdGhpc1xuICAgIHRoaXMucmVxdWVzdEVkZ2UoKVxuICAgICAgLnRoZW4oaG9zdCA9PiB7XG4gICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgIHN0YXRlLnRhcmdldEhvc3QgPSBob3N0XG4gICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29tcC5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICAgICAgc3RhdGUuc3RhdHVzID0gJ0NvdWxkIG5vdCBzdGFydCBhIHN1YnNjcmlwdGlvbiBzZXNzaW9uLidcbiAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFtTdWJzY3JpYmVyQ2x1c3RlclRlc3RdIDo6IEVycm9yIC0gJHtqc29uRXJyb3J9YClcbiAgICAgIH0pXG4gIH1cblxuICBoYW5kbGVTdWJzY3JpYmVyRXZlbnQgKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS5zdGF0dXNFdmVudCA9IGV2ZW50XG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICB9XG5cbiAgc3Vic2NyaWJlckVzdGFibGlzaGVkIChzdWJzY3JpYmVyLCB2aWV3KSB7XG4gICAgY29uc29sZS5sb2coYFtTdWJzY3JpYmVyQ2x1c3RlclRlc3RdIHN1YnNjcmliZXI6ICR7c3Vic2NyaWJlcn0sICR7dmlld31gKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlN1YnNjcmliZXIgQ2x1c3RlciBUZXN0PC9oMT5cbiAgICAgICAgPGhyIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPjxlbT5zdHJlYW08L2VtPjoge3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX08L2gyPlxuICAgICAgICA8U3Vic2NyaWJlclN0YXR1cyBldmVudD17dGhpcy5zdGF0ZS5zdGF0dXNFdmVudH0gLz5cbiAgICAgICAgPFJlZDVQcm9TdWJzY3JpYmVyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIlxuICAgICAgICAgIG1lZGlhQ2xhc3NOYW1lPVwidmlkZW8tZWxlbWVudFwiXG4gICAgICAgICAgY29uZmlndXJhdGlvbj17dGhpcy5wcm9wcy5zZXR0aW5nc31cbiAgICAgICAgICBzdHJlYW1OYW1lPXt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9XG4gICAgICAgICAgaG9zdD17dGhpcy5zdGF0ZS50YXJnZXRIb3N0fVxuICAgICAgICAgIGF1dG9QbGF5PXt0cnVlfVxuICAgICAgICAgIHNob3dDb250cm9scz17dHJ1ZX1cbiAgICAgICAgICBvblN1YnNjcmliZXJFc3RhYmxpc2hlZD17dGhpcy5zdWJzY3JpYmVyRXN0YWJsaXNoZWQuYmluZCh0aGlzKX1cbiAgICAgICAgICBvblN1YnNjcmliZXJFdmVudD17dGhpcy5oYW5kbGVTdWJzY3JpYmVyRXZlbnQuYmluZCh0aGlzKX1cbiAgICAgICAgICByZWY9e2MgPT4gdGhpcy5fcmVkNVByb1N1YnNjcmliZXIgPSBjfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cblxuU3Vic2NyaWJlckNsdXN0ZXJUZXN0LnByb3BUeXBlcyA9IHtcbiAgc2V0dGluZ3M6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25CYWNrQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3Vic2NyaWJlckNsdXN0ZXJUZXN0XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGVzdC9zdWJzY3JpYmUvU3Vic2NyaWJlckNsdXN0ZXJUZXN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVkNVByb1N1YnNjcmliZXIgZnJvbSAnLi4vLi4vUmVkNVByb1N1YnNjcmliZXInIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBTdWJzY3JpYmVyU3RhdHVzIGZyb20gJy4uL1N1YnNjcmliZXJTdGF0dXMnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBCYWNrTGluayBmcm9tICcuLi8uLi9CYWNrTGluaycgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5jbGFzcyBTdWJzY3JpYmVyU3RyZWFtTWFuYWdlclRlc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0YXJnZXRIb3N0OiB1bmRlZmluZWQsXG4gICAgICBzdGF0dXNFdmVudDogdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgcmVxdWVzdEVkZ2UgKCkge1xuICAgIGNvbnN0IGhvc3QgPSB0aGlzLnByb3BzLnNldHRpbmdzLmhvc3RcbiAgICBjb25zdCBhcHAgPSB0aGlzLnByb3BzLnNldHRpbmdzLmFwcFxuICAgIGNvbnN0IHN0cmVhbU5hbWUgPSB0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTFcbiAgICBjb25zdCB1cmwgPSBgaHR0cDovLyR7aG9zdH06NTA4MC9zdHJlYW1tYW5hZ2VyL2FwaS8xLjAvZXZlbnQvJHthcHB9LyR7c3RyZWFtTmFtZX0/YWN0aW9uPXN1YnNjcmliZWBcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1cyA9IGBSZXF1ZXN0aW5nIEVkZ2UgZnJvbSAke3VybH0uLi5gXG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9KVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBmZXRjaCh1cmwpXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKSAmJlxuICAgICAgICAgICAgcmVzLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImFwcGxpY2F0aW9uL2pzb25cIikgPj0gMCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NvdWxkIG5vdCBwcm9wZXJseSBwYXJzZSByZXNwb25zZS4nKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShqc29uLnNlcnZlckFkZHJlc3MpXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc3QganNvbkVycm9yID0gdHlwZW9mIGVycm9yID09PSAnc3RyaW5nJyA/IGVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgW1N1YnNjcmliZXJTdHJlYW1NYW5hZ2VyVGVzdF0gOjogRXJyb3IgLSBDb3VsZCBub3QgcmVxdWVzdCBFZGdlIElQIGZyb20gU3RyZWFtIE1hbmFnZXIuICR7anNvbkVycm9yfWApXG4gICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgY29tcCA9IHRoaXNcbiAgICB0aGlzLnJlcXVlc3RFZGdlKClcbiAgICAgIC50aGVuKGhvc3QgPT4ge1xuICAgICAgICBjb21wLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgICAgICBzdGF0ZS50YXJnZXRIb3N0ID0gaG9zdFxuICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGNvbXAuc2V0U3RhdGUoc3RhdGUgPT4ge1xuICAgICAgICAgIHN0YXRlLnN0YXR1cyA9ICdFcnJvciAtIENvdWxkIG5vdCBzdGFydCBzdWJzY3JpYmluZyBzZXNzaW9uLidcbiAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5lcnJvcignW1N1YnNjcmliZXJTdHJlYW1NYW5hZ2VyVGVzdF0gOjogRXJyb3IgLSBDb3VsZCBub3Qgc3RhcnQgc3Vic2NyaWJpbmcgc2Vzc2lvbi4nKVxuICAgICAgfSlcbiAgfVxuXG4gIGhhbmRsZVN1YnNjcmliZXJFdmVudCAoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+IHtcbiAgICAgIHN0YXRlLnN0YXR1c0V2ZW50ID0gZXZlbnRcbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH0pXG4gIH1cblxuICBzdWJzY3JpYmVyRXN0YWJsaXNoZWQgKHN1YnNjcmliZXIsIHZpZXcpIHtcbiAgICBjb25zb2xlLmxvZyhgW1N1YnNjcmliZXJTdHJlYW1NYW5hZ2VyVGVzdF0gc3Vic2NyaWJlcjogJHtzdWJzY3JpYmVyfSwgJHt2aWV3fWApXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGNhblN1YnNjcmliZSA9IHRoaXMuc3RhdGUudGFyZ2V0SG9zdCAhPSB1bmRlZmluZWRcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEJhY2tMaW5rIG9uQ2xpY2s9e3RoaXMucHJvcHMub25CYWNrQ2xpY2t9IC8+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlN1YnNjcmliZXIgU3RyZWFtTWFuYWdlciBUZXN0PC9oMT5cbiAgICAgICAgPGhyIC8+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPjxlbT5zdHJlYW08L2VtPjoge3RoaXMucHJvcHMuc2V0dGluZ3Muc3RyZWFtMX08L2gyPlxuICAgICAgICA8U3Vic2NyaWJlclN0YXR1cyBldmVudD17dGhpcy5zdGF0ZS5zdGF0dXNFdmVudH0gLz5cbiAgICAgICAgPFJlZDVQcm9TdWJzY3JpYmVyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY2VudGVyZWRcIlxuICAgICAgICAgIG1lZGlhQ2xhc3NOYW1lPVwidmlkZW8tZWxlbWVudFwiXG4gICAgICAgICAgY29uZmlndXJhdGlvbj17dGhpcy5wcm9wcy5zZXR0aW5nc31cbiAgICAgICAgICBzdHJlYW1OYW1lPXt0aGlzLnByb3BzLnNldHRpbmdzLnN0cmVhbTF9XG4gICAgICAgICAgaG9zdD17dGhpcy5zdGF0ZS50YXJnZXRIb3N0fVxuICAgICAgICAgIGF1dG9TdWJzY3JpYmU9e2NhblN1YnNjcmliZX1cbiAgICAgICAgICBhdXRvUGxheT17dHJ1ZX1cbiAgICAgICAgICBzaG93Q29udHJvbHM9e3RydWV9XG4gICAgICAgICAgb25TdWJzY3JpYmVyRXN0YWJsaXNoZWQ9e3RoaXMuc3Vic2NyaWJlckVzdGFibGlzaGVkLmJpbmQodGhpcyl9XG4gICAgICAgICAgb25TdWJzY3JpYmVyRXZlbnQ9e3RoaXMuaGFuZGxlU3Vic2NyaWJlckV2ZW50LmJpbmQodGhpcyl9XG4gICAgICAgICAgcmVmPXtjID0+IHRoaXMuX3JlZDVQcm9TdWJzY3JpYmVyID0gY31cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG5cblN1YnNjcmliZXJTdHJlYW1NYW5hZ2VyVGVzdC5wcm9wVHlwZXMgPSB7XG4gIHNldHRpbmdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uQmFja0NsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1YnNjcmliZXJTdHJlYW1NYW5hZ2VyVGVzdFxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL3Rlc3Qvc3Vic2NyaWJlL1N1YnNjcmliZXJTdHJlYW1NYW5hZ2VyVGVzdC5qc1xuICoqLyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGNoYW5nZVZpZXcgfSBmcm9tICcuLi8uLi9hY3Rpb25zJ1xuXG5leHBvcnQgZGVmYXVsdCAodGFyZ2V0VGVzdCkgPT4ge1xuXG4gIGNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBzZXR0aW5nczogc3RhdGUuc2V0dGluZ3NcbiAgICB9XG4gIH1cblxuICBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgb25CYWNrQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goY2hhbmdlVmlldygnbGlzdCcpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IFRlc3RDb250YWluZXIgPSBjb25uZWN0KCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xuICApKHRhcmdldFRlc3QpXG5cbiAgcmV0dXJuIDxUZXN0Q29udGFpbmVyIC8+XG5cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29udGFpbmVycy90ZXN0L1Rlc3RDb250YWluZXIuanNcbiAqKi8iLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBjaGFuZ2VWaWV3IH0gZnJvbSAnLi4vLi4vYWN0aW9ucydcblxuZXhwb3J0IGRlZmF1bHQgKHRhcmdldFRlc3QsIHNldHRpbmdzT3ZlcnJpZGUpID0+IHtcblxuICBjb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgc2V0dGluZ3M6IE9iamVjdC5hc3NpZ24oc3RhdGUuc2V0dGluZ3MsIHNldHRpbmdzT3ZlcnJpZGUpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9uQmFja0NsaWNrOiAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoKGNoYW5nZVZpZXcoJ2xpc3QnKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBQdWJsaXNoZXJDb250YWluZXIgPSBjb25uZWN0KCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xuICApKHRhcmdldFRlc3QpXG5cbiAgcmV0dXJuIDxQdWJsaXNoZXJDb250YWluZXIgLz5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb250YWluZXJzL3Rlc3QvUHVibGlzaGVyU2V0dGluZ3NPdmVycmlkZUNvbnRhaW5lci5qc1xuICoqLyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGNoYW5nZVZpZXcgfSBmcm9tICcuLi8uLi9hY3Rpb25zJ1xuXG5leHBvcnQgZGVmYXVsdCAodGFyZ2V0VGVzdCwgc2V0dGluZ3NPdmVycmlkZSkgPT4ge1xuXG4gIGNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBzZXR0aW5nczogT2JqZWN0LmFzc2lnbihzdGF0ZS5zZXR0aW5ncywgc2V0dGluZ3NPdmVycmlkZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgb25CYWNrQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goY2hhbmdlVmlldygnbGlzdCcpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IFN1YnNjcmliZXJDb250YWluZXIgPSBjb25uZWN0KCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xuICApKHRhcmdldFRlc3QpXG5cbiAgcmV0dXJuIDxTdWJzY3JpYmVyQ29udGFpbmVyIC8+XG5cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29udGFpbmVycy90ZXN0L1N1YnNjcmliZXJTZXR0aW5nc092ZXJyaWRlQ29udGFpbmVyLmpzXG4gKiovIiwiLyogZ2xvYmFsIFRFU1RCRURfVkVSU0lPTiAqL1xuLy8gVEVTVEJFRF9WRVJTSU9OIGluamVjdGVkIGZyb20gd2VicGFjay5cbmltcG9ydCB7IENoaWxkcmVuIH0gZnJvbSAncmVhY3QnXG5cbmNvbnN0IEFwcCA9ICh7IHBhZ2UgfSkgPT4gKFxuICA8ZGl2PlxuICAgIDxwIGNsYXNzTmFtZT1cInZlcnNpb24tZmllbGRcIj5UZXN0YmVkIFZlcnNpb246IHtURVNUQkVEX1ZFUlNJT059PC9wPlxuICAgIHtDaGlsZHJlbi5vbmx5KHBhZ2UpfVxuICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgQXBwXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvQXBwLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwic2V0dGluZ3NcIjoge1xuXHRcdFwiaG9zdFwiOiBcImxvY2FsaG9zdFwiLFxuXHRcdFwicG9ydFwiOiA4NTU0LFxuXHRcdFwicnRjcG9ydFwiOiA4MDgxLFxuXHRcdFwicnRtcHBvcnRcIjogMTkzNSxcblx0XHRcImhsc3BvcnRcIjogNTA4MCxcblx0XHRcInN0cmVhbTFcIjogXCJzdHJlYW0xXCIsXG5cdFx0XCJzdHJlYW0yXCI6IFwic3RyZWFtMlwiLFxuXHRcdFwiYXBwXCI6IFwibGl2ZVwiLFxuXHRcdFwiY2FtZXJhV2lkdGhcIjogODU0LFxuXHRcdFwiY2FtZXJhSGVpZ2h0XCI6IDQ4MCxcblx0XHRcInZpZGVvXCI6IHRydWUsXG5cdFx0XCJhdWRpb1wiOiB0cnVlLFxuXHRcdFwiYnVmZmVyXCI6IDAuNSxcblx0XHRcImJpdHJhdGVcIjogMTAwMCxcblx0XHRcInB1Ymxpc2hlckZhaWxvdmVyT3JkZXJcIjogXCJydGMscnRtcFwiLFxuXHRcdFwic3Vic2NyaWJlckZhaWxvdmVyT3JkZXJcIjogXCJydGMscnRtcCxobHNcIixcblx0XHRcImljZVNlcnZlcnNcIjogW1xuXHRcdFx0e1xuXHRcdFx0XHRcInVybHNcIjogXCJzdHVuOnN0dW4yLmwuZ29vZ2xlLmNvbToxOTMwMlwiXG5cdFx0XHR9XG5cdFx0XSxcblx0XHRcInZlcmJvc2VMb2dnaW5nXCI6IHRydWVcblx0fSxcblx0XCJ0ZXN0c1wiOiBbXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiSG9tZVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJQdWJsaXNoXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlB1Ymxpc2ggLSBGYWlsb3ZlclwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBcIkRlbW9uc3RyYXRlcyBmYWlsb3ZlciBvZiBicm93c2VyIHN1cHBvcnQgZm9yIHB1Ymxpc2hpbmcuXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlB1Ymxpc2ggLSAxMDgwcFwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBcIkRlbW9uc3RyYXRpb24gb2YgYXNzaWduaW5nIDEwODBwIHJlc29sdXRpb24gdG8gcHVibGlzaGluZy5cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiUHVibGlzaCAtIEF1ZGlvIE1vZGVcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJEZW1vbnN0cmF0ZXMgQXVkaW8tT25seSBicm9hZGNhc3QgZm9yIHB1Ymxpc2hpbmcuXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlB1Ymxpc2ggLSBDYW1lcmEgU291cmNlXCIsXG5cdFx0XHRcImRlc2NyaXB0aW9uXCI6IFwiRGVtb25zdHJhdGVzIHNlbGVjdGlvbiBvZiBjYW1lcmEgc291cmNlIGZvciBwdWJsaXNoaW5nLlwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJQdWJsaXNoIC0gQ2FtZXJhIFN3YXBcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJEZW1vbnN0cmF0ZXMgc3dhcCBvZiBjYW1lcmEgaW4gZnJvbnQgdG8gcmVhciB3aGVyZSBzdXBwb3J0ZWQgb24gZGV2aWNlIGJyb3dzZXIuXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlB1Ymxpc2ggLSBJbWFnZSBDYXB0dXJlXCIsXG5cdFx0XHRcImRlc2NyaXB0aW9uXCI6IFwiRGVtb25zdHJhdGVzIGNhcHR1cmluZyBhbiBpbWFnZSBvZiBsaXZlIHZpZGVvLlwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJQdWJsaXNoIC0gU3RyZWFtIE1hbmFnZXJcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJEZW1vbnN0cmF0ZXMgYWNjZXNzaW5nIHRhcmdldCBvcmlnaW4gZm9yIGJyb2FkY2FzdCB1c2luZyBTdHJlYW0gTWFuYWdlci5cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiU3Vic2NyaWJlXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlN1YnNjcmliZSAtIEZhaWxvdmVyXCIsXG5cdFx0XHRcImRlc2NyaXB0aW9uXCI6IFwiRGVtb25zdHJhdGVzIGZhaWxvdmVyIG9mIGJyb3dzZXIgc3VwcG9ydCBmb3Igc3Vic2NyaWJpbmcuXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlN1YnNjcmliZSAtIEF1ZGlvIE9ubHlcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJEZW1vbnN0cmF0ZXMgQXVkaW8tT25seSBzdWJzY3JpcHRpb24uXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlN1YnNjcmliZSAtIEltYWdlIENhcHR1cmVcIixcblx0XHRcdFwiZGVzY3JpcHRpb25cIjogXCJEZW1vbnN0cmF0ZXMgY2FwdHVyaW5nIGltYWdlIGZyb20gc3Vic2NyaXB0aW9uLlwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJTdWJzY3JpYmUgLSBDbHVzdGVyXCIsXG5cdFx0XHRcImRlc2NyaXB0aW9uXCI6IFwiRGVtb25zdHJhdGVzIGFjY2Vzc2luZyBFZGdlIElQIGZyb20gQ2x1c3RlciBmb3Igc3Vic2NyaXB0aW9uLlwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJTdWJzY3JpYmUgLSBTdHJlYW0gTWFuYWdlclwiLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBcIkRlbW9uc3RyYXRlcyBhY2Nlc3NpbmcgRWRnZSBJUCBmcm9tIFN0cmVhbSBNYW5hZ2VyIEFQSSBmb3Igc3Vic2NyaXB0aW9uLlwiXG5cdFx0fVxuXHRdXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvcmVzb3VyY2UvdGVzdGJlZC5qc29uXG4gKiogbW9kdWxlIGlkID0gMTM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbmRleC5odG1sXCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9pbmRleC5odG1sXG4gKiogbW9kdWxlIGlkID0gMTQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9