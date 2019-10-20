"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toggle_function_function_removed_1 = require("../../../rules/1.9/toggle-function-function-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.toggle(function, function, ...) removed in jQuery 1.9';
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
            errors: [{ message: message }]
        },
        {
            code: '$("").toggle(callback)',
            errors: [{ message: message }]
        },
        {
            code: '$("").toggle(obj.callback)',
            errors: [{ message: message }]
        }
    ]
});
