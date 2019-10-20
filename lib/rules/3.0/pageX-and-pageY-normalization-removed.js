"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
exports.rule = {
    meta: {
        type: 'suggestion',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-event-pagex-and-event-pagey-normalization-removed'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            MemberExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node, ['pageX', 'pageY']))
                    return;
                context.report({
                    node,
                    message: 'event.pageX and event.pageY normalization removed in jQuery 3.0'
                });
            }
        };
    }
};
