"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_relatedNode_removed_1 = require("../../../rules/1.9/event-relatedNode-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.relatedNode removed in jQuery 1.9';
ruleTester.run('event-relatedNode-removed', event_relatedNode_removed_1.rule, {
    valid: [
        'event.originalEvent.relatedNode'
    ],
    invalid: [
        {
            code: 'event.relatedNode',
            errors: [{ message: message }]
        }
    ]
});
