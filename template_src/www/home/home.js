var aero = new Aerophane();
aero.buildNav(menuTitle, menuData);

aero.touchclick(document.getElementById("exampleDialog"), function () {
    "use strict";
    aero.showDialog(document.querySelector("div.dialog"));
});
