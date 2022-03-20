"use strict";
/* eslint-disable @typescript-eslint/ban-types */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounceDeco = exports.throttle = exports.debounce = void 0;
var object_set_1 = require("./object-set");
var DebounceThrottleCreator = /** @class */ (function () {
    function DebounceThrottleCreator(isDebounce) {
        this.isDebounce = isDebounce;
    }
    DebounceThrottleCreator.prototype.createFn = function () {
        var isDebounce = this.isDebounce;
        return function throttleOrDebounce(fn, ms, contextAttributes) {
            var timeoutId;
            var uniqueArgs = new object_set_1.ObjectSet();
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                uniqueArgs.addMany(args);
                if (timeoutId) {
                    if (isDebounce) {
                        clearTimeout(timeoutId);
                    }
                    else {
                        return;
                    }
                }
                timeoutId = setTimeout(function () {
                    fn(uniqueArgs.getAll(), contextAttributes);
                    uniqueArgs.clear();
                    timeoutId = undefined;
                }, ms);
            };
        };
    };
    return DebounceThrottleCreator;
}());
var debounceInstance = new DebounceThrottleCreator(true);
/**
 *  a debounce utility function create debounced function, when finally
 *  called will be called with an array of aggregated unique arguments
 *  debounced function will be called after ms time only when there are no
 *  more invokation to the function
 * @param fn the function to be debounced
 * @param ms how many ms after the last invocation to actually invoke fn
 * @param contextAttributes context
 */
exports.debounce = debounceInstance.createFn();
var throttleInstance = new DebounceThrottleCreator(false);
/**
 *  a throttle utility function create throttled function, when finally
 *  called will be called with an array of aggregated unique arguments.
 *  throttled function will be called after ms time regardless
 *  of invokation that happened during ms.
 * @param fn the function to be debounced
 * @param ms how many ms after the last invocation to actually invoke fn
 * @param contextAttributes context
 */
exports.throttle = throttleInstance.createFn();
function debounceDeco() {
    return function (target, propertyKey, descriptor) {
        var originalFn = descriptor.value;
        descriptor.value = function () {
            var _this = this;
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var returnValue = originalFn.call.apply(originalFn, __spreadArray([this], args, false));
            if (this.debouncedAnal) {
                var callDebounced = function (v) {
                    var typeOfValue = typeof v;
                    if (v === null || ['string', 'number', 'boolean'].includes(typeOfValue)) {
                        _this.debouncedAnal.call(_this, {
                            flagKey: args[0],
                            flagValue: v,
                        });
                    }
                };
                if (((_a = returnValue === null || returnValue === void 0 ? void 0 : returnValue.constructor) === null || _a === void 0 ? void 0 : _a.name) === 'Promise') {
                    returnValue.then(callDebounced);
                }
                else {
                    callDebounced(returnValue);
                }
            }
            return returnValue;
        };
    };
}
exports.debounceDeco = debounceDeco;
//# sourceMappingURL=debounce-throttle.js.map