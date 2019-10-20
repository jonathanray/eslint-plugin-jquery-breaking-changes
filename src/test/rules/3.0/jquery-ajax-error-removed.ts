import { rule } from '../../../rules/3.0/jquery-ajax-error-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.ajax().error() removed in jQuery 3.0';

ruleTester.run('jquery-ajax-error-removed', rule, {
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
            code: '$.ajax({ error: function() {} })',
            errors: [{ message }]
        },
        {
            code: 'var obj = { error: function() {} }; $.ajax(obj)',
            errors: [{ message }]
        }
    ]
});
