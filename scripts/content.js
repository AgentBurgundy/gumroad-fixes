(function () {
  console.log("Content script loaded");

  function initScrollHandler() {
    const footer = document.querySelector("main.discover > footer");
    if (!footer) {
      console.error("Footer element not found");
      return;
    }

    let lastScrollTop = 0;
    const scrollThreshold = 200;
    let ticking = false;

    console.log("Initial scroll position:", window.scrollY);

    function updateScroll() {
      console.log("Scroll update");
      const scrollTop = window.scrollY;
      console.log("Scrolled to:", scrollTop);

      if (scrollTop > scrollThreshold) {
        footer.classList.add("visible");
        if (scrollTop > lastScrollTop) {
          footer.classList.add("sticky");
        } else {
          footer.classList.remove("sticky");
        }
      } else {
        footer.classList.remove("visible");
        footer.classList.remove("sticky");
      }

      lastScrollTop = scrollTop;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    // Trigger initial check
    updateScroll();
  }

  // Run the init function after a short delay to ensure DOM is fully loaded
  setTimeout(initScrollHandler, 1000);
})();
