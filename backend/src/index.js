const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes.js')
const cors = require('cors');
const http = require('http');
const {setupWebSocket} = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-conrg.mongodb.net/week10?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

//libera acesso externo
app.use(cors({}));
app.use(express.json());
app.use(routes);
app.listen(3030)
