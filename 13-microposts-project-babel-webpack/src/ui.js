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
}

export const ui = new UI();