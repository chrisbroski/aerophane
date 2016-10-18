/*jslint browser: true */
/*global aero */

function tabs() {
    "use strict";
    var tabArticles = document.querySelectorAll("article.tabs");

    aero.forEachElement(tabArticles, function (el, ii) {
        var tabNav, tabA;
        if (ii > 0) {
            el.style.display = "none";
            tabA = document.createElement("a");
            tabA.textContent = el.getElementsByTagName("h2")[0].textContent;
            tabA.href = "#tab" + ii;
            document.querySelector("body > nav").appendChild(tabA);
        } else {
            tabNav = document.createElement("nav");
            tabNav.className = "tabs";
            tabA = document.createElement("a");
            tabA.textContent = el.getElementsByTagName("h2")[0].textContent;
            tabA.href = "#tab0";
            tabNav.appendChild(tabA);
            document.body.insertBefore(tabNav, el);
        }
    });
}

tabs();
