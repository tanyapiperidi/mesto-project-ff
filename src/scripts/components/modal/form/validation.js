// Добавление атриб. disabled и изменение визуал кнопки при незаполненных полях

export function setSubmitButtonState(isFormValid, buttonSubmit) {
  if (isFormValid){
    buttonSubmit.removeAttribute('disabled');
    buttonSubmit.classList.remove('popup__button_disabled');
  }
  else {
    buttonSubmit.setAttribute('disabled', true);
    buttonSubmit.classList.add('popup__button_disabled');
  };
};