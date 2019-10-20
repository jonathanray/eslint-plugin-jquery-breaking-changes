import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/1.9/#jquery-attr'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (node.arguments.length < 4) return;
				if (!utils.isJQueryMemberExpression(node.callee, 'attr')) return;
				
				context.report({
					node,
					message: '.attr() using the pass argument removed in jQuery 1.9'
				});
			}
		};
	}
};
