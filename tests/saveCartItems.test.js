const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Should set a new item in the local storage when called', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Should set the value of the property cartItems in localStorage as the given argument', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
  it('Should save an empty string as value of the cartItems property if called with invalid arguments', () => {
    saveCartItems(124423);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '');
  });
  it('Should save an empty string as value of the cartItems property if called with empty arguments', () => {
    saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '');
  });
  it('Should save an empty string as value of the cartItems property if called with falsy arguments', () => {
    saveCartItems(null);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '');
  });
});
