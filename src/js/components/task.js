class Task {
  constructor(description, completed) {
    this.description = description;
    this.completed = completed;
  }

  createHtml() {
    return `
      <li class="task">
        <button class="task__btn  task__btn--${this.completed ? 'not-' : ''}done  btn"
      aria-label="The task ${this.completed ? 'is' : 'not'}completed"></button>
        <p class="task__text">${this.description}</p>
        <button class="task__btn  task__btn--delete  btn" aria-label="Delete task"></button>
      </li>
    `;
  }
}

export default Task;
