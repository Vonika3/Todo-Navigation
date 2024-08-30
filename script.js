const backlogList = document.getElementById('backlog-list');
const todoList = document.getElementById('todo-list');
const ongoingList = document.getElementById('ongoing-list');
const doneList = document.getElementById('done-list');

const todos = [
    { id: 1, text: 'Task 1', status: 'backlog' },
    { id: 2, text: 'Task 2', status: 'todo' },
    { id: 3, text: 'Task 3', status: 'ongoing' },
    { id: 4, text: 'Task 4', status: 'done' },
];

function renderTodos() {
    [backlogList, todoList, ongoingList, doneList].forEach(list => list.innerHTML = '');

    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        listItem.textContent = todo.text;

        const leftButton = document.createElement('button');
        const rightButton = document.createElement('button');

        leftButton.textContent = '<';
        rightButton.textContent = '>';

        leftButton.disabled = todo.status === 'backlog';
        rightButton.disabled = todo.status === 'done';

        leftButton.addEventListener('click', () => moveTodoLeft(todo.id));
        rightButton.addEventListener('click', () => moveTodoRight(todo.id));

        listItem.appendChild(leftButton);
        listItem.appendChild(rightButton);

        if (todo.status === 'backlog') {
            backlogList.appendChild(listItem);
        } else if (todo.status === 'todo') {
            todoList.appendChild(listItem);
        } else if (todo.status === 'ongoing') {
            ongoingList.appendChild(listItem);
        } else if (todo.status === 'done') {
            doneList.appendChild(listItem);
        }
    });
}

function moveTodoLeft(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo.status === 'todo') {
        todo.status = 'backlog';
    } else if (todo.status === 'ongoing') {
        todo.status = 'todo';
    } else if (todo.status === 'done') {
        todo.status = 'ongoing';
    }
    renderTodos();
}

function moveTodoRight(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo.status === 'backlog') {
        todo.status = 'todo';
    } else if (todo.status === 'todo') {
        todo.status = 'ongoing';
    } else if (todo.status === 'ongoing') {
        todo.status = 'done';
    }
    renderTodos();
}

renderTodos();
