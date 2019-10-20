import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'suggestion',
		docs: {
			url: 'https://jquery.com/upgrade-guide/1.9/#jquery-proxy-context'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isJQueryMemberExpression(node.callee, 'proxy')) return;

				const args = node.arguments;
				const arg1 = utils.getAssignedNode(args[0], context);
				const arg2 = utils.getAssignedNode(args[1], context);

				if (arg1) {
					if (arg2 && utils.isFunctionExpression(arg1)) {
						if (utils.isThisExpression(arg2)) return;
					} else if (utils.isThisExpression(arg1)) return;
				}

				context.report({
					node,
					message: 'jQuery.proxy() context changed in jQuery 1.9'
				});
			}
		};
	}
};