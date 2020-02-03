"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_ajax_error_removed_1 = require("../../../rules/3.0/jquery-ajax-error-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.ajax().error() removed in jQuery 3.0';
ruleTester.run('jquery-ajax-error-removed', jquery_ajax_error_removed_1.rule, {
    valid: [
        'obj.error()',
        'obj.error("notCallback")',
        '$.obj.error()',
        '$.ajax({})',
        '$.ajax(obj)',
        '$.ajax().then().catch().finally();',
        '$.get().then().catch().finally();',
        '$.getJSON().then().catch().finally();',
        '$.post().then().catch().finally();',
        '$http({})',
        '$http.get()',
        '$http.post()',
        '$.ajax({ error: function() {} })'
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
            code: '$http({}).error()',
            errors: [{ message }]
        },
        {
            code: '$http.get().error()',
            errors: [{ message }]
        },
        {
            code: '$http.post().error()',
            errors: [{ message }]
        },
        {
            code: 'obj.error(function() {})',
            errors: [{ message }]
        },
        {
            code: 'obj.error(callback)',
            errors: [{ message }]
        },
    ]
});
