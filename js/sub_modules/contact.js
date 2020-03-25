// jshint esversion: 6
const form = document.getElementById("contact-form");
const formButton = document.getElementById("contact-form-button");
const formStatus = document.getElementById("contact-form-status");
const inputs = document.querySelectorAll(".field input");
const textArea = document.querySelector(".field textarea");
let formElements = Array.prototype.slice.call(inputs);
let validName = false;
let validEmail = false;
let validText = true;
formElements.push(textArea);
textArea.value = "";

function validateContactForm() {
  formElements.forEach(formEl => {
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
        formButton.classList.remove("button-inactive", "disabled");
      } else {
        formButton.classList.add("disabled", "button-inactive");
        formButton.classList.remove("button-active", "button-shake");
      }
    });
  });
}

// handle the form submission event
function submitContactForm() {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    var data = new FormData(form);
    if (!formButton.classList.contains("disabled")) {
      ajax(form.method, form.action, data, success, error);
    }
  });
}

// Success and Error functions for after the form is submitted
function success() {
  form.reset();
  formElements.forEach(formEl => {
    formEl.classList.remove("input-correct");
  });
  formButton.classList.remove("button-active");
  formButton.classList.add("button-inactive");
  formButton.classList.add("disabled");
  formStatus.innerHTML =
    "Thank you for your message! We will get in touch with you as soon as possible.";
  showMessage();
}

function error() {
  formStatus.innerHTML =
    "We are sorry! The message could not be sent, please try again. If the problem persists, you can reach to us by our social networks!";
  showMessage();
}

// helper function for sending an AJAX request
function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function() {
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

function showMessage() {
  const message = document.querySelector(".field-status");
  message.classList.toggle("visible");
  setTimeout(() => {
    message.classList.toggle("visible");
  }, 8000);
}

export { validateContactForm, submitContactForm };
