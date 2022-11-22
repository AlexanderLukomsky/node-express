import { Request, Response, Router } from "express";

const products = [
  { value: "milk", id: 1 },
  { value: "cucumber", id: 2 },
];

export const productsRouter = Router({});

productsRouter.get("/", (req: Request, res: Response) => {
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

productsRouter.get("/:id", (req: Request, res: Response) => {
  const reqParams = +req.params.id;
  const product = products.find((product) => product.id === reqParams);

  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.delete("/:id", (req: Request, res: Response) => {
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

productsRouter.post("/", (req: Request, res: Response) => {
  const newProduct = { value: req.body.title, id: +new Date() };
  products.push(newProduct);
  res.status(201).send(newProduct);
});
productsRouter.put("/:id", (req: Request, res: Response) => {
  const product = products.find((product) => product.id === +req.params.id);
  if (product) {
    product.value = req.body.title;
    res.status(200).send(product);
  } else {
    res.send(403);
  }
});
