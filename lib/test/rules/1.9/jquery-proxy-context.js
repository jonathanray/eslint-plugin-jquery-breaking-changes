"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_proxy_context_1 = require("../../../rules/1.9/jquery-proxy-context");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.proxy() context changed in jQuery 1.9';
ruleTester.run('jquery-proxy-context', jquery_proxy_context_1.rule, {
    valid: [
        '$.proxy(function() {}, this)',
        '$.proxy(this, "name")',
        'obj.proxy()',
    ],
    invalid: [
        {
            code: '$.proxy()',
            errors: [{ message }]
        },
        {
            code: '$.proxy(function() {})',
            errors: [{ message }]
        },
        {
            code: '$.proxy(function() {}, null)',
            errors: [{ message }]
        },
        {
            code: '$.proxy(function() {}, undefined)',
            errors: [{ message }]
        },
        {
            code: '$.proxy(null, "name")',
            errors: [{ message }]
        },
        {
            code: '$.proxy(undefined, "name")',
            errors: [{ message }]
        },
        {
            code: '$.proxy(false, "name")',
            errors: [{ message }]
        },
        {
            code: '$.proxy(0, "name")',
            errors: [{ message }]
        },
        {
            code: '$.proxy(identifier)',
            errors: [{ message }]
        },
        {
            code: '$.proxy(identifier, identifier)',
            errors: [{ message }]
        }
    ]
});
