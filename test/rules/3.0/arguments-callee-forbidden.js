"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arguments_callee_forbidden_1 = require("../../../rules/3.0/arguments-callee-forbidden");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery 3.0 runs in Strict Mode. Strict mode forbids use of arguments.callee';
ruleTester.run('arguments-callee-forbidden', arguments_callee_forbidden_1.rule, {
    valid: [
        'notArguments.callee'
    ],
    invalid: [
        {
            code: 'arguments.callee',
            errors: [{ message: message }]
        },
        {
            code: 'arguments.callee.caller',
            errors: [{ message: message }]
        },
        {
            code: 'arguments.callee()',
            errors: [{ message: message }]
        },
        {
            code: 'arguments.callee().caller',
            errors: [{ message: message }]
        }
    ]
});
