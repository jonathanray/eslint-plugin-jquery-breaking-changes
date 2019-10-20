import { rule } from '../../../rules/1.9/jquery-sub-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.sub() removed in jQuery 1.9';

ruleTester.run('jquery-sub-removed', rule, {
    valid: [
        'obj.sub()'
    ],

    invalid: [
        {
            code: '$.sub()',
            errors: [{ message }]
        }
    ]
});
