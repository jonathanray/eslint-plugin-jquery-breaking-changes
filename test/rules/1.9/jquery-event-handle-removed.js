"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_event_handle_removed_1 = require("../../../rules/1.9/jquery-event-handle-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.event.handle() removed in jQuery 1.9';
ruleTester.run('jquery-event-handle-removed', jquery_event_handle_removed_1.rule, {
    valid: [
        'obj.handle()',
        'obj.event.handle()'
    ],
    invalid: [
        {
            code: '$.event.handle()',
            errors: [{ message: message }]
        },
        {
            code: '$.event.handle.call()',
            errors: [{ message: message }]
        },
        {
            code: '$.event.handle.bind()',
            errors: [{ message: message }]
        },
        {
            code: '$.event.handle.apply()',
            errors: [{ message: message }]
        }
    ]
});
