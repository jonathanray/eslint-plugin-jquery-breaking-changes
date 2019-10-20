"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_when_progress_notifications_1 = require("../../../rules/3.0/jquery-when-progress-notifications");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.when() progress notifications not passed along in jQuery 3.0';
ruleTester.run('jquery-when-progress-notifications', jquery_when_progress_notifications_1.rule, {
    valid: [
        'obj.progress()',
        'obj.progress(true)',
        'obj.progress(1)',
        'obj.progress(null)'
    ],
    invalid: [
        {
            code: '$.when().progress()',
            errors: [{ message: message }]
        },
        {
            code: '$.when().progress(anything)',
            errors: [{ message: message }]
        },
        {
            code: 'obj.progress(function() {})',
            errors: [{ message: message }]
        },
        {
            code: 'obj.progress(callback)',
            errors: [{ message: message }]
        },
        {
            code: 'obj.progress(obj.callback)',
            errors: [{ message: message }]
        }
    ]
});
