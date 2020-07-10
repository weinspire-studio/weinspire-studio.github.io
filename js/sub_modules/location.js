// jshint esversion: 6

// country codes: US, ES, AR, UY, langs: es, en.
const esFlag = document.getElementById("lang").lastElementChild;
const dataLoc = document.getElementById("data-loc");
const docLang = document.documentElement.lang;

const langModal = document.getElementById("lang-modal");
const spanCity = document.getElementById("span-city");
const spanLang = document.getElementById("span-lang");
const languages = { es: "Español", en: "English" };

function getUserUbication() {
  $.get(
    "https://ipinfo.io?token=7be137e8e33fca",
    function (res) {
      prepareCustomContent(res.country, res.city);
    },
    "jsonp"
  );
}

function prepareCustomContent(countryCode, city) {
  let flagImg;
  if (docLang === "en") {
    flagImg = esFlag.firstElementChild.firstElementChild;
    if (countryCode === "US") {
    } else if (countryCode === "ES") {
      showMessage(city, languages.es);
    } else if (countryCode === "AR") {
      showMessage(city, languages.es);
      flagImg.src = "./assets/flag-ar.png";
    } else if (countryCode === "UY") {
      showMessage(city, languages.es);
      flagImg.src = "./assets/flag-uy.png";
    }
  } else if (docLang === "es") {
    flagImg = esFlag.firstElementChild;
    if (countryCode === "US") {
      showMessage(city, languages.en);
    } else if (countryCode === "ES") {
    } else if (countryCode === "AR") {
      flagImg.src = "../assets/flag-ar.png";
      dataLoc.textContent =
        "Martín Fierro 3782, Pqe. Leloir, Ituzaingó, Argentina";
    } else if (countryCode === "UY") {
      flagImg.src = "../assets/flag-uy.png";
      dataLoc.textContent = "Palmeiras 1513, Playa Pascual, San José, Uruguay";
    }
  }
}

function showMessage(city, language) {
  const langMessage = langModal.firstElementChild;
  const cross = langMessage.firstElementChild;
  let animationHandler;
  let crossHandler;
  let hasClosed = false;
  langModal.style.display = "block";
  spanCity.textContent = city;
  spanLang.textContent = language;
  langMessage.classList.add("slide-modal");
  cross.addEventListener(
    "click",
    (crossHandler = () => {
      langMessage.classList.remove("slide-modal");
      langModal.style.display = "none";
      cross.removeEventListener("click", crossHandler);
      hasClosed = true;
    })
  );
  if (!hasClosed) {
    langMessage.addEventListener(
      "animationend",
      (animationHandler = () => {
        langModal.style.display = "none";
        cross.removeEventListener("click", crossHandler);
        langMessage.removeEventListener("animationend", animationHandler);
      })
    );
  }
}

export { getUserUbication };
