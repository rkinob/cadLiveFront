//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist','lojaGiFront')));

app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname,'dist','lojaGiFront','index.html'))
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
