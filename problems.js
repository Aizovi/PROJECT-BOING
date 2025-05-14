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
  

function showProblems() {
    document.getElementById("problems-page").style.display = "block";
    document.getElementById("problem-section").style.display = "none";
    document.querySelector(".problem-list").style.display = "flex"; // 🔥 fix here
    document.querySelector("#problems-page .section-title").style.display = "block";
  
    // Highlight correct nav
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    document.querySelectorAll(".nav-link")[4].classList.add("active"); // Problems index
  }
  
  
  function showProblemsKinematics() {
    document.getElementById("problem-section").style.display = "block";
    document.querySelector(".problem-list").style.display = "none";
    document.querySelector("#problems-page .section-title").style.display = "none";
  
    fetch("kinematics_problems.js")
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("problem-list");
        container.innerHTML = "";
        data.forEach((item, i) => {
          const div = document.createElement("div");
          div.className = "problem-block";
          div.innerHTML = `<h3>${i + 1}. ${item.question}</h3><p><strong>Answer:</strong> ${item.answer}</p>`;
          container.appendChild(div);
        });
      })
      .catch(() => {
        document.getElementById("problem-list").innerText = "Failed to load problems.";
      });
  }
  
  function goBackToProblems() {
    document.querySelector(".problem-list").style.display = "flex";
    document.getElementById("problem-section").style.display = "none";
    document.querySelector("#problems-page .section-title").style.display = "block";
  }

  