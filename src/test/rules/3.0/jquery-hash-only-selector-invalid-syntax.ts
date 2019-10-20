import { rule } from '../../../rules/3.0/jquery-hash-only-selector-invalid-syntax';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery("#") and .find("#") are invalid syntax in jQuery 3.0';

ruleTester.run('jquery-hash-only-selector-invalid-syntax', rule, {
    valid: [
        '$("#id")',
        '$(document).find("#id")'
    ],

    invalid: [
        {
            code: '$("#")',
            errors: [{ message }]
        },
        {
            code: '$(document).find("#")',
            errors: [{ message }]
        }
    ]
});
