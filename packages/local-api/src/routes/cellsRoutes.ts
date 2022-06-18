import path from "path";
import fs from "fs/promises";
import express from "express";

interface ErrorWithCode extends Error {
    code?: string
}

type CellVariant = "code" | "markup";

interface ICell {
    id: string;
    cellType: CellVariant;
    content: string;
}

export function getCellsRouter(directory: string, filename: string) {
    const router = express.Router();

    router.use(express.json());

    const cellsFilePath = path.join(directory, filename)

    router.get("/cells", async (req, res) => {
        try {
            const cellsFile = await fs.readFile(cellsFilePath, "utf-8");
            console.log("I am here");
            return res.send(JSON.stringify(cellsFile)).status(200);
        } catch (err) {
            const errCode = getErrorCode(err as ErrorWithCode);
            if (errCode == "ENOENT") {
                await fs.writeFile(cellsFilePath, "[]", "utf-8")
                return res.send("[]").status(201);
            } else {
                throw err;
            }
        }
    })

    router.post("/cells", async (req, res) => {
        const { cells }: { cells: ICell[] } = req.body;
        await fs.writeFile(cellsFilePath, JSON.stringify(cells), "utf-8");
        res.send("cells added successfully").status(200);
    })

    return router;
}

function getErrorCode(err: ErrorWithCode) {
    return err.code;
}