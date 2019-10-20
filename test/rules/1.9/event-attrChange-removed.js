"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_attrChange_removed_1 = require("../../../rules/1.9/event-attrChange-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.attrChange removed in jQuery 1.9';
ruleTester.run('event-attrChange-removed', event_attrChange_removed_1.rule, {
    valid: [
        'event.originalEvent.attrChange'
    ],
    invalid: [
        {
            code: 'event.attrChange',
            errors: [{ message: message }]
        }
    ]
});
