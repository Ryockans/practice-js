class Modal {
  constructor(element) {
    this.zIndex = 100;
    this.element = document.querySelector('.modal.-' + element);
    this.wrapper = document.querySelector('.modal__wrapper');
    this.trigger = document.querySelector('.trigger.-' + element);
    this.cross = this.element.querySelector('.modal__close');
    this.buttons = Array.from(this.element.querySelectorAll('.modal__button'));
    Modal.AllModals.push(this);
  }

  static AllModals = [];

  static OpenedModals = [];

  open() {
    setTimeout(() => this.wrapper.classList.add('-toggled'), 0);
    setTimeout(() => {
      this.element.style.zIndex = this.zIndex + Modal.OpenedModals.length + '';
      this.element.classList.add('-toggled');
    }, 200);

    Modal.OpenedModals.push(this);
    console.dir(Modal.OpenedModals);
    this.addListeners();
  }

  close() {
    setTimeout(() => {
      this.element.style.zIndex = '0';
      this.element.classList.remove('-toggled');
    }, 0);
    setTimeout(() => this.wrapper.classList.remove('-toggled'), 200);
    Modal.OpenedModals.pop();
    console.dir(Modal.OpenedModals);
    this.removeListeners();
  }

  addListeners() {
    this.element.addEventListener('click', this);
    window.addEventListener('keydown', this);
  }

  removeListeners() {
      this.element.removeEventListener('click', this);
      window.removeEventListener('keydown', this);
  }

  handleEvent(event) {
    const clickEvent = (event.type === 'click');
    const escEvent = (event.type === 'keydown' && event.code === 'Escape')
    const isTrigger = (event.target === this.trigger);
    const isButton = (this.buttons.includes(event.target));
    const isCloseButton = (event.target === this.cross);

    if (clickEvent && isTrigger) {
      this.open();
    }

    if (clickEvent && (isButton || isCloseButton)) {
      this.close();
    }

    if (escEvent) {
      this.close()
    }
  }
}

new Modal('first');
new Modal('second');
new Modal('third');

for (let modalWindow of Modal.AllModals) {
  modalWindow.trigger.addEventListener('click', modalWindow)
}
