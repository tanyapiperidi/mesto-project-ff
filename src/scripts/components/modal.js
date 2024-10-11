function imageEnlarge(name, link) {
  const imagePopup = document.querySelector('.popup_type_image');
  const image = imagePopup.querySelector('.popup__image');
  const text = imagePopup.querySelector('.popup__caption')
  // const imageSrc = evt.getAttribute('src');
  imagePopup.setAttribute('style', 'display: flex;');
  image.setAttribute('src', link);
  text.textContent = name
  function handleKeydown(evt) {
    keydownEsc(evt, imagePopup)
  }
  document.addEventListener('keydown', handleKeydown);
};

function keydownEsc(evt, popup) {
      if (evt.key === 'Escape'){
        closePopup(popup);
      }
};

function openPopup(popup) {
  popup.setAttribute('style', 'display:flex;');
  function handleKeydown(evt) {
    keydownEsc(evt, popup)
  }
  document.addEventListener('keydown', handleKeydown);
};

function closePopup(popup) {
  popup.setAttribute('style', 'display:none;');
  document.removeEventListener('keydown', keydownEsc);
};

export {imageEnlarge, openPopup, closePopup};