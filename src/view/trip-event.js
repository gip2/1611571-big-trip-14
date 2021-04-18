import AbstractView from './abstract.js';

export const getMonthAndDay = (date) => date.toDateString().slice(4, 10).toUpperCase();
const getTime = (date) => date.toTimeString().slice(0, 5);

const msecInSecond = 1000;
const secInMin = 60;
const msecInMinute = secInMin * msecInSecond;
const minutesInHour = 60;
const hoursInDay = 24;
const minutesInDay = hoursInDay * minutesInHour;

const durationTemplate = (date1, date2) => {
  const durationMinutes = Math.floor((date2 - date1) / msecInMinute);
  const days = Math.floor(durationMinutes / minutesInDay);
  const hours = Math.floor((durationMinutes - days * minutesInDay) / minutesInHour);
  const minutes = durationMinutes - days * minutesInDay - hours * minutesInHour;
  if (days > 0) {
    return String(days) + 'D ' + hours + 'H ' + minutes + 'M';
  }
  if (hours > 0) {
    return String(hours) + 'H ' + minutes + 'M';
  }
  return String(minutes) + 'M';
};

const createOffersListTemplate = (offers) => {
  if (!offers) {
    return '';
  }
  const liString = offers.reduce((accumulator, element) => {
    const {title, price} = element;
    return accumulator + `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        +€&nbsp;
        <span class="event__offer-price">${price}</span>
      </li>`;
  }, '');
  return `<ul class="event__selected-offers">${liString}</ul>`;
};

const createTripEventTemplate = ({
  dateBegin, typeIconSrc, typeText, destination, dateEnd, price, offers, favority,
}) => {
  const favorityClass = favority ? 'event__favorite-btn--active' : 'event__favorite-btn';

  return `<div class="event">
    <time class="event__date" datetime=${dateBegin}>${getMonthAndDay(dateBegin)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="${typeIconSrc}" alt="Event type icon">
    </div>
    <h3 class="event__title">${typeText} ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateBegin}">${getTime(dateBegin)}</time>
        —
        <time class="event__end-time" datetime="${dateEnd}">${getTime(dateEnd)}</time>
      </p>
      <p class="event__duration">${durationTemplate(dateBegin, dateEnd)}</p>
    </div>
    <p class="event__price">
      €&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${createOffersListTemplate(offers)}
    <button class="event__favorite-btn ${favorityClass}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>`;
};

export default class TripEventView extends AbstractView {
  constructor(events) {
    super();
    this._event = events;
    this._editClickHandler = this._editClickHandler.bind(this);
  }
  getTemplate() {
    return createTripEventTemplate(this._event);
  }
  _editClickHandler() {
    // evt.preventDefault();
    this._callback.editClick();
  }
  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }
}
