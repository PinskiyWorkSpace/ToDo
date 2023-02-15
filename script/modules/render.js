import {
  createTitle,
  createForm,
  createTable,
  createRow,
} from './createElements.js';


export const renderToDo = (app) => {
  const title = createTitle();
  const form = createForm();
  const table = createTable();

  app.append(title, form, table);

  return {
    list: table.tbody,
    table,
    form,
  };
};

export const renderRow = (elem, data) => {
  const allRow = data.map(createRow);

  elem.append(...allRow);
  return allRow;
};
