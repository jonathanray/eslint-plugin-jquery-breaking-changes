"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const requireIndex = require('requireindex');
const rulesPath = path.resolve(__dirname, 'rules');
const v19rules = getRulesInDirectory(path.resolve(rulesPath, '1.9'));
const v19rulesWithSeverities = createRulesWithDefaultSeverities(v19rules);
const v30rules = getRulesInDirectory(path.resolve(rulesPath, '3.0'));
const v30rulesWithSeverities = Object.assign({}, v19rulesWithSeverities, createRulesWithDefaultSeverities(v30rules));
exports.rules = Object.assign({}, v19rules, v30rules);
exports.configs = {
    all: {
        rules: v30rulesWithSeverities
    },
    '3.0': {
        rules: v30rulesWithSeverities
    },
    '1.9': {
        rules: v19rulesWithSeverities
    }
};
function getRulesInDirectory(path) {
    const rules = requireIndex(path);
    for (const key of Object.keys(rules)) {
        rules[key] = rules[key].rule;
    }
    return rules;
}
function createRulesWithDefaultSeverities(rules) {
    const entries = {};
    for (const key of Object.keys(rules)) {
        entries[`jquery-breaking-changes/${key}`] = rules[key].meta.type === 'problem' ? 2 : 1;
    }
    return entries;
}
