"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_ajax_success_removed_1 = require("../../../rules/3.0/jquery-ajax-success-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.ajax().success() removed in jQuery 3.0';
ruleTester.run('jquery-ajax-success-removed', jquery_ajax_success_removed_1.rule, {
    valid: [
        'obj.success()',
        'obj.success("notCallback")',
        '$.obj.success()',
        '$.ajax({})',
        '$.ajax(obj)',
        '$.ajax().then().catch().finally();',
        '$.get().then().catch().finally();',
        '$.getJSON().then().catch().finally();',
        '$.post().then().catch().finally();',
        '$http({})',
        '$http.get()',
        '$http.post()',
        '$.ajax({ success: function() {} })'
    ],
    invalid: [
        {
            code: '$.ajax().success()',
            errors: [{ message }]
        },
        {
            code: '$.get().success()',
            errors: [{ message }]
        },
        {
            code: '$.getJSON().success()',
            errors: [{ message }]
        },
        {
            code: '$.post().success()',
            errors: [{ message }]
        },
        {
            code: '$http({}).success()',
            errors: [{ message }]
        },
        {
            code: '$http.get().success()',
            errors: [{ message }]
        },
        {
            code: '$http.post().success()',
            errors: [{ message }]
        },
        {
            code: 'obj.success(function() {})',
            errors: [{ message }]
        },
        {
            code: 'obj.success(callback)',
            errors: [{ message }]
        },
    ]
});
