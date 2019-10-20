"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_removeData_using_pvt_argument_1 = require("../../../rules/1.9/jquery-removeData-using-pvt-argument");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.removeData() using the pvt argument removed in jQuery 1.9';
ruleTester.run('jquery-removeData-using-pvt-argument', jquery_removeData_using_pvt_argument_1.rule, {
    valid: [
        '$.removeData(arg1, arg2)'
    ],
    invalid: [
        {
            code: '$.removeData(arg1, arg2, arg3)',
            errors: [{ message: message }]
        }
    ]
});
