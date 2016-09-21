/*jslint browser: true */

var aero;

function Utilities() {
    "use strict";

    function getEventTarget(e) {
        var targ;
        targ = e.target || e.srcElement;
        if (targ.nodeType === 3) { // defeat Safari bug
            targ = targ.parentNode;
        }
        return targ;
    }
    this.getEventTarget = getEventTarget;

    function touchclick(el, func, bubble) {
        bubble = !!bubble;
        if ("ontouchstart" in window || "onmsgesturechange" in window) {
            el.addEventListener("touchstart", func, bubble);
        } else {
            el.addEventListener("click", func, bubble);
        }
    }
    this.touchclick = touchclick;

    function buildNav(navItems) {
        var navButton, navMatte, navNav, navH2, navP, navA;

        navButton = document.querySelector('body > header button:first-child');
        navButton.innerHTML = '<div></div><div></div><div></div>';

        navMatte = document.createElement("div");
        navMatte.id = "matte";
        document.body.appendChild(navMatte);

        navNav = document.createElement("nav");
        navH2 = document.createElement("h2");
        navH2.textContent = "Aerophane";
        navNav.appendChild(navH2);

        navItems.forEach(function (item) {
            navP = document.createElement("p");
            navA = document.createElement("a");
            navA.textContent = item.name;
            navA.href = item.href;
            navP.appendChild(navA);
            navNav.appendChild(navP);
        });

        document.body.appendChild(navNav);

        touchclick(document.getElementById("matte"), function () {
            document.querySelector("nav").style.width = "0";
            document.getElementById("matte").style.display = "none";
        });

        touchclick(document.querySelector("body > header button:first-child"), function () {
            document.querySelector("nav").style.width = "240px";
            document.getElementById("matte").style.display = "block";
        });
    }
    this.buildNav = buildNav;
}

(function init() {
    "use strict";

    aero = new Utilities();

    /*aero.touchclick(document.getElementById("footer_back"), function () {
        window.history.back();
    });*/

    aero.buildNav([
        {"name": "Home", "href": "/index.html"},
        {"name": "List", "href": "/list/list.html"},
        {"name": "Form", "href": "/form/form.html"}
    ]);

}());
