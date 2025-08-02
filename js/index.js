import "./slider.js";
import { debounce } from "./debounce.js";

let REFS = {
  root: document.documentElement,
  page: document.querySelector(".js-page"),
};

const showContent = () => {
  if (!REFS) return;

  REFS.page?.classList.add("visible");
};

const setSkewPercent = () => {
  const ratio = window.innerHeight / window.innerWidth;
  const percent = -30.97 * ratio - 3.18;
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
  //   REFS = {
  //     page: document.querySelector(".js-page"),
  //   };
  onResize();
  window.addEventListener("resize", onResizeDebounced);

  setTimeout(() => {
    showContent();
  }, 1000);
};

window.addEventListener("DOMContentLoaded", init);
