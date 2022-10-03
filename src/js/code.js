class StickySidebar {
  constructor(settings) {
    this.element = settings.element;
    this.attachPoint = settings.attachPoint;
    this.isRight = settings.isRight || false;
    this.style = this.element.style;
    this.attachRec = this.attachPoint.getBoundingClientRect();
    this.upperSticky = this.attachRec.top + window.scrollY;
    this.oldScroll = 0;
    StickySidebar.AllItems.push(this);
  }

  static AllItems = [];

  get windowSize() {
    return {
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth
    }
  }

  get parameters() {
    return {
      stickyPoint: Math.round(this.windowSize.height - this.rec.height),
      yOffset: this.rec.top + window.scrollY,
      isTooLong: this.rec.height >= this.attachRec.height,
      isShorterThanWindow: this.rec.height < this.windowSize.height,
      isTopLimit: this.topBorder <= this.upperSticky,
      isNearWindowEdge: Math.round(this.rec.top) < 0,
    }
  }

  initialize() {
    const topAttachPoint = this.attachRec.top;
    this.style.position = 'absolute';
    this.style.top = topAttachPoint + 'px';
    this.reCalc();
    window.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('resize', this.reCalc.bind(this));
  }

  setPosition() {
    const leftAttachPoint = this.attachRec.left - this.rec.width;
    const rightAttachPoint = this.attachRec.right;

    if (this.isRight) {
      this.style.left = rightAttachPoint + 'px';
    } else {
      this.style.left = leftAttachPoint + 'px';
    }
  }

  reCalc() {
    this.rec = this.element.getBoundingClientRect();
    this.attachRec = this.attachPoint.getBoundingClientRect();
    this.upperSticky = this.attachRec.top + window.scrollY;
    this.topBorder = Math.round(this.rec.top + window.scrollY);
    this.bottomBorder = Math.round(this.windowSize.height - this.rec.bottom);

    this.setPosition();
  }

  onScroll() {
    this.rec = this.element.getBoundingClientRect();
    this.isScrollDown = this.oldScroll <= window.scrollY;
    this.topBorder = Math.round(this.rec.top + window.scrollY);
    this.bottomBorder = Math.round(this.windowSize.height - this.rec.bottom);

    if (this.parameters.isTooLong) return;

    if (this.parameters.isShorterThanWindow) {
      this.scrollShortSidebar();
      return;
    }

    this.commonScroll();

    this.oldScroll = window.scrollY;
  }

  scrollShortSidebar() {
    if (this.parameters.isNearWindowEdge) {
      this.style.position = 'fixed';
      this.style.top = '0';
    } else if (this.parameters.isTopLimit) {
      this.style.position = 'absolute';
      this.style.top = this.upperSticky + 'px'
    }
  }

  commonScroll() {
    if (this.bottomBorder >= 0) {

      if (this.isScrollDown) {
        this.style.position = 'fixed';
        this.style.top = this.parameters.stickyPoint + 'px';
      } else {
        this.style.position = 'absolute';
        this.style.top = this.parameters.yOffset + 'px';
      }

    } else if (this.bottomBorder <= this.parameters.stickyPoint) {

      if (this.isScrollDown) {
        if (this.parameters.isTopLimit) return;
        this.style.position = 'absolute';
        this.style.top = this.parameters.yOffset + 'px';
      } else {

        if (this.parameters.isTopLimit) {
          this.style.position = 'absolute';
          this.style.top = this.upperSticky + 'px'
        } else {
          this.style.position = 'fixed';
          this.style.top = 0 + 'px';
        }

      }

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

for (let sidebar of StickySidebar.AllItems) {
  sidebar.initialize();
}



