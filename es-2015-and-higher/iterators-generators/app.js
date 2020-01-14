// Iterator example
// function nameIterator(names) {
//   let nextIndex = 0;
//
//   return {
//     next: function() {
//       return nextIndex < names.length
//         ? { value: names[nextIndex++], done: false }
//         : { done: true }
//     }
//   };
// }
//
// // Create an array of names
// const namesArr = ['Jack', 'Gill', 'John'];
//
// // Init iterator and pass in the names array
// const names = nameIterator(namesArr);
//
// document.querySelector('#next').addEventListener('click', () => {
//   console.log(names.next());
// });


// Generator example
// function* sayNames() {
//   yield 'Jack';
//   yield 'Gill';
//   yield 'John';
// }
//
// const name = sayNames();
//
// document.querySelector('#next').addEventListener('click', () => {
//   console.log(name.next());
// });


// ID Creator
function* createIds() {
  let index = 1;

  while(index <= 5) {
    yield index++;
  }
}

const gen = createIds();

document.querySelector('#next').addEventListener('click', () => {
  console.log(gen.next());
});