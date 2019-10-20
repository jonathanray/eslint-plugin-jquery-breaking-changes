import { rule } from '../../../rules/1.9/event-relatedNode-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.relatedNode removed in jQuery 1.9';

ruleTester.run('event-relatedNode-removed', rule, {
    valid: [
        'event.originalEvent.relatedNode'
    ],

    invalid: [
        {
            code: 'event.relatedNode',
            errors: [{ message }]
        }
    ]
});
