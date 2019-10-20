"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_ajax_complete_removed_1 = require("../../../rules/3.0/jquery-ajax-complete-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.ajax().complete() removed in jQuery 3.0';
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
            errors: [{ message }]
        },
        {
            code: '$.get().complete()',
            errors: [{ message }]
        },
        {
            code: '$.getJSON().complete()',
            errors: [{ message }]
        },
        {
            code: '$.post().complete()',
            errors: [{ message }]
        },
        {
            code: '$http({}).complete()',
            errors: [{ message }]
        },
        {
            code: '$http.get().complete()',
            errors: [{ message }]
        },
        {
            code: '$http.post().complete()',
            errors: [{ message }]
        },
        {
            code: '$.ajax({ complete: function() {} })',
            errors: [{ message }]
        },
        {
            code: 'var obj = { complete: function() {} }; $.ajax(obj)',
            errors: [{ message }]
        }
    ]
});
