const showInputError = (formElement, inputElement, options, validationMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass);
    errorElement.classList.add(options.errorClass);
    errorElement.textContent = validationMessage;
  };

  const hideInputError = (formElement, inputElement, options) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    input.classList.remove(options.inputErrorClass);
    errorElement.textContent = '';
  };

  // Проверка валидации
const isValid = (formElement, inputElement, options) => { //под showInputError hideInputError
    // Проверка регулярного выражения
    if (input.validity.patternMismatch) {
      // Показать кастомное сообщение из атрибута data
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
      inputElement.setCustomValidity('');
    };
    // Проверка полей формы на валидность
    if (!input.validity.valid) {
      // Показать сообщение ошибки валидации
      showInputError(formElement, inputElement, options, inputElement.validationMessage);
    }
    else {
      hideInputError(formElement, inputElement, options);
    };
  };

  