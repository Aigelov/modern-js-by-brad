// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear all tasks event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task) => {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.classList.add('collection-item');
    // Create text node And append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.classList.add('delete-item');
    link.classList.add('secondary-content');
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add task
function addTask(event) {
  event.preventDefault();

  if (!taskInput.value.trim()) {
    alert('Add a task');
    return;
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.classList.add('collection-item');
  // Create text node And append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.classList.add('delete-item');
  link.classList.add('secondary-content');
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(event) {
  event.preventDefault();

  const el = event.target;

  if (el.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure')) {
      // Remove li which is parent element of link
      el.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeTaskFromLocalStorage(el.parentElement.parentElement);
    }
  }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks
function clearTasks(event) {
  event.preventDefault();
  if (confirm('Are you sure')) {
    // Clear ul with class collection
    // taskList.innerHTML = '';

    // Faster way
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    // https://jsperf.com/innerhtml-vs-removechild

    // Clear from Local Storage
    clearTasksFromLocalStorage();
  }
}

// Clear Tasks from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks
function filterTasks(event) {
  event.preventDefault();
  const text = event.target.value.toLowerCase().trim();
  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}