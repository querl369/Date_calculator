const firstDateInput = document.getElementById("first-date-input");
const secondDateInput = document.querySelector(".second-date");
const calculateBtn = document.getElementById("calculate-btn");

// checkboxes options
const optionAllDays = document.getElementById("allDays");
const optionWeekDays = document.getElementById("weekDays");
const optionWeekendDays = document.getElementById("weekendDays");

// checkboxes dimensions
const dimensionDays = document.getElementById("days");
const dimensionHours = document.getElementById("hours");
const dimensionMinutes = document.getElementById("minutes");
const dimensionSeconds = document.getElementById("seconds");

// checkboxes Presets
const presetWeek = document.getElementById("oneWeek");
const presetMonth = document.getElementById("oneMonth");

const datesBlock = document.querySelector(".calculated-dates-block");
const datesList = document.querySelector(".dates-collection");
const datesCollectionTitle = document.querySelector(".calculated-dates-title");
const validationMessage = document.getElementById("validation-message");
const resultContainer = document.getElementById("displayed-result");
const datesHistory = document.getElementById("dates-history");
const addDates = document.getElementById("add-dates");

document.addEventListener("DOMContentLoaded", displayDatesFromLocalStorage);

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
  firstInput: "",
  secondInput: "",
};

const optionsValues = {
  allDay: false,
  weekDay: false,
  weekendDay: false,
};

const dimensionsValues = {
  days: false,
  hours: false,
  minutes: false,
  seconds: false,
};

const presetValues = {
  addWeek: false,
  addMonth: false,
};

function changeInput(e) {
  const { target } = e;

  const value = target.value;
  const name = target.name;

  values[name] = new Date(value);

  if (name === "firstInput") {
    secondDateInput.disabled = false;
    presetWeek.disabled = false;
    presetMonth.disabled = false;
  }
}

function addOptionAllDays(e) {
  if (e.target.checked) {
    // disable other checkboxes
    optionWeekDays.disabled = true;
    optionWeekendDays.disabled = true;
    // activate option for calculations
    optionsValues.allDay = true;
  } else {
    // enable back checkboxes
    optionWeekDays.disabled = false;
    optionWeekendDays.disabled = false;

    optionsValues.allDay = false;
  }
}

function addOptionWeekDays(e) {
  if (e.target.checked) {
    // disable other checkboxes
    optionAllDays.disabled = true;
    optionWeekendDays.disabled = true;
    // activate option for calculations
    optionsValues.weekDay = true;
  } else {
    // enable back checkboxes
    optionAllDays.disabled = false;
    optionWeekendDays.disabled = false;

    optionsValues.weekDay = false;
  }
}

function addOptionWeekendDays(e) {
  if (e.target.checked) {
    // disable other checkboxes
    optionAllDays.disabled = true;
    optionWeekDays.disabled = true;
    // activate option for calculations
    optionsValues.weekendDay = true;
  } else {
    // enable back checkboxes
    optionAllDays.disabled = false;
    optionWeekDays.disabled = false;

    optionsValues.weekendDay = false;
  }
}

// dimension options checkboxes behavior while active/inactive
function addDimensionDays(e) {
  if (e.target.checked) {
    // disable other checkboxes
    dimensionHours.disabled = true;
    dimensionMinutes.disabled = true;
    dimensionSeconds.disabled = true;
    // activate option for calculations
    dimensionsValues.days = true;
  } else {
    // enable back checkboxes
    dimensionHours.disabled = false;
    dimensionMinutes.disabled = false;
    dimensionSeconds.disabled = false;

    dimensionsValues.days = false;
  }
}

function addDimensionHours(e) {
  if (e.target.checked) {
    // disable other checkboxes
    dimensionDays.disabled = true;
    dimensionMinutes.disabled = true;
    dimensionSeconds.disabled = true;
    // activate option for calculations
    dimensionsValues.hours = true;
  } else {
    // enable back checkboxes
    dimensionDays.disabled = false;
    dimensionMinutes.disabled = false;
    dimensionSeconds.disabled = false;

    dimensionsValues.hours = false;
  }
}

function addDimensionMinutes(e) {
  if (e.target.checked) {
    // disable other checkboxes
    dimensionHours.disabled = true;
    dimensionDays.disabled = true;
    dimensionSeconds.disabled = true;
    // activate option for calculations
    dimensionsValues.minutes = true;
  } else {
    // enable back checkboxes
    dimensionHours.disabled = false;
    dimensionDays.disabled = false;
    dimensionSeconds.disabled = false;

    dimensionsValues.minutes = false;
  }
}

function addDimensionSeconds(e) {
  if (e.target.checked) {
    // disable other checkboxes
    dimensionHours.disabled = true;
    dimensionMinutes.disabled = true;
    dimensionDays.disabled = true;
    // activate option for calculations
    dimensionsValues.seconds = true;
  } else {
    // enable back checkboxes
    dimensionHours.disabled = false;
    dimensionMinutes.disabled = false;
    dimensionDays.disabled = false;

    dimensionsValues.seconds = false;
  }
}

function applyPresetWeek(e) {
  if (e.target.checked) {
    // disable other checkboxes
    presetMonth.disabled = true;

    // activate option for calculations
    presetValues.addWeek = true;
    setPresetValue();
  } else {
    // enable back checkboxes
    presetMonth.disabled = false;

    presetValues.addWeek = false;
    clearPresetValue();
  }
}

function applyPresetMonth(e) {
  if (e.target.checked) {
    // disable other checkboxes
    presetWeek.disabled = true;

    // activate option for calculations
    presetValues.addMonth = true;
    setPresetValue();
  } else {
    // enable back checkboxes
    presetWeek.disabled = false;

    presetValues.addMonth = false;
    clearPresetValue();
  }
}

