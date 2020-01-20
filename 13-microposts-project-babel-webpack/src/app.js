import { http } from './http';
import { ui } from './ui';

// Get posts
const getPosts = () => {
  http.get('http://localhost:3000/posts')
    .then(data => {
      data = data.reverse();
      ui.showPosts(data)
    })
    .catch(err => console.error(err));
};
// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Submit post
const submitPost = () => {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body
  };

  // Create post
  http.post('http://localhost:3000/posts', data)
    .then(() => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.error(err));
};
// Listen for submit post
document.querySelector('.post-submit').addEventListener('click', submitPost);
