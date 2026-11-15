
/* =====================================
   JYOSTHNA'S PORTFOLIO JAVASCRIPT
===================================== */


/* 1. MOBILE NAVIGATION */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.textContent = isOpen ? "✕" : "☰";

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}


/* 2. EMAILJS INITIALIZATION */

// Replace with your actual EmailJS Public Key

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: "za5Nqd0w5ZnT4F7NH"
    });

} else {

    console.error("EmailJS library could not be loaded.");

}


/* 3. CONTACT FORM SUBMISSION */

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector('button[type="submit"]');

        const originalText = submitButton.textContent;

        if (typeof emailjs === "undefined") {

            formStatus.textContent =
                "Email service is unavailable. Please refresh the page.";

            formStatus.style.color = "red";
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        formStatus.textContent = "Sending your message...";
        formStatus.style.color = "#2563eb";

        try {

            await emailjs.sendForm(
                "service_se6g69m",
                "template_a94e6go",
                contactForm
            );

            formStatus.textContent =
                "Message sent successfully! Thank you for contacting me.";

            formStatus.style.color = "green";

            contactForm.reset();

        } catch (error) {

            console.error("EmailJS error:", error);

            formStatus.textContent =
                "Sorry! Message could not be sent. Please try again.";

            formStatus.style.color = "red";

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = originalText;

        }

    });

}
