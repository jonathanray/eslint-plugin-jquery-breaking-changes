import { rule } from '../../../rules/1.9/data-events-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.data("events") removed in jQuery 1.9';

ruleTester.run('data-events-removed', rule, {
    valid: [
        'anyObject.data("notevents")'
    ],

    invalid: [
        {
            code: 'anyObject.data("events")',
            errors: [{ message }]
        }
    ]
});
