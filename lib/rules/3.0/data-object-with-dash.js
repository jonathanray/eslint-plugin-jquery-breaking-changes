"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-data-names-containing-dashes'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            MemberExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node))
                    return;
                const propName = utils.getAssignedLiteralValue(node.property, context);
                if (typeof propName !== 'string')
                    return;
                if (!propName.includes('-'))
                    return;
                const obj = utils.getAssignedNode(node.object, context);
                if (!utils.isCallExpression(obj))
                    return;
                if (!utils.isMemberExpression(obj.callee, 'data'))
                    return;
                context.report({
                    node,
                    message: 'Internal data object properties are camelCase (no dashes) in jQuery 3.0'
                });
            }
        };
    }
};
