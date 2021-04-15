import {createElement} from '../utils.js';
import {EVENT_TYPE_LIST} from '../mock/travel.js';
import {EVENT_DESTINATION_LIST} from '../mock/travel.js';

const createEventTypeGroup = (eventTypes, event) => {
  return eventTypes.reduce((accumulator, element) => {
    const {type, text} = element;
    return accumulator + `<div class="event__type-item">
              <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${(type === event.type) ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${text}</label>
            </div>
    `;
  }, '');
};

const createDestinationGroup = (eventDestinations) => {
  return eventDestinations.reduce((accumulator, element) => {
    return accumulator + `<option value="${element}"></option>`;
  }, '');
};

const createDateTimeString = (date) => {
  let s = '';
  if (date !== undefined) {
    s = `${date.getDate()}/${(date.getMonth() + 1)}/${String(date.getFullYear()).slice(2, 4)} ${String(date.toTimeString()).slice(0, 5)}`;
  }
  return s;
};

const createEventOfferSelector = (offers) => {
  const offerSelectorItems = offers.reduce((accumulator, offer) => {
    const {type, title, price, checked} = offer;
    return accumulator + `
    <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}"${checked ? 'checked=""' : ' '}>
        <label class="event__offer-label" for="event-offer-${type}-1">
          <span class="event__offer-title">Add ${title}</span>
          +€&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
    </div>
    `;
  }, '');
  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>    
    <div class="event__available-offers">
      ${offerSelectorItems}
    </div>
  </section>`;
};

const createPhotoContainerTemplate = (photos) => {
  const photosTape = photos.reduce((accumulator, element) => {
    return accumulator + `<img class="event__photo" src="${element}" alt="Event photo">`;
  }, '');

  return `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photosTape}
    </div>
  </div>`;
};

const createEditEventTemplate = (event) => {
  const {typeIconSrc, typeText, destination, destinationDescription, dateBegin, dateEnd, price, offers, photos} = event;
  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src=${typeIconSrc}  alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeGroup(EVENT_TYPE_LIST, event)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${typeText}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createDestinationGroup(EVENT_DESTINATION_LIST, event)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${createDateTimeString(dateBegin)}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${createDateTimeString(dateEnd)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      ${(event.offers !== undefined) ? createEventOfferSelector(offers) : ''}
      <section class="event__section  event__section--destination">
        ${(destinationDescription.length > 0) ? `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationDescription}</p>` : ''}

        ${(event.photos !== undefined) ? createPhotoContainerTemplate(photos) : ''}
        
      </section>
    </section>
  </form>`;
};

export default class EditEventView {
  constructor(event) {
    this._element = null;
    this._event = event;
  }
  getTemplate() {
    return createEditEventTemplate(this._event);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
