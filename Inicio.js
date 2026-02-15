import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const loadingScreen = document.getElementById("loadingScreen");

const audio = document.getElementById("somInicio");
const btnSom = document.getElementById("btnSom");

audio.loop = true;
audio.volume = 0.05; // 🔉 Som baixo

let ativo = false;

// 🔐 VERIFICAÇÃO DE SESSÃO
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  if (!user.emailVerified) {
    await signOut(auth);
    window.location.href = "index.html";
    return;
  }

  // Mostrar email do usuário
  const userInfo = document.getElementById("userInfo");
  if (userInfo) {
    userInfo.innerText = user.email;
  }
 // Remove loader quando tudo estiver ok
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 7000);

 
  
});

btnSom.addEventListener("click", () => {
  if (!ativo) {
    audio.play().catch(() => {});
    btnSom.innerHTML = "🔇 Som Desativar";
    btnSom.classList.remove("off");
    ativo = true;
  } else {
    audio.pause();
    btnSom.innerHTML = "🔊 Som Ativar";
    btnSom.classList.add("off");
    ativo = false;
  }
});


// 🚪 LOGOUT
document.addEventListener("DOMContentLoaded", () => {

  const logoutBtn2 = document.getElementById("logoutBtn2");
  const logoutBtn = document.getElementById("logoutBtn");

   const fazerLogout = async () => {
    await signOut(auth);
    window.location.href = "index.html";
  };

  if (logoutBtn) {
    logoutBtn.addEventListener("click", fazerLogout);
  }

  if (logoutBtn2) {
    logoutBtn2.addEventListener("click", fazerLogout);
  }

});

document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

});