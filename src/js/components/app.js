import Task from './task';

class App {
  tasks = [];
  form = document.getElementById('create-task');
  inputDescription = this.form.elements.description;
  listOfCompletedTasks = document.getElementById('completed-tasks');
  listOfUnfinishedTasks = document.getElementById('unfinished-tasks');
  counterOfCompletedTasks = document.getElementById('completed-count');
  counterOfUnfinishedTasks = document.getElementById('unfinished-count');

  constructor() {
    this.form.addEventListener('submit', this._submitFormHandler.bind(this));
    this.listOfCompletedTasks.addEventListener('click', this._clickDeleteButtonHandler.bind(this));
    this.listOfCompletedTasks.addEventListener('click', this._clickNotDoneButtonHandler.bind(this));
    this.listOfUnfinishedTasks.addEventListener('click', this._clickDeleteButtonHandler.bind(this));
    this.listOfUnfinishedTasks.addEventListener('click', this._clickDoneButtonHandler.bind(this));

    this.tasks = this._getTasksFromLocalStorage();
    this.tasks.forEach(this._displayTask.bind(this));
    this.counterOfCompletedTasks.textContent = this.tasks.filter((task) => task.completed).length;
    this.counterOfUnfinishedTasks.textContent = this.tasks.filter((task) => !task.completed).length;
  }

  _getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }

  _addTasksToLocaleStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  _newTask(description, completed) {
    const task = new Task(description, completed);
    this.tasks.push(task);
    this._addTasksToLocaleStorage();
    this[`counterOf${completed ? 'Completed' : 'Unfinished'}Tasks`].textContent =
      +this[`counterOf${completed ? 'Completed' : 'Unfinished'}Tasks`].textContent + 1;
    return task;
  }

  _displayTask(task) {
    const html = `
      <li class="task" data-id="${task.id}">
        <button class="task__btn  task__btn--${task.completed ? 'not-' : ''}done  btn"
          aria-label="The task ${task.completed ? 'is' : 'not'}completed">
        </button>
        <p class="task__text">${task.description}</p>
        <button class="task__btn  task__btn--delete  btn" aria-label="Delete task"></button>
      </li>
    `;
    this[`listOf${task.completed ? 'Completed' : 'Unfinished'}Tasks`].insertAdjacentHTML(
      'afterbegin',
      html
    );
  }

  _removeTask(id) {
    const task = this.tasks.find((task) => task.id === id);
    const taskIndex = this.tasks.indexOf(task);
    this.tasks.splice(taskIndex, 1);
    this._addTasksToLocaleStorage();
    this[`counterOf${task.completed ? 'Completed' : 'Unfinished'}Tasks`].textContent =
      +this[`counterOf${task.completed ? 'Completed' : 'Unfinished'}Tasks`].textContent - 1;
  }

  _submitFormHandler(evt) {
    evt.preventDefault();
    this._displayTask(this._newTask(this.inputDescription.value, false));
    this.inputDescription.value = '';
  }

  _clickDeleteButtonHandler(evt) {
    const targetButton = evt.target.closest('.task__btn--delete');
    if (!targetButton) return;

    console.log('delete');
    const taskElement = evt.target.closest('.task');
    this._removeTask(taskElement.dataset.id);
    taskElement.remove();
  }

  _clickDoneButtonHandler(evt) {
    const targetButton = evt.target.closest('.task__btn--done');
    if (!targetButton) return;

    const taskElement = evt.target.closest('.task');
    const taskDescription = taskElement.textContent;

    this._removeTask(taskElement.dataset.id);
    taskElement.remove();
    this._displayTask(this._newTask(taskDescription, true));
  }

  _clickNotDoneButtonHandler(evt) {
    const targetButton = evt.target.closest('.task__btn--not-done');
    if (!targetButton) return;

    const taskElement = evt.target.closest('.task');
    const taskDescription = taskElement.textContent;

    this._removeTask(taskElement.dataset.id);
    taskElement.remove();
    this._displayTask(this._newTask(taskDescription, false));
  }
}

export default App;
