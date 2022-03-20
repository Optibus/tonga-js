"use strict";
/**
 *
 * @param obj Plain object to get data from within
 * @param path the path where value is example: "arr.1" or "obj.str"
 * @returns the value or null if it didnt find
 */
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
exports.getter = void 0;
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
__exportStar(require("./debounce-throttle"), exports);
__exportStar(require("./object-set"), exports);
//# sourceMappingURL=index.js.map