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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! https */ \"https\");\n/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(https__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ \"uuid\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _room_room__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./room/room */ \"./src/room/room.ts\");\n\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0__();\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2__[\"urlencoded\"]({ extended: false }));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2__[\"json\"]());\nconst ENV_DEVELOPMENT = \"development\" === \"development\";\nconsole.log(ENV_DEVELOPMENT ? \"DEVELOPMENT ENVIRONMENT\" : \"PRODUCTION ENVIRONMENT\");\nconst http = new http__WEBPACK_IMPORTED_MODULE_3__[\"Server\"](app);\nconst https = new https__WEBPACK_IMPORTED_MODULE_4__[\"Server\"](app);\nconst io = (() => {\n    return socket_io__WEBPACK_IMPORTED_MODULE_1__(ENV_DEVELOPMENT ? http : https, { path: \"/ws\" });\n})();\nconst roomId = \"/ao\";\nconst defaultRoom = Object(_room_room__WEBPACK_IMPORTED_MODULE_6__[\"Room\"])(roomId, \"Always open\", io.of(roomId));\ndefaultRoom.subscribeEvent(\"room_empty\", () => {\n    defaultRoom.reset();\n});\nconst matches = {\n    [roomId]: defaultRoom,\n};\n//routes\napp.use((req, res, next) => {\n    res.setHeader(\"Access-Control-Allow-Origin\", \"*\");\n    res.setHeader(\"Access-Control-Allow-Methods\", \"GET, POST, PUT, PATCH, DELETE\");\n    res.setHeader(\"Access-Control-Allow-Headers\", \"Origin, X-Requested-With, Content-Type, Accept\");\n    res.setHeader(\"Access-Control-Allow-Credentials\", \"true\");\n    next();\n});\napp.get(\"/api/rooms\", function (req, res) {\n    res.status(200).send(Object.keys(io.nsps)\n        .filter((id) => matches[id])\n        .map((id) => {\n        return {\n            id,\n            name: matches[id].name,\n            players: Object.keys(io.nsps[id].connected).length,\n        };\n    }));\n});\napp.post(\"/api/rooms\", (req, res) => {\n    const name = req.body.name;\n    if (name && name.length > 5) {\n        const id = \"/\" + Object(uuid__WEBPACK_IMPORTED_MODULE_5__[\"v4\"])();\n        matches[id] = Object(_room_room__WEBPACK_IMPORTED_MODULE_6__[\"Room\"])(id, name, io.of(id));\n        matches[id].subscribeEvent(\"room_empty\", () => {\n            delete matches[id];\n        });\n        res.status(201).send({\n            id,\n            name,\n        });\n        return;\n    }\n    res.status(500).send({\n        error: \"Name min length 6\",\n    });\n});\nhttp.listen(8081, function () {\n    console.log(\"started on port 8081\");\n    process.on(\"SIGINT\", closeApp);\n    process.on(\"SIGTERM\", closeApp);\n});\nfunction closeApp() {\n    process.exit(0);\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/math.ts":
/*!*********************!*\
  !*** ./src/math.ts ***!
  \*********************/
