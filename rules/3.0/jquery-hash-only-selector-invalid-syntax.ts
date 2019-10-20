import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-jquery-quot-quot-and-find-quot-quot-are-invalid-syntax'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isJQuery(node.callee) && !utils.isMemberExpression(node.callee, 'find')) return;
				if (node.arguments.length === 0) return;
				const argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
				if (argValue !== '#') return;

				context.report({
					node,
					message: 'jQuery("#") and .find("#") are invalid syntax in jQuery 3.0'
				});
			}
		};
	}
};
