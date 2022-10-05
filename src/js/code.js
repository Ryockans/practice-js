class ToDoApp {
  constructor(options) {
    this.element = options.element;
    this.tabs = Array.from(options.tabs);
    this.input = options.input;
    this.addButton = options.addButton;
    this.taskList = options.taskList;
    this.clearButton = options.clearButton;
    this.counter = options.counter;
    this.activeTab = this.tabs.find((item) => item.classList.contains('-active'));
    this.status = this.activeTab.dataset.status;
  }

  initialize() {
    this.element.addEventListener('click', (event) => {
      const isAddButton = event.target === this.addButton;
      const isClearButton = event.target === this.clearButton;
      const isTab = this.tabs.includes(event.target);

      if (isAddButton) this.addTask();
      if (isClearButton) this.clearCompleted();
      if (isTab) this.changeTab(event.target);

      this.counter.innerHTML = Task.ActiveTasks.length;
    });
  }

  addTask() {
    const name = this.input.value;
    const isEmpty = name === '';

    if (isEmpty) return;
    const task = new Task({
      name: name,
      status: this.status,
    });
    this.taskList.prepend(task.initialize());
    this.input.value = '';
  }

  clearCompleted() {
    for (let item of Task.CompletedTasks) {
      setTimeout(() => item.deleteTask(), 0);
    }
  }

  changeTab(tab) {
    if (tab === this.activeTab) return;

    this.activeTab.classList.remove('-active');
    tab.classList.add('-active');

    this.activeTab = tab;
    this.status = this.activeTab.dataset.status;

    this.showTasks(tab);
  }

  showTasks() {
    switch (this.status) {

      case 'all':
        Task.AllTasks.forEach((item) => item.style.display = 'flex');
        break;

      case 'active':
        Task.ActiveTasks.forEach((item) => item.style.display = 'flex');
        Task.CompletedTasks.forEach((item) => item.style.display = 'none');
        break;

      case 'completed':
        Task.ActiveTasks.forEach((item) => item.style.display = 'none');
        Task.CompletedTasks.forEach((item) => item.style.display = 'flex');
        break;
    }
  }
}

class Task {
  constructor(settings) {
    this.name = settings.name;
    this.currentTab = settings.status

    Task.AllTasks.push(this);
    Task.ActiveTasks.push(this);
  }

  initialize() {
    this.element = document.createElement('li');
    this.element.classList.add('task');
    this.style = this.element.style;

    const taskText = document.createElement('label');
    taskText.classList.add('task__text');
    taskText.textContent = this.name;

    this.check = document.createElement('input');
    this.check.type = 'checkbox';
    this.check.classList.add('task__checkbox');
    this.completed = this.check.checked;
    this.checkHandler();

    const closeButton = document.createElement('button');
    closeButton.classList.add('task__delete');
    closeButton.addEventListener('click', this.deleteTask.bind(this));

    this.element.append(taskText);
    taskText.prepend(this.check);
    this.element.append(closeButton);

    if (this.currentTab === 'completed') this.style.display = 'none';

    return this.element;
  }

  static AllTasks = [];
  static CompletedTasks = [];
  static ActiveTasks = [];

  deleteTask() {
    if (this.completed) {
      const indexCompleted = Task.CompletedTasks.indexOf(this)
      Task.CompletedTasks.splice(indexCompleted, 1);
    } else {
      const indexActive = Task.ActiveTasks.indexOf(this);
      Task.ActiveTasks.splice(indexActive, 1);
    }

    const index = Task.AllTasks.indexOf(this);
    Task.AllTasks.splice(index, 1);

    this.element.remove();
    delete this;
  }

  checkHandler() {
    this.check.addEventListener('click', () => {
      if (this.completed) {
        const indexCompleted = Task.CompletedTasks.indexOf(this);
        Task.CompletedTasks.splice(indexCompleted, 1);
        Task.ActiveTasks.push(this);
        this.element.classList.remove('-completed');
        if (this.currentTab === 'completed') this.style.display = 'none';
      } else {
        const indexActive = Task.ActiveTasks.indexOf(this);
        Task.ActiveTasks.splice(indexActive, 1);
        Task.CompletedTasks.push(this);
        this.element.classList.add('-completed');
        if (this.currentTab === 'active') this.style.display = 'none';
      }
      this.completed = this.check.checked;
    });
  }
}

const toDo = new ToDoApp({
  element: document.querySelector('.todo-app'),
  tabs: document.querySelectorAll('.todo-app__tab'),
  input: document.querySelector('.todo-app__input'),
  addButton: document.querySelector('.todo-app__add'),
  taskList: document.querySelector('.todo-app__tasklist'),
  clearButton: document.querySelector('.todo-app__clear'),
  counter: document.querySelector('.todo-app__counter-number'),
});

toDo.initialize();