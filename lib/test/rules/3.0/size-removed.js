"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const size_removed_1 = require("../../../rules/3.0/size-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.size() removed in jQuery 3.0';
ruleTester.run('size-removed', size_removed_1.rule, {
    valid: [
        'obj.size',
        'obj.size(100)'
    ],
    invalid: [
        {
            code: '$("").size()',
            errors: [{ message }]
        },
        {
            code: 'obj.size()',
            errors: [{ message }]
        }
    ]
});