/*! exports provided: Size, Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Size\", function() { return Size; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Vector\", function() { return Vector; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n\nclass Size {\n    constructor(xMin, yMin, xMax, yMax) {\n        this.min = new Vector(xMin, yMin);\n        this.max = new Vector(xMax, yMax);\n        this.center = this._getCenter();\n        this.width = this._getWidth();\n        this.height = this._getHeight();\n    }\n    static fromMatter(v) {\n        return new Size(v.min.x, v.min.y, v.max.x, v.max.y);\n    }\n    _getCenter() {\n        return new Vector((this.max.x - this.min.x) / 2 + this.min.x, (this.max.y - this.min.y) / 2 + this.min.y);\n    }\n    _getWidth() {\n        return this.max.x - this.min.x;\n    }\n    _getHeight() {\n        return this.max.y - this.min.y;\n    }\n    multiply(n) {\n        return new Size(this.min.x * n, this.min.y * n, this.max.x * n, this.max.y * n);\n    }\n}\nclass Vector {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n    static fromMatter(v) {\n        return new Vector(v.x, v.y);\n    }\n    module() {\n        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));\n    }\n    director() {\n        return new Vector(this.x !== 0 ? this.x / Math.abs(this.x) : 0, this.y !== 0 ? this.y / Math.abs(this.y) : 0);\n    }\n    normalize() {\n        const module = this.module();\n        if (module > 0)\n            return new Vector(this.x / module, this.y / module);\n        return this;\n    }\n    copy() {\n        return new Vector(this.x, this.y);\n    }\n    setX(x) {\n        return new Vector(x, this.y);\n    }\n    setY(y) {\n        return new Vector(this.x, y);\n    }\n    invert() {\n        return this.multiply(-1);\n    }\n    multiply(n) {\n        return new Vector(this.x * n, this.y * n);\n    }\n    rotate(angle) {\n        return new Vector(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) - this.y * Math.cos(angle));\n    }\n    add(v) {\n        return new Vector(this.x + v.x, this.y + v.y);\n    }\n    substract(v) {\n        return new Vector(this.x - v.x, this.y - v.y);\n    }\n    dot(v) {\n        return this.x * v.x + this.y * v.y;\n    }\n    angle(v = null) {\n        if (!v) {\n            if (this.x === 0 && this.y > 0)\n                return Math.PI / 2;\n            if (this.x === 0 && this.y < 0)\n                return -Math.PI / 2;\n            return Math.atan(this.y / this.x) - (this.x < 0 ? Math.PI : 0);\n        }\n        return Math.acos(this.dot(v) / (this.module() * v.module()));\n    }\n    toArray() {\n        return [this.x, this.y];\n    }\n    round() {\n        return new Vector(Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"round\"])(this.x), Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"round\"])(this.y));\n    }\n    isEqual(v) {\n        return this.x === v.x && this.y === v.y;\n    }\n    serialize() {\n        return {\n            x: this.x,\n            y: this.y,\n        };\n    }\n}\n\n\n//# sourceURL=webpack:///./src/math.ts?");

/***/ }),

/***/ "./src/room/game.ts":
/*!**************************!*\
  !*** ./src/room/game.ts ***!
  \**************************/
