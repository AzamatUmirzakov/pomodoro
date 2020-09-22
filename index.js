let interval = null;
let changeTimeButtons = document.querySelectorAll("button.change-time");
let timerMinutes = null;

let start = document.querySelector("button.start");
start.addEventListener("click", () => {
    if (start.dataset.action == "start") {
        start.dataset.action = "stop";
        start.innerHTML = "stop";
        interval = setInterval(() => {
            let currentMinutes = timer.querySelector("span.minutes");
            let currentSeconds = timer.querySelector("span.seconds");
            if (parseInt(currentSeconds.innerHTML) == 0) {
                currentSeconds.innerHTML = "60";
                currentMinutes.innerHTML =
                    parseInt(currentMinutes.innerHTML) - 1;
            }
            currentSeconds.innerHTML = parseInt(currentSeconds.innerHTML) - 1;
            if (
                parseInt(currentMinutes.innerHTML) == 0 &&
                parseInt(currentSeconds.innerHTML) == 0
            ) {
                clearInterval(interval);
            }
        }, 1000);
    } else {
        start.innerHTML = "start";
        start.dataset.action = "start";
        clearInterval(interval);
        timer.querySelector("span.minutes").innerHTML = document.querySelector(
            "button.change-time.active"
        ).dataset.time;
        timer.querySelector("span.seconds").innerHTML = "00";
    }
});

// adding click event listeners to buttons

for (let changeTimeButton of changeTimeButtons) {
    changeTimeButton.addEventListener("click", () => {
        for (let changeTimeButton of changeTimeButtons) {
            if (changeTimeButton.classList.contains("active")) {
                changeTimeButton.classList.remove("active");
            }
        }
        changeTimeButton.classList.add("active");
        timerMinutes = parseInt(
            document.querySelector("button.change-time.active").dataset.time
        );
        timer.querySelector("span.minutes").innerHTML = timerMinutes;
        timer.querySelector("span.seconds").innerHTML == "00";
        if (start.innerHTML == "stop") {
            start.dispatchEvent(new Event("click"));
        }
    });
    if (changeTimeButton.dataset.type == "pomodoro") {
        changeTimeButton.addEventListener("click", () => {
            document.querySelector("main.content").style.background = "#F05B56";
            document.querySelector("button.start").style.color = "#F05B56";
        });
    } else if (changeTimeButton.dataset.type == "short") {
        changeTimeButton.addEventListener("click", () => {
            document.querySelector("main.content").style.background = "#00D969";
            document.querySelector("button.start").style.color = "#00D969";
        });
    } else {
        changeTimeButton.addEventListener("click", () => {
            document.querySelector("main.content").style.background = "#498FC1";
            document.querySelector("button.start").style.color = "#498FC1";
        });
    }
}
timerMinutes = parseInt(
    document.querySelector("button.change-time.active").dataset.time
);

// timer minutes
let timer = document.querySelector("div.timer-time");
let current = document.querySelector("button.change-time.active").dataset.type;

timer.querySelector("span.minutes").innerHTML = timerMinutes;
timer.querySelector("span.seconds").innerHTML = "00";
