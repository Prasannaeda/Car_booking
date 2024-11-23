// DOM Elements
const carForm = document.getElementById('car-form');
const carNameInput = document.getElementById('car-name');
const carModelInput = document.getElementById('car-model');
const carPriceInput = document.getElementById('car-price');
const carListContainer = document.getElementById('car-list');

// Load cars from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadCars);

// Create a new car
carForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const carName = carNameInput.value;
  const carModel = carModelInput.value;
  const carPrice = carPriceInput.value;

  if (carName && carModel && carPrice) {
    const car = { name: carName, model: carModel, price: carPrice };
    addCarToLocalStorage(car);
    clearForm();
    loadCars(); // Re-render the car list
  }
});

// Add car to localStorage
function addCarToLocalStorage(car) {
  let cars = JSON.parse(localStorage.getItem('cars')) || [];
  cars.push(car);
  localStorage.setItem('cars', JSON.stringify(cars));
}

// Load cars from localStorage
function loadCars() {
  const cars = JSON.parse(localStorage.getItem('cars')) || [];
  carListContainer.innerHTML = '';
  cars.forEach((car, index) => {
    const carCard = createCarCard(car, index);
    carListContainer.appendChild(carCard);
  });
}

// Create car card with edit and delete buttons
function createCarCard(car, index) {
  const carCard = document.createElement('div');
  carCard.classList.add('car-card');
  
  const carImage = document.createElement('img');
  carImage.src = 'https://via.placeholder.com/300x200'; // Placeholder image
  carCard.appendChild(carImage);

  const details = document.createElement('div');
  details.classList.add('details');
  details.innerHTML = `
    <h4>${car.name}</h4>
    <p>${car.model}</p>
    <p>Price: $${car.price}</p>
  `;
  carCard.appendChild(details);

  const buttons = document.createElement('div');
  buttons.classList.add('car-card-buttons');

  // Edit Button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => editCar(index));
  buttons.appendChild(editButton);

  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteCar(index));
  buttons.appendChild(deleteButton);

  carCard.appendChild(buttons);

  return carCard;
}

// Edit car data
function editCar(index) {
  const cars = JSON.parse(localStorage.getItem('cars')) || [];
  const car = cars[index];

  carNameInput.value = car.name;
  carModelInput.value = car.model;
  carPriceInput.value = car.price;

  // Change form action to update car
  carForm.removeEventListener('submit', addCar);
  carForm.addEventListener('submit', function(event) {
    event.preventDefault();
    car.name = carNameInput.value;
    car.model = carModelInput.value;
    car.price = carPriceInput.value;
    updateCarInLocalStorage(cars);
    clearForm();
    loadCars(); // Re-render car list
  });
}

// Update car in localStorage
function updateCarInLocalStorage(cars) {
  localStorage.setItem('cars', JSON.stringify(cars));
}

// Delete car
function deleteCar(index) {
  let cars = JSON.parse(localStorage.getItem('cars')) || [];
  cars.splice(index, 1); // Remove car at the specified index
  localStorage.setItem('cars', JSON.stringify(cars));
  loadCars(); // Re-render car list
}

// Clear form inputs
function clearForm() {
  carNameInput.value = '';
  carModelInput.value = '';
  carPriceInput.value = '';
  carForm.removeEventListener('submit', updateCar);
  carForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const carName = carNameInput.value;
    const carModel = carModelInput.value;
    const carPrice = carPriceInput.value;
    if (carName && carModel && carPrice) {
      const car = { name: carName, model: carModel, price: carPrice };
      addCarToLocalStorage(car);
      loadCars();
      clearForm();
    }
  });
}