/*! exports provided: mapSize, startPosition, Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapSize\", function() { return mapSize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startPosition\", function() { return startPosition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! matter-js */ \"matter-js\");\n/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(matter_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math */ \"./src/math.ts\");\n\n\nconst mapSize = new _math__WEBPACK_IMPORTED_MODULE_1__[\"Size\"](0, 0, 3000, 6000);\nconst startPosition = new _math__WEBPACK_IMPORTED_MODULE_1__[\"Vector\"](100, 50);\nconst timeConstant = 25;\nvar DECKS;\n(function (DECKS) {\n    DECKS[DECKS[\"NAVIGATION\"] = 0] = \"NAVIGATION\";\n    DECKS[DECKS[\"CANNONLEFT\"] = 1] = \"CANNONLEFT\";\n    DECKS[DECKS[\"CANNONRIGHT\"] = 2] = \"CANNONRIGHT\";\n    DECKS[DECKS[\"LIGHTS\"] = 3] = \"LIGHTS\";\n    DECKS[DECKS[\"TORPEDO\"] = 4] = \"TORPEDO\";\n    DECKS[DECKS[\"ENGINEERING\"] = 5] = \"ENGINEERING\";\n})(DECKS || (DECKS = {}));\nconst walls = [\n    matter_js__WEBPACK_IMPORTED_MODULE_0__[\"Bodies\"].rectangle(mapSize.width / 2, -25, mapSize.width, 50, {\n        isStatic: true,\n    }),\n    matter_js__WEBPACK_IMPORTED_MODULE_0__[\"Bodies\"].rectangle(-25, mapSize.height / 2, 50, mapSize.height, {\n        isStatic: true,\n    }),\n    matter_js__WEBPACK_IMPORTED_MODULE_0__[\"Bodies\"].rectangle(mapSize.width + 25, mapSize.height / 2, 50, mapSize.height, {\n        isStatic: true,\n    }),\n    matter_js__WEBPACK_IMPORTED_MODULE_0__[\"Bodies\"].rectangle(mapSize.width / 2, mapSize.height + 25, mapSize.width, 50, {\n        isStatic: true,\n    }),\n];\nconst levelWalls = [\n    matter_js__WEBPACK_IMPORTED_MODULE_0__[\"Bodies\"].rectangle(mapSize.width / 2, 1000 + 25, mapSize.width, 50, {\n        isStatic: true,\n    }),\n    matter_js__WEBPACK_IMPORTED_MODULE_0__[\"Bodies\"].rectangle(mapSize.width / 2, 4000 + 25, mapSize.width, 50, {\n        isStatic: true,\n    }),\n];\nconst fishTypes = [\n    \"AnglerFish\",\n    \"DragonFish\",\n    \"Fangtooth\",\n    \"GiantIsopod\",\n    \"GiantSquid\",\n    \"GiantTubeWorm\",\n    \"GulperEel\",\n    \"Hagfish\",\n    \"Nautilus\",\n    \"SixgillShark\",\n    \"SnipeEel\",\n    \"VampireSquid\",\n];\nfunction getRandomFish(level) {\n    const size = Math.random() * 20 + 5;\n    const x = Math.random() * mapSize.width;\n    const y = Math.random() * [800, 3800, 5800][level] + 100;\n    const fish = matter_js__WEBPACK_IMPORTED_MODULE_0__[\"Bodies\"].circle(x, y, size, {\n        mass: 1,\n    });\n    const type = fishTypes[Math.round(Math.random() * fishTypes.length - 1)];\n    return {\n        type,\n        body: fish,\n        mounted: false,\n        killed: false,\n    };\n}\nfunction getRandomObjectives(fishes) {\n    const availableTypes = fishes.map((fish) => fish.type);\n    const types = [];\n    while (types.length < 2) {\n        const type = Math.round(Math.random() * availableTypes.length);\n        types.push(availableTypes[type]);\n    }\n    return types.map((type) => ({\n        type,\n        amount: Math.round(Math.random() * 4) + 1,\n    }));\n}\nfunction Game() {\n    const engine = matter_js__WEBPACK_IMPORTED_MODULE_0__[\"Engine\"].create();\n    const world = engine.world;\n    world.bounds = mapSize;\n    world.gravity.x = 0;\n    world.gravity.y = 0;\n    let interval;\n    const level = 0;\n    const eventSubscribers = {};\n    let seconds = 0;\n    let startTime = null;\n    let objectives = [];\n    let players = {};\n    const ship = matter_js__WEBPACK_IMPORTED_MODULE_0__[\"Bodies\"].circle(startPosition.x, startPosition.y, 60, {\n        mass: 10,\n        frictionAir: 0.1,\n    });\n    const shipState = {\n        leftCannon: {\n            on: true,\n            angle: 0,\n        },\n        rightCannon: {\n            on: true,\n            angle: 0,\n        },\n        lights: {\n            on: true,\n            angle: 0,\n            length: 100,\n        },\n        torpedos: {\n            on: true,\n        },\n        health: 100,\n    };\n    let fishes = [];\n    function subscribeEvent(eventName, callback) {\n        if (!eventSubscribers[eventName]) {\n            eventSubscribers[eventName] = [callback];\n        }\n        else {\n            eventSubscribers[eventName].push(callback);\n        }\n    }\n    function unsubscribeEvent(eventName, callback) {\n        if (!eventSubscribers[eventName]) {\n            eventSubscribers[eventName] = [];\n        }\n        else {\n            eventSubscribers[eventName] = eventSubscribers[eventName].filter((cb) => cb !== callback);\n        }\n    }\n    function triggerEvent(eventName, ...args) {\n        if (eventSubscribers[eventName]) {\n            eventSubscribers[eventName].forEach((cb) => cb(...args));\n        }\n    }\n    function getAvailableDeck() {\n        const usedDecks = Object.values(players).map((v) => v.deck);\n        const availableDecks = [0, 1, 2, 3, 4].filter((deck) => !usedDecks.includes(deck));\n        return availableDecks[0];\n    }\n    function addPlayer(id, name) {\n        players[id] = {\n            id,\n            name,\n            deck: getAvailableDeck(),\n            dx: 0,\n            dy: 0,\n            isAdmin: Object.values(players).length === 0,\n        };\n    }\n    function getPlayer(id) {\n        return players[id];\n    }\n    function getPlayers() {\n        return players;\n    }\n    function playerKeyDown(id, code) {\n        console.log(\"KEYDOWN\", id, code);\n    }\n    function playerChangeDirection(id, direction) {\n        players[id].dx = direction.dx;\n        players[id].dy = direction.dy;\n    }\n    function playerDeckChange(id, deck) {\n        if (!Object.values(players).some((p) => p.deck === deck)) {\n            players[id].deck = deck;\n            triggerEvent(\"update\", serialize());\n        }\n    }\n    function removePlayer(id) {\n        if (players[id].isAdmin) {\n            Object.keys(players).forEach((id, i) => {\n                if (i === 0)\n                    players[id].isAdmin = true;\n            });\n        }\n        players = Object.keys(players).reduce((result, key) => {\n            if (key !== id)\n                result[key] = players[key];\n            return result;\n        }, {});\n    }\n    function updateShip() {\n        let changed = false;\n        Object.values(players).forEach((player) => {\n            if (player.dx || player.dy) {\n                if (player.deck === DECKS.NAVIGATION) {\n                    matter_js__WEBPACK_IMPORTED_MODULE_0__[\"Body\"].applyForce(ship, ship.position, new _math__WEBPACK_IMPORTED_MODULE_1__[\"Vector\"](player.dx, player.dy).normalize().multiply(0.03));\n                    changed = true;\n                }\n                else if (player.deck === DECKS.LIGHTS) {\n                    console.log(\"lights\");\n                    shipState.lights.angle += (player.dx * Math.PI) / 180;\n                    shipState.lights.length -= player.dy * 2;\n                    if (shipState.lights.length < 50)\n                        shipState.lights.length = 50;\n                    else if (shipState.lights.length > 150)\n                        shipState.lights.length = 150;\n                    changed = true;\n                }\n                else if (player.deck === DECKS.CANNONLEFT) {\n                    shipState.leftCannon.angle += (player.dx * Math.PI) / 180;\n                    changed = true;\n                }\n                else if (player.deck === DECKS.CANNONRIGHT) {\n                    shipState.rightCannon.angle += (player.dx * Math.PI) / 180;\n                    changed = true;\n                }\n            }\n        });\n        if (new _math__WEBPACK_IMPORTED_MODULE_1__[\"Vector\"](ship.velocity.x, ship.velocity.y).module() < 0.03) {\n            matter_js__WEBPACK_IMPORTED_MODULE_0__[\"Body\"].setVelocity(ship, new _math__WEBPACK_IMPORTED_MODULE_1__[\"Vector\"](0, 0));\n        }\n        return changed;\n    }\n    function shouldUpdate() {\n        matter_js__WEBPACK_IMPORTED_MODULE_0__[\"Engine\"].update(engine);\n        return updateShip() || world.bodies.some((x) => x.speed > 0);\n    }\n    function timeElapsed() {\n        if (startTime)\n            return Math.trunc((new Date().getTime() - startTime.getTime()) / 1000);\n        return 0;\n    }\n    function changeLevel() {\n        if (level === 0) {\n            matter_js__WEBPACK_IMPORTED_MODULE_0__[\"World\"].remove(world, levelWalls[0]);\n        }\n        else if (level === 1) {\n            matter_js__WEBPACK_IMPORTED_MODULE_0__[\"World\"].remove(world, levelWalls[1]);\n        }\n        const newFishes = new Array(50).fill(0).map((_) => getRandomFish(level));\n        newFishes.forEach((fish) => {\n            matter_js__WEBPACK_IMPORTED_MODULE_0__[\"World\"].add(world, fish.body);\n            fish.mounted = true;\n            fishes.push(fish);\n        });\n        getRandomObjectives(newFishes).forEach((obj) => objectives.push(obj));\n    }\n    function init() {\n        console.log(\"init\");\n        matter_js__WEBPACK_IMPORTED_MODULE_0__[\"World\"].add(world, ship);\n        walls.forEach((wall) => matter_js__WEBPACK_IMPORTED_MODULE_0__[\"World\"].add(world, wall));\n        levelWalls.forEach((wall) => matter_js__WEBPACK_IMPORTED_MODULE_0__[\"World\"].add(world, wall));\n        changeLevel();\n        startTime = new Date();\n        interval = setInterval(() => {\n            if (shouldUpdate() || seconds !== timeElapsed()) {\n                seconds = timeElapsed();\n                triggerEvent(\"update\", serialize());\n            }\n        }, timeConstant);\n    }\n    function reset() {\n        console.log(\"reset\");\n        matter_js__WEBPACK_IMPORTED_MODULE_0__[\"World\"].clear(world, false);\n        objectives = [];\n        fishes = [];\n        startTime = null;\n        clearInterval(interval);\n    }\n    function serialize() {\n        return {\n            seconds,\n            ship: {\n                x: ship.position.x,\n                y: ship.position.y,\n                radius: ship.circleRadius,\n                state: shipState,\n            },\n            players,\n            fishes: fishes\n                .filter((f) => f.mounted)\n                .map((fish) => ({\n                x: fish.body.position.x,\n                y: fish.body.position.y,\n                radius: fish.body.circleRadius,\n                type: fish.type,\n            })),\n        };\n    }\n    return {\n        init,\n        reset,\n        getPlayers,\n        addPlayer,\n        getPlayer,\n        removePlayer,\n        serialize,\n        subscribeEvent,\n        unsubscribeEvent,\n        triggerEvent,\n        playerKeyDown,\n        playerChangeDirection,\n        playerDeckChange,\n    };\n}\n\n\n//# sourceURL=webpack:///./src/room/game.ts?");

