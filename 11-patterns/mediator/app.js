const User = function(name) {
  this.name = name;
  this.chatRoom = null;
};

User.prototype = {
  send: function(message, to) {
    this.chatRoom.send(message, this, to);
  },
  receive: function(message, from) {
    console.log(`${from.name} to ${this.name}: "${message}"`);
  }
};

const ChatRoom = function() {
  let users = {}; // List of users

  return {
    register: function(user) {
      users[user.name] = user;
      user.chatRoom = this;
    },
    send: function(message, from, to) {
      if (to) {
        // Single user message
        to.receive(message, from);
      } else {
        // Mass message
        for (const key in users) {
          if (users[key] !== from) {
            // Broadcast message to everyone except user who is sending message
            users[key].receive(message, from);
          }
        }
      }
    }
  }
};

const brad = new User('Brad');
const jeff = new User('Jeff');
const sara = new User('Sara');

const chatRoom = new ChatRoom();

chatRoom.register(brad);
chatRoom.register(jeff);
chatRoom.register(sara);

brad.send('Hello Jeff', jeff);
sara.send('Hello Brad, you are the best dev ever!', brad);
jeff.send('Hello Everyone!!!');