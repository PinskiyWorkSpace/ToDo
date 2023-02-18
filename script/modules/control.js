import {createRow} from './createElements.js';
import {
  setStorage,
  removeStorage,
  user,
  getStorage,
  editStatusStorage,
  editTaskStorage,
} from './todoStorage.js';


const numberTask = list => {
  const rows = list.querySelectorAll('tr');

  let count = 0;
  rows.forEach(row => {
    row.querySelectorAll('td')[0].textContent = ++count;
  });
};

const deleteTask = (target, elem) => {
  const verify = confirm('Точно удалить задачу???');
  if (verify === true) {
    target.closest('tr').remove();
    removeStorage(elem);
  }
};

const changeTask = (elem, id) => {
  const status = elem.querySelectorAll('td')[2].textContent;
  const data = getStorage(user);

  data.forEach(el => {
    if (el.id === id) {
      const importance = el.importanceTask;

      if (importance === 'важная') {
        elem.classList.add('table-warning');
      } else if (importance === 'срочная') {
        elem.classList.add('table-danger');
      } else {
        elem.classList.add('table-light');
      }
    }
  });

  if (status === 'В процессе') {
    elem.classList.remove('table-warning', 'table-danger', 'table-light');
    elem.querySelector('.task').classList.add('text-decoration-line-through');
    elem.classList.add('table-success');
    elem.querySelectorAll('td')[2].textContent = 'Выполнено';
  } else {
    elem.classList.remove('table-success');
    elem.querySelector('.task').classList.remove('text-decoration-line-through');
    elem.querySelectorAll('td')[2].textContent = 'В процессе';
  }
};

export const deleteControl = (list) => {
  list.addEventListener('click', e => {
    const target = e.target;
    const input = target.closest('tr').querySelector('.task').textContent;
    const inputTask = target.closest('tr').querySelector('.task');
    const task = target.closest('tr');
    const id = task.querySelector('.task').id;

    if (target.closest('.btn-danger')) {
      deleteTask(target, input);
      editStatusStorage(user, id);
    }

    if (target.closest('.btn-success')) {
      const btn = target.closest('tr').querySelector('.btn-success');

      if (btn.textContent === 'Отменить') {
        btn.textContent = 'Завершить';
      } else {
        btn.textContent = 'Отменить';
      }
      changeTask(task, id);
      editStatusStorage(user, id);
    }

    if (target.closest('.btn-edit')) {
      inputTask.setAttribute('contenteditable', true);
      inputTask.focus();
      inputTask.addEventListener('blur', () => {
        editTaskStorage(user, id, inputTask.textContent);
        inputTask.contentEditable = false;
      });
    }

    numberTask(list);
  });
};

export const taskFormControl = (form, list) => {
  const input = document.querySelector('.form-control');
  const btn = document.querySelector('.btn-primary');
  const select = document.querySelector('.form-select');

  form.addEventListener('input', e => {
    if (input.value !== '') {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const newTask = {
      id: Math.random().toString().substring(2, 10),
      taskValue: input.value,
      status: 'В процессе',
      importanceTask: select.value,
    };

    const numTask = getStorage(user).length;

    setStorage(user, newTask);

    list.append(createRow(newTask, numTask));
    form.reset();

    btn.disabled = true;
  });
};
