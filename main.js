const express = require('express');
const app = express();
const port = 3012;

const bodyParser = require('body-parser');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

db.defaults({ users: [] })
  .write()

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Hieu'
    });
});

app.get('/users', (req, res) => {
    res.render('users/index2', {
        users: db.get('users').value()
    });
});

app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let matchedUsers = db.get('users').value().filter(user => {
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
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));