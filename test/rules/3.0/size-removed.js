"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var size_removed_1 = require("../../../rules/3.0/size-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.size() removed in jQuery 3.0';
ruleTester.run('size-removed', size_removed_1.rule, {
    valid: [
        'obj.size',
        'obj.size(100)'
    ],
    invalid: [
        {
            code: '$("").size()',
            errors: [{ message: message }]
        },
        {
            code: 'obj.size()',
            errors: [{ message: message }]
        }
    ]
});
