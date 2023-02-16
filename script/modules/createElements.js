

const createTitle = () => {
  const h3 = document.createElement('h3');
  h3.textContent = 'Todo App';

  return h3;
};

const creatLabel = () => {
  const label = document.createElement('label');
  label.classList.add('form-group', 'me-3', 'mb-0');

  const input = document.createElement('input');
  input.classList.add('form-control');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'ввести задачу');
  input.setAttribute('required', true);

  label.append(input);

  return label;
};

const createButtonsGroup = params => {
  const btns = params.map(({
    className,
    type,
    text,
  }) => {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.className = className;

    return button;
  });

  return btns;
};

const createSelect = () => {
  const select = document.createElement('select');
  select.classList.add('form-select', 'w-25', 'me-3');
  select.setAttribute('name', 'importance');

  const ordinary = document.createElement('option');
  ordinary.textContent = 'обычная';

  const important = document.createElement('option');
  important.textContent = 'важная';

  const urgent = document.createElement('option');
  urgent.textContent = 'срочная';

  select.append(ordinary, important, urgent);

  return select;
};

const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');

  const input = creatLabel();
  const select = createSelect();

  const buttonGroup = createButtonsGroup([{
    className: 'btn btn-primary me-3',
    type: 'submit',
    text: 'Сохранить',
  },
  {
    className: 'btn btn-warning',
    type: 'reset',
    text: 'Очистить',
  },
  ]);

  form.append(input, select, ...buttonGroup);

  form.input = input;

  return form;
};

const createTable = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
    `);

  const tbody = document.createElement('tbody');
  wrapper.tbody = tbody;

  table.append(thead, tbody);
  wrapper.append(table);

  return wrapper;
};

const createRow = ({id, taskValue, status, importanceTask}, n) => {
  const tr = document.createElement('tr');

  const numberTask = document.createElement('td');
  numberTask.textContent = n + 1;

  const task = document.createElement('td');
  task.classList.add('task');
  task.textContent = taskValue;
  task.id = id;

  const process = document.createElement('td');
  process.textContent = status;

  const btnGroup = document.createElement('td');

  const btnDel = document.createElement('button');
  btnDel.classList.add('btn', 'btn-danger', 'me-3');
  btnDel.textContent = 'Удалить';

  const btnEdit = document.createElement('button');
  btnEdit.classList.add('btn', 'btn-edit', 'me-3');
  btnEdit.textContent = 'Редактировать';

  const btnEnd = document.createElement('button');
  btnEnd.classList.add('btn', 'btn-success');
  btnEnd.textContent = 'Завершить';

  if (status === 'В процессе') {
    if (importanceTask === 'важная') {
      tr.classList.add('table-warning');
    } else if (importanceTask === 'срочная') {
      tr.classList.add('table-danger');
    } else {
      tr.classList.add('table-light');
    }
  } else {
    tr.classList.add('table-success');
    task.classList.add('text-decoration-line-through');
    btnEnd.textContent = 'Отменить';
  }

  btnGroup.append(btnDel, btnEdit, btnEnd);

  tr.append(numberTask, task, process, btnGroup);

  return tr;
};


export {
  createTitle,
  createForm,
  createTable,
  createRow,
};
