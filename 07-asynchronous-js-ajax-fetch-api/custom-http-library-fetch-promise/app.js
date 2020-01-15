const http = new EasyHTTP();
const url = 'https://jsonplaceholder.typicode.com/users';

// User Data
const data = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'jdoe@gmail.com'
};


// Get Users
// http.get(url)
//   .then(data => console.log(data))
//   .catch(err => console.error(err));


// Create User
// http.post(url, data)
//   .then(data => console.log(data))
//   .catch(err => console.error(err));


// Update User
// http.put(`${url}/2`, data)
//   .then(data => console.log(data))
//   .catch(err => console.error(err));


// Delete User
http.delete(`${url}/2`)
  .then(data => console.log(data))
  .catch(err => console.error(err));