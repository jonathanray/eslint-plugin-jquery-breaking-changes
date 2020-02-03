import { rule } from '../../../rules/3.0/jquery-ajax-error-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.ajax().error() removed in jQuery 3.0';

ruleTester.run('jquery-ajax-error-removed', rule, {
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
