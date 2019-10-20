"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_clean_removed_1 = require("../../../rules/1.9/jquery-clean-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.clean() removed in jQuery 1.9';
ruleTester.run('jquery-clean-removed', jquery_clean_removed_1.rule, {
    valid: [
        'obj.clean()'
    ],
    invalid: [
        {
            code: '$.clean()',
            errors: [{ message: message }]
        },
        {
            code: '$.clean.apply()',
            errors: [{ message: message }]
        },
        {
            code: '$.clean.bind()',
            errors: [{ message: message }]
        },
        {
            code: '$.clean.call()',
            errors: [{ message: message }]
        }
    ]
});
