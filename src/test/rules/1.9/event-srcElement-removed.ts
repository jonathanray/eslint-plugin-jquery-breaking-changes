import { rule } from '../../../rules/1.9/event-srcElement-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.srcElement removed in jQuery 1.9';

ruleTester.run('event-srcElement-removed', rule, {
    valid: [
        'event.originalEvent.srcElement'
    ],

    invalid: [
        {
            code: 'event.srcElement',
            errors: [{ message }]
        }
    ]
});
