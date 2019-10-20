import { rule } from '../../../rules/3.0/hidden-and-visible-behavior-changed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'Behavior of :hidden and :visible changed in jQuery 3.0';

ruleTester.run('hidden-and-visible-behavior-changed', rule, {
    valid: [
        '$("#hidden .hidden")',
        '$("#visible .visible")',
        'var selector = "#hidden .hidden"',
        'var selector = "#visible .visible"',
    ],

    invalid: [
        {
            code: '$("div :hidden")',
            errors: [{ message }]
        },
        {
            code: '$("div :visible")',
            errors: [{ message }]
        }, {
            code: 'var selector = ":hidden"',
            errors: [{ message }]
        },
        {
            code: 'var selector = ":visible"',
            errors: [{ message }]
        }
    ]
});
