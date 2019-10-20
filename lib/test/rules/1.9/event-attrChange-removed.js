"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_attrChange_removed_1 = require("../../../rules/1.9/event-attrChange-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.attrChange removed in jQuery 1.9';
ruleTester.run('event-attrChange-removed', event_attrChange_removed_1.rule, {
    valid: [
        'event.originalEvent.attrChange'
    ],
    invalid: [
        {
            code: 'event.attrChange',
            errors: [{ message }]
        }
    ]
});
