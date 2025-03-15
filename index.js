const taskValue = document.getElementById('task_value');
const taskSubmit = document.getElementById('task_submit');
const taskList = document.getElementById('task_list');

const totalTasks = document.getElementById('totalTasks');
const incompleteTasks = document.getElementById('incompleteTasks');
const completedTasks = document.getElementById('completedTasks');

const updateTaskCount = () => {
  const tasks = document.querySelectorAll('#task_list li');
  const completed = document.querySelectorAll('#task_list input[type="checkbox"]:checked').length;
  const total = tasks.length;
  const incomplete = total - completed;

  totalTasks.textContent = total;
  incompleteTasks.textContent = incomplete;
  completedTasks.textContent = completed;
};

const addTasks = (task) => {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    listItem.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    updateTaskCount();
  });

  const taskText = document.createElement('span');
  taskText.textContent = task;

  const editButton = document.createElement('button');
  editButton.innerHTML = '編集';

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '削除';

  editButton.addEventListener('click', evt => {
    evt.preventDefault();
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = taskText.textContent;
    const saveButton = document.createElement('button');
    saveButton.innerHTML = '保存';

    listItem.innerHTML = '';
    listItem.appendChild(inputField);
    listItem.appendChild(saveButton);

    saveButton.addEventListener('click', () => {
      taskText.textContent = inputField.value;
      listItem.innerHTML = '';
      listItem.appendChild(checkbox);
      listItem.appendChild(taskText);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
    });
  });

  deleteButton.addEventListener('click', evt => {
    evt.preventDefault();
    if (confirm("本当に削除してもよろしいですか？")) {
      listItem.remove();
      updateTaskCount();
    }
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(taskText);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);

  updateTaskCount();
};

taskSubmit.addEventListener('click', evt => {
  evt.preventDefault();
  const task = taskValue.value.trim();
  if (task) {
    addTasks(task);
    taskValue.value = '';
  }
});
