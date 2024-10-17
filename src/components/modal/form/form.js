// Заполнение полей формы редакт.проф при открытии попапа

function populateEditProfilePopup(name, description, nameInput, descriptionInput) {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
};

// Сохранение значения полей форсы редакт.проф

function handleFormSubmit(changeName, changeDescription, nameInput, descriptionInput) {
  changeName.textContent = nameInput.value;
  changeDescription.textContent = descriptionInput.value;
};


export {populateEditProfilePopup, handleFormSubmit}