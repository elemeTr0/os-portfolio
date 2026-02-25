const meWin = document.getElementById("meWin");
const toolbar = document.getElementById("meWinToolbar");

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

toolbar.addEventListener("mousedown", function(e) {
    isDragging = true;

    // Calculate mouse offset inside the window
    offsetX = e.clientX - meWin.offsetLeft;
    offsetY = e.clientY - meWin.offsetTop;

    toolbar.style.cursor = "grabbing";
});

document.addEventListener("mousemove", function(e) {
    if (!isDragging) return;

    // Calculate new position
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;

    // Optional: keep window inside viewport
    const maxLeft = window.innerWidth - meWin.offsetWidth;
    const maxTop = window.innerHeight - meWin.offsetHeight;

    left = Math.max(0, Math.min(left, maxLeft));
    top = Math.max(0, Math.min(top, maxTop));

    meWin.style.left = left + "px";
    meWin.style.top = top + "px";
});

document.addEventListener("mouseup", function() {
    if (!isDragging) return;
    isDragging = false;
    toolbar.style.cursor = "grab";
});