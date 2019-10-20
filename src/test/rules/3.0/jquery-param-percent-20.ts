import { rule } from '../../../rules/3.0/jquery-param-percent-20';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.param() no longer converts %20 to a plus sign in jQuery 3.0';

ruleTester.run('jquery-param-percent-20', rule, {
    valid: [
        '$.param()',
        'obj.param({})'
    ],

    invalid: [
        {
            code: '$.param({})',
            errors: [{ message }]
        },
        {
            code: '$.param([])',
            errors: [{ message }]
        },
        {
            code: '$.param(obj)',
            errors: [{ message }]
        }
    ]
});
