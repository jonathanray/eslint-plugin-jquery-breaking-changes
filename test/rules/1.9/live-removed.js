"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var live_removed_1 = require("../../../rules/1.9/live-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.live() removed in jQuery 1.9';
ruleTester.run('live-removed', live_removed_1.rule, {
    valid: [],
    invalid: [
        {
            code: '$("#test-id").live("click", function() {})',
            errors: [{ message: message }]
        },
        {
            code: '$(selector).live("click", function() {})',
            errors: [{ message: message }]
        },
        {
            code: '$(selector).find("").live("click", function() {})',
            errors: [{ message: message }]
        },
        {
            code: 'jQuery("#test-id").live("click", function() {})',
            errors: [{ message: message }]
        },
        {
            code: 'jQuery(selector).live("click", function() {})',
            errors: [{ message: message }]
        },
        {
            code: 'jQuery(selector).find("").live("click", function() {})',
            errors: [{ message: message }]
        }
    ]
});
