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
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-special-case-deferred-methods-removed-from-jquery-ajax'
        }
    },
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, ['ajax', 'error']))
                    return;
                if (utils.isIdentifier(node.callee.object, 'console'))
                    return;
                if (utils.isIdentifier(node.callee.property, 'ajax')) {
                    if (node.arguments.length === 0)
                        return;
                    var arg = utils.getAssignedNode(node.arguments[0], context);
                    if (arg === undefined)
                        return false;
                    if (!utils.isObjectExpression(arg, 'error'))
                        return;
                }
                context.report({
                    node: node,
                    message: 'jQuery.ajax().error() removed in jQuery 3.0'
                });
            }
        };
    }
};
