
document.addEventListener("DOMContentLoaded", () => {
  const items = [...document.querySelectorAll(".gallery-item")];
  const buttons = [...document.querySelectorAll(".filter-btn")];
  const lightbox = document.querySelector(".lightbox");
  const image = lightbox?.querySelector("img");
  const title = lightbox?.querySelector(".lightbox-title");
  let visible = [];
  let index = 0;

  function refresh(category) {
    visible = items.filter(item => category === "all" || item.dataset.category === category);
    items.forEach(item => item.hidden = !(category === "all" || item.dataset.category === item.dataset.category && item.dataset.category === category));
    if (category === "all") items.forEach(item => item.hidden = false);
  }
  buttons.forEach(btn => btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    refresh(btn.dataset.filter);
  }));
  function show(i) {
    if (!visible.length) return;
    index = (i + visible.length) % visible.length;
    const img = visible[index].querySelector("img");
    image.src = img.src; image.alt = img.alt; title.textContent = visible[index].dataset.title || img.alt;
  }
  items.forEach(item => item.addEventListener("click", () => {
    visible = items.filter(x => !x.hidden);
    show(visible.indexOf(item)); lightbox.classList.add("open"); document.body.style.overflow = "hidden";
  }));
  const close = () => { lightbox.classList.remove("open"); document.body.style.overflow = ""; };
  lightbox?.querySelector(".lightbox-close")?.addEventListener("click", close);
  lightbox?.querySelector(".lightbox-prev")?.addEventListener("click", () => show(index - 1));
  lightbox?.querySelector(".lightbox-next")?.addEventListener("click", () => show(index + 1));
  lightbox?.addEventListener("click", e => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", e => {
    if (!lightbox?.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
});
