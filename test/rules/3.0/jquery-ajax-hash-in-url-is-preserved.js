"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_ajax_hash_in_url_is_preserved_1 = require("../../../rules/3.0/jquery-ajax-hash-in-url-is-preserved");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'Hash in a URL is preserved in a jQuery.ajax() call in jQuery 3.0';
ruleTester.run('jquery-ajax-hash-in-url-is-preserved', jquery_ajax_hash_in_url_is_preserved_1.rule, {
    valid: [
        '$.ajax("https://site.com/api/item/1")',
        '$.get("https://site.com/api/item/1")',
        '$.post("https://site.com/api/item/1")',
        '$elem.load("https://site.com/api/item/1")',
        '$.ajax({ url: "https://site.com/api/item/1" })',
        '$.get({ url: "https://site.com/api/item/1" })',
        '$.post({ url: "https://site.com/api/item/1" })',
        '$elem.load({ url: "https://site.com/api/item/1" })',
        '$.notAjax({ url: "https://site.com/api/item/1#hash" })',
    ],
    invalid: [
        {
            code: '$.ajax("https://site.com/api/item/1#hash")',
            errors: [{ message: message }]
        },
        {
            code: '$.get("https://site.com/api/item/1#hash")',
            errors: [{ message: message }]
        },
        {
            code: '$.post("https://site.com/api/item/1#hash")',
            errors: [{ message: message }]
        },
        {
            code: '$elem.load("https://site.com/api/item/1#hash")',
            errors: [{ message: message }]
        },
        {
            code: '$.ajax({ url: "https://site.com/api/item/1#hash" })',
            errors: [{ message: message }]
        },
        {
            code: '$.get({ url: "https://site.com/api/item/1#hash" })',
            errors: [{ message: message }]
        },
        {
            code: '$.post({ url: "https://site.com/api/item/1#hash" })',
            errors: [{ message: message }]
        },
        {
            code: '$elem.load({ url: "https://site.com/api/item/1#hash" })',
            errors: [{ message: message }]
        }
    ]
});
