const navigation = document.querySelector(".navigation");
const mainHeader = document.querySelector(".main-content__header");
const prevBtn = document.querySelector(".back-btn");
const nextBtn = document.querySelector(".next-btn");
const selectBtn = document.querySelector(".select-btn");
const main = document.querySelector(".main-content__result");

import { staffs } from "./data.js";

import { mainContent } from "./utils.js";

const navLists = [
  { name: "Staff", step: 1, keyword: "staff_id" },
  { name: "Service", step: 2, keyword: "service_id" },
  { name: "Date & Time", step: 3, keyword: "date" },
  { name: "Confirmation", step: 4, keyword: "" },
];
let step = 1;
let keyword = "service_id";
const info = {
  customer: {},
  date: "",
  service_id: null,
  staff_id: null,
  time: "",
};

// function select() {
//   console.log("select clicked");
//   const allStaffElements = document.querySelectorAll(".option");

//   allStaffElements.forEach((option) =>
//     option.addEventListener("click", () => {
//       console.log("option");
//       const activeStaff = document.querySelector(".active-option");
//       if (activeStaff) {
//         activeStaff.classList.remove("active-option");
//       }
//       option.classList.add("active-option");
//       info.service_id = option.dataset.id;
//       mainContent("Service");
//       nextStep();
//     })
//   );
// }

function nextStep() {
  console.log("step " + step, keyword);
  const elements = document.querySelectorAll(".nav-item");

  if (!info[keyword]) {
    selectBtn.classList.add("show");
    setTimeout(() => selectBtn.classList.remove("show"), 3000);
  } else {
    console.log("keyword: " + keyword);
    const el = document.querySelector(".active");
    console.log("el", el);
    el.classList.remove("active");
    [...elements].forEach(
      (item) =>
        +item.childNodes[0].textContent === step && item.classList.add("active")
    );
    step > 1 && prevBtn.classList.add("show");
    // window.location.hash = item.childNodes[1].textContent.trim().toLowerCase();
    // mainHeader.innerHTML = `Select ${item.childNodes[1].textContent}`;
  }
}

function navClick() {
  nextBtn.addEventListener("click", nextStep);
}

function init() {
  navLists.map((item, i) => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    span.classList.add("nav-item__count");
    span.innerHTML = i + 1;
    div.innerHTML = `${span.outerHTML} ${item.name}`;

    div.classList.add("nav-item");
    i === 0 && div.classList.add("active");
    navigation.insertAdjacentElement("beforeend", div);
    mainHeader.innerHTML = `Select ${item.name}`;
    mainContent("staff_id");
  });
  navClick();
}

function switchActiveNav() {
  const elements = document.querySelectorAll(".nav-item");
  const activeNav = document.querySelector(".active");
  console.log("el", activeNav);
  activeNav.classList.remove("active");
  [...elements].forEach(
    (item) =>
      +item.childNodes[0].textContent === step && item.classList.add("active")
  );
  step > 1 && prevBtn.classList.add("show");
}

function select(e) {
  if (e.target.closest(".option")) {
    const el = e.target.closest(".option");
    console.log("name", el.dataset.name);
    const activeOption = document.querySelector(".active-option");
    if (activeOption) {
      activeOption.classList.remove("active-option");
    }
    el.classList.add("active-option");
    info[el.dataset.name] = el.dataset.id;

    console.log("info", info);
    step++;
    keyword = navLists.find((item) => item.step === step).keyword;

    mainContent(keyword);
    switchActiveNav();
    // nextStep(step);
  }
}

main.addEventListener("click", select);

window.addEventListener("DOMContentLoaded", init);
