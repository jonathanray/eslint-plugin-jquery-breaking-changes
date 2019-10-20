"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_attr_using_pass_argument_1 = require("../../../rules/1.9/jquery-attr-using-pass-argument");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.attr() using the pass argument removed in jQuery 1.9';
ruleTester.run('jquery-attr-using-pass-argument', jquery_attr_using_pass_argument_1.rule, {
    valid: [
        '$("").attr(arg1, arg2, arg3)'
    ],
    invalid: [
        {
            code: '$("").attr(arg1, arg2, arg3, arg4)',
            errors: [{ message }]
        }
    ]
});
