"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const return_values_on_empty_sets_are_undefined_1 = require("../../../rules/3.0/return-values-on-empty-sets-are-undefined");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'Return values on empty sets are undefined in jQuery 3.0';
const affectedMethods = [
    'width', 'height', 'innerWidth', 'innerHeight', 'outerWidth', 'outerHeight',
    'offsetTop', 'offsetLeft' // Offset methods
];
const valid = [];
const invalid = [];
affectedMethods.forEach((methodName) => {
    valid.push(`$("input").${methodName}()`);
    valid.push(`$("input").${methodName}() === undefined`);
    valid.push(`!$("input").${methodName}()`);
    valid.push(`$("input").${methodName}(someValue)`);
    valid.push(`$("input").${methodName}('')`);
    invalid.push({
        code: `$("input").${methodName}() === null`,
        errors: [{ message }]
    });
    invalid.push({
        code: `$("input").${methodName}() !== null`,
        errors: [{ message }]
    });
    invalid.push({
        code: `null === $("input").${methodName}()`,
        errors: [{ message }]
    });
    invalid.push({
        code: `var ${methodName} = $("input").${methodName}()`,
        errors: [{ message }]
    });
    invalid.push({
        code: `var obj = { ${methodName}: $("input").${methodName}() }`,
        errors: [{ message }]
    });
    invalid.push({
        code: `function f() { return $("input").${methodName}(); }`,
        errors: [{ message }]
    });
});
ruleTester.run('return-values-on-empty-sets-are-undefined', return_values_on_empty_sets_are_undefined_1.rule, {
    valid,
    invalid
});
