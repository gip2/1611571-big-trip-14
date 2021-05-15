import ControlBoardView from './view/controlBoard.js';
import InfoHeadView from './view/info-head.js';
import FilterView from './view/filters.js';
import SortView from './view/sort.js';
import TripEventView from './view/trip-event.js';
import TripEventListView from './view/trip-event-list.js';
import EditEventView from './view/edit-event.js';
import EmptyListViews from './view/trip-empty.js';
import {Event} from './mock/travel.js';
import {render, replace, RenderPosition} from './utils/render.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    //this._infoHeadComponent = new InfoHeadView(events);
    this._controlBoardComponent = new ControlBoardView();
    this._infoHeadComponent = new InfoHeadView();
    this._FilterComponent = new FilterView();
    this._SortBoardComponent = new SortView();
    this._TripEventListComponent = new TripEventListView();
  }

  _renderInfoHead(document,events) {
    const siteTripMainElement = document.querySelector('.trip-main');
    render(siteTripMainElement, this._infoHeadComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  // _renderControlBoard(document,events) {
  //   const siteMenuElement = document.querySelector('#menu');
  //   render(siteMenuElement, this._controlBoardComponent.getElement(), RenderPosition.AFTEREND);
  // }
}





