let dayField = document.forms[0].day;
let monthField = document.forms[0].month;
let yearField = document.forms[0].year;
let yearsSpan = document.querySelector(
  ".show-box:nth-child(1) .value"
);
let monthsSpan = document.querySelector(
  ".show-box:nth-child(2) .value"
);
let daysSpan = document.querySelector(
  ".show-box:nth-child(3) .value"
);
let submitButton = document.querySelector(".button");
let errorSpans = document.querySelectorAll(".error");
let inputBoxes = document.querySelectorAll(".input-box");

submitButton.addEventListener("click", () => {
  // Reset Errors
  errorSpans.forEach((error) =>
    error.classList.remove("active")
  );
  inputBoxes.forEach((box) =>
    box.classList.remove("active")
  );

  let done = false;
  let errorList = {
    year: [false],
    month: [false],
    day: [false],
  };

  // Validation
  if (!yearField.value) {
    errorList["year"] = [true, "required"];
  } else if (
    yearField.value < 1900 ||
    yearField.value > 2023
  ) {
    errorList["year"] = [true, "valid"];
  }

  if (!monthField.value) {
    errorList["month"] = [true, "required"];
  } else if (
    monthField.value < 1 ||
    monthField.value > 12
  ) {
    errorList["month"] = [true, "valid"];
  }

  if (!dayField.value) {
    errorList["day"] = [true, "required"];
  } else if (dayField.value < 1 || dayField.value > 31) {
    errorList["day"] = [true, "valid"];
  }

  Object.entries(errorList).forEach((entry) => {
    if (entry[1][0] == true) {
      document
        .querySelector(`.${entry[0]}`)
        .classList.add("active");
      if (entry[1][1] == "required") {
        document
          .querySelector(`.${entry[0]} .error.required`)
          .classList.add("active");
      } else if (entry[1][1] == "valid") {
        document
          .querySelector(`.${entry[0]} .error.valid`)
          .classList.add("active");
      }
    }
  });

  done = Object.values(errorList).every(
    (value) => value[0] == false
  );

  if (done) {
    let today = new Date();
    let birthday = `${yearField.value}-${monthField.value}-${dayField.value}`;
    let test = `${yearField.value}-${monthField.value}-${dayField.value}`;
    birthday = new Date(birthday);
    test =
      test.split("-")[2] == birthday.getDate()
        ? true
        : false;

    if (test) {
      let years =
        today.getFullYear() - birthday.getFullYear();
      let months = today.getMonth() - birthday.getMonth();
      let days = today.getDate() - birthday.getDate();
      if (days < 0) {
        months--;
        const previousMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );
        days += previousMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }
      yearsSpan.innerHTML = Math.trunc(years);
      monthsSpan.innerHTML = Math.trunc(months);
      daysSpan.innerHTML = Math.trunc(days);
    } else {
      // Reset Errors
      errorSpans.forEach((error) =>
        error.classList.remove("active")
      );
      inputBoxes.forEach((box) =>
        box.classList.remove("active")
      );
      document
        .querySelector(".day")
        .classList.add("active");
      document
        .querySelector(".day .valid-date")
        .classList.add("active");
    }
  }
});
