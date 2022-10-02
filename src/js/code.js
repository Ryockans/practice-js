class Modal {
  constructor(mod) {
    this.zIndex = 100;
    this.element = document.querySelector('.modal.-' + mod);
    this.wrapper = document.querySelector('.modal__wrapper');
    this.background = document.querySelector('.modal__background');
    this.trigger = document.querySelector('.trigger.-' + mod);
    this.cross = this.element.querySelector('.modal__close');
    this.buttons = Array.from(this.element.querySelectorAll('.modal__button'));
    Modal.AllModals.push(this);
  }

  static AllModals = [];

  static OpenedModals = [];

  open() {
    if (Modal.OpenedModals.length === 0) {
      setTimeout(() => this.wrapper.classList.add('-toggled'), 0);
      setTimeout(() => this.background.style.opacity = '0.3', 200);
      document.body.style.overflow = 'hidden';
    }

    setTimeout(() => {
      this.element.style.zIndex = this.zIndex + Modal.OpenedModals.length + '';
      this.element.classList.add('-toggled');
    }, 200);

    this.background.style.zIndex = this.zIndex + Modal.OpenedModals.length + '';

    Modal.OpenedModals.push(this);
    this.addListeners();
  }

  close() {
    this.background.style.zIndex = this.zIndex + Modal.OpenedModals.length - 2 + '';
    setTimeout(() => this.element.classList.remove('-toggled'), 0);
    setTimeout(() => this.element.style.zIndex = '0', 200);
    Modal.OpenedModals.pop();
    this.removeListeners();

    if (Modal.OpenedModals.length === 0) {
      this.background.style.opacity = '0'
      setTimeout(() => this.wrapper.classList.remove('-toggled'), 200);
      document.body.style.overflow = 'auto';
    }
  }

  addListeners() {
    const isInternalWindow = Modal.OpenedModals.length > 1;
    this.element.addEventListener('click', this);
    window.addEventListener('keydown', this);

    if (isInternalWindow) window.removeEventListener('keydown', Modal.OpenedModals[Modal.OpenedModals.length - 2]);
  }

  removeListeners() {
    const isNotLastWindow = Modal.OpenedModals.length >= 1;
    this.element.removeEventListener('click', this);
    window.removeEventListener('keydown', this);

    if (isNotLastWindow) window.addEventListener('keydown', Modal.OpenedModals[Modal.OpenedModals.length - 1]);
  }

  handleEvent(event) {
    const clickEvent = (event.type === 'click');
    const escEvent = (event.type === 'keydown' && event.code === 'Escape')
    const isTrigger = (event.target === this.trigger);
    const isButton = (this.buttons.includes(event.target));
    const isInternalTrigger = (event.target.classList.contains('trigger'))
    const isCloseButton = (event.target === this.cross);

    if (clickEvent && isTrigger) {
      this.open();
    }

    if (clickEvent && (isButton || isCloseButton) && !isInternalTrigger) {
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
new Modal('internal');
new Modal('second-layer');

for (let modalWindow of Modal.AllModals) {
  modalWindow.trigger.addEventListener('click', modalWindow)
}
