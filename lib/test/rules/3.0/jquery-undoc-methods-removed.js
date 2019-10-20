"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_undoc_methods_removed_1 = require("../../../rules/3.0/jquery-undoc-methods-removed");
const eslint_1 = require("eslint");
const ruleTester = new eslint_1.RuleTester();
const message = 'Undocumented internal methods no longer exposed in jQuery 3.0';
ruleTester.run('jquery-undoc-methods-removed', jquery_undoc_methods_removed_1.rule, {
    valid: [
        'obj.buildFragment()',
        'obj.domManip()',
        'obj.swap()'
    ],
    invalid: [
        {
            code: '$.buildFragment()',
            errors: [{ message }]
        },
        {
            code: '$.domManip()',
            errors: [{ message }]
        },
        {
            code: '$.swap()',
            errors: [{ message }]
        }
    ]
});
