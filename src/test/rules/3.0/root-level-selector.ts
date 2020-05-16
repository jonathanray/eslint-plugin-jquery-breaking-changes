import { rule } from '../../../rules/3.0/root-level-selector';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'Root level jQuery selectors may execute before DOM elements exist in jQuery 3.0';

ruleTester.run('root-level-selector', rule, {
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
