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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DomNodeCollection {\n  constructor(nodes) {\n    // The nodes passed in must always be an Array. NodeList has no\n    // #forEach method, so we need to be able to count on the type of\n    // `nodes` so that we can prevent TypeErrors later on. We therefore\n    // must ensure we only pass the `DomNodeCollection` constructor\n    // Arrays in our core function.\n    this.nodes = nodes;\n  }\n\n  each(cb) {\n    // Our each passes in the node and index in traditional 'forEach' order,\n    // jquery passes in index first and binds the call to the element.\n    this.nodes.forEach(cb);\n  }\n\n  on(eventName, callback) {\n    this.each((node) => {\n      node.addEventListener(eventName, callback);\n      const eventKey = `jqliteEvents-${eventName}`;\n      if (typeof node[eventKey] === \"undefined\") {\n        node[eventKey] = [];\n      }\n      node[eventKey].push(callback);\n    });\n  }\n\n  off(eventName) {\n    this.each((node) => {\n      const eventKey = `jqliteEvents-${eventName}`;\n      if (node[eventKey]) {\n        node[eventKey].forEach((callback) => {\n          node.removeEventListener(eventName, callback);\n        });\n      }\n      node[eventKey] = [];\n    });\n  }\n\n  html(html) {\n    if (typeof html === \"string\") {\n      this.each((node) => {\n        node.innerHTML = html;\n      });\n    } else if (this.nodes.length > 0) {\n      return this.nodes[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.html('');\n  }\n\n  append(children) {\n    if (this.nodes.length === 0) return;\n\n    if (typeof children === 'object' &&\n        !(children instanceof DomNodeCollection)) {\n      // ensure argument is coerced into DomNodeCollection\n      children = $l(children);\n    }\n\n    if (typeof children === \"string\") {\n      this.each((node) => {\n        node.innerHTML += children;\n      });\n    } else if (children instanceof DomNodeCollection) {\n      // You can't append the same child node to multiple parents,\n      // so we must duplicate the child nodes here.\n      this.each((node) => {\n        // The argument to cloneNode indicates whether or not\n        // all children should be cloned.\n        children.each((childNode) => {\n          node.appendChild(childNode.cloneNode(true));\n        });\n      });\n    }\n  }\n\n  remove() {\n    this.each(node => node.parentNode.removeChild(node));\n  }\n\n  attr(key, val) {\n    if (typeof val === \"string\") {\n      this.each(node => node.setAttribute(key, val));\n    } else {\n      return this.nodes[0].getAttribute(key);\n    }\n  }\n\n  addClass(newClass) {\n    this.each(node => node.classList.add(newClass));\n  }\n\n  removeClass(oldClass) {\n    this.each(node => node.classList.remove(oldClass));\n  }\n\n  toggleClass(toggleClass) {\n    this.each(node => node.classList.toggle(toggleClass));\n  }\n\n  find(selector) {\n    let foundNodes = [];\n    this.each((node) => {\n      const nodeList = node.querySelectorAll(selector);\n      foundNodes = foundNodes.concat(Array.from(nodeList));\n    });\n    return new DomNodeCollection(foundNodes);\n  }\n\n  children() {\n    let childNodes = [];\n    this.each((node) => {\n      const childNodeList = node.children;\n      childNodes = childNodes.concat(Array.from(childNodeList));\n    });\n    return new DomNodeCollection(childNodes);\n  }\n\n  parent() {\n    const parentNodes = [];\n    this.each(({ parentNode }) => {\n      // we apply 'visited' property to prevent adding duplicate parents\n      if (!parentNode.visited) {\n        parentNodes.push(parentNode);\n        parentNode.visited = true;\n      }\n    });\n\n    parentNodes.forEach((node) => {\n      node.visited = false;\n    });\n    return new DomNodeCollection(parentNodes);\n  }\n}\n\nmodule.exports = DomNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./lib/dom_node_collection.js\");\n\nconst _docReadyCallbacks = [];\nlet _docReady = false;\n\nwindow.$l = (arg) => {\n  switch (typeof arg) {\n    case \"function\":\n      return registerDocReadyCallback(arg);\n    case \"string\":\n      return getNodesFromDom(arg);\n    case \"object\":\n      if (arg instanceof HTMLElement) {\n        return new DomNodeCollection([arg]);\n      }\n  }\n};\n\n$l.extend = (base, ...otherObjs) => {\n  otherObjs.forEach((obj) => {\n    for (const prop in obj) {\n      base[prop] = obj[prop];\n    }\n  });\n  return base;\n};\n\n$l.ajax = (options) => {\n  const request = new XMLHttpRequest();\n  const defaults = {\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n    method: \"GET\",\n    url: \"\",\n    success: () => {},\n    error: () => {},\n    data: {},\n  };\n  options = $l.extend(defaults, options);\n  options.method = options.method.toUpperCase();\n\n  if (options.method === \"GET\") {\n    // data is query string for get\n    options.url += `?${toQueryString(options.data)}`;\n  }\n\n  request.open(options.method, options.url, true);\n  request.onload = (e) => {\n    // NB: Triggered when request.readyState === XMLHttpRequest.DONE ===  4\n    if (request.status === 200) {\n      options.success(request.response);\n    } else {\n      options.error(request.response);\n    }\n  };\n\n  request.send(JSON.stringify(options.data));\n};\n\n// helper methods\ntoQueryString = (obj) => {\n  let result = \"\";\n  for (const prop in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, prop)) {\n      result += `${prop}=${obj[prop]}&`;\n    }\n  }\n  return result.substring(0, result.length - 1);\n};\n\nregisterDocReadyCallback = (func) => {\n  if (!_docReady) {\n    _docReadyCallbacks.push(func);\n  } else {\n    func();\n  }\n};\n\ngetNodesFromDom = (selector) => {\n  const nodes = document.querySelectorAll(selector);\n  const nodesArray = Array.from(nodes);\n  return new DomNodeCollection(nodesArray);\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  _docReady = true;\n  _docReadyCallbacks.forEach(func => func());\n});\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });