let REFS = {
  page: document.querySelector(".js-page"),
};

const showContent = () => {
  if (!REFS) return;

  REFS.page?.classList.add("visible");
};

const init = () => {
  //   REFS = {
  //     page: document.querySelector(".js-page"),
  //   };
  setTimeout(() => {
    showContent();
  }, 1000);
};

window.addEventListener("DOMContentLoaded", init);
