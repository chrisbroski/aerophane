# Aerophane

Aerophane is an extra-light [Material Design](https://material.google.com/) template for Cordova hybrid mobile applications for Android and iOS.

## Use

After you have all of the prerequisites to make Cordova applications (including [Node.js](https://nodejs.org/), [Git](https://git-scm.com/), [Cordova](https://cordova.apache.org/), and your target environment's development tools - [Android Studio](https://developer.android.com/studio/) and/or [Xcode](https://developer.apple.com/xcode/)) you can create a new app with the Aerophane template using a command like this:

    cordova create *appname* *com.yourdomain.appname* "*App Name*" --template aerophane

If you want to learn more about Cordova, [this is a great place to start](https://cordova.apache.org/docs/en/latest/guide/cli/index.html).

## Purpose

Templates for mobile web and hybrid web (Cordova) applications are everywhere, but even the ones that advertise themselves as "lite" have major dependencies on additional frameworks, libraries, images, and fonts. I have found this bloat to be a significant hinderance to customization and portability. I desired an actually lightweight starting template for Cordova and online web apps that doesn't bring too much baggage to the relationship.

### Speed

The many fancy features of most mobile web templates bog down responsiveness, especially as compared to native mobile applications. This had lead many to believe that to make smooth running mobile apps, native is the only option. This is a myth. Aerophane starts you with a blazing fast interface. I can't stop you from making your app sluggish after you add tons of gratuitous and dubious features, but at least it will be of your own doing.

### Customization

Aerophane is designed to be easy to add what you need and not restrict the ability to implement any reasonable features. Aerophane is true template, **not** a framework.

### Clean, Clear, Minimal, Semantic Code

There are no gratuitous divs and classes. The HTML used for the UI looks exactly like standard, valid HTML5 and is clearly readable from source. Instead of cramming everything on one page, each screen is handled as a separate HTML file. UI resources are organized by the views they support - not dumped into folders based on their file type.

### Cross Platform

Aerophane is intended to work well in both Android and iOS devices.

## Main Features

* Slide-out hamburger main menu that stays out when the screen is over a certain width.
* Common UI elements including floating headers and footers, lists, cards, buttons, and form inputs.
* Custom dialog popups that can also power a cross-platform dropdown input selector.
* Common JavaScript utility functions to get event targets, for/each loop through an element collections, and manipulate class names.
* Handles the device ready event both app-wide and per UI page.
