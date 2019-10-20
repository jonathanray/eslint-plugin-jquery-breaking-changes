"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_event_handle_removed_1 = require("../../../rules/1.9/jquery-event-handle-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.event.handle() removed in jQuery 1.9';
ruleTester.run('jquery-event-handle-removed', jquery_event_handle_removed_1.rule, {
    valid: [
        'obj.handle()',
        'obj.event.handle()'
    ],
    invalid: [
        {
            code: '$.event.handle()',
            errors: [{ message }]
        },
        {
            code: '$.event.handle.call()',
            errors: [{ message }]
        },
        {
            code: '$.event.handle.bind()',
            errors: [{ message }]
        },
        {
            code: '$.event.handle.apply()',
            errors: [{ message }]
        }
    ]
});
