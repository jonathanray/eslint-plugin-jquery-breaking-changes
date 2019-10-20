"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const requireindex_1 = __importDefault(require("requireindex"));
const rulesPath = path_1.default.resolve(__dirname, 'rules');
const v19rules = requireindex_1.default(path_1.default.resolve(rulesPath, '1.9'));
const v19rulesWithSeverities = createRulesWithDefaultSeverities(v19rules);
const v30rules = requireindex_1.default(path_1.default.resolve(rulesPath, '3.0'));
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
function createRulesWithDefaultSeverities(rules) {
    const entries = {};
    for (const key of Object.keys(rules)) {
        entries[`jquery-breaking-changes/${key}`] = rules[key].meta.type === 'problem' ? 2 : 1;
    }
    return entries;
}
