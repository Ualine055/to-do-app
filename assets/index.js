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
function loadDarkMode() {
  const savedMode = localStorage.getItem("darkMode")
  const body = document.body
  const sunIcon = document.getElementById("sunIcon")
  const moonIcon = document.getElementById("moonIcon")

  if (savedMode === "true") {
    body.classList.add("dark-mode")
    sunIcon.classList.add("hidden")
    moonIcon.classList.remove("hidden")
  }
}

function addNewTodo(event) {
  event.preventDefault() 

  const input = document.getElementById("taskInput")
  const todoText = input.value

  if (todoText === "") {
    alert("Please write something!")
    return
  }

  const newTodo = {
    id: nextId,
    text: todoText,
    done: false,
  }

  todos.push(newTodo)
  nextId = nextId + 1

  input.value = ""

  showTodos()
  updateNumbers()
}

function toggleTodo(todoId) {
  
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoId) {
      todos[i].done = !todos[i].done 
      break
    }
  }
  showTodos()
  updateNumbers()
}

function deleteTodo(todoId) {
  const confirmDelete = confirm("Delete this todo?")

  if (confirmDelete) {
    todos = todos.filter((todo) => todo.id !== todoId)

    showTodos()
    updateNumbers()
  }
}

function showTodos() {
  const container = document.getElementById("tasksContainer")
  const emptyMessage = document.getElementById("emptyState")

  if (todos.length === 0) {
    container.innerHTML = ""
    emptyMessage.style.display = "block"
    return
  }

  emptyMessage.style.display = "none"

  let html = ""

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i]
    const checkedText = todo.done ? "checked" : ""
    const strikeText = todo.done ? "line-through text-gray-500" : ""

    html += `
            <div class="p-4 border-b border-gray-200">
                <div class="flex items-center space-x-3">
                    <input 
                        type="checkbox" 
                        class="w-5 h-5"
                        ${checkedText}
                        onclick="toggleTodo(${todo.id})"
                    >
                    <div class="flex-1">
                        <p class="text-gray-900 ${strikeText}">
                            ${todo.text}
                        </p>
                    </div>
                    <button 
                        onclick="deleteTodo(${todo.id})" 
                        class="text-red-600 hover:text-red-800"
                    >
                        Delete
                    </button>
                </div>
            </div>
        `
  }
  container.innerHTML = html
}

function updateNumbers() {
  const total = todos.length
  let completed = 0

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].done) {
      completed = completed + 1
    }
  }
  const pending = total - completed

  document.getElementById("totalTasks").textContent = total
  document.getElementById("completedTasks").textContent = completed
  document.getElementById("pendingTasks").textContent = pending
}
