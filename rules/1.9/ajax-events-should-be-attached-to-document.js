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
var ajaxEventNames = [
    'ajaxStart',
    'ajaxStop',
    'ajaxSend',
    'ajaxComplete',
    'ajaxError',
    'ajaxSuccess'
];
exports.rule = {
    meta: {
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/1.9/#ajax-events-should-be-attached-to-document'
        }
    },
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee))
                    return;
                if (!utils.isIdentifier(node.callee.property))
                    return;
                if (!ajaxEventNames.includes(node.callee.property.name))
                    return false;
                if (utils.isCallExpression(node.callee.object)) {
                    if (node.callee.object.arguments.length) {
                        var arg = node.callee.object.arguments[0];
                        if (utils.isIdentifier(arg, 'document'))
                            return;
                        if (utils.isMemberExpression(arg)) {
                            if (utils.isIdentifier(arg.property, 'document'))
                                return;
                        }
                    }
                }
                context.report({
                    node: node,
                    message: "." + node.callee.property.name + "() should be attached to document in jQuery 1.9"
                });
            }
        };
    }
};
