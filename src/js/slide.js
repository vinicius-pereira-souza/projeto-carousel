const slide = document.querySelector(".slide-wrapper");
const imgs = document.querySelectorAll("img");

const dist = {
  finalPosition: 0,
  startX: 0,
  movement: 0,
  side: 0,
};

function onStart(e) {
  slide.addEventListener("mousemove", onMove);
  slide.addEventListener("touchmove", onMove);

  if (e.type == "touchstart") {
    dist.startX = e.touches[0].clientX;
  } else {
    dist.startX = e.clientX;
  }

  imgs.forEach((img) => img.classList.remove("centerImgSlide"));
}

function onMove(e) {
  let currentClietX;
  let velocity;

  if (e.type == "touchmove") {
    currentClietX = e.touches[0].clientX;
    velocity = 60;
  } else {
    currentClietX = e.clientX;
    velocity = 26;
  }

  slide.scrollLeft =
    slide.scrollLeft + (dist.startX - currentClietX) / velocity;

  dist.side = e.movementX;
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

  if (e.type !== "mouseleave") centerImage();
}

function centerImage() {
  const centerContainer = slide.offsetWidth / 2;

  imgs.forEach((img, i) => {
    const rect = img.getBoundingClientRect();
    if (
      img.offsetLeft + rect.width / 2 - slide.scrollLeft - centerContainer <=
        40 &&
      img.offsetLeft + rect.width / 2 - slide.scrollLeft - centerContainer >=
        -40
    ) {
      slide.scrollTo({
        top: 0,
        left: img.offsetLeft + rect.width / 2 - centerContainer,
        behavior: "smooth",
      });

      img.classList.add("centerImgSlide");
    } else {
      // const rect = img.getBoundingClientRect();
      // if (dist.side <= 0) {
      //   slide.scrollTo({
      //     top: 0,
      //     left:
      //       img.nextElementSibling.offsetLeft +
      //       rect.width / 2 -
      //       centerContainer,
      //     behavior: "smooth",
      //   });
      // } else {
      //   slide.scrollTo({
      //     top: 0,
      //     left:
      //       img.previousElementSibling.nextElementSibling.offsetLeft +
      //       rect.width / 2 -
      //       centerContainer,
      //     behavior: "smooth",
      //   });
      // }
    }
  });
}

slide.addEventListener("mousedown", onStart);
slide.addEventListener("mouseup", onEnd);
slide.addEventListener("mouseleave", onEnd);

slide.addEventListener("touchstart", onStart);
slide.addEventListener("touchend", onEnd);

// img.dataset.wrapper = "center";
