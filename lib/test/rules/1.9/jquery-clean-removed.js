"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_clean_removed_1 = require("../../../rules/1.9/jquery-clean-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.clean() removed in jQuery 1.9';
ruleTester.run('jquery-clean-removed', jquery_clean_removed_1.rule, {
    valid: [
        'obj.clean()'
    ],
    invalid: [
        {
            code: '$.clean()',
            errors: [{ message }]
        },
        {
            code: '$.clean.apply()',
            errors: [{ message }]
        },
        {
            code: '$.clean.bind()',
            errors: [{ message }]
        },
        {
            code: '$.clean.call()',
            errors: [{ message }]
        }
    ]
});
