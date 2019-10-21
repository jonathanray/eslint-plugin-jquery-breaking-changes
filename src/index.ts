import * as path from 'path';
import * as eslint from 'eslint';

const requireIndex = require('requireindex');

const rulesPath = path.resolve(__dirname, 'rules');

const v19rules = getRulesInDirectory(path.resolve(rulesPath, '1.9'));
const v19rulesWithSeverities = createRulesWithDefaultSeverities(v19rules);

const v30rules = getRulesInDirectory(path.resolve(rulesPath, '3.0'));
const v30rulesWithSeverities = Object.assign({}, v19rulesWithSeverities, createRulesWithDefaultSeverities(v30rules));

export const rules = Object.assign({}, v19rules, v30rules);

export const configs = {
	all: {
		rules: v30rulesWithSeverities
	},
	'3.0': {
		rules: v30rulesWithSeverities
	},
	'1.9': {
		rules: v19rulesWithSeverities
	}
}

function getRulesInDirectory(path: string): Record<string, eslint.Rule.RuleModule> {
	const rules = requireIndex(path);
	for (const key of Object.keys(rules)) {
		rules[key] = rules[key].rule;
	}
	return rules;
}

function createRulesWithDefaultSeverities(rules: Record<string, eslint.Rule.RuleModule>): Record<string, number> {
	const entries: Record<string, number> = {};
	for (const key of Object.keys(rules)) {
		entries[`jquery-breaking-changes/${key}`] = rules[key].meta.type === 'problem' ? 2 : 1;
	}

	return entries;
}
