"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils = __importStar(require("../utils"));
exports.rule = {
    meta: {
        type: 'suggestion',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-wrapall-function-only-calls-the-function-once'
        }
    },
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, 'wrapAll'))
                    return;
                if (node.arguments.length === 0)
                    return;
                var argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
                if (argValue !== undefined)
                    return;
                context.report({
                    node: node,
                    message: '.wrapAll(function) only calls the function once in jQuery 3.0'
                });
            }
        };
    }
};
