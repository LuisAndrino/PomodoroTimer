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
let playSound;

let isThereRestTime = false;
let isPaused = false;
let isRestPaused = false;

// This function displays the countdown timer
function displayACounter(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsedTime = timestamp - startTime;
    if (elapsedTime >= 1000 && !isPaused) {
        startTime = timestamp;
        if (time > 0) {
            time -= 1;
            convertToMinutes(time);
            displayMessage.classList.add("hide");
            playSound = true;
            isThereRestTime = true;
        } else {
            if (playSound) {
                soundBeep.play();
                playSound = false;
            }
            if(isThereRestTime){
                displayRestTime();
                isThereRestTime = false;
            }
            pauseTimer.classList.add("hide");
            pauseRest.classList.remove("hide");
            if (displayMessageInterval) {
                displayMessage.classList.remove("hide");
                displayMessageInterval = false;
            }
        }
    }
    requestAnimationFrame(displayACounter);
}

let startTime;
// This function starts the countdown timer
function startCounter() {
    if (time > 0) {
        requestAnimationFrame(displayACounter);
        startButton.classList.add("hide");
    } else {
        displayMessage.classList.remove("hide");
        displayMessage.textContent = "Please select a time";
    }
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
    startTime = null;
}

// This function clears the rest interval
function clearRestInterval() {
    clearInterval(RestInterval);
    startTime = null;
    displayRestTimeInterval = true;
    isRestPaused = true;
}

// Event listener for the restart/pause button
pauseTimer.addEventListener("click", () => {
    pauseTimer.textContent == "⏸"
        ? (pauseTimer.textContent = "⏯")
        : (pauseTimer.textContent = "⏸");

    if (pauseTimer.textContent === "⏯") {
        isPaused = true;
        clearTimerInterval();
    } else {
        isPaused = false;
        requestAnimationFrame(displayACounter);
    }
});

// Event listener for the pause/rest button

pauseRest.addEventListener("click", () => {
    pauseRest.textContent == "⏸"
        ? (pauseRest.textContent = "⏯")
        : (pauseRest.textContent = "⏸");

    if (pauseRest.textContent === "⏯") {
        isRestPaused = true;
        clearRestInterval();
    } else {
        isRestPaused = false;
        displayRestTime();
    }
});

// Event listener for the 15 minutes button
fifteenMinutesButton.addEventListener("click", () => {
    if (time > 0) {
        time = 900; // 900 seconds = 15 minutes
    } else if (time === 0 && !RestInterval) {
        time = 900;
        startCounter();
    }
});

// Event listener for the 25 minutes button
twentyFiveMinutesButton.addEventListener("click", () => {
    if (time > 0) {
        time = 1500; // 1500 seconds = 25 minutes
    } else if (time === 0 && !RestInterval) {
        time = 1500;
        startCounter();
    }
});

// Event listener for the 30 minutes button
thirtyMinutesButton.addEventListener("click", () => {
    if (time > 0) {
        time = 1800; // 1800 seconds = 30 minutes
    } else if (time === 0 && !RestInterval) {
        time = 1800;
        startCounter();
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
        startCounter();
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
let displayRestTimeInterval = true;
let playRestSound ;
let RestInterval = null;
// This function displays the rest time
function displayRestTime(restTime = 300) {
    if (time === 0 && !RestInterval && !isRestPaused) {
        clearTimerInterval(); // Clear any existing timer interval
        RestInterval = setInterval(() => {
            if (restTime >= 0 && !isRestPaused) {
                convertToMinutes(restTime);
                restTime -= 1;
                displayMessage.classList.add("hide");
                playRestSound = true;
            } else {
                if (displayRestTimeInterval) {
                    startButton.classList.remove("hide");
                    displayMessage.classList.remove("hide");
                    displayRestTimeInterval = false;
                    if (playRestSound) {
                        soundBeep.play();
                        playRestSound = false;
                    }
                    clearRestInterval();
                }
            }
        }, 1000);
    }
}

// Event listener for the start button
startButton.addEventListener("click", () => {
    if (time > 0) {
        startCounter();
    } else {
        displayMessage.classList.remove("hide");
        displayMessage.textContent = "Please select a time";
    }
});
