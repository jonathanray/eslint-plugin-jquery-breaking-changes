"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-undocumented-internal-methods-no-longer-exposed'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isJQueryMemberExpression(node.callee, ['buildFragment', 'domManip', 'swap']))
                    return;
                context.report({
                    node,
                    message: 'Undocumented internal methods no longer exposed in jQuery 3.0'
                });
            }
        };
    }
};
