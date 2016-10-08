/*jslint browser: true */

function Aerophane(mainMenuData, mainDeviceReady) {
    "use strict";
    var pageDeviceReady, isDeviceReady = false, classname;

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

    function forEachElement(els, func) {
        var ii, len = els.length;

        for (ii = 0; ii < len; ii += 1) {
            func.call(this, els[ii], ii);
        }
    }
    this.forEachElement = forEachElement;

    function manipulateClassNames(addOrRemove, el, class_name) {
        var classString = el.className, classArray;

        classArray = classString.split(" ");

        if (classArray.indexOf(class_name) > -1) {
            if (addOrRemove === "remove") {
                classArray.splice(classArray.indexOf(class_name), 1);
            }
        } else {
            if (addOrRemove === "add") {
                classArray.push(class_name);
            }
        }

        el.className = classArray.join(" ");
    }

    classname = {
        "add": function (el, class_name) {
            manipulateClassNames("add", el, class_name);
        },
        "remove": function (el, class_name) {
            manipulateClassNames("remove", el, class_name);
        }
    };
    this.classname = classname;

    function clearDialogs() {
        document.querySelector("nav").removeAttribute('style');
        forEachElement(document.querySelectorAll("div.dialog"), function (el) {
            el.style.display = "none";
        });
        document.getElementById("matte").style.display = "none";
        if (document.getElementById("aeroDialogSelect")) {
            document.body.removeChild(document.getElementById("aeroDialogSelect"));
        }
        manipulateClassNames("remove", document.body, "stop-scrolling");
    }

    function createMatte() {
        var navMatte = document.createElement("div");
        navMatte.id = "matte";
        document.body.appendChild(navMatte);

        touchclick(navMatte, clearDialogs);
    }

    function buildNav(navItems) {
        var navButton, navNav, navH2, navP, navA;

        navButton = document.querySelector('body > header button:first-child');
        navButton.innerHTML = '<div></div><div></div><div></div>';

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

        touchclick(document.querySelector("body > header button:first-child"), function () {
            document.querySelector("nav").style.width = "240px";
            document.getElementById("matte").style.display = "block";
            manipulateClassNames("add", document.body, "stop-scrolling");
        });
    }

    function dialogSelect(selects) {
        if (!selects) {
            return;
        }
        forEachElement(selects, function (el) {
            var dsButton = document.createElement("button"),
                dsLabel = document.createElement("span"),
                caret = document.createElement("div");

            dsButton.className = 'dialog';
            dsLabel.textContent = el.value;
            dsButton.appendChild(dsLabel);
            caret.className = 'caret';
            dsButton.appendChild(caret);

            el.parentNode.insertBefore(dsButton, el);
            dsButton.onclick = function (e) {
                var elDialog, dialogOption;
                e.preventDefault();
                classname.add(document.body, "stop-scrolling");
                document.getElementById("matte").style.display = "block";
                elDialog = document.createElement("div");
                elDialog.className = "dialog";
                elDialog.id = "aeroDialogSelect";

                forEachElement(el.options, function (option, index) {
                    dialogOption = document.createElement("div");
                    dialogOption.textContent = option.text;
                    dialogOption.setAttribute("data-select-index", index);
                    touchclick(dialogOption, function (e) {
                        var targ = getEventTarget(e);
                        el.selectedIndex = +targ.getAttribute("data-select-index");
                        el.previousSibling.getElementsByTagName("span")[0].textContent = el.value;
                        clearDialogs();
                    });

                    elDialog.appendChild(dialogOption);
                });

                document.body.appendChild(elDialog);
                elDialog.style.display = "block";
            };
        });
    }
    this.dialogSelect = dialogSelect;

    this.setPageDeviceReady = function (func) {
        pageDeviceReady = func;

        if (isDeviceReady) {
            func();
        }
    };

    function deviceReady() {
        isDeviceReady = true;

        if (mainDeviceReady) {
            mainDeviceReady();
        }
        if (pageDeviceReady) {
            pageDeviceReady();
        }
    }

    function initializeAero() {
        createMatte();
        buildNav(mainMenuData);
        document.addEventListener("deviceready", deviceReady);
    }

    initializeAero();
}
