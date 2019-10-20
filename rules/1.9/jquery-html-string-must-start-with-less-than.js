"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = {
    meta: {
        type: 'suggestion',
        docs: {
            url: 'https://jquery.com/upgrade-guide/1.9/#jquery-htmlstring-versus-jquery-selectorstring'
        }
    },
    create: function (context) {
        return {
            Literal: function (node) {
                if (typeof node.value !== 'string')
                    return;
                if (node.value.startsWith('<'))
                    return;
                if (!node.value.includes('<'))
                    return;
                if (!node.value.includes('>'))
                    return;
                context.report({
                    node: node,
                    message: 'jQuery(htmlString) must start with "<" in jQuery 1.9'
                });
            }
        };
    }
};
