// sets proper fullscreen height for mobile
vhCheck();

// scrolls to bottom to ensure form is visible when filling inputs
document.querySelectorAll("input").forEach((input) => {
   if (!["confirm", "password"].includes(input.id)) {
      input.addEventListener("focus", () => {
         setTimeout(() => {
            window.scrollBy(0, window.innerHeight);
         }, 150)   
      })
   }
})