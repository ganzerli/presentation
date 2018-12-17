document.addEventListener("DOMContentLoaded", () => {
  const sections = [...document.querySelectorAll("section")];
  //take all the offset top of the sections;
  const offsets = [...sections].map(sec => sec.offsetTop);
  const titles = document.querySelectorAll(".section-title");
  // cut out the first 2 sections, are without title
  const SECTIONSTOCUT = 2;
  offsets.splice(0, SECTIONSTOCUT);
  sections.splice(0, SECTIONSTOCUT);

  // on load check if the page is at begin
  const firstOffsetCheck = window.pageYOffset;
  const lock = firstOffsetCheck < 80 ? true : false;
  // get viewport height
  const viewportHeight = window.innerHeight;
  let scrollCounter = 0;
  const free = () => {
    if (scrollCounter > 10) {
      return true;
    } else {
      return false;
    }
    return;
  };
  window.onscroll = () => {
    getOffset();

    if (lock) {
      if (free()) {
        animate(offsets, titles, viewportHeight);
        scrollcounter = 0;
      }
    }
    scrollCounter++;
  };
});

const getOffset = () => {
  const content = document.querySelector(".header-container");
  let offset = window.pageYOffset;
  if (content) {
    content.style.transform = `translateY(${offset}px)`;
  }
};

let indexToCheck = 0;
const animate = (offsets, titles, viewportHeight) => {
  let offsetYnow = window.pageYOffset;
  // set next hitpoint
  const span = viewportHeight;
  // if the bottom of the window hits the title this one get
  if (span + offsetYnow > offsets[indexToCheck]) {
    titles[indexToCheck].classList.add("anim-up");
    indexToCheck++;
  } else {
    false;
  }
};
