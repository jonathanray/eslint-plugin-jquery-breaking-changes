"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_param_percent_20_1 = require("../../../rules/3.0/jquery-param-percent-20");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.param() no longer converts %20 to a plus sign in jQuery 3.0';
ruleTester.run('jquery-param-percent-20', jquery_param_percent_20_1.rule, {
    valid: [
        '$.param()',
        'obj.param({})'
    ],
    invalid: [
        {
            code: '$.param({})',
            errors: [{ message: message }]
        },
        {
            code: '$.param([])',
            errors: [{ message: message }]
        },
        {
            code: '$.param(obj)',
            errors: [{ message: message }]
        }
    ]
});
