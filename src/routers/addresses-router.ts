import { Request, Response, Router } from "express";

const addresses = [
  { value: "Levina 11", id: 1 },
  { value: "Nezalejnasti 12", id: 2 },
];

export const addressesRouter = Router({});

addressesRouter.get("/", (req: Request, res: Response) => {
  res.send(addresses);
});

addressesRouter.get("/:id", (req: Request, res: Response) => {
  const reqParams = +req.params.id;
  const address = addresses.find((address) => address.id === reqParams);
  if (address) {
    res.send(address);
  } else {
    res.send(404);
  }
});
