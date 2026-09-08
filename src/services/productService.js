import products from "../data/products";

export function getProducts() {
  return Promise.resolve(products);
}

export function getProductById(id) {
  return Promise.resolve(products.find((product) => product.id === id) || null);
}
