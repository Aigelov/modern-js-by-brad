document.querySelector('#button').addEventListener('click', loadData);

function loadData() {
  // Create an XHR Object
  const xhr = new XMLHttpRequest();

  // OPEN
  xhr.open('GET', 'data.txt', true);

  // Optional - Used for spinners / loaders
  xhr.onprogress = function() {
    console.log('READY_STATE', xhr.readyState);
  };

  // New Way
  // When everything is ready
  xhr.onload = function() {
    console.log('READY_STATE', xhr.readyState);
    if (this.status === 200) {
      // console.log(this.responseText);
      document.querySelector('#output').innerHTML = `
        <h1>${this.responseText}</h1>
      `;
    } else {
      console.log('Bad request. Status is ', this.status);
    }
  };

  // console.log('READY_STATE', xhr.readyState);

  // Old Way
  // xhr.onreadystatechange = function() {
  //   console.log('READY_STATE', xhr.readyState);
  //   if (this.status === 200 && this.readyState === 4) {
  //     console.log(this.responseText);
  //   }
  // };

  xhr.onerror = function() {
    console.log('Request error...');
  };

  xhr.send();

  // readyState Values
  // 0: request not initialized
  // 1: server connection established
  // 2: request received
  // 3: processing request
  // 4: request finished and response is ready

  // HTTP statuses
  // 200: "OK"
  // 403: "Forbidden"
  // 404: "Not Found"
}