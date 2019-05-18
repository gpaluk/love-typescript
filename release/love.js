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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ServiceRegistry = /** @class */ (function () {
    function ServiceRegistry() {
    }
    ServiceRegistry.addEntity = function (entity, type) {
        if (!this.hasService(type)) {
            this.addService(type);
        }
        var service = this.getService(type);
        service.addEntity(entity);
        return service;
    };
    ServiceRegistry.addService = function (type) {
        var t = new type();
        var service = this._services.get(type.name);
        if (service) {
            return service;
        }
        this._services.set(type.name, t);
        return t;
    };
    ServiceRegistry.removeService = function (type) {
        var service = this._services.get(type.name);
        service.dispose();
        return service;
    };
    ServiceRegistry.getService = function (type) {
        return this._services.get(type.name);
    };
    ServiceRegistry.hasService = function (type) {
        return (this._services.has(type.name));
    };
    ServiceRegistry.update = function () {
        this._services.forEach(function (value, key) {
            value.update();
        });
    };
    ServiceRegistry._services = new Map();
    return ServiceRegistry;
}());
exports.ServiceRegistry = ServiceRegistry;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(2);
var NameComponent = /** @class */ (function (_super) {
    __extends(NameComponent, _super);
    function NameComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = new NameComponentData();
        return _this;
    }
    Object.defineProperty(NameComponent.prototype, "name", {
        get: function () {
            return this._data.name;
        },
        set: function (value) {
            this._data.name = value;
        },
        enumerable: true,
        configurable: true
    });
    return NameComponent;
}(Component_1.Component));
exports.NameComponent = NameComponent;
var NameComponentData = /** @class */ (function () {
    function NameComponentData() {
        this.name = "";
    }
    return NameComponentData;
}());
exports.NameComponentData = NameComponentData;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component = /** @class */ (function () {
    function Component() {
    }
    Object.defineProperty(Component.prototype, "entity", {
        get: function () {
            return this._entity;
        },
        set: function (value) {
            this._entity = value;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.dispose = function () {
        this._entity = null;
    };
    return Component;
}());
exports.Component = Component;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Service = /** @class */ (function () {
    function Service() {
        this._dependencies = new Array();
        this._entities = new Array();
    }
    Service.prototype.addDependency = function (type) {
        if (!this._dependencies.includes(type)) {
            this._dependencies.push(type);
            var name_1 = Object.getPrototypeOf(this).constructor.name;
            console.log("INFO: " + type.name + " automatically registered by " + name_1 + ".");
        }
    };
    Service.prototype.addEntity = function (entity) {
        for (var _i = 0, _a = this._dependencies; _i < _a.length; _i++) {
            var a = _a[_i];
            if (!entity.hasComponent(a)) {
                entity.addComponent(a);
            }
        }
        this._entities.push(entity);
    };
    Service.prototype.removeEntity = function (entity) {
        var pos = this._entities.indexOf(entity);
        if (pos > -1) {
            this._entities.splice(pos, 1);
        }
    };
    Service.prototype.dispose = function () {
        this._entities.length = 0;
    };
    return Service;
}());
exports.Service = Service;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(2);
var ImageComponent = /** @class */ (function (_super) {
    __extends(ImageComponent, _super);
    function ImageComponent() {
        var _this = _super.call(this) || this;
        _this._data = new ImageComponentData();
        _this.image.onload = function (e) { return _this._onImageLoaded(e); };
        _this.image.onerror = function () { return _this._onImageError(); };
        return _this;
    }
    Object.defineProperty(ImageComponent.prototype, "image", {
        get: function () {
            return this._data.image;
        },
        enumerable: true,
        configurable: true
    });
    ImageComponent.prototype.draw = function () {
        console.log("I'm drawing");
    };
    ImageComponent.prototype._onImageLoaded = function (e) {
        console.log("Image loaded: " + this.image.src);
    };
    ImageComponent.prototype._onImageError = function () {
        console.log("Error loading: " + this.image.src);
    };
    return ImageComponent;
}(Component_1.Component));
exports.ImageComponent = ImageComponent;
var ImageComponentData = /** @class */ (function () {
    function ImageComponentData() {
        this.image = document.createElement('img');
    }
    return ImageComponentData;
}());
exports.ImageComponentData = ImageComponentData;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var entity_1 = __webpack_require__(6);
var nameComponent_1 = __webpack_require__(1);
var ServiceRegistry_1 = __webpack_require__(0);
var LogService_1 = __webpack_require__(7);
var RenderService_1 = __webpack_require__(8);
var ImageComponent_1 = __webpack_require__(4);
var entity = new entity_1.Entity();
entity.addComponent(nameComponent_1.NameComponent).name = "Component 1";
entity.addService(LogService_1.LogService);
entity.addService(RenderService_1.RenderService);
entity.getComponent(ImageComponent_1.ImageComponent).image.src = "assets/game.png";
ServiceRegistry_1.ServiceRegistry.update();


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ServiceRegistry_1 = __webpack_require__(0);
var Entity = /** @class */ (function () {
    function Entity() {
        this._components = new Map();
    }
    Object.defineProperty(Entity.prototype, "components", {
        get: function () {
            return this._components;
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.dispose = function () {
        var _this = this;
        this._components.forEach(function (value, key) {
            _this._components.get(key).dispose();
        });
        this._components = null;
    };
    Entity.prototype.addService = function (type) {
        return ServiceRegistry_1.ServiceRegistry.addEntity(this, type);
    };
    Entity.prototype.addComponent = function (type) {
        var c = new type();
        c.entity = this;
        this._components.set(type.name, c);
        return this._components.get(type.name);
    };
    Entity.prototype.getComponent = function (type) {
        return this._components.get(type.name);
    };
    Entity.prototype.removeComponent = function (type) {
        var component = this._components.get(type.name);
        if (component != null) {
            this._components.set(type.name, null);
        }
        return component;
    };
    Entity.prototype.hasComponent = function (type) {
        return (this._components.get(type.name) != null);
    };
    return Entity;
}());
exports.Entity = Entity;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var nameComponent_1 = __webpack_require__(1);
var Service_1 = __webpack_require__(3);
var LogService = /** @class */ (function (_super) {
    __extends(LogService, _super);
    function LogService() {
        var _this = _super.call(this) || this;
        _this.addDependency(nameComponent_1.NameComponent);
        return _this;
    }
    LogService.prototype.update = function () {
        for (var _i = 0, _a = this._entities; _i < _a.length; _i++) {
            var entity = _a[_i];
            console.log("LogService:: " + entity.getComponent(nameComponent_1.NameComponent).name);
        }
    };
    return LogService;
}(Service_1.Service));
exports.LogService = LogService;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = __webpack_require__(3);
var ImageComponent_1 = __webpack_require__(4);
var RenderService = /** @class */ (function (_super) {
    __extends(RenderService, _super);
    function RenderService() {
        var _this = _super.call(this) || this;
        _this.addDependency(ImageComponent_1.ImageComponent);
        return _this;
    }
    RenderService.prototype.update = function () {
        this._entities.forEach(function (value, key) {
            value.getComponent(ImageComponent_1.ImageComponent).draw();
        });
    };
    return RenderService;
}(Service_1.Service));
exports.RenderService = RenderService;


/***/ })
/******/ ]);