import { rule } from '../../../rules/1.9/jquery-offset-bodyOffset-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.offset.bodyOffset() removed in jQuery 1.9';

ruleTester.run('jquery-offset-bodyOffset-removed', rule, {
    valid: [
        'obj.bodyOffset()',
        'obj.offset.bodyOffset()'
    ],

    invalid: [
        {
            code: '$.offset.bodyOffset()',
            errors: [{ message }]
        },
        {
            code: '$.offset.bodyOffset.call()',
            errors: [{ message }]
        },
        {
            code: '$.offset.bodyOffset.bind()',
            errors: [{ message }]
        }
    ]
});
