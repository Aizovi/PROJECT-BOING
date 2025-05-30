const body = document.querySelector("body"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

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

document.querySelectorAll('.password-toggle').forEach(button => {
  button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      this.textContent = type === 'password' ? 'Show' : 'Hide';
  });
});

function openModal() {
  document.getElementById("editModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}