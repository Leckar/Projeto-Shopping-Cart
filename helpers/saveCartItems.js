const saveCartItems = (cart) => {
  if (cart) {
    return localStorage.setItem('cartItems', cart);
  }
  throw new Error('Error: Invalid argument');
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
