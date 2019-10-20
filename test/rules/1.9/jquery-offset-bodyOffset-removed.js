"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_offset_bodyOffset_removed_1 = require("../../../rules/1.9/jquery-offset-bodyOffset-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.offset.bodyOffset() removed in jQuery 1.9';
ruleTester.run('jquery-offset-bodyOffset-removed', jquery_offset_bodyOffset_removed_1.rule, {
    valid: [
        'obj.bodyOffset()',
        'obj.offset.bodyOffset()'
    ],
    invalid: [
        {
            code: '$.offset.bodyOffset()',
            errors: [{ message: message }]
        },
        {
            code: '$.offset.bodyOffset.call()',
            errors: [{ message: message }]
        },
        {
            code: '$.offset.bodyOffset.bind()',
            errors: [{ message: message }]
        }
    ]
});
