// Сохранение значения полей форсы редакт.проф

function handleFormSubmit(nameChange, descriptionChange, nameInput, descriptionInput) {
  nameChange.textContent = nameInput.value;
  descriptionChange.textContent = descriptionInput.value;
};

// Заполнение полей формы редакт.проф при открытии попапа

function populateEditProfilePopup(name, description, nameInput, descriptionInput) {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
};

export {handleFormSubmit, populateEditProfilePopup}