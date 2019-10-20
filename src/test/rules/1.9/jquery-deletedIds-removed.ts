import { rule } from '../../../rules/1.9/jquery-deletedIds-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.deletedIds removed in jQuery 1.9';

ruleTester.run('jquery-deletedIds-removed', rule, {
    valid: [
        'obj.deletedIds'
    ],

    invalid: [
        {
            code: '$.deletedIds',
            errors: [{ message }]
        }
    ]
});
