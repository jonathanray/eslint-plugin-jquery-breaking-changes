import { rule } from '../../../rules/3.0/context-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.context removed in jQuery 3.0';

ruleTester.run('context-removed', rule, {
    valid: [
        '$("").context()',
        'obj.context()'
    ],

    invalid: [
        {
            code: '$("").context',
            errors: [{ message }]
        },
        {
            code: 'obj.context',
            errors: [{ message }]
        }
    ]
});
