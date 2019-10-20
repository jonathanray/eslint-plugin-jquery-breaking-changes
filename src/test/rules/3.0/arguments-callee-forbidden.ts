import { rule } from '../../../rules/3.0/arguments-callee-forbidden';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery 3.0 runs in Strict Mode. Strict mode forbids use of arguments.callee';

ruleTester.run('arguments-callee-forbidden', rule, {
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
