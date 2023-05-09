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
optionAllDays.addEventListener("click", addOptionAllDays);
optionWeekDays.addEventListener("click", addOptionWeekDays);
optionWeekendDays.addEventListener("click", addOptionWeekendDays);

//listeners for dimensions checkboxes
dimensionDays.addEventListener("click", addDimensionDays);
dimensionHours.addEventListener("click", addDimensionHours);
dimensionMinutes.addEventListener("click", addDimensionMinutes);
dimensionSeconds.addEventListener("click", addDimensionSeconds);

//listeners for presets
presetWeek.addEventListener("click", applyPresetWeek);
presetMonth.addEventListener("click", applyPresetMonth);

// listeners for dates inputs
calculateBtn.addEventListener("click", calculateDiff);
firstDateInput.addEventListener("change", changeInput);
secondDateInput.addEventListener("change", changeInput);



const values = {
  firstInput: '',
  secondInput: ''
}

const optionsValues = {
    allDay: false,
    weekDay: false,
    weekendDay: false,
}

const dimensionsValues = {
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
}

const presetValues = {
    addWeek: false,
    addMonth: false,
}

function changeInput(e) {
  const  { target } = e;

  const value = target.value;
  const name = target.name;

  values[name] = new Date(value);

  if (name === 'firstInput') {
    secondDateInput.disabled = false;
    presetWeek.disabled = false;
    presetMonth.disabled = false;
  }
}


function addOptionAllDays(e) {
    if (e.target.checked) {
        console.log('addOptionAllDays ON -->', e.target.checked);
        // disable other checkboxes
        optionWeekDays.disabled = true;
        optionWeekendDays.disabled = true;
        // activate option for calculations
        optionsValues.allDay = true;
    } else {
        console.log('addOptionAllDays OFF -->', e.target.checked);
        // enable back checkboxes
        optionWeekDays.disabled = false;
        optionWeekendDays.disabled = false;

        optionsValues.allDay = false;
    }
}

function addOptionWeekDays(e) {
    if (e.target.checked) {
        console.log('addOptionWeekDays ON -->', e.target.checked);
        // disable other checkboxes
        optionAllDays.disabled = true;
        optionWeekendDays.disabled = true;
        // activate option for calculations
        optionsValues.weekDay = true;
    } else {
        console.log('addOptionWeekDays OFF -->', e.target.checked);
        // enable back checkboxes
        optionAllDays.disabled = false;
        optionWeekendDays.disabled = false;

        optionsValues.weekDay = false;
    }
}

function addOptionWeekendDays(e) {
    if (e.target.checked) {
        console.log('addOptionWeekendDays ON -->', e.target.checked);
        // disable other checkboxes
        optionAllDays.disabled = true;
        optionWeekDays.disabled = true;
        // activate option for calculations
        optionsValues.weekendDay = true;
    } else {
        console.log('addOptionWeekendDays OFF -->', e.target.checked);
        // enable back checkboxes
        optionAllDays.disabled = false;
        optionWeekDays.disabled = false;

        optionsValues.weekendDay = false;
    }
}

// dimension options checkboxes behavior while active/inactive
function addDimensionDays(e) {
    if (e.target.checked) {
        console.log('addDimensionDays ON -->', e.target.checked);
        // disable other checkboxes
        dimensionHours.disabled = true;
        dimensionMinutes.disabled = true;
        dimensionSeconds.disabled = true;
        // activate option for calculations
        dimensionsValues.days = true;
    } else {
        console.log('addDimensionDays OFF -->', e.target.checked);
        // enable back checkboxes
        dimensionHours.disabled = false;
        dimensionMinutes.disabled = false;
        dimensionSeconds.disabled = false;

        dimensionsValues.days = false;
    }
}

function addDimensionHours(e) {
    if (e.target.checked) {
        console.log('addDimensionHours ON -->', e.target.checked);
        // disable other checkboxes
        dimensionDays.disabled = true;
        dimensionMinutes.disabled = true;
        dimensionSeconds.disabled = true;
        // activate option for calculations
        dimensionsValues.hours = true;
    } else {
        console.log('addDimensionHours OFF -->', e.target.checked);
        // enable back checkboxes
        dimensionDays.disabled = false;
        dimensionMinutes.disabled = false;
        dimensionSeconds.disabled = false;

        dimensionsValues.hours = false;
    }
}

function addDimensionMinutes(e) {
    if (e.target.checked) {
        console.log('addDimensionMinutes ON -->', e.target.checked);
        // disable other checkboxes
        dimensionHours.disabled = true;
        dimensionDays.disabled = true;
        dimensionSeconds.disabled = true;
        // activate option for calculations
        dimensionsValues.minutes = true;
    } else {
        console.log('addDimensionMinutes OFF -->', e.target.checked);
        // enable back checkboxes
        dimensionHours.disabled = false;
        dimensionDays.disabled = false;
        dimensionSeconds.disabled = false;

        dimensionsValues.minutes = false;
    }
}

function addDimensionSeconds(e) {
    if (e.target.checked) {
        console.log('addDimensionSeconds ON -->', e.target.checked);
        // disable other checkboxes
        dimensionHours.disabled = true;
        dimensionMinutes.disabled = true;
        dimensionDays.disabled = true;
        // activate option for calculations
        dimensionsValues.seconds = true;
    } else {
        console.log('addDimensionSeconds OFF -->', e.target.checked);
        // enable back checkboxes
        dimensionHours.disabled = false;
        dimensionMinutes.disabled = false;
        dimensionDays.disabled = false;

        dimensionsValues.seconds = false;
    }
}

