// ===============================
// CONFIGURACIÓN
// ===============================
// Puedes cambiar esta fecha si noviembre de 2024 significa otro día.
// Formato: AAAA-MM-DDTHH:MM:SS
const startDate = new Date("2024-11-01T00:00:00");

// Contador en tiempo real
function updateTimer() {
  const now = new Date();
  let diff = Math.max(0, now - startDate);

  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);

  // Calculamos años/meses/días de calendario para que el contador sea más natural.
  let cursor = new Date(startDate);
  let years = 0;
  while (true) {
    const next = new Date(cursor);
    next.setFullYear(next.getFullYear() + 1);
    if (next <= now) { years++; cursor = next; } else break;
  }

  let months = 0;
  while (true) {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);
    if (next <= now) { months++; cursor = next; } else break;
  }

  const days = Math.floor((now - cursor) / 86400000);

  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateTimer();
setInterval(updateTimer, 1000);

// Animaciones al desplazarse
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Corazones flotando
const heartsContainer = document.querySelector(".floating-hearts");
const heartSymbols = ["♥", "♡", "❤", "✦"];

function createHeart() {
  if (!heartsContainer) return; // Seguridad por si acaso
  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 20}px`;
  heart.style.animationDuration = `${7 + Math.random() * 7}s`;
  heart.style.animationDelay = `${Math.random() * 2}s`;
  heart.style.color = Math.random() > .45 ? "#c9354d" : "#87ceeb";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 16000);
}

setInterval(createHeart, 900);
for (let i = 0; i < 8; i++) setTimeout(createHeart, i * 400);

// Foto local (CORREGIDO: Ahora haces clic en el recuadro gris de la foto directamente)
const photoInput = document.getElementById("photoInput");
const photoPlaceholder = document.getElementById("photoPlaceholder");

if (photoPlaceholder && photoInput) {
  photoPlaceholder.addEventListener("click", () => photoInput.click());

  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    photoPlaceholder.classList.add("has-image");
    photoPlaceholder.innerHTML = `<img src="${url}" alt="Foto especial">`;
  });
}

// ==========================================
// CONFIGURACIÓN DE MÚSICA AUTOMÁTICA
// ==========================================
const audioPlayer = document.getElementById("audioPlayer");
const songName = document.getElementById("songName");

if (audioPlayer) {
  // Ponemos el nombre de la canción visible cuando cargue
  audioPlayer.addEventListener("loadedmetadata", () => {
    if (songName) songName.textContent = "♪ Sonando de fondo...";
  });

  // Intentar reproducir automáticamente de inmediato
  audioPlayer.play().catch(() => {
    // Si el navegador lo bloquea, esperamos al primer clic o scroll del usuario para activarla
    const iniciarMusica = () => {
      audioPlayer.play();
      // Quitamos los eventos para que no se ejecuten cada vez que hace clic
      document.removeEventListener("click", iniciarMusica);
      document.removeEventListener("scroll", iniciarMusica);
    };

    document.addEventListener("click", iniciarMusica);
    document.addEventListener("scroll", iniciarMusica);
  });
}


// Sorpresa final
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseText = document.getElementById("surpriseText");

if (surpriseBtn && surpriseText) {
  surpriseBtn.addEventListener("click", () => {
      surpriseText.textContent = 
          "Si pudiera guardar un deseo dentro de esta página, sería que sigamos llenando nuestros días de recuerdos bonitos, conversaciones sinceras y muchas razones para sonreír. Gracias por ser parte de mi vida.";
      
      surpriseBtn.textContent = "Sorpresa abierta ♥";
      surpriseBtn.disabled = true;

      for (let i = 0; i < 18; i++) {
          setTimeout(createHeart, i * 80);
      }
  });
}
