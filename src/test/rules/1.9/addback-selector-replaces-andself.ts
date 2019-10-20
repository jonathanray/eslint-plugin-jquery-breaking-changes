import { rule } from '../../../rules/1.9/addback-selector-replaces-andself';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.addBack(selector) replaces .andSelf() in jQuery 1.9';

ruleTester.run('addback-selector-replaces-andself', rule, {
    valid: [
    ],

    invalid: [
        {
            code: '$("").andSelf()',
            errors: [{ message }]
        },
        {
            code: 'jQuery(selector).find("").andSelf()',
            errors: [{ message }]
        }
    ]
});
