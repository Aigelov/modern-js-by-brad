
// Storage Controller


// Item Controller
const ItemCtrl = (() => {
  // Item Constructor
  const Item = function(id ,name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    items: [
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookie', calories: 400},
      // {id: 2, name: 'Eggs', calories: 300}
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems: () => {
      return data.items;
    },

    addItem: (name, calories) => {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      const newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },

    getItemById: (id) => {
      return data.items.filter(item => item.id === id)[0];
    },

    updateItem: (name, calories) => {
      // Calories to number
      calories = parseInt(calories);
      return data.items.filter(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          return item;
        }
      })[0];
    },

    deleteItem: (id) => {
      // Get ids
      const ids = data.items.map(item => item.id);

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);
    },

    clearAllItems: () => {
      data.items = [];
    },

    setCurrentItem: (item) => {
      data.currentItem = item;
    },

    getCurrentItem: () => {
      return data.currentItem;
    },

    getTotalCalories: () => {
      // Set total calories in data structure
      data.totalCalories = data.items.reduce((total, item) => total + item.calories, 0);

      // Return total
      return data.totalCalories;
    },

    logData: () => {
      return data;
    }
  }
})();


// UI Controller
const UICtrl = (() => {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  };

  // Public methods
  return {
    populateItemList: (items) => {
      let html = '';
      for (const item of items) {
        html += `<li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="javascript:void(0)" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li>`;
      }

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },

    addListItem: (item) => {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';

      // Create li element
      const li = document.createElement('li');

      // Add class
      li.className = 'collection-item';

      // Add ID
      li.id = `item-${item.id}`;

      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="javascript:void(0)" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;

      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },

    updateListItem: (item) => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn node list into array
      listItems = Array.from(listItems);

      for (const listItem of listItems) {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="javascript:void(0)" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      }
    },

    deleteListItem: (id) => {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },

    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    addItemToForm: () => {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    removeItems: () => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn node list into array
      listItems = Array.from(listItems);

      for (const listItem of listItems) {
        listItem.remove();
      }
    },

    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    showTotalCalories: (totalCalories) => {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    clearEditState: (event = null) => {
      if (event) {
        event.preventDefault();
      }
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },

    showEditState: () => {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },

    getSelectors: () => {
      return UISelectors;
    }
  }
})();


// App Controller
const App = ((ItemCtrl, UICtrl) => {
  // Load event listeners
  const loadEventListeners = () => {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit on enter
    document.querySelector('form').addEventListener('keypress', (event) => {
      if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete button event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  };

  // Add item submit
  const itemAddSubmit = (event) => {
    event.preventDefault();

    // Get from input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);
      
      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Clear fields
      UICtrl.clearInput();
    }
  };

  // Click edit item
  const itemEditClick = (event) => {
    event.preventDefault();

    if (event.target.classList.contains('edit-item')) {
      // Get list item id (Item-0, Item-1, ...)
      const listId = event.target.parentElement.parentElement.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get actual id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
  };

  // Update item submit
  const itemUpdateSubmit = (event) => {
    event.preventDefault();

    // Get item input
    const input = UICtrl.getItemInput();

    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  };

  // Delete item submit
  const itemDeleteSubmit = (event) => {
    event.preventDefault();

    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  };

  // Clear items event
  const clearAllItemsClick = () => {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeItems();

    // Hide UL
    UICtrl.hideList();
  };

  // Public methods
  return {
    init: () => {
      // Clear edit state / set initial state
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);


// Initialize app
App.init();