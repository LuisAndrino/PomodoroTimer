//Getting the Timer section and declaring two spans, the spans represents the minutes and seconds.
const timer = document.querySelector(".Timer");
const minutes = document.createElement("span");
const seconds = document.createElement("span");
const restartButton = document.querySelector(".restart");
const fifteenMinutesButton = document.querySelector(".quince");
const twentyFiveMinutesButton = document.querySelector(".veinticinco");
const thirtyMinutesButton = document.querySelector(".treinta");
const displayMessage = document.querySelector(".message");
const pauseRest = document.querySelector(".pauseRest");

// Setting the timer to 15 Minutes as a Test
let time = 5;
let Interval;
// This is the countdown
function displayACounter() {
    Interval = setInterval(() => {
        if (time > 0) {
            convertinToMinutes(time);
            time -= 1;
            displayMessage.classList.add("hide");
        } else {
            displayMessage.classList.remove("hide");
            displayMessage.textContent = "Time is up!";
        }
    }, 1000);
}

//In this function we convert the time displayed in seconds to minutes
function convertinToMinutes(time) {
    const min = Math.floor(time / 60);
    const sec = time % 60;

    minutes.textContent = formatNumberWithLeadingZeros(min);
    seconds.textContent = formatNumberWithLeadingZeros(sec);

    timer.innerHTML = "";
    timer.append(minutes, ":", seconds);
}

//pause button, this button pause and restart the interval
restartButton.addEventListener("click", () => {
    restartButton.textContent == "Pause"
        ? (restartButton.textContent = "Resume")
        : (restartButton.textContent = "Pause");

    if (restartButton.textContent === "Resume") {
        clearInterval(Interval);
        console.log("UWu");
    } else {
        displayACounter();
    }
});

//This button pause and restart the rest time
pauseRest.addEventListener("click", () => {
    pauseRest.textContent == "Pause Rest"
        ? (pauseRest.textContent = "Resume Rest")
        : (pauseRest.textContent = "Pause Pause Rest");

    if (pauseRest.textContent === "Resume Rest") {
        clearInterval(Interval);
        console.log("UWu");
    } else {
        displayRestTime();
    }
});
//15 minutes button
fifteenMinutesButton.addEventListener("click", () => {
    if (time > 0) {
        time = 900;
    } else {
        time = 900;
        displayACounter();
    }
});
//25 minutes button
twentyFiveMinutesButton.addEventListener("click", () => {
    if (time > 0) {
        time = 1500;
    } else {
        time = 1500;
        displayACounter();
    }
});

//30 minutes button
thirtyMinutesButton.addEventListener("click", () => {
    if (time > 0) {
        time = 1800;
    } else {
        time = 1800;
        displayACounter();
    }
});

//This function only format the numbet to match with the standar 00:00
function formatNumberWithLeadingZeros(number) {
    return number.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
}


//This is for the rest time
let restTime = 5;

function displayRestTime() {
    if (time === 0) {
        Interval = setInterval(() => {
            if (restTime >= 0) {
                convertinToMinutes(restTime);
                restTime -= 1;
                displayMessage.classList.add("hide");
            } else {
                displayMessage.classList.remove("hide");
                displayMessage.textContent = "Rest Time is up!";
            }
        }, 1000);
    }
}

export { displayACounter, displayRestTime };
