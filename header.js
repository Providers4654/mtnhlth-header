function initHeader() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeButton = document.querySelector(".close-menu");

  // ❗ FIXED SELECTOR — supports <a> AND <button>
  const dropdownButtons = document.querySelectorAll(
    "#mobile-menu button[data-target], #mobile-menu a[data-target]"
  );

  // --- wait for DOM ---
  if (!hamburger || !mobileMenu) {
    console.log("⏳ Waiting for header elements...");
    setTimeout(initHeader, 200);
    return;
  }

  console.log("✅ Header elements found — initializing menu.");

  // ===== MENU OPEN / CLOSE =====
  const htmlEl = document.documentElement;

  const openMenu = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    mobileMenu.classList.add("active");
    htmlEl.classList.add("menu-open");
    console.log("☰ opened");
  };

  const closeMenu = (e) => {
    e?.stopPropagation();
    mobileMenu.classList.remove("active");
    htmlEl.classList.remove("menu-open");
    console.log("☰ closed");
  };

  const toggleMenu = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    mobileMenu.classList.toggle("active");
    htmlEl.classList.toggle("menu-open", mobileMenu.classList.contains("active"));
    console.log("☰ toggled:", mobileMenu.classList.contains("active"));
  };

  // ---- listeners ----
  hamburger.addEventListener("click", toggleMenu, true);
  closeButton?.addEventListener("click", closeMenu, true);

  // ---- close on outside click ----
  document.addEventListener("click", (event) => {
    const inMenu = event.target.closest("#mobile-menu");
    const isBurger = event.target.closest(".hamburger");
    if (!isBurger && !inMenu && mobileMenu.classList.contains("active")) {
      closeMenu(event);
    }
  }, true);


  // PLUS/MINUS toggle update
dropdownButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();

    const targetId = button.getAttribute("data-target");
    const targetContent = document.getElementById(targetId);

    // toggle show class
    const open = targetContent.classList.toggle("show");

    // update + / –
    if (open) button.classList.add("open");
    else button.classList.remove("open");
  });
});


  // ===== MOVE HEADER ABOVE SITEWRAPPER =====
  const moveHeader = () => {
    const mtnHeader = document.querySelector(".mtn-header");
    const siteWrapper = document.getElementById("siteWrapper");
    const body = document.body;

    if (mtnHeader && siteWrapper && body && !body.contains(mtnHeader.previousSibling)) {
      body.insertBefore(mtnHeader, siteWrapper);
      console.log("Moved .mtn-header outside #siteWrapper");
    } else if (!mtnHeader || !siteWrapper) {
      setTimeout(moveHeader, 100);
    }
  };
  moveHeader();

  // ===== ADJUST PAGE OFFSET =====
  const applyOffset = () => {
    const header = document.querySelector(".mtn-header");
    const wrapper = document.getElementById("siteWrapper") || document.querySelector("#page, main, .Site");
    if (header && wrapper) {
      const height = header.offsetHeight;
      wrapper.style.paddingTop = height + "px";
      console.log(`🧱 Applied header offset: ${height}px`);
    }
  };
  applyOffset();
  window.addEventListener("resize", () => requestAnimationFrame(applyOffset));

  // ===== HIDE HEADER ON SCROLL (MOBILE FOCUS) =====
  let lastScroll = 0;
  const header = document.querySelector(".mtn-header");
  const hideOnScroll = () => {
    const currentScroll = window.pageYOffset;
    const isMobile = window.innerWidth < 769;

    if (!isMobile) return; // Only apply on mobile

    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down → hide header
      header.classList.add("hide");
    } else {
      // Scrolling up → show header
      header.classList.remove("hide");
    }

    lastScroll = currentScroll;
  };

  window.addEventListener("scroll", hideOnScroll);
  console.log("📱 Mobile header scroll-hide behavior active.");

  console.log("✅ MTN HLTH header initialized successfully.");
}

initHeader();
