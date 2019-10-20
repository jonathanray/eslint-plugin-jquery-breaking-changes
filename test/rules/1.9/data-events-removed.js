"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_events_removed_1 = require("../../../rules/1.9/data-events-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.data("events") removed in jQuery 1.9';
ruleTester.run('data-events-removed', data_events_removed_1.rule, {
    valid: [
        'anyObject.data("notevents")'
    ],
    invalid: [
        {
            code: 'anyObject.data("events")',
            errors: [{ message: message }]
        }
    ]
});
