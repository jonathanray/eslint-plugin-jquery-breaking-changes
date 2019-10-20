"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_deletedIds_removed_1 = require("../../../rules/1.9/jquery-deletedIds-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.deletedIds removed in jQuery 1.9';
ruleTester.run('jquery-deletedIds-removed', jquery_deletedIds_removed_1.rule, {
    valid: [
        'obj.deletedIds'
    ],
    invalid: [
        {
            code: '$.deletedIds',
            errors: [{ message }]
        }
    ]
});
