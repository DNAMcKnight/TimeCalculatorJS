const totalMinutes = (duration, am_pm = false) => {
    [hours, minutes] = duration.split(":");
    //adds 12 hours if am_pm is True else just add hours and minutes
    let totalMin = Number(hours) * 60 + Number(minutes);
    if (am_pm === true) totalMin = Number(hours) * 60 + Number(minutes) + 720;
    return totalMin;
};

const weekdayCalc = (weekday, days = NaN) => {
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    weekday = weekday.toString();
    const weekdayFixed =
        weekday.charAt(0).toUpperCase() + weekday.slice(1).toLowerCase();
    let weekIndex = week.findIndex((item) => item === weekdayFixed);
    if (!days) return weekdayFixed;
    let leftoverDays = (days + weekIndex) % 7;
    let finalDay = week[leftoverDays];
    return finalDay;
};

const add_time = (start, duration, weekday = NaN) => {
    let dayMessage = ""
    let [startTime, am_pm] = start.split(" ");
    // true if it's PM False if AM. Time returned is in 24 hour time.
    let sMinutes = totalMinutes(startTime, true);
    if (am_pm === "AM") sMinutes = totalMinutes(startTime, false);
    let dMinutes = totalMinutes(duration, false);
    let totaltime = sMinutes + dMinutes;
    // Total time in minutes converted into days, hours and minutes.
    let days = Math.floor(totaltime / 1440);
    let rem = totaltime % 1440;
    let hours = Math.floor(rem / 60);
    let minutes = rem % 60;
    // using days and the weekday given to calculate the estimated day if a weekday is given.
    let weekdayMessage = "";
    if (weekday) weekdayMessage = `, ${weekdayCalc(weekday, days)}`;

    if (days === 1) dayMessage = "(next day)";
    if (days > 1) dayMessage = ` (${days} days later)`;

    let midDay = false;
    if (hours >= 12) midDay = true;

    if (hours > 12) hours = hours - 12;
    if (hours === 0) hours = hours + 12;

    let minMsg = minutes;
    if (minutes < 10) minMsg = `0 ${minutes.toString()}`;

    let AMPM = "AM";
    if (midDay) AMPM = "PM";
    return `${hours}:${minMsg} ${AMPM}${weekdayMessage}${dayMessage}`;
};

// console.log(add_time("6:30 PM", "505:12", "monday"));
