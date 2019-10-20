import { rule } from '../../../rules/3.0/selector-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.selector removed in jQuery 3.0';

ruleTester.run('selector-removed', rule, {
    valid: [
        '$("").selector()',
        'obj.selector()'
    ],

    invalid: [
        {
            code: '$("").selector',
            errors: [{ message }]
        },
        {
            code: 'obj.selector',
            errors: [{ message }]
        }
    ]
});
