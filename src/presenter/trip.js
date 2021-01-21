import SortView from '../view/sort.js';
import TripMessageView from '../view/trip-message.js';
import InfoView from '../view/info.js';
import TripPriceView from '../view/trip-price.js';
import CardsView from '../view/cards.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {generateSort} from '../mocks/sort.js';
import {SortType, FilterType, UpdateType, filter} from '../utils/const.js';
import {getTripInfo, getTripPrice, sortWaypointDateAsc, sortWaypointPriceDesc, sortWaypointDurationDesc} from '../utils/event.js';
import WaypointPresenter from '../presenter/waypoint.js';
import WaypointNewPresenter from '../presenter/event-new.js';


export default class Trip {
  constructor(tripContainerElement, waypointContainerElement, waypointsModel, filterModel, dataListModel) {
    this._tripContainerElement = tripContainerElement;
    this._waypointContainerElement = waypointContainerElement;
    this._waypointsModel = waypointsModel;
    this._filterModel = filterModel;
    this._dataListModel = dataListModel;

    this._waypointPresenterMap = new Map();

    const sort = generateSort();
    this._sortComponent = new SortView(sort);
    this._currentSortType = SortType.DAY;

    this._priceComponent = null;
    this._infoComponent = null;

    this._messageComponent = new TripMessageView();
    this._cardsListComponent = new CardsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelWaypoint = this._handleModelWaypoint.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._waypointsModel.attach(this._handleModelWaypoint);
    this._filterModel.attach(this._handleModelWaypoint);

    this._waypointNewPresenter = new WaypointNewPresenter(this._cardsListComponent, this._handleViewAction);
  }

  init(waypointTypeInfoMap, offerInfoMap, destinationInfoMap) {
    this._waypointTypeInfoMap = new Map(waypointTypeInfoMap);
    this._offerInfoMap = new Map(offerInfoMap);
    this._destinationInfoMap = new Map(destinationInfoMap);
    this._sortWaypoints();

    this._renderMenu();
  }

  createWaypoint() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._waypointNewPresenter.init(this._dataListModel);
  }

  _getWaypoints() {
    const filterType = this._filterModel.getFilter();
    const waypoints = this._waypointsModel.getWaypoints();
    const filteredEvents = filter[filterType](waypoints);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filteredEvents.sort(sortWaypointDateAsc);
      case SortType.TIME:
        return filteredEvents.sort(sortWaypointDurationDesc);
      case SortType.PRICE:
        return filteredEvents.sort(sortWaypointPriceDesc);
      default:
        return filteredEvents;
    }
  }

  _renderSort() {
    render(this._waypointContainerElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

  }

  _renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter(this._cardsListComponent, this._handleViewAction, this._handleModeChange);
    waypointPresenter.init(waypoint, this._dataListModel);
    this._waypointPresenterMap.set(waypoint.id, waypointPresenter);
  }


  _renderWaypoints() {
    render(this._waypointContainer, this._cardsListComponent, RenderPosition.AFTEREND);
    this._waypoints.forEach((waypoint) => this._renderWaypoint(waypoint));
  }

  _renderMessage() { // no waypoints
    render(this._waypointContainerElement, this._messageComponent, RenderPosition.AFTERBEGIN);
  }

  _renderInfo(waypoints) {
    if (this._infoComponent !== null) {
      this._infoComponent = null;
    }

    const tripInfo = getTripInfo(waypoints);
    this._infoComponent = new InfoView(tripInfo);
    render(this._tripContainerElement, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPrice(waypoints) {
    if (this._priceComponent !== null) {
      this._priceComponent = null;
    }

    const totalPriceForWaypoints = getTripPrice(waypoints);
    this._priceComponent = new TripPriceView(totalPriceForWaypoints);
    render(this._infoComponent, this._priceComponent, RenderPosition.BEFOREEND);
  }

  _renderMenu() {
    const waypoints = this._getWaypoints();

    if (this._waypoints.length === 0) {
      this._renderMessage();
      return;
    }
    this._renderInfo(waypoints);
    this._renderPrice(waypoints);
    this._renderSort();
    this._renderWaypoints(waypoints);
  }

  _clearMenu() {
    this._waypointNewPresenter.destroy();

    this._waypointPresenterMap.forEach((presenter) => presenter.destroy());
    this._waypointPresenterMap.clear();

    remove(this._sortComponent);
    remove(this._messageComponent);
    remove(this._infoComponent);
    remove(this._priceComponent);
  }

  _handleViewAction() {

  }

  _handleModelWaypoint() {

  }

  _handleModeChange() {
    this._waypointNewPresenter.destroy();
    this._waypointPresenterMap.forEach((presenter) => presenter.resetView());

  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearMenu();
    this._renderMenu();
  }
}
