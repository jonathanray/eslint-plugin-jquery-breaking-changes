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
        const includeAngularHttp = !!utils.getContextOptions(context)['$http'];
        return {
            CallExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, ['ajax', 'complete']))
                    return;
                if (utils.isIdentifier(node.callee.property, 'ajax')) {
                    if (node.arguments.length === 0)
                        return;
                    const arg = utils.getAssignedNode(node.arguments[0], context);
                    if (arg === undefined)
                        return false;
                    if (!utils.isObjectExpression(arg, 'complete'))
                        return;
                }
                else if (!includeAngularHttp) {
                    const rootNode = utils.getRootNode(node.callee);
                    if (utils.isIdentifier(rootNode, '$http'))
                        return;
                    if (utils.isMemberExpression(rootNode, '$http'))
                        return;
                }
                context.report({
                    node,
                    message: 'jQuery.ajax().complete() removed in jQuery 3.0'
                });
            }
        };
    }
};
