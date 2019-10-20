"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_names_with_periods_1 = require("../../../rules/1.9/data-names-with-periods");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'events not fired by .data("name.with.periods") in jQuery 1.9';
ruleTester.run('data-names-with-periods', data_names_with_periods_1.rule, {
    valid: [
        '$("").data("something")'
    ],
    invalid: [
        {
            code: '$("").data("abc.def")',
            errors: [{ message: message }]
        }
    ]
});
