import express, { Request, Response } from "express";
import { addressesRouter, productsRouter } from "./routers";
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  const helloMessage = "Hello World";
  res.send(helloMessage);
});

//products
app.use("/products", productsRouter);
//address
app.use("/addresses", addressesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
