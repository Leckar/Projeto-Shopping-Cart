require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Should be a function', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Should call fetch', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Should fetch using the correct endpoint for the argument used', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Should return an expected object', async () => {
    expect.assertions(1);
    await expect(fetchItem('MLB1615760527')).resolves.toEqual(item);
  });
  it('Should throw an error if called with no arguments', () => {
    expect.assertions(1);
    expect(fetchItem()).rejects.toThrow('You must provide an url');
  });
});
