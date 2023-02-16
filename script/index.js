import {renderToDo, renderRow} from './modules/render.js';
import {deleteControl, taskFormControl} from './modules/control.js';
import {data} from './modules/todoStorage.js';


{
  const init = (selectorApp) => {
    const app = document.querySelector(selectorApp);
    app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center',
        'justify-content-center', 'flex-column');

    const {list, form} = renderToDo(app);


    renderRow(list, data);
    deleteControl(list, data);
    taskFormControl(form, list, data);
  };


  window.ToDoInit = init;
}
