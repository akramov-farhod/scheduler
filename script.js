// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const timeBlock = $(".time-block");
const currentTime = $("#currentTime");
const container = $("#containerID");
const today = dayjs();
const saveBtn = $(".saveBtn");
let save11btn = $("#11-btn");
const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
let timeBlocks = [];
// let currentHour = dayjs().format("HH");
let currentHour = dayjs().format("HH");

// $(".saveBtn").click(function () {
//   console.log("success");
// });
$(document).ready(function () {
  // display current [TIME, DAY-of-the-WEEK, MONTH-&-DATE, YEAR]
  currentTime.append(today.format("HH:mm dddd, MMMM DD, YYYY"));

  // iterate through workingHours array
  // to populate timeBlocks array which i will use to set classes.
  workingHours.forEach((hour) => {
    if (hour == currentHour) {
      timeBlocks.push({
        hour: hour,
        status: "present",
      });
    } else if (hour < currentHour) {
      timeBlocks.push({
        hour: hour,
        status: "past",
      });
    } else if (hour > currentHour && hour <= 17) {
      timeBlocks.push({
        hour: hour,
        status: "future",
      });
    } else {
      console.log(
        "You are trying to access the Scheduler outside of Working Hours"
      );
    }
    console.log(
      "Comparing --> " +
        hour +
        " <-- to Current Hour --> " +
        currentHour +
        " <--"
    );
  });
  console.log(timeBlocks);

  function testFunction() {
    if (`${localStorage.getItem(`${timeBlock.hour}-event`)}` == null) {
      return;
    } else {
      $(`#${timeBlock.hour}-text`).append(
        `${localStorage.getItem(`${timeBlock.hour}-event`)}`
      );
    }
  }

  // iterate through workingHoursStatys array
  // to populate HTML document with timeBlock divs
  // by adding class based on comparison of workingHour and currentHour
  // past present and future are possible outcomes
  timeBlocks.forEach((timeBlock) => {
    container.append(
      `<div id="${timeBlock.hour}" class="row time-block past ${
        timeBlock.status
      }">
    <div class="col-2 col-md-1 hour text-center py-3">${timeBlock.hour}:00</div>
    <textarea id="${
      timeBlock.hour
    }-text" class="col-8 col-md-10 description" rows="3">
    ${localStorage.getItem(`${timeBlock.hour}-event`)}
    </textarea>
    <button id="${
      timeBlock.hour
    }-btn" class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  </div>`
    );
  });

  // SAVE BUTTON click listener
  $(".saveBtn").on("click", function () {
    let parentID = $(this).parent().attr("id");
    let textAreaValue = $(`#${parentID}-text`).val();
    localStorage.setItem(`${parentID}-event`, textAreaValue);
    alert(`
    Event: ${textAreaValue}
    Time Slot: ${parentID}:00
    Has been SUCCESSFULLY saved to Local Storage!`);
    location.reload(true);
  });
});
