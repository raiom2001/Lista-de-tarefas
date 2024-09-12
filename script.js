const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');

let tasks = [];

// Carrega as tarefas salvas do localStorage
const storedTasks = JSON.parse(localStorage.getItem('tasks'));
if (storedTasks) {
  tasks = storedTasks;
}

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
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// função para excluir uma tarefa
function deleteTask(event) {
  const index = event.target.dataset.index;
  tasks.splice(index, 1);
  renderTaskList();
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// eventos
addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
      addTask();
    }
  });


taskList.addEventListener('click', (event) => {
  if (event.target.className === 'delete-task') {
    deleteTask(event);
  }
});

// renderizar a lista de tarefas inicialmente
renderTaskList();



// script.js

let segundos = 0;
let minutos = 0;
let horas = 0;
let intervalId = null;
let isRunning = false;

const cronometroDisplay = document.getElementById('cronometro-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');


// Recupera os dados de contagem do localStorage
if (localStorage.getItem('segundos')) {
  segundos = parseInt(localStorage.getItem('segundos'));
  minutos = parseInt(localStorage.getItem('minutos'));
  horas = parseInt(localStorage.getItem('horas'));
  cronometroDisplay.innerText = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

startButton.addEventListener('click', startCronometro);
pauseButton.addEventListener('click', pauseCronometro);
resetButton.addEventListener('click', resetCronometro);

function startCronometro() {
  if (!isRunning) {
    intervalId = setInterval(updateCronometro, 1000);
    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
  }
}

function pauseCronometro() {
  clearInterval(intervalId);
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resetCronometro() {
  segundos = 0;
  minutos = 0;
  horas = 0;
  cronometroDisplay.innerText = '00:00:00';
  clearInterval(intervalId);
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
}

function updateCronometro() {
  segundos++;
  if (segundos === 60) {
    minutos++;
    segundos = 0;
  }
  if (minutos === 60) {
    horas++;
    minutos = 0;
  }

  cronometroDisplay.innerText = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Armazena os dados de contagem no localStorage
localStorage.setItem('segundos', segundos);
localStorage.setItem('minutos', minutos);
localStorage.setItem('horas', horas);
