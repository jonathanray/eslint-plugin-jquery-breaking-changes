"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_hash_only_selector_invalid_syntax_1 = require("../../../rules/3.0/jquery-hash-only-selector-invalid-syntax");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery("#") and .find("#") are invalid syntax in jQuery 3.0';
ruleTester.run('jquery-hash-only-selector-invalid-syntax', jquery_hash_only_selector_invalid_syntax_1.rule, {
    valid: [
        '$("#id")',
        '$(document).find("#id")'
    ],
    invalid: [
        {
            code: '$("#")',
            errors: [{ message: message }]
        },
        {
            code: '$(document).find("#")',
            errors: [{ message: message }]
        }
    ]
});
