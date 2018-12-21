var aero = new Aerophane();

var menuData = [
    {"name": "Home", "href": "../home/home.html"},
    {"name": "List", "href": "../list/list.html"},
    {"name": "Tabs", "href": "../tabs/tabs.html"},
    {"name": "Form", "href": "../form/form.html"}
];
var menuTitle = "Aerophane";

function getStyle(style) {
    if (style) {
        window.localStorage.setItem("style", style);
        document.querySelectorAll("link")[1].href = "../inc/" + style + ".css";
        aero.closeMenu();
        // aero.classname.add(document.querySelector("#style-" + style), "selected");
    } else {
        document.querySelectorAll("link")[1].href = "../inc/" + window.localStorage.getItem("style") + ".css";
        // aero.classname.add(document.querySelector("#style-default"), "selected");
    }

}

/* Style menu */
aero.createMenu(document.querySelector("#select-style"));
aero.touchclick(document.querySelector("#style-default"), function () {
    getStyle("main");
});
aero.touchclick(document.querySelector("#style-blue"), function () {
    getStyle("blue");
});
aero.touchclick(document.querySelector("#style-purple"), function () {
    getStyle("purple");
});

getStyle();
