"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_attrName_removed_1 = require("../../../rules/1.9/event-attrName-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.attrName removed in jQuery 1.9';
ruleTester.run('event-attrName-removed', event_attrName_removed_1.rule, {
    valid: [
        'event.originalEvent.attrName'
    ],
    invalid: [
        {
            code: 'event.attrName',
            errors: [{ message: message }]
        }
    ]
});
