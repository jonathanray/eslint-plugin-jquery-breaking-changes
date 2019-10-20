import { rule } from '../../../rules/1.9/jquery-attrFn-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.attrFn removed in jQuery 1.9';

ruleTester.run('jquery-attrFn-removed', rule, {
    valid: [
        'obj.attrFn'
    ],

    invalid: [
        {
            code: '$.attrFn',
            errors: [{ message }]
        },
        {
            code: 'jQuery.attrFn',
            errors: [{ message }]
        }
    ]
});
