"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_ajax_success_removed_1 = require("../../../rules/3.0/jquery-ajax-success-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.ajax().success() removed in jQuery 3.0';
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
            errors: [{ message: message }]
        },
        {
            code: '$.get().success()',
            errors: [{ message: message }]
        },
        {
            code: '$.getJSON().success()',
            errors: [{ message: message }]
        },
        {
            code: '$.post().success()',
            errors: [{ message: message }]
        },
        {
            code: '$http({}).success()',
            errors: [{ message: message }]
        },
        {
            code: '$http.get().success()',
            errors: [{ message: message }]
        },
        {
            code: '$http.post().success()',
            errors: [{ message: message }]
        },
        {
            code: '$.ajax({ success: function() {} })',
            errors: [{ message: message }]
        },
        {
            code: 'var obj = { success: function() {} }; $.ajax(obj)',
            errors: [{ message: message }]
        }
    ]
});
