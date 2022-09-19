const trigger = document.querySelector('.trigger');
const modal = document.querySelector('.modal__wrapper');
const modalWindow = document.querySelector('.modal.-window');
const message = document.querySelector('.modal.-message');

// добавляю обработчик для кнопки
trigger.addEventListener('click', function () {

  modal.classList.add('-toggled');
  setTimeout(() => modalWindow.classList.add('-toggled'), 0);

  document.addEventListener('click', ruleModal); // обработчик на клик
  window.addEventListener('keydown', toggleMessageByKey) // обработчик на эскейп
});

function ruleModal(event) {
  if (!event.target.classList.contains('modal__button') && event.target !== document.querySelector('.modal__close')) return;

  modalWindow.classList.remove('-toggled');
  setTimeout(() => modal.classList.remove('-toggled'), 200);
  window.removeEventListener('keydown', toggleMessageByKey);
}

function toggleMessageByKey(event) {
  if (event.code !== 'Escape') return;

  modalWindow.classList.remove('-toggled');
  setTimeout(() => modal.classList.remove('-toggled'), 200);
}