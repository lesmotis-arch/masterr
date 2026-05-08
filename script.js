document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // МОДАЛКА
  // =========================

  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("galleryImage");

  const closeBtn = document.querySelector(".gallery-close");
  const prevModal = document.querySelector(".gallery-prev");
  const nextModal = document.querySelector(".gallery-next");

  let currentSlides = [];
  let currentIndex = 0;

  // =========================
  // КАРТОЧКИ
  // =========================

  document.querySelectorAll(".work-card").forEach(card => {

    const slider = card.querySelector(".card-slider");

    if (!slider) return;

    const slides = slider.querySelectorAll(".card-slide");

    const prev = slider.querySelector(".prev");
    const next = slider.querySelector(".next");

    if (!slides.length) return;

    let index = 0;

    // первая фотка активная
    slides[0].classList.add("active");

    // показать слайд
    function showSlide(i) {

      slides.forEach(slide => {
        slide.classList.remove("active");
      });

      slides[i].classList.add("active");
    }

    // следующая фотка
    next?.addEventListener("click", (e) => {

      e.stopPropagation();

      index++;

      if (index >= slides.length) {
        index = 0;
      }

      showSlide(index);
    });

    // предыдущая фотка
    prev?.addEventListener("click", (e) => {

      e.stopPropagation();

      index--;

      if (index < 0) {
        index = slides.length - 1;
      }

      showSlide(index);
    });

    // =========================
    // ОТКРЫТИЕ МОДАЛКИ
    // =========================

    slider.addEventListener("click", () => {

      currentSlides = Array.from(slides);

      currentIndex = currentSlides.findIndex(slide =>
        slide.classList.contains("active")
      );

      modalImg.src = currentSlides[currentIndex].src;

      modal.classList.add("active");
    });

  });

  // =========================
  // ОБНОВИТЬ МОДАЛКУ
  // =========================

  function updateModal() {

    modalImg.src = currentSlides[currentIndex].src;
  }

  // =========================
  // СТРЕЛКА ВПРАВО
  // =========================

  nextModal?.addEventListener("click", (e) => {

    e.stopPropagation();

    currentIndex++;

    if (currentIndex >= currentSlides.length) {
      currentIndex = 0;
    }

    updateModal();
  });

  // =========================
  // СТРЕЛКА ВЛЕВО
  // =========================

  prevModal?.addEventListener("click", (e) => {

    e.stopPropagation();

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = currentSlides.length - 1;
    }

    updateModal();
  });

  // =========================
  // ЗАКРЫТЬ
  // =========================

  closeBtn?.addEventListener("click", () => {

    modal.classList.remove("active");
  });

  // клик вне картинки
  modal.addEventListener("click", (e) => {

    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // =========================
  // КЛАВИАТУРА
  // =========================

  document.addEventListener("keydown", (e) => {

    if (!modal.classList.contains("active")) return;

    // вправо
    if (e.key === "ArrowRight") {

      currentIndex++;

      if (currentIndex >= currentSlides.length) {
        currentIndex = 0;
      }

      updateModal();
    }

    // влево
    if (e.key === "ArrowLeft") {

      currentIndex--;

      if (currentIndex < 0) {
        currentIndex = currentSlides.length - 1;
      }

      updateModal();
    }

    // escape
    if (e.key === "Escape") {

      modal.classList.remove("active");
    }
  });

});


// =========================
// АНИМАЦИЯ ПОЯВЛЕНИЯ
// =========================

const hiddenBlocks = document.querySelectorAll(".hidden");

window.addEventListener("scroll", () => {

  hiddenBlocks.forEach(block => {

    const blockTop = block.getBoundingClientRect().top;

    if (blockTop < window.innerHeight - 100) {

      block.classList.add("show");
    }
  });

});