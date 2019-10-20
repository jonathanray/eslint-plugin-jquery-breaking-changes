"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/1.9/#other-undocumented-properties-and-methods'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            MemberExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isJQueryMemberExpression(node, 'attrFn'))
                    return;
                context.report({
                    node,
                    message: 'jQuery.attrFn removed in jQuery 1.9'
                });
            }
        };
    }
};
