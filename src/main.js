import {createMenuTemplate} from "./view/menu.js";
import {createInfoHeadTemplate} from "./view/info-head.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortTemplate} from "./view/sort.js";
import {createTripEventTemplate} from "./view/trip-event.js";
import {createTripEventListTemplate} from "./view/trip-event-list.js";
import {createEditEventTemplate} from "./view/edit-event.js";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteTripMainElement = document.querySelector(`.trip-main`);
const siteMenuElement = document.querySelector(`#menu`);
const siteFiltersElement = document.querySelector(`#filters`);
const siteTripEventsHead = document.querySelector(`#tripEvents`);
const siteTripEventsSection = document.querySelector(`.trip-events`);
render(siteTripMainElement, createInfoHeadTemplate(), `afterbegin`);
render(siteMenuElement, createMenuTemplate(), `afterend`);
render(siteFiltersElement, createFiltersTemplate(), `afterend`);
render(siteTripEventsHead, createSortTemplate(), `afterend`);
render(siteTripEventsSection, createTripEventListTemplate());
const siteTripEventsList = document.querySelector(`.trip-events__list`);
render(siteTripEventsList, createEditEventTemplate());
render(siteTripEventsList, createTripEventTemplate());
render(siteTripEventsList, createTripEventTemplate());
render(siteTripEventsList, createTripEventTemplate());
