import path from "path";
import { Command } from "commander";
import serve from "local-api";

export const serveCommand = new Command().command('serve [filename]')
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action(async (filename = 'notebook.js', options: { port: string }) => {
        const dir = path.join(process.cwd(), path.dirname(filename))
        try {
            await serve(parseInt(options.port), path.basename(filename), dir);
            console.log(`Server Listening on Port ${options.port}`);
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
        }


    });