const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

const path = require('path');
const mainRoutes = require('./src/Routes/mainRoutes');
const authRoutes = require('./src/Routes/authRoutes');
const userRoutes = require('./src/Routes/userRoutes');
const shiftRoutes = require('./src/Routes/shiftRoutes');
const salaryRoutes = require('./src/Routes/salaryRoutes');
const adminRoutes = require('./src/Routes/adminRoutes');
const downloadRoutes = require('./src/Routes/downloadRoutes');

// --- załadaowanie bazy danych
const sequelize = require('./src/Data/dbContext');

// --- serowanie plików statycznych z folderu node_modules
//      związane z bootstrapem zainstalowanym poprzez npm
app.use('/static', express.static(path.join(__dirname, 'node_modules')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// --- Sesja użytkownika
const sessionMiddleware = require('./src/Middleware/sessionMiddleware');
app.use(sessionMiddleware);

// --- konfiguracja silnika szablonów EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, './src/Views'));
app.set()


// --- Ustawienie głównego layoutu w widokach
app.set('layout', path.join(__dirname, './src/Views/Shared/layout'));


// --- Synchronizacja tabel
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
app.use('/', salaryRoutes);
app.use('/admin/', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/', downloadRoutes);


app.listen(3000, () => {
    console.log('Serwer uruchomiony na http://localhost:3000');
});