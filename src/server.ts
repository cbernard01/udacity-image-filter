import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFile} from './util/util';

import { requireAuth } from './util/authentication';
import {IndexRouter} from "./index.router";

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Moved routing logic to index.router.ts for more clarity
  app.use('/', IndexRouter);

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
