let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  let x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == x.length - 1) {
    document.querySelector(".wwf-nav-btn").style.display = "none";
    document.querySelector(".wwf-nav-indicators").style.display = "none";
  } else if (n == x.length - 2) {
    document.getElementById("nextBtn").innerHTML = "Donate";
  } else if (n == x.length - 3) {
    document.getElementById("nextBtn").innerHTML = "Go to payment";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  let x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("donationForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}

function emailValidate() {
  const email = $("#email").val();
  if (validateEmail(email)) {
    return true;
  } else {
    return false;
  }
}

function validatePhoneNumber() {
  const phoneNumber = $("#phoneNumber").val();
  const phonecheck = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phonecheck.test(phoneNumber);
  // if(phoneNumber.value.match(phonecheck)) {
  //   return true;
  // }
  // else {
  //   alert("message");
  //   return false;
  // }
  // const phoneNumber = $("#phoneNumber").val();
  // let re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  // return re.test(phoneNumber);
}

function alertInformation() {
  let firstName = document.querySelector(
    'input[name="customfields.firstName"]',
  ).value;
  let lastName = document.querySelector(
    'input[name="customfields.lastName"]',
  ).value;
  phoneNumber = document.querySelector(
    'input[name="customfields.phoneNumber"]',
  ).value;
  email = document.querySelector('input[name="customfields.email"]').value;
  let country = document.querySelector(
    'select[name="customfields.country"]',
  ).value;
  address1 = document.querySelector(
    'input[name="customfields.address1"]',
  ).value;
  address2 = document.querySelector(
    'input[name="customfields.address2"]',
  ).value;
  city = document.querySelector('input[name="customfields.city"]').value;
  state = document.querySelector('input[name="customfields.state"]').value;
  zipcode = document.querySelector('input[name="customfields.zipcode"]').value;

  let message;

  if (country == "US" || country == "GB") {
      message =
      "Your name: " +
      firstName +
      lastName +
      "\nYour phone number: " +
      phoneNumber +
      "\nYour email: " +
      email +
      "\nYour country: " +
      country;
      "\nYour address 1: " +
      address1;
      "\nYour address 2: " +
      address2;
      "\nYour city: " +
      city;
      "\nYour state: " +
      state;
      "\nYour zip code: " +
      zipcode;
  } else {
    message =
      "Your name: " +
      firstName +
      lastName +
      "\nYour phone number: " +
      phoneNumber +
      "\nYour email: " +
      email +
      "\nYour country: " +
      country;
  }

  return message;
}

function validateForm() {
  // This function deals with validation of the form fields
  let x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  let selectCountry = document.getElementById("SelectCountry");

  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      if (y[i].name == "otherAmount") {
        valid = true;
      } else {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    }
  }
  if (currentTab == 1) {
    if (selectCountry.value != "US" && selectCountry.value != "GB") {
      valid = true;
    }
    if (selectCountry.value == "") {
      valid = false;
      document.querySelector(
        ".informationTab__bottom .wwf-alert",
      ).style.display = "flex";
    } else {
      document.querySelector(
        ".informationTab__bottom .wwf-alert",
      ).style.display = "none";
    }
    if (emailValidate() == false) {
      valid = false;
      document.getElementById("wwf-email-alert").innerHTML =
        "This email field is required ";
      document.getElementById("wwf-email-alert").style.display = "block";
    } else {
      document.getElementById("wwf-email-alert").innerHTML = "";
      document.getElementById("wwf-email-alert").style.display = "none";
    }
    if (validatePhoneNumber() == false) {
      valid = false;
      document.getElementById("wwf-phone-alert").innerHTML =
        "This phone field is required ";
      document.getElementById("wwf-phone-alert").style.display = "block";
    } else {
      document.getElementById("wwf-phone-alert").innerHTML = "";
      document.getElementById("wwf-phone-alert").style.display = "none";
    }
    if (!$("#wwf-policy-agreement").is(":checked")) {
      valid = false;
      document.querySelector(".wwf-policy-agreement-nofication").style.display =
        "flex";
    } else {
      document.querySelector(".wwf-policy-agreement-nofication").style.display =
        "none";
    }
  }

  //valid = true;
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  if (currentTab == 1 && valid) {
    alert(alertInformation());
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

let countrySelected = false;

$(function () {
  //Changing currency and value of amount base on currency
  $("input[name='customfields.currency']:radio").change(function () {
    let seled = $("input[type='radio'][name='customfields.currency']:checked");
    seledVal = seled.val();

    if (seledVal == "AUD") {
      $("#amount1").next().html("<span class='currency'>AU$</span>15");
      $("#amount1").val("15");
      $("#amount2").next().html("<span class='currency'>AU$</span>70");
      $("#amount2").val("70");
      $("#amount3").next().html("<span class='currency'>AU$</span>140");
      $("#amount3").val("140");
      $("#amount4").next().html("<span class='currency'>AU$</span>500");
      $("#amount4").val("500");
    } else if (seledVal == "CAD") {
      $("#amount1").next().html("<span class='currency'>$</span>10");
      $("#amount1").val("10");
      $("#amount2").next().html("<span class='currency'>$</span>60");
      $("#amount2").val("60");
      $("#amount3").next().html("<span class='currency'>$</span>130");
      $("#amount3").val("130");
      $("#amount4").next().html("<span class='currency'>$</span>480");
      $("#amount4").val("480");
    } else if (seledVal == "CHF") {
      $("#amount1").next().html("<span class='currency'>CHF</span>10");
      $("#amount1").val("10");
      $("#amount2").next().html("<span class='currency'>CHF</span>50");
      $("#amount2").val("50");
      $("#amount3").next().html("<span class='currency'>CHF</span>100");
      $("#amount3").val("100");
      $("#amount4").next().html("<span class='currency'>CHF</span>350");
      $("#amount4").val("350");
    } else if (seledVal == "EUR") {
      $("#amount1").next().html("<span class='currency'>€</span>10");
      $("#amount1").val("10");
      $("#amount2").next().html("<span class='currency'>€</span>40");
      $("#amount2").val("40");
      $("#amount3").next().html("<span class='currency'>€</span>90");
      $("#amount3").val("90");
      $("#amount4").next().html("<span class='currency'>€</span>320");
      $("#amount4").val("320");
    } else if (seledVal == "GBP") {
      $("#amount1").next().html("<span class='currency'>£</span>5");
      $("#amount1").val("5");
      $("#amount2").next().html("<span class='currency'>£</span>30");
      $("#amount2").val("30");
      $("#amount3").next().html("<span class='currency'>£</span>60");
      $("#amount3").val("60");
      $("#amount4").next().html("<span class='currency'>£</span>250");
      $("#amount4").val("250");
    } else if (seledVal == "INR") {
      $("#amount1").next().html("<span class='currency'>₹</span>600");
      $("#amount1").val("600");
      $("#amount2").next().html("<span class='currency'>₹</span>3200");
      $("#amount2").val("3200");
      $("#amount3").next().html("<span class='currency'>₹</span>6500");
      $("#amount3").val("6500");
      $("#amount4").next().html("<span class='currency'>₹</span>24000");
      $("#amount4").val("24000");
    } else if (seledVal == "NZD") {
      $("#amount1").next().html("<span class='currency'>$</span>15");
      $("#amount1").val("15");
      $("#amount2").next().html("<span class='currency'>$</span>70");
      $("#amount2").val("70");
      $("#amount3").next().html("<span class='currency'>$</span>140");
      $("#amount3").val("140");
      $("#amount4").next().html("<span class='currency'>$</span>550");
      $("#amount4").val("550");
    } else if (seledVal == "SGD") {
      $("#amount1").next().html("<span class='currency'>S$</span>15");
      $("#amount1").val("15");
      $("#amount2").next().html("<span class='currency'>S$</span>70");
      $("#amount2").val("70");
      $("#amount3").next().html("<span class='currency'>S$</span>140");
      $("#amount3").val("140");
      $("#amount4").next().html("<span class='currency'>S$</span>500");
      $("#amount4").val("500");
    } else {
      $("#amount1").next().html("<span class='currency'>$</span>10");
      $("#amount1").val("10");
      $("#amount2").next().html("<span class='currency'>$</span>50");
      $("#amount2").val("50");
      $("#amount3").next().html("<span class='currency'>$</span>100");
      $("#amount3").val("100");
      $("#amount4").next().html("<span class='currency'>$</span>375");
      $("#amount4").val("375");
    }
  });
  //Changing text base on amount
  $("input[name='customfields.amount']:radio").change(function () {
    let amountOption = $("input[name='customfields.amount']:checked");
    amountOptionID = amountOption.attr("id");
    let desbyamount = document.querySelector(".wwf-des-for-amount");
    if (amountOptionID == "amount1") {
      desbyamount.innerHTML =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet in tortor nec sagittis. Etiam rhoncus eleifend quam vitae lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum tempor quam lacus, in hendrerit ";
    } else if (amountOptionID == "amount2") {
      desbyamount.innerHTML =
        "Nam placerat nulla eget mi maximus, eu finibus sapien feugiat. Proin elit odio, rutrum ut purus in, scelerisque tristique tortor. Etiam ornare eget neque ultrices posuere. Donec pharetra libero eleifend libero pellentesque, nec luctus lacus sagittis.";
    } else if (amountOptionID == "amount3") {
      desbyamount.innerHTML =
        "Fusce maximus, neque vitae suscipit elementum, erat justo sollicitudin orci, a feugiat nisl urna et lectus. Etiam tincidunt a lorem eu rhoncus.";
    } else if (amountOptionID == "amount4") {
      desbyamount.innerHTML =
        "Fusce mollis varius ligula, id maximus metus maximus finibus. Praesent laoreet dui eu finibus aliquet. Integer nec elementum quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    } else if (amountOptionID == "amount5") {
      desbyamount.innerHTML =
        "Sed euismod ligula neque, at maximus nisi lobortis eget. Curabitur sed sem id metus luctus pellentesque. Sed vehicula nulla ligula, ut tempor tortor tempor nec";
    }
  });
  // Detact empty field
  $(".informationTab input").blur(function () {
    if ($(this).val().length === 0) {
      $(this).parents("p").addClass("empty");
    } else {
      $(this).parents("p").removeClass("empty");
    }
  });
  $(".donationTab input").blur(function () {
    if ($(this).val().length === 0) {
      $(this).parents("label").addClass("empty");
    } else {
      $(this).parents("label").removeClass("empty");
    }
  });
  //Show address fields on US and GB
  $("select").on("change", function () {
    let countrySelected = this.value;
    if (countrySelected == "US" || countrySelected == "GB") {
      document.querySelector(".wwf-address-wrapper").style.display = "block";
    } else {
      document.querySelector(".wwf-address-wrapper").style.display = "none";
    }
  });
});

// Dropdown currency
let currency = document.querySelector("#currency.currency-dropdown");
if (currency) {
  currency.addEventListener("click", () => {
    if (currency.classList.contains("active")) {
      currency.classList.remove("active");
      currency.style.height = "60px";
    } else {
      currency.classList.add("active");
      currency.style.height = currency.childElementCount * 60 + "px";
    }
  });
}
