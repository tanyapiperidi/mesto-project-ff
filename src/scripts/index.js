import '../pages/index.css';
import {initialCards} from './cards.js';
import {initialCard, cardDelete, toggleCardLike}  from '../components/places/card.js';
import {openPopup, closePopup} from '../components/modal/modal.js';

// @todo:  Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo:  DOM узлы

const listCard = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
// @todo:  Попапы 
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image'),
      popupImageTag = popupImage.querySelector('.popup__image'),
      popupImageText = popupImage.querySelector('.popup__caption');
// @todo:  Форма редактирования профиля
const formEditProfile = document.forms.editProfile,
      profileNameInput = formEditProfile.elements.name,
      profileDescriptionInput = formEditProfile.elements.description;
// @todo:  Форма добавления карточки
const formNewCard = document.forms.newPlace,
      placeNameInput = formNewCard.elements.placeName,
      ImageLinkInput = formNewCard.elements.link;
// Данные карточки и ее функции

const cardFunction = {
  cardDelete: cardDelete,
  toggleCardLike: toggleCardLike,
  populatePopupImage: populatePopupImage
};

//  @todo:  Инициализация карточек

initialCards.forEach(function(cardData) {
  cardRender(listCard, initialCard(cardTemplate, cardData, cardFunction));
});

// @todo: Вывести карточки на страницу
 
function cardRender(container, cardData, position = 'append') {
  if (position === 'prepend') { 
    container.prepend(cardData); 
    } 
    else { 
    container.append(cardData); 
    };
};

// Открытие попапа редактирования профиля при клике на кнопку и заполнение полей

buttonEditProfile.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

// Открытие попапа добавления карточки при клике 

buttonAddCard.addEventListener('click', () => {
  formNewCard.reset();
  openPopup(popupAddCard);
});

// Обработка отпраки формы и изменение кнопки сохранить

formEditProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(popupEditProfile);
});

// обработка отправки формы, измн кнопки сохранить и очистка полей ввода

formNewCard.addEventListener('submit', evt => {
  evt.preventDefault();
  const cardData = {
    name: placeNameInput.value,
    link: ImageLinkInput.value
  };
  cardRender(listCard, initialCard(cardTemplate, cardData, cardFunction), 'prepend');
  closePopup(popupAddCard);
});

// Заполнение данных попапа изображения

function populatePopupImage(name, link) {
  popupImageTag.src = link;
  popupImageTag.alt = name;
  popupImageText.textContent = name;
  openPopup(popupImage);
};

// для закрытия попапов при клике на оверлей и кнопки закрыть

popups.forEach((popup) => {
  const buttonClose = popup.querySelector('.popup__close');
  popup.addEventListener('click', evt => {
    if (evt.target === popup || evt.target === buttonClose) {
      closePopup(popup);
    };
  });
});