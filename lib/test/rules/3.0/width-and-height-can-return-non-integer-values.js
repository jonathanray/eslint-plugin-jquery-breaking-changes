"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const width_and_height_can_return_non_integer_values_1 = require("../../../rules/3.0/width-and-height-can-return-non-integer-values");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.width(), .height(), .css("width"), and .css("height") can return non-integer values in jQuery 3.0';
ruleTester.run('width-and-height-can-return-non-integer-values', width_and_height_can_return_non_integer_values_1.rule, {
    valid: [
        '$("").width(100)',
        '$("").height(100)',
        '$("").css("width", 100)',
        '$("").css("height", 100)',
    ],
    invalid: [
        {
            code: '$("").width()',
            errors: [{ message }]
        },
        {
            code: '$("").height()',
            errors: [{ message }]
        },
        {
            code: '$("").css("width")',
            errors: [{ message }]
        },
        {
            code: '$("").css("height")',
            errors: [{ message }]
        },
        {
            code: '$("").css(widthAttr)',
            errors: [{ message }]
        },
        {
            code: '$("").css(heightAttr)',
            errors: [{ message }]
        },
        {
            code: '$("").css(obj.widthProp)',
            errors: [{ message }]
        },
        {
            code: '$("").css(obj.heightProp)',
            errors: [{ message }]
        }
    ]
});
