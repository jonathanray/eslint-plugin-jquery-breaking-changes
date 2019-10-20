import { rule } from '../../../rules/1.9/live-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.live() removed in jQuery 1.9';

ruleTester.run('live-removed', rule, {
    valid: [
    ],

    invalid: [
        {
            code: '$("#test-id").live("click", function() {})',
            errors: [{ message }]
        },
        {
            code: '$(selector).live("click", function() {})',
            errors: [{ message }]
        },
        {
            code: '$(selector).find("").live("click", function() {})',
            errors: [{ message }]
        },
        {
            code: 'jQuery("#test-id").live("click", function() {})',
            errors: [{ message }]
        },
        {
            code: 'jQuery(selector).live("click", function() {})',
            errors: [{ message }]
        },
        {
            code: 'jQuery(selector).find("").live("click", function() {})',
            errors: [{ message }]
        }
    ]
});
