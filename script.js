const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnlogin-popup");
const iconClose = document.querySelector(".icon-close");
const cards = document.querySelectorAll(".brand");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
const hiddenElements = document.querySelectorAll(".hidden, .hid");

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});
loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});
iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

let currentImageIndex = 2;
const images = ["images/1.jpg", "images/2.jpg", "images/3.jpg"];

function changeImage(imageSrc) {
  document.getElementById("hero-image").src = imageSrc;
  currentImageIndex = images.indexOf(imageSrc);
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  document.getElementById("hero-image").src = images[currentImageIndex];
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  document.getElementById("hero-image").src = images[currentImageIndex];
}

const textArray = [
  "Wear With Atttitude...",
  "Style Meets Confidence!",
  "Unleash Your Style...",
  "Elevate Your Look!",
];
const typingSpeed = 150;
const delayBetweenTexts = 2000;
let textIndex = 0;
let charIndex = 0;

const typedTextElement = document.getElementById("typed-text");

function typeText() {
  if (charIndex < textArray[textIndex].length) {
    typedTextElement.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, typingSpeed);
  } else {
    setTimeout(deleteText, delayBetweenTexts);
  }
}

function deleteText() {
  if (charIndex > 0) {
    typedTextElement.textContent = textArray[textIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(deleteText, typingSpeed / 2);
  } else {
    textIndex = (textIndex + 1) % textArray.length;
    setTimeout(typeText, delayBetweenTexts);
  }
}

typeText();
deleteText();

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    let react = card.getBoundingClientRect();
    let x = e.clientX - react.left - react.width / 2;
    let y = e.clientY - react.top - react.height / 2;

    let rotateX = (x / react.height) * -30;
    let rotateY = (y / react.width) * -30;

    card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

    let bgx = (x / react.width) * 50 + 50;
    card.style.backgroundPosition = `${bgx}%`;
  });

  card.addEventListener("mouseleave", (e) => {
    card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    card.style.backgroundPosition = ``;
  });
});

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("show");
      void entry.target.offsetWidth;
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
hiddenElements.forEach((el) => observer.observe(el));