/***/ }),

/***/ "./src/room/room.ts":
/*!**************************!*\
  !*** ./src/room/room.ts ***!
  \**************************/
/*! exports provided: Room */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Room\", function() { return Room; });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/room/game.ts\");\n\nfunction Room(id, name, socket) {\n    const game = Object(_game__WEBPACK_IMPORTED_MODULE_0__[\"Game\"])();\n    const eventSubscribers = {};\n    function subscribeEvent(eventName, callback) {\n        if (!eventSubscribers[eventName]) {\n            eventSubscribers[eventName] = [callback];\n        }\n        else {\n            eventSubscribers[eventName].push(callback);\n        }\n    }\n    function unsubscribeEvent(eventName, callback) {\n        if (!eventSubscribers[eventName]) {\n            eventSubscribers[eventName] = [];\n        }\n        else {\n            eventSubscribers[eventName] = eventSubscribers[eventName].filter((cb) => cb !== callback);\n        }\n    }\n    function triggerEvent(eventName, ...args) {\n        if (eventSubscribers[eventName]) {\n            eventSubscribers[eventName].forEach((cb) => cb(...args));\n        }\n    }\n    socket.on(\"connect\", (socket) => {\n        console.log(`player ${socket.id} connected`);\n        if (Object.values(game.getPlayers()).length > 5) {\n            socket.disconnect(true);\n            return;\n        }\n        const { name } = socket.handshake.query;\n        game.addPlayer(socket.id, name);\n        socket.emit(\"login_success\", {\n            self: game.getPlayer(socket.id),\n            players: game.getPlayers(),\n        });\n        socket.broadcast.emit(\"player_join\", game.getPlayer(socket.id));\n        socket.on(\"request_direction_change\", (payload) => {\n            console.log(\"request_direction_change\", payload);\n            game.playerChangeDirection(socket.id, payload);\n        });\n        socket.on(\"start_game\", () => {\n            console.log(\"start_game\");\n            game.init();\n        });\n        socket.on(\"request_kick_player\", (payload) => {\n            console.log(\"request_kick_player\", payload.id);\n            game.removePlayer(payload.id);\n        });\n        socket.on(\"request_key_press\", (payload) => {\n            console.log(\"request_key_press\", payload.code);\n            game.playerKeyDown(socket.id, payload.code);\n        });\n        socket.on(\"request_deck_change\", (payload) => {\n            console.log(\"deck_change\", payload.deck);\n            game.playerDeckChange(socket.id, payload.deck);\n        });\n        socket.on(\"disconnect\", () => {\n            console.log(`player ${socket.id} disconnected`);\n            socket.broadcast.emit(\"player_leave\", { id: socket.id });\n            game.removePlayer(socket.id);\n            if (Object.values(game.getPlayers()).length === 0) {\n                triggerEvent(\"room_empty\");\n            }\n        });\n    });\n    game.subscribeEvent(\"update\", (payload) => {\n        socket.emit(\"update\", payload);\n    });\n    return {\n        id,\n        name,\n        socket,\n        subscribeEvent,\n        unsubscribeEvent,\n        triggerEvent,\n        reset: () => {\n            game.reset();\n        },\n    };\n}\n\n\n//# sourceURL=webpack:///./src/room/room.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: round */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"round\", function() { return round; });\nconst roundingDecimals = 3;\nconst round = (n) => Math.round(n * roundingDecimals) / roundingDecimals;\n\n\n//# sourceURL=webpack:///./src/utils.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

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

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//# sourceURL=webpack:///external_%22https%22?");

/***/ }),

/***/ "matter-js":
/*!****************************!*\
  !*** external "matter-js" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"matter-js\");\n\n//# sourceURL=webpack:///external_%22matter-js%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uuid\");\n\n//# sourceURL=webpack:///external_%22uuid%22?");

/***/ })

/******/ });