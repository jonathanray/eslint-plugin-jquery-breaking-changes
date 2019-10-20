import { rule } from '../../../rules/1.9/event-attrName-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.attrName removed in jQuery 1.9';

ruleTester.run('event-attrName-removed', rule, {
    valid: [
        'event.originalEvent.attrName'
    ],

    invalid: [
        {
            code: 'event.attrName',
            errors: [{ message }]
        }
    ]
});
