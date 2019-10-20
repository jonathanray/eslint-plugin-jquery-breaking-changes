import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/1.9/#attr-versus-prop-'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isMemberExpression(node.callee, 'attr')) return;
				if (node.arguments.length === 0) return;
				const argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
				if (argValue !== 'checked') return;

				context.report({
					node,
					message: '.prop("checked", ...) replaces .attr("checked", ...) in jQuery 1.9'
				});
			}
		};
	}
};
