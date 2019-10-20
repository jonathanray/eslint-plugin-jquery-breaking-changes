"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
const booleanAttributes = ['allowfullscreen', 'async', 'autofocus', 'autoplay', 'checked', 'compact', 'controls',
    'declare', 'default', 'defaultchecked', 'defaultmuted', 'defaultselected', 'defer', 'disabled', 'enabled',
    'formnovalidate', 'hidden', 'indeterminate', 'inert', 'ismap', 'itemscope', 'loop', 'multiple', 'muted',
    'nohref', 'noresize', 'noshade', 'novalidate', 'nowrap', 'open', 'pauseonexit', 'readonly', 'required', 'reversed',
    'scoped', 'seamless', 'selected', 'sortable', 'truespeed', 'typemustmatch', 'visible'];
exports.rule = {
    meta: {
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-removeattr-no-longer-sets-properties-to-false'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, 'removeAttr'))
                    return;
                if (node.arguments.length === 0)
                    return;
                const arg = node.arguments[0];
                const argValue = utils.getAssignedLiteralValue(arg, context);
                if (typeof argValue === 'string') {
                    if (!booleanAttributes.includes(argValue.toLowerCase()))
                        return;
                }
                else if (utils.isIdentifier(arg)) {
                    const name = arg.name.toLowerCase();
                    const isMatch = booleanAttributes.some((boolAttr) => name.includes(boolAttr));
                    if (!isMatch)
                        return;
                }
                context.report({
                    node,
                    message: '.removeAttr() no longer sets properties to false in jQuery 3.0'
                });
            }
        };
    }
};
