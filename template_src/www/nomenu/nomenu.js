var aero = new Aerophane();

var backButton = document.querySelector("body > header > button:first-child");
aero.touchclick(backButton, function () {
    history.back();
});
