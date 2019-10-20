import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/1.9/#quot-hover-quot-pseudo-event'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isMemberExpression(node.callee, ['on', 'bind', 'delegate', 'live'])) return;
				if (node.arguments.length === 0) return;
				const argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
				if (argValue !== 'hover') return;

				context.report({
					node,
					message: '"hover" pseudo event replaced with "mouseenter mouseleave" in jQuery 1.9'
				});
			}
		};
	}
};
