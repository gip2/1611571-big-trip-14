const EVENT_NUM = 0;
const KeyCode = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

import ControlBoardView from './view/controlBoard.js';
import InfoHeadView from './view/info-head.js';
import FilterView from './view/filters.js';
import SortView from './view/sort.js';
import TripEventView from './view/trip-event.js';
import TripEventListView from './view/trip-event-list.js';
import EditEventView from './view/edit-event.js';
import EmptyListViews from './view/trip-empty.js';
import {Event} from './mock/travel.js';
import {renderElement, RenderPosition} from './utils.js';

const events = [];
for (let index = 0; index < EVENT_NUM; index++) {
  events.push(new Event());
}
const siteTripMainElement = document.querySelector('.trip-main');
const siteMenuElement = document.querySelector('#menu');
const siteFiltersElement = document.querySelector('#filters');
const siteTripEventsHead = document.querySelector('#tripEvents');
const siteTripEventsSection = document.querySelector('.trip-events');

const renderTripEvent = (tripEventListElement, event) => {
  const eventComponent = new TripEventView(event);
  const eventEditComponent = new EditEventView(event);

  const replaceEditToEvent = () => {
    tripEventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const replaceEventToEdit = () => {
    tripEventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
      evt.preventDefault();
      replaceEditToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEditToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  renderElement(tripEventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const infoHeadComponent = new InfoHeadView(events);
renderElement(siteTripMainElement, infoHeadComponent.getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMenuElement, new ControlBoardView().getElement(), RenderPosition.AFTEREND);
renderElement(siteFiltersElement, new FilterView().getElement(), RenderPosition.AFTEREND);
renderElement(siteTripEventsHead, new SortView().getElement(), RenderPosition.AFTEREND);
const tripEventListComponent = new TripEventListView();
renderElement(siteTripEventsSection, tripEventListComponent.getElement(), RenderPosition.BEFOREEND);
events.forEach((event) => renderTripEvent(tripEventListComponent.getElement(), event));
if (events.length === 0) {
  siteTripMainElement.removeChild(infoHeadComponent.getElement());
  siteTripEventsHead.nextSibling.remove();
  renderElement(siteTripEventsSection, new EmptyListViews().getElement(), RenderPosition.AFTEREND);
}
