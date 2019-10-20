"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attr_checked_1 = require("../../../rules/1.9/attr-checked");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.prop("checked", ...) replaces .attr("checked", ...) in jQuery 1.9';
ruleTester.run('attr-checked', attr_checked_1.rule, {
    valid: [
        '$("").prop("checked")',
        '$("").prop("checked", true)',
        '$("").prop("checked", false)',
        '$("").prop("checked", variable)',
    ],
    invalid: [
        {
            code: 'var ch = "checked"; function checkIt() { elem.attr(ch); }',
            errors: [{ message: message }]
        },
        {
            code: '$("").attr("checked")',
            errors: [{ message: message }]
        },
        {
            code: '$("").attr("checked", "checked")',
            errors: [{ message: message }]
        },
        {
            code: 'elem.attr("checked", "checked")',
            errors: [{ message: message }]
        }
    ]
});
