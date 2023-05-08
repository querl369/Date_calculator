const firstDateInput = document.getElementById("first-date-input");
const secondDateInput = document.querySelector(".second-date");
const calculateBtn = document.getElementById("calculate-btn");

// checkboxes options
const optionAllDays = document.getElementById("allDays")
const optionWeekDays = document.getElementById("weekDays")
const optionWeekendDays = document.getElementById("weekendDays")

// checkboxes dimensions
const dimensionDays = document.getElementById("days")
const dimensionHours = document.getElementById("hours")
const dimensionMinutes = document.getElementById("minutes")
const dimensionSeconds = document.getElementById("seconds")

// checkboxes Presets
const presetWeek = document.getElementById("oneWeek")
const presetMonth = document.getElementById("oneMonth")

const datesBlock = document.querySelector(".calculated-dates-block")
const datesList = document.querySelector(".dates-collection");
const datesCollectionTitle = document.querySelector(".calculated-dates-title")
const validationMessage = document.getElementById("validation-message");

// listeners for options checkboxes
optionAllDays.addEventListener("change", addOptionAllDays);
optionWeekDays.addEventListener("click", addOptionWeekDays);
optionWeekendDays.addEventListener("click", addOptionWeekendDays);

// //listeners for dimensions checkboxes
// dimensionDays.addEventListener("click", addDimensionDays);
// dimensionHours.addEventListener("click", addDimensionHours);
// dimensionMinutes.addEventListener("click", addDimensionMinutes);
// dimensionSeconds.addEventListener("click", addDimensionSeconds);

// //listeners for presets
// presetWeek.addEventListener("click", applyPresetWeek);
// presetMonth.addEventListener("click", applyPresetMonth);

// listeners for dates inputs
calculateBtn.addEventListener("click", calculateDiff);
firstDateInput.addEventListener("change", changeInput);
secondDateInput.addEventListener("change", changeInput);



const values = {
  firstInput: '',
  secondInput: ''
}

const optionsValues = {
    allDayValue: null,
    weekDayValue: null,
    weekendDayValue: null,
}

const dimensionsValues = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
}

function changeInput(e) {
  const  { target } = e;

  const value = target.value;
  const name = target.name;

  values[name] = new Date(value);

  if (name === 'firstInput') {
    secondDateInput.disabled = false;
  }
}


function addOptionAllDays(e) {
    if (e.target.checked) {
        console.log('addOptionAllDays ON -->', e.target.checked);
        optionWeekDays.disabled = true;
        optionWeekendDays.disabled = true;

        optionsValues.allDayValue = true;
    } else {
        console.log('addOptionAllDays OFF -->', e.target.checked);
        optionWeekDays.disabled = false;
        optionWeekendDays.disabled = false;

        optionsValues.allDayValue = false;
    }
}

function addOptionWeekDays(e) {
    if (e.target.checked) {
        console.log('addOptionWeekDays ON -->', e.target.checked);
        optionAllDays.disabled = true;
        optionsValues.weekDayValue = true;
    } else {
        console.log('addOptionWeekDays OFF -->', e.target.checked);
        optionAllDays.disabled = false;
        optionsValues.weekDayValue = false;
    }
}

function addOptionWeekendDays(e) {
    if (e.target.checked) {
        console.log('addOptionWeekendDays ON -->', e.target.checked);
        optionAllDays.disabled = true;
        optionsValues.weekendDayValue = true;
    } else {
        console.log('addOptionWeekendDays OFF -->', e.target.checked);
        optionAllDays.disabled = false;
        optionsValues.weekendDayValue = false;
    }
}

function showValidationMessage() {
    //make message displayed
  validationMessage.removeAttribute("hidden");
  console.log("message appeared");
}

function hideValidationMessage() {
    if (!validationMessage.hasAttribute("hidden")) {
        // validationMessage.setAttribute("hidden");
        console.log('validationMessage -->', validationMessage);
    }
    return;
}

function getCalculatedDates() {
    let dates;
    // get calculated dates from local storage
    // check for length, if length >= 10 - remove last element
    // add new element to the beginning of the array
    // every array element is an object with three properties: firstDate, secondDate, result
}

function getWeekdaysMilliseconds(startDate, endDate) {
    // Copy the start date
    var currentDate = new Date(startDate);
    // Initialize the total milliseconds to 0
    var weekdayMilliseconds = 0;
    // Loop until the current date is after the end date
    while (currentDate <= endDate) {
      // Is the current day a weekday?
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        weekdayMilliseconds += 86400000; // add milliseconds for one day
      }
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    // Return the number of weekday milliseconds
    return weekdayMilliseconds;
  }

function getWeekendDaysMilliseconds(startDate, endDate) {
    // Copy the start date
    var currentDate = new Date(startDate);
    // Initialize the count of weekend days to 0
    var weekendDaysMilliseconds = 0;
    // Loop until the current date is after the end date
    while (currentDate <= endDate) {
      // Is the current day a weekend day?
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        weekendDaysMilliseconds += 86400000;
      }
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    // Return the number of weekend days
    return weekendDaysMilliseconds;
}
  

function calculateResult(firstDateValue, secondDateValue) {
    console.log('started calculating');
  const weekdaysMilliseconds = getWeekdaysMilliseconds(firstDateValue, secondDateValue);
  const weekendDaysMilliseconds = getWeekendDaysMilliseconds(firstDateValue, secondDateValue)
  const dayInMilliseconds = 86400000;
  const result = Math.abs(firstDateValue - secondDateValue);
  const days = Math.ceil(result / (1000 * 60 * 60 * 24));
  const hours = Math.ceil(result / (1000 * 60 * 60));
  const minutes = Math.ceil(result / (1000 * 60));
  const seconds = Math.ceil(result / 1000);
  const milliseconds = Math.ceil(result);
  const resultContainer = document.createElement("p");
  resultContainer.classList.add("result-container");
  resultContainer.textContent = weekendDaysMilliseconds / dayInMilliseconds;
  datesBlock.insertBefore(resultContainer, datesCollectionTitle)
}

// on click check validation
// if validation is not passed - show validation message
// if validation is passed - hide validation message and calculate result
// add result to the list of results and save to local storage
// show result in result container and in the previous calculated dates list
// after page reload show only last 10 results from local storage
// add button to clear local storage and clear previous results list

function calculateDiff(e) {
  if (values.firstInput >= values.secondInput) {
    // calculateBtn.disabled = true;
    showValidationMessage();
    return;
  }

//   calculateBtn.disabled = false;

  hideValidationMessage();
  console.log(
    'values.firstInput -->', values.firstInput,
    '<br>',
    'values.secondInput -->', values.secondInput
  );
  calculateResult(values.firstInput, values.secondInput);
}