import '../pages/index.css';
import {initialCard, cardDelete, cardLikeReactions, toggleCardLike}  from '../components/places/card.js';
import {openPopup, closePopup} from '../components/modal/modal.js';
import {clearValidation, enableValidation} from '../components/validation/validation.js';
import {getInitialCards, getUserProfile, postAddCard, patchUserProfile, deleteCard, putAddCardLike, deleteCardLike} from '../components/api/api.js';

// @todo:  Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo:  DOM узлы
const listCard = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImageLink = document.querySelector('.profile__image');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
// @todo:  Попапы 
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image'),
      popupImageTag = popupImage.querySelector('.popup__image'),
      popupImageText = popupImage.querySelector('.popup__caption');
const popupDeleteCard = document.querySelector('.popup_type_delete-card'),
      popupDeleteCardButton = popupDeleteCard.querySelector('.popup__button');
// @todo:  Формы попапов
const popupForms = document.querySelectorAll('.popup__form');
// @todo:  Форма редактирования профиля
const formEditProfile = document.forms.editProfile,
      profileNameInput = formEditProfile.elements.name,
      profileDescriptionInput = formEditProfile.elements.description;
// @todo:  Форма добавления карточки
const formNewCard = document.forms.newPlace,
      placeNameInput = formNewCard.elements.placeName,
      ImageLinkInput = formNewCard.elements.link;
// ID профиля, для функции добавления карточки
let userProfileId;

const popupDeleteCardClass = {
  popupCardDelete: popupDeleteCard,
  popupButton: popupDeleteCardButton
}

// функции карточки 
const cardFunction = {
  cardDelete: cardDelete,
  cardDeleteRequestServer: deleteCard,
  cardLikeReactions: cardLikeReactions,
  toggleCardLike: toggleCardLike,
  populatePopupImage: populatePopupImage,
  openPopup: openPopup,
  closePopup: closePopup,
  putAddCardLike: putAddCardLike, 
  deleteCardLike: deleteCardLike
};

// Функции делабщие запрос на сервер

// Классы и селекторы для валидации
const validationConfing = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


// Имя и описание профиля 
// заполнение полей данных пользователя 

Promise.all([getInitialCards(), getUserProfile()])
.then((apiResult) => {
  const cardsData = apiResult[0];
  const userDataProfile = apiResult[1];
  cardsData.forEach(cardData => {
    cardRender(listCard, initialCard(cardTemplate, cardData, cardFunction, userDataProfile._id, popupDeleteCardClass));
  })
  initializeUserDetails(userDataProfile);
  userProfileId = userDataProfile._id;
})
.catch((error) => {
  console.log('Ошибка запроса при выполнении запроса:', error)
})


const initializeUserDetails = (userDataProfile) => {
  profileName.textContent = userDataProfile.name;
  profileDescription.textContent = userDataProfile.about;
  profileImageLink.style.backgroundImage = userDataProfile.avatar;
};

// Вызов работы валидации форм
enableValidation(validationConfing); 

//  @todo:  Инициализация карточек
// cardsData.forEach(cardData => {
//   cardRender(listCard, initialCard(cardTemplate, cardData, cardFunction));
// })

// @todo: Вывести карточки на страницу
function cardRender(container, cardData, position = 'append') {
  if (position === 'prepend') { 
    container.prepend(cardData); 
    } 
    else { 
    container.append(cardData); 
    };
};

// Открытие попапа редактирования профиля при клике на кнопку и 
buttonEditProfile.addEventListener('click', () => {
  clearValidation(formEditProfile, validationConfing);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

// Открытие попапа добавления карточки при клике 

buttonAddCard.addEventListener('click', () => {
  clearValidation(formNewCard, validationConfing);
  formNewCard.reset();
  openPopup(popupAddCard);
});

// Обработка отпраки формы и изменение кнопки сохранить

formEditProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  formEditProfile.querySelector('.popup__button').textContent = 'Сохранение...';
  const userDataProfile = {
    name: profileNameInput.value,
    about: profileDescriptionInput.value
  }
  patchUserProfile(userDataProfile)
  .then(patchUserProfile => {
    profileName.textContent = patchUserProfile.name;
    profileDescription.textContent = patchUserProfile.about;
    closePopup(popupEditProfile);
    formEditProfile.querySelector('.popup__button').textContent = 'Сохранить';
  })
});

// обработка отправки формы, измн кнопки сохранить и очистка полей ввода

formNewCard.addEventListener('submit', evt => {
  evt.preventDefault();
  formNewCard.querySelector('.popup__button').textContent = 'Сохранение...'
  const cardData = {
    name: placeNameInput.value,
    link: ImageLinkInput.value
  };
  postAddCard(cardData)
  .then(addCardData => {
    cardRender(listCard, initialCard(cardTemplate, addCardData, cardFunction, userProfileId, popupDeleteCardClass), 'prepend');
    closePopup(popupAddCard);
    formNewCard.querySelector('.popup__button').textContent = 'Сохранить'
  })
  .catch(error => {
    console.log('Ошибка:', error)
  })
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