import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'suggestion',
		docs: {
			url: 'https://jquery.com/upgrade-guide/1.9/#jquery-htmlstring-versus-jquery-selectorstring'
		}
	},
	create: (context) => {
		return {
			Literal(node: estree.Literal) {
				if (typeof node.value !== 'string') return;
				if (node.value.startsWith('<')) return;
				if (!node.value.includes('<')) return;
				if (!node.value.includes('>')) return;

				context.report({
					node,
					message: 'jQuery(htmlString) must start with "<" in jQuery 1.9'
				});
			}
		};
	}
};