"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_proxy_context_1 = require("../../../rules/1.9/jquery-proxy-context");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.proxy() context changed in jQuery 1.9';
ruleTester.run('jquery-proxy-context', jquery_proxy_context_1.rule, {
    valid: [
        '$.proxy(function() {}, this)',
        '$.proxy(this, "name")',
        'obj.proxy()',
    ],
    invalid: [
        {
            code: '$.proxy()',
            errors: [{ message: message }]
        },
        {
            code: '$.proxy(function() {})',
            errors: [{ message: message }]
        },
        {
            code: '$.proxy(function() {}, null)',
            errors: [{ message: message }]
        },
        {
            code: '$.proxy(function() {}, undefined)',
            errors: [{ message: message }]
        },
        {
            code: '$.proxy(null, "name")',
            errors: [{ message: message }]
        },
        {
            code: '$.proxy(undefined, "name")',
            errors: [{ message: message }]
        },
        {
            code: '$.proxy(false, "name")',
            errors: [{ message: message }]
        },
        {
            code: '$.proxy(0, "name")',
            errors: [{ message: message }]
        },
        {
            code: '$.proxy(identifier)',
            errors: [{ message: message }]
        },
        {
            code: '$.proxy(identifier, identifier)',
            errors: [{ message: message }]
        }
    ]
});
