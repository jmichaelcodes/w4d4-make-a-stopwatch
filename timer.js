// Setting up variables
var startButton = document.querySelector('#start');
var timer = document.querySelector('#timer');
var tenthsField = document.querySelector('#tenths');
var secondsField = document.querySelector('#seconds');
var minutesField = document.querySelector('#minutes');
var colorInterval;
var tenthsInterval;
var secondsInterval;
var minutesInterval;
var pauseTimeout;
var timeoutSeconds = 5;
var tenths = 00;
var seconds = 00;
var minutes = 00;

// Event listener for single click
document.querySelector('#start').addEventListener('click', handleStartButton);

// Start Button
function handleStartButton() {
    if (startButton.innerText === "Start") {
        setIntervals();
        startButton.innerHTML = "Pause";
        startButton.classList.add('btn-danger');
    } else if (startButton.innerText === "Pause") {
        clearIntervals();
        // Set inactivity function to run after 15 seconds
        pauseTimeout = setTimeout(inactivity, 15000);
        startButton.innerHTML = "Resume";
        startButton.classList.remove('btn-danger');
    } else if (startButton.innerText === "Resume") {
        setIntervals();
        // Stopping inactivity function
        clearTimeout(pauseTimeout, 5000);
        startButton.innerHTML = "Pause";
        startButton.classList.add('btn-danger');
    }
}

// Event listener for double click
document.querySelector('#start').addEventListener('dblclick', clearTime);   

// Clear timer on when in action occurs in paused state
function clearTime() {
    if (startButton.innerText === "Pause" ) {
        resetCounter();
    } 
}

// Count up tenths of seconds
function starttenthsTimer() {
    tenths++;
    document.querySelector('#tenths').innerHTML = `0${tenths}`;

    // Reset tenths timer to 0 instead of 10
    if (tenths === 9) {
        tenths = 0;
    }
}

// Count up seconds
function startSecondTimer() {
    seconds++;

    // Leading 0
    if (seconds < 10) {
        document.querySelector('#seconds').innerHTML = `0${seconds}`;
    } else {
        document.querySelector('#seconds').innerHTML = `${seconds}`;
    }

    // Reset seconds timer to 0 instead of 60
    if (seconds === 59) {
        seconds = 0
    }
}

// Count up minutes
function startMinuteTimer() {
    minutes++;

    // Leading 0
    if (seconds < 10) {
        document.querySelector('#minutes').innerHTML = `0${minutes}`;
    } else {
        document.querySelector('#minutes').innerHTML = `${minutes}`;
    }

}

// Change colors randomly
function changeColor() {
    var red = Math.round(Math.random() * 255);
    var green = Math.round(Math.random() * 255);
    var blue = Math.round(Math.random() * 255);
    var rgbTemplate = `rgb(${red}, ${green}, ${blue})`
    timer.style.color = rgbTemplate;
}

// Stopping counter and color changing
function clearIntervals() {
    clearInterval(colorInterval);
    clearInterval(tenthsInterval);
    clearInterval(secondsInterval);
    clearInterval(minutesInterval);
}

// Starting timer
function setIntervals() {
    tenthsInterval = setInterval(starttenthsTimer, 100);
    secondsInterval = setInterval(startSecondTimer, 1000);
    minutesInterval = setInterval(startMinuteTimer, 60000);
    colorInterval = setInterval(changeColor, 1000);
}

// Resetting values
function resetValues() {
            // Resetting counters
        tenths = 0;
        seconds = 0;
        minutes = 0;
        // Resetting text
        tenthsField.innerText = '00';
        secondsField.innerText = '00';
        minutesField.innerText = '00';
        // Return color to black (default)
        timer.style.color = '#000000';
}

// Setting seconds countdown for inactivity
function inactivity() {
    seconds--;
    resetCounter();
}

// Reset counter and return button text to start
function resetCounter() {
        if (startButton.innerText === "Pause") {
        alert('You have reset the counter');
        } else if (startButton.innerText === "Resume") {
            alert('You have been inactive for 15 seconds');
        }
        
            // Stopping counter
        clearIntervals();
        startButton.innerText = "Start";
        startButton.classList.remove('btn-danger');
        resetValues();
        // Pop up for counter reset

}