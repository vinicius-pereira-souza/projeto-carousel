const slide = document.querySelector(".slide-wrapper");
const imgs = document.querySelectorAll("img");

const dist = {
  finalPosition: 0,
  startX: 0,
  movement: 0,
};

function onStart(e) {
  slide.addEventListener("mousemove", onMove);
  slide.addEventListener("touchmove", onMove);

  if (e.type == "touchstart") {
    dist.startX = e.touches[0].clientX;
  } else {
    dist.startX = e.clientX;
  }
}

function onMove(e) {
  let currentClietX;
  let velocity;

  if (e.type == "touchmove") {
    currentClietX = e.touches[0].clientX;
    velocity = 60;
  } else {
    currentClietX = e.clientX;
    velocity = 48;
  }

  slide.scrollLeft =
    slide.scrollLeft + (dist.startX - currentClietX) / velocity;
}
function onEnd(e) {
  slide.removeEventListener("mousemove", onMove);
  slide.removeEventListener("touchmove", onMove);

  if (!(slide.scrollLeft <= 0)) {
    if (e.type == "touchend") {
      dist.finalPosition = e.changedTouches[0].clientX;
    } else {
      dist.finalPosition = e.clientX;
    }

    dist.movement = dist.finalPosition - dist.startX;
  }
}

slide.addEventListener("mousedown", onStart);
slide.addEventListener("mouseup", onEnd);
slide.addEventListener("mouseleave", onEnd);

slide.addEventListener("touchstart", onStart);
slide.addEventListener("touchend", onEnd);

// img.dataset.wrapper = "center";
