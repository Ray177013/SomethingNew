let onSlide = false;

window.addEventListener("load", () => {
   autoSlide();
   updatePrevButtonVisibility();

   const dots = document.querySelectorAll(".carousel_dot");
   for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", () => slide(i));
   }

   const buttonPrev = document.querySelector(".carousel_button__prev");
   const buttonNext = document.querySelector(".carousel_button__next");
   buttonPrev.addEventListener("click", () => slide(getItemActiveIndex() - 1));
   buttonNext.addEventListener("click", () => slide(getItemActiveIndex() + 1));
})

// Navigation functions for choice buttons
function goToPageG() {
   // Show explosion animation
   const explosionOverlay = document.getElementById("explosionOverlay");
   explosionOverlay.style.display = "block";
   
   // Hide carousel and rejection page
   document.getElementById("carousel").style.display = "none";
   document.getElementById("rejectionPage").style.display = "none";
   
   // Transition to Page G after explosion animation
   setTimeout(() => {
      explosionOverlay.style.display = "none";
      document.getElementById("pageG").style.display = "block";
   }, 1200); // Match the explosion animation duration
}

function goToRejection() {
   document.getElementById("carousel").style.display = "none";
   document.getElementById("rejectionPage").style.display = "block";
}

function goToRejection2() {
   document.getElementById("rejectionPage").style.display = "none";
   document.getElementById("rejectionPage2").style.display = "block";
}

function goToPageGFromRejection2() {
   // Show fade overlay
   const fadeOverlay = document.getElementById("fadeOverlay");
   fadeOverlay.style.display = "block";
   
   // After fade animation, transition to Page G
   setTimeout(() => {
      document.getElementById("rejectionPage2").style.display = "none";
      document.getElementById("pageG").style.display = "block";
      fadeOverlay.style.display = "none";
   }, 2500); // Match the fade animation duration
}

function rewindToStart() {
   // Show fade overlay
   const fadeOverlay = document.getElementById("fadeOverlay");
   fadeOverlay.style.display = "block";
   
   // After fade animation, reset the carousel
   setTimeout(() => {
      // Hide all pages
      document.getElementById("pageG").style.display = "none";
      document.getElementById("rejectionPage").style.display = "none";
      document.getElementById("carousel").style.display = "block";
      
      // Reset carousel to first slide
      const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
      const itemActive = document.querySelector(".carousel_item__active");
      const firstItem = itemsArray[0];
      
      if (itemActive !== firstItem) {
         itemActive.classList.remove("carousel_item__active");
         firstItem.classList.add("carousel_item__active");
         slideIndicator(0);
      }
      
      updatePrevButtonVisibility();
      
      // Fade out the overlay
      fadeOverlay.style.display = "none";
   }, 2500); // Match the fade animation duration
}

function updatePrevButtonVisibility() {
   const buttonPrev = document.querySelector(".carousel_button__prev");
   const currentIndex = getItemActiveIndex();
   
   if (currentIndex === 0) {
      buttonPrev.style.display = "none";
   } else {
      buttonPrev.style.display = "block";
   }
}

function autoSlide() {
   setInterval(() => {
      slide(getItemActiveIndex() + 1);
   }, 5000); // slide speed = 1s
}

function slide(toIndex) {
   if (onSlide)
      return;
   onSlide = true;

   const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
   const itemActive = document.querySelector(".carousel_item__active");
   const itemActiveIndex = itemsArray.indexOf(itemActive);
   let newItemActive = null;

   // Stop at image 25 (index 24)
   if (toIndex >= itemsArray.length - 1 && itemActiveIndex === itemsArray.length - 1) {
      onSlide = false;
      return;
   }

   if (toIndex > itemActiveIndex) {
      // check if toIndex exceeds the number of carousel items
      if (toIndex >= itemsArray.length) {
         toIndex = itemsArray.length - 1;
      }

      newItemActive = itemsArray[toIndex];

      // start transition
      newItemActive.classList.add("carousel_item__pos_next");
      setTimeout(() => {
         newItemActive.classList.add("carousel_item__next");
         itemActive.classList.add("carousel_item__next");
      }, 20);
   } else {
      // check if toIndex exceeds the number of carousel items
      if (toIndex < 0) {
         toIndex = 0;
      }

      newItemActive = itemsArray[toIndex];

      // start transition
      newItemActive.classList.add("carousel_item__pos_prev");
      setTimeout(() => {
         newItemActive.classList.add("carousel_item__prev");
         itemActive.classList.add("carousel_item__prev");
      }, 20);
   }

   // remove all transition class and switch active class
   newItemActive.addEventListener("transitionend", () => {
      itemActive.className = "carousel_item";
      newItemActive.className = "carousel_item carousel_item__active";
      onSlide = false;
      updatePrevButtonVisibility();
   }, {
      once: true
   });

   slideIndicator(toIndex);
}

function getItemActiveIndex() {
   const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
   const itemActive = document.querySelector(".carousel_item__active");
   const itemActiveIndex = itemsArray.indexOf(itemActive);
   return itemActiveIndex;
}

function slideIndicator(toIndex) {
   const dots = document.querySelectorAll(".carousel_dot");
   const dotActive = document.querySelector(".carousel_dot__active");
   const newDotActive = dots[toIndex];

   dotActive.classList.remove("carousel_dot__active");
   newDotActive.classList.add("carousel_dot__active");
}