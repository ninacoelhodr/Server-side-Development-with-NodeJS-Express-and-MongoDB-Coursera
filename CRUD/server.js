const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ninacdr:IPRLe4Ted7DafAiV@cluster0-ak0lr.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err);
    db = client.db('TrabalhoDSO') // coloque o nome do seu DB

    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/', (req, res) => {
    var cursor = db.collection('Usuario').find()
})

app.get('/show', (req, res) => {
    db.collection('Usuario').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.post('/show', (req, res) => {
    db.collection('Usuario').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
    })
})

app.route('/edit/:id')
.get((req, res) => {
    var id = req.params.id
    var ObjectId = require('mongodb').ObjectID;

    db.collection('Usuario').find(ObjectId(id)).toArray((err, result) => {
        if (err) return res.send(err)
        res.render('edit.ejs', { data: result})
    })
})

.post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname
    var ObjectId = require('mongodb').ObjectID;

    db.collection('Usuario').updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            surname: surname
        }
    }, (err, result) => {
        if(err) return res.send(err)
        res.redirect('/show')
        console.log('Atualizando banco')
    })
})

app.route('/delete/:id')
.get((req, res) => {
    var id = req.params.id
    var ObjectId = require('mongodb').ObjectID;

    db.collection('Usuario').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err)
        console.log('Deletando')
        res.redirect('/show')
    })
})

app.route('/produtos/:id')
.get((req, res) => {
    var id = req.params.id
    var ObjectId = require('mongodb').ObjectID;

    db.collection('Produtos').find({usuario_id: ObjectId(id)}).toArray((err, result) => {
        if (err) return res.send(err)
        res.render('produtos.ejs', { data: result})
    })
})

app.route('/cadastroProdutos/:id')
.get((req, res) => {
    var id = req.params.id
    var ObjectId = require('mongodb').ObjectID;

    db.collection('Usuario').find(ObjectId(id)).toArray((err, result) => {
        if (err) return res.send(err)
        res.render('cadastroProdutos.ejs', { data: result})
    })
})

.post((req, res) => {
    var id = req.params.id
    var ObjectId = require('mongodb').ObjectID;
    console.log(id);
    db.collection('Produtos').save({usuario_id: ObjectId(id), nome: req.body.nome, descricao: req.body.descricao, preco: req.body.preco}, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
    })
})



