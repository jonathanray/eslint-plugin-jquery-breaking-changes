"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var on_ready_removed_1 = require("../../../rules/3.0/on-ready-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.on("ready", fn) removed in jQuery 3.0';
ruleTester.run('on-ready-removed', on_ready_removed_1.rule, {
    valid: [
        '$("").on("notready", function() {})',
    ],
    invalid: [
        {
            code: '$("").on("ready")',
            errors: [{ message: message }]
        },
        {
            code: '$("").on("ready", function() {})',
            errors: [{ message: message }]
        }
    ]
});
