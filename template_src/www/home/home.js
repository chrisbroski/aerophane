/*jslint browser: true */
/*globals aero */

document.getElementById("exampleDialog").onclick = function () {
    aero.showDialog(document.querySelector("div.dialog"));
};
