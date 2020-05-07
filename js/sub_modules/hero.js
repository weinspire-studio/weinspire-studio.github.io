// jshint esversion: 6

const spanContainer = document.getElementById("span-words");
let words = spanContainer.getAttribute("data-words").split(", ");
let text = "";
let wordCounter = 0;
let wait = 1350;
let isWriting = true;
let isDeleting = false;
let threshold = document.body.clientHeight / 2;
let timer;
let scrolledY;

// window.addEventListener("scroll", setWriter);

function setWriter() {
  scrolledY = window.pageYOffset;
  if (scrolledY > threshold) {
    if (isWriting) {
      isWriting = false;
      clearWriter();
    }
  } else {
    if (scrolledY < threshold - threshold / 4) {
      if (!isWriting) {
        text = "";
        wordCounter = 0;
        isDeleting = false;
        isWriting = true;
        typeWriter();
      }
    }
  }
}

function typeWriter() {
  const wordIndex = wordCounter % words.length;
  const currentWord = words[wordIndex];
  let typeSpeed = 175;
  if (isDeleting) {
    text = currentWord.substring(0, text.length - 1);
    typeSpeed = typeSpeed / 2;
  } else {
    text = currentWord.substring(0, text.length + 1);
  }
  if (!isDeleting && text === currentWord) {
    if (currentWord === "inspire") {
      typeSpeed = 3400;
    } else {
      typeSpeed = wait;
    }
    isDeleting = true;
  } else if (isDeleting && text === "") {
    isDeleting = false;
    wordCounter++;
    typeSpeed = 500;
  }
  spanContainer.innerHTML = `<span class="inner-span">${text}</span>`;
  timer = setTimeout(() => typeWriter(), typeSpeed);
}

function initWriter() {
  typeWriter();
  window.addEventListener("scroll", setWriter);
}

function clearWriter() {
  clearTimeout(timer);
}

function destroyWriter() {
  window.removeEventListener("scroll", setWriter);
  clearTimeout(timer);
}

export { initWriter, destroyWriter };
