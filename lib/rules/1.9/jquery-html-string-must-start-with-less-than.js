"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'suggestion',
        docs: {
            url: 'https://jquery.com/upgrade-guide/1.9/#jquery-htmlstring-versus-jquery-selectorstring'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isIdentifier(node.callee))
                    return;
                if (!utils.isJQuery(node.callee))
                    return;
                if (node.arguments.length === 0)
                    return;
                const arg = utils.getAssignedLiteralValue(node.arguments[0], context);
                if (typeof arg !== 'string')
                    return;
                if (arg.startsWith('<'))
                    return;
                if (!arg.includes('<'))
                    return;
                if (!arg.includes('>'))
                    return;
                context.report({
                    node,
                    message: 'jQuery(htmlString) must start with "<" in jQuery 1.9'
                });
            }
        };
    }
};
