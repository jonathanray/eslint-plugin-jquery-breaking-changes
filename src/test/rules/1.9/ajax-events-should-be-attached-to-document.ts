import { rule } from '../../../rules/1.9/ajax-events-should-be-attached-to-document';
import { RuleTester, } from 'eslint';

const ruleTester = new RuleTester();

const ajaxEventNames = [
    'ajaxStart',
    'ajaxStop',
    'ajaxSend',
    'ajaxComplete',
    'ajaxError',
    'ajaxSuccess'
];

const valid: Array<string | RuleTester.ValidTestCase> = [];
const invalid: RuleTester.InvalidTestCase[] = [];

ajaxEventNames.forEach((ajaxEventName) => {
    valid.push(`$(document).${ajaxEventName}(function() {})`);
    valid.push(`$(window.document).${ajaxEventName}(function() {})`);

    invalid.push({
        code: `$("").${ajaxEventName}(function() {})`,
        errors: [{ message: `.${ajaxEventName}() should be attached to document in jQuery 1.9` }]
    });
});

ruleTester.run('ajax-events-should-be-attached-to-document', rule, {
    valid,

    invalid
});
