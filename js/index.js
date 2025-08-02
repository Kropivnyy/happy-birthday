import { startSlider } from "./slider.js";
import { debounce } from "./debounce.js";
import "./neon-heart.js";

let REFS = {
  root: document.documentElement,
  page: document.querySelector(".js-page"),
  heroSection: document.querySelector(".js-hero-section"),
  startButton: document.querySelector(".js-start-btn"),
};

const showContent = () => {
  if (!REFS) return;

  REFS.page?.classList.add("visible");
};

const setSkewPercent = () => {
  const ratio = window.innerHeight / window.innerWidth;
  const percent = -30.97 * ratio - 3.3;
  REFS.root.style.setProperty("--skewed-shift", `${percent}%`);
};

const assignVhCssVariable = () => {
  const vh = window.innerHeight * 0.01;
  REFS.root.style.setProperty("--vh", `${vh}px`);
};

const onResize = () => {
  assignVhCssVariable();
  setSkewPercent();
};

const onResizeDebounced = debounce(onResize, 300);

const init = () => {
  REFS.heroSection.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
  });

  REFS.startButton.addEventListener("click", (e) => {
    REFS.heroSection.classList.add("hidden");
    setTimeout(() => {
      REFS.heroSection.classList.add("removed");
    }, 1000);

    startSlider();
  });

  onResize();
  window.addEventListener("resize", onResizeDebounced);

  setTimeout(() => {
    showContent();
  }, 1000);
};

window.addEventListener("DOMContentLoaded", init);
