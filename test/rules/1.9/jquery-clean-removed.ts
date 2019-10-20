import { rule } from '../../../rules/1.9/jquery-clean-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.clean() removed in jQuery 1.9';

ruleTester.run('jquery-clean-removed', rule, {
    valid: [
        'obj.clean()'
    ],

    invalid: [
        {
            code: '$.clean()',
            errors: [{ message }]
        },
        {
            code: '$.clean.apply()',
            errors: [{ message }]
        },
        {
            code: '$.clean.bind()',
            errors: [{ message }]
        },
        {
            code: '$.clean.call()',
            errors: [{ message }]
        }
    ]
});
