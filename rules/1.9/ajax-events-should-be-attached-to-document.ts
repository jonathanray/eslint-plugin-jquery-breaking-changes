import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

const ajaxEventNames = [
	'ajaxStart',
	'ajaxStop',
	'ajaxSend',
	'ajaxComplete',
	'ajaxError',
	'ajaxSuccess'
];

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/1.9/#ajax-events-should-be-attached-to-document'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isMemberExpression(node.callee)) return;
				if (!utils.isIdentifier(node.callee.property)) return;
				if (!ajaxEventNames.includes(node.callee.property.name)) return false;

				if (utils.isCallExpression(node.callee.object)) {
					if (node.callee.object.arguments.length) {
						const arg = node.callee.object.arguments[0];
						if (utils.isIdentifier(arg, 'document')) return;
						if (utils.isMemberExpression(arg)) {
							if (utils.isIdentifier(arg.property, 'document')) return;
						}
					}
				}

				context.report({
					node,
					message: `.${node.callee.property.name}() should be attached to document in jQuery 1.9`
				});
			}
		};
	}
};
