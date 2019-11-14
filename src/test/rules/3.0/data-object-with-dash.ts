import { rule } from '../../../rules/3.0/data-object-with-dash';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'Internal data object properties are camelCase (no dashes) in jQuery 3.0';

ruleTester.run('data-object-with-dashes', rule, {
    valid: [
        '$("").data()',
        'var abcDef = data["abc-def"]'
    ],

    invalid: [
        {
            code: `
                var someObj = $("").data();
                var abcDef = someObj["abc-def"];`,
            errors: [{ message }]
        },
        {
            code: `
                var someObj = $("").data();
                function doSomething() {
                    var abcDef = someObj["abc-def"];   
                }`,
            errors: [{ message }]
        }
    ]
});
