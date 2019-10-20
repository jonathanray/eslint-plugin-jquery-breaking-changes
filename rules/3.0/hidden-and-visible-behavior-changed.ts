import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'suggestion',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-behavior-of-hidden-and-visible'
		}
	},
	create: (context) => {
		return {
			Literal(node: estree.Literal) {
				if (typeof node.value !== 'string') return;
				if (!node.value.includes(':hidden') && !node.value.includes(':visible')) return;

				context.report({
					node,
					message: 'Behavior of :hidden and :visible changed in jQuery 3.0'
				});
			}
		};
	}
};
