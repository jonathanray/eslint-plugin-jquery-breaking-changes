import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-removeattr-no-longer-sets-properties-to-false'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isMemberExpression(node.callee, 'removeAttr')) return;

				if (node.arguments.length === 0) return;
				const arg = node.arguments[0];
				const argValue = utils.getAssignedLiteralValue(arg, context);

				if (typeof argValue === 'string') {
					if (!utils.booleanAttributes.includes(argValue.toLowerCase())) return;
				} else if (utils.isIdentifier(arg)) {
					const name = arg.name.toLowerCase();
					const isMatch = utils.booleanAttributes.some((boolAttr) => name.includes(boolAttr));
					if (!isMatch) return;
				}

				context.report({
					node,
					message: '.removeAttr() no longer sets properties to false in jQuery 3.0'
				});
			}
		};
	}
};
