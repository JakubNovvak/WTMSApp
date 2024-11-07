const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (rq, res) => {
    res.send(
        '<h2>WTMSApp</h2>' + 
        '<br>'+
        'Aplikacja do zarządzania czasem pracy'
    )
})

app.listen(3000, () => {
    console.log('Serwer uruchomiony na http://localhost:3000');
});