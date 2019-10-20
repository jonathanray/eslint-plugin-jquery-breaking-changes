"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_param_percent_20_1 = require("../../../rules/3.0/jquery-param-percent-20");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.param() no longer converts %20 to a plus sign in jQuery 3.0';
ruleTester.run('jquery-param-percent-20', jquery_param_percent_20_1.rule, {
    valid: [
        '$.param()',
        'obj.param({})'
    ],
    invalid: [
        {
            code: '$.param({})',
            errors: [{ message }]
        },
        {
            code: '$.param([])',
            errors: [{ message }]
        },
        {
            code: '$.param(obj)',
            errors: [{ message }]
        }
    ]
});
