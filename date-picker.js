import { info, step } from "./index.js";
import { mainContent } from "./utils.js";
// import { mainContent } from "./utils";

const currMonth = document.querySelector(".current-month");

const prevMonthBtn = document.querySelector(".prev-month");

console.log("prevMonthBtn", prevMonthBtn);
const nextMonthBtn = document.querySelector(".next-month");
const sun = document.querySelector(".sun-container");
const mon = document.querySelector(".mon-container");
const tue = document.querySelector(".tue-container");
const wed = document.querySelector(".wed-container");
const thu = document.querySelector(".thu-container");
const fri = document.querySelector(".fri-container");
const sat = document.querySelector(".sat-container");
const main = document.querySelector(".main-content__result");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const date = new Date().toLocaleDateString();
const today = date.split("/")[1];
let el;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const timeOptions = [
  {
    service: 1,
    options: [
      {
        startDate: "09:00",
        endDate: "10:00",
      },
      {
        startDate: "10:00",
        endDate: "11:00",
      },
      {
        startDate: "11:00",
        endDate: "12:00",
      },
    ],
  },
  {
    service: 2,
    options: [
      {
        startDate: "09:00",
        endDate: "10:30",
      },
      {
        startDate: "10:30",
        endDate: "12:00",
      },
      {
        startDate: "12:00",
        endDate: "13:30",
      },
    ],
  },
];

function setMonth(side) {
  if (side === "prev") {
    currentMonth -= 1;
    if (months[currentMonth] !== undefined) {
      currMonth.innerText = `${months[currentMonth]}  ${currentYear}`;
    } else {
      currentMonth = 11;
      currentYear -= 1;
      currMonth.innerText = `${months[currentMonth]}  ${currentYear}`;
    }
  }
  if (side === "next") {
    {
      currentMonth += 1;
      if (months[currentMonth] !== undefined) {
        currMonth.innerText = `${months[currentMonth]}  ${currentYear}`;
      } else {
        currentMonth = 0;
        currentYear += 1;
        currMonth.innerText = `${months[currentMonth]}  ${currentYear}`;
      }
    }
  }
  const date2 = new Date(currentYear, currentMonth, 1);
  const dateForNextMonth = new Date(currentYear, currentMonth + 1, 1);
  const days = (dateForNextMonth - date2) / (24 * 3600) / 1000;
  if (
    currentMonth === +date.split("/")[0] - 1 &&
    currentYear === +date.split("/")[2]
  ) {
    createDays(days, today);
  } else createDays(days);
}

function createDays(days, activeDay) {
  console.log("createDays");
  sun.innerText =
    mon.innerText =
    tue.innerText =
    wed.innerText =
    thu.innerText =
    fri.innerText =
    sat.innerText =
      "";
  const arr = Array.from({ length: days }, (x, i) => i + 1);
  arr.forEach((item) => {
    /// day 1 yeni ayin birinci gunu hansi hefte gunune dusurse ondan evvelki hefte gunlerine aid gunleri 1rem asagi salmaq
    const date = new Date(currentYear, currentMonth, item)
      .toDateString()
      .split(" ")[0];
    item === 1 && setAnotherDaysToBeDownOnTheScreen(date);

    el = getWeekDay(date);
    console.log("getWeekDay", "daejae");

    const span = document.createElement("span");
    span.classList.add("date-day");
    if (item == activeDay) {
      span.classList.add("active");
    }
    span.innerText = item;
    return el.insertAdjacentElement("beforeend", span);
  });
}

/// day 1 yeni ayin birinci gunu hansi hefte gunune dusurse ondan evvelki hefte gunlerine aid gunleri 1rem asagi salmaq funksiya
function setAnotherDaysToBeDownOnTheScreen(date) {
  switch (date) {
    case "Sun":
      resetPositions();
      break;
    case "Mon":
      resetPositions();
      sun.style.position = "relative";
      sun.style.top = "62px";
      break;
    case "Tue":
      resetPositions();
      sun.style.position = mon.style.position = "relative";
      sun.style.top = mon.style.top = "62px";
      break;
    case "Wed":
      resetPositions();
      sun.style.position = mon.style.position = tue.style.position = "relative";
      sun.style.top = mon.style.top = tue.style.top = "62px";
      break;
    case "Thu":
      resetPositions();
      sun.style.position =
        mon.style.position =
        tue.style.position =
        wed.style.position =
          "relative";
      sun.style.top = mon.style.top = tue.style.top = wed.style.top = "62px";
      break;
    case "Fri":
      resetPositions();
      sun.style.position =
        mon.style.position =
        tue.style.position =
        wed.style.position =
        thu.style.position =
          "relative";
      sun.style.top =
        mon.style.top =
        tue.style.top =
        wed.style.top =
        thu.style.top =
          "62px";
      break;
    case "Sat":
      resetPositions();
      sun.style.position =
        mon.style.position =
        tue.style.position =
        wed.style.position =
        thu.style.position =
        fri.style.position =
          "relative";
      sun.style.top =
        mon.style.top =
        tue.style.top =
        wed.style.top =
        thu.style.top =
        fri.style.top =
          "62px";
      break;
  }
}

