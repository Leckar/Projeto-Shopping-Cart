const saveCartItems = (cart) => {
  if (cart && typeof cart !== 'number') {
    return localStorage.setItem('cartItems', cart);
  }
   return localStorage.setItem('cartItems', '');
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
