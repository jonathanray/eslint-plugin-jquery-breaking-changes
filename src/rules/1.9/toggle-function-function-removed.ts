import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/1.9/#toggle-function-function-removed'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isMemberExpression(node.callee, 'toggle')) return;
				if (node.arguments.length === 0) return;
				const arg = utils.getAssignedNode(node.arguments[0], context);
				if (utils.isLiteral(arg)) return;
				if (utils.isObjectExpression(arg)) return;

				context.report({
					node,
					message: '.toggle(function, function, ...) removed in jQuery 1.9'
				});
			}
		};
	}
};
