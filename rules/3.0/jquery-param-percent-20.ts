import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'suggestion',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-jquery-param-no-longer-converts-20-to-a-plus-sign'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isJQueryMemberExpression(node.callee, 'param')) return;
				if (node.arguments.length === 0) return;

				context.report({
					node,
					message: 'jQuery.param() no longer converts %20 to a plus sign in jQuery 3.0'
				});
			}
		};
	}
};
