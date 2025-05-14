const body = document.querySelector("body"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

// Dark mode setup from localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  modeText.innerText = "Light Mode";
}

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    modeText.innerText = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    modeText.innerText = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});


function showTheorySection() {
  document.getElementById("card-section").style.display = "grid";
  document.getElementById("theory-section").style.display = "none";
  document.getElementById("lessons-title").style.display = "block";

  // Sidebar highlight
  document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
  document.querySelectorAll(".nav-link")[3].classList.add("active"); // Theory link
}


// Theory page logic
async function showTheory() {
  const cardSection = document.getElementById("card-section");
  const theorySection = document.getElementById("theory-section");
  const theoryList = document.getElementById("theory-list");

  cardSection.style.display = "none";
  theorySection.style.display = "block";
  document.getElementById("lessons-title").style.display = "none";

  try {
    const res = await fetch("kinematics_theory.js");
    const kinematicsTheory = await res.json();

    theoryList.innerHTML = "";
    kinematicsTheory.forEach((item, i) => {
      const div = document.createElement("div");
      div.className = "theory-block";
      div.innerHTML = `<h3>${i + 1}. ${item.title}</h3><p>${item.content}</p>`;
      theoryList.appendChild(div);
    });
  } catch (err) {
    theoryList.innerText = "Failed to load theory.";
    console.error(err);
  }
}

function goBackToCards() {
  document.getElementById("card-section").style.display = "grid";
  document.getElementById("theory-section").style.display = "none";
  document.getElementById("lessons-title").style.display = "block";
}
