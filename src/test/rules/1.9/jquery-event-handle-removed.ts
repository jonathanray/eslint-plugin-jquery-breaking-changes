import { rule } from '../../../rules/1.9/jquery-event-handle-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.event.handle() removed in jQuery 1.9';

ruleTester.run('jquery-event-handle-removed', rule, {
    valid: [
            'obj.handle()',
            'obj.event.handle()'
    ],

    invalid: [
        {
            code: '$.event.handle()',
            errors: [{ message }]
        },
        {
            code: '$.event.handle.call()',
            errors: [{ message }]
        },
        {
            code: '$.event.handle.bind()',
            errors: [{ message }]
        },
        {
            code: '$.event.handle.apply()',
            errors: [{ message }]
        }
    ]
});
