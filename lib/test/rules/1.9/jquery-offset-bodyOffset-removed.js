"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_offset_bodyOffset_removed_1 = require("../../../rules/1.9/jquery-offset-bodyOffset-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.offset.bodyOffset() removed in jQuery 1.9';
ruleTester.run('jquery-offset-bodyOffset-removed', jquery_offset_bodyOffset_removed_1.rule, {
    valid: [
        'obj.bodyOffset()',
        'obj.offset.bodyOffset()'
    ],
    invalid: [
        {
            code: '$.offset.bodyOffset()',
            errors: [{ message }]
        },
        {
            code: '$.offset.bodyOffset.call()',
            errors: [{ message }]
        },
        {
            code: '$.offset.bodyOffset.bind()',
            errors: [{ message }]
        }
    ]
});
