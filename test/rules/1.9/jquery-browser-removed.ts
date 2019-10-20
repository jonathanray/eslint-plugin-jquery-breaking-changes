import { rule } from '../../../rules/1.9/jquery-browser-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.browser() removed in jQuery 1.9';

ruleTester.run('jquery-browser-removed', rule, {
    valid: [
        'obj.browser()'
    ],

    invalid: [
        {
            code: '$.browser()',
            errors: [{ message }]
        }
    ]
});
