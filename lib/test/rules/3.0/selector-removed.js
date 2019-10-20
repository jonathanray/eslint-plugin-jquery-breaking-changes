"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selector_removed_1 = require("../../../rules/3.0/selector-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.selector removed in jQuery 3.0';
ruleTester.run('selector-removed', selector_removed_1.rule, {
    valid: [
        '$("").selector()',
        'obj.selector()'
    ],
    invalid: [
        {
            code: '$("").selector',
            errors: [{ message }]
        },
        {
            code: 'obj.selector',
            errors: [{ message }]
        }
    ]
});
