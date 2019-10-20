import { rule } from '../../../rules/3.0/wrapall-function-only-calls-the-function-once';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.wrapAll(function) only calls the function once in jQuery 3.0';

ruleTester.run('wrapall-function-only-calls-the-function-once', rule, {
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
