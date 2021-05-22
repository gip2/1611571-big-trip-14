import {nanoid} from 'nanoid';const PRICE_MIN = 10;

const PRICE_MAX = 1000;

export const EVENT_TYPE_LIST = [
  ['taxi', 'Taxi', 'img/icons/taxi.png'],
  ['bus', 'Bus', 'img/icons/bus.png'],
  ['train', 'Train', 'img/icons/train.png'],
  ['ship', 'Ship', 'img/icons/ship.png'],
  ['transport', 'Transport', 'img/icons/transport.png'],
  ['drive', 'Drive', 'img/icons/drive.png'],
  ['flight', 'Flight', 'img/icons/flight.png'],
  ['check-in', 'CheckIn', 'img/icons/check-in.png'],
  ['sightseeing', 'Sightseeing', 'img/icons/sightseeing.png'],
  ['restaurant', 'Restaurant', 'img/icons/restaurant.png'],
];

export const EVENT_DESTINATION_LIST = [
  'Amsterdam',
  'Shamonix',
  'Geneva',
  'Paris',
  'Parma',
  'Istanbul',
  'Moscow',
  'London',
  'Saint Petersburg',
  'Berlin',
  'Madrid',
  'Rome',
  'Bucharest',
  'Minsk',
  'Vienna',
  'Hamburg',
  'Warsaw',
  'Budapest',
  'Barcelona',
  'Munich',
  'Milan',
];

const EVENT_DESTINATION_DESCRIPTION_LISTS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const MIN_INT = 0;
const MAX_INT = 1;
const HOUR_PER_DAY = 24;
const DAY_PER_MONTH = 30;
const MSEC_PER_HOUR = 3600000;
const MIN_HOURS = 1;
const MAX_HOURS = HOUR_PER_DAY * DAY_PER_MONTH;
const minDestinationDescriptonNum = 0;
const maxDestinationDescriptonNum = 5;
const HOURS_DATE_END_MIN = 0.5;
const HOURS_DATE_END_MAX = 52;

const getRandomInteger = (min = MIN_INT, max = MAX_INT) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const getRandom = (array)=>{
  return array[getRandomInteger(0, array.length - 1)];
};
/* Array.prototype.getRandom = function(){
  let arr = this;
  return arr[getRandomInteger(0,arr.length)]
};*/


const getRandomDate = (minHours = MIN_HOURS, maxHours = MAX_HOURS) => {
  const curDate = new Date();
  const randomMilliseconds = getRandomInteger(minHours * MSEC_PER_HOUR, maxHours * MSEC_PER_HOUR);
  const randomDate = new Date(curDate.valueOf() + randomMilliseconds);
  return randomDate;
};

const eventDestinationDescriptonGen = () => {
  const sentenceNumber = getRandomInteger(minDestinationDescriptonNum, maxDestinationDescriptonNum);
  let eventDestinationDescripton = '';
  for (let index = 0; index < sentenceNumber; index++) {
    const sentence = EVENT_DESTINATION_DESCRIPTION_LISTS[getRandomInteger(0, EVENT_DESTINATION_DESCRIPTION_LISTS.length)];
    eventDestinationDescripton += sentence;
  }
  return eventDestinationDescripton;
};

const eventDestinationPhotoGen = () => {
  const s = String(Math.random());
  return `http://picsum.photos/248/152?r=${s}`;
};

const createEventPhotos = () => {
  const photos = [];
  const photoNumber = getRandomInteger(0, 5);
  for (let index = 0; index < photoNumber; index++) {
    photos.push(eventDestinationPhotoGen());
  }
  return photos;
};

const offersList = [
  {
    type: 'taxi',
    title: 'Switch to comfort',
    price: 20,
    checked: false,
  },
  {
    type: 'taxi',
    title: 'Order Uber',
    price: 20,
    checked: false,
  },
  {
    type: 'flight',
    title: 'Add luggage',
    price: 50,
    checked: false,
  },
  {
    type: 'flight',
    title: 'Switch to comfort',
    price: 60,
    checked: false,
  },
  {
    type: 'drive',
    title: 'Rent a car',
    price: 200,
    checked: false,
  },
  {
    type: 'check-in',
    title: 'Add breakfast',
    price: 50,
    checked: false,
  },
  {
    type: 'sightseeing',
    title: 'Lunch in city',
    price: 30,
    checked: false,
  },
  {
    type: 'sightseeing',
    title: 'Book tickets',
    price: 40,
    checked: false,
  },
];

const findOffer = (type) => {
  const results = [];
  offersList.forEach((element) => {
    if (element.type === type) {
      results.push(element);
    }
  });
  return results;// offers.find(offer=>offer.type===type)
};

export class Event {
  constructor() {
    this.id = nanoid();
    this.dateBegin = getRandomDate();
    this.dateEnd = new Date(this.dateBegin.valueOf() + getRandomInteger(HOURS_DATE_END_MIN * MSEC_PER_HOUR, HOURS_DATE_END_MAX * MSEC_PER_HOUR));
    const type = getRandom(EVENT_TYPE_LIST);
    this.type = type[0];
    this.typeText = type[1];
    this.typeIconSrc = type[2];
    this.destination = getRandom(EVENT_DESTINATION_LIST);
    this.destinationDescription = eventDestinationDescriptonGen();
    this.price = getRandomInteger(PRICE_MIN, PRICE_MAX);
    const offers = findOffer(this.type);
    if (offers.length > 0) {
      this.offers = offers;
      offers.forEach((element) => {
        element.checked = Boolean(getRandomInteger());
      });
    }
    const photos = createEventPhotos();
    if (photos.length > 0) {
      this.photos = photos;
    }
    this.favority = Boolean(getRandomInteger());
  }
}
