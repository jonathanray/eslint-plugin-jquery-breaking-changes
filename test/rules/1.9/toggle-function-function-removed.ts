import { rule } from '../../../rules/1.9/toggle-function-function-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.toggle(function, function, ...) removed in jQuery 1.9';

ruleTester.run('toggle-function-function-removed', rule, {
    valid: [
        '$("").toggle()',
        '$("").toggle(100, function() {})',
        '$("").toggle({}, function() {})',
        '$("").toggle(true, function() {})',
        'jQuery("").toggle()'
    ],

    invalid: [
        {
            code: '$("").toggle(function() {})',
            errors: [{ message }]
        },
        {
            code: '$("").toggle(callback)',
            errors: [{ message }]
        },
        {
            code: '$("").toggle(obj.callback)',
            errors: [{ message }]
        }
    ]
});
