/* globals: aero */

aero.includeNav("../inc/main-nav.pht");

aero.touchclick(document.querySelector("div#fab"), function () {
    var div = document.createElement("div");
    var count = document.querySelector("section > div:last-child i").textContent;
    count = parseInt(count, 10);
    var bullet = document.createElement("i");
    var title = document.createElement("h3");
    bullet.textContent = count + 1;
    title.textContent = "Another Item";
    div.appendChild(bullet);
    div.appendChild(title);
    document.querySelector("section").appendChild(div);
});
