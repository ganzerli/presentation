const container = document.querySelector(".carousel-container");
const items = document.querySelectorAll(".carousel-item");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
//to make it smoother the last and the first get copied and put back and before the set slider
const last = items[items.length - 1];
const first = items[0];
const width = first.clientWidth;

//making a new element with the new markup,  --> set last before first
let newElement = last.outerHTML;
// copy all the other elements one after another
items.forEach(x => {
  newElement += x.outerHTML;
});
//add last piece at the end
newElement += first.outerHTML;
// giving the container another new ban
container.innerHTML = newElement;
//set the container back to the first div
container.style.transform = `translateX(${width * -1}px)`;
container.style.transition = "transform 0.8s ease";

let free = true;
let prevOn = false;
let nextOn = true;
let counter = 1;

document.addEventListener("DOMContentLoaded", () => {
  goSlide();
});

prev.addEventListener("mousedown", () => {
  if (free) {
    free = false;
    if (counter < 1) {
      counter++;
    } else {
      increment();
      prevOn = true;
      nextOn = false;
    }
  }
});

next.addEventListener("mousedown", () => {
  if (free) {
    free = false;
    if (counter >= items.length) {
      counter--;
    } else {
      decrement();
      nextOn = true;
      prevOn = false;
    }
  }
});

container.addEventListener("transitionend", () => {
  setBack();
  setTimeout(() => {
    free = true;
  }, 20);
});

const decrement = () => {
  counter++;
  if (counter > items.length) {
    counter = items.length;
    container.style.transform = `translateX(-${width * counter}px)`;
  } else {
    container.style.transform = `translateX(-${width * counter}px)`;
  }
};

const increment = () => {
  counter--;
  if (counter < 0) {
    container.style.transform = `translateX(0px)`;
    counter = items.length;
  } else {
    container.style.transform = `translateX(-${counter * width}px)`;
  }
};

const setBack = () => {
  if (counter >= items.length) {
    container.style.transition = "none";
    container.style.transform = `translateX(0px)`;
    setTimeout(() => {
      container.style.transition = "transform 0.8s ease";
      counter = 0;
    }, 50);
  } else if (counter < 1) {
    container.style.transition = "none";
    counter = items.length;
    container.style.transform = `translateX(-${width * counter}px)`;
    setTimeout(() => {
      container.style.transition = "transform 0.8s ease";
    }, 50);
  }
};

const goSlide = () => {
  setTimeout(() => {
    if (prevOn) {
      increment();
    } else if (nextOn) {
      decrement();
    }
    goSlide();
  }, 2136);
};
