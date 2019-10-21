"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapAll_function_only_calls_the_function_once_1 = require("../../../rules/3.0/wrapAll-function-only-calls-the-function-once");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.wrapAll(function) only calls the function once in jQuery 3.0';
ruleTester.run('wrapAll-function-only-calls-the-function-once', wrapAll_function_only_calls_the_function_once_1.rule, {
    valid: [
        '$("").wrapAll("")'
    ],
    invalid: [
        {
            code: '$("").wrapAll(function() {})',
            errors: [{ message }]
        },
        {
            code: '$("").wrapAll(callback)',
            errors: [{ message }]
        },
        {
            code: '$("").wrapAll(obj.callback)',
            errors: [{ message }]
        }
    ]
});
