import { rule } from '../../../rules/1.9/jquery-html-string-must-start-with-less-than';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery(htmlString) must start with "<" in jQuery 1.9';

ruleTester.run('jquery-html-string-must-start-with-less-than', rule, {
    valid: [
        '$("div")',
        '$("#id")',
        '$(".container")',
        '$("<div></div>")',
        'var html = "<div></div>"',
        'var html = "1 < 2"'
    ],

    invalid: [
        {
            code: '$("Should <em>fail</em>")',
            errors: [{ message }]
        },
        {
            code: 'var html = "Should <em>fail</em>"',
            errors: [{ message }]
        },
    ]
});
