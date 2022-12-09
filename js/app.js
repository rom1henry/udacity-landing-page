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

  // Function to create the nav menu
  const buildMenu = () => {
    let tempNav = document.createDocumentFragment();

    for (const section of sections) {
      const navItemLink = document.createElement('a');
      navItemLink.setAttribute('href', `#${section.getAttribute('id')}`);
      navItemLink.innerText = `${section.getAttribute('data-nav')}`;

      // on top of the menu__link class, we add a class named after the section it matches
      navItemLink.classList.add('menu__link');

      const navItem = document.createElement('li');
      navItem.appendChild(navItemLink);

      tempNav.appendChild(navItem);
    }

    nav.appendChild(tempNav);
  };

  // Function to add class 'active' to section when near top of viewport

  const makeActive = () => {
    for (const section of sections) {
      const box = section.getBoundingClientRect();
      if (box.top <= 300 && box.bottom >= 300) {
        // Apply active state on the current section.
        section.classList.add('your-active-class');
        // Apply active state on the corresponding nav link.
        nav.querySelector(`[href="#${section.id}"]`).classList.add('menu__link--active');
      } else {
        // Remove active state from other sections
        section.classList.remove('your-active-class');
        // Remove active state from other nav links
        nav.querySelector(`[href="#${section.id}"]`).classList.remove('menu__link--active');
      }
    }
  };

  /**
 * End Helper Functions
 * Begin Main Functions
 * */

  // build the nav
  buildMenu();

  // Add class 'active' to section when near top of viewport

  document.addEventListener('scroll', () => {
    makeActive();
  });

  // Scroll to anchor ID using scrollTO event

  /**
 * End Main Functions
 * Begin Events
 *
*/

  // Build menu

  // Scroll to section on link click

  // Set sections as active

  //   mobileMenu.addEventListener('click', () => {
  //     document.querySelector('.nav-menu').classList.toggle('show');
  //   });
}, false);
