export function removeCommasAndConvertToNumber(stringNumber) {
	if (typeof stringNumber === 'string') {
		let stringWithoutCommas = stringNumber?.replace(/,/g, '');
		let number = Number(stringWithoutCommas);

		return number;
	}

	if (typeof stringNumber === 'number') {
		return stringNumber;
	}

	return null;
}
