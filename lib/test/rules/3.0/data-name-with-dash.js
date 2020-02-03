"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_name_with_dash_1 = require("../../../rules/3.0/data-name-with-dash");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '(Optional) Internal data object properties are camelCase (no dashes) in jQuery 3.0';
ruleTester.run('data-name-with-dashes', data_name_with_dash_1.rule, {
    valid: [
        '$("").data("abcDef")',
        {
            code: '$("").data("abc-def")',
            options: [{
                    exclude: ['abc-def']
                }],
        }
    ],
    invalid: [
        {
            code: '$("").data("abc-def")',
            errors: [{ message }]
        }
    ]
});
