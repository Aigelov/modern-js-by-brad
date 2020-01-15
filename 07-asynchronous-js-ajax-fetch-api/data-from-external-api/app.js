document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(event) {
  event.preventDefault();

  const number = document.querySelector('input[type="number"]').value;

  if (!number) {
    return;
  }

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      let output = '';

      if (response.type === 'success') {
        for (const joke of response.value) {
          output += `<li>${joke.joke}</li>`;
        }
      } else {
        output += '<li>Something went wrong</li>';
      }

      document.querySelector('ul.jokes').innerHTML = output;
    }
  };

  xhr.send();
}