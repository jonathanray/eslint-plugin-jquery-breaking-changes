"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_srcElement_removed_1 = require("../../../rules/1.9/event-srcElement-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.srcElement removed in jQuery 1.9';
ruleTester.run('event-srcElement-removed', event_srcElement_removed_1.rule, {
    valid: [
        'event.originalEvent.srcElement',
        'event.target || event.srcElement'
    ],
    invalid: [
        {
            code: 'event.srcElement',
            errors: [{ message }]
        },
        {
            code: 'event1.target || event2.srcElement',
            errors: [{ message }]
        },
    ]
});
