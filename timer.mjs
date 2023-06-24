//Getting the Timer section and declaring two spans, the spans represents the minutes and seconds.
const timer = document.querySelector(".Timer");
const minutes = document.createElement("span");
const seconds = document.createElement("span");

// Setting the timer to 15 Minutes as a Test
let time = 0;
const initialTime = prompt("Enter the time in minutes: ");
if (initialTime == null || initialTime == "") {
    alert("You must enter a number");
} else {
    time = initialTime * 60;
}
// This is the countdown
function displayACounter() {
    const Interval = setInterval(() => {
        if (time > 0){
            convertinToMinutes(time);
            time -= 1;
        } else {
            clearInterval(Interval);
            timer.textContent = "Time is up!";
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
    timer.append(minutes, ":" , seconds);
}

//This function only format the numbet to match with the standar 00:00
function formatNumberWithLeadingZeros(number) {
    return number.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
}


export {displayACounter};
