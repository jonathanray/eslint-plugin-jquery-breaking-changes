"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_name_with_periods_1 = require("../../../rules/1.9/data-name-with-periods");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'events not fired by .data("name.with.periods") in jQuery 1.9';
ruleTester.run('data-name-with-periods', data_name_with_periods_1.rule, {
    valid: [
        '$("").data("something")'
    ],
    invalid: [
        {
            code: '$("").data("abc.def")',
            errors: [{ message }]
        }
    ]
});
