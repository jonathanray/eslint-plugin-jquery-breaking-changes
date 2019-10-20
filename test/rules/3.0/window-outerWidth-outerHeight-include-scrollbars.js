"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var window_outerWidth_outerHeight_include_scrollbars_1 = require("../../../rules/3.0/window-outerWidth-outerHeight-include-scrollbars");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = '.outerWidth() or .outerHeight() on window includes scrollbar width/height in jQuery 3.0';
ruleTester.run('window-outerWidth-outerHeight-include-scrollbars', window_outerWidth_outerHeight_include_scrollbars_1.rule, {
    valid: [
        '$("").outerWidth()',
        '$("").outerHeight()',
        'obj.outerWidth()',
        'obj.outerHeight()',
        '$(window).Width()',
        '$(window).Height()',
    ],
    invalid: [
        {
            code: '$(window).outerWidth()',
            errors: [{ message: message }]
        },
        {
            code: '$(window).outerHeight()',
            errors: [{ message: message }]
        },
        {
            code: '$window.outerWidth()',
            errors: [{ message: message }]
        },
        {
            code: '$window.outerHeight()',
            errors: [{ message: message }]
        }
    ]
});
