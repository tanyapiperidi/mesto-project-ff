import '../pages/index.css';
import {initialCards} from './cards.js';
import {listCardEvent}  from './components/card.js';


// @todo: Темплейт карточки

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#card-template').content;
// dlya zakritiya popapov
const pageContent = document.querySelector('.page__content');
// попапы с 1 классом
const popups = document.querySelector('.popup');
//  popapchiki
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');

// @todo: DOM узлы

const listCard = document.querySelector('.places__list');

// @todo: Функция создания карточки

function listItemCardAdd(name, link, onDelete) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__title');
  const cardImage = cardItem.querySelector('.card__image');
  cardTitle.textContent = name;
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardItem.querySelector('.card__delete-button').addEventListener('click', () => {
    onDelete(cardItem);
  });
  return cardItem;
};

// @todo: Функция удаления карточки

function cardDelete(cardItem) {
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
 
function cardRender(container, cardData) {
  container.append(cardData);
}

initialCards.forEach(function(obj) {
  cardRender(listCard, listItemCardAdd(obj.name, obj.link, cardDelete));
})

// слушатель карточек

listCard.addEventListener('click', (evt) => {
  listCardEvent(evt)
})

// слушатель нажатия редакт профиль

function openPopup(popup) {
  popup.setAttribute('style', 'display:flex;')
  
  const popupsClose = popup.querySelector('.popup__close')
  popupsClose.addEventListener('click', () => {
  closePopup(popup)
  })
}

function closePopup(popup) {
  popup.setAttribute('style', 'display:none;')
}

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile)
})


// слушатель кнопки добавления карточек и открытие попапа

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard)
})

