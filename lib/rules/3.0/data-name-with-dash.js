"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'suggestion',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-data-names-containing-dashes'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, 'data'))
                    return;
                if (node.arguments.length === 0)
                    return;
                const argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
                if (typeof argValue !== 'string')
                    return;
                if (!argValue.includes('-'))
                    return;
                if (utils.shouldExcludeValue(argValue, excludes))
                    return;
                context.report({
                    node,
                    message: '(Optional) Internal data object properties are camelCase (no dashes) in jQuery 3.0'
                });
            }
        };
    }
};
