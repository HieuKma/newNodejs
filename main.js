const express = require('express');
const app = express();
const port = 3012;

const bodyParser = require('body-parser');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let users = [
    { id: 1, name: 'Ha'},
    { id: 2, name: 'My'},
    { id: 3, name: 'Tit'}
];

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Hieu'
    });
});

app.get('/users', (req, res) => {
    res.render('users/index2', {
        users: users
    });
});

app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let matchedUsers = users.filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index2', {
        users: matchedUsers
    });
});

app.get('/users/create', (req, res) => {
    res.render('users/create');
})

app.post('/users/create', (req, res) => {
    users.push(req.body);
    res.redirect('/users');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));