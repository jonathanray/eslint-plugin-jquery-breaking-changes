import * as estree from 'estree';
import * as eslint from 'eslint';

const jquerySelectorFunctions = [
	'children', 'closest', 'find', 'next', 'nextAll', 'nextUntil',
	'parent', 'parentsUntil', 'prev', 'prevAll', 'prevUntil', 'siblings'];

export function getRootNode(node: estree.Node): estree.Identifier {
	if (isIdentifier(node)) {
		return node;
	} else if (isCallExpression(node)) {
		if (isMemberExpression(node.callee) || isIdentifier(node.callee)) return getRootNode(node.callee);
	} else if (isMemberExpression(node)) {
		return getRootNode(node.object);
	}

	return undefined;
}

export function isJQuery(node: estree.Node, includeCommonElements?: boolean): node is estree.Identifier {
	// Intentionally does NOT recurse up chained methods
	if (isIdentifier(node)) {
		const name = node.name.toLowerCase();
		if (name === '$') return true;
		if (name.includes('$j') && !name.includes('json')) return true;
		if (name.startsWith('jq')) return true;

		if (includeCommonElements) {
			if (name.includes('elem')) return true;
			if (name.includes('div')) return true;
			if (name.includes('span')) return true;
			if (name.includes('input')) return true;
			if (name.includes('select')) return true;
			if (name.includes('container')) return true;
		}

		return false;
	}

	if (isMemberExpression(node) && isIdentifier(node.object)) {
		// Not recursive
		return isJQuery(node.object, includeCommonElements);
	}

	if (isCallExpression(node) && isIdentifier(node.callee)) {
		// Not recursive
		return isJQuery(node.callee, includeCommonElements);
	}

	return false;
}

function looksLikeJQuery(node: estree.Node): boolean {
	const rootNode = getRootNode(node);
	if (isJQuery(rootNode, true)) return true;

	const fullExpression = getFullExpression(node);
	const funcNames = fullExpression.split('.')
		.filter(expr => expr.endsWith('()'))
		.map(funcCall => funcCall.substr(0, funcCall.length - 2));

	return funcNames
		.some(funcName => {
			return jquerySelectorFunctions.some(jqFuncName => jqFuncName === funcName);
		});
}

export function getAssignedNode(node: estree.Node, context: eslint.Rule.RuleContext): estree.Node {
	if (!node) return undefined;
	if (!isIdentifier(node)) return node;

	const scope = context.getScope();
	const assignedValue = getAssignedNodeByScope(node.name, scope.variableScope);
	return assignedValue !== undefined ? assignedValue : node;

	function getAssignedNodeByScope(name: string, scope: eslint.Scope.Scope | null): estree.Node {
		while (scope) {
			const assignment = getVariableAssignment(name, scope.block);
			if (assignment !== undefined) return assignment;

			scope = scope.upper;
		}
	}

	function getVariableAssignment(name: string, node: estree.Node): estree.Node {
		if (isFunctionDeclaration(node) || isFunctionExpression(node)) {
			return getVariableAssignment(name, node.body);
		}

		if (isBlockStatement(node) || isProgram(node)) {
			const assignments = node.body
				.filter(n => isExpressionStatement(n))
				.map((es: estree.ExpressionStatement) => es.expression)
				.filter(e => isAssignmentExpression(e))
				.filter((ae: estree.AssignmentExpression) => isIdentifier(ae.left, name))
				.map((ae: estree.AssignmentExpression) => ae.right);

			if (assignments.length > 0) {
				return assignments[assignments.length - 1];
			}

			const varDeclarations = node.body
				.filter(n => isVariableDeclaration(n) && n.declarations.length > 0)
				.reduce((arr, vd: estree.VariableDeclaration) => arr.concat(vd.declarations), [])
				.filter(vd => isVariableDeclarator(vd))
				.filter(vd => isIdentifier(vd.id, name))
				.map(i => i.init);

			if (varDeclarations.length > 0) {
				return varDeclarations[varDeclarations.length - 1];
			}
		}

		return undefined;
	}
}

export function getAssignedLiteralValue(node: estree.Node, context: eslint.Rule.RuleContext) {
	const assignedValue = getAssignedNode(node, context);
	return isLiteral(assignedValue) ? assignedValue.value : undefined;
}

