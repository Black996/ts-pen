import path from "path";
import { Command } from "commander";
import serve from "local-api";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command().command('serve [filename]')
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action(async (filename = 'notebook.js', options: { port: string }) => {
        const directory = path.join(process.cwd(), path.dirname(filename))
        try {
            await serve({ port: parseInt(options.port), filename: path.basename(filename), directory, useProxy: !isProduction });
            console.log(`Server Listening on Port ${options.port}`);
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
        }


    });