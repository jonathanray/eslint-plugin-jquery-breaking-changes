import { rule } from '../../../rules/3.0/show-hide-and-toggle-methods';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.show(), .hide(), and .toggle() methods now respect more stylesheet changes in jQuery 3.0';

ruleTester.run('show-hide-and-toggle-methods', rule, {
    valid: [
        'obj.show = true'
    ],

    invalid: [
        {
            code: '$("").show()',
            errors: [{ message }]
        },
        {
            code: '$("").hide()',
            errors: [{ message }]
        },
        {
            code: '$("").toggle(true)',
            errors: [{ message }]
        },
        {
            code: 'obj.show()',
            errors: [{ message }]
        },
        {
            code: 'obj.hide()',
            errors: [{ message }]
        },
        {
            code: 'obj.toggle(false)',
            errors: [{ message }]
        }
    ]
});
