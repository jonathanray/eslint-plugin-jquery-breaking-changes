"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_attrFn_removed_1 = require("../../../rules/1.9/jquery-attrFn-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.attrFn removed in jQuery 1.9';
ruleTester.run('jquery-attrFn-removed', jquery_attrFn_removed_1.rule, {
    valid: [
        'obj.attrFn'
    ],
    invalid: [
        {
            code: '$.attrFn',
            errors: [{ message }]
        },
        {
            code: 'jQuery.attrFn',
            errors: [{ message }]
        }
    ]
});
