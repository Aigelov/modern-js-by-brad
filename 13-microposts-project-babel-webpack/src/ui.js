class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts) {
    let output = '';

    for (const post of posts) {
      output += `
        <div class="card mb-3 border-primary text-primary">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a
              href="javascript:void(0)"
              class="edit card-link text-primary"
              data-id="${post.id}"
              >
              <i class="fa fa-pencil"></i>
            </a>
            
            <a
              href="javascript:void(0)"
              class="delete card-link text-danger"
              data-id="${post.id}"
              >
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    }

    this.post.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();

    // Create div
    const div = document.createElement('div');

    // Add classes
    div.className = className;

    // Add text
    div.appendChild(document.createTextNode(message));

    // Get parent
    const container = document.querySelector('.postsContainer');

    // Get posts
    const posts = document.querySelector('#posts');

    // Insert alert div
    container.insertBefore(div, posts);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }
}

export const ui = new UI();