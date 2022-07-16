const fetchItem = async (id) => {
  if (!id) throw new Error('You must provide an url');
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const json = await response.json();
  return json;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
