// Dummy car data
const cars = [
  { id: 1, make: 'BUGGATI', model: 'Model 3', price: 200, image: 'images/buggati.jpg' },
  { id: 2, make: 'Ford', model: 'Mustang', price: 120, image: 'images/Mustang.jpg' },
  { id: 3, make: 'BMW', model: 'i8', price: 150, image: 'images/BMW.jpg' },
  { id: 4, make: 'Audi', model: 'A4', price: 90, image: 'images/Audi.jpg' }
];

// Render cars
function renderCars(filter = '') {
  const carList = document.getElementById('car-list');
  carList.innerHTML = ''; // Clear previous cars

  const filteredCars = cars.filter(
    (car) => car.make.toLowerCase().includes(filter) || car.model.toLowerCase().includes(filter)
  );

  filteredCars.forEach((car) => {
    const carCard = document.createElement('div');
    carCard.className = 'car-card';
    carCard.innerHTML = `
      <img src="${car.image}" alt="${car.make} ${car.model}">
      <div class="details">
        <h3>${car.make} ${car.model}</h3>
        <p>Price: $${car.price}/day</p>
        <button onclick="bookCar(${car.id})">Book Now</button>
      </div>
    `;
    carList.appendChild(carCard);
  });
}

// Redirect to Booking Page
function bookCar(carId) {
  window.location.href = `booking.html?carId=${carId}`;
}

// Search functionality
document.getElementById('search-bar').addEventListener('input', (e) => {
  renderCars(e.target.value.toLowerCase());
});

// Initial render
renderCars();
