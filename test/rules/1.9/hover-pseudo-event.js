"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hover_pseudo_event_1 = require("../../../rules/1.9/hover-pseudo-event");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '"hover" pseudo event replaced with "mouseenter mouseleave" in jQuery 1.9';
ruleTester.run('', hover_pseudo_event_1.rule, {
    valid: [
        '$("").hover()'
    ],
    invalid: [
        {
            code: '$("").on("hover")',
            errors: [{ message: message }]
        },
        {
            code: '$("").bind("hover")',
            errors: [{ message: message }]
        },
        {
            code: '$("").delegate("hover")',
            errors: [{ message: message }]
        },
        {
            code: '$("").live("hover")',
            errors: [{ message: message }]
        }
    ]
});
