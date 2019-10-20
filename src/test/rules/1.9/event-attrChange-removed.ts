import { rule } from '../../../rules/1.9/event-attrChange-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.attrChange removed in jQuery 1.9';

ruleTester.run('event-attrChange-removed', rule, {
    valid: [
        'event.originalEvent.attrChange'
    ],

    invalid: [
        {
            code: 'event.attrChange',
            errors: [{ message }]
        }
    ]
});
