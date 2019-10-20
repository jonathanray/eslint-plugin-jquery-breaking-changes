import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/1.9/#other-undocumented-properties-and-methods'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			MemberExpression(node: estree.MemberExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isJQueryMemberExpression(node, 'attrFn')) return;

				context.report({
					node,
					message: 'jQuery.attrFn removed in jQuery 1.9'
				});
			}
		};
	}
};
