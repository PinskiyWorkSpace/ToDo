

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

const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');

  const input = creatLabel();

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


  form.append(input, ...buttonGroup);

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

const createRow = ({id, taskValue, status}, n) => {
  const tr = document.createElement('tr');
  tr.classList.add('table-light');

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

  const btnEnd = document.createElement('button');
  btnEnd.classList.add('btn', 'btn-success');
  btnEnd.textContent = 'Завершить';

  btnGroup.append(btnDel, btnEnd);

  tr.append(numberTask, task, process, btnGroup);

  if (status === 'Выполнено') {
    tr.classList.remove('table-light');
    tr.classList.add('table-success');
    task.classList.add('text-decoration-line-through');
  }

  return tr;
};


export {
  createTitle,
  createForm,
  createTable,
  createRow,
};
