const express = require('express');
const path = require('path');
// const app = express();
// const compression = require('compression')
app.use(compression())
app.use(express.static(__dirname + '/dist/pokedex'));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname +
        '/dist/pokedex/index.html'));
});
app.listen(process.env.PORT || 8080);