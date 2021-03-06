// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', (event) => {
  event.preventDefault();

  // Hide results
  document.querySelector('#results').style.display = 'none';

  // Show loader
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateResults, 1000);
});

function calculateResults() {
  // UI Vars
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    // Show results
    document.querySelector('#results').style.display = 'block';
    // Hide loader
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error) {
  // Hide results
  document.querySelector('#results').style.display = 'none';
  // Hide loader
  document.querySelector('#loading').style.display = 'none';
  // Create div
  const errorDiv = document.createElement('div');
  // Add class
  errorDiv.classList.add('alert');
  errorDiv.classList.add('alert-danger');
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Insert error above heading
  card.insertBefore(errorDiv, heading);
  // Clear error after certain time
  setTimeout(clearError, 2000);
}

// Clear Error
function clearError() {
  document.querySelector('.alert.alert-danger').remove();
}