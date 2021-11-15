import { LAT_TOKYO_CENTER, LNG_TOKYO_CENTER, mainIcon, simpleIcon, SIMILAR_OBJECT_COUNT } from './constants.js';
import { makeElement } from './util.js';
import { objectType } from './constants.js';
import { compareItems } from './filter-form.js';

// Объявляем переменные
const map = L.map('map-canvas');
const mainMarker = L.marker([LAT_TOKYO_CENTER, LNG_TOKYO_CENTER],{icon: L.icon(mainIcon),draggable: true});
const markerGroup = L.layerGroup().addTo(map);
const address = document.querySelector('#address');

// Находим шаблон который будем клонировать
const similarObjectTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderMarkersOnMap = (data) => {

  markerGroup.clearLayers();

  data.filter(compareItems).slice(0, SIMILAR_OBJECT_COUNT).forEach(({author, location, offer}) => {
    const {lat, lng} = location;
    const objectElement = similarObjectTemplate.cloneNode(true); // Клонируем шаблон
    objectElement.querySelector('.popup__title').textContent = offer.title;  objectElement.querySelector('.popup__text--address').textContent = offer.address;
    objectElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    objectElement.querySelector('.popup__type').textContent = objectType[offer.type];
    objectElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    objectElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

    const featureContainer = objectElement.querySelector('.popup__features');featureContainer.innerHTML = '';
    if(offer.features) {
      offer.features.forEach((feature) => {
        const featureListItem = makeElement('li', ['popup__feature', `popup__feature--${feature}`]);
        featureContainer.append(featureListItem);
      });
    } else {
      featureContainer.remove(); // Если отсутвуют опции скрываем блок
    }

    const descriptionContainer = objectElement.querySelector('.popup__description');
    if(offer.description) {
      descriptionContainer.textContent = offer.description;
    } else {
      descriptionContainer.remove(); // Если отсутвует описание скрываем блок
    }

    const photoContainer = objectElement.querySelector('.popup__photos');photoContainer.innerHTML = '';
    if(offer.photos) {
      offer.photos.forEach((photo) => {
        const photoListItem = makeElement('img', ['popup__photo']);photoListItem.src = photo;
        photoListItem.width = '45';
        photoListItem.height = '40';
        photoListItem.alt = 'Фотография жилья';
        photoContainer.append(photoListItem);
      });
    } else {
      photoContainer.remove(); // Если отсутвуют фото скрываем блок
    }

    objectElement.querySelector('.popup__avatar').src = author.avatar;

    L.marker({lat, lng},{icon: L.icon(simpleIcon)}).addTo(markerGroup).bindPopup(objectElement);
  });

};

const setMapDefaultParameters = () => {
  mainMarker.setLatLng({
    lat: LAT_TOKYO_CENTER,
    lng: LNG_TOKYO_CENTER,
  });

  map.setView({ // Для карты
    lat: LAT_TOKYO_CENTER,
    lng: LNG_TOKYO_CENTER,
  }, 12);

  address.setAttribute('value', `${LAT_TOKYO_CENTER}, ${LNG_TOKYO_CENTER}`);
};

const mapLoad = (cb) => {
  // Внутренняя логика
  map.on('load', () => {
    // Внешняя логика
    cb();
  }).setView([LAT_TOKYO_CENTER, LNG_TOKYO_CENTER], 12);

  // Добавляем в блок изображение самой карты от стороннего поставщика
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);
}; // OK

const showAddressFromMap = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  address.value = `${lat.toFixed(5)},${lng.toFixed(5)}`;
}; // OK
const onAddressFromMap = () => {
  // Внешняя логика (или подписка на событие)
  mainMarker.on('moveend', showAddressFromMap);
}; // OK
const getAddressFromMap = () =>  {
  // Внутренняя логика
  mainMarker.addTo(map);
  address.value = `${LAT_TOKYO_CENTER}, ${LNG_TOKYO_CENTER}`;
  // Внешняя логика
  onAddressFromMap();
}; // OK

export { mapLoad, getAddressFromMap, renderMarkersOnMap, setMapDefaultParameters };
