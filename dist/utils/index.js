"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getter = exports._getter = void 0;
/**
 *
 * @param obj Plain object to get data from within
 * @param path the path where value is example: "arr.1" or "obj.str"
 * @returns the value or null if it didn't find
 */
function _getter(obj, path) {
    var arr = path.split('.');
    var value = obj;
    var counter = 0;
    while (counter < arr.length && value) {
        var key = arr[counter];
        value = value[key];
        if (value === null || value === undefined) {
            return null;
        }
        counter++;
    }
    return value;
}
exports._getter = _getter;
function getter(key, log) {
    return function (obj, path) {
        var result = _getter(obj, path);
        if (!key || result != null) {
            return result;
        }
        var newPath = key + "." + path;
        log === null || log === void 0 ? void 0 : log();
        return _getter(obj, newPath);
    };
}
exports.getter = getter;
__exportStar(require("./debounce-throttle"), exports);
__exportStar(require("./object-set"), exports);
//# sourceMappingURL=index.js.map