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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
var events_1 = __importDefault(require("events"));
var utils_1 = require("./utils");
/**
 * base class that has get function and the cache and creates the debounced
 * analytics function
 */
var Base = /** @class */ (function (_super) {
    __extends(Base, _super);
    function Base(serverApiFunction, context_attributes) {
        var _this = _super.call(this) || this;
        _this.cache = {};
        _this.debounceMs = 1000;
        _this.contextAttributes = context_attributes;
        if (serverApiFunction.analytics) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            _this.debouncedAnal = (0, utils_1.debounce)(serverApiFunction.analytics, _this.debounceMs, context_attributes);
        }
        return _this;
    }
    Base.prototype.get = function (path) {
        return (0, utils_1.getter)(this.cache, path);
    };
    return Base;
}(events_1.default));
exports.Base = Base;
//# sourceMappingURL=base.js.map