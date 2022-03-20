"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnalytics = void 0;
var createAnalytics = function (emitter) {
    var invocationCounter = 0;
    return function (debounceArgs) {
        invocationCounter++;
        emitter.emit('invoked', { debounceArgs: debounceArgs, invocationCounter: invocationCounter });
        return new Promise(function (resolve) {
            resolve();
        });
    };
};
exports.createAnalytics = createAnalytics;
//# sourceMappingURL=utils-for-tests.js.map