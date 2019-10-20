"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_uuid_removed_1 = require("../../../rules/1.9/jquery-uuid-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'jQuery.uuid removed in jQuery 1.9';
ruleTester.run('jquery-uuid-removed', jquery_uuid_removed_1.rule, {
    valid: [
        'test.uuid'
    ],
    invalid: [
        {
            code: '$.uuid',
            errors: [{ message }]
        }
    ]
});
