import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'suggestion',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-document-ready-handlers-are-now-asynchronous'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (node.arguments.length === 0) return;
				if (!utils.isJQuery(node.callee)) return;

				const argValue = utils.getAssignedLiteralValue(node.arguments[0], context);
				if (typeof argValue !== 'string') return;
				if (['html', 'document'].indexOf(argValue) > -1) return;

				const scope = context.getScope();
				if (scope.type !== 'global' && !isIIFE(scope.block)) return;

				context.report({
					node,
					message: 'Root level jQuery selectors may execute before DOM elements exist in jQuery 3.0'
				});
			}
		};

		function isIIFE(node: estree.Node): boolean {
			if (!utils.isFunctionExpression(node)) return false;
			if (!utils.isCallExpression(node.parent)) return false;
			if (!utils.isFunctionExpression(node.parent.callee)) return false;
			if (!utils.isExpressionStatement(node.parent.parent)) return false;

			return true;
		}
	}
};