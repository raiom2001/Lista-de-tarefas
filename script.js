const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');

let tasks = [];

// função para renderizar a lista de tarefas
function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.textContent = task;
        taskElement.dataset.index = index;
        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-task';
        deleteButton.textContent = '×';
        deleteButton.dataset.index = index;
        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);
    });
}

// função para adicionar uma nova tarefa
function addTask() {
    const newTask = newTaskInput.value.trim();
    if (newTask !== '') {
        tasks.push(newTask);
        newTaskInput.value = '';
        renderTaskList();
    }
}

// função para excluir uma tarefa
function deleteTask(event) {
    const index = event.target.dataset.index;
    tasks.splice(index, 1);
    renderTaskList();
}

// eventos
addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', (event) => {
    if (event.target.className === 'delete-task') {
        deleteTask(event);
    }
});

// renderizar a lista de tarefas inicialmente
renderTaskList();