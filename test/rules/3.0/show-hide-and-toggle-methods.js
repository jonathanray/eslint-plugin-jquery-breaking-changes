"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var show_hide_and_toggle_methods_1 = require("../../../rules/3.0/show-hide-and-toggle-methods");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.show(), .hide(), and .toggle() methods now respect more stylesheet changes in jQuery 3.0';
ruleTester.run('show-hide-and-toggle-methods', show_hide_and_toggle_methods_1.rule, {
    valid: [
        'obj.show = true'
    ],
    invalid: [
        {
            code: '$("").show()',
            errors: [{ message: message }]
        },
        {
            code: '$("").hide()',
            errors: [{ message: message }]
        },
        {
            code: '$("").toggle(true)',
            errors: [{ message: message }]
        },
        {
            code: 'obj.show()',
            errors: [{ message: message }]
        },
        {
            code: 'obj.hide()',
            errors: [{ message: message }]
        },
        {
            code: 'obj.toggle(false)',
            errors: [{ message: message }]
        }
    ]
});
