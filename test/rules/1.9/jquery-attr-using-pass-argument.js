"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_attr_using_pass_argument_1 = require("../../../rules/1.9/jquery-attr-using-pass-argument");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.attr() using the pass argument removed in jQuery 1.9';
ruleTester.run('jquery-attr-using-pass-argument', jquery_attr_using_pass_argument_1.rule, {
    valid: [
        '$("").attr(arg1, arg2, arg3)'
    ],
    invalid: [
        {
            code: '$("").attr(arg1, arg2, arg3, arg4)',
            errors: [{ message: message }]
        }
    ]
});
