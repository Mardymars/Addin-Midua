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
  let panoramaIndex = 0;

  const fieldLabels = {
    name: "Full Name",
    email: "Email",
    phone: "Phone",
    shoot_type: "Event or Shoot Type",
    event_date: "Event Date",
    start_time: "Start Time",
    expected_length: "Expected Length",
    location: "Location or Venue",
    guest_count: "Estimated Guest Count",
    budget: "Budget Range",
    payment_method: "Method of Payment",
    client_needs: "What needs to be photographed",
    referral_source: "Referral Source",
  };

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

  bookingForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) return;

    const formData = new FormData(bookingForm);
    if (formData.get("_honey")) return;

    const lines = ["New photography inquiry", ""];

    Object.entries(fieldLabels).forEach(([name, label]) => {
      const value = String(formData.get(name) || "").trim();
      if (value) {
        lines.push(`${label}: ${value}`);
      }
    });

    const subject = "New photography inquiry from Addin Midua Photography";
    const body = lines.join("\n");
    window.location.href = `mailto:miphoto2003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  if (panoramaTrack && panoramaSlides.length > 1) {
    setInterval(() => {
      if (document.hidden || lightbox?.classList.contains("open")) return;
      panoramaIndex = (panoramaIndex + 1) % panoramaSlides.length;
      panoramaTrack.style.transform = `translateX(-${panoramaIndex * 100}%)`;
    }, 4200);
  }
})();
