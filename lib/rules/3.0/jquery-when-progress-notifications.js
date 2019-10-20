"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-jquery-when-progress-notifications'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, 'progress'))
                    return;
                if (node.arguments.length === 0) {
                    if (!utils.isCallExpression(node.callee.object))
                        return;
                    if (!utils.isJQueryMemberExpression(node.callee.object.callee, 'when'))
                        return;
                }
                else {
                    const arg = utils.getAssignedNode(node.arguments[0], context);
                    if (!utils.isIdentifier(arg) && !utils.isFunctionExpression(arg) && !utils.isMemberExpression(arg))
                        return;
                }
                context.report({
                    node,
                    message: 'jQuery.when() progress notifications not passed along in jQuery 3.0'
                });
            }
        };
    }
};
