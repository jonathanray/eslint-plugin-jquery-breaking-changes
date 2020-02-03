import { rule } from '../../../rules/1.9/attr-with-boolean-attribute';
import * as utils from '../../../rules/utils';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'Use .prop(...) instead of .attr(...) for boolean attributes in jQuery 1.9';

const invalid: RuleTester.InvalidTestCase[] = [];

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
        code: `var obj = { prop: "${attr}" }; $("").attr(obj.attr, obj.prop);`, // obj.attr is undefined
        errors: [{ message }]
    });
});

ruleTester.run('attr-with-boolean-attribute', rule, {
    valid: [
        '$("").attr("data-id")',
        '$("").attr(dataId)',
        'elem.attr("data-id")',
        'elem.attr(dataId)',
        '$("").attr(attribute, true)',
        '$("").attr({ "data-id": 1 })',
        '$("").attr(obj.attr, obj.prop);', // obj is undefined
    ],

    invalid
});
