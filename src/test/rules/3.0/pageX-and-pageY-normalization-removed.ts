import { rule } from '../../../rules/3.0/pageX-and-pageY-normalization-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'event.pageX and event.pageY normalization removed in jQuery 3.0';

ruleTester.run('pageX-and-pageY-normalization-removed', rule, {
    valid: [
        'event.other',
    ],

    invalid: [
        {
            code: 'event.pageX',
            errors: [{ message }]
        },
        {
            code: 'event.pageY',
            errors: [{ message }]
        },
        {
            code: 'obj.pageX',
            errors: [{ message }]
        },
        {
            code: 'obj.pageY',
            errors: [{ message }]
        }
    ]
});
