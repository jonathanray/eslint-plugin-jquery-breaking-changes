"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_uuid_removed_1 = require("../../../rules/1.9/jquery-uuid-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'jQuery.uuid removed in jQuery 1.9';
ruleTester.run('jquery-uuid-removed', jquery_uuid_removed_1.rule, {
    valid: [
        'test.uuid'
    ],
    invalid: [
        {
            code: '$.uuid',
            errors: [{ message: message }]
        }
    ]
});
