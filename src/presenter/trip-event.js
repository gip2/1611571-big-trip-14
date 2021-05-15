import EditEventView from "./view/edit-event.js";
import TripEventView from "./view/trip-event.js";
import {render, replace, RenderPosition} from "./utils/render.js";

export default class TripEvent {
  constructor(TripEventListContainer) {
    this._tripEventListContainer = TripEventListContainer;
    this._tripEventComponent = null;
    this._tripEventEditComponent = null;
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._tripEvent = event;
    this._tripEventComponent = new TripEventView(event);
    this._tripEventEditComponent = new EditEventView(event);

    this._tripEventComponent.setEditClickHandler(this._handleEditClick);
    this._tripEventEditComponent.setSubmitHandler(this._handleFormSubmit);
    render(this._tripEventListContainer, this._tripEventComponent, RenderPosition.BEFOREEND);
  }

  
  _replaceEditToEvent = () => {
    replace(this._tripEventComponent, this._tripEventEditComponent);
  };

  _replaceEventToEdit = () => {
    replace(this._tripEventEditComponent, this._tripEventComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
      evt.preventDefault();
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

}