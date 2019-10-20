import { rule } from '../../../rules/1.9/jquery-attr-using-pass-argument';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.attr() using the pass argument removed in jQuery 1.9';

ruleTester.run('jquery-attr-using-pass-argument', rule, {
    valid: [
        '$("").attr(arg1, arg2, arg3)'
    ],

    invalid: [
        {
            code: '$("").attr(arg1, arg2, arg3, arg4)',
            errors: [{ message }]
        }
    ]
});
