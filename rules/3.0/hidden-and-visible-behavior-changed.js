"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = {
    meta: {
        type: 'suggestion',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-behavior-of-hidden-and-visible'
        }
    },
    create: function (context) {
        return {
            Literal: function (node) {
                if (typeof node.value !== 'string')
                    return;
                if (!node.value.includes(':hidden') && !node.value.includes(':visible'))
                    return;
                context.report({
                    node: node,
                    message: 'Behavior of :hidden and :visible changed in jQuery 3.0'
                });
            }
        };
    }
};
