import { rule } from '../../../rules/3.0/jquery-ajax-success-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.ajax().success() removed in jQuery 3.0';

ruleTester.run('jquery-ajax-success-removed', rule, {
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
