"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_ajax_success_removed_1 = require("../../../rules/3.0/jquery-ajax-success-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.ajax().success() removed in jQuery 3.0';
ruleTester.run('jquery-ajax-success-removed', jquery_ajax_success_removed_1.rule, {
    valid: [
        '$.ajax({})',
        '$.ajax(obj)',
        '$.ajax().then().catch().finally();',
        '$.get().then().catch().finally();',
        '$.getJSON().then().catch().finally();',
        '$.post().then().catch().finally();',
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
            code: '$.ajax({ success: function() {} })',
            errors: [{ message }]
        },
        {
            code: 'var obj = { success: function() {} }; $.ajax(obj)',
            errors: [{ message }]
        }
    ]
});