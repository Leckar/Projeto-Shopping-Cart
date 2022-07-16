require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const item = require('../mocks/item');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  beforeEach(() => {
    fetchProducts('computador');
  });
  it('Should be a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Should call fetch', () => {
    expect(fetch).toHaveBeenCalled();
  });
  it('Should fetch with correct endpoint', () => {
    expect(fetch).resolves.toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('Should return an object equal to computadorSearch when receiving "computador as an argument', async () => {
    expect.assertions(1);
    await expect(fetchProducts('computador')).resolves.toEqual(computadorSearch);
  });
  it('Should throw an error if no argument was given', async () => {
    expect.assertions(1);
    await expect(fetchProducts()).rejects.toThrow('You must provide an url');
  });
});
