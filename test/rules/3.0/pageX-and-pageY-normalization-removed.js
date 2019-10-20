"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pageX_and_pageY_normalization_removed_1 = require("../../../rules/3.0/pageX-and-pageY-normalization-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'event.pageX and event.pageY normalization removed in jQuery 3.0';
ruleTester.run('pageX-and-pageY-normalization-removed', pageX_and_pageY_normalization_removed_1.rule, {
    valid: [
        'event.other',
    ],
    invalid: [
        {
            code: 'event.pageX',
            errors: [{ message: message }]
        },
        {
            code: 'event.pageY',
            errors: [{ message: message }]
        },
        {
            code: 'obj.pageX',
            errors: [{ message: message }]
        },
        {
            code: 'obj.pageY',
            errors: [{ message: message }]
        }
    ]
});
