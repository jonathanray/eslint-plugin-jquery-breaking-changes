"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_event_props_and_fixHooks_removed_1 = require("../../../rules/3.0/jquery-event-props-and-fixHooks-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.event.props and jQuery.event.fixHooks removed in jQuery 3.0';
ruleTester.run('jquery-event-props-and-fixHooks-removed', jquery_event_props_and_fixHooks_removed_1.rule, {
    valid: [
        '$.event.other',
        'event.props',
        'event.fixHooks'
    ],
    invalid: [
        {
            code: '$.event.props.indexOf("")',
            errors: [{ message: message }]
        },
        {
            code: '$.event.fixHooks[eventType] = function() {}',
            errors: [{ message: message }]
        }
    ]
});