function applyPresetWeek(e) {
    if (e.target.checked) {
        console.log('applyPresetWeek ON -->', e.target.checked);
        // disable other checkboxes
        presetMonth.disabled = true;

        // activate option for calculations
        presetValues.addWeek = true;
        setPresetValue();
    } else {
        console.log('applyPresetWeek OFF -->', e.target.checked);
        // enable back checkboxes
        presetMonth.disabled = false;

        presetValues.addWeek = false;
        clearPresetValue()
    }
}

function applyPresetMonth(e) {
    if (e.target.checked) {
        console.log('applyPresetMonth ON -->', e.target.checked);
        // disable other checkboxes
        presetWeek.disabled = true;

        // activate option for calculations
        presetValues.addMonth = true;
        setPresetValue();
    } else {
        console.log('applyPresetMonth OFF -->', e.target.checked);
        // enable back checkboxes
        presetWeek.disabled = false;

        presetValues.addMonth = false;
        clearPresetValue()
    }
}

// TODO: disable presets if the first date is not given
function setPresetValue() {
    const selectedPreset = Object.keys(presetValues)
        .find(key => presetValues[key] === true);

    const { firstInput } = values;
    let endDate = new Date(firstInput);

    if (selectedPreset === 'addWeek') {
        endDate.setDate(endDate.getDate() + 7);
        secondDateInput.value = endDate.toISOString().slice(0, 10);
        values.secondInput = new Date(secondDateInput.value);
    }
    if (selectedPreset === 'addMonth') {
        endDate.setMonth(endDate.getMonth() + 1);
        console.log('endDate -->', endDate);
        secondDateInput.value = endDate.toISOString().slice(0, 10);
        values.secondInput = new Date(secondDateInput.value);
    }
}

function clearPresetValue() {
    secondDateInput.value = '';
    // need to clear also set variable value
    values.secondInput = '';
}

function showValidationMessage() {
  validationMessage.removeAttribute("hidden");
}

function hideValidationMessage() {
    if (!validationMessage.hasAttribute("hidden")) {
        validationMessage.setAttribute("hidden", '');
    }
    return;
}

function getSelectedOptions() {
    const selectedOptions = {};
    selectedOptions.selectedDimension = Object.keys(dimensionsValues)
        .find(key => dimensionsValues[key] === true);
    selectedOptions.selectedOption = Object.keys(optionsValues)
        .find(key => optionsValues[key] === true);
    console.log('getSelectedOptions func inside -->', selectedOptions);
    return selectedOptions;
}

function getPeriodMilliseconds(startDate, endDate, periodOption) {
    // if no option period selected setup all days to calculate
    const givenPerionOption = periodOption ?? 'allDay';
    let currentDate = new Date(startDate);
    let allDayMilliseconds = 0;
    let weekdayMilliseconds = 0;
    let weekendDaysMilliseconds = 0;

    if (givenPerionOption === 'allDay') {
        // calculate all days result in milliseconds
        allDayMilliseconds = endDate - startDate;
        console.log('allDayMilliseconds -->', allDayMilliseconds);
        return allDayMilliseconds;
    }

    if (givenPerionOption === 'weekDay') {
        while (currentDate <= endDate) {
            // Is the current day a weekday?
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
              weekdayMilliseconds += 86400000; // add milliseconds for one day
            }
            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
          }
          // Return the number of weekday milliseconds
          console.log('weekdayMilliseconds -->', weekdayMilliseconds);
          return weekdayMilliseconds - 86400000;
    }

    if (givenPerionOption === 'weekendDay') {
        while (currentDate <= endDate) {
            // Is the current day a weekend day?
            if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
              weekendDaysMilliseconds += 86400000;
            }
            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
          }
          // Return the number of weekend days
          console.log('weekendDaysMilliseconds -->', weekendDaysMilliseconds);
          return weekendDaysMilliseconds;
    }
}

function calculateDimension(period, dimension) {
    // if no dimension was selected setup default value to 'days'
    const givenDimension = dimension ?? 'days';
    const givenPeriod = period;

    const dayInMilliseconds = 86400000;
    const secondsInMillisecond = 1000;
    const minutesInHour = 60;
    const hoursInDay = 24;
    let result;

    // TODO: rework statement to pass it if givenPeriod === 0
    if (!!givenPeriod === false) {
        return 'incorrect parameters';
    }
    if (givenDimension === 'days') {
        result = `${Math.ceil(givenPeriod / dayInMilliseconds)} days`;
        return result;
    }
    if (givenDimension === 'hours') {
        result = `${Math.ceil((givenPeriod / dayInMilliseconds) * hoursInDay)} hours`;
        return result;
    }
    if (givenDimension === 'minutes') {
        result = `${Math.ceil(givenPeriod / (secondsInMillisecond * minutesInHour))} minutes`;
        return result;
    }
    if (givenDimension === 'seconds') {
        result = `${Math.ceil(givenPeriod / secondsInMillisecond)} seconds`;
        return result;
    }
}

function calculateResult(firstDateValue, secondDateValue) {
  const { selectedOption, selectedDimension } = getSelectedOptions()
  console.log('selectedOption -->', selectedOption);
  console.log('selectedDimension -->', selectedDimension);
  const getPeriod = getPeriodMilliseconds(firstDateValue, secondDateValue, selectedOption);
  const displayResult = calculateDimension(getPeriod, selectedDimension);

  const resultContainer = document.createElement("p");
  resultContainer.classList.add("result-container");
  resultContainer.textContent = displayResult;
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
    showValidationMessage();
    // clear the results field/value
    return;
  }

  hideValidationMessage();
  console.log(
    'values.firstInput -->', values.firstInput,
    '\n',
    '\n',
    'values.secondInput -->', values.secondInput
  );
  calculateResult(values.firstInput, values.secondInput);
}