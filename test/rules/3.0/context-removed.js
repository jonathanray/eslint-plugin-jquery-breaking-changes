"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_removed_1 = require("../../../rules/3.0/context-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.context removed in jQuery 3.0';
ruleTester.run('context-removed', context_removed_1.rule, {
    valid: [
        '$("").context()',
        'obj.context()'
    ],
    invalid: [
        {
            code: '$("").context',
            errors: [{ message: message }]
        },
        {
            code: 'obj.context',
            errors: [{ message: message }]
        }
    ]
});
