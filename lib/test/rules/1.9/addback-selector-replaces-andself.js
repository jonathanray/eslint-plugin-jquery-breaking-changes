"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addback_selector_replaces_andself_1 = require("../../../rules/1.9/addback-selector-replaces-andself");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.addBack(selector) replaces .andSelf() in jQuery 1.9';
ruleTester.run('addback-selector-replaces-andself', addback_selector_replaces_andself_1.rule, {
    valid: [],
    invalid: [
        {
            code: '$("").andSelf()',
            errors: [{ message }]
        },
        {
            code: 'jQuery(selector).find("").andSelf()',
            errors: [{ message }]
        }
    ]
});
