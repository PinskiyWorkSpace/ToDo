
// export const user = prompt('Введите имя');
export const user = 'F';

export const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];

export const data = getStorage(user);

export const setStorage = (key, obj) => {
  const newData = getStorage(key);
  newData.push(obj);

  localStorage.setItem(key, JSON.stringify(newData));
};

export const removeStorage = (input) => {
  const newData = getStorage(user);

  newData.forEach((el, index) => {
    if (el.taskValue === input) {
      newData.splice(index, 1);
    }
  });
  localStorage.setItem(user, JSON.stringify(newData));
};

export const editStatusStorage = (key, id) => {
  const data = getStorage(key);
  data.forEach(item => {
    if (item.id === id) {
      if (item.status === 'В процессе') {
        item.status = 'Выполнено';
      } else {
        item.status = 'В процессе';
      }
    }
  });
  localStorage.setItem(key, JSON.stringify(data));
};

export const editTaskStorage = (key, id, text) => {
  const data = getStorage(key);
  data.forEach((item, index) => {
    if (item.id === id) {
      data[index].taskValue = text;
    }
  });
  localStorage.setItem(key, JSON.stringify(data));
};
