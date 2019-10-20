"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils = __importStar(require("../utils"));
exports.rule = {
    meta: {
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/1.9/#attr-versus-prop-'
        }
    },
    create: (context) => {
        const excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression(node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, 'attr'))
                    return;
                if (node.arguments.length === 0)
                    return;
                const argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
                if (argValue !== 'checked')
                    return;
                context.report({
                    node,
                    message: '.prop("checked", ...) replaces .attr("checked", ...) in jQuery 1.9'
                });
            }
        };
    }
};