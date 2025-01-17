"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_removed_1 = require("../../../rules/3.0/context-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.context removed in jQuery 3.0';
ruleTester.run('context-removed', context_removed_1.rule, {
    valid: [
        '$("").context()',
        'obj.context()'
    ],
    invalid: [
        {
            code: '$("").context',
            errors: [{ message }]
        },
        {
            code: 'obj.context',
            errors: [{ message }]
        }
    ]
});
