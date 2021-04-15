import {createElement} from '../utils.js';

const createTripEventListTemplate = () =>
  `<ul class="trip-events__list">
  </ul>`;

export default class TripEventListView {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createTripEventListTemplate();
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
