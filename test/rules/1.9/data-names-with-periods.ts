import { rule } from '../../../rules/1.9/data-names-with-periods';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'events not fired by .data("name.with.periods") in jQuery 1.9';

ruleTester.run('data-names-with-periods', rule, {
    valid: [
        '$("").data("something")'
    ],

    invalid: [
        {
            code: '$("").data("abc.def")',
            errors: [{ message }]
        }
    ]
});
