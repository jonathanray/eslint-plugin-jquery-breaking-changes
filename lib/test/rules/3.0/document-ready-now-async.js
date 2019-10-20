"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_ready_now_async_1 = require("../../../rules/3.0/document-ready-now-async");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '$(document).ready() handlers are asynchronous in jQuery 3.0';
ruleTester.run('document-ready-now-async', document_ready_now_async_1.rule, {
    valid: [
        'obj.ready()',
        '$("").ready()'
    ],
    invalid: [
        {
            code: '$(document).ready()',
            errors: [{ message }]
        },
        {
            code: 'jQuery(document).ready()',
            errors: [{ message }]
        },
        {
            code: 'document.ready()',
            errors: [{ message }]
        },
        {
            code: '$document.ready()',
            errors: [{ message }]
        }
    ]
});
