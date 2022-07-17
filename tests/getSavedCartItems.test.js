const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  beforeEach(() => {
    getSavedCartItems();
  });
  it('Should call localStorage.getItem', () => {
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('Should call localStorage.getItem using "cartItems" as argument', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
  it('Should return the undefined since there is no data in localStorage', () => {
    expect(getSavedCartItems()).toEqual(undefined);
  });
});
