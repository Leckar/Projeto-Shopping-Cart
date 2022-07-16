const fetchItem = async (id) => {
  console.log(id);
  if (!id) throw new Error('You must provide an url');
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const json = await response.json();
  console.log(json);
  return json;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
