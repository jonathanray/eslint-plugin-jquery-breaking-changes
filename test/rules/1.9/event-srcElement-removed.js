"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_srcElement_removed_1 = require("../../../rules/1.9/event-srcElement-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.srcElement removed in jQuery 1.9';
ruleTester.run('event-srcElement-removed', event_srcElement_removed_1.rule, {
    valid: [
        'event.originalEvent.srcElement'
    ],
    invalid: [
        {
            code: 'event.srcElement',
            errors: [{ message: message }]
        }
    ]
});
