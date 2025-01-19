// @todo:  Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', hidePopupOnEsc);
};

// @todo:  Проверка нажатия esc для закрытия попапа
function hidePopupOnEsc(evt) {
  if (evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  };
};

// @todo:  Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', hidePopupOnEsc);
};

export {openPopup, closePopup};