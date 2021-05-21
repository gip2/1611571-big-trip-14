import EditEventView from '../view/edit-event.js';
import TripEventView from '../view/trip-event.js';
import {render, replace, RenderPosition, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
//import Trip from "./trip.js";
const KeyCode = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

export default class TripEvent {
  constructor(TripEventListContainer, changeMode) {
    this._tripEventListContainer = TripEventListContainer;
    this._changeMode = changeMode;
    this._eventPresenter = {};
    this._tripEventComponent = null;
    this._tripEventEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._tripEvent = event;

    const prevTripEventComponent = this._tripEventComponent ;
    const prevEventEditComponent = this._tripEventEditComponent;

    this._tripEventComponent = new TripEventView(event);
    this._tripEventEditComponent = new EditEventView(event);

    this._tripEventComponent.setEditClickHandler(this._handleEditClick);
    this._tripEventEditComponent.setSubmitHandler(this._handleFormSubmit);

    if (prevTripEventComponent === null ||  prevEventEditComponent === null) {
      render(this._tripEventListContainer, this._tripEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripEventComponent, prevTripEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripEventEditComponent, prevEventEditComponent);
    }

    remove(prevTripEventComponent);
    remove(prevEventEditComponent);
    //this._renderTripEvent();//render(this._tripEventListContainer, this._tripEventComponent, RenderPosition.BEFOREEND);
  }

  _replaceEditToEvent(){
    replace(this._tripEventComponent, this._tripEventEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.DEFAULT;
  }

  _replaceEventToEdit(){
    replace(this._tripEventEditComponent, this._tripEventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _onEscKeyDownHandler(evt){
    if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
      evt.preventDefault();
      this._replaceEditToEvent();
      this._tripEventListContainer.ownerDocument.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _handleEditClick() {
    this._replaceEventToEdit();
  }

  _handleFormSubmit(/*event*/) {
    //this._changeData(event);
    this._replaceEditToEvent();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
      evt.preventDefault();
      this._replaceEditToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  }




  _renderTripEvent() {
    const eventComponent = new TripEventView(this._tripEvent);
    const eventEditComponent = new EditEventView(this._tripEvent);

    const replaceEditToEvent = () => {
      replace(eventComponent, eventEditComponent);
    };

    const replaceEventToEdit = () => {
      replace(eventEditComponent, eventComponent);
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

    render(this._tripEventListContainer, eventComponent.getElement(), RenderPosition.BEFOREEND);
  }
}
