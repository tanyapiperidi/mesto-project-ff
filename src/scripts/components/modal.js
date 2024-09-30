import {popups} from '../index.js';

function imageEnlarge(evt) {
  const cardImagePopup = document.querySelector('.popup_type_image');
  const imagePopup = cardImagePopup.querySelector('.popup__image');
  const imageSrc = evt.getAttribute('src');
  cardImagePopup.setAttribute('style', 'display: flex;');
  document.addEventListener('keydown', keydownEsc);
  imagePopup.setAttribute('src', imageSrc);
};

function keydownEsc(evt) {
      if (evt.key === 'Escape'){
        closePopup(popups);
      }
};

function openPopup(popup) {
  popup.setAttribute('style', 'display:flex;');
  document.addEventListener('keydown', keydownEsc);
};

function closePopup(popups) {
  popups.forEach(popup => {
  popup.setAttribute('style', 'display:none;');
  document.removeEventListener('keydown', keydownEsc);
  })
};

export {imageEnlarge, openPopup, closePopup};