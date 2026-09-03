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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        _this.accessedFlags = {};
        _this.contextAttributes = context_attributes;
        if (serverApiFunction.analytics) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            _this.debouncedAnal = (0, utils_1.debounce)(serverApiFunction.analytics, _this.debounceMs, context_attributes);
        }
        return _this;
    }
    Base.prototype.get = function (path) {
        var _a, _b;
        var value = (0, utils_1.getter)((_a = this.graveYard) === null || _a === void 0 ? void 0 : _a.key, (_b = this.graveYard) === null || _b === void 0 ? void 0 : _b.log)(this.cache, path);
        // Recorded here rather than in the subclasses, as this is the only place an actual flag read happens:
        // in pre-fetch mode the cache holds every flag regardless of what the consumer asked for, so the cache
        // cannot tell which flags took part in an operation
        this.accessedFlags[path] = value;
        return value;
    };
    /**
     * The flags that were fetched from this instance through get, mapped to the value they were resolved to.
     * Only explicit get calls are recorded, flags that were merely populated into the cache are not considered
     * accessed. Each flag appears once, holding the value of its last access, in the order it was first accessed
     * @returns a copy of the accessed flags record, so that mutating it does not affect the record
     */
    Base.prototype.getAccessedFlags = function () {
        return __assign({}, this.accessedFlags);
    };
    return Base;
}(events_1.default));
exports.Base = Base;
//# sourceMappingURL=base.js.map