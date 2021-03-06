// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.querySelector('#book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="javascript:void(0)" class="delete">x</a></td>
  `;
  list.appendChild(row);
};

// Show alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);
  // Timeout after 3 seconds
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 2000);
};

// Delete book
UI.prototype.deleteBook = function(target) {
  if (target.classList.contains('delete')) {
    target.parentElement.parentElement.remove();
    return true;
  }
  return false;
};

// Clear fields
UI.prototype.clearFields = function() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
};

function Store() {}

Store.prototype.getBooks = () => {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
};

Store.prototype.displayBooks = function() {
  const books = this.getBooks();
  books.forEach((book) => {
    const ui = new UI();
    // Add book to UI
    ui.addBookToList(book);
  });
};

Store.prototype.addBook = function(book) {
  const books = this.getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
};

Store.prototype.removeBook = function(isbn) {
  const books = this.getBooks();
  books.forEach((book, index) => {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(books));
};


// Event Listener for add book
document.querySelector('#book-form').addEventListener('submit', (event) => {
  event.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();
  const store = new Store();

  // Validate
  if (!title.trim() || !author.trim() || !isbn.trim()) {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add book to Local Storage
    store.addBook(book);

    // Show success
    ui.showAlert('Book Added!', 'success');

    // Clear fields
    ui.clearFields();
  }
});

// Event Listener for delete
document.querySelector('#book-list').addEventListener('click', (event) => {
  event.preventDefault();
  const ui = new UI();
  const deleteStatus = ui.deleteBook(event.target);

  // Show alert
  if (deleteStatus) {
    // Remove book from Local Storage
    const store = new Store();
    store.removeBook(event.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Book removed', 'success');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store();
  store.displayBooks();
});