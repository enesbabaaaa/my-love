/*
 * Aşkım, Bir Barışalım mı?
 * Kişiselleştirme için fotoğrafları assets/images klasörüne ekleyebilirsin.
 * İstersen aşağıdaki sabite assets/audio/sarkim.mp3 yazarak bir varsayılan şarkı da tanımlayabilirsin.
 */

const DEFAULT_SONG_PATH = "assets/audio/sarkim.mp3";
let letterIsOpen = false;

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function scrollBehavior() {
  return reducedMotion.matches ? "auto" : "smooth";
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3000);
}

function setupSmoothScroll() {
  $$('[data-scroll-to]').forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.scrollTo);
      target?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    });
  });
}

function setupEnvelope() {
  const envelope = $("#envelope");
  const note = $("#envelope-note");
  if (!envelope) return;

  envelope.addEventListener("click", () => {
    const isOpen = envelope.classList.toggle("is-open");
    letterIsOpen = isOpen;
    envelope.setAttribute("aria-expanded", String(isOpen));
    document.dispatchEvent(new CustomEvent("letter-toggle", { detail: { isOpen } }));
    if (note) {
      note.textContent = isOpen
        ? "Kalbimden geçenleri seninle paylaşmak istedim."
        : "Kapalı bir mektup, açık bir kalp.";
    }
  });
}

function setupMusicPlayer() {
  const player = $("#song-player");
  const name = $("#song-name");
  const status = $("#song-status");
  if (!player) return;

  if (DEFAULT_SONG_PATH) {
    player.src = DEFAULT_SONG_PATH;
    if (name) name.textContent = "sarkim.mp3 · Sana özel şarkı hazır.";
  }

  function startSongFromLetter() {
    if (!player.src) {
      if (status) status.textContent = "assets/audio/sarkim.mp3 dosyası bulunamadı.";
      return;
    }
    const playRequest = player.play();
    if (playRequest && typeof playRequest.catch === "function") {
      playRequest.catch(() => {
        if (status) status.textContent = "Şarkıyı başlatmak için oynat düğmesine dokunabilirsin.";
      });
    }
  }

  document.addEventListener("letter-toggle", (event) => {
    if (event.detail?.isOpen) startSongFromLetter();
  });

  player.addEventListener("play", () => {
    if (status) status.textContent = "Şarkınız çalıyor...";
  });
  player.addEventListener("pause", () => {
    if (status && !player.ended) status.textContent = "Müzik duraklatıldı.";
  });
  player.addEventListener("ended", () => {
    if (status) status.textContent = "Şarkı bitti. İstersen tekrar dinleyebilirsin.";
  });
}

function setupGallery() {
  const cards = $$(".polaroid");
  const modal = $("#image-modal");
  const modalImage = $("#modal-image");
  const caption = $("#modal-caption");
  if (!modal || !modalImage) return;

  cards.forEach((card) => {
    const image = $("img", card);
    if (!image) return;
    image.addEventListener("load", () => card.classList.add("has-image"));
    image.addEventListener("error", () => card.classList.remove("has-image"));
    if (image.complete && image.naturalWidth > 0) card.classList.add("has-image");

    card.addEventListener("click", () => {
      if (!card.classList.contains("has-image")) {
        showToast("Fotoğrafını assets/images klasörüne eklediğinde burada görünecek.");
        return;
      }
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt;
      if (caption) caption.textContent = card.dataset.caption || "";
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      $(".modal__close", modal)?.focus();
    });
  });

  $$('[data-close-modal]', modal).forEach((closeButton) => {
    closeButton.addEventListener("click", closeGalleryModal);
  });

  function closeGalleryModal() {
    modal.hidden = true;
    modalImage.removeAttribute("src");
    document.body.style.overflow = "";
  }
}

function setupGiftBox() {
  const box = $("#gift-box");
  const message = $("#gift-message");
  if (!box || !message) return;

  box.addEventListener("click", () => {
    const isOpen = box.classList.toggle("is-open");
    box.setAttribute("aria-expanded", String(isOpen));
    message.hidden = !isOpen;
    if (isOpen) message.scrollIntoView({ behavior: scrollBehavior(), block: "center" });
  });
}

