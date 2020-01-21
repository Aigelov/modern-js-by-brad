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
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  };

  // Validate input
  if (title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {
    // Check for ID
    if (id === '') {
      // Create post
      http.post('http://localhost:3000/posts', data)
        .then(() => {
          ui.showAlert('Post added', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.error(err));
    } else {
      // Update post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(() => {
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.error(err));
    }
  }
};
// Listen for submit post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Delete post
const deletePost = (event) => {
  event.preventDefault();
  if (event.target.parentElement.classList.contains('delete')) {
    const id = event.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(() => {
            ui.showAlert('Post removed', 'alert alert-success');
            getPosts();
        })
        .catch(err => console.error(err));
    }
  }
};
// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Enable edit state
const enableEdit = (event) => {
  event.preventDefault();
  if (event.target.parentElement.classList.contains('edit')) {
    const id = event.target.parentElement.dataset.id;
    const title = event.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = event.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    };

    // Fill form with current post
    ui.fillForm(data);
  }
};
// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Cancel edit state
const cancelEdit = (event) => {
  event.preventDefault();

  if (event.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
};
// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);