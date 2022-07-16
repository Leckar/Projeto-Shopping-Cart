const fetchProducts = async (arg) => {
  if (arg !== 'computador') throw new Error('You must provide an url');
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${arg}`);
  const json = await response.json();
  return json;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
