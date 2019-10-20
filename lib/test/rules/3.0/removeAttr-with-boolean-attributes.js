"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const removeAttr_with_boolean_attributes_1 = require("../../../rules/3.0/removeAttr-with-boolean-attributes");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.removeAttr() no longer sets properties to false in jQuery 3.0';
ruleTester.run('removeAttr-with-boolean-attributes', removeAttr_with_boolean_attributes_1.rule, {
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
