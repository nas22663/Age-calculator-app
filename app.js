const dayInput = document.getElementById('dayInput');
const monthInput = document.getElementById('monthInput');
const yearInput = document.getElementById('yearInput');

const errorElement1 = document.getElementById('errorDay');
const errorElement2 = document.getElementById('errorMonth');
const errorElement3 = document.getElementById('errorYear');

const day2 = document.querySelector('.day2');
const month2 = document.querySelector('.month2');
const year2 = document.querySelector('.year2');

const max_length1 = 2;
const max_length2 = 4;

const button = document.getElementById('button');

let resultYears = document.getElementById('resultYears');
let resultMonths = document.getElementById('resultMonths');
let resultDays = document.getElementById('resultDays');

function getMaxDaysForMonth(month, year) {
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return 31;
        case 4: case 6: case 9: case 11:
            return 30;
        case 2:
            return (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) ? 29 : 28;
        default:
            throw new Error("Invalid month");
    }
}

function validateDateInput(inputElement, errorElement, labelElement, maxLength, minVal, maxVal) {
    const value = parseInt(inputElement.value, 10);

    
    if (inputElement === dayInput) {
        const inputMonth = parseInt(monthInput.value, 10);
        const inputYear = parseInt(yearInput.value, 10);
        maxVal = getMaxDaysForMonth(inputMonth, inputYear);
    }

    if (isNaN(value) || value < minVal || value > maxVal || inputElement.value.length > maxLength) {
        errorElement.textContent = `Must be a valid ${inputElement.name}`;
        inputElement.style.border = "1px solid red";
        labelElement.style.color = "hsl(0, 100%, 67%)";
        return false;
    } else {
        errorElement.textContent = '';
        inputElement.style.border = "";
        labelElement.style.color = "";
        return true;
    }
}

function requiredfield(errorElement, inputElement, labelElement) {
    if (inputElement.value.trim() === "") {
        errorElement.textContent = 'This field is required';
        inputElement.style.border = "1px solid red";
        labelElement.style.color = "hsl(0, 100%, 67%)";
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

button.addEventListener('click', () => {
    
    const isYearValid = requiredfield(errorElement3, yearInput, year2) && validateDateInput(yearInput, errorElement3, year2, max_length2, 1900, currentYear);
    const isMonthValid = requiredfield(errorElement2, monthInput, month2) && validateDateInput(monthInput, errorElement2, month2, max_length1, 1, 12);
    const isDayValid = requiredfield(errorElement1, dayInput, day2) && validateDateInput(dayInput, errorElement1, day2, max_length1, 1, 31);
    
    // If any field is invalid, stop further execution
    if (!isDayValid || !isMonthValid || !isYearValid) {
        return;
    }

    let inputYearValue = parseInt(yearInput.value, 10);
    let inputMonthValue = parseInt(monthInput.value, 10);
    let inputDayValue = parseInt(dayInput.value, 10);

    // Age calculation code:
    let diffYear = currentYear - inputYearValue;
    let diffMonth = currentMonth - inputMonthValue;
    let diffDay = currentDay - inputDayValue;

    if (diffDay < 0) {
        diffMonth -= 1;
        diffDay += getMaxDaysForMonth(currentMonth - 1, currentYear);
    }

    if (diffMonth < 0) {
        diffYear -= 1;
        diffMonth += 12;
    }

    resultYears.textContent = diffYear;
    resultMonths.textContent = diffMonth;
    resultDays.textContent = diffDay;
});
