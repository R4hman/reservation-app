const navigation = document.querySelector(".navigation");
const mainHeader = document.querySelector(".main-content__header");
const prevBtn = document.querySelector(".back-btn");
const nextBtn = document.querySelector(".next-btn");
const selectBtn = document.querySelector(".select-btn");
const main = document.querySelector(".main-content__result");
const navItemCounts = document.querySelectorAll(".nav-item__count");

import { staffs } from "./data.js";
import { initDatePicker } from "./date-picker.js";
// import { initDatePicker } from "./date-picker.js";

import { mainContent } from "./utils.js";
// import { currentStep } from "./utils.js";

const navLists = [
  { name: "Staff", step: 1, keyword: "staff_id" },
  { name: "Service", step: 2, keyword: "service_id" },
  { name: "Date & Time", step: 3, keyword: "date" },
  { name: "Confirmation", step: 4, keyword: "confirmation" },
];
export let step = 1;
let next = step + 1;
let keyword = "service_id";
let currentUrl = new URL(window.location.href);

export let info = {
  customer: {},
  date: "",
  service_id: null,
  staff_id: null,
  time: "",
};

function nextStep() {
  // console.log(" step " + step);
  // const nextStep = step + 1;
  // console.log("nextstep ", nextStep, keyword);
  const elements = document.querySelectorAll(".nav-item");
  let stepValue = currentUrl.searchParams.get("step");
  console.log("stepValue", stepValue);
  step = parseInt(stepValue, 10);
  step < 4 ? (next = step + 1) : (next = 3);

  console.log("next", step, next);

  if (!info[keyword]) {
    selectBtn.classList.add("show");
    const name = navLists.find((item) => item.step === step).name;
    document.querySelector(".select-btn span").textContent = `Select ${name}`;
    setTimeout(() => selectBtn.classList.remove("show"), 3000);
  } else {
    const el = document.querySelector(".active-option");
    console.log("curstep", step, next);
    switch (next) {
      case 2:
        if (info.staff_id && el) {
          mainContent("service_id");
          // step++;
        }
      case 3:
        if (info.service_id && el) {
          mainContent("date");
          // step++;
          // step = 3;
        }
      case 4:
        if (info.date) {
          mainContent("confirmation");

          // step = 4;
        }
        break;
    }
    switchActiveNav(step, "up");

    step > 1 && prevBtn.classList.add("show");
    // window.location.hash = item.childNodes[1].textContent.trim().toLowerCase();
    // mainHeader.innerHTML = `Select ${item.childNodes[1].textContent}`;
  }
}
export function prevStep(incomingStep) {
  console.log("incoming step", incomingStep);
  if (incomingStep) {
    step = incomingStep;
  } else {
    if (step > 1) {
      console.log("step_1", step);
      step--;
      console.log("step_2", step);
    }
  }
  // step < 4 ? (next = step + 1) : (next = 3);
  // console.log("prev", step, next);

  switchActiveNav(step, "down");
  keyword = navLists.find((item) => item.step === step).keyword;

  const headerName = navLists.find((item) => item.step === step).name;
  mainHeader.innerHTML = `Selected ${headerName}`;
  if (step < 2) {
    prevBtn.style.display = "none";
  }

  if (step === 1 || step === 2) {
    if (keyword === "service_id") {
      document.getElementById("date").style.display = "none";
      main.style.display = "block";
    }

    mainContent(keyword);
    document
      .querySelectorAll(".option")
      .forEach(
        (item) =>
          item.dataset.id === info[keyword] &&
          item.classList.add("active-option")
      );
    document.querySelector(".available-times").innerHTML = "";
  }
  if (step === 3) {
    document.getElementById("date").style.display = "flex";
    main.style.display = "none";
    nextBtn.classList.remove("hide");
  }
  if (step > 1) {
    prevBtn.classList.add("show");
  }
  // document.querySelectorAll(".nav-item").forEach((item, i) => {
  //   // if(+item.childNodes[0].textContent){

  //   // }
  //   if (i + 1 > step) {
  //     // // +item.childNodes[0].textContent === "";
  //     // item.childNodes[0].style.backgroundColor === "red";
  //   }
  // });
}

function navClick() {
  nextBtn.addEventListener("click", nextStep);
}

export function init() {
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
    mainContent("staff_id");
  });
  navClick();
}

export function switchActiveNav(step, direction) {
  const elements = document.querySelectorAll(".nav-item");
  const activeNav = document.querySelector(".active");
  activeNav.classList.remove("active");

  [...elements].forEach((item, i) => {
    i + 1 === step && item.classList.add("active");
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

function select(e) {
  if (e.target.closest(".option")) {
    const el = e.target.closest(".option");
    const activeOption = document.querySelector(".active-option");
    if (activeOption) {
      activeOption.classList.remove("active-option");
    }
    el.classList.add("active-option");
    info[el.dataset.name] = el.dataset.id;

    step++;
    keyword = navLists.find((item) => item.step === step).keyword;
    const name = navLists.find((item) => item.keyword === keyword).name;
    mainHeader.innerHTML = `Select ${name}`;
    mainContent(keyword, step);

    switchActiveNav(step, "up");
    // nextStep(step);
  }
}

export function reloadApp() {
  step = 1;
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
  prevBtn.classList.remove("show");

  init();
}

main.addEventListener("click", select);
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("back-btn")) {
    prevStep();
  }
});
window.addEventListener("DOMContentLoaded", init);
