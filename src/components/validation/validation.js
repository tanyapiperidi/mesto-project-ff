// @todo:  Показать ошибку валидации
const showInputError = (formElement, inputElement, options, validationMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.classList.add(options.errorClass);
  errorElement.textContent = validationMessage;
};

// @todo:  Скрыть ошибку валидации
const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.textContent = '';
};

// @todo:  Проверка валидации
const isValid = (formElement, inputElement, options) => {
  // Проверка регулярного выражения
  if (inputElement.validity.patternMismatch) {
    // Показать кастомное сообщение из атрибута data
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity('');
  };
  // Проверка полей формы на валидность
  if (!inputElement.validity.valid) {
    // Показать сообщение ошибки валидации
    showInputError(formElement, inputElement, options, inputElement.validationMessage);
  }
  else {
    hideInputError(formElement, inputElement, options);
  };
};

// @todo:  Проверяет поле на валидацию для функции toggleButtonState
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid; 
  });
}; 

// @todo:  Переключение состояния кнопки при валидации
const toggleButtonState = (inputList, buttonElement, options) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(options.inactiveButtonClass);
  }
  else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(options.inactiveButtonClass);
  };
};

const setEventListeners = (formElement, options) => {
  // Находит поля и кнопку в форме. 
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  // Находит кнопку в форме. 
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  // Вызывает функцию состояния кнопки. 
  toggleButtonState(inputList, buttonElement, options);
  // Перебирает поля вызывая обработчик input для проверки поля на валидность
  inputList.forEach(inputElement => {
    inputElement,addEventListener('input', () => {
      isValid(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

// @todo:  Очистка полей валидации, и добавление атрибута "disabled" кнопкам "Сохранить"
const clearValidation = (formElement, options) => {
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  buttonElement.disabled = true;
  buttonElement.classList.add(options.inactiveButtonClass);
  inputList.forEach(inputElement => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(options.inputErrorClass);
  });
};

// Получает объект настроек = названия классов элементов формы
const enableValidation = (options) => {
  // Находит все формы
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, options);
  });
};

export {clearValidation, enableValidation};