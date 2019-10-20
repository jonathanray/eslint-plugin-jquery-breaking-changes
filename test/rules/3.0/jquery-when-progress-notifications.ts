import { rule } from '../../../rules/3.0/jquery-when-progress-notifications';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.when() progress notifications not passed along in jQuery 3.0';

ruleTester.run('jquery-when-progress-notifications', rule, {
    valid: [
        'obj.progress()',
        'obj.progress(true)',
        'obj.progress(1)',
        'obj.progress(null)'
    ],

    invalid: [
        {
            code: '$.when().progress()',
            errors: [{ message }]
        },
        {
            code: '$.when().progress(anything)',
            errors: [{ message }]
        },
        {
            code: 'obj.progress(function() {})',
            errors: [{ message }]
        },
        {
            code: 'obj.progress(callback)',
            errors: [{ message }]
        },
        {
            code: 'obj.progress(obj.callback)',
            errors: [{ message }]
        }
    ]
});
