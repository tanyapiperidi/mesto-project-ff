import '../pages/index.css';
import {initialCards} from './cards.js';
import {initialCard, cardDelete, toggleCardLike, cardRender}  from '../components/places/card.js';
import {openPopup, openImagePopup, checkClickToClosePopup, closePopup} from '../components/modal/modal.js';
import {populateEditProfilePopup, handleFormSubmit} from '../components/modal/form/form.js';
import {setSubmitButtonState} from '../components/modal/form/validation.js';

// @todo:  Темплейт карточки

export const cardTemplate = document.querySelector('#card-template').content;

// @todo:  DOM узлы

const listCard = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
// @todo:  Попапы 
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
export const popupAddCard = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');
// @todo:  Форма редактирования профиля
const formEditProfile = document.forms.editProfile;
const profileNameInput = formEditProfile.elements.name;
const profileDescriptionInput = formEditProfile.elements.description;
const buttonSubmitFormEditProfile = formEditProfile.querySelector('.popup__button');
// @todo:  Форма добавления карточки
export const formNewCard = document.forms.newPlace;
const placeNameInput = formNewCard.elements.placeName;
const ImageLinkInput = formNewCard.elements.link;
export const buttonSubmitFormNewCard = formNewCard.querySelector('.popup__button');

//  @todo:  Инициализация карточек

initialCards.forEach(function(obj) {
  cardRender(listCard, initialCard(obj.name, obj.link, cardDelete, toggleCardLike, openImagePopup));
});

// Открытие попапа редактирования профиля при клике на кнопку и заполнение полей

buttonEditProfile.addEventListener('click', () => {
  populateEditProfilePopup(profileName, profileDescription, profileNameInput, profileDescriptionInput);
  openPopup(popupEditProfile);
});

// Открытие попапа добавления карточки при клике 

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// Обработка отпраки формы и изменение кнопки сохранить

formEditProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  handleFormSubmit(profileName, profileDescription, profileNameInput, profileDescriptionInput);
  closePopup(popupEditProfile);
  setSubmitButtonState(false, buttonSubmitFormEditProfile);
});

// обработка отправки формы, измн кнопки сохранить и очистка полей ввода

formNewCard.addEventListener('submit', evt => {
  evt.preventDefault();
  cardRender(listCard, initialCard(placeNameInput.value, ImageLinkInput.value, cardDelete, toggleCardLike, openImagePopup),'prepend');
  closePopup(popupAddCard);
  formNewCard.reset();
  setSubmitButtonState(false, buttonSubmitFormNewCard);
});

// Проверка заполненности полей

formEditProfile.addEventListener('input', () => {
  const isValid = profileNameInput.value.length > 0 && profileDescriptionInput.value.length > 0;
  setSubmitButtonState(isValid, buttonSubmitFormEditProfile);
});

formNewCard.addEventListener('input', () => {
  const isValid = placeNameInput.value.length > 0 && ImageLinkInput.value.length > 5;
  setSubmitButtonState(isValid, buttonSubmitFormNewCard);
});

// для закрытия попапов при клике на оверлей и кнопки закрыть

popups.forEach((popup) => {
  popup.addEventListener('click', evt => {
    checkClickToClosePopup(evt, popup, popup.querySelector('.popup__close'));
  });
});