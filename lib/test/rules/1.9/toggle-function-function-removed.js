"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toggle_function_function_removed_1 = require("../../../rules/1.9/toggle-function-function-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.toggle(function, function, ...) removed in jQuery 1.9';
ruleTester.run('toggle-function-function-removed', toggle_function_function_removed_1.rule, {
    valid: [
        '$("").toggle()',
        '$("").toggle(100, function() {})',
        '$("").toggle({}, function() {})',
        '$("").toggle(true, function() {})',
        'jQuery("").toggle()'
    ],
    invalid: [
        {
            code: '$("").toggle(function() {})',
            errors: [{ message }]
        },
        {
            code: '$("").toggle(callback)',
            errors: [{ message }]
        },
        {
            code: '$("").toggle(obj.callback)',
            errors: [{ message }]
        }
    ]
});
