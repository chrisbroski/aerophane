/* globals: aero */

aero.includeNav("../inc/main-nav.pht");

aero.touchclick(document.getElementById("exampleDialog"), function () {
    "use strict";
    aero.showDialog(document.querySelector("div.dialog"));
});
