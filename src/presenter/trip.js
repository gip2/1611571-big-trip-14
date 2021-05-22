import InfoHeadView from '../view/info-head.js';
import SortView from '../view/sort.js';
import TripEventListView from '../view/trip-event-list.js';
import EmptyListView from '../view/trip-empty.js';
import {render, RenderPosition} from '../utils/render.js';

import TripEventPresenter from './trip-event.js';
import {updateItem} from '../utils/common.js';


export default class Trip {
  constructor(infoHeadContainer,sortContainer,tripContainer) {
    this._infoHeadContainer = infoHeadContainer;
    this._sortContainer = sortContainer;
    this._tripContainer = tripContainer;
    this._tripEventPresenter = {};
    this._tripEventListComponent = new TripEventListView();
    this._infoHeadComponent = new InfoHeadView();
    this._sortComponent = new SortView();
    this._EmptyListComponent = new EmptyListView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
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
    this._infoHeadComponent = infoHeadComponent;
    render(this._infoHeadContainer, this._infoHeadComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._sortContainer, this._sortComponent.getElement(), RenderPosition.AFTEREND);
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
    const siteTripEventsHead = this._tripContainer.firstChild;
    siteTripEventsHead.nextSibling.remove();
    this._sortComponent.removeElement();
    this._renderTrip();
  }

  _renderTrip(){
    this._renderInfoHead(this._tripEvents);
    this._renderSort();
    this._renderEvents();
    if (this._tripEvents.length === 0) {
      this._renderNoEvents();
    }
  }
}
