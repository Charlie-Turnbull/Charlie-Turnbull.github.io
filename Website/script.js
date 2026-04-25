const navLinks = Array.from(document.querySelectorAll(".navlink"));
const sections = Array.from(document.querySelectorAll("main section"));
const topbarIcons = document.getElementById("topbarIcons");
const contactSection = document.getElementById("contact");

/* Active nav link based on current section */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const currentId = entry.target.id;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.section === currentId);
      });
    });
  },
  {
    root: null,
    threshold: 0.55,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

/* Hide top-right contact icons when contact section is visible */
const contactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!topbarIcons) return;
      topbarIcons.classList.toggle("is-hidden", entry.isIntersecting);
    });
  },
  {
    root: null,
    threshold: 0.35,
  }
);

if (contactSection) {
  contactObserver.observe(contactSection);
}

/* Smooth scroll with sticky header offset */
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.dataset.section;
    const targetSection = document.getElementById(targetId);

    if (!targetSection) return;

    const topbarHeight = document.querySelector(".topbar").offsetHeight;
    const targetY =
      targetSection.getBoundingClientRect().top +
      window.pageYOffset -
      topbarHeight +
      1;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  });
});