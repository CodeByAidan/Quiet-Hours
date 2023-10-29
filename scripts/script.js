import { DateTime } from '../node_modules/luxon/src/luxon.js';

/* Quiet Hours begin at 11pm Sunday-Thursday and 1am Friday and Saturday. */
function updateCountdown() {
    const now = DateTime.local({ zone: 'America/New_York' });
    // const now = DateTime.local({ zone: 'America/Los_Angeles' });
    let targetHour, quietDay;

    // 1 is Monday and 7 is Sunday
    if (now.weekday == 0) { // Day: Sunday
        targetHour = 23;
        quietDay = 'Sunday';
    } else if (now.weekday === 1) { // Day: Monday
        targetHour = 23;
        quietDay = 'Monday';
    } else if (now.weekday === 2) { // Day: Tuesday
        targetHour = 23;
        quietDay = 'Tuesday';
    } else if (now.weekday === 3) { // Day: Wednesday
        targetHour = 23;
        quietDay = 'Wednesday';
    } else if (now.weekday === 4) { // Day: Thursday
        targetHour = 23;
        quietDay = 'Thursday';
    } else if (now.weekday === 5) { // Day: Friday
        targetHour = 25;
        quietDay = 'Saturday';
    } else if (now.weekday === 6 && now.hour < 1) { // Day: Saturday and before 1am
        targetHour = 1;
        quietDay = 'Saturday';
    } else if (now.weekday === 6 && now.hour >= 1) { // Day: Saturday and after 1am
        targetHour = 25;
        quietDay = 'Sunday';
    } else if (now.weekday === 7 && now.hour < 1) { // Day: Sunday and before 1am
        targetHour = 1;
        quietDay = 'Sunday';
    } else if (now.weekday === 7 && now.hour >= 1) { // Day: Sunday and after 1am
        targetHour = 23;
        quietDay = 'Sunday';
    } else { // Error
        console.log('Error: Invalid weekday');
    }

    let targetDate = now.set({ hour: targetHour, minute: 0, second: 0, millisecond: 0 });

    if (now > targetDate) {
        // It's past the target time, so add one day
        targetDate = targetDate.plus({ days: 1 });
    }

    const timeDifference = targetDate.diff(now, ['hours', 'minutes', 'seconds', 'milliseconds']);
    const { hours, minutes, seconds, milliseconds } = timeDifference.toObject();

    document.getElementById("countdown").innerHTML = `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;

    const nextQuietHourTime = targetDate.toLocaleString(DateTime.TIME_SIMPLE);
    const nextQuietHourDay = targetDate.toLocaleString({ weekday: 'long' });

    const currentTime = now.toLocaleString(DateTime.TIME_SIMPLE);
    const currentDay = now.toLocaleString({ weekday: 'long' });

    document.getElementById("current-time").innerHTML = `
    Current time: ${currentTime}<br>
    Today is ${currentDay}<br>
    Quiet Hours start at ${nextQuietHourTime} on ${quietDay}`;
}

setInterval(updateCountdown, 1);
