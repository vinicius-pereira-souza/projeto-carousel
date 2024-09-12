const carousel = document.querySelector(".carousel");
const imgs = document.querySelectorAll("img");

const dist = { startX: 0, movementX: 0 };

function onStart(e) {
  carousel.addEventListener("mousemove", onMove);

  dist.startX = e.clientX;
}

function onMove(e) {
  carousel.scrollLeft += (dist.startX - e.clientX) / 20;

  dist.movementX = e.movementX;
}

function onEnd(e) {
  carousel.removeEventListener("mousemove", onMove);

  imgs.forEach((img) => {
    const rectImage = img.getBoundingClientRect();
    if (
      img.offsetLeft +
        rectImage.width / 2 -
        carousel.scrollLeft -
        carousel.offsetWidth / 2 <=
        160 &&
      img.offsetLeft +
        rectImage.width / 2 -
        carousel.scrollLeft -
        carousel.offsetWidth / 2 >=
        -160
    ) {
      centerImage(img);
    }
  });

  const newOrderImage = document.querySelectorAll("img");
  const rectCarousel = carousel.getBoundingClientRect();
  const firstImageRect = newOrderImage[0].getBoundingClientRect();
  const lastImageRect = newOrderImage[imgs.length - 1].getBoundingClientRect();

  if (dist.movementX < 0 && firstImageRect.right < rectCarousel.left) {
    moveFirstToLast(newOrderImage);
  } else if (dist.movementX > 0 && lastImageRect.left > rectCarousel.right) {
    moveLastToFirst(newOrderImage);
  }
}

function moveFirstToLast(order) {
  carousel.appendChild(order[0]);
  carousel.scrollLeft -= order[0].offsetWidth;
}

function moveLastToFirst(order) {
  carousel.prepend(order[order.length - 1]);
  carousel.scrollLeft += order[0].offsetWidth;
}

function centerImage(img) {
  const imageRect = img.getBoundingClientRect();
  if (img) {
    carousel.scrollTo({
      top: 0,
      left: Math.round(
        img.offsetLeft + imageRect.width / 2 - carousel.offsetWidth / 2,
      ),
      behavior: "smooth",
    });
  }
}

carousel.addEventListener("mousedown", onStart);
carousel.addEventListener("mouseup", onEnd);
moveLastToFirst(imgs);
centerImage(imgs[0]);
