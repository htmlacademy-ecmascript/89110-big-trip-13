export const SortType = {
  DAY: `sort-day`,
  EVENT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
  OFFER: `sort-offer`
};

export const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const MenuItem = {
  TABLE: `table`,
  STATISTICS: `statistics`
};

export const waypointTypes = new Map(
    [
      [
        `taxi`,
        {
          title: `Taxi`,
          src: `img/icons/taxi.png`,
        }
      ],
      [
        `bus`,
        {
          title: `Bus`,
          src: `img/icons/bus.png`,
        }
      ],
      [
        `train`,
        {
          title: `Train`,
          src: `img/icons/train.png`,
        }
      ],
      [
        `ship`,
        {
          title: `Ship`,
          src: `img/icons/ship.png`,
        }
      ],
      [
        `transport`,
        {
          title: `Transport`,
          src: `img/icons/transport.png`,
        }
      ],
      [
        `drive`,
        {
          title: `Drive`,
          src: `img/icons/drive.png`,
        }
      ],
      [
        `flight`,
        {
          title: `Flight`,
          src: `img/icons/flight.png`,
        }
      ],
      [
        `check-in`,
        {
          title: `Check-In`,
          src: `img/icons/check-in.png`,
        }
      ],
      [
        `sightseeing`,
        {
          title: `Sightseeing`,
          src: `img/icons/sightseeing.png`,
        }
      ],
      [
        `restaurant`,
        {
          title: `Restaurant`,
          src: `img/icons/restaurant.png`,
        }
      ],
    ]
);