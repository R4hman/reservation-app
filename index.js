const navigation = document.querySelector(".navigation");
const mainHeader = document.querySelector(".main-content__header");
const prevBtn = document.querySelector(".back-btn");
const nextBtn = document.querySelector(".next-btn");
const selectBtn = document.querySelector(".select-btn");
const main = document.querySelector(".main-content__result");
const navItemCounts = document.querySelectorAll(".nav-item__count");

import { iterateObj } from "./utils.js";
import { mainContent } from "./view.js";

const navLists = [
  { name: "Staff", step: 1, keyword: "staff_id" },
  { name: "Service", step: 2, keyword: "service_id" },
  { name: "Date & Time", step: 3, keyword: "date" },
  { name: "Confirmation", step: 4, keyword: "confirmation" },
];

export const stepObj = { step: 1 };
let next = stepObj.step + 1;
let keyword = "service_id";
let currentUrl = new URL(window.location.href);

export let info = {
  staff_id: null,
  service_id: null,
  date: "",
  time: "",
  customer: {},
};

// ireli buttonu click olanda
function nextStep() {
  const elements = document.querySelectorAll(".nav-item");
  stepObj.step < 4 ? (next = stepObj.step + 1) : (next = 3);
  const keyword = navLists.find((item) => item.step === stepObj.step).keyword;
  // console.log("keyword", keyword, info);

  // eger step seçilməyibsə select warning-i işə düşsün
  if (!info[keyword]) {
    selectBtn.classList.add("show");
    const name = navLists.find((item) => item.step === stepObj.step).name;
    document.querySelector(".select-btn span").textContent = `Select ${name}`;
    setTimeout(() => selectBtn.classList.remove("show"), 3000);
  } else {
    const el = document.querySelector(".active-option");
    console.log("step: " + stepObj.step, next);

    switch (next) {
      case 2:
        if (info.staff_id && el) {
          stepObj.step = 2;
          mainContent("service_id", stepObj.step);
        }
        break;
      case 3:
        if (info.service_id && el) {
          stepObj.step = 3;
          mainContent("date", stepObj.step);
        }
        break;
      case 4:
        if (info.date && info.time) {
          stepObj.step = 4;
          mainContent("confirmation", stepObj.step);
        }
    }
    // stepin navigation-ı dəyişsin
    switchActiveNav(stepObj.step, "up");

    // eger step 1 den yuxarıdırsa back buttonu ui-de görsənsin
    stepObj.step > 1 && prevBtn.classList.add("show");
  }
}

// Geri buttonu click olanda
export function prevStep() {
  // stepi  1 vahid azalt
  stepObj.step = stepObj.step - 1;

  //iterate et ve obyekti update et
  const updatedInfo = iterateObj(info, stepObj.step);
  Object.keys(info).forEach((key) => {
    delete info[key];
  });
  info = { ...updatedInfo };
  // console.log("prev", info);

  // stepin navigation-ı dəyişsin
  switchActiveNav(stepObj.step, "down");
  keyword = navLists.find((item) => item.step === stepObj.step).keyword;
  // stepin headerini update et
  const headerName = navLists.find((item) => item.step === stepObj.step).name;

  mainHeader.innerHTML = `Selected ${headerName}`;
  if (stepObj.step < 2) {
    prevBtn.style.display = "none";
  }

  if (stepObj.step === 1 || stepObj.step === 2) {
    if (keyword === "service_id") {
      document.getElementById("date").style.display = "none";
      main.style.display = "block";
    }

    // Active option classı elavə et
    mainContent(keyword);
    document
      .querySelectorAll(".option")
      .forEach(
        (item) =>
          item.dataset.id === info[keyword] &&
          item.classList.add("active-option")
      );
    //  geri qayıdanda available times ui-ı sıfırlansın
    document.querySelector(".available-times").innerHTML = "";
  }
  if (stepObj.step === 3) {
    document.getElementById("date").style.display = "flex";
    main.style.display = "none";
    nextBtn.classList.remove("hide");
  }

  // eger step 1 den yuxarıdırsa back buttonu ui-de görsənsin
  if (stepObj.step > 1) {
    prevBtn.classList.add("show");
  }
}

// səhifə restart olanda bu funksiya işə düşsün
export function init() {
  // tab-ların yaradılması
  navLists.map((item, i) => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    span.classList.add("nav-item__count");
    span.innerHTML = i + 1;
    div.innerHTML = `${span.outerHTML} ${item.name}`;

    div.classList.add("nav-item");
    if (i === 0) {
      div.classList.add("active");
      mainHeader.innerHTML = `Select ${item.name}`;
    }
    navigation.insertAdjacentElement("beforeend", div);
    // Contentin dəyişilməsi
    mainContent("staff_id");
  });

  // next buttonu click olanda
  nextBtn.addEventListener("click", nextStep);
}

// Navigation tabları arasında switch edən funksiya
export function switchActiveNav(step, direction) {
  const elements = document.querySelectorAll(".nav-item");
  const activeNav = document.querySelector(".nav-item.active");
  activeNav.classList.remove("active");

  [...elements].forEach((item, i) => {
    if (step === i + 1) {
      item.classList.add("active");
    }
    if (direction === "up") {
      if (i + 1 < step) {
        item.childNodes[0].innerHTML = `<i class="fa-solid fa-check"></i>`;
        item.childNodes[0].style.backgroundColor = "#6C70DC";
      }
    } else if (direction === "down") {
      if (i + 1 > step) {
        item.childNodes[0].textContent = i + 1;
        item.childNodes[0].style.backgroundColor = "#4d545a";
      }
    }
  });

  step > 1 && prevBtn.classList.add("show");
}

// Hər option click olanda optionun seçilməsi
function select(e) {
  if (e.target.closest(".option")) {
    const el = e.target.closest(".option");
    const activeOption = document.querySelector(".active-option");
    if (activeOption) {
      activeOption.classList.remove("active-option");
    }
    el.classList.add("active-option");
    info[el.dataset.name] = el.dataset.id;

    stepObj.step = stepObj.step + 1;

    keyword = navLists.find((item) => item.step === stepObj.step).keyword;
    const name = navLists.find((item) => item.keyword === keyword).name;
    mainHeader.innerHTML = `Select ${name}`;

    mainContent(keyword, stepObj.step);
    switchActiveNav(stepObj.step, "up");
  }
}

// confirmation başa çatandan sonra bu funksiya işə düşür və UI sıfırlanlır
export function reloadApp() {
  stepObj.step = 1;
  let keyword = "service_id";
  info = {
    customer: {},
    date: "",
    service_id: null,
    staff_id: null,
    time: "",
  };
  navigation.innerHTML = "";
  main.style.display = "block";
  document.querySelector(".active-time").classList.remove("active-time");

  nextBtn.classList.remove("hide");
  prevBtn.style.display = "none";

  init();
}

main.addEventListener("click", select);
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("back-btn")) {
    prevStep();
  }
});
window.addEventListener("DOMContentLoaded", init);
