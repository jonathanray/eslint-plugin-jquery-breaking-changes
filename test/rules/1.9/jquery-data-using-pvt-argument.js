"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_data_using_pvt_argument_1 = require("../../../rules/1.9/jquery-data-using-pvt-argument");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.data() using the pvt argument removed in jQuery 1.9';
ruleTester.run('jquery-data-using-pvt-argument', jquery_data_using_pvt_argument_1.rule, {
    valid: [
        '$.data(arg1, arg2, arg3)'
    ],
    invalid: [
        {
            code: '$.data(arg1, arg2, arg3, arg4)',
            errors: [{ message: message }]
        }
    ]
});
