"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-jquery-quot-quot-and-find-quot-quot-are-invalid-syntax'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isJQuery(node.callee) && !utils.isMemberExpression(node.callee, 'find'))
                    return;
                if (node.arguments.length === 0)
                    return;
                const argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
                if (argValue !== '#')
                    return;
                context.report({
                    node,
                    message: 'jQuery("#") and .find("#") are invalid syntax in jQuery 3.0'
                });
            }
        };
    }
};
