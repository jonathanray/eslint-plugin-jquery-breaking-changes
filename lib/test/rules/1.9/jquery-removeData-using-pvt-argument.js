"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_removeData_using_pvt_argument_1 = require("../../../rules/1.9/jquery-removeData-using-pvt-argument");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.removeData() using the pvt argument removed in jQuery 1.9';
ruleTester.run('jquery-removeData-using-pvt-argument', jquery_removeData_using_pvt_argument_1.rule, {
    valid: [
        '$.removeData(arg1, arg2)'
    ],
    invalid: [
        {
            code: '$.removeData(arg1, arg2, arg3)',
            errors: [{ message }]
        }
    ]
});
