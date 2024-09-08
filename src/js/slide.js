const slide = document.querySelector(".slide-wrapper");
const imgs = document.querySelectorAll("img");

const dist = {
  finalPosition: 0,
  startX: 0,
  movement: 0,
};
let activeSlide = false;
const img = imgs[imgs.length - 1];

function onStart(e) {
  activeSlide = true;

  dist.startX = e.clientX || e.touches[0].clientX;

  slide.scrollLeft = slide.scrollLeft;
}

function onMove(e) {
  if (!activeSlide) return;

  let currentClietX;
  let velocity;

  if (e.type == "touchmove") {
    currentClietX = e.touches[0].clientX;
    velocity = 60;
  } else {
    currentClietX = e.clientX;
    velocity = 46;
  }

  slide.scrollLeft =
    slide.scrollLeft + (dist.startX - currentClietX) / velocity;
}
function onEnd(e) {
  activeSlide = false;

  if (!(slide.scrollLeft <= 0)) {
    if (e.type == "touchmove") {
      dist.finalPosition = e.changedTouches[0].clientX;
    } else {
      dist.finalPosition = e.clientX;
    }

    dist.movement = dist.finalPosition - dist.startX;
  }
}

slide.addEventListener("mousedown", onStart);
slide.addEventListener("mousemove", onMove);
slide.addEventListener("mouseup", onEnd);

slide.addEventListener("touchstart", onStart);
slide.addEventListener("touchmove", onMove);
slide.addEventListener("touchend", onEnd);
