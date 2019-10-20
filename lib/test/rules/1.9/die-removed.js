"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const die_removed_1 = require("../../../rules/1.9/die-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.die() removed in jQuery 1.9';
ruleTester.run('die-removed', die_removed_1.rule, {
    valid: [],
    invalid: [
        {
            code: '$("#test-id").die("click", function() {})',
            errors: [{ message }]
        },
        {
            code: '$(selector).die("click", function() {})',
            errors: [{ message }]
        },
        {
            code: '$(selector).find("").die("click", function() {})',
            errors: [{ message }]
        },
        {
            code: 'jQuery("#test-id").die("click", function() {})',
            errors: [{ message }]
        },
        {
            code: 'jQuery(selector).die("click", function() {})',
            errors: [{ message }]
        },
        {
            code: 'jQuery(selector).find("").die("click", function() {})',
            errors: [{ message }]
        }
    ]
});
