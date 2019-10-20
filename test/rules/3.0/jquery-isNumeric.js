"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_isNumeric_1 = require("../../../rules/3.0/jquery-isNumeric");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.isNumeric() is intended to be used with primitive numbers and strings in jQuery 3.0';
ruleTester.run('jquery-isNumeric', jquery_isNumeric_1.rule, {
    valid: [
        '$.isNumeric(9)',
        '$.isNumeric("abc")',
        'var x = "9"; $.isNumeric(x);'
    ],
    invalid: [
        {
            code: '$.isNumeric({})',
            errors: [{ message: message }]
        },
        {
            code: '$.isNumeric(variable)',
            errors: [{ message: message }]
        },
        {
            code: '$.isNumeric(obj.prop)',
            errors: [{ message: message }]
        },
        {
            code: '$.isNumeric(null)',
            errors: [{ message: message }]
        },
        {
            code: '$.isNumeric(undefined)',
            errors: [{ message: message }]
        }
    ]
});
