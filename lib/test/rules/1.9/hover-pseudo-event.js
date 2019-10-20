"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hover_pseudo_event_1 = require("../../../rules/1.9/hover-pseudo-event");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '"hover" pseudo event replaced with "mouseenter mouseleave" in jQuery 1.9';
ruleTester.run('', hover_pseudo_event_1.rule, {
    valid: [
        '$("").hover()'
    ],
    invalid: [
        {
            code: '$("").on("hover")',
            errors: [{ message }]
        },
        {
            code: '$("").bind("hover")',
            errors: [{ message }]
        },
        {
            code: '$("").delegate("hover")',
            errors: [{ message }]
        },
        {
            code: '$("").live("hover")',
            errors: [{ message }]
        }
    ]
});
