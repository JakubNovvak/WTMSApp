const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

const mainRoutes = require('./src/Routes/mainRoutes');
const authRoutes = require('./src/Routes/authRoutes');
const userRoutes = require('./src/Routes/userRoutes');
const sequelize = require('./src/Data/dbContext');
const sessionMiddleware = require('./src/Middleware/sessionMiddleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
app.use(express.static('public'));

// --- Cookies 
app.use(sessionMiddleware);

// --- EJS engine configuration
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, './src/Views'));
app.set()


// --- Setting main layout
app.set('layout', path.join(__dirname, './src/Views/Shared/layout'));


// --- Tabels synchronization
sequelize.sync()
  .then(() => {
    console.log('Baza danych została zsynchronizowana');
  })
  .catch((error) => {
    console.error('Błąd przy synchronizacji bazy danych: ', error);
  });


// --- Routing
app.use('/', mainRoutes);
app.use('/', authRoutes);
app.use('/api', userRoutes);


app.listen(3000, () => {
    console.log('Serwer uruchomiony na http://localhost:3000');
});