const express = require('express')
const jdenticon = require('jdenticon')

const app = express()

const port = 8111;

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Pass to next layer of middleware
    next();
});

// Example: 'GET /png/billy/300' will return a 300x300 png for the identifier 'billy'
app.get('/png/:identifier/:size', (req, res) => {
    res.setHeader('Content-Type', 'image/png')
    res.send(jdenticon.toPng(req.params.identifier, Number.parseInt(req.params.size, 10)))
});

// Example: 'GET /svg/billy/300' will return a 300x300 svg for the identifier 'billy'
app.get('/svg/:identifier/:size', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml')
    res.send(jdenticon.toSvg(req.params.identifier, Number.parseInt(req.params.size, 10)))
});

app.get('/getGameConfig/:count', (req, res) => {
    const { count } = req.params;
    let result = [];
    for(let i = 0; i < count; i++) {
        result.push({
            url: `http://localhost:8111/svg/${ Math.ceil(Math.random() * 1000)}/150`,
            name: i
        })
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
});

app.listen(port, () => console.log(`Image server running on port ${port}`));
