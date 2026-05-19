(() => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const closeButton = document.querySelector(".lightbox-close");
  const galleryButtons = document.querySelectorAll(".gallery-open");
  const panoramaTrack = document.getElementById("panoramaTrack");
  const panoramaSlides = document.querySelectorAll(".panorama-slide");
  let panoramaIndex = 0;

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
  }

  galleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      if (!lightbox || !lightboxImage || !image) return;

      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxImage.className = `lightbox-image ${image.classList.contains("rotate-left") ? "rotate-left" : ""}`.trim();
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      closeButton?.focus();
    });
  });

  closeButton?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  if (panoramaTrack && panoramaSlides.length > 1) {
    setInterval(() => {
      if (document.hidden || lightbox?.classList.contains("open")) return;
      panoramaIndex = (panoramaIndex + 1) % panoramaSlides.length;
      panoramaTrack.style.transform = `translateX(-${panoramaIndex * 100}%)`;
    }, 4200);
  }
})();
