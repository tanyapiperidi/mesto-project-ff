import '../pages/index.css';
import {initialCards} from './cards.js';
import {listItemCardAdd, cardDelete, cardRender, likeCard}  from './components/card.js';
import {imageEnlarge, openPopup, closePopup} from './components/modal.js';

// @todo: Темплейт карточки

export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const listCard = document.querySelector('.places__list');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
// попапы с 1 классом
const popups = document.querySelectorAll('.popup');
//  popapchiki
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');





initialCards.forEach(function(obj) {
  cardRender(listCard, listItemCardAdd(obj.name, obj.link, cardDelete, likeCard, imageEnlarge));
});

// слушатель карточек

// listCard.addEventListener('click', listCardEvent);

// слушатель нажатия редакт профиль

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
});

// слушатель кнопки добавления карточек и открытие попапа

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// для закрытия попапа за границей картинки и кнопки закрытия

popups.forEach((popup) => {
  popup.addEventListener('click', evt => {
    if (evt.target === popup) {
      closePopup(popup);
    };
  });
  const popupButtonClose = popup.querySelector('.popup__close');
  popupButtonClose.addEventListener('click', () => {
    closePopup(popup);
  });
});
