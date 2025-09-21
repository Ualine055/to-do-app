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
