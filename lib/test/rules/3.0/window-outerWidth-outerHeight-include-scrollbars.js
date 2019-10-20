"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const window_outerWidth_outerHeight_include_scrollbars_1 = require("../../../rules/3.0/window-outerWidth-outerHeight-include-scrollbars");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.outerWidth() or .outerHeight() on window includes scrollbar width/height in jQuery 3.0';
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
            errors: [{ message }]
        },
        {
            code: '$(window).outerHeight()',
            errors: [{ message }]
        },
        {
            code: '$window.outerWidth()',
            errors: [{ message }]
        },
        {
            code: '$window.outerHeight()',
            errors: [{ message }]
        }
    ]
});
