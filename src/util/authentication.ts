import {Request, Response} from 'express';
import {NextFunction} from "connect";

import * as jwt from 'jsonwebtoken';
import {config} from '../config/config'

// Middleware to determine if the requester provided a valid authentication token
export function requireAuth(req: Request, res: Response, next: NextFunction) {

  // Validate that the authorization header is present
  // if not present, respond with message and status 401
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({message: 'No authorization headers.'});
  }

  // Split the "bearer" and token into an array for processing
  const token_bearer = req.headers.authorization.split(' ');
  // Validate that the token_bearer array if properly formed.
  // If not formed appropriately, respond with message and status 401
  if (token_bearer.length != 2) {
    return res.status(401).send({message: 'Malformed token.'});
  }

  // Verify that the token decodes based on the shared secret key on both servers
  return jwt.verify(token_bearer[1], config.jwt.secret, (err, decoded) => {
    // Check for errors, if present and respond with message and 500.
    if (err) {
      // Console log error for AWS monitoring and log collection and
      // respond with message and status 500.
      console.log(err);
      return res.status(500).send({auth: false, message: 'Failed to authenticate.'});
    }
    // If successful go to the next function in the chain.
    return next();
  });
}
