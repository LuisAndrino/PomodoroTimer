// Getting the Timer section and declaring two spans, the spans represent the minutes and seconds.
const timer = document.querySelector(".Timer");
const minutes = document.createElement("span");
const seconds = document.createElement("span");
const restartButton = document.querySelector(".restart");
const fifteenMinutesButton = document.querySelector(".quince");
const twentyFiveMinutesButton = document.querySelector(".veinticinco");
const thirtyMinutesButton = document.querySelector(".treinta");
const displayMessage = document.querySelector(".message");
const pauseRest = document.querySelector(".pauseRest");
const startButton = document.querySelector(".Start");

// Setting the initial time to 2 seconds for testing purposes
let time = 2;
let Interval = null;
let RestInterval = null;
let displayMessageInterval = true;

// This function displays the countdown timer
function displayACounter() {
  clearTimerInterval(); // Clear any existing timer interval

  Interval = setInterval(() => {
    if (time > 0) {
      time -= 1;
      convertToMinutes(time);
      displayMessage.classList.add("hide");
    } else {
      displayRestTime();
      if (displayMessageInterval) {
        displayMessage.classList.remove("hide");
        displayMessage.textContent = "Time is up!";
        displayMessageInterval = false;
      }
    }
  }, 1000);
}

// This function converts the time displayed in seconds to minutes and seconds format
function convertToMinutes(time) {
  const min = Math.floor(time / 60);
  const sec = time % 60;

  minutes.textContent = formatNumberWithLeadingZeros(min);
  seconds.textContent = formatNumberWithLeadingZeros(sec);

  timer.innerHTML = "";
  timer.append(minutes, ":", seconds);
}

// This function clears the timer interval
function clearTimerInterval() {
  clearInterval(Interval);
  Interval = null;
  displayMessageInterval = true;
}

// This function clears the rest interval
function clearRestInterval() {
  clearInterval(RestInterval);
  RestInterval = null;
  displayRestTimeInterval = true;
}

// Event listener for the restart/pause button
restartButton.addEventListener("click", () => {
  restartButton.textContent == "Pause"
    ? (restartButton.textContent = "Resume")
    : (restartButton.textContent = "Pause");

  if (restartButton.textContent === "Resume") {
    clearTimerInterval();
  } else {
    displayACounter();
  }
});

// Event listener for the pause/rest button
pauseRest.addEventListener("click", () => {
  pauseRest.textContent == "Pause Rest"
    ? (pauseRest.textContent = "Resume Rest")
    : (pauseRest.textContent = "Pause Pause Rest");

  if (pauseRest.textContent === "Resume Rest") {
    clearRestInterval();
  } else {
    displayRestTime();
  }
});

// Event listener for the 15 minutes button
fifteenMinutesButton.addEventListener("click", () => {
  if (time > 0) {
    time = 900; // 900 seconds = 15 minutes
  } else {
    time = 900;
    displayACounter();
  }
});

// Event listener for the 25 minutes button
twentyFiveMinutesButton.addEventListener("click", () => {
  if (time > 0) {
    time = 1500; // 1500 seconds = 25 minutes
  } else {
    time = 1500;
    displayACounter();
  }
});

// Event listener for the 30 minutes button
thirtyMinutesButton.addEventListener("click", () => {
  if (time > 0) {
    time = 1800; // 1800 seconds = 30 minutes
  } else {
    time = 1800;
    displayACounter();
  }
});

// This function formats a number with leading zeros
function formatNumberWithLeadingZeros(number) {
  return number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

// This is for the rest time
let restTime = 2;
let displayRestTimeInterval = true;

// This function displays the rest time
function displayRestTime() {
  if (time === 0 && !RestInterval) {
    clearRestInterval(); // Clear any existing rest interval

    RestInterval = setInterval(() => {
      if (restTime >= 0) {
        convertToMinutes(restTime);
        restTime -= 1;
        displayMessage.classList.add("hide");
      } else {
        if (displayRestTimeInterval) {
          displayMessage.classList.remove("hide");
          displayMessage.textContent = "Rest Time is up!";
          displayRestTimeInterval = false;
        }
      }
    }, 1000);
  }
}

// Event listener for the start button
startButton.addEventListener("click", () => {
  if (time > 0) {
    displayACounter();
  } else {
    displayMessage.classList.remove("hide");
    displayMessage.textContent = "Please select a time";
  }
});

