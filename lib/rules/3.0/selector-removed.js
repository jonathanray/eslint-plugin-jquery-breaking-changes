"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-deprecated-context-and-selector-properties-removed'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            MemberExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isIdentifier(node.property, 'selector'))
                    return;
                if (utils.isCallExpression(node.parent))
                    return;
                context.report({
                    node,
                    message: '.selector removed in jQuery 3.0'
                });
            }
        };
    }
};
