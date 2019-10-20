import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-deprecated-context-and-selector-properties-removed'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			MemberExpression(node: estree.MemberExpression & { parent: estree.Node }) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isIdentifier(node.property, 'context')) return;
				if (utils.isCallExpression(node.parent)) return;

				context.report({
					node,
					message: '.context removed in jQuery 3.0'
				});
			}
		};
	}
};
