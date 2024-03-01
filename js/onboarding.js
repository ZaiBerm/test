let intro = document.querySelector('.splash');
        let logo = document.querySelector('.logo-header');
        let logoSpan = document.querySelectorAll('.logo');

        // splash screen
        window.addEventListener('DOMContentLoaded', () => {

            setTimeout(() => {

                logoSpan.forEach((span, idx) => {
                    setTimeout(() => {
                        span.classList.add('active');
                    }, (idx + 1) * 400)
                });

                setTimeout(() => {

                    logoSpan.forEach((span, idx) => {
                        setTimeout(() => {
                            span.classList.remove('active');
                            span.classList.add('fade');
                        }, (idx + 1) * 50)
                    });
                }, 2000)

                setTimeout(() => {
                    intro.style.top = '-100vh';
                }, 2000)
            })
        })

        //Carousel

        const wrapper = document.querySelector(".contact-contents");
        const carousel = document.querySelector(".developers");
        const firstCardWidth = carousel.querySelector(".dev").offsetWidth;
        const arrowBtns = document.querySelectorAll(".icon");
        const carouselChildrens = [...carousel.children];

        let isDragging = false,
            isAutoPlay = true,
            startX, startScrollLeft, timeoutId;

        // Get the number of cards that can fit in the carousel at once
        let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

        // Insert copies of the last few cards to beginning of carousel for infinite scrolling
        carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

        // Insert copies of the first few cards to end of carousel for infinite scrolling
        carouselChildrens.slice(0, cardPerView).forEach(card => {
            carousel.insertAdjacentHTML("beforeend", card.outerHTML);
        });

        // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");

        // Add event listeners for the arrow buttons to scroll the carousel left and right
        arrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
            });
        });

        const dragStart = (e) => {
            isDragging = true;
            carousel.classList.add("dragging");
            // Records the initial cursor and scroll position of the carousel
            startX = e.pageX;
            startScrollLeft = carousel.scrollLeft;
        }

        const dragging = (e) => {
            if (!isDragging) return; // if isDragging is false return from here
            // Updates the scroll position of the carousel based on the cursor movement
            carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
        }

        const dragStop = () => {
            isDragging = false;
            carousel.classList.remove("dragging");
        }

        const infiniteScroll = () => {
            // If the carousel is at the beginning, scroll to the end
            if (carousel.scrollLeft === 0) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
                carousel.classList.remove("no-transition");
            }
            // If the carousel is at the end, scroll to the beginning
            else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.offsetWidth;
                carousel.classList.remove("no-transition");
            }

            // Clear existing timeout & start autoplay if mouse is not hovering over carousel
            clearTimeout(timeoutId);
            if (!wrapper.matches(":hover")) autoPlay();
        }

        const autoPlay = () => {
            if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
            // Autoplay the carousel after every 2500 ms
            timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
        }
        autoPlay();

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("scroll", infiniteScroll);
        wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
        wrapper.addEventListener("mouseleave", autoPlay);


        //
        //
        //
        //
        //

        let navigation_button = document.getElementById("navii");
        let sidebar = document.getElementById("side-bar");
        let sidebarLinks = document.getElementsByClassName("nav_item");
        let sections = document.getElementsByTagName("section");

        navigation_button.addEventListener("click", () => {

            if (sidebar.style.width == "0%")
            {
                sidebar.style.width = "40%";
                navigation_button.src = "./images/cross.png";
            }
            else
            {
                sidebar.style.width = "0%";
                navigation_button.src = "./images/menu-navigation-icon.png";
            } 
        });

        for (let i = 0; i < sidebarLinks.length; i++)
        {
            sidebarLinks[i].addEventListener("click", () => {
                sidebar.style.width = "0%";
                navigation_button.src = "./images/menu-navigation-icon.png";
            });
        }

        for (let i = 0; i < sections.length; i++)
        {
            sections[i].addEventListener("click", () => {
                sidebar.style.width = "0%";
                navigation_button.src = "./images/menu-navigation-icon.png";
            })
        }
