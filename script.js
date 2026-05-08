document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("galleryImage");
  const closeBtn = document.querySelector(".gallery-close");
  const prevModal = document.querySelector(".gallery-prev");
  const nextModal = document.querySelector(".gallery-next");

  let currentSlides = [];
  let currentIndex = 0;

  // =========================
  // СЛАЙДЕРЫ В КАРТОЧКАХ
  // =========================
  document.querySelectorAll(".work-card").forEach(card => {

    const slider = card.querySelector(".card-slider");
    if (!slider) return;

    const slides = slider.querySelectorAll(".card-slide");
    const prev = slider.querySelector(".prev");
    const next = slider.querySelector(".next");

    if (!slides.length) return;

    let index = 0;

    // первая картинка
    slides[0].classList.add("active");

    function showSlide(i) {
      slides.forEach(s => s.classList.remove("active"));
      slides[i].classList.add("active");
    }

    // стрелка вперед
    next?.addEventListener("click", (e) => {
      e.stopPropagation();
      index = (index + 1) % slides.length;
      showSlide(index);
    });

    // стрелка назад
    prev?.addEventListener("click", (e) => {
      e.stopPropagation();
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    });

    // клик по картинке → открыть модалку
    slides.forEach((slide, i) => {
      slide.addEventListener("click", () => {
        currentSlides = Array.from(slides);
        currentIndex = i;

        modalImg.src = slide.src;
        modal.classList.add("active");
      });
    });

  });

  // =========================
  // МОДАЛКА
  // =========================
  function updateModal() {
    modalImg.src = currentSlides[currentIndex].src;
  }

  nextModal?.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentSlides.length;
    updateModal();
  });

  prevModal?.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length;
    updateModal();
  });

  closeBtn?.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // клавиатура
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % currentSlides.length;
      updateModal();
    }

    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + currentSlides.length) % currentSlides.length;
      updateModal();
    }

    if (e.key === "Escape") {
      modal.classList.remove("active");
    }
  });

});
const hiddenBlocks = document.querySelectorAll('.hidden');

window.addEventListener('scroll', () => {
  hiddenBlocks.forEach(block => {
    const blockTop = block.getBoundingClientRect().top;

    if (blockTop < window.innerHeight - 100) {
      block.classList.add('show');
    }
  });
});