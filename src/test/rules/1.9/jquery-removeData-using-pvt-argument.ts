import { rule } from '../../../rules/1.9/jquery-removeData-using-pvt-argument';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.removeData() using the pvt argument removed in jQuery 1.9';

ruleTester.run('jquery-removeData-using-pvt-argument', rule, {
    valid: [
        '$.removeData(arg1, arg2)'
    ],

    invalid: [
        {
            code: '$.removeData(arg1, arg2, arg3)',
            errors: [{ message }]
        }
    ]
});
