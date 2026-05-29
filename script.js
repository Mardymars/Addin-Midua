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
  const bookingForm = document.querySelector('form[name="photo-shoot-inquiry"]');
  const formStatus = document.getElementById("formStatus");
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

  bookingForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) return;

    const submitButton = bookingForm.querySelector('button[type="submit"]');
    const formData = new FormData(bookingForm);

    if (formData.get("_gotcha") || formData.get("website")) return;

    submitButton.disabled = true;
    if (formStatus) {
      formStatus.textContent = "Sending your inquiry...";
    }

    try {
      const response = await fetch(bookingForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      window.location.href = "thanks.html";
    } catch (error) {
      submitButton.disabled = false;
      if (formStatus) {
        formStatus.textContent = "The form could not send. Please email me directly from the contact section.";
      }
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
