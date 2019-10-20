import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'suggestion',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-show-hide-and-toggle-methods-now-respect-more-stylesheet-changes'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isMemberExpression(node.callee, ['show', 'hide', 'toggle'])) return;

				context.report({
					node,
					message: '.show(), .hide(), and .toggle() methods now respect more stylesheet changes in jQuery 3.0'
				});
			}
		};
	}
};
