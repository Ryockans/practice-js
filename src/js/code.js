class Collapse {
  constructor(elementName, accordion = false) {
    this.element = document.querySelector('.collapse.-' + elementName);
    this.tabs = this.element.querySelectorAll('.collapse__item');
    this.accordion = accordion;
    this.activeTabs = [];
    Collapse.AllCollapses.push(this);
  }

  static AllCollapses = [];

  openTab(tab) {
    const tabText = tab.querySelector('.collapse__text');
    const tabButton = tab.querySelector('.collapse__toggle');

    if (this.accordion) {
      this.activeTabs.forEach((item) => this.closeTab(item));
    }

    tabText.classList.add('-toggled');
    tabButton.classList.add('-toggled');

    this.activeTabs.push(tab);
  }

  closeTab(tab) {
    const tabText = tab.querySelector('.collapse__text');
    const tabButton = tab.querySelector('.collapse__toggle');
    const tabIndex = this.activeTabs.indexOf(tab);

    tabText.classList.remove('-toggled');
    tabButton.classList.remove('-toggled');

    this.activeTabs.splice(tabIndex, 1);
  }

  handleEvent(event) {
    const isTabClick = (event.type === 'click' && targetTab !== null);
    const targetTab = event.target.closest('.collapse__item');
    const isLocal = Array.from(this.tabs).includes(targetTab);

    if (!isLocal || !isTabClick) return;

    if (this.activeTabs.includes(targetTab)) {
      this.closeTab(targetTab)
    } else this.openTab(targetTab);
  }
}

new Collapse('basic');
new Collapse('accordion', true);

for (let item of Collapse.AllCollapses) {
  item.element.addEventListener('click', item);
}