const main = document.querySelector(".main-content__result");
import { services, staffs } from "./data.js";
// import { select } from "./index.js";

export function select(key, id) {
  console.log("key");
  //   const allStaffElements = document.querySelectorAll(".staff");
  //   allStaffElements.forEach((staff) =>
  //     staff.addEventListener("click", () => {
  //       const activeStaff = document.querySelector(".active-staff");
  //       if (activeStaff) {
  //         activeStaff.classList.remove("active-staff");
  //       }
  //       staff.classList.add("active-staff");
  //       info.service_id = staff.dataset.id;
  //       mainContent("Service");
  //       nextStep();
  //     })
  //   );
}
export function mainContent(key) {
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
      content = `
      <div data-name="date" class="option main-content__date">
      <div class="main-content-left"></div>
      <div class="main-content-right">
        <h2>Time</h2>
        <div class="selection-time">
          <div>Select Time</div>
          <div class="available-times"></div>
        </div>
      </div>
    </div>
      `;

      break;
  }
  main.innerHTML = content;
  select();
}
