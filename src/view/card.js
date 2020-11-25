import {TYPES_STAY} from "../mocks/event";
import {calculateTimeDifference} from "../util";
import {castTimeDateFormat} from "../util";
import {events} from "../mocks/event";

const createOffersTemplate = (array) => {
  return array.map(({name, cost}) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${cost}</span>
       </li>`
    );
  }).join(`\n`);
};

export const createCardTemplate = (cardObject) => {
  const {type, city, price, startTime, endTime, options} = cardObject;
  const difference = calculateTimeDifference(startTime, endTime);
  const [days, hours, minutes] = difference;
  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">MAR 18</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${TYPES_STAY.includes(type) ? `in` : `to`} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startTime}">${castTimeDateFormat(startTime.getHours())}:${castTimeDateFormat(startTime.getMinutes())}</time>
            &mdash;
            <time class="event__end-time" datetime="${endTime}">${castTimeDateFormat(endTime.getHours())}:${castTimeDateFormat(endTime.getMinutes())}</time>
          </p>
          <p class="event__duration">${days === 0 ? `` : `${castTimeDateFormat(days)}D`} ${days + hours === 0 ? `` : `${castTimeDateFormat(hours)}H`} ${castTimeDateFormat(minutes)}M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">20</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">

          <li class="event__offer">
            <span class="event__offer-title"> ${createOffersTemplate(options)}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>
        </ul>
        <button class="event__favorite-btn event__favorite-btn--active" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export const eventsMarkup = events.slice(1).map(createCardTemplate);
