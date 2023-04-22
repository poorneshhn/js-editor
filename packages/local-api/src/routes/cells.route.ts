import express, { Router } from "express";
import fs from "fs/promises";
import path from "path";

interface LocalApiError {
  code: string;
}

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}
const createCellsRouter = (filename: string, dir: string): Router => {
  const cellsRouter = express.Router();
  cellsRouter.use(express.json());

  const completePath = path.join(dir, filename);

  cellsRouter.get("/", async (req, res) => {
    try {
      const file = await fs.readFile(completePath, { encoding: "utf-8" });
      res.send(JSON.parse(file));
      return;
    } catch (error) {
      const isLocalApiError = (error: any): error is LocalApiError => {
        return typeof error.code === "string";
      };

      if (isLocalApiError(error)) {
        if (error.code === "ENOENT") {
          await fs.writeFile(completePath, "[]", "utf-8");
          res.send([]);
        } else {
          throw error;
        }
      }
    }
  });

  cellsRouter.post("/", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(completePath, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });
  return cellsRouter;
};

export default createCellsRouter;
