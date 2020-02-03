import { rule } from '../../../rules/3.0/removeAttr-with-boolean-attribute';
import * as utils from '../../../rules/utils';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.removeAttr() no longer sets properties to false in jQuery 3.0';

const invalid: RuleTester.InvalidTestCase[] = [];

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

ruleTester.run('removeAttr-with-boolean-attribute', rule, {
    valid: [
        '$("").removeAttr("data-id")',
        '$("").removeAttr(dataId)',
        'elem.removeAttr("data-id")',
        'elem.removeAttr(dataId)'
    ],

    invalid
});
