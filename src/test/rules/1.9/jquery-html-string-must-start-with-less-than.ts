import { rule } from '../../../rules/1.9/jquery-html-string-must-start-with-less-than';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery(htmlString) must start with "<" in jQuery 1.9';

ruleTester.run('jquery-html-string-must-start-with-less-than', rule, {
    valid: [
        '$("div")',
        '$("#id")',
        '$(".container")',
        '$("1 < 2")',
        '$("<div></div>")',
        'var html = "Should <em>pass</em>"',
        'var html = "<div></div>"',
        'var html = "<div></div>"; $(html)',
        `
            var attr = 'class="a"';
            $("<div " + attr + "></div>");
        `
    ],

    invalid: [
        {
            code: '$("Should <em>fail</em>")',
            errors: [{ message }]
        },
        {
            code: `
                var em = '<em>fail</em>';
                $("Should " + em);
            `,
            errors: [{ message }]
        },
    ]
});
