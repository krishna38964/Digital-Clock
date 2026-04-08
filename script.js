// ================= CLOCK + DATE =================
function updateClock() {
    let now = new Date();

    // TIME
    let time = now.toLocaleTimeString('en-US');

    // DATE → Tue | 07-Apr-2026
    let day = now.toLocaleDateString('en-US', { weekday: 'short' });
    let dateNum = String(now.getDate()).padStart(2, '0');
    let month = now.toLocaleDateString('en-US', { month: 'short' });
    let year = now.getFullYear();

    let fullDate = `${day} | ${dateNum}-${month}-${year}`;

    document.getElementById("clock").innerText = time;
    document.getElementById("date").innerText = fullDate;
}
setInterval(updateClock, 1000);


// ================= DARK MODE =================
function toggleMode() {
    document.body.classList.toggle("dark");

    let btn = document.getElementById("modeBtn");

    if (document.body.classList.contains("dark")) {
        btn.innerText = "☀️Light Mode";
    } else {
        btn.innerText = "🌙 Night Mode";
    }
}


// ================= STOPWATCH (WITH MS) =================
let ms = 0;
let sec = 0;
let min = 0;
let hr = 0;
let swTimer = null;

function startSW() {
    if (!swTimer) {
        swTimer = setInterval(runSW, 10); // 10ms
    }
}

function runSW() {
    ms += 10;

    if (ms === 1000) {
        ms = 0;
        sec++;
    }

    if (sec === 60) {
        sec = 0;
        min++;
    }

    if (min === 60) {
        min = 0;
        hr++;
    }

    document.getElementById("stopwatch").innerText =
        `${pad(hr)}:${pad(min)}:${pad(sec)}:${padMS(ms)}`;
}

function stopSW() {
    clearInterval(swTimer);
    swTimer = null;
}

function resetSW() {
    stopSW();

    ms = 0;
    sec = 0;
    min = 0;
    hr = 0;

    document.getElementById("stopwatch").innerText = "00:00:00:000";
}

function pad(n) {
    return n < 10 ? "0" + n : n;
}

function padMS(n) {
    return n.toString().padStart(3, '0');
}


// ================= ENABLE SOUND =================
let soundEnabled = false;

function enableSound() {
    if (!soundEnabled) {
        let audio = document.getElementById("alarmSound");

        audio.play().then(() => {
            audio.pause();
            audio.currentTime = 0;
            soundEnabled = true;
        }).catch(() => {});
    }
}


// ================= ALARM SYSTEM =================
let alarmHour = null;
let alarmMinute = null;
let alarmAMPM = null;
let alarmTriggered = false;

function setAlarm() {
    let input = document.getElementById("alarmTime").value.trim().toUpperCase();

    let match = input.match(/^(\d{1,2}):(\d{2}) (AM|PM)$/);

    if (!match) {
        alert("❌ Enter time like 10:30 AM");
        return;
    }

    alarmHour = parseInt(match[1]);
    alarmMinute = parseInt(match[2]);
    alarmAMPM = match[3];

    alarmTriggered = false;

    document.getElementById("alarmStatus").innerText =
        "✅ Alarm set for " + input;
}

function stopAlarm() {
    let sound = document.getElementById("alarmSound");

    sound.pause();
    sound.currentTime = 0;

    alarmHour = null;
    alarmMinute = null;
    alarmAMPM = null;
    alarmTriggered = false;

    document.getElementById("alarmStatus").innerText = "❌ Alarm stopped";
}


// ================= ALARM CHECK =================
setInterval(() => {
    if (alarmHour !== null && !alarmTriggered) {

        let now = new Date();

        let h = now.getHours();
        let m = now.getMinutes();

        let currentAMPM = h >= 12 ? "PM" : "AM";

        h = h % 12;
        if (h === 0) h = 12;

        if (h === alarmHour && m === alarmMinute && currentAMPM === alarmAMPM) {

            alarmTriggered = true;

            let sound = document.getElementById("alarmSound");
            sound.loop = true;
            sound.play();

            alert("⏰ Alarm Ringing!");
        }
    }
}, 1000);