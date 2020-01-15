class EventObserver {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
    console.log(`You are subscribed to ${fn.name}`);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(observer => observer !== fn);
    console.log(`You are unsubscribed from ${fn.name}`);
  }

  fire() {
    for (const observer of this.observers) {
      observer.call();
    }
  }
}

const click = new EventObserver();

// Click handler
const getCurMilliSeconds = () => {
  console.log(`Current MilliSeconds: ${new Date().getMilliseconds()}`);
};

// Click handler
const getCurSeconds = () => {
  console.log(`Current Seconds: ${new Date().getSeconds()}`);
};

// Event Listeners
document.querySelector('.sub-ms').addEventListener('click', () => {
  click.subscribe(getCurMilliSeconds);
});

document.querySelector('.unsub-ms').addEventListener('click', () => {
  click.unsubscribe(getCurMilliSeconds);
});

document.querySelector('.sub-s').addEventListener('click', () => {
  click.subscribe(getCurSeconds);
});

document.querySelector('.unsub-s').addEventListener('click', () => {
  click.unsubscribe(getCurSeconds);
});

document.querySelector('.fire').addEventListener('click', () => {
  click.fire();
});