Aerophane Reference
===================

## Aerophane JavaScript Object Methods

The Aerophane constructor has three optional arguments:

* `mainMenuTitle` is the first argument. It is a string that is displayed at the top of the main slide-out menu.
* `mainMenuData` is an array of menu objects.
* `mainDeviceReady` is a function that will be run once the initialization process completes.

Like so:

    aero = new Aerophane("Aerophane", [
        {"name": "Home", "href": "../home/home.html"},
        {"name": "List", "href": "../list/list.html"},
        {"name": "Tabs", "href": "../tabs/tabs.html"},
        {"name": "Form", "href": "../form/form.html"}
    ], pageInit);
