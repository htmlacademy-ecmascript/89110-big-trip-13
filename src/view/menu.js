import AbstractView from "./abstract.js";

const createMenuTemplate = (menuTabs) => {
  const menuMarkup = menuTabs.map((menu) => {
    const {title, isChecked} = menu;
    return (
      `<a class="trip-tabs__btn ${isChecked ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`
    );
  }).join(``);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${menuMarkup}
     </nav>`
  );
};

export default class Menu extends AbstractView {
  constructor(menuTabs) {
    super();
    this._menus = menuTabs;
  }

  getTemplate() {
    return createMenuTemplate(this._menus);
  }
}
