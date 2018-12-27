function Aerophane(mainDeviceReady) {
    "use strict";

    var pageDeviceReady, isDeviceReady = false, classname;

    function isTouch() {
        return ("ontouchstart" in window || "onmsgesturechange" in window);
    }
    this.isTouch = isTouch;

    function touchclick(el, func, bubble) {
        if (!el) {
            return;
        }
        bubble = !!bubble;

        function cancelTouchClick() {
            /* jshint validthis: true */
            this.removeEventListener("touchend", func, bubble);
            this.removeEventListener("touchcancel", cancelClick, bubble);
            /* jshint validthis: false */
        }

        if (isTouch()) {
            el.addEventListener("touchstart", function () {
                this.addEventListener("touchend", func, bubble);
                this.addEventListener("touchcancel", cancelTouchClick, bubble);
            }, bubble);
        } else {
            el.addEventListener("click", func, bubble);
        }
    }
    this.touchclick = touchclick;

    function forEachElement(els, func) {
        var ii, len = els.length;

        for (ii = 0; ii < len; ii += 1) {
            func(els[ii], ii);
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

    function querystring(key) {
        var oRe = new RegExp("[\\?&]" + fldNm + "=([^&#]*)");
        var val = oRe.exec(parent.location.search);
        return (val) ? unescape(val[1]) : "";
    }
    this.querystring = querystring;

    function showDialog(el) {
        document.activeElement.blur();
        document.getElementById("matte").style.display = "block";
        classname.add(document.body, "stop-scrolling");
        el.style.display = "block";
    }
    this.showDialog = showDialog;

    function closeMenu(e) {
        var menus = document.querySelectorAll("body > menu"),
            nodeName = "",
            parentNodeName = "";

        if (e) {
            nodeName = e.target.nodeName;
            if (e.target.parentElement) {
                parentNodeName = e.target.parentElement.nodeName;
            }
        }

        if (nodeName !== "LI" && parentNodeName != "MENU") {
            forEachElement(menus, function (menu) {
                menu.style.display = "none";
            });
            document.body.removeEventListener("click", closeMenu);
            classname.remove(document.body, "stop-scrolling");
        }
    }
    this.closeMenu = closeMenu;

    function createMenu(button) {
        button.addEventListener("click", function () {
            var menuId = this.getAttribute("data-menu-id");
            var menu = document.getElementById(menuId);
            if (menu.style.display !== "block") {
                document.activeElement.blur();
                menu.style.display = "block";
                classname.add(document.body, "stop-scrolling");
                window.setTimeout(function () {
                    document.body.addEventListener("click", closeMenu);
                }, 10);
            }
        });
    }
    this.createMenu = createMenu;

    function clearDialogs() {
        var mainNav = document.querySelector("nav#main");
        if (mainNav && mainNav.hasAttribute("style")) {
            mainNav.removeAttribute("style");
        }
        forEachElement(document.querySelectorAll("div.dialog"), function (el) {
            el.style.display = "none";
        });
        document.getElementById("matte").style.display = "none";
        if (document.getElementById("aeroDialogSelect")) {
            document.body.removeChild(document.getElementById("aeroDialogSelect"));
        }
        manipulateClassNames("remove", document.body, "stop-scrolling");
    }
    this.clearDialogs = clearDialogs;

    function createMatte() {
        var navMatte = document.createElement("div");
        navMatte.id = "matte";
        document.body.appendChild(navMatte);

        touchclick(navMatte, clearDialogs);
    }

    function showNav(nav) {
        var mainNav = document.querySelector("body > nav#main");
        if (mainNav.style.width === "240px") {
            clearDialogs();
        } else {
            mainNav.style.width = "240px";
            document.getElementById("matte").style.display = "block";
            manipulateClassNames("add", document.body, "stop-scrolling");
        }
    }
    this.showNav = showNav;

    function initNav(button) {
        button = button || document.querySelector("body > header > button:first-child");
        touchclick(button, function () {
            showNav();
        });
    }
    this.initNav = initNav;

    function include(el, path, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", path);
        xhr.onload = function () {
            el.innerHTML = this.responseText;
            if (callback) {
                callback();
            }
        };
        xhr.send();
    }
    this.include = include;

    function includeNav(navFile) {
        var mainNav = document.createElement("nav");
        mainNav.id = "main";
        mainNav.style.width = "0";
        document.body.appendChild(mainNav);
        include(mainNav, navFile, function () {
            initNav();
            window.setTimeout(function () {
                mainNav.removeAttribute("style");
            }, 10);
        });
    }
    this.includeNav = includeNav;

    function dialogSelect(selects) {
        if (!selects) {
            return;
        }
        forEachElement(selects, function (el) {
            var dsButton = document.createElement("button"),
                dsLabel = document.createElement("span"),
                caret = document.createElement("div");

            dsButton.className = "dialog";
            dsLabel.textContent = el.value;
            dsButton.appendChild(dsLabel);
            caret.className = "caret";
            dsButton.appendChild(caret);

            el.parentNode.insertBefore(dsButton, el);
            touchclick(dsButton, function (e) {
                var elDialog, dialogOption;
                e.preventDefault();

                elDialog = document.createElement("div");
                elDialog.className = "dialog";
                elDialog.id = "aeroDialogSelect";

                forEachElement(el.options, function (option, index) {
                    dialogOption = document.createElement("div");
                    dialogOption.textContent = option.text;
                    dialogOption.setAttribute("data-select-index", index);
                    touchclick(dialogOption, function (e) {
                        el.selectedIndex = +this.getAttribute("data-select-index");
                        el.previousSibling.getElementsByTagName("span")[0].textContent = el.value;
                        clearDialogs();
                    });

                    elDialog.appendChild(dialogOption);
                });

                document.body.appendChild(elDialog);
                showDialog(elDialog);
            });
        });
    }
    this.dialogSelect = dialogSelect;

    function fastForm() {
        var inputTypes = ["text", "password", "email", "number", "search", "checkbox", "radio"];
        var inputs = document.querySelectorAll('input, label');

        function fastcheck(elInput) {
            var inputs, inputType;
            if (elInput.tagName.toLowerCase() === 'label') {
                inputs = elInput.getElementsByTagName("input");
                if (inputs && inputs.length) {
                    elInput = inputs[0];
                }
            }
            inputType = elInput.getAttribute("type");

            if (inputType) {
                inputType.toLowerCase();
            }

            if (inputType === 'checkbox') {
                elInput.checked = !elInput.checked;
            }
            if (inputType === 'radio') {
                elInput.checked = true;
            }
            elInput.focus();
        }

        forEachElement(inputs, function (el) {
            var elInputs;
            if (!isTouch()) {
                return;
            }
            if (!el.getAttribute("type") || inputTypes.indexOf(el.getAttribute("type")) > -1) {
                el.addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    fastcheck(this);
                });
            }
        });
    }
    this.fastForm = fastForm;

    function getTabIndex() {
        if (!location.hash) {
            return 1;
        }
        if (location.hash.slice(0, 4) !== "#tab") {
            return 1;
        }
        var tabIndex = parseInt(location.hash.slice(4));
        if (tabIndex) {
            return tabIndex;
        }
        return 1;
    }

    function showTab(tabIndex) {
        var tabArticles = document.querySelectorAll("article.tabs"),
            tabTabs = document.querySelectorAll("nav.tabs a");

        forEachElement(tabArticles, function (el, ii) {
            if (ii === tabIndex - 1) {
                el.className = "tabs active";
                tabTabs[ii].className = "active";
            } else {
                el.className = "tabs";
                tabTabs[ii].className = "";
            }
        });
    }

    function tabInit() {
        var tabArticles = document.querySelectorAll("article.tabs");

        forEachElement(tabArticles, function (el, ii) {
            var tabNav, tabA, tabName;

            if (ii === 0) {
                tabNav = document.createElement("nav");
                tabNav.className = "tabs";
                document.body.insertBefore(tabNav, el);
            }

            tabA = document.createElement("a");
            tabName = el.firstElementChild;
            tabA.textContent = tabName.textContent;
            el.removeChild(tabName);
            tabA.href = "#tab" + (ii + 1);
            document.querySelector("body > nav").appendChild(tabA);
        });

        window.onhashchange = function () {
            showTab(getTabIndex());
        };

        showTab(getTabIndex());
    }

    this.tab = {};
    this.tab.init = tabInit;
    this.tab.show = showTab;

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
        document.addEventListener("deviceready", deviceReady);
    }

    initializeAero();
}
