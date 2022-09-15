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

function validateForm() {
  // This function deals with validation of the form fields
  let x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  // for (i = 0; i < y.length; i++) {
  //   // If a field is empty...
  //   if (y[i].value == "") {
  //     // add an "invalid" class to the field:
  //     y[i].className += " invalid";
  //     // and set the current valid status to false:
  //     valid = false;
  //   }
  // }
  valid = true;
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
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

// function addingActive() {
//     $(".btn-group > .btn").click(function(){
//         $(".btn-group > .btn").removeClass("active");
//         $(this).addClass("active");
//     });
// }

let countrySelected = false;

$(function () {
  $("input[name='customfields.currency']:radio").change(function () {
    let seled = $("input[type='radio'][name='customfields.currency']:checked");
    seledVal = seled.val();
    console.log(seled);

    if (seledVal == "AUD") {
      $("#amount1").next().html("<span class='currency'>AU$</span> 15");
      $("#amount1").val("15");
      $("#amount2").next().html("<span class='currency'>AU$</span> 70");
      $("#amount2").val("70");
      $("#amount3").next().html("<span class='currency'>AU$</span> 140");
      $("#amount3").val("140");
      $("#amount4").next().html("<span class='currency'>AU$</span> 500");
      $("#amount4").val("500");
    } else if (seledVal == "CAD") {
      $("#amount1").next().html("<span class='currency'>$</span> 10");
      $("#amount1").val("10");
      $("#amount2").next().html("<span class='currency'>$</span> 60");
      $("#amount2").val("60");
      $("#amount3").next().html("<span class='currency'>$</span> 130");
      $("#amount3").val("130");
      $("#amount4").next().html("<span class='currency'>$</span> 480");
      $("#amount4").val("480");
    } else if (seledVal == "CHF") {
      $("#amount1").next().html("<span class='currency'>CHF</span> 10");
      $("#amount1").val("10");
      $("#amount2").next().html("<span class='currency'>CHF</span> 50");
      $("#amount2").val("50");
      $("#amount3").next().html("<span class='currency'>CHF</span> 100");
      $("#amount3").val("100");
      $("#amount4").next().html("<span class='currency'>CHF</span> 350");
      $("#amount4").val("350");
    } else if (seledVal == "EUR") {
      $("#amount1").next().html("<span class='currency'>€</span> 10");
      $("#amount1").val("10");
      $("#amount2").next().html("<span class='currency'>€</span> 40");
      $("#amount2").val("40");
      $("#amount3").next().html("<span class='currency'>€</span> 90");
      $("#amount3").val("90");
      $("#amount4").next().html("<span class='currency'>€</span> 320");
      $("#amount4").val("320");
    } else if (seledVal == "GBP") {
      $("#amount1").next().html("<span class='currency'>£</span> 5");
      $("#amount1").val("5");
      $("#amount2").next().html("<span class='currency'>£</span> 30");
      $("#amount2").val("30");
      $("#amount3").next().html("<span class='currency'>£</span> 60");
      $("#amount3").val("60");
      $("#amount4").next().html("<span class='currency'>£</span> 250");
      $("#amount4").val("250");
    } else if (seledVal == "INR") {
      $("#amount1").next().html("<span class='currency'>₹</span> 600");
      $("#amount1").val("600");
      $("#amount2").next().html("<span class='currency'>₹</span> 3200");
      $("#amount2").val("3200");
      $("#amount3").next().html("<span class='currency'>₹</span> 6500");
      $("#amount3").val("6500");
      $("#amount4").next().html("<span class='currency'>₹</span> 24000");
      $("#amount4").val("24000");
    } else if (seledVal == "NZD") {
      $("#amount1").next().html("<span class='currency'>$</span> 15");
      $("#amount1").val("15");
      $("#amount2").next().html("<span class='currency'>$</span> 70");
      $("#amount2").val("70");
      $("#amount3").next().html("<span class='currency'>$</span> 140");
      $("#amount3").val("140");
      $("#amount4").next().html("<span class='currency'>$</span> 550");
      $("#amount4").val("550");
    } else if (seledVal == "SGD") {
      $("#amount1").next().html("<span class='currency'>S$</span> 15");
      $("#amount1").val("15");
      $("#amount2").next().html("<span class='currency'>S$</span> 70");
      $("#amount2").val("70");
      $("#amount3").next().html("<span class='currency'>S$</span> 140");
      $("#amount3").val("140");
      $("#amount4").next().html("<span class='currency'>S$</span> 500");
      $("#amount4").val("500");
    } else {
      $("#amount1").next().html("<span class='currency'>$</span> 10");
      $("#amount1").val("10");
      $("#amount2").next().html("<span class='currency'>$</span> 50");
      $("#amount2").val("50");
      $("#amount3").next().html("<span class='currency'>$</span> 100");
      $("#amount3").val("100");
      $("#amount4").next().html("<span class='currency'>$</span> 375");
      $("#amount4").val("375");
    }
  });
  $("input[name='customfields.amount']:radio").change(function () {
    let amountOption = $(
      "input[name='customfields.amount']:checked",
    );
    amountOptionID = amountOption.attr("id");
    let desbyamount = document.querySelector(".wwf-des-for-amount");
    console.log(amountOptionID);
    if (amountOptionID == "amount1") {
      desbyamount.innerHTML = "text amount 1";
    } else if (amountOptionID == "amount2") {
      desbyamount.innerHTML = "text amount 2";
    } else if (amountOptionID == "amount3") {
      desbyamount.innerHTML = "text amount 3";
    } else if (amountOptionID == "amount4") {
      desbyamount.innerHTML = "text amount 4";
    } else if (amountOptionID == "amount5") {
      desbyamount.innerHTML = "text amount 5";
    }
  });

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
  $("select").on("change", function () {
    let countrySelected = this.value;
    if (countrySelected == "US" || countrySelected == "UK") {
      document.querySelector(".wwf-address-wrapper").style.display = "block";
    } else {
      document.querySelector(".wwf-address-wrapper").style.display = "none";
    }
  });
});

