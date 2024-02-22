const main = document.querySelector(".main-content__result");
import { services, staffs } from "./data.js";
import { clickEachDay, initDatePicker } from "./date-picker.js";
import { info, init, step, switchActiveNav } from "./index.js";
const mainHeader = document.querySelector(".main-content__header");
const nextBtn = document.querySelector(".next-btn");
const modalContent = document.querySelector(".modal-content");
const modalOverlay = document.querySelector(".modal-overlay");
// import { select } from "./index.js";

export function mainContent(key, step) {
  console.log("step " + step);
  console.log("key: " + key);
  main.innerHTML = "";
  let content = "";

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
            <div class="price">price</div>
          </div>`
        )
        .join("");
      break;
    case "date":
      document.getElementById("date").style.display = "flex";
      main.style.display = "none";

      mainContent.innerHTML = "";
      initDatePicker();
      clickEachDay();
      break;
    case "confirmation":
      nextBtn.classList.add("hide");
      document.getElementById("date").style.display = "none";
      mainHeader.innerHTML = `Select ${"Confirmation"}`;
      step = step + 1;
      switchActiveNav(step);
      main.style.display = "flex";
      main.innerHTML = "";
      console.log("info", info);
      const doctorName = staffs.find((item) => item.id === +info.staff_id).name;
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
          <button type="submit" class="btn confirm-btn">CONFIRM BOOKING</button>
        </form>
      </div>
      <div class="confirmation-bottom">
      <div class="reservation-info">
    <h3>Note</h3>
    <div class="reservation">
      <p><span>Staff:</span>${doctorName}</p>
      <p><span>Service:</span>${info.service_id}</p>
      <p><span>Date:</span>${info.date} / ${info.time}</p>
      <p><span>Price:</span>₼ ${servicePrice}</p>
    </div>
  </div>
      </div>
    </div>


      `;
  }

  main.innerHTML = content;
}

function confirmBooking() {
  const name = document.getElementById("first-name").value;
  const surname = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  modalOverlay.style.display = "block";
  if (!name || !surname || !email || !phone) {
    console.log("no overlay");

    modalContent.textContent = "Please fill all the required fields";
  } else {
    modalContent.textContent = "Confirmation successfully completed";
    info.customer.name = name;
    info.customer.surname = surname;
    info.customer.email = email;
    info.customer.phone = phone;
    console.log("info", info);
    console.log("clicked");
    // init();
  }
  setTimeout(() => {
    modalOverlay.style.display = "none";
    // modalContent.textContent = "Please fill all the required fields";
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches(".confirm-btn")) {
      e.preventDefault();
      confirmBooking();
    }
  });
});
