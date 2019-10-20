"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const show_hide_and_toggle_methods_1 = require("../../../rules/3.0/show-hide-and-toggle-methods");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.show(), .hide(), and .toggle() methods now respect more stylesheet changes in jQuery 3.0';
ruleTester.run('show-hide-and-toggle-methods', show_hide_and_toggle_methods_1.rule, {
    valid: [
        'obj.show = true'
    ],
    invalid: [
        {
            code: '$("").show()',
            errors: [{ message }]
        },
        {
            code: '$("").hide()',
            errors: [{ message }]
        },
        {
            code: '$("").toggle(true)',
            errors: [{ message }]
        },
        {
            code: 'obj.show()',
            errors: [{ message }]
        },
        {
            code: 'obj.hide()',
            errors: [{ message }]
        },
        {
            code: 'obj.toggle(false)',
            errors: [{ message }]
        }
    ]
});
