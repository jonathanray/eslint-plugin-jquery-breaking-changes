"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_html_string_must_start_with_less_than_1 = require("../../../rules/1.9/jquery-html-string-must-start-with-less-than");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery(htmlString) must start with "<" in jQuery 1.9';
ruleTester.run('jquery-html-string-must-start-with-less-than', jquery_html_string_must_start_with_less_than_1.rule, {
    valid: [
        '$("div")',
        '$("#id")',
        '$(".container")',
        '$("<div></div>")',
        'var html = "<div></div>"',
        'var html = "1 < 2"'
    ],
    invalid: [
        {
            code: '$("Should <em>fail</em>")',
            errors: [{ message: message }]
        },
        {
            code: 'var html = "Should <em>fail</em>"',
            errors: [{ message: message }]
        },
    ]
});
