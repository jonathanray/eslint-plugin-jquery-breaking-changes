"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_ajax_error_removed_1 = require("../../../rules/3.0/jquery-ajax-error-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.ajax().error() removed in jQuery 3.0';
ruleTester.run('jquery-ajax-error-removed', jquery_ajax_error_removed_1.rule, {
    valid: [
        '$.ajax({})',
        '$.ajax(obj)',
        '$.ajax().then().catch().finally();',
        '$.get().then().catch().finally();',
        '$.getJSON().then().catch().finally();',
        '$.post().then().catch().finally();',
        'console.error();'
    ],
    invalid: [
        {
            code: '$.ajax().error()',
            errors: [{ message: message }]
        },
        {
            code: '$.get().error()',
            errors: [{ message: message }]
        },
        {
            code: '$.getJSON().error()',
            errors: [{ message: message }]
        },
        {
            code: '$.post().error()',
            errors: [{ message: message }]
        },
        {
            code: '$.post().then().error()',
            errors: [{ message: message }]
        },
        {
            code: '$http({}).error()',
            errors: [{ message: message }]
        },
        {
            code: '$http.get().error()',
            errors: [{ message: message }]
        },
        {
            code: '$http.post().error()',
            errors: [{ message: message }]
        },
        {
            code: '$.ajax({ error: function() {} })',
            errors: [{ message: message }]
        },
        {
            code: 'var obj = { error: function() {} }; $.ajax(obj)',
            errors: [{ message: message }]
        }
    ]
});
