"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ajax_events_should_be_attached_to_document_1 = require("../../../rules/1.9/ajax-events-should-be-attached-to-document");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var ajaxEventNames = [
    'ajaxStart',
    'ajaxStop',
    'ajaxSend',
    'ajaxComplete',
    'ajaxError',
    'ajaxSuccess'
];
var valid = [];
var invalid = [];
ajaxEventNames.forEach(function (ajaxEventName) {
    valid.push("$(document)." + ajaxEventName + "(function() {})");
    valid.push("$(window.document)." + ajaxEventName + "(function() {})");
    invalid.push({
        code: "$(\"\")." + ajaxEventName + "(function() {})",
        errors: [{ message: "." + ajaxEventName + "() should be attached to document in jQuery 1.9" }]
    });
});
ruleTester.run('ajax-events-should-be-attached-to-document', ajax_events_should_be_attached_to_document_1.rule, {
    valid: valid,
    invalid: invalid
});
