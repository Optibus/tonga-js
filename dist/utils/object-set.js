"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSet = void 0;
function chceksum(obj) {
    var str = JSON.stringify(obj);
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        var chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash.toString(16);
}
/**
 * a class that hold an array of objects that each object would be unique
 *
 */
var ObjectSet = /** @class */ (function () {
    function ObjectSet() {
        this.dataArray = [];
        this.dataDict = {};
    }
    ObjectSet.prototype.addMany = function (objects) {
        var _this = this;
        objects.forEach(function (obj) { return _this.add(obj); });
    };
    ObjectSet.prototype.clear = function () {
        this.dataArray = [];
        this.dataDict = {};
    };
    ObjectSet.prototype.add = function (obj) {
        var key = chceksum(obj);
        if (!this.dataDict[key]) {
            this.dataDict[key] = obj;
            this.dataArray.push(obj);
        }
        return this;
    };
    ObjectSet.prototype.size = function () {
        return this.dataArray.length;
    };
    ObjectSet.prototype.getAll = function () {
        return this.dataArray;
    };
    return ObjectSet;
}());
exports.ObjectSet = ObjectSet;
//# sourceMappingURL=object-set.js.map