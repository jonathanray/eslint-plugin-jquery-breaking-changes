"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-special-case-deferred-methods-removed-from-jquery-ajax'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, 'complete'))
                    return;
                if (!utils.isHttpCall(node)) {
                    if (node.arguments.length === 0)
                        return;
                    const arg = node.arguments[0];
                    if (utils.isIdentifier(arg)) {
                        const argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
                        if (!['function', 'undefined'].includes(typeof argValue))
                            return;
                    }
                    else {
                        const isFunction = utils.isFunctionExpression(arg) || utils.isArrowFunctionExpression(arg);
                        if (!isFunction)
                            return;
                    }
                }
                context.report({
                    node,
                    message: 'jQuery.ajax().complete() removed in jQuery 3.0'
                });
            }
        };
    }
};
