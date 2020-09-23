// ⌛pomodoro timer⏳

// == root
let root = document.documentElement;

let interval = null; // interval changing time
let changeTimeButtons = document.querySelectorAll("button.change-time"); // buttons changing time periods
let timerMinutes = null; // time period minutes

let start = document.querySelector("button.start"); // start button
start.addEventListener("click", () => {
    // start button event listener
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
                if (parseInt(currentMinutes.innerHTML) < 10) {
                    currentMinutes.innerHTML = "0" + currentMinutes.innerHTML;
                }
            }
            currentSeconds.innerHTML = parseInt(currentSeconds.innerHTML) - 1;
            if (parseInt(currentSeconds.innerHTML) < 10) {
                currentSeconds.innerHTML = "0" + currentSeconds.innerHTML;
            }
            document.head.querySelector(
                "title"
            ).innerHTML = `🍅${currentMinutes.innerHTML} : ${currentSeconds.innerHTML}🍅`;
            if (
                parseInt(currentMinutes.innerHTML) == 0 &&
                parseInt(currentSeconds.innerHTML) == 0
            ) {
                let ring = new Audio("sounds/ring.mp3");
                ring.play();
                clearInterval(interval);
                setTimeout(() => {
                    start.dispatchEvent(new Event("click"));
                }, 5000);
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
        document.head.querySelector("title").innerHTML = "pomodoro";
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
        if (parseInt(timer.querySelector("span.minutes").innerHTML) < 10) {
            timer.querySelector("span.minutes").innerHTML =
                "0" + timer.querySelector("span.minutes").innerHTML;
        }
        timer.querySelector("span.seconds").innerHTML == "00";
        if (start.innerHTML == "stop") {
            start.dispatchEvent(new Event("click"));
        }
    });
    // changing background and colors
    if (changeTimeButton.dataset.type == "pomodoro") {
        changeTimeButton.addEventListener("click", () => {
            root.style.setProperty("--main-color", "#f05b56");
            root.style.setProperty("--secondary-color", "#f26c67");
        });
    } else if (changeTimeButton.dataset.type == "short") {
        changeTimeButton.addEventListener("click", () => {
            root.style.setProperty("--main-color", "#00D969");
            root.style.setProperty("--secondary-color", "#00F074");
        });
    } else {
        changeTimeButton.addEventListener("click", () => {
            root.style.setProperty("--main-color", "#498FC1");
            root.style.setProperty("--secondary-color", "#5C9AC7");
        });
    }
}
// getting time minutes
timerMinutes = parseInt(
    document.querySelector("button.change-time.active").dataset.time
);

// timer minutes
let timer = document.querySelector("div.timer-time");
let current = document.querySelector("button.change-time.active").dataset.type;

// initial time change
timer.querySelector("span.minutes").innerHTML = timerMinutes;
timer.querySelector("span.seconds").innerHTML = "00";
// settings button
let settingsButton = document.querySelector("img.settings-button");

settingsButton.addEventListener("click", () => {
    if (settingsButton.dataset.action == "show") {
        document.querySelector("div.settings").style.left = "0px";
        settingsButton.dataset.action = "hide";
    } else {
        document.querySelector("div.settings").style.left = "-600px";
        settingsButton.dataset.action = "show";
    }
});

// settings

let applyButton = document.querySelector("button.apply");

applyButton.addEventListener("click", () => {
    if (document.querySelector("input.pomodoro-input").value == "") {
        document.querySelector("input.pomodoro-input").value = "25";
    }
    if (document.querySelector("input.short-input").value == "") {
        document.querySelector("input.short-input").value = "5";
    }
    if (document.querySelector("input.long-input").value == "") {
        document.querySelector("input.long-input").value = "15";
    }
    changeTimeButtons[0].dataset.time = document.querySelector(
        "input.pomodoro-input"
    ).value;
    changeTimeButtons[1].dataset.time = document.querySelector(
        "input.short-input"
    ).value;
    changeTimeButtons[2].dataset.time = document.querySelector(
        "input.long-input"
    ).value;
    timerMinutes = parseInt(
        document.querySelector("button.change-time.active").dataset.time
    );
    timer.querySelector("span.minutes").innerHTML = timerMinutes;
    timer.querySelector("span.seconds").innerHTML = "00";
    if (parseInt(document.querySelector('span.minutes').innerHTML) < 10) {
        document.querySelector('span.minutes').innerHTML = '0' + document.querySelector('span.minutes').innerHTML; 
    }
    settingsButton.dispatchEvent(new Event('click'));

});
