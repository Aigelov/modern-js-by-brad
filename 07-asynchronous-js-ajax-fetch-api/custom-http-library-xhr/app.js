const http = new EasyHTTP();

// GET Posts
// http.get('https://jsonplaceholder.typicode.com/posts', (err, posts) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(posts);
//   }
// });


// GET Single Post
// http.get('https://jsonplaceholder.typicode.com/posts/1', (err, post) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(post);
//   }
// });


// POST Create post
// const data = {
//   title: 'Custom Post',
//   body: 'This is a custom post'
// };
//
// http.post('http://jsonplaceholder.typicode.com/posts', data, (err, post) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(post);
//   }
// });


// PUT Update post
// const data = {
//   title: 'Updated Post',
//   body: 'Hello world'
// };
//
// http.put('http://jsonplaceholder.typicode.com/posts/1', data, (err, post) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(post);
//   }
// });


// DELETE Delete post
http.delete('https://jsonplaceholder.typicode.com/posts/1', (err, response) => {
  if (err) {
    console.error(err);
  } else {
    console.info(response);
  }
});