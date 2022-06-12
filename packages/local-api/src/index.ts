import express from "express"

function serve(port: number, filename: string, dir: string) {
    const app = express();

    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
}

export default serve;