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
document.addEventListener(
	'DOMContentLoaded',
	() => {
		/**
		 * Define Global Variables
		 */

		const sections = document.querySelectorAll('section');
		const pageHeader = document.querySelector('.page__header');
		const nav = document.querySelector('#navbar__list');
		const scrollBtn = document.querySelector('.scroll-top_btn');
		let lastScrollPos = window.pageYOffset;
		let scrollTimer = null;
		let isOnNav = Boolean;

		const userData = {
			external_id: 'm-scott',
			name: 'Michael Scott',
			email: 'michael-scott@example.com',
		};

		/**
		 * End Global Variables
		 * Start Helper Functions
		 *
		 */

		// Build the nav menu
		const buildMenu = () => {
			// Use documentFragment for performance during iteration
			const tempNav = document.createDocumentFragment();

			for (const section of sections) {
				const navItemLink = document.createElement('a');

				// Navigation to anchors is done by scrollTo, so we use a custom attribute instead of href
				navItemLink.dataset.nav = section.getAttribute('id');
				navItemLink.innerText = section.dataset.nav;
				navItemLink.classList.add('menu__link');

				const navItem = document.createElement('li');
				navItem.appendChild(navItemLink);

				tempNav.appendChild(navItem);
			}
			const navLoginLink = document.createElement('a');
			navLoginLink.dataset.nav = 'login';
			navLoginLink.innerText = 'Login';
			navLoginLink.classList.add('menu__link');

			const navLogin = document.createElement('li');
			navLogin.appendChild(navLoginLink);

			tempNav.appendChild(navLogin);

			nav.appendChild(tempNav);
		};

		// Add class 'active' to section when near top of viewport, and anchor in the nav menu
		const makeActive = () => {
			for (const section of sections) {
				const box = section.getBoundingClientRect();
				if (box.top <= 150 && box.bottom >= 150) {
					// Apply active state on the current section and the corresponding nav link.
					section.classList.add('your-active-class');
					nav.querySelector(`[data-nav="${section.id}"]`).classList.add('menu__link--active');
				} else {
					// Remove active state from other sections and other nav links
					section.classList.remove('your-active-class');
					nav.querySelector(`[data-nav="${section.id}"]`).classList.remove('menu__link--active');
				}
			}
		};

		// Scroll smoothly to element
		const scrollToElement = (element) => {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		};

		// Toggle scroll-top btn visibility
		const toggleBtn = () => {
			if (window.scrollY > 500) {
				scrollBtn.classList.remove('scroll-top_btn--hidden');
			} else {
				scrollBtn.classList.add('scroll-top_btn--hidden');
			}
		};

		// Move header upwards by its height (invoked in next 2 functions)
		const moveHeaderUp = () => {
			pageHeader.style.top = `-${pageHeader.getBoundingClientRect().height}px`;
		};

		// Toggle nav based on scroll direction
		const toggleNavOnScroll = () => {
			const currentScrollPos = window.pageYOffset;
			if (lastScrollPos > currentScrollPos) {
				pageHeader.style.top = '0';
			} else {
				moveHeaderUp();
			}
			lastScrollPos = currentScrollPos;
		};

		// Toggle nav based on time since scroll
		const toggleNavOnWait = () => {
			if (scrollTimer) {
				clearTimeout(scrollTimer);
			}
			// Check that mouse isn't on nav
			if (!isOnNav) {
				scrollTimer = setTimeout(() => {
					moveHeaderUp();
				}, 2500);
			}
		};

		/**
		 * End Helper Functions
		 * Begin Main Functions
		 * */

		buildMenu();

		// Invoke makeActive(), toggleBtn(), and toggleNavOnScroll/OnWait() when document is scrolled
		document.addEventListener('scroll', () => {
			makeActive();
			toggleBtn();
			toggleNavOnScroll();
			toggleNavOnWait();
		});

		// Invoke toggleNavOnWait based on mouse event on nav
		nav.addEventListener('mouseenter', () => {
			isOnNav = true;
			toggleNavOnWait();
		});
		nav.addEventListener('mouseout', () => {
			isOnNav = false;
			toggleNavOnWait();
		});

		// Invoke scrollToElement when anchor in nav is clicked and send to the corresponding section
		nav.addEventListener('click', async (e) => {
			const { target } = e;
			// We delegate the event to a tags only inside the nav
			if (target.tagName !== 'A') return;

			//Call sunco login for login/logout nav element
			if (target.getAttribute('data-nav') === 'login') {
				await loginUser(userData).then(function () {
					target.dataset.nav = 'logout';
					target.innerText = 'Logout';
				});
				return;
			}

			if (target.getAttribute('data-nav') === 'logout') {
				await logoutUser().then(function () {
					target.dataset.nav = 'login';
					target.innerText = 'Login';
				});
				return;
			}

			// Get the section that matches the anchor's custom attribute
			const section = document.querySelector(`#${target.dataset.nav}`);
			scrollToElement(section);
		});

		// Invoke scrollToElement when scrollBtn is clicked and send to the top of the HTML doc
		scrollBtn.addEventListener('click', () => {
			scrollToElement(document.documentElement);
		});

		// Sunco login
		const loginUser = async (userData) => {
			const { token } = await getToken(userData);
			Smooch.login('m-scott', token);
		};

		const logoutUser = async () => {
			Smooch.logout();
		};

		const getToken = async (userData) => {
			const response = await fetch('http://localhost:3000/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});
			if (!response.ok) {
				window.alert(`HTTP error! status: ${response.status}`);
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.json();
		};
	},
	false
);
