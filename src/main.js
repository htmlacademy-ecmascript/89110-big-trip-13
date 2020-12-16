import Info from './view/info.js';
import Menu from './view/menu.js';
import Cards from './view/cards.js';
import Sort from './view/sort.js';
import Cost from './view/cost.js';
import Filter from './view/filter.js';
import Form from './view/form.js';
import Card from './view/card.js';
import NewWaypoint from './view/new-waypoint.js';
import {waypoints} from './mocks/waypoint.js';
import {generateMenuItems} from './mocks/menu.js';
import {generateFilters} from './mocks/filter.js';
import {render, RenderPosition} from "./utils/render.js"; // to add here  - replace, remove
import {OFFERS, DESTINATIONS, WAYPOINT_TYPES} from "./mocks/const.js";
import {isEscapeKey} from "./utils/dom-event.js";

const destinations = DESTINATIONS;
const waypointTypes = WAYPOINT_TYPES;
const offers = OFFERS;

const tripInfoElement = document.querySelector(`.trip-main`);
render(tripInfoElement, new Info(waypoints[0].startTime, waypoints[waypoints.length - 1].endTime).getElement(), RenderPosition.AFTERBEGIN);

const tripCostElement = document.querySelector(`.trip-main__trip-info`);
render(tripCostElement, new Cost().getElement(), RenderPosition.BEFOREEND);
render(tripInfoElement, new NewWaypoint().getElement(), RenderPosition.BEFOREEND);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const filterTabs = generateFilters();
const menuTabs = generateMenuItems();
render(tripControlsElement, new Filter(filterTabs).getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, new Menu(menuTabs).getElement(), RenderPosition.AFTERBEGIN);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, new Sort().getElement(), RenderPosition.AFTERBEGIN);
render(tripEventsElement, new Form(waypoints[0], destinations, waypointTypes, offers).getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new Cards().getElement(), RenderPosition.AFTEREND);

const tripCardsElement = document.querySelector(`.trip-events__list`);

const renderWaypoint = (waypointListElement, waypoint) => {
  const waypointComponent = new Card(waypoint);
  const waypointEditComponent = new Form(waypoint, destinations, waypointTypes, offers);
  const replaceCardToForm = () => {
    waypointListElement.replaceChild(waypointEditComponent.getElement(), waypointComponent.getElement());
  };

  const replaceFormToCard = () => {
    waypointListElement.replaceChild(waypointComponent.getElement(), waypointEditComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  waypointComponent.setClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });


  waypointEditComponent.setClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(waypointListElement, waypointComponent.getElement(), RenderPosition.BEFOREEND);
};

waypoints.forEach((waypointItem) => renderWaypoint(tripCardsElement, waypointItem));
