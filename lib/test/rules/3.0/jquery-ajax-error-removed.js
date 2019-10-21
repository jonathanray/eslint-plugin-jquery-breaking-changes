"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_ajax_error_removed_1 = require("../../../rules/3.0/jquery-ajax-error-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.ajax().error() removed in jQuery 3.0';
ruleTester.run('jquery-ajax-error-removed', jquery_ajax_error_removed_1.rule, {
    valid: [
        '$.ajax({})',
        '$.ajax(obj)',
        '$.ajax().then().catch().finally();',
        '$.get().then().catch().finally();',
        '$.getJSON().then().catch().finally();',
        '$.post().then().catch().finally();',
        'console.error();',
        '$http({}).error()',
        '$http.get().error()',
        '$http.post().error()',
    ],
    invalid: [
        {
            code: '$.ajax().error()',
            errors: [{ message }]
        },
        {
            code: '$.get().error()',
            errors: [{ message }]
        },
        {
            code: '$.getJSON().error()',
            errors: [{ message }]
        },
        {
            code: '$.post().error()',
            errors: [{ message }]
        },
        {
            code: '$.post().then().error()',
            errors: [{ message }]
        },
        {
            code: '$.ajax({ error: function() {} })',
            errors: [{ message }]
        },
        {
            code: 'var obj = { error: function() {} }; $.ajax(obj)',
            errors: [{ message }]
        },
        {
            code: '$http({}).error()',
            options: [{
                    '$http': true
                }],
            errors: [{ message }]
        },
        {
            code: '$http.get().error()',
            options: [{
                    '$http': true
                }],
            errors: [{ message }]
        },
        {
            code: '$http.post().error()',
            options: [{
                    '$http': true
                }],
            errors: [{ message }]
        }
    ]
});
