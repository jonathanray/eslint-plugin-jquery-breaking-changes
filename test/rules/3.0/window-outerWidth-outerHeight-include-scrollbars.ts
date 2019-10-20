import { rule } from '../../../rules/3.0/window-outerWidth-outerHeight-include-scrollbars';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.outerWidth() or .outerHeight() on window includes scrollbar width/height in jQuery 3.0';

ruleTester.run('window-outerWidth-outerHeight-include-scrollbars', rule, {
    valid: [
        '$("").outerWidth()',
        '$("").outerHeight()',
        'obj.outerWidth()',
        'obj.outerHeight()',
        '$(window).Width()',
        '$(window).Height()',
    ],

    invalid: [
        {
            code: '$(window).outerWidth()',
            errors: [{ message }]
        },
        {
            code: '$(window).outerHeight()',
            errors: [{ message }]
        },
        {
            code: '$window.outerWidth()',
            errors: [{ message }]
        },
        {
            code: '$window.outerHeight()',
            errors: [{ message }]
        }
    ]
});
