const products = [
  { title: "milk", id: 1 },
  { title: "cucumber", id: 2 },
];

export const productsRepository = {
  findProducts(title?: string) {
    if (title) {
      return products.filter((product) => product.title.includes(title));
    }
    return products;
  },
  createProduct(title: string) {
    const newProduct = { title, id: +new Date() };
    products.push(newProduct);
    return newProduct;
  },
  findProductById(id: number) {
    const product = products.find((product) => product.id === id);
    return product;
  },
  updateProduct(id: number, title: string) {
    const product = products.find((product) => product.id === id);

    if (product) {
      product.title = title;
      return true;
    }

    return false;
  },
  deleteProduct(id: number) {
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex > -1) {
      products.splice(productIndex, 1);
      return true;
    }
    return false;
  },
};
