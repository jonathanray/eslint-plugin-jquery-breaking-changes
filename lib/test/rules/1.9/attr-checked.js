"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attr_checked_1 = require("../../../rules/1.9/attr-checked");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.prop("checked", ...) replaces .attr("checked", ...) in jQuery 1.9';
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
            errors: [{ message }]
        },
        {
            code: '$("").attr("checked")',
            errors: [{ message }]
        },
        {
            code: '$("").attr("checked", "checked")',
            errors: [{ message }]
        },
        {
            code: 'elem.attr("checked", "checked")',
            errors: [{ message }]
        }
    ]
});
