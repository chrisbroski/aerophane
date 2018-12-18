var aero = new Aerophane();

var backButton = document.querySelector("body > header > button:first-child");
aero.touchclick(backButton, function () {
    history.back();
});

var prog = 0;
function advanceProgress() {
    var progHeader = document.querySelector(".progress-determinate");
    progHeader.style = "--width:" + prog + "%";
    prog += 0.3;
    if (prog >= 100) {
        prog = 0;
    }
    window.setTimeout(advanceProgress, 20);
}
advanceProgress();
