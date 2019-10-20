"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var selector_removed_1 = require("../../../rules/3.0/selector-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.selector removed in jQuery 3.0';
ruleTester.run('selector-removed', selector_removed_1.rule, {
    valid: [
        '$("").selector()',
        'obj.selector()'
    ],
    invalid: [
        {
            code: '$("").selector',
            errors: [{ message: message }]
        },
        {
            code: 'obj.selector',
            errors: [{ message: message }]
        }
    ]
});
