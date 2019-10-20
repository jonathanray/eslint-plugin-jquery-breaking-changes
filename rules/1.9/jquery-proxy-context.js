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
            url: 'https://jquery.com/upgrade-guide/1.9/#jquery-proxy-context'
        }
    },
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isJQueryMemberExpression(node.callee, 'proxy'))
                    return;
                var args = node.arguments;
                var arg1 = utils.getAssignedNode(args[0], context);
                var arg2 = utils.getAssignedNode(args[1], context);
                if (arg1) {
                    if (arg2 && utils.isFunctionExpression(arg1)) {
                        if (utils.isThisExpression(arg2))
                            return;
                    }
                    else if (utils.isThisExpression(arg1))
                        return;
                }
                context.report({
                    node: node,
                    message: 'jQuery.proxy() context changed in jQuery 1.9'
                });
            }
        };
    }
};
