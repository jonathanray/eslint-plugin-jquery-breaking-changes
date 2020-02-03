"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const removeAttr_with_boolean_attribute_1 = require("../../../rules/3.0/removeAttr-with-boolean-attribute");
const utils = require("../../../rules/utils");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = '.removeAttr() no longer sets properties to false in jQuery 3.0';
const invalid = [];
utils.booleanAttributes.forEach((attr) => {
    invalid.push({
        code: `$("").removeAttr("${attr}")`,
        errors: [{ message }]
    });
    invalid.push({
        code: `$("").removeAttr(${attr}Attr)`,
        errors: [{ message }]
    });
});
ruleTester.run('removeAttr-with-boolean-attribute', removeAttr_with_boolean_attribute_1.rule, {
    valid: [
        '$("").removeAttr("data-id")',
        '$("").removeAttr(dataId)',
        'elem.removeAttr("data-id")',
        'elem.removeAttr(dataId)'
    ],
    invalid
});
