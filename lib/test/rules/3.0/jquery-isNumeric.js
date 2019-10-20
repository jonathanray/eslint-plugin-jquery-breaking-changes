"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_isNumeric_1 = require("../../../rules/3.0/jquery-isNumeric");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.isNumeric() is intended to be used with primitive numbers and strings in jQuery 3.0';
ruleTester.run('jquery-isNumeric', jquery_isNumeric_1.rule, {
    valid: [
        '$.isNumeric(9)',
        '$.isNumeric("abc")',
        'var x = "9"; $.isNumeric(x);'
    ],
    invalid: [
        {
            code: '$.isNumeric({})',
            errors: [{ message }]
        },
        {
            code: '$.isNumeric(variable)',
            errors: [{ message }]
        },
        {
            code: '$.isNumeric(obj.prop)',
            errors: [{ message }]
        },
        {
            code: '$.isNumeric(null)',
            errors: [{ message }]
        },
        {
            code: '$.isNumeric(undefined)',
            errors: [{ message }]
        }
    ]
});
