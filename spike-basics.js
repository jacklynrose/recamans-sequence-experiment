let usedNumbers = [0];
let currentNumber = 0;
let negNumber;

for(let i = 1; i<=10000; i++) {
	negNumber = currentNumber - i;
	if (negNumber > 0 && usedNumbers.indexOf(negNumber) === -1) {
		currentNumber -= i;
	} else {
		currentNumber += i;
	}
	usedNumbers.push(currentNumber);
}

console.log(usedNumbers);
