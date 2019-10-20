import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-jquery-3-0-runs-in-strict-mode'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			MemberExpression(node: estree.MemberExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isMemberExpression(node, 'callee', 'arguments')) return;

				context.report({
					node,
					message: 'jQuery 3.0 runs in Strict Mode. Strict mode forbids use of arguments.callee'
				});
			}
		};
	}
};
