import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 5000;

const addresses = [
  { value: "Levina 11", id: 1 },
  { value: "Nezalejnasti 12", id: 2 },
];
const products = [
  { value: "milk", id: 1 },
  { value: "cucumber", id: 2 },
];

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  const helloMessage = "Hello World";
  res.send(helloMessage);
});
//products
app.get("/products", (req: Request, res: Response) => {
  if (req.query.title) {
    res.send(
      products.filter((product) =>
        product.value.includes(req.query.title as string)
      )
    );
  } else {
    res.send(products);
  }
});

app.get("/products/:id", (req: Request, res: Response) => {
  const reqParams = +req.params.id;
  const product = products.find((product) => product.id === reqParams);

  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const reqParams = +req.params.id;
  const productIndex = products.findIndex(
    (product) => product.id === reqParams
  );

  if (productIndex > -1) {
    products.splice(productIndex, 1);
    res.send(204);
  } else {
    res.send(404);
  }
});

app.post("/products", (req: Request, res: Response) => {
  const newProduct = { value: req.body.title, id: +new Date() };
  products.push(newProduct);
  res.status(201).send(newProduct);
});
app.put("/products/:id", (req: Request, res: Response) => {
  const product = products.find((product) => product.id === +req.params.id);
  if (product) {
    product.value = req.body.title;
    res.status(200).send(product);
  } else {
    res.send(403);
  }
});
//address
app.get("/addresses", (req: Request, res: Response) => {
  res.send(addresses);
});

app.get("/addresses/:id", (req: Request, res: Response) => {
  const reqParams = +req.params.id;
  const address = addresses.find((address) => address.id === reqParams);
  if (address) {
    res.send(address);
  } else {
    res.send(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
