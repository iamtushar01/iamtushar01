// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Opens or closes the mobile menu when the hamburger is clicked
menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});

// Close the menu after a link is clicked (so it doesn't cover the page)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// ---------- Highlight the current section in the navbar ----------
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.querySelectorAll("a").forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" }); // triggers when a section is near the middle of the screen
sections.forEach((section) => observer.observe(section));

// ---------- Contact form validation ----------
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

// Shows or clears an error message under a field
function setError(fieldId, message) {
  document.getElementById(fieldId + "Error").textContent = message;
  document.getElementById(fieldId).classList.toggle("invalid", message !== "");
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  status.textContent = "";

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  let valid = true;

  if (name === "") { setError("name", "Please enter your name."); valid = false; }
  else setError("name", "");

  // Simple email pattern: text, "@", text, ".", text
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("email", "Please enter a valid email address."); valid = false; }
  else setError("email", "");

  if (message.length < 10) { setError("message", "Please write at least 10 characters."); valid = false; }
  else setError("message", "");

  if (!valid) return;

  // GitHub Pages has no server, so we open the visitor's email app with the message filled in.
  // IMPORTANT: replace the address below with your real email.
  const subject = encodeURIComponent("Website enquiry from " + name);
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = "mailto:tushar.saini604535@gmail.com?subject=" + subject + "&body=" + body;

  status.textContent = "Thanks! Your email app should open so you can send the message.";
  form.reset();
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
