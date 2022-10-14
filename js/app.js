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

/**
 * Define Global Variables
 * 
*/
const section1 = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');
const header = document.querySelector('.page__header');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

let buildNav = () => {
    navbarList.innerHTML = '';
    section1.forEach((section) => {
        //create List item for each section 
        let list = document.createElement('li');
        //Edit List item's innerhtml using data-attribute 
        list.innerHTML = `<li><a href="#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a></li>`;
        // Add the list to the unOrderd list item
        navbarList.appendChild(list);
    });
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
buildNav();

// The active state styling
let activeStyle = `background: #27565c;
color: rgb(255, 255, 255);
transition: ease 0.3s all;`;
// Add active styling to section when near top of viewport
window.onscroll = function () {
    section1.forEach(function (active) {
        let activeLink = navbarList.querySelector(`[data-nav=${active.id}]`);
        if (active.getBoundingClientRect().top >= -400 && active.getBoundingClientRect().top <= 50) {
            active.classList.add('your-active-class');
            activeLink.style.cssText = activeStyle;
        } else {
            active.classList.remove('your-active-class');
            activeLink.style.cssText = '';
        }
    });
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Scroll to section on link click

let anchorList = document.querySelectorAll('.menu__link');
anchorList.forEach(link => {
    link.onclick = function(event) {
        event.preventDefault();
        let destination = document.querySelector(link.hash);
        destination.scrollIntoView({
            behavior: 'smooth'
        });
        setTimeout(() => {
            location.hash = anchorList;
        }, 200);
    }
});

// Add the scroll to top button
let scrollTop = document.querySelector('.scroll-up');
scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
})


//Make sections collapsible
let coll = document.getElementsByClassName("collapsible");

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

//Hide fixed navigation bar while not scrolling
let isActive;
document.onscroll = () => {
    header.style.display = 'block'
    clearTimeout(isActive)
    isActive = setTimeout(() => {
        header.style.display = 'none';
    }, 9000)
}

