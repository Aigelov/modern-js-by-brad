const btnText = document.querySelector('#button1');
const btnJson = document.querySelector('#button2');
const btnApi = document.querySelector('#button3');
const output = document.querySelector('#output');
const file = 'test1.txt';
const json = 'posts.json';
const url = 'https://api.github.com/users';

// Get local text file data
btnText.addEventListener('click', () => {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.text();
      }
    })
    .then(file => output.innerHTML = file)
    .catch(err => console.error(err));
});

// Get local json data
btnJson.addEventListener('click', () => {
  fetch(json)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(posts => {
      let outputEl = '';
      for (const post of posts) {
        outputEl += `<li>${post.title}</li>`;
      }
      output.innerHTML = outputEl;

      // const ul = document.createElement('ul');
      // for (const item of json) {
      //   const title = document.createElement('span');
      //   const body = document.createElement('span');
      //   const li = document.createElement('li');
      //   title.appendChild(document.createTextNode(item.title + '.'));
      //   body.appendChild(document.createTextNode(item.body));
      //   li.appendChild(title);
      //   li.appendChild(body);
      //   ul.appendChild(li);
      // }
      // output.innerHTML = '';
      // output.appendChild(ul);
    })
    .catch(err => console.error(err));
});

// Get from external API
btnApi.addEventListener('click', () => {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(users => {
      let outputEl = '';
      for (const user of users) {
        outputEl += `<li>${user.login}</li>`;
      }
      output.innerHTML = outputEl;
    })
    .catch(err => console.error(err));
});