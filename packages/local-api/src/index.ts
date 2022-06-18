import express from "express";
import path from "path";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import { getCellsRouter } from "./routes"

interface IServeParams {
    port: number;
    filename: string;
    directory: string;
    useProxy: boolean;
}

function serve({ port, filename, directory, useProxy }: IServeParams) {
    const app = express();
    cors();
    app.use(getCellsRouter(directory, filename));

    if (useProxy) {
        app.use(createProxyMiddleware({
            target: "http://localhost:3000/",
            ws: true,
            logLevel: "silent"
        }))
    } else {

        const pkgIndexPath = require.resolve("local-client/build/index.html");
        const buildPath = path.dirname(pkgIndexPath);

        app.use(express.static(buildPath));
    }

    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
}

export default serve;