"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pageX_and_pageY_normalization_removed_1 = require("../../../rules/3.0/pageX-and-pageY-normalization-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'event.pageX and event.pageY normalization removed in jQuery 3.0';
ruleTester.run('pageX-and-pageY-normalization-removed', pageX_and_pageY_normalization_removed_1.rule, {
    valid: [
        'event.other',
    ],
    invalid: [
        {
            code: 'event.pageX',
            errors: [{ message }]
        },
        {
            code: 'event.pageY',
            errors: [{ message }]
        },
        {
            code: 'obj.pageX',
            errors: [{ message }]
        },
        {
            code: 'obj.pageY',
            errors: [{ message }]
        }
    ]
});
