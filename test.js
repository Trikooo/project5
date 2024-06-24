class PairObject {
	constructor(startIndex, endIndex, pair, nestedPairs, content) {
		this.startIndex = startIndex !== undefined ? startIndex : null;
		this.endIndex = endIndex !== undefined ? endIndex : null;
		this.pair = pair !== undefined ? pair : null;
		this.content = content !== undefined ? content : null;
		this.nestedPairs = nestedPairs !== undefined ? nestedPairs : [];
	}
}

function isValidExpression(data) {
	const validCharacters = /^[0-9+\-*/().\s]+$/;
	if (!validCharacters.test(data)) {
		return false;
	}

	let balance = 0;
	for (let char of data) {
		if (char === '(') {
			balance++;
		} else if (char === ')') {
			balance--;
		}
		if (balance < 0) {
			return false;
		}
	}
	return balance === 0;
}

function processExpression(data) {
	if (!isValidExpression(data)) {
		throw new Error("Invalid expression: contains invalid characters or unbalanced parentheses.");
	}

	let parsedData = data;
	let pairs = [];
	let stack = [];
	for (let i = 0; i < data.length; i++) {
		if (data[i] === "(") {
			if (stack.length === 0) {
				const pairObject = new PairObject(i, null, stack.length);
				pairs.push(pairObject);
				stack.push(pairObject);
			} else {
				const pairObject = new PairObject(i, null, stack.length);
				stack[stack.length - 1].nestedPairs.push(pairObject);
				stack.push(pairObject);
			}
		} else if (data[i] === ")") {
			const currentPair = stack[stack.length - 1];
			currentPair.endIndex = i;
			const start = currentPair.startIndex;
			const end = currentPair.endIndex + 1;
			const content = data.substring(start, end);
			currentPair.content = content;
			if (currentPair.nestedPairs.length > 0) {
				currentPair.parsedContent = currentPair.content;
				for (let nestedPair of currentPair.nestedPairs) {
					currentPair.parsedContent = currentPair.parsedContent.replace(nestedPair.content, nestedPair.result);
				}
			}
			if (currentPair.parsedContent) {
				currentPair.result = counter(currentPair.parsedContent.slice(1, -1));
			} else {
				currentPair.result = counter(currentPair.content.slice(1, -1));
			}
			stack.pop();
		}
	}

	for (const pair of pairs) {
		parsedData = parsedData.replace(pair.content, pair.result);
	}
	const dataResult = counter(parsedData);
	return dataResult;
}

// COUNT INDIVIDUAL PARENTHESES:
function counter(content) {
	content = content.replace(/(\s)/g, "");
	let remainingContent = content;
	for (let i = 0; i < content.length; i++) {
		if (content[i] === "+" || content[i] === "-") {
			remainingContent = content.substring(i, content.length);
		} else if (content[i] === "/") {
			remainingContent = getResult(remainingContent, "/");

			i = 0;
		} else if (content[i] === "*") {
			remainingContent = getResult(remainingContent, "*");
			i = 0;
		}
	}
	remainingContent = content;
	for (let i = 1; i < content.length; i++) {
		if (content[i] === "+") {
			remainingContent = getResult(remainingContent, "+");
			i = 0;
		} else if (content[i] === "-") {
			remainingContent = getResult(remainingContent, "-");
			i = 0;
		}
	}
	function getResult(remainingContent, operator) {
		const leftOperand = parseFloat(remainingContent.match(/-?\d+(\.\d+)?/)[0]);
		remainingContent = remainingContent.replace(leftOperand + operator, "");
		const rightOperand = parseFloat(remainingContent.match(/-?\d+(\.\d+)?/)[0]);
		let result;
		switch (operator) {
			case "+":
				result = leftOperand + rightOperand;
				content = content.replace(`${leftOperand}+${rightOperand}`, result);
				break;
			case "-":
				result = leftOperand - rightOperand;
				content = content.replace(`${leftOperand}-${rightOperand}`, result);
				break;
			case "/":
				if (rightOperand == 0) {
					throw new Error("Division by zero is not allowed.");
				} else {
					result = leftOperand / rightOperand;
					content = content.replace(`${leftOperand}/${rightOperand}`, result);
				}
				break;
			case "*":
				result = leftOperand * rightOperand;
				content = content.replace(`${leftOperand}*${rightOperand}`, result);
				break;
			default:
		}
		remainingContent = remainingContent.replace(rightOperand, result);
		return remainingContent;
	}
	return content;
}

// Example usage:
let data = "((((((((((((((((((((((((((((((((((((((((((((1 + 2) * 3) + 4) * 5) + 6) * 7) + 8) * 9) + 10) * 11) + 12) * 13) + 14) * 15) + 16) * 17) + 18) * 19) + 20) * 21) + 22) * 23) + 24) * 25) + 26) * 27) + 28) * 29) + 30) * 31) + 32) * 33) + 34) * 35) + 36) * 37) + 38) * 39) + 40) * 41) + 42) * 43) + 44) * 45 + 46) * 47) + 48) * 49) + 50)"
console.log(processExpression(data));
