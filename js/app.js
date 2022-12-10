/* eslint-disable no-restricted-syntax */
/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

// only execute script in <head> when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
/**
 * Define Global Variables
*/

  const sections = document.querySelectorAll('section');
  const nav = document.querySelector('#navbar__list');

  /**
 * End Global Variables
 * Start Helper Functions
 *
*/

  // Build the nav menu
  const buildMenu = () => {
    const tempNav = document.createDocumentFragment();

    for (const section of sections) {
      const navItemLink = document.createElement('a');

      // Navigation to anchors will be done by scrollTo, so we replace href with a custom attribute
      navItemLink.setAttribute('data-nav', `#${section.getAttribute('id')}`);
      navItemLink.innerText = `${section.getAttribute('data-nav')}`;
      navItemLink.classList.add('menu__link');

      const navItem = document.createElement('li');
      navItem.appendChild(navItemLink);

      tempNav.appendChild(navItem);
    }

    nav.appendChild(tempNav);
  };

  // Add class 'active' to section when near top of viewport, and anchor in the nav menu
  const makeActive = () => {
    for (const section of sections) {
      const box = section.getBoundingClientRect();
      if (box.top <= 300 && box.bottom >= 300) {
        // Apply active state on the current section.
        section.classList.add('your-active-class');
        // Apply active state on the corresponding nav link.
        nav.querySelector(`[data-nav="#${section.id}"]`).classList.add('menu__link--active');
      } else {
        // Remove active state from other sections
        section.classList.remove('your-active-class');
        // Remove active state from other nav links
        nav.querySelector(`[data-nav="#${section.id}"]`).classList.remove('menu__link--active');
      }
    }
  };

  // Scroll smoothly to element
  const scrollToElement = (element) => {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /**
 * End Helper Functions
 * Begin Main Functions
 * */

  // build the nav
  buildMenu();

  // Invoke makeActive when document is scrolled
  document.addEventListener('scroll', () => {
    makeActive();
  });

  // invoke scrollTo when anchor in nav is clicked
  nav.addEventListener('click', (e) => {
    const { target } = e;
    // We delegate the event to a tags only inside the nav
    if (target.tagName !== 'A') return;
    // Get the section that matches the anchor's custom attribute
    const section = document.querySelector(target.dataset.nav);
    scrollToElement(section);
  });
}, false);
