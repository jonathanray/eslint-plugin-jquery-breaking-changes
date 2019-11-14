import { rule } from '../../../rules/3.0/data-name-with-dash';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '(Optional) Internal data object properties are camelCase (no dashes) in jQuery 3.0';

ruleTester.run('data-name-with-dashes', rule, {
    valid: [
        '$("").data("abcDef")'
    ],

    invalid: [
        {
            code: '$("").data("abc-def")',
            errors: [{ message }]
        }
    ]
});
