// sets proper fullscreen height for mobile
vhCheck();

// scrolls to bottom to ensure form is visible when filling inputs on mobile
document.querySelectorAll("input").forEach((input) => {
   if (window.clientWidth < 420 && !["confirm", "password"].includes(input.id)) {
      input.addEventListener("focus", () => {
         setTimeout(() => {
            window.scrollBy(0, window.innerHeight);
         }, 150);
      });
   }
});

// sets blur filter to the outside of the content container on desktop
function setBlurMask() {
   const main = document.querySelector("main");
   const size = main.getBoundingClientRect();
   const blur = document.querySelector(".blur");
   const blurSize = blur.getBoundingClientRect();
   const topPercent = (size.top / blurSize.height) * 100 + "%";
   const leftPercent = (size.left / blurSize.width) * 100 + "%";
   const bottomPercent = (size.bottom / blurSize.height) * 100 + "%";
   const rightPercent = (size.right / blurSize.width) * 100 + "%";
   document
      .querySelector(":root")
      .style.setProperty(
         "--mask",
         `polygon(0% 0%, 0% 100%, ${leftPercent} 100%, ${leftPercent} ${topPercent}, ${rightPercent} ${topPercent}, ${rightPercent} ${bottomPercent}, ${leftPercent} ${bottomPercent}, ${leftPercent} 100%, 100% 100%, 100% 0%)`
      );
}

// sets width and properly centers the password strength meter
function placeStrengthMeter() {
   const indicator = document.querySelector(".indicator");
   const inputEl = document.querySelector("#password");
   indicator.style.width = inputEl.clientWidth * 0.4 + "px";
   indicator.style.right = parseFloat(window.getComputedStyle(inputEl).paddingRight) + 5 + "px";
}

window.addEventListener("resize", () => {
   setBlurMask();
   placeStrengthMeter();
});
setBlurMask();
placeStrengthMeter();

// highlight form field on focus
document.querySelectorAll(".input-group").forEach((group) => {
   group.addEventListener("focusin", (event) => {
      const target = event.currentTarget;
      target.classList.add("active");
      target.children[1].classList.add("active")

      // show strength indicator when password field selected
      if (target.children[1].id === "password") {
         document.querySelector(".indicator").classList.remove("hide");
      }
   });

   group.addEventListener("focusout", (event) => {
      const target = event.currentTarget;
      target.classList.remove("active");
      target.children[1].classList.remove("active");
      validateInput(target.children[1]);
      document.querySelector(".indicator").classList.add("hide");

      // turns button green when form is considered valid
      if ([...document.querySelectorAll("input")].every((input) => input.classList.contains("valid"))) {
         document.querySelector("button").classList.add("strong");
      } else if (document.querySelector("button").classList.contains("strong")) {
         document.querySelector("button").classList.remove("strong")
      }
   });
});

// checks password strength and fills strength bar
document.querySelector("#password").addEventListener("input", (event) => {
   const strength = testStrength(event.target.value);
   switch (strength) {
      case "strong":
         document.querySelector(".strong").classList.remove("transparent");
         document.querySelector(".medium").classList.remove("transparent");
         break;
      case "medium":
         document.querySelector(".strong").classList.add("transparent");
         document.querySelector(".medium").classList.remove("transparent");
         break;
      case "weak":
         document.querySelector(".strong").classList.add("transparent");
         document.querySelector(".medium").classList.add("transparent");
         break;
   }
})

function testStrength(password) {
   const passwordTest = passwordStrengthTest.test(password);
   console.log(passwordTest)
   if (passwordTest.strong) {
      return "strong";
   }
   if (password.length > 7 && passwordTest.passedTests.length > 3) {
      return "medium";
   }
   return "weak";
   
}

function validateInput(input) {
   const { id, value } = input;
   input.classList.remove("valid", "invalid");
   let valid = false;
   switch (id) {
      case "name":
         valid = /^\S.*/.test(value);
         break;
      case "email":
         valid = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/.test(value);
         break;
      case "password":
         valid = testStrength(value) !== "weak";
         break;
      case "confirm":
         valid = value && value === document.querySelector("#password").value;
         break;
   }
   console.log(valid)
   input.classList.add(valid ? "valid" : "invalid");
}