const express = require('express'),
      path = require('path');

const app = express();

app.use(express.static('./dist/PPosAngular'));

app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/dist/PPosAngular/index.html'));
});

app.listen(process.env.POST || 8080, ()=> {
    console.log("server started");
});