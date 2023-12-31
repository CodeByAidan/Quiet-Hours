// @ts-ignore
import { DateTime } from 'https://cdn.skypack.dev/luxon@2.1.1';
function updateCountdown() {
    const now = DateTime.local({ zone: 'America/New_York' });
    let targetHour, quietDay;
    // 1 is Monday and 7 is Sunday
    if (now.weekday == 7) { // Day: Sunday
        if (now.hour < 1) { // It's before 1am, so quiet hours are still in effect
            targetHour = 23;
            quietDay = 'Sunday';
        }
        else { // It's after 1am, so quiet hours are over
            targetHour = 23;
            quietDay = 'Monday';
        }
    }
    else if (now.weekday >= 1 && now.weekday <= 4) { // Day: Monday to Thursday
        targetHour = 23;
        quietDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'][now.weekday];
    }
    else if (now.weekday === 5) { // Day: Friday
        if (now.hour < 1) { // It's before 1am, so quiet hours are still in effect
            targetHour = 1;
            quietDay = 'Saturday';
        }
        else { // It's after 1am, so quiet hours are over
            targetHour = 25;
            quietDay = 'Sunday';
        }
    }
    else if (now.weekday === 6) { // Day: Saturday
        if (now.hour < 1) { // It's before 1am, so quiet hours are still in effect
            targetHour = 1;
            quietDay = 'Saturday';
        }
        else { // It's after 1am, so quiet hours are over
            targetHour = 1;
            quietDay = 'Sunday';
        }
    }
    else { // Error
        console.error('Error: Invalid weekday');
        return;
    }
    let targetDate = now.set({ hour: targetHour, minute: 0, second: 0, millisecond: 0 });
    if (now > targetDate) {
        // It's past the target time, so add one day
        targetDate = targetDate.plus({ days: 1 });
    }
    const timeDifference = targetDate.diff(now, ['hours', 'minutes', 'seconds', 'milliseconds']);
    const { hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = timeDifference.toObject();
    const countdownElement = document.getElementById("countdown");
    const currentTimeElement = document.getElementById("current-time");
    if (countdownElement && currentTimeElement) {
        countdownElement.innerHTML = `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
        const nextQuietHourTime = targetDate.toLocaleString(DateTime.TIME_SIMPLE);
        const nextQuietHourDay = targetDate.toLocaleString({ weekday: 'long' });
        const currentTime = now.toLocaleString(DateTime.TIME_SIMPLE);
        const currentDay = now.toLocaleString({ weekday: 'long' });
        currentTimeElement.innerHTML = `
        Current time: ${currentTime}<br>
        Today is ${currentDay}<br>
        Quiet Hours start at ${nextQuietHourTime} on ${quietDay}`;
    }
    else {
        console.error('Error: Countdown or current time element not found');
    }
}
setInterval(updateCountdown, 1);
