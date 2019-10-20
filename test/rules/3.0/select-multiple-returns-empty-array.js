"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var select_multiple_returns_empty_array_1 = require("../../../rules/3.0/select-multiple-returns-empty-array");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'select-multiple with nothing selected returns an empty array in jQuery 3.0';
ruleTester.run('select-multiple-returns-empty-array', select_multiple_returns_empty_array_1.rule, {
    valid: [
        '$("select").val() == undefined',
        '$("select").val() === undefined',
        '$("select").val() == ""',
        '$("select").val() === ""',
        '$("select").val() == []',
        '$("select").val() === []',
        'undefined === $("select").val()',
        '"" === $("select").val()',
        '[] === $("select").val()',
        '!!$input.val()',
        '!$("input").val()',
        'selectElem.val().doSomething()',
        'function getId() { return { ID: $("#id").val() }; }',
        '{ value: $("input").val() }',
        '{ value: $input.val() }',
        'doSomething($("input").val())',
        'doSomething($(this).val())',
    ],
    invalid: [
        {
            code: '$("").val() === null',
            errors: [{ message: message }]
        },
        {
            code: '$("").val() !== null',
            errors: [{ message: message }]
        },
        {
            code: 'null === $("").val()',
            errors: [{ message: message }]
        },
        {
            code: 'null !== $("").val()',
            errors: [{ message: message }]
        },
        {
            code: 'elem.val() !== null',
            errors: [{ message: message }]
        },
        {
            code: '!$("select.year").val()',
            errors: [{ message: message }]
        },
        {
            code: '!$("#selectCountry").val()',
            errors: [{ message: message }]
        },
        {
            code: '!!$("#langDropDown").val()',
            errors: [{ message: message }]
        },
        {
            code: '!!$("div").children("select").eq(0).val()',
            errors: [{ message: message }]
        },
        {
            code: '!!$("div").find("select").eq(0).val()',
            errors: [{ message: message }]
        },
        {
            code: '!!dropDown.val()',
            errors: [{ message: message }]
        },
        {
            code: '!!$("selected-ids").val()',
            errors: [{ message: message }]
        },
        {
            code: '!!selectedIds.val()',
            errors: [{ message: message }]
        },
        {
            code: 'var notEmpty = !!selectElem.val();',
            errors: [{ message: message }]
        },
        {
            code: '{ items: selectedItems.val() }',
            errors: [{ message: message }]
        },
        {
            code: 'doSomething({ value: selectedItems.val() })',
            errors: [{ message: message }]
        },
        {
            code: 'obj.doSomething(selectElem.val())',
            errors: [{ message: message }]
        },
        {
            code: 'var val = selectElem.val();',
            errors: [{ message: message }]
        },
        {
            code: 'function setId() { ID = selectElem.val(); }',
            errors: [{ message: message }]
        },
        {
            code: '!!$("#selected-id").val()',
            errors: [{ message: message }]
        },
        {
            code: '!!selectedId.val()',
            errors: [{ message: message }]
        },
    ]
});
