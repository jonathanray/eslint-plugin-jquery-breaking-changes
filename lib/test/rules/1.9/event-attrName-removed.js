"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_attrName_removed_1 = require("../../../rules/1.9/event-attrName-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.attrName removed in jQuery 1.9';
ruleTester.run('event-attrName-removed', event_attrName_removed_1.rule, {
    valid: [
        'event.originalEvent.attrName'
    ],
    invalid: [
        {
            code: 'event.attrName',
            errors: [{ message }]
        }
    ]
});
