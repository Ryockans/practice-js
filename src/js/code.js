const buttons = document.querySelector('.buttons');
const modalWrapper = document.querySelector('.modal__wrapper');
let modalWindow;

// добавляю обработчик для кнопки
buttons.addEventListener('click', function (event) {
  if (!event.target.classList.contains('trigger')) return;

// Имя модификатора триггера и соответствующего окна совпадают
  const modalWindowMod = Array.from(event.target.classList).find((item) => {
    if (item.startsWith('-')) return true;
  })

  modalWindow = document.querySelector('.modal.' + modalWindowMod);

  modalWrapper.classList.add('-toggled');
  setTimeout(() => modalWindow.classList.add('-toggled'), 0);

  document.addEventListener('click', closeModal); // обработчик на клик
  window.addEventListener('keydown', closeModalByKey) // обработчик на эскейп
});

function closeModal(event) {
  if (!event.target.classList.contains('modal__button') && !event.target.classList.contains('modal__close')) return;

  modalWindow.classList.remove('-toggled');
  setTimeout(() => modalWrapper.classList.remove('-toggled'), 200);
}

function closeModalByKey(event) {
  if (event.code !== 'Escape') return;

  modalWindow.classList.remove('-toggled');
  setTimeout(() => modalWrapper.classList.remove('-toggled'), 200);
}