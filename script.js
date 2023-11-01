document.addEventListener("DOMContentLoaded", () => {
  const span = document.querySelectorAll(".slide-in");
  const mainImg = document.querySelector(".img-container");
  const startBtn = document.getElementById("start-game-btn");

  // Game assets
  const headphone = document.getElementById("headphone-drag");
  const wire = document.getElementById("wire-drag");
  const instructions = document.querySelector("h4");

  function animateElementWithDelay(element, delay, ...properties) {
    if (properties.length % 2 !== 0) {
      console.error(
        "Each parameter property should have a corresponding value."
      );
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

  // Each span within the h1 element will slide in
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
    let snapThreshold = 40;
    const audio = document.getElementById("song");
    const gif = document.getElementById("pepe-gif");

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

    /*  This function will do three things for every mouseup:
    remove drag and drop event listeners from the document,
    snap wire into place if near target location,
    and play music if the wire is in target location */
    function dragEnd(e) {
      e.preventDefault();

      document.removeEventListener("mousemove", dragMove);
      document.removeEventListener("mouseup", dragEnd);

      // Calculate distance to the headphone jack
      const targetX = 97;
      const targetY = 175;
      const currentX = parseInt(wire.style.left, 10);
      const currentY = parseInt(wire.style.top, 10);
      const distance = Math.sqrt(
        Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
      );

      // Check if the distance is within the snap threshold to snap element in position
      if (distance <= snapThreshold) {
        wire.style.left = targetX.toString() + "px";
        wire.style.top = targetY.toString() + "px";

        // Once element is in position, play music and show gif
        startTheParty();

        // Remove the drag function from wire
        wire.removeEventListener("mousedown", dragStart);
      }
    }

    function startTheParty() {
      audio.play();
      setTimeout(() => {
        gif.style.display = "block";
      }, 3500);
    }
  });
});