function setupLoveReasons() {
  const button = $("#love-button");
  const answer = $("#love-answer");
  if (!button || !answer) return;

  const reasons = [
    "Gülüşün için.",
    "Yanımda olduğunda kendimi mutlu hissettiğim için.",
    "Hayatımda olduğun için.",
    "Seni sen olduğun için seviyorum.",
    "En sıradan anları bile güzelleştirdiğin için.",
    "Kalbimde kendine ait çok güzel bir yerin olduğu için.",
  ];
  let remaining = [...reasons];

  button.addEventListener("click", () => {
    if (!remaining.length) remaining = [...reasons];
    const index = Math.floor(Math.random() * remaining.length);
    const [reason] = remaining.splice(index, 1);
    answer.textContent = reason;
    answer.classList.remove("is-visible");
    void answer.offsetWidth;
    answer.classList.add("is-visible");
  });
}

function setupCounter() {
  const startDate = new Date(2026, 1, 20, 0, 0, 0);
  const fields = {
    days: $('[data-time="days"]'),
    hours: $('[data-time="hours"]'),
    minutes: $('[data-time="minutes"]'),
    seconds: $('[data-time="seconds"]'),
  };

  function update() {
    const now = new Date();
    let difference = Math.max(0, now.getTime() - startDate.getTime());
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(difference / day);
    difference %= day;
    const hours = Math.floor(difference / hour);
    difference %= hour;
    const minutes = Math.floor(difference / minute);
    const seconds = Math.floor((difference % minute) / second);

    if (fields.days) fields.days.textContent = days.toLocaleString("tr-TR");
    if (fields.hours) fields.hours.textContent = String(hours).padStart(2, "0");
    if (fields.minutes) fields.minutes.textContent = String(minutes).padStart(2, "0");
    if (fields.seconds) fields.seconds.textContent = String(seconds).padStart(2, "0");
  }

  update();
  window.setInterval(update, 1000);
}

function setupHeartMessages() {
  const modal = $("#heart-message-modal");
  const text = $("#heart-message-text");
  if (!modal || !text) return;

  $$("[data-heart-message]").forEach((heart) => {
    heart.addEventListener("click", () => {
      text.textContent = heart.dataset.heartMessage || "Seni seviyorum aşkım. ❤️";
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      $("[data-close-heart-modal]", modal)?.focus();
    });
  });

  $$('[data-close-heart-modal]', modal).forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      modal.hidden = true;
      document.body.style.overflow = "";
    });
  });
}

function launchConfetti() {
  const layer = $("#confetti-layer");
  if (!layer) return;
  layer.replaceChildren();
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 28}vw`);
    piece.style.animationDelay = `${Math.random() * 0.7}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    fragment.appendChild(piece);
  }
  layer.appendChild(fragment);
  window.setTimeout(() => layer.replaceChildren(), 3600);
}

function setupFinalActions() {
  const yesButton = $("#yes-button");
  const thinkingButton = $("#thinking-button");
  const response = $("#final-response");
  if (!response) return;

  yesButton?.addEventListener("click", () => {
    response.hidden = false;
    response.textContent = "Seni çok seviyorum aşkım. İyi ki varsın. ❤️";
    launchConfetti();
  });

  thinkingButton?.addEventListener("click", () => {
    response.hidden = false;
    response.textContent = "Tabii ki aşkım. Acelemiz yok. Ne hissediyorsan ona saygı duyuyorum. Ben seni dinlemeye hazırım. ❤️";
  });
}

function setupEscapeKey() {
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const imageModal = $("#image-modal");
    const heartModal = $("#heart-message-modal");
    if (imageModal && !imageModal.hidden) imageModal.querySelector("[data-close-modal]")?.click();
    if (heartModal && !heartModal.hidden) heartModal.querySelector("[data-close-heart-modal]")?.click();
  });
}

setupSmoothScroll();
setupEnvelope();
setupMusicPlayer();
setupGallery();
setupGiftBox();
setupLoveReasons();
setupCounter();
setupHeartMessages();
setupFinalActions();
setupEscapeKey();
