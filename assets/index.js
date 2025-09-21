let todos = []
let nextId = 1

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners()
  loadDarkMode()
})

function setupEventListeners() {
  const addButton = document.getElementById("addTaskForm")
  addButton.addEventListener("submit", addNewTodo)

  const darkModeButton = document.getElementById("darkModeToggle")
  darkModeButton.addEventListener("click", toggleDarkMode)
}

function toggleDarkMode() {
  const body = document.body
  const sunIcon = document.getElementById("sunIcon")
  const moonIcon = document.getElementById("moonIcon")

  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode")
    sunIcon.classList.remove("hidden")
    moonIcon.classList.add("hidden")
    localStorage.setItem("darkMode", "false")
  } else {
    body.classList.add("dark-mode")
    sunIcon.classList.add("hidden")
    moonIcon.classList.remove("hidden")
    localStorage.setItem("darkMode", "true")
  }
}
