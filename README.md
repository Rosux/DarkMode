[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
# DarkMode
## [Example](https://rosux.github.io/DarkMode/)

A simple JavaScript class for enabling dark mode on a website.

Made by Rosux.

## Installation

To use this class on your website, include the `DarkMode.js` file in your project and instantiate a new DarkMode object with the required parameters.

```html
<script src="DarkMode.js"></script> <!-- no defer needed -->
<script>
    const dark = "--background-color: black;";
    const light = "--background-color: white;";
    const darkMode = new DarkMode(dark, light);
</script>
```
## Usage

To toggle dark mode on and off, simply call the toggle() method on the DarkMode object.

```js
darkMode.toggle();
```

You can also set dark mode to be on or off by calling the on() or off() methods, respectively.

```js
darkMode.on(); // sets dark mode to on
darkMode.off(); // sets dark mode to off
```
You can set the theme to the user's preferred color scheme by calling the defaultColorScheme() method.

```js
darkMode.defaultColorScheme();
```
You can check the current state of dark mode by accessing the getMode() method, which returns a Boolean (true if dark, false if light).

```js
if (darkMode.getMode()) {
  console.log('Dark mode is on');
} else {
  console.log('Dark mode is off');
}
```

Customization

You can customize the colors used in dark mode by passing an strings of css variables to the DarkMode constructor.

```js
const darkMode = new DarkMode(
  'css variables for dark theme',
  'css variables for light theme'
);
```
You can also add event listeners to elements with darkmode-button and darkmode-selector attributes to control the dark mode state.

```html
<button darkmode-button="switch">switch</button>
<button darkmode-button="on">make it dark</button>
<button darkmode-button="off">make it light</button>
<button darkmode-button="default">default to prefered color scheme</button>
<input type="checkbox" darkmode-selector="true" value='if its checked its dark (defaults to true)'>
<input type="checkbox" darkmode-selector="false" value='if its checked its light (defaults to true)'>
```

You can add eventListeners to new elements with darkmode-button and darkmode-selector attributes. This also automatically updates the buttons state.
```js
darkMode.applyListener();
```

# Contributing

We welcome contributions to this project! If you have an idea for a new feature or a bug to report, please open an issue. If you want to submit a fix or a new feature, please create a pull request.

Before submitting a pull request, please make sure to:

    Write tests for any new code (simple examples on a page to prove it works)
    Follow the existing code style
    Document any changes in a log file

Thank you for considering contributing to DarkMode!

Let's make dark the new standard.
