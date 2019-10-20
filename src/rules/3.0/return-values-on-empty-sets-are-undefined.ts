import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

const affectedMethods = [
	'width', 'height', 'innerWidth', 'innerHeight', 'outerWidth', 'outerHeight', // Dimensional methods
	'offsetTop', 'offsetLeft' // Offset methods
];

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-return-values-on-empty-sets-are-undefined'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression & { parent: estree.Node }) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (node.arguments.length > 0) return;
				if (!utils.isMemberExpression(node.callee, affectedMethods)) return;
				if (utils.isUnaryExpression(node.parent)) return;
				if (!utils.couldCompareAgainstNull(node, context)) return;

				context.report({
					node,
					message: 'Return values on empty sets are undefined in jQuery 3.0'
				});
			}
		};
	}
};
