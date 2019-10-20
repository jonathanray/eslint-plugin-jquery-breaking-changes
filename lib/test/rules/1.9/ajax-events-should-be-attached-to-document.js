"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ajax_events_should_be_attached_to_document_1 = require("../../../rules/1.9/ajax-events-should-be-attached-to-document");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const ajaxEventNames = [
    'ajaxStart',
    'ajaxStop',
    'ajaxSend',
    'ajaxComplete',
    'ajaxError',
    'ajaxSuccess'
];
const valid = [];
const invalid = [];
ajaxEventNames.forEach((ajaxEventName) => {
    valid.push(`$(document).${ajaxEventName}(function() {})`);
    valid.push(`$(window.document).${ajaxEventName}(function() {})`);
    invalid.push({
        code: `$("").${ajaxEventName}(function() {})`,
        errors: [{ message: `.${ajaxEventName}() should be attached to document in jQuery 1.9` }]
    });
});
ruleTester.run('ajax-events-should-be-attached-to-document', ajax_events_should_be_attached_to_document_1.rule, {
    valid,
    invalid
});
