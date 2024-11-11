const session = require('express-session');

// --- Middleware zajmujące się sesją
const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 60 * 60 * 1000             
  }
});

module.exports = sessionMiddleware;