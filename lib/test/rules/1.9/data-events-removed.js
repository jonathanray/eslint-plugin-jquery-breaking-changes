"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_events_removed_1 = require("../../../rules/1.9/data-events-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.data("events") removed in jQuery 1.9';
ruleTester.run('data-events-removed', data_events_removed_1.rule, {
    valid: [
        'anyObject.data("notevents")'
    ],
    invalid: [
        {
            code: 'anyObject.data("events")',
            errors: [{ message }]
        }
    ]
});
