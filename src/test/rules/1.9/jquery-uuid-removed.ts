import { rule } from '../../../rules/1.9/jquery-uuid-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();

const message = 'jQuery.uuid removed in jQuery 1.9';

ruleTester.run('jquery-uuid-removed', rule, {
    valid: [
        'test.uuid'
    ],

    invalid: [
        {
            code: '$.uuid',
            errors: [{ message }]
        }
    ]
});
