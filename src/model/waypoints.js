import Observer from '../utils/observer.js';

export default class Waypoints extends Observer {
  constructor() {
    super();
    this._waypoints = [];
  }

  setWaypoints(updateType, waypoints) {
    this._waypoints = waypoints.slice();
    this._notify(updateType);
  }

  getWaypoints() {
    return this._waypoints;
  }

  updateWaypoint(updateType, update) {
    const index = this._waypoints.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update a non existing point`);
    }

    this._waypoints = [
      ...this._waypoints.slice(0, index),
      update,
      ...this._waypoints.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addWaypoint(updateType, update) {
    this._waypoints = [
      update,
      ...this._waypoints
    ];

    this._notify(updateType, updateType);
  }

  deleteWaypoint(updateType, update) {
    const index = this._waypoints.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete a non existing point`);
    }

    this._waypoints = [
      ...this._waypoints.slice(0, index),
      ...this._waypoints.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(waypoint) {
    const destination = Object.assign({}, waypoint.destination, {photos: waypoint.destination.pictures});
    delete destination.pictures;

    const adaptedWaypoint = Object.assign(
        {},
        waypoint,
        {
          price: waypoint.base_price,
          startTime: waypoint.date_from !== null ? new Date(waypoint.date_from) : waypoint.date_from,
          endTime: waypoint.date_to !== null ? new Date(waypoint.date_to) : waypoint.date_to,
          isFavorite: waypoint.is_favorite,
          city: {
            name: waypoint.destination.name,
            text: waypoint.destination.description,
            photos: waypoint.destination.pictures,
          },
          eventType: {
            type: waypoint.type,
            offers: waypoint.offers,
          },
        }
    );

    delete adaptedWaypoint.date_from;
    delete adaptedWaypoint.date_to;
    delete adaptedWaypoint.base_price;
    delete adaptedWaypoint.is_favorite;

    return adaptedWaypoint;
  }


  static adaptToServer(waypoint) {
    const adaptedWaypoint = Object.assign(
        {},
        waypoint,
        {
          "base_price": Number(waypoint.price),
          "date_from": waypoint.startTime instanceof Date ? waypoint.startTime.toISOString() : null,
          "date_to": waypoint.endTime instanceof Date ? waypoint.endTime.toISOString() : null,
          "type": waypoint.eventType.type.toLowerCase(),
          "offers": waypoint.eventType.offers,
          "is_favorite": waypoint.isFavorite,
          "destination": {
            name: waypoint.city.name,
            description: waypoint.city.text,
            pictures: waypoint.city.photos,
          },
        }
    );

    delete adaptedWaypoint.dateStart;
    delete adaptedWaypoint.dateEnd;
    delete adaptedWaypoint.city;
    delete adaptedWaypoint.eventType;
    delete adaptedWaypoint.price;
    delete adaptedWaypoint.isFavorite;

    return adaptedWaypoint;
  }
}
