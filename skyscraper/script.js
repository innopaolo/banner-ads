document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const span = document.querySelectorAll(".slide-in");
  const mainImg = document.querySelector(".img-container");
  const startBtn = document.getElementById("start-game-btn");

  // Game assets
  const headphone = document.getElementById("headphone-drag");
  const wire = document.getElementById("wire-drag");
  const instructions = document.querySelector("h4");

  function animateElementWithDelay(element, delay, ...properties) {
    if (properties.length % 2 !== 0) {
      console.error("Each property should have a corresponding value.");
      return;
    }

    setTimeout(() => {
      for (let i = 0; i < properties.length; i += 2) {
        const property = properties[i];
        const value = properties[i + 1];
        element.style[property] = value;
      }
    }, delay);
  }

  let delay = 300;

  // Each span in h1 eLement will slide in
  span.forEach((el) => {
    animateElementWithDelay(el, delay, "left", "0", "opacity", "1");
    delay += 300;
  });

  // Show the headphones after all spans slide in
  animateElementWithDelay(mainImg, 2000, "opacity", "1");

  // Animate start game button
  animateElementWithDelay(
    startBtn,
    4000,
    "opacity",
    "1",
    "animation",
    "scaleDown 1s ease 0s 1 normal forwards"
  );

  // Starts game by hiding previous elements
  startBtn.addEventListener("click", () => {
    span.forEach((el) => {
      el.style.display = "none";
    });
    mainImg.style.display = "none";
    startBtn.style.display = "none";

    // Show game assets
    headphone.style.opacity = "1";
    wire.style.opacity = "1";
    instructions.style.opacity = "1";

    // Makes wire image draggable using custom drag and drop
    let cOffX = 0;
    let cOffY = 0;

    wire.addEventListener("mousedown", dragStart);

    function dragStart(e) {
      e.preventDefault();

      cOffX = e.clientX - wire.offsetLeft;
      cOffY = e.clientY - wire.offsetTop;

      document.addEventListener("mousemove", dragMove);
      document.addEventListener("mouseup", dragEnd);
    }

    function dragMove(e) {
      e.preventDefault();

      wire.style.top = (e.clientY - cOffY).toString() + "px";
      wire.style.left = (e.clientX - cOffX).toString() + "px";
    }

    function dragEnd(e) {
      e.preventDefault();

      document.removeEventListener("mousemove", dragMove);
      document.removeEventListener("mouseup", dragEnd);
    }
  });
});
