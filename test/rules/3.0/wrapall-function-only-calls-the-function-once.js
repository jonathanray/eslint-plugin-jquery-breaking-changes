"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wrapall_function_only_calls_the_function_once_1 = require("../../../rules/3.0/wrapall-function-only-calls-the-function-once");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.wrapAll(function) only calls the function once in jQuery 3.0';
ruleTester.run('wrapall-function-only-calls-the-function-once', wrapall_function_only_calls_the_function_once_1.rule, {
    valid: [
        '$("").wrapAll("")'
    ],
    invalid: [
        {
            code: '$("").wrapAll(function() {})',
            errors: [{ message: message }]
        },
        {
            code: '$("").wrapAll(callback)',
            errors: [{ message: message }]
        },
        {
            code: '$("").wrapAll(obj.callback)',
            errors: [{ message: message }]
        }
    ]
});
