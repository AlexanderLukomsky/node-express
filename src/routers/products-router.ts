import { Request, Response, Router } from "express";
import { productsRepository } from "../repositories";

export const productsRouter = Router({});

productsRouter.get("/", (req: Request, res: Response) => {
  const foundProducts = productsRepository.findProducts(
    req.query.title?.toString()
  );

  res.send(foundProducts);
});

productsRouter.get("/:id", (req: Request, res: Response) => {
  const product = productsRepository.findProductById(+req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.delete("/:id", (req: Request, res: Response) => {
  const isDeleted = productsRepository.deleteProduct(+req.params.id);

  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});

productsRouter.post("/", (req: Request, res: Response) => {
  const newProduct = productsRepository.createProduct(req.body.title);

  res.status(201).send(newProduct);
});

productsRouter.put("/:id", (req: Request, res: Response) => {
  const id = +req.params.id;
  const title = req.body.title;
  const isUpdated = productsRepository.updateProduct(id, title);

  if (isUpdated) {
    const product = productsRepository.findProductById(id);
    res.status(200).send(product);
  } else {
    res.send(403);
  }
});
