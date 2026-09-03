
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      answer.style.maxHeight = open ? answer.scrollHeight + "px" : "0px";
    });
  });
});
