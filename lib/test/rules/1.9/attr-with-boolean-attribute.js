"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attr_with_boolean_attribute_1 = require("../../../rules/1.9/attr-with-boolean-attribute");
const utils = require("../../../rules/utils");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'Use .prop(...) instead of .attr(...) for boolean attributes in jQuery 1.9';
const invalid = [];
utils.booleanAttributes.forEach((attr) => {
    invalid.push({
        code: `$("").attr("${attr}")`,
        errors: [{ message }]
    });
    invalid.push({
        code: `$("").attr("${attr}", "${attr}")`,
        errors: [{ message }]
    });
    invalid.push({
        code: `$("").attr(${attr}Attr)`,
        errors: [{ message }]
    });
    invalid.push({
        code: `$("").attr(anyAttr, "${attr}")`,
        errors: [{ message }]
    });
    invalid.push({
        code: `var obj = { attr: "${attr}" }; $("").attr(obj.attr);`,
        errors: [{ message }]
    });
    invalid.push({
        code: `var obj = { "${attr}": "${attr}" }; $("").attr(obj);`,
        errors: [{ message }]
    });
    invalid.push({
        code: `var obj = { prop: "${attr}" }; $("").attr(obj.attr, obj.prop);`,
        errors: [{ message }]
    });
});
ruleTester.run('attr-with-boolean-attribute', attr_with_boolean_attribute_1.rule, {
    valid: [
        '$("").attr("data-id")',
        '$("").attr(dataId)',
        'elem.attr("data-id")',
        'elem.attr(dataId)',
        '$("").attr(attribute, true)',
        '$("").attr({ "data-id": 1 })',
        '$("").attr(obj.attr, obj.prop);',
    ],
    invalid
});
