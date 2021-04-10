const EVENT_NUM = 10;

import {createMenuTemplate} from './view/menu.js';
import {createInfoHeadTemplate} from './view/info-head.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortTemplate} from './view/sort.js';
import {createTripEventTemplate} from './view/trip-event.js';
import {createTripEventListTemplate} from './view/trip-event-list.js';
import {createEditEventTemplate} from './view/edit-event.js';

import {Event} from "./mock/travel.js";

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const events = [];
for (let index = 0; index < EVENT_NUM; index++) {
  events.push(new Event());
}
// console.log(events);

const siteTripMainElement = document.querySelector('.trip-main');
const siteMenuElement = document.querySelector('#menu');
const siteFiltersElement = document.querySelector('#filters');
const siteTripEventsHead = document.querySelector('#tripEvents');
const siteTripEventsSection = document.querySelector('.trip-events');
render(siteTripMainElement, createInfoHeadTemplate(), 'afterbegin');
render(siteMenuElement, createMenuTemplate(), 'afterend');
render(siteFiltersElement, createFiltersTemplate(), 'afterend');
render(siteTripEventsHead, createSortTemplate(), 'afterend');
render(siteTripEventsSection, createTripEventListTemplate());
const siteTripEventsList = document.querySelector('.trip-events__list');
render(siteTripEventsList, createEditEventTemplate(events[0]));

events.forEach((element) => {
  render(siteTripEventsList, createTripEventTemplate(element));
});


// import flatpickr from "flatpickr";
// // Otherwise, selectors are also supported
// flatpickr("#myID", {
//   minDate: "today",
//   maxDate: new Date().fp_incr(14) // 14 days from now
// });
