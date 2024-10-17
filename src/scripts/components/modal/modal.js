import {popupImage, popupAddCard, formNewPlace} from '../../index';
import {setSubmitButtonState} from './form/validation';

function openPopup(popup) {
  popup.classList.remove('popup_is-animated');
  popup.classList.add('popup_is-opened');
  // замыкание
  function passArgumentToFunction(evt) {
    hidePopupOnEsc(evt, popup);
  };
  document.addEventListener('keydown', passArgumentToFunction);
};

function openImagePopup(name, link) {
  const image = popupImage.querySelector('.popup__image');
  const text = popupImage.querySelector('.popup__caption');
  popupImage.classList.remove('popup_is-animated');
  popupImage.classList.add('popup_is-opened');
  image.src = link;
  image.alt = name;
  text.textContent = name;
  // замыкание
  function passArgumentToFunction(evt) {
    hidePopupOnEsc(evt, popupImage);
  };
  document.addEventListener('keydown', passArgumentToFunction);
};

function hidePopupOnEsc(evt, popup) {
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
  popup.classList.add('popup_is-animated');
  document.removeEventListener('keydown', hidePopupOnEsc);
  clearFormFields(popup);
};

function clearFormFields(popup) {
  if (popup === popupAddCard) {
    formNewPlace.reset();
    setSubmitButtonState(false, formNewPlace.querySelector('.popup__button'));
  };
};

export {openPopup, openImagePopup, checkClickToClosePopup, closePopup};