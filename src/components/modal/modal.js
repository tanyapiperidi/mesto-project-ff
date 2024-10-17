import {popupImage, popupAddCard, formNewCard, buttonSubmitFormNewCard} from '../../scripts/index';
import {setSubmitButtonState} from './form/validation';

let openedPopup;

function togglePopupVisibility(popup) {
  popup.classList.add('popup_is-opened');
}

function openPopup(popup) {
  togglePopupVisibility(popup);
  openedPopup = popup;
  document.addEventListener('keydown', hidePopupOnEsc);
};

function openImagePopup(name, link) {
  const image = popupImage.querySelector('.popup__image');
  const text = popupImage.querySelector('.popup__caption');
  image.src = link;
  image.alt = name;
  text.textContent = name;
  togglePopupVisibility(popupImage)
  openedPopup = popupImage;
  document.addEventListener('keydown', hidePopupOnEsc);
};

function hidePopupOnEsc(evt, popup = openedPopup) {
  if (evt.key === 'Escape'){
    closePopup(popup);
  };
};

function checkClickToClosePopup(evt, overlay, buttonClose) {
  if (evt.target === overlay || evt.target === buttonClose) {
    closePopup(overlay);
  };
};

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', hidePopupOnEsc);
  clearFormFields(popup);
};

function clearFormFields(popup) {
  if (popup === popupAddCard) {
    formNewCard.reset();
    setSubmitButtonState(false, buttonSubmitFormNewCard);
  };
};

export {openPopup, openImagePopup, checkClickToClosePopup, closePopup};