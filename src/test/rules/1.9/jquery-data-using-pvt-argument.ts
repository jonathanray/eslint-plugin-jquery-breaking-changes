import { rule } from '../../../rules/1.9/jquery-data-using-pvt-argument';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.data() using the pvt argument removed in jQuery 1.9';

ruleTester.run('jquery-data-using-pvt-argument', rule, {
    valid: [
        '$.data(arg1, arg2, arg3)'
    ],

    invalid: [
        {
            code: '$.data(arg1, arg2, arg3, arg4)',
            errors: [{ message }]
        }
    ]
});
