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
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-jquery-quot-quot-and-find-quot-quot-are-invalid-syntax'
        }
    },
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isJQuery(node.callee) && !utils.isMemberExpression(node.callee, 'find'))
                    return;
                if (node.arguments.length === 0)
                    return;
                var argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
                if (argValue !== '#')
                    return;
                context.report({
                    node: node,
                    message: 'jQuery("#") and .find("#") are invalid syntax in jQuery 3.0'
                });
            }
        };
    }
};
