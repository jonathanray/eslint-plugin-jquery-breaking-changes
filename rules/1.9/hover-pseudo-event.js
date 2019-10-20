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
            url: 'https://jquery.com/upgrade-guide/1.9/#quot-hover-quot-pseudo-event'
        }
    },
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, ['on', 'bind', 'delegate', 'live']))
                    return;
                if (node.arguments.length === 0)
                    return;
                var argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
                if (argValue !== 'hover')
                    return;
                context.report({
                    node: node,
                    message: '"hover" pseudo event replaced with "mouseenter mouseleave" in jQuery 1.9'
                });
            }
        };
    }
};
