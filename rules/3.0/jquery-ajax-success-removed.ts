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
				if (!utils.isMemberExpression(node.callee, ['ajax', 'success'])) return;

				if (utils.isIdentifier(node.callee.property, 'ajax')) {
					if (node.arguments.length === 0) return;

					const arg = utils.getAssignedNode(node.arguments[0], context);
					if (arg === undefined) return false;
					if (!utils.isObjectExpression(arg, 'success')) return;
				}

				context.report({
					node,
					message: 'jQuery.ajax().success() removed in jQuery 3.0'
				});
			}
		};
	}
};
