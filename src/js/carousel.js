const carousel = document.querySelector(".carousel");
const imgs = document.querySelectorAll("img");

const dist = { startX: 0, movementX: 0 };

function getClientX(e) {
  return e.clientX || e.touches[0].clientX;
}

function onStart(e) {
  carousel.addEventListener("mousemove", onMove);
  carousel.addEventListener("touchmove", onMove);

  dist.startX = getClientX(e);
}

function onMove(e) {
  const currentClientX = getClientX(e);

  carousel.scrollLeft += (dist.startX - currentClientX) / 30;

  dist.movementX = e.movementX;
}

function onEnd(e) {
  carousel.removeEventListener("mousemove", onMove);
  carousel.removeEventListener("touchmove", onMove);

  imgs.forEach((img) => {
    if (isImageNearCenter(img)) {
      centerImage(img);
    }
  });

  toggleImagePosition();
  centerElementSibling();
}

function toggleImagePosition() {
  const newImgsOrder = document.querySelectorAll("img");

  const rectCarousel = carousel.getBoundingClientRect();
  const firstImageRect = newImgsOrder[0].getBoundingClientRect();
  const lastImageRect =
    newImgsOrder[newImgsOrder.length - 1].getBoundingClientRect();

  if (dist.movementX < 0 && firstImageRect.right < rectCarousel.left) {
    moveFirstToLast(newImgsOrder);
  } else if (dist.movementX > 0 && lastImageRect.left > rectCarousel.right) {
    moveLastToFirst(newImgsOrder);
  }
}

function moveFirstToLast(order) {
  const firstImageWidth = order[0].offsetWidth;
  carousel.appendChild(order[0]);
  carousel.scrollLeft -= firstImageWidth;
}

function moveLastToFirst(order) {
  const LastImageWidth = order[0].offsetWidth;
  carousel.prepend(order[order.length - 1]);
  carousel.scrollLeft += LastImageWidth;
}

function isImageNearCenter(img) {
  const rectImage = img.getBoundingClientRect();
  const offset =
    img.offsetLeft +
    rectImage.width / 2 -
    carousel.scrollLeft -
    carousel.offsetWidth / 2;
  return offset >= -160 && offset <= 160;
}
function centerImage(img) {
  imgs.forEach((img) => img.classList.remove("center"));

  const imageRect = img.getBoundingClientRect();
  if (img) {
    carousel.scrollTo({
      top: 0,
      left: Math.round(
        img.offsetLeft + imageRect.width / 2 - carousel.offsetWidth / 2,
      ),
      behavior: "smooth",
    });
    img.classList.add("center");
  }
}

function centerElementSibling() {
  const imageCenter = document.querySelector(".center");

  if (!imageCenter) return;

  const offsetFromCenter = calculateOffsetFromCenter(imageCenter);

  if (offsetFromCenter > 160 || offsetFromCenter < -160) {
    if (dist.movementX < 0 && imageCenter.nextElementSibling) {
      centerImage(imageCenter.nextElementSibling);
    } else if (dist.movementX > 0 && imageCenter.previousElementSibling) {
      centerImage(imageCenter.previousElementSibling);
    }
  }
}

function calculateOffsetFromCenter(img) {
  const rectImage = img.getBoundingClientRect();

  return (
    img.offsetLeft +
    rectImage.width / 2 -
    carousel.scrollLeft -
    carousel.offsetWidth / 2
  );
}

carousel.addEventListener("mousedown", onStart);
carousel.addEventListener("touchstart", onStart);

carousel.addEventListener("mouseup", onEnd);
carousel.addEventListener("touchend", onEnd);

moveLastToFirst(imgs);
centerImage(imgs[0]);
