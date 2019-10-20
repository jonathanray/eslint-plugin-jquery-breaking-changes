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
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-select-multiple-with-nothing-selected-returns-an-empty-array'
        }
    },
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (node.arguments.length > 0)
                    return;
                if (!utils.isMemberExpression(node.callee, 'val'))
                    return;
                if (utils.isMemberExpression(node.parent) && utils.isCallExpression(node.parent.parent))
                    return;
                if (!utils.couldCompareAgainstNull(node, context))
                    return;
                if (!utils.isBinaryExpression(node.parent)) {
                    var selectors = utils.getJQuerySelectors(node.callee);
                    if (selectors.length) {
                        if (!couldBeSelectMultiple(selectors.join(' ').replace(/  /g, ' ')))
                            return;
                    }
                    else {
                        var rootObj = utils.getRootNode(node.callee);
                        if (rootObj && !couldBeSelectMultiple(rootObj.name))
                            return;
                    }
                }
                context.report({
                    node: node,
                    message: 'select-multiple with nothing selected returns an empty array in jQuery 3.0'
                });
            }
        };
    }
};
function couldBeSelectMultiple(nameOrSelector) {
    if (typeof nameOrSelector !== 'string' || nameOrSelector === '')
        return false;
    nameOrSelector = nameOrSelector.trim().toLowerCase();
    if (!nameOrSelector.includes('select') && !nameOrSelector.includes('dropdown'))
        return false;
    return true;
}
