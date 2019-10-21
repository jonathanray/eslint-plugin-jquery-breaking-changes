"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jquerySelectorFunctions = [
    'children', 'closest', 'find', 'next', 'nextAll', 'nextUntil',
    'parent', 'parentsUntil', 'prev', 'prevAll', 'prevUntil', 'siblings'
];
function getRootNode(node) {
    if (isIdentifier(node)) {
        return node;
    }
    else if (isCallExpression(node)) {
        if (isMemberExpression(node.callee) || isIdentifier(node.callee))
            return getRootNode(node.callee);
    }
    else if (isMemberExpression(node)) {
        return getRootNode(node.object);
    }
    return undefined;
}
exports.getRootNode = getRootNode;
function isJQuery(node, includeCommonElements) {
    // Intentionally does NOT recurse up chained methods
    if (isIdentifier(node)) {
        const name = node.name.toLowerCase();
        if (name === '$')
            return true;
        if (name.includes('$j') && !name.includes('json'))
            return true;
        if (name.startsWith('jq'))
            return true;
        if (includeCommonElements) {
            if (name.includes('elem'))
                return true;
            if (name.includes('div'))
                return true;
            if (name.includes('span'))
                return true;
            if (name.includes('input'))
                return true;
            if (name.includes('select'))
                return true;
            if (name.includes('container'))
                return true;
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
exports.isJQuery = isJQuery;
function looksLikeJQuery(node) {
    const rootNode = getRootNode(node);
    if (isJQuery(rootNode, true))
        return true;
    const fullExpression = getFullExpression(node);
    const funcNames = fullExpression.split('.')
        .filter(expr => expr.endsWith('()'))
        .map(funcCall => funcCall.substr(0, funcCall.length - 2));
    return funcNames
        .some(funcName => {
        return jquerySelectorFunctions.some(jqFuncName => jqFuncName === funcName);
    });
}
function getAssignedNode(node, context) {
    if (!node)
        return undefined;
    if (!isIdentifier(node))
        return node;
    const scope = context.getScope();
    const assignedValue = getAssignedNodeByScope(node.name, scope.variableScope);
    return assignedValue !== undefined ? assignedValue : node;
    function getAssignedNodeByScope(name, scope) {
        while (scope) {
            const assignment = getVariableAssignment(name, scope.block);
            if (assignment !== undefined)
                return assignment;
            scope = scope.upper;
        }
    }
    function getVariableAssignment(name, node) {
        if (isFunctionDeclaration(node) || isFunctionExpression(node)) {
            return getVariableAssignment(name, node.body);
        }
        if (isBlockStatement(node) || isProgram(node)) {
            const assignments = node.body
                .filter(n => isExpressionStatement(n))
                .map((es) => es.expression)
                .filter(e => isAssignmentExpression(e))
                .filter((ae) => isIdentifier(ae.left, name))
                .map((ae) => ae.right);
            if (assignments.length > 0) {
                return assignments[assignments.length - 1];
            }
            const varDeclarations = node.body
                .filter(n => isVariableDeclaration(n) && n.declarations.length > 0)
                .reduce((arr, vd) => arr.concat(vd.declarations), [])
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
exports.getAssignedNode = getAssignedNode;
function getAssignedLiteralValue(node, context) {
    const assignedValue = getAssignedNode(node, context);
    return isLiteral(assignedValue) ? assignedValue.value : undefined;
}
exports.getAssignedLiteralValue = getAssignedLiteralValue;
function getJQuerySelectors(node, selectors) {
    if (selectors === undefined) {
        if (!looksLikeJQuery(node))
            return [];
        selectors = [];
    }
    if (isIdentifier(node)) {
        if (isJQuery(node, true))
            return selectors;
    }
    else if (isCallExpression(node)) {
        const args = node.arguments;
        if (args.length) {
            const arg = args[0];
            if (isLiteral(arg)) {
                if (typeof arg.value === 'string') {
                    selectors.unshift(arg.value);
                }
            }
            else if (isIdentifier(arg)) {
                if (['document', 'window'].includes(arg.name)) {
                    selectors.unshift(arg.name);
                }
            }
        }
        return getJQuerySelectors(node.callee, selectors);
    }
    else if (isMemberExpression(node)) {
        return getJQuerySelectors(node.object, selectors);
    }
    return [];
}
exports.getJQuerySelectors = getJQuerySelectors;
function isProgram(node) {
    if (!node)
        return false;
    return node.type === 'Program';
}
function isBlockStatement(node) {
    if (!node)
        return false;
    return node.type === 'BlockStatement';
}
function isThisExpression(node) {
    if (!node)
        return false;
    return node.type === 'ThisExpression';
}
exports.isThisExpression = isThisExpression;
function isFunctionDeclaration(node) {
    if (!node)
        return false;
    return node.type === 'FunctionDeclaration';
}
function isFunctionExpression(node) {
    if (!node)
        return false;
    return node.type === 'FunctionExpression';
}
exports.isFunctionExpression = isFunctionExpression;
function isObjectExpression(node, propName) {
    if (!node)
        return false;
    if (node.type !== 'ObjectExpression')
        return false;
    if (propName) {
        return node.properties.some(p => isProperty(p, propName));
    }
    return true;
}
exports.isObjectExpression = isObjectExpression;
function isAssignmentExpression(node) {
    if (!node)
        return false;
    return node.type === 'AssignmentExpression';
}
function isCallExpression(node) {
    if (!node)
        return false;
    return node.type === 'CallExpression';
}
exports.isCallExpression = isCallExpression;
function isExpressionStatement(node) {
    if (!node)
        return false;
    return node.type === 'ExpressionStatement';
}
function isIdentifier(node, name) {
    if (!node)
        return false;
    if (node.type !== 'Identifier')
        return false;
    if (name != undefined) {
        return node.name === name;
    }
    return true;
}
exports.isIdentifier = isIdentifier;
function isProperty(node, propName) {
    if (!node)
        return false;
    if (node.type !== 'Property')
        return false;
    if (propName !== undefined) {
        return isIdentifier(node.key, propName);
    }
    return true;
}
exports.isProperty = isProperty;
function isBinaryExpression(node) {
    if (!node)
        return false;
    return node.type === 'BinaryExpression';
}
exports.isBinaryExpression = isBinaryExpression;
function isUnaryExpression(node) {
    if (!node)
        return false;
    return node.type === 'UnaryExpression';
}
exports.isUnaryExpression = isUnaryExpression;
function isVariableDeclaration(node) {
    if (!node)
        return false;
    return node.type === 'VariableDeclaration';
}
function isReturnStatement(node) {
    if (!node)
        return false;
    return node.type === 'ReturnStatement';
}
function isLabeledStatement(node) {
    if (!node)
        return false;
    return node.type === 'LabeledStatement';
}
function isVariableDeclarator(node) {
    if (!node)
        return false;
    return node.type === 'VariableDeclarator';
}
function isLiteral(node) {
    if (!node)
        return false;
    return node.type === 'Literal';
}
exports.isLiteral = isLiteral;
function isMemberExpression(node, propName, objName) {
    if (!node)
        return false;
    if (node.type !== 'MemberExpression')
        return false;
    if (propName) {
        if (!isIdentifier(node.property))
            return false;
        if (!Array.isArray(propName)) {
            propName = [propName];
        }
        if (!propName.includes(node.property.name)) {
            if (!['apply', 'bind', 'call'].includes(node.property.name))
                return false;
            return isMemberExpression(node.object, propName, objName);
        }
    }
    if (objName) {
        if (isIdentifier(node.object)) {
            if (node.object.name !== objName)
                return false;
        }
        else if (isMemberExpression(node.property, objName))
            return false;
    }
    return true;
}
exports.isMemberExpression = isMemberExpression;
function getFullExpression(node) {
    const members = [];
    if (isIdentifier(node)) {
        members.unshift(node.name);
    }
    else if (isThisExpression(node)) {
        members.unshift('this');
    }
    else if (isCallExpression(node)) {
        members.unshift(`${getFullExpression(node.callee)}()`);
    }
    else if (isMemberExpression(node)) {
        if (isIdentifier(node.property)) {
            members.unshift(node.property.name);
        }
        members.unshift(getFullExpression(node.object));
    }
    return members.join('.');
}
exports.getFullExpression = getFullExpression;
function isJQueryMemberExpression(node, propName, objName) {
    if (!node)
        return false;
    if (!isMemberExpression(node))
        return false;
    if (!isIdentifier(node.property))
        return false;
    if (!Array.isArray(propName)) {
        propName = [propName];
    }
    if (!propName.includes(node.property.name)) {
        if (!['apply', 'bind', 'call'].includes(node.property.name))
            return false;
        return isMemberExpression(node.object, propName, objName);
    }
    if (objName) {
        if (!isMemberExpression(node.object))
            return false;
        return isJQueryMemberExpression(node.object, objName);
    }
    return isJQuery(node.object);
}
exports.isJQueryMemberExpression = isJQueryMemberExpression;
function getExcludesFromContextOptions(context) {
    if (typeof context !== 'object')
        return [];
    if (typeof context.options !== 'object')
        return [];
    if (context.options.length === 0)
        return [];
    const options = context.options[0];
    if (typeof options !== 'object')
        return [];
    if (options === null)
        return [];
    const excludes = Array.isArray(options.exclude) ? options.exclude : [options.exclude];
    return excludes
        .map(exclude => {
        if (typeof exclude === 'string') {
            if (exclude.startsWith('/') && exclude.endsWith('/')) {
                try {
                    return new RegExp(exclude.substr(1, exclude.length - 2));
                }
                catch (_a) {
                    // Do nothing
                }
            }
            return exclude;
        }
        if (typeof exclude === 'object' && exclude instanceof RegExp)
            return exclude;
        return undefined;
    })
        .filter(exclude => exclude !== undefined);
}
exports.getExcludesFromContextOptions = getExcludesFromContextOptions;
function shouldExcludeNode(node, excludedExpressions) {
    if (!Array.isArray(excludedExpressions))
        return false;
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
exports.shouldExcludeNode = shouldExcludeNode;
function couldCompareAgainstNull(node, context) {
    const parent = node.parent; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!parent)
        return false;
    if (isBinaryExpression(parent)) {
        if (getAssignedLiteralValue(parent.left, context) === null)
            return true;
        if (getAssignedLiteralValue(parent.right, context) === null)
            return true;
        return false;
    }
    if (isExpressionStatement(parent)) {
        return isLabeledStatement(parent.parent); // eslint-disable-line @typescript-eslint/no-explicit-any
    }
    if (isAssignmentExpression(parent))
        return true;
    if (isCallExpression(parent))
        return true;
    if (isProperty(parent))
        return true;
    if (isReturnStatement(parent))
        return true;
    if (isUnaryExpression(parent))
        return true;
    if (isVariableDeclarator(parent))
        return true;
    return false;
}
exports.couldCompareAgainstNull = couldCompareAgainstNull;
