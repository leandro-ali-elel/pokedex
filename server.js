const express = require('express');
const app = express();
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/pokedex/' }
    );
});
app.listen(process.env.PORT || 8080);