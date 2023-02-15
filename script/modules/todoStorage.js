
export const user = prompt('Введите имя');

export const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];

export const data = getStorage(user);

export const addStorage = item => {
  data.push(item);
};

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

export const editStorage = (key, id) => {
  const data = getStorage(key);
  data.forEach(item => {
    if (item.id === id) {
      item.status = 'Выполнено';
    }
  });
  localStorage.setItem(key, JSON.stringify(data));
};
