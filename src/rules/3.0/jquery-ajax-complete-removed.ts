import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-special-case-deferred-methods-removed-from-jquery-ajax'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isMemberExpression(node.callee, 'complete')) return;

				if (!utils.isHttpCall(node)) {
					if (node.arguments.length === 0) return;

					const arg = node.arguments[0];
					if (utils.isIdentifier(arg)) {
						const argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
						if (!['function', 'undefined'].includes(typeof argValue)) return;
					} else {
						const isFunction = utils.isFunctionExpression(arg) || utils.isArrowFunctionExpression(arg);
						if (!isFunction) return;
					}
				}

				context.report({
					node,
					message: 'jQuery.ajax().complete() removed in jQuery 3.0'
				});
			}
		};
	}
};
