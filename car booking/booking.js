// Get car ID from query params
const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('carId');

// Handle form submission
document.getElementById('booking-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;

  if (!name || !email || !startDate || !endDate) {
    alert('Please fill in all fields!');
    return;
  }

  alert(`Booking confirmed for Car ID ${carId}. Enjoy your ride!`);
});
