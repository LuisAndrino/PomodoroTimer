//Getting the Timer section and declaring two spans, the spans represents the minutes and seconds.
const timer = document.querySelector(".Timer");
const minutes = document.createElement("span");
const seconds = document.createElement("span");

// Setting the timer to 15 Minutes as a Test 
let time = 900;

// This is the countdown 
function displayACounter() {
  setInterval(() => {
    convertinToMinutes(time);
    time -= 1;
  }, 1000);
}
 
//In this function we convert the time displayed in seconds to minutes
function convertinToMinutes(time) {
  const min = Math.floor(time / 60);
  const sec = time % 60;

  minutes.textContent = formatNumberWithLeadingZeros(min);
  seconds.textContent = formatNumberWithLeadingZeros(sec);

  timer.append(minutes, seconds);
}

//This function only format the numbet to match with the standar 00:00
function formatNumberWithLeadingZeros(number) {
  return number.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
}

displayACounter();

