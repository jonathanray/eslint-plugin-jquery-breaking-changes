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
var booleanAttributes = ['allowfullscreen', 'async', 'autofocus', 'autoplay', 'checked', 'compact', 'controls',
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
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, 'removeAttr'))
                    return;
                if (node.arguments.length === 0)
                    return;
                var arg = node.arguments[0];
                var argValue = utils.getAssignedLiteralValue(arg, context);
                if (typeof argValue === 'string') {
                    if (!booleanAttributes.includes(argValue.toLowerCase()))
                        return;
                }
                else if (utils.isIdentifier(arg)) {
                    var name_1 = arg.name.toLowerCase();
                    var isMatch = booleanAttributes.some(function (boolAttr) { return name_1.includes(boolAttr); });
                    if (!isMatch)
                        return;
                }
                context.report({
                    node: node,
                    message: '.removeAttr() no longer sets properties to false in jQuery 3.0'
                });
            }
        };
    }
};
