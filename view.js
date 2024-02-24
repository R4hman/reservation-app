const main = document.querySelector(".main-content__result");
const prevBtn = document.querySelector(".back-btn");

import { services, staffs } from "./data.js";
import { clickEachDay, initDatePicker } from "./date-picker.js";
import { info, reloadApp, switchActiveNav, stepObj } from "./index.js";

const mainHeader = document.querySelector(".main-content__header");
const nextBtn = document.querySelector(".next-btn");
const modalContent = document.querySelector(".modal-content");
const modalContainer = document.querySelector(".modal-container");

// View Contentin qurulması
export function mainContent(key, step) {
  main.innerHTML = "";
  let content = "";

  let currentUrl = new URL(window.location.href);

  switch (key) {
    case "staff_id":
      content = staffs
        .map(
          (
            staff
          ) => `<div  data-id=${staff.id} data-name="staff_id" class="option staff">
    <img src=${staff.image} alt="" class="staff-img" />
    <div class="staff-info">
        <h3>${staff.name}</h3>
        <h5>${staff.email}</h5>
    </div>
  </div>`
        )
        .join("");

      currentUrl.searchParams.set("step", "1");
      break;
    case "service_id":
      main.innerHTML = "";
      content = services
        .map(
          (
            service
          ) => `<div  data-id=${service.id} data-name="service_id" class="option service">
            <div class="service-content">

            <img src=${service.image} alt="" class="service-img" />
            <div class="service-info">
                <h3>${service.name}</h3>
                <h5>${service.duration}</h5>
            </div>
            </div>
            <div class="price">₼ <span>${service.price}</span></div>
          </div>`
        )
        .join("");
      prevBtn.style.display = "block";
      currentUrl.searchParams.set("step", "2");

      break;
    case "date":
      currentUrl.searchParams.set("step", "3");
      document.getElementById("date").style.display = "flex";
      document.querySelector(".selection-time h4").textContent = "Select date";
      main.style.display = "none";
      initDatePicker();
      clickEachDay();
      break;
    case "confirmation":
      nextBtn.classList.add("hide");
      document.getElementById("date").style.display = "none";
      mainHeader.innerHTML = `Select ${"Confirmation"}`;

      switchActiveNav(stepObj.step, "up");
      main.style.display = "flex";
      main.innerHTML = "";

      const dr = staffs.find((item) => item.id === +info?.staff_id);
      // const doctorName = staffs.find((item) => console.log("staff", item));

      const servicePrice = services.find(
        (item) => item.id === +info.service_id
      ).price;
      content = `

      <div class="confirmation">
      <div class="confirmation-top">
        <form class="confirmation-form">
          <div class="inp">
            <label for="first-name">First name</label>
            <input  type="text" id="first-name" class="input" />
          </div>
          <div class="inp">
            <label for="last-name">Last name</label>
            <input  type="text" id="last-name" class="input" />
          </div>
          <div class="inp">
            <label for="email">E-mail</label>
            <input  type="text" id="email" class="input" />
          </div>
          <div class="inp">
            <label for="phone">Phone</label>
            <input type="text" id="phone" class="input" />
          </div>
          <button type="submit" class="btn confirm-btn">

          CONFIRM BOOKING</button>
        </form>
      </div>
      <div class="confirmation-bottom">
      <div class="reservation-info">
    <h3>Note</h3>
    <div class="reservation">
      <p><span>Staff:</span>${dr?.name}</p>
      <p><span>Service:</span>${info.service_id}</p>
      <p><span>Date:</span>${info.date} / ${info.time}</p>
      <p><span>Price:</span>₼ ${servicePrice}</p>
    </div>
  </div>
      </div>
    </div>


      `;

      currentUrl.searchParams.set("step", "4");
  }

  main.innerHTML = content;
  window.history.replaceState({}, "", currentUrl.href);
}

// reservationu təsdiq et
function confirmBooking() {
  const name = document.getElementById("first-name").value;
  const surname = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  toggleModal();

  if (!name || !surname || !email || !phone) {
    modalContent.firstChild.textContent = "Please fill all the required fields";
    modalContent.style.color = "#F39C12";
  } else {
    modalContent.firstChild.textContent = "Confirmation successfully completed";
    modalContent.style.color = "#38CF78";

    const customer = {};
    customer.name = name;
    customer.surname = surname;
    customer.email = email;
    customer.phone = name;
    const resultObj = { ...info, customer };

    console.log("info", resultObj);
    // prosesin başa çatması və səhifənin reload olması
    reloadApp();
  }
}

// Confirm btn click olanda
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches(".confirm-btn")) {
      e.preventDefault();
      confirmBooking();
    }
  });
});

//Modal toggle olunması
export function toggleModal() {
  const modal = document.getElementById("myModal");
  modal.classList.toggle("active");
}

// modalı bagla
document.getElementById("closeModal").addEventListener("click", (e) => {
  toggleModal();
});
