const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/Views'));

// app.get('/', (rq, res) => {
//     res.send(
//         '<h2>WTMSApp</h2>' + 
//         '<br>'+
//         'Aplikacja do zarządzania czasem pracy'
//     )
// })

app.get('/', (req, res) => {
    res.render('index', {title: 'Strona Główna', isAdmin: false});
})

app.listen(3000, () => {
    console.log('Serwer uruchomiony na http://localhost:3000');
});