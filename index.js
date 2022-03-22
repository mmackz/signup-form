// sets proper fullscreen height for mobile
vhCheck();

// scrolls to bottom to ensure form is visible when filling inputs
document.querySelectorAll("input").forEach((input) => {
   if (!["confirm", "password"].includes(input.id)) {
      input.addEventListener("focus", () => {
         setTimeout(() => {
            window.scrollBy(0, window.innerHeight);
         }, 150);
      });
   }
});

window.addEventListener("resize", () => {
   const main = document.querySelector("main");
   const size = main.getBoundingClientRect();
   const blur = document.querySelector(".blur");
   const blurSize = blur.getBoundingClientRect();
   const topPercent = (size.top / blurSize.height) * 100 + "%";
   const leftPercent = (size.left / blurSize.width) * 100 + "%";
   const bottomPercent = (size.bottom / blurSize.height) * 100 + "%";
   const rightPercent = (size.right / blurSize.width) * 100 + "%";
   console.log(blurSize);
   console.log(size);
   console.log(leftPercent);
   document
      .querySelector(":root")
      .style.setProperty(
         "--mask",
         `polygon(0% 0%, 0% 100%, ${leftPercent} 100%, ${leftPercent} ${topPercent}, ${rightPercent} ${topPercent}, ${rightPercent} ${bottomPercent}, ${leftPercent} ${bottomPercent}, ${leftPercent} 100%, 100% 100%, 100% 0%)`
      );
});
