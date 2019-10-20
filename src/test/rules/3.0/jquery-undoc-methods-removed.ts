import { rule } from '../../../rules/3.0/jquery-undoc-methods-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'Undocumented internal methods no longer exposed in jQuery 3.0';

ruleTester.run('jquery-undoc-methods-removed', rule, {
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
