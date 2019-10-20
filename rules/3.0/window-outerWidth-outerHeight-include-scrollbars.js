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
            url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-outerwidth-or-outerheight-on-window-includes-scrollbar-width-height'
        }
    },
    create: function (context) {
        var excludes = utils.getExcludesFromContextOptions(context);
        return {
            CallExpression: function (node) {
                if (utils.shouldExcludeNode(node, excludes))
                    return;
                if (!utils.isMemberExpression(node.callee, ['outerHeight', 'outerWidth']))
                    return;
                var obj = node.callee.object;
                if (utils.isIdentifier(obj)) {
                    if (!obj.name.toLowerCase().includes('window'))
                        return;
                }
                else if (utils.isCallExpression(obj)) {
                    if (obj.arguments.length === 0)
                        return;
                    if (!utils.isIdentifier(obj.arguments[0], 'window'))
                        return;
                }
                context.report({
                    node: node,
                    message: '.outerWidth() or .outerHeight() on window includes scrollbar width/height in jQuery 3.0'
                });
            }
        };
    }
};
