import * as assert from 'assert';
import * as espree from 'espree';
import * as estree from 'estree';
import * as eslint from 'eslint';
import * as utils from '../rules/utils';

// @ts-ignore
const Traverser = require('eslint/lib/util/traverser');
const traverser = new Traverser();

describe('utils', () => {
	describe('getAssignedLiteralValue', () => {
		it('should return literal value', () => {
			const src = 'doSomething("expectedValue")';

			const parsed = parseToESLint(src);
			const context = {
				getScope: () => getInnerMostChildScope(parsed.globalScope)
			} as eslint.Rule.RuleContext;

			const callExpression = getCallExpression(parsed.ast, 'doSomething');
			const argument = callExpression.arguments[0];

			const result = utils.getAssignedLiteralValue(argument, context);
			assert.equal(result, 'expectedValue');
		});

		it('should return literal value of variable in same scope', () => {
			const src = `
				var x = 'expectedValue';
				doSomething(x);
			`;

			const parsed = parseToESLint(src);
			const context = {
				getScope: () => getInnerMostChildScope(parsed.globalScope)
			} as eslint.Rule.RuleContext;

			const callExpression = getCallExpression(parsed.ast, 'doSomething');
			const argument = callExpression.arguments[0];

			const result = utils.getAssignedLiteralValue(argument, context);
			assert.equal(result, 'expectedValue');
		});

		it('should return literal value of variable one scope up', () => {
			const src = `
				var x = 'expectedValue';

				(function() {
					doSomething(x);
				})();
			`;

			const parsed = parseToESLint(src);
			const context = {
				getScope: () => getInnerMostChildScope(parsed.globalScope)
			} as eslint.Rule.RuleContext;

			const callExpression = getCallExpression(parsed.ast, 'doSomething');
			const argument = callExpression.arguments[0];

			const result = utils.getAssignedLiteralValue(argument, context);
			assert.equal(result, 'expectedValue');
		});

		it('should return literal value of reassigned variable', () => {
			const src = `
				var x = 10;

				(function() {
					x = 'expectedValue';
					doSomething(x);
				})();
			`;

			const parsed = parseToESLint(src);
			const context = {
				getScope: () => getInnerMostChildScope(parsed.globalScope)
			} as eslint.Rule.RuleContext;

			const callExpression = getCallExpression(parsed.ast, 'doSomething');
			const argument = callExpression.arguments[0];

			const result = utils.getAssignedLiteralValue(argument, context);
			assert.equal(result, 'expectedValue');
		});
	});

	describe('getJQuerySelectors', () => {
		it('should return array of selectors if looks object looks like jQuery', () => {
			for (const jq of ['$', 'jQuery', 'jq', '$jqPlugin']) {
				const original = `${jq}("div#container").length`;
				const node = parseToNode(original);

				const result = utils.getJQuerySelectors(node);
				assert.equal(Array.isArray(result), true);
				assert.equal(result.length, 1);
				assert.equal(result[0], 'div#container');
			}
		});

		it('should return array of selectors if looks like element', () => {
			for (const elem of ['div', 'span', 'elems', 'container', 'divs']) {
				const original = `${elem}.find("span#container").children("strong").length`;
				const node = parseToNode(original);
				const result = utils.getJQuerySelectors(node);
				assert.equal(Array.isArray(result), true);
				assert.equal(result.length, 2);
				assert.equal(result[0], 'span#container');
				assert.equal(result[1], 'strong');
			}
		});

		it('should return array of selectors if looks like element', () => {
			const original = 'div.find("span#container").children("strong").length';
			const node = parseToNode(original);
			const result = utils.getJQuerySelectors(node)
			assert.equal(Array.isArray(result), true);
			assert.equal(result.length, 2);
			assert.equal(result[0], 'span#container');
			assert.equal(result[1], 'strong');
		});
	});

	describe('getFullExpression', () => {
		it('should return "this" object', () => {
			const original = 'this.property';
			const programNode = espree.parse(original, {});
			const node = programNode.body[0].expression;
			const result = utils.getFullExpression(node);
			assert.equal(result, original);
		});

		it('should return chained properties', () => {
			const original = 'obj1.obj2.obj3.property';
			const programNode = espree.parse(original, {});
			const node = programNode.body[0].expression;
			const result = utils.getFullExpression(node);
			assert.equal(result, original);
		});

		it('should return functions without arguments', () => {
			const original = 'obj1.obj2(true).obj3(function() {}).property';
			const expected = 'obj1.obj2().obj3().property';
			const programNode = espree.parse(original, {});
			const node = programNode.body[0].expression;
			const result = utils.getFullExpression(node);
			assert.equal(result, expected);
		});
	});

	describe('getExcludesFromContextOptions', () => {
		it('should return array with one string if input is non-RegExp string', () => {
			const context = {
				options: [
					{
						exclude: 'excludeThis'
					}
				]
			} as eslint.Rule.RuleContext;

			const result = utils.getExcludesFromContextOptions(context);
			assert.equal(Array.isArray(result), true);
			assert.equal(result.length, 1);
			assert.equal(result[0], 'excludeThis');
		});

		it('should return array with one RegExp if input is RegExp string', () => {
			const context = {
				options: [
					{
						exclude: '/.*/'
					}
				]
			} as eslint.Rule.RuleContext;

			const result = utils.getExcludesFromContextOptions(context);
			assert.equal(Array.isArray(result), true);
			assert.equal(result.length, 1);
			assert.equal(typeof result[0], 'object');
			assert.equal(result[0] instanceof RegExp, true);
			assert.equal(result[0].toString(), '/.*/');
		});

		it('should return array with string and RegExp if input is array of strings', () => {
			const context = {
				options: [
					{
						exclude: ['excludeThis', '/.*/']
					}
				]
			} as eslint.Rule.RuleContext;

			const result = utils.getExcludesFromContextOptions(context);
			assert.equal(Array.isArray(result), true);
			assert.equal(result.length, 2);
			assert.equal(result[0], 'excludeThis');

			assert.equal(typeof result[1], 'object');
			assert.equal(result[1] instanceof RegExp, true);
			assert.equal(result[1].toString(), '/.*/');
		});
	});

	describe('shouldExcludeNode', () => {
		it('should return true when exact match', () => {
			const original = 'obj1.obj2.property';
			const programNode = espree.parse(original, {});
			const node = programNode.body[0].expression;
			const excludes = ['obj1.property', 'obj1.obj2.property', 'obj3.property'];
			const result = utils.shouldExcludeNode(node, excludes);
			assert.equal(result, true);
		});

		it('should return false when not exact match', () => {
			const original = 'obj2.Property';
			const programNode = espree.parse(original, {});
			const node = programNode.body[0].expression;
			const excludes = ['obj1.property', 'obj2.property', 'obj3.property'];
			const result = utils.shouldExcludeNode(node, excludes);
			assert.equal(result, false);
		});

		it('should return true when matches RegExp', () => {
			const original = 'objA.property';
			const programNode = espree.parse(original, {});
			const node = programNode.body[0].expression;
			const excludes = ['obj1.property', /obj[A-Z]\.property/, 'obj3.property'];
			const result = utils.shouldExcludeNode(node, excludes);
			assert.equal(result, true);
		});

		it('should return false when does not match RegExp', () => {
			const original = 'objABC.property';
			const programNode = espree.parse(original, {});
			const node = programNode.body[0].expression;
			const excludes = ['obj1.property', /obj[A-Z]\.property/, 'obj3.property'];
			const result = utils.shouldExcludeNode(node, excludes);
			assert.equal(result, false);
		});

		it('should return true when matches "this" object', () => {
			const original = 'this.property';
			const programNode = espree.parse(original, {});
			const node = programNode.body[0].expression;
			const excludes = ['obj1.property', 'this.property', 'obj3.property'];
			const result = utils.shouldExcludeNode(node, excludes);
			assert.equal(result, true);
		});

		it('should return true when exact except last parentheses', () => {
			const original = 'func1(true).obj2.func3("")';
			const programNode = espree.parse(original, {});
			const node = programNode.body[0].expression;
			const excludes = ['func1().obj2.func3'];
			const result = utils.shouldExcludeNode(node, excludes);
			assert.equal(result, true);
		});

		it('should return true when exact match with parentheses', () => {
			const original = 'func1(true).obj2.func3("")';
			const programNode = espree.parse(original, {});
			const node = programNode.body[0].expression;
			const excludes = ['func1().obj2.func3()'];
			const result = utils.shouldExcludeNode(node, excludes);
			assert.equal(result, true);
		});

		it('should return true when exact match with parentheses', () => {
			const original = 'func1(true).obj2.obj3';
			const programNode = espree.parse(original, {});
			const node = programNode.body[0].expression;
			const excludes = ['func1().obj2.obj3'];
			const result = utils.shouldExcludeNode(node, excludes);
			assert.equal(result, true);
		});
	});
});

function parseToESLint(source: string): { ast: estree.Program, globalScope: eslint.Scope.Scope } {
	// @ts-ignore
	const linter = eslint.linter;
	linter.reset();

	const errors = linter.verify(source);
	if (errors.length) {
		throw errors[0];
	}

	const sourceCode = linter.getSourceCode();
	return {
		ast: sourceCode.ast,
		globalScope: linter.getScope()
	};
}

function parseToNode(source): estree.Node {
	const ast = parseToESLint(source).ast;
	return (ast.body[0] as estree.ExpressionStatement).expression;
}

function getCallExpression(ast: estree.Program, functionName: string): estree.CallExpression {
	let callExpression: estree.CallExpression;

	// @ts-ignore
	traverser.traverse(ast, {
		enter(node: estree.Node, parent: estree.Node) {
			if (utils.isCallExpression(node) && utils.isIdentifier(node.callee, functionName)) {
				callExpression = node;
			}
		}
	});

	return callExpression;
}

function getInnerMostChildScope(globalScope: eslint.Scope.Scope): eslint.Scope.Scope {
	let childScope = globalScope;

	while (childScope.childScopes.length > 0) {
		childScope = childScope.childScopes[0];
	}

	return childScope;
}
