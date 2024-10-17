// Добавление атриб. disabled и изменение визуал кнопки при незаполненных полях

export function setSubmitButtonState(isFormValid, buttonSubmitForm) {
  if (isFormValid){
    buttonSubmitForm.removeAttribute('disabled');
    buttonSubmitForm.classList.remove('popup__button_disabled');
  }
  else {
    buttonSubmitForm.setAttribute('disabled', true);
    buttonSubmitForm.classList.add('popup__button_disabled');
  };
};