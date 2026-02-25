document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener("load", function() {
        document.body.style.visibility = "visible";
    });

    let w = window.innerWidth;
    let h = window.innerHeight;

    let back = document.getElementById("background")

    back.style.height = parseInt(h);
    back.style.width = parseInt(w);

    let me = document.getElementById("me");
    let close = document.getElementById("close");
    let meWin = document.getElementById("meWin");

    function openWindow() {
        // show instantly
        meWin.style.display = "block";

        // set starting state
        meWin.style.opacity = "0";
        meWin.style.transform = "scale(0.95)";

        // trigger animation on next frame
        requestAnimationFrame(() => {
            meWin.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            meWin.style.opacity = "1";
            meWin.style.transform = "scale(1)";
        });
    }

    function closeWindow() {
        // animate out
        meWin.style.opacity = "0";
        meWin.style.transform = "scale(0.95)";

        // after transition ends, hide completely
        meWin.addEventListener("transitionend", function handler() {
            meWin.style.display = "none";
            meWin.removeEventListener("transitionend", handler);
        });
    }


    me.addEventListener("dblclick", openWindow);
    close.addEventListener("click", closeWindow);

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
