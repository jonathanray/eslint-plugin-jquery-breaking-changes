import { rule } from '../../../rules/3.0/size-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.size() removed in jQuery 3.0';

ruleTester.run('size-removed', rule, {
    valid: [
        'obj.size',
        'obj.size(100)'
    ],

    invalid: [
        {
            code: '$("").size()',
            errors: [{ message }]
        },
        {
            code: 'obj.size()',
            errors: [{ message }]
        }
    ]
});
