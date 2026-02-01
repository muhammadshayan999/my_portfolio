// ================= DARK MODE =================
document.getElementById("darkToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});



// ================= LOAD SECTIONS DYNAMICALLY =================
function loadPage(section) {
  fetch(`${section}.html`)
    .then(response => {
      if (!response.ok) throw new Error("Page not found.");
      return response.text();
    })
    .then(data => {
      document.getElementById("main-content").innerHTML = data;

      // Re-init EmailJS form if contact page loads
      if (section === "contact") {
        initContactForm();
      }
    })
    .catch(error => {
      document.getElementById("main-content").innerHTML = `<p>${error}</p>`;
    });
}

// ================= NAVIGATION ACTIVE CLASS =================
const navLinks = document.querySelectorAll("header nav a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    // remove active from all
    navLinks.forEach(l => l.classList.remove("active"));
    // add active to clicked
    link.classList.add("active");
  });
});

// ================= EMAILJS CONTACT FORM =================
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs.sendForm("service_mbdh8qm", "template_oxztfnl", form)
        .then(() => {
          alert("✅ Message sent successfully!");
          form.reset();
        })
        .catch((error) => {
          alert("❌ Failed to send message. Try again later.");
          console.error("EmailJS Error:", error);
        });
    });
  }
}


// ================= CUSTOM CURSOR =================
document.addEventListener("DOMContentLoaded", () => {
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  if (!cursorDot || !cursorRing) return;

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;

    cursorRing.style.left = `${x}px`;
    cursorRing.style.top = `${y}px`;
  });

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button")) {
      cursorRing.style.width = "45px";
      cursorRing.style.height = "45px";
    } else {
      cursorRing.style.width = "30px";
      cursorRing.style.height = "30px";
    }
  });
});



// ================= DEFAULT LOAD =================
window.onload = function () {
  loadPage("home");
};
