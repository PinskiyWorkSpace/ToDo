import {createRow} from './createElements.js';
import {
  setStorage, removeStorage, user, getStorage, editStorage,
} from './todoStorage.js';


const numberTask = list => {
  const rows = list.querySelectorAll('tr');

  let count = 0;
  rows.forEach(row => {
    row.querySelectorAll('td')[0].textContent = ++count;
  });
};


export const deleteControl = (list) => {
  list.addEventListener('click', e => {
    const target = e.target;
    const input = target.closest('tr').querySelector('.task').textContent;
    const task = target.closest('tr');
    const id = task.querySelector('.task').id;

    if (target.closest('.btn-danger')) {
      target.closest('tr').remove();
      removeStorage(input);
    }
    task.classList.remove('table-light');
    task.querySelector('.task').classList.add('text-decoration-line-through');
    task.classList.add('table-success');
    task.querySelectorAll('td')[2].textContent = 'Выполнено';

    numberTask(list);

    editStorage(user, id);
  });
};

export const taskFormControl = (form, list) => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.form-control');

    const newTask = {
      id: Math.random().toString().substring(2, 10),
      taskValue: input.value,
      status: 'В процессе',
    };

    const numTask = getStorage(user).length;

    setStorage(user, newTask);

    list.append(createRow(newTask, numTask));
    form.reset();
  });
};


