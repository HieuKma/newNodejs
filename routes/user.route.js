var express = require('express');

const shortid = require('shortid');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users: [] })
  .write()
var router = express.Router();

router.get('/', (req, res) => {
    res.render('users/index2', {
        users: db.get('users').value()
    });
});

router.get('/search', (req, res) => {
    let q = req.query.q;
    let matchedUsers = db.get('users').value().filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index2', {
        users: matchedUsers
    });
});

router.get('/create', (req, res) => {
    res.render('users/create');
});

router.get('/:id', (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();

    res.render('users/view', {
        user: user
    })
});

router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

module.exports = router;