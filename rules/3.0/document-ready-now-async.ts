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
				if (!utils.isMemberExpression(node.callee, 'ready')) return;

				const obj = node.callee.object;
				if (utils.isIdentifier(obj)) {
					if (!obj.name.toLowerCase().includes('document')) return;
				} else if (utils.isCallExpression(obj)) {
					if (obj.arguments.length === 0) return;
					if (!utils.isIdentifier(obj.arguments[0], 'document')) return;
				}

				context.report({
					node,
					message: '$(document).ready() handlers are asynchronous in jQuery 3.0'
				});
			}
		};
	}
};
