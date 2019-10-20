"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = __importStar(require("assert"));
var espree = __importStar(require("espree"));
var eslint = __importStar(require("eslint"));
var utils = __importStar(require("../rules/utils"));
// @ts-ignore
var Traverser = require('eslint/lib/util/traverser');
var traverser = new Traverser();
describe('utils', function () {
    describe('getAssignedLiteralValue', function () {
        it('should return literal value', function () {
            var src = 'doSomething("expectedValue")';
            var parsed = parseToESLint(src);
            var context = {
                getScope: function () { return getInnerMostChildScope(parsed.globalScope); }
            };
            var callExpression = getCallExpression(parsed.ast, 'doSomething');
            var argument = callExpression.arguments[0];
            var result = utils.getAssignedLiteralValue(argument, context);
            assert.equal(result, 'expectedValue');
        });
        it('should return literal value of variable in same scope', function () {
            var src = "\n\t\t\t\tvar x = 'expectedValue';\n\t\t\t\tdoSomething(x);\n\t\t\t";
            var parsed = parseToESLint(src);
            var context = {
                getScope: function () { return getInnerMostChildScope(parsed.globalScope); }
            };
            var callExpression = getCallExpression(parsed.ast, 'doSomething');
            var argument = callExpression.arguments[0];
            var result = utils.getAssignedLiteralValue(argument, context);
            assert.equal(result, 'expectedValue');
        });
        it('should return literal value of variable one scope up', function () {
            var src = "\n\t\t\t\tvar x = 'expectedValue';\n\n\t\t\t\t(function() {\n\t\t\t\t\tdoSomething(x);\n\t\t\t\t})();\n\t\t\t";
            var parsed = parseToESLint(src);
            var context = {
                getScope: function () { return getInnerMostChildScope(parsed.globalScope); }
            };
            var callExpression = getCallExpression(parsed.ast, 'doSomething');
            var argument = callExpression.arguments[0];
            var result = utils.getAssignedLiteralValue(argument, context);
            assert.equal(result, 'expectedValue');
        });
        it('should return literal value of reassigned variable', function () {
            var src = "\n\t\t\t\tvar x = 10;\n\n\t\t\t\t(function() {\n\t\t\t\t\tx = 'expectedValue';\n\t\t\t\t\tdoSomething(x);\n\t\t\t\t})();\n\t\t\t";
            var parsed = parseToESLint(src);
            var context = {
                getScope: function () { return getInnerMostChildScope(parsed.globalScope); }
            };
            var callExpression = getCallExpression(parsed.ast, 'doSomething');
            var argument = callExpression.arguments[0];
            var result = utils.getAssignedLiteralValue(argument, context);
            assert.equal(result, 'expectedValue');
        });
    });
    describe('getJQuerySelectors', function () {
        it('should return array of selectors if looks object looks like jQuery', function () {
            for (var _i = 0, _a = ['$', 'jQuery', 'jq', '$jqPlugin']; _i < _a.length; _i++) {
                var jq = _a[_i];
                var original = jq + "(\"div#container\").length";
                var node = parseToNode(original);
                var result = utils.getJQuerySelectors(node);
                assert.equal(Array.isArray(result), true);
                assert.equal(result.length, 1);
                assert.equal(result[0], 'div#container');
            }
        });
        it('should return array of selectors if looks like element', function () {
            for (var _i = 0, _a = ['div', 'span', 'elems', 'container', 'divs']; _i < _a.length; _i++) {
                var elem = _a[_i];
                var original = elem + ".find(\"span#container\").children(\"strong\").length";
                var node = parseToNode(original);
                var result = utils.getJQuerySelectors(node);
                assert.equal(Array.isArray(result), true);
                assert.equal(result.length, 2);
                assert.equal(result[0], 'span#container');
                assert.equal(result[1], 'strong');
            }
        });
        it('should return array of selectors if looks like element', function () {
            var original = 'div.find("span#container").children("strong").length';
            var node = parseToNode(original);
            var result = utils.getJQuerySelectors(node);
            assert.equal(Array.isArray(result), true);
            assert.equal(result.length, 2);
            assert.equal(result[0], 'span#container');
            assert.equal(result[1], 'strong');
        });
    });
    describe('getFullExpression', function () {
        it('should return "this" object', function () {
            var original = 'this.property';
            var programNode = espree.parse(original, {});
            var node = programNode.body[0].expression;
            var result = utils.getFullExpression(node);
            assert.equal(result, original);
        });
        it('should return chained properties', function () {
            var original = 'obj1.obj2.obj3.property';
            var programNode = espree.parse(original, {});
            var node = programNode.body[0].expression;
            var result = utils.getFullExpression(node);
            assert.equal(result, original);
        });
        it('should return functions without arguments', function () {
            var original = 'obj1.obj2(true).obj3(function() {}).property';
            var expected = 'obj1.obj2().obj3().property';
            var programNode = espree.parse(original, {});
            var node = programNode.body[0].expression;
            var result = utils.getFullExpression(node);
            assert.equal(result, expected);
        });
    });
    describe('getExcludesFromContextOptions', function () {
        it('should return array with one string if input is non-RegExp string', function () {
            var context = {
                options: [
                    {
                        exclude: 'excludeThis'
                    }
                ]
            };
            var result = utils.getExcludesFromContextOptions(context);
            assert.equal(Array.isArray(result), true);
            assert.equal(result.length, 1);
            assert.equal(result[0], 'excludeThis');
        });
        it('should return array with one RegExp if input is RegExp string', function () {
            var context = {
                options: [
                    {
                        exclude: '/.*/'
                    }
                ]
            };
            var result = utils.getExcludesFromContextOptions(context);
            assert.equal(Array.isArray(result), true);
            assert.equal(result.length, 1);
            assert.equal(typeof result[0], 'object');
            assert.equal(result[0] instanceof RegExp, true);
            assert.equal(result[0].toString(), '/.*/');
        });
        it('should return array with string and RegExp if input is array of strings', function () {
            var context = {
                options: [
                    {
                        exclude: ['excludeThis', '/.*/']
                    }
                ]
            };
            var result = utils.getExcludesFromContextOptions(context);
            assert.equal(Array.isArray(result), true);
            assert.equal(result.length, 2);
            assert.equal(result[0], 'excludeThis');
            assert.equal(typeof result[1], 'object');
            assert.equal(result[1] instanceof RegExp, true);
            assert.equal(result[1].toString(), '/.*/');
        });
    });
    describe('shouldExcludeNode', function () {
        it('should return true when exact match', function () {
            var original = 'obj1.obj2.property';
            var programNode = espree.parse(original, {});
            var node = programNode.body[0].expression;
            var excludes = ['obj1.property', 'obj1.obj2.property', 'obj3.property'];
            var result = utils.shouldExcludeNode(node, excludes);
            assert.equal(result, true);
        });
        it('should return false when not exact match', function () {
            var original = 'obj2.Property';
            var programNode = espree.parse(original, {});
            var node = programNode.body[0].expression;
            var excludes = ['obj1.property', 'obj2.property', 'obj3.property'];
            var result = utils.shouldExcludeNode(node, excludes);
            assert.equal(result, false);
        });
        it('should return true when matches RegExp', function () {
            var original = 'objA.property';
            var programNode = espree.parse(original, {});
            var node = programNode.body[0].expression;
            var excludes = ['obj1.property', /obj[A-Z]\.property/, 'obj3.property'];
            var result = utils.shouldExcludeNode(node, excludes);
            assert.equal(result, true);
        });
        it('should return false when does not match RegExp', function () {
            var original = 'objABC.property';
            var programNode = espree.parse(original, {});
            var node = programNode.body[0].expression;
            var excludes = ['obj1.property', /obj[A-Z]\.property/, 'obj3.property'];
            var result = utils.shouldExcludeNode(node, excludes);
            assert.equal(result, false);
        });
        it('should return true when matches "this" object', function () {
            var original = 'this.property';
            var programNode = espree.parse(original, {});
            var node = programNode.body[0].expression;
            var excludes = ['obj1.property', 'this.property', 'obj3.property'];
            var result = utils.shouldExcludeNode(node, excludes);
            assert.equal(result, true);
        });
        it('should return true when exact except last parentheses', function () {
            var original = 'func1(true).obj2.func3("")';
            var programNode = espree.parse(original, {});
            var node = programNode.body[0].expression;
            var excludes = ['func1().obj2.func3'];
            var result = utils.shouldExcludeNode(node, excludes);
            assert.equal(result, true);
        });
        it('should return true when exact match with parentheses', function () {
            var original = 'func1(true).obj2.func3("")';
            var programNode = espree.parse(original, {});
            var node = programNode.body[0].expression;
            var excludes = ['func1().obj2.func3()'];
            var result = utils.shouldExcludeNode(node, excludes);
            assert.equal(result, true);
        });
        it('should return true when exact match with parentheses', function () {
            var original = 'func1(true).obj2.obj3';
            var programNode = espree.parse(original, {});
            var node = programNode.body[0].expression;
            var excludes = ['func1().obj2.obj3'];
            var result = utils.shouldExcludeNode(node, excludes);
            assert.equal(result, true);
        });
    });
});
function parseToESLint(source) {
    // @ts-ignore
    var linter = eslint.linter;
    linter.reset();
    var errors = linter.verify(source);
    if (errors.length) {
        throw errors[0];
    }
    var sourceCode = linter.getSourceCode();
    return {
        ast: sourceCode.ast,
        globalScope: linter.getScope()
    };
}
function parseToNode(source) {
    var ast = parseToESLint(source).ast;
    return ast.body[0].expression;
}
function getCallExpression(ast, functionName) {
    var callExpression;
    // @ts-ignore
    traverser.traverse(ast, {
        enter: function (node, parent) {
            if (utils.isCallExpression(node) && utils.isIdentifier(node.callee, functionName)) {
                callExpression = node;
            }
        }
    });
    return callExpression;
}
function getInnerMostChildScope(globalScope) {
    var childScope = globalScope;
    while (childScope.childScopes.length > 0) {
        childScope = childScope.childScopes[0];
    }
    return childScope;
}
