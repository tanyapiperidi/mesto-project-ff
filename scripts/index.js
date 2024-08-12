// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const buttonAddCard = document.querySelector('.profile__add-button');
const listCard = document.querySelector('.places__list');
// добавление карточки
buttonAddCard.addEventListener('click', function() {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  listCard.append(cardItem);
  // цикл присваивания картинки и заголовка
  const cardTitle = listCard.querySelectorAll('.card__title')
  // const cardTitleArr = Array.from(cardTitle)
  const cardImage = listCard.querySelectorAll('.card__image')
  // const cardImageArr = Array.from(cardImage)
  // cardImageArr.forEach(function(item) {
  //   console.log('hello')
  // })
  for (let i = 0; i < cardImage.length; i++) {
    cardTitle[i].textContent = initialCards[i].name
    cardImage[i].setAttribute('src', initialCards[i].link)
    console.log('hello')
  }
  // удаление карточки
  cardItem.querySelector('.card__delete-button').addEventListener('click', function() {
    cardItem.remove();
  })
})





