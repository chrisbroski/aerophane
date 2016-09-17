/*jslint browser: true */

var aero;

function Utilities() {
    "use strict";

    this.getEventTarget = function getEventTarget(e) {
        var targ;
        targ = e.target || e.srcElement;
        if (targ.nodeType === 3) { // defeat Safari bug
            targ = targ.parentNode;
        }
        return targ;
    };

    this.touchclick = function touchclick(el, func, bubble) {
        bubble = !!bubble;
        if ("ontouchstart" in window || "onmsgesturechange" in window) {
            el.addEventListener("touchstart", func, bubble);
        } else {
            el.addEventListener("click", func, bubble);
        }
    };

    this.buildNav = function buildNav(navItems) {
        "use strict";
        var navMatte, navNav, navH2, navP, navA;

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
            // TODO: assign link
            navA.textContent = item;
            navP.appendChild(navA);
            navNav.appendChild(navP);
        });

        document.body.appendChild(navNav);

        this.touchclick(document.getElementById("matte"), function () {
            document.querySelector("nav").style.width = "0";
            document.getElementById("matte").style.display = "none";
        });

        this.touchclick(document.querySelector("header button:first-child"), function () {
            document.querySelector("nav").style.width = "240px";
            document.getElementById("matte").style.display = "block";
        });
    };
}

(function init() {
    "use strict";

    aero = new Utilities();

    /*function onDeviceReady() {
        // After this event, it is safe to call any Cordova plugin
    }*/

    aero.touchclick(document.getElementById("footer_back"), function () {
        window.history.back();
    });

    aero.buildNav(['Home', 'List', 'Form']);
    
    // document.addEventListener("deviceready", onDeviceReady);

    // Make links use JavaScript to keep iOS web apps from breaking out of the app window
}());
