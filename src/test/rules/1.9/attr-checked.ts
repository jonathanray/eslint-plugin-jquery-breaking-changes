import { rule } from '../../../rules/1.9/attr-checked';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.prop("checked", ...) replaces .attr("checked", ...) in jQuery 1.9';

ruleTester.run('attr-checked', rule, {
    valid: [
        '$("").prop("checked")',
        '$("").prop("checked", true)',
        '$("").prop("checked", false)',
        '$("").prop("checked", variable)',
    ],

    invalid: [
        {
            code: 'var ch = "checked"; function checkIt() { elem.attr(ch); }',
            errors: [{ message }]
        },
        {
            code: '$("").attr("checked")',
            errors: [{ message }]
        },
        {
            code: '$("").attr("checked", "checked")',
            errors: [{ message }]
        },
        {
            code: 'elem.attr("checked", "checked")',
            errors: [{ message }]
        }
    ]
});
