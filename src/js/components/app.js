import Task from './task';

class App {
  #competedTasks = [];
  #unfinishedTasks = [];
  #form = document.getElementById('create-task');
  #inputDescription = this.#form.elements.description;
  #listOfCompletedTasks = document.getElementById('completed-tasks');
  #listOfUnfinishedTasks = document.getElementById('unfinished-tasks');

  constructor() {
    this.#form.addEventListener('submit', this._submitFormHandler.bind(this));
  }

  _getTasksFromLocalStorage(type) {
    return JSON.parse(localStorage.getItem('completedTasks')) || [];
  }

  /**
   * Adds all tasks of the selected type to the LocaleStorage
   * @param {string} type - Tasks type (completed of unfinished)
   */
  _addTasksToLocaleStorage(type) {
    localStorage.setItem(type, JSON.stringify(this[`${type}Tasks`]));
  }

  _newTask(description, completed) {
    const task = new Task(description, false);
    return task;
  }

  _displayTask(type) {
    const newTask = this._newTask(this.#inputDescription.value);
    if (type === 'completed') {
      this.#listOfCompletedTasks.insertAdjacentHTML('afterbegin', newTask.createHtml());
    }

    if (type === 'unfinished') {
      this.#listOfUnfinishedTasks.insertAdjacentHTML('afterbegin', newTask.createHtml());
    }
  }

  _submitFormHandler(evt) {
    evt.preventDefault();
    this._displayTask('unfinished');
    this.#inputDescription.value = '';
  }
}

export default App;
