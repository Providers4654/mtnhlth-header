function initHeader() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeButton = document.querySelector(".close-menu");
  const dropdownButtons = document.querySelectorAll("#mobile-menu button");

  // Wait for elements to exist before binding events
  if (!hamburger || !mobileMenu) {
    console.log("⏳ Waiting for header elements...");
    setTimeout(initHeader, 200);
    return;
  }

  console.log("✅ Header elements found — initializing menu.");

  // ====== MOBILE MENU FUNCTIONALITY ======
  hamburger.addEventListener("click", () => {
    console.log("☰ clicked!");
    mobileMenu.classList.toggle("active");
  });

  closeButton?.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      mobileMenu.classList.remove("active");
    }
  });

  // Toggle submenus in mobile menu
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const targetId = button.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      targetContent?.classList.toggle("show");
    });
  });

  // ====== MOVE HEADER OUTSIDE SITEWRAPPER ======
  const moveHeader = () => {
    const mtnHeader = document.querySelector(".mtn-header");
    const siteWrapper = document.getElementById("siteWrapper");
    const body = document.querySelector("body");

    if (mtnHeader && siteWrapper && body) {
      body.insertBefore(mtnHeader, siteWrapper);
      console.log("Moved .mtn-header outside #siteWrapper");
    } else {
      setTimeout(moveHeader, 100);
    }
  };

  moveHeader();
  console.log("✅ Mobile header fully initialized");
}

initHeader();
