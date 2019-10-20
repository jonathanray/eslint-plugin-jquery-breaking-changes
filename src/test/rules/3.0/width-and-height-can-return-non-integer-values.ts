import { rule } from '../../../rules/3.0/width-and-height-can-return-non-integer-values';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = '.width(), .height(), .css("width"), and .css("height") can return non-integer values in jQuery 3.0';

ruleTester.run('width-and-height-can-return-non-integer-values', rule, {
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
