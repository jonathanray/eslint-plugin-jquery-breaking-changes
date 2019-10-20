import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'suggestion',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-hash-in-a-url-is-preserved-in-a-jquery-ajax-call'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (node.arguments.length === 0) return;

				const isAjaxCall = utils.isMemberExpression(node.callee, 'load')
					|| utils.isJQueryMemberExpression(node.callee, ['ajax', 'get', 'getJSON', 'getScript', 'post'])
				if (!isAjaxCall) return;

				const arg = utils.getAssignedNode(node.arguments[0], context);
				if (!urlArgumentContainsHash(arg, context)) return;

				context.report({
					node,
					message: 'Hash in a URL is preserved in a jQuery.ajax() call in jQuery 3.0'
				});
			}
		};
	}
};

function urlArgumentContainsHash(arg: estree.Node, context: eslint.Rule.RuleContext): boolean {
	if (utils.isLiteral(arg) && typeof arg.value === 'string') {
		return arg.value.includes('#');
	}

	if (utils.isObjectExpression(arg)) {
		const urlProperty = arg.properties.find(p => utils.isIdentifier(p.key, 'url'));
		if (urlProperty) return urlArgumentContainsHash(urlProperty.value, context);
	}

	return false;
}
