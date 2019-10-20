import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'suggestion',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-wrapall-function-only-calls-the-function-once'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isMemberExpression(node.callee, 'wrapAll')) return;

				if (node.arguments.length === 0) return;
				const argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
				if (argValue !== undefined) return;

				context.report({
					node,
					message: '.wrapAll(function) only calls the function once in jQuery 3.0'
				});
			}
		};
	}
};
