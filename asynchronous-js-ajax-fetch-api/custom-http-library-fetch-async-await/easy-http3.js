/**
 * EasyHTTP Library
 * Library for making HTTP requests
 *
 * @version 3.0.0
 * @author  Brad Traversy
 * @license MIT
 *
 **/

class EasyHTTP {
  // Make an HTTP Get Request
  async get(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  // Make an HTTP Post Request
  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  // Make an HTTP Put Request
  async put(url, data) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  // Make an HTTP Delete Request
  // noinspection ReservedWordAsName
  async delete(url) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await 'Resource Deleted...';
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}