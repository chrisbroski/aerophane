/*jslint browser: true */
/*globals Aerophane */

var aero;

(function init() {
    "use strict";

    if (aero) {
        return;
    }

    aero = new Aerophane([
        {"name": "Home", "href": "/home/home.html"},
        {"name": "List", "href": "/list/list.html"},
        {"name": "Form", "href": "/form/form.html"}
    ]);

}());
