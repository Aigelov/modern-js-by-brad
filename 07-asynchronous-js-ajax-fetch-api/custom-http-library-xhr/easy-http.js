function EasyHTTP() {
  this.http = new XMLHttpRequest();
}

// Make an HTTP GET Request
EasyHTTP.prototype.get = function(url, callback) {
  const self = this;
  this.http.open('GET', url, true);

  this.http.onload = function() {
    if (self.http.status === 200) {
      callback(null, JSON.parse(self.http.responseText));
    } else {
      callback(`Error: ${self.http.status}`);
    }
  };

  this.http.send();
};

// Make an HTTP POST Request
EasyHTTP.prototype.post = function(url, data, callback) {
  const self = this;
  this.http.open('POST', url, true);
  this.http.setRequestHeader('Content-Type', 'application/json');

  this.http.onload = function() {
    callback(null, JSON.parse(self.http.responseText));
  };

  this.http.send(JSON.stringify(data));
};

// Make an HTTP PUT Request
EasyHTTP.prototype.put = function(url, data, callback) {
  const self = this;
  this.http.open('PUT', url, true);
  this.http.setRequestHeader('Content-Type', 'application/json');

  this.http.onload = function() {
    callback(null, JSON.parse(self.http.responseText));
  };

  this.http.send(JSON.stringify(data));
};

// Make an HTTP DELETE Request
EasyHTTP.prototype.delete = function(url, callback) {
  const self = this;
  this.http.open('DELETE', url, true);

  this.http.onload = function() {
    if (self.http.status === 200) {
      callback(null, 'Post Deleted');
    } else {
      callback(`Error: ${self.http.status}`);
    }
  };

  this.http.send();
};