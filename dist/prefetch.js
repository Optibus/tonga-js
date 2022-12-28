"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prefetch = void 0;
var base_1 = require("./base");
var utils_1 = require("./utils");
/**
 * Prefetch means the getter will be a sync function,
 * All the data must be fetched before it is ready
 */
var Prefetch = /** @class */ (function (_super) {
    __extends(Prefetch, _super);
    function Prefetch(serverApiFunction, context_attributes, options) {
        if (options === void 0) { options = { isAsync: true }; }
        var _this = _super.call(this, serverApiFunction, context_attributes) || this;
        _this.isReady = false;
        var isAsync = options.isAsync, graveYard = options.graveYard;
        _this.graveYard = graveYard;
        var done = function (result) {
            _this.cache = result;
            _this.isReady = true;
            _this.emit('ready');
        };
        if (isAsync) {
            serverApiFunction.getConfData(context_attributes).then(done);
        }
        else {
            done(serverApiFunction.getConfData(context_attributes));
        }
        return _this;
    }
    /**
     * Synchronous function
     * @param path the path to flag.
     */
    Prefetch.prototype.get = function (path) {
        if (!this.isReady) {
            throw new Error('not ready yet');
        }
        return _super.prototype.get.call(this, path);
    };
    __decorate([
        (0, utils_1.debounceDeco)()
    ], Prefetch.prototype, "get", null);
    return Prefetch;
}(base_1.Base));
exports.Prefetch = Prefetch;
//# sourceMappingURL=prefetch.js.map