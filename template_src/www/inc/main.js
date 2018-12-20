var aero = new Aerophane();

var menuData = [
    {"name": "Home", "href": "../home/home.html"},
    {"name": "List", "href": "../list/list.html"},
    {"name": "Tabs", "href": "../tabs/tabs.html"},
    {"name": "Form", "href": "../form/form.html"}
];
var menuTitle = "Aerophane";

function getStyle(style) {
    document.querySelectorAll("link")[1].href = "../inc/" + style + ".css";
}

/* Style menu */
aero.createMenu(document.querySelector("#select-style"));
aero.touchclick(document.querySelector("#style-default"), function () {
    getStyle("main");
});
aero.touchclick(document.querySelector("#style-blue"), function () {
    getStyle("blue");
});
