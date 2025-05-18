function isImage(file) {
	const fileType = file?.type;
	return (
		fileType === "image/jpeg" ||
		fileType === "image/jpg" ||
		fileType === "image/png"
	);
}

function formatDate(dateString) {
	const date = new Date(dateString);
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function convertToNepaliCurrencyWord(amount) {
    const units = [
        {value: 10000000, name: "crore"},
        {value: 100000, name: "lakh"},
        {value: 1000, name: "thousand"},
        {value: 100, name: "hundred"},
    ];

    let num = Math.floor(amount);
    let words = [];

    for (let unit of units) {
        const quotient = Math.floor(num / unit.value);
        if (quotient > 0) {
            words.push(`${quotient} ${unit.name}`);
            num %= unit.value
        }
    }

    return words.join(" ");
}

export { isImage, formatDate, convertToNepaliCurrencyWord };
