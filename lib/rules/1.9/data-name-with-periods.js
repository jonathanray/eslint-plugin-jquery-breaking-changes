"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'suggestion',
        docs: {
            url: 'https://jquery.com/upgrade-guide/1.9/#events-not-fired-by-the-data-method-names-with-periods'
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
                if (!argValue.includes('.'))
                    return;
                if (utils.shouldExcludeValue(argValue, excludes))
                    return;
                context.report({
                    node,
                    message: 'events not fired by .data("name.with.periods") in jQuery 1.9'
                });
            }
        };
    }
};
