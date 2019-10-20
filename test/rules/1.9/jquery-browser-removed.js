"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_browser_removed_1 = require("../../../rules/1.9/jquery-browser-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.browser() removed in jQuery 1.9';
ruleTester.run('jquery-browser-removed', jquery_browser_removed_1.rule, {
    valid: [
        'obj.browser()'
    ],
    invalid: [
        {
            code: '$.browser()',
            errors: [{ message: message }]
        }
    ]
});
