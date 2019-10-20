"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var return_values_on_empty_sets_are_undefined_1 = require("../../../rules/3.0/return-values-on-empty-sets-are-undefined");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'Return values on empty sets are undefined in jQuery 3.0';
var affectedMethods = [
    'width', 'height', 'innerWidth', 'innerHeight', 'outerWidth', 'outerHeight',
    'offsetTop', 'offsetLeft' // Offset methods
];
var valid = [];
var invalid = [];
affectedMethods.forEach(function (methodName) {
    valid.push("$(\"input\")." + methodName + "()");
    valid.push("$(\"input\")." + methodName + "() === undefined");
    valid.push("!$(\"input\")." + methodName + "()");
    valid.push("$(\"input\")." + methodName + "(someValue)");
    invalid.push({
        code: "$(\"input\")." + methodName + "() === null",
        errors: [{ message: message }]
    });
    invalid.push({
        code: "$(\"input\")." + methodName + "() !== null",
        errors: [{ message: message }]
    });
    invalid.push({
        code: "null === $(\"input\")." + methodName + "()",
        errors: [{ message: message }]
    });
    invalid.push({
        code: "var " + methodName + " = $(\"input\")." + methodName + "()",
        errors: [{ message: message }]
    });
    invalid.push({
        code: "var obj = { " + methodName + ": $(\"input\")." + methodName + "() }",
        errors: [{ message: message }]
    });
    invalid.push({
        code: "function f() { return $(\"input\")." + methodName + "(); }",
        errors: [{ message: message }]
    });
});
ruleTester.run('return-values-on-empty-sets-are-undefined', return_values_on_empty_sets_are_undefined_1.rule, {
    valid: valid,
    invalid: invalid
});
