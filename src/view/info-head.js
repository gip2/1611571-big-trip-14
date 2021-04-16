import {createElement} from '../utils.js';
import {getMonthAndDay} from './trip-event.js';
const MAX_EVENTS_ITEMS = 3;

const calculateInfoEvents = (events) => {
  const info = {
    title: '',
    date: '',
    cost: 0.0,
  };
  if (!events || !events.length) {
    return info;
  }

  if (events.length > MAX_EVENTS_ITEMS) {
    info.title = `${events[0].destination}  &mdash; ... &mdash;  ${events[events.length - 1].destination}`;
  } else {
    info.title = events.map((event)=>event.destination).join(' &mdash;');
  }

  const dateBegin = getMonthAndDay(events[0].dateBegin);
  const dateEnd = getMonthAndDay(events[events.length - 1].dateEnd);
  if (dateBegin === dateEnd) {
    info.date = dateBegin;
  } else {
    if (dateBegin.slice(0, 3) === dateEnd.slice(0, 3)) {
      info.date = `${dateBegin}&nbsp;&mdash;&nbsp;${dateEnd.slice(4)}`;
    } else {
      info.date = `${dateBegin}&nbsp;&mdash;&nbsp;${dateEnd}`;
    }
  }
  info.cost = events.reduce((accumulator, event) => {
    const {price, offers} = event;
    accumulator += price;
    if (offers !== undefined) {
      accumulator = offers.reduce((acc, offer) => {
        return acc + offer.checked ? offer.price : 0;
      }, accumulator);
    }
    return accumulator;
  }, 0);
  return info;
};

const createInfoHeadTemplate = (events) => {
  const info = calculateInfoEvents(events);
  const {title, date, cost} = info;
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${date}</p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
  </section>`;
};

export default class InfoHead {
  constructor(events) {
    this._element = null;
    this._events = events;
  }
  getTemplate() {
    return createInfoHeadTemplate(this._events);
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
