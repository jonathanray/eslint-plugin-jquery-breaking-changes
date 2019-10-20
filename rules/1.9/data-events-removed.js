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
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/1.9/#data-quot-events-quot-'
        }
    },
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, 'data'))
                    return;
                if (node.arguments.length === 0)
                    return;
                var argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
                if (argValue !== 'events')
                    return;
                context.report({
                    node: node,
                    message: '.data("events") removed in jQuery 1.9'
                });
            }
        };
    }
};
