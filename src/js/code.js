class Tabs {
  constructor(mod) {
    this.element = document.querySelector('.tabs' + mod);
    this.tabs = this.element.querySelector('.tabs__list');
    this.display = this.element.querySelector('.tabs__content');
    this.activeTab = this.tabs.querySelector('.-active') || false;
    this.displayed = this.display.querySelector('.-active') || false;
  }

  initialize() {
    if (!this.activeTab) return;

    const initialMod = '.-' + this.activeTab.textContent.toLowerCase();
    const initialContent = this.display.querySelector(initialMod);

    if (this.displayed !== false) return;
    initialContent.classList.add('-active');
    this.displayed = initialContent;
  }

  displayContent(tab) {
    const tabMod = '.-' + tab.textContent.toLowerCase();
    const tabContent = this.display.querySelector(tabMod);

    console.dir(tabContent)

    if (this.activeTab !== false) {
      this.activeTab.classList.remove('-active');
    }
    tab.classList.add('-active');
    this.activeTab = tab;

    if (this.displayed !== false) this.displayed.classList.remove('-active');
    tabContent.classList.add('-active');
    this.displayed = tabContent;
  }

  handleEvent(event) {
    const tab = event.target.closest('.tabs__unit');
    const isTab = tab.closest('.tabs__list') === this.tabs;
    const isPlug = event.target.classList.contains('-plug');

    if (!isTab && isPlug) return;
    if (tab === this.activeTab) return;

    this.displayContent(tab);
  }
}

const tabs = new Tabs('');

console.dir(tabs)
tabs.initialize();
tabs.element.addEventListener('click', tabs);