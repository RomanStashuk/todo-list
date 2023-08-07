class Task {
  id = Date.now().toString().slice(-10);

  constructor(description, completed) {
    this.description = description;
    this.completed = completed;
  }
}

export default Task;
