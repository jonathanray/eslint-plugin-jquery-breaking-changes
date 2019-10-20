import { rule } from '../../../rules/1.9/die-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.die() removed in jQuery 1.9';

ruleTester.run('die-removed', rule, {
    valid: [
    ],

    invalid: [
        {
            code: '$("#test-id").die("click", function() {})',
            errors: [{ message }]
        },
        {
            code: '$(selector).die("click", function() {})',
            errors: [{ message }]
        },
        {
            code: '$(selector).find("").die("click", function() {})',
            errors: [{ message }]
        },
        {
            code: 'jQuery("#test-id").die("click", function() {})',
            errors: [{ message }]
        },
        {
            code: 'jQuery(selector).die("click", function() {})',
            errors: [{ message }]
        },
        {
            code: 'jQuery(selector).find("").die("click", function() {})',
            errors: [{ message }]
        }
    ]
});