export function getJQuerySelectors(node: estree.Node, selectors?: string[]): string[] {
	if (selectors === undefined) {
		if (!looksLikeJQuery(node)) return [];
		selectors = [];
	}

	if (isIdentifier(node)) {
		if (isJQuery(node, true)) return selectors;
	} else if (isCallExpression(node)) {
		const args = node.arguments;
		if (args.length) {
			const arg = args[0];
			if (isLiteral(arg)) {
				if (typeof arg.value === 'string') {
					selectors.unshift(arg.value);
				}
			} else if (isIdentifier(arg)) {
				if (['document', 'window'].includes(arg.name)) {
					selectors.unshift(arg.name);
				}
			}
		}
		return getJQuerySelectors(node.callee, selectors);
	} else if (isMemberExpression(node)) {
		return getJQuerySelectors(node.object, selectors);
	}

	return [];
}

function isProgram(node: estree.Node): node is estree.Program {
	if (!node) return false;
	return node.type === 'Program';
}

function isBlockStatement(node: estree.Node): node is estree.BlockStatement {
	if (!node) return false;
	return node.type === 'BlockStatement';
}

export function isThisExpression(node: estree.Node): node is estree.ThisExpression {
	if (!node) return false;
	return node.type === 'ThisExpression';
}

function isFunctionDeclaration(node: estree.Node): node is estree.FunctionDeclaration {
	if (!node) return false;
	return node.type === 'FunctionDeclaration';
}

export function isFunctionExpression(node: estree.Node): node is estree.FunctionExpression {
	if (!node) return false;
	return node.type === 'FunctionExpression';
}

export function isObjectExpression(node: estree.Node, propName?: string): node is estree.ObjectExpression {
	if (!node) return false;
	if (node.type !== 'ObjectExpression') return false;

	if (propName) {
		return node.properties.some(p => isProperty(p, propName));
	}

	return true;
}

function isAssignmentExpression(node: estree.Node): node is estree.AssignmentExpression {
	if (!node) return false;
	return node.type === 'AssignmentExpression';
}

export function isCallExpression(node: estree.Node): node is estree.CallExpression {
	if (!node) return false;
	return node.type === 'CallExpression';
}

function isExpressionStatement(node: estree.Node): node is estree.ExpressionStatement {
	if (!node) return false;
	return node.type === 'ExpressionStatement';
}

export function isIdentifier(node: estree.Node, name?: string): node is estree.Identifier {
	if (!node) return false;
	if (node.type !== 'Identifier') return false;

	if (name != undefined) {
		return node.name === name;
	}

	return true;
}

export function isProperty(node: estree.Node, propName?: string): node is estree.Property {
	if (!node) return false;
	if (node.type !== 'Property') return false;

	if (propName !== undefined) {
		return isIdentifier(node.key, propName);
	}

	return true;
}

export function isBinaryExpression(node: estree.Node): node is estree.BinaryExpression {
	if (!node) return false;
	return node.type === 'BinaryExpression';
}

export function isUnaryExpression(node: estree.Node): node is estree.UnaryExpression {
	if (!node) return false;
	return node.type === 'UnaryExpression';
}

function isVariableDeclaration(node: estree.Node): node is estree.VariableDeclaration {
	if (!node) return false;
	return node.type === 'VariableDeclaration';
}

function isReturnStatement(node: estree.Node): node is estree.ReturnStatement {
	if (!node) return false;
	return node.type === 'ReturnStatement';
}

function isLabeledStatement(node: estree.Node): node is estree.LabeledStatement {
	if (!node) return false;
	return node.type === 'LabeledStatement';
}

function isVariableDeclarator(node: estree.Node): node is estree.VariableDeclarator {
	if (!node) return false;
	return node.type === 'VariableDeclarator';
}

export function isLiteral(node: estree.Node): node is estree.Literal {
	if (!node) return false;
	return node.type === 'Literal';
}

