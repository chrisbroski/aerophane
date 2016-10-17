/*jslint browser: true */
/*global aero */

document.getElementById("exampleDialog").onclick = function () {
    "use strict";
    aero.showDialog(document.querySelector("div.dialog"));
};
