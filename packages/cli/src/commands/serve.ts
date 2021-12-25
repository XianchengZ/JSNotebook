import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '529')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));

      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(`
      Opened ${filename} at port ${options.port} \n 
      Open it inside your local machine to edit the file \n
      Happy Coding ;)
      `);
    } catch (error: any) {
      if (error.code === 'EADDRINUSE') {
        console.log(
          'Port is in used. \n Try running on a different port.\n try --port=[port_number]'
        );
      } else {
        console.log('Error: ', error.message);
      }

      process.exit(1);
    }
  });