export function isMemberExpression(node: estree.Node, propName?: string | string[], objName?: string): node is estree.MemberExpression {
	if (!node) return false;
	if (node.type !== 'MemberExpression') return false;

	if (propName) {
		if (!isIdentifier(node.property)) return false;
		if (!Array.isArray(propName)) {
			propName = [propName];
		}

		if (!propName.includes(node.property.name)) {
			if (!['apply', 'bind', 'call'].includes(node.property.name)) return false;
			return isMemberExpression(node.object, propName, objName);
		}
	}

	if (objName) {
		if (isIdentifier(node.object)) {
			if (node.object.name !== objName) return false;
		} else if (isMemberExpression(node.property, objName)) return false;
	}

	return true;
}

export function getFullExpression(node: estree.Node): string {
	const members = [];

	if (isIdentifier(node)) {
		members.unshift(node.name);
	} else if (isThisExpression(node)) {
		members.unshift('this');
	} else if (isCallExpression(node)) {
		members.unshift(`${getFullExpression(node.callee)}()`);
	} else if (isMemberExpression(node)) {
		if (isIdentifier(node.property)) {
			members.unshift(node.property.name);
		}

		members.unshift(getFullExpression(node.object));
	}

	return members.join('.');
}

export function isJQueryMemberExpression(node: estree.Node, propName: string | string[], objName?: string): node is estree.MemberExpression {
	if (!node) return false;
	if (!isMemberExpression(node)) return false;
	if (!isIdentifier(node.property)) return false;

	if (!Array.isArray(propName)) {
		propName = [propName];
	}

	if (!propName.includes(node.property.name)) {
		if (!['apply', 'bind', 'call'].includes(node.property.name)) return false;
		return isMemberExpression(node.object, propName, objName);
	}

	if (objName) {
		if (!isMemberExpression(node.object)) return false;
		return isJQueryMemberExpression(node.object, objName);
	}

	return isJQuery(node.object);
}


export function getContextOptions(context: eslint.Rule.RuleContext) {
	if (typeof context !== 'object') return {};
	if (typeof context.options !== 'object') return {};
	if (context.options.length === 0) return {};

	const options = context.options[0];
	if (typeof options !== 'object' || options === null) return {};

	return options;
}

export function getExcludesFromContextOptions(context: eslint.Rule.RuleContext) {
	const options = getContextOptions(context);
	const excludes: Array<string | RegExp> = Array.isArray(options.exclude) ? options.exclude : [options.exclude];

	return excludes
		.map(exclude => {
			if (typeof exclude === 'string') {
				if (exclude.startsWith('/') && exclude.endsWith('/')) {
					try {
						return new RegExp(exclude.substr(1, exclude.length - 2));
					} catch {
						// Do nothing
					}
				}
				return exclude;
			}
			if (typeof exclude === 'object' && exclude instanceof RegExp) return exclude;

			return undefined;
		})
		.filter(exclude => exclude !== undefined);
}

export function shouldExcludeNode(node: estree.Node, excludedExpressions: Array<string | RegExp>) {
	if (!Array.isArray(excludedExpressions)) return false;

	const fullExpression = getFullExpression(node);
	return excludedExpressions
		.some(exclude => {
			if (typeof exclude === 'string') {
				return fullExpression === exclude
					|| (fullExpression.endsWith('()') && fullExpression === `${exclude}()`);
			}
			if (exclude instanceof RegExp) {
				return exclude.test(fullExpression);
			}
			return false;
		});
}

export function couldCompareAgainstNull(node: estree.Node, context: eslint.Rule.RuleContext): boolean {
	const parent: estree.Node = (node as any).parent; // eslint-disable-line @typescript-eslint/no-explicit-any
	if (!parent) return false;

	if (isBinaryExpression(parent)) {
		if (getAssignedLiteralValue(parent.left, context) === null) return true;
		if (getAssignedLiteralValue(parent.right, context) === null) return true;
		return false;
	}

	if (isExpressionStatement(parent)) {
		return isLabeledStatement((parent as any).parent);  // eslint-disable-line @typescript-eslint/no-explicit-any
	}

	if (isAssignmentExpression(parent)) return true;
	if (isCallExpression(parent)) return true;
	if (isProperty(parent)) return true;
	if (isReturnStatement(parent)) return true;
	if (isUnaryExpression(parent)) return true;
	if (isVariableDeclarator(parent)) return true;

	return false;
}
