"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils = __importStar(require("../utils"));
exports.rule = {
    meta: {
        type: 'problem',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-deprecated-context-and-selector-properties-removed'
        }
    },
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            MemberExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isIdentifier(node.property, 'context'))
                    return;
                if (utils.isCallExpression(node.parent))
                    return;
                context.report({
                    node: node,
                    message: '.context removed in jQuery 3.0'
                });
            }
        };
    }
};
