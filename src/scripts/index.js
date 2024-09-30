import '../pages/index.css';
import {initialCards} from './cards.js';
import {listItemCardAdd, cardDelete, cardRender, listCardEvent}  from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';

// @todo: Темплейт карточки

export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const listCard = document.querySelector('.places__list');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
// попапы с 1 классом
export const popups = document.querySelectorAll('.popup');
const popupContent = document.querySelectorAll('.popup__content');
// кнопка закрытия попапа
const popupsClose = document.querySelectorAll('.popup__close');
//  popapchiki
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');





initialCards.forEach(function(obj) {
  cardRender(listCard, listItemCardAdd(obj.name, obj.link, cardDelete));
});

// слушатель карточек

listCard.addEventListener('click', listCardEvent);

// слушатель нажатия редакт профиль

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
});

// слушатель кнопки добавления карточек и открытие попапа

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

popupsClose.forEach((popup) => {
  popup.addEventListener('click', () => {
    closePopup(popups);
    })
});
  
// для закрытия попапа за границей картинки

popups.forEach((popup) => {
  popup.addEventListener('click', evt => {
    if (evt.target === popup && evt.target !== popupContent) {
      closePopup(popups);
    }
  })
});
