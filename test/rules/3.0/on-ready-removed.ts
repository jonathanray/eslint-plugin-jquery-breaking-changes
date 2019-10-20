import { rule } from '../../../rules/3.0/on-ready-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.on("ready", fn) removed in jQuery 3.0';

ruleTester.run('on-ready-removed', rule, {
    valid: [
        '$("").on("notready", function() {})',
    ],

    invalid: [
        {
            code: '$("").on("ready")',
            errors: [{ message }]
        },
        {
            code: '$("").on("ready", function() {})',
            errors: [{ message }]
        }
    ]
});
