import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-undocumented-internal-methods-no-longer-exposed'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isJQueryMemberExpression(node.callee, ['buildFragment', 'domManip', 'swap'])) return;

				context.report({
					node,
					message: 'Undocumented internal methods no longer exposed in jQuery 3.0'
				});
			}
		};
	}
};
