import ControlBoardView from '../view/controlBoard.js';
import InfoHeadView from '../view/info-head.js';
import FilterView from '../view/filters.js';
import SortView from '../view/sort.js';
import TripEventListView from '../view/trip-event-list.js';
import EmptyListView from '../view/trip-empty.js';
import {render, RenderPosition} from '../utils/render.js';

import TripEventPresenter from './trip-event.js';
import {updateItem} from '../utils/common.js';


export default class Trip {
  constructor(infoHeadContainer,tripContainer) {
    this._infoHeadContainer = infoHeadContainer;
    this._tripContainer = tripContainer;
    this._tripEventPresenter = {};
    //this._infoHeadComponent = new InfoHeadView(events);
    this._controlBoardComponent = new ControlBoardView();
    //this._infoHeadComponent = new InfoHeadView();
    this._FilterComponent = new FilterView();
    this._SortBoardComponent = new SortView();
    this._tripEventListComponent = new TripEventListView();
    this._EmptyListComponent = new EmptyListView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    // this._handleFavoriteChange = this._handleFavoriteChange.bind(this);
  }

  init(events){
    this._tripEvents = events.slice();
    this._renderEventList();
    this._renderTrip();
  }

  _handleModeChange() {
    Object
      .values(this._tripEventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(event) {
    this._tripEvents = updateItem(this._tripEvents, event);
    this._tripEventPresenter[event.id].init(event);
  }


  _renderInfoHead(events) {
    const infoHeadComponent = new InfoHeadView(events);
    render(this._infoHeadContainer, infoHeadComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderEventList() {
    render(this._tripContainer, this._tripEventListComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const tripEventPresenter = new TripEventPresenter(this._tripEventListComponent, this._handleEventChange, this._handleModeChange);
    tripEventPresenter.init(event);
    this._tripEventPresenter[event.id] = tripEventPresenter;
  }

  _renderEvents() {
    this._tripEvents.forEach((event) => this._renderEvent(event));
  }

  _renderNoEvents(){
    this._infoHeadContainer.removeChild(this._infoHeadComponent.getElement());
    const siteTripEventsHead = this._tripContainer.firstChild();
    siteTripEventsHead.nextSibling.remove();
    render(this._tripContainer, this._EmptyListComponent.getElement(), RenderPosition.AFTEREND);
  }

  _renderTrip(){
    //debugger;
    this._renderInfoHead(this._tripEvents);
    this._renderEvents();
    if (this._tripEvents.length === 0) {
      this._renderNoEvents();
    }
  }
}
