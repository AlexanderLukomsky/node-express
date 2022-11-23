import { Request, Response, Router } from "express";
import { validationResult, body } from "express-validator";
import { validationMiddleware } from "../middleware";
import { productsRepository } from "../repositories";

export const productsRouter = Router({});

const titleValidation = body("title")
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage("title length should be from 3 to 10");

productsRouter.post(
  "/",
  titleValidation,
  validationMiddleware,
  (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title);

    res.status(201).send(newProduct);
  }
);

productsRouter.put(
  "/:id",
  titleValidation,
  validationMiddleware,
  (req: Request, res: Response) => {
    const id = +req.params.id;
    const title = req.body.title;
    const isUpdated = productsRepository.updateProduct(id, title);

    if (isUpdated) {
      const product = productsRepository.findProductById(id);
      res.status(200).send(product);
    } else {
      res.send(403);
    }
  }
);

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
