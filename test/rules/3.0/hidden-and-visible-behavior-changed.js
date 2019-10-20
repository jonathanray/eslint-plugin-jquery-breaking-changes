"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hidden_and_visible_behavior_changed_1 = require("../../../rules/3.0/hidden-and-visible-behavior-changed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'Behavior of :hidden and :visible changed in jQuery 3.0';
ruleTester.run('hidden-and-visible-behavior-changed', hidden_and_visible_behavior_changed_1.rule, {
    valid: [
        '$("#hidden .hidden")',
        '$("#visible .visible")',
        'var selector = "#hidden .hidden"',
        'var selector = "#visible .visible"',
    ],
    invalid: [
        {
            code: '$("div :hidden")',
            errors: [{ message: message }]
        },
        {
            code: '$("div :visible")',
            errors: [{ message: message }]
        }, {
            code: 'var selector = ":hidden"',
            errors: [{ message: message }]
        },
        {
            code: 'var selector = ":visible"',
            errors: [{ message: message }]
        }
    ]
});
