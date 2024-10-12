const result = document.getElementById('result');

document.getElementById('calculate-btn').addEventListener('click', () => {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!startDate || !endDate) {
        result.innerText = "Please enter both dates.";
        return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if the starting date is less than the end date
    if (start >= end) {
        result.innerText = "The starting date must be less than the end date.";
        return;
    }

    const difference = calculateDateDifference(startDate, endDate);

    if (difference) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add("result"); // Corrected reference
        resultDiv.innerHTML = `
            <h2>Difference: ${difference.years} years, ${difference.months} months, and ${difference.days} days.</h2>
            <h2>Total Days: ${difference.totalDays}</h2>
            <h2>Total Months: ${difference.totalMonths}</h2>`;
        
        // Clear previous results before appending the new one
        result.innerHTML = ""; // Optional: clear previous results
        result.appendChild(resultDiv);
    }
});

function calculateDateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    // Calculate total days
    const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    const totalMonths = Math.floor(totalDays / 30); // Approximate total months

    if (days < 0) {
        months--;
        const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days, totalDays, totalMonths };
}

// Button to set today's date only for the end date
document.getElementById('set-today-btn').addEventListener('click', () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    document.getElementById('end-date').value = today; // Set only end date to today's date
});

// Display the current time
const todaysTime = document.getElementById('todays-time');

function updateTime() {
    const todayCalendar = new Date();
    const hours = todayCalendar.getHours().toString().padStart(2, '0');
    const minute = todayCalendar.getMinutes().toString().padStart(2, '0');
    const second = todayCalendar.getSeconds().toString().padStart(2, '0');
    todaysTime.innerText = `${hours} : ${minute} : ${second}`;
}

setInterval(updateTime, 1000); // Call updateTime every second
updateTime(); // Initial call to display time immediately

// Display current date
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonthIndex = currentDate.getMonth();
const currentDay = currentDate.getDate();

// Array of month names
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Get the month name from the array
const currentMonth = monthNames[currentMonthIndex];

// Format the date as "Month Day, Year"
const formattedDate = `${currentMonth} ${currentDay}, ${currentYear}`;
document.getElementById("todays-date").innerText = formattedDate;
