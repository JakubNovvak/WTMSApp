const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

const mainRoutes = require('./src/Routes/mainRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
app.use(express.static('public'));


// --- EJS engine configuration
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, './src/Views'));
app.set()


// --- Setting main layout
app.set('layout', path.join(__dirname, './src/Views/Shared/layout'));


// --- Routing
app.use('/', mainRoutes);


app.listen(3000, () => {
    console.log('Serwer uruchomiony na http://localhost:3000');
});