"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_deletedIds_removed_1 = require("../../../rules/1.9/jquery-deletedIds-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.deletedIds removed in jQuery 1.9';
ruleTester.run('jquery-deletedIds-removed', jquery_deletedIds_removed_1.rule, {
    valid: [
        'obj.deletedIds'
    ],
    invalid: [
        {
            code: '$.deletedIds',
            errors: [{ message: message }]
        }
    ]
});