function resetPositions() {
  sun.style.position =
    mon.style.position =
    tue.style.position =
    wed.style.position =
    thu.style.position =
    fri.style.position =
    sat.style.position =
      "relative";
  sun.style.top =
    mon.style.top =
    tue.style.top =
    wed.style.top =
    thu.style.top =
    fri.style.top =
    sat.style.top =
      "1rem";
}

function getWeekDay(day) {
  switch (day) {
    case "Sun":
      el = document.querySelector(".sun-container");
      break;

    case "Mon":
      el = document.querySelector(".mon-container");
      break;
    case "Tue":
      el = document.querySelector(".tue-container");
      break;
    case "Wed":
      el =
        document.querySelector(".wed-container") &&
        document.querySelector(".wed-container");
      console.log("thu el", el);
      break;
    case "Thu":
      el =
        document.querySelector(".thu-container") &&
        document.querySelector(".thu-container");
      break;
    case "Fri":
      el = document.querySelector(".fri-container");
      break;
    case "Sat":
      el = document.querySelector(".sat-container");
      break;
  }
  return el;
}

//sehife ilk defe yuklenende tarixi secib day-leri daxil elesin
function initialDate() {
  let initialCurrentMonth = new Date().getMonth();
  let initialCurrentYear = new Date().getFullYear();
  const initialDate = new Date(currentYear, currentMonth, 1);
  const initialDateForNextMonth = new Date(currentYear, currentMonth + 1, 1);
  const days = (initialDateForNextMonth - initialDate) / (24 * 3600) / 1000;
  createDays(days, today);
}

prevMonthBtn?.addEventListener("click", () => {
  setMonth("prev");
});

nextMonthBtn?.addEventListener("click", () => {
  setMonth("next");
});

// each date is clicked

export function clickEachDay() {
  const dateDays = document.querySelectorAll(".date-day");
  document.querySelector(".date-container").addEventListener("click", (e) => {
    if (e.target.classList.contains("date-day")) {
      const el = e.target;
      if (document.querySelector(".selected-date")) {
        console.log("var");
        document
          .querySelector(".selected-date")
          .classList.remove("selected-date");
      }
      el.classList.add("selected-date");
      let day = el.textContent;
      let month = (currentMonth + 1).toString();
      month = (currentMonth + 1).toString().length === 1 ? `0${month}` : month;
      day.length === 1 ? (day = `0${day}`) : day;
      info.date = `${day}-${month}-${currentYear}`;

      const availableTimes = document.querySelector(".available-times");
      availableTimes.innerHTML = timeOptions[info.service_id - 1].options
        .map(
          (time) => `
      <div class="select-time">
      <span>${time.startDate}</span>
      <span>${time.endDate}</span>
      </div>
      `
        )
        .join("");
      selectTime();
    }
  });
}

function selectTime() {
  window.addEventListener("click", (e) => {
    const selectedTime = e.target.closest(".select-time");
    if (selectedTime) {
      if (document.querySelector(".active-time")) {
        document.querySelector(".active-time").classList.remove("active-time");
      }
      selectedTime.classList.add("active-time");
      info.time = e.target.closest(".select-time").children[0].textContent;
      console.log("info", info);
      mainContent("confirmation", step);
    }
  });
}

export const initDatePicker = () => {
  // currMonth
  document.querySelector(
    ".current-month"
  ).innerText = `${months[currentMonth]}  ${currentYear}`;
  initialDate();
};

// window.addEventListener("DOMContentLoaded", initDatePicker);
