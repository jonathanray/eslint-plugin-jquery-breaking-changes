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
        type: 'suggestion',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-load-unload-and-error-removed'
        }
    },
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, ['load', 'unload', 'error']))
                    return;
                if (utils.isIdentifier(node.callee.property)) {
                    var propName = node.callee.property.name;
                    if (propName === 'error') {
                        if (utils.isIdentifier(node.callee.object, 'console'))
                            return;
                        var fullExpression = utils.getFullExpression(node).toLowerCase();
                        if (fullExpression.includes('.ajax()'))
                            return;
                        if (fullExpression.includes('.get()'))
                            return;
                        if (fullExpression.includes('.post()'))
                            return;
                        if (fullExpression.includes('.put()'))
                            return;
                        if (fullExpression.includes('.delete()'))
                            return;
                        if (fullExpression.includes('.success()'))
                            return;
                        if (fullExpression.includes('http'))
                            return;
                    }
                    else if (propName === 'load' && node.arguments.length > 0) {
                        var arg = node.arguments[0];
                        var argValue = utils.getAssignedLiteralValue(arg, context);
                        if (typeof argValue === 'string')
                            return;
                        var fullExpression = utils.getFullExpression(arg).toLowerCase();
                        if (fullExpression.includes('url'))
                            return;
                        if (fullExpression.includes('uri'))
                            return;
                    }
                }
                context.report({
                    node: node,
                    message: '.load(), .unload(), and .error() removed in jQuery 3.0'
                });
            }
        };
    }
};
