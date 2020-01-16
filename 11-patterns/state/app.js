// Page State
const PageState = function() {
  let currentState = new homeState(this);

  this.init = function() {
    this.change(new homeState);
  };

  this.change = (state) => {
    currentState = state;
  };
};

// Home State
const homeState = function() {
  document.querySelector('#heading').textContent = '';
  document.querySelector('#content').innerHTML = `
    <div class="jumbotron">
      <h1 class="display-4">Hello, world!</h1>
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr class="my-4">
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <p class="lead">
        <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </p>
    </div>
  `;
};

// About State
const aboutState = function() {
  document.querySelector('#heading').textContent = 'About Us';
  document.querySelector('#content').innerHTML = `
    <p>This is the about page</p>
  `;
};

// Contact State
const contactState = function() {
  document.querySelector('#heading').textContent = 'Contact Us';
  document.querySelector('#content').innerHTML = `
    <form>
      <div class="form-group">
        <label for="inputName">Name</label>
        <input class="form-control" id="inputName" placeholder="Enter name">
      </div>
      <div class="form-group">
        <label for="inputEmail">Email address</label>
        <input type="email" class="form-control" id="inputEmail" placeholder="Email">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `;
};

// Instantiate pageState
const page = new PageState();

// Init the first state
page.init();

// UI Vars
const home = document.querySelector('#home');
const about = document.querySelector('#about');
const contact = document.querySelector('#contact');

// Home
home.addEventListener('click', (event) => {
  page.change(new homeState);
  event.preventDefault();
});

// About
about.addEventListener('click', (event) => {
  page.change(new aboutState);
  event.preventDefault();
});

// Contact
contact.addEventListener('click', (event) => {
  page.change(new contactState);
  event.preventDefault();
});