"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addback_selector_replaces_andself_1 = require("../../../rules/1.9/addback-selector-replaces-andself");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.addBack(selector) replaces .andSelf() in jQuery 1.9';
ruleTester.run('addback-selector-replaces-andself', addback_selector_replaces_andself_1.rule, {
    valid: [],
    invalid: [
        {
            code: '$("").andSelf()',
            errors: [{ message: message }]
        },
        {
            code: 'jQuery(selector).find("").andSelf()',
            errors: [{ message: message }]
        }
    ]
});
