import * as jwt from 'jsonwebtoken';
import {getSession} from '../models/session'
const tokenSecret = "In a real app, this would come from a config file";
//
// authenticate examines the request cookies for a cookie named
// 'token'. If the token cookie exists, is correctly decoded,
// and hasn't expired then this method will attempt to retrieve
// the session and attach it and the session user to the request
// object for use by downstream filters.
//
export default (req, res, next) => {
  // Default to no user logged in
  req.session = null;
  req.user = null;
  // Helper method to clear a token and invoke the next middleware
  const clearTokenAndNext = () => {
    res.clearCookie("token");
    next();
  }
  // Read the cookie named 'token' and bail out if it doesn't exist
  const { token } = req.cookies;
  if (!token) {
    return clearTokenAndNext();
  }
  // Test the validity of the token
  jwt.verify(token, tokenSecret, (err, decodedToken) => {
    if (err) {
      return clearTokenAndNext();
    }
    // Compare the token expiry (in seconds) to the current time (in milliseconds)
    // Bail out if the token has expired
    if (decodedToken.exp <= Date.now() / 1000) {
      return clearTokenAndNext();
    }
    // Read the session ID from the decoded token
    // and attempt to fetch the session by ID
    // Note: getSession retrieves the session (e.g. from Redis, Database, etc).
    const { sid: sessionId } = decodedToken;
    getSession(sessionId, (err, session) => {
      if (err) {
        return clearTokenAndNext();
      }
      // Attach the session and user objects to the request
      // (the following steps will access them)
      req.session = session;
      req.user = session.user;
      next();
    });
  });
};
