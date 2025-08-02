export const startSlider = () => {
  let curPage = 1;
  const pages = document.querySelectorAll(".skw-page");
  const numOfPages = pages.length;
  const animTime = 1000;
  let scrolling = false;

  function pagination() {
    scrolling = true;

    pages.forEach((page, index) => {
      const pageNum = index + 1;
      if (pageNum === curPage) {
        page.classList.remove("inactive");
        page.classList.add("active");
      } else if (pageNum === curPage - 1) {
        page.classList.add("inactive");
      } else {
        page.classList.remove("active");
      }
    });

    setTimeout(() => {
      scrolling = false;
    }, animTime);
  }

  function navigateUp() {
    if (curPage === 1 || scrolling) return;
    curPage--;
    pagination();
  }

  function navigateDown() {
    if (curPage === numOfPages || scrolling) return;
    curPage++;
    pagination();
  }

  // Обработка колесика мыши
  document.addEventListener("wheel", function (e) {
    if (scrolling) return;

    if (e.deltaY < 0) {
      navigateUp();
    } else {
      navigateDown();
    }
  });

  // Обработка стрелок на клавиатуре
  document.addEventListener("keydown", function (e) {
    if (scrolling) return;

    if (e.key === "ArrowUp") {
      navigateUp();
    } else if (e.key === "ArrowDown") {
      navigateDown();
    }
  });

  // Обработка одиночного и двойного тапа
  let lastTapTime = 0;
  let tapTimeout = null;
  let touchStartX = 0;
  let touchStartY = 0;
  let moved = false;
  const maxTapDelay = 300; // мс
  const maxMoveDistance = 10; // px

  document.addEventListener("touchstart", (e) => {
    moved = false;
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  });

  document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartX);
    const dy = Math.abs(touch.clientY - touchStartY);
    if (dx > maxMoveDistance || dy > maxMoveDistance) {
      moved = true;
      clearTimeout(tapTimeout);
      tapTimeout = null;
    }
  });

  document.addEventListener("touchend", (e) => {
    if (moved || scrolling) return;

    const now = Date.now();
    const timeSinceLastTap = now - lastTapTime;

    if (timeSinceLastTap < maxTapDelay) {
      clearTimeout(tapTimeout);
      tapTimeout = null;
      lastTapTime = 0;

      navigateUp(); // двойной тап — вверх
    } else {
      lastTapTime = now;

      tapTimeout = setTimeout(() => {
        navigateDown(); // одиночный тап — вниз
        tapTimeout = null;
      }, maxTapDelay);
    }
  });
};
