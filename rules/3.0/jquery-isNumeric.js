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
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-jquery-isnumeric-and-custom-tostring'
        }
    },
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (node.arguments.length === 0)
                    return;
                if (!utils.isJQueryMemberExpression(node.callee, 'isNumeric'))
                    return;
                var argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
                var argType = typeof argValue;
                if (argType === 'number')
                    return;
                if (argType === 'string')
                    return;
                context.report({
                    node: node,
                    message: 'jQuery.isNumeric() is intended to be used with primitive numbers and strings in jQuery 3.0'
                });
            }
        };
    }
};
