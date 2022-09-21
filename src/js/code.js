const buttons = document.querySelector(".buttons");
const modalWrapper = document.querySelector(".modal__wrapper");
let modalWindow;

// добавляю обработчик для кнопки
buttons.addEventListener("click", function (event) {
  if (!event.target.classList.contains("trigger")) return;

  // Имя модификатора триггера и соответствующего окна совпадают
  const modalWindowMod = Array.from(event.target.classList).find((item) => {
    if (item.startsWith("-")) return true;
  });

  modalWindow = document.querySelector(".modal." + modalWindowMod);

  document.body.style.overflow = "hidden";
  modalWrapper.classList.add("-toggled");
  setTimeout(() => modalWindow.classList.add("-toggled"), 0);

  document.addEventListener("click", closeModalByClick); // обработчик на клик
  window.addEventListener("keydown", closeModalByKey); // обработчик на эскейп
  modalWindow.addEventListener("click", showModalInternal); // обработчик на вызов внутреннего окна
});

function closeModalByClick(event) {
  if (event.target.classList.contains("-show")) return;
  if (
    !event.target.classList.contains("modal__button") &&
    !event.target.classList.contains("modal__close")
  )
    return;

  closeModal();
}

function closeModalByKey(event) {
  if (event.code === "Escape") closeModal();
}

function closeModal() {
  modalWindow.classList.remove("-toggled");
  setTimeout(() => {
    document.body.style.overflow = "auto";
    modalWrapper.classList.remove("-toggled");
  }, 200);
}

function showModalInternal(event) {
  if (!event.target.classList.contains("-show")) return;
  const internalModal = modalWrapper.querySelector(".-internal");

  document.removeEventListener("click", closeModalByClick);
  window.removeEventListener("keydown", closeModalByKey);

  modalWindow.style.zIndex = "-1";
  setTimeout(() => internalModal.classList.add("-toggled"), 0);

  internalModal.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("modal__button") ||
      event.target.classList.contains("modal__close")
    )
      closeInternalModal.bind(internalModal)();
  });

  window.addEventListener("keydown", function (event) {
    if (event.code === "Escape") closeInternalModal.bind(internalModal)();
  });
}

function closeInternalModal() {
  setTimeout(() => this.classList.remove("-toggled"), 200);
  modalWindow.style.zIndex = "2";

  setTimeout(() => {
    document.addEventListener("click", closeModalByClick);
    window.addEventListener("keydown", closeModalByKey);
  }, 0);
}
