import { rule } from '../../../rules/3.0/return-values-on-empty-sets-are-undefined';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'Return values on empty sets are undefined in jQuery 3.0';

const affectedMethods = [
    'width', 'height', 'innerWidth', 'innerHeight', 'outerWidth', 'outerHeight', // Dimensional methods
    'offsetTop', 'offsetLeft' // Offset methods
];

const valid: Array<string | RuleTester.ValidTestCase> = [];
const invalid: RuleTester.InvalidTestCase[] = [];

affectedMethods.forEach((methodName) => {
    valid.push(`$("input").${methodName}()`);
    valid.push(`$("input").${methodName}() === undefined`);
    valid.push(`!$("input").${methodName}()`);
    valid.push(`$("input").${methodName}(someValue)`);

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


ruleTester.run('return-values-on-empty-sets-are-undefined', rule, {
    valid,

    invalid
});
