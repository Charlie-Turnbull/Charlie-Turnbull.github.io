const navLinks = Array.from(document.querySelectorAll(".navlink"));
const sections = ["home", "portfolio", "about", "contact"]
  .map(id => document.getElementById(id));

const topbarRight = document.getElementById("topbarRight");
const contactSection = document.getElementById("contact");

// Highlight nav link based on visible section
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const id = entry.target.id;
    navLinks.forEach(a => a.classList.toggle("is-active", a.dataset.section === id));
  });
}, {
  root: null,
  threshold: 0.55
});

sections.forEach(sec => sectionObserver.observe(sec));

// Hide top-right icons when Contact is visible
const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.target.id !== "contact") return;
    topbarRight.classList.toggle("is-hidden", entry.isIntersecting);
  });
}, {
  root: null,
  threshold: 0.25
});

contactObserver.observe(contactSection);

// Optional: ensure anchor jumps account for sticky header height
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.getElementById(link.dataset.section);
    const topbarHeight = document.querySelector(".topbar").offsetHeight;

    const y = target.getBoundingClientRect().top + window.pageYOffset - topbarHeight + 1;
    window.scrollTo({ top: y, behavior: "smooth" });
  });
});
