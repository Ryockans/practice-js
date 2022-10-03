import {windowSize} from "./parametres";
import {windowRecalc} from "./parametres";

class StickySidebar {
  constructor(settings) {
    this.element = settings.element;
    this.attachPoint = settings.attachPoint;
    this.isRight = settings.isRight || false;
    this.coords = this.element.getBoundingClientRect();
    this.style = this.element.style;
    this.attachCoords = this.attachPoint.getBoundingClientRect();
    this.upperSticky = this.attachCoords.top + window.scrollY;
    this.oldScroll = 0;
    StickySidebar.AllSidebars.push(this);
  }

  static AllSidebars = [];

  initialize() {
    const topAttachPoint = this.attachCoords.top;

    this.style.position = 'absolute';
    this.style.top = topAttachPoint + 'px';
    this.setPosition();
  }

  setPosition() {
    const leftAttachPoint = this.attachCoords.left - this.coords.width;
    const rightAttachPoint = this.attachCoords.right;

    if (this.isRight) {
      this.style.left = rightAttachPoint + 'px';
    } else {
      this.style.left = leftAttachPoint + 'px';
    }
  }

  reCalc() {
    this.coords = this.element.getBoundingClientRect();
    this.attachCoords = this.attachPoint.getBoundingClientRect();
    this.upperSticky = this.attachCoords.top + window.scrollY;
    this.topBorder = Math.round(this.coords.top + window.scrollY);
    this.bottomBorder = Math.round(windowSize.height - this.coords.bottom);

    this.setPosition();
  }

  stickyScroll() {
    const stickyPoint = Math.round(windowSize.height - this.coords.height);
    const yOffset = this.coords.top + window.scrollY;
    const isScrollDown = this.oldScroll <= window.scrollY;
    const isTooLong = this.coords.height >= this.attachCoords.height;
    const isShorterThanWindow = this.coords.height < windowSize.height;
    const isTopLimit = this.topBorder <= this.upperSticky;
    const isNearWindowEdge = Math.round(this.coords.top) < 0;
    this.coords = this.element.getBoundingClientRect();
    this.topBorder = Math.round(this.coords.top + window.scrollY);
    this.bottomBorder = Math.round(windowSize.height - this.coords.bottom);

    if (isTooLong) return;

    if (isShorterThanWindow) {

      if (isNearWindowEdge) {
        this.style.position = 'fixed';
        this.style.top = '0';
      } else if (isTopLimit) {
        this.style.position = 'absolute';
        this.style.top = this.upperSticky + 'px'
      }

      return;
    }

    if (this.bottomBorder >= 0) {

      if (isScrollDown) {
        this.style.position = 'fixed';
        this.style.top = stickyPoint + 'px';
      } else {
        this.style.position = 'absolute';
        this.style.top = yOffset + 'px';
      }

    } else if (this.bottomBorder <= stickyPoint) {

      if (isScrollDown) {
        if (isTopLimit) return;
        this.style.position = 'absolute';
        this.style.top = yOffset + 'px';
      } else {

        if (isTopLimit) {
          this.style.position = 'absolute';
          this.style.top = this.upperSticky + 'px'
        } else {
          this.style.position = 'fixed';
          this.style.top = 0 + 'px';
        }

      }

    }
    this.oldScroll = window.scrollY;
  }

  handleEvent(event) {
    const isScroll = event.type === 'scroll';
    const isResize = event.type === 'resize';

    if (isScroll) this.stickyScroll();
    if (isResize) {
      windowRecalc();
      this.reCalc();
    }
  }
}

const main = document.querySelector('.main');
const sidebarElL = document.querySelector('.sidebar.-left');
const sidebarEl = document.querySelector('.sidebar.-right');

new StickySidebar({
  element: sidebarElL,
  attachPoint: main,
})

new StickySidebar({
  element: sidebarEl,
  attachPoint: main,
  isRight: true
})

for (let sidebar of StickySidebar.AllSidebars) {
  sidebar.initialize();
  window.addEventListener('scroll', sidebar);
  window.addEventListener('resize', sidebar);
}



