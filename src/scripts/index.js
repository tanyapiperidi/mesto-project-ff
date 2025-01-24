import '../pages/index.css';
import {initialCard, cardLikeMyReactions, toggleCardLike}  from '../components/places/card.js';
import {openPopup, closePopup} from '../components/modal/modal.js';
import {clearValidation, enableValidation} from '../components/validation/validation.js';
import {getInitialCards, getUserProfile, postAddCard, patchUserProfile, deleteCardRequest, putAddCardLike, deleteCardLike, patchUserProfileImage} from '../components/api/api.js';

// @todo:  Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo:  DOM узлы
const listCard = document.querySelector('.places__list');
const profileInfo = document.querySelector('.profile__info');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImageLink = document.querySelector('.profile__image');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
// @todo:  Попапы 
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit'),
      popupEditAvatarProfile = document.querySelector('.popup_type_edit-avatar-profile');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image'),
      popupImageTag = popupImage.querySelector('.popup__image'),
      popupImageText = popupImage.querySelector('.popup__caption');
const popupDeleteCard = document.querySelector('.popup_type_delete-card'),
      popupDeleteCardButton = popupDeleteCard.querySelector('.popup__button');
// @todo:  Форма редактирования профиля
const formEditProfile = document.forms.editProfile,
      profileNameInput = formEditProfile.elements.name,
      profileDescriptionInput = formEditProfile.elements.description;
// @todo:  Форма редактирования аватара профиля
const formNewAvatarProfile = document.forms.newAvatarProfile,
      profileUrlAvatarInput = formNewAvatarProfile.elements.link;
// @todo:  Форма добавления карточки
const formNewCard = document.forms.newPlace,
      placeNameInput = formNewCard.elements.placeName,
      ImageLinkInput = formNewCard.elements.link;

// @todo:  Функции карточки 
const cardFunction = {
  cardDelete: cardDelete,
  // submitCardDelete: submitCardDelete,
  // cardDeleteRequestServer: deleteCard,
  cardLikeMyReactions: cardLikeMyReactions,
  toggleCardLike: toggleCardLike,
  populatePopupImage: populatePopupImage,
  openPopup: openPopup,
  closePopup: closePopup,
  putAddCardLike: putAddCardLike, 
  deleteCardLike: deleteCardLike
};

// Классы и селекторы для валидации
const validationConfing = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// @todo: Вызов работы валидации форм
enableValidation(validationConfing); 

// @todo: Вызо функций заполнения данных пользователя и добавления карточек
Promise.all([getInitialCards(), getUserProfile()])
.then((apiResult) => {
  const [cardsData, userDataProfile] = [apiResult[0], apiResult[1]];
  profileInfo.setAttribute('id', `${userDataProfile._id}`);
  cardsData.forEach(cardData => {
    cardRender(listCard, initialCard(cardTemplate, cardData, cardFunction, profileInfo));
  });
  initializeUserDetails(userDataProfile);
})
.catch(err => console.log(`Ошибка.....: ${err}`));

// @todo: Заполнение данных пользователя
const initializeUserDetails = (userDataProfile) => {
  profileName.textContent = userDataProfile.name;
  profileDescription.textContent = userDataProfile.about;
  profileImageLink.style.backgroundImage = `url(${userDataProfile.avatar})`;
};

// @todo: Вывести карточки на страницу
function cardRender(container, cardData, position = 'append') {
  if (position === 'prepend') { 
    container.prepend(cardData); 
    } 
  else { 
    container.append(cardData); 
  };
};

// @todo: Функция открытия попапа подтверждения удаления карточки
function cardDelete(cardId, cardItem) {
  openPopup(popupDeleteCard);
  popupDeleteCardButton.onclick = () => submitCardDelete(cardId, cardItem);
};

// @todo: Функция удаления карточки на сервере, и на странице
const submitCardDelete = (cardId, cardItem) => {
  deleteCardRequest(cardId)
  .then(() => {
    cardItem.remove();
    closePopup(popupDeleteCard);
  })
  .catch(err => console.log(`Ошибка.....: ${err}`));
};

// @todo: Изменение текста кнопки отправки формы
const renderLoading = (form, status) => {
  if(status) {
    form.querySelector('.popup__button').textContent = 'Сохранение...';
  }
  else {
    form.querySelector('.popup__button').textContent = 'Сохранить';
  };
};

// @todo: Открытие попапа редактирования профиля при клике на кнопку с ручкой, и заполнение полей
buttonEditProfile.addEventListener('click', () => {
  clearValidation(formEditProfile, validationConfing);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

// @todo: Открытие попапа добавления новой карточки при клике на кнопку "+" 
buttonAddCard.addEventListener('click', () => {
  formNewCard.reset();
  clearValidation(formNewCard, validationConfing);
  openPopup(popupAddCard);
});

// @todo: Обработка отпраки формы редактирования профиля, и изменение данных профиля
formEditProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  renderLoading(formEditProfile, true);
  patchUserProfile({name: profileNameInput.value, about: profileDescriptionInput.value})
  .then(patchUserProfile => {
    profileName.textContent = patchUserProfile.name;
    profileDescription.textContent = patchUserProfile.about;
    closePopup(popupEditProfile);
  })
  .catch(err => console.log(`Ошибка.....: ${err}`))
  .finally(() => {
    renderLoading(formEditProfile, false);
  });
});

// @todo: Обработка отправки формы изменения аватара профиля, и изменения аватара профиля
formNewAvatarProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  renderLoading(formNewAvatarProfile, true);
  patchUserProfileImage(profileUrlAvatarInput.value)
  .then(dataUserProfile => {
    profileImageLink.style.backgroundImage = `url(${dataUserProfile.avatar})`;
    closePopup(popupEditAvatarProfile);
  })
  .catch(err => console.log(`Ошибка.....: ${err}`))
  .finally(() => {
    renderLoading(formNewAvatarProfile, false);
  });
});

// @todo: Открытие попапа редактирования аватара при клике на аватар профиля
profileImageLink.addEventListener('click', () => {
  formNewAvatarProfile.reset();
  clearValidation(formNewAvatarProfile, validationConfing);
  openPopup(popupEditAvatarProfile);
});

// @todo: Обработка отправки формы новой карточки, и добавление новой карточки
formNewCard.addEventListener('submit', evt => {
  evt.preventDefault();
  renderLoading(formNewCard, true);
  postAddCard({name: placeNameInput.value, link: ImageLinkInput.value})
  .then(addCardData => {
    cardRender(listCard, initialCard(cardTemplate, addCardData, cardFunction, profileInfo), 'prepend');
    closePopup(popupAddCard);
  })
  .catch(err => console.log(`Ошибка.....: ${err}`))
  .finally(() => {
    renderLoading(formNewCard, false);
  });
});

// @todo: Заполнение данных попапа изображения при клике на изображение карточки
function populatePopupImage(name, link) {
  popupImageTag.src = link;
  popupImageTag.alt = name;
  popupImageText.textContent = name;
  openPopup(popupImage);
};

// @todo: Закрытие попапов при клике на оверлей, и кнопки "esc"
popups.forEach((popup) => {
  const buttonClose = popup.querySelector('.popup__close');
  popup.addEventListener('click', evt => {
    if (evt.target === popup || evt.target === buttonClose) {
      closePopup(popup);
    };
  });
});