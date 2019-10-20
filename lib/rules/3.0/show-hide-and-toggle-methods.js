"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'suggestion',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-show-hide-and-toggle-methods-now-respect-more-stylesheet-changes'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, ['show', 'hide', 'toggle']))
                    return;
                context.report({
                    node,
                    message: '.show(), .hide(), and .toggle() methods now respect more stylesheet changes in jQuery 3.0'
                });
            }
        };
    }
};
