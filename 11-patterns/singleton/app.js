const Singleton = (() => {
  let instance;

  const createInstance = () => {
    return new Object({name: 'Brad'});
  };

  return {
    getInstance: () => {
      if (!instance) {
        console.log('Instance has been created');
        instance = createInstance();
      } else {
        console.log('No need to create instance');
      }
      return instance;
    }
  }
})();

const instanceA = Singleton.getInstance();
console.log(instanceA);
const instanceB = Singleton.getInstance();
console.log(instanceB);

console.log(instanceA === instanceB);