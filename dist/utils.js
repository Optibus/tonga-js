"use strict";
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
exports.debounceDeco = exports.debounce = exports.getter = void 0;
function getter(obj, path) {
    var arr = path.split('.');
    var value = obj;
    var counter = 0;
    while (counter < arr.length && value) {
        var key = arr[counter];
        value = value[key];
        if (!value) {
            return null;
        }
        counter++;
    }
    return value;
}
exports.getter = getter;
/**
 *  a debounce utility function create debounced function, when finally
 *  called will be called with an array of aggregated arguments
 * @param fn the function to be debounced
 * @param ms how many ms after the last invocation to actually invoke fn
 * @param contextAttributes context
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function debounce(fn, ms, contextAttributes) {
    var allArgs = [];
    var timeoutId;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        allArgs = allArgs.concat(args);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function () {
            fn(allArgs, contextAttributes);
        }, ms);
    };
}
exports.debounce = debounce;
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
                    if (['string', 'number', 'boolean'].includes(typeOfValue)) {
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
//# sourceMappingURL=utils.js.map