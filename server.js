//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
/*app.use(express.static('./dist/lojagi-app'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/lojagi-app/'}),
);*/

app.use(express.static(path.join(__dirname, 'dist','lojagi-app')));

res.sendFile(path.join(__dirname,'dist','lojagi-app','index.html'));


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
