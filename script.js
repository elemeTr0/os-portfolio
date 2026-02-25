document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener("load", function() {
        document.body.style.visibility = "visible";
    });

    let w = window.innerWidth;
    let h = window.innerHeight;

    let back = document.getElementById("background")

    back.style.height = h;
    back.style.width = w;

    let me = document.getElementById("me");

    me.addEventListener("dblclick", function () {
        document.getElementById("meWin").classList.toggle("hidden");
    });

    let icons = document.getElementsByClassName('deskIc');

    function removeActiveFromAll() {
        for (let i = 0; i < icons.length; i++) {
            icons[i].classList.remove('active');
        }
    }

    for (let i = 0; i < icons.length; i++) {
        icons[i].addEventListener('click', function(e) {
            e.stopPropagation();  // Prevent document handler
            removeActiveFromAll();
            this.classList.toggle('active');
        });
    }

    document.addEventListener('click', function() {
        removeActiveFromAll();
    });

    function updateClock() {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleTimeString('en-US', {
            timeZone: 'Europe/Berlin',
            hour12: true,
            minute: '2-digit',
            hour: '2-digit'
        });
    }

    function updateDate() {
        const now = new Date();
        document.getElementById('date').innerText = now.toLocaleDateString('en-US');
    }

    updateClock();
    setInterval(updateClock, 1000);

    function startMidnightUpdates() {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);

        const timeToMidnight = midnight - now;

        setTimeout(() => {
            updateDate();
            startMidnightUpdates();
        }, timeToMidnight);
    }

    updateDate();
    startMidnightUpdates();
});
