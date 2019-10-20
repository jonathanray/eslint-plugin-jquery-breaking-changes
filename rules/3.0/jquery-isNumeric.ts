import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-jquery-isnumeric-and-custom-tostring'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (node.arguments.length === 0) return;
				if (!utils.isJQueryMemberExpression(node.callee, 'isNumeric')) return;

				const argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
				const argType = typeof argValue;
				if (argType === 'number') return;
				if (argType === 'string') return;

				context.report({
					node,
					message: 'jQuery.isNumeric() is intended to be used with primitive numbers and strings in jQuery 3.0'
				});
			}
		};
	}
};
