function updateCountdown() {
    const now = new Date();
    let targetHour, quietDay;

    if (now.getDay() === 0 || (now.getDay() >= 1 && now.getDay() <= 4)) {
        targetHour = 23; // Sunday to Thursday: Quiet Hours start at 11pm
        quietDay = "Sunday to Thursday";
    } else {
        targetHour = 1; // Friday and Saturday: Quiet Hours start at 1am
        quietDay = "Friday and Saturday";
    }

    const targetDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        targetHour,
        0,
        0,
        0
    );
    if (now.getHours() >= targetHour) {
        targetDate.setDate(targetDate.getDate() + 1);
    }

    const timeDifference = targetDate - now;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const milliseconds = timeDifference % 1000;

    const nextQuietHourTime = targetDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    const nextQuietHourDay = targetDate.toLocaleDateString("en-US", {
        weekday: "long",
    });

    const currentTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });

    document.getElementById(
        "countdown"
    ).innerHTML = `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;

    document.getElementById("current-time").innerHTML = `
    Current time: ${currentTime}<br>
    Today is ${currentDay}<br>
    Quiet Hours start at ${nextQuietHourTime} on ${nextQuietHourDay}`;
}

setInterval(updateCountdown, 1);
