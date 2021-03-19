// jshint esversion: 6

const list = document.querySelector(".swiper-wrapper");
const links = document.querySelectorAll(".swiper-slide");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalCaption = document.getElementById("modal-caption");
const cross = document.getElementById("modal-close");
const leftArrow = document.getElementById("modal-arrow-left");
const rightArrow = document.getElementById("modal-arrow-right");
let hasRequested = false;
let modalOpen = false;
let modalHandler;
let leftArrowHandler, rightArrowHandler, arrowKeyHandler, escapeHandler;
const handlers = {
  left: leftArrowHandler,
  right: rightArrowHandler,
  key: arrowKeyHandler,
  escape: escapeHandler,
};

function desktopDeferCode(isSafari, animateImages, loadHDImages, slideAnim) {
  initModal(loadHDImages, slideAnim);
  if (isSafari) animateImagesSafari();
  else animateImages();
}

function initModal(loadHDImages, slideAnim) {
  if (!hasRequested) {
    list.addEventListener(
      "click",
      (modalHandler = (e) => {
        let imageTarget;
        modalOpen = true;
        if (e.target.tagName === "DIV") {
          if (e.target.className.indexOf("link-caption") === -1)
            imageTarget = e.target.previousElementSibling;
          else
            imageTarget =
              e.target.previousElementSibling.previousElementSibling;
        } else if (e.target.tagName === "H4" || e.target.tagName === "H6")
          imageTarget =
            e.target.parentNode.previousElementSibling.previousElementSibling;
        else return;
        loadHDImages(imageTarget, modalImage, modalCaption);
        let timer = setTimeout(() => {
          animateEntry();
          clearTimeout(timer);
        }, 200);
        slideImages(imageTarget.parentNode, slideAnim);
        document.addEventListener(
          "keyup",
          (handlers.escape = (event) => {
            const key = event.key || event.keyCode;
            if (key === "Escape" || key === "Esc") {
              closeModal();
            }
          })
        );
      })
    );
    let bindedCloseModal = closeModal.bind(null, handlers);
    cross.addEventListener("click", bindedCloseModal);
    hasRequested = true;
  }
}

function animateEntry() {
  modal.classList.add("visible");
  modalImage.style.animation = "1s emerge-anim";
  modalImage.addEventListener("animationend", () => {
    modalImage.parentNode.style.overflow = "hidden";
  });
  modalCaption.style.animation = "1s caption-emerge-anim";
  cross.classList.add("emerge");
  leftArrow.classList.add("emerge");
  rightArrow.classList.add("emerge");
}

function slideImages(link, slideAnim) {
  if (!link.previousElementSibling) {
    leftArrow.classList.add("not-allowed");
  } else if (!link.nextElementSibling) {
    rightArrow.classList.add("not-allowed");
  }
  leftArrow.addEventListener(
    "click",
    (handlers.left = () => {
      link = moveLeft(link, slideAnim);
    })
  );
  rightArrow.addEventListener(
    "click",
    (handlers.right = () => {
      link = moveRight(link, slideAnim);
    })
  );
  document.addEventListener(
    "keyup",
    (handlers.key = (event) => {
      const key = event.key || event.keyCode;
      if (key === "ArrowLeft" || key === "Left" || key == "37") {
        link = moveLeft(link, slideAnim);
      } else if (key === "ArrowRight" || key === "Right" || key == "39") {
        link = moveRight(link, slideAnim);
      }
    })
  );
}

function moveLeft(link, slideAnim) {
  if (!leftArrow.classList.contains("not-allowed")) {
    slideAnim("left");
    if (link.previousElementSibling) {
      if (!link.previousElementSibling.previousElementSibling) {
        leftArrow.classList.add("not-allowed");
      } else if (rightArrow.classList.contains("not-allowed"))
        rightArrow.classList.remove("not-allowed");
      let previousLink = link.previousElementSibling;
      changeImage(previousLink);
      return previousLink;
    }
  }
  return link;
}

function moveRight(link, slideAnim) {
  if (!rightArrow.classList.contains("not-allowed")) {
    slideAnim("right");
    if (link.nextElementSibling) {
      if (!link.nextElementSibling.nextElementSibling) {
        rightArrow.classList.add("not-allowed");
      } else if (leftArrow.classList.contains("not-allowed"))
        leftArrow.classList.remove("not-allowed");
      let nextLink = link.nextElementSibling;
      changeImage(nextLink);
      return nextLink;
    }
  }
  return link;
}

function changeImage(link) {
  let title;
  let subtitle;
  if (link.lastElementChild.id.indexOf("caption") !== -1) {
    title = link.lastElementChild.firstElementChild;
    subtitle = link.lastElementChild.lastElementChild;
  } else {
    title =
      link.firstElementChild.nextElementSibling.nextElementSibling
        .firstElementChild;
    subtitle =
      link.firstElementChild.nextElementSibling.nextElementSibling
        .lastElementChild;
  }
  setTimeout(() => {
    modalCaption.firstElementChild.textContent = title.textContent;
    modalCaption.lastElementChild.textContent = subtitle.textContent;
    modalImage.src = link.firstElementChild.src;
  }, 300);
}

function closeModal() {
  if (modalOpen) {
    modal.classList.remove("visible");
    cross.classList.remove("emerge");
    leftArrow.classList.remove("emerge", "not-allowed");
    rightArrow.classList.remove("emerge", "not-allowed");
    modalCaption.style.animation = "";
    modalImage.style.animation = "";
    modalImage.parentNode.style.overflow = "visible";
    leftArrow.removeEventListener("click", handlers.left);
    rightArrow.removeEventListener("click", handlers.right);
    document.removeEventListener("keyup", handlers.key);
    document.removeEventListener("keyup", handlers.escape);
    modalOpen = false;
  }
}

function animateImagesSafari() {
  list.addEventListener("mouseover", styleLink);
  list.addEventListener("mouseleave", restoreLink);
}

function styleLink() {
  links.forEach((link) => {
    if (link.matches(":hover")) {
      link.style.width = "36%";
      link.classList.add("overlay-transparent");
      link.lastElementChild.classList.add("show-caption");
    } else {
      link.style.width = "18%";
      link.classList.remove("overlay-transparent");
      link.lastElementChild.classList.remove("show-caption");
    }
  });
}

function restoreLink() {
  links.forEach((link) => {
    link.style.width = "20%";
    link.classList.remove("overlay-transparent");
    link.lastElementChild.classList.remove("show-caption");
  });
}

function prepareForMobile(isSafari) {
  closeModal(handlers);
  destroyModal();
  if (isSafari) removeImagesListeners();
}

function destroyModal() {
  list.removeEventListener("click", modalHandler);
  hasRequested = false;
}

function removeImagesListeners() {
  list.removeEventListener("mouseover", styleLink);
  list.removeEventListener("mouseleave", restoreLink);
}

export { desktopDeferCode, prepareForMobile };
