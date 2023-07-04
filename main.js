// Getting the Timer section and declaring two spans, the spans represent the minutes and seconds.
const timer = document.querySelector(".Timer");
const minutes = document.createElement("span");
const seconds = document.createElement("span");
const pauseTimer = document.querySelector(".restart");
const fifteenMinutesButton = document.querySelector(".quince");
const twentyFiveMinutesButton = document.querySelector(".veinticinco");
const thirtyMinutesButton = document.querySelector(".treinta");
const displayMessage = document.querySelector(".message");
const pauseRest = document.querySelector(".pauseRest");
const startButton = document.querySelector(".Start");
const ownTime = document.querySelector(".own");

// This is the sound that will play when the timer reaches 0
const soundBeep = new Audio("./audio/mixkit-alarm-digital-clock-beep-989.wav");

// This is just a placeholder for the minutes and seconds
minutes.textContent = "00";
seconds.textContent = "00";
timer.append(minutes, ":", seconds);

// Setting the initial time to 900 seconds for testing purposes
let time = 900;
let Interval = null;
let RestInterval = null;
let displayMessageInterval = true;
let playSound = false;

// This function displays the countdown timer
function displayACounter() {
    clearTimerInterval(); // Clear any existing timer interval
    Interval = setInterval(() => {
        if (time > 0) {
            time -= 1;
            convertToMinutes(time);
            displayMessage.classList.add("hide");
        } else {
            do {
                playSound = true;
                soundBeep.play();
                setTimeout(() => {
                    soundBeep.pause();
                    soundBeep.currentTime = 0;
                }, 8000);
            } while (!playSound);
            displayRestTime();
            pauseTimer.classList.add("hide");
            pauseRest.classList.remove("hide");
            if (displayMessageInterval) {
                displayMessage.classList.remove("hide");
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
pauseTimer.addEventListener("click", () => {
    pauseTimer.textContent == "⏸"
        ? (pauseTimer.textContent = "⏯")
        : (pauseTimer.textContent = "⏸");

    if (pauseTimer.textContent === "⏯") {
        clearTimerInterval();
    } else {
        displayACounter();
    }
});

// Event listener for the pause/rest button

pauseRest.addEventListener("click", () => {
    pauseRest.textContent == "⏸"
        ? (pauseRest.textContent = "⏯")
        : (pauseRest.textContent = "⏸");

    if (pauseRest.textContent === "⏯") {
        clearRestInterval();
    } else {
        displayRestTime();
    }
});
// Event listener for the 15 minutes button
fifteenMinutesButton.addEventListener("click", () => {
    if (time > 0) {
        time = 900; // 900 seconds = 15 minutes
    } else if (time === 0 && !RestInterval) {
        time = 900;
        displayACounter();
    }
});

// Event listener for the 25 minutes button
twentyFiveMinutesButton.addEventListener("click", () => {
    if (time > 0) {
        time = 1500; // 1500 seconds = 25 minutes
    } else if (time === 0 && !RestInterval) {
        time = 1500;
        displayACounter();
    }
});

// Event listener for the 30 minutes button
thirtyMinutesButton.addEventListener("click", () => {
    if (time > 0) {
        time = 1800; // 1800 seconds = 30 minutes
    } else if (time === 0 && !RestInterval) {
        time = 1800;
        displayACounter();
    }
});

// Event listener for the own time button
ownTime.addEventListener("click", () => {
    if (time > 0) {
        time = Number(prompt("Enter the time in minutes"));
        time = time * 60;
    } else if (time === 0 && !RestInterval) {
        time = Number(prompt("Enter the time in minutes"));
        time = time * 60;
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
let restTime = 300;
let displayRestTimeInterval = true;
playSound = false;

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
                    startButton.classList.remove("hide");
                    displayMessage.classList.remove("hide");
                    displayRestTimeInterval = false;
                    do {
                        playSound = true;
                        soundBeep.play();
                        setTimeout(() => {
                            soundBeep.pause();
                            soundBeep.currentTime = 0;
                        }, 2000);
                    } while (!playSound);
                    clearRestInterval();
                }
            }
        }, 1000);
    }
}

// Event listener for the start button
startButton.addEventListener("click", () => {
    if (time > 0) {
        displayACounter();
        startButton.classList.add("hide");
    } else {
        displayMessage.classList.remove("hide");
        displayMessage.textContent = "Please select a time";
    }
});


//Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
      console.log('Service Worker registrado con éxito:', registration);
    }, function(error) {
      console.log('Error al registrar el Service Worker:', error);
    });
  });
}

