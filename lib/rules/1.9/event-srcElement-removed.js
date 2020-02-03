"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/1.9/#removed-properties-of-the-event-object'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            MemberExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isIdentifier(node.property, 'srcElement'))
                    return;
                if (utils.isIdentifier(node.object, 'originalEvent')
                    || (utils.isMemberExpression(node.object) && utils.isIdentifier(node.object.property, 'originalEvent')))
                    return;
                const isPreceededByTarget = utils.isLogicalExpression(node.parent)
                    && utils.isMemberExpression(node.parent.left, 'target')
                    && utils.isIdentifier(node.parent.left.object)
                    && utils.isMemberExpression(node.parent.right, 'srcElement', node.parent.left.object.name);
                if (isPreceededByTarget)
                    return;
                context.report({
                    node,
                    message: '.srcElement removed in jQuery 1.9'
                });
            }
        };
    }
};
