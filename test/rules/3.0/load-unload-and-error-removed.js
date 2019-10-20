"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var load_unload_and_error_removed_1 = require("../../../rules/3.0/load-unload-and-error-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.load(), .unload(), and .error() removed in jQuery 3.0';
ruleTester.run('load-unload-and-error-removed', load_unload_and_error_removed_1.rule, {
    valid: [
        'console.error("")',
        '$("").load("")',
        '$("").load(someUrl)',
        '$("").load(getUrl())',
        '$("").load(obj.getUrl())',
        '$.ajax().error(function() {})',
        '$http().error(function() {})',
        '$http.get().error(function() {})',
    ],
    invalid: [
        {
            code: '$("").error()',
            errors: [{ message: message }]
        },
        {
            code: '$("").error(function() {})',
            errors: [{ message: message }]
        },
        {
            code: '$("").error(doSomething)',
            errors: [{ message: message }]
        },
        {
            code: '$("").error(obj.doSomething)',
            errors: [{ message: message }]
        },
        {
            code: '$("").load()',
            errors: [{ message: message }]
        },
        {
            code: '$("").load(function() {})',
            errors: [{ message: message }]
        },
        {
            code: '$("").load(doSomething)',
            errors: [{ message: message }]
        },
        {
            code: '$("").load(obj.doSomething)',
            errors: [{ message: message }]
        },
        {
            code: '$("").unload()',
            errors: [{ message: message }]
        },
        {
            code: '$("").unload(function() {})',
            errors: [{ message: message }]
        },
        {
            code: '$("").unload(doSomething)',
            errors: [{ message: message }]
        },
        {
            code: '$("").unload(obj.doSomething)',
            errors: [{ message: message }]
        }
    ]
});
