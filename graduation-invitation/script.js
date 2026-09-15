// CONFIG
const CONFIG = {
  graduateName: "VŨ KIỀU OANH",
  eventDate: "2026-10-03T13:30:00+07:00",
  eventTime: "13:30 – 14:30",
  venue: "Hội Trường Tầng 6",
  address: "Tòa VNB, Trường ĐH Công Nghệ Đông Á",
  fullAddress: "Tòa VNB, Trường ĐH Công Nghệ Đông Á, TP. HCM",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Trường+Đại+học+Công+Nghệ+Đông+Á",
  photos: [
    "assets/oanh-photo.jpg",
    "assets/oanh-photo-2.jpg",
    "assets/oanh-photo-3.jpg"
  ],
  googleScriptUrl: "https://script.google.com/macros/s/YOUR_EXEC_ID_HERE/exec"
};

const $ = (selector) => document.querySelector(selector);

// Update config values
if ($("#eventTime")) $("#eventTime").textContent = CONFIG.eventTime;
if ($("#eventVenue")) $("#eventVenue").textContent = CONFIG.venue;
if ($("#eventAddress")) $("#eventAddress").textContent = CONFIG.address;
if ($("#mapAddress")) $("#mapAddress").textContent = CONFIG.fullAddress;
if ($("#mapLink")) $("#mapLink").href = CONFIG.mapUrl;

// ==========================================
// COUNTDOWN
// ==========================================
function updateCountdown() {
  const target = new Date(CONFIG.eventDate).getTime();
  const diff = target - Date.now();

  if (diff <= 0) {
    if ($("#days")) $("#days").textContent = "00";
    if ($("#hours")) $("#hours").textContent = "00";
    if ($("#minutes")) $("#minutes").textContent = "00";
    if ($("#seconds")) $("#seconds").textContent = "00";
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  if ($("#days")) $("#days").textContent = String(days).padStart(2, "0");
  if ($("#hours")) $("#hours").textContent = String(hours).padStart(2, "0");
  if ($("#minutes")) $("#minutes").textContent = String(minutes).padStart(2, "0");
  if ($("#seconds")) $("#seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ==========================================
// STORAGE & WISHES
// ==========================================
const STORAGE_KEY = "graduation-wishes";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text || "";
  return div.innerHTML;
}

function loadWishes() {
  const wishes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const wishesContainer = $("#wishesList");

  if (!wishesContainer) return;

  if (wishes.length === 0) {
    wishesContainer.innerHTML = '<div class="empty-wishes">Chưa có lời chúc nào. Hãy là người đầu tiên! 💝</div>';
    return;
  }

  wishesContainer.innerHTML = wishes.slice().reverse().map(w => `
    <div class="wish-item">
      <p class="wish-item-name">💌 ${escapeHtml(w.guest)}</p>
      ${w.wish ? `<p class="wish-item-text">"${escapeHtml(w.wish)}"</p>` : ''}
      <p class="wish-item-status">${escapeHtml(w.attendance)} · ${escapeHtml(w.createdAt)}</p>
    </div>
  `).join("");
}

loadWishes();

// Reveal sections as the guest explores the invitation.
const revealSections = document.querySelectorAll(".slide-up");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  revealSections.forEach((section) => revealObserver.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add("is-visible"));
}

// Keep the atmosphere moving without adding heavy assets.
function createSparkle() {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.style.left = `${Math.random() * 100}vw`;
  sparkle.style.setProperty("--drift", `${(Math.random() - 0.5) * 160}px`);
  sparkle.style.setProperty("--duration", `${5 + Math.random() * 5}s`);
  document.body.appendChild(sparkle);
  sparkle.addEventListener("animationend", () => sparkle.remove());
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(createSparkle, 900);
}

// Keep every supplied photo sharp, centered and responsive in its frame.
function setupInvitationImages() {
  const images = document.querySelectorAll(".school-logo-wrapper img, .invitation-sash-block img, .sash-decoration-wrapper img, .sash-photo img, .filmstrip-item img");

  images.forEach((image) => {
    image.loading = "lazy";
    image.addEventListener("load", () => {
      image.classList.add("image-ready");
      if (image.naturalWidth > image.naturalHeight * 1.35) {
        image.style.objectPosition = "center center";
      }
    }, { once: true });

    image.addEventListener("error", () => {
      image.classList.add("image-missing");
    }, { once: true });
  });

  const interactiveCards = document.querySelectorAll(".school-invitation-card, .school-card-sweet, .sash-ribbon");
  interactiveCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (window.matchMedia("(max-width: 600px), (prefers-reduced-motion: reduce)").matches) return;
      const bounds = card.getBoundingClientRect();
      const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -3;
      const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 3;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

setupInvitationImages();

// ==========================================
// RSVP FORM
// ==========================================
const form = $("#rsvpForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const guestInput = $("#guestInput");
    const attendanceInput = $("#attendanceInput");
    const receivedInput = $("#receivedInput");
    const wishInput = $("#wishInput");
    const submitBtn = form.querySelector('button[type="submit"]');
    const formMsg = $("#formMessage");

    if (!guestInput || !attendanceInput) return;

    const data = {
      guest: guestInput.value.trim(),
      attendance: attendanceInput.value,
      received: receivedInput?.value || new Date().toLocaleDateString("vi-VN"),
      wish: wishInput?.value.trim() || "",
      createdAt: new Date().toLocaleString("vi-VN")
    };

    // Save to localStorage
    const wishes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    wishes.push(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));

    // Update UI
    submitBtn.disabled = true;
    submitBtn.textContent = "Đang gửi...";

    try {
      if (CONFIG.googleScriptUrl && !CONFIG.googleScriptUrl.includes("YOUR_EXEC_ID_HERE")) {
        await fetch(CONFIG.googleScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
      }

      formMsg.innerHTML = "✨ Cảm ơn! Xác nhận của bạn đã được gửi thành công! 💌";
      formMsg.style.color = "#c75a7e";
      form.reset();
      loadWishes();
    } catch (error) {
      console.error("Error:", error);
      formMsg.innerHTML = "✨ Xác nhận đã được lưu! Cảm ơn bạn! 💝";
      formMsg.style.color = "#c75a7e";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Gửi Xác Nhận 💌";
    }
  });
}

// ==========================================
// BACK TO TOP
// ==========================================
const backToTop = $("#backToTop");
if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==========================================
// GUEST NAME DISPLAY (SASH)
// ==========================================
const guestNameDisplay = $("#guestNameDisplay");
if (guestNameDisplay) {
  guestNameDisplay.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9àáạảãăằắẳẩẫâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/g, "");
  });
}
