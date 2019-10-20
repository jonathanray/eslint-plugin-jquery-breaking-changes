import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-jquery-event-props-and-jquery-event-fixhooks-removed'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			MemberExpression(node: estree.MemberExpression) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (!utils.isJQueryMemberExpression(node, ['props', 'fixHooks'], 'event')) return;

				context.report({
					node,
					message: 'jQuery.event.props and jQuery.event.fixHooks removed in jQuery 3.0'
				});
			}
		};
	}
};
