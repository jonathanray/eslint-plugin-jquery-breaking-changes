"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arguments_callee_forbidden_1 = require("../../../rules/3.0/arguments-callee-forbidden");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery 3.0 runs in Strict Mode. Strict mode forbids use of arguments.callee';
ruleTester.run('arguments-callee-forbidden', arguments_callee_forbidden_1.rule, {
    valid: [
        'notArguments.callee'
    ],
    invalid: [
        {
            code: 'arguments.callee',
            errors: [{ message }]
        },
        {
            code: 'arguments.callee.caller',
            errors: [{ message }]
        },
        {
            code: 'arguments.callee()',
            errors: [{ message }]
        },
        {
            code: 'arguments.callee().caller',
            errors: [{ message }]
        }
    ]
});
