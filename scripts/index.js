// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const listCard = document.querySelector('.places__list');
const buttonAddCard = document.querySelector('.profile__add-button');

// @todo: Функция создания карточки

function listItemCardAdd(title, link) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__title');
  const cardImage = cardItem.querySelector('.card__image');
  cardTitle.textContent = title;
  cardImage.setAttribute('src', link);
  cardItem.querySelector('.card__delete-button').addEventListener('click', () => {
    cardDelete(cardItem);
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
  cardRender(listCard, listItemCardAdd(obj.name, obj.link));
})