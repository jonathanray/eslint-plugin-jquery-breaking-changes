"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var die_removed_1 = require("../../../rules/1.9/die-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.die() removed in jQuery 1.9';
ruleTester.run('die-removed', die_removed_1.rule, {
    valid: [],
    invalid: [
        {
            code: '$("#test-id").die("click", function() {})',
            errors: [{ message: message }]
        },
        {
            code: '$(selector).die("click", function() {})',
            errors: [{ message: message }]
        },
        {
            code: '$(selector).find("").die("click", function() {})',
            errors: [{ message: message }]
        },
        {
            code: 'jQuery("#test-id").die("click", function() {})',
            errors: [{ message: message }]
        },
        {
            code: 'jQuery(selector).die("click", function() {})',
            errors: [{ message: message }]
        },
        {
            code: 'jQuery(selector).find("").die("click", function() {})',
            errors: [{ message: message }]
        }
    ]
});
