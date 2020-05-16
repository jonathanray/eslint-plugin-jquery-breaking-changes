"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const root_level_selector_1 = require("../../../rules/3.0/root-level-selector");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'Root level jQuery selectors may execute before DOM elements exist in jQuery 3.0';
ruleTester.run('root-level-selector', root_level_selector_1.rule, {
    valid: [
        `$(document).ready(function () {
            $("div").show();
        });`,
        `$(function () {
            $("div").show();
        });`,
    ],
    invalid: [
        {
            code: '$("div").show();',
            errors: [{ message }]
        },
        {
            code: '$("div").on("click", function () {});',
            errors: [{ message }]
        },
        {
            code: `(function() {
                $("div").on("click", function () {});
            }());`,
            errors: [{ message }]
        }
    ]
});
