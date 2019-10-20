"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var requireindex_1 = __importDefault(require("requireindex"));
var rulesPath = path_1.default.resolve(__dirname, 'rules');
var v19rules = requireindex_1.default(path_1.default.resolve(rulesPath, '1.9'));
var v19rulesWithSeverities = createRulesWithDefaultSeverities(v19rules);
var v30rules = requireindex_1.default(path_1.default.resolve(rulesPath, '3.0'));
var v30rulesWithSeverities = Object.assign({}, v19rulesWithSeverities, createRulesWithDefaultSeverities(v30rules));
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
    var entries = {};
    for (var _i = 0, _a = Object.keys(rules); _i < _a.length; _i++) {
        var key = _a[_i];
        entries["jquery-breaking-changes/" + key] = rules[key].meta.type === 'problem' ? 2 : 1;
    }
    return entries;
}
