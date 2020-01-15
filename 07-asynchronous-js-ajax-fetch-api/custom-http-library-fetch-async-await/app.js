const http = new EasyHTTP();
const url = 'https://jsonplaceholder.typicode.com/users';

// User Data
const userData = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'jdoe@gmail.com'
};

// Get Users
// http.get(url)
//   .then(data => console.log(data))
//   .catch(err => console.error(err));


// Create User
// http.post(url, userData)
//   .then(data => console.log(data))
//   .catch(err => console.error(err));


// Update User
// http.put(`${url}/3`, userData)
//   .then(data => console.log(data))
//   .catch(err => console.error(err));


// Delete User
http.delete(`${url}/3`)
  .then(data => console.log(data))
  .catch(err => console.error(err));