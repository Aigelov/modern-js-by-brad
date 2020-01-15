class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static getBooks() {
    const books = Storage.getBooks();
    if (books.length) {
      UI.addToList(books);
    }
  }

  addBook(book) {
    UI.addToList([book]);
    Storage.addBook(book);
  }

  static addToList(books) {
    const list = document.querySelector('#book-list');
    for (let book of books) {
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
    }
  }

  showAlert(message, className) {
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
  }

  deleteBook(target) {
    if (target.classList.contains('delete')) {
      target.parentElement.parentElement.remove();
      Storage.deleteBook(target.parentElement.parentElement);
      return true;
    }
    return false;
  }

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static deleteBook(bookEl) {
    const books = Storage.getBooks();
    const title = bookEl.querySelector('td:nth-child(1)').textContent;
    const author = bookEl.querySelector('td:nth-child(2)').textContent;
    const isbn = bookEl.querySelector('td:nth-child(3)').textContent;
    const filteredBooks = books.filter((book) => {
      return !(book.title === title &&
        book.author === author &&
        book.isbn === isbn);
    });
    console.log(filteredBooks);
    localStorage.setItem('books', JSON.stringify(filteredBooks));
  }
}


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

  // Validate
  if (!title.trim() || !author.trim() || !isbn.trim()) {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBook(book);

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
    ui.showAlert('Book removed', 'success');
  }
});

UI.getBooks();