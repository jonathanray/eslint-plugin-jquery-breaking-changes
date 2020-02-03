"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/1.9/#attr-versus-prop-'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, 'attr'))
                    return;
                if (node.arguments.length === 0)
                    return;
                const firstArg = node.arguments[0];
                const firstArgValue = utils.getAssignedLiteralValue(firstArg, context);
                const secondArgValue = node.arguments.length > 1
                    ? utils.getAssignedLiteralValue(node.arguments[1], context) : undefined;
                if (utils.isObjectExpression(firstArgValue)) {
                    const hasBooleanProp = firstArgValue.properties
                        .some(p => {
                        const k = utils.getAssignedLiteralValue(p.key, context);
                        return typeof k === 'string' && utils.booleanAttributes.includes(k.toLowerCase());
                    });
                    if (!hasBooleanProp)
                        return;
                }
                else if (typeof firstArgValue === 'string') {
                    if (!utils.booleanAttributes.includes(firstArgValue.toLowerCase()))
                        return;
                }
                else if (typeof secondArgValue === 'string') {
                    if (!utils.booleanAttributes.includes(secondArgValue.toLowerCase()))
                        return;
                }
                else if (firstArgValue === undefined && utils.isIdentifier(firstArg) || utils.isMemberExpression(firstArg)) {
                    const name = utils.getFullExpression(firstArg).toLowerCase();
                    const nameLooksLikeBooleanAttribute = utils.booleanAttributes
                        .some((boolAttr) => name.toLowerCase().includes(boolAttr));
                    if (!nameLooksLikeBooleanAttribute)
                        return;
                }
                context.report({
                    node,
                    message: 'Use .prop(...) instead of .attr(...) for boolean attributes in jQuery 1.9'
                });
            }
        };
    }
};
