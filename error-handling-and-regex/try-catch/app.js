const user = {
  email: 'jdoe@gmail.com'
};

try {
  // Produce a ReferenceError
  // myFunction();

  // Produce a TypeError
  // null.myFunction();

  // Produce a SyntaxError
  // eval('Hello world');

  // Produce a URIError
  // decodeURIComponent('%');

  if (!user.name) {
    // throw 'User has no name';
    throw new SyntaxError('User has no name');
  }
} catch (error) {
  console.log('ERROR:', error);
  console.log('ERROR.NAME:', error.name);
  // console.log('ERROR INSTANCE_OF REFERENCE_ERROR:', error instanceof ReferenceError);
  console.log('ERROR.MESSAGE:', error.message);
} finally {
  // console.log('Finally runs regardless of result...');
}

console.log('Program continues...');