function setPresetValue() {
  const selectedPreset = Object.keys(presetValues).find(
    (key) => presetValues[key] === true
  );

  const { firstInput } = values;
  let endDate = new Date(firstInput);

  if (selectedPreset === "addWeek") {
    endDate.setDate(endDate.getDate() + 7);
    secondDateInput.value = endDate.toISOString().slice(0, 10);
    values.secondInput = new Date(secondDateInput.value);
  }
  if (selectedPreset === "addMonth") {
    endDate.setMonth(endDate.getMonth() + 1);
    secondDateInput.value = endDate.toISOString().slice(0, 10);
    values.secondInput = new Date(secondDateInput.value);
  }
}

function clearPresetValue() {
  secondDateInput.value = "";
  values.secondInput = "";
}

function showValidationMessage() {
  validationMessage.removeAttribute("hidden");
}

function hideValidationMessage() {
  if (!validationMessage.hasAttribute("hidden")) {
    validationMessage.setAttribute("hidden", "");
  }
  return;
}

function getSelectedOptions() {
  const selectedOptions = {};
  selectedOptions.selectedDimension = Object.keys(dimensionsValues).find(
    (key) => dimensionsValues[key] === true
  );
  selectedOptions.selectedOption = Object.keys(optionsValues).find(
    (key) => optionsValues[key] === true
  );
  return selectedOptions;
}

function getPeriodMilliseconds(startDate, endDate, periodOption) {
  // if no option period selected setup all days to calculate
  const defaultOption = "allDay";
  const givenPerionOption = periodOption ?? defaultOption;
  let currentDate = new Date(startDate);
  let allDayMilliseconds = 0;
  let weekdayMilliseconds = 0;
  let weekendDaysMilliseconds = 0;

  if (givenPerionOption === "allDay") {
    // calculate all days result in milliseconds
    allDayMilliseconds = endDate - startDate;
    return allDayMilliseconds;
  }

  if (givenPerionOption === "weekDay") {
    while (currentDate <= endDate) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        weekdayMilliseconds += 86400000; // add milliseconds for one day
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekdayMilliseconds - 86400000;
  }

  if (givenPerionOption === "weekendDay") {
    while (currentDate <= endDate) {
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        weekendDaysMilliseconds += 86400000;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekendDaysMilliseconds;
  }
}

function calculateDimension(period, dimension) {
  // if no dimension was selected setup default value to 'days'
  const givenDimension = dimension ?? "days";
  const givenPeriod = period;

  const dayInMilliseconds = 86400000;
  const secondsInMillisecond = 1000;
  const minutesInHour = 60;
  const hoursInDay = 24;
  let result;

  if (!!givenPeriod === false) {
    return "incorrect parameters";
  }
  if (givenDimension === "days") {
    result = `${Math.ceil(givenPeriod / dayInMilliseconds)} days`;
    return result;
  }
  if (givenDimension === "hours") {
    result = `${Math.ceil(
      (givenPeriod / dayInMilliseconds) * hoursInDay
    )} hours`;
    return result;
  }
  if (givenDimension === "minutes") {
    result = `${Math.ceil(
      givenPeriod / (secondsInMillisecond * minutesInHour)
    )} minutes`;
    return result;
  }
  if (givenDimension === "seconds") {
    result = `${Math.ceil(givenPeriod / secondsInMillisecond)} seconds`;
    return result;
  }
}

function createTableRows(selector, storageData) {
  const tbody = selector;
  tbody.innerHTML = "";
  storageData.forEach(function (dataItem) {
    const row = document.createElement("tr");
    Object.values(dataItem).forEach(function (value) {
      const cell = document.createElement("td");
      cell.style.textAlign = "center";
      const cellText = document.createTextNode(value);
      cell.appendChild(cellText);
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
}

function checkLocalStorage() {
  let dates = [];
  if (localStorage.getItem("dates") === null) {
    return dates;
  }
  dates = JSON.parse(localStorage.getItem("dates"));
  return dates;
}

function displayDatesFromLocalStorage() {
  const localStorageElements = checkLocalStorage();
  if (localStorageElements.length === 0) {
    return;
  }
  if (datesHistory.hasAttribute("hidden")) {
    datesHistory.removeAttribute("hidden");
  }
  createTableRows(addDates, localStorageElements);
}

function storeDateInLocalStorage(calculatedDate) {
  let elementsToAdd = [];
  let localStorageElements = checkLocalStorage();

  localStorageElements.unshift(calculatedDate);

  if (localStorageElements.length > 10) {
    elementsToAdd = [...localStorageElements.slice(0, 10)];
    localStorage.clear();
  } else {
    elementsToAdd = [...localStorageElements];
  }

  localStorage.setItem("dates", JSON.stringify(elementsToAdd));
}

function calculateResult(firstDateValue, secondDateValue) {
  const { selectedOption, selectedDimension } = getSelectedOptions();
  const getPeriod = getPeriodMilliseconds(
    firstDateValue,
    secondDateValue,
    selectedOption
  );
  const displayResult = calculateDimension(getPeriod, selectedDimension);

  const localStorageObject = {
    firstDate: firstDateValue.toDateString(),
    secondDate: secondDateValue.toDateString(),
    difference: displayResult,
  };
  storeDateInLocalStorage(localStorageObject);
  displayDatesFromLocalStorage();

  resultContainer.textContent = displayResult;
}

function calculateDiff(e) {
  if (values.firstInput >= values.secondInput) {
    showValidationMessage();
    return;
  }
  hideValidationMessage();
  calculateResult(values.firstInput, values.secondInput);
}
