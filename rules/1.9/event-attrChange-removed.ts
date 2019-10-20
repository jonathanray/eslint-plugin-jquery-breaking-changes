import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/1.9/#removed-properties-of-the-event-object'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			MemberExpression(node: estree.MemberExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isIdentifier(node.property, 'attrChange')) return;
				if (utils.isIdentifier(node.object, 'originalEvent')
					|| (utils.isMemberExpression(node.object) && utils.isIdentifier(node.object.property, 'originalEvent'))) return;

				context.report({
					node,
					message: '.attrChange removed in jQuery 1.9'
				});
			}
		};
	}
};
