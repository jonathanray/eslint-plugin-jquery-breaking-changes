"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_undoc_methods_removed_1 = require("../../../rules/3.0/jquery-undoc-methods-removed");
var eslint_1 = require("eslint");
var ruleTester = new eslint_1.RuleTester();
var message = 'Undocumented internal methods no longer exposed in jQuery 3.0';
ruleTester.run('jquery-undoc-methods-removed', jquery_undoc_methods_removed_1.rule, {
    valid: [
        'obj.buildFragment()',
        'obj.domManip()',
        'obj.swap()'
    ],
    invalid: [
        {
            code: '$.buildFragment()',
            errors: [{ message: message }]
        },
        {
            code: '$.domManip()',
            errors: [{ message: message }]
        },
        {
            code: '$.swap()',
            errors: [{ message: message }]
        }
    ]
});
