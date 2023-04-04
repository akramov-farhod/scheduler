// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const saveBtn = $(".saveBtn");
const timeBlock = $(".time-block");
const currentTime = $("#currentTime");
const container = $("#containerID");
const today = dayjs();
const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
let timeBlocks = [];
let currentHour = dayjs().format("HH");

$(document).ready(() => {
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
  // iterate through workingHoursStatys array
  // to populate HTML document with timeBlock divs
  // by adding class based on comparison of workingHour and currentHour
  // past present and future are possible outcomes
  timeBlocks.forEach((timeBlock) => {
    container.append(
      `<div id=${timeBlock.hour} class="row time-block past ${timeBlock.status}">
    <div class="col-2 col-md-1 hour text-center py-3">${timeBlock.hour}:00</div>
    <textarea class="col-8 col-md-10 description" rows="3">
    </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  </div>`
    );
  });
});

// test code snippet
// saveBtn.css({ color: "red", background: "darkgray" });

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

// `<div id=${timeblock.hour} class="row time-block past ${timeblock.status}">
//   <div class="col-2 col-md-1 hour text-center py-3">${timeblock.hour}:00</div>
//   <textarea class="col-8 col-md-10 description" rows="3">
//     {" "}
//   </textarea>
//   <button class="btn saveBtn col-2 col-md-1" aria-label="save">
//     <i class="fas fa-save" aria-hidden="true"></i>
//   </button>
// </div>`;
