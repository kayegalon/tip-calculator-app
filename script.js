/* TO-DO 
-consider different use cases
-clean up js code, combine repeating codes
 */

const bill = document.getElementById("bill");
const fivePercent = document.getElementById("five");
const tenPercent = document.getElementById("ten");
const fifteenPercent = document.getElementById("fifteen");
const twentyfivePercent =  document.getElementById("twentyfive");
const fiftyPercent = document.getElementById("fifty");
const customPercent = document.getElementById("custom");
const people = document.getElementById("people");
const tipAmount = document.getElementById("tip");
const totalAmount = document.getElementById("total");
const resetBtn = document.getElementById("reset");

const errorBill = document.getElementById("error-bill");
const errorPercent = document.getElementById("error-percent");
const errorPeople = document.getElementById("error-people");

const percentButtons = [fivePercent, tenPercent, fifteenPercent, twentyfivePercent, fiftyPercent];

let billValue = 0;
let tipValue = 0;
let peopleValue = 0;

function calcTip(bill, tip, people) {
	return (bill * tip) / people;
}

function calcTotal(bill, tip, people) {
	return (bill / people) + tip;
}

function setResetBtn() {
	if (bill.value !== "" | people.value !== "" | customPercent.value !== "" | tipValue !== 0) {
		resetBtn.style.opacity = "1";
	}
}

function setPercentBtn(percentBtn) {
	for (let i = 0; i < percentButtons.length; i++) {
		if (percentButtons[i] === percentBtn) {
			percentButtons[i].style.backgroundColor = "hsl(172, 67%, 45%)";
			percentButtons[i].style.borderColor = "hsl(172, 67%, 45%)";
			percentButtons[i].style.color = "hsl(183, 100%, 15%)";
			displayResults();
		} else {
			percentButtons[i].style.backgroundColor = "hsl(183, 100%, 15%)";
			percentButtons[i].style.borderColor = "hsl(183, 100%, 15%)";
			percentButtons[i].style.color = "hsl(0, 0%, 100%)";
		}
	}
}

function invalidValue(value, error, input) {
	if (value === 0) {
		error.style.visibility = "visible";
		input.style.borderColor = "red";
		input.style.borderWidths = "4px";
	} else {
		error.style.visibility = "hidden";
		input.style.borderColor = "blue";
		input.style.borderWidths = "4px";
	}
}

function displayResults() {
	if (billValue !== 0 && tipValue !== 0 && peopleValue !== 0) {
		tip = calcTip(billValue, tipValue, peopleValue);
		tipAmount.textContent = "$" + (Math.round(tip * 100) / 100).toFixed(2);
		total = calcTotal(billValue, tip, peopleValue);
		totalAmount.textContent = "$" + (Math.round(total * 100) / 100).toFixed(2);
	}
}

bill.addEventListener("input", function() {
	billValue = parseFloat(bill.value);
	invalidValue(billValue, errorBill, bill);
	displayResults();
	setResetBtn();
})

fivePercent.addEventListener("click", function() {
	tipValue = 0.05;
	setPercentBtn(fivePercent);
	setResetBtn();
})

tenPercent.addEventListener("click", function() {
	tipValue = 0.10;
	setPercentBtn(tenPercent);
	setResetBtn();
})

fifteenPercent.addEventListener("click", function() {
	tipValue = 0.15;
	setPercentBtn(fifteenPercent);
	setResetBtn();
})

twentyfivePercent.addEventListener("click", function() {
	tipValue = 0.25;
	setPercentBtn(twentyfivePercent);
	setResetBtn();
})

fiftyPercent.addEventListener("click", function() {
	tipValue = 0.50;
	setPercentBtn(fiftyPercent);
	setResetBtn();
})

customPercent.addEventListener("click", function() {
	setPercentBtn(customPercent);
})

customPercent.addEventListener("input", function() {
	tipValue = parseFloat(customPercent.value) / 100;
	invalidValue(tipValue, errorPercent, customPercent);
	setPercentBtn(customPercent);
	setResetBtn();
})

people.addEventListener("input", function() {
	peopleValue = parseInt(people.value);
	invalidValue(peopleValue, errorPeople, people);
	displayResults();
	setResetBtn();
})

resetBtn.addEventListener("click", function() {
	bill.value = customPercent.value = people.value = "";
	bill.style.borderColor = customPercent.style.borderColor = people.style.borderColor = "hsl(189, 41%, 97%)";
	billValue = tipValue = peopleValue = 0;
	tipAmount.textContent = totalAmount.textContent = "$0.00";
	percentButtons.forEach(function(btn) {
		btn.style.backgroundColor = "hsl(183, 100%, 15%)";
		btn.style.borderColor = "hsl(183, 100%, 15%)";
		btn.style.color = "hsl(0, 0%, 100%)";
	})
	resetBtn.style.opacity = "0.3";
})