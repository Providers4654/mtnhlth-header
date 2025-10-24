function initHeader() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeButton = document.querySelector(".close-menu");
  const dropdownButtons = document.querySelectorAll("#mobile-menu button");

  if (!hamburger || !mobileMenu) {
    console.log("⏳ Waiting for header elements...");
    setTimeout(initHeader, 200);
    return;
  }

  console.log("✅ Header elements found — initializing menu.");

  // ---- OPEN / CLOSE
  const openMenu = (e) => {
    e?.preventDefault();
    e?.stopPropagation();  // don't let other listeners immediately close it
    mobileMenu.classList.add("active");
    document.documentElement.classList.add("menu-open");
    console.log("☰ opened");
  };

  const closeMenu = (e) => {
    e?.stopPropagation();
    mobileMenu.classList.remove("active");
    document.documentElement.classList.remove("menu-open");
    console.log("☰ closed");
  };

  const toggleMenu = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    mobileMenu.classList.toggle("active");
    document.documentElement.classList.toggle("menu-open", mobileMenu.classList.contains("active"));
    console.log("☰ toggled:", mobileMenu.classList.contains("active"));
  };

  // Hamburger / close
  hamburger.addEventListener("click", toggleMenu, true);
  closeButton?.addEventListener("click", closeMenu, true);

  // Outside click to close
  document.addEventListener("click", (event) => {
    const inMenu = event.target.closest("#mobile-menu");
    const isBurger = event.target.closest(".hamburger");
    if (!isBurger && !inMenu && mobileMenu.classList.contains("active")) {
      closeMenu(event);
    }
  }, true);

  // Dropdowns
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const targetId = button.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      targetContent?.classList.toggle("show");
    });
  });

  // Move header outside siteWrapper (safe even if already moved)
  const moveHeader = () => {
    const mtnHeader = document.querySelector(".mtn-header");
    const siteWrapper = document.getElementById("siteWrapper");
    const body = document.body;
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
