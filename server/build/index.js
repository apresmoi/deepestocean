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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0__();\nconst http = new http__WEBPACK_IMPORTED_MODULE_2__[\"Server\"](app);\nconst io = socket_io__WEBPACK_IMPORTED_MODULE_1__(http, { path: \"/ws\" });\nconst players = {};\nconst ship = { x: 0, y: 0 };\nio.on(\"connect\", (socket) => {\n    console.log(`player ${socket.id} connected`);\n    addPlayer(socket.id, socket.name);\n    socket.emit(\"login_success\", {\n        self: players[socket.id],\n        players: Object.values(players).filter((p) => p.id !== socket.id),\n    });\n    socket.broadcast.emit(\"player_join\", players[socket.id]);\n    socket.on(\"request_direction_change\", (payload) => {\n        console.log(\"request_direction_change\", payload);\n        players[socket.id].dx = payload.dx;\n        players[socket.id].dy = payload.dy;\n    });\n    socket.on(\"request_key_press\", (payload) => {\n        console.log(\"request_key_press\", payload.code);\n    });\n    socket.on(\"request_deck_change\", (payload) => {\n        console.log(\"deck_change\", payload.deck);\n        players[socket.id].deck = payload.deck;\n    });\n    socket.on(\"disconnect\", () => {\n        console.log(`player ${socket.id} disconnected`);\n        socket.broadcast.emit(\"player_leave\", { id: socket.id });\n        delete players[socket.id];\n    });\n});\nconst getAvailableDeck = () => {\n    const usedDecks = Object.values(players).map((v) => v.deck);\n    const availableDecks = [0, 1, 2, 3, 4].filter((deck) => !usedDecks.includes(deck));\n    const rnd = Math.round(Math.random() * (availableDecks.length - 1));\n    return availableDecks[rnd];\n};\nconst addPlayer = (id, name) => {\n    players[id] = {\n        id,\n        name,\n        deck: getAvailableDeck(),\n        dx: 0,\n        dy: 0,\n    };\n};\n//deck 0 = stirring\n//deck 1\n//deck 2\n//deck 3\n//deck 4\nconst updateShip = () => {\n    Object.values(players).forEach((player) => {\n        if (player.dx || player.dy) {\n            if (player.deck === 0) {\n                //stirring\n                console.log(player, ship);\n                ship.x += player.dx;\n                ship.y += player.dy;\n            }\n        }\n    });\n};\nsetInterval(() => {\n    updateShip();\n    io.emit(\"update\", {\n        players,\n        ship,\n    });\n}, 100);\nhttp.listen(8081, function () {\n    console.log(\"started on port 8081\");\n    process.on(\"SIGINT\", closeApp);\n    process.on(\"SIGTERM\", closeApp);\n});\nfunction closeApp() {\n    process.exit(0);\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ })

/******/ });