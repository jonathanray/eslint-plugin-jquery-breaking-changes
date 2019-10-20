import { rule } from '../../../rules/1.9/hover-pseudo-event';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '"hover" pseudo event replaced with "mouseenter mouseleave" in jQuery 1.9';

ruleTester.run('', rule, {
    valid: [
        '$("").hover()'
    ],

    invalid: [
        {
            code: '$("").on("hover")',
            errors: [{ message }]
        },
        {
            code: '$("").bind("hover")',
            errors: [{ message }]
        },
        {
            code: '$("").delegate("hover")',
            errors: [{ message }]
        },
        {
            code: '$("").live("hover")',
            errors: [{ message }]
        }
    ]
});
