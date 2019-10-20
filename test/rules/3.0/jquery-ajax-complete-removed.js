"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_ajax_complete_removed_1 = require("../../../rules/3.0/jquery-ajax-complete-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.ajax().complete() removed in jQuery 3.0';
ruleTester.run('jquery-ajax-complete-removed', jquery_ajax_complete_removed_1.rule, {
    valid: [
        '$.ajax({})',
        '$.ajax(obj)',
        '$.ajax().then().catch().finally();',
        '$.get().then().catch().finally();',
        '$.getJSON().then().catch().finally();',
        '$.post().then().catch().finally();'
    ],
    invalid: [
        {
            code: '$.ajax().complete()',
            errors: [{ message: message }]
        },
        {
            code: '$.get().complete()',
            errors: [{ message: message }]
        },
        {
            code: '$.getJSON().complete()',
            errors: [{ message: message }]
        },
        {
            code: '$.post().complete()',
            errors: [{ message: message }]
        },
        {
            code: '$http({}).complete()',
            errors: [{ message: message }]
        },
        {
            code: '$http.get().complete()',
            errors: [{ message: message }]
        },
        {
            code: '$http.post().complete()',
            errors: [{ message: message }]
        },
        {
            code: '$.ajax({ complete: function() {} })',
            errors: [{ message: message }]
        },
        {
            code: 'var obj = { complete: function() {} }; $.ajax(obj)',
            errors: [{ message: message }]
        }
    ]
});
