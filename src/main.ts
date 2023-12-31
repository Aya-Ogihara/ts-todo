import './style.css';

type Todo = {
  id: number | string;
  name: string;
  complete: boolean;
};

const form = document.querySelector<HTMLFormElement>('#new-todo-form')!;
const todoInput = document.querySelector<HTMLInputElement>('#todo-input')!;
const list = document.querySelector<HTMLUListElement>('#list')!;

let todos: Todo[] = loadTodos();
todos.forEach(renderNewTodo);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoName = todoInput.value;
  if (todoName === '') return;
  const newTodo = {
    id: crypto.randomUUID(),
    name: todoName,
    complete: false,
  };
  todos.push(newTodo);
  renderNewTodo(newTodo);
  saveTodos();
  todoInput.value = '';
});

function renderNewTodo(todo: Todo) {
  const listItem = document.createElement('li');
  listItem.classList.add('list-item-');

  const label = document.createElement('label');
  label.classList.add('list-item-label');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.checked = todo.complete;
  checkBox.classList.add('label-input');
  checkBox.addEventListener('change', () => {
    todo.complete = checkBox.checked;
    saveTodos();
  });

  const textElement = document.createElement('span');
  textElement.classList.add('label-text');
  textElement.innerText = todo.name;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.innerText = 'Delete';
  deleteBtn.addEventListener('click', () => {
    listItem.remove();
    todos = todos.filter((target) => target.id !== todo.id);
    saveTodos();
  });

  label.append(checkBox, textElement);
  listItem.append(label, deleteBtn);
  list.append(listItem);
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const value = localStorage.getItem('todos');
  if (value === null) return [];
  return JSON.parse(value) as Todo[];
}
