
window.onload = () => {
  loadTasks();
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
};

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  const taskList = document.getElementById('taskList');
  const li = createTaskElement(text);
  taskList.appendChild(li);
  input.value = '';
  saveTasks();
}

function createTaskElement(text, done = false, pinned = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (done) li.classList.add('done');
  if (pinned) li.classList.add('pinned');
  li.onclick = () => {
    li.classList.toggle('done');
    saveTasks();
  };

  const pinBtn = document.createElement('button');
  pinBtn.textContent = '📌';
  pinBtn.onclick = (e) => {
    e.stopPropagation();
    li.classList.toggle('pinned');
    const list = document.getElementById('taskList');
    list.insertBefore(li, list.firstChild);
    saveTasks();
  };

  const delBtn = document.createElement('button');
  delBtn.textContent = '❌';
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(pinBtn);
  li.appendChild(delBtn);
  return li;
}

function saveTasks() {
  const taskData = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    taskData.push({
      text: li.childNodes[0].textContent,
      done: li.classList.contains('done'),
      pinned: li.classList.contains('pinned')
    });
  });
  localStorage.setItem('stickyTasks', JSON.stringify(taskData));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('stickyTasks')) || [];
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  saved.forEach(task => {
    const li = createTaskElement(task.text, task.done, task.pinned);
    list.appendChild(li);
  });
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem("darkMode", document.body.classList.contains('dark'));
}

function clearTasks() {
  document.getElementById('taskList').innerHTML = '';
  localStorage.removeItem('stickyTasks');
}
