//const BACKEND_ROOT_URL = 'http://localhost:3001';
const BACKEND_ROOT_URL = 'https://todo-backend-qui5.onrender.com';

import { Task } from './class/task.js';
import { ToDos } from './class/todos.js';

const todos = new ToDos(BACKEND_ROOT_URL);

const list = document.getElementById('todolist');
let input = (document.getElementById("newtodo") as HTMLInputElement);

input.disabled = true;

todos.getTasks().then((tasks: Array<Task>) => {
    tasks.forEach((task) => {
        renderTask(task);
    });
    input.disabled = false;
})
.catch(error => {
    alert(error);
});

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const text = input.value.trim();
        if (input.value === "") {
            alert("You must write something!");
            return
        } else {
            todos.addTask(text).then((task) => {
                input.value = "";
                input.focus();
                renderTask(<Task>task);
            })
        }
        event.preventDefault();
    }
});

const renderTask = (task: Task) => {
    console.log('renderTask');
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'list-group-item');
    listItem.setAttribute('data-key', task.id.toString());
    renderSpan(listItem, task.text);
    renderLink(listItem, task.id);
    list.appendChild(listItem);
}

const renderSpan = (listItem: HTMLLIElement, text: string) => {
    const span = listItem.appendChild(document.createElement('span'));
    span.innerHTML = text;
}

const renderLink = (listItem: HTMLLIElement, id: number) => {
    const link = listItem.appendChild(document.createElement('a'));
    link.innerHTML = '<i class="bi bi-trash"></i>';
    link.setAttribute('style', 'float: right');
    link.addEventListener('click', () => {
        todos.removeTask(id).then((id) => {
            const elementToRemove = document.querySelector(`[data-key="${id}"]`)
            if (elementToRemove) {
                list.removeChild(elementToRemove);
            }
        })
        .catch(error => {    
            alert(error);
        });
    });
}

