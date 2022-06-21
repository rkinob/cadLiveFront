
const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();

app.use(express.static(`${__dirname}/dist/${nomeApp}`));

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});

app.listen(process.env.PORT || 8080);


//Install express server
/*
const express = require('express');
const path = require('path');

const app = express();
*/
// Serve only the static files form the dist directory
/*app.use(express.static('./dist/lojagi-app'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/lojagi-app/'}),
);*/

//app.use(express.static(path.join(__dirname, 'dist','lojagi-app')));

//res.sendFile(path.join(__dirname,'dist','lojagi-app','index.html'));


/*
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});
*/
// Start the app by listening on the default Heroku port
//app.listen(process.env.PORT || 8080);
