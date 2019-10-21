import * as utils from '../utils';
import * as estree from 'estree';
import * as eslint from 'eslint';

export const rule: eslint.Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			url: 'https://jquery.com/upgrade-guide/3.0/#breaking-change-select-multiple-with-nothing-selected-returns-an-empty-array'
		}
	},
	create: (context) => {
		const excludes = utils.getExcludesFromContextOptions(context);

		return {
			CallExpression(node: estree.CallExpression & { parent: estree.Node & { parent: estree.Node } }) {
				if (utils.shouldExcludeNode(node, excludes)) return;
				if (node.arguments.length > 0) return;
				if (!utils.isMemberExpression(node.callee, 'val')) return;

				if (utils.isMemberExpression(node.parent) && utils.isCallExpression(node.parent.parent)) return;
				if (!utils.couldCompareAgainstNull(node, context)) return;

				if (!utils.isBinaryExpression(node.parent)) {
					const selectors = utils.getJQuerySelectors(node.callee);
					if (selectors.length) {
						if (!couldBeSelectMultiple(selectors.join(' ').replace(/ {2}/g, ' '))) return;
					} else {
						const rootObj = utils.getRootNode(node.callee);
						if (rootObj && !couldBeSelectMultiple(rootObj.name)) return;
					}
				}

				context.report({
					node,
					message: 'select-multiple with nothing selected returns an empty array in jQuery 3.0'
				});
			}
		};
	}
};

function couldBeSelectMultiple(nameOrSelector: string): boolean {
	if (nameOrSelector === '') return false;
	nameOrSelector = nameOrSelector.trim().toLowerCase();

	if (!nameOrSelector.includes('select') && !nameOrSelector.includes('dropdown')) return false;

	return true;
}
