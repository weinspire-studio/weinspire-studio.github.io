// jshint esversion: 6
const form = document.getElementById("contact-form");
const statusContainer = document.getElementById("field-status");
const formStatus = document.getElementById("contact-form-status");
const formButton = document.getElementById("contact-form-button");
const inputs = document.querySelectorAll(".field input");
const textArea = document.querySelector(".field textarea");
const newsForm = document.getElementById("news-form");
const newsStatusContainer = document.getElementById("news-field-status");
const newsFormStatus = document.getElementById("news-form-status");
const newsFormButton = document.querySelector("#news-form button");
let formElements = Array.prototype.slice.call(inputs);
let validName = false;
let validEmail = false;
let validText = true;
let formFlag = true;
formElements.push(textArea);
textArea.value = "";
newsForm[0].value = "";

function validateContactForm() {
  formElements.forEach((formEl) => {
    let visitedFlag = false;
    formEl.addEventListener("keyup", () => {
      let formElType = formEl.dataset.type;
      if (formElType === "name") {
        if (formEl.value.length !== 0) visitedFlag = true;
        if (visitedFlag) {
          validName = validateName(formEl);
          if (validName) {
            formEl.classList.remove("input-error");
            formEl.classList.add("input-correct");
          } else {
            formEl.classList.remove("input-correct");
            formEl.classList.add("input-error");
          }
        }
      }
      if (formElType === "email") {
        if (formEl.value.length !== 0) visitedFlag = true;
        if (visitedFlag) {
          validEmail = validateEmail(formEl);
          if (validEmail) {
            formEl.classList.remove("input-error", "input-error-email");
            formEl.classList.add("input-correct");
          } else {
            formEl.classList.add("input-error", "input-error-email");
            formEl.classList.remove("input-correct");
          }
        }
      }
      if (formElType === "text") {
        if (formEl.value.length !== 0) visitedFlag = true;
        if (visitedFlag) {
          validText = validateText(formEl);
          if (validText) {
            formEl.classList.add("input-correct");
            formEl.classList.remove("input-error");
          } else {
            formEl.classList.add("input-error");
            formEl.classList.remove("input-correct");
          }
        }
      }
      if (validName && validEmail && validText) {
        formButton.classList.add("button-shake", "button-active");
        formButton.classList.remove("button-inactive");
      } else {
        formButton.classList.add("button-inactive");
        formButton.classList.remove("button-active", "button-shake");
      }
    });
  });
}

// handle the form submission event
function submitContactForm() {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    formFlag = true;
    var data = new FormData(form);
    if (!formButton.classList.contains("button-inactive")) {
      ajax(form.method, form.action, data, success, error);
    }
  });
}

// handle the newsForm submission event
function submitNewsForm() {
  newsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    formFlag = false;
    var data = new FormData(newsForm);
    if (validateEmail(newsForm[0])) {
      ajax(newsForm.method, newsForm.action, data, success, error);
    } else {
      newsFormStatus.style.backgroundColor = "red";
      newsFormStatus.innerHTML = "Wrong email address.";
      showMessage(newsStatusContainer);
    }
  });
}

// Success and Error functions for after the form is submitted
function success() {
  if (formFlag) {
    form.reset();
    formElements.forEach((formEl) => {
      formEl.classList.remove("input-correct");
    });
    formButton.classList.remove("button-active");
    formButton.classList.add("button-inactive");
    formStatus.innerHTML =
      "Thank you for your message! We will get in touch with you as soon as possible.";
    showMessage(statusContainer);
  } else {
    newsForm.reset();
    newsFormButton.classList.add("news-button-inactive");
    newsFormStatus.innerHTML = "Thanks for subscribing!";
    newsFormStatus.style.backgroundColor = "green";
    showMessage(newsStatusContainer);
  }
}

function error() {
  if (formFlag) {
    formStatus.innerHTML =
      "We are sorry! The message could not be sent, please try again. If the problem persists, you can reach to us by our social networks!";
    showMessage(statusContainer);
  } else {
    newsForm.reset();
    newsFormStatus.style.backgroundColor = "red";
    newsFormStatus.innerHTML = "Ups, something went wrong!";
    showMessage(newsStatusContainer);
  }
}

// helper function for sending an AJAX request
function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

function validateName(element) {
  if (
    element.value.length < 1 ||
    element.value.length > 50 ||
    !element.value.replace(/\s+/g, "").length
  ) {
    return false;
  }
  return true;
}

function validateEmail(element) {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(element.value) &&
    element.value.length < 50
  ) {
    return true;
  }
  return false;
}

function validateText(element) {
  if (element.value.length > 300) {
    return false;
  }
  return true;
}

function showMessage(statusContainer) {
  statusContainer.classList.toggle("visible");
  setTimeout(() => {
    statusContainer.classList.toggle("visible");
  }, 8000);
}

export { validateContactForm, submitContactForm, submitNewsForm };
