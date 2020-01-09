document.querySelector('#button1').addEventListener('click', loadCustomer);
document.querySelector('#button2').addEventListener('click', loadCustomers);

function loadCustomer(event) {
  event.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'customer.json', true);

  xhr.onload = function() {
    if (this.status === 200) {
      const customer = JSON.parse(this.responseText);
      const output = `
        <ul>
          <li>${customer.id}</li>
          <li>${customer.name}</li>
          <li>${customer.company}</li>
          <li>${customer.phone}</li>
        </ul>
      `;
      document.querySelector('#customer').innerHTML = output;
    }
  };

  xhr.send();
}

function loadCustomers(event) {
  event.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'customers.json', true);

  xhr.onload = function() {
    if (this.status === 200) {
      const customers = JSON.parse(this.responseText);
      let output = '';
      for (const customer of customers) {
        output += `
          <ul>
            <li>${customer.id}</li>
            <li>${customer.name}</li>
            <li>${customer.company}</li>
            <li>${customer.phone}</li>
          </ul>
        `;
      }
      document.querySelector('#customers').innerHTML = output;
    }
  };

  xhr.send();
}