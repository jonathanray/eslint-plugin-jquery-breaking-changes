"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_sub_removed_1 = require("../../../rules/1.9/jquery-sub-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.sub() removed in jQuery 1.9';
ruleTester.run('jquery-sub-removed', jquery_sub_removed_1.rule, {
    valid: [
        'obj.sub()'
    ],
    invalid: [
        {
            code: '$.sub()',
            errors: [{ message }]
        }
    ]
});
