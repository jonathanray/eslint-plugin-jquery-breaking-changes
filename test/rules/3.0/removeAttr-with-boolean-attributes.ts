import { rule } from '../../../rules/3.0/removeAttr-with-boolean-attributes';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.removeAttr() no longer sets properties to false in jQuery 3.0';

ruleTester.run('removeAttr-with-boolean-attributes', rule, {
    valid: [
        '$("").removeAttr("data-id")',
        '$("").removeAttr(dataId)',
        'elem.removeAttr("data-id")',
        'elem.removeAttr(dataId)'
    ],

    invalid: [
        {
            code: '$("").removeAttr("checked")',
            errors: [{ message }]
        },
        {
            code: '$("").removeAttr("readonly")',
            errors: [{ message }]
        },
        {
            code: '$("").removeAttr("selected")',
            errors: [{ message }]
        },
        {
            code: '$("").removeAttr(checked)',
            errors: [{ message }]
        },
        {
            code: '$("").removeAttr(readonly)',
            errors: [{ message }]
        },
        {
            code: '$("").removeAttr(selected)',
            errors: [{ message }]
        }
    ]
});
