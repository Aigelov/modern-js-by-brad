// Basic structure

// (() => { // IIFE
//   // Declare private variables and functions
//
//   return {
//     // Declare public variables and functions
//   }
// })();

/** STANDARD MODULE PATTERN */
// const UICtrl = (() => {
//   let text = 'Hello world';
//
//   const changeText = () => {
//     const element = document.querySelector('h1');
//     element.textContent = text;
//   };
//
//   return {
//     callChangeText: () => {
//       changeText();
//       console.log(text);
//     }
//   }
// })();
//
// UICtrl.callChangeText();


/** REVEALING MODULE PATTERN */
const ItemCtrl = (() => {
  let _data = [];

  const add = item => {
    _data.push(item);
    console.log('Item Added...');
  };

  const get = id => {
    return _data.find(item => {
      return item.id === id;
    });
  };

  return {
    add,
    get
  }
})();

ItemCtrl.add({id: 1, name: 'John'});
ItemCtrl.add({id: 2, name: 'Mark'});
ItemCtrl.add({id: 3, name: 'Brad'});
console.log(ItemCtrl.get(2));