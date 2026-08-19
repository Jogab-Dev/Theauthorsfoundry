/* =========================================
   THE AUTHOR'S FOUNDRY
   Main JavaScript
========================================= */


/* ---------- PAGE INITIALIZATION ---------- */

document.addEventListener("DOMContentLoaded", () => {


  /* ---------- MOBILE NAVIGATION ---------- */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const mobileNav =
    document.querySelector(".mobile-nav");


  if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", () => {

      mobileNav.classList.toggle("active");

    });


    /* Close menu when navigation link is clicked */

    const mobileLinks =
      document.querySelectorAll(".mobile-nav a");


    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mobileNav.classList.remove("active");

      });

    });

  }



  /* ---------- CONTACT FORM / FORMSPREE ---------- */

  const contactForm =
    document.querySelector("#contactForm");


  if (!contactForm) {
    return;
  }


  contactForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const submitButton =
        contactForm.querySelector(
          ".contact-submit"
        );


      if (!submitButton) {
        return;
      }


      const originalButtonText =
        submitButton.innerHTML;


      /* Remove previous messages */

      const oldMessage =
        contactForm.querySelector(
          ".form-success-message, .form-error-message"
        );


      if (oldMessage) {
        oldMessage.remove();
      }


      /* Show sending state */

      submitButton.disabled = true;

      submitButton.innerHTML = `
        SENDING...
        <span>→</span>
      `;


      try {

        const response = await fetch(
          contactForm.action,
          {
            method: "POST",

            body:
              new FormData(contactForm),

            headers: {
              "Accept":
                "application/json"
            }
          }
        );


        if (!response.ok) {

          throw new Error(
            "Form submission failed."
          );

        }


        /* Successful submission */

        contactForm.reset();


        submitButton.innerHTML =
          "SENT ✓";


        const successMessage =
          document.createElement("p");


        successMessage.className =
          "form-success-message";


        successMessage.textContent =
          "Thank you. Your project inquiry has been received. We'll review the details and get back to you shortly.";


        contactForm.appendChild(
          successMessage
        );


        /* Restore button after 5 seconds */

        setTimeout(() => {

          submitButton.disabled = false;

          submitButton.innerHTML =
            originalButtonText;

        }, 5000);


      } catch (error) {

        console.error(
          "Formspree error:",
          error
        );


        submitButton.disabled = false;

        submitButton.innerHTML =
          originalButtonText;


        const errorMessage =
          document.createElement("p");


        errorMessage.className =
          "form-error-message";


        errorMessage.textContent =
          "Something went wrong while sending your inquiry. Please try again.";


        contactForm.appendChild(
          errorMessage
        );

      }

    }
  );

});
