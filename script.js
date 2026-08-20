// ==========================================================================
// Footer year
// ==========================================================================
document.getElementById("year").textContent = new Date().getFullYear();

// ==========================================================================
// Mobile nav toggle
// ==========================================================================
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.getElementById("primary-nav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after a link is chosen
primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ==========================================================================
// Highlight the current section in the nav while scrolling
// ==========================================================================
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".primary-nav a");

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // ========================================================================
  // Reveal learning-log entries as they scroll into view
  // ========================================================================
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    const entryObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".log-entry").forEach((entry) => entryObserver.observe(entry));
  }
}