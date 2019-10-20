"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'suggestion',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-width-height-css-quot-width-quot-and-css-quot-height-quot-can-return-non-integer-values'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                const args = node.arguments;
                if (utils.isMemberExpression(node.callee, ['height', 'width'])) {
                    if (args.length > 0)
                        return;
                }
                else if (utils.isMemberExpression(node.callee, 'css')) {
                    if (args.length !== 1)
                        return;
                    const arg = args[0];
                    if (utils.isLiteral(arg)) {
                        if (typeof arg.value === 'string' && !includesHeightOrWidth(arg.value))
                            return;
                    }
                    else if (utils.isIdentifier(arg)) {
                        if (!includesHeightOrWidth(arg.name))
                            return;
                    }
                    else if (utils.isMemberExpression(arg) && utils.isIdentifier(arg.property)) {
                        if (!includesHeightOrWidth(arg.property.name))
                            return;
                    }
                }
                else
                    return;
                context.report({
                    node,
                    message: '.width(), .height(), .css("width"), and .css("height") can return non-integer values in jQuery 3.0'
                });
            }
        };
    }
};
function includesHeightOrWidth(value) {
    value = value.toLowerCase();
    if (value.includes('height'))
        return true;
    if (value.includes('width'))
        return true;
    return false;
}
