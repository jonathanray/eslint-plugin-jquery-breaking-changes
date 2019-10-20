"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_sub_removed_1 = require("../../../rules/1.9/jquery-sub-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.sub() removed in jQuery 1.9';
ruleTester.run('jquery-sub-removed', jquery_sub_removed_1.rule, {
    valid: [
        'obj.sub()'
    ],
    invalid: [
        {
            code: '$.sub()',
            errors: [{ message: message }]
        }
    ]
});
