import { rule } from '../../../rules/3.0/load-unload-and-error-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.load(), .unload(), and .error() removed in jQuery 3.0';

ruleTester.run('load-unload-and-error-removed', rule, {
    valid: [
        'console.error("")',
        '$("").load("")',
        '$("").load(someUrl)',
        '$("").load(getUrl())',
        '$("").load(obj.getUrl())',
        '$.ajax().error(function() {})',
        '$http().error(function() {})',
        '$http.get().error(function() {})',
    ],

    invalid: [
        {
            code: '$("").error()',
            errors: [{ message }]
        },
        {
            code: '$("").error(function() {})',
            errors: [{ message }]
        },
        {
            code: '$("").error(doSomething)',
            errors: [{ message }]
        },
        {
            code: '$("").error(obj.doSomething)',
            errors: [{ message }]
        },
        {
            code: '$("").load()',
            errors: [{ message }]
        },
        {
            code: '$("").load(function() {})',
            errors: [{ message }]
        },
        {
            code: '$("").load(doSomething)',
            errors: [{ message }]
        },
        {
            code: '$("").load(obj.doSomething)',
            errors: [{ message }]
        },
        {
            code: '$("").unload()',
            errors: [{ message }]
        },
        {
            code: '$("").unload(function() {})',
            errors: [{ message }]
        },
        {
            code: '$("").unload(doSomething)',
            errors: [{ message }]
        },
        {
            code: '$("").unload(obj.doSomething)',
            errors: [{ message }]
        }
    ]
});
