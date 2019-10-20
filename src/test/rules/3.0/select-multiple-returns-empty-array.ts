import { rule } from '../../../rules/3.0/select-multiple-returns-empty-array';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'select-multiple with nothing selected returns an empty array in jQuery 3.0';

ruleTester.run('select-multiple-returns-empty-array', rule, {
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
            errors: [{ message }]
        },
        {
            code: '$("").val() !== null',
            errors: [{ message }]
        },
        {
            code: 'null === $("").val()',
            errors: [{ message }]
        },
        {
            code: 'null !== $("").val()',
            errors: [{ message }]
        },
        {
            code: 'elem.val() !== null',
            errors: [{ message }]
        },
        {
            code: '!$("select.year").val()',
            errors: [{ message }]
        },
        {
            code: '!$("#selectCountry").val()',
            errors: [{ message }]
        },
        {
            code: '!!$("#langDropDown").val()',
            errors: [{ message }]
        },
        {
            code: '!!$("div").children("select").eq(0).val()',
            errors: [{ message }]
        },
        {
            code: '!!$("div").find("select").eq(0).val()',
            errors: [{ message }]
        },
        {
            code: '!!dropDown.val()',
            errors: [{ message }]
        },
        {
            code: '!!$("selected-ids").val()',
            errors: [{ message }]
        },
        {
            code: '!!selectedIds.val()',
            errors: [{ message }]
        },
        {
            code: 'var notEmpty = !!selectElem.val();',
            errors: [{ message }]
        },
        {
            code: '{ items: selectedItems.val() }',
            errors: [{ message }]
        },
        {
            code: 'doSomething({ value: selectedItems.val() })',
            errors: [{ message }]
        },
        {
            code: 'obj.doSomething(selectElem.val())',
            errors: [{ message }]
        },
        {
            code: 'var val = selectElem.val();',
            errors: [{ message }]
        },
        {
            code: 'function setId() { ID = selectElem.val(); }',
            errors: [{ message }]
        },
        {
            code: '!!$("#selected-id").val()',
            errors: [{ message }]
        },
        {
            code: '!!selectedId.val()',
            errors: [{ message }]
        },
    ]
});
