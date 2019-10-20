"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_attrFn_removed_1 = require("../../../rules/1.9/jquery-attrFn-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.attrFn removed in jQuery 1.9';
ruleTester.run('jquery-attrFn-removed', jquery_attrFn_removed_1.rule, {
    valid: [
        'obj.attrFn'
    ],
    invalid: [
        {
            code: '$.attrFn',
            errors: [{ message: message }]
        },
        {
            code: 'jQuery.attrFn',
            errors: [{ message: message }]
        }
    ]
});
