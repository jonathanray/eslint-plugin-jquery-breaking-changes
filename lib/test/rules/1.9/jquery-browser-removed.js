"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_browser_removed_1 = require("../../../rules/1.9/jquery-browser-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.browser() removed in jQuery 1.9';
ruleTester.run('jquery-browser-removed', jquery_browser_removed_1.rule, {
    valid: [
        'obj.browser()'
    ],
    invalid: [
        {
            code: '$.browser()',
            errors: [{ message }]
        }
    ]
});
