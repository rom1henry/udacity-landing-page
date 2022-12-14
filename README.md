# Landing Page Exercise

---

This project is the second exercise of the Front End Development Nanodegree with Udacity. Its goal is to put in practice the Javascript and DOM manipulation skills gained through the course. Although the contents and layout are provided as a template, all dynamic behaviors present on the webpage have been written independently thanks to planning, research, trial and error, and a couple headaches!

## Contents

- [Dynamic Navigation Menu](#dynamic-navigation-menu)
- [Automatic Scrolling](#automatic-scrolling)
- [Active Section Highlight](#active-section-highlight)
- [Mousemove and Scroll Detection](#mousemove-and-scroll-detection)
- [Scroll To Top Button](#scroll-to-top-button)
- [Eslint Validation](#eslint-validation)

## Dynamic Navigation Menu

---

The nav menu is generated dynamically based on the sections present on the page. To each `section` element in the document corresponds a `li` item in the navigation bar that points to it. The `addEventListener()` method was used on the navbar itself, along with an event delegation procedure to target specifically `<a>` tags inside it. In order to be responsive, the navbar styling uses flexbox to toggle between row and column display depending on screen width.

## Automatic Scrolling

---

Clicking on an item in the navigation bar will scroll to the corresponding section in a smooth manner. This is achieved using the `scrollIntoView()` JS method.

## Active Section Highlight

---

Using the `getBoundingClientRect()` method, each section in the page and its associated navbar item are marked as active via a dedicated CSS class, and visually differentiated as they are rendered.

## Mousemove and Scroll Detection

---

For improved experience, the navbar slides out of the viewport after 2.5 seconds without scrolling, or if the user is scrolling down, and reappears as the user scrolls up. This behevior is prevented if mouse pointer is on the navbar. Here again, the `scrollIntoView()` method is used, in combination with `setTimeout()`.

## Scroll To Top Button

---

As soon as the vertical scroll reaches a point where the top of the page is no longer visible, a "scroll-to-top" button appears in the bottom right corner, enabling the website visitor to quickly get back to the top of the page. This is achieved using `scrollIntoView()` along with the `classList.add()` method.

## Eslint Validation

---

The Javascript written for this project was constantly validated using the `eslint` module, to ensure code legibility, best practices and conventions. The AirBnB styling guidelines were used, with a few defaults overriden.
