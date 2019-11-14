"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_object_with_dash_1 = require("../../../rules/3.0/data-object-with-dash");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'Internal data object properties are camelCase (no dashes) in jQuery 3.0';
ruleTester.run('data-object-with-dashes', data_object_with_dash_1.rule, {
    valid: [
        '$("").data()',
        'var abcDef = data["abc-def"]'
    ],
    invalid: [
        {
            code: `
                var someObj = $("").data();
                var abcDef = someObj["abc-def"];`,
            errors: [{ message }]
        },
        {
            code: `
                var someObj = $("").data();
                function doSomething() {
                    var abcDef = someObj["abc-def"];   
                }`,
            errors: [{ message }]
        }
    ]
});
