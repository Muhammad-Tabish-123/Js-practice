'use strict';
// prettier-ignore
// let map, mapEvent;

class WorkOut {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks=0;

  constructor(coords, distance, duration) {
    this.coords = coords; //[lat, long]
    this.distance = distance;
    this.duration = duration;
  }

  _setDescriotion() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click(){
    this.clicks++;
  }
}

class Running extends WorkOut {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cacdence = cadence;
    this.calcPace();
    this._setDescriotion();
  }
  calcPace() {
    //min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends WorkOut {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescriotion();
  }

  calcSpeed() {
    //km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

////////////////////////////////////////
//Application Architecture
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workOuts = [];

  constructor() {
    //Get location
    this._getPosition();

    //Load data from storage
    this._getLocalStorage();

    //Add event listeners
    form.addEventListener('submit', this._newWorkOut.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could mot get your position');
        }
      );
  }

  _loadMap(position) {
    //   console.log(position.coords.latitude);
    //   console.log(position.coords.longitude);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(latitude, longitude);
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude];

    // console.log(this);
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coords)
      .addTo(this.#map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

    // console.log(map);
    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    //Loading Stored Markers
    this.#workOuts.forEach(work => {
      this._renderWorkoutMaker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
    // console.log(mapE);
  }

  _hideForm() {
    //Empty Inputs
    // prettier-ignore
    inputDistance.value =inputCadence.value =inputDuration.value =inputElevation.value ='';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkOut(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    //Get Data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    // console.log(lat, lng);
    let workOut;

    // If activity running create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        // console.log(distance);
        return alert('Inputs have to be positive number');
      }
      workOut = new Running([lat, lng], distance, duration, cadence);
    }

    // If activity cycling create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      // Check if data is valid
      if (
        !validInputs(
          distance,
          duration,
          elevation || !allPositive(distance, duration)
        )
      )
        return alert('Inputs have to be positive number');

      workOut = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object tpo workout array
    this.#workOuts.push(workOut);
    console.log(this.#workOuts);

    // Render workout on map
    // console.log(mapEvent);
    this._renderWorkoutMaker(workOut);

    // Render workout on list
    this._renderWorkOut(workOut);

    // Hide form + clear input fields
    this._hideForm();

    // Store all workOuts in local storage
    this._setLocalStorage();
  }

  _renderWorkoutMaker(workOut) {
    console.log(workOut);
    L.marker(workOut.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workOut.type}-popup`,
        })
      )
      .setPopupContent(
        `${workOut.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workOut.description}`
      )
      .openPopup();
  }

  _renderWorkOut(workOut) {
    // console.log('inserting HTML');
    let html = `<li class="workout workout--${workOut.type}" data-id="${
      workOut.id
    }">
    <h2 class="workout__title">${workOut.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workOut.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${workOut.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workOut.duration}</span>
      <span class="workout__unit">min</span>
    </div>
    `;

    if (workOut.type === 'running') {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workOut.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workOut.cacdence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>`;
    }

    if (workOut.type === 'cycling') {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workOut.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workOut.elevationGain}</span>
      <span class="workout__unit">m</span>
    </div>
  </li>`;
    }
    // console.log(html);

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workOutEl = e.target.closest('.workout');
    // console.log(workOutEl);
    if (!workOutEl) return;
    // console.log(this);
    const workOut = this.#workOuts.find(
      work => work.id === workOutEl.dataset.id
    );
    console.log(workOut);
    this.#map.setView(workOut.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    // workOut.click();
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workOuts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    console.log(data);
    if (!data) return;
    this.#workOuts = data;
    this.#workOuts.forEach(work => {
      this._renderWorkOut(work);
      // this._renderWorkoutMaker(work)
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();

// console.log(firstName);
