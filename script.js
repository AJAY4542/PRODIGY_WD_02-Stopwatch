let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// Start button functionality
startBtn.addEventListener('click', () => {
    // If stopwatch is running, stop it, reset, and restart
    if (running) {
        clearInterval(tInterval); // Clear current interval
        resetStopwatch();         // Reset time and laps
    }
    
    // Start the stopwatch from 00:00:00
    startTime = new Date().getTime(); 
    tInterval = setInterval(updateTime, 10); // Update every 10ms
    running = true;
});

// Pause button functionality
pauseBtn.addEventListener('click', () => {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
});

// Reset button functionality
resetBtn.addEventListener('click', resetStopwatch);

// Lap button functionality
lapBtn.addEventListener('click', () => {
    if (running) {
        lapCount++;
        const lapTime = display.textContent;
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(lapElement);
    }
});

// Function to update time display
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10); // Get milliseconds in 2-digit format

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

// Function to pad numbers to 2 digits
function pad(number) {
    return number < 10 ? '0' + number : number;
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(tInterval); // Clear any existing interval
    running = false;          // Set running to false
    difference = 0;           // Reset time difference
    display.textContent = '00:00:00.00'; // Reset display
    lapsList.innerHTML = '';  // Clear laps
    lapCount = 0;             // Reset lap count
}
