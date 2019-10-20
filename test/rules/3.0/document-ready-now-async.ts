import { rule } from '../../../rules/3.0/document-ready-now-async';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '$(document).ready() handlers are asynchronous in jQuery 3.0';

ruleTester.run('document-ready-now-async', rule, {
    valid: [
        'obj.ready()',
        '$("").ready()'
    ],

    invalid: [
        {
            code: '$(document).ready()',
            errors: [{ message }]
        },
        {
            code: 'jQuery(document).ready()',
            errors: [{ message }]
        },
        {
            code: 'document.ready()',
            errors: [{ message }]
        },
        {
            code: '$document.ready()',
            errors: [{ message }]
        }
    ]
});
