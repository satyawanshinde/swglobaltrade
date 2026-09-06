
const CONTACT_CONFIG = {
  email: "info@swglobaltrade.in",
  whatsapp: "91XXXXXXXXXX"
};

document.addEventListener("DOMContentLoaded", () => {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".primary-nav a[data-page]").forEach(link => {
    if (link.dataset.page === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  const closeMenu = () => {
    if (!toggle || !nav) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", e => { if (e.target.matches("a")) closeMenu(); });
    document.addEventListener("click", e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const form = document.querySelector("#inquiry-form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});

function getFormData(form) {
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
}
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  let valid = true;
  form.querySelectorAll("[required]").forEach(field => {
    const error = field.closest(".field")?.querySelector(".error");
    if (!field.value.trim()) {
      valid = false;
      if (error) error.textContent = "Please complete this field.";
      field.setAttribute("aria-invalid", "true");
    } else {
      if (error) error.textContent = "";
      field.removeAttribute("aria-invalid");
    }
  });
  const email = form.querySelector('[name="email"]');
  if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    valid = false;
    const error = email.closest(".field").querySelector(".error");
    error.textContent = "Please enter a valid email address.";
    email.setAttribute("aria-invalid", "true");
  }
  const status = document.querySelector(".form-status");
  if (!valid) { if (status) { status.textContent = "Please review the highlighted fields."; status.classList.add("show"); } return; }

  const d = getFormData(form);
  const message = `Business Inquiry - SW Global Trade

Name: ${d.name || ""}
Company: ${d.company || ""}
Country: ${d.country || ""}
Product: ${d.product || ""}
Quantity: ${d.quantity || ""}
Destination: ${d.destination || ""}
Phone / WhatsApp: ${d.phone || ""}

Message:
${d.message || ""}`;

  if (status) { status.textContent = "Thank you for your interest in doing business with us. We truly appreciate your enquiry and will get in touch with you shortly."; status.classList.add("show"); }
  const actions = document.querySelector("#form-actions");
  if (actions) {
    actions.hidden = false;
    const emailLink = actions.querySelector(".email-action");
    const waLink = actions.querySelector(".wa-action");
    if (emailLink) emailLink.href = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent("Business Inquiry - SW Global Trade")}&body=${encodeURIComponent(message)}`;
    if (waLink) waLink.href = `https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent(message)}`;
  }
}
