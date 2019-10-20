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
        type: 'suggestion',
        docs: {
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-hash-in-a-url-is-preserved-in-a-jquery-ajax-call'
        }
    },
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (node.arguments.length === 0)
                    return;
                var isAjaxCall = utils.isMemberExpression(node.callee, 'load')
                    || utils.isJQueryMemberExpression(node.callee, ['ajax', 'get', 'getJSON', 'getScript', 'post']);
                if (!isAjaxCall)
                    return;
                var arg = utils.getAssignedNode(node.arguments[0], context);
                if (!urlArgumentContainsHash(arg, context))
                    return;
                context.report({
                    node: node,
                    message: 'Hash in a URL is preserved in a jQuery.ajax() call in jQuery 3.0'
                });
            }
        };
    }
};
function urlArgumentContainsHash(arg, context) {
    if (utils.isLiteral(arg) && typeof arg.value === 'string') {
        return arg.value.includes('#');
    }
    if (utils.isObjectExpression(arg)) {
        var urlProperty = arg.properties.find(function (p) { return utils.isIdentifier(p.key, 'url'); });
        if (urlProperty)
            return urlArgumentContainsHash(urlProperty.value, context);
    }
    return false;
}
