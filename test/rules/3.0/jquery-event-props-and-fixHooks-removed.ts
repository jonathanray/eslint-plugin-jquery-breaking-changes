import { rule } from '../../../rules/3.0/jquery-event-props-and-fixHooks-removed';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();
const message = 'jQuery.event.props and jQuery.event.fixHooks removed in jQuery 3.0';

ruleTester.run('jquery-event-props-and-fixHooks-removed', rule, {
    valid: [
        '$.event.other',
        'event.props',
        'event.fixHooks'
    ],

    invalid: [
        {
            code: '$.event.props.indexOf("")',
            errors: [{ message }]
        },
        {
            code: '$.event.fixHooks[eventType] = function() {}',
            errors: [{ message }]
        }
    ]
});
