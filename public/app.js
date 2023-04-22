const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const dataFilePath = path.join(__dirname, 'data/data.json');
const rawData = fs.readFileSync(dataFilePath);
const colours = JSON.parse(rawData);

// Serve static files from the public directory
app.use(express.static('public'));

console.log('Loaded colours:', colours);

// GET /colours - Get the list of all colours and their details
app.get('/colours', (req, res) => {
    res.json(colours);
});

// Use the built-in JSON middleware to parse incoming JSON request bodies
app.use(express.json());

// GET /colours/:id - Get the details of colour id
app.get('/colours/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const colour = colours.find(c => c.colorId === id);
    if (colour) {
        res.json(colour);
    } else {
        res.status(404).send('Colour not found');
    }
});

// POST /colours - Create a new colour with the details provided
app.post('/colours', (req, res) => {
    const { hexString, rgb, hsl, name } = req.body;
    const maxId = Math.max(...colours.map(c => c.colorId));
    const newColour = {
        colorId: maxId + 1,
        hexString,
        rgb,
        hsl,
        name
    };
    colours.push(newColour);
    fs.writeFileSync(dataFilePath, JSON.stringify(colours));
    res.status(201).json({ uri: `/colours/${newColour.colorId}` });
});

// PUT /colours/:id - Modify colour id (creates one if it doesn't already exist)
app.put('/colours/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { hexString, rgb, hsl, name } = req.body;
    let colour = colours.find(c => c.colorId === id);
    if (colour) {
        colour.hexString = hexString;
        colour.rgb = rgb;
        colour.hsl = hsl;
        colour.name = name;
    } else {
        colour = {
            colorId: id,
            hexString,
            rgb,
            hsl,
            name
        };
        colours.push(colour);
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(colours));
    res.json({ uri: `/colours/${colour.colorId}` });
});

// DELETE /colours/:id - Delete colour id (if it exists)
app.delete('/colours/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = colours.findIndex(c => c.colorId === id);
    if (index >= 0) {
        colours.splice(index, 1);
        fs.writeFileSync(dataFilePath, JSON.stringify(colours));
        res.sendStatus(204);
    } else {
        res.status(404).send('Colour not found');
    }
});

// Middleware to handle invalid DELETE and PUT requests
app.use((req, res, next) => {
    if (req.method === 'DELETE' || req.method === 'PUT') {
        res.status(400).send('Invalid method');
    } else {
        next();
    }
});

// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
