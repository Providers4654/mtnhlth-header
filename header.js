
document.addEventListener("DOMContentLoaded", () => {
  // ====== MOBILE MENU FUNCTIONALITY ======
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeButton = document.querySelector(".close-menu");
  const dropdownButtons = document.querySelectorAll("#mobile-menu button");

  // Toggle mobile menu visibility
  hamburger?.addEventListener("click", () => {
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
  dropdownButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const targetId = button.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      targetContent?.classList.toggle("show");
    });
  });

  // ====== MOVE .MTN-HEADER OUTSIDE #SITEWRAPPER ======
  const moveHeader = () => {
    const mtnHeader = document.querySelector('.mtn-header');
    const siteWrapper = document.getElementById('siteWrapper');
    const body = document.querySelector('body');

    if (mtnHeader && siteWrapper && body) {
      body.insertBefore(mtnHeader, siteWrapper);
      console.log('Moved .mtn-header outside #siteWrapper');
    } else {
      // Retry after 100ms if not ready
      setTimeout(moveHeader, 100);
    }
  };

  moveHeader(); // Initial call
});




// === Mobile Accordion Dropdown for Solutions ===
document.addEventListener("DOMContentLoaded", () => {
  const mobileAccordions = document.querySelectorAll(".mobile-accordion-toggle");

  mobileAccordions.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const panel = this.nextElementSibling;
      const icon = this.querySelector(".plus-icon");
      const isOpen = panel.classList.contains("open");

      // Close all panels
      document.querySelectorAll(".mobile-accordion-panel").forEach((p) => {
        p.style.maxHeight = null;
        p.classList.remove("open");
      });
      document.querySelectorAll(".plus-icon").forEach((i) => {
        i.textContent = "+";
      });

      // Toggle current panel
      if (!isOpen) {
        panel.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        icon.textContent = "−";
      } else {
        panel.classList.remove("open");
        panel.style.maxHeight = null;
        icon.textContent = "+";
      }
    });
  });
});
