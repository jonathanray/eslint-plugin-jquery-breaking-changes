"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'suggestion',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-outerwidth-or-outerheight-on-window-includes-scrollbar-width-height'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, ['outerHeight', 'outerWidth']))
                    return;
                const obj = node.callee.object;
                if (utils.isIdentifier(obj)) {
                    if (!obj.name.toLowerCase().includes('window'))
                        return;
                }
                else if (utils.isCallExpression(obj)) {
                    if (obj.arguments.length === 0)
                        return;
                    if (!utils.isIdentifier(obj.arguments[0], 'window'))
                        return;
                }
                context.report({
                    node,
                    message: '.outerWidth() or .outerHeight() on window includes scrollbar width/height in jQuery 3.0'
                });
            }
        };
    }
};
