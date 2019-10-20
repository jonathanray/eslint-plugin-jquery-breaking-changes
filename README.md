# eslint-plugin-jquery-breaking-changes

This ESLint plugin helps you make your code compatible with jQuery 1.9 so you can then upgrade to jQuery 3.x. It also helps you make your code compatible with jQuery 3.x so that you don't need to keep relying on jquery-migrate in production. Note that jquery-migrate doesn't patch all jQuery calls so this is still handy even if you don't mind running jquery-migrate in production.

**Note:** If you don't use jQuery UI or many other jQuery plugins and don't need to support old browsers try the [eslint-plugin-jquery](https://github.com/dgraham/eslint-plugin-jquery) instead to remove your dependency on jQuery. If you have a legacy project that relies on jQuery then this plugin will help you upgrade to the latest version.

## Disclaimers

In order to catch as many breaking changes as possible, this plugin may report a large number of false positives. It also fails to detect breaking changes when using uncommon code conventions. If this does not fit your needs then feel free to fork this project. Here are a few important assumptions and shortcomings:
* It assumes jQuery is referenced by `$`, `jQuery`, or by an identifier starting with `$j` or `jq`.
* It assumes jQuery functions have not been renamed or overridden.
* It can only determine variable values when declared in the same file. It will not follow imports.

This was not intended to be a permanent plugin in your application, although it can be if you want to ensure old jQuery code doesn't creep back in. Either way, you probably don't want to pollute your code with ESLint comments so each rule can be configured to exclude specific patterns. See the [Exclude false positives](#exclude-false-positives) section below.

There are no _fixable_ rules because of the potentially high rate of false positives and added development time. There are no plans to implement fixes.

## Install

```
$ npm install --save-dev @jonathanray/eslint-plugin-jquery-breaking-changes
```

**Note:** This plugin is not currently on npmjs.org so install from the github repository. If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-jquery-breaking-changes` globally.

## Usage

Add `jquery-breaking-changes` to the plugins section of your `.eslintrc.json` configuration file. You can omit the `eslint-plugin-` prefix. You should probably start by extending the `1.9` rules. After addressing all these issues you can extend the `3.0` rules. Note that `all` is the same as `3.0` and both include the `1.9` rules. 

```json
{
    "plugins": [
        "jquery-breaking-changes"
    ],
    "extends": [
        "plugin:jquery-breaking-changes/1.9"
    ]
}
```

## Exclude false positives
False positives can be excluded by supplying a string or regular expression (as a string if your ESLint config file is JSON) to each rule's configuration. This prevents adding exceptions in your code. For example, to prevent calls to `toastr.error()` from being reported by the `load-unload-and-error-removed` rule:

```json
{
    "rules": {
        "jquery-breaking-changes/load-unload-and-error-removed": [
            "error",
            {
                "exclude": [
                    "toastr.error()"
                ]
            }
        ]
    }
}
```
**Note:** When excluding function calls the parentheses are optional. Specifying `"toastr.error"` would have the same result. Do not add any arguments inside the parentheses because they will not be used to match.

## How to make your code compatible with lastest jQuery
When starting with jQuery 1.x:
* Upgrade to latest jQuery 1.x.
* Upgrade all jQuery plugins paying attention to their required version.
* Run this ESLint plugin targeting 1.9 rules and address all reported problems.
* Install latest [jquery-migrate](https://github.com/jquery/jquery-migrate) 1.x.
* Test your application while looking for JQMIGRATE warnings in the browser console. It may help to turn on the "Preserve log" option in dev tools.
* Once your code is compatible with the latest jQuery 1.x you should be able to remove jquery-migrate 1.x and continue to the next step.

When starting with jQuery 3.x
* Upgrade to latest jQuery 3.x
* Upgrade all jQuery plugins paying attention to their required version.
* Run this ESLint plugin targeting 3.0 rules and address all reported problems
* Install latest [jquery-migrate](https://github.com/jquery/jquery-migrate) 3.x
* Test your application while looking for JQMIGRATE warnings in the browser console. It may help to turn on the "Preserve log" option in dev tools.
* Once your code is compatible with the latest jQuery 3.x you should be able to remove jquery-migrate 3.x.
