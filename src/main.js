const EVENT_NUM = 10;

import ControlBoardView from './view/controlBoard.js';
import FilterView from './view/filters.js';
import {Event} from './mock/travel.js';
import {render, RenderPosition} from './utils/render.js';

import TripPresenter from './presenter/trip.js';

const events = [];
for (let index = 0; index < EVENT_NUM; index++) {
  events.push(new Event());
}
const siteTripMainElement = document.querySelector('.trip-main');
const siteMenuElement = document.querySelector('#menu');
const siteFiltersElement = document.querySelector('#filters');
const siteTripEventsHead = document.querySelector('#tripEvents');
const siteTripEventsSection = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(siteTripMainElement,siteTripEventsHead,siteTripEventsSection);

render(siteMenuElement, new ControlBoardView().getElement(), RenderPosition.AFTEREND);//document.querySelector
render(siteFiltersElement, new FilterView().getElement(), RenderPosition.AFTEREND);//document.querySelector

tripPresenter.init(events);
