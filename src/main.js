const EVENT_NUM = 10;

import {ControlBoardView} from './view/controlBoard.js';
import {createInfoHeadView} from './view/info-head.js';
import {createFiltersView} from './view/filters.js';
import {createSortView} from './view/sort.js';
import {createTripEventView} from './view/trip-event.js';
import {createTripEventListView} from './view/trip-event-list.js';
import {createEditEventView} from './view/edit-event.js';
import {Event} from './mock/travel.js';
import {renderElement, RenderPosition} from "./utils.js";

const events = [];
for (let index = 0; index < EVENT_NUM; index++) {
  events.push(new Event());
}
// console.log(events);
//debugger;
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
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(tripEventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};


render(siteTripMainElement, createInfoHeadView(events), 'afterbegin');
render(siteMenuElement, createMenuView(), 'afterend');
render(siteFiltersElement, createFiltersView(), 'afterend');
render(siteTripEventsHead, createSortView(), 'afterend');
render(siteTripEventsSection, createTripEventListView());
const siteTripEventsList = document.querySelector('.trip-events__list');
render(siteTripEventsList, createEditEventView(events[0]));

events.forEach((element) => {
  render(siteTripEventsList, createTripEventView(element));
});


// import flatpickr from "flatpickr";
// // Otherwise, selectors are also supported
// flatpickr("#myID", {
//   minDate: "today",
//   maxDate: new Date().fp_incr(14) // 14 days from now
// });